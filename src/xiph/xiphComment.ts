import XiphPicture from "./xiphPicture";
import {Tag, TagTypes} from "../tag";
import {IPicture} from "../iPicture";
import {ByteVector, StringType} from "../byteVector";
import {Guards} from "../utils";

/**
 * Provides support for reading and writing Xiph comment-style tags.
 * @remarks Xiph comment tag properties are stored in "fields" of the form `KEY=value`, where `KEY`
 *     is the "field name". The field name can be defined multiple times in the tag which means
 *     each field can have multiple values.
 */
export default class XiphComment extends Tag {
    private static readonly pictureFields: string[] = ["COVERART", "METADATA_BLOCK_PICTURE"];

    private _fields: {[key: string]: string[]} = {};
    private _pictures: IPicture[] = [];
    private _saveBeatsPerMinuteAsTempo: boolean = true;
    private _vendorId: string;

    // #region Constructors

    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance by reading the contents of a raw Xiph comment from
     * a {@link ByteVector} object.
     * @param data Object containing a raw Xiph comment, cannot be falsey
     */
    public static fromData(data: ByteVector): XiphComment {
        Guards.truthy(data, "data");

        const xiphComment = new XiphComment();

        // The first thing in the comment data is the vendor ID length, followed by a UTF8 string
        // with the vendor ID.
        let pos = 0;
        const vendorLength = data.mid(pos, 4).toUInt(false);
        pos += 4;
        xiphComment._vendorId = data.toString(vendorLength, StringType.UTF8, pos);
        pos += vendorLength;

        // Next, the number of fields in the comment vector
        const commentFields = data.mid(pos, 4).toUInt(false);
        pos += 4;

        for (let i = 0; i < commentFields; i++) {
            // Each comment field is in the format KEY=value in a UTF8 string and has a 32-bit uint
            // before it with the length.
            const commentLength = data.mid(pos, 4).toUInt(false);
            pos += 4;
            const comment = data.toString(commentLength, StringType.UTF8, pos);
            pos += commentLength;

            const commentSeparatorPosition = comment.indexOf("=");
            if (commentSeparatorPosition < 0) {
                // Comment is malformed, skip it
                continue;
            }

            const key = comment.substr(0, commentSeparatorPosition).toUpperCase();
            const value = comment.substr(commentSeparatorPosition);

            if (XiphComment.pictureFields.indexOf(key) >= 0) {
                // The field is a picture, load it into a lazy XiphPicture
                const picture = XiphPicture.fromEncodedField(value);
                xiphComment._pictures.push(picture);
            } else {
                // Field is a text field, store it in the field list object
                if (!(key in xiphComment._fields)) {
                    xiphComment._fields[key] = [];
                }
                xiphComment._fields[key].push(value);
            }
        }

        return xiphComment;
    }

    /**
     * Constructs and initializes a new instance with no contents.
     */
    public static fromEmpty(): XiphComment {
        return new XiphComment();
    }

    // #endregion

    // #region Xiph Comment Properties

    /**
     * Gets the total number of values contained in the current instance, including the pictures.
     */
    public get fieldValueCount(): number {
        let count = Object.values(this._fields).reduce<number>((a, v) => a + v.length, 0);
        count += this._pictures.length;

        return count;
    }

    /**
     * Gets the names of the fields currently stored in the list of fields, excluding the pictures.
     * @remarks This getter is useful for iterating over fields defined in this object in
     *     conjunction with {@link getField}.
     */
    public get fieldNames(): string[] { return Object.keys(this._fields); }

    /**
     * Gets the vendor ID for the current instance.
     */
    public get vendorId(): string { return this._vendorId; }

    // #endregion

    // #region Generic Tag Properties

    /** @inheritDoc Always returns {@link TagTypes.Xiph} */
    public get tagTypes(): TagTypes { return TagTypes.Xiph; }

    /**
     * @inheritDoc via `TITLE` field
     */
    public get title(): string { return this.getFieldFirstValue("TITLE"); }
    /**
     * @inheritDoc via `TITLE` field
     */
    public set title(value: string) { this.setFieldAsStrings("TITLE", value); }

