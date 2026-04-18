import {NumberUtils} from "./utils";

/**
 * Indicates the types o media represented by a {@link ICodec} or {@link Properties}. These values
 * can be combined to represent multiple media types.
 */
export enum MediaTypes {
    /**
     * No media is present
     */
    None = 0,

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
    Text = 8,

    /**
     * Lossless audio is present. This also implies audio is present.
     */
    LosslessAudio = 17
}

/**
 * Interface that provides basic information common to all media codecs
 */
// @TODO: Create a IDurationCodec that eliminates the need for undefined behavior in durationMilliseconds field.
export interface ICodec {
    /**
     * Gets a text description of the media represented by the current instance.
     */
    description: string;

    /**
     * Duration of the media in milliseconds represented by the current instance. `undefined` is
     * returned if the duration cannot be determined.
     */
    durationMilliseconds: number|undefined;

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

export class Properties implements ILosslessAudioCodec, IVideoCodec, IPhotoCodec {
    private readonly _codecs: ICodec[];
    private readonly _durationMilliseconds: number|undefined;

    /**
     * Constructs and initializes a new instance of {@link Properties} with the specified codecs and
     * duration.
     * @param durationMilliseconds Duration of the media in milliseconds or `undefined` if the
     *     duration is to be read from the codecs. O
     * @param codecs Array of codecs to be used in the new instance.
     */
    public constructor(durationMilliseconds: number|undefined, codecs: ICodec[] = []) {
        this._durationMilliseconds = durationMilliseconds;
        this._codecs = codecs;
    }

    /**
     * Gets the codecs contained in the current instance.
     * @remarks
     *     The list of codecs should not be modified. As such, the returned codec list is a
     *     copy of codec list stored in this instance.
     */
    public get codecs(): ICodec[] { return this._codecs.slice(); }

    //#region ICodec

    /**
     * @inheritDoc
     * @remarks Values are joined by semicolons.
     */
    public get description(): string {
        const descriptions = this._codecs.map((codec) => codec.description);
        return descriptions.join("; ");
    }

    /**
     * @inheritDoc
     * @remarks If the file set the duration, that value is used. Otherwise, the largest duration
     *     of the codecs in the file is returned. If no codecs can provide a duration, `undefined`
     *     is returned.
     */
    // @TODO: Does it make sense to have a duration at the properties level, or should it always come from the codecs?
    public get durationMilliseconds(): number|undefined {
        // If the file provided duration, use that instead
        if (this._durationMilliseconds !== undefined) { return this._durationMilliseconds; }

        // Find codecs that have durations, and then pick the max of those.
        const durationCodecs = this._codecs.filter(codec => codec.durationMilliseconds !== undefined);
        if (durationCodecs.length === 0) { return undefined; }

        return durationCodecs.reduce((maxDuration, codec) => Math.max(maxDuration, codec.durationMilliseconds!), 0);
    }

    /**
     * @inheritDoc
     */
    public get mediaTypes(): MediaTypes {
        return this._codecs.reduce((types, codec) => types | codec.mediaTypes, MediaTypes.None);
    }

    //#endregion

    // @TODO: The below fields return 0 if an appropriate codec cannot be found. It'd be better to just
    //     not expose the fields if, eg, it's a audio file and video properties are exposed.

    //#region ILosslessAudioCodec

    /**
     * Gets the bitrate of the audio represented by the current instance. This value is equal to
     * the first non-zero audio bitrate, or zero if no codecs with audio information were found.
     */
    public get audioBitrate(): number {
        return this.findCodecProperty<IAudioCodec>(MediaTypes.Audio, (c) => c.audioBitrate, 0);
    }

    /**
     * Gets the number of channels in the audio represented by the current instance.
     */
    public get audioChannels(): number {
        return this.findCodecProperty<IAudioCodec>(MediaTypes.Audio, (c) => c.audioChannels, 0);
    }

    /**
     * Gets the sample rate of the audio represented by the current instance. This value is equal
     * to the first non-zero audio bitrate, or zero if no audio codecs were found.
     */
    public get audioSampleRate(): number {
        return this.findCodecProperty<IAudioCodec>(MediaTypes.Audio, (c) => c.audioSampleRate, 0);
    }

    /**
     * Gets the number of bits per sample in the audio represented by the current instance. This
     * value is equal to the first non-zero quantization, or zero if no lossless audio codecs were
     * found in the current instance.
     */
    public get bitsPerSample(): number {
        return this.findCodecProperty<ILosslessAudioCodec>(MediaTypes.LosslessAudio, (c) => c.bitsPerSample, 0);
    }

    //#endregion

    //#region IPhotoCodec

    /**
     * Gets the height of the photo in pixels represented by the current instance.
     */
    public get photoHeight(): number {
        return this.findCodecProperty<IPhotoCodec>(MediaTypes.Photo, (c) => c.photoHeight, 0);
    }

    /**
     * Gets the format-specific quality identifier of the photo represented by the current
     * instance. A value of `0` means that there was no quality indicator for the format or file.
     */
    public get photoQuality(): number {
        return this.findCodecProperty<IPhotoCodec>(MediaTypes.Photo, (c) => c.photoQuality, 0);
    }

    /**
     * Gets the width of the photo in pixels represented by the current instance.
     */
    public get photoWidth(): number {
        return this.findCodecProperty<IPhotoCodec>(MediaTypes.Photo, (c) => c.photoWidth, 0);
    }

    //#endregion

    //#region IVideoCodec

    /**
     * Gets the height of the video represented by the current instance.
     * This value is equal to the first non-zero video height;
     */
    public get videoHeight(): number {
        return this.findCodecProperty<IVideoCodec>(MediaTypes.Video, (c) => c.videoHeight, 0);
    }

    /**
     * Gets the width of the video represented by the current instance.
     * This value is equal to the first non-zero video height.
     */
    public get videoWidth(): number {
        return this.findCodecProperty<IVideoCodec>(MediaTypes.Video, (c) => c.videoWidth, 0);
    }

    // @TODO: Add support for framerate

    //#endregion

    //#region Private Helpers

    private findCodecProperty<TCodec extends ICodec>(
        mediaType: MediaTypes,
        property: (codec: TCodec) => number,
        defaultValue: number
    ): number {
        const codec = this._codecs.find((e) => !!e && NumberUtils.hasFlag(e.mediaTypes, mediaType));
        return codec
            ? property(<TCodec> codec) || defaultValue
            : defaultValue;
    }

    //#endregion
}
