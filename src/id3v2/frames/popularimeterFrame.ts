import * as BigInt from "big-integer";
import FrameTypes from "../frameTypes";
import Id3v2Tag from "../id3v2Tag";
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
     * @param version ID3v2 version the raw frame is encoded with. Must be positive 8-bit integer.
     */
    public static fromOffsetRawData(
        data: ByteVector,
        offset: number,
        header: Id3v2FrameHeader,
        version: number
    ): PopularimeterFrame {
        Guards.truthy(data, "data");
        Guards.uint(offset, "offset");
        Guards.truthy(header, "header");
        Guards.byte(version, "version");

        const frame = new PopularimeterFrame(header);
        frame.setData(data, offset, version, false);
        return frame;
    }

    /**
     * Constructs and initializes a new instance by reading its raw data in a specified
     * ID3v2 version.
     * @param data Raw representation of the new frame
     * @param version ID3v2 version the raw frame is encoded with, must be a positive 8-bit integer
     */
    public static fromRawData(data: ByteVector, version: number): PopularimeterFrame {
        const frame = new PopularimeterFrame(new Id3v2FrameHeader(data, version));
        frame.setData(data, 0, version, true);
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
        Guards.ulong(value, "value");
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
     * Gets a popularimeter frame from a specified tag, optionally creating it if it does not
     * exist.
     * @param tag Object to search in
     * @param user User email to use to match the frame in the {@paramref tag}
     * @param create Whether or not to create an add a new frame to the tag if a match is not found
     * @returns PopularimeterFrame Frame containing the matching user, `undefined` if a match was
     *     not found and {@paramref create} is `false`. A new frame is returned if
     *     {@paramref create} is `true`.
     */
    public static get(tag: Id3v2Tag, user: string, create: boolean): PopularimeterFrame {
        Guards.truthy(tag, "tag");

        const popFrames = tag.getFramesByClassType<PopularimeterFrame>(FrameClassType.PopularimeterFrame);
        let popFrame = popFrames.find((f) => f.user === user);

        if (popFrame || !create) { return popFrame; }

        // Create new frame
        popFrame = PopularimeterFrame.fromUser(user);
        tag.addFrame(popFrame);
        return popFrame;
    }

    /** @inheritDoc */
    protected parseFields(data: ByteVector, version: number): void {
        const delim = ByteVector.getTextDelimiter(StringType.Latin1);

        const index = data.find(delim);
        if (index < 0) {
            throw new CorruptFileError("Popularimeter frame does not contain a text delimeter");
        }
        if (index + 2 > data.length) {
            throw new CorruptFileError("Popularimeter frame is too short");
        }

        this._user = data.toString(index, StringType.Latin1, 0);
        this.rating = data.get(index + 1);
        this.playCount = data.mid(index + 2).toULong();
    }

    /** @inheritDoc */
    protected renderFields(version: number): ByteVector {
        const data = ByteVector.fromULong(this.playCount);
        while (data.length > 0 && data.get(0) === 0x0) {
            data.removeAtIndex(0);
        }

        data.insertByte(0, this.rating);
        data.insertByte(0, 0);
        data.insertByteVector(0, ByteVector.fromString(this._user, StringType.Latin1));
        return data;
    }
}
