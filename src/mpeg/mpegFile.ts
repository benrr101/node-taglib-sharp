import MpegAudioHeader from "./mpegAudioHeader";
import MpegVideoHeader from "./mpegVideoHeader";
import NonContainerFile from "../nonContainer/nonContainerFile";
import NonContainerTag from "../nonContainer/nonContainerTag";
import Properties from "../properties";
import {ByteVector} from "../byteVector";
import {CorruptFileError, UnsupportedFormatError} from "../errors";
import {File, ReadStyle} from "../file";
import {IFileAbstraction} from "../fileAbstraction";
import {MpegVersion} from "./mpegEnums";
import {Tag, TagTypes} from "../tag";

/**
 * Indicates the type of marker found in an MPEG file.
 */
enum MpegFileMarker {
    /**
     * An invalid marker.
     */
    Corrupt = -1,

    /**
     * A zero value marker.
     */
    Zero = 0,

    /**
     * A marker indicating a system sync packet.
     */
    SystemSyncPacket = 0xBA,

    /**
     * A marker indicating a video sync packet.
     */
    VideoSyncPacket = 0xB3,

    /**
     * A marker indicating a system packet.
     */
    SystemPacket = 0xBB,

    /**
     * A marker indicating a padding packet.
     */
    PaddingPacket = 0xBE,

    /**
     * A marker indicating an audio packet.
     */
    AudioPacket = 0xC0,

    /**
     * A marker indicating a video packet.
     */
    VideoPacket = 0xE0,

    /**
     * A marker indicating the end of a stream.
     */
    EndOfStream = 0xB9
}

/**
 * This class extends {@link NonContainerFile} to provide tagging and properties support for
 * MPEG-1, MPEG-2, and MPEG-2.5 video files.
 * @remarks A {@link Id3v1Tag} and {@link Id3v2Tag} will be added automatically to any file that
 *     does not contain one. This change does not affect the file until it is saved and can be
 *     reversed using the following method:
 *     `file.removeTags(file.tagTypes & ~file.tagTypesOnDisk);`
 */
export default class MpegFile extends NonContainerFile {
    private static readonly _markerStart = ByteVector.fromByteArray(new Uint8Array([0, 0, 1]));

    private _audioFound = false;
    private _audioHeader: MpegAudioHeader;
    private _endTime: number;
    private _startTime: number | undefined;
    private _version: MpegVersion;
    private _videoFound = false;
    private _videoHeader: MpegVideoHeader;

    public constructor(file: IFileAbstraction|string, propertiesStyle: ReadStyle) {
        super(file, propertiesStyle);
    }

    /**
     * Gets a tag of a specified type from the current instance, optionally creating a new tag if
     * possible.
     * @remarks {@link Id3v2Tag}, {@link Id3v1Tag}, and {@link ApeTag} will be added to the end of
     *     the file. All other tag types will be ignored as they are unsupported by MPEG files.
     * @param type Type of tag to read
     * @param create Whether or not to try and create the tag if one is not found
     * @returns Tag Tag that was found in or added to the current instance. If no matching tag was
     *     found and none was created, `undefined` is returned.
     */
    public getTag(type: TagTypes, create: boolean): Tag {
        const tag = (<NonContainerTag> this.tag).getTag(type);
        if (tag || !create) {
            return tag;
        }

        switch (type) {
            case TagTypes.Id3v1:
                return this.endTag.addTag(type, this.tag);
            case TagTypes.Id3v2:
                return this.endTag.addTag(type, this.tag);
            case TagTypes.Ape:
                return this.endTag.addTag(type, this.tag);
            default:
                return undefined;
        }
    }

    /** @inheritDoc */
    protected readEnd(end: number, propertiesStyle: ReadStyle) {
        // Make sure we have ID3v1 and ID3v2 tags
        this.getTag(TagTypes.Id3v1, true);
        this.getTag(TagTypes.Id3v2, true);

        if ((propertiesStyle & ReadStyle.Average) === 0 || this._startTime === undefined) {
            return;
        }

        // Enable to search the marker in the entire file if non are found so far
        if (end === this.length) {
            end = 0;
        }

        end = this.rFindMarkerPosition(end, MpegFileMarker.SystemSyncPacket);
        this._endTime = this.readTimestamp(end + 4);
    }

    /** @inheritDoc */
    protected readProperties(start: number, end: number, propertiesStyle: ReadStyle): Properties {
        const durationMilliseconds = this._startTime === undefined
            ? 0
            : (this._endTime - this._startTime) * 1000;
        return new Properties(durationMilliseconds, [this._videoHeader, this._audioHeader]);
    }

    /** @inheritDoc */
    protected readStart(start: number, propertiesStyle: ReadStyle): void {
        if ((propertiesStyle & ReadStyle.Average) === 0) {
            return;
        }

        start = this.findNextMarkerPosition(start, MpegFileMarker.SystemSyncPacket);
        this.readSystemFile(start);
    }

    // #region Private Methods

    private findFirstMarker(position: number): {marker: MpegFileMarker, position: number} {
        position = this.find(MpegFile._markerStart, position);
        if (position < 0) {
            throw new CorruptFileError("Marker not found");
        }

        return {
            marker: this.getMarker(position),
            position: position
        };
    }

    private findNextMarkerPosition(position: number, marker: MpegFileMarker): number {
        const packet = ByteVector.concatenate(
            MpegFile._markerStart,
            marker
        );
        position = this.find(packet, position);

        if (position < 0) {
            throw new CorruptFileError("Marker not found");
        }

        return position;
    }

    private getMarker(position: number): MpegFileMarker {
        this.seek(position);
        const identifier = this.readBlock(4);

        if (identifier.length === 4 && identifier.startsWith(MpegFile._markerStart)) {
            return identifier.get(3);
        }

        throw new CorruptFileError(`Invalid marker at position ${position}`);
    }

