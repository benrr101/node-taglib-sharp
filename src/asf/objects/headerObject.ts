import AsfFile from "../asfFile";
import BaseObject from "./baseObject";
import FilePropertiesObject from "./filePropertiesObject";
import Guids from "../guids";
import HeaderExtensionObject from "./headerExtensionObject";
import PaddingObject from "./paddingObject";
import Properties from "../../properties";
import StreamPropertiesObject from "./streamPropertiesObject";
import {ByteVector} from "../../byteVector";
import {CorruptFileError} from "../../errors";
import {ICodec} from "../../iCodec";

/**
 * This class provides a representation of an ASF header object which can be read from and written
 * to disk.
 */
export default class HeaderObject extends BaseObject {
    private readonly _children: BaseObject[] = [];
    private _reserved: ByteVector;

    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance by reading the contents from a specified position
     * in the provided file.
     * @param file File containing contents that will be read into the new instance
     * @param position Position in the file where the instance begins
     */
    public static fromFile(file: AsfFile, position: number): HeaderObject {
        const instance = new HeaderObject();
        instance.initializeFromFile(file, position);

        if (!instance.guid.equals(Guids.AsfHeaderObject)) {
            throw new CorruptFileError("Object GUID does not match expected header object GUID");
        }
        if (instance.originalSize < 26) {
            throw new CorruptFileError("Header object is too small");
        }

        const childCount = file.readDWord();
        instance._reserved = file.readBlock(2);
        instance._children.push(... file.readObjects(childCount, file.position));

        return instance;
    }

    // #region Properties

    public get children(): BaseObject[] { return this._children; }

    /**
     * Gets the header extension object contained in the current instance.
     * @returns HeaderExtensionObject Header extension contained in this instance, if it exists.
     *     `undefined` is returned if it doesn't exist
     */
    public get extension(): HeaderExtensionObject {
        const extensionObj = this._children.find((o) => o.guid.equals(Guids.AsfHeaderExtensionObject));
        return <HeaderExtensionObject> extensionObj;
    }

    /**
     * Gets whether or not the current instance contains either type of content descriptors.
     * @returns boolean `true` if a content description object or extended content description
     *     object exists in this instance. `false` otherwise
     */
    public get hasContentDescriptors(): boolean {
        return this._children.findIndex((o) => {
            return o.guid.equals(Guids.AsfContentDescriptionObject)
                || o.guid.equals(Guids.AsfExtendedContentDescriptionObject);
        }) >= 0;
    }

    /**
     * Get the media properties contained within the current instance.
     */
    public get properties(): Properties {
        const codecs: ICodec[] = [];
        let durationMilliseconds = 0;

        for (const obj of this._children) {
            if (obj.guid.equals(Guids.AsfFilePropertiesObject)) {
                const fpObj = <FilePropertiesObject> obj;
                durationMilliseconds = fpObj.playDurationMilliseconds - fpObj.prerollMilliseconds;
            } else if (obj.guid.equals(Guids.AsfStreamPropertiesObject)) {
                codecs.push((<StreamPropertiesObject> obj).codec);
            }
        }

        return new Properties(durationMilliseconds, codecs);
    }

    // #endregion

    // #region Methods

    /**
     * Adds a unique child object to the current instance, replacing an existing child if present.
     * @param obj Object to add to the current instance
     */
    public addUniqueObject(obj: BaseObject): void {
        const existingIndex = this._children.findIndex((o) => o.guid.equals(obj.guid));
        if (existingIndex >= 0) {
            this._children[existingIndex] = obj;
        } else {
            this._children.push(obj);
        }
    }

    /**
     * Removes the content description objects from the current instance.
     */
    public removeContentDescriptor(): void {
        for (let i = this._children.length - 1; i >= 0; i--) {
            if (this._children[i].guid.equals(Guids.AsfContentDescriptionObject) ||
                this._children[i].guid.equals(Guids.AsfExtendedContentDescriptionObject)) {
                this._children.splice(i, 1);
            }
        }
    }

    /** @inheritDoc */
    public render(): ByteVector {
        // Render the non-padding children
        const substantiveChildren = this._children.filter((o) => !o.guid.equals(Guids.AsfPaddingObject));
        const childrenData = ByteVector.concatenate(... substantiveChildren.map((o) => o.render()));

        // Render any required padding
        let childCount = substantiveChildren.length;
        const sizeDifference = childrenData.length + 30 - this.originalSize;
        if (sizeDifference !== 0) {
            const obj = PaddingObject.fromSize(sizeDifference > 0 ? 4096 : -sizeDifference);
            childrenData.addByteVector(obj.render());
            childCount++;
        }

        // Put it all together
        const output = ByteVector.concatenate(
            BaseObject.renderDWord(childCount),
            this._reserved,
            childrenData
        );
        return super.renderInternal(output);
    }

    // #endregion
}
