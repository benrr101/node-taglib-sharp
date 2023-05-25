/**
 * Enumeration of types of boxes.
 */
export enum Mpeg4BoxClassType {
    /**
     * Indicates the box is an AppleAdditionalInfoBox.
     */
    AppleAdditionalInfoBox,
    /**
     * Indicates the box is an AppleAnnotationBox.
     */
    AppleAnnotationBox,
    /**
     * Indicates the box is an AppleDataBox.
     */
    AppleDataBox,
    /**
     * Indicates the box is an AppleElementaryStreamDescriptor.
     */
    AppleElementaryStreamDescriptor,
    /**
     * Indicates the box is an AppleItemListBox.
     */
    AppleItemListBox,
    /**
     * Indicates the box is an IsoSampleEntry.
     */
    IsoSampleEntry,
    /**
     * Indicates the box is an IsoAudioSampleEntry.
     */
    IsoAudioSampleEntry,
    /**
     * Indicates the box is an IsoChunkLargeOffsetBox.
     */
    IsoChunkLargeOffsetBox,
    /**
     * Indicates the box is an IsoChunkOffsetBox.
     */
    IsoChunkOffsetBox,
    /**
     * Indicates the box is an IsoFreeSpaceBox.
     */
    IsoFreeSpaceBox,
    /**
     * Indicates the box is an IsoHandlerBox.
     */
    IsoHandlerBox,
    /**
     * Indicates the box is an IsoMetaBox.
     */
    IsoMetaBox,
    /**
    * Indicates the box is an IsoMovieHeaderBox.
    */
    IsoMovieHeaderBox,
    /**
     * Indicates the box is an IsoSampleDescriptionBox.
     */
    IsoSampleDescriptionBox,
    /**
     * Indicates the box is an IsoSampleTableBox.
     */
    IsoSampleTableBox,
    /**
     * Indicates the box is an IsoUserDataBox.
     */
    IsoUserDataBox,
    /**
     * Indicates the box is an IsoVisualSampleEntry.
     */
    IsoVisualSampleEntry,
    /**
     * Indicates the box is an TextBox.
     */
    TextBox,
    /**
     * Indicates the box is an UnknownBox.
     */
    UnknownBox,
    /**
     * Indicates the box is an UrlBox.
     */
    UrlBox,
}