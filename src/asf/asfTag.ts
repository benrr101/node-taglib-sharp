import BaseObject from "./objects/baseObject";
import ContentDescriptionObject from "./objects/contentDescriptionObject";
import HeaderObject from "./objects/headerObject";
import {ByteVector, StringType} from "../byteVector";
import {DataType} from "./objects/descriptorBase";
import {ContentDescriptor, ExtendedContentDescriptionObject} from "./objects/extendedContentDescriptionObject";
import {IPicture} from "../iPicture";
import {MetadataLibraryObject} from "./objects/metadataLibraryObject";
import {Picture} from "../picture";
import {Tag, TagTypes} from "../tag";
import {Guards} from "../utils";

export default class AsfTag extends Tag {

    private _contentDescriptionObject: ContentDescriptionObject = ContentDescriptionObject.fromEmpty();
    private _extendedDescriptionObject: ExtendedContentDescriptionObject = ExtendedContentDescriptionObject.fromEmpty();
    private _metadataLibraryObject: MetadataLibraryObject = MetadataLibraryObject.fromEmpty();

    // #region Constructors

    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new, empty instance.
     */
    public static fromEmpty(): AsfTag {
        return new AsfTag();
    }

    /**
     * Constructs and initializes a new instance using the children of a {@link HeaderObject}
     * object.
     * @param header Header object whose children will be used to populate the new instance
     */
    public static fromHeader(header: HeaderObject): AsfTag {
        Guards.truthy(header, "header");

        const instance = new AsfTag();
        for (const child of header.children) {
            if (child instanceof ContentDescriptionObject) {
                instance._contentDescriptionObject = <ContentDescriptionObject> child;
            }
            if (child instanceof ExtendedContentDescriptionObject) {
                instance._extendedDescriptionObject = <ExtendedContentDescriptionObject> child;
            }
        }
        for (const child of header.extension.children) {
            if (child instanceof MetadataLibraryObject) {
                instance._metadataLibraryObject = <MetadataLibraryObject> child;
            }
        }

        return instance;
    }

    // #endregion

    // #region Properties

    /**
     * Gets the ASF content description object used by the current instance.
     */
    public get contentDescriptionObject(): ContentDescriptionObject { return this._contentDescriptionObject; }

    /**
     * Gets the ASF extended content description used by the current instance.
     */
    public get extendedContentDescriptionObject(): ExtendedContentDescriptionObject {
        return this._extendedDescriptionObject;
    }

    /**
     * Gets the ASF metadata library object used by the current instance.
     */
    public get metadataLibraryObject(): MetadataLibraryObject { return this._metadataLibraryObject; }

    // #endregion

    // #region Tag Properties

    public get tagTypes(): TagTypes { return TagTypes.Asf; }

    public get title(): string { return this._contentDescriptionObject.title; }
    public set title(value: string) { this._contentDescriptionObject.title = value; }

    /**
     * @inheritDoc
     * @remarks via `WM/SubTitle` descriptor
     *     https://msdn.microsoft.com/en-us/library/windows/desktop/dd757997(v=vs.85).aspx
     */
    public get subtitle(): string { return this.getDescriptorString("WM/SubTitle"); }
    /**
     * @inheritDoc
     * @remarks via `WM/SubTitle` descriptor
     *     https://msdn.microsoft.com/en-us/library/windows/desktop/dd757997(v=vs.85).aspx
     */
    public set subtitle(value: string) { this.setDescriptorString(value, "WM/SubTitle"); }

    /**
     * @inheritDoc
     * @remarks via "WM/TitleSortOrder"
     *     http://msdn.microsoft.com/en-us/library/aa386866(VS.85).aspx
     */
    public get titleSort(): string { return this.getDescriptorString("WM/TitleSortOrder"); }
    /**
     * @inheritDoc
     * @remarks via "WM/TitleSortOrder"
     *     http://msdn.microsoft.com/en-us/library/aa386866(VS.85).aspx
     */
    public set titleSort(value: string) { this.setDescriptorString(value, "WM/TitleSortOrder"); }

    /**
     * @inheritDoc
     * @remarks via {@link ContentDescriptor.description}
     */
    public get description(): string { return this._contentDescriptionObject.description; }
    /**
     * @inheritDoc
     * @remarks via {@link ContentDescriptor.description}
     */
    public set description(value: string) { this._contentDescriptionObject.description = value; }

    /**
     * @inheritDoc
     * @remarks via {@link ContentDescriptor.author}
     */
    public get performers(): string[] { return AsfTag.splitAndClean(this._contentDescriptionObject.author); }
    /**
     * @inheritDoc
     * @remarks via {@link ContentDescriptor.author}
     */
    public set performers(value: string[]) { this._contentDescriptionObject.author = value.join("; "); }

    /**
     * @inheritDoc
     * @remarks via "WM/ArtistSortOrder" descriptor
     *     http://msdn.microsoft.com/en-us/library/aa386866(VS.85).aspx
     */
    public get performersSort(): string[] { return this.getDescriptorStrings("WM/ArtistSortOrder"); }
    /**
     * @inheritDoc
     * @remarks via "WM/ArtistSortOrder" descriptor
     *     http://msdn.microsoft.com/en-us/library/aa386866(VS.85).aspx
     */
    public set performersSort(value: string[]) { this.setDescriptorStrings(value, "WM/ArtistSortOrder"); }

    /**
     * @inheritDoc
     * @remarks via `WM/AlbumArtist` or `AlbumArtist` descriptors
     */
    public get albumArtists(): string[] { return this.getDescriptorStrings("WM/AlbumArtist", "AlbumArtist"); }
    /**
     * @inheritDoc
     * @remarks via `WM/AlbumArtist` or `AlbumArtist` descriptors
     */
    public set albumArtists(value: string[]) { this.setDescriptorStrings(value, "WM/AlbumArtist", "AlbumArtist"); }

    /**
     * @inheritDoc
     * @remarks via `WM/AlbumArtistSortOrder` descriptor
     *     http://msdn.microsoft.com/en-us/library/aa386866(VS.85).aspx
     */
    public get albumArtistsSort(): string[] { return this.getDescriptorStrings("WM/AlbumArtistSortOrder"); }
    /**
     * @inheritDoc
     * @remarks via `WM/AlbumArtistSortOrder` descriptor
     *     http://msdn.microsoft.com/en-us/library/aa386866(VS.85).aspx
     */
    public set albumArtistsSort(value: string[]) { this.setDescriptorStrings(value, "WM/AlbumArtistSortOrder"); }

    // #endregion

    // #region Methods

    /**
     * Adds a descriptor to the current instance's extended content description object.
     * @param descriptor Content descriptor to add to the current instance. Must be truthy
     */
    public addDescriptor(descriptor: ContentDescriptor): void {
        this._extendedDescriptionObject.addDescriptor(descriptor);
    }

    /**
     * Gets all descriptors in the extended description object with names matching any of the names
     * in the provided collection of names.
     * @param names Collection of names to search the extended description object for
     */
    public getDescriptors(... names: string[]): ContentDescriptor[] {
        return this._extendedDescriptionObject.getDescriptors(... names);
    }

    /**
     * Gets the string contained in a specific descriptor from the extended content description
     * object in the current instance.
     * @param names Names of the descriptors to look for
     * @returns string The contents of the first descriptor found who's name is in the provided
     *     collection of descriptor names
     */
    public getDescriptorString(... names: string[]): string {
        Guards.truthy(names, "names");
        for (const descriptor of this.getDescriptors(... names)) {
            if (descriptor === null || descriptor.type !== DataType.Unicode) {
                continue;
            }

            const value = descriptor.getString();
            if (value !== undefined) {
                return value;
            }
        }

        return undefined;
    }

    /**
     * Gets the strings contained in a specific descriptor from the extended content description
     * object in the current instance, as split by `;`.
     * @param names Names of the descriptors to look for
     * @returns string The contents of the first descriptor found who's name is in the provided
     *     collection of descriptor names, split by `;`
     */
    public getDescriptorStrings(... names: string[]): string[] {
        return AsfTag.splitAndClean(this.getDescriptorString(... names));
    }

    /**
     * Removes all descriptors with a specified name from the extended content description object
     * in the current instance.
     * @param name Name of the descriptor to remove rom the current instance
     */
    public removeDescriptors(name: string): void {
        this._extendedDescriptionObject.removeDescriptors(name);
    }

    /**
     * Sets a collection of descriptors in the extended content description object for a given
     * name, removing the existing matching records.
     * @param name Name of the descriptors to be added/removed
     * @param descriptors Descriptors to add to the new instance
     * @remarks All added descriptors should have their name set to `name` but this is not
     *     verified by the method. The descriptors will be added with their own names and not the
     *     one provided as an argument, which is only used for removing existing values and
     *     determining where to position the new descriptors.
     */
    public setDescriptors(name: string, ... descriptors: ContentDescriptor[]): void {
        this._extendedDescriptionObject.setDescriptors(name, ... descriptors);
    }

    /**
     * Sets the string for a collection of descriptors in the current instance.
     * @param value Value to store or `undefined` to clear the value
     * @param names Names in which the value would be expected. For example, "WM/AlbumTitle" and
     *     "Album"
     * @remarks The value will be stored in the first value in `names` and the rest of the
     *     descriptors with the matching names will be cleared.
     */
    public setDescriptorString(value: string, ... names: string[]): void {
        Guards.truthy(names, "names");

        let index = 0;
        if (value !== undefined && value !== null) {
            const trimmed = value.trim();
            if (trimmed.length > 0) {
                this.setDescriptors(names[0], new ContentDescriptor(names[0], DataType.Unicode, value));
                index++;
            }
        }

        for (; index < names.length; index++) {
            this.removeDescriptors(names[index]);
        }
    }

    /**
     * Sets the strings for a collection of descriptors in the current instance. The strings will
     * be stored as a single string, joined together with `; `.
     * @param value Value to store or `undefined` to clear the value
     * @param names Names in which the value would be expected. For example, "WM/AlbumTitle" and
     *     "Album"
     * @remarks The value will be stored in the first value in `names` and the rest of the
     *     descriptors with the matching names will be cleared.
     */
    public setDescriptorStrings(value: string[], ... names: string[]): void {
        this.setDescriptorString(value.join("; "), ...names);
    }

    private static pictureFromData(data: ByteVector): Picture {
        if (data.length < 9) {
            return undefined;
        }

        // @TODO: Should offer option to read picture lazily?
        let offset = 0;
        const pictureType = data.get(offset);
        offset += 1;

        // Get the Picture size
        const pictureSize = data.mid(offset, 4).toUInt(false);
        offset += 4;

        // Get the mime-type
        const delimiter = ByteVector.getTextDelimiter(StringType.UTF16LE);
        const mimeTypeDelimiterIndex = data.find(delimiter, offset, delimiter.length);
        if (mimeTypeDelimiterIndex < 0) {
            return undefined;
        }
        const mimeType = data.toString(mimeTypeDelimiterIndex - offset, StringType.UTF16LE, offset);
        offset = mimeTypeDelimiterIndex + delimiter.length;

        // Get the description
        const descriptionDelimiterIndex = data.find(delimiter, offset, delimiter.length);
        if (descriptionDelimiterIndex < 0) {
            return undefined;
        }
        const description = data.toString(descriptionDelimiterIndex - offset, StringType.UTF16LE, offset);
        offset = descriptionDelimiterIndex + 2;

        return Picture.fromFullData(data.mid(offset, pictureSize), pictureType, mimeType, description);
    }

    private static pictureToData(picture: IPicture) {
        // @TODO: Make Read/Render methods be in the File class? Or in a helper class?
        return ByteVector.concatenate(
            picture.type,
            BaseObject.renderDWord(picture.data.length),
            BaseObject.renderUnicode(picture.mimeType),
            BaseObject.renderUnicode(picture.description),
            picture.data
        );
    }

    private static splitAndClean(str: string): string[] {
        return !str
            ? []
            : str.split(";").map((s) => s.trim());
    }

    // #endregion
}
