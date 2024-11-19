import VbrHeader from "./vbrHeader";
import {ByteVector, StringType} from "../byteVector";
import {File} from "../file";
import {ChannelMode, MpegVersion} from "./mpegEnums";
import {Guards, NumberUtils} from "../utils";

enum XingHeaderFlags {
    FrameCount = 0x01,
    FileSize = 0x02,
    TableOfContents = 0x04,
    VbrScale = 0x08,
}

/**
 * Information about a variable bitrate MPEG audio stream
 */
export default class XingHeader extends VbrHeader {
    private static readonly FILE_IDENTIFIER_CBR = ByteVector.fromString("Info", StringType.Latin1).makeReadOnly();
    private static readonly FILE_IDENTIFIER_VBR = ByteVector.fromString("Xing", StringType.Latin1).makeReadOnly();

    private constructor(totalFrames?: number, totalBytes?: number, durationSeconds?: number, bitrateBytes?: number) {
        super(totalFrames, totalBytes, durationSeconds, bitrateBytes);
    }

    public static fromFile(
        file: File,
        mpegHeaderPosition: number,
        mpegVersion: MpegVersion,
        mpegChannelMode: ChannelMode,
        samplesPerFrame: number,
        samplesPerSecond: number,
        fallbackFileSize: number
    ): XingHeader | undefined {
        Guards.truthy(file, "file");
        Guards.safeUint(mpegHeaderPosition, "mpegHeaderPosition");
        Guards.safeUint(samplesPerFrame, "samplesPerFrame");
        Guards.safeUint(samplesPerSecond, "samplesPerSecond");
        Guards.safeUint(fallbackFileSize, "fallbackFileSize");

        // Determine offset from MPEG header where Xing header should be
        const singleChannel = mpegChannelMode === ChannelMode.SingleChannel;
        const xingOffset = mpegVersion === MpegVersion.Version1
            ? (singleChannel ? 0x15 : 0x24)
            : (singleChannel ? 0x0D : 0x15);

        // Seek to position in the file and read Xing header data
        file.seek(mpegHeaderPosition + xingOffset);
        const xingData = file.readBlock(16);

        // Determine if there is a header here
        const isCbrHeader = xingData.startsWith(this.FILE_IDENTIFIER_CBR);
        const isVbrHeader = xingData.startsWith(this.FILE_IDENTIFIER_VBR);
        if (xingData.length !== 16 || (!isCbrHeader && !isVbrHeader)) {
            return undefined;
        }

        // We have a header, parse the header data
        const flags = xingData.get(7);
        let totalFrames: number;
        let totalBytes: number;

        let bufferPosition = 8
        if (NumberUtils.hasFlag(flags, XingHeaderFlags.FrameCount)) {
            totalFrames = xingData.subarray(bufferPosition, 4).toUint();
            bufferPosition += 4;
        }
        if (NumberUtils.hasFlag(flags, XingHeaderFlags.FileSize)) {
            totalBytes = xingData.subarray(bufferPosition, 4).toUint();
        }

        // NOTE: I spent a *long* time trying to sort this out. Lesson #1 don't fucking trust
        //    chatgpt. Xing header specification will only reliably provide the total frames of
        //    the file and the total size in bytes of the audio portion of the file. Bitrate must
        //    be calculated based on this.
        //    LAME adds an extension to the header with a bunch of junk. This includes the encoding
        //    method and *target* bitrate. However, these values are not traditionally used as the
        //    displayed bitrate and the actual average bitrate must still be calculated.
        // For details on the LAME header, see http://gabriel.mp3-tech.org/mp3infotag.html

        // @TODO Read the ENC_DELAY and ENC_PADDING fields to adjust total samples

        // Attempt to calculate duration if we can
        let durationSeconds: number;
        if (totalFrames) {
            durationSeconds = totalFrames * samplesPerFrame / samplesPerSecond;
        }

        // Attempt to calculate the bitrate if we can
        let bitrateBytes: number;
        if (isVbrHeader && totalFrames) {
            bitrateBytes = totalBytes
                ? (totalBytes * 8) / (totalFrames * samplesPerFrame / samplesPerSecond)
                : (fallbackFileSize * 8) / (totalFrames * samplesPerFrame / samplesPerSecond);
        }

        return new XingHeader(totalFrames, totalBytes, durationSeconds, bitrateBytes);
    }

    // /**
    //  * Constructs a new instance with a specified frame count and size.
    //  * @param frames Frame count of the audio
    //  * @param size Stream size of the audio
    //  */
    // public static fromInfo(frames: number, size: number): XingHeader {
    //     Guards.uint(frames, "frames");
    //     Guards.uint(size, "size");
    //
    //     const header = new XingHeader();
    //     header._totalFrames = frames;
    //     header._totalSize = size;
    //     return header;
    // }
}
