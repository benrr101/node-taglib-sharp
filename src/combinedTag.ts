import {IPicture} from "./iPicture";
import {Tag, TagTypes} from "./tag";
import {Guards} from "./utils";
import {NotSupportedError} from "./errors";

export default abstract class CombinedTag extends Tag {
    private readonly _supportedTagTypes: TagTypes;
    private readonly _tags: Tag[];

    /**
     * Constructs and initializes a new instance of {@link CombinedTag}.
     * @param supportedTagTypes Type of tags that are supported by this instance of the combined
     * @param tags Optionally, a list of tags to combine in the new instance.
     */
    protected constructor(supportedTagTypes: TagTypes, tags?: Tag[]) {
        super();
        this._supportedTagTypes = supportedTagTypes;
        this._tags = tags ? tags.slice(0) : [];
    }

    // #region Properties

    /**
     * Gets all tags contained within the current instance. If the tags within this tag are also
     * {@link CombinedTag}s, the retrieval will recurse and return a flat list of nested tags.
     * @remarks Modifications of the returned array will not be retained.
     */
    public get tags(): Tag[] {
        return this._tags.reduce<Tag[]>((accum, tag) => {
            if (tag instanceof CombinedTag) {
                accum.push(... tag.tags);
            } else {
                accum.push(tag);
            }
            return accum;
        }, []);
    }

    /**
     * Gets the types of tags that are supported by this instance of a combined tag. Only these tag
     * types can be added to the instance.
     */
    public get supportedTagTypes(): TagTypes { return this._supportedTagTypes; }

    /**
     * Gets the tag types contained in the current instance.
     * @returns TagTypes Bitwise combined tag types contained in all child tags.
     */
    public get tagTypes(): TagTypes {
        return this._tags.filter((t) => !!t).reduce((types, t) => types | t.tagTypes, TagTypes.None);
    }

    /**
     * @inheritDoc
     * @remarks Note that tags may not appear contiguously in a file. Access the {@link tags}
     *     contained in this object to see the size of each tag on the disk.
     */
    public get sizeOnDisk(): number {
        return this._tags.filter((t) => !!t).reduce((totalBytes, t) => totalBytes + t.sizeOnDisk, 0);
    }

    /**
     * Gets the title for the media described by the current instance.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get title(): string { return this.getFirstValue((t) => t.title); }
    /**
     * Sets the title for the media described by the current instance.
     * Sets the value on all child tags
     */
    public set title(val: string) { this.setAllValues((t, v) => { t.title = v; }, val); }

    /**
     * Gets the title used for sorting the media described by the current instance.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get titleSort(): string { return this.getFirstValue((t) => t.titleSort); }
    /**
     * Sets the title used for sorting the media described by the current instance.
     * Sets the value on all child tags
     */
    public set titleSort(val: string) { this.setAllValues((t, v) => { t.titleSort = v; }, val); }

    /**
     * Gets the subtitle for the media described by the current instance.
     * Returns the first non-null/non-undefined value from the child tags.
     * @remarks This field gives a nice short precision to the title, which is typically below
     *     the title on the front cover of the media. Example: for "Back to the Future", this would
     *     be "It's About Time".
     */
    public get subtitle(): string { return this.getFirstValue((t) => t.subtitle); }
    /**
     * Sets the subtitle for the media described by the current instance.
     * Sets the value on all child tags
     */
    public set subtitle(val: string) { this.setAllValues((t, v) => { t.subtitle = v; }, val); }

    /**
     * Gets the description for the media described by the current instance.
     * Returns the first non-null/non-undefined value from the child tags.
     * @remarks This is especially relevant for a movie. For example, for "Back to the Future
     *     2", this could be "After visiting 2015, Marty McFly must repeat his visit to 1955 to
     *     prevent disastrous changes to 1985...without interfering with his first trip".
     */
    public get description(): string { return this.getFirstValue((t) => t.description); }
    /**
     * Sets the description for the media described by the current instance.
     * Sets the value on all child tags
     */
    public set description(val: string) { this.setAllValues((t, v) => { t.description = v; }, val); }

