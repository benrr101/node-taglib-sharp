import EbmlElement from "../ebml/ebmlElement";
import EbmlParser from "../ebml/ebmlParser";
import {MatroskaIds} from "./matroskaIds";
import {Guards} from "../utils";

/**
 * Association between a target type numeric value and a target type string value. Also provides a
 * collection of well-known target type combinations
 */
export class MatroskaTagTargetType {
    // #region Well Known Targets

    public static readonly ALBUM = new MatroskaTagTargetType(50, "ALBUM");
    public static readonly ALBUM_PART = new MatroskaTagTargetType(40, "PART");
    public static readonly CHAPTER = new MatroskaTagTargetType(30, "CHAPTER");
    public static readonly COLLECTION = new MatroskaTagTargetType(70, "COLLECTION");
    public static readonly CONCERT = new MatroskaTagTargetType(50, "CONCERT");
    public static readonly EDITION = new MatroskaTagTargetType(60, "EDITION");
    public static readonly EPISODE = new MatroskaTagTargetType(50, "EPISODE");
    public static readonly ISSUE = new MatroskaTagTargetType(60, "ISSUE");
    public static readonly MOVEMENT = new MatroskaTagTargetType(20, "MOVEMENT");
    public static readonly MOVIE = new MatroskaTagTargetType(50, "MOVIE");
    public static readonly OPERA = new MatroskaTagTargetType(50, "OPERA");
    public static readonly OPUS = new MatroskaTagTargetType(60, "OPUS");
    public static readonly SCENE = new MatroskaTagTargetType(20, "SCENE");
    public static readonly SEASON = new MatroskaTagTargetType(60, "SEASON");
    public static readonly SEQUEL = new MatroskaTagTargetType(60, "SEQUEL");
    public static readonly SESSION = new MatroskaTagTargetType(40, "SESSION");
    public static readonly SHOT = new MatroskaTagTargetType(10, "SHOT");
    public static readonly SONG = new MatroskaTagTargetType(30, "SONG");
    public static readonly SUBTRACK = new MatroskaTagTargetType(20, "SUBTRACK");
    public static readonly TRACK = new MatroskaTagTargetType(30, "TRACK");
    public static readonly TRACK_PART = new MatroskaTagTargetType(20, "PART");
    public static readonly VOLUME = new MatroskaTagTargetType(60, "VOLUME");

    // #endregion

    private readonly _str: string;
    private readonly _val: number;

    public constructor(value: number, str?: string) {
        Guards.byte(value, "value");
        if (value > 70) {
            throw new Error("Argument error: value must not be > 70.")
        }

        this._str = str;
        this._val = value;
    }

    /**
     * Gets the string representation of the target type.
     */
    public get string(): string { return this._str; }

    /**
     * Gets the numeric representation of the target type.
     */
    public get value(): number { return this._val; }
}

/**
 * Representation of the target of a tag. This is indicating what a tag applies to.
 */
export class MatroskaTagTarget {
    private _attachmentUids: bigint[] = [];
    private _chapterUids: bigint[] = [];
    private _editionUids: bigint[] = [];
    private _targetType: MatroskaTagTargetType;
    private _trackUids: bigint[] = [];

    private constructor() { /* No implementation to enforce private constructor */ }

    /**
     * Constructs a tag target using the provided {@paramref value} and {@paramref str}.
     * @param targetType target type for the tag's target. If `undefined` this indicated the tag
     *     applies to the entire file.
     */
    public static fromEmpty(targetType?: MatroskaTagTargetType): MatroskaTagTarget {
        const target = new MatroskaTagTarget();
        target._targetType = targetType
        return target;
    }

    /**
     * Constructs and initializes a new instance from an {@link EbmlParser} that points at a
     * tag targets element.
     * @param element Tag target root element
     */
    public static fromTargetsElement(element: EbmlElement): MatroskaTagTarget {
        Guards.truthy(element, "element");
        if (element.id !== MatroskaIds.TARGETS) {
            throw new Error(`Target constructor was provided element of type ${element.id}`);
        }

        const target = new MatroskaTagTarget();

        let targetTypeValue;
        let targetTypeString;
        const parserActions = new Map<number, (e: EbmlElement) => void>([
            [MatroskaIds.TARGET_TYPE_VALUE, e => targetTypeValue = e.getSafeUint()],
            [MatroskaIds.TARGET_TYPE, e => targetTypeString = e.getString()],
            [MatroskaIds.TAG_TRACK_UID, e => target._trackUids.push(e.getUlong())],
            [MatroskaIds.TAG_EDITION_UID, e => target._editionUids.push(e.getUlong())],
            [MatroskaIds.TAG_CHAPTER_UID, e => target._chapterUids.push(e.getUlong())],
            [MatroskaIds.TAG_ATTACHMENT_UID, e => target._attachmentUids.push(e.getUlong())]
        ]);
        EbmlParser.processElements(element.getParser(), parserActions);

        target._targetType = new MatroskaTagTargetType(targetTypeValue, targetTypeString);

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
        clone._targetType = this.targetType;
        clone._trackUids = this._trackUids.slice();
        return clone;
    }

    /**
     * Gets a collection of attachment UIDs that tags with this target apply to.
     */
    public get attachmentUids(): bigint[] { return this._attachmentUids; }

    /**
     * Gets a collection of chapter UIDs that tags with this target apply to.
     */
    public get chapterUids(): bigint[] { return this._chapterUids; }

    /**
     * Gets a collection of edition UIDs that tags with this target apply to.
     */
    public get editionUids(): bigint[] { return this._editionUids; }

    /**
     * Gets the tag target type for the current instance. This is a value that indicates the
     * "level" that the target belongs to.
     */
    public get targetType(): MatroskaTagTargetType { return this._targetType; }

    /**
     * Gets a collection of track UIDs that tags with this target apply to.
     */
    public get trackUids(): bigint[] { return this._trackUids; }
}
