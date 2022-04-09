export class EbmlIds {
    /**
     * Indicates an EBML Header element.
     */
    public static readonly EBML_HEADER = 0x1A45DFA3;

    /**
     * Indicates an EBML Version element.
     */
    public static readonly EBML_VERSION = 0x4286;

    /**
     * Indicates an EBML Read Version element.
     */
    public static readonly EBML_READ_VERSION = 0x42F7;

    /**
     * Indicates an EBML Max ID Length element.
     */
    public static readonly EBML_MAX_IDLENGTH = 0x42F2;

    /**
     * Indicates an EBML Max Size Length element.
     */
    public static readonly EBML_MAX_SIZE_LENGTH = 0x42F3;

    /**
     * Indicates an EBML Doc Type element.
     */
    public static readonly EBML_DOC_TYPE = 0x4282;

    /**
     * Indicates an EBML Doc Type Version element.
     */
    public static readonly EBML_DOC_TYPE_VERSION = 0x4287;

    /**
     * Indicates an EBML Doc Type Read Version element.
     */
    public static readonly EBML_DOC_TYPE_READ_VERSION = 0x4285;

    /**
     * Indicates an EBML Void element.
     */
    public static readonly EBML_VOID = 0xEC;
}

/**
 * Public enumeration listing Matroska specific EBML Identifiers.
 */
export class MatroskaIds
{
    // @TODO: Maybe we should have all the IDs from the spec in here

    // GLOBAL --------------------------------------------------------------

    /**
     * Indicate a Matroska Void EBML element.
     */
    public static readonly VOID = 0xEC;

    /**
     * Indicate a Matroska CRC-32 EBML element.
     * @remarks The CRC is computed on all the data of the Master-element it's in. The CRC Element
     *     should be the first in it's parent master for easier reading. All level 1 Elements
     *     should include a CRC-32. The CRC in use is the IEEE CRC32 Little Endian.
     */
    public static readonly CRC32 = 0xBF;

    // SEGMENT -------------------------------------------------------------

    /**
     * Indicates a Matroska Segment EBML element.
     */
    public static readonly SEGMENT = 0x18538067;


    // META SEEK -----------------------------------------------------------

    /**
     * Indicates a Matroska Seek Head EBML element.
     */
    public static readonly SEEK_HEAD = 0x114D9B74;

    /**
     * Indicate a Matroska Seek Entry (Master).
     */
    public static readonly SEEK = 0x4DBB;

    /**
     * Indicate a Matroska Seek ID (Binary).
     */
    public static readonly SEEK_ID = 0x53AB;

    /**
     * Indicate a Matroska Seek Position (uint).
     */
    public static readonly SEEK_POSITION = 0x53AC;

    // SEGMENT INFO --------------------------------------------------------

    /**
     * Indicates a Matroska Segment Info EBML element.
     */
    public static readonly INFO = 0x1549A966;

    /**
     * Indicate a Matroska Segment UID EBML element.
     */
    public static readonly SEGMENT_UID = 0x73A4;

    /**
     * Indicate a Matroska Segment File Name EBML element.
     */
    public static readonly SEGMENT_FILE_NAME = 0x7384;

    /**
     * Indicate a Matroska Prev UID EBML element.
     */
    public static readonly PREV_UID = 0x3CB923;

    /**
     * Indicate a Matroska Prev File Name EBML element.
     */
    public static readonly PREV_FILE_NAME = 0x3C83AB;

    /**
     * Indicate a Matroska Nex UID EBML element.
     */
    public static readonly NEXT_UID = 0x3EB923;

    /**
     * Indicate a Matroska Nex File Name EBML element.
     */
    public static readonly NEXT_FILE_NAME = 0x3E83BB;

    /**
     * Indicate a Matroska Segment Family EBML element.
     */
    public static readonly SEGMENT_FAMILY = 0x4444;

