import Track from "./tracks/track";
import {ByteVector} from "../byteVector";
import {EbmlParser} from "../ebml/ebmlParser";
import {CorruptFileError, UnsupportedFormatError} from "../errors";
import {File, FileAccessMode, ReadStyle} from "../file";
import {IFileAbstraction} from "../fileAbstraction";
import {EbmlIds} from "../ebml/ids";
import {MatroskaIds} from "./matroskaIds";

export default class MatroskaFile extends File {
    private static readonly SUPPORTED_DOCTYPES = ["matroska", "webm"];

    private _doctype: string;
    private _tracks: Track[];

    public constructor(file: IFileAbstraction|string, propertiesStyle: ReadStyle) {
        super(file);

        // Read the file
        this.mode = FileAccessMode.Read;
        try {
            this.read();
        } finally {
            this.mode = FileAccessMode.Closed;
        }
    }

    private read(propertiesStyle: ReadStyle): void {
        // Look up the EBML 0-level ID
        // @TODO: This should only search like a couple kilobytes. File is supposed to *start* with this
        const level0Offset = this.find(ByteVector.fromByteArray([0x1A, 0x45, 0xDF, 0xA3]));
        if (level0Offset < 0) {
            throw new CorruptFileError("Invalid EBML file, missing 0-level element");
        }

        // Now that we know where the file starts, we'll open a parser for the file
        const reader = new EbmlParser(this, level0Offset);
        try {
            // Read until we reach the end of the file
            while (reader.read()) {
                switch (reader.id) {
                    case EbmlIds.EBML_HEADER:
                        this.readHeader(reader);
                        break;
                    case MatroskaIds.SEGMENT:
                        this.readSegments(reader, propertiesStyle)
                        break;
                }
            }
        } finally {
            reader.dispose();
        }
    }

    private readHeader(reader: EbmlParser): void {
        const headerReader = reader.getParser();
        try {
            while (headerReader.read()) {
                switch (headerReader.id) {
                    case EbmlIds.EBML_DOC_TYPE:
                        this._doctype = headerReader.getString();
                        if (MatroskaFile.SUPPORTED_DOCTYPES.indexOf(this._doctype) < 0) {
                            throw new UnsupportedFormatError(`EBML doctype ${this._doctype} is unsupported`);
                        }
                        break;
                }
            }
        } finally {
            headerReader.dispose();
        }
    }

    private readSegments(reader: EbmlParser, readStyle: ReadStyle): void {
        const segmentsReader = reader.getParser();
        try {
            while (segmentsReader.read()) {
                switch(segmentsReader.id) {
                    case MatroskaIds.SEEK_HEAD:
                        break;
                    case MatroskaIds.INFO:
                        break;
                    case MatroskaIds.CLUSTER:
                        break;
                    case MatroskaIds.TRACKS:
                        const tracksReader = reader.getParser();
                        try {
                            while (tracksReader.read()) {
                                // @TODO: Don't read if read style isn't average or better
                                if (tracksReader.id === MatroskaIds.TRACK_ENTRY) {
                                    const track = Track.fromTrackEntry(tracksReader);
                                    this._tracks.push(track);
                                }
                            }
                        } finally {
                            tracksReader.dispose();
                        }
                        break;
                    case MatroskaIds.CUES:
                        break;
                    case MatroskaIds.ATTACHMENTS:
                        break;
                    case MatroskaIds.CHAPTERS:
                        break;
                    case MatroskaIds.TAGS:
                        const tagsReader = segmentsReader.getParser();
                        try {
                            while (tagsReader.read()) {

                            }
                        } finally {
                            tagsReader.dispose();
                        }
                        break;
                }
            }
        } finally {
            reader.dispose();
        }
    }
}
