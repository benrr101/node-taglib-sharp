/**
 * Public enumeration listing Matroska/webm specific EBML Identifiers.
 */
export class MatroskaIds
{
    // GLOBAL --------------------------------------------------------------

    /**
     * Identifier for a Matroska Void EBML element.
     */
    public static readonly VOID = 0xEC;

    /**
     * Identifier for a Matroska CRC-32 EBML element.
     * @remarks The CRC is computed on all the data of the Master-element it's in. The CRC Element
     *     should be the first in its parent master for easier reading. All level 1 Elements
     *     should include a CRC-32. The CRC in use is the IEEE CRC32 Little Endian.
     */
    public static readonly CRC32 = 0xBF;

    // SEGMENT -------------------------------------------------------------

    /**
     * Identifier for a Matroska Segment EBML element.
     */
    public static readonly SEGMENT = 0x18538067;


    // META SEEK -----------------------------------------------------------

    /**
     * Identifier for a Matroska Seek Head EBML element.
     */
    public static readonly SEEK_HEAD = 0x114D9B74;

    /**
     * Identifier for a Matroska Seek Entry (Master).
     */
    public static readonly SEEK = 0x4DBB;

    /**
     * Identifier for a Matroska Seek ID (Binary).
     */
    public static readonly SEEK_ID = 0x53AB;

    /**
     * Identifier for a Matroska Seek Position (uint).
     */
    public static readonly SEEK_POSITION = 0x53AC;

    // SEGMENT INFO --------------------------------------------------------

    /**
     * Identifier for a Matroska Segment Info EBML element.
     */
    public static readonly INFO = 0x1549A966;

    /**
     * Identifier for a Matroska Segment UUID EBML element.
     */
    public static readonly SEGMENT_UUID = 0x73A4;

    /**
     * Identifier for a Matroska Segment File Name EBML element.
     */
    public static readonly SEGMENT_FILE_NAME = 0x7384;

    /**
     * Identifier for a Matroska Prev UUID EBML element.
     */
    public static readonly PREV_UUID = 0x3CB923;

    /**
     * Identifier for a Matroska Prev File Name EBML element.
     */
    public static readonly PREV_FILE_NAME = 0x3C83AB;

    /**
     * Identifier for a Matroska Nex UUID EBML element.
     */
    public static readonly NEXT_UUID = 0x3EB923;

    /**
     * Identifier for a Matroska Nex File Name EBML element.
     */
    public static readonly NEXT_FILE_NAME = 0x3E83BB;

    /**
     * Identifier for a Matroska Segment Family EBML element.
     */
    public static readonly SEGMENT_FAMILY = 0x4444;

    /**
     * Identifier for a Matroska Chapter Translate EBML element.
     */
    public static readonly CHAPTER_TRANSLATE = 0x6924;

    /**
     * Identifier for a Matroska Chapter Translate ID element.
     */
    public static readonly CHAPTER_TRANSLATE_ID = 0x69A5;

    /**
     * Identifier for a Matroska Chapter Translate Codec element.
     */
    public static readonly CHAPTER_TRANSLATE_CODEC = 0x69BF;

    /**
     * Identifier for a Matroska Chapter Translate Edition UID element.
     */
    public static readonly CHAPTER_TRANSLATE_EDITION_UID = 0x69FC;

    /**
     * Identifier for a Matroska Code Scale EBML element.
     */
    public static readonly TIME_CODE_SCALE = 0x2AD7B1;

    /**
     * Identifier for a Matroska Duration EBML element.
     */
    public static readonly DURATION = 0x4489;

    /**
     * Identifier for a Matroska Date UTC EBML element.
     */
    public static readonly DATE_UTC = 0x4461;

    /**
     * Identifier for a Matroska Title EBML element.
     */
    public static readonly TITLE = 0x7BA9;

    /**
     * Identifier for a Matroska Muxing App EBML element.
     */
    public static readonly MUXING_APP = 0x4D80;

    /**
     * Identifier for a Matroska Writing App EBML element.
     */
    public static readonly WRITTING_APP = 0x5741;

    // CLUSTER -------------------------------------------------------------

    /**
     * Identifier for a Matroska Cluster EBML element.
     */
    public static readonly CLUSTER = 0x1F43B675;

    /**
     * Identifier for a Matroska Timestamp element.
     */
    public static readonly TIMESTAMP = 0xE7;

    /**
     * Identifier for a Matroska Silent Tracks element (deprecated).
     */
    public static readonly SILENT_TRACKS = 0x5854;

    /**
     * Identifier for a Matroska Silent Track Number element (deprecated).
     */
    public static readonly SILENT_TRACK_NUMBER = 0x58D7;

    /**
     * Identifier for a Matroska cluster position element.
     */
    public static readonly POSITION = 0xA7;

