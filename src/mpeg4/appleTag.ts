import * as DateFormat from "dateformat";
import Genres from "../genres";
import Mpeg4BoxType from "./mpeg4BoxType";
import Mpeg4Utils from "./mpeg4Utils";
import {AppleDataBoxFlagType} from "./appleDataBoxFlagType";
import {ByteVector, StringType} from "../byteVector";
import AppleAnnotationBox, {
    AppleAdditionalInfoBox,
    AppleDataBox,
    AppleItemListBox,
    IsoMetaBox,
    IsoUserDataBox,
    Mpeg4Box
} from "./mpeg4Boxes";
import {Mpeg4BoxClassType} from "./mpeg4BoxClassType";
import {IPicture, Picture} from "../picture";
import {Tag, TagTypes} from "../tag";
import {Guards, NumberUtils} from "../utils";

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

        Guards.notNullOrUndefined(box, "box");

        this._metaBox = box.getChild(Mpeg4BoxType.Meta) as IsoMetaBox;

        if (!this._metaBox) {
            this._metaBox = IsoMetaBox.fromHandlerTypeAndHandlerName(
                ByteVector.fromString("mdir", StringType.UTF8),
                undefined
            );
            box.addChild(this._metaBox);
        }

        this._ilstBox = this._metaBox.getChild(Mpeg4BoxType.Ilst) as AppleItemListBox;

        if (!this._ilstBox) {
            this._ilstBox = AppleItemListBox.fromEmpty();
            this._metaBox.addChild(this._ilstBox);
        }
    }

    /** @inheritDoc */
    public get tagTypes(): TagTypes {
        return TagTypes.Apple;
    }

    /** @inheritDoc */
    public get sizeOnDisk(): number { return undefined; }

    /** @inheritDoc */
    public get title(): string { return this.getText(Mpeg4BoxType.Nam)[0]; }
    /** @inheritDoc */
    public set title(v: string) { this.setTextFromTypeAndText(Mpeg4BoxType.Nam, v); }

    /** @inheritDoc */
    public get subtitle(): string { return this.getText(Mpeg4BoxType.Subt)[0]; }
    /** @inheritDoc */
    public set subtitle(v: string) { this.setTextFromTypeAndText(Mpeg4BoxType.Subt, v); }

    /** @inheritDoc */
    public get description(): string { return this.getText(Mpeg4BoxType.Desc)[0]; }
    /** @inheritDoc */
    public set description(v: string) { this.setTextFromTypeAndText(Mpeg4BoxType.Desc, v); }

    /** @inheritDoc */
    public get performers(): string[] { return this.getText(Mpeg4BoxType.Art); }
    /** @inheritDoc */
    public set performers(v: string[]) { this.setTextFromTypeAndTextCollection(Mpeg4BoxType.Art, v); }

    /** @inheritDoc */
    public get performersRole(): string[] {
        const ret: string[] = this.getText(Mpeg4BoxType.Role);
        if (!ret) {
            return ret;
        }

        // Reformat '/' to ';'
        for (let i = 0; i < ret.length; i++) {
            ret[i] = ret[i].replace("/", ";").trim();
        }

        return ret;
    }
    /** @inheritDoc */
    public set performersRole(v: string[]) {
        const ret: string[] = v;

        if (ret) {
            // Reformat ';' to '/'
            for (let i = 0; i < ret.length; i++) {
                ret[i] = ret[i].replace(";", "/");
            }
        }

        this.setTextFromTypeAndTextCollection(Mpeg4BoxType.Role, v);
    }

    /** @inheritDoc */
    public get albumArtists(): string[] { return this.getText(Mpeg4BoxType.Aart); }
    /** @inheritDoc */
    public set albumArtists(v: string[]) { this.setTextFromTypeAndTextCollection(Mpeg4BoxType.Aart, v); }

    /** @inheritDoc */
    public get composers(): string[] { return this.getText(Mpeg4BoxType.Wrt); }
    /** @inheritDoc */
    public set composers(v: string[]) { this.setTextFromTypeAndTextCollection(Mpeg4BoxType.Wrt, v); }

    /** @inheritDoc */
    public get album(): string { return this.getText(Mpeg4BoxType.Alb)[0]; }
    /** @inheritDoc */
    public set album(v: string) { this.setTextFromTypeAndText(Mpeg4BoxType.Alb, v); }

    /** @inheritDoc */
    public get comment(): string { return this.getText(Mpeg4BoxType.Cmt)[0]; }
    /** @inheritDoc */
    public set comment(v: string) { this.setTextFromTypeAndText(Mpeg4BoxType.Cmt, v); }

    /** @inheritDoc */
    public get genres(): string[] {
        let text: string[] = this.getText(Mpeg4BoxType.Gen);
        if (text.length > 0) {
            return text;
        }

        for (const box of this.getDataBoxesFromType(Mpeg4BoxType.Gnre)) {
            if (box.flags !== <number>AppleDataBoxFlagType.ContainsData) {
                continue;
            }

            // iTunes stores genre's in the GNRE box as (ID3# + 1).
            const index: number = box.data.toUshort(true);
            if (index === 0) {
                continue;
            }

            const str: string = Genres.indexToAudio(index - 1, false);

            if (!str) {
                continue;
            }

            text = [str];
            break;
        }

        return text;
    }
    /** @inheritDoc */
    public set genres(v: string[]) {
        this.clearData(Mpeg4BoxType.Gnre);
        this.setTextFromTypeAndTextCollection(Mpeg4BoxType.Gen, v);
    }

    /** @inheritDoc */
    public get year(): number {
        for (const box of this.getDataBoxesFromType(Mpeg4BoxType.Day)) {
            if (box.text) {
                const textWithMaxLengthOfFour: string = box.text.length > 4 ? box.text.substring(0, 4) : box.text;
                const value: number = Number.parseInt(textWithMaxLengthOfFour, 10);

                if (!Number.isNaN(value)) {
                    return value;
                }
            }
        }

        return 0;
    }
    /** @inheritDoc */
    public set year(v: number) {
        if (v === 0) {
            this.clearData(Mpeg4BoxType.Day);
        } else {
            this.setTextFromTypeAndText(Mpeg4BoxType.Day, v.toString());
        }
    }

    /** @inheritDoc */
    public get track(): number {
        for (const box of this.getDataBoxesFromType(Mpeg4BoxType.Trkn)) {
            if (box.flags === <number>AppleDataBoxFlagType.ContainsData && box.data.length >= 4) {
                return box.data.subarray(2, 2).toUshort();
            }
        }

        return 0;
    }
    /** @inheritDoc */
    public set track(v: number) {
        const count: number = this.trackCount;
        if (v === 0 && count === 0) {
            this.clearData(Mpeg4BoxType.Trkn);
            return;
        }

        const data = ByteVector.concatenate(
            ByteVector.fromUshort(0),
            ByteVector.fromUshort(v),
            ByteVector.fromUshort(count),
            ByteVector.fromUshort(0)
        );
        this.setDataFromTypeDataAndFlags(Mpeg4BoxType.Trkn, data, AppleDataBoxFlagType.ContainsData);
    }

    /** @inheritDoc */
    public get trackCount(): number {
        for (const box of this.getDataBoxesFromType(Mpeg4BoxType.Trkn)) {
            if (box.flags === <number>AppleDataBoxFlagType.ContainsData && box.data.length >= 6) {
                return box.data.subarray(4, 2).toUshort();
            }
        }

        return 0;
    }
    /** @inheritDoc */
    public set trackCount(v: number) {
        const localTrack = this.track;

        if (v === 0 && localTrack === 0) {
            this.clearData(Mpeg4BoxType.Trkn);

            return;
        }

        const data = ByteVector.concatenate(
            ByteVector.fromUshort(0),
            ByteVector.fromUshort(localTrack),
            ByteVector.fromUshort(v),
            ByteVector.fromUshort(0)
        );

        this.setDataFromTypeDataAndFlags(Mpeg4BoxType.Trkn, data, AppleDataBoxFlagType.ContainsData);
    }

    /** @inheritDoc */
    public get disc(): number {
        for (const box of this.getDataBoxesFromType(Mpeg4BoxType.Disk)) {
            if (NumberUtils.hasFlag(box.flags, AppleDataBoxFlagType.ContainsData, true) && box.data.length >= 4) {
                return box.data.subarray(2, 2).toUshort();
            }
        }

        return 0;
    }
    /** @inheritDoc */
    public set disc(v: number) {
        const localCount = this.discCount;
        if (v === 0 && localCount === 0) {
            this.clearData(Mpeg4BoxType.Disk);
            return;
        }

        const data = ByteVector.concatenate(
            ByteVector.fromUshort(0),
            ByteVector.fromUshort(v),
            ByteVector.fromUshort(localCount),
            ByteVector.fromUshort(0)
        );
        this.setDataFromTypeDataAndFlags(Mpeg4BoxType.Disk, data, AppleDataBoxFlagType.ContainsData);
    }

    /** @inheritDoc */
    public get discCount(): number {
        for (const box of this.getDataBoxesFromType(Mpeg4BoxType.Disk)) {
            if (box.flags === <number>AppleDataBoxFlagType.ContainsData && box.data.length >= 6) {
                return box.data.subarray(4, 2).toUshort();
            }
        }

        return 0;
    }
    /** @inheritDoc */
    public set discCount(v: number) {
        const localDisc = this.disc;
        if (v === 0 && localDisc === 0) {
            this.clearData(Mpeg4BoxType.Disk);
            return;
        }

        const data = ByteVector.concatenate(
            ByteVector.fromUshort(0),
            ByteVector.fromUshort(localDisc),
            ByteVector.fromUshort(v),
            ByteVector.fromUshort(0)
        );
        this.setDataFromTypeDataAndFlags(Mpeg4BoxType.Disk, data, AppleDataBoxFlagType.ContainsData);
    }

    /** @inheritDoc */
    public get lyrics(): string { return this.getDataBoxesFromType(Mpeg4BoxType.Lyr)[0]?.text; }
    /** @inheritDoc */
    public set lyrics(v: string) { this.setTextFromTypeAndText(Mpeg4BoxType.Lyr, v); }

    /** @inheritDoc */
    public get grouping(): string { return this.getDataBoxesFromType(Mpeg4BoxType.Grp)[0]?.text; }
    /** @inheritDoc */
    public set grouping(v: string) { this.setTextFromTypeAndText(Mpeg4BoxType.Grp, v); }

    /** @inheritDoc */
    public get beatsPerMinute(): number {
        for (const box of this.getDataBoxesFromType(Mpeg4BoxType.Tmpo)) {
            if (box.flags === <number>AppleDataBoxFlagType.ForTempo) {
                return box.data.toUint();
            }
        }

        return 0;
    }
    /** @inheritDoc */
    public set beatsPerMinute(v: number) {
        if (v === 0) {
            this.clearData(Mpeg4BoxType.Tmpo);
            return;
        }

        this.setDataFromTypeDataAndFlags(Mpeg4BoxType.Tmpo, ByteVector.fromUshort(v), AppleDataBoxFlagType.ForTempo);
    }

    /** @inheritDoc */
    public get conductor(): string { return this.getDataBoxesFromType(Mpeg4BoxType.Cond)[0]?.text; }
    /** @inheritDoc */
    public set conductor(v: string) { this.setTextFromTypeAndText(Mpeg4BoxType.Cond, v); }

    /** @inheritDoc */
    public get copyright(): string { return this.getDataBoxesFromType(Mpeg4BoxType.Cprt)[0]?.text; }
    /** @inheritDoc */
    public set copyright(v: string) { this.setTextFromTypeAndText(Mpeg4BoxType.Cprt, v); }

    /** @inheritDoc */
    public get dateTagged(): Date|undefined {
        const text = this.getText(Mpeg4BoxType.Dtag)[0];
        if (text) {
            const dateValue = new Date(text);
            return isNaN(dateValue.getTime()) ? undefined : dateValue;
        }

        return undefined;
    }
    /** @inheritDoc */
    public set dateTagged(v: Date|undefined) {
        let strValue: string;

        if (v) {
            strValue = DateFormat(v, "yyyy-mm-dd HH:MM:ss");
            strValue = strValue.replace(" ", "T");
        }

        this.setTextFromTypeAndText(Mpeg4BoxType.Dtag, strValue);
    }

    /** @inheritDoc */
    public get albumArtistsSort(): string[] { return this.getText(Mpeg4BoxType.Soaa); }
    /** @inheritDoc */
    public set albumArtistsSort(v: string[]) { this.setTextFromTypeAndTextCollection(Mpeg4BoxType.Soaa, v); }

    /** @inheritDoc */
    public get performersSort(): string[] { return this.getText(Mpeg4BoxType.Soar); }
    /** @inheritDoc */
    public set performersSort(v: string[]) { this.setTextFromTypeAndTextCollection(Mpeg4BoxType.Soar, v); }

    /** @inheritDoc */
    public get composersSort(): string[] { return this.getText(Mpeg4BoxType.Soco); }
    /** @inheritDoc */
    public set composersSort(v: string[]) { this.setTextFromTypeAndTextCollection(Mpeg4BoxType.Soco, v); }

    /** @inheritDoc */
    public get albumSort(): string { return this.getText(Mpeg4BoxType.Soal)[0]; }
    /** @inheritDoc */
    public set albumSort(v: string) { this.setTextFromTypeAndText(Mpeg4BoxType.Soal, v); }

    /** @inheritDoc */
    public get titleSort(): string { return this.getText(Mpeg4BoxType.Sonm)[0]; }
    /** @inheritDoc */
    public set titleSort(v: string) { this.setTextFromTypeAndText(Mpeg4BoxType.Sonm, v); }

    /** @inheritDoc */
    public get musicBrainzArtistId(): string {
        const artistIds = this.getDashBoxes("com.apple.iTunes", "MusicBrainz Artist Id");
        return artistIds?.join("/");
    }
    /** @inheritDoc */
    public set musicBrainzArtistId(v: string) {
        const artistIds = v.split("/");
        this.setDashBoxes("com.apple.iTunes", "MusicBrainz Artist Id", artistIds);
    }

    /** @inheritDoc */
    public get musicBrainzReleaseGroupId(): string {
        return this.getDashBox("com.apple.iTunes", "MusicBrainz Release Group Id");
    }
    /** @inheritDoc */
    public set musicBrainzReleaseGroupId(v: string) {
        this.setDashBox("com.apple.iTunes", "MusicBrainz Release Group Id", v);
    }

    /** @inheritDoc */
    public get musicBrainzReleaseId(): string {
        return this.getDashBox("com.apple.iTunes", "MusicBrainz Album Id");
    }
    /** @inheritDoc */
    public set musicBrainzReleaseId(v: string) {
        this.setDashBox("com.apple.iTunes", "MusicBrainz Album Id", v);
    }

    /** @inheritDoc */
    public get musicBrainzReleaseArtistId(): string {
        const releaseArtistIds: string[] = this.getDashBoxes("com.apple.iTunes", "MusicBrainz Album Artist Id");
        return releaseArtistIds?.join("/");
    }
    /** @inheritDoc */
    public set musicBrainzReleaseArtistId(v: string) {
        const releaseArtistIds: string[] = v.split("/");
        this.setDashBoxes("com.apple.iTunes", "MusicBrainz Album Artist Id", releaseArtistIds);
    }

    /** @inheritDoc */
    public get musicBrainzTrackId(): string {
        return this.getDashBox("com.apple.iTunes", "MusicBrainz Track Id");
    }
    /** @inheritDoc */
    public set musicBrainzTrackId(v: string) {
        this.setDashBox("com.apple.iTunes", "MusicBrainz Track Id", v);
    }

    /** @inheritDoc */
    public get musicBrainzDiscId(): string {
        return this.getDashBox("com.apple.iTunes", "MusicBrainz Disc Id");
    }
    /** @inheritDoc */
    public set musicBrainzDiscId(v: string) {
        this.setDashBox("com.apple.iTunes", "MusicBrainz Disc Id", v);
    }

    /** @inheritDoc */
    public get musicIpId(): string {
        return this.getDashBox("com.apple.iTunes", "MusicIP PUID");
    }
    /** @inheritDoc */
    public set musicIpId(v: string) {
        this.setDashBox("com.apple.iTunes", "MusicIP PUID", v);
    }

    /** @inheritDoc */
    public get amazonId(): string {
        return this.getDashBox("com.apple.iTunes", "ASIN");
    }
    /** @inheritDoc */
    public set amazonId(v: string) {
        this.setDashBox("com.apple.iTunes", "ASIN", v);
    }

    /** @inheritDoc */
    public get musicBrainzReleaseStatus(): string {
        return this.getDashBox("com.apple.iTunes", "MusicBrainz Album Status");
    }
    /** @inheritDoc */
    public set musicBrainzReleaseStatus(v: string) {
        this.setDashBox("com.apple.iTunes", "MusicBrainz Album Status", v);
    }

    /** @inheritDoc */
    public get musicBrainzReleaseType(): string {
        return this.getDashBox("com.apple.iTunes", "MusicBrainz Album Type");
    }
    /** @inheritDoc */
    public set musicBrainzReleaseType(v: string) {
        this.setDashBox("com.apple.iTunes", "MusicBrainz Album Type", v);
    }

    /** @inheritDoc */
    public get musicBrainzReleaseCountry(): string {
        return this.getDashBox("com.apple.iTunes", "MusicBrainz Album Release Country");
    }
    /** @inheritDoc */
    public set musicBrainzReleaseCountry(v: string) {
        this.setDashBox("com.apple.iTunes", "MusicBrainz Album Release Country", v);
    }

    /** @inheritDoc */
    public get replayGainTrackGain(): number {
        let text = this.getDashBox("com.apple.iTunes", "REPLAYGAIN_TRACK_GAIN");

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
        this.setDashBox("com.apple.iTunes", "REPLAYGAIN_TRACK_GAIN", text);
    }

    /** @inheritDoc */
    public get replayGainTrackPeak(): number {
        const text = this.getDashBox("com.apple.iTunes", "REPLAYGAIN_TRACK_PEAK");

        if (!text) {
            return NaN;
        }

        const value: number = Number.parseFloat(text);

        if (!Number.isNaN(value)) {
            return value;
        }

        return NaN;
    }
    /** @inheritDoc */
    public set replayGainTrackPeak(v: number) {
        const text = v.toFixed(6);
        this.setDashBox("com.apple.iTunes", "REPLAYGAIN_TRACK_PEAK", text);
    }

    /** @inheritDoc */
    public get replayGainAlbumGain(): number {
        let text = this.getDashBox("com.apple.iTunes", "REPLAYGAIN_ALBUM_GAIN");

        if (!text) {
            return NaN;
        }

        if (text.toLowerCase().endsWith("db")) {
            text = text.substring(0, text.length - 2).trim();
        }

        const value: number = Number.parseFloat(text);

        if (!Number.isNaN(value)) {
            return value;
        }

        return NaN;
    }
    public set replayGainAlbumGain(v: number) {
        const text = `${v.toFixed(2)} dB`;
        this.setDashBox("com.apple.iTunes", "REPLAYGAIN_ALBUM_GAIN", text);
    }

    /** @inheritDoc */
    public get replayGainAlbumPeak(): number {
        const text = this.getDashBox("com.apple.iTunes", "REPLAYGAIN_ALBUM_PEAK");

        if (!text) {
            return NaN;
        }

        const value = Number.parseFloat(text);

        if (!Number.isNaN(value)) {
            return value;
        }

        return NaN;
    }
    /** @inheritDoc */
    public set replayGainAlbumPeak(v: number) {
        const text = Number(v).toFixed(6);
        this.setDashBox("com.apple.iTunes", "REPLAYGAIN_ALBUM_PEAK", text);
    }

    /** @inheritDoc */
    public get initialKey(): string { return this.getDashBox("com.apple.iTunes", "initialkey"); }
    /** @inheritDoc */
    public set initialKey(v: string) { this.setDashBox("com.apple.iTunes", "initialkey", v); }

    /** @inheritDoc */
    public get isrc(): string { return this.getDashBox("com.apple.iTunes", "ISRC"); }
    /** @inheritDoc */
    public set isrc(v: string) { this.setDashBox("com.apple.iTunes", "ISRC", v); }

    /** @inheritDoc */
    public get publisher(): string { return this.getDashBox("com.apple.iTunes", "publisher"); }
    /** @inheritDoc */
    public set publisher(v: string) { this.setDashBox("com.apple.iTunes", "publisher", v); }

    /** @inheritDoc */
    public get remixedBy(): string { return this.getDashBox("com.apple.iTunes", "REMIXEDBY"); }
    /** @inheritDoc */
    public set remixedBy(v: string) { this.setDashBox("com.apple.iTunes", "REMIXEDBY", v); }

    /** @inheritDoc */
    public get pictures(): IPicture[] {
        return this.getDataBoxesFromType(Mpeg4BoxType.Covr)
            .map(b => { return Picture.fromData(b.data); });
    }
    /** @inheritDoc */
    public set pictures(v: IPicture[]) {
        if (!v || v.length === 0) {
            this.clearData(Mpeg4BoxType.Covr);
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

        this.setDataFromTypeAndBoxes(Mpeg4BoxType.Covr, boxes);
    }

    /** @inheritDoc */
    public get isCompilation(): boolean {
        const cpilBoxes = this.getDataBoxesFromType(Mpeg4BoxType.Cpil);
        const firstBox = cpilBoxes[0];
        return firstBox
            ? firstBox.data.toUint() !== 0
            : false;

    }
    /** @inheritDoc */
    public set isCompilation(v: boolean) {
        this.setDataFromTypeDataAndFlags(
            Mpeg4BoxType.Cpil,
            ByteVector.fromByte(v ? 1 : 0),
            AppleDataBoxFlagType.ForTempo
        );
    }

    /** @inheritDoc */
    public get isEmpty(): boolean { return !this._ilstBox.hasChildren; }

    /** @inheritDoc */
    public clear(): void { this._ilstBox.clearChildren(); }

    /**
     * Gets all data boxes that match the provided type.
     * @param type Type of box to match
     * @returns Collection of boxes with the provided type
     */
    public getDataBoxesFromType(type: ByteVector): AppleDataBox[] {
        /**
         * Check each box to see if the match any of the provided types.
         * If a match is found, loop through the children and add any data box.
         */
        const fixedType = Mpeg4Utils.fixId(type);
        return this._ilstBox.children.filter(box => { return ByteVector.equals(fixedType, box.boxType); })
            .reduce((accum: AppleDataBox[], box: Mpeg4Box) => {
                accum.push(... box.getChildrenByBoxClassType<AppleDataBox>(Mpeg4BoxClassType.AppleDataBox));
                return accum;
            }, []);
    }

    /**
     * Gets all text values contained in a specified box type.
     * @param type A @see ByteVector object containing the box type to match.
     * @returns A @see string[] containing text from all matching boxes.
     */
    public getText(type: ByteVector): string[] {
        const result: string[] = [];
        for (const box of this.getDataBoxesFromType(type)) {
            if (!box.text) {
                continue;
            }

            for (const text of box.text.split(";")) {
                result.push(text.trim());
            }
        }

        return result;
    }

    /**
     * Sets the data for a specified box type to a collection of boxes.
     * @param type A {@see ByteVector} object containing the type to add to the new instance.
     * @param boxes A {@see AppleDataBox[]} containing boxes to add for the specified type.
     */
    public setDataFromTypeAndBoxes(type: ByteVector, boxes: AppleDataBox[]): void {
        // Fix the type.
        type = Mpeg4Utils.fixId(type);

        let added: boolean = false;

        for (const box of this._ilstBox.children) {
            if (ByteVector.equals(type, box.boxType)) {
                // Clear the box's children.
                box.clearChildren();

                // If we've already added new children, continue.
                if (added) {
                    continue;
                }

                added = true;

                // Add the children.
                for (const appleDataBox of boxes) {
                    box.addChild(appleDataBox);
                }
            }
        }

        if (added) {
            return;
        }

        const box2: Mpeg4Box = AppleAnnotationBox.fromType(type);
        this._ilstBox.addChild(box2);

        for (const appleDataBox of boxes) {
            box2.addChild(appleDataBox);
        }
    }

    /**
     * Sets the data for a specified box type using values from @see ByteVectorCollection object.
     * @param type A @see ByteVector object containing the type to add to the new instance.
     * @param data A @see ByteVector[] object containing data to add for the specified type.
     * @param flags A value containing flags to use for the added boxes.
     */
    public setDataFromTypeDataCollectionAndFlags(
        type: ByteVector,
        data: ByteVector[],
        flags: AppleDataBoxFlagType
    ): void {
        if (!data || data.length === 0) {
            this.clearData(type);
            return;
        }

        const boxes = data.map(d => AppleDataBox.fromDataAndFlags(d, flags));
        this.setDataFromTypeAndBoxes(type, boxes);
    }

    /**
     * Sets the data for a specified box type using a single @see ByteVector object.
     * @param type A @see ByteVector object containing the type to add to the new instance.
     * @param data A @see ByteVector object containing data to add for the specified type.
     * @param flags A value containing flags to use for the added box.
     */
    public setDataFromTypeDataAndFlags(type: ByteVector, data: ByteVector, flags: AppleDataBoxFlagType): void {
        if (!data || data.length === 0) {
            this.clearData(type);
        } else {
            this.setDataFromTypeDataCollectionAndFlags(type, [data], flags);
        }
    }

    /**
     * Sets the text for a specified box type.
     * @param type A @see ByteVector object containing the type to add to the new instance.
     * @param textCollection A @see string[] containing text to store.
     */
    public setTextFromTypeAndTextCollection(type: ByteVector, textCollection: string[]): void {
        // Remove empty data and return.
        if (!textCollection) {
            this._ilstBox.removeChildByType(Mpeg4Utils.fixId(type));
            return;
        }

        this.setTextFromTypeAndText(type, textCollection.join("; "));
    }

    /**
     * Sets the text for a specified box type.
     * @param type A @see ByteVector object containing the type to add to the new instance.
     * @param text A @see string object containing text to store.
     */
    public setTextFromTypeAndText(type: ByteVector, text: string): void {
        // Remove empty data and return.
        if (!text) {
            this._ilstBox.removeChildByType(Mpeg4Utils.fixId(type));
            return;
        }

        const l = [ByteVector.fromString(text, StringType.UTF8)];
        this.setDataFromTypeDataCollectionAndFlags(type, l, AppleDataBoxFlagType.ContainsText);
    }

    /**
     * Clears all data for a specified box type.
     * @param type A @see ByteVector object containing the type of box to remove from the current instance.
     */
    public clearData(type: ByteVector): void {
        this._ilstBox.removeChildByType(Mpeg4Utils.fixId(type));
    }

    /**
     * Detaches the internal "ilst" box from its parent element.
     */
    public detachIlst(): void {
        this._metaBox.removeChildByBox(this._ilstBox);
    }

    /**
     * Gets the text string from a specific data box in a Dash (----) atom
     * @param meanString String specifying text from mean box
     * @param nameString String specifying text from name box
     * @returns Text string from data box
     */
    public getDashBox(meanString: string, nameString: string): string {
        const dataBoxes: AppleDataBox[] = this.getDashAtoms(meanString, nameString);

        if (dataBoxes) {
            return dataBoxes[0].text;
        } else {
            return undefined;
        }
    }

    /**
     * Gets the text strings from a specific data boxes in Dash (----) atoms
     * @param meanstring String specifying text from mean box
     * @param namestring String specifying text from name box
     * @returns Text string from data box
     */
    public getDashBoxes(meanstring: string, namestring: string): string[] {
        const dataBoxes: AppleDataBox[] = this.getDashAtoms(meanstring, namestring);

        if (dataBoxes) {
            const boxText: string[] = [];

            for (const dataBox of dataBoxes) {
                boxText.push(dataBox.text);
            }

            return boxText;
        } else {
            return undefined;
        }
    }

    /**
     * Sets a specific strings in Dash (----) atom.  This method updates
     * and existing atom, or creates a new one.  If an empty datastring is
     * specified, the Dash box and its children are removed.
     * @param meanstring String specifying text for mean box
     * @param namestring String specifying text for name box
     * @param datastring String specifying text for data box
     */
    public setDashBox(meanstring: string, namestring: string, datastring: string): void {
        const dataBox: AppleDataBox = this.getDashAtom(meanstring, namestring);

        // If we did find a data_box and we have an empty datastring we should remove the entire dash box.
        if (dataBox && !datastring) {
            const dashBox: AppleAnnotationBox = this.getParentDashBox(meanstring, namestring);
            dashBox.clearChildren();
            this._ilstBox.removeChildByBox(dashBox);

            return;
        }

        if (dataBox) {
            dataBox.text = datastring;
        } else {
            // Create the new boxes, should use 1 for text as a flag
            const ameanBox = AppleAdditionalInfoBox.fromTypeVersionAndFlags(Mpeg4BoxType.Mean, 0, 1);
            ameanBox.text = meanstring;

            const anameBox = AppleAdditionalInfoBox.fromTypeVersionAndFlags(Mpeg4BoxType.Name, 0, 1);
            anameBox.text = namestring;

            const adataBox = AppleDataBox.fromDataAndFlags(Mpeg4BoxType.Data, 1);
            adataBox.text = datastring;

            const wholeBox = AppleAnnotationBox.fromType(Mpeg4BoxType.DASH);
            wholeBox.addChild(ameanBox);
            wholeBox.addChild(anameBox);
            wholeBox.addChild(adataBox);
            this._ilstBox.addChild(wholeBox);
        }
    }

    /**
     * Sets specific strings in Dash (----) atom.  This method updates
     * existing atoms, or creates new one.  If an empty datastring is
     * specified, the Dash boxes and its children are removed.
     * @param meanString String specifying text for mean box
     * @param nameString String specifying text for name box
     * @param datastring String values specifying text for data boxes
     */
    public setDashBoxes(meanString: string, nameString: string, datastring: string[]): void {
        const dataBoxes: AppleDataBox[] = this.getDashAtoms(meanString, nameString);

        // If we did find a data_box and we have an empty datastring we should remove the entire dash box.
        if (dataBoxes && !datastring[0]) {
            const dashBox: AppleAnnotationBox = this.getParentDashBox(meanString, nameString);
            dashBox.clearChildren();
            this._ilstBox.removeChildByBox(dashBox);

            return;
        }

        if (dataBoxes && dataBoxes.length === datastring.length) {
            for (let i = 0; i < dataBoxes.length; i++) {
                dataBoxes[i].text = datastring[i];
            }
        } else {
            // Remove all Boxes
            const dashBox: AppleAnnotationBox = this.getParentDashBox(meanString, nameString);

            if (dashBox) {
                dashBox.clearChildren();
                this._ilstBox.removeChildByBox(dashBox);
            }

            const wholeBox: AppleAnnotationBox = AppleAnnotationBox.fromType(Mpeg4BoxType.DASH);

            for (const text of datastring) {
                // Create the new boxes, should use 1 for text as a flag.
                const ameanBox = AppleAdditionalInfoBox.fromTypeVersionAndFlags(Mpeg4BoxType.Mean, 0, 1);
                ameanBox.text = meanString;

                const anameBox = AppleAdditionalInfoBox.fromTypeVersionAndFlags(Mpeg4BoxType.Name, 0, 1);
                anameBox.text = nameString;

                const adataBox = AppleDataBox.fromDataAndFlags(Mpeg4BoxType.Data, 1);
                adataBox.text = text;

                wholeBox.addChild(ameanBox);
                wholeBox.addChild(anameBox);
                wholeBox.addChild(adataBox);
                this._ilstBox.addChild(wholeBox);
            }
        }
    }

    /**
     * Gets the AppleDataBox that corresponds to the specified mean and name values.
     * @param meanString String specifying text for mean box
     * @param nameString String specifying text for name box
     * @returns Existing AppleDataBox or undefined if one does not exist
     */
    private getDashAtom(meanString: string, nameString: string): AppleDataBox {
        for (const box of this._ilstBox.children) {
            if (!ByteVector.equals(box.boxType, Mpeg4BoxType.DASH)) {
                continue;
            }

            // Get the mean and name boxes, make sure they're legit, check the Text fields for a match.
            // If we have a match return the AppleDataBox containing the data.
            const meanBox = <AppleAdditionalInfoBox>box.getChild(Mpeg4BoxType.Mean);
            const nameBox = <AppleAdditionalInfoBox>box.getChild(Mpeg4BoxType.Name);

            if (meanBox && nameBox &&
                meanBox.text === meanString &&
                nameBox.text.toLowerCase() === nameString.toLowerCase()
            ) {
                return <AppleDataBox>box.getChild(Mpeg4BoxType.Data);
            }
        }

        // If we haven't returned the found box yet, there isn't one, return null
        return undefined;
    }

    /**
     * Gets the AppleDataBox that corresponds to the specified mean and name values.
     * @param meanString String specifying text for mean box
     * @param nameString String specifying text for name box
     * @returns Existing AppleDataBox or null if one does not exist
     */
    private getDashAtoms(meanString: string, nameString: string): AppleDataBox[] {
        for (const box of this._ilstBox.children) {
            if (!ByteVector.equals(box.boxType, Mpeg4BoxType.DASH)) {
                continue;
            }

            // Get the mean and name boxes, make sure they're legit, check the Text fields for a match.
            // If we have a match return the AppleDataBox containing the data.
            const meanBox = <AppleAdditionalInfoBox>box.getChild(Mpeg4BoxType.Mean);
            const nameBox = <AppleAdditionalInfoBox>box.getChild(Mpeg4BoxType.Name);

            if (meanBox && nameBox &&
                meanBox.text === meanString &&
                nameBox.text.toLowerCase() === nameString.toLowerCase()
            ) {
                return <AppleDataBox[]>box.getChildren(Mpeg4BoxType.Data)
            }
        }

        // If we haven't returned the found box yet, there isn't one, return undefined.
        return undefined;
    }

    /**
     * Returns the Parent Dash box object for a given mean/name combination
     * @param meanString String specifying text for mean box
     * @param nameString String specifying text for name box
     * @returns AppleAnnotationBox object that is the parent for the mean/name combination
     */
    private getParentDashBox(meanString: string, nameString: string): AppleAnnotationBox {
        for (const box of this._ilstBox.children) {
            if (!ByteVector.equals(box.boxType, Mpeg4BoxType.DASH)) {
                continue;
            }

            // Get the mean and name boxes, make sure they're legit, check the Text fields for a match.
            // If we have a match return the AppleAnnotationBox that is the Parent.
            const meanBox = <AppleAdditionalInfoBox>box.getChild(Mpeg4BoxType.Mean);
            const nameBox = <AppleAdditionalInfoBox>box.getChild(Mpeg4BoxType.Name);

            if (meanBox && nameBox &&
                meanBox.text === meanString &&
                nameBox.text.toLowerCase() === nameString.toLowerCase()
            ) {
                return <AppleAnnotationBox>box;
            }
        }

        // If we haven't returned the found box yet, there isn't one, return undefined.
        return undefined;
    }
}
