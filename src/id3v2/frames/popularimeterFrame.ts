import * as BigInt from "big-integer";
import FrameTypes from "../frameIdentifiers";
import {ByteVector, StringType} from "../../byteVector";
import {CorruptFileError} from "../../errors";
import {Frame, FrameClassType} from "./frame";
import {Id3v2FrameHeader} from "./frameHeader";
import {Guards} from "../../utils";

/**
 * This class extends {@see Frame} implementing support for ID3v2 popularimeter (POPM) frames.
 */
export default class PopularimeterFrame extends Frame {
    private _playCount: BigInt.BigInteger;
    private _rating: number;
    private _user: string = "";

    // #region Constructors

    private constructor(header: Id3v2FrameHeader) {
        super(header);
    }

    /**
     * Constructs and initializes a new instance by reading its raw data in a specified ID3v2
     * version. This method allows for offset reading from the data bytevector.
     * @param data Raw representation of the new frame
     * @param offset What offset in {@paramref data} the frame actually begins. Must be positive,
     *     safe integer
     * @param header Header of the frame found at {@paramref data} in the data
     */
    public static fromOffsetRawData(
        data: ByteVector,
        offset: number,
        header: Id3v2FrameHeader
    ): PopularimeterFrame {
        Guards.truthy(data, "data");
        Guards.uint(offset, "offset");
        Guards.truthy(header, "header");

        const frame = new PopularimeterFrame(header);
        frame.setData(data, offset, false);
        return frame;
    }

    /**
     * Constructs and initializes a new instance by reading its raw data in a specified
     * ID3v2 version.
     * @param data Raw representation of the new frame
     * @param version ID3v2 version the raw frame is encoded with, must be a positive 8-bit integer
     */
    public static fromRawData(data: ByteVector, version: number): PopularimeterFrame {
        Guards.truthy(data, "data");
        Guards.byte(version, "version");

        const frame = new PopularimeterFrame(new Id3v2FrameHeader(data, version));
        frame.setData(data, 0, true);
        return frame;
    }

    /**
     * Constructs and initializes a new instance for a specified user with a rating and play count
     * of zero.
     * @param user Email of the user that gave the rating
     */
    public static fromUser(user: string): PopularimeterFrame {
        const frame = new PopularimeterFrame(new Id3v2FrameHeader(FrameTypes.POPM, 4));
        frame.user = user;
        return frame;
    }

    // #endregion

    // #region Properties

    /** @inheritDoc */
    public get frameClassType(): FrameClassType { return FrameClassType.PopularimeterFrame; }

    /**
     * Gets the play count of the current instance
     */
    public get playCount(): BigInt.BigInteger { return this._playCount; }
    /**
     * Sets the play count of the current instance
     * @param value Play count of the current instance
     */
    public set playCount(value: BigInt.BigInteger) {
        if (value !== undefined) {
            Guards.ulong(value, "value");
        }
        this._playCount = value;
    }

    /**
     * Gets the rating of the current instance
     */
    public get rating(): number { return this._rating; }
    /**
     * Sets the rating of the current instance
     * @param value Rating of the current instance, must be a 8-bit unsigned integer.
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
     * Sets the email address of the user to whom the current instance belonds
     * @param value
     */
    public set user(value: string) { this._user = value || ""; }

    // #endregion

    /**
     * Gets a popularimeter frame from a specified tag that matches the given parameters
     * @param frames List of frames to search
     * @param user User email to use to match the frame in the {@paramref tag}
     * @returns PopularimeterFrame Frame containing the matching user or `undefined` if a match was
     *     not found
     */
    public static find(frames: PopularimeterFrame[], user: string): PopularimeterFrame {
        Guards.truthy(frames, "frames");
        return frames.find((f) => f.user === user);
    }

    /** @inheritDoc */
    public clone(): Frame {
        const frame = PopularimeterFrame.fromUser(this.user);
        frame.playCount = this.playCount;
        frame.rating = this.rating;
        return frame;
    }

    /** @inheritDoc */
    protected parseFields(data: ByteVector, version: number): void {
        const delim = ByteVector.getTextDelimiter(StringType.Latin1);

        const delimIndex = data.find(delim);
        if (delimIndex < 0) {
            throw new CorruptFileError("Popularimeter frame does not contain a text delimeter");
        }

        const bytesAfterOwner = data.length - delimIndex - 1;
        if (bytesAfterOwner < 1) {
            throw new CorruptFileError("Popularimeter frame is missing rating");
        }
        if (bytesAfterOwner > 1 && bytesAfterOwner < 5) {
            throw new CorruptFileError("Popularimeter frame with play count must have at least 4 bytes of play count");
        }

        this._user = data.toString(delimIndex, StringType.Latin1, 0);
        this._rating = data.get(delimIndex + 1);

        // Play count may be omitted
        if (bytesAfterOwner > 1) {
            this._playCount = data.mid(delimIndex + 2).toULong();
        }
    }

    /** @inheritDoc */
    protected renderFields(version: number): ByteVector {
        const data = ByteVector.concatenate(
            ByteVector.fromString(this._user, StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
            this.rating
        );

        // Only include personal play count if it's desired
        if (this.playCount !== undefined) {
            const playCountData = ByteVector.fromULong(this.playCount);

            // Remove zero bytes from beginning of play count, leaving at least 4 bytes
            let firstNonZeroIndex = 0;
            while (playCountData.get(firstNonZeroIndex) === 0x00 && firstNonZeroIndex < playCountData.length - 4) {
                firstNonZeroIndex++;
            }

            data.addByteVector(playCountData.mid(firstNonZeroIndex));
        }

        return data;
    }
}
