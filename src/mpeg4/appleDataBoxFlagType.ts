/**
 * Specifies the type of data contained in a box.
 */
export enum AppleDataBoxFlagType {
    /**
     * The box contains UTF-8 text.
     */
    ContainsText = 0x01,

    /**
     * The box contains binary data.
     */
    ContainsData = 0x00,

    /**
     * The box contains data for a tempo box.
     */
    ForTempo = 0x15,

    /**
     * The box contains a raw JPEG image.
     */
    ContainsJpegData = 0x0d,

    /**
     * The box contains a raw PNG image.
     */
    ContainsPngData = 0x0e,

    /**
     * The box contains a raw BMP image.
     */
    ContainsBmpData = 0x1b,
}