    /**
     * Identifier for a Matroska previous cluster size element.
     */
    public static readonly PREV_SIZE = 0xAB;

    /**
     * Identifier for a Matroska Simple Block element.
     */
    public static readonly SIMPLE_BLOCK = 0xA3;

    /**
     * Identifier for a Matroska Block Group element.
     */
    public static readonly BLOCK_GROUP = 0xA0;

    /**
     * Identifier for a Matroska Block element.
     */
    public static readonly BLOCK = 0xA1;

    /**
     * Identifier for a Matroaka virtual block element (deprecated).
     */
    public static readonly BLOCK_VIRTUAL = 0xA2;

    /**
     * Identifier for a Matroska block additions element.
     */
    public static readonly BLOCK_ADDITIONS = 0x75A1;

    /**
     * Identifier for a Matroska block's additional properties element.
     */
    public static readonly BLOCK_MORE = 0xA6;

    /**
     * Identifier for additional block information Matroska element.
     */
    public static readonly BLOCK_ADDITIONAL = 0xA5;

    /**
     * Identifier for ID that identifies the additional block information element.
     */
    public static readonly BLOCK_ADD_ID = 0xEE;

    /**
     * Identifier for a block duration Matroska element.
     */
    public static readonly BLOCK_DURATION = 0x9B;

    /**
     * Identifier for a Matroska reference priority element.
     */
    public static readonly REFERENCE_PRIORITY = 0xFA;

    /**
     * Identifier for a Matroska reference block element.
     */
    public static readonly REFERENCE_BLOCK = 0xFB;

    /**
     * Identifier for a Matroska virtual reference element (deprecated).
     */
    public static readonly REFERENCE_VIRTUAL = 0xFD;

    /**
     * Identifier for a Matroska codec state element.
     */
    public static readonly CODEC_STATE = 0xA4;

    /**
     * Identifier for a Matroska padding discarding element.
     */
    public static readonly DISCARD_PADDING = 0x75A2;

    /**
     * Identifier for a Matroska slices element (deprecated).
     */
    public static readonly SLICES = 0x8E;

    /**
     * Identifier for a Matroska time slice element (deprecated).
     */
    public static readonly TIME_SLICE = 0xE8;

    /**
     * Identifier a a Matroska lace number element (deprecated).
     */
    public static readonly LACE_NUMBER = 0xCC;

    /**
     * Identifier for a Matroska frame number element (deprecated).
     */
    public static readonly FRAME_NUMBER = 0xCD;

    /**
     * Identifier for a Matroska block addition ID element (not to be confused with
     * {@link BLOCK_ADD_ID}, deprecated).
     */
    public static readonly BLOCK_ADDITION_ID = 0xCB;

    /**
     * Identifier for a Matroska delay element (deprecated).
     */
    public static readonly DELAY = 0xCE;

    /**
     * Identifier for a Matroska slice duration element (deprecated).
     */
    public static readonly SLICE_DURATION = 0xCF;

    /**
     * Identifier for a Matroska reference frame element (deprecated).
     */
    public static readonly REFERENCE_FRAME = 0xC8;

    /**
     * Identifier for a Matroska reference offset element (deprecated).
     */
    public static readonly REFERENCE_OFFSET = 0xC9;

    /**
     * Identifier for a Matroska reference timestamp element (deprecated).
     */
    public static readonly REFERENCE_TIMESTAMP = 0xCA;

    /**
     * Identifier for a Matroska encrypted block element (deprecated).
     */
    public static readonly ENCRYPTED_BLOCK = 0xAF;

    // TRACK ---------------------------------------------------------------

    /**
     * Identifier for a Matroska Tracks EBML Element.
     */
    public static readonly TRACKS = 0x1654AE6B;

    /**
     * Identifier for a Matroska Track Entry EBML element.
     */
    public static readonly TRACK_ENTRY = 0xAE;

    /**
     * Identifier for a Matroska Track Number EBML element.
     */
    public static readonly TRACK_NUMBER = 0xD7;

    /**
     * Identifier for a Matroska Track UID EBML element.
     */
    public static readonly TRACK_UID = 0x73C5;

    /**
     * Identifier for a Matroska Track Type EBML element.
     */
    public static readonly TRACK_TYPE = 0x83;

    /**
     * Identifier for a Matroska Track Enabled EBML element.
     */
    public static readonly FLAG_ENABLED = 0xB9;

    /**
     * Identifier for a Matroska Track Flag Default EBML element.
     */
    public static readonly FLAG_DEFAULT = 0x88;

    /**
     * Identifier for a Matroska Track Flag Forced EBML element.
     */
    public static readonly FLAG_FORCED = 0x55AA;

    /**
     * Identifier for a Matroska Track Flag Hearing Impaired EBML element.
     */
    public static readonly FLAG_HEARING_IMPAIRED = 0x55AB;

