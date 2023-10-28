import FullBox from "./fullBox";
import Mpeg4BoxHeader from "../mpeg4BoxHeader";
import {ByteVector} from "../../byteVector";
import {File} from "../../file";
import {Guards} from "../../utils";

/**
 * This class extends @see FullBox to provide an implementation of a ISO/IEC 14496-12 MovieHeaderBox.
 */
export default class IsoMovieHeaderBox extends FullBox {
    private _nextTrackId: number;
    private _creationTime: number;
    private _modificationTime: number;
    private _durationInMilliseconds: number;
    private _rate: number;
    private _volume: number;
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
     * @param handlerType Type of the handler box object containing the handler that applies to the
     *     new instance, or undefined if no handler applies.
     * @returns A new instance of @see IsoMovieHeaderBox
     */
    public static fromFile(header: Mpeg4BoxHeader, file: File, handlerType: ByteVector): IsoMovieHeaderBox {
        const instance = new IsoMovieHeaderBox();
        instance.initializeFromHeaderFileAndHandler(header, file, handlerType);

        let bytesRemaining = instance.dataSize;
        let data: ByteVector;

        if (instance.version === 1) {
            // Read version one (large integers).
            data = file.readBlock(Math.min(28, bytesRemaining));

            if (data.length >= 8) {
                instance._creationTime = Number(data.subarray(0, 8).toUlong());
            }

            if (data.length >= 16) {
                instance._modificationTime = Number(data.subarray(8, 8).toUlong());
            }

            const timescale = data.length >= 20
                ? data.subarray(16, 4).toUint()
                : 0;

            let duration = 0;
            if (data.length >= 28) {
                duration = Number(data.subarray(20, 8).toUlong());
                instance._durationInMilliseconds = (duration / timescale) * 1000;
            }

            bytesRemaining -= 28;
        } else {
            // Read version zero (normal integers).
            data = file.readBlock(Math.min(16, bytesRemaining));

            if (data.length >= 4) {
                instance._creationTime = data.subarray(0, 4).toUint();
            }

            if (data.length >= 8) {
                instance._modificationTime = data.subarray(4, 4).toUint();
            }

            const timescale = data.length >= 12
                ? data.subarray(8, 4).toUint()
                : 0;

            let duration = 0;
            if (data.length >= 16) {
                duration = data.subarray(12, 4).toUint();
                instance._durationInMilliseconds = (duration / timescale) * 1000;
            }

            bytesRemaining -= 16;
        }

        data = file.readBlock(Math.min(6, bytesRemaining));

        if (data.length >= 4) {
            instance._rate = data.subarray(0, 4).toUint() / 0x10000;
        }

        if (data.length >= 6) {
            instance._volume = data.subarray(4, 2).toUshort() / 0x100;
        }

        file.seek(file.position + 70);
        bytesRemaining -= 76;

        data = file.readBlock(Math.min(4, bytesRemaining));

        if (data.length >= 4) {
            instance._nextTrackId = data.subarray(0, 4).toUint();
        }

        return instance;
    }

    /**
     * Gets the ID of the next track in the movie represented by the current instance.
     */
    public get nextTrackId(): number { return this._nextTrackId; }

    /**
     * Gets the creation time of the movie.
     */
    public get creationTime(): number { return this._creationTime; }

    /**
     * Gets the modification time of the movie.
     */
    public get modificationTime(): number { return this._modificationTime; }

    /**
     * Gets the duration of the movie represented by the current instance.
     */
    public get durationInMilliseconds(): number { return this._durationInMilliseconds; }

    /**
     * Gets the playback rate of the movie represented by the current instance.
     */
    public get rate(): number { return this._rate; }

    /**
     * Gets the playback volume of the movie represented by the current instance.
     */
    public get volume(): number { return this._volume; }
}
