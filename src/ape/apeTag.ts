import * as dateFormat from "dateformat";

import {ApeFooter, ApeFooterFlags} from "./apeFooter";
import {ApeItem, ApeItemType} from "./apeItem";
import {ByteVector, StringType} from "../byteVector";
import {IPicture, Picture, PictureType} from "../picture";
import {Tag, TagTypes} from "../tag";
import {ArrayUtils, Guards} from "../utils";

/**
 * Class extends {@see Tag} to provide a representation of an APEv2 tag which can be read and
 * written to disk.
 */
export default class ApeTag extends Tag {
    private static readonly _pictureItemNames = [
        "Cover Art (other)",
        "Cover Art (icon)",
        "Cover Art (other icon)",
        "Cover Art (front)",
        "Cover Art (back)",
        "Cover Art (leaflet)",
        "Cover Art (media)",
        "Cover Art (lead)",
        "Cover Art (artist)",
        "Cover Art (conductor)",
        "Cover Art (band)",
        "Cover Art (composer)",
        "Cover Art (lyricist)",
        "Cover Art (studio)",
        "Cover Art (recording)",
        "Cover Art (performance)",
        "Cover Art (movie scene)",
        "Cover Art (colored fish)",
        "Cover Art (illustration)",
        "Cover Art (band logo)",
        "Cover Art (publisher logo)",
        "Embedded Object"
    ];

    private readonly _items: ApeItem[] = [];
    private _footer: ApeFooter;

    public get headerPresent(): boolean { return (this._footer.flags & ApeFooterFlags.HeaderPresent) !== 0; }
    public set headerPresent(val: boolean) {
        if (val) {
            this._footer.flags |= ApeFooterFlags.HeaderPresent;
        } else {
            this._footer.flags &= ~ApeFooterFlags.HeaderPresent;
        }
    }

    // #region Public Methods

    /**
     * Adds the contents of an array of strings to the value stored in a specified item.
     * @param key Key of the item to store the value in.
     * @param value Text values to add.
     */
    public addMultipleStringValue(key: string, value: string[]): void {
        Guards.notNullOrUndefined(key, "key");

        if (!value || value.length === 0) {
            return;
        }

        // Add existing values of the item first
        const index = this.getItemIndex(key);
        const values = [];
        if (index >= 0) {
            values.push(... this._items[index].toStringArray());
        }

        // Add the new values to the item
        values.push(... value);

        // Add the item if it doesn't already exist, replace it with a new one if it does
        const item = ApeItem.fromMultipleStrings(key, values);
        if (index >= 0) {
            this._items[0] = item;
        } else {
            this._items.push(item);
        }
    }

    /**
     * Adds a new item to this tag as a single numeric value. If both {@param n} and {@param count}
     * are provided, the value will be stored as "n/count". If only {@param n} is provided, the
     * value will be stored as just "n". If both {@param n} and {@param count} are 0, the item item
     * will be removed.
     * @param key Key of the item to store the value in.
     * @param n Numeric value to store. If {@param count} is also provided, this will be the
     *     numerator of the fraction to store.
     * @param count Optionally, the denominator of the fraction to store.
     */
    public addNumericValue(key: string, n: number, count: number = 0): void {
        Guards.notNullOrUndefined(key, "key");
        Guards.uint(n, "n");
        Guards.uint(count, "count");

        if (n === 0 && count === 0) {
            return;
        }

        if (count !== 0) {
            this.addSingleStringValue(key, `${n}/${count}`);
        } else {
            this.addSingleStringValue(key, n.toString());
        }
    }

    /**
     * Adds a single string to the specified item in this tag.
     * @param key Key of the item to add.
     * @param value Value for the item to add.
     */
    public addSingleStringValue(key: string, value: string): void {
        Guards.notNullOrUndefined(key, "key");

        if (!value) {
            return;
        }

        this.addMultipleStringValue(key, [value]);
    }

    /**
     * Gets a specified item from the current instance.
     * @param key Key for locating the requested {@see ApeItem}.
     * @returns The requested {@see ApeItem} if the specified {@param key} exists, `undefined`
     *  otherwise.
     */
    public getItem(key: string): ApeItem {
        Guards.notNullOrUndefined(key, "key");
        const upperKey = key.toUpperCase();
        return this._items.find((i) => i.key.toUpperCase() === upperKey);
    }

