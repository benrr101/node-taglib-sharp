import * as crypto from "crypto";

import EbmlElement from "../ebml/ebmlElement";
import EbmlParser from "../ebml/ebmlParser";
import {ByteVector} from "../byteVector";
import {CorruptFileError} from "../errors";
import {ILazy} from "../interfaces";
import {MatroskaIds} from "./matroskaIds";
import {IPicture, Picture, PictureType} from "../picture";
import {Guards} from "../utils";

/**
 * Class that represents an attachment for a Matroska file
 */
export default class MatroskaAttachment implements IPicture, ILazy {
    private readonly _loaderSource: IPicture|EbmlParser;

    private _data: ByteVector|undefined;
    private _description: string|undefined;
    private _filename: string|undefined;
    private _mimeType: string|undefined;
    private _type: PictureType|undefined;
    private _uid: bigint|undefined;

    //#region Constructors

    private constructor(source: IPicture|EbmlParser) {
        Guards.truthy(source, "source");
        this._loaderSource = source;
    }

    /**
     * Constructs and initializes a new instance using an EBML parser.
     * @param element EBML element that represents the attachment
     */
    public static fromAttachmentElement(element: EbmlElement): MatroskaAttachment {
        // @TODO: Allow non-lazy construction

        Guards.truthy(element, "element");
        if (element.id !== MatroskaIds.ATTACHED_FILE) {
            throw new Error(`Attachment constructor was provided element of type ${element.id}`);
        }

        return new MatroskaAttachment(element.getParser());
    }

    /**
     * Constructs and initializes a new instance using an existing picture object.
     * @param picture Picture to use to initialize the new instance
     */
    public static fromPicture(picture: IPicture): MatroskaAttachment {
        return new MatroskaAttachment(picture);
    }

    //#endregion

    //#region Properties

    /** @inheritDoc */
    public get data(): ByteVector {
        this.loadWithAssert(this._data);
        return this._data;
    }
    /** @inheritDoc */
    // @TODO: Do we need to load before setting?
    public set data(value: ByteVector) {
        Guards.truthy(value, "value");

        this.load();
        this._data = value;
    }

    /** @inheritDoc */
    public get description(): string|undefined {
        this.load();
        return this._description;
    }
    /** @inheritDoc */
    public set description(value: string) {
        Guards.notNullOrUndefined(value, "value");

        this.load();
        this._description = value;
    }

    /** @inheritDoc */
    public get filename(): string|undefined {
        this.load();
        return this._filename;
    }
    /**
     * @inheritDoc
     * @remarks
     *     Although this value can be set to anything, it is recommended if creating an
     *     attachment from a {@link IPicture} to not change this value. Matroska does not have a
     *     concept of attachment "type", so node-taglib-sharp embeds the type in the filename
     *     field.
     */
    public set filename(value: string) {
        this.load();
        this._filename = value;
    }

    /** @inheritDoc */
    public get isLoaded(): boolean { return !!this._data; }

    /** @inheritDoc */
    public get mimeType(): string {
        this.loadWithAssert(this._mimeType);
        return this._mimeType;
    }
    /** @inheritDoc */
    public set mimeType(value: string) {
        Guards.notNullOrUndefined(value, "value");

        this.load();
        this._mimeType = value;
    }

    /** @inheritDoc */
    public get type(): PictureType {
        this.loadWithAssert(this._type);
        return this._type;
    }
    /**
     * @inheritDoc
     * @remarks
     *     Since Matroska attachments do not have a concept of "type", in order for this
     *     value to be preserved, the string representation of the type will be embedded in the
     *     {@link filename}.
     */
    public set type(value: PictureType) {
        this.load();
        this._type = value;
        this._filename = `${PictureType[value]}${Picture.getExtensionFromMimeType(this.mimeType)}`
    }

    /**
     * Unique ID representing the file.
     */
    public get uid(): bigint {
        this.loadWithAssert(this._uid);
        return this._uid;
    }

    //#endregion

    /** @inheritDoc */
    public load(): void {
        if (this.isLoaded) {
            return;
        }

        if (this._loaderSource instanceof EbmlParser) {
            this.loadFromParser(this._loaderSource);
        } else {
            this.loadFromPicture(this._loaderSource);
        }
    }

    private loadFromParser(source: EbmlParser): void {
        const attachmentElements = EbmlParser.getAllElements(source);

        // Required elements
        const filenameElement = attachmentElements.get(MatroskaIds.FILE_NAME);
        if (!filenameElement) {
            throw new CorruptFileError("Matroska attachment is missing required filename element");
        }
        this._filename = filenameElement.getString();

        const dataElement = attachmentElements.get(MatroskaIds.FILE_DATA);
        if (!dataElement) {
            throw new CorruptFileError("Matroska attachment is missing required data element");
        }
        this._data = dataElement.getBytes();

        const mimeTypeElement = attachmentElements.get(MatroskaIds.FILE_MEDIA_TYPE);
        if (!mimeTypeElement) {
            throw new CorruptFileError("Matroska attachment is missing required media type element");
        }
        this._mimeType = mimeTypeElement.getString();

        const uidElement = attachmentElements.get(MatroskaIds.FILE_UID);
        if (!uidElement) {
            throw new CorruptFileError("Matroska attachment is missing required UID element");
        }
        this._uid = uidElement.getUlong();

        // Optional elements
        this._description = attachmentElements.get(MatroskaIds.FILE_DESCRIPTION)?.getString();

        if (this._mimeType.startsWith("image")) {
            // Default to other
            this._type = PictureType.Other;

            // Attempt to find a better type
            if (this._filename) {
                // I don't know if this effort is worth it, but hey, we'll try anyhow
                for (const key of Object.keys(PictureType)) {
                    // @TODO: We can do this without indexof, and probably without a for loop, I bet.
                    if (this._filename.toUpperCase().indexOf(key.toUpperCase()) >= 0) {
                        this._type = PictureType[key as keyof typeof PictureType];
                    }
                }
            }
        } else {
            this._type = PictureType.NotAPicture;
        }
    }

    private loadFromPicture(source: IPicture): void {
        this._type = source.type;
        this._data = source.data;
        this._description = source.description;

        // Generate random number to use as the UID for the element
        const uidBytes = new Uint8Array(8);
        crypto.randomFillSync(uidBytes);
        const uidBytesVector = ByteVector.fromByteArray(uidBytes);
        this._uid = uidBytesVector.toUlong();

        // Attempt to get mimeType and filename from each other if both are not provided
        if (!source.mimeType && !source.filename) {
            throw new Error("Cannot use picture as Matroska attachment, mime type or filename must be provided");
        }

        // Mimetype can be recovered from file name
        // @TODO: Use mmmagic
        this._mimeType = source.mimeType || Picture.getMimeTypeFromFilename(source.filename);

        // Since Matroska attachments don't have a concept of a "type", we embed the type
        // in the file name
        const name = PictureType[this._type];
        const extension = Picture.getExtensionFromMimeType(this._mimeType) || ".bin";
        this._filename = `${name}${extension}`;
    }

    /**
     * Calls the load method and asserts the passed in field is not `undefined`.
     * @param field Field to validate is not undefined.
     * @private
     */
    // @TODO: Adopt this in other ILazy implementations
    private loadWithAssert<T>(field: T|undefined): asserts field is T {
        this.load();
        if (field === undefined) {
            throw new Error("Lazy loading of Matroska attachment failed");
        }
    }
}
