import FullBox from "./fullBox";
import Mpeg4BoxHeader from "../mpeg4BoxHeader";
import {ByteVector, StringType} from "../../byteVector";
import {DescriptorTag} from "../descriptorTag";
import {DescriptorTagReader} from "../descriptorTagReader";
import {File} from "../../file";
import {Mpeg4BoxClassType} from "../mpeg4BoxClassType";
import {NumberUtils} from "../../utils";

/**
 * This class extends @see FullBox to provide an implementation of an Apple ElementaryStreamDescriptor.
 * This box may appear as a child of a @see IsoAudioSampleEntry and provided further information about an audio stream.
 */
export default class AppleElementaryStreamDescriptor extends FullBox {
    /**
     * The ES_ID of another elementary stream on which this elementary stream depends
     */
    public dependsOnEsId: number;

    /**
     * Indicates that a dependsOn_ES_ID will follow
     */
    public streamDependenceFlag: boolean;

    /**
     * OCR Stream Flag
     */
    public ocrStreamFlag: boolean;

    /**
     * OCR ES_ID
     */
    public ocrEsId: number;

    /**
     * Indicates that a URLstring will follow
     */
    public urlFlag: boolean;

    /**
     * Length of URL String
     */
    public urlLength: number;

    /**
     * URL String of URLlength, contains a URL that shall point to the location of an SL-packetized stream by name.
     */
    public urlString: string;

    /**
     * Indicates that this stream is used for upstream information
     */
    public upStream: boolean;

    /**
     *  The maximum bitrate the stream described by the current instance.
     */
    public maximumBitrate: number;

    /**
     * The maximum average the stream described by the current instance.
     */
    public averageBitrate: number;

    /**
     * The ID of the stream described by the current instance.
     */
    public streamId: number;

    /**
     * The priority of the stream described by the current instance.
     */
    public streamPriority: number;

    /**
     * The object type ID of the stream described by the current instance.
     */
    public objectTypeId: number;

    /**
     * The type the stream described by the current instance.
     */
    public streamType: number;

    /**
     * The buffer size DB value the stream described by the current instance.
     */
    public bufferSizeDB: number;

    /**
     * The decoder config data of stream described by the current instance.
     */
    public decoderConfig: ByteVector;