    /**
     * Checks if an item exists in the current instance.
     * @param key Key of the item to check.
     */
    public hasItem(key: string): boolean {
        Guards.notNullOrUndefined(key, "key");
        return this.getItemIndex(key) >= 0;
    }

    /**
     * Renders the current instance as a raw APEv2 tag.
     */
    public render(): ByteVector {
        const data = this._items.reduce(
            (bv, e) => { bv.addByteVector(e.render()); return bv; },
            ByteVector.fromSize(0)
        );

        this._footer.itemCount = this._items.length;
        this._footer.tagSize = (data.length + ApeFooter.size);
        this.headerPresent = true;

        data.insertByteVector(0, this._footer.renderHeader());
        data.addByteVector(this._footer.renderFooter());
        return data;
    }

    /**
     * Removes the items with a specified key from the current instance.
     * @param key Key of the item to remove from the current instance.
     */
    public removeItem(key: string): void {
        Guards.notNullOrUndefined(key, "key");
        const keyUpper = key.toUpperCase();
        ArrayUtils.remove<ApeItem>(this._items, (e) => e.key.toUpperCase() === keyUpper);
    }

    /**
     * Stores the contents of an array of strings in a specified item. If {@param value} is falsy
     * or empty, the item will be removed.
     * @param key Key of the item to store the value in.
     * @param value Text to store in the item.
     */
    public setMultipleStringValue(key: string, value: string[]): void {
        Guards.notNullOrUndefined(key, "key");

        if (!value || value.length === 0) {
            this.removeItem(key);
            return;
        }

        const item = ApeItem.fromMultipleStrings(key, value);
        const index = this.getItemIndex(key);
        if (index >= 0) {
            this._items[index] = item;
        } else {
            this._items.push(item);
        }
    }

    /**
     * Sets the value of an existing item to this tag as a single numeric value. If both {@param n}
     * and {@param count} are provided, the value will be stored as "n/count". If only {@param n}
     * is provided, the value will be stored as just "n".
     * @param key Key of the item to store the value in.
     * @param n Numeric value to store. If {@param count} is also provided, this will be the
     *     numerator of the fraction to store.
     * @param count Optionally, the denominator of the fraction to store.
     */
    public setNumericValue(key: string, n: number, count: number = 0): void {
        Guards.notNullOrUndefined(key, "key");
        Guards.uint(n, "n");
        Guards.uint(count, "count");

        if (n === 0 || count === 0) {
            this.removeItem(key);
        } else if (count !== 0) {
            this.setSingleStringValue(key, `${n}/${count}`);
        } else {
            this.setSingleStringValue(key, n.toString());
        }
    }

    /**
     * Sets the value of an existing item in this tag vith a single string as the value. If
     * {@param value} is falsy, the item will be removed.
     * @param key Key of the item to add.
     * @param value Value for the item to add.
     */
    public setSingleStringValue(key: string, value: string): void {
        Guards.notNullOrUndefined(key, "key");

        if (!value) {
            this.removeItem(key);
        }

        this.setMultipleStringValue(key, [value]);
    }

    /**
     * Adds an item to the current instance, replacing an existing item with the same key.
     * @param item {@see ApeItem} to add to the current instance.
     */
    public setItem(item: ApeItem): void {
        Guards.truthy(item, "item");

        const index = this.getItemIndex(item.key);
        if (index >= 0) {
            this._items[index] = item;
        } else {
            this._items.push(item);
        }
    }

    // #endregion

    // #region Tag

    public get tagTypes(): TagTypes { return TagTypes.Ape; }

    public get title(): string { return this.getItemAsString("Title"); }
    public set title(value: string) { this.setSingleStringValue("Title", value); }

    public get titleSort(): string { return this.getItemAsString("TitleSort"); }
    public set titleSort(value: string) { this.setSingleStringValue("TitleSort", value);  }

    public get subtitle(): string { return this.getItemAsString("Subtitle"); }
    public set subtitle(value: string) { this.setSingleStringValue("Subtitle", value); }

    public get description(): string { return this.getItemAsString("Description"); }
    public set description(value: string) { this.setSingleStringValue("Description", value); }

    public get performers(): string[] { return this.getItemAsStrings("Artist"); }
    public set performers(value: string[]) { this.setMultipleStringValue("Artist", value); }

    public get performersSort(): string[] { return this.getItemAsStrings("ArtistSort"); }
    public set performersSort(value: string[]) { this.setMultipleStringValue("ArtistSort", value); }

