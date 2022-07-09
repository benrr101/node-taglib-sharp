import {IPicture, Picture, PictureType} from "../picture";
import {ILazy} from "../interfaces";
import {EbmlParser} from "../ebml/ebmlParser";
import {ByteVector} from "../byteVector";
import {Guards} from "../utils";
import {MatroskaIds} from "./matroskaIds";

export default class MatroskaAttachment implements IPicture, ILazy {

    private _data: ByteVector;
    private _description: string;
    private _filename: string;
    private _loader: () => void;
    private _mimeType: string;
    private _type: PictureType;
    private _uid: number;

    // #region Constructors

    private constructor() { /* private to enforce construction via static methods */ }

    public static fromAttachmentEntry(parser: EbmlParser): MatroskaAttachment {
        Guards.truthy(parser, "parser");

        const attachment = new MatroskaAttachment();
        const attachmentElements = EbmlParser.getAllValues(parser);
        attachment._loader = () => {
            attachment._description = attachmentElements.get(MatroskaIds.FILE_DESCRIPTION)?.getString();
            attachment._filename = attachmentElements.get(MatroskaIds.FILE_NAME)?.getString();
            attachment._mimeType = attachmentElements.get(MatroskaIds.FILE_MIME_TYPE)?.getString();
            attachment._uid = attachmentElements.get(MatroskaIds.FILE_UID)?.getUint();

            const dataElement = attachmentElements.get(MatroskaIds.FILE_DATA);
            if (!dataElement) {
                throw new Error("Matroska attachment is missing data element");
            }
            attachment._data = dataElement.getBytes();
        };

        return attachment;
    }

    public static fromPicture(picture: IPicture): MatroskaAttachment {
        Guards.truthy(picture, "parser");

        const attachment = new MatroskaAttachment();
        attachment._loader = () => {
            attachment._type = picture.type;
            attachment._uid = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
            attachment._data = picture.data;
            attachment._description = picture.description;

            // Attempt to get mimeType and filename from each other if both are not provided
            attachment._mimeType = picture.mimeType;
            attachment._filename = picture.filename;
            if (!attachment._mimeType && !attachment._filename) {
                throw new Error(
                    "Cannot use picture as Matroska attachment, " +
                    "mime type and filename must be provided"
                );
            } else if (!attachment._mimeType) {
                attachment._mimeType = Picture.getMimeTypeFromFilename(attachment._filename);
            } else if (!attachment._filename) {
                const name = PictureType[attachment._type];
                let extension = Picture.getExtensionFromMimeType(attachment._mimeType);
                extension ??= ".bin";
                attachment._filename = `${name}${extension}`;
            }
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
    /** @inheritDoc */
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
    /** @inheritDoc */
    public set type(value: PictureType) {
        this.load();
        this._type = value;
    }

    /**
     * Unique ID representing the file.
     */
    public get uid(): number {
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
