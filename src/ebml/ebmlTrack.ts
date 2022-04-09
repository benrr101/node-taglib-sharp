import {ICodec, MediaTypes} from "../properties";
import {EbmlElementValue, EbmlParser} from "./ebmlParser";
import {MatroskaIds} from "./ids";
import {ByteVector} from "../byteVector";
import EbmlAudioTrack from "./audioTrack";

enum TrackType {
    Video = 0x01,
    Audio = 0x02,
    Complex = 0x03,
    Logo = 0x10,
    Subtitle = 0x11,
    Buttons = 0x12,
    Control = 0x20
}

export default class EbmlTrack implements ICodec {

    private readonly _isDefault: boolean;
    private readonly _isEnabled: boolean;
    private readonly _codecPrivateData: ByteVector;
    private readonly _codecId: string;
    private readonly _codecName: string;
    private readonly _language: string;
    private readonly _trackName: string;
    private readonly _trackNumber: number;
    private readonly _trackUid: number;

    // #region Constructors

    protected constructor(elements: Map<number, EbmlElementValue>) {
        // Read general-purpose elements
        this._codecId = elements.get(MatroskaIds.CODEC_ID)?.getString();
        this._codecName = elements.get(MatroskaIds.CODEC_NAME)?.getString();
        this._codecPrivateData = elements.get(MatroskaIds.CODEC_PRIVATE)?.getBytes();
        this._isDefault = elements.get(MatroskaIds.FLAG_DEFAULT)?.getBool();
        this._isEnabled = elements.get(MatroskaIds.FLAG_ENABLED)?.getBool();
        this._language = elements.get(MatroskaIds.LANGUAGE)?.getString();
        this._trackName = elements.get(MatroskaIds.NAME)?.getString();
        this._trackNumber = elements.get(MatroskaIds.TRACK_NUMBER)?.getUint();
        this._trackUid = elements.get(MatroskaIds.TRACK_UID)?.getUint();
    }

    public fromTrackEntry(parser: EbmlParser): EbmlTrack {
        // Read all the elements from the track
        const trackEntryParser = parser.getParser();
        const trackElements = new Map<number, EbmlElementValue>();
        try {
            while (trackEntryParser.read()) {
                trackElements.set(
                    trackEntryParser.id,
                    trackEntryParser.getValue()
                );
            }
        } finally {
            trackEntryParser.dispose();
        }

        // Parse the elements into a track object
        switch (trackElements.get(MatroskaIds.TRACK_TYPE)?.getUint()) {
            case TrackType.Audio:
                return new EbmlAudioTrack(trackElements);
            case TrackType.Video:
                return new EbmlVideoTrack(trackElements);
            case TrackType.Subtitle:
                return new EbmlSubtitleTrack(trackElements);
            default:
                return new EbmlTrack(trackElements);
        }
    }

    // #endregion

    // #region Properties

    public get durationMilliseconds(): number { return 0; }

    public get mediaTypes(): MediaTypes { return MediaTypes.None; }

    public get description(): string { return `${this._codecName} ${this._language}`; }

    // #endregion
}
