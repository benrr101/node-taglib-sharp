import {IPicture} from "./picture";

export enum TagTypes {
    /**
     * @summary No tag types.
     */
    None = 0x00000000,

    /**
     * @summary Xiph's Vorbis Comment
     */
    Xiph = 0x00000001,

    /**
     * @summary ID3v1 Tag
     */
    Id3v1 = 0x00000002,

    /**
     * @summary ID3v2 Tag
     */
    Id3v2 = 0x00000004,

    /**
     * @summary APE Tag
     */
    Ape = 0x00000008,

    /**
     * @summary Apple's ILST Tag Format
     */
    Apple = 0x00000010,

    /**
     * @summary ASF Tag
     */
    Asf = 0x00000020,

    /**
     * @summary Standard RIFF INFO List Tag
     */
    RiffInfo = 0x00000040,

    /**
     * @summary RIFF Movie ID List Tag
     */
    MovieId = 0x00000080,

    /**
     * @summary DivX Tag
     */
    DivX = 0x00000100,

    /**
     * @summary FLAC Metadata Blocks Tag
     */
    FlacMetadata = 0x00000200,

    /**
     * @summary TIFF IFD Tag
     */
    TiffIFD = 0x00000400,

    /**
     * @summary XMP Tag
     */
    XMP = 0x00000800,

    /**
     * @summary Jpeg Comment Tag
     */
    JpegComment = 0x00001000,

    /**
     * @summary Gif Comment Tag
     */
    GifComment = 0x00002000,

    /**
     * @summary native PNG keywords
     */
    Png = 0x00004000,

    /**
     * @summary IPTC-IIM tag
     */
    IPTCIIM = 0x00008000,

    /**
     * @summary Audible Metadata Blocks Tag
     */
    AudibleMetadata = 0x00010000,

    /**
     * @summary Matroska native tag
     */
    Matroska = 0x00020000,

    /**
     * @summary All tag types.
     */
    AllTags = 0xFFFFFFFF
}

export abstract class Tag {
    public abstract tagTypes: TagTypes;

    public get title(): string { return null; }
    public set title(value: string) { }

    public get titleSort(): string { return null; }
    public set titleSort(value: string) { }

    public get subtitle(): string { return null; }
    public set subtitle(value: string) { }

    public get description(): string { return null; }
    public set description(value: string) { }

    public get performers(): string[] { return []; }
    public set performers(value: string[]) { }

    public get performersSort(): string[] { return []; }
    public set performersSort(value: string[]) { }

    public get performersRole(): string[] { return[]; }
    public set performersRole(value: string[]) { }

    public get albumArtists(): string[] { return[]; }
    public set albumArtists(value: string[]) { }

    public get albumArtistsSort(): string[] { return[]; }
    public set albumArtistsSort(value: string[]) { }

    public get composers(): string[] { return[]; }
    public set composers(value: string[]) { }

    public get composersSort(): string[] { return[]; }
    public set composersSort(value: string[]) { }

    public get album(): string { return null; }
    public set album(value: string) { }

    public get albumSort(): string { return null; }
    public set albumSort(value: string) { }

    public get comment(): string { return null; }
    public set comment(value: string) { }

    public get genres(): string[] { return null; }
    public set genres(value: string[]) { }

    public get year(): number { return 0; }
    public set year(value: number) { }

    public get track(): number { return 0; }
    public set track(value: number) { }

    public get trackCount(): number { return 0; }
    public set trackCount(value: number) { }

    public get disc(): number { return 0; }
    public set disc(value: number) { }

    public get discCount(): number { return 0; }
    public set discCount(value: number) { }

    public get lyrics(): string { return null; }
    public set lyrics(value: string) { }

    public get grouping(): string { return null; }
    public set grouping(value: string) { }

    public get beatsPerMinute(): number { return 0; }
    public set beatsPerMinute(value: number) { }

    public get conductor(): string { return null}
    public set conductor(value: string) { }

    public get copyright(): string { return null; }
    public set copyright(value: string) { }

    public get dateTagged(): Date|null { return null; }
    public set dateTagged(value: Date|null) { }

    public get musicBrainzArtistId(): string { return null; }
    public set musicBrainzArtistId(value: string) { }

    public get musicBrainzReleaseGroupId(): string { return null; }
    public set musicBrainzReleaseGroupId(value: string) { }

    public get musicBrainzReleaseId(): string { return null; }
    public set musicBrainzReleaseId(value: string) { }

    public get musicBrainzReleaseArtistId(): string { return null; }
    public set musicBrainzReleaseArtistId(value: string) { }

    public get musicBrainzTrackId(): string { return null; }
    public set musicBrainzTrackId(value: string) { }

    public get musicBrainzDiscId(): string { return null; }
    public set musicBrainzDiscId(value: string) { }

    public get musicIpId(): string { return null; }
    public set musicIpId(value: string) { }

    public get amazonId(): string { return null; }
    public set amazonId(value: string) { }

    public get musicBrainzReleaseStatus(): string { return null; }
    public set musicBrainzReleaseStatus(value: string) { }

    public get musicBrainzReleaseType(): string { return null; }
    public set musicBrainzReleaseType(value: string) { }

    public get musicBrainzReleaseCountry(): string { return null; }
    public set musicBrainzReleaseCountry(value: string) { }

    public get replayGainTrackGain(): number { return NaN; }
    public set replayGainTrackGain(value: number) { }

    public get replayGainTrackPeak(): number { return NaN; }
    public set replayGainTrackPeak(value: number) { }

    public get replayGainAlbumGain(): number { return NaN; }
    public set replayGainAlbumGain(value: number) { }

    public get replayGainAlbumPeak(): number { return NaN; }
    public set replayGainAlbumPeak(value: number) { }

