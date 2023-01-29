import MatroskaAttachment from "./attachment";
import Genres from "../genres";
import MatroskaTag from "./matroskaTag";
import MatroskaTagValue from "./matroskaTagValue";
import {MatroskaTagTarget, TagTargetValue} from "./matroskaTagTarget";
import {IPicture} from "../picture";
import {Tag, TagTypes} from "../tag";
import {Guards} from "../utils";

/**
 * Class that represents a collection of Matroska "tags". This class implements the {@link Tag}
 * unified tagging interface.
 * @remarks The Matroska tagging interface is very open-ended and allows a high level of
 *     customizability. In particular, Matroska files may contain multiple subunits that can be
 *     independently tagged (eg, multiple episodes of a TV show in a single file). The unified
 *     tagging interface assumes that a file only represents a single unit (eg, episode). This
 *     can cause problems when, eg, a title is defined multiple times in a file to provide the
 *     title for multiple, eg, episodes contained within the file. Matroska also defines multiple
 *     tagging "levels" at which a tag applies (eg, episode, chapter, collection). This confuses
 *     the interface even more because tags (eg, title) are expected to be used for different
 *     purposes at different levels (eg, title at the episode level means the title of the episode,
 *     but title at the collection level may mean the title of the TV show). There are no well-
 *     established conventions here so, unified tagging for Matroska files is very much best
 *     effort. If special tagging is needed, one will need to directly access the {@link tags}
 *     that make up the tag collection.
 */
export default class MatroskaTagCollection extends Tag {

    private static readonly PERFORMER_AUDIO_KEY = "PERFORMER";
    private static readonly PERFORMER_VIDEO_KEY = "ACTOR";
    private static readonly NUMERIC_GENRE_REGEX = new RegExp(/\((\d+)\)/);

    private readonly _albumPartTagLevel: number;
    private readonly _albumTagLevel: number;
    private readonly _isVideo: boolean;
    private readonly _fileTagLevel: number;
    private readonly _performerKey: string;

    private _attachments: MatroskaAttachment[];
    private _sizeOnDisk: number = 0;
    private _tags: MatroskaTag[] = [];

    /**
     * Constructs and initializes a new instance using based on the information read from the file.
     * @param sizeOnDisk Size of the tag in bytes
     * @param isVideo Whether or not the file contains video
     * @param tags Collection of tag objects found in the file
     * @param attachments Collection of attachments found in the file
     */
    public constructor(sizeOnDisk: number, isVideo: boolean, tags: MatroskaTag[], attachments: MatroskaAttachment[]) {
        super();

        Guards.safeUint(sizeOnDisk, "sizeOnDisk");
        Guards.truthy(tags, "tags");
        Guards.truthy(attachments, "attachments");

        this._isVideo = isVideo;
        this._albumTagLevel = this._isVideo
            ? TagTargetValue.Collection
            : TagTargetValue.Album;
        this._fileTagLevel = this._isVideo
            ? TagTargetValue.Episode
            : TagTargetValue.Track;
        this._albumPartTagLevel = this._fileTagLevel + 10;
        this._performerKey = this._isVideo
            ? MatroskaTagCollection.PERFORMER_VIDEO_KEY
            : MatroskaTagCollection.PERFORMER_AUDIO_KEY;

        this._attachments = attachments || [];
        this._sizeOnDisk = sizeOnDisk;
        this._tags = tags || [];
    }

    // #region Properties

    /**
     * Gets the list of attachments that are stored in the file.
     */
    public get attachments(): MatroskaAttachment[] { return this._attachments; }
    /**
     * Sets the list of attachments that are stored in the file.
     */
    public set attachments(value: MatroskaAttachment[]) {
        Guards.truthy(value, "value");
        this._attachments = value;
    }

    /**
     * Gets the list of tags that are inside the file.
     */
    public get tags(): MatroskaTag[] { return this._tags; }
    /**
     * Sets the list of tags that are inside the file.
     */
    public set tags(value: MatroskaTag[]) {
        Guards.truthy(value, "value");
        this._tags = value;
    }

    // #endregion

    // #region Tag Implementation

    /** @inheritDoc */
    public get tagTypes(): TagTypes { return TagTypes.Matroska; }

    /** @inheritDoc */
    public get sizeOnDisk(): number { return this._sizeOnDisk; }

    /** @inheritDoc */
    public get title(): string {
        return this.getFileTagValues("TITLE").firstString;
    }

    /** @inheritDoc */
    public get titleSort(): string {
        return this.getFileTagValues("TITLE")
            .getSubtags("SORT_WITH").firstString;
    }

    /** @inheritDoc */
    public get subtitle(): string {
        return this.getFileTagValues("SUBTITLE").firstString;
    }

    /** @inheritDoc */
    public get description(): string {
        return this.getFileTagValues("SUMMARY").firstString;
    }

    /** @inheritDoc */
    public get performers(): string[] {
        return this.getTagValuesRecursively(this._fileTagLevel, this._performerKey).allStrings;
    }

    /** @inheritDoc */
    public get performersSort(): string[] {
        return this.getTagValuesRecursively(this._fileTagLevel, this._performerKey)
            .getSubtags("SORT_WITH").allStrings;
    }

    /** @inheritDoc */
    public get performersRole(): string[] {
        const roleSubkey = this._isVideo ? "CHARACTER" : "INSTRUMENTS";
        return this.getTagValuesRecursively(this._fileTagLevel, this._performerKey)
            .getSubtags(roleSubkey).allStrings;
    }

    /** @inheritDoc */
    public get albumArtists(): string[] {
        return this.getTagValues(this._albumTagLevel, "ARTIST").allStrings;
    }