    /**
     * @inheritDoc via `TITLESORT` field
     */
    public get titleSort(): string { return this.getFieldFirstValue("TITLESORT"); }
    /**
     * @inheritDoc via `TITLESORT` field
     */
    public set titleSort(value: string) { this.setFieldAsStrings("TITLESORT", value); }

    /**
     * @inheritDoc via `SUBTITLE` field
     */
    public get subtitle(): string { return this.getFieldFirstValue("SUBTITLE"); }
    /**
     * @inheritDoc via `SUBTITLE` field
     */
    public set subtitle(value: string) { this.setFieldAsStrings("SUBTITLE", value); }

    /**
     * @inheritDoc via `DESCRIPTION` field
     */
    public get description(): string { return this.getFieldFirstValue("DESCRIPTION"); }
    /**
     * @inheritDoc via `DESCRIPTION` field
     */
    public set description(value: string) { this.setFieldAsStrings("DESCRIPTION", value); }

    /**
     * @inheritDoc via `ARTIST` field
     */
    public get performers(): string[] { return this.getField("ARTIST"); }
    /**
     * @inheritDoc via `ARTIST` field
     */
    public set performers(value: string[]) { this.setFieldAsStrings("ARTIST", ... value); }

    /**
     * @inheritDoc via `ARTISTSORT` field
     */
    public get performersSort(): string[] { return this.getField("ARTISTSORT"); }
    /**
     * @inheritDoc via `ARTIST` field
     */
    public set performersSort(value: string[]) { this.setFieldAsStrings("ARTISTSORT", ... value); }

    /**
     * @inheritDoc via `ARTISTROLE` field
     */
    public get performersRole(): string[] { return this.getField("ARTISTROLE"); }
    /**
     * @inheritDoc via `ARTISTROLE` field
     */
    public set performersRole(value: string[]) { this.setFieldAsStrings("ARTISTROLE", ... value); }

    /**
     * @inheritDoc via `ALBUMARTIST` as per standard, though `ALBUM ARTIST` and `ENSEMBLE` will be
     *     checked if `ALBUMARTIST` is not set.
     */
    public get albumArtists(): string[] {
        // First try the standard "ALBUMARTIST"
        // If that fails, try:
        // "ALBUM ARTIST" (set by The GodFather)
        // "ENSEMBLE" (set by TAG & RENAME)
        let value = this.getField("ALBUMARTIST");
        if (value && value.length > 0) {
            return value;
        }

        value = this.getField("ALBUM ARTIST");
        if (value && value.length > 0) {
            return value;
        }

        return this.getField("ENSEMBLE");
    }
    /**
     * @inheritDoc via `ALBUMARTIST`, as per the standard
     */
    public set albumArtists(value: string[]) { this.setFieldAsStrings("ALBUMARTIST", ... value); }

    /**
     * @inheritDoc via `ALBUMARTISTSORT` field
     */
    public get albumArtistsSort(): string[] { return this.getField("ALBUMARTISTSORT"); }
    /**
     * @inheritDoc via `ALBUMARTISTSORT` field
     */
    public set albumArtistSort(value: string[]) { this.setFieldAsStrings("ALBUMARTISTSORT", ... value); }

    /**
     * @inheritDoc via `COMPOSER` field
     */
    public get composers(): string[] { return this.getField("COMPOSER"); }
    /**
     * @inheritDoc via `COMPOSER` field
     */
    public set composers(value: string[]) { this.setFieldAsStrings("COMPOSER", ... value); }

    /**
     * @inheritDoc via `COMPOSERSORT` field
     */
    public get composersSort(): string[] { return this.getField("COMPOSERSORT"); }
    /**
     * @inheritDoc via `COMPOSERSORT` field
     */
    public set composersSort(value: string[]) { this.setFieldAsStrings("COMPOSERSORT", ... value); }