    private readAudioPacket(position: number): number {
        this.seek(position + 4);
        const length = this.readBlock(2).toUShort();
        const returnValue = position + length;

        if (this._audioFound) {
            return returnValue;
        }

        // There is a maximum of 16 stuffing bytes, read to the PTS/DTS flags
        const packetHeaderBytes = this.readBlock(19);
        let i = 0;
        while (i < packetHeaderBytes.length && packetHeaderBytes.get(i) === 0xFF) {
            // Byte is a stuffing byte
            i++;
        }

        if ((packetHeaderBytes.get(i) & 0x40 ) !== 0) {
            // STD buffer size is unexpected for audio packets, but whatever
            i++;
        }

        // Decode the PTS/DTS flags
        const timestampFlags = packetHeaderBytes.get(i);
        const dataOffset = 4 + 2 + i                 // Packet marker + packet length + stuffing bytes/STD buffer size
            + ((timestampFlags & 0x20) > 0 ? 4 : 0)  // Presentation timestamp
            + ((timestampFlags & 0x10) > 0 ? 4 : 0); // Decode timestamp

        // Decode the MPEG audio header
        const audioHeaderResult = MpegAudioHeader.find(this, position + dataOffset, length - 9);
        this._audioFound = audioHeaderResult.success;
        this._audioHeader = audioHeaderResult.header;

        return position + length;
    }

    private readSystemFile(position: number): void {
        const sanityLimit = 100;

        for (
            let i = 0;
            i < sanityLimit && (this._startTime === undefined || !this._audioFound || !this._videoFound);
            i++
        ) {
            const markerResult = this.findFirstMarker(position);
            position = markerResult.position;

            switch (markerResult.marker) {
                case MpegFileMarker.SystemSyncPacket:
                    position = this.readSystemSyncPacket(position);
                    break;
                case MpegFileMarker.SystemPacket:
                case MpegFileMarker.PaddingPacket:
                    this.seek(position + 4);
                    position += this.readBlock(2).toUShort() + 6;
                    break;
                case MpegFileMarker.VideoPacket:
                    position = this.readVideoPacket(position);
                    break;
                case MpegFileMarker.AudioPacket:
                    position = this.readAudioPacket(position);
                    break;
                case MpegFileMarker.EndOfStream:
                    return;
                default:
                    position += 4;
                    break;
            }
        }
    }

    private readSystemSyncPacket(position: number): number {
        let packetSize = 0;
        this.seek(position + 4);

        const versionInfo = this.readBlock(1).get(0);
        if ((versionInfo & 0xF0) === 0x20) {
            this._version = MpegVersion.Version1;
            packetSize = 12;
        } else if ((versionInfo & 0xC0) === 0x40) {
            this._version = MpegVersion.Version2;
            this.seek(position + 13);
            packetSize = 14 + (this.readBlock(1).get(0) & 0x07);
        } else {
            throw new UnsupportedFormatError("Unknown MPEG version");
        }

        if (this._startTime === undefined) {
            this._startTime = this.readTimestamp(position + 4);
        }

        return position + packetSize;
    }

    private readTimestamp(position: number): number {
        let high: number;
        let low: number;

        this.seek(position);
        if (this._version === MpegVersion.Version1) {
            const data = this.readBlock(5);
            high = ((data.get(0) >>> 3) & 0x01) >>> 0;
            low = (((data.get(0) >>> 1) & 0x03 << 30)
                |   (data.get(1) << 22)
                |  ((data.get(2) >>> 1) << 15)
                |   (data.get(3) << 7)
                |   (data.get(4) >>> 1)) >>> 0;
        } else {
            const data = this.readBlock(6);
            high = ((data.get(0) & 0x20) >>> 5);
            low = (((data.get(0) & 0x03) << 28)
                |   (data.get(1) << 20)
                |  ((data.get(2) & 0xF8) << 12)
                |  ((data.get(2) & 0x03) << 13)
                |   (data.get(3) << 5)
                |   (data.get(4) >>> 3)) >>> 0;
        }

        return (high * 0x10000 * 0x10000 + low) / 90000;
    }

    private readVideoPacket(position: number): number {
        this.seek(position + 4);
        const length = this.readBlock(2).toUShort();
        let offset = position + 6;

        while (!this._videoFound && offset < position + length) {
            const markerResult = this.findFirstMarker(offset);
            offset = markerResult.position;
            if (markerResult.marker === MpegFileMarker.VideoSyncPacket) {
                this._videoHeader = new MpegVideoHeader(this, offset + 4);
                this._videoFound = true;
            } else {
                // Advance the offset by 6 bytes, so the next iteration of the loop won't find the
                // same marker and get stuck. 6 bytes because findFirstMarker is a generic find
                // that found get both PES packets and stream packets, the smallest possible PES
                // packet with a size of 0 would be 6 bytes.
                offset += 6;
            }
        }

        return position + length;
    }

    private rFindMarkerPosition(position: number, marker: MpegFileMarker): number {
        const packet = ByteVector.concatenate(
            MpegFile._markerStart,
            marker
        );
        position = this.rFind(packet, position);

        if (position < 0) {
            throw new CorruptFileError("Marker not found");
        }

        return position;
    }

    // #endregion
}

////////////////////////////////////////////////////////////////////////////
// Register the file type
[
    "taglib/mpg",
    "taglib/mpeg",
    "taglib/mpe",
    "taglib/mpv2",
    "taglib/m2v",
    "video/x-mpg",
    "video/mpeg"
].forEach((mt) => File.addFileType(mt, MpegFile));
