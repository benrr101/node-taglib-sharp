import MatroskaAttachment from "./attachment";
import TrackFactory from "./tracks/trackFactory";
import {ByteVector} from "../byteVector";
import {EbmlParser} from "../ebml/ebmlParser";
import {CorruptFileError, UnsupportedFormatError} from "../errors";
import {File, FileAccessMode, ReadStyle} from "../file";
import {IFileAbstraction} from "../fileAbstraction";
import {EbmlIds} from "../ebml/ids";
import {MatroskaIds} from "./matroskaIds";
import {Properties} from "../properties";
import {Tag, TagTypes} from "../tag";
import {Track} from "./tracks/track";

interface EbmlHeader {
    docType?: string,
    docTypeReadVersion?: number
    docTypeVersion?: number,
    headerLength: number,
    ebmlMaxIdLength?: number,
    ebmlMaxSizeLength?: number,
    ebmlReadVersion?: number,
    ebmlVersion?: number,
}

interface TagReadState {
    attachments: MatroskaAttachment[],
}

export default class MatroskaFile extends File {
    private static readonly SUPPORTED_DOCTYPES = ["matroska", "webm"];

    private _header: EbmlHeader;
    private _tracks: Track[];

    public constructor(file: IFileAbstraction|string, propertiesStyle: ReadStyle) {
        super(file);

        // Read the file
        this.mode = FileAccessMode.Read;
        try {
            this.read(propertiesStyle);
        } finally {
            this.mode = FileAccessMode.Closed;
        }
    }

    public get properties(): Properties { return undefined; }

    public get tag(): Tag { return undefined; }

    public getTag(types: TagTypes, create: boolean): Tag {
        return undefined;
    }

    public removeTags(types: TagTypes): void {
        // TODO: Implement
    }

    public save(): void {
        // TODO: Implement
    }

    private read(propertiesStyle: ReadStyle): void {
        // Look up the EBML 0-level ID
        // @TODO: This should only search like a couple kilobytes. File is supposed to *start* with this
        const level0Offset = this.find(ByteVector.fromByteArray([0x1A, 0x45, 0xDF, 0xA3]));
        if (level0Offset < 0) {
            throw new CorruptFileError("Invalid EBML file, missing header element");
        }

        // Read the header first in order to determine information for parsing the rest of it
        this.readHeader(level0Offset);
        if (MatroskaFile.SUPPORTED_DOCTYPES.indexOf(this._header.docType) < 0) {
            throw new UnsupportedFormatError(
                `EBML doctype ${this._header.docType} is not supported by Matroska file loader`
            );
        }

        // Read the segments of the file
        this.readSegments(level0Offset + this._header.headerLength, propertiesStyle);
    }

    private readAttachments(rootParser: EbmlParser, state: TagReadState): void {
        const attachmentParseActions = new Map<number, (parser: EbmlParser) => void>([
            [MatroskaIds.ATTACHED_FILE, p => state.attachments.push(MatroskaAttachment.fromAttachmentEntry(p))]
        ]);
        rootParser.processChildren(attachmentParseActions);
    }

    private readHeader(offset: number): void {
        // NOTE: If it ever becomes necessary to separate EBML functionality from Matroska/WebM
        // functionality, this method should be moved.

        // Read the root of the header
        const headerRootParser = new EbmlParser(this, offset);
        try {
            if (!headerRootParser.read() || headerRootParser.id !== EbmlIds.EBML_HEADER) {
                throw new CorruptFileError("Invalid EBML file, missing header element");
            }

            // Read the contents of the header
            const result: EbmlHeader = { headerLength: headerRootParser.length - offset };
            const headerParseActions = new Map<number, (parser: EbmlParser) => void>([
                [EbmlIds.EBML_VERSION, p => result.ebmlVersion = p.getUint()],
                [EbmlIds.EBML_READ_VERSION, p => result.ebmlReadVersion = p.getUint()],
                [EbmlIds.EBML_MAX_IDLENGTH, p => result.ebmlMaxIdLength = p.getUint()],
                [EbmlIds.EBML_MAX_SIZE_LENGTH, p => result.ebmlMaxSizeLength = p.getUint()],
                [EbmlIds.EBML_DOC_TYPE, p => result.docType = p.getString()],
                [EbmlIds.EBML_DOC_TYPE_VERSION, p => result.docTypeVersion = p.getUint()],
                [EbmlIds.EBML_DOC_TYPE_READ_VERSION, p => result.docTypeReadVersion = p.getUint()]
            ]);
            headerRootParser.processChildren(headerParseActions);

            this._header = result;
        } finally {
            headerRootParser.dispose();
        }
    }

    private readSegments(offset: number, readStyle: ReadStyle): void {
        // Read the root of the segment
        const segmentRootReader = new EbmlParser(this, offset);
        try {
            if (!segmentRootReader.read() || segmentRootReader.id !== MatroskaIds.SEGMENT) {
                throw new CorruptFileError("Invalid Matroska file, missing segment element");
            }

            // Read the children of the segment element
            const tagState: TagReadState = {
                attachments: []
            };
            const segmentParseActions = new Map<number, (parser: EbmlParser) => void>([
                [MatroskaIds.SEEK_HEAD, undefined],
                [MatroskaIds.INFO, undefined],
                [MatroskaIds.CLUSTER, undefined],
                [MatroskaIds.TRACKS, p => this.readTracks(p)],
                [MatroskaIds.CUES, undefined],
                [MatroskaIds.ATTACHMENTS, p => this.readAttachments(p, tagState)],
                [MatroskaIds.CHAPTERS, undefined],
                [MatroskaIds.TAGS, undefined]
            ]);
            segmentRootReader.processChildren(segmentParseActions);

        } finally {
            segmentRootReader.dispose();
        }
    }

    private readTracks(rootParser: EbmlParser): void {
        // @TODO: Only read if read style is > average

        const trackParseActions = new Map<number, (parser: EbmlParser) => void>([
            [MatroskaIds.TRACK_ENTRY, p => this._tracks.push(TrackFactory.fromTrackEntry(p))]
        ]);
        rootParser.processChildren(trackParseActions);
    }
}

// /////////////////////////////////////////////////////////////////////////
// Register the file type
[
    "taglib/mk3d",
    "taglib/mka",
    "taglib/mks",
    "taglib/mkv",
    "taglib/webm",
    "audio/webm",
    "audio/x-matroska",
    "video/webm",
    "video/x-matroska"
].forEach((mt) => File.addFileType(mt, MatroskaFile));
