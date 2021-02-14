import BaseObject from "./baseObject";
import Guids from "../guids";
import {CorruptFileError} from "../../errors";
import {ByteVector} from "../../byteVector";

/**
 * This class extends {@see BaseObject} to provide a representation of an ASF content description
 * object. The content description object is optional and provides standard bibliographic
 * information such as title, author, copyright, description, rating information.
 */
export default class ContentDescriptionObject extends BaseObject {
    private _author: string = "";
    private _copyright: string = "";
    private _description: string = "";
    private _rating: string = "";
    private _title: string = "";

    // #region Constructors

    private constructor() {
        super();
    }

    public static fromEmpty(): ContentDescriptionObject {
        const instance = new ContentDescriptionObject();
        instance.initializeFromGuid(Guids.AsfContentDescriptionObject);

        return instance;
    }

    public static fromFile(file: AsfFile, position: number): ContentDescriptionObject {
        const instance = new ContentDescriptionObject();
        instance.initializeFromFile(file, position);

        if (instance.guid.equals(Guids.AsfContentDescriptionObject)) {
            throw new CorruptFileError("Object GUID is not the expected content description object guid");
        }
        if (instance.originalSize < 34) {
            throw new CorruptFileError("Object size too small for content description object");
        }

        const titleLength = file.readWord();
        const authorLength = file.readWord();
        const copyrightLength = file.readWord();
        const descriptionLength = file.readWord();
        const ratingLength = file.readWord();

        instance._title = file.readUnicode(titleLength);
        instance._author = file.readUnicode(titleLength);
        instance._copyright = file.readUnicode(titleLength);
        instance._description = file.readUnicode(descriptionLength);
        instance._rating = file.readUnicode(ratingLength);

        return instance;
    }

    // #endregion

    // #region Properties

    /**
     * Gets the author of the media described by the current instance.
     * @returns Author of the media or `undefined` if it is not set.
     */
    public get author(): string { return this._author ?? undefined; }
    /**
     * Sets the author of the media described by the current instance.
     */
    public set author(value: string) { this._author = value ?? ""; }

    /**
     * Gets the copyright information of the media described by the current instance.
     * @returns Copyright information of the media or `undefined` if it is not set.
     */
    public get copyright(): string { return this._copyright ?? undefined; }
    /**
     * Sets the copyright information of the media described by the current instance.
     */
    public set copyright(value: string) { this._copyright = value ?? ""; }

    /**
     * Gets the description of the media described by the current instance.
     * @returns Description of the media or `undefined` if it is not set.
     */
    public get description(): string { return this._description ?? undefined; }
    /**
     * Sets the description of the media described by the current instance.
     */
    public set description(value: string) { this._description = value ?? ""; }

    /**
     * Gets whether or not the current instance is empty.
     * @returns `true` if all the values are cleared. Otherwise `false` is returned.
     */
    public get isEmpty(): boolean {
        return !this._title
            && !this._author
            && !this._copyright
            && !this._description
            && !this._rating;
    }

    /**
     * Gets the rating of the media described by the current instance.
     * @returns Rating of the media or `undefined` if it is not set.
     */
    public get rating(): string { return this._rating ?? undefined; }
    /**
     * Sets the rating of the media described by the current instance.
     */
    public set rating(value: string) { this._rating = value ?? ""; }

    /**
     * Gets the title of the media described by the current instance.
     * @returns Title of the media or `undefined` if it is not set.
     */
    public get title(): string { return this._title ?? undefined; }
    /**
     * Sets the title of the media described by the current instance.
     */
    public set title(value: string) { this._title = value ?? ""; }

    // #endregion

    /**
     * Renders the current instance as a raw ASF object.
     */
    public render(): ByteVector {
        const titleBytes = BaseObject.renderUnicode(this._title);
        const authorBytes = BaseObject.renderUnicode(this._author);
        const copyrightBytes = BaseObject.renderUnicode(this._copyright);
        const descriptionBytes = BaseObject.renderUnicode(this._description);
        const ratingBytes = BaseObject.renderUnicode(this._rating);

        const data = ByteVector.concatenate(
            BaseObject.renderWord(titleBytes.length),
            BaseObject.renderWord(authorBytes.length),
            BaseObject.renderWord(copyrightBytes.length),
            BaseObject.renderWord(descriptionBytes.length),
            BaseObject.renderWord(ratingBytes.length),
            titleBytes,
            authorBytes,
            copyrightBytes,
            descriptionBytes,
            ratingBytes
        );

        return super.renderInternal(data);
    }
}
