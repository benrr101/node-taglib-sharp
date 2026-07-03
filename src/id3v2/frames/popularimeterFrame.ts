import Frame from "./frame";
import {ByteVector, StringType} from "../../byteVector";
import {CorruptFileError, NotSupportedError} from "../../errors";
import {Id3v2FrameHeader} from "./frameHeader";
import {FrameIdentifiers} from "../frameIdentifiers";
import {ArrayUtils, Guards} from "../../utils";

/**
 * This class extends {@link Frame} implementing support for ID3v2 popularimeter (POPM) frames.
 */
export default class PopularimeterFrame extends Frame {
    private _playCount: bigint;
    private _rating: number;
    private _user: string;

    // #region Constructors

    private constructor(header: Id3v2FrameHeader) {
        super(header);
    }

    /**
     * Constructs and initialized a new instance by parsing values from the field data.
     * @param header Header of the frame
     * @param fieldBytes Bytes that contain the body of the frame
     * @param version ID3v2 version the frame was originally encoded with
     */
    public static fromFieldBytes(
        header: Id3v2FrameHeader,
        fieldBytes: ByteVector,
        version: number
    ): PopularimeterFrame {
        Guards.truthy(header, "header");
        Guards.truthy(fieldBytes, "fieldBytes");
        Guards.byte(version, "version");

        // Email to user   <text string> $00
        // Rating          $xx
        // Counter         $xx xx xx xx (xx ...)

        const frame = new PopularimeterFrame(header);

        const delim = ByteVector.getTextDelimiter(StringType.Latin1);
        const split = fieldBytes.split(delim, 1, 2);
        if (split.length === 1) {
            throw new CorruptFileError("Popularimeter frame does not contain text delimiter.");
        }

        frame._user = split[0].toString(StringType.Latin1);

        if (split[1].length < 1) {
            throw new CorruptFileError("Popularimeter frame does not contain rating byte.");
        }

        frame._rating = split[1].get(0);

        const counterBytes = split[1].subarray(1);
        if (counterBytes.length < 4) {
            // Assume playcount wasn't provided
            frame._playCount = undefined;
        } else if (counterBytes.length > 8) {
            throw new NotSupportedError("node-taglib-sharp only supports up to 64-bits of play count values.");
        } else {
            frame._playCount = counterBytes.toUlong();
        }

        return frame;
    }

    /**
     * Constructs and initializes a new instance for a specified user with a rating and play count
     * of zero.
     * @param user Optional, email of the user that gave the rating. If omitted, defaults to `""`.
     * @param rating Optional, rating of the track. If omitted, defaults to 0.
     * @param playCount Optional, number of times the track has been played.
     */
    public static fromFields(user?: string, rating?: number, playCount?: bigint): PopularimeterFrame {
        Guards.byteOptional(rating, "rating");
        Guards.ulongOptional(playCount, "playCount");

        const frame = new PopularimeterFrame(new Id3v2FrameHeader(FrameIdentifiers.POPM));
        frame._playCount = playCount;
        frame._rating = rating ?? 0;
        frame._user = user ?? "";

        return frame;
    }

    // #endregion

    // #region Properties

    /**
     * Gets the play count of the current instance
     */
    public get playCount(): bigint { return this._playCount; }
    /**
     * Sets the play count of the current instance
     * @param value Play count of the current instance
     */
    public set playCount(value: bigint) {
        Guards.ulong(value, "value");
        this._playCount = value === null ? undefined : value;
    }

    /**
     * Gets the rating of the current instance
     */
    public get rating(): number { return this._rating || 0; }
    /**
     * Sets the rating of the current instance
     * @param value Rating of the current instance, must be an 8-bit unsigned integer.
     */
    public set rating(value: number) {
        Guards.byte(value, "value");
        this._rating = value;
    }

    /**
     * Gets the email address of the user to whom the current instance belongs
     */
    public get user(): string { return this._user; }
    /**
     * Sets the email address of the user to whom the current instance belongs
     * @param value
     */
    public set user(value: string) { this._user = value || ""; }

    // #endregion

    public static filterFrames(frames: Frame[]): PopularimeterFrame[] {
        Guards.truthy(frames, "frames");
        return ArrayUtils.ofType(frames, PopularimeterFrame);
    }

    /** @inheritDoc */
    public clone(): Frame {
        return PopularimeterFrame.fromFields(this._user, this._rating, this._playCount);
    }

    /** @inheritDoc */
    protected renderFields(): ByteVector {
        // Only include personal play count if it's desired
        let playCountData: ByteVector;
        if (this.playCount !== undefined) {
            playCountData = ByteVector.fromUlong(this.playCount);

            // Remove zero bytes from beginning of play count, leaving at least 4 bytes
            let firstNonZeroIndex = 0;
            while (playCountData.get(firstNonZeroIndex) === 0x00 && firstNonZeroIndex < playCountData.length - 4) {
                firstNonZeroIndex++;
            }

            playCountData = playCountData.subarray(firstNonZeroIndex);
        }

        return ByteVector.concatenate(
            ByteVector.fromString(this._user, StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
            this.rating,
            playCountData
        );
    }
}
