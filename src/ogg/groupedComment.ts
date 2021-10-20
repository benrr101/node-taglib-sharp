import {Tag, TagTypes} from "../tag";
import XiphComment from "../xiph/xiphComment";
import {Guards} from "../utils";

interface ICommentMapping {
    comment: XiphComment,
    streamSerialNumber: number
}

/**
 * This class combines a collection of {@link XiphComment} objects so that tagging properties can
 * be read from each but are only set to the first comment of the file.
 */
export default class GroupedComment extends Tag {
    private _comments: ICommentMapping[];

    /**
     * Constructs and initializes a new instance with no contents.
     */
    public constructor() {
        super();

        this._comments = [];
    }

    // #region Methods

    /**
     * Gets the list of comments in the current instance, in the order they were added.
     * @remarks Modifying this array makes no changes to the file. Use {@link setComment}.
     */
    public get comments(): XiphComment[] { return this._comments.map((m) => m.comment); }

    /**
     * Retrieves a Xiph comment for a given stream.
     * @param streamSerialNumber Serial number of the stream that contains the desired comment.
     *     Must be a positive 32-bit integer.
     * @returns XiphComment Xiph comment of the provided stream is returned if it exists, otherwise
     *     `undefined` is returned.
     */
    public getComment(streamSerialNumber: number): XiphComment {
        Guards.uint(streamSerialNumber, "streamSerialNumber");
        return this._comments.find((m) => m.streamSerialNumber === streamSerialNumber).comment;
    }

    /**
     * Stores or removes a Xiph comment in a given stream.
     * @param streamSerialNumber Serial number of the stream in which to store the comment. Must be
     *     a positive 32-bit integer
     * @param comment Xiph comment to store in the stream. Use `undefined` to clear the comment
     *     from the stream
     * @remarks Overwriting the comment for an existing stream will make that comment the last
     *     added comment in the list. if the first added comment in the file is overwritten, the
     *     second comment in the file will become the first, and any subsequent changes to the tags
     *     will be written to the second comment. Use with care.
     */
    public setComment(streamSerialNumber: number, comment: XiphComment): void {
        Guards.uint(streamSerialNumber, "streamSerialNumber");

        this._comments = this._comments.filter((m) => m.streamSerialNumber !== streamSerialNumber);
        if (comment) {
            this._comments.push({
                comment: comment,
                streamSerialNumber: streamSerialNumber
            });
        }
    }

    // #endregion

    // #region Tag Implementation

    /** @inheritDoc */
    public get tagTypes(): TagTypes { return this._comments.length > 0 ? TagTypes.Xiph : TagTypes.None; }

    public get title(): string {}

    // #endregion
}
