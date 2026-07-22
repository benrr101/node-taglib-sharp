/**
 * Type of channel data to get from or set to a {@link RelativeVolumeFrame} object
 */
export enum ChannelType {
    /**
     * Channel data for some other speaker
     */
    Other = 0x00,

    /**
     * Channel data for the master volume
     */
    MasterVolume = 0x01,

    /**
     * Channel data for the front right speaker
     */
    FrontRight = 0x02,

    /**
     * Channel data for front left speaker
     */
    FrontLeft = 0x03,

    /**
     * Channel data for center right speaker
     */
    BackRight = 0x04,

    /**
     * Channel data for back left speaker
     */
    BackLeft = 0x05,

    /**
     * Channel data for front center speaker
     */
    FrontCentre = 0x06,

    /**
     * Channel data for back center speaker
     */
    BackCenter = 0x07,

    /**
     * Channel data for subwoofer
     */
    Subwoofer = 0x08
}

/**
 * Indicates what type of event the event represents.
 */
export enum EventType {
    /**
     * Padding - no meaning
     */
    Padding = 0x00,

    /**
     * End of initial silence
     */
    EndOfInitialSilence = 0x01,

    /**
     * Start of the intro
     */
    IntroStart = 0x02,

    /**
     * Start of the main part of the song
     */
    MainPartStart = 0x03,

    /**
     * Start of the outro
     */
    OutroStart = 0x04,

    /**
     * End of the outro
     */
    OutroEnd = 0x05,

    /**
     * Start of the verse
     */
    VerseStart = 0x06,

    /**
     * Start of the refrain
     */
    RefrainStart = 0x07,

    /**
     * Start of the interlude
     */
    InterludeStart = 0x08,

    /**
     * Start of the theme
     */
    ThemeStart = 0x09,

    /**
     * Start of a variation
     */
    VariationStart = 0x0A,

    /**
     * Indicates a key change event
     */
    KeyChange = 0x0B,

    /**
     * Indicates a tempo/time signature change event
     */
    TimeChange = 0x0C,

    /**
     * Indicates momentary unwanted noise (snap, crackle, and pop)
     */
    MomentaryUnwantedNoise = 0x0D,

    /**
     * Start of sustained noise
     */
    SustainedNoise = 0x0E,

    /**
     * End of sustained noise
     */
    SustainedNoiseEnd = 0x0F,

    /**
     * End of the intro
     */
    IntroEnd = 0x10,

    /**
     * End of the main part of the song
     */
    MainPartEnd = 0x11,

    /**
     * End of the verse
     */
    VerseEnd = 0x12,

    /**
     * End of the refrain
     */
    RefrainEnd = 0x13,

    /**
     * End of the main theme
     */
    ThemeEnd = 0x14,

    /**
     * Start of profanity
     */
    Profanity = 0x15,

    /**
     * End of profanity
     */
    ProfanityEnd = 0x16,

    /**
     * End of audio
     */
    AudioEnd = 0xFD,

    /**
     * End of the audio file
     */
    AudioFileEnd = 0xFE
}

/**
 * Indicates the flags applied to a {@link Id3v2FrameHeader} object.
 */
export enum FrameFlags {
    /**
     * Header contains no flags.
     */
    None = 0,

    /**
     * Frame is to be deleted if the tag is altered.
     */
    TagAlterPreservation = 0x4000,

    /**
     * Frame is to be deleted if the file is altered.
     */
    FileAlterPreservation = 0x2000,

    /**
     * Frame is read-only and should not be altered.
     */
    ReadOnly = 0x1000,

    /**
     * Frame has a grouping identity.
     */
    GroupingIdentity = 0x0040,

    /**
     * Frame data is compressed.
     */
    Compression = 0x0008,

    /**
     * Frame data is encrypted.
     */
    Encryption = 0x0004,

    /**
     * Frame data has been unsynchronized using the ID3v2 unsynchronization scheme.
     */
    Unsynchronized = 0x0002,

    /**
     * Frame has a data length indicator.
     */
    DataLengthIndicator = 0x0001
}

/**
 * Indicates the flags applied to a {@link Id3v2TagHeader} object.
 */
export enum TagFlags {
    /**
     * The header contains no flags.
     */
    None = 0x0,

    /**
     * The tag described by the header contains a footer.
     */
    FooterPresent = 0x10,

    /**
     * The tag described by the header is experimental.
     */
    ExperimentalIndicator = 0x20,

    /**
     * The tag described by the header contains an extended header.
     */
    ExtendedHeader = 0x40,

    /**
     * The tag described by the header has been unsynchronized using the ID3v2 unsynchronization
     * scheme.
     */
    Unsynchronization = 0x80,
}

/**
 * Indicates a major version of ID3v2.
 */
export enum Id3v2Version {
    /**
     * Indicates the ID3v2.2 version.
     */
    V22 = 1,

    /**
     * Indicates the ID3v2.3 version.
     */
    V23 = 2,

    /**
     * Indicates the ID3v2.4 version.
     */
    V24 = 4
}

/**
 * Specifies the type of text contained in a synchronized lyrics frame
 */
export enum SynchronizedTextType {
    /**
     * Text is some other type of text
     */
    Other = 0x00,

    /**
     * Text contains lyrical data
     */
    Lyrics = 0x01,

    /**
     * Text contains a transcription
     */
    TextTranscription = 0x02,

    /**
     * Text lists the movements in the piece
     */
    Movement = 0x03,

    /**
     * Text describes events that occur
     */
    Events = 0x04,

    /**
     * Text contains chord changes that occur in the music
     */
    Chord = 0x05,

    /**
     * Text contains trivia or "pop up" information about the media
     */
    Trivia = 0x06,

    /**
     * Text contains URLs for relevant webpages
     */
    WebpageUrls = 0x07,

    /**
     * Text contains URLs for relevant images
     */
    ImageUrls = 0x08
}

/**
 * Specifies the timestamp format used by a few frame types.
 */
export enum TimestampFormat {
    /**
     * Timestamp is of unknown format
     */
    Unknown = 0x00,

    /**
     * Timestamp represents the number of MPEG frames since the beginning of the audio stream
     */
    AbsoluteMpegFrames = 0x01,

    /**
     * Timestamp represents the number of milliseconds since the beginning of the audio stream
     */
    AbsoluteMilliseconds = 0x02
}
