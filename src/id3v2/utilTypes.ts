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