    /**
     * Indicate a Matroska Chapter Translate EBML element.
     */
    public static readonly CHAPTER_TRANSLATE = 0x6924;

    /**
     * Indicate a Matroska Code Scale EBML element.
     */
    public static readonly TIME_CODE_SCALE = 0x2AD7B1;

    /**
     * Indicates a Matroska Duration EBML element.
     */
    public static readonly DURATION = 0x4489;

    /**
     * Indicate a Matroska Date UTC EBML element.
     */
    public static readonly DATE_UTC = 0x4461;

    /**
     * Indicate a Matroska Title EBML element.
     */
    public static readonly TITLE = 0x7BA9;

    /**
     * Indicates a Matroska Muxing App EBML element.
     */
    public static readonly MUXING_APP = 0x4D80;

    /**
     * Indicates a Matroska Writing App EBML element.
     */
    public static readonly WRITTING_APP = 0x5741;

    // CLUSTER -------------------------------------------------------------

    /**
     * Indicates a Matroska Cluster EBML element.
     */
    public static readonly CLUSTER = 0x1F43B675;

    // TRACK ---------------------------------------------------------------

    /**
     * Indicates a Matroska Tracks EBML Element.
     */
    public static readonly TRACKS = 0x1654AE6B;

    /**
     * Indicate a Matroska Track Entry EBML element.
     */
    public static readonly TRACK_ENTRY = 0xAE;

    /**
     * Indicate a Matroska Track Number EBML element.
     */
    public static readonly TRACK_NUMBER = 0xD7;

    /**
     * Indicate a Matroska Track UID EBML element.
     */
    public static readonly TRACK_UID = 0x73C5;

    /**
     * Indicate a Matroska Track Type EBML element.
     */
    public static readonly TRACK_TYPE = 0x83;

    /**
     * Indicate a Matroska Track Enabled EBML element.
     */
    public static readonly FLAG_ENABLED = 0xB9;

    /**
     * Indicate a Matroska Track Flag Default EBML element.
     */
    public static readonly FLAG_DEFAULT = 0x88;

    /**
     * Indicate a Matroska Track Flag Forced EBML element.
     */
    public static readonly FLAG_FORCED = 0x55AA;

    /**
     * Indicate a Matroska Track Flag Lacing EBML element.
     */
    public static readonly FLAG_LACING = 0x9C;

    /**
     * Indicate a Matroska Track Min Cache EBML element.
     */
    public static readonly MIN_CACHE = 0x6DE7;

    /**
     * Indicate a Matroska Track Max Cache EBML element.
     */
    public static readonly MAX_CACHE = 0x6DF8;

    /**
     * Indicate a Matroska Track Default Duration EBML element.
     */
    public static readonly DEFAULT_DURATION = 0x23E383;

    /**
     * Indicate a Matroska Track Time Code Scale EBML element.
     */
    public static readonly TRACK_TIMESTAMP_SCALE = 0x23314F;

    /**
     * Indicate a Matroska Track Offset element.
     */
    public static readonly TRACK_OFFSET = 0x537F;

    /**
     * Indicate a Matroska Track Max Block Addition EBML element.
     */
    public static readonly MAX_BLOCK_ADDITION_ID = 0x55EE;

    /**
     * Indicate a Matroska Track Name EBML element.
     */
    public static readonly NAME = 0x536E;

    /**
     * Indicate a Matroska Track Language EBML element.
     */
    public static readonly LANGUAGE = 0x22B59C;

    /**
     * Indicate a Matroska Codec ID EBML element.
     */
    public static readonly CODEC_ID = 0x86;

    /**
     * Indicate a Matroska Codec Private EBML element.
     */
    public static readonly CODEC_PRIVATE = 0x63A2;

    /**
     * Indicate a Matroska Codec Name EBML element.
     */
    public static readonly CODEC_NAME = 0x258688;

    /**
     * Indicate a Matroska Track Attachment Link EBML element.
     */
    public static readonly ATTACHMENT_LINK = 0x7446;

