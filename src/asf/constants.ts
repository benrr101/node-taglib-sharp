import UuidWrapper from "../uuidWrapper";

/**
 * Enum of different types of objects that are part of the ASF specification
 */
export enum ObjectType {
    UnknownObject = 0,
    HeaderObject,
    FilePropertiesObject,
    StreamPropertiesObject,
    HeaderExtensionObject,
    CodecListObject,
    ScriptCommandObject,
    MarkerObject,
    BitrateMutualExclusionObject,
    ErrorCorrectionObject,
    ContentDescriptionObject,
    ExtendedContentDescriptionObject,
    StreamBitratePropertiesObject,
    ContentBrandingObject,
    ContentEncryptionObject,
    ExtendedContentEncryptionObject,
    DigitalSignatureObject,
    PaddingObject,
    ExtendedStreamPropertiesObject,
    AdvancedMutualExclusionObject,
    GroupMutualExclusionObject,
    StreamPrioritizationObject,
    BandwidthSharingObject,
    LanguageListObject,
    MetadataObject,
    MetadataLibraryObject,
    IndexParametersObject,
    MediaObjectIndexParametersObject,
    TimecodeIndexParametersObject,
    CompatibilityObject,
    AdvancedContentEncryptionObject
}

/**
 * GUIDs used to identify objects within an ASF file.
 */
export class Guids {
    /**
     * Indicates that an object is a {@link ContentDescriptionObject}.
     */
    public static readonly AsfContentDescriptionObject =
        new UuidWrapper("75B22633-668E-11CF-A6D9-00AA0062CE6C");

    /**
     * Indicates that an object is a {@link ExtendedContentDescriptionObject}.
     */
    public static readonly AsfExtendedContentDescriptionObject =
        new UuidWrapper("D2D0A440-E307-11D2-97F0-00A0C95EA850");

    /**
     * Indicates that an object is a {@link FilePropertiesObject}.
     */
    public static readonly AsfFilePropertiesObject =
        new UuidWrapper("8CABDCA1-A947-11CF-8EE4-00C00C205365");

    /**
     * Indicates that an object is a {@link HeaderExtensionObject}.
     */
    public static readonly AsfHeaderExtensionObject =
        new UuidWrapper("5FBF03B5-A92E-11CF-8EE3-00C00C205365");

    /**
     * Indicates that an object is a {@link HeaderObject}.
     */
    public static readonly AsfHeaderObject =
        new UuidWrapper("75B22630-668E-11CF-A6D9-00AA0062CE6C");

    /**
     * Indicates that an object is a {@link MetadataLibraryObject}.
     */
    public static readonly AsfMetadataLibraryObject =
        new UuidWrapper("44231C94-9498-49D1-A141-1D134E457054");

    /**
     * Indicates that an object is a {@link PaddingObject}.
     */
    public static readonly AsfPaddingObject =
        new UuidWrapper("1806D474-CADF-4509-A4BA-9AABCB96AAE8");

    /**
     * Indicates that an object is a {@link StreamPropertiesObject}.
     */
    public static readonly AsfStreamPropertiesObject =
        new UuidWrapper("B7DC0791-A9B7-11CF-8EE6-00C00C205365");

    /**
     * Indicates that a {@link StreamPropertiesObject} contains information about an audio stream.
     */
    public static readonly AsfAudioMedia =
        new UuidWrapper("F8699E40-5B4D-11CF-A8FD-00805F5C442B");

    /**
     * Indicates that a {@link StreamPropertiesObject} contains information about an video stream.
     */
    public static readonly AsfVideoMedia =
        new UuidWrapper("BC19EFC0-5B4D-11CF-A8FD-00805F5C442B");

    /**
     * Indicates a placeholder portion of a file is correctly encoded.
     */
    public static readonly AsfReserved1 =
        new UuidWrapper("ABD3D211-A9BA-11cf-8EE6-00C00C205365");
}
