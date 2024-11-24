export default abstract class VbrHeader {
    private readonly _bitrateKilobytes: number | undefined;
    private readonly _durationMilliseconds: number | undefined;
    private readonly _totalFrames: number | undefined;
    private readonly _totalBytes: number | undefined;

    protected constructor(
        totalFrames?: number,
        totalBytes?: number,
        durationSeconds?: number,
        bitrateBytes?: number
    ) {
        this._totalFrames = totalFrames;
        this._totalBytes = totalBytes;
        this._durationMilliseconds = durationSeconds ? durationSeconds * 1000 : undefined;
        this._bitrateKilobytes = bitrateBytes ? Math.floor(bitrateBytes / 1000) : undefined;
    }

    /**
     * Gets the bitrate of the ile in kilobytes per second, if it could be calculated using the
     * current instance. `undefined`, otherwise.
     */
    public get bitrateKilobytes(): number | undefined { return this._bitrateKilobytes; }

    /**
     * Gets the duration of the file in milliseconds, if it could be calculated using the current
     * instance. `undefined`, otherwise.
     */
    public get durationMilliseconds(): number | undefined { return this._durationMilliseconds; }

    /**
     * Gets the total number of frames in the file, as indicated by the current instance.
     */
    public get totalFrames(): number | undefined { return this._totalFrames; }

    /**
     * Gets the total size of the file in bytes, as indicated by the current instance.
     */
    public get totalBytes(): number | undefined { return this._totalBytes;}
}