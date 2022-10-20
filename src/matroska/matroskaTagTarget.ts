import {EbmlParser} from "../ebml/ebmlParser";
import {Guards} from "../utils";
import {MatroskaIds} from "./matroskaIds";

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

export default class MatroskaTagTarget {

    private _attachmentUids: number[] = [];
    private _chapterUids: number[] = [];
    private _editionUids: number[] = [];
    private _targetTypeString: TagTargetString;
    private _targetTypeValue: TagTargetValue;
    private _trackUids: number[] = [];

    private constructor() {}

    public static fromEmpty(value: TagTargetValue, str?: TagTargetString): MatroskaTagTarget {
        const target = new MatroskaTagTarget();
        target._targetTypeValue = value;
        target._targetTypeString = str;
        return target;
    }

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
            [MatroskaIds.TAG_EDITION_UID, p => target._trackUids.push(p.getUint())],
            [MatroskaIds.TAG_CHAPTER_UID, p => target._chapterUids.push(p.getUint())],
            [MatroskaIds.TAG_ATTACHMENT_UID, p => target._attachmentUids.push(p.getUint())]
        ]);
        parser.processChildren(parserActions);

        return target;
    }

    public clone(): MatroskaTagTarget {

    }

    public get targetTypeValue(): TagTargetValue { return this._targetTypeValue; }
    public get targetTypeString(): TagTargetString { return this._targetTypeString; }
}