    public get performersRole(): string[] { return this.getItemAsStrings("PerformersRole"); }
    public set performersRole(value: string[]) { this.setMultipleStringValue("PerformersRoles", value); }

    /**
     * Gets the artist who is credited in the creation of the entire album or collection containing
     * the media described by the current instance.
     * This property is implemented using the "Album Artist" item. "AlbumArtist" is used as a
     * backup property if the first does not exist.
     */
    public get albumArtists(): string[] {
        let list = this.getItemAsStrings("Album Artist");
        if (list.length === 0) {
            list = this.getItemAsStrings("AlbumArtist");
        }
        return list;
    }
    /**
     * Sets the artist who is credited in the creation of the entire album or collection containing
     * the media described by the current instance.
     * The "Album Artist" item will always be used to store the value, if the older "AlbumArtist"
     * exists, it will also be used to store the value.
     */
    public set albumArtists(value: string[]) {
        this.setMultipleStringValue("Album Artist", value);
        if (this.hasItem("AlbumArtist")) {
            this.setMultipleStringValue("AlbumArtist", value);
        }
    }

    public get albumArtistsSort(): string[] { return this.getItemAsStrings("AlbumArtistSort"); }
    public set albumArtistsSort(value: string[]) { this.setMultipleStringValue("AlbumArtistSort", value); }

    public get composers(): string[] { return this.getItemAsStrings("Composer"); }
    public set composers(value: string[]) { this.setMultipleStringValue("Composer", value); }

    public get composersSort(): string[] { return this.getItemAsStrings("ComposerSort"); }
    public set composersSort(value: string[]) { this.setMultipleStringValue("ComposerSort", value); }

    public get album(): string { return this.getItemAsString("Album"); }
    public set album(value: string) { this.setSingleStringValue("Album", value); }

    public get albumSort(): string { return this.getItemAsString("AlbumSort"); }
    public set albumSort(value: string) { this.setSingleStringValue("AlbumSort", value); }

    public get comment(): string { return this.getItemAsString("Comment"); }
    public set comment(value: string) { this.setSingleStringValue("Comment", value); }

    public get genres(): string[] { return this.getItemAsStrings("Genre"); }
    public set genres(value: string[]) { this.setMultipleStringValue("Genre", value); }

    public get year(): number {
        const text = this.getItemAsString("Year");
        if (!text) { return 0; }

        const num = parseInt(text.substring(0, 4), 10);
        return Number.isNaN(num) ? 0 : num;
    }
    public set year(value: number) { this.setNumericValue("Year", value, 0); }

    public get track(): number { return this.getItemAsUInt("Track", 0); }
    public set track(value: number) { this.setNumericValue("Track", value, this.trackCount); }

    public get trackCount(): number { return this.getItemAsUInt("Track", 1); }
    public set trackCount(value: number) { this.setNumericValue("Track", this.track, value); }

    public get disc(): number { return this.getItemAsUInt("Disc", 0); }
    public set disc(value: number) { this.setNumericValue("Disc", value, this.discCount); }

    public get discCount(): number { return this.getItemAsUInt("Disc", 1); }
    public set discCount(value: number) { this.setNumericValue("Disc", value, this.discCount); }

    public get lyrics(): string { return this.getItemAsString("Lyrics"); }
    public set lyrics(value: string) { this.setSingleStringValue("Lyrics", value); }

    public get grouping(): string { return this.getItemAsString("Grouping"); }
    public set grouping(value: string) { this.setSingleStringValue("Grouping", value); }

    public get beatsPerMinute(): number {
        const text = this.getItemAsString("BPM");
        if (!text) { return 0; }
        const num = parseFloat(text);
        return Number.isNaN(num) ? 0 : Math.round(num);
    }
    public set beatsPerMinute(value: number) { this.setNumericValue("BPM", value, 0); }

    public get conductor(): string { return this.getItemAsString("Conductor"); }
    public set conductor(value: string) { this.setSingleStringValue("Conductor", value); }

    public get copyright(): string { return this.getItemAsString("Copyright"); }
    public set copyright(value: string) { this.setSingleStringValue("Copyright", value); }

