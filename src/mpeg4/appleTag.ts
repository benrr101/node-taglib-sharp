import * as DateFormat from "dateformat";
import AppleItemListBox from "./boxes/appleItemListBox";
import Genres from "../genres";
import IsoMetaBox from "./boxes/isoMetaBox";
import IsoUserDataBox from "./boxes/isoUserDataBox";
import Mpeg4BoxType from "./mpeg4BoxType";
import Mpeg4HandlerType from "./mpeg4HandlerType";
import {AppleDataBox, AppleDataBoxFlagType} from "./boxes/appleDataBox";
import {ByteVector, StringType} from "../byteVector";
import {IPicture, Picture} from "../picture";
import {Tag, TagTypes} from "../tag";
import {ArrayUtils, Guards, NumberUtils} from "../utils";

export default class AppleTag extends Tag {
    /**
     * Contains the ISO meta box in which that tag will be stored.
     */
    private readonly _metaBox: IsoMetaBox;

    /**
     * Contains the ILST box which holds all the values.
     */
    private readonly _ilstBox: AppleItemListBox;

    /**
     * Constructs and initializes a new instance of @see AppleTag for a specified ISO user data box.
     * @param box  A @see IsoUserDataBox from which the tag is to be read.
     */
    public constructor(box: IsoUserDataBox) {
        super();

        Guards.truthy(box, "box");

        this._metaBox = box.getChild<IsoMetaBox>(Mpeg4BoxType.META);
        if (!this._metaBox) {
            this._metaBox = IsoMetaBox.fromHandler(Mpeg4HandlerType.MDIR);
            box.addChild(this._metaBox);
        }

        this._ilstBox = this._metaBox.getChild<AppleItemListBox>(Mpeg4BoxType.ILST);
        if (!this._ilstBox) {
            this._ilstBox = AppleItemListBox.fromEmpty();
            this._metaBox.addChild(this._ilstBox);
        }
    }

    /** @inheritDoc */
    public get tagTypes(): TagTypes { return TagTypes.Apple; }

    /** @inheritDoc */
    public get sizeOnDisk(): number { return undefined; }

    /** @inheritDoc */
    public get title(): string { return this.getFirstQuickTimeString(Mpeg4BoxType.NAM); }
    /** @inheritDoc */
    public set title(v: string) { this.setQuickTimeString(Mpeg4BoxType.NAM, v); }

    /** @inheritDoc */
    public get subtitle(): string { return this.getFirstQuickTimeString(Mpeg4BoxType.SUBT); }
    /** @inheritDoc */
    public set subtitle(v: string) { this.setQuickTimeString(Mpeg4BoxType.SUBT, v); }

    /** @inheritDoc */
    public get description(): string { return this.getFirstQuickTimeString(Mpeg4BoxType.DESC); }
    /** @inheritDoc */
    public set description(v: string) { this.setQuickTimeString(Mpeg4BoxType.DESC, v); }

    /** @inheritDoc */
    public get performers(): string[] { return this.getQuickTimeStrings(Mpeg4BoxType.ART); }
    /** @inheritDoc */
    public set performers(v: string[]) { this.setQuickTimeStrings(Mpeg4BoxType.ART, v); }

