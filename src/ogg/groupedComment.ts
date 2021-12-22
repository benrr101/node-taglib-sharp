import {Tag, TagTypes} from "../tag";
import XiphComment from "../xiph/xiphComment";
import {Guards} from "../utils";
import {IPicture} from "../iPicture";

interface ICommentMapping {
    comment: XiphComment;
    streamSerialNumber: number;
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

        // Remove existing comment with provided stream serial number. If comment is provided add
        // it, otherwise leave it blank.
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

    public get sizeOnDisk(): number {
        return this._comments.reduce((accum, c) => accum + c.comment.sizeOnDisk, 0);
    }

    /** @inheritDoc */
    public get title(): string { return this.getFirstValue((xc) => xc.title); }
    /** @inheritDoc */
    public set title(value: string) { this.setFirstValue((xc, v) => xc.title = v, value); }

    /** @inheritDoc */
    public get titleSort(): string { return this.getFirstValue((xc) => xc.titleSort); }
    /** @inheritDoc */
    public set titleSort(value: string) { this.setFirstValue((xc, v) => xc.titleSort = v, value); }

    /** @inheritDoc */
    public get subtitle(): string { return this.getFirstValue((xc) => xc.subtitle); }
    /** @inheritDoc */
    public set subtitle(value: string) { this.setFirstValue((xc, v) => xc.subtitle = v, value); }

    /** @inheritDoc */
    public get description(): string { return this.getFirstValue((xc) => xc.description); }
    /** @inheritDoc */
    public set description(value: string) { this.setFirstValue((xc, v) => xc.description = v, value); }

    /** @inheritDoc */
    public get performers(): string[] { return this.getFirstArray((xc) => xc.performers); }
    /** @inheritDoc */
    public set performers(value: string[]) { this.setFirstValue((xc, v) => xc.performers = v, value); }

    /** @inheritDoc */
    public get performersSort(): string[] { return this.getFirstArray((xc) => xc.performersSort); }
    /** @inheritDoc */
    public set performersSort(value: string[]) { this.setFirstValue((xc, v) => xc.performersSort = v, value); }

    /** @inheritDoc */
    public get performersRole(): string[] { return this.getFirstArray((xc) => xc.performersRole); }
    /** @inheritDoc */
    public set performersRole(value: string[]) { this.setFirstValue((xc, v) => xc.performersRole = v, value); }

    /** @inheritDoc */
    public get albumArtists(): string[] { return this.getFirstArray((xc) => xc.albumArtists); }
    /** @inheritDoc */
    public set albumArtists(value: string[]) { this.setFirstValue((xc, v) => xc.albumArtists = v, value); }

    /** @inheritDoc */
    public get albumArtistsSort(): string[] { return this.getFirstArray((xc) => xc.albumArtistsSort); }
    /** @inheritDoc */
    public set albumArtistsSort(value: string[]) { this.setFirstValue((xc, v) => xc.albumArtistsSort = v, value); }

    /** @inheritDoc */
    public get composers(): string[] { return this.getFirstArray((xc) => xc.composers); }
    /** @inheritDoc */
    public set composers(value: string[]) { this.setFirstValue((xc, v) => xc.composers = v, value); }

    /** @inheritDoc */
    public get composersSort(): string[] { return this.getFirstArray((xc) => xc.composersSort); }
    /** @inheritDoc */
    public set composersSort(value: string[]) { this.setFirstValue((xc, v) => xc.composersSort = v, value); }

    /** @inheritDoc */
    public get album(): string { return this.getFirstValue((xc) => xc.album); }
    /** @inheritDoc */
    public set album(value: string) { this.setFirstValue((xc, v) => xc.album = v, value); }

    /** @inheritDoc */
    public get albumSort(): string { return this.getFirstValue((xc) => xc.albumSort); }
    /** @inheritDoc */
    public set albumSort(value: string) { this.setFirstValue((xc, v) => xc.albumSort = v, value); }

    /** @inheritDoc */
    public get comment(): string { return this.getFirstValue((xc) => xc.comment); }
    /** @inheritDoc */
    public set comment(value: string) { this.setFirstValue((xc, v) => xc.comment = v, value); }

    /** @inheritDoc */
    public get genres(): string[] { return this.getFirstArray((xc) => xc.genres); }
    /** @inheritDoc */
    public set genres(value: string[]) { this.setFirstValue((xc, v) => xc.genres = v, value); }

    /** @inheritDoc */
    public get year(): number { return this.getFirstValue((xc) => xc.year, 0); }
    /** @inheritDoc */
    public set year(value: number) {
        Guards.uint(value, "value");
        this.setFirstValue((xc, v) => xc.year = v, value);
    }

    /** @inheritDoc */
    public get track(): number { return this.getFirstValue((xc) => xc.track, 0); }
    /** @inheritDoc */
    public set track(value: number) {
        Guards.uint(value, "value");
        this.setFirstValue((xc, v) => xc.track = v, value);
    }