    public get dateTagged(): Date {
        const val = this.getItemAsString("DateTagged");
        if (val ) {
            const date = new Date(val);
            if (!Number.isNaN(date.valueOf())) {
                return date;
            }
        }

        return undefined;
    }
    public set dateTagged(value: Date) {
        let str;
        if (value) {
            str = dateFormat(value, "yyyy-mm-dd HH:MM:ss");
        }
        this.setSingleStringValue("DateTagged", str);
    }

    public get musicBrainzArtistId(): string { return this.getItemAsString("MUSICBRAINZ_ARTISTID"); }
    public set musicBrainzArtistId(value: string) { this.setSingleStringValue("MUSICBRAINZ_ARTISTID", value); }

    public get musicBrainzReleaseGroupId(): string { return this.getItemAsString("MUSICBRAINZ_RELEASEGROUPID"); }
    public set musicBrainzReleaseGroupId(value: string) {
        this.setSingleStringValue("MUSICBRAINZ_RELEASEGROUPID", value);
    }

    public get musicBrainzReleaseId(): string { return this.getItemAsString("MUSICBRAINZ_ALBUMID"); }
    public set musicBrainzReleaseId(value: string) { this.setSingleStringValue("MUSICBRAINZ_ALBUMID", value); }

    public get musicBrainzReleaseArtistId(): string { return this.getItemAsString("MUSICBRAINZ_ALBUMARTISTID"); }
    public set musicBrainzReleaseArtistId(value: string) {
        this.setSingleStringValue("MUSICBRAINZ_ALBUMARTISTID", value);
    }

    public get musicBrainzTrackId(): string { return this.getItemAsString("MUSICBRAINZ_TRACKID"); }
    public set musicBrainzTrackId(value: string) { this.setSingleStringValue("MUSICBRAINZ_TRACKID", value); }

    public get musicBrainzDiscId(): string { return this.getItemAsString("MUSICBRAINZ_DISCID"); }
    public set musicBrainzDiscId(value: string) { this.setSingleStringValue("MUSICBRAINZ_DISCID", value); }

    public get musicIpId(): string { return this.getItemAsString("MUSICIP_PUID"); }
    public set musicIpId(value: string) { this.setSingleStringValue("MUSICIP_PUID", value); }

    public get amazonId(): string { return this.getItemAsString("ASIN"); }
    public set amazonId(value: string) { this.setSingleStringValue("ASIN", value); }

    public get musicBrainzReleaseStatus(): string { return this.getItemAsString("MUSICBRAINZ_ALBUMSTATUS"); }
    public set musicBrainzReleaseStatus(value: string) { this.setSingleStringValue("MUSICBRAINZ_ALBUMSTATUS", value); }

    public get musicBrainzReleaseType(): string { return this.getItemAsString("MUSICBRAINS_ALBUMTYPE"); }
    public set musicBrainzReleaseType(value: string) { this.setSingleStringValue("MUSICBRAINZ_ALBUMTYPE", value); }

    public get musicBrainzReleaseCountry(): string { return this.getItemAsString("RELEASECOUNTRY"); }
    public set musicBrainzReleaseCountry(value: string) { this.setSingleStringValue("RELEASECOUNTRY", value); }

    public get replayGainTrackGain(): number {
        let text = this.getItemAsString("REPLAYGAIN_TRACK_GAIN");
        if (!text) { return NaN; }
        if (text.toLowerCase().endsWith("db")) {
            text = text.substring(0, text.length - 2).trim();
        }
        return parseFloat(text);
    }
    public set replayGainTrackGain(value: number) {
        if (Number.isNaN(value)) {
            this.removeItem("REPLAYGAIN_TRACK_GAIN");
        } else {
            const text = `${value.toFixed(2)} dB`;
            this.setSingleStringValue("REPLAYGAIN_TRACK_GAIN", text);
        }
    }

    public get replayGainTrackPeak(): number {
        let text = this.getItemAsString("REPLAYGAIN_TRACK_PEAK");
        if (!text) { return NaN; }
        if (text.toLowerCase().endsWith("db")) {
            text = text.substring(0, text.length - 2).trim();
        }
        return parseFloat(text);
    }
    public set replayGainTrackPeak(value: number) {
        if (Number.isNaN(value)) {
            this.removeItem("REPLAYGAIN_TRACK_PEAK");
        } else {
            const text = `${value.toFixed(6)} dB`;
            this.setSingleStringValue("REPLAYGAIN_TRACK_PEAK", text);
        }
    }