    /**
     * Indicate a Matroska Codec Settings EBML element.
     */
    public static readonly CODEC_SETTINGS = 0x3A9697;

    /**
     * Indicate a Matroska Codec Info URL EBML element.
     */
    public static readonly CODEC_INFO_URL = 0x3B4040;

    /**
     * Indicate a Matroska Codec Download URL EBML element.
     */
    public static readonly CODEC_DOWNLOAD_URL = 0x26B240;

    /**
     * Indicate a Matroska Codec Decode All EBML element.
     */
    public static readonly CODEC_DECODE_ALL = 0xAA;

    /**
     * Indicate a Matroska Track Overlay EBML element.
     */
    public static readonly TRACK_OVERLAY = 0x6FAB;

    /**
     * Indicate a Matroska Track Translate EBML element.
     */
    public static readonly TRACK_TRANSLATE = 0x6624;

    /**
     * Indicate a Matroska Track Video EBML element.
     */
    public static readonly VIDEO = 0xE0;

    /**
     * Indicate a Matroska Video Flag Interlaced EBML element.
     */
    public static readonly FLAG_INTERLACED = 0x9A;

    /**
     * Indicate a Matroska Video Stereo Mode EBML element.
     */
    public static readonly STEREO_MODE = 0x53B8;

    /**
     * Indicate a Matroska Video Pixel Width EBML element.
     */
    public static readonly PIXEL_WIDTH = 0xB0;

    /**
     * Indicate a Matroska Video Pixel Height EBML element.
     */
    public static readonly PIXEL_HEIGHT = 0xBA;

    /**
     * Indicate a Matroska Video Pixel Crop Bottom EBML element.
     */
    public static readonly PIXEL_CROP_BOTTOM = 0x54AA;

    /**
     * Indicate a Matroska Video Pixel Crop Top EBML element.
     */
    public static readonly PIXEL_CROP_TOP = 0x54BB;

    /**
     * Indicate a Matroska Video Pixel Crop Left EBML element.
     */
    public static readonly PIXEL_CROP_LEFT = 0x54CC;

    /**
     * Indicate a Matroska Video Pixel Crop Right EBML element.
     */
    public static readonly PIXEL_CROP_RIGHT = 0x54DD;

    /**
     * Indicate a Matroska Video Display Width EBML element.
     */
    public static readonly DISPLAY_WIDTH = 0x54B0;

    /**
     * Indicate a Matroska Video Display Height EBML element.
     */
    public static readonly DISPLAY_HEIGHT = 0x54BA;

    /**
     * Indicate a Matroska Video Display Unit EBML element.
     */
    public static readonly DISPLAY_UNIT = 0x54B2;

    /**
     * Indicate a Matroska Video Aspect Ratio Type EBML element.
     */
    public static readonly ASPECT_RATIO_TYPE = 0x54B3;

    /**
     * Indicate a Matroska Video Colour Space EBML element.
     */
    public static readonly COLOUR_SPACE = 0x2EB524;

    /**
     * Indicate a Matroska Video Gamma Value EBML element.
     */
    public static readonly GAMMA_VALUE = 0x2FB523;

    /**
     * Indicate a Matroska Video Frame Rate EBML element.
     */
    public static readonly FRAME_RATE = 0x2383E3;

    /**
     * Indicate a Matroska Track Audio EBML element.
     */
    public static readonly AUDIO = 0xE1;

    /**
     * Indicate a Matroska Audio Sampling Freq EBML element.
     */
    public static readonly SAMPLING_FREQ = 0xB5;

    /**
     * Indicate a Matroska Audio Output Sampling Freq EBML element.
     */
    public static readonly OUTPUT_SAMPLING_FREQ = 0x78B5;

    /**
     * Indicate a Matroska Audio Channels EBML element.
     */
    public static readonly CHANNELS = 0x9F;