    /**
     * @inheritDoc via `ALBUM` field
     */
    public get album(): string { return this.getFieldFirstValue("ALBUM"); }
    /**
     * @inheritDoc via `ALBUM` field
     */
    public set album(value: string) { this.setFieldAsStrings("ALBUM", value); }

    /**
     * @inheritDoc via `ALBUMSORT` field
     */
    public get albumSort(): string { return this.getFieldFirstValue("ALBUMSORT"); }
    /**
     * @inheritDoc via `ALBUMSORT` field
     */
    public set albumSort(value: string) { this.setFieldAsStrings("ALBUMSORT", value); }

    /**
     * @inheritDoc via `COMMENT` field
     */
    public get comment(): string { return this.getFieldFirstValue("COMMENT"); }
    /**
     * @inheritDoc via `COMMENT` field
     */
    public set comment(value: string) { this.setFieldAsStrings("COMMENT", value); }

    /**
     * @inheritDoc via `GENRE` field
     */
    public get genres(): string[] { return this.getField("GENRE"); }
    /**
     * @inheritDoc via `GENRE` field
     */
    public set genres(value: string[]) { this.setFieldAsStrings("GENRE", ... value); }

    /**
     * @inheritDoc via `DATE` field
     */
    public get year(): number {
        const text = this.getFieldFirstValue("DATE");
        if (!text) { return 0; }

        const parsedText = Number.parseInt(text.substr(0, 4), 10);
        return Number.isNaN(parsedText) ? 0 : parsedText;
    }
    /**
     * @inheritDoc via `DATE` field
     */
    public set year(value: number) {
        if (value > 9999) {
            this.removeField("DATE");
        } else {
            this.setFieldAsUint("DATE", value);
        }
    }

    /** @inheritDoc via `TRACKNUMBER` field */
    public get track(): number {
        const text = this.getFieldFirstValue("TRACKNUMBER");
        if (!text) { return 0; }

        // Sometimes these are stored as fractional fields like ID3v2 tags
        const splitText = text.split("/");
        const parsedText = Number.parseInt(splitText[0], 10);
        return Number.isNaN(parsedText) ? 0 : parsedText;
    }
    /** @inheritDoc via `TRACKNUMBER` field */
    public set track(value: number) {
        // TODO: Option to store as fractional?
        this.setFieldAsUint("TRACKTOTAL", this.trackCount);
        this.setFieldAsUint("TRACKNUMBER", value, 2);
    }

    /**
     * @inheritDoc via `TRACKTOTAL` as per standard, but the denominator of `TRACKNUMBER` is also
     *     used if `TRACKTOTAL` is not available.
     */
    public get trackCount(): number {
        let text = this.getFieldFirstValue("TRACKTOTAL");
        if (text) {
            const parsedValue = Number.parseInt(text, 10);
            if (!Number.isNaN(parsedValue)) { return parsedValue; }
        }

        text = this.getFieldFirstValue("TRACKNUMBER");
        if (text) {
            const textSplit = text.split("/");
            if (textSplit.length > 1) {
                const parsedValue = Number.parseInt(text, 10);
                if (!Number.isNaN(parsedValue)) {
                    return parsedValue;
                }
            }
        }

        return 0;
    }
    /**
     * @inheritDoc via `TRACKNUMBER` field
     */
    public set trackCount(value: number) {
        // TODO: Option to store as fractional?
        this.setFieldAsUint("TRACKNUMBER", this.trackCount);
        this.setFieldAsUint("TRACKTOTAL", value);
    }

    /** @inheritDoc via `DISCNUMBER` field */
    public get disc(): number {
        const text = this.getFieldFirstValue("DISCNUMBER");
        if (!text) { return 0; }

        // Sometimes these are stored as fractional fields like ID3v2 tags
        const splitText = text.split("/");
        const parsedText = Number.parseInt(splitText[0], 10);
        return Number.isNaN(parsedText) ? 0 : parsedText;
    }
    /** @inheritDoc via `DISCNUMBER` field */
    public set disc(value: number) {
        // TODO: Option to store as fractional?
        this.setFieldAsUint("DISCTOTAL", this.discCount);
        this.setFieldAsUint("DISCNUMBER", value);
    }

