/**
 * Possible modifications to the aspect ratio.
 */
import EbmlTrack from "./ebmlTrack";
import {IVideoCodec, MediaTypes} from "../properties";
import {EbmlElementValue} from "./ebmlParser";
import {MatroskaIds} from "./ids";

export enum EbmlVideoAspectRatioType {
    /**
     * Free resizing allowed
     */
    Free = 0x00,

    /**
     * Keep aspect ratio
     */
    Keep = 0x01,

    /**
     * Fixed aspect ratio
     */
    Fixed = 0x02
}

export enum EbmlVideoDisplayUnits {
    /**
     * Display values are in pixels.
     */
    Pixels = 0x00,

    /**
     * Display values are in centimeters.
     */
    Centimeters = 0x01,

    /**
     * Display values are in inches.
     */
    Inches = 0x02,

    /**
     * Display values are the aspect ratio.
     */
    DisplayAspectRatio = 0x03,

    /**
     * Display value units are unknown.
     */
    Unknown = 0x04
}

export enum EbmlVideoInterlaceFlag {
    /**
     * Interlacing mode is unknown.
     */
    Undetermined = 0x00,

    /**
     * Interlacing mode is interlaced.
     */
    Interlaced = 0x01,

    /**
     * Interlacing mode is progressive scan.
     */
    Progressive = 0x02
}

/**
 * Stereo-3D video mode.
 */
export enum EbmlVideoStereoMode {
    /**
     * Video is not stereo.
     */
    Mono = 0x00,

    /**
     * Stereo video is side by side with left eye first.
     */
    SideBySideLeftFirst = 1,

    /**
     * Stereo video is top/bottom with right eye first.
     */
    TopBottomRightFirst = 2,

    /**
     * Stereo video is top/bottom with left eye first.
     */
    TopBottomLeftFirst = 3,

    /**
     * Stereo video is checkboard with right eye first.
     */
    CheckboardRightFirst = 4,

    /**
     * Stereo video is checkboard with left eye first.
     */
    CheckboardLeftFirst = 5,

    /**
     * Stereo video is row interleaved with right eye first.
     */
    RowInterleavedRightFirst = 6,

    /**
     * Stereo video is row interleaved with left eye first.
     */
    RowInterleavedLeftFirst = 7,

    /**
     * Stereo video is column interleaved with right eye first.
     */
    ColumnInterleavedRightFirst = 8,

    /**
     * Stereo video is column interleaved with left eye first.
     */
    ColumnInterleavedLeftFirst = 9,

    /**
     * Stereo video is cyan/red anaglyph.
     */
    AnaglyphCyanRed = 10,

    /**
     * Stereo video is side by side with right eye first.
     */
    SideBySideRightFirst = 11,

    /**
     * Stereo video is green/magenta anaglyph.
     */
    AnaglyphGreenMagenta = 12,

    /**
     * Stereo video are both eyes laced into one block with left eye first.
     */
    LacedLeftFirst = 13,

    /**
     * Stereo video are both eyes laced into one block with right eye first.
     */
    LacedRightFirst = 14
}

export default class EbmlVideoTrack extends EbmlTrack implements IVideoCodec {
    private readonly _aspectRatioType: EbmlVideoAspectRatioType;
    private readonly _colourSpaceFourcc: number;
    private readonly _cropBottom: number;
    private readonly _cropLeft: number;
    private readonly _cropRight: number;
    private readonly _cropTop: number;
    private readonly _displayHeight: number;
    private readonly _displayUnits: EbmlVideoDisplayUnits;
    private readonly _displayWidth: number;
    private readonly _framerate: number;
    private readonly _height: number;
    private readonly _isInterlaced: EbmlVideoInterlaceFlag;
    private readonly _stereoMode: EbmlVideoStereoMode;
    private readonly _width: number;

    public constructor(trackElements: Map<number, EbmlElementValue>, audioElements: Map<number, EbmlElementValue>) {
        super(audioElements);

        this._aspectRatioType = audioElements.get(MatroskaIds.ASPECT_RATIO_TYPE)?.getUint();
        this._colourSpaceFourcc = audioElements.get(MatroskaIds.COLOUR_SPACE)?.getUint();
        this._cropBottom = audioElements.get(MatroskaIds.PIXEL_CROP_BOTTOM)?.getUint();
        this._cropLeft = audioElements.get(MatroskaIds.PIXEL_CROP_LEFT)?.getUint();
        this._cropRight = audioElements.get(MatroskaIds.PIXEL_CROP_RIGHT)?.getUint();
        this._cropTop = audioElements.get(MatroskaIds.PIXEL_CROP_TOP)?.getUint();
        this._displayHeight = audioElements.get(MatroskaIds.DISPLAY_HEIGHT)?.getUint();
        this._displayWidth = audioElements.get(MatroskaIds.DISPLAY_WIDTH)?.getUint();
        this._displayUnits = audioElements.get(MatroskaIds.DISPLAY_UNIT)?.getUint();
        this._height = audioElements.get(MatroskaIds.PIXEL_HEIGHT)?.getUint();
        this._width = audioElements.get(MatroskaIds.PIXEL_WIDTH)?.getUint();

        const interlacingModeValue = audioElements.get(MatroskaIds.FLAG_INTERLACED)?.getUint();
        this._isInterlaced = interlacingModeValue && interlacingModeValue > EbmlVideoInterlaceFlag.Progressive
            ? interlacingModeValue
            : EbmlVideoInterlaceFlag.Undetermined;

        const stereoModeValue = audioElements.get(MatroskaIds.STEREO_MODE)?.getUint();
        this._stereoMode = stereoModeValue || 0;
    }

    /**
     * Specifies the possible modifications to the aspect ratio.
     */
    public get aspectRatioType(): EbmlVideoAspectRatioType { return this._aspectRatioType; }

    /**
     * Number of pixels to remove at the bottom of the image.
     */
    public get cropBottom(): number { return this._cropBottom; }

    /**
     * Number of pixels to remove on the left of the image.
     */
    public get cropLeft(): number { return this._cropLeft; }

    /**
     * Number of pixels to remove on the right of the image.
     */
    public get cropRight(): number { return this._cropRight; }

    /**
     * Number of pixels to remove at the top of the image.
     */
    public get cropTop(): number { return this._cropTop; }

    /**
     * Height of the video frames to display. Applies to the video frame after cropping.
     * @remarks If the {@link displayUnits} is {@link EbmlVideoDisplayUnits.Pixels}, then default
     *     value for this is equal to {@link videoHeight} - {@link cropTop} - {@link cropBottom},
     *     otherwise there is no default value.
     */
    public get displayHeight(): number { return this._displayHeight; }

    /**
     * How {@link displayWidth} and {@link displayHeight} are interpreted.
     */
    public get displayUnits(): number { return this._displayUnits; }

    /**
     * Width of the video frames to display. Applies to the video frame after cropping.
     * @remarks If the {@link displayUnits} is {@link EbmlVideoDisplayUnits.Pixels}, then default
     *     value for this is equal to {@link videoWidth} - {@link cropLeft} - {@link cropRight},
     *     otherwise there is no default value.
     */
    public get displayWidth(): number { return this._displayWidth; }

    /**
     * Mode for interlacing the video.
     */
    public get interlacingMode(): EbmlVideoInterlaceFlag { return this._isInterlaced; }

    /** @inheritDoc */
    public get mediaTypes(): MediaTypes { return MediaTypes.Video; }

    /**
     * Stereo-3D video mode.
     */
    public get stereoMode(): EbmlVideoStereoMode { return this._stereoMode; }

    /** @inheritDoc */
    public get videoHeight(): number { return this._height; }

    /** @inheritDoc */
    public get videoWidth(): number { return this._width; }
}