    /** @inheritDoc */
    public get performersRole(): string[] {
        return this.getQuickTimeStrings(Mpeg4BoxType.ROLE)
            .map(s => s.replace(/\//g, ";").trim());
    }
    /** @inheritDoc */
    public set performersRole(v: string[]) {
        // @TODO: handle undefined performers better
        v = v?.map(e => e.replace(/;/g, "/"))
        this.setQuickTimeStrings(Mpeg4BoxType.ROLE, v);
    }

    /** @inheritDoc */
    public get albumArtists(): string[] { return this.getQuickTimeStrings(Mpeg4BoxType.AART); }
    /** @inheritDoc */
    public set albumArtists(v: string[]) { this.setQuickTimeStrings(Mpeg4BoxType.AART, v); }

    /** @inheritDoc */
    public get composers(): string[] { return this.getQuickTimeStrings(Mpeg4BoxType.WRT); }
    /** @inheritDoc */
    public set composers(v: string[]) { this.setQuickTimeStrings(Mpeg4BoxType.WRT, v); }

    /** @inheritDoc */
    public get album(): string { return this.getFirstQuickTimeString(Mpeg4BoxType.ALB); }
    /** @inheritDoc */
    public set album(v: string) { this.setQuickTimeString(Mpeg4BoxType.ALB, v); }

    /** @inheritDoc */
    public get comment(): string { return this.getFirstQuickTimeString(Mpeg4BoxType.CMT); }
    /** @inheritDoc */
    public set comment(v: string) { this.setQuickTimeString(Mpeg4BoxType.CMT, v); }

    /** @inheritDoc */
    public get genres(): string[] {
        let text = this.getQuickTimeStrings(Mpeg4BoxType.GEN);
        if (text.length === 0) {
            for (const data of this.getQuickTimeData(Mpeg4BoxType.GNRE)) {
                // iTunes stores genre's in the GNRE box as (ID3# + 1).
                // @TODO This is not true, see list of genres https://exiftool.org/TagNames/QuickTime.html
                const index = data.toUshort(true);
                if (index === 0) {
                    continue;
                }

                const str = Genres.indexToAudio(index - 1, false);
                if (!str) {
                    continue;
                }

                text = [str];
                break;
            }
        }

        return text;
    }
    /** @inheritDoc */
    public set genres(v: string[]) {
        // @TODO: Allow using itunes genres via config
        this._ilstBox.removeChildByType(Mpeg4BoxType.GNRE);
        this.setQuickTimeStrings(Mpeg4BoxType.GEN, v);
    }

    /** @inheritDoc */
    public get year(): number {
        for (const str of this.getQuickTimeStrings(Mpeg4BoxType.DAY)) {
            const textWithMaxLengthOfFour = str.substring(0, 4);
            const value = Number.parseInt(textWithMaxLengthOfFour, 10);
            if (!Number.isNaN(value)) {
                return value;
            }
        }

        return 0;
    }
    /** @inheritDoc */
    public set year(v: number) {
        if (v === 0) {
            this._ilstBox.removeChildByType(Mpeg4BoxType.DAY);
        } else {
            this.setQuickTimeString(Mpeg4BoxType.DAY, v.toString());
        }
    }

    /** @inheritDoc */
    public get track(): number {
        const data = this.getFirstQuickTimeData(Mpeg4BoxType.TRKN, undefined, b => b.length >= 4);
        return data ? data.subarray(2, 2).toUshort() : 0;
    }
    /** @inheritDoc */
    public set track(v: number) { this.setFractionalNumber(Mpeg4BoxType.TRKN, v, this.trackCount); }

    /** @inheritDoc */
    public get trackCount(): number {
        const data = this.getFirstQuickTimeData(Mpeg4BoxType.TRKN, undefined, b => b.length >= 6);
        return data ? data.subarray(4, 2).toUshort() : 0;
    }
    /** @inheritDoc */
    public set trackCount(v: number) { this.setFractionalNumber(Mpeg4BoxType.TRKN, this.track, v); }

    /** @inheritDoc */
    public get disc(): number {
        const data = this.getFirstQuickTimeData(Mpeg4BoxType.DISK, undefined, b => b.length >= 4);
        return data ? data.subarray(2, 2).toUshort() : 0;
    }
    /** @inheritDoc */
    public set disc(v: number) { this.setFractionalNumber(Mpeg4BoxType.DISK, v, this.discCount); }

    /** @inheritDoc */
    public get discCount(): number {
        const data = this.getFirstQuickTimeData(Mpeg4BoxType.DISK, undefined, b => b.length >= 6);
        return data ? data.subarray(4, 2).toUshort() : 0;
    }
    /** @inheritDoc */
    public set discCount(v: number) { this.setFractionalNumber(Mpeg4BoxType.DISK, this.disc, v);}

    /** @inheritDoc */
    public get lyrics(): string { return this.getFirstQuickTimeString(Mpeg4BoxType.LYR); }
    /** @inheritDoc */
    public set lyrics(v: string) { this.setQuickTimeString(Mpeg4BoxType.LYR, v); }

    /** @inheritDoc */
    public get grouping(): string { return this.getFirstQuickTimeString(Mpeg4BoxType.GRP); }
    /** @inheritDoc */
    public set grouping(v: string) { this.setQuickTimeString(Mpeg4BoxType.GRP, v); }

    /** @inheritDoc */
    public get beatsPerMinute(): number {
        const data = this.getFirstQuickTimeData(Mpeg4BoxType.TMPO, AppleDataBoxFlagType.ForTempo);
        return data ? data.toUint() : 0;
    }
    /** @inheritDoc */
    public set beatsPerMinute(v: number) {
        const data = v === 0 ? undefined : [ByteVector.fromUshort(v)];
        this.setQuickTimeData(Mpeg4BoxType.TMPO, data, AppleDataBoxFlagType.ForTempo);
    }

    /** @inheritDoc */
    public get conductor(): string { return this.getFirstQuickTimeString(Mpeg4BoxType.COND); }
    /** @inheritDoc */
    public set conductor(v: string) { this.setQuickTimeString(Mpeg4BoxType.COND, v); }

    /** @inheritDoc */
    public get copyright(): string { return this.getFirstQuickTimeString(Mpeg4BoxType.CPRT); }
    /** @inheritDoc */
    public set copyright(v: string) { this.setQuickTimeString(Mpeg4BoxType.CPRT, v); }

    /** @inheritDoc */
    public get dateTagged(): Date|undefined {
        const text = this.getFirstQuickTimeString(Mpeg4BoxType.DTAG);
        const date = new Date(text);
        return isNaN(date.getTime()) ? undefined : date;
    }
    /** @inheritDoc */
    public set dateTagged(v: Date|undefined) {
        let strValue: string;

        if (v) {
            // @TODO: Remove reference
            strValue = DateFormat(v, "yyyy-mm-dd HH:MM:ss");
            strValue = strValue.replace(" ", "T");
        }

        this.setQuickTimeString(Mpeg4BoxType.DTAG, strValue);
    }

    /** @inheritDoc */
    public get albumArtistsSort(): string[] { return this.getQuickTimeStrings(Mpeg4BoxType.SOAA); }
    /** @inheritDoc */
    public set albumArtistsSort(v: string[]) { this.setQuickTimeStrings(Mpeg4BoxType.SOAA, v); }

    /** @inheritDoc */
    public get performersSort(): string[] { return this.getQuickTimeStrings(Mpeg4BoxType.SOAR); }
    /** @inheritDoc */
    public set performersSort(v: string[]) { this.setQuickTimeStrings(Mpeg4BoxType.SOAR, v); }

    /** @inheritDoc */
    public get composersSort(): string[] { return this.getQuickTimeStrings(Mpeg4BoxType.SOCO); }
    /** @inheritDoc */
    public set composersSort(v: string[]) { this.setQuickTimeStrings(Mpeg4BoxType.SOCO, v); }

    /** @inheritDoc */
    public get albumSort(): string { return this.getFirstQuickTimeString(Mpeg4BoxType.SOAL); }
    /** @inheritDoc */
    public set albumSort(v: string) { this.setQuickTimeString(Mpeg4BoxType.SOAL, v); }

    /** @inheritDoc */
    public get titleSort(): string { return this.getFirstQuickTimeString(Mpeg4BoxType.SONM); }
    /** @inheritDoc */
    public set titleSort(v: string) { this.setQuickTimeString(Mpeg4BoxType.SONM, v); }

    /** @inheritDoc */
    public get musicBrainzArtistId(): string {
        const strings = this.getItunesStrings("com.apple.iTunes", "MusicBrainz Artist Id");
        return strings.length > 0 ? strings.join("/") : undefined;
    }
    /** @inheritDoc */
    public set musicBrainzArtistId(v: string) {
        const artistIds = v.split("/");
        this.setItunesStrings("com.apple.iTunes", "MusicBrainz Artist Id", ...artistIds);
    }

    /** @inheritDoc */
    public get musicBrainzReleaseGroupId(): string {
        return this.getFirstItunesString("com.apple.iTunes", "MusicBrainz Release Group Id");
    }
    /** @inheritDoc */
    public set musicBrainzReleaseGroupId(v: string) {
        this.setItunesStrings("com.apple.iTunes", "MusicBrainz Release Group Id", v);
    }

    /** @inheritDoc */
    public get musicBrainzReleaseId(): string {
        return this.getFirstItunesString("com.apple.iTunes", "MusicBrainz Album Id");
    }
    /** @inheritDoc */
    public set musicBrainzReleaseId(v: string) {
        this.setItunesStrings("com.apple.iTunes", "MusicBrainz Album Id", v);
    }

    /** @inheritDoc */
    public get musicBrainzReleaseArtistId(): string {
        const strings = this.getItunesStrings("com.apple.iTunes", "MusicBrainz Album Artist Id");
        return strings.length > 0 ? strings.join("/") : undefined;
    }
    /** @inheritDoc */
    public set musicBrainzReleaseArtistId(v: string) {
        const releaseArtistIds = v.split("/");
        this.setItunesStrings("com.apple.iTunes", "MusicBrainz Album Artist Id", ...releaseArtistIds);
    }

    /** @inheritDoc */
    public get musicBrainzTrackId(): string {
        return this.getFirstItunesString("com.apple.iTunes", "MusicBrainz Track Id");
    }
    /** @inheritDoc */
    public set musicBrainzTrackId(v: string) {
        this.setItunesStrings("com.apple.iTunes", "MusicBrainz Track Id", v);
    }

    /** @inheritDoc */
    public get musicBrainzDiscId(): string {
        return this.getFirstItunesString("com.apple.iTunes", "MusicBrainz Disc Id");
    }
    /** @inheritDoc */
    public set musicBrainzDiscId(v: string) {
        this.setItunesStrings("com.apple.iTunes", "MusicBrainz Disc Id", v);
    }

    /** @inheritDoc */
    public get musicIpId(): string {
        return this.getFirstItunesString("com.apple.iTunes", "MusicIP PUID");
    }
    /** @inheritDoc */
    public set musicIpId(v: string) {
        this.setItunesStrings("com.apple.iTunes", "MusicIP PUID", v);
    }

    /** @inheritDoc */
    public get amazonId(): string {
        return this.getFirstItunesString("com.apple.iTunes", "ASIN");
    }
    /** @inheritDoc */
    public set amazonId(v: string) {
        this.setItunesStrings("com.apple.iTunes", "ASIN", v);
    }

    /** @inheritDoc */
    public get musicBrainzReleaseStatus(): string {
        return this.getFirstItunesString("com.apple.iTunes", "MusicBrainz Album Status");
    }
    /** @inheritDoc */
    public set musicBrainzReleaseStatus(v: string) {
        this.setItunesStrings("com.apple.iTunes", "MusicBrainz Album Status", v);
    }

    /** @inheritDoc */
    public get musicBrainzReleaseType(): string {
        return this.getFirstItunesString("com.apple.iTunes", "MusicBrainz Album Type");
    }
    /** @inheritDoc */
    public set musicBrainzReleaseType(v: string) {
        this.setItunesStrings("com.apple.iTunes", "MusicBrainz Album Type", v);
    }

    /** @inheritDoc */
    public get musicBrainzReleaseCountry(): string {
        return this.getFirstItunesString("com.apple.iTunes", "MusicBrainz Album Release Country");
    }
    /** @inheritDoc */
    public set musicBrainzReleaseCountry(v: string) {
        this.setItunesStrings("com.apple.iTunes", "MusicBrainz Album Release Country", v);
    }

    /** @inheritDoc */
    public get replayGainTrackGain(): number {
        let text = this.getFirstItunesString("com.apple.iTunes", "REPLAYGAIN_TRACK_GAIN");

        if (!text) {
            return NaN;
        }

        if (text.toLowerCase().endsWith("db")) {
            text = text.substring(0, text.length - 2).trim();
        }

        const value = Number.parseFloat(text);

        if (!Number.isNaN(value)) {
            return value;
        }

        return NaN;
    }
    /** @inheritDoc */
    public set replayGainTrackGain(v: number) {
        const text = `${v.toFixed(2)} dB`;
        this.setItunesStrings("com.apple.iTunes", "REPLAYGAIN_TRACK_GAIN", text);
    }

    /** @inheritDoc */
    public get replayGainTrackPeak(): number {
        const text = this.getFirstItunesString("com.apple.iTunes", "REPLAYGAIN_TRACK_PEAK");
        return text ? Number.parseFloat(text) : NaN;
    }
    /** @inheritDoc */
    public set replayGainTrackPeak(v: number) {
        const text = v.toFixed(6);
        this.setItunesStrings("com.apple.iTunes", "REPLAYGAIN_TRACK_PEAK", text);
    }

    /** @inheritDoc */
    public get replayGainAlbumGain(): number {
        let text = this.getFirstItunesString("com.apple.iTunes", "REPLAYGAIN_ALBUM_GAIN");

        if (!text) {
            return NaN;
        }

        if (text.toLowerCase().endsWith("db")) {
            text = text.substring(0, text.length - 2).trim();
        }

        return Number.parseFloat(text);
    }
    public set replayGainAlbumGain(v: number) {
        const text = `${v.toFixed(2)} dB`;
        this.setItunesStrings("com.apple.iTunes", "REPLAYGAIN_ALBUM_GAIN", text);
    }

    /** @inheritDoc */
    public get replayGainAlbumPeak(): number {
        const text = this.getFirstItunesString("com.apple.iTunes", "REPLAYGAIN_ALBUM_PEAK");
        return text ? Number.parseFloat(text) : NaN;
    }
    /** @inheritDoc */
    public set replayGainAlbumPeak(v: number) {
        const text = Number(v).toFixed(6);
        this.setItunesStrings("com.apple.iTunes", "REPLAYGAIN_ALBUM_PEAK", text);
    }

    /** @inheritDoc */
    public get initialKey(): string { return this.getFirstItunesString("com.apple.iTunes", "initialkey"); }
    /** @inheritDoc */
    public set initialKey(v: string) { this.setItunesStrings("com.apple.iTunes", "initialkey", v); }

    /** @inheritDoc */
    public get isrc(): string { return this.getFirstItunesString("com.apple.iTunes", "ISRC"); }
    /** @inheritDoc */
    public set isrc(v: string) { this.setItunesStrings("com.apple.iTunes", "ISRC", v); }

    /** @inheritDoc */
    public get publisher(): string { return this.getFirstItunesString("com.apple.iTunes", "publisher"); }
    /** @inheritDoc */
    public set publisher(v: string) { this.setItunesStrings("com.apple.iTunes", "publisher", v); }

    /** @inheritDoc */
    public get remixedBy(): string { return this.getFirstItunesString("com.apple.iTunes", "REMIXEDBY"); }
    /** @inheritDoc */
    public set remixedBy(v: string) { this.setItunesStrings("com.apple.iTunes", "REMIXEDBY", v); }

    /** @inheritDoc */
    public get pictures(): IPicture[] {
        return this.getQuickTimeData(Mpeg4BoxType.COVR)
            .map(d => { return Picture.fromData(d); });
    }
    /** @inheritDoc */
    public set pictures(v: IPicture[]) {
        if (!v || v.length === 0) {
            this._ilstBox.removeChildByType(Mpeg4BoxType.COVR);
            return;
        }

        const boxes = v.map(picture => {
            let flags: AppleDataBoxFlagType;
            switch (picture.mimeType) {
                case "image/jpeg":
                    flags = AppleDataBoxFlagType.ContainsJpegData;
                    break;
                case "image/png":
                    flags = AppleDataBoxFlagType.ContainsPngData;
                    break;
                case "image/x-windows-bmp":
                    flags = AppleDataBoxFlagType.ContainsBmpData;
                    break;
                default:
                    flags = AppleDataBoxFlagType.ContainsData;
                    break;
            }

            return AppleDataBox.fromDataAndFlags(picture.data, flags);
        });

        this._ilstBox.setQuickTimeBoxes(Mpeg4BoxType.COVR, boxes);
    }

    /** @inheritDoc */
    public get isCompilation(): boolean { return this.getFirstQuickTimeData(Mpeg4BoxType.CPIL).toUint() !== 0; }
    /** @inheritDoc */
    public set isCompilation(v: boolean) {
        this.setQuickTimeData(Mpeg4BoxType.CPIL, [ByteVector.fromByte(v ? 1 : 0)], AppleDataBoxFlagType.ForTempo);
    }

    /** @inheritDoc */
    public get isEmpty(): boolean { return !this._ilstBox.hasChildren; }

    /** @inheritDoc */
    public clear(): void { this._ilstBox.clearChildren(); }

    // #region Public Methods

    public getItunesStrings(meanString: string, nameString: string): string[] {
        return this._ilstBox.getItunesTagDataBoxes(meanString, nameString)
            .filter(b => NumberUtils.hasFlag(b.flags, AppleDataBoxFlagType.ContainsText, true))
            .map(b => b.text);
    }

    public getFirstItunesString(meanString: string, nameString: string): string {
        return this.getItunesStrings(meanString, nameString)[0];
    }

    public getQuickTimeStrings(boxType: ByteVector): string[] {
        return this._ilstBox.getQuickTimeDataBoxes(boxType)
            .filter(b => NumberUtils.hasFlag(b.flags, AppleDataBoxFlagType.ContainsText, true))
            .reduce((accum, b) => {
                if (b.text) {
                    for (const text of b.text.split(";")) {
                        ArrayUtils.safePush(accum, text.trim());
                    }
                }

                return accum;
            }, []);
    }

    public getQuickTimeData(
        boxType: ByteVector,
        flags: AppleDataBoxFlagType = AppleDataBoxFlagType.ContainsData
    ): ByteVector[] {
        return this._ilstBox.getQuickTimeDataBoxes(boxType)
            .filter(b => NumberUtils.hasFlag(b.flags, flags, true))
            .map(b => b.data);
    }

    public getFirstQuickTimeString(boxType: ByteVector): string {
        return this.getQuickTimeStrings(boxType)[0];
    }

    public getFirstQuickTimeData(
        boxType: ByteVector,
        flags: AppleDataBoxFlagType = AppleDataBoxFlagType.ContainsData,
        predicate?: (d: ByteVector) => boolean
    ): ByteVector {
        const data = this.getQuickTimeData(boxType, flags);
        return predicate
            ? data.find(predicate)
            : data[0];
    }

    public setItunesStrings(meanString: string, nameString: string, ...dataStrings: string[]): void {
        this._ilstBox.setItunesTagBoxes(meanString, nameString, dataStrings);
    }

    public setQuickTimeData(
        boxType: ByteVector,
        data: ByteVector[],
        flags: AppleDataBoxFlagType = AppleDataBoxFlagType.ContainsData
    ): void {
        const dataBoxes = data?.map(bv => AppleDataBox.fromDataAndFlags(bv, flags));
        this._ilstBox.setQuickTimeBoxes(boxType, dataBoxes);
    }

    public setQuickTimeString(boxType: ByteVector, dataString: string): void {
        this.setQuickTimeStrings(boxType, dataString ? [dataString] : undefined);
    }

    public setQuickTimeStrings(boxType: ByteVector, dataStrings: string[]): void {
        let dataBoxes: AppleDataBox[];
        if (!ArrayUtils.isFalsyOrEmpty(dataStrings)) {
            const joinedStrings = dataStrings.join("; ");
            dataBoxes = [AppleDataBox.fromDataAndFlags(
                ByteVector.fromString(joinedStrings, StringType.UTF8),
                AppleDataBoxFlagType.ContainsText
            )];
        }

        this._ilstBox.setQuickTimeBoxes(boxType, dataBoxes);
    }

    // #endregion

    /**
     * Detaches the internal "ilst" box from its parent element.
     */
    public detachIlst(): void {
        this._metaBox.removeChildByBox(this._ilstBox);
    }

    private setFractionalNumber(boxType: ByteVector, numerator: number, denominator: number): void {
        const data = numerator === 0 && denominator === 0
            ? undefined
            : [ByteVector.concatenate(
                0x00, 0x00,
                ByteVector.fromUshort(numerator),
                ByteVector.fromUshort(denominator),
                0x00, 0x00
            )];
        this.setQuickTimeData(boxType, data);
    }
}
