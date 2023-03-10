import UuidWrapper from "../uuidWrapper";

/**
 * Enum of different types of objects that are part of the ASF specification
 */
export enum ObjectType {
    /**
     * Indicates the type of the object is not known.
     */
    UnknownObject = 0,

    /**
     * Indicates that the object is a {@link HeaderObject}.
     */
    HeaderObject,

    /**
     * Indicates that the object is a {@link FilePropertiesObject}.
     */
    FilePropertiesObject,

    /**
     * Indicates that the object is a {@link StreamPropertiesObject}.
     */
    StreamPropertiesObject,

    /**
     * Indicates that the object is a {@link HeaderExtensionObject}.
     */
    HeaderExtensionObject,

    /**
     * Indicates that the object is a codec list object.
     */
    CodecListObject,

    /**
     * Indicates that the object is a script command object.
     */
    ScriptCommandObject,

    /**
     * Indicates that the object is a marker object.
     */
    MarkerObject,

    /**
     * Indicates that the object is a bitrate mutual exclusion object.
     */
    BitrateMutualExclusionObject,

    /**
     * Indicates that the object is an error correction object.
     */
    ErrorCorrectionObject,

    /**
     * Indicates that an object is a {@link ContentDescriptionObject}.
     */
    ContentDescriptionObject,

    /**
     * Indicates that an object is a {@link ExtendedContentDescriptionObject}.
     */
    ExtendedContentDescriptionObject,

    /**
     * Indicates that an object is a stream bitrate properties object.
     */
    StreamBitratePropertiesObject,

    /**
     * Indicates that an object is a content branding object.
     */
    ContentBrandingObject,

    /**
     * Indicates that an object is a content encryption object.
     */
    ContentEncryptionObject,

    /**
     * Indicates that an object is an extended content encryption object.
     */
    ExtendedContentEncryptionObject,

    /**
     * Indicates that an object is a digital signature object.
     */
    DigitalSignatureObject,

    /**
     * Indicates that an object is a {@link PaddingObject}.
     */
    PaddingObject,

    /**
     * Indicates that an object is an extended stream properties object.
     */
    ExtendedStreamPropertiesObject,

    /**
     * Indicates that the object is an advanced mutual exclusion object.
     */
    AdvancedMutualExclusionObject,

    /**
     * Indicates that the object is a group mutual exclusion object.
     */
    GroupMutualExclusionObject,

    /**
     * Indicates that the object is a stream prioritization object.
     */
    StreamPrioritizationObject,

    /**
     * Indicates that the object is a bandwidth sharing object.
     */
    BandwidthSharingObject,

    /**
     * Indicates that the object is a language list object.
     */
    LanguageListObject,

    /**
     * Indicates that the object is a metadata object.
     */
    MetadataObject,

    /**
     * Indicates that the object is a metadata library object.
     */
    MetadataLibraryObject,

    /**
     * Indicates that the object is an index parameters object.
     */
    IndexParametersObject,

    /**
     * Indicates that the object is a media object index parameters object.
     */
    MediaObjectIndexParametersObject,

    /**
     * Indicates that the object is a timecode index parameters object.
     */
    TimecodeIndexParametersObject,

    /**
     * Indicates that the object is a compatibility object.
     */
    CompatibilityObject,

    /**
     * Indicates that the object is an advanced content encryption object.
     */
    AdvancedContentEncryptionObject
}

/**
 * GUIDs used to identify objects within an ASF file.
 */
export class Guids {
    /**
     * Indicates that an object is a {@link ContentDescriptionObject}.
     */
    public static readonly ASF_CONTENT_DESCRIPTION_OBJECT =
        new UuidWrapper("75B22633-668E-11CF-A6D9-00AA0062CE6C");

    /**
     * Indicates that an object is a {@link ExtendedContentDescriptionObject}.
     */
    public static readonly ASF_EXTENDED_CONTENT_DESCRIPTION_OBJECT =
        new UuidWrapper("D2D0A440-E307-11D2-97F0-00A0C95EA850");

    /**
     * Indicates that an object is a {@link FilePropertiesObject}.
     */
    public static readonly ASF_FILE_PROPERTIES_OBJECT =
        new UuidWrapper("8CABDCA1-A947-11CF-8EE4-00C00C205365");

    /**
     * Indicates that an object is a {@link HeaderExtensionObject}.
     */
    public static readonly ASF_HEADER_EXTENSION_OBJECT =
        new UuidWrapper("5FBF03B5-A92E-11CF-8EE3-00C00C205365");

    /**
     * Indicates that an object is a {@link HeaderObject}.
     */
    public static readonly ASF_HEADER_OBJECT =
        new UuidWrapper("75B22630-668E-11CF-A6D9-00AA0062CE6C");

    /**
     * Indicates that an object is a {@link MetadataLibraryObject}.
     */
    public static readonly ASF_METADATA_LIBRARY_OBJECT =
        new UuidWrapper("44231C94-9498-49D1-A141-1D134E457054");

    /**
     * Indicates that an object is a {@link PaddingObject}.
     */
    public static readonly ASF_PADDING_OBJECT =
        new UuidWrapper("1806D474-CADF-4509-A4BA-9AABCB96AAE8");

    /**
     * Indicates that an object is a {@link StreamPropertiesObject}.
     */
    public static readonly ASF_STREAM_PROPERTIES_OBJECT =
        new UuidWrapper("B7DC0791-A9B7-11CF-8EE6-00C00C205365");

    /**
     * Indicates that a {@link StreamPropertiesObject} contains information about an audio stream.
     */
    public static readonly ASF_AUDIO_MEDIA =
        new UuidWrapper("F8699E40-5B4D-11CF-A8FD-00805F5C442B");

    /**
     * Indicates that a {@link StreamPropertiesObject} contains information about a video stream.
     */
    public static readonly ASF_VIDEO_MEDIA =
        new UuidWrapper("BC19EFC0-5B4D-11CF-A8FD-00805F5C442B");

    /**
     * Indicates a placeholder portion of a file is correctly encoded.
     */
    public static readonly ASF_RESERVED =
        new UuidWrapper("ABD3D211-A9BA-11cf-8EE6-00C00C205365");
}