    /**
     * Indicate a Matroska Audio Channels Position EBML element.
     */
    public static readonly CHANNELS_POSITIONS = 0x7D7B;

    /**
     * Indicate a Matroska Audio Bit Depth EBML element.
     */
    public static readonly BIT_DEPTH = 0x6264;

    /**
     * Indicate a Matroska Track Encoding EBML element.
     */
    public static readonly CONTENT_ENCODINGS = 0x6D80;

    // CUEING DATA ---------------------------------------------------------

    /**
     * Indicates a Matroska Cues EBML element.
     */
    public static readonly CUES = 0x1C53BB6B;

    // ATTACHMENT ----------------------------------------------------------

    /**
     * Indicates a Matroska Attachments EBML element.
     */
    public static readonly ATTACHMENTS = 0x1941A469;

    /**
     * Indicate a Matroska attached file.
     */
    public static readonly ATTACHED_FILE = 0x61A7;

    /**
     * Indicate a Matroska human-friendly name for the attached file.
     */
    public static readonly FILE_DESCRIPTION = 0x467E;

    /**
     * Indicate a Matroska Filename of the attached file.
     */
    public static readonly FILE_NAME = 0x466E;

    /**
     * Indicate a Matroska MIME type of the file.
     */
    public static readonly FILE_MIME_TYPE = 0x4660;

    /**
     * Indicate a Matroska data of the file.
     */
    public static readonly FILE_DATA = 0x465C;

    /**
     * Indicate a Matroska Unique ID representing the file, as random as possible.
     */
    public static readonly FILE_UID = 0x46AE;

    // CHAPTERS ------------------------------------------------------------

    /**
     * Indicates a Matroska Chapters EBML element.
     */
    public static readonly CHAPTERS = 0x1043A770;

    // TAGGING -------------------------------------------------------------

    /**
     * Indicates a Matroska Tags EBML element.
     */
    public static readonly TAGS = 0x1254C367;

    /**
     * Indicate a Matroska Tag EBML element.
     */
    public static readonly TAG = 0x7373;

    /**
     * Indicate a Matroska Targets EBML element.
     */
    public static readonly TARGETS = 0x63C0;

    /**
     * Indicate a Matroska Target Type Value  EBML element (UINT).
     */
    public static readonly TARGET_TYPE_VALUE = 0x68CA;

    /**
     * Indicate a Matroska Target Type EBML element (string).
     */
    public static readonly TARGET_TYPE = 0x63CA;

    /**
     * Indicate a Matroska Target Tag Track UID EBML element (UINT).
     */
    public static readonly TAG_TRACK_UID = 0x63C5;

    /**
     * Indicate a Matroska Target Tag Edition UID EBML element (UINT).
     */
    public static readonly TAG_EDITION_UID = 0x63C9;

    /**
     * Indicate a Matroska Target Tag Chapter UID EBML element (UINT).
     */
    public static readonly TAG_CHAPTER_UID = 0x63C4;

    /**
     * Indicate a Matroska Target Tag Attachment UID EBML element (UINT).
     */
    public static readonly TAG_ATTACHMENT_UID = 0x63C6;

    /**
     * Indicate a Matroska Simple Tag EBML element.
     */
    public static readonly SIMPLE_TAG = 0x67C8;

    /**
     * Indicate a Matroska Tag Name EBML element.
     */
    public static readonly TAG_NAME = 0x45A3;

    /**
     * Indicate a Matroska Tag Language EBML element.
     */
    public static readonly TAG_LANGUAGE = 0x447A;

    /**
     * Indicate a Matroska Tag Default EBML element.
     */
    public static readonly TAG_DEFAULT = 0x4484;

    /**
     * Indicate a Matroska Tag String EBML element.
     */
    public static readonly TAG_STRING = 0x4487;

    /**
     * Indicate a Matroska Tag Binary EBML element.
     */
    public static readonly TAG_BINARY = 0x4485;
}
