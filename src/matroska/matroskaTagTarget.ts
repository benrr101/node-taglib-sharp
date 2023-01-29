import {EbmlParser} from "../ebml/ebmlParser";
import {Guards} from "../utils";
import {MatroskaIds} from "./matroskaIds";

/**
 * String representation of the tag target.
 */
export enum TagTargetString {
    Album = "ALBUM",
    AlbumPart = "PART",
    Chapter = "CHAPTER",
    Collection = "COLLECTION",
    Concert = "CONCERT",
    Edition = "EDITION",
    Episode = "EPISODE",
    Issue = "ISSUE",
    Movement = "MOVEMENT",
    Movie = "MOVIE",
    Opera = "OPERA",
    Opus = "OPUS",
    Scene = "SCENE",
    Season = "SEASON",
    Sequel = "SEQUEL",
    Session = "SESSION",
    Shot = "SHOT",
    Song = "SONG",
    Subtrack = "SUBTRACK",
    Track = "TRACK",
    TrackPart = "PART",
    Volume = "VOLUME"
}

/**
 * Numeric representations of the tag target.
 */
export enum TagTargetValue {
    Album = 50,
    AlbumPart = 40,
    Chapter = 30,
    Collection = 70,
    Concert = 50,
    Edition = 60,
    Episode = 50,
    Issue = 60,
    Movement = 20,
    Movie = 50,
    Opera = 50,
    Opus = 60,
    Season = 60,
    Sequel = 60,
    Session = 40,
    Scene = 20,
    Shot = 10,
    Song = 30,
    Subtrack = 20,
    Track = 30,
    TrackPart = 20,
    Volume = 60
}

/**
 * Representation of the target of a tag.
 */
export class MatroskaTagTarget {

    private _attachmentUids: number[] = [];
    private _chapterUids: number[] = [];
    private _editionUids: number[] = [];
    private _targetTypeString: TagTargetString;
    private _targetTypeValue: TagTargetValue;
    private _trackUids: number[] = [];

    private constructor() { /* No implementation to enforce private constructor */ }

    /**
     * Constructs a tag target using the provided {@paramref value} and {@paramref str}.
     * @param value Numeric representation of the tag target.
     * @param str String representation of the tag target.
     */
    public static fromEmpty(value: TagTargetValue, str?: TagTargetString): MatroskaTagTarget {
        const target = new MatroskaTagTarget();
        target._targetTypeValue = value;
        target._targetTypeString = str;
        return target;
    }

    /**
     * Constructs and initializes a new instance from an {@link EbmlParser} that points at a
     * tag target element.
     * @param parser Parser that points at a tag target element
     */
    public static fromTargetsEntry(parser: EbmlParser): MatroskaTagTarget {
        Guards.truthy(parser, "parser");

        const target = new MatroskaTagTarget();

        const parserActions = new Map<number, (p: EbmlParser) => void>([
            [
                MatroskaIds.TARGET_TYPE_VALUE,
                p => target._targetTypeValue = p.getUint() as TagTargetValue
            ],
            [
                MatroskaIds.TARGET_TYPE,
                p => target._targetTypeString = p.getString() as TagTargetString
            ],
            [MatroskaIds.TAG_TRACK_UID, p => target._trackUids.push(p.getUint())],
            [MatroskaIds.TAG_EDITION_UID, p => target._editionUids.push(p.getUint())],
            [MatroskaIds.TAG_CHAPTER_UID, p => target._chapterUids.push(p.getUint())],
            [MatroskaIds.TAG_ATTACHMENT_UID, p => target._attachmentUids.push(p.getUint())]
        ]);
        parser.processChildren(parserActions);

        return target;
    }

    /**
     * Clones the current instance.
     */
    public clone(): MatroskaTagTarget {
        const clone = new MatroskaTagTarget();
        clone._attachmentUids = this._attachmentUids.slice();
        clone._chapterUids = this._chapterUids.slice();
        clone._editionUids = this._editionUids.slice();
        clone._targetTypeString = this._targetTypeString;
        clone._targetTypeValue = this._targetTypeValue;
        clone._trackUids = this._trackUids.slice();
        return clone;
    }

    /**
     * Gets the numeric value of the tag target, colloquially known as the "level".
     */
    public get targetTypeValue(): TagTargetValue { return this._targetTypeValue; }

    /**
     * Gets a string representation of the tag target.
     */
    public get targetTypeString(): TagTargetString { return this._targetTypeString; }
}
