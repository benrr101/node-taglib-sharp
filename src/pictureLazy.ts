import * as Path from "path";

import ILazy from "./iLazy";
import {IPicture, Picture, PictureType} from "./picture";
import {ByteVector} from "./byteVector";
import {IFileAbstraction, LocalFileAbstraction} from "./fileAbstraction";
import {Guards} from "./utils";
import {SeekOrigin} from "./stream";

/**
 * This class implements {@link IPicture} and provides mechanisms for loading pictures from files.
 * Contrary to {@link Picture}, a reference to a file where the picture is located can be given and
 * the picture is lazily loaded from the file, meaning that it will be read from the file only when
 * needed. This saves time and memory if the picture loading is not required.
 */
export default class PictureLazy implements IPicture, ILazy {
    private _data: ByteVector;
    private _description: string;
    private _file: IFileAbstraction;
    private _filename: string;
    private _mimeType: string;
    private _streamOffset: number;
    private _streamSize: number;
    private _type: PictureType;

    // #region Constructors

    private constructor() {}

    /**
     * Constructs a new picture using data that's already been read into memory. The content
     * will not be lazily loaded.
     * @param data ByteVector Object containing picture data
     */
    public static fromData(data: ByteVector): PictureLazy {
        Guards.truthy(data, "data");

        const picture = new PictureLazy();
        picture._data = ByteVector.fromByteVector(data);

        const extension = Picture.getExtensionFromData(data);
        if (extension) {
            picture._type = PictureType.FrontCover;
            picture._filename = `cover${extension}`;
            picture._description = picture._filename;
        } else {
            picture._type = PictureType.NotAPicture;
            picture._filename = "UnknownType";
        }
        picture._mimeType = Picture.getMimeTypeFromFilename(picture._filename);

        return picture;
    }

    /**
     * Constructs a new instance from a file abstraction. The content will be lazily loaded.
     * @param file File abstraction containing the file to read
     * @param offset Index into the file where the picture is located, must be a 32-bit integer
     * @param size Optionally, size of the picture in bytes. If omitted, all bytes of file will be
     *     read when lazily loaded. Must be a 32-bit integer or `undefined`
     */
    public static fromFile(file: IFileAbstraction, offset: number, size?: number): PictureLazy {
        Guards.truthy(file, "file");
        Guards.int(offset, "offset");
        if (size !== undefined) {
            Guards.int(offset, "size");
        }

        const picture = new PictureLazy();
        picture._file = file;
        picture._streamOffset = offset;
        picture._streamSize = size;
        picture._filename = file.name;
        picture._description = file.name;

        if (picture._filename && picture._filename.indexOf(".") > -1) {
            picture._mimeType = Picture.getMimeTypeFromFilename(picture._filename);
            picture._type = picture._mimeType.startsWith("image/") ? PictureType.FrontCover : PictureType.NotAPicture;
        }

        return picture;
    }

    /**
     * Constructs a new instance that will be lazily loaded from the path provided.
     * @param path Path to the file to read
     */
    public static fromPath(path: string): PictureLazy {
        Guards.truthy(path, "path");

        const picture = new PictureLazy();
        picture._file = new LocalFileAbstraction(path);
        picture._filename = Path.basename(path);
        picture._description = picture._filename;
        picture._mimeType = Picture.getMimeTypeFromFilename(picture._filename);
        picture._type = picture._mimeType.startsWith("image/") ? PictureType.FrontCover : PictureType.NotAPicture;

        return picture;
    }

    // #endregion

    // #region Properties

    /** @inheritDoc */
    public get data(): ByteVector {
        if (!this._data) { this.load(); }
        return this._data;
    }
    /** @inheritDoc */
    public set data(value: ByteVector) { this._data = value; }

    /** @inheritDoc */
    public get description(): string { return this._description; }
    /** @inheritDoc */
    public set description(value: string) { this._description = value; }

    /** @inheritDoc */
    public get filename(): string {
        if (!this._filename) { this.load(); }
        return this._filename;
    }
    /** @inheritDoc */
    public set filename(value: string) { this._filename = value; }

    /** @inheritDoc */
    public get isLoaded(): boolean { return !!this._data; }

    /** @inheritDoc */
    public get mimeType(): string {
        if (!this._mimeType) { this.load(); }
        return this._mimeType;
    }
    /** @inheritDoc */
    public set mimeType(value: string) { this._mimeType = value; }

    /** @inheritDoc */
    public get type(): PictureType {
        if (this._type === PictureType.Other && !this._mimeType) { this.load(); }
        return this._type;
    }
    /** @inheritDoc */
    public set type(value: PictureType) { this._type = value; }

    // #endregion

    // #region Methods

    /** @inheritDoc */
    public load(): void {
        // Already loaded?
        if (this._data) {
            return;
        }

        // Load the picture from the stream for the file
        let stream;
        try {
            if (this._streamSize === 0) {
                // Picture is 0 bytes, just use an empty byte vector for the data
                this._data = ByteVector.empty();
            } else if (this._streamSize !== undefined) {
                // Picture length was defined, read those bytes as the data
                stream = this._file.readStream;
                stream.seek(this._streamOffset, SeekOrigin.Begin);

                let count = 0;
                let read = 0;
                let needed = this._streamSize;
                const buffer = new Uint8Array(needed);

                do {
                    count = stream.read(buffer, read, needed);
                    read += count;
                    needed -= count;
                } while (needed > 0 && count !== 0);

                this._data = ByteVector.fromByteArray(buffer, read);
            } else {
                // Picture length was not defined, read entire stream as the data
                stream = this._file.readStream;
                stream.seek(this._streamOffset, SeekOrigin.Begin);
                this._data = ByteVector.fromInternalStream(stream);
            }
        } finally {
            // Free any open resources
            if (stream && this._file) {
                this._file.closeStream(stream);
            }
            this._file = undefined;
        }

        // Retrieve remaining properties from data (if required)
        if (!this._mimeType) {
            const ext = Picture.getExtensionFromData(this._data);
            this._mimeType = Picture.getMimeTypeFromFilename(ext);
            if (ext) {
                this._type = PictureType.FrontCover;
                if (!this._filename) {
                    this._filename = `cover${ext}`;
                    this._description = this._filename;
                }
            } else {
                this._type = PictureType.NotAPicture;
                if (!this._filename) {
                    this._filename = "UnknownType";
                }
            }
        }
    }

    // #endregion
}