    /**
     * Gets the performers or artists who performed in the media described by the current instance.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get performers(): string[] { return this.getFirstArray((t) => t.performers); }
    /**
     * Sets the performers in the media described by the current instance.
     * Sets the value on all child tags
     */
    public set performers(val: string[]) { this.setAllValues((t, v) => { t.performers = v; }, val); }

    /**
     * Gets the performers or artists who performed in the media described by the current instance.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get performersSort(): string[] { return this.getFirstArray((t) => t.performersSort); }
    /**
     * Sets the performers in the media described by the current instance.
     * Sets the value on all child tags
     */
    public set performersSort(val: string[]) { this.setAllValues((t, v) => { t.performersSort = v; }, val); }

    /**
     * Gets the characters for a video media, or instruments played for music media. This should
     * match the {@link performers} array (for each person correspond one/more role). Several roles
     * for the same artist/actor can be made up with semicolons. For example, "Marty McFly; Marty
     * McFly Jr.; Marlene McFly".
     * Returns the first non-null/non-undefined value from the child tags.
     * @remarks This is typically useful for movies, although the instrument played by each
     *     artist in a music file may be of relevance.
     *     It is highly important to match each role to the performers. This means that a role may
     *     be `null\undefined` to keep a match betweenInclusive performers[i] and performersRole[i].
     */
    public get performersRole(): string[] { return this.getFirstArray((t) => t.performersRole); }
    /**
     * Sets the characters in a video media, or instruments played for music media.
     * Sets the value on all child tags
     */
    public set performersRole(val: string[]) { this.setAllValues((t, v) => { t.performersRole = v; }, val); }

    /**
     * Gets the band or artist is credited in the creation of the entire album or collection
     * containing the media described by the current instance.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get albumArtists(): string[] { return this.getFirstArray((t) => t.albumArtists); }
    /**
     * Sets the band or artist is credited in the creation of the entire album or collection
     * containing the media described by the current instance.
     * Sets the value on all child tags
     */
    public set albumArtists(val: string[]) { this.setAllValues((t, v) => { t.albumArtists = v; }, val); }

    /**
     * Gets the band or artist is credited in the creation of the entire album or collection
     * containing the media described by the current instance.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get albumArtistsSort(): string[] { return this.getFirstArray((t) => t.albumArtistsSort); }
    /**
     * Sets the band or artist is credited in the creation of the entire album or collection
     * containing the media described by the current instance.
     * Sets the value on all child tags
     */
    public set albumArtistsSort(val: string[]) { this.setAllValues((t, v) => { t.albumArtistsSort = v; }, val); }

    /**
     * Gets the composers of the media represented by the current instance.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get composers(): string[] { return this.getFirstArray((t) => t.composers); }
    /**
     * Sets the composers of the media represented by the current instance.
     * Sets the value on all child tags
     */
    public set composers(val: string[]) { this.setAllValues((t, v) => { t.composers = v; }, val); }

    /**
     * Gets the composers of the media represented by the current instance.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get composersSort(): string[] { return this.getFirstArray((t) => t.composersSort); }
    /**
     * Sets the composers of the media represented by the current instance.
     * Sets the value on all child tags
     */
    public set composersSort(val: string[]) { this.setAllValues((t, v) => { t.composersSort = v; }, val); }

    /**
     * Gets the album title for the media described by the current instance.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get album(): string { return this.getFirstValue((t) => t.album); }
    /**
     * Sets the album title for the media described by the current instance.
     * Sets the value on all child tags
     */
    public set album(val: string) { this.setAllValues((t, v) => { t.album = v; }, val); }

    /**
     * Gets the album title for sorting the media described by the current instance.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get albumSort(): string { return this.getFirstValue((t) => t.albumSort); }
    /**
     * Sets the album title for sorting the media described by the current instance.
     * Sets the value on all child tags
     */
    public set albumSort(val: string) { this.setAllValues((t, v) => { t.albumSort = v; }, val); }

    /**
     * Gets a user comment for the media described by the current instance.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get comment(): string { return this.getFirstValue((t) => t.comment); }
    /**
     * Sets a user comment for the media described by the current instance.
     * Sets the value on all child tags
     */
    public set comment(val: string) { this.setAllValues((t, v) => { t.comment = v; }, val); }