    /** @inheritDoc */
    public get trackCount(): number { return this.getFirstValue((xc) => xc.trackCount, 0); }
    /** @inheritDoc */
    public set trackCount(value: number) {
        Guards.uint(value, "value");
        this.setFirstValue((xc, v) => xc.trackCount = v, value);
    }

    /** @inheritDoc */
    public get disc(): number { return this.getFirstValue((xc) => xc.disc, 0); }
    /** @inheritDoc */
    public set disc(value: number) {
        Guards.uint(value, "value");
        this.setFirstValue((xc, v) => xc.disc = v, value);
    }

    /** @inheritDoc */
    public get discCount(): number { return this.getFirstValue((xc) => xc.discCount, 0); }
    /** @inheritDoc */
    public set discCount(value: number) {
        Guards.uint(value, "value");
        this.setFirstValue((xc, v) => xc.discCount = v, value);
    }

    /** @inheritDoc */
    public get lyrics(): string { return this.getFirstValue((xc) => xc.lyrics); }
    /** @inheritDoc */
    public set lyrics(value: string) { this.setFirstValue((xc, v) => xc.lyrics = v, value); }

    /** @inheritDoc */
    public get grouping(): string { return this.getFirstValue((xc) => xc.grouping); }
    /** @inheritDoc */
    public set grouping(value: string) { this.setFirstValue((xc, v) => xc.grouping = v, value); }

    /** @inheritDoc */
    public get beatsPerMinute(): number { return this.getFirstValue((xc) => xc.beatsPerMinute, 0); }
    /** @inheritDoc */
    public set beatsPerMinute(value: number) {
        Guards.uint(value, "value");
        this.setFirstValue((xc, v) => xc.beatsPerMinute = v, value);
    }

    /** @inheritDoc */
    public get conductor(): string { return this.getFirstValue((xc) => xc.conductor); }
    /** @inheritDoc */
    public set conductor(value: string) { this.setFirstValue((xc, v) => xc.conductor = v, value); }

    /** @inheritDoc */
    public get copyright(): string { return this.getFirstValue((xc) => xc.copyright); }
    /** @inheritDoc */
    public set copyright(value: string) { this.setFirstValue((xc, v) => xc.copyright = v, value); }

    /** @inheritDoc */
    public get dateTagged(): Date { return this.getFirstValue((xc) => xc.dateTagged); }
    /** @inheritDoc */
    public set dateTagged(value: Date) { this.setFirstValue((xc, v) => xc.dateTagged = v, value); }

    /** @inheritDoc */
    public get musicBrainzArtistId(): string { return this.getFirstValue((xc) => xc.musicBrainzArtistId); }
    /** @inheritDoc */
    public set musicBrainzArtistId(value: string) { this.setFirstValue((xc, v) => xc.musicBrainzArtistId = v, value); }

    /** @inheritDoc */
    public get musicBrainzReleaseGroupId(): string { return this.getFirstValue((xc) => xc.musicBrainzReleaseGroupId); }
    /** @inheritDoc */
    public set musicBrainzReleaseGroupId(value: string) {
        this.setFirstValue((xc, v) => xc.musicBrainzReleaseGroupId = v, value);
    }

    /** @inheritDoc */
    public get musicBrainzReleaseId(): string { return this.getFirstValue((xc) => xc.musicBrainzReleaseId); }
    /** @inheritDoc */
    public set musicBrainzReleaseId(value: string) {
        this.setFirstValue((xc, v) => xc.musicBrainzReleaseId = v, value);
    }

    /** @inheritDoc */
    public get musicBrainzReleaseArtistId(): string {
        return this.getFirstValue((xc) => xc.musicBrainzReleaseArtistId);
    }
    /** @inheritDoc */
    public set musicBrainzReleaseArtistId(value: string) {
        this.setFirstValue((xc, v) => xc.musicBrainzReleaseArtistId = v, value);
    }

    /** @inheritDoc */
    public get musicBrainzTrackId(): string { return this.getFirstValue((xc) => xc.musicBrainzTrackId); }
    /** @inheritDoc */
    public set musicBrainzTrackId(value: string) { this.setFirstValue((xc, v) => xc.musicBrainzTrackId = v, value); }

    /** @inheritDoc */
    public get musicBrainzDiscId(): string { return this.getFirstValue((xc) => xc.musicBrainzDiscId); }
    /** @inheritDoc */
    public set musicBrainzDiscId(value: string) { this.setFirstValue((xc, v) => xc.musicBrainzDiscId = v, value); }

    /** @inheritDoc */
    public get musicIpId(): string { return this.getFirstValue((xc) => xc.musicIpId); }
    /** @inheritDoc */
    public set musicIpId(value: string) { this.setFirstValue((xc, v) => xc.musicIpId = v, value); }

