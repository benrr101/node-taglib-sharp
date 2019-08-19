export enum HeaderFlags {
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
     * The tag described by the header has been desynchronized.
     */
    Unsynchronication = 0x80,
}