    /**
     * Gets the album genres of the media represented by the current instance.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get genres(): string[] { return this.getFirstArray((t) => t.genres); }
    /**
     * Sets the album genres of the media described by the current instance.
     * Sets the value on all child tags
     */
    public set genres(val: string[]) { this.setAllValues((t, v) => { t.genres = v; }, val); }

    /**
     * Gets the year that the media represented by the current instance was recorded.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get year(): number { return this.getFirstValue((t) => t.year, 0); }
    /**
     * Sets the year that the media represented by the current instance was recorded. Must be a
     * positive integer.
     * Sets the value on all child tags
     */
    public set year(val: number) { this.setAllUint((t, v) => { t.year = v; }, val); }

    /**
     * Gets the position of the media represented by the current instance in its containing album.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get track(): number { return this.getFirstValue((t) => t.track, 0); }
    /**
     * Sets the position of the media represented by the current instance in its containing album.
     * Must be a positive integer positive integer.
     * Sets the value on all child tags
     */
    public set track(val: number) { this.setAllUint((t, v) => { t.track = v; }, val); }

    /**
     * Gets the number of tracks in the album containing the media represented by the current
     * instance.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get trackCount(): number { return this.getFirstValue((t) => t.trackCount, 0); }
    /**
     * Sets the number of tracks in the album containing the media represented by the current
     * instance. Must be a positive integer positive integer.
     * Sets the value on all child tags
     */
    public set trackCount(val: number) { this.setAllUint((t, v) => { t.trackCount = v; }, val); }

    /**
     * Gets the number of the disc containing the media represented by the current instance in a
     * boxed set.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get disc(): number { return this.getFirstValue((t) => t.disc, 0); }
    /**
     * Sets the number of the disc containing the media represented by the current instance in a
     * boxed set. Must be a positive integer positive integer.
     * Sets the value on all child tags
     */
    public set disc(val: number) { this.setAllUint((t, v) => { t.disc = v; }, val); }

    /**
     * Gets the number of the discs in the boxed set containing the media represented by the
     * current instance.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get discCount(): number { return this.getFirstValue((t) => t.discCount, 0); }
    /**
     * Sets the number of the discs in the boxed set containing the media represented by the
     * current instance. Must be a positive integer positive integer.
     * Sets the value on all child tags
     */
    public set discCount(val: number) { this.setAllUint((t, v) => { t.discCount = v; }, val); }

    /**
     * Gets the lyrics or script of the media represented by the current instance.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get lyrics(): string { return this.getFirstValue((t) => t.lyrics); }
    /**
     * Sets the lyrics or script of the media represented by the current instance.
     * Sets the value on all child tags
     */
    public set lyrics(val: string) { this.setAllValues((t, v) => { t.lyrics = v; }, val); }

    /**
     * Gets the grouping on the album which the media in the current instance belongs to.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get grouping(): string { return this.getFirstValue((t) => t.grouping); }
    /**
     * Sets the grouping on the album which the media in the current instance belongs to.
     * Sets the value on all child tags
     */
    public set grouping(val: string) { this.setAllValues((t, v) => { t.grouping = v; }, val); }

    /**
     * Gets the number of beats per minute of the media represented by the current instance.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get beatsPerMinute(): number { return this.getFirstValue((t) => t.beatsPerMinute, 0); }
    /**
     * Sets the number of beats per minute of the media represented by the current instance. Must
     * be a positive integer positive integer.
     * Sets the value on all child tags
     */
    public set beatsPerMinute(val: number) { this.setAllUint((t, v) => { t.beatsPerMinute = v; }, val); }

    /**
     * Gets the conductor or director of the media represented by the current instance.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get conductor(): string { return this.getFirstValue((t) => t.conductor); }
    /**
     * Sets the conductor or director of the media represented by the current instance.
     * Sets the value on all child tags
     */
    public set conductor(val: string) { this.setAllValues((t, v) => { t.conductor = v; }, val); }

    /**
     * Gets the copyright information of the media represented by the current instance.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get copyright(): string { return this.getFirstValue((t) => t.copyright); }
    /**
     * Sets the copyright information of the media represented by the current instance.
     * Sets the value on all child tags
     */
    public set copyright(val: string) { this.setAllValues((t, v) => { t.copyright = v; }, val); }

