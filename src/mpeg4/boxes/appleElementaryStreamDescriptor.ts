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
    private _dependsOnEsId: number;
    private _streamDependenceFlag: boolean;
    private _ocrStreamFlag: boolean;
    private _ocrEsId: number;
    private _urlFlag: boolean;
    private _urlLength: number;
    private _urlString: string;
    private _upStream: boolean;
    private _maximumBitrate: number;
    private _averageBitrate: number;
    private _streamId: number;
    private _streamPriority: number;
    private _objectTypeId: number;
    private _streamType: number;
    private _bufferSizeDB: number;
    private _decoderConfig: ByteVector;

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
        // ES_Descriptor Specifications
        // Section 7.2.6.5 http://ecee.colorado.edu/~ecen5653/ecen5653/papers/ISO%2014496-1%202004.PDF

        const instance = new AppleElementaryStreamDescriptor();
        instance.initializeFromHeaderFileAndHandler(header, file, handlerType);
        const boxData = file.readBlock(instance.dataSize);
        instance._decoderConfig = ByteVector.empty();
        const reader = new DescriptorTagReader(boxData);

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
        const esLength = reader.readLength();
        let minEsLength = 3 + 15 + 3; // Base minimum length

        if (esLength < minEsLength) {
            throw new Error("Insufficient data present.");
        }

        instance._streamId = boxData.subarray(reader.offset, 2).toUshort();
        reader.increaseOffset(2); // Done with ES_ID

        // 1st bit
        const flagByte = boxData.get(reader.offset);
        instance._streamDependenceFlag = NumberUtils.uintAnd(NumberUtils.uintRShift(flagByte, 7),0x1) === 0x1;

        // 2nd bit
        instance._urlFlag = NumberUtils.uintAnd(NumberUtils.uintRShift(flagByte, 6), 0x1) === 0x1;

        // 3rd bit
        instance._ocrStreamFlag = NumberUtils.uintAnd(NumberUtils.uintRShift(flagByte, 5), 0x1) === 0x1;

        // Last 5 bits and we're done with this byte
        instance._streamPriority = NumberUtils.uintAnd(flagByte, 0x1f);

        reader.increaseOffset(1);

        if (instance._streamDependenceFlag) {
            minEsLength += 2; // We need 2 more bytes

            if (esLength < minEsLength) {
                throw new Error("Insufficient data present.");
            }

            instance._dependsOnEsId = boxData.subarray(reader.offset, 2).toUshort();
            reader.increaseOffset(2); // Done with stream dependence
        }

        if (instance._urlFlag) {
            minEsLength += 2; // We need 1 more byte

            if (esLength < minEsLength) {
                throw new Error("Insufficient data present.");
            }

            instance._urlLength = boxData.get(reader.increaseOffset(1)); // URL Length
            minEsLength += instance._urlLength; // We need URLength more bytes

            if (esLength < minEsLength) {
                throw new Error("Insufficient data present.");
            }

            // URL name
            instance._urlString = boxData.subarray(reader.offset, instance._urlLength).toString(StringType.UTF8);
            reader.increaseOffset(instance._urlLength);
        }

        if (instance._ocrStreamFlag) {
            minEsLength += 2; // We need 2 more bytes

            if (esLength < minEsLength) {
                throw new Error("Insufficient data present.");
            }

            instance._ocrEsId = boxData.subarray(reader.offset, 2).toUshort();
            reader.increaseOffset(2); // Done with OCR
        }

        // Loop through all trailing Descriptors Tags
        while (reader.offset < instance.dataSize) {
            const tag = <DescriptorTag>boxData.get(reader.increaseOffset(1));
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
                    instance._objectTypeId = boxData.get(reader.offset);
                    reader.increaseOffset(1);

                    // First 6 bits
                    const streamByte = boxData.get(reader.offset);
                    instance._streamType = NumberUtils.uintRShift(streamByte, 2);

                    // 7th bit and we're done with the stream bits
                    instance._upStream = NumberUtils.uintAnd(NumberUtils.uintRShift(streamByte, 1), 0x1) === 0x1;
                    reader.increaseOffset(1);

                    instance._bufferSizeDB = boxData.subarray(reader.offset, 3).toUint();
                    reader.increaseOffset(3); // Done with bufferSizeDB

                    const maximumBitrate = boxData.subarray(reader.offset, 4).toUint();
                    instance._maximumBitrate = AppleElementaryStreamDescriptor.calculateBitRate(maximumBitrate);
                    reader.increaseOffset(4); // Done with maxBitrate

                    const averageBitrate = boxData.subarray(reader.offset, 4).toUint();
                    instance._averageBitrate = AppleElementaryStreamDescriptor.calculateBitRate(averageBitrate);
                    reader.increaseOffset(4); // Done with avgBitrate

                    // If there's a DecoderSpecificInfo[] array at the end it'll pick it up in the while loop
                }
                    break;

                case DescriptorTag.DecSpecificInfoTag: // DecoderSpecificInfo
                {
                    // The rest of the info is decoder specific.
                    const length = reader.readLength();

                    instance._decoderConfig = boxData.subarray(reader.offset, length);
                    reader.increaseOffset(length); // We're done with the config
                }
                    break;

                case DescriptorTag.SLConfigDescrTag: // SLConfigDescriptor
                {
                    // The rest of the info is SL specific.
                    const length = reader.readLength();

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
                    const length = reader.readLength();

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

    /**
     * Gets the maximum average the stream described by the current instance.
     */
    public get averageBitrate(): number { return this._averageBitrate; }

    /**
     * Gets the buffer size DB value the stream described by the current instance.
     */
    public get bufferSizeDB(): number { return this._bufferSizeDB; }

    /**
     * Gets the decoder config data of stream described by the current instance.
     */
    public get decoderConfig(): ByteVector { return this._decoderConfig; }

    /**
     * Gets the ES_ID of another elementary stream on which this elementary stream depends
     */
    public get dependsOnEsId(): number { return this._dependsOnEsId; }

    /**
     * Gets the maximum bitrate the stream described by the current instance.
     */
    public get maximumBitrate(): number { return this._maximumBitrate; }

    /**
     * Gets the object type ID of the stream described by the current instance.
     */
    public get objectTypeId(): number { return this._objectTypeId; }

    /**
     * Gets the OCR ES_ID
     */
    public get ocrEsId(): number { return this._ocrEsId; }

    /**
     * Gets the OCR Stream Flag
     */
    public get ocrStreamFlag(): boolean { return this._ocrStreamFlag; }

    /**
     * Gets a value indicating that a dependsOn_ES_ID will follow
     */
    public get streamDependenceFlag(): boolean { return this._streamDependenceFlag; }

    /**
     * Gets the ID of the stream described by the current instance.
     */
    public get streamId(): number { return this._streamId; }

    /**
     * Gets the type of stream described by the current instance.
     */
    public get streamType(): number { return this._streamType; }

    /**
     * Gets the priority of the stream described by the current instance.
     */
    public get streamPriority(): number { return this._streamPriority; }

    /**
     * Gets a value indicating that this stream is used for upstream information
     */
    public get upStream(): boolean { return this._upStream; }

    /**
     * Gets a value indicating that a URL string will follow
     */
    public get urlFlag(): boolean { return this._urlFlag; }

    /**
     * Gets the length of URL String
     */
    public get urlLength(): number { return this._urlLength; }

    /**
     * Gets the URL string that points to the location of an SL-packetized stream by name.
     */
    public get urlString(): string { return this._urlString; }

    private static calculateBitRate(bitrate: number): number {
        return bitrate / 1000;
    }
}