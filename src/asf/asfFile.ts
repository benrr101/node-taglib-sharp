import {File, FileAccessMode, ReadStyle} from "../file";
import UuidWrapper from "../uuidWrapper";
import BaseObject from "./objects/baseObject";
import AsfTag from "./asfTag";
import Properties from "../properties";
import {IFileAbstraction} from "../fileAbstraction";
import HeaderObject from "./objects/headerObject";
import {Tag, TagTypes} from "../tag";

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

    public readDWord(): number {}
    public readGuid(): UuidWrapper {}
    public readQWord(): bigint {}
    public readObject(position: number): BaseObject {}
    public readObjects(count: number, position: number): BaseObject[] {}
    public readUnicode(length: number): string {}
    public readWord(): number {}

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