    /**
     * Gets the date at which the tag has been written.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get dateTagged(): Date { return this.getFirstValue((t) => t.dateTagged); }
    /**
     * Sets the date at which the tag has been written
     */
    public set dateTagged(val: Date) { this.setAllValues((t, v) => { t.dateTagged = v; }, val); }

    /**
     * Gets the MusicBrainz artist ID.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get musicBrainzArtistId(): string { return this.getFirstValue((t) => t.musicBrainzArtistId); }
    /**
     * Sets the MusicBrainz artist ID.
     * Sets the value on all child tags
     */
    public set musicBrainzArtistId(val: string) { this.setAllValues((t, v) => { t.musicBrainzArtistId = v; }, val); }

    /**
     * Gets the MusicBrainz release group ID.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get musicBrainzReleaseGroupId(): string { return this.getFirstValue((t) => t.musicBrainzReleaseGroupId); }
    /**
     * Sets the MusicBrainz release group ID.
     * Sets the value on all child tags
     */
    public set musicBrainzReleaseGroupId(val: string) {
        this.setAllValues((t, v) => { t.musicBrainzReleaseGroupId = v; }, val);
    }

    /**
     * Gets the MusicBrainz release ID.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get musicBrainzReleaseId(): string { return this.getFirstValue((t) => t.musicBrainzReleaseId); }
    /**
     * Sets the MusicBrainz release ID.
     * Sets the value on all child tags
     */
    public set musicBrainzReleaseId(val: string) { this.setAllValues((t, v) => { t.musicBrainzReleaseId = v; }, val); }

    /**
     * Gets the MusicBrainz release artist ID.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get musicBrainzReleaseArtistId(): string { return this.getFirstValue((t) => t.musicBrainzReleaseArtistId); }
    /**
     * Sets the MusicBrainz release artist ID.
     * Sets the value on all child tags
     */
    public set musicBrainzReleaseArtistId(val: string) {
        this.setAllValues((t, v) => { t.musicBrainzReleaseArtistId = v; }, val);
    }

    /**
     * Gets the MusicBrainz track ID.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get musicBrainzTrackId(): string { return this.getFirstValue((t) => t.musicBrainzTrackId); }
    /**
     * Sets the MusicBrainz track ID.
     * Sets the value on all child tags
     */
    public set musicBrainzTrackId(val: string) { this.setAllValues((t, v) => { t.musicBrainzTrackId = v; }, val); }

    /**
     * Gets the MusicBrainz disc ID.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get musicBrainzDiscId(): string { return this.getFirstValue((t) => t.musicBrainzDiscId); }
    /**
     * Sets the MusicBrainz disc ID.
     * Sets the value on all child tags
     */
    public set musicBrainzDiscId(val: string) { this.setAllValues((t, v) => { t.musicBrainzDiscId = v; }, val); }

    /**
     * Gets the MusicIP PUID.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get musicIpId(): string { return this.getFirstValue((t) => t.musicIpId); }
    /**
     * Sets the MusicIP PUID.
     * Sets the value on all child tags
     */
    public set musicIpId(val: string) { this.setAllValues((t, v) => { t.musicIpId = v; }, val); }

    /**
     * Gets the Amazon ID.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get amazonId(): string { return this.getFirstValue((t) => t.amazonId); }
    /**
     * Sets the Amazon ID.
     * Sets the value on all child tags
     */
    public set amazonId(val: string) { this.setAllValues((t, v) => { t.amazonId = v; }, val); }

    /**
     * Gets the MusicBrainz release status.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get musicBrainzReleaseStatus(): string { return this.getFirstValue((t) => t.musicBrainzReleaseStatus); }
    /**
     * Sets the MusicBrainz release status.
     * Sets the value on all child tags
     */
    public set musicBrainzReleaseStatus(val: string) {
        this.setAllValues((t, v) => { t.musicBrainzReleaseStatus = v; }, val);
    }

    /**
     * Gets the MusicBrainz release type.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get musicBrainzReleaseType(): string { return this.getFirstValue((t) => t.musicBrainzReleaseType); }
    /**
     * Sets the MusicBrainz release type.
     * Sets the value on all child tags
     */
    public set musicBrainzReleaseType(val: string) {
        this.setAllValues((t, v) => { t.musicBrainzReleaseStatus = v; }, val);
    }

