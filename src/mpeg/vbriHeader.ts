import VbrHeader from "./vbrHeader";
import {ByteVector, StringType} from "../byteVector";
import {File} from "../file";
import {Guards} from "../utils";

/**
 * Information about a variable bitrate MPEG audio stream encoded by the Fraunhofer encoder
 */
export default class VbriHeader extends VbrHeader {
    private static readonly FILE_IDENTIFIER = ByteVector.fromString("VBRI", StringType.Latin1).makeReadOnly();
    private static readonly HEADER_OFFSET = 36;

    private constructor(totalFrames: number, totalBytes: number, durationSeconds: number, bitrateBytes: number) {
        super(totalFrames, totalBytes, durationSeconds, bitrateBytes);
    }

    public static fromFile(
        file: File,
        mpegHeaderPosition: number,
        samplesPerFrame: number,
        samplesPerSecond: number
    ): VbriHeader {
        Guards.truthy(file, "files");
        Guards.safeUint(mpegHeaderPosition, "mpegHeaderPosition");
        Guards.uint(samplesPerFrame, "samplesPerFrame");
        Guards.greaterThanInclusive(samplesPerFrame, 1, "samplesPerFrame");
        Guards.uint(samplesPerSecond, "samplesPerSecond");
        Guards.greaterThanInclusive(samplesPerSecond, 1, "samplesPerSecond");

        // Seek to the position in the file where the VBRI header should be and read it
        file.seek(mpegHeaderPosition + this.HEADER_OFFSET);

        const vbriData = file.readBlock(24);
        if (vbriData.length !== 24 || !vbriData.startsWith(this.FILE_IDENTIFIER)) {
            return undefined;
        }

        // Parse the header
        const delay = vbriData.subarray(6, 2).toUshort();
        const totalBytes = vbriData.subarray(10, 4).toUint();
        const totalFrames = vbriData.subarray(14, 4).toUint();

        // Calculate the rest of the values
        const totalSamples = (totalFrames * samplesPerFrame);
        const bitrateBytes = (totalBytes * 8) / (totalSamples / samplesPerSecond);
        const durationSeconds = (totalSamples - delay) / samplesPerSecond;

        return new VbriHeader(totalFrames, totalBytes, durationSeconds, bitrateBytes);
    }
}