    /** @inheritDoc */
    public get amazonId(): string { return this.getFirstValue((xc) => xc.amazonId); }
    /** @inheritDoc */
    public set amazonId(value: string) { this.setFirstValue((xc, v) => xc.amazonId = v, value); }

    /** @inheritDoc */
    public get musicBrainzReleaseStatus(): string { return this.getFirstValue((xc) => xc.musicBrainzReleaseStatus); }
    /** @inheritDoc */
    public set musicBrainzReleaseStatus(value: string) {
        this.setFirstValue((xc, v) => xc.musicBrainzReleaseStatus = v, value);
    }

    /** @inheritDoc */
    public get musicBrainzReleaseType(): string { return this.getFirstValue((xc) => xc.musicBrainzReleaseType); }
    /** @inheritDoc */
    public set musicBrainzReleaseType(value: string) {
        this.setFirstValue((xc, v) => xc.musicBrainzReleaseType = v, value);
    }

    /** @inheritDoc */
    public get musicBrainzReleaseCountry(): string { return this.getFirstValue((xc) => xc.musicBrainzReleaseCountry); }
    /** @inheritDoc */
    public set musicBrainzReleaseCountry(value: string) {
        this.setFirstValue((xc, v) => xc.musicBrainzReleaseCountry = v, value);
    }

    /** @inheritDoc */
    public get replayGainTrackGain(): number { return this.getFirstValue((xc) => xc.replayGainTrackGain, Number.NaN); }
    /** @inheritDoc */
    public set replayGainTrackGain(value: number) { this.setFirstValue((xc, v) => xc.replayGainTrackGain = v, value); }

    /** @inheritDoc */
    public get replayGainTrackPeak(): number { return this.getFirstValue((xc) => xc.replayGainTrackPeak, Number.NaN); }
    /** @inheritDoc */
    public set replayGainTrackPeak(value: number) { this.setFirstValue((xc, v) => xc.replayGainTrackPeak = v, value); }

    /** @inheritDoc */
    public get replayGainAlbumGain(): number { return this.getFirstValue((xc) => xc.replayGainAlbumGain, Number.NaN); }
    /** @inheritDoc */
    public set replayGainAlbumGain(value: number) { this.setFirstValue((xc, v) => xc.replayGainAlbumGain = v, value); }

    /** @inheritDoc */
    public get replayGainAlbumPeak(): number { return this.getFirstValue((xc) => xc.replayGainAlbumPeak, Number.NaN); }
    /** @inheritDoc */
    public set replayGainAlbumPeak(value: number) { this.setFirstValue((xc, v) => xc.replayGainAlbumPeak = v, value); }

    /** @inheritDoc */
    public get pictures(): IPicture[] { return this.getFirstArray((xc) => xc.pictures); }
    /** @inheritDoc */
    public set pictures(value: IPicture[]) { this.setFirstValue((xc, v) => xc.pictures = v, value); }

    /** @inheritDoc */
    public get isCompilation(): boolean { return this.getFirstValue((xc) => xc.isCompilation); }
    /** @inheritDoc */
    public set isCompilation(value: boolean) { this.setFirstValue((xc, v) => xc.isCompilation = v, value); }

    /** @inheritDoc */
    public get initialKey(): string { return this.getFirstValue((xc) => xc.initialKey); }
    /** @inheritDoc */
    public set initialKey(value: string) { this.setFirstValue((xc, v) => xc.initialKey = v, value); }

    /** @inheritDoc */
    public get remixedBy(): string { return this.getFirstValue((xc) => xc.remixedBy); }
    /** @inheritDoc */
    public set remixedBy(value: string) { this.setFirstValue((xc, v) => xc.remixedBy = v, value); }

    /** @inheritDoc */
    public get publisher(): string { return this.getFirstValue((xc) => xc.publisher); }
    /** @inheritDoc */
    public set publisher(value: string) { this.setFirstValue((xc, v) => xc.publisher = v, value); }

    /** @inheritDoc */
    public get isrc(): string { return this.getFirstValue((xc) => xc.isrc); }
    /** @inheritDoc */
    public set isrc(value: string) { this.setFirstValue((xc, v) => xc.isrc = v, value); }

    public clear() {
        this._comments.forEach((xc) => xc.comment.clear());
    }

    private getFirstValue<T>(getter: (xc: XiphComment) => T, defaultValue?: T): T {
        for (const comment of this._comments) {
            const value = getter(comment.comment);
            if (value) {
                return value;
            }
        }

        return defaultValue;
    }

    private getFirstArray<T>(getter: (xc: XiphComment) => T[]): T[] {
        for (const comment of this._comments) {
            const value = getter(comment.comment);
            if (value && value.length) {
                return value;
            }
        }

        return [];
    }

    private setFirstValue<T>(setter: (xc: XiphComment, v: T) => void, value: T): void {
        if (this._comments.length > 0) {
            setter(this._comments[0].comment, value);
        }
    }

    // #endregion
}