    /**
     * Gets the MusicBrainz release country.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get musicBrainzReleaseCountry(): string { return this.getFirstValue((t) => t.musicBrainzReleaseCountry); }
    /**
     * Sets the MusicBrainz release country.
     * Sets the value on all child tags
     */
    public set musicBrainzReleaseCountry(val: string) {
        this.setAllValues((t, v) => { t.musicBrainzReleaseCountry = v; }, val);
    }

    /**
     * Gets the ReplayGain track gain in dB.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get replayGainTrackGain(): number { return this.getFirstValue((t) => t.replayGainTrackGain, NaN); }
    /**
     * Sets the ReplayGain track gain in dB.
     * Sets the value on all child tags
     */
    public set replayGainTrackGain(val: number) { this.setAllValues((t, v) => { t.replayGainTrackGain = v; }, val); }

    /**
     * Gets the ReplayGain track peak sample.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get replayGainTrackPeak(): number { return this.getFirstValue((t) => t.replayGainTrackPeak, NaN); }
    /**
     * Sets the ReplayGain track peak sample.
     * Sets the value on all child tags
     */
    public set replayGainTrackPeak(val: number) { this.setAllValues((t, v) => { t.replayGainTrackPeak = v; }, val); }

    /**
     * Gets the ReplayGain album gain in dB.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get replayGainAlbumGain(): number { return this.getFirstValue((t) => t.replayGainAlbumGain, NaN); }
    /**
     * Sets the ReplayGain album gain in dB.
     * Sets the value on all child tags
     */
    public set replayGainAlbumGain(val: number) { this.setAllValues((t, v) => { t.replayGainAlbumGain = v; }, val); }

    /**
     * Gets the ReplayGain album peak sample.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get replayGainAlbumPeak(): number { return this.getFirstValue((t) => t.replayGainAlbumPeak, NaN); }
    /**
     * Sets the ReplayGain album peak sample.
     * Sets the value on all child tags
     */
    public set replayGainAlbumPeak(val: number) { this.setAllValues((t, v) => { t.replayGainAlbumPeak = v; }, val); }

    /**
     * Gets the initial key of the media represented by the current instance.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get initialKey(): string { return this.getFirstValue((t) => t.initialKey); }
    /**
     * Sets the initial key of the media represented by the current instance.
     * Sets the value on all child tags
     */
    public set initialKey(val: string) { this.setAllValues((t, v) => { t.initialKey = v; }, val); }

    /**
     * Gets the remixer of the media represented by the current instance.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get remixedBy(): string { return this.getFirstValue((t) => t.remixedBy); }
    /**
     * Sets the remixer of the media represented by the current instance.
     * Sets the value on all child tags
     */
    public set remixedBy(val: string) { this.setAllValues((t, v) => { t.remixedBy = v; }, val); }

    /**
     * Gets the publisher of the media represented by the current instance.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get publisher(): string { return this.getFirstValue((t) => t.publisher); }
    /**
     * Sets the publisher of the media represented by the current instance.
     * Sets the value on all child tags
     */
    public set publisher(val: string) { this.setAllValues((t, v) => { t.publisher = v; }, val); }

    /**
     * Gets the ISRC (International Standard Recording Code) of the media represented by the
     * current instance.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get isrc(): string { return this.getFirstValue((t) => t.isrc); }
    /**
     * Sets the ISRC (International Standard Recording Code) of the media represented by the
     * current instance.
     * Sets the value on all child tags
     */
    public set isrc(val: string) { this.setAllValues((t, v) => { t.isrc = v; }, val); }

    /**
     * Gets a collection of pictures associated with the media represented by the current instance.
     * Returns the first non-null/non-undefined value from the child tags.
     */
    public get pictures(): IPicture[] { return this.getFirstArray((t) => t.pictures); }
    /**
     * Sets the collection of pictures associated with the current media.
     * Sets the value on all child tags
     */
    public set pictures(val: IPicture[]) { this.setAllValues((t, v) => { t.pictures = v; }, val); }

