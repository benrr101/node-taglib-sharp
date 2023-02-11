import * as crypto from "crypto";

import EbmlElement from "../ebml/ebmlElement";
import EbmlParser from "../ebml/ebmlParser";
import {ByteVector} from "../byteVector";
import {ILazy} from "../interfaces";
import {MatroskaIds} from "./matroskaIds";
import {IPicture, Picture, PictureType} from "../picture";
import {Guards} from "../utils";

/**
 * Class that represents an attachment for a Matroska file
 */
export default class MatroskaAttachment implements IPicture, ILazy {

    private _data: ByteVector;
    private _description: string;
    private _filename: string;
    private _loader: () => void;
    private _mimeType: string;
    private _type: PictureType;
    private _uid: bigint;

    // #region Constructors

    private constructor() { /* private to enforce construction via static methods */ }

    /**
     * Constructs and initializes a new instance using an EBML parser.
     * @param element EBML element that represents the attachment
     */
    public static fromAttachmentElement(element: EbmlElement): MatroskaAttachment {
        Guards.truthy(element, "parser");
        if (element.id !== MatroskaIds.ATTACHED_FILE) {
            throw new Error(`Attachment constructor was provided element of type ${element.id}`);
        }

        const attachment = new MatroskaAttachment();
        const attachmentElements = EbmlParser.getAllElements(element.getParser());
        attachment._loader = () => {
            attachment._description = attachmentElements.get(MatroskaIds.FILE_DESCRIPTION)?.getString();
            attachment._filename = attachmentElements.get(MatroskaIds.FILE_NAME)?.getString();
            attachment._mimeType = attachmentElements.get(MatroskaIds.FILE_MIME_TYPE)?.getString();
            attachment._uid = attachmentElements.get(MatroskaIds.FILE_UID)?.getUlong();

            const dataElement = attachmentElements.get(MatroskaIds.FILE_DATA);
            if (!dataElement) {
                throw new Error("Matroska attachment is missing data element");
            }
            attachment._data = dataElement.getBytes();

            if (attachment._mimeType.startsWith("image")) {
                // Default to other
                attachment._type = PictureType.Other;

                // Attempt to find a better type
                if (attachment._filename) {
                    // I don't know if this effort is worth it, but hey, we'll try anyhow
                    for (const key of Object.keys(PictureType)) {
                        if (attachment._filename.toUpperCase().indexOf(key.toUpperCase()) >= 0) {
                            attachment._type = PictureType[key as keyof typeof PictureType];
                        }
                    }
                }
            } else {
                attachment._type = PictureType.NotAPicture;
            }
        };

        return attachment;
    }

    /**
     * Constructs and initializes a new instance using an existing picture object.
     * @param picture Picture to use to initialize the new instance
     */
    public static fromPicture(picture: IPicture): MatroskaAttachment {
        Guards.truthy(picture, "parser");

        const attachment = new MatroskaAttachment();
        attachment._loader = () => {
            attachment._type = picture.type;
            attachment._data = picture.data;
            attachment._description = picture.description;

            const uidBytes = new Uint8Array(8);
            crypto.randomFillSync(uidBytes);
            const uidBytesVector = ByteVector.fromByteArray(uidBytes);
            attachment._uid = uidBytesVector.toUlong();

            // Attempt to get mimeType and filename from each other if both are not provided
            if (!picture.mimeType && !picture.filename) {
                throw new Error(
                    "Cannot use picture as Matroska attachment, " +
                    "mime type or filename must be provided"
                );
            }

            // Mimetype can be recovered from file name
            attachment._mimeType = picture.mimeType || Picture.getMimeTypeFromFilename(picture.filename);

            // Since Matroska attachments don't have a concept of a "type", we embed the type
            // in the file name
            const name = PictureType[attachment._type];
            const extension = Picture.getExtensionFromMimeType(attachment._mimeType) || ".bin";
            attachment._filename = `${name}${extension}`;
        }

        return attachment;
    }

    // #endregion

    // #region Properties

    /** @inheritDoc */
    public get data(): ByteVector {
        this.load();
        return this._data;
    }
    /** @inheritDoc */
    public set data(value: ByteVector) {
        Guards.truthy(value, "value");

        this.load();
        this._data = value;
    }

    /** @inheritDoc */
    public get description(): string {
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
    public get filename(): string {
        this.load();
        return this._filename;
    }
    /**
     * @inheritDoc
     * @remarks Although this value can be set to anything, it is recommended if creating an
     *     attachment from an {@see IPicture} to not change this value. Matroska does not have a
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
        this.load();
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
        this.load();
        return this._type;
    }
    /**
     * @inheritDoc
     * @remarks Since Matroska attachments do not have a concept of "type", in order for this
     *     value to be preserved, the string representation of the type will be embedded in the
     *     {@see filename}.
     */
    public set type(value: PictureType) {
        this.load();
        this._type = value;
        this._filename = `${PictureType[value]}${Picture.getExtensionFromMimeType(this._mimeType)}`
    }

    /**
     * Unique ID representing the file.
     */
    public get uid(): bigint {
        this.load();
        return this._uid;
    }

    // #endregion

    /** @inheritDoc */
    load(): void {
        if (!this.isLoaded) {
            this._loader();
        }
    }
}
