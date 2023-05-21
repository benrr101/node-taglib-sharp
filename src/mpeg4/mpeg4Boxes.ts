import { ByteVector, StringType } from "../byteVector";
import { File } from "../file";
import { IAudioCodec, IVideoCodec, MediaTypes } from "../properties";
import { Guards, NumberUtils, StringUtils } from "../utils";
import { AppleDataBoxFlagType } from "./appleDataBoxFlagType";
import { DescriptorTagReader } from "./descriptorTagReader";
import { DescriptorTag } from "./descriptorTag";
import Mpeg4BoxFactory from "./mpeg4BoxFactory";
import Mpeg4BoxHeader from "./mpeg4BoxHeader";
import Mpeg4BoxType from "./mpeg4BoxType";

/**
 * This file contains all boxes. All boxes had to be grouped into a single file due to circular dependencies
 * (e.g.: Mpeg4Box imports IsoHandlerBox while IsoHandlerBox extends Mpeg4Box and thus imports Mpeg4Box).
 * These circular dependencies cause runtime error: "Cannot access Mpeg4Box before initialization".
 * Below is an index of all classes contained in this file. This allows quick jumping to them.
 * @see Mpeg4Box
 * @see FullBox
 * @see AppleAdditionalInfoBox
 * @see AppleAnnotationBox
 * @see AppleDataBox
 * @see AppleElementaryStreamDescriptor
 * @see AppleItemListBox
 * @see IsoSampleEntry
 * @see IsoAudioSampleEntry
 * @see IsoChunkLargeOffsetBox
 * @see IsoChunkOffsetBox
 * @see IsoFreeSpaceBox
 * @see IsoHandlerBox
 * @see IsoMetaBox
 * @see IsoMovieHeaderBox
 * @see IsoSampleDescriptionBox
 * @see IsoSampleTableBox
 * @see IsoUserDataBox
 * @see IsoVisualSampleEntry
 * @see TextBox
 * @see UnknownBox
 * @see UrlBox
 */

/**
 * This class provides a generic implementation of a ISO/IEC 14496-12 box.
 */
export class Mpeg4Box {
    /**
     * Contains he data contained in the current instance.
     */
    private _data: ByteVector;

    /**
     * Contains the box header.
     */
    private _header: Mpeg4BoxHeader;

    /**
     * Contains the position of the box data.
     */
    private _baseDataPosition: number;

    /**
     * Contains the position of the data contained in the current instance, after any box specific headers.
     */
    private _dataPosition: number;

    /**
     * Gets the position of the data contained in the current instance, after any box specific headers.
     */
    public get dataPosition(): number {
        return this._dataPosition;
    }

    /**
     * The handler box that applies to the current instance.
     */
    private _handler: IsoHandlerBox;

    /**
     * The children of the current instance.
     */
    public children: Mpeg4Box[];

    /**
     * Protected constructor to force construction via static functions.
     */
    protected constructor() { }

    /**
     * Initializes a new instance of @see Mpeg4Box with a specified header and handler.
     * @param header A @see Mpeg4BoxHeader object describing the new instance.
     * @param handler A @see IsoHandlerBox object containing the handler that applies to the new instance,
     * or undefined if no handler applies.
     */
    protected initializeFromHeaderAndHandler(header: Mpeg4BoxHeader, handler: IsoHandlerBox): void {
        this._header = header;
        this._baseDataPosition = header.position + header.headerSize;
        this._dataPosition = this._baseDataPosition;
        this._handler = handler;
    }

    /**
     * Initializes a new instance of @see Mpeg4Box with a specified header.
     * @param header A @see Mpeg4BoxHeader object describing the new instance.
     */
    protected initializeFromHeader(header: Mpeg4BoxHeader): void {
        return this.initializeFromHeaderAndHandler(header, undefined);
    }

    /**
     * Initializes a new instance of @see Mpeg4Box with a specified box type.
     * @param type A @see ByteVector object containing the box type to use for the new instance.
     */
    protected initializeFromType(type: ByteVector): void {
        return this.initializeFromHeader(Mpeg4BoxHeader.fromType(type));
    }

    /**
     * Gets the MPEG-4 box type of the current instance.
     */
    public get boxType(): ByteVector {
        return this._header.boxType;
    }

    /**
     * Gets the total size of the current instance as it last appeared on disk.
     */
    public get size(): number {
        return this._header.totalBoxSize;
    }

    /**
     * Gets and sets the data contained in the current instance.
     */
    public get data(): ByteVector {
        return this._data;
    }
    public set data(v: ByteVector) {
        this._data = v;
    }

    /**
     * Gets whether or not the current instance has children.
     */
    public get hasChildren(): boolean {
        return this.children && this.children.length > 0;
    }

    /**
     * Gets the handler box that applies to the current instance.
     */
    public get handler(): IsoHandlerBox {
        return this._handler;
    }

    /**
     * Gets the size of the data contained in the current instance, minus the size of any box specific headers.
     */
    protected get dataSize(): number {
        return this._header.dataSize + this._baseDataPosition - this.dataPosition;
    }

    /**
     * Gets the header of the current instance.
     */
    protected get header(): Mpeg4BoxHeader {
        return this._header;
    }

    /**
     * Renders the current instance, including its children, to a new ByteVector object.
     * @returns A @see ByteVector object containing the rendered version of the current instance.
     */
    public render(): ByteVector {
        return this.renderUsingTopData(ByteVector.empty());
    }

    /**
     *  Gets a child box from the current instance by finding a matching box type.
     * @param type  A @see ByteVector object containing the box type to match.
     * @returns  A @see Mpeg4Box object containing the matched box, or undefined if no matching box was found.
     */
    public getChild(type: ByteVector): Mpeg4Box {
        if (!this.children) {
            return undefined;
        }

        for (const box of this.children) {
            if (ByteVector.equals(box.boxType, type)) {
                return box;
            }
        }

        return undefined;
    }

    /**
     * Gets all child boxes from the current instance by finding a matching box type.
     * @param type A @see ByteVector object containing the box type to match.
     * @returns A @see Mpeg4Box[] object containing the matched box, or undefined if no matching boxes was found.
     */
    public getChildren(type: ByteVector): Mpeg4Box[] {
        if (!this.children) {
            return undefined;
        }

        const boxes: Mpeg4Box[] = [];

        for (const box of this.children) {
            if (ByteVector.equals(box.boxType, type)) {
                boxes.push(box);
            }
        }

        if (boxes.length > 0) {
            return boxes;
        }

        return undefined;
    }

