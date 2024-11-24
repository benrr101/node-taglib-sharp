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
 * Information about a Xing variable bitrate MPEG audio stream. This provides a much more accurate
 * determination of bitrate and duration than just using the first MPEG frame header alone.
 *
 * @remarks There is a tiny, known bug in this implementation. According to Hydrogenaudio, for LAME
 *     v3.99.1, they tried to change the version string to start with L instead of LAME. This was
 *     rolled back in v3.99.2 due to backwards compat issues with decoders. However, to simplify
 *     the code here, I've just decided to only check for LAME. Thus, for files encoded with this
 *     broken version of LAME (or indeed with other encoders like Gogo), the file bitrate and
 *     duration will be slightly inaccurate.
 *     Please raise a GitHub issue if this is not good enough and make sure to say "I told you not
 *     to half-ass it, Ben".
 */
export default class XingHeader extends VbrHeader {
    private static readonly IDENTIFIER_CBR = ByteVector.fromString("Info", StringType.Latin1).makeReadOnly();
    private static readonly IDENTIFIER_LAME = ByteVector.fromString("LAME", StringType.Latin1).makeReadOnly();
    private static readonly IDENTIFIER_VBR = ByteVector.fromString("Xing", StringType.Latin1).makeReadOnly();
    private static readonly LAME_HEADER_LENGTH = 36;
    private static readonly XING_HEADER_LENGTH = 16;

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
        Guards.uint(samplesPerFrame, "samplesPerFrame", false);
        Guards.uint(samplesPerSecond, "samplesPerSecond", false);
        Guards.safeUint(fallbackFileSize, "fallbackFileSize");

        // Determine offset from MPEG header where Xing header should be
        const singleChannel = mpegChannelMode === ChannelMode.SingleChannel;
        const xingOffset = mpegVersion === MpegVersion.Version1
            ? (singleChannel ? 0x15 : 0x24)
            : (singleChannel ? 0x0D : 0x15);

        // Seek to position in the file and read Xing header data
        file.seek(mpegHeaderPosition + xingOffset);
        const xingData = file.readBlock(this.XING_HEADER_LENGTH);

        // Determine if there is a header here
        const isCbrHeader = xingData.startsWith(this.IDENTIFIER_CBR);
        const isVbrHeader = xingData.startsWith(this.IDENTIFIER_VBR);
        if (xingData.length !== this.XING_HEADER_LENGTH || (!isCbrHeader && !isVbrHeader)) {
            // NOTE: It is possible though incredibly unlikely that the Xing header can technically
            //     be smaller than 16 bytes, if only one field is present. In this case, it's
            //     probably ok to just ignore the header.
            return undefined;
        }

        // We have a header, parse the header data
        const flags = xingData.get(7);
        let totalFrames: number;
        let totalBytes: number;

        let xingLength = 8
        if (NumberUtils.hasFlag(flags, XingHeaderFlags.FrameCount)) {
            totalFrames = xingData.subarray(xingLength, 4).toUint();
            xingLength += 4;
        }
        if (NumberUtils.hasFlag(flags, XingHeaderFlags.FileSize)) {
            totalBytes = xingData.subarray(xingLength, 4).toUint();
            xingLength += 4
        }
        if (NumberUtils.hasFlag(flags, XingHeaderFlags.TableOfContents)) {
            xingLength += 100;
        }
        if (NumberUtils.hasFlag(flags, XingHeaderFlags.VbrScale)) {
            xingLength += 4;
        }

        // NOTE: I spent a *long* time trying to sort this out. Lesson #1: don't fucking trust
        //    chatgpt. Xing header specification will only reliably provide the total frames of
        //    the file and the total size in bytes of the audio portion of the file. Bitrate must
        //    be calculated based on this.
        //    LAME adds an extension to the header with a bunch of junk. This includes the encoding
        //    method and *target* bitrate. However, these values are not traditionally used as the
        //    displayed bitrate and the actual average bitrate must still be calculated.
        // For details on the LAME header, see http://gabriel.mp3-tech.org/mp3infotag.html

        // Try to read LAME extensions to the Xing header
        file.seek(mpegHeaderPosition + xingOffset + xingLength);
        const lameData = file.readBlock(this.LAME_HEADER_LENGTH);

        let samplesAdjustment = 0;
        if (
            lameData.length === 36 &&
            lameData.startsWith(this.IDENTIFIER_LAME) &&
            lameData.find(ByteVector.fromByte(0xFF)) < 0 // No MPEG synchronization bytes found
        ) {
            const lameVersionString = lameData.subarray(0, 9).toString(StringType.Latin1);

            // [xxxxxxxx xxxxyyyy yyyyyyyy]
            // Where x is encoder delay and y is encoder padding
            const delayPadding = lameData.subarray(21, 3).toUint();
            const encoderDelay = NumberUtils.uintRShift(delayPadding, 12);
            const encoderPadding = NumberUtils.uintAnd(delayPadding, 0xFFF);
            samplesAdjustment = encoderDelay + encoderPadding;
        }

        // Calculate duration and bitrate based on the data we collected
        let durationSeconds: number;
        let bitrateBytes: number;
        if (totalFrames) {
            // We can calculate duration if we have total frames
            const totalSamples = (totalFrames * samplesPerFrame) - samplesAdjustment;
            durationSeconds = totalSamples / samplesPerSecond;

            // If we have a VBR encoded file, we should try to calculate bitrate
            if (isVbrHeader) {
                const streamBits = totalBytes ? (totalBytes * 8) : (fallbackFileSize * 8);
                bitrateBytes = streamBits / durationSeconds;
            }
        }

        return new XingHeader(totalFrames, totalBytes, durationSeconds, bitrateBytes);
    }
}