    /**
     * Whether or not the current instance is empty. If all child tags are empty, `true` is
     * returned, `false` otherwise.
     */
    public get isEmpty(): boolean {
        return this._tags.every((t) => t.isEmpty);
    }

    // #endregion

    /**
     * @inheritDoc
     * Clears all child tags.
     */
    public clear(): void {
        this._tags.forEach((t) => t.clear());
    }

    /**
     * Creates a new instance of the desired tag type and adds it to the current instance. If the
     * tag type is unsupported in the current context or the tag type already exists, an error will
     * be thrown.
     * @param tagType Type of tag to create
     * @param copy Whether or not to copy the contents of the current instance to the newly created
     *     tag instance
     * @returns Tag The newly created tag
     */
    public abstract createTag(tagType: TagTypes, copy: boolean): Tag;

    /**
     * Gets a tag of the specified tag type if a matching tag exists in the current instance.
     * @param tagType Type of tag to retrieve
     * @returns Tag Tag with specified type, if it exists. `undefined` otherwise.
     */
    public getTag<TTag extends Tag>(tagType: TagTypes): TTag {
        // Make sure the tag type can possibly be stored here
        if ((tagType & this._supportedTagTypes) === 0) {
            return undefined;
        }

        // Look for the tag, recurse if necessary
        for (const tag of this._tags) {
            if (tag instanceof CombinedTag) {
                const foundTag = tag.getTag(tagType);
                if (foundTag) {
                    return <TTag> foundTag;
                }
            } else if (tag.tagTypes === tagType) {
                return <TTag> tag;
            }
        }

        return undefined;
    }

    /**
     * Remove all tags that match the specified tagTypes. This is performed recursively. Any nested
     * `CombinedTag` instances are left in place.
     * @param tagTypes Types of tags to remove
     */
    public removeTags(tagTypes: TagTypes): void {
        for (let i = this._tags.length - 1; i >= 0; i--) {
            const tag = this._tags[i];

            const isMatch = (tag.tagTypes & tagTypes) !== 0;
            if (isMatch) {
                if (tag instanceof CombinedTag) {
                    tag.removeTags(tagTypes);
                } else {
                    this._tags.splice(i, 1);
                }
            }
        }
    }

    // #region Protected/Private Methods

    protected addTag(tag: Tag) {
        if (tag) {
            this._tags.push(tag);
        }
    }

    /**
     * Verifies if a tag can be added to the current instance. The criteria for validation are:
     * * A tag of the given tag type does not already exist
     * * The given tag type is supported by the current instance
     * @param tagType Tag type that the caller wants to create
     */
    protected validateTagCreation(tagType: TagTypes): void {
        if ((this._supportedTagTypes & tagType) === 0) {
            throw new NotSupportedError(`Tag of type ${tagType} is not supported on this CombinedTag`);
        }
        if ((this.tagTypes & tagType) !== 0) {
            throw new Error(`Cannot create tag of type ${tagType} because one already exists`);
        }
    }

    private getFirstArray<T>(propertyFn: (t: Tag) => T[]): T[] {
        const tagWithProperty = this._tags.find((t) => {
           if (!t) { return false; }
           const val = propertyFn(t);
           return val !== undefined && val !== null && val.length > 0;
        });
        return tagWithProperty ? propertyFn(tagWithProperty) : [];
    }

    private getFirstValue<T>(propertyFn: (t: Tag) => T, defaultValue?: T): T {
        const tagWithProperty = this._tags.find((t) => {
            if (!t) { return false; }
            const val = propertyFn(t);
            return val !== undefined && val !== null && val !== defaultValue;
        });
        return tagWithProperty ? propertyFn(tagWithProperty) : defaultValue;
    }

    private setAllUint(propertyFn: (t: Tag, val: number) => void, val: number): void {
        Guards.uint(val, "val");
        this._tags.forEach((t) => {
           if (!t) { return; }
           propertyFn(t, val);
        });
    }

    private setAllValues<T>(propertyFn: (t: Tag, val: T) => void, val: T): void {
        this._tags.forEach((t) => {
            if (!t) { return; }
            propertyFn(t, val);
        });
    }

    // #endregion
}