    /**
     * Gets a child box from the current instance by finding a matching box type, searching recursively.
     * @param type  A @see ByteVector object containing the box type to match.
     * @returns A @see Mpeg4Box object containing the matched box, or undefined if no matching box was found.
     */
    public getChildRecursively(type: ByteVector): Mpeg4Box {
        if (!this.children) {
            return undefined;
        }

        for (const box of this.children) {
            if (ByteVector.equals(box.boxType, type)) {
                return box;
            }
        }

        for (const box of this.children) {
            const childBox: Mpeg4Box = box.getChildRecursively(type);

            if (childBox) {
                return childBox;
            }
        }

        return undefined;
    }

    /**
     * Removes all children with a specified box type from the current instance.
     * @param type A @see ByteVector object containing the box type to remove.
     */
    public removeChildByType(type: ByteVector): void {
        if (!this.children) {
            return;
        }

        for (const box of this.children) {
            if (ByteVector.equals(box.boxType, type)) {
                const index = this.children.indexOf(box);

                if (index > -1) {
                    this.children.splice(index, 1);
                }
            }
        }
    }

    /**
     * Removes a specified box from the current instance.
     * @param box A @see Mpeg4Box object to remove from the current instance.
     */
    public removeChildByBox(box: Mpeg4Box): void {
        if (!this.children) {
            return;
        }

        const index = this.children.indexOf(box);

        if (index > -1) {
            this.children.splice(index, 1);
        }
    }

    /**
     * Adds a specified box to the current instance.
     * @param box A @see Mpeg4Box object to add to the current instance.
     */
    public addChild(box: Mpeg4Box): void {
        if (!this.children) {
            return;
        }

        this.children.push(box);
    }

    /**
     * Removes all children from the current instance.
     */
    public clearChildren(): void {
        if (!this.children) {
            return;
        }

        this.children = [];
    }

    /**
     * Loads the children of the current instance from a specified file using the internal data position and size.
     * @param file The File from which the current instance was read and from which to read the children.
     * @returns A @see Mpeg4Box[] object enumerating the boxes read from the file.
     */
    public loadChildren(file: File): Mpeg4Box[] {
        Guards.notNullOrUndefined(file, "file");

        const children: Mpeg4Box[] = [];

        let position: number = this.dataPosition;
        const end: number = position + this.dataSize;

        this._header.box = this;

        while (position < end) {
            const child: Mpeg4Box = Mpeg4BoxFactory.createBoxFromFilePositionParentHandlerAndIndex(
                file,
                position,
                this._header,
                this.handler,
                children.length
            );

            if (child.size === 0) {
                break;
            }

            children.push(child);
            position += child.size;
        }

        this._header.box = undefined;

        return children;
    }

    /**
     * Loads the data of the current instance from a specified file using the internal data position and size.
     * @param file The @see File from which the current instance was read and from which to read the data.
     * @returns A @see ByteVector object containing the data read from the file.
     */
    public loadData(file: File): ByteVector {
        Guards.notNullOrUndefined(file, "file");

        file.seek(this.dataPosition);

        return file.readBlock(this.dataSize);
    }

    /**
     * Renders the current instance, including its children, to a new @see ByteVector object, preceding the
     * contents with a specified block of data.
     * @param topData  A @see ByteVector object containing box specific header data to precede the content.
     * @returns A @see ByteVector object containing the rendered version of the current instance.
     */
    protected renderUsingTopData(topData: ByteVector): ByteVector {
        let freeFound = false;
        const output: ByteVector = ByteVector.empty();

        if (this.children) {
            for (const box of this.children) {
                if (box instanceof IsoFreeSpaceBox) {
                    freeFound = true;
                } else {
                    output.addByteVector(box.render());
                }
            }
        } else if (this.data) {
            output.addByteVector(this.data);
        }

        // If there was a free, don't take it away, and let meta be a special case.
        if (freeFound || ByteVector.equals(this.boxType, Mpeg4BoxType.Meta)) {
            const sizeDifference: number = this.dataSize - output.length;

            if (this._header.dataSize !== 0 && sizeDifference >= 8) {
                // If we have room for free space, add it so we don't have to resize the file.
                output.addByteVector(IsoFreeSpaceBox.fromPadding(sizeDifference).render());
            } else {
                // If we're getting bigger, get a lot bigger so we might not have to again.
                output.addByteVector(IsoFreeSpaceBox.fromPadding(2048).render());
            }
        }

        // Adjust the header's data size to match the content.
        this._header.dataSize = topData.length + output.length;

        // Render the full box.
        output.splice(0, 0, topData);
        output.splice(0, 0, this._header.render());

        return output;
    }

    /**
     * Increases the data position by a given value. This function can be used by boxes
     * which extend from @see Mpeg4Box to increase the data position, because the data
     * is located after their box specific headers.
     * @param value The value to add to the data position.
     * @returns The value of the data position before the increase.
     */
    public increaseDataPosition(value: number): number {
        const dataPositionBeforeIncrease: number = this._dataPosition;

        this._dataPosition += value;

        return dataPositionBeforeIncrease;
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * This class extends @see Mpeg4Box to provide an implementation of a ISO/IEC 14496-12 FullBox.
 */
export class FullBox extends Mpeg4Box {
    /**
     * Gets and sets the version number of the current instance.
     */
    public version: number;

    /**
     * Gets and sets the flags that apply to the current instance.
     */
    public flags: number;

    /**
     * Protected constructor to force construction via static functions.
     */
    protected constructor() {
        super();
    }

    /**
     * Initializes a new instance of @see FullBox with a provided header and handler
     * by reading the contents from a specified file.
     * @param header A @see Mpeg4BoxHeader object containing the header to use for the new instance.
     * @param file A @see File object to read the contents of the box from.
     * @param handler A @see IsoHandlerBox object containing the handler that applies to the new instance.
     */
    protected initializeFromHeaderFileAndHandler(header: Mpeg4BoxHeader, file: File, handler: IsoHandlerBox): void {
        Guards.notNullOrUndefined(file, "file");

        this.initializeFromHeaderAndHandler(header, handler);
        const dataPositionBeforeIncrease: number = this.increaseDataPosition(4);

        file.seek(dataPositionBeforeIncrease);
        const headerData: ByteVector = file.readBlock(4);

        this.version = headerData.get(0);
        this.flags = headerData.subarray(1, 3).toUint();
    }

    /**
     * Initializes a new instance of @see FullBox with a provided header, version, and flags.
     * @param header A @see Mpeg4BoxHeader object containing the header to use for the new instance.
     * @param version A value containing the version of the new instance.
     */
    protected initializeFromHeaderVersionAndFlags(header: Mpeg4BoxHeader, version: number, flags: number): void {
        this.initializeFromHeader(header);
        this.increaseDataPosition(4);

        this.version = version;
        this.flags = flags;
    }

    /**
     * Initializes a new instance of @see FullBox with a provided header, version, and flags.
     * @param type A @see ByteVector object containing the four byte box type.
     * @param version A value containing the version of the new instance.
     * @param flags A value containing the flags for the new instance.
     * @returns A new instance of @see FullBox.
     */
    protected initializeFromTypeVersionAndFlags(type: ByteVector, version: number, flags: number): void {
        return this.initializeFromHeaderVersionAndFlags(Mpeg4BoxHeader.fromType(type), version, flags);
    }

    /**
     * Renders the current instance, including its children, to a new @see ByteVector object, preceding the
     * contents with a specified block of data.
     * @param topData A @see ByteVector object containing box specific header data to precede the content.
     * @returns A @see ByteVector object containing the rendered version of the current instance.
     */
    protected renderUsingTopData(topData: ByteVector): ByteVector {
        const output: ByteVector = ByteVector.concatenate(this.version, ByteVector.fromUint(this.flags).subarray(1, 3), topData);

        return super.renderUsingTopData(output);
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 *  This class extends @see FullBox to provide an implementation of an Apple AdditionalInfoBox.
 */
export class AppleAdditionalInfoBox extends FullBox {
    /**
     * Private constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance of @see AppleAdditionalInfoBox with a provided header
     * and handler by reading the contents from a specified file.
     * @param header A @see Mpeg4BoxHeader object containing the header to use for the new instance.
     * @param file A @see File object to read the contents of the box from.
     * @param handler A @see IsoHandlerBox object containing the handler that applies to the new instance.
     * @returns A new instance of @see AppleAdditionalInfoBox.
     */
    public static fromHeaderFileAndHandler(header: Mpeg4BoxHeader, file: File, handler: IsoHandlerBox): AppleAdditionalInfoBox {
        const instance: AppleAdditionalInfoBox = new AppleAdditionalInfoBox();
        instance.initializeFromHeaderFileAndHandler(header, file, handler);
        instance.data = file.readBlock(instance.dataSize > 0 ? instance.dataSize : 0);

        return instance;
    }

    /**
     * Constructs and initializes a new instance of @see FullBox with a provided header, version, and flags.
     * @param type A @see Mpeg4BoxHeader object containing the header to use for the new instance.
     * @param version A value containing the version of the new instance.
     * @param flags A value containing the flags for the new instance.
     * @returns A new instance of @see FullBox.
     */
    public static fromTypeVersionAndFlags(type: ByteVector, version: number, flags: number): AppleAdditionalInfoBox {
        const instance: AppleAdditionalInfoBox = new AppleAdditionalInfoBox();
        instance.initializeFromTypeVersionAndFlags(type, version, flags);

        return instance;
    }

    /**
     * Gets and sets the text contained in the current instance.
     */
    public get text(): string {
        return StringUtils.trimStart(this.data.toString(StringType.Latin1), "\0");
    }
    public set text(v: string) {
        this.data = ByteVector.fromString(v, StringType.Latin1);
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * This class extends @see Mpeg4Box to provide an implementation of an Apple AnnotationBox.
 */
export default class AppleAnnotationBox extends Mpeg4Box {
    /**
     * Private constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance of @see AppleAnnotationBox with a provided header and
     * handler by reading the contents from a specified file.
     * @param header A @see Mpeg4BoxHeader object containing the header to use for the new instance.
     * @param file A @see File object to read the contents of the box from.
     * @param handler A @see IsoHandlerBox object containing the handler that applies to the new instance.
     * @returns A new instance of @see AppleAnnotationBox
     */
    public static fromHeaderFileAndHandler(header: Mpeg4BoxHeader, file: File, handler: IsoHandlerBox): AppleAnnotationBox {
        Guards.notNullOrUndefined(file, "file");

        const instance: AppleAnnotationBox = new AppleAnnotationBox();
        instance.initializeFromHeaderAndHandler(header, handler);
        instance.children = instance.loadChildren(file);

        return instance;
    }

    /**
     * Constructs and initializes a new instance of @see AppleAnnotationBox of specified type with no children.
     * @param type A @see ByteVector object containing a 4-byte box type.
     * @returns A new instance of @see AppleAnnotationBox
     */
    public static fromType(type: ByteVector): AppleAnnotationBox {
        const instance: AppleAnnotationBox = new AppleAnnotationBox();
        instance.initializeFromType(type);
        instance.children = [];

        return instance;
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * This class extends @see FullBox to provide an implementation of an Apple DataBox.
 */
export class AppleDataBox extends FullBox {
    /**
     * Private constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance of @see AppleDataBox with a provided header and handler
     * by reading the contents from a specified file.
     * @param header A @see Mpeg4BoxHeader  object containing the header to use for the new instance.
     * @param file A @see File object to read the contents of the box from.
     * @param handler A @see IsoHandlerBox object containing the handler that applies to the new instance.
     * @returns A new instance of @see AppleDataBox
     */
    public static fromHeaderFileAndHandler(header: Mpeg4BoxHeader, file: File, handler: IsoHandlerBox): AppleDataBox {
        Guards.notNullOrUndefined(file, "file");

        const instance: AppleDataBox = new AppleDataBox();
        instance.initializeFromHeaderFileAndHandler(header, file, handler);
        instance.increaseDataPosition(4);
        instance.data = instance.loadData(file);

        return instance;
    }

    /**
     * Constructs and initializes a new instance of @see AppleDataBox with specified data and flags.
     * @param data A @see ByteVector object containing the data to store in the new instance.
     * @param flags A value containing flags to use for the new instance.
     * @returns
     */
    public static fromDataAndFlags(data: ByteVector, flags: number): AppleDataBox {
        const instance: AppleDataBox = new AppleDataBox();
        instance.initializeFromTypeVersionAndFlags(ByteVector.fromString("data", StringType.UTF8), 0, flags);
        instance.increaseDataPosition(4);
        instance.data = data;

        return instance;
    }

    /**
     * Gets and sets the text contained in the current instance.
     */
    public get text(): string {
        return (this.flags & (<number>AppleDataBoxFlagType.ContainsText)) !== 0 ? this.data.toString(StringType.UTF8) : undefined;
    }
    public set text(v: string) {
        this.flags = <number>AppleDataBoxFlagType.ContainsText;
        this.data = ByteVector.fromString(v, StringType.UTF8);
    }

    /**
     * Renders the current instance, including its children, to a new @see ByteVector object, preceding the
     * contents with a specified block of data.
     * @param topData A @see ByteVector object containing box specific header data to precede the content.
     * @returns
     */
    protected renderUsingTopData(topData: ByteVector): ByteVector {
        const output: ByteVector = ByteVector.concatenate(ByteVector.fromSize(4), topData);

        return super.renderUsingTopData(output);
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * This class extends @see FullBox to provide an implementation of an Apple ElementaryStreamDescriptor.
 * This box may appear as a child of a @see IsoAudioSampleEntry and provided further information about an audio stream.
 */
export class AppleElementaryStreamDescriptor extends FullBox {
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
     * @param handler A @see IsoHandlerBox object containing the handler that applies to the new instance.
     * @returns A new instance of @see AppleElementaryStreamDescriptor
     */
    public static fromHeaderFileAndHandler(header: Mpeg4BoxHeader, file: File, handler: IsoHandlerBox): AppleElementaryStreamDescriptor {
        /* ES_Descriptor Specifications
         *  Section 7.2.6.5 http://ecee.colorado.edu/~ecen5653/ecen5653/papers/ISO%2014496-1%202004.PDF
         */

        const instance: AppleElementaryStreamDescriptor = new AppleElementaryStreamDescriptor();
        instance.initializeFromHeaderFileAndHandler(header, file, handler);
        const boxData: ByteVector = file.readBlock(instance.dataSize);
        instance.decoderConfig = ByteVector.empty();
        const reader: DescriptorTagReader = new DescriptorTagReader(boxData);

        // Elementary Stream Descriptor Tag
        if (<DescriptorTag>boxData.get(reader.increaseOffset(1)) !== DescriptorTag.ES_DescrTag) {
            throw new Error("Invalid Elementary Stream Descriptor, missing tag.");
        }

        // We have a descriptor tag. Check that the remainder of the tag is at least
        // [Base (3 bytes) + DecoderConfigDescriptor (15 bytes) + SLConfigDescriptor (3 bytes) + OtherDescriptors] bytes long
        const esLength: number = reader.readLength();
        let minEsLength: number = 3 + 15 + 3; // Base minimum length

        if (esLength < minEsLength) {
            throw new Error("Insufficient data present.");
        }

        instance.streamId = boxData.subarray(reader.offset, 2).toUshort();
        reader.increaseOffset(2); // Done with ES_ID

        // 1st bit
        instance.streamDependenceFlag = (NumberUtils.uintAnd(NumberUtils.uintRShift(boxData.get(reader.offset), 7), 0x1)) === 0x1;

        // 2nd bit
        instance.urlFlag = (NumberUtils.uintAnd(NumberUtils.uintRShift(boxData.get(reader.offset), 6), 0x1)) === 0x1;

        // 3rd bit
        instance.ocrStreamFlag = (NumberUtils.uintAnd(NumberUtils.uintRShift(boxData.get(reader.offset), 5), 0x1)) === 0x1;

        // Last 5 bits and we're done with this byte
        instance.streamPriority = (NumberUtils.uintAnd(boxData.get(reader.increaseOffset(1)), 0x1f));

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

            instance.urlString = boxData.subarray(reader.offset, instance.urlLength).toString(StringType.UTF8); // URL name
            reader.increaseOffset(instance.urlLength); // Done with URL name
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
                        instance.objectTypeId = boxData.get(reader.increaseOffset(1));

                        // First 6 bits
                        instance.streamType = NumberUtils.uintRShift(boxData.get(reader.offset), 2);

                        // 7th bit and we're done with the stream bits
                        instance.upStream = (NumberUtils.uintAnd(NumberUtils.uintRShift(boxData.get(reader.increaseOffset(1)), 1), 0x1)) === 0x1;

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

    public static calculateBitRate(bitrate: number): number {
        return bitrate / 1000;
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * This class extends @see Mpeg4Box to provide an implementation of an Apple ItemListBox.
 */
export class AppleItemListBox extends Mpeg4Box {
    /**
     * Private constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance of @see AppleItemListBox with a provided header and
     * handler by reading the contents from a specified file.
     * @param header A @see Mpeg4BoxHeader object containing the header to use for the new instance.
     * @param file A @see File object to read the contents of the box from.
     * @param handler A @see IsoHandlerBox object containing the handler that applies to the new instance.
     * @returns A new instance of @see AppleItemListBox
     */
    public static fromHeaderFileAndHandler(header: Mpeg4BoxHeader, file: File, handler: IsoHandlerBox): AppleItemListBox {
        Guards.notNullOrUndefined(file, "file");

        const instance: AppleItemListBox = new AppleItemListBox();

        instance.initializeFromHeaderAndHandler(header, handler);
        instance.children = instance.loadChildren(file);

        return instance;
    }

    /**
     * Constructs and initializes a new instance of @see AppleItemListBox with no children.
     * @returns A new instance of @see AppleItemListBox
     */
    public static fromEmpty(): AppleItemListBox {
        const instance: AppleItemListBox = new AppleItemListBox();
        instance.initializeFromType(ByteVector.fromString("ilst", StringType.UTF8));
        instance.children = [];

        return instance;
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * This class extends @see Mpeg4Box to provide an implementation of a ISO/IEC 14496-12 SampleEntry.
 */
export class IsoSampleEntry extends Mpeg4Box {
    /**
     * The data reference index of the current instance.
     */
    private _dataReferenceIndex: number;

    /**
     * Protected constructor to force construction via static functions.
     */
    protected constructor() {
        super();
    }

    /**
     * Initializes a new instance of @see IsoSampleEntry with a provided header and
     * handler by reading the contents from a specified file.
     * @param header A @see Mpeg4BoxHeader object containing the header to use for the new instance.
     * @param file A @see File object to read the contents of the box from.
     * @param handler A @see IsoHandlerBox object containing the handler that applies to the new instance.
     * @returns A new instance of @see IsoSampleEntry
     */
    public static fromHeaderFileAndHandler(header: Mpeg4BoxHeader, file: File, handler: IsoHandlerBox): IsoSampleEntry {
        Guards.notNullOrUndefined(file, "file");

        const instance: IsoSampleEntry = new IsoSampleEntry();
        instance.initializeFromHeaderFileAndHandler(header, file, handler);

        return instance;
    }

    /**
     * Constructs and initializes a new instance of @see IsoSampleEntry with a provided header and
     * handler by reading the contents from a specified file.
     * @param header A @see Mpeg4BoxHeader object containing the header to use for the new instance.
     * @param file A @see File object to read the contents of the box from.
     * @param handler A @see IsoHandlerBox object containing the handler that applies to the new instance.
     */
    public initializeFromHeaderFileAndHandler(header: Mpeg4BoxHeader, file: File, handler: IsoHandlerBox): void {
        Guards.notNullOrUndefined(file, "file");

        this.initializeFromHeaderAndHandler(header, handler);
        const dataPositionBeforeIncrease: number = this.increaseDataPosition(8);
        file.seek(dataPositionBeforeIncrease + 6);
        this._dataReferenceIndex = file.readBlock(2).toUshort();
    }

    /**
     * Gets the data reference index of the current instance.
     * @return A value containing the data reference index of the current instance.
     */
    public get dataReferenceIndex(): number {
        return this._dataReferenceIndex;
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * This class extends @see IsoSampleEntry and implements @see IAudioCodec to provide an implementation of a
 * ISO/IEC 14496-12 AudioSampleEntry and support for reading MPEG-4 video properties.
 */
export class IsoAudioSampleEntry extends IsoSampleEntry implements IAudioCodec {
    /**
     * The number of channels in the audio represented by the current instance.
     */
    public audioChannels: number;

    /**
     * The sample size of the audio represented by the current instance.
     */
    public audioSampleSize: number;

    /**
     * The sample rate of the audio represented by the current instance.
     */
    public audioSampleRate: number;

    /**
     * Private constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance of @see IsoVisualSampleEntry with a provided header and
     * handler by reading the contents from a specified file.
     * @param header A @see Mpeg4BoxHeader object containing the header to use for the new instance.
     * @param file A @see File to read the contents of the box from.
     * @param handler A @see IsoHandlerBox object containing the handler that applies to the new instance.
     * @returns A new instance of @see IsoVisualSampleEntry
     */
    public static fromHeaderFileAndHandler(header: Mpeg4BoxHeader, file: File, handler: IsoHandlerBox): IsoAudioSampleEntry {
        Guards.notNullOrUndefined(file, "file");

        const instance: IsoAudioSampleEntry = new IsoAudioSampleEntry();
        instance.initializeFromHeaderFileAndHandler(header, file, handler);
        const dataPositionBeforeIncrease: number = instance.increaseDataPosition(20);
        file.seek(dataPositionBeforeIncrease + 8);
        instance.audioChannels = file.readBlock(2).toUshort();
        instance.audioSampleSize = file.readBlock(2).toUshort();
        file.seek(dataPositionBeforeIncrease + 16);
        const sampleRate: number = file.readBlock(4).toUint();
        instance.audioSampleRate = IsoAudioSampleEntry.calculateAudioSampleRate(sampleRate);
        instance.children = instance.loadChildren(file);

        return instance;
    }

    /**
     * Gets the duration of the media represented by the current instance.
     */
    public get durationMilliseconds(): number {
        return 0;
    }

    /**
     *  Gets the types of media represented by the current instance.
     */
    public get mediaTypes(): MediaTypes {
        return MediaTypes.Audio;
    }

    /**
     *  Gets a text description of the media represented by the current instance.
     */
    public get description(): string {
        return `MPEG-4 Audio (${this.boxType.toString(StringType.Latin1)})`;
    }

    /**
     * Gets the bitrate of the audio represented by the current instance.
     */
    public get audioBitrate(): number {
        const esds: Mpeg4Box = this.getChildRecursively(ByteVector.fromString("esds", StringType.UTF8));

        // If we don't have an stream descriptor, we don't know what's what.
        if (!(esds instanceof AppleElementaryStreamDescriptor)) {
            return 0;
        }

        // Return from the elementary stream descriptor.
        return esds.averageBitrate;
    }

    public static calculateAudioSampleRate(sampleRate: number): number {
        return <number>(sampleRate >>> 16);
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 *  This class extends @see FullBox to provide an implementation of a ISO/IEC 14496-12 ChunkLargeOffsetBox.
 */
export class IsoChunkLargeOffsetBox extends FullBox {
    /**
     * The offset table contained in the current instance.
     */
    public offsets: number[];

    /**
     * Private constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance of @see IsoChunkLargeOffsetBox with a provided header
     * and handler by reading the contents from a specified file.
     * @param header A @see Mpeg4BoxHeader object containing the header to use for the new instance.
     * @param file A @see File object to read the contents of the box from.
     * @param handler A @see IsoHandlerBox object containing the handler that applies to the new instance.
     * @returns
     */
    public static fromHeaderFileAndHandler(header: Mpeg4BoxHeader, file: File, handler: IsoHandlerBox): IsoChunkLargeOffsetBox {
        const instance: IsoChunkLargeOffsetBox = new IsoChunkLargeOffsetBox();
        instance.initializeFromHeaderFileAndHandler(header, file, handler);

        const boxData: ByteVector = file.readBlock(instance.dataSize);

        instance.offsets = [boxData.subarray(0, 4).toUint()];

        for (let i = 0; i < instance.offsets.length; i++) {
            instance.offsets[i] = Number(boxData.subarray(4 + i * 8, 8).toUlong());
        }

        return instance;
    }

    /**
     * Gets and sets the data contained in the current instance.
     */
    public get data(): ByteVector {
        const output: ByteVector = ByteVector.fromUint(this.offsets.length);
        for (let i = 0; i < this.offsets.length; i++) {
            output.addByteVector(ByteVector.fromUlong(this.offsets[i]));
        }

        return output;
    }

    /**
     * Overwrites the existing box in the file after updating the table for a size change.
     * @param file A @see File object containing the file to which the current instance belongs and wo which modifications
     * must be applied.
     * @param sizeDifference A value containing the size change that occurred in the file.
     * @param after A value containing the position in the file after which offsets will be invalidated. If an
     * offset is before this point, it won't be updated.
     */
    public overwrite(file: File, sizeDifference: number, after: number): void {
        Guards.notNullOrUndefined(file, "file");

        file.insert(this.renderUsingSizeDifference(sizeDifference, after), this.header.position, this.size);
    }

    /**
     * Renders the current instance after updating the table for a size change.
     * @param sizeDifference  A value containing the size change that occurred in the file.
     * @param after  A value containing the position in the file after which offsets will be invalidated. If an
     * offset is before this point, it won't be updated.
     */
    public renderUsingSizeDifference(sizeDifference: number, after: number): ByteVector {
        for (let i = 0; i < this.offsets.length; i++) {
            if (this.offsets[i] >= after) {
                this.offsets[i] = this.offsets[i] + sizeDifference;
            }
        }

        return this.render();
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * This class extends @see FullBox to provide an implementation of a ISO/IEC 14496-12 ChunkOffsetBox.
 */
export class IsoChunkOffsetBox extends FullBox {
    /**
     * The offset table contained in the current instance.
     */
    public offsets: number[];

    /**
     * Private constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance of @see IsoChunkOffsetBox with a provided header and
     * handler by reading the contents from a specified file.
     * @param header A @see Mpeg4BoxHeader object containing the header to use for the new instance.
     * @param file A @see File object to read the contents of the box from.
     * @param handler A @see IsoHandlerBox object containing the handler that applies to the new instance.
     * @returns
     */
    public static fromHeaderFileAndHandler(header: Mpeg4BoxHeader, file: File, handler: IsoHandlerBox): IsoChunkOffsetBox {
        const instance: IsoChunkOffsetBox = new IsoChunkOffsetBox();
        instance.initializeFromHeaderFileAndHandler(header, file, handler);

        const boxData: ByteVector = file.readBlock(instance.dataSize);

        instance.offsets = [boxData.subarray(0, 4).toUint()];

        for (let i = 0; i < instance.offsets.length; i++) {
            instance.offsets[i] = boxData.subarray(4 + i * 4, 4).toUint();
        }

        return instance;
    }

    /**
     * Gets and sets the data contained in the current instance.
     */
    public get data(): ByteVector {
        const output: ByteVector = ByteVector.fromUint(this.offsets.length);

        for (let i = 0; i < this.offsets.length; i++) {
            output.addByteVector(ByteVector.fromUint(this.offsets[i]));
        }

        return output;
    }

    /**
     * Overwrites the existing box in the file after updating the table for a size change.
     * @param file A @see File object containing the file to which the current instance belongs and wo which modifications
     * must be applied.
     * @param sizeDifference A value containing the size change that occurred in the file.
     * @param after A value containing the position in the file after which offsets will be invalidated. If an
     * offset is before this point, it won't be updated.
     */
    public overwrite(file: File, sizeDifference: number, after: number): void {
        Guards.notNullOrUndefined(file, "file");

        file.insert(this.renderUsingSizeDifference(sizeDifference, after), this.header.position, this.size);
    }

    /**
     * Renders the current instance after updating the table for a size change.
     * @param sizeDifference  A value containing the size change that occurred in the file.
     * @param after  A value containing the position in the file after which offsets will be invalidated. If an
     * offset is before this point, it won't be updated.
     */
    public renderUsingSizeDifference(sizeDifference: number, after: number): ByteVector {
        for (let i = 0; i < this.offsets.length; i++) {
            if (this.offsets[i] >= after) {
                this.offsets[i] = this.offsets[i] + Number(sizeDifference);
            }
        }

        return this.render();
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 *  This class extends @see Mpeg4Box to provide an implementation of a ISO/IEC 14496-12 FreeSpaceBox.
 */
export class IsoFreeSpaceBox extends Mpeg4Box {
    /**
     * Contains the size of the padding.
     */
    public padding: number;

    /**
     * Private constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance of @see IsoFreeSpaceBox with a provided header and
     * handler by reading the contents from a specified file.
     * @param header A @see Mpeg4BoxHeader object containing the header to use for the new instance.
     * @param file  A @see File object to read the contents of the box from.
     * @param handler A @see IsoHandlerBox object containing the handler that applies to the new instance.
     * @returns A new instance of @see IsoFreeSpaceBox
     */
    public static fromHeaderFileAndHandler(header: Mpeg4BoxHeader, file: File, handler: IsoHandlerBox): IsoFreeSpaceBox {
        const instance: IsoFreeSpaceBox = new IsoFreeSpaceBox();
        instance.initializeFromHeaderAndHandler(header, handler);
        instance.padding = instance.dataSize;

        return instance;
    }

    /**
     * Constructs and initializes a new instance of @see IsoFreeSpaceBox to occupy a specified number of bytes.
     * @param padding  A value specifying the number of bytes the new instance should occupy when rendered.
     * @returns A new instance of @see IsoFreeSpaceBox
     */
    public static fromPadding(padding: number): IsoFreeSpaceBox {
        const instance: IsoFreeSpaceBox = new IsoFreeSpaceBox();
        instance.initializeFromType(ByteVector.fromString("free", StringType.UTF8));
        instance.paddingSize = padding;

        return instance;
    }

    /**
     * Gets and sets the data contained in the current instance.
     * @returns A @see ByteVector object containing the data contained in the current instance.
     */
    public get data(): ByteVector {
        return ByteVector.fromSize(this.padding);
    }
    public set data(v: ByteVector) {
        this.padding = v ? v.length : 0;
    }

    /**
     * Gets and sets the size the current instance will occupy when rendered.
     * @returns A value containing the size the current instance will occupy when rendered.
     */
    public get paddingSize(): number {
        return this.padding + 8;
    }
    public set paddingSize(v: number) {
        this.padding = v - 8;
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * This class extends @see FullBox to provide an implementation of a ISO/IEC 14496-12 FullBox.
 */
export class IsoHandlerBox extends FullBox {
    /**
     * Contains the handler type of the current instance.
     */
    public handlerType: ByteVector;

    /**
     * Contains the name of the current instance.
     */
    public name: string;

    /**
     * Private constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance of @see IsoHandlerBox with a provided header and h
     * handler by reading the contents from a specified file.
     * @param header A @see Mpeg4BoxHeader object containing the header to use for the new instance.
     * @param file A @see File object to read the contents of the box from.
     * @param handler A @see IsoHandlerBox object containing the handler that applies to the new instance.
     * @returns A new instance of @see IsoHandlerBox
     */
    public static fromHeaderFileAndHandler(header: Mpeg4BoxHeader, file: File, handler: IsoHandlerBox): IsoHandlerBox {
        Guards.notNullOrUndefined(file, "file");

        const instance: IsoHandlerBox = new IsoHandlerBox();
        instance.initializeFromHeaderFileAndHandler(header, file, handler);
        file.seek(instance.dataPosition + 4);
        const boxData: ByteVector = file.readBlock(instance.dataSize - 4);
        instance.handlerType = boxData.subarray(0, 4);

        let end: number = boxData.offsetFind(ByteVector.fromByte(0), 16);

        if (end < 16) {
            end = boxData.length;
        }

        instance.name = end > 16 ? boxData.subarray(16, end - 16).toString(StringType.UTF8) : "";

        return instance;
    }

    /**
     * Constructs and initializes a new instance of @see IsoHandlerBox with a specified type and name.
     * @param handlerType A @see ByteVector object specifying a 4 byte handler type.
     * @param name An object specifying the handler name.
     * @returns A new instance of @see IsoHandlerBox
     */
    public static fromHandlerTypeAndHandlerName(handlerType: ByteVector, name: string): IsoHandlerBox {
        Guards.notNullOrUndefined(handlerType, "handlerType");

        if (handlerType.length < 4) {
            throw new Error("The handler type must be four bytes long.");
        }

        const instance: IsoHandlerBox = new IsoHandlerBox();
        instance.initializeFromTypeVersionAndFlags(ByteVector.fromString("hdlr", StringType.UTF8), 0, 0);
        instance.handlerType = handlerType.subarray(0, 4);
        instance.name = name;

        return instance;
    }

    /**
     * Gets the data contained in the current instance.
     */
    public get data(): ByteVector {
        const output: ByteVector = ByteVector.concatenate(
            ByteVector.fromSize(4),
            this.handlerType,
            ByteVector.fromSize(12),
            ByteVector.fromString(this.name, StringType.UTF8),
            ByteVector.fromSize(2)
        );

        return output;
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * This class extends @see FullBox to provide an implementation of a ISO/IEC 14496-12 MetaBox.
 */
export class IsoMetaBox extends FullBox {
    /**
     * Constructs and initializes a new instance of @see IsoMetaBox with a provided header and
     * handler by reading the contents from a specified file.
     * @param header A @see Mpeg4BoxHeader object containing the header to use for the new instance.
     * @param file A @see File object to read the contents of the box from.
     * @param handler A @see IsoHandlerBox object containing the handler that applies to the new instance.
     * @returns A new instance of @see IsoMetaBox
     */
    public static fromHeaderFileAndHandler(header: Mpeg4BoxHeader, file: File, handler: IsoHandlerBox): IsoMetaBox {
        const instance: IsoMetaBox = new IsoMetaBox();
        instance.initializeFromHeaderFileAndHandler(header, file, handler);
        instance.children = instance.loadChildren(file);

        return instance;
    }

    /**
     * Constructs and initializes a new instance of @see IsoMetaBox with a specified handler.
     * @param handlerType A @see ByteVector object specifying a 4 byte handler type.
     * @param handlerName A @see string object specifying the handler name.
     * @returns A new instance of @see IsoMetaBox
     */
    public static fromHandlerTypeAndHandlerName(handlerType: ByteVector, handlerName: string): IsoMetaBox {
        Guards.notNullOrUndefined(handlerType, "handlerType");

        if (handlerType.length < 4) {
            throw new Error("The handler type must be four bytes long.");
        }

        const instance: IsoMetaBox = new IsoMetaBox();
        instance.initializeFromTypeVersionAndFlags(ByteVector.fromString("meta", StringType.UTF8), 0, 0);
        instance.children = [];
        instance.addChild(IsoHandlerBox.fromHandlerTypeAndHandlerName(handlerType, handlerName));

        return instance;
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * This class extends @see FullBox to provide an implementation of a ISO/IEC 14496-12 MovieHeaderBox.
 */
export class IsoMovieHeaderBox extends FullBox {
    /**
     * Contains the ID of the next track in the movie represented by the current instance.
     */
    public nextTrackId: number;

    /**
     * Contains the creation time of the movie.
     */
    public creationTime: number;

    /**
     * Contains the modification time of the movie.
     */
    public modificationTime: number;

    /**
     * Contains the duration of the movie represented by the current instance.
     */
    public durationInMilliseconds: number;

    /**
     *  Contains the playback rate of the movie represented by the current instance.
     */
    public rate: number;

    /**
     *  Contains the playback volume of the movie represented by the current instance.
     */
    public volume: number;

    /**
     * Private constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance of @see IsoMovieHeaderBox with a provided header and
     * handler by reading the contents from a specified file.
     * @param header A @see Mpeg4BoxHeader object containing the header to use for the new instance.
     * @param file A @see File object to read the contents of the box from.
     * @param handler A @see IsoHandlerBox object containing the handler that applies to the new instance.
     * @returns A new instance of @see IsoMovieHeaderBox
     */
    public static fromHeaderFileAndHandler(header: Mpeg4BoxHeader, file: File, handler: IsoHandlerBox): IsoMovieHeaderBox {
        Guards.notNullOrUndefined(file, "file");

        const instance: IsoMovieHeaderBox = new IsoMovieHeaderBox();
        instance.initializeFromHeaderFileAndHandler(header, file, handler);

        let bytesRemaining: number = instance.dataSize;
        let data: ByteVector;

        if (instance.version === 1) {
            // Read version one (large integers).
            data = file.readBlock(Math.min(28, bytesRemaining));

            if (data.length >= 8) {
                instance.creationTime = Number(data.subarray(0, 8).toUlong());
            }

            if (data.length >= 16) {
                instance.modificationTime = Number(data.subarray(8, 8).toUlong());
            }

            let timescale: number = 0;

            if (data.length >= 20) {
                timescale = data.subarray(16, 4).toUint();
            }

            let duration: number = 0;

            if (data.length >= 28) {
                duration = Number(data.subarray(20, 8).toUlong());
                instance.durationInMilliseconds = IsoMovieHeaderBox.calculateDurationInMilliseconds(duration, timescale);
            }

            bytesRemaining -= 28;
        } else {
            // Read version zero (normal integers).
            data = file.readBlock(Math.min(16, bytesRemaining));

            if (data.length >= 4) {
                instance.creationTime = data.subarray(0, 4).toUint();
            }

            if (data.length >= 8) {
                instance.modificationTime = data.subarray(4, 4).toUint();
            }

            let timescale: number = 0;

            if (data.length >= 12) {
                timescale = data.subarray(8, 4).toUint();
            }

            let duration: number = 0;

            if (data.length >= 16) {
                duration = data.subarray(12, 4).toUint();
                instance.durationInMilliseconds = IsoMovieHeaderBox.calculateDurationInMilliseconds(duration, timescale);
            }

            bytesRemaining -= 16;
        }

        data = file.readBlock(Math.min(6, bytesRemaining));

        if (data.length >= 4) {
            instance.rate = IsoMovieHeaderBox.calculateRate(data.subarray(0, 4).toUint());
        }

        if (data.length >= 6) {
            instance.volume = IsoMovieHeaderBox.calculateVolume(data.subarray(4, 2).toUshort());
        }

        file.seek(file.position + 70);
        bytesRemaining -= 76;

        data = file.readBlock(Math.min(4, bytesRemaining));

        if (data.length >= 4) {
            instance.nextTrackId = data.subarray(0, 4).toUint();
        }

        return instance;
    }

    private static calculateDurationInMilliseconds(duration: number, timescale: number): number {
        // The length is the number of ticks divided by ticks per second.
        return (duration / timescale) * 1000;
    }

    private static calculateRate(rate: number): number {
        return rate / 0x10000;
    }

    private static calculateVolume(volume: number): number {
        return volume / 0x100;
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * This class extends @see FullBox to provide an implementation of a ISO/IEC 14496-12 SampleDescriptionBox.
 */
export class IsoSampleDescriptionBox extends FullBox {
    /**
     * The number of boxes at the beginning of the children that will be stored as @see IsoAudioSampleEntry
     * of @see IsoVisualSampleEntry" objects, depending on the handler.
     */
    public entryCount: number;

    /**
     * Private constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance of @see IsoSampleDescriptionBox with a provided header
     * and handler by reading the contents from a specified file.
     * @param header A @see Mpeg4BoxHeader object containing the header to use for the new instance.
     * @param file A @see File object to read the contents of the box from.
     * @param handler A @see IsoHandlerBox object containing the handler that applies to the new instance.
     * @returns A new instance of @see IsoSampleDescriptionBox
     */
    public static fromHeaderFileAndHandler(header: Mpeg4BoxHeader, file: File, handler: IsoHandlerBox): IsoSampleDescriptionBox {
        Guards.notNullOrUndefined(file, "file");

        const instance: IsoSampleDescriptionBox = new IsoSampleDescriptionBox();
        instance.initializeFromHeaderFileAndHandler(header, file, handler);
        instance.increaseDataPosition(4);
        instance.entryCount = file.readBlock(4).toUint();
        instance.children = instance.loadChildren(file);

        return instance;
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * This class extends @see Mpeg4Box to provide an implementation of a ISO/IEC 14496-12 SampleTableBox.
 */
export class IsoSampleTableBox extends Mpeg4Box {
    /**
     * Private constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance of @see IsoSampleTableBox with a provided header and
     * handler by reading the contents from a specified file.
     * @param header A @see Mpeg4BoxHeader object containing the header to use for the new instance.
     * @param file A @see File object to read the contents of the box from.
     * @param handler A @see IsoHandlerBox object containing the handler that applies to the new instance.
     * @returns A new instance of @see IsoSampleTableBox
     */
    public static fromHeaderFileAndHandler(header: Mpeg4BoxHeader, file: File, handler: IsoHandlerBox): IsoSampleTableBox {
        Guards.notNullOrUndefined(file, "file");

        const instance: IsoSampleTableBox = new IsoSampleTableBox();
        instance.initializeFromHeaderAndHandler(header, handler);
        instance.children = instance.loadChildren(file);

        return instance;
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * This class extends @see Mpeg4Box to provide an implementation of a ISO/IEC 14496-12 UserDataBox.
 */
export class IsoUserDataBox extends Mpeg4Box {
    /**
     *  Gets the box headers for the current "udta" box and all parent boxes up to the top of the file.
     */
    public parentTree: Mpeg4BoxHeader[];

    /**
     * Private constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance of @see IsoUserDataBox with a provided header and
     * handler by reading the contents from a specified file.
     * @param header A @see Mpeg4BoxHeader object containing the header to use for the new instance.
     * @param file A @see File object to read the contents of the box from.
     * @param handler A @seeIsoHandlerBox object containing the handler that applies to the new instance.
     * @returns A new instance of @see IsoUserDataBox
     */
    public static fromHeaderFileAndHandler(header: Mpeg4BoxHeader, file: File, handler: IsoHandlerBox): IsoUserDataBox {
        Guards.notNullOrUndefined(file, "file");

        const instance: IsoUserDataBox = new IsoUserDataBox();
        instance.initializeFromHeaderAndHandler(header, handler);
        instance.children = instance.loadChildren(file);

        return instance;
    }

    /**
     * Constructs and initializes a new instance of @see IsoUserDataBox with no children.
     * @returns A new instance of @see IsoUserDataBox
     */
    public static fromEmpty(): IsoUserDataBox {
        const instance: IsoUserDataBox = new IsoUserDataBox();
        instance.initializeFromType(ByteVector.fromString("udta", StringType.UTF8));
        instance.children = [];

        return instance;
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * This class extends @see IsoSampleEntry and implements @see IVideoCodec to provide an implementation of a
 * ISO/IEC 14496-12 VisualSampleEntry and support for reading MPEG-4 video properties.
 */
export class IsoVisualSampleEntry extends IsoSampleEntry implements IVideoCodec {
    /**
     * Contains the width of the visual.
     */
    public videoWidth: number;

    /**
     * Contains the height of the visual.
     */
    public videoHeight: number;

    /**
     * Private constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    public static fromHeaderFileAndHandler(header: Mpeg4BoxHeader, file: File, handler: IsoHandlerBox): IsoVisualSampleEntry {
        Guards.notNullOrUndefined(file, "file");

        const instance: IsoVisualSampleEntry = new IsoVisualSampleEntry();
        instance.initializeFromHeaderFileAndHandler(header, file, handler);
        const dataPositionBeforeIncrease: number = instance.increaseDataPosition(62);
        file.seek(dataPositionBeforeIncrease + 16);
        instance.videoWidth = file.readBlock(2).toUshort();
        instance.videoHeight = file.readBlock(2).toUshort();

        return instance;
    }

    /**
     * Gets the duration of the media represented by the current instance.
     */
    public get durationMilliseconds(): number {
        return 0;
    }

    /**
     * Gets the types of media represented by the current instance.
     */
    public get mediaTypes(): MediaTypes {
        return MediaTypes.Video;
    }

    /**
     * Gets a text description of the media represented by the current instance.
     */
    public get description(): string {
        return `MPEG-4 Video (${this.boxType.toString(StringType.Latin1)})`;
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Represents an MP4 text box
 */
export class TextBox extends Mpeg4Box {
    /**
     * Private constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance of @see TextBox with a provided header and handler
     * by reading the contents from a specified file.
     * @param header A @see Mpeg4BoxHeader object containing the header to use for the new instance.
     * @param file A @see File object to read the contents of the box from.
     * @param handler A @see IsoHandlerBox object containing the handler that applies to the new instance.
     * @returns A new instance of @see TextBox
     */
    public static fromHeaderFileAndHandler(header: Mpeg4BoxHeader, file: File, handler: IsoHandlerBox): TextBox {
        Guards.notNullOrUndefined(file, "file");

        const instance: TextBox = new TextBox();
        instance.initializeFromHeaderAndHandler(header, handler);

        instance.data = instance.loadData(file);

        return instance;
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class UnknownBox extends Mpeg4Box {
    /**
     * Private constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance of @see UnknownBox with a provided header and handler
     * by reading the contents from a specified file.
     * @param header A @see Mpeg4BoxHeader object containing the header to use for the new instance.
     * @param file A @see File object to read the contents of the box from.
     * @param handler A @see IsoHandlerBox object containing the handler that applies to the new instance.
     * @returns A new instance of @see UnknownBox
     */
    public static fromHeaderFileAndHandler(header: Mpeg4BoxHeader, file: File, handler: IsoHandlerBox): UnknownBox {
        Guards.notNullOrUndefined(file, "file");

        const instance: UnknownBox = new UnknownBox();
        instance.initializeFromHeaderAndHandler(header, handler);
        instance.data = file.readBlock(instance.dataSize > 0 ? instance.dataSize : 0);

        return instance;
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Represent a MP4 URL box
 */
export class UrlBox extends Mpeg4Box {
    /**
     * Private constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    /**
     *  Constructs and initializes a new instance of @see UrlBox with a provided header and handler
     * by reading the contents from a specified file.
     * @param header A @see Mpeg4BoxHeader object containing the header to use for the new instance.
     * @param file A @see File object to read the contents of the box from.
     * @param handler A @see IsoHandlerBox object containing the handler that applies to the new instance.
     * @returns A new instance of @see UrlBox
     */
    public static fromHeaderFileAndHandler(header: Mpeg4BoxHeader, file: File, handler: IsoHandlerBox): UrlBox {
        Guards.notNullOrUndefined(file, "file");

        const instance: UrlBox = new UrlBox();
        instance.initializeFromHeaderAndHandler(header, handler);
        instance.data = instance.loadData(file);

        return instance;
    }
}