    /**
     * @inheritDoc via `DISCTOTAL` as per standard, but the denominator of `DISCNUMBER` is also
     *     used if `DISCTOTAL` is not available.
     */
    public get discCount(): number {
        let text = this.getFieldFirstValue("DISCTOTAL");
        if (text) {
            const parsedValue = Number.parseInt(text, 10);
            if (!Number.isNaN(parsedValue)) { return parsedValue; }
        }

        text = this.getFieldFirstValue("DISCTOTAL");
        if (text) {
            const textSplit = text.split("/");
            if (textSplit.length > 1) {
                const parsedValue = Number.parseInt(text, 10);
                if (!Number.isNaN(parsedValue)) {
                    return parsedValue;
                }
            }
        }

        return 0;
    }
    /**
     * @inheritDoc via `DISCTOTAL` field
     */
    public set discCount(value: number) {
        // TODO: Option to store as fractional?
        this.setFieldAsUint("DISCNUMBER", this.discCount);
        this.setFieldAsUint("DISCTOTAL", value);
    }

    /**
     * @inheritDoc via `LYRICS` field
     */
    public get lyrics(): string { return this.getFieldFirstValue("LYRICS"); }
    /**
     * @inheritDoc via `LYRICS` field
     */
    public set lyrics(value: string) { this.setFieldAsStrings("LYRICS", value); }

    /**
     * @inheritDoc via `GROUPING` field
     */
    public get grouping(): string { return this.getFieldFirstValue("GROUPING"); }
    /**
     * @inheritDoc via `GROUPING` field
     */
    public set grouping(value: string) { this.setFieldAsStrings("GROUPING", value); }

    /**
     * @inheritDoc via `TEMPO` field preferentially, BPM field is used as a fallback.
     * @remarks The field that stores the value will be used when setting a BPM in the future. This
     *     behavior can be controlled via {@link StoreBeatsPerMinuteAsTempo}.
     */
    public get beatsPerMinute(): number {
        this._saveBeatsPerMinuteAsTempo = true;

        let text = this.getFieldFirstValue("TEMPO");
        if (!text) {
            text = this.getFieldFirstValue("BPM");

            if (text) {
                // BPM was stored as BPM. Make sure we use that going forward
                this._saveBeatsPerMinuteAsTempo = false;
            }
        }

        if (!text) {
            return 0;
        }

        const parsedNumber = Number.parseInt(text, 10);
        return Number.isNaN(parsedNumber) ? 0 : parsedNumber;
    }
    /**
     * @inheritDoc
     * @remarks Value is stored via `TEMPO` field if {@link StoreBeatsPerMinuteAsTempo} is `true`.
     *     Value is stored via `BPM` if {@link StoreBeatsPerMinuteAsTempo} is `false`. The other
     *     field is removed when stored.
     */
    public set beatsPerMinute(value: number) {
        if (this._saveBeatsPerMinuteAsTempo) {
            this.setFieldAsUint("TEMPO", value);
            this.removeField("BPM");
        } else {
            this.setFieldAsUint("BPM", value);
            this.removeField("TEMPO");
        }
    }

    /**
     * @inheritDoc via `CONDUCTOR` field
     */
    public get conductor(): string { return this.getFieldFirstValue("CONDUCTOR"); }
    /**
     * @inheritDoc via `CONDUCTOR` field
     */
    public set conductor(value: string) { this.setFieldAsStrings("CONDUCTOR", value); }

    /**
     * @inheritDoc via `COPYRIGHT` field
     */
    public get copyright(): string { return this.getFieldFirstValue("COPYRIGHT"); }
    /**
     * @inheritDoc via `GROUPING` field
     */
    public set copyright(value: string) { this.setFieldAsStrings("COPYRIGHT", value); }