    /**
     * Identifier for a Matroska Track Flag Visual Impaired EBML element.
     */
    public static readonly FLAG_VISUAL_IMPAIRED = 0x55AC;

    /**
     * Identifier for a Matroska text descriptions flag element.
     */
    public static readonly FLAG_TEXT_DESCRIPTIONS = 0x55AD;

    /**
     * Identifier for a Matroska Track Flag Original EBML element.
     */
    public static readonly FLAG_ORIGINAL = 0x55AE;

    /**
     * Identifier for a Matroska Track Flag Commentary element.
     */
    public static readonly FLAG_COMMENTARY = 0x55AF;

    /**
     * Identifier for a Matroska Track Flag Lacing EBML element.
     */
    public static readonly FLAG_LACING = 0x9C;

    /**
     * Identifier for a Matroska Track Min Cache EBML element.
     */
    public static readonly MIN_CACHE = 0x6DE7;

    /**
     * Identifier for a Matroska Track Max Cache EBML element.
     */
    public static readonly MAX_CACHE = 0x6DF8;

    /**
     * Identifier for a Matroska Track Default Duration EBML element.
     */
    public static readonly DEFAULT_DURATION = 0x23E383;

    /**
     * Identifier for a Matroska default decoded field duration.
     */
    public static readonly DEFAULT_DECODED_FIELD_DURATION = 0x234E7A;

    /**
     * Identifier for a Matroska Track Time Code Scale EBML element (deprecated).
     */
    public static readonly TRACK_TIMESTAMP_SCALE = 0x23314F;

    /**
     * Identifier for a Matroska Track Offset element (deprecated).
     */
    public static readonly TRACK_OFFSET = 0x537F;

    /**
     * Identifier for a Matroska Track Max Block Addition EBML element.
     */
    public static readonly MAX_BLOCK_ADDITION_ID = 0x55EE;

    /**
     * Identifier for a Matroska block addition mapping.
     */
    public static readonly BLOCK_ADDITION_MAPPING = 0x41E4;

    /**
     * Identifier for a Matroska block additional ID value element.
     */
    public static readonly BLOCK_ADD_ID_VALUE = 0x41F0;

    /**
     * Identifier for a Matroska block additional ID name element.
     */
    public static readonly BLOCK_ADD_ID_NAME = 0x41A4;

    /**
     * Identifier for a Matroska block additional ID type element.
     */
    public static readonly BLOCK_ADD_ID_TYPE = 0x41E7;

    /**
     * Identifier for a Matroska block additional ID extra data element.
     */
    public static readonly BLOCK_ADD_ID_EXTRA_DATA = 0x41ED;

    /**
     * Identifier for a Matroska Track Name EBML element.
     */
    public static readonly NAME = 0x536E;

    /**
     * Identifier for a Matroska Track Language EBML element.
     */
    public static readonly LANGUAGE = 0x22B59C;

    /**
     * Identifier for a Matroska Language BCP47 element.
     */
    public static readonly LANGUAGE_BCP47 = 0x22B59D;

    /**
     * Identifier for a Matroska Codec ID EBML element.
     */
    public static readonly CODEC_ID = 0x86;

    /**
     * Identifier for a Matroska Codec Private EBML element.
     */
    public static readonly CODEC_PRIVATE = 0x63A2;

    /**
     * Identifier for a Matroska Codec Name EBML element.
     */
    public static readonly CODEC_NAME = 0x258688;

    /**
     * Identifier for a Matroska Track Attachment Link EBML element (deprecated).
     */
    public static readonly ATTACHMENT_LINK = 0x7446;

    /**
     * Identifier for a Matroska Codec Settings EBML element (deprecated).
     */
    public static readonly CODEC_SETTINGS = 0x3A9697;

    /**
     * Identifier for a Matroska Codec Info URL EBML element (deprecated).
     */
    public static readonly CODEC_INFO_URL = 0x3B4040;

    /**
     * Identifier for a Matroska Codec Download URL EBML element (deprecated).
     */
    public static readonly CODEC_DOWNLOAD_URL = 0x26B240;

    /**
     * Identifier for a Matroska Codec Decode All EBML element (deprecated).
     */
    public static readonly CODEC_DECODE_ALL = 0xAA;

    /**
     * Identifier for a Matroska Track Overlay EBML element.
     */
    public static readonly TRACK_OVERLAY = 0x6FAB;

    /**
     * Identifier for a Matroska codec delay element.
     */
    public static readonly CODEC_DELAY = 0x56AA;

    /**
     * Identifier for a Matroska seek preroll element.
     */
    public static readonly SEEK_PREROLL = 0x56BB;

    /**
     * Identifier for a Matroska Track Translate EBML element.
     */
    public static readonly TRACK_TRANSLATE = 0x6624;

