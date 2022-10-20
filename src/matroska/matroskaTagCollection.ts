import {Tag, TagTypes} from "../tag";
import {Guards} from "../utils";
import MatroskaAttachment from "./attachment";
import MatroskaTag from "./matroskaTag";
import MatroskaTagValue from "./matroskaTagValue";
import MatroskaTagTarget, {TagTargetValue} from "./matroskaTagTarget";
import Genres from "../genres";

export default class MatroskaTagCollection extends Tag {

    private static readonly PERFORMER_AUDIO_KEY = "PERFORMER";
    private static readonly PERFORMER_VIDEO_KEY = "ACTOR";
    private static readonly NUMERIC_GENRE_REGEX = new RegExp(/\((\d+)\)/);

    private readonly _albumTagLevel: number;
    private readonly _isVideo: boolean;
    private readonly _fileTagLevel: number;
    private readonly _performerKey: string;

    private _attachments: MatroskaAttachment[];
    private _sizeOnDisk: number = 0;
    private _tags: MatroskaTag[] = [];

    public constructor(sizeOnDisk: number, isVideo: boolean, tags: MatroskaTag[], attachments: MatroskaAttachment[]) {
        super();

        Guards.safeUint(sizeOnDisk, "sizeOnDisk");

        this._isVideo = isVideo;
        this._albumTagLevel = this._isVideo
            ? TagTargetValue.Collection
            : TagTargetValue.Album;
        this._fileTagLevel = this._isVideo
            ? TagTargetValue.Episode
            : TagTargetValue.Track;
        this._performerKey = this._isVideo
            ? MatroskaTagCollection.PERFORMER_VIDEO_KEY
            : MatroskaTagCollection.PERFORMER_AUDIO_KEY;

        this._attachments = attachments || [];
        this._sizeOnDisk = sizeOnDisk;
        this._tags = tags || [];
    }

    // #region Properties

    public get attachments(): MatroskaAttachment[] { return this._attachments; }
    public set attachments(value: MatroskaAttachment[]) {
        Guards.truthy(value, "value");
        this._attachments = value;
    }

    public get tags(): MatroskaTag[] { return this._tags; }
    public set tags(value: MatroskaTag[]) {
        Guards.truthy(value, "value");
        this._tags = value;
    }

    // #endregion

    // #region Tag Implementation

    public get tagTypes(): TagTypes { return TagTypes.Matroska; }

    /** @inheritDoc */
    public get sizeOnDisk(): number { return this._sizeOnDisk; }

    public get title(): string {
        return this.getFileTagValues("TITLE").firstString;
    }

    public get titleSort(): string {
        return this.getFileTagValues("TITLE")
            .getSubtags("SORT_WITH").firstString;
    }

    public get subtitle(): string {
        return this.getFileTagValues("SUBTITLE").firstString;
    }

    public get description(): string {
        return this.getFileTagValues("SUMMARY").firstString;
    }

    public get performers(): string[] {
        return this.getTagValuesRecursively(this._fileTagLevel, this._performerKey).allStrings;
    }

    public get performersSort(): string[] {
        return this.getTagValuesRecursively(this._fileTagLevel, this._performerKey)
            .getSubtags("SORT_WITH").allStrings;
    }

    public get performersRole(): string[] {
        const roleSubkey = this._isVideo ? "CHARACTER" : "INSTRUMENTS";
        return this.getTagValuesRecursively(this._fileTagLevel, this._performerKey)
            .getSubtags(roleSubkey).allStrings;
    }

    public get albumArtists(): string[] {
        return this.getTagValues(this._albumTagLevel, "ARTIST").allStrings;
    }

    public get albumArtistsSort(): string[] {
        return this.getTagValues(this._albumTagLevel, "ARTIST")
            .getSubtags("SORT_WITH").allStrings;
    }

    public get composers(): string[] {
        return this.getTagValues(this._fileTagLevel, "COMPOSER").allStrings;
    }

    public get composersSort(): string[] {
        return this.getTagValues(this._fileTagLevel, "COMPOSER")
            .getSubtags("SORT_WITH").allStrings;
    }

    public get album(): string {
        return this.getTagValues(this._albumTagLevel, "TITLE").firstString;
    }

    public get albumSort(): string {
        return this.getTagValues(this._albumTagLevel, "TITLE")
            .getSubtags("SORT_WITH").firstString;
    }

    public get comment(): string {
        return this.getTagValuesRecursively(this._fileTagLevel, "COMMENT").firstString;
    }

    public get genres(): string[] {
        const value = this.getTagValuesRecursively(this._fileTagLevel, "GENRE").firstString;
        if (value?.trim()) {
            return [];
        }

        // @TODO: Since this follows the ID3v2 TCON frame format, ensure this can handle any TCON
        //     format.
        const result = value.split(";");
        for (let i = 0; i < result.length; i++) {
            const trimmedGenre = result[i].trim();
            const numericGenre = this._isVideo
                ? Genres.indexToVideo(trimmedGenre, true)
                : Genres.indexToAudio(trimmedGenre, true);

            result[i] = numericGenre || trimmedGenre;
        }

        return result;
    }

    // #endregion

    // #region Methods

    public clear(): void {
        this._attachments.splice(0, this._attachments.length);
        this._tags.splice(0, this._tags.length);
    }

    // #endregion

    // #region Helper Methods

    private getTagValuesRecursively(level: TagTargetValue, key: string): FilteredTags {
        // Base case: We've recursed beyond the top level. Try last ditch at the untargeted level.
        if (level > 70) {
            return this.getTagValues(undefined, key);
        }

        const tagsAtLevel = this.getTagValues(level, key);
        return tagsAtLevel.length === 0
            ? this.getTagValuesRecursively(level + 10, key)
            : tagsAtLevel;
    }

    private getFileTagValues(key: string): FilteredTags {
        let result = this.getTagValues(this._fileTagLevel, key);
        if (result.length === 0) {
            // Nothing found at the "file" level, so look for an untargeted tag
            result = this.getTagValues(undefined, key);
        }

        return result;
    }

    private getTagValues(level: TagTargetValue | undefined, key: string): FilteredTags {
        // Filter tags for ones that match the desired target level
        const targetTypeValueFunc = level
            ? (t: MatroskaTagTarget) => t.targetTypeValue === level
            : (t: MatroskaTagTarget) => !t;
        const matchingTagValues = this._tags
            .filter(t => targetTypeValueFunc(t.target) && t.simpleTag.name === key)
            .map(t => t.simpleTag);

        // @TODO: sort such that default language goes first, then whatever.
        return new FilteredTags(matchingTagValues);
    }

    // #endregion
}

class FilteredTags {
    private readonly _tags: MatroskaTagValue[];

    public constructor(tags: MatroskaTagValue[]) {
        this._tags = tags;
    }

    public get allStrings(): string[] {
        return this._tags.filter(t => t.isString)
            .map(t => <string>t.value);
    }

    public get firstString(): string {
        const firstStringTag = this._tags.find(t => t.isString);
        return firstStringTag === undefined
            ? undefined
            : <string>firstStringTag.value;
    }

    public get length(): number { return this._tags.length; }

    public getSubtags(subkey: string): FilteredTags {
        // @TODO: See how difficult it is to upgrade to ES2019 and then replace this with `flat()`
        const filteredSubtags = this._tags.reduce<MatroskaTagValue[]>(
            (accum, tag) => accum.concat(tag.nestedTags),
            []
        ).filter(st => st.name === subkey);

        return new FilteredTags(filteredSubtags);
    }
}