    public get replayGainAlbumGain(): number {
        let text = this.getItemAsString("REPLAYGAIN_ALBUM_GAIN");
        if (!text) { return NaN; }
        if (text.toLowerCase().endsWith("db")) {
            text = text.substring(0, text.length - 2).trim();
        }
        return parseFloat(text);
    }
    public set replayGainAlbumGain(value: number) {
        if (Number.isNaN(value)) {
            this.removeItem("REPLAYGAIN_ALBUM_GAIN");
        } else {
            const text = `${value.toFixed(2)} dB`;
            this.setSingleStringValue("REPLAYGAIN_ALBUM_GAIN", text);
        }
    }

    public get replayGainAlbumPeak(): number {
        let text = this.getItemAsString("REPLAYGAIN_ALBUM_PEAK");
        if (!text) { return NaN; }
        if (text.toLowerCase().endsWith("db")) {
            text = text.substring(0, text.length - 2).trim();
        }
        return parseFloat(text);
    }
    public set replayGainAlbumPeak(value: number) {
        if (Number.isNaN(value)) {
            this.removeItem("REPLAYGAIN_ALBUM_PEAK");
        } else {
            const text = `${value.toFixed(6)} dB`;
            this.setSingleStringValue("REPLAYGAIN_ALBUM_PEAK", text);
        }
    }

    public get pictures(): IPicture[] {
        const pictures = [];
        for (const item of this._items) {
            if (!item || item.type !== ApeItemType.Binary) { continue; }

            const keyLower = item.key.toLowerCase();
            const typeIndex = ApeTag._pictureItemNames.findIndex((e) => e.toLowerCase() === keyLower);
            if (typeIndex < 0) { continue; }

            const index = item.value.find(ByteVector.getTextDelimiter(StringType.UTF8));
            if (index < 0) { continue; }

            const pic = new Picture(item.value.mid(index + 1));
            pic.description = item.value.toString(StringType.UTF8, 0, index);
            pic.type = typeIndex < ApeTag._pictureItemNames.length - 1 ? typeIndex : PictureType.NotAPicture;

            pictures.push(pic);
        }
    }
    public set pictures(value: IPicture[]) {
        for (const itemName of ApeTag._pictureItemNames) {
            this.removeItem(itemName);
        }

        if (!value || value.length === 0) { return; }

        for (const pic of value) {
            let type = pic.type;
            if (type >= ApeTag._pictureItemNames.length) {
                type = ApeTag._pictureItemNames.length - 1;
            }

            const name = ApeTag._pictureItemNames[type];
            if (this.getItem(name)) { continue; }

            const data = ByteVector.fromString(pic.description, StringType.UTF8);
            data.addByteVector(ByteVector.getTextDelimiter(StringType.UTF8));
            data.addByteVector(pic.data);

            this.setItem(ApeItem.fromBinaryData(name, data));
        }
    }

    public get isEmpty(): boolean { return this._items.length === 0; }

    public clear(): void {
        this._items.splice(0, this._items.length);
    }

    public copyTo(target: Tag, overwrite: boolean): void {
        Guards.truthy(target, "target");

        // @TODO: Does this need to be an & check
        const apeTarget = <ApeTag> target;
        if (target.tagTypes !== TagTypes.Ape || apeTarget._items === undefined) {
            super.copyTo(target, overwrite);
            return;
        }

        for (const item of this._items) {
            if (!overwrite && apeTarget.getItem(item.key)) { continue; }
            apeTarget.setItem(ApeItem.fromApeItem(item));
        }
    }

    // #endregion

    // #region Private Methods

    private getItemIndex(key: string): number {
        const keyUpper = key.toUpperCase();
        return this._items.findIndex((e) => e.key.toUpperCase() === keyUpper);
    }

    private getItemAsString(key: string): string {
        const item = this.getItem(key);
        return item ? item.toString() : undefined;
    }

    private getItemAsStrings(key: string): string[] {
        const item = this.getItem(key);
        return item ? item.toStringArray() : [];
    }

    private getItemAsUInt(key: string, index: number) {
        Guards.uint(index, "index");

        const text = this.getItemAsString(key);
        if (!text) {
            return 0;
        }

        const values = text.split("/", index + 2);
        if (values.length < index + 1) {
            return 0;
        }
        const num = parseInt(values[index], 10);
        if (Number.isNaN(num)) {
            return 0;
        }

        return num;
    }

    // #endregion
}
