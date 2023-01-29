import MatroskaAttachment from "./attachment";
import MatroskaTag from "./matroskaTag";
import MatroskaTagTarget from "./matroskaTagTarget";
import MatroskaTagValue from "./matroskaTagValue";
import TrackFactory from "./tracks/trackFactory";
import {ByteVector} from "../byteVector";
import {EbmlParser} from "../ebml/ebmlParser";
import {CorruptFileError, NotImplementedError, UnsupportedFormatError} from "../errors";
import {File, FileAccessMode, ReadStyle} from "../file";
import {IFileAbstraction} from "../fileAbstraction";
import {EbmlIds} from "../ebml/ids";
import {MatroskaIds} from "./matroskaIds";
import {MediaTypes, Properties} from "../properties";
import {Tag, TagTypes} from "../tag";
import {Track} from "./tracks/track";
import MatroskaTagCollection from "./matroskaTagCollection";
import {NumberUtils} from "../utils";

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
    durationMilliseconds: number,
    tags: MatroskaTag[]
    tagSizeOnDisk: number;
}

export default class MatroskaFile extends File {
    private static readonly SUPPORTED_DOCTYPES = ["matroska", "webm"];

    private readonly _properties: Properties;
    private readonly _tag: MatroskaTagCollection;

    private _header: EbmlHeader;
    private _tracks: Track[] = [];

    // TEST CODE
    private _readState : TagReadState;
    // /TEST CODE

    public constructor(file: IFileAbstraction|string, propertiesStyle: ReadStyle) {
        super(file);

        this.mode = FileAccessMode.Read;
        try {
            this.read(propertiesStyle);

            this._properties = new Properties(this._readState.durationMilliseconds, this._tracks);
            this._tag = new MatroskaTagCollection(
                this._readState.tagSizeOnDisk,
                NumberUtils.hasFlag(this._properties.mediaTypes, MediaTypes.Video),
                this._readState.tags,
                this._readState.attachments
            );
        } finally {
            this.mode = FileAccessMode.Closed;
        }
    }

    public get properties(): Properties { return this._properties; }

    public get tag(): Tag { return this._tag; }

    public getTag(types: TagTypes, create: boolean): Tag {
        return undefined;
    }

    public removeTags(types: TagTypes): void {
        // TODO: Implement
    }

    public save(): void {
        throw new NotImplementedError("Saving matroska/webm files is not supported, yet.");
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

    private readSegmentInfo(rootParser: EbmlParser, readState: TagReadState, readStyle: ReadStyle): void {
        // @TODO: If read style is too low, don't read
        let duration: number = 0;
        let timeCodeScale: number;

        const segmentInfoParseActions = new Map<number, (parser: EbmlParser) => void>([
            [MatroskaIds.DURATION, p => duration = p.getDouble()],
            [MatroskaIds.TIME_CODE_SCALE, p => timeCodeScale = p.getUint()],
            [MatroskaIds.TITLE, undefined] // @TODO Is this used? If so how do we use it?
        ]);
        rootParser.processChildren(segmentInfoParseActions);

        // Calculate duration in milliseconds
        // Matroska stores duration as nanoseconds when multiplied by the timecode scale. There are
        // 1,000,000 ns per ms.
        if (timeCodeScale) {
            readState.durationMilliseconds = duration * timeCodeScale / 1000000;
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
            this._readState = {
                attachments: [],
                durationMilliseconds: 0,
                tags: [],
                tagSizeOnDisk: 0
            };
            const segmentParseActions = new Map<number, (parser: EbmlParser) => void>([
                [MatroskaIds.SEEK_HEAD, undefined],
                [MatroskaIds.INFO, p => this.readSegmentInfo(p, this._readState, readStyle)],
                [MatroskaIds.CLUSTER, undefined],
                [MatroskaIds.TRACKS, p => this.readTracks(p)],
                [MatroskaIds.CUES, undefined],
                [MatroskaIds.ATTACHMENTS, p => this.readAttachments(p, this._readState)],
                [MatroskaIds.CHAPTERS, undefined],
                [MatroskaIds.TAGS, p => this.readTags(p, this._readState)]
            ]);
            segmentRootReader.processChildren(segmentParseActions);

        } finally {
            segmentRootReader.dispose();
        }
    }

    private readTag(rootParser: EbmlParser): MatroskaTag[] {
        const simpleTags: MatroskaTagValue[] = [];
        let tagTarget: MatroskaTagTarget;

        const parserActions = new Map<number, (p: EbmlParser) => void>([
            [
                MatroskaIds.SIMPLE_TAG,
                p => simpleTags.push(MatroskaTagValue.fromTagEntry(p, this._header.docTypeVersion))
            ],
            [
                MatroskaIds.TARGETS,
                p => { tagTarget = MatroskaTagTarget.fromTargetsEntry(p); }
            ]
        ]);
        rootParser.processChildren(parserActions);

        // Create the tag wrapper objects
        return simpleTags.map(t => MatroskaTag.fromReaderResults(t, tagTarget.clone()));
    }

    private readTags(rootParser: EbmlParser, readState: TagReadState): void {
        const tagCollections: MatroskaTag[][] = [];

        const parserActions = new Map<number, (p: EbmlParser) => void>([
            [MatroskaIds.TAG, p => tagCollections.push(this.readTag(p))]
        ]);
        rootParser.processChildren(parserActions)

        readState.tags = readState.tags.concat(... tagCollections);
        readState.tagSizeOnDisk = rootParser.length;
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
