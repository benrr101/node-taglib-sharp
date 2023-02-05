import EbmlElement from "../ebml/ebmlElement";
import EbmlParser from "../ebml/ebmlParser";
import MatroskaAttachment from "./attachment";
import MatroskaTag from "./matroskaTag";
import MatroskaTagCollection from "./matroskaTagCollection";
import MatroskaTagValue from "./matroskaTagValue";
import TrackFactory from "./tracks/trackFactory";
import {ByteVector} from "../byteVector";
import {CorruptFileError, NotImplementedError, UnsupportedFormatError} from "../errors";
import {File, FileAccessMode, ReadStyle} from "../file";
import {IFileAbstraction} from "../fileAbstraction";
import {EbmlIds} from "../ebml/ids";
import {MatroskaIds} from "./matroskaIds";
import {MatroskaTagTarget} from "./matroskaTagTarget";
import {MediaTypes, Properties} from "../properties";
import {Tag, TagTypes} from "../tag";
import {Track} from "./tracks/track";
import {NumberUtils} from "../utils";

/**
 * Interface for an EBML header
 */
interface EbmlHeader {
    /**
     * Lists the official name of the EBML document type that is defined by the EBML schema.
     */
    docType?: string,

    /**
     * Minumum doctype version an EBML reader has to support to read this EBML document.
     */
    docTypeReadVersion?: number

    /**
     * The doctype interpreter used to create the EBML document.
     */
    docTypeVersion?: number,

    /**
     * Size of the header in bytes.
     */
    headerLength: number,

    /**
     * Maximum permitted length in octets of the element IDs to be found within the EBML body.
     */
    ebmlMaxIdLength?: number,

    /**
     * Maximum permitted length in octets of the expressions of all element data sizes to be found
     * in the EBML body.
     */
    ebmlMaxSizeLength?: number,

    /**
     * Minimum version of EBML version an EBML reader has to support to read this EBML document.
     */
    ebmlReadVersion?: number,

    /**
     * Version of EBML specification used to create the EBML document.
     */
    ebmlVersion?: number,
}

/**
 * Object that contains information obtained by reading the EBML file.
 * @internal
 */
interface TagReadState {
    attachments: MatroskaAttachment[],
    durationMilliseconds: number,
    tags: MatroskaTag[]
    tagSizeOnDisk: number;
}

/**
 * This class extends {@link File} to provide tagging and properties support for Matroska and WebM
 * files.
 */
export default class MatroskaFile extends File {
    private static readonly SUPPORTED_DOCTYPES = ["matroska", "webm"];

    private readonly _properties: Properties;
    private readonly _tag: MatroskaTagCollection;

    private _header: EbmlHeader;
    private _tracks: Track[] = [];

    // TEST CODE
    private _readState : TagReadState;
    // /TEST CODE

    /**
     * Constructs and initializes a new instance of a Matroska/Webm file based on the provided file.
     * @param file File abstraction or path to a file to open as a Matroska/WebM file
     * @param propertiesStyle How in-depth to read the properties of the file
     */
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

    /** @inheritDoc */
    public get properties(): Properties { return this._properties; }

    /** @inheritDoc */
    public get tag(): Tag { return this._tag; }

    // #region Public Methods

    /** @inheritDoc */
    public getTag(types: TagTypes): Tag {
        return types === TagTypes.Matroska ? this._tag : undefined;
    }

    /** @inheritDoc */
    public removeTags(types: TagTypes): void {
        if (NumberUtils.hasFlag(types, TagTypes.Matroska)) {
            this._tag.clear();
        }
    }

    /** @inheritDoc */
    public save(): void {
        throw new NotImplementedError("Saving matroska/webm files is not supported, yet.");
    }

    // #endregion

    // #region Private Methods

    private read(propertiesStyle: ReadStyle): void {
        // Look up the EBML 0-level ID
        // @TODO: This should only search like a couple kilobytes. File is supposed to *start* with this
        const level0Offset = this.find(ByteVector.fromByteArray([0x1A, 0x45, 0xDF, 0xA3]));
        if (level0Offset < 0) {
            throw new CorruptFileError("Invalid EBML file, missing header element");
        }

        // Read the header first in order to determine information for parsing the rest of it
        this.readEbmlHeader(level0Offset);
        if (MatroskaFile.SUPPORTED_DOCTYPES.indexOf(this._header.docType) < 0) {
            throw new UnsupportedFormatError(
                `EBML doctype ${this._header.docType} is not supported by Matroska file loader`
            );
        }

        // Read the segments of the file
        this.readSegments(level0Offset + this._header.headerLength, propertiesStyle);
    }

    private readAttachments(attachmentsElement: EbmlElement, state: TagReadState): void {
        const attachmentParseActions = new Map<number, (e: EbmlElement) => void>([
            [MatroskaIds.ATTACHED_FILE, e => state.attachments.push(MatroskaAttachment.fromAttachmentElement(e))]
        ]);
        EbmlParser.processElements(attachmentsElement.getParser(), attachmentParseActions);
    }

