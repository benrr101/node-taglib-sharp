import FullBox from "./fullBox";
import IsoHandlerBox from "./isoHandlerBox";
import Mpeg4BoxHeader from "../mpeg4BoxHeader";
import {ByteVector} from "../../byteVector";
import {File} from "../../file";
import {Mpeg4BoxClassType} from "../mpeg4BoxClassType";
import {Guards} from "../../utils";

/**
 * This class extends @see FullBox to provide an implementation of a ISO/IEC 14496-12 MovieHeaderBox.
 */
export default class IsoMovieHeaderBox extends FullBox {
    /**
     * Contains the ID of the next track in the movie represented by the current instance.
     */
    public nextTrackId: number;

    /**
     * Contains the creation time of the movie.
     */
    public creationTime: number;

    /**
     * Contains the modification time of the movie.
     */
    public modificationTime: number;

    /**
     * Contains the duration of the movie represented by the current instance.
     */
    public durationInMilliseconds: number;

    /**
     *  Contains the playback rate of the movie represented by the current instance.
     */
    public rate: number;

    /**
     *  Contains the playback volume of the movie represented by the current instance.
     */
    public volume: number;

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
     * @param handler A @see IsoHandlerBox object containing the handler that applies to the new instance.
     * @returns A new instance of @see IsoMovieHeaderBox
     */
    public static fromHeaderFileAndHandler(
        header: Mpeg4BoxHeader,
        file: File,
        handler: IsoHandlerBox
    ): IsoMovieHeaderBox {
        Guards.notNullOrUndefined(file, "file");

        const instance: IsoMovieHeaderBox = new IsoMovieHeaderBox();
        instance.initializeFromHeaderFileAndHandler(header, file, handler);

        let bytesRemaining: number = instance.dataSize;
        let data: ByteVector;

        if (instance.version === 1) {
            // Read version one (large integers).
            data = file.readBlock(Math.min(28, bytesRemaining));

            if (data.length >= 8) {
                instance.creationTime = Number(data.subarray(0, 8).toUlong());
            }

            if (data.length >= 16) {
                instance.modificationTime = Number(data.subarray(8, 8).toUlong());
            }

            let timescale: number = 0;

            if (data.length >= 20) {
                timescale = data.subarray(16, 4).toUint();
            }

            let duration: number = 0;

            if (data.length >= 28) {
                duration = Number(data.subarray(20, 8).toUlong());
                instance.durationInMilliseconds = IsoMovieHeaderBox.calculateDurationInMilliseconds(
                    duration,
                    timescale
                );
            }

            bytesRemaining -= 28;
        } else {
            // Read version zero (normal integers).
            data = file.readBlock(Math.min(16, bytesRemaining));

            if (data.length >= 4) {
                instance.creationTime = data.subarray(0, 4).toUint();
            }

            if (data.length >= 8) {
                instance.modificationTime = data.subarray(4, 4).toUint();
            }

            let timescale: number = 0;

            if (data.length >= 12) {
                timescale = data.subarray(8, 4).toUint();
            }

            let duration: number = 0;

            if (data.length >= 16) {
                duration = data.subarray(12, 4).toUint();
                instance.durationInMilliseconds = IsoMovieHeaderBox.calculateDurationInMilliseconds(
                    duration,
                    timescale
                );
            }

            bytesRemaining -= 16;
        }

        data = file.readBlock(Math.min(6, bytesRemaining));

        if (data.length >= 4) {
            instance.rate = IsoMovieHeaderBox.calculateRate(data.subarray(0, 4).toUint());
        }

        if (data.length >= 6) {
            instance.volume = IsoMovieHeaderBox.calculateVolume(data.subarray(4, 2).toUshort());
        }

        file.seek(file.position + 70);
        bytesRemaining -= 76;

        data = file.readBlock(Math.min(4, bytesRemaining));

        if (data.length >= 4) {
            instance.nextTrackId = data.subarray(0, 4).toUint();
        }

        return instance;
    }

    /** @inheritDoc */
    public get boxClassType(): Mpeg4BoxClassType { return Mpeg4BoxClassType.IsoMovieHeaderBox; }

    private static calculateDurationInMilliseconds(duration: number, timescale: number): number {
        // The length is the number of ticks divided by ticks per second.
        return (duration / timescale) * 1000;
    }

    private static calculateRate(rate: number): number {
        return rate / 0x10000;
    }

    private static calculateVolume(volume: number): number {
        return volume / 0x100;
    }
}