    public get initialKey(): string { return null; }
    public set initialKey(value: string) { }

    public get remixedBy(): string { return null; }
    public set remixedBy(value: string) { }

    public get publisher(): string { return null; }
    public set publisher(value: string) { }

    public get isrc(): string { return null; }
    public set isrc(value: string) { }

    public get pictures(): IPicture[] { return []; }
    public set pictures(value: IPicture[]) { }

    public get firstAlbumArtist(): string { return Tag.firstInGroup(this.albumArtists); }

    public get firstAlbumArtistSort(): string { return Tag.firstInGroup(this.albumArtists); }

    public get firstPerformer(): string { return Tag.firstInGroup(this.performers); }

    public get firstPerformerSort(): string { return Tag.firstInGroup(this.performersSort); }

    public get firstComposer(): string { return Tag.firstInGroup(this.composers); }

    public get firstComposerSort(): string { return Tag.firstInGroup(this.composersSort); }

    public get firstGenre(): string { return Tag.firstInGroup(this.genres); }

    public get joinedAlbumArtists(): string { return Tag.joinGroup(this.albumArtists); }

    public get joinedPerformers(): string { return Tag.joinGroup(this.performers); }

    public get joinedPerformersSort(): string { return Tag.joinGroup(this.performersSort); }

    public get joinedComposers(): string { return Tag.joinGroup(this.composers); }

    public get joinedGenres(): string { return joinGroup(this.genres); }

    protected static firstInGroup(group: string[]) {
        return !group || group.length === 0
            ? null
            : group[0];
    }

    protected static joinGroup(group: string[]) {
        return !group || group.length === 0
            ? null
            : group.join("; ");
    }

    public get isEmpty() {
        return Tag.isNullOrLikeEmpty(this.title) &&
            Tag.isNullOrLikeEmpty(this.grouping) &&
            Tag.isNullOrLikeEmpty(this.albumArtists) &&
            Tag.isNullOrLikeEmpty(this.performers) &&
            Tag.isNullOrLikeEmpty(this.composers) &&
            Tag.isNullOrLikeEmpty(this.conductor) &&
            Tag.isNullOrLikeEmpty(this.copyright) &&
            Tag.isNullOrLikeEmpty(this.album) &&
            Tag.isNullOrLikeEmpty(this.comment) &&
            Tag.isNullOrLikeEmpty(this.genres) &&
            this.year === 0 &&
            this.beatsPerMinute === 0 &&
            this.track === 0 &&
            this.trackCount === 0 &&
            this.disc === 0 &&
            this.discCount === 0;
    }

    public abstract clear(): void;

    public setInfoTag(): void {
        this.dateTagged = new Date();
    }

    public copyTo(target: Tag, overwrite: boolean): void {
        if (!target) {
            throw new Error("Argument null exception: target set to null");
        }

        if (overwrite || Tag.isNullOrLikeEmpty(target.title)) { target.title = this.title; }
        if (overwrite || Tag.isNullOrLikeEmpty(target.subtitle)) { target.subtitle = this.subtitle; }
        if (overwrite || Tag.isNullOrLikeEmpty(target.description)) { target.description = this.description; }
        if (overwrite || Tag.isNullOrLikeEmpty(target.albumArtists)) { target.albumArtists = this.albumArtists; }
        if (overwrite || Tag.isNullOrLikeEmpty(target.performers)) { target.performers = this.performers; }
        if (overwrite || Tag.isNullOrLikeEmpty(target.performersRole)) { target.performersRole = this.performersRole; }
        if (overwrite || Tag.isNullOrLikeEmpty(target.composers)) { target.composers = this.composers; }
        if (overwrite || Tag.isNullOrLikeEmpty(target.album)) { target.album = this.album; }
        if (overwrite || Tag.isNullOrLikeEmpty(target.comment)) { target.comment = this.comment; }
        if (overwrite || Tag.isNullOrLikeEmpty(target.genres)) { target.genres = this.genres; }
        if (overwrite || target.year === 0) { target.year = this.year; }
        if (overwrite || target.track === 0) { target.track = this.track; }
        if (overwrite || target.trackCount === 0) { target.trackCount = this.trackCount; }
        if (overwrite || target.disc === 0) { target.disc = this.disc; }
        if (overwrite || target.discCount === 0) { target.discCount = this.discCount; }
        if (overwrite || target.beatsPerMinute === 0) { target.beatsPerMinute = this.beatsPerMinute; }
        if (overwrite || Tag.isNullOrLikeEmpty(target.initialKey)) { target.initialKey = this.initialKey; }
        if (overwrite || Tag.isNullOrLikeEmpty(target.publisher)) { target.publisher = this.publisher; }
        if (overwrite || Tag.isNullOrLikeEmpty(target.isrc)) { target.isrc = this.isrc; }
        if (overwrite || Tag.isNullOrLikeEmpty(target.remixedBy)) { target.remixedBy = this.remixedBy; }
        if (overwrite || Tag.isNullOrLikeEmpty(target.grouping)) { target.grouping = this.grouping; }
        if (overwrite || Tag.isNullOrLikeEmpty(target.conductor)) { target.conductor = this.conductor; }
        if (overwrite || Tag.isNullOrLikeEmpty(target.copyright)) { target.copyright = this.copyright; }
        if (overwrite || !target.dateTagged) { target.dateTagged = this.dateTagged; }
    }

    protected static isNullOrLikeEmpty(value: string|string[]): boolean {
        // This should match `undefined`, `null`, and `""`
        if (!value) { return false; }

        // Handle pure string scenario
        if (typeof(value) === "string") {
            return value.trim().length === 0;
        }

        // Handle array scenario
        for (const s of value) {
            if (!Tag.isNullOrLikeEmpty(s)) {
                return false;
            }
        }
        return true;
    }
}