    /**
     * Identifier for a Matroska track translate track ID element.
     */
    public static readonly TRACK_TRANSLATE_TRACK_ID = 0x66A5;

    /**
     * Identifier for a Matroska track translate codec element.
     */
    public static readonly TRACK_TRANSLATE_CODEC = 0x66BF;

    /**
     * Identifier for a Matroska track translate edition UID.
     */
    public static readonly TRACK_TRANSLATE_EDITION_UID = 0x66FC;

    /**
     * Identifier for a Matroska Track Video EBML element.
     */
    public static readonly VIDEO = 0xE0;

    /**
     * Identifier for a Matroska Video Flag Interlaced EBML element.
     */
    public static readonly FLAG_INTERLACED = 0x9A;

    /**
     * Identifier for a Matroska video field older element.
     */
    public static readonly FIELD_ORDER = 0x9D;

    /**
     * Identifier for a Matroska Video Stereo Mode EBML element.
     */
    public static readonly STEREO_MODE = 0x53B8;

    /**
     * Identifier for a Matroska alpha mode element.
     */
    public static readonly ALPHA_MODE = 0x53C0;

    /**
     * Identifier for a Matroska old (pre-libmatroska 0.9.0) stereo mode element.
     */
    public static readonly OLD_STEREO_MODE = 0x53B9;

    /**
     * Identifier for a Matroska Video Pixel Width EBML element.
     */
    public static readonly PIXEL_WIDTH = 0xB0;

    /**
     * Identifier for a Matroska Video Pixel Height EBML element.
     */
    public static readonly PIXEL_HEIGHT = 0xBA;

    /**
     * Identifier for a Matroska Video Pixel Crop Bottom EBML element.
     */
    public static readonly PIXEL_CROP_BOTTOM = 0x54AA;

    /**
     * Identifier for a Matroska Video Pixel Crop Top EBML element.
     */
    public static readonly PIXEL_CROP_TOP = 0x54BB;

    /**
     * Identifier for a Matroska Video Pixel Crop Left EBML element.
     */
    public static readonly PIXEL_CROP_LEFT = 0x54CC;

    /**
     * Identifier for a Matroska Video Pixel Crop Right EBML element.
     */
    public static readonly PIXEL_CROP_RIGHT = 0x54DD;

    /**
     * Identifier for a Matroska Video Display Width EBML element.
     */
    public static readonly DISPLAY_WIDTH = 0x54B0;

    /**
     * Identifier for a Matroska Video Display Height EBML element.
     */
    public static readonly DISPLAY_HEIGHT = 0x54BA;

    /**
     * Identifier for a Matroska Video Display Unit EBML element.
     */
    public static readonly DISPLAY_UNIT = 0x54B2;

    /**
     * Identifier for a Matroska Video Aspect Ratio Type EBML element (deprecated).
     */
    public static readonly ASPECT_RATIO_TYPE = 0x54B3;

    /**
     * Identifier for a Matroska video uncompressed fourcc element (color space).
     */
    public static readonly UNCOMPRESSED_FOURCC = 0x2EB524;

    /**
     * Identifier for a Matroska Video Gamma Value EBML element (deprecated).
     */
    public static readonly GAMMA_VALUE = 0x2FB523;

    /**
     * Identifier for a Matroska Video Frame Rate EBML element (deprecated).
     */
    public static readonly FRAME_RATE = 0x2383E3;

    /**
     * Identifier for a Matroska video colour format element.
     */
    public static readonly COLOUR = 0x55B0;

    /**
     * Identifier for a Matroska matrix coefficients element.
     */
    public static readonly MATRIX_COEFFICIENTS = 0x55B1;

    /**
     * Identifier for a Matroska video bits per channel element.
     */
    public static readonly BITS_PER_CHANNEL = 0x55B2;

    /**
     * Identifier for a Matroska horizontal Cr/Cb subsampling.
     */
    public static readonly CHROMA_SUBSAMPLING_HORZ = 0x55B3;

    /**
     * Identifier for a Matroska vertical Cr/Cb subsampling.
     */
    public static readonly CHROMA_SUBSAMPLING_VERT = 0x55B4;

    /**
     * Identifier for a Matroska horizontal Cb subsampling.
     */
    public static readonly CB_SUBSAMPLING_HORZ = 0x55B5;

    /**
     * Identifier for a Matroska vertical Cb subsampling.
     */
    public static readonly CB_SUBSAMPLING_VERT = 0x55B6;

    /**
     * Identifier for a Matroska horizontal chroma subsampling.
     */
    public static readonly CHROMA_SITING_HORZ = 0x55B7;

    /**
     * Identifier for a Matroska vertical chroma subsampling.
     */
    public static readonly CHROMA_SITING_VERT = 0x55B8;

    /**
     * Identifier for a Matroska video range element.
     */
    public static readonly RANGE = 0x55B9;

    /**
     * Identifier for a Matroska video transfer characteristics element.
     */
    public static readonly TRANSFER_CHARACTERISTICS = 0x55BA;

    /**
     * Identifier for a Matroska video color primaries element.
     */
    public static readonly PRIMARIES = 0x55BB;

    /**
     * Identifier for a Matroska video maximum content light level element.
     */
    public static readonly MAX_CLL = 0x55BC;

    /**
     * Identifier for a Matroska video frame-average light level element.
     */
    public static readonly MAX_FALL = 0x55BD;

    /**
     * Identifier for a Matroska SMPTE 2086 mastering data element.
     */
    public static readonly MASTERING_METADATA = 0x55D0;

    /**
     * Identifier for a Matroska red X chromaticity coordinate element.
     */
    public static readonly PRIMARY_R_CHROMATICITY_X = 0x55D1;

    /**
     * Identifier for a Matroska red Y chromaticity coordinate element.
     */
    public static readonly PRIMARY_R_CHROMATICITY_Y = 0x55D2;

    /**
     * Identifier for a Matroska green X chromaticity coordinate element.
     */
    public static readonly PRIMARY_G_CHROMATICITY_X = 0x55D3;

    /**
     * Identifier for a Matroska green Y chromaticity coordinate element.
     */
    public static readonly PRIMARY_G_CHROMATICITY_Y = 0x55D4;

    /**
     * Identifier for a Matroska blue X chromaticity coordinate element.
     */
    public static readonly PRIMARY_B_CHROMATICITY_X = 0x55D5;

    /**
     * Identifier for a Matroska blue X chromaticity coordinate element.
     */
    public static readonly PRIMARY_B_CHROMATICITY_Y = 0x55D6;

    /**
     * Identifier for a Matroska white X chromaticity coordinate element.
     */
    public static readonly WHITE_POINT_CHROMATICITY_X = 0x55D7;

    /**
     * Identifier for a Matroska white Y chromaticity coordinate element.
     */
    public static readonly WHITE_POINT_CHROMATICITY_Y = 0x55D8;

    /**
     * Identifier for a Matroska maximum luminance element.
     */
    public static readonly LUMINANCE_MAX = 0x55D9;

    /**
     * Identifier for a Matroska minimum luminance element.
     */
    public static readonly LUMINANCE_MIN = 0x55D9;

    /**
     * Identifier for a Matroska video projection details element.
     */
    public static readonly PROJECTION = 0x7670;

    /**
     * Identifier for a Matroska video projection type element.
     */
    public static readonly PROJECTION_TYPE = 0x7671;

    /**
     * Identifier for a Matroska video projection private data element.
     */
    public static readonly PROJECTION_PRIVATE = 0x7672;

    /**
     * Identifier for a Matroska video projection pose yaw element.
     */
    public static readonly PROJECTION_POSE_YAW = 0x7673;

    /**
     * Identifier for a Matroska video projection pose pitch element.
     */
    public static readonly PROJECTION_POSE_PITCH = 0x7674;

    /**
     * Identifier for a Matroska video projection pose roll element.
     */
    public static readonly PROJECTION_POSE_ROLL = 0x7675;

    /**
     * Identifier for a Matroska Track Audio EBML element.
     */
    public static readonly AUDIO = 0xE1;

    /**
     * Identifier for a Matroska Audio Sampling Freq EBML element.
     */
    public static readonly SAMPLING_FREQ = 0xB5;

    /**
     * Identifier for a Matroska Audio Output Sampling Freq EBML element.
     */
    public static readonly OUTPUT_SAMPLING_FREQ = 0x78B5;

    /**
     * Identifier for a Matroska Audio Channels EBML element.
     */
    public static readonly CHANNELS = 0x9F;

    /**
     * Identifier for a Matroska Audio Channels Position EBML element (deprecated).
     */
    public static readonly CHANNELS_POSITIONS = 0x7D7B;

    /**
     * Identifier for a Matroska Audio Bit Depth EBML element.
     */
    public static readonly BIT_DEPTH = 0x6264;

    /**
     * Identifier for a Matroska audio emphasis element.
     */
    public static readonly EMPHASIS = 0x52F1;

    /**
     * Identifier for a Matroska track operation element.
     */
    public static readonly TRACK_OPERATION = 0xE2;

    /**
     * Identifier for a Matroska video plane tracks to combine element.
     */
    public static readonly TRACK_COMBINE_PLANES = 0xE3;

    /**
     * Identifier for a Matroska video plane track element.
     */
    public static readonly TRACK_PLANE = 0xE4;

    /**
     * Identifier for a Matroska video plane track UID element.
     */
    public static readonly TRACK_PLANE_UID = 0xE5;

    /**
     * Identifier for a Matroska video plane type element.
     */
    public static readonly TRACK_PLANE_TYPE = 0xE6;

    /**
     * Identifier for a Matroska element that indicates which tracks need to be combined.
     */
    public static readonly TRACK_JOIN_BLOCKS = 0xE9;

    /**
     * Identifier for a Matroska joined track UID.
     */
    public static readonly TRACK_JOIN_UID = 0xED;

    /**
     * Identifier for a Matroska trick track UID element (deprecated).
     */
    public static readonly TRICK_TRACK_UID = 0xC0;

    /**
     * Identifier for a Matroska trick track's segment UID element (deprecated).
     */
    public static readonly TRICK_TRACK_SEGMENT_UID = 0xC1;

    /**
     * Identifier for a Matroska trick track's flag element (deprecated).
     */
    public static readonly TRICK_TRACK_FLAG = 0xC6;

    /**
     * Identifier for a Matroska trick track's master track UID element (deprecated).
     */
    public static readonly TRICK_MASTER_TRACK_UID = 0xC7;

    /**
     * Identifier for a Matroska trick track's master track segment UID (deprecated).
     */
    public static readonly TRICK_MASTER_TRACK_SEGMENT_UID = 0xC4;

    /**
     * Identifier for a Matroska Track Encoding EBML master element.
     */
    public static readonly CONTENT_ENCODINGS = 0x6D80;

    /**
     * Identifier for a Matroska track encoding element.
     */
    public static readonly CONTENT_ENCODING = 0x6240;

    /**
     * Identifier for a Matroska track encoding scope element.
     */
    public static readonly CONTENT_ENCODING_SCOPE = 0x5032;

    /**
     * Identifier for a Matroska track encoding type element.
     */
    public static readonly CONTENT_ENCODING_TYPE = 0x5033;

    /**
     * Identifier for a Matroska track compression master element.
     */
    public static readonly CONTENT_COMPRESSION = 0x5034;

    /**
     * Identifier for a Matroska track compression algorithm element.
     */
    public static readonly CONTENT_COMP_ALGO = 0x4254;

    /**
     * Identifier for a Matroska track compression settings element.
     */
    public static readonly CONTENT_COMP_SETTINGS = 0x4255;

    /**
     * Identifier for a Matroska track encryption master element.
     */
    public static readonly CONTENT_ENCRYPTION = 0x5035;

    /**
     * Identifier for a Matroska track encryption algorithm element.
     */
    public static readonly CONTENT_ENC_ALGO = 0x47E1;

    /**
     * Identifier for a Matroska track encryption key ID element.
     */
    public static readonly CONTENT_ENC_KEY_ID = 0x47E2;

    /**
     * Identifier for a Matroska track AES encryption settings element.
     */
    public static readonly CONTENT_ENC_AES_SETTINGS = 0x47E7;

    /**
     * Identifier for a Matroska track AES encryption cipher mode element.
     */
    public static readonly AES_SETTINGS_CIPHER_MODE = 0x47E8;

    /**
     * Identifier for a Matroska track encryption content signature element (deprecated).
     */
    public static readonly CONTENT_SIGNATURE = 0x47E3;

    /**
     * Identifier for a Matroska track encryption content signature ID element (deprecated).
     */
    public static readonly CONTENT_SIG_KEY_ID = 0x47E4;

    /**
     * Identifier for a Matroska track encryption signature algorithm element (deprecated).
     */
    public static readonly CONTENT_SIG_ALGO = 0x47E5;

    /**
     * Identifier for a Matroska track encryption signature hash algorithm element (deprecated).
     */
    public static readonly CONTENT_SIG_HASH_ALGO = 0x47E6;

    // CUEING DATA ---------------------------------------------------------

    /**
     * Identifier for a Matroska Cues EBML element.
     */
    public static readonly CUES = 0x1C53BB6B;

    /**
     * Identifier for a Matroska cue seek point element.
     */
    public static readonly CUES_POINT = 0xBB;

    /**
     * Identifier for a Matroska cue timestamp element.
     */
    public static readonly CUE_TIME = 0xB3;

    /**
     * Identifier for a Matroska cue track positions master element.
     */
    public static readonly CUE_TRACK_POSITIONS = 0xB7;

    /**
     * Identifier for a Matroska cue track element.
     */
    public static readonly CUE_TRACK = 0xF7;

    /**
     * Identifier for a Matroska cue cluster position element.
     */
    public static readonly CUE_CLUSTER_POSITION = 0xF1;

    /**
     * Identifier for a Matroska cue relative position element.
     */
    public static readonly CUE_RELATIVE_POSITION = 0xF0;

    /**
     * Identifier for a Matroska cue duration element.
     */
    public static readonly CUE_DURATION = 0xB2;

