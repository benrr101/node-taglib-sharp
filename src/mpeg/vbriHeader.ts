import VbrHeader from "./vbrHeader";
import {ByteVector, StringType} from "../byteVector";
import {File} from "../file";
import {Guards} from "../utils";

/**
 * Information about a variable bitrate MPEG audio stream encoded by the Fraunhofer encoder
 */
export default class VbriHeader extends VbrHeader {
    private static readonly FILE_IDENTIFIER = ByteVector.fromString("VBRI", StringType.Latin1).makeReadOnly();
    private static readonly HEADER_OFFSET = 0x24;

    private constructor(totalFrames: number, totalBytes: number, durationSeconds: number, bitrateBytes: number) {
        super(totalFrames, totalBytes, durationSeconds, bitrateBytes);
    }

    public static fromFile(file: File, mpegHeaderPosition: number, samplesPerFrame: number, samplesPerSecond: number) {
        Guards.truthy(file, "files");
        Guards.safeUint(mpegHeaderPosition, "mpegHeaderPosition");
        Guards.safeUint(samplesPerFrame, "samplesPerFrame");
        Guards.safeUint(samplesPerSecond, "samplesPerSecond");

        // Seek to the position in the file where the VBRI header should be and read it
        file.seek(mpegHeaderPosition + this.HEADER_OFFSET);

        const vbriData = file.readBlock(24);
        if (vbriData.length !== 24 || !vbriData.startsWith(this.FILE_IDENTIFIER)) {
            return undefined;
        }

        // Parse the header
        const totalBytes = vbriData.subarray(10, 4).toUint();
        const totalFrames = vbriData.subarray(14, 4).toUint();

        // @TODO: Subtract delay from total total samples calculation

        // Calculate the rest of the values
        const bitrateBytes = (totalBytes * 8) / (totalFrames * samplesPerFrame / samplesPerSecond);
        const durationSeconds = totalFrames * samplesPerFrame / samplesPerSecond;

        return new VbriHeader(totalFrames, totalBytes, durationSeconds, bitrateBytes);
    }

    // /**
    //  * Constructs a new instance with a specified frame count and size.
    //  * @param frames Frame count of the audio
    //  * @param size Stream size of the audio
    //  */
    // public static fromInfo(frames: number, size: number): VbriHeader {
    //     Guards.uint(frames, "frame");
    //     Guards.uint(size, "size");
    //
    //     const header = new VbriHeader();
    //     header._isPresent = false;
    //     header._totalFrames = frames;
    //     header._totalSize = size;
    //     return header;
    // }
}