    private readEbmlHeader(offset: number): void {
        // NOTE: If it ever becomes necessary to separate EBML functionality from Matroska/WebM
        // functionality, this method should be moved.

        // Read the root of the header
        const headerRootParser = new EbmlParser(this, offset);
        try {
            if (!headerRootParser.read() || headerRootParser.currentElement.id !== EbmlIds.EBML_HEADER) {
                throw new CorruptFileError("Invalid EBML file, missing header element");
            }

            // Read the contents of the header
            const result: EbmlHeader = { headerLength: headerRootParser.currentElement.length };
            const headerParseActions = new Map<number, (element: EbmlElement) => void>([
                [EbmlIds.EBML_VERSION, e => result.ebmlVersion = e.getSafeUint()],
                [EbmlIds.EBML_READ_VERSION, e => result.ebmlReadVersion = e.getSafeUint()],
                [EbmlIds.EBML_MAX_IDLENGTH, e => result.ebmlMaxIdLength = e.getSafeUint()],
                [EbmlIds.EBML_MAX_SIZE_LENGTH, e => result.ebmlMaxSizeLength = e.getSafeUint()],
                [EbmlIds.EBML_DOC_TYPE, e => result.docType = e.getString()],
                [EbmlIds.EBML_DOC_TYPE_VERSION, e => result.docTypeVersion = e.getSafeUint()],
                [EbmlIds.EBML_DOC_TYPE_READ_VERSION, e => result.docTypeReadVersion = e.getSafeUint()]
            ]);

            EbmlParser.processElements(headerRootParser.currentElement.getParser(), headerParseActions);

            this._header = result;
        } finally {
            headerRootParser.dispose();
        }
    }

    private readSegmentInfo(infoElement: EbmlElement, readState: TagReadState, readStyle: ReadStyle): void {
        // @TODO: If read style is too low, don't read
        let duration: number = 0;
        let timeCodeScale: number;

        const segmentInfoParseActions = new Map<number, (parser: EbmlElement) => void>([
            [MatroskaIds.DURATION, e => duration = e.getDouble()],
            [MatroskaIds.TIME_CODE_SCALE, e => timeCodeScale = e.getSafeUint()],
            [MatroskaIds.TITLE, undefined] // @TODO Is this used? If so how do we use it?
        ]);
        EbmlParser.processElements(infoElement.getParser(), segmentInfoParseActions);

        // Calculate duration in milliseconds
        // Matroska stores duration as nanoseconds when multiplied by the timecode scale. There are
        // 1,000,000 ns per ms.
        if (timeCodeScale) {
            readState.durationMilliseconds = duration * timeCodeScale / 1000000;
        }
    }

    private readSegments(offset: number, readStyle: ReadStyle): void {
        // Read the root of the segment
        const segmentRootParser = new EbmlParser(this, offset);
        try {
            if (!segmentRootParser.read() || segmentRootParser.currentElement.id !== MatroskaIds.SEGMENT) {
                throw new CorruptFileError("Invalid Matroska file, missing segment element");
            }

            // Read the children of the segment element
            this._readState = {
                attachments: [],
                durationMilliseconds: 0,
                tags: [],
                tagSizeOnDisk: 0
            };
            const segmentParseActions = new Map<number, (e: EbmlElement) => void>([
                [MatroskaIds.SEEK_HEAD, undefined],
                [MatroskaIds.INFO, e => this.readSegmentInfo(e, this._readState, readStyle)],
                [MatroskaIds.CLUSTER, undefined],
                [MatroskaIds.TRACKS, e => this.readTracks(e)],
                [MatroskaIds.CUES, undefined],
                [MatroskaIds.ATTACHMENTS, e => this.readAttachments(e, this._readState)],
                [MatroskaIds.CHAPTERS, undefined],
                [MatroskaIds.TAGS, e => this.readTags(e, this._readState)]
            ]);
            EbmlParser.processElements(segmentRootParser.currentElement.getParser(), segmentParseActions);

        } finally {
            segmentRootParser.dispose();
        }
    }

    private readTag(tagElement: EbmlElement): MatroskaTag[] {
        const simpleTags: MatroskaTagValue[] = [];
        let tagTarget: MatroskaTagTarget;

        const parserActions = new Map<number, (e: EbmlElement) => void>([
            [
                MatroskaIds.SIMPLE_TAG,
                e => simpleTags.push(MatroskaTagValue.fromTagEntry(e, this._header.docTypeVersion))
            ],
            [
                MatroskaIds.TARGETS,
                e => { tagTarget = MatroskaTagTarget.fromTargetsEntry(e); }
            ]
        ]);
        EbmlParser.processElements(tagElement.getParser(), parserActions);

        // Create the tag wrapper objects
        return simpleTags.map(t => new MatroskaTag(t, tagTarget.clone()));
    }

    private readTags(tagsElement: EbmlElement, readState: TagReadState): void {
        const tagCollections: MatroskaTag[][] = [];

        const parserActions = new Map<number, (e: EbmlElement) => void>([
            [MatroskaIds.TAG, e => tagCollections.push(this.readTag(e))]
        ]);
        EbmlParser.processElements(tagsElement.getParser(), parserActions);

        readState.tags = readState.tags.concat(... tagCollections);
        readState.tagSizeOnDisk = tagsElement.length;
    }

    private readTracks(tracksElement: EbmlElement): void {
        // @TODO: Only read if read style is > average

        const trackParseActions = new Map<number, (e: EbmlElement) => void>([
            [MatroskaIds.TRACK_ENTRY, e => this._tracks.push(TrackFactory.fromTrackElement(e))]
        ]);
        EbmlParser.processElements(tracksElement.getParser(), trackParseActions);
    }

    // #endregion
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