    /**
     * Identifier for a Matroska cue block number element.
     */
    public static readonly CUE_BLOCK_NUMBER = 0x5378;

    /**
     * Identifier for a Matroska cue codec state element.
     */
    public static readonly CUE_CODEC_STATE = 0xEA;

    /**
     * Identifier for a Matroska cue reference master element.
     */
    public static readonly CUE_REFERENCE = 0xDB;

    /**
     * Identifier for a Matroska cue reference time element.
     */
    public static readonly CUE_REF_TIME = 0x96

    /**
     * Identifier for a Matroska cue reference cluster element (deprecated).
     */
    public static readonly CUE_REF_CLUSTER = 0x97;

    /**
     * Identifier for a Matroska cue reference number element (deprecated).
     */
    public static readonly CUE_REF_NUMBER = 0x535F;

    /**
     * Identifier for a Matroska cue reference codec state element (deprecated).
     */
    public static readonly CUE_REF_CODEC_STATE = 0xEB;

    // ATTACHMENT ----------------------------------------------------------

    /**
     * Identifier for a Matroska Attachments EBML element.
     */
    public static readonly ATTACHMENTS = 0x1941A469;

    /**
     * Identifier for a Matroska attached file.
     */
    public static readonly ATTACHED_FILE = 0x61A7;

    /**
     * Identifier for a Matroska human-friendly name for the attached file.
     */
    public static readonly FILE_DESCRIPTION = 0x467E;

    /**
     * Identifier for a Matroska Filename of the attached file.
     */
    public static readonly FILE_NAME = 0x466E;

    /**
     * Identifier for a Matroska MIME type of the file.
     */
    public static readonly FILE_MEDIA_TYPE = 0x4660;

    /**
     * Identifier for a Matroska data of the file.
     */
    public static readonly FILE_DATA = 0x465C;

    /**
     * Identifier for a Matroska Unique ID representing the file, as random as possible.
     */
    public static readonly FILE_UID = 0x46AE;

    /**
     * Identifier for a Matroska attachment referral element (deprecated).
     */
    public static readonly FILE_REFERRAL = 0x4675;

    /**
     * Identifier for a Matroska attachment usage start time element (deprecated).
     */
    public static readonly FILE_USED_START_TIME = 0x4661;

    /**
     * Identifier for a Matroska attachment usage end time element (deprecated).
     */
    public static readonly FILE_USED_END_TILE = 0x4662;

    // CHAPTERS ------------------------------------------------------------

    /**
     * Identifier for a Matroska Chapters EBML element.
     */
    public static readonly CHAPTERS = 0x1043A770;

    /**
     * Identifier for a Matroska segment edition master element.
     */
    public static readonly EDITION_ENTRY = 0x45B9;

    /**
     * Identifier for a Matroska edition UID element.
     */
    public static readonly EDITION_UID = 0x45BC;

    /**
     * Identifier for a Matroska edition hidden flag element.
     */
    public static readonly EDITION_FLAG_HIDDEN = 0x45BD;

    /**
     * Identifier for a Matroska edition default flag element.
     */
    public static readonly EDITION_FLAG_DEFAULT = 0x45BD;

    /**
     * Identifier for a Matroska edition ordered flag element.
     */
    public static readonly EDITION_FLAG_ORDERED = 0x45DD;

    /**
     * Identifier for a Matroska edition display element.
     */
    public static readonly EDITION_DISPLAY = 0x4520;

    /**
     * Identifier for a Matroska edition display string element.
     */
    public static readonly EDITION_STRING = 0x4521;

    /**
     * Identifier for a Matroska edition display string BCP47 language code element.
     */
    public static readonly EDITION_LANGUAGE_BCP47 = 0x45E4;

    /**
     * Identifier for a Matroska chapter atom master element.
     */
    public static readonly CHAPTER_ATOM = 0xB6;

    /**
     * Identifier for a Matroska chapter UID element.
     */
    public static readonly CHAPTER_UID = 0x73C4;

    /**
     * Identifier for a Matroska chapter string UID element.
     */
    public static readonly CHAPTER_STRING_UID = 0x73C4;

    /**
     * Identifier for a Matroska chapter start time element.
     */
    public static readonly CHAPTER_TIME_START = 0x91;

    /**
     * Identifier for a Matroska chapter end time element.
     */
    public static readonly CHAPTER_TIME_END = 0x92;

    /**
     * Identifier for a Matroska chapter enabled flag element.
     */
    public static readonly CHAPTER_FLAG_ENABLED = 0x4598;

    /**
     * Identifier for a Matroska chapter hidden flag element.
     */
    public static readonly CHAPTER_FLAG_HIDDEN = 0x98;