    /** @inheritDoc */
    public get albumArtistsSort(): string[] {
        return this.getTagValues(this._albumTagLevel, "ARTIST")
            .getSubtags("SORT_WITH").allStrings;
    }

    /** @inheritDoc */
    public get composers(): string[] {
        return this.getTagValues(this._fileTagLevel, "COMPOSER").allStrings;
    }

    /** @inheritDoc */
    public get composersSort(): string[] {
        return this.getTagValues(this._fileTagLevel, "COMPOSER")
            .getSubtags("SORT_WITH").allStrings;
    }

    /** @inheritDoc */
    public get album(): string {
        return this.getTagValues(this._albumTagLevel, "TITLE").firstString;
    }

    /** @inheritDoc */
    public get albumSort(): string {
        return this.getTagValues(this._albumTagLevel, "TITLE")
            .getSubtags("SORT_WITH").firstString;
    }

    /** @inheritDoc */
    public get comment(): string {
        return this.getTagValuesRecursively(this._fileTagLevel, "COMMENT").firstString;
    }

    /** @inheritDoc */
    public get genres(): string[] {
        const value = this.getTagValuesRecursively(this._fileTagLevel, "GENRE").firstString;
        if (!value || !value.trim()) {
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

    /** @inheritDoc */
    public get year(): number {
        let value = this.getTagValuesRecursively(this._fileTagLevel, "DATE_RECORDED").firstString;
        let result = 0;

        // Parse date to retrieve year
        // Expected format: YYYY-MM-DD HH:MM:SS.MSS
        if (value) {
            const firstDash = value.indexOf('-');
            if (firstDash > 0) {
                value = value.substring(firstDash - 4, firstDash);
            }

            result = parseInt(value, 10);
        }

        return result;
    }

    /** @inheritDoc */
    public get track(): number {
        return this.getFileTagValues("PART_NUMBER").firstUintFromString || 0;
    }

    /** @inheritDoc */
    public get trackCount(): number {
        return this.getTagValues(this._albumPartTagLevel, "TOTAL_PARTS").firstUintFromString || 0;
    }

    /** @inheritDoc */
    public get disc(): number {
        return this.getTagValues(this._albumPartTagLevel, "PART_NUMBER").firstUintFromString || 0;
    }

    /** @inheritDoc */
    public get discCount(): number {
        return this.getTagValues(this._albumTagLevel, "TOTAL_PARTS").firstUintFromString || 0;
    }

    /** @inheritDoc */
    public get lyrics(): string {
        return this.getFileTagValues("LYRICS").firstString;
    }

    /** @inheritDoc */
    public get grouping(): string {
        return this.getTagValues(this._albumTagLevel, "GROUPING").firstString;
    }

    /** @inheritDoc */
    public get beatsPerMinute(): number {
        return this.getTagValuesRecursively(this._fileTagLevel, "BPM").firstUintFromString || 0;
    }

    /** @inheritDoc */
    public get conductor(): string {
        const key = this._isVideo ? "DIRECTOR" : "CONDUCTOR";
        return this.getTagValuesRecursively(this._fileTagLevel, key).firstString;
    }

    /** @inheritDoc */
    public get copyright(): string {
        return this.getTagValuesRecursively(this._fileTagLevel, "COPYRIGHT").firstString;
    }

    /** @inheritDoc */
    public get dateTagged(): Date {
        const str = this.getTagValuesRecursively(this._fileTagLevel, "DATE_TAGGED").firstString;
        if (!str) { return undefined; }
        const dateValue = new Date(str);
        return isNaN(dateValue.getTime()) ? undefined : dateValue;
    }

    /** @inheritDoc */
    public get pictures(): IPicture[] { return this._attachments.slice(0); }

    /** @inheritDoc */
    public get isEmpty(): boolean {
        return this._attachments.length === 0
            && this._tags.length === 0;
    }

    // #endregion

    // #region Methods

    /** @inheritDoc */
    public clear(): void {
        this._attachments.splice(0, this._attachments.length);
        this._tags.splice(0, this._tags.length);
    }

    // #endregion

    // #region Helper Methods

    /**
     * Looks for tags with the given {@paramref key} starting at the provided {@paramref level}. If
     * no tags are found, the process is repeated at the next highest level. If the top level is
     * reached but no tags were found, a final attempt is made using the un-targeted level.
     * @param level Target level to begin searching for the desired tag at
     * @param key Key of the desired tag
     * @private
     */
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

    /**
     * Looks for tags with the given {@paramref key} at the "file" target level. If no tags are
     * found, the process is repeated at the un-targeted level.
     * @remarks The "file" target level is either {@link TagTargetValue.Track} or
     *     {@link TagTargetValue.Episode} level, depending of whether the file is audio or video.
     *     This is somewhat convention based due to Matroska tagging being so open-ended. This
     *     method should only be used for retrieving tags for the unified tagging interface, which
     *     is best-effort in following conventions.
     * @param key Key of the desired tag
     * @private
     */
    private getFileTagValues(key: string): FilteredTags {
        let result = this.getTagValues(this._fileTagLevel, key);
        if (result.length === 0) {
            // Nothing found at the "file" level, so look for an untargeted tag
            result = this.getTagValues(undefined, key);
        }

        return result;
    }

    /**
     * Looks for tags with the given {@paramref key} at a given {@paramref level}.
     * @param level Target level to search for the given tags. If `undefined`, the un-targeted
     *     level is searched.
     * @param key Key of the desired tag.
     * @private
     */
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

/**
 * Internal class that wraps an array of tags and provides useful methods on top of the collection.
 */
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

    public get firstUintFromString(): number {
        const str = this.firstString;
        return str
            ? parseInt(str, 10)
            : undefined;
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
