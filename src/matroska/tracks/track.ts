import EbmlElement from "../../ebml/ebmlElement";
import {ByteVector} from "../../byteVector";
import {CorruptFileError} from "../../errors";
import {MatroskaIds} from "../matroskaIds";
import {ICodec, MediaTypes} from "../../properties";
import {Guards} from "../../utils";

/**
 * Types of Matroska tracks.
 */
export enum MatroskaTrackType {
    Video = 1,
    Audio = 2,
    Complex = 3,
    Logo = 16,
    Subtitle = 17,
    Buttons = 18,
    Control = 32,
    Metadata = 33
}

export class Track implements ICodec {
    private readonly _codecPrivateData: ByteVector|undefined;
    private readonly _codecId: string;
    private readonly _codecName: string|undefined;
    private readonly _isCommentary: boolean|undefined;
    private readonly _isDefault: boolean;
    private readonly _isEnabled: boolean;
    private readonly _isForced: boolean;
    private readonly _isHearingImpaired: boolean|undefined;
    private readonly _isTranslation: boolean|undefined;
    private readonly _isVisualImpaired: boolean|undefined;
    private readonly _language: string;
    private readonly _languageIetf: string|undefined;
    private readonly _trackName: string|undefined;
    private readonly _trackNumber: number;
    private readonly _trackUid: bigint;
    private readonly _type: number;

    //#region Constructors

    /**
     * Constructor for a generic {@link Track} object. Not intended to be called from outside the
     * {@link TrackFactory} class.
     * @param elements
     * @internal
     */
    public constructor(elements: Map<number, EbmlElement>) {
        Guards.truthy(elements, "elements");

        // Required elements without defaults
        const codecIdElement = elements.get(MatroskaIds.CODEC_ID);
        if (!codecIdElement) {
            throw new CorruptFileError("Matroska track element is missing codec ID element.");
        }
        this._codecId = codecIdElement.getString();

        const trackNumberElement = elements.get(MatroskaIds.TRACK_NUMBER);
        if (!trackNumberElement) {
            throw new CorruptFileError("Matroska track element is missing track number element.");
        }
        this._trackNumber = trackNumberElement.getSafeUint();

        const trackUidElement = elements.get(MatroskaIds.TRACK_UID);
        if (!trackUidElement) {
            throw new CorruptFileError("Matroska track element is missing track UID element.");
        }
        this._trackUid = trackUidElement?.getUlong();

        const typeElement = elements.get(MatroskaIds.TRACK_TYPE);
        if (!typeElement) {
            throw new CorruptFileError("Matroska track element is missing track type element.");
        }
        this._type = typeElement.getSafeUint();

        // Required elements with defaults
        this._isDefault = elements.get(MatroskaIds.FLAG_DEFAULT)?.getBool() ?? true;
        this._isEnabled = elements.get(MatroskaIds.FLAG_ENABLED)?.getBool() ?? true;
        this._isForced = elements.get(MatroskaIds.FLAG_FORCED)?.getBool() ?? false;
        this._language = elements.get(MatroskaIds.LANGUAGE)?.getString() ?? "eng";

        // Completely optional elements
        this._codecName = elements.get(MatroskaIds.CODEC_NAME)?.getString();
        this._codecPrivateData = elements.get(MatroskaIds.CODEC_PRIVATE)?.getBytes();
        this._isCommentary = elements.get(MatroskaIds.FLAG_COMMENTARY)?.getBool();
        this._isHearingImpaired = elements.get(MatroskaIds.FLAG_HEARING_IMPAIRED)?.getBool();
        this._isVisualImpaired = elements.get(MatroskaIds.FLAG_VISUAL_IMPAIRED)?.getBool();
        this._languageIetf = elements.get(MatroskaIds.LANGUAGE_BCP47)?.getString();
        this._trackName = elements.get(MatroskaIds.NAME)?.getString();

        const originalElement = elements.get(MatroskaIds.FLAG_ORIGINAL);
        this._isTranslation = originalElement
            ? !(originalElement.getBool())
            : undefined;
    }

    //#endregion

    //#region Properties

    /**
     * An ID corresponding to the codec see
     * (Matroska codec RFC)[https://www.matroska.org/technical/codec_specs.html] for more info.
     */
    public get codecId(): string { return this._codecId; }

    /**
     * Human-readable string specifying the codec. This field is optional.
     */
    public get codecName(): string|undefined { return this._codecName; }

    /**
     * Private data to help the codec.
     */
    public get codecPrivateData(): ByteVector|undefined { return this._codecPrivateData; }

    /** @inheritDoc */
    public get description(): string {
        const codecName = this._codecName || this._codecId?.substring(2) || "Unknown";
        return `${codecName} ${MatroskaTrackType[this._type]}`;
    }

    /** @inheritDoc */
    public get durationMilliseconds(): number|undefined { return undefined; }

    /**
     * Is `true` if the track contains commentary.
     */
    public get isCommentary(): boolean|undefined { return this._isCommentary; }

    /**
     * Is `true` if the track should be eligible for automatic selection by the player.
     */
    public get isDefault(): boolean { return this._isDefault; }

    /**
     * Is `true` if the track is usable. It is possible to turn an unusable track into a usable
     * track using chapter codecs or control tracks.
     */
    public get isEnabled(): boolean { return this._isEnabled; }

    /**
     * Is `true` if the track should be eligible for automatic selection by the player if it
     * matches the user's language preference, even if the user's preferences would normally not
     * enable subtitles with the selected audio track. This can be used for tracks containing only
     * translations of foreign-language audio or onscreen text. Only applies to subtitle tracks.
     */
    public get isForced(): boolean { return this._isForced; }

    /**
     * Is `true` if the track is suitable for users with hearing impairments.
     */
    public get isHearingImpaired(): boolean|undefined { return this._isHearingImpaired; }

    /**
     * Is `true` if the track is suitable for users with visual impairments.
     */
    public get isVisualImpaired(): boolean|undefined { return this._isVisualImpaired; }

    /**
     * Is `true` if the track is a translation of the content's original language.
     */
    public get isTranslation(): boolean|undefined { return this._isTranslation; }

    /**
     * Language of the track.
     * @remarks
     *     If the Matroska `LanguageIETF` field is available, it will be used preferentially.
     *     This uses the BCP-47 IETF language tag, using the IANA language subtag registry. If it
     *     is not available, the `Language` field is used, if available. This uses the ISO 639-2
     *     format of the 3 letter or 3+2 letter configuration. Both fields are optional
     *     `undefined` is returned if language is not set for the track.
     */
    public get language(): string { return this._languageIetf || this._language; }

    /** @inheritDoc */
    public get mediaTypes(): MediaTypes { return MediaTypes.None; }

    /**
     * Human-readable track name. This field is optional.
     */
    public get trackName(): string|undefined { return this._trackName; }

    /**
     * Track number as is used in the block header.
     */
    public get trackNumber(): number { return this._trackNumber; }

    /**
     * A unique ID to identify the track.
     */
    public get trackUid(): bigint { return this._trackUid; }

    /**
     * Type of the track.
     */
    public get type(): MatroskaTrackType { return this._type; }

    //#endregion
}