    /**
     * Identifier for a Matroska chapter segment UUID element.
     */
    public static readonly CHAPTER_SEGMENT_UUID = 0x6E67;

    /**
     * Identifier for a Matroska chapter skip type element.
     */
    public static readonly CHAPTER_SKIP_TYPE = 0x4588;

    /**
     * Identifier for a Matroska chapter segment edition UID element.
     */
    public static readonly CHAPTER_SEGMENT_EDITION_UID = 0x6EBC;

    /**
     * Identifier for a Matroska chapter physical equivalent element.
     */
    public static readonly CHAPTER_PHYSICAL_EQUIV = 0x63C3;

    /**
     * Identifier for a Matroska chapter track master element.
     */
    public static readonly CHAPTER_TRACK = 0x8F;

    /**
     * Identifier for a Matroska chapter track UID element.
     */
    public static readonly CHAPTER_TRACK_UID = 0x89;

    /**
     * Identifier for a Matroska chapter display master element.
     */
    public static readonly CHAPTER_DISPLAY = 0x80;

    /**
     * Identifier for a Matroska chapter string element.
     */
    public static readonly CHAP_STRING = 0x85;

    /**
     * Identifier for a Matroska chapter language code element.
     */
    public static readonly CHAP_LANGUAGE = 0x437C;

    /**
     * Identifier for a Matroska chapter BCP47 language code element.
     */
    public static readonly CHAP_LANGUAGE_BCP47 = 0x437D;

    /**
     * Identifier for a Matroska chapter country code element.
     */
    public static readonly CHAP_COUNTRY = 0x437E;

    /**
     * Identifier for a Matroska chapter process master element.
     */
    public static readonly CHAP_PROCESS = 0x6944;

    /**
     * Identifier for a Matroska chapter process codec ID element.
     */
    public static readonly CHAP_PROCESS_CODEC_ID = 0x6955;

    /**
     * Identifier for a Matroska chapter process command master element.
     */
    public static readonly CHAP_PROCESS_PRIVATE = 0x450D;

    /**
     * Identifier for a Matroska chapter process time element.
     */
    public static readonly CHAP_PROCESS_TIME = 0x6922;

    /**
     * Identifier for a Matroska chapter process data element.
     */
    public static readonly CHAP_PROCESS_DATA = 0x6933;

    // TAGGING -------------------------------------------------------------

    /**
     * Identifier for a Matroska Tags EBML element.
     */
    public static readonly TAGS = 0x1254C367;

    /**
     * Identifier for a Matroska Tag EBML element.
     */
    public static readonly TAG = 0x7373;

    /**
     * Identifier for a Matroska Targets EBML element.
     */
    public static readonly TARGETS = 0x63C0;

    /**
     * Identifier for a Matroska Target Type Value  EBML element (UINT).
     */
    public static readonly TARGET_TYPE_VALUE = 0x68CA;

    /**
     * Identifier for a Matroska Target Type EBML element (string).
     */
    public static readonly TARGET_TYPE = 0x63CA;

    /**
     * Identifier for a Matroska Target Tag Track UID EBML element (UINT).
     */
    public static readonly TAG_TRACK_UID = 0x63C5;

    /**
     * Identifier for a Matroska Target Tag Edition UID EBML element (UINT).
     */
    public static readonly TAG_EDITION_UID = 0x63C9;

    /**
     * Identifier for a Matroska Target Tag Chapter UID EBML element (UINT).
     */
    public static readonly TAG_CHAPTER_UID = 0x63C4;

    /**
     * Identifier for a Matroska Target Tag Attachment UID EBML element (UINT).
     */
    public static readonly TAG_ATTACHMENT_UID = 0x63C6;

    /**
     * Identifier for a Matroska Simple Tag EBML element.
     */
    public static readonly SIMPLE_TAG = 0x67C8;

    /**
     * Identifier for a Matroska Tag Name EBML element.
     */
    public static readonly TAG_NAME = 0x45A3;

    /**
     * Identifier for a Matroska Tag Language EBML element.
     */
    public static readonly TAG_LANGUAGE = 0x447A;

    /**
     * Identifier for a Matroska Tag Language BCP47 EBML element.
     */
    public static readonly TAG_LANGUAGE_BCP47 = 0x447B;

    /**
     * Identifier for a Matroska Tag Default EBML element.
     */
    public static readonly TAG_DEFAULT = 0x4484;

    /**
     * Identifier for a Matroska Tag Default bogus EBML element (Deprecated).
     */
    public static readonly TAG_DEFAULT_BOGUS = 0x4484;

    /**
     * Identifier for a Matroska Tag String EBML element.
     */
    public static readonly TAG_STRING = 0x4487;

    /**
     * Identifier for a Matroska Tag Binary EBML element.
     */
    public static readonly TAG_BINARY = 0x4485;
}
