/**
 * Indicates the types o media represented by a {@link ICodec} or {@link Properties}. These values
 * can be combined to represent multiple media types.
 */
export enum MediaTypes {
    /**
     * No media is present
     */
    None  = 0,

    /**
     * Audio is present
     */
    Audio = 1,

    /**
     * Video is present
     */
    Video = 2,

    /**
     * A photo is present
     */
    Photo = 4,

    /**
     * Text is present
     */
    Text  = 8,

    /**
     * Lossless audio is present. This also implies audio is present.
     */
    LosslessAudio = 17
}

/**
 * Interface that provides basic information common to all media codecs
 */
export interface ICodec {
    /**
     * Gets a text description of the media represented by the current instance.
     */
    description: string;

    /**
     * Duration of the media in milliseconds represented by the current instance.
     * @TODO Ensure milliseconds is the right way to interpret this field
     */
    durationMilliseconds: number;

    /**
     * Types of media represented by the current instance, bitwise combined.
     */
    mediaTypes: MediaTypes;
}

/**
 * Interface that inherits the common codec information and adds audio-specific information.
 * When dealing with an {@link ICodec}, if {@link ICodec.mediaTypes} contains
 * {@link MediaTypes.Audio}, it is safe to assume that the object also inherits {@link IAudioCodec}
 * and can be recast without issue.
 */
export interface IAudioCodec extends ICodec {
    /**
     * Bitrate of the audio in kilobits per second represented by the current instance.
     */
    audioBitrate: number;

    /**
     * Number of channels in the audio represented by the current instance.
     */
    audioChannels: number;

    /**
     * Sample rate of the audio represented by the current instance.
     */
    audioSampleRate: number;
}

/**
 * This interface provides information specific to lossless audio codecs.
 * When dealing with an {@link ICodec}, if {@link ICodec.mediaTypes} contains
 * {@link MediaTypes.LosslessAudio}, it is safe to assume that the object also inherits
 * {@link ILosslessAudioCodec} and can be recast without issue.
 */
export interface ILosslessAudioCodec extends IAudioCodec {
    /**
     * Number of bits per sample in the audio represented by the current instance.
     */
    bitsPerSample: number;
}

/**
 * Interface that inherits the common codec information and adds video-specific information.
 * When dealing with an {@link ICodec}, if {@link ICodec.mediaTypes} contains
 * {@link MediaTypes.Video}, it is safe to assume that the object also inherits {@link IVideoCodec}
 * and can be recast without issue.
 */
export interface IVideoCodec extends ICodec {
    /**
     * Height of the video in pixels represented by the current instance.
     */
    videoHeight: number;

    /**
     * Width of the video in pixels represented by the current instance.
     */
    videoWidth: number;
}

/**
 * Interface that inherits the common codec information and adds photo-specific information.
 * When dealing with an {@link ICodec}, if {@link ICodec.mediaTypes} contains
 * {@link MediaTypes.Photo}, it is safe to assume that the object also inherits {@link IPhotoCodec}
 * and can be recast without issue.
 */
export interface IPhotoCodec extends ICodec {
    /**
     * Height of the photo in pixels represented by the current instance.
     */
    photoHeight: number;

    /**
     * Format-specific quality indicator of the photo represented by the current instance.
     * A value of `0` means there was no quality indicator for the format or file.
     */
    photoQuality: number;

    /**
     * Width of the photo in pixels represented by the current instance.
     */
    photoWidth: number;
}