    /**
     * @inheritDoc via `DATETAGGED` field
     */
    public get dateTagged(): Date {
        const text = this.getFieldFirstValue("DATETAGGED");
        const date = new Date(text);
        return Number.isNaN(date.getTime()) ? undefined : date;
    }
    /**
     * @inheritDoc via `DATETAGGED` field
     */
    public set dateTagged(value: Date) {
        if (Number.isNaN(value.getTime())) {
            this.removeField("DATETAGGED");
        } else {
            this.setFieldAsStrings("DATETAGGED", value.toISOString());
        }
    }

    /**
     * @inheritDoc via `MUSICBRAINZ_ARTISTID` field
     */
    public get musicBrainzArtistId(): string {
        const artistIds = this.getField("MUSICBRAINZ_ARTISTID");
        return artistIds.length === 0 ? undefined : artistIds.join("/");
    }
    /**
     * @inheritDoc via `MUSICBRAINZ_ARTISTID` field
     */
    public set musicBrainzArtistId(value: string) {
        if (!value) {
            this.removeField(value);
        } else {
            const artistIds = value.split("/");
            this.setFieldAsStrings("MUSICBRAINZ_ARTISTID", ... artistIds);
        }
    }

    /**
     * @inheritDoc via `MUSICBRAINZ_RELEASEGROUPID` field
     */
    public get musicBrainzReleaseGroupId(): string { return this.getFieldFirstValue("MUSICBRAINZ_RELEASEGROUPID"); }
    /**
     * @inheritDoc via `MUSICBRAINZ_RELEASEGROUPID` field
     */
    public set musicBrainzReleaseGroupId(value: string) { this.setFieldAsStrings("MUSICBRAINZ_RELEASEGROUPID", value); }

    /**
     * @inheritDoc via `MUSICBRAINZ_ALBUMID` field
     */
    public get musicBrainzReleaseId(): string { return this.getFieldFirstValue("MUSICBRAINZ_ALBUMID"); }
    /**
     * @inheritDoc via `MUSICBRAINZ_ALBUMID` field
     */
    public set musicBrainzReleaseId(value: string) { this.setFieldAsStrings("MUSICBRAINZ_ALBUMID", value); }

    /**
     * @inheritDoc via `MUSICBRAINZ_ALBUMARTISTID` field
     */
    public get musicBrainzAlbumArtistId(): string {
        const artistIds = this.getField("MUSICBRAINZ_ALBUMARTISTID");
        return artistIds.length === 0 ? undefined : artistIds.join("/");
    }
    /**
     * @inheritDoc via `MUSICBRAINZ_ALBUMARTISTID` field
     */
    public set musicBrainzAlbumArtistId(value: string) {
        if (!value) {
            this.removeField(value);
        } else {
            const artistIds = value.split("/");
            this.setFieldAsStrings("MUSICBRAINZ_ALBUMARTISTID", ... artistIds);
        }
    }

    /**
     * @inheritDoc via `MUSICBRAINZ_TRACKID` field
     */
    public get musicBrainzTrackId(): string { return this.getFieldFirstValue("MUSICBRAINZ_TRACKID"); }
    /**
     * @inheritDoc via `MUSICBRAINZ_TRACKID` field
     */
    public set musicBrainzTrackId(value: string) { this.setFieldAsStrings("MUSICBRAINZ_TRACKID", value); }

    /**
     * @inheritDoc via `MUSICBRAINZ_DISCID` field
     */
    public get musicBrainzDiscId(): string { return this.getFieldFirstValue("MUSICBRAINZ_DISCID"); }
    /**
     * @inheritDoc via `MUSICBRAINZ_DISCID` field
     */
    public set musicBrainzDiscId(value: string) { this.setFieldAsStrings("MUSICBRAINZ_DISCID", value); }

    /**
     * @inheritDoc via `MUSICIP_PUID` field
     */
    public get musicIpId(): string { return this.getFieldFirstValue("MUSICID_PUID"); }
    /**
     * @inheritDoc via `MUSICID_PUID` field
     */
    public set musicIpId(value: string) { this.setFieldAsStrings("MUSICID_PUID", value); }

    /**
     * @inheritDoc via `ASIN` field
     */
    public get amazonId(): string { return this.getFieldFirstValue("ASIN"); }
    /**
     * @inheritDoc via `ASIN` field
     */
    public set amazonId(value: string) { this.setFieldAsStrings("ASIN", value); }

    /**
     * @inheritDoc via `MUSICBRAINZ_ALBUMSTATUS` field
     */
    public get musicBrainzReleaseStatus(): string { return this.getFieldFirstValue("MUSICBRAINZ_ALBUMSTATUS"); }
    /**
     * @inheritDoc via `MUSICBRAINZ_ALBUMSTATUS` field
     */
    public set musicBrainzReleaseStatus(value: string) { this.setFieldAsStrings("MUSICBRAINZ_ALBUMSTATUS", value); }

    /**
     * @inheritDoc via `MUSICBRAINZ_ALBUMTYPE` field
     */
    public get musicBrainzReleaseType(): string { return this.getFieldFirstValue("MUSICBRAINZ_ALBUMTYPE"); }
    /**
     * @inheritDoc via `MUSICBRAINZ_ALBUMTYPE` field
     */
    public set musicBrainzReleaseType(value: string) { this.setFieldAsStrings("MUSICBRAINZ_ALBUMTYPE", value); }

    /**
     * @inheritDoc via `RELEASECOUNTRY` field
     */
    public get musicBrainzReleaseCountry(): string { return this.getFieldFirstValue("RELEASECOUNTRY"); }
    /**
     * @inheritDoc via `RELEASECOUNTRY` field
     */
    public set musicBrainzReleaseCountry(value: string) { this.setFieldAsStrings("RELEASECOUNTRY", value); }

    /**
     * @inheritDoc
     */
    public get pictures(): IPicture[] { return this._pictures; }
    /**
     * @inheritDoc
     */
    public set pictures(value: IPicture[]) { this._pictures = value; }

    /**
     * @inheritDoc via `COMPILATION` field
     */
    public get isCompilation(): boolean { return this.getFieldFirstValue("COMPILATION") === "1"; }
    /**
     * @inheritDoc via `COMPILATION` field
     */
    public set isCompilation(value: boolean) {
        if (value) {
            this.setFieldAsStrings("COMPILATION", "1");
        } else {
            this.removeField("COMPILATION");
        }
    }

    /**
     * @inheritDoc via `REPLAYGAIN_TRACK_GAIN` field
     */
    public get replayGainTrackGain(): number {
        // NOTE: don't forget that falsy parses as NaN and invalid characters after valid float are
        //     ignored, so even if it ends with db it'll parse correctly
        const text = this.getFieldFirstValue("REPLAYGAIN_TRACK_GAIN");
        return Number.parseFloat(text);
    }
    /**
     * @inheritDoc via `REPLAYGAIN_TRACK_GAIN` field
     */
    public set replayGainTrackGain(value: number) {
        if (Number.isNaN(value)) {
            this.removeField("REPLAYGAIN_TRACK_GAIN");
        } else {
            this.setFieldAsStrings("REPLAYGAIN_TRACK_GAIN", `${value.toFixed(2)} db`);
        }
    }

    /**
     * @inheritDoc via `REPLAYGAIN_TRACK_PEAK` field
     */
    public get replayGainTrackPeak(): number {
        const text = this.getFieldFirstValue("REPLAYGAIN_TRACK_PEAK");
        return Number.parseFloat(text);
    }
    /**
     * @inheritDoc via `REPLAYGAIN_TRACK_PEAK` field
     */
    public set replayGainTrackPeak(value: number) {
        if (Number.isNaN(value)) {
            this.removeField("REPLAYGAIN_TRACK_PEAK");
        } else {
            this.setFieldAsStrings("REPLAYGAIN_TRACK_PEAK", value.toFixed(6));
        }
    }

    /**
     * @inheritDoc via `REPLAYGAIN_ALBUM_GAIN` field
     */
    public get replayGainAlbumGain(): number {
        // NOTE: don't forget that falsy parses as NaN and invalid characters after valid float are
        //     ignored, so even if it ends with db it'll parse correctly
        const text = this.getFieldFirstValue("REPLAYGAIN_ALBUM_GAIN");
        return Number.parseFloat(text);
    }
    /**
     * @inheritDoc via `REPLAYGAIN_ALBUM_GAIN` field
     */
    public set replayGainAlbumGain(value: number) {
        if (Number.isNaN(value)) {
            this.removeField("REPLAYGAIN_ALBUM_GAIN");
        } else {
            this.setFieldAsStrings("REPLAYGAIN_ALBUM_GAIN", `${value.toFixed(2)} db`);
        }
    }

    /**
     * @inheritDoc via `REPLAYGAIN_ALBUM_PEAK` field
     */
    public get replayGainAlbumPeak(): number {
        const text = this.getFieldFirstValue("REPLAYGAIN_ALBUM_PEAK");
        return Number.parseFloat(text);
    }
    /**
     * @inheritDoc via `REPLAYGAIN_TRACK_PEAK` field
     */
    public set replayGainAlbumPeak(value: number) {
        if (Number.isNaN(value)) {
            this.removeField("REPLAYGAIN_ALBUM_PEAK");
        } else {
            this.setFieldAsStrings("REPLAYGAIN_ALBUM_PEAK", value.toFixed(6));
        }
    }

    /**
     * @inheritDoc via `INITIALKEY` field
     */
    public get initialKey(): string { return this.getFieldFirstValue("INITIALKEY"); }
    /**
     * @inheritDoc via `INITIALKEY` field
     */
    public set initialKey(value: string) { this.setFieldAsStrings("INITIALKEY", value); }

    /**
     * @inheritDoc via `REMIXEDBY` field
     */
    public get remixedBy(): string { return this.getFieldFirstValue("REMIXEDBY"); }
    /**
     * @inheritDoc via `REMIXEDBY` field
     */
    public set remixedBy(value: string) { this.setFieldAsStrings("REMIXEDBY", value); }

    /**
     * @inheritDoc via `ORGANIZATION` field
     */
    public get publisher(): string { return this.getFieldFirstValue("ORGANIZATION"); }
    /**
     * @inheritDoc via `ORGANIZATION` field
     */
    public set publisher(value: string) { this.setFieldAsStrings("ORGANIZATION", value); }

    /**
     * @inheritDoc via `ISRC` field
     */
    public get isrc(): string { return this.getFieldFirstValue("ISRC"); }
    /**
     * @inheritDoc via `ISRC` field
     */
    public set isrc(value: string) { this.setFieldAsStrings("ISRC", value); }

    /**
     * @inheritDoc
     */
    public get isEmpty(): boolean { return this.fieldValueCount === 0; }

    // #endregion

    // #region Public Methods

    /** @inheritDoc */
    public clear(): void {
        Object.keys(this._fields).forEach((k) => delete this._fields[k]);
        this._pictures.splice(0, this._pictures.length);
    }

    /**
     * Gets the field data for a given field identifier.
     * @param key Field identifier to look up
     * @returns string[] Field data or an empty array if the field was not found
     * @remarks Field data is cloned before being returned. Any modifications to the returned field
     *     will not be reflected in the tag.
     */
    public getField(key: string): string[] {
        Guards.notNullOrUndefined(key, "key");
        key = key.toUpperCase();
        if (XiphComment.isPictureField(key)) {
            throw new Error("Do not use get/set field methods to manipulate pictures, use the `pictures` property");
        }

        return key in this._fields
            ? this._fields[key].slice()
            : [];
    }

    /**
     * Gets the first value in a field for a given field identifier.
     * @param key Field identifier to look up
     * @returns string Field data or `undefined` if the field was notfound
     */
    public getFieldFirstValue(key: string): string {
        Guards.notNullOrUndefined(key, "key");
        key = key.toUpperCase();
        if (XiphComment.isPictureField(key)) {
            throw new Error("Do not use get/set field methods to manipulate pictures, use the `pictures` property");
        }

        const values = this.getField(key);
        return values.length > 0 ? values[0] : undefined;
    }

    /**
     * Removes a field and all its values from the current instance.
     * @param key Field identifier to remove
     */
    public removeField(key: string): void {
        Guards.notNullOrUndefined(key, "key");
        key = key.toUpperCase();
        if (XiphComment.isPictureField(key)) {
            throw new Error("Do not use get/set field methods to manipulate pictures, use the `pictures` property");
        }

        delete this._fields[key];
    }

    /**
     * Renders the current instance as a raw Xiph comment, optionally adding a framing bit.
     * @param addFramingBit Whether or not to add a framing bit to the end of the content.
     */
    public render(addFramingBit: boolean): ByteVector {
        // Add the vendor ID length and the vendor ID. It's important to use the length of the
        // vendor ID as a byte vector rather than the string length because UTF8 can include multi-
        // byte characters.
        const vendor = ByteVector.fromString(this._vendorId, StringType.UTF8);

        // Encode the field data
        const allFieldData = Object.keys(this._fields).reduce<ByteVector[]>((a, k) => {
            const fieldData = this._fields[k].map((v) => {
                const encodedField = `${k}=${v}`;
                const fieldDatum = ByteVector.fromString(encodedField, StringType.UTF8);
                return ByteVector.concatenate(
                    ByteVector.fromUInt(fieldDatum.length, false),
                    fieldDatum
                );
            });
            a.push(... fieldData);

            return a;
        }, []);

        // Encode the picture data
        const pictureData = this._pictures.map((p) => {
            const xiphPicture = p instanceof XiphPicture ? p : XiphPicture.fromPicture(p);
            const encodedPicture = `METADATA_BLOCK_PICTURE=${xiphPicture.render()}`;
            return ByteVector.fromString(encodedPicture, StringType.UTF8);
        });

        // Put it all together
        const result = ByteVector.concatenate(
            ByteVector.fromUInt(vendor.length),
            vendor,
            ... allFieldData,
            ... pictureData
        );

        // Append the framing bit if necessary
        if (addFramingBit) {
            result.addByte(1);
        }

        return result;
    }

    /**
     * Sets the contents of a specified field to the provided strings. All values are trimmed and
     * empty/undefined values are excluded.
     * @param key Field identifier to set
     * @param values Values to store in the current instance
     */
    public setFieldAsStrings(key: string, ... values: string[]): void {
        Guards.notNullOrUndefined(key, "key");
        key = key.toUpperCase();
        if (XiphComment.isPictureField(key)) {
            throw new Error("Do not use get/set field methods to manipulate pictures, use the `pictures` property");
        }

        if (!values || values.length === 0) {
            this.removeField(key);
            return;
        }

        values = values.map((v) => v ? v.trim() : "").filter((v) => v);
        if (values.length === 0) {
            this.removeField(key);
        } else {
            this._fields[key] = values;
        }
    }

    /**
     * Sets the contents of a specified field to the provided number.
     * @param key Field identifier to set
     * @param value Value to store, must be a positive, 32-bit integer
     * @param minPlaces Number of places to include at a minimum, if the number has fewer places
     *     than this, the value will be padded with zeroes.
     */
    public setFieldAsUint(key: string, value: number, minPlaces: number = 1): void {
        Guards.notNullOrUndefined(key, "key");
        Guards.uint(value, "value");
        Guards.uint(minPlaces, "minPlaces");
        if (XiphComment.isPictureField(key)) {
            throw new Error("Do not use get/set field methods to manipulate pictures, use the `pictures` property");
        }

        if (value === 0) {
            this.removeField(key);
        } else {
            this.setFieldAsStrings(key, value.toString(10).padStart(minPlaces, "0"));
        }
    }

    // #endregion

    // #region Private Methods

    private static isPictureField(fieldName: string): boolean {
        return XiphComment.pictureFields.indexOf(fieldName) >= 0;
    }

    // #endregion
}