    /**
     * Private constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance of @see AppleElementaryStreamDescriptor with a provided
     * header and handler by reading the contents from a specified file.
     * @param header A @see Mpeg4BoxHeader object containing the header to use for the new instance.
     * @param file A @see File object to read the contents of the box from.
     * @param handlerType Type of the handler box object containing the handler that applies to the
     *     new instance, or undefined if no handler applies.
     * @returns A new instance of @see AppleElementaryStreamDescriptor
     */
    public static fromHeaderFileAndHandler(
        header: Mpeg4BoxHeader,
        file: File,
        handlerType: ByteVector
    ): AppleElementaryStreamDescriptor {
        /* ES_Descriptor Specifications
         *  Section 7.2.6.5 http://ecee.colorado.edu/~ecen5653/ecen5653/papers/ISO%2014496-1%202004.PDF
         */

        const instance: AppleElementaryStreamDescriptor = new AppleElementaryStreamDescriptor();
        instance.initializeFromHeaderFileAndHandler(header, file, handlerType);
        const boxData: ByteVector = file.readBlock(instance.dataSize);
        instance.decoderConfig = ByteVector.empty();
        const reader: DescriptorTagReader = new DescriptorTagReader(boxData);

        // Elementary Stream Descriptor Tag
        if (<DescriptorTag>boxData.get(reader.increaseOffset(1)) !== DescriptorTag.ES_DescrTag) {
            throw new Error("Invalid Elementary Stream Descriptor, missing tag.");
        }

        // We have a descriptor tag. Check that the remainder of the tag is at least
        // [
        //   Base (3 bytes) +
        //   DecoderConfigDescriptor (15 bytes) +
        //   SLConfigDescriptor (3 bytes) + OtherDescriptors
        // ] bytes long
        const esLength: number = reader.readLength();
        let minEsLength: number = 3 + 15 + 3; // Base minimum length

        if (esLength < minEsLength) {
            throw new Error("Insufficient data present.");
        }

        instance.streamId = boxData.subarray(reader.offset, 2).toUshort();
        reader.increaseOffset(2); // Done with ES_ID

        // 1st bit
        const flagByte = boxData.get(reader.offset);
        instance.streamDependenceFlag = NumberUtils.uintAnd(NumberUtils.uintRShift(flagByte, 7),0x1) === 0x1;

        // 2nd bit
        instance.urlFlag = NumberUtils.uintAnd(NumberUtils.uintRShift(flagByte, 6), 0x1) === 0x1;

        // 3rd bit
        instance.ocrStreamFlag = NumberUtils.uintAnd(NumberUtils.uintRShift(flagByte, 5), 0x1) === 0x1;

        // Last 5 bits and we're done with this byte
        instance.streamPriority = NumberUtils.uintAnd(flagByte, 0x1f);

        reader.increaseOffset(1);

        if (instance.streamDependenceFlag) {
            minEsLength += 2; // We need 2 more bytes

            if (esLength < minEsLength) {
                throw new Error("Insufficient data present.");
            }

            instance.dependsOnEsId = boxData.subarray(reader.offset, 2).toUshort();
            reader.increaseOffset(2); // Done with stream dependence
        }

        if (instance.urlFlag) {
            minEsLength += 2; // We need 1 more byte

            if (esLength < minEsLength) {
                throw new Error("Insufficient data present.");
            }

            instance.urlLength = boxData.get(reader.increaseOffset(1)); // URL Length
            minEsLength += instance.urlLength; // We need URLength more bytes

            if (esLength < minEsLength) {
                throw new Error("Insufficient data present.");
            }

            // URL name
            instance.urlString = boxData.subarray(reader.offset, instance.urlLength).toString(StringType.UTF8);
            reader.increaseOffset(instance.urlLength);
        }

        if (instance.ocrStreamFlag) {
            minEsLength += 2; // We need 2 more bytes

            if (esLength < minEsLength) {
                throw new Error("Insufficient data present.");
            }

            instance.ocrEsId = boxData.subarray(reader.offset, 2).toUshort();
            reader.increaseOffset(2); // Done with OCR
        }

        // Loop through all trailing Descriptors Tags
        while (reader.offset < instance.dataSize) {
            const tag: DescriptorTag = <DescriptorTag>boxData.get(reader.increaseOffset(1));

            switch (tag) {
                case DescriptorTag.DecoderConfigDescrTag: // DecoderConfigDescriptor
                {
                    /**
                     * Check that the remainder of the tag is at least 13 bytes long
                     * (13 + DecoderSpecificInfo[] + profileLevelIndicationIndexDescriptor[])
                     */
                    if (reader.readLength() < 13) {
                        throw new Error("Could not read data. Too small.");
                    }

                    // Read a lot of good info.
                    instance.objectTypeId = boxData.get(reader.offset);
                    reader.increaseOffset(1);

                    // First 6 bits
                    const streamByte = boxData.get(reader.offset);
                    instance.streamType = NumberUtils.uintRShift(streamByte, 2);

                    // 7th bit and we're done with the stream bits
                    instance.upStream = NumberUtils.uintAnd(NumberUtils.uintRShift(streamByte, 1), 0x1) === 0x1;
                    reader.increaseOffset(1);

                    instance.bufferSizeDB = boxData.subarray(reader.offset, 3).toUint();
                    reader.increaseOffset(3); // Done with bufferSizeDB

                    const maximumBitrate: number = boxData.subarray(reader.offset, 4).toUint();
                    instance.maximumBitrate = AppleElementaryStreamDescriptor.calculateBitRate(maximumBitrate);
                    reader.increaseOffset(4); // Done with maxBitrate

                    const averageBitrate: number = boxData.subarray(reader.offset, 4).toUint();
                    instance.averageBitrate = AppleElementaryStreamDescriptor.calculateBitRate(averageBitrate);
                    reader.increaseOffset(4); // Done with avgBitrate

                    // If there's a DecoderSpecificInfo[] array at the end it'll pick it up in the while loop
                }
                    break;

                case DescriptorTag.DecSpecificInfoTag: // DecoderSpecificInfo
                {
                    // The rest of the info is decoder specific.
                    const length: number = reader.readLength();

                    instance.decoderConfig = boxData.subarray(reader.offset, length);
                    reader.increaseOffset(length); // We're done with the config
                }
                    break;

                case DescriptorTag.SLConfigDescrTag: // SLConfigDescriptor
                {
                    // The rest of the info is SL specific.
                    const length: number = reader.readLength();

                    // Skip the rest of the descriptor as reported in the length so we can move onto the next one
                    reader.increaseOffset(length);
                }
                    break;

                case DescriptorTag.Forbidden_00:
                case DescriptorTag.Forbidden_FF:
                    throw new Error("Invalid Descriptor tag.");
                default: {
                    /**
                     * TODO: Should we handle other optional descriptor tags?
                     * ExtensionDescriptor extDescr[0 .. 255];
                     * LanguageDescriptor langDescr[0 .. 1];
                     * IPI_DescPointer ipiPtr[0 .. 1];
                     * IP_IdentificationDataSet ipIDS[0 .. 1];
                     * QoS_Descriptor qosDescr[0 .. 1];
                     */
                        // Every descriptor starts with a length
                    const length: number = reader.readLength();

                    // Skip the rest of the descriptor as reported in the length so we can move onto the next one
                    reader.increaseOffset(length);

                    break;
                }
            }
        }

        return instance;
    }

    /** @inheritDoc */
    public get boxClassType(): Mpeg4BoxClassType { return Mpeg4BoxClassType.AppleElementaryStreamDescriptor; }

    public static calculateBitRate(bitrate: number): number {
        return bitrate / 1000;
    }
}