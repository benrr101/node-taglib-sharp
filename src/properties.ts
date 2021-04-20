import {IAudioCodec, ICodec, ILosslessAudioCodec, IPhotoCodec, IVideoCodec, MediaTypes} from "./iCodec";


export default class Properties implements ILosslessAudioCodec, IVideoCodec, IPhotoCodec {
    private readonly _codecs: ICodec[];
    private readonly _duration: number;

    /**
     * Constructs and initializes a new instance of {@link Properties} with the specified codecs and
     * duration.
     * @param durationMilli Duration of the media in milliseconds or 0 if the duration is to be
     *        read from the codecs.
     * @param codecs Array of codecs to be used in the new instance.
     */
    public constructor(durationMilli: number = 0, codecs: ICodec[] = []) {
        this._duration = durationMilli;
        this._codecs = codecs;
    }

    /**
     * Gets the codecs contained in the current instance.
     * @remarks The list of codecs should not be modified. As such, the returned codec list is a
     *     copy of codec list stored in this instance.
     */
    public get codecs(): ICodec[] { return this._codecs.slice(); }

    // #region ICodec

    /**
     * Gets a string description of the media represented by the current instance. Values are
     * joined by semi-colons.
     */
    public get description(): string {
        const descriptions = this._codecs.filter((e) => !!e).map((e) => e.description);
        return descriptions.join("; ");
    }

    /**
     * Gets the duration of the media represented by the current instance. If the value was set in
     * the constructor, that value is returned, otherwise the longest codec duration is used.
     */
    public get durationMilliseconds(): number {
        if (this._duration !== 0) {
            return this._duration;
        }

        return this._codecs.filter((e) => !!e)
            .reduce((maxDuration, e) => Math.max(maxDuration, e.durationMilliseconds), 0);
    }

    /**
     * Gets the types of media represented by the current instance.
     */
    public get mediaTypes(): MediaTypes {
        return this._codecs.filter((e) => !!e).reduce((types, e) => types | e.mediaTypes, MediaTypes.None);
    }

    // #endregion

    // #region ILosslessAudioCodec

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

    // #endregion

    // #region IPhotoCodec

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

    // #endregion

    // #region IVideoCodec

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

    // #endregion

    // #region Private Helpers

    private findCodecProperty<TCodec extends ICodec>(
        mediaType: MediaTypes,
        property: (codec: TCodec) => number,
        defaultValue: number
    ): number {
        const codec = this._codecs.find((e) => !!e && (e.mediaTypes & mediaType) !== 0);
        return codec ? property(<TCodec> codec) : defaultValue;
    }

    // #endregion
}
