import AsfTag from "./asfTag";
import BaseObject from "./objects/baseObject";
import ContentDescriptionObject from "./objects/contentDescriptionObject";
import FilePropertiesObject from "./objects/filePropertiesObject";
import Guids from "./guids";
import HeaderExtensionObject from "./objects/headerExtensionObject";
import HeaderObject from "./objects/headerObject";
import PaddingObject from "./objects/paddingObject";
import Properties from "../properties";
import StreamPropertiesObject from "./objects/streamPropertiesObject";
import UnknownObject from "./objects/unknownObject";
import UuidWrapper from "../uuidWrapper";
import {StringType} from "../byteVector";
import {ExtendedContentDescriptionObject} from "./objects/extendedContentDescriptionObject";
import {File, FileAccessMode, ReadStyle} from "../file";
import {IFileAbstraction} from "../fileAbstraction";
import {MetadataLibraryObject} from "./objects/metadataLibraryObject";
import {Tag, TagTypes} from "../tag";
import {Guards} from "../utils";

/**
 * This class provides tagging and properties support for Microsoft's ASF files.
 */
export default class AsfFile extends File {
    private _asfTag: AsfTag;
    private _properties: Properties;

    public constructor(file: IFileAbstraction|string, propertiesStyle: ReadStyle) {
        super(file);

        this.mode = FileAccessMode.Read;
        try {
            const header = HeaderObject.fromFile(this, 0);
            if (header.hasContentDescriptors) {
                this._tagTypesOnDisk |= TagTypes.Asf;
            }

            this._asfTag = AsfTag.fromHeader(header);
            this._invariantStartPosition = header.originalSize;
            this._invariantEndPosition = this.length;

            if ((propertiesStyle & ReadStyle.Average) !== 0) {
                this._properties = header.properties;
            }
        } finally {
            this.mode = FileAccessMode.Closed;
        }
    }

    /** @inheritDoc */
    public get properties(): Properties { return this._properties; }

    /** @inheritDoc */
    public get tag(): AsfTag { return this._asfTag; }

    // #region Methods

    /** @inheritDoc */
    public getTag(type: TagTypes, create: boolean): Tag {
        return type === TagTypes.Asf ? this._asfTag : undefined;
    }

    /**
     * Reads a 4-byte double word from the current instance.
     */
    public readDWord(): number {
        return this.readBlock(4).toUInt(false);
    }

    /**
     * Reads a 16-byte GUID from the current instance.
     */
    public readGuid(): UuidWrapper {
        return new UuidWrapper(this.readBlock(16).data);
    }

    /**
     * Reads an 8-byte quad word from the current instance.
     */
    public readQWord(): bigint {
        return this.readBlock(8).toLong(false);
    }

    /**
     * Reads a single object from the current instance.
     * @param position Position within the file at which the object begins
     * @returns BaseObject An object of the appropriate type as read from the current instance
     */
    public readObject(position: number): BaseObject {
        this.seek(position);
        const guid = this.readGuid();

        if (guid.equals(Guids.AsfFilePropertiesObject)) {
            return FilePropertiesObject.fromFile(this, position);
        }
        if (guid.equals(Guids.AsfStreamPropertiesObject)) {
            return StreamPropertiesObject.fromFile(this, position);
        }
        if (guid.equals(Guids.AsfContentDescriptionObject)) {
            return ContentDescriptionObject.fromFile(this, position);
        }
        if (guid.equals(Guids.AsfExtendedContentDescriptionObject)) {
            return ExtendedContentDescriptionObject.fromFile(this, position);
        }
        if (guid.equals(Guids.AsfPaddingObject)) {
            return PaddingObject.fromFile(this, position);
        }
        if (guid.equals(Guids.AsfHeaderExtensionObject)) {
            return HeaderExtensionObject.fromFile(this, position);
        }
        if (guid.equals(Guids.AsfMetadataLibraryObject)) {
            return MetadataLibraryObject.fromFile(this, position);
        }

        return UnknownObject.fromFile(this, position);
    }

    /**
     * Reads a collection of objects from the current instance.
     * @param count Number of objects to read, must be a positive, 32-bit integer
     * @param position Position within the file at which to start reading objects
     * @returns BaseObject[] Array of objects read from the file
     */
    public readObjects(count: number, position: number): BaseObject[] {
        Guards.uint(count, "count");

        const objects = [];
        for (let i = 0; i < count; i++) {
            const obj = this.readObject(position);
            position += obj.originalSize;
            objects.push(obj);
        }

        return objects;
    }

    /**
     * Reads a UTF-16LE string of specified length in bytes from the current instance.
     * @param length Length in bytes to read as the string
     */
    public readUnicode(length: number): string {
        const string = this.readBlock(length).toString(undefined, StringType.UTF16LE);
        const nullIndex = string.indexOf("\0");
        return nullIndex >= 0 ? string.substring(0, nullIndex) : string;
    }

    /**
     * Reads a 2-byte word from the current instance.
     */
    public readWord(): number {
        return this.readBlock(2).toUShort(false);
    }

    /** @inheritDoc */
    public removeTags(types: TagTypes): void {
        if ((types & TagTypes.Asf) === TagTypes.Asf) {
            this._asfTag.clear();
        }
    }

    /** @inheritDoc */
    public save(): void {
        super.preSave();
        this.mode = FileAccessMode.Write;
        try {
            // Re-read the header
            const header = HeaderObject.fromFile(this, 0);

            if (!this._asfTag) {
                // This header doesn't have a tag, but clear it just to be safe
                header.removeContentDescriptor();
                this._tagTypesOnDisk &= ~TagTypes.Asf;
            } else {
                // This header does have a tag, set the objects we have to it
                this._tagTypesOnDisk |= TagTypes.Asf;
                header.addUniqueObject(this._asfTag.contentDescriptionObject);
                header.addUniqueObject(this._asfTag.extendedContentDescriptionObject);
                header.addUniqueObject(this._asfTag.metadataLibraryObject);
            }

            // Write the updated header to the file
            const output = header.render();
            const diff = output.length - header.originalSize;
            super.insert(output, 0, header.originalSize);

            this._invariantStartPosition += diff;
            this._invariantEndPosition += diff;
        } finally {
            this.mode = FileAccessMode.Closed;
        }
    }

    // #endregion
}

////////////////////////////////////////////////////////////////////////////
// Register the file type
[
    "taglib/wma",
    "taglib/wmv",
    "taglib/asf",
    "audio/x-ms-wma",
    "audio/x-ms-asf",
    "video/x-ms-asf"
].forEach((mt) => File.addFileType(mt, AsfFile));
