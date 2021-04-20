import {ByteVector} from "./byteVector";

/**
 * The type of content appearing in an {@link IPicture} instance.
 */
export enum PictureType {
    /**
     * @summary The picture is of a type other than those specified.
     */
    Other = 0x00,

    /**
     * @summary The picture is a 32x32 PNG image that should be used when displaying the file in a browser.
     */
    FileIcon = 0x01,

    /**
     * @summary The picture is of an icon different from {@link FileIcon}
     */
    OtherFileIcon = 0x02,

    /**
     * @summary The picture is of the front cover of the album.
     */
    FrontCover = 0x03,

    /**
     * @summary The picture is of the back cover of the album.
     */
    BackCover = 0x04,

    /**
     * @summary The picture is of a leaflet page including with the album.
     */
    LeafletPage = 0x05,

    /**
     * @summary The picture is of the album or disc itself.
     */
    Media = 0x06,

    /**
     * @summary The picture is of the lead artist or soloist.
     */
    LeadArtist = 0x07,

    /**
     * @summary The picture is of the artist or performer.
     */
    Artist = 0x08,

    /**
     * @summary The picture is of the conductor.
     */
    Conductor = 0x09,

    /**
     * @summary The picture is of the band or orchestra.
     */
    Band = 0x0A,

    /**
     * @summary The picture is of the composer.
     */
    Composer = 0x0B,

    /**
     * @summary The picture is of the lyricist or text writer.
     */
    Lyricist = 0x0C,

    /**
     * @summary The picture is of the recording location or studio.
     */
    RecordingLocation = 0x0D,

    /**
     * @summary The picture is one taken during the track's recording.
     */
    DuringRecording = 0x0E,

    /**
     * @summary The picture is one taken during the track's performance.
     */
    DuringPerformance = 0x0F,

    /**
     * @summary The picture is a capture from a movie screen.
     */
    MovieScreenCapture = 0x10,

    /**
     * @summary The picture is of a large, colored fish.
     */
    ColoredFish = 0x11,

    /**
     * @summary The picture is an illustration related to the track.
     */
    Illustration = 0x12,

    /**
     * @summary The picture contains the logo of the band or performer.
     */
    BandLogo = 0x13,

    /**
     * @summary The picture is the logo of the publisher or record
     */
    PublisherLogo = 0x14,

    /**
     * @summary In fact, this is not a Picture, but another file-type.
     */
    NotAPicture = 0xff
}

/**
 * Interface that provides generic information about a picture, including its contents, as used by
 * various formats.
 */
export interface IPicture {
    /**
     * Gets and sets the mime-type of the picture data stored in the current instance.
     */
    mimeType: string;

    /**
     * Gets and sets the type of the content visible in the picture stored in the current instance.
     */
    type: PictureType;

    /**
     * Gets and sets a filename of the picture stored in the current instance. Optional.
     */
    filename: string;

    /**
     * Gets and sets a description of the picture stored in the current instance. Optional.
     */
    description: string;

    /**
     * Gets and sets the picture data stored in the current instance.
     */
    data: ByteVector;
}