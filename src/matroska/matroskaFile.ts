import EbmlElement from "../ebml/ebmlElement";
import EbmlParser from "../ebml/ebmlParser";
import MatroskaAttachment from "./matroskaAttachment";
import MatroskaTag from "./matroskaTag";
import MatroskaTagCollection from "./matroskaTagCollection";
import MatroskaTagValue from "./matroskaTagValue";
import TrackFactory from "./tracks/trackFactory";
import {ByteVector} from "../byteVector";
import {CorruptFileError, NotImplementedError, NotSupportedError, UnsupportedFormatError} from "../errors";
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
 * Object that contains information obtained by reading a Segment element of the EBML file.
 * @internal
 */
interface SegmentReadResults {
    attachments: MatroskaAttachment[],
    durationMilliseconds: number|undefined,
    tags: MatroskaTag[]
    tagSizeOnDisk: number|undefined;
    tracks: Track[]
}

/**
 * This class extends {@link File} to provide tagging and properties support for Matroska and WebM
 * files.
 */
export default class MatroskaFile extends File {
    private static readonly SUPPORTED_DOCTYPES = ["matroska", "webm"];

    private readonly _properties: Properties;
    private readonly _tag: MatroskaTagCollection;

    /**
     * Constructs and initializes a new instance of a Matroska/Webm file based on the provided file.
     * @param file File abstraction or path to a file to open as a Matroska/WebM file
     * @param propertiesStyle How in-depth to read the properties of the file
     */
    public constructor(file: IFileAbstraction|string, propertiesStyle: ReadStyle) {
        super(file);

        this.mode = FileAccessMode.Read;
        try {
            const readResult = this.read();

            this._properties = new Properties(readResult.durationMilliseconds, readResult.tracks);
            this._tag = new MatroskaTagCollection(
                readResult.tagSizeOnDisk ?? 0,
                NumberUtils.hasFlag(this._properties.mediaTypes, MediaTypes.Video),
                readResult.tags,
                readResult.attachments
            );
        } finally {
            this.mode = FileAccessMode.Closed;
        }
    }

    /** @inheritDoc */
    public get properties(): Properties { return this._properties; }

    /** @inheritDoc */
    public get tag(): Tag { return this._tag; }

    //#region Public Methods

    /** @inheritDoc */
    public getTag(types: TagTypes): MatroskaTagCollection|undefined {
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

    //#endregion

    //#region Private Methods

    private read(): SegmentReadResults {
        // Look up the EBML 0-level ID
        // @TODO: This should only search like a couple kilobytes. File is supposed to *start* with this
        const firstElementOffset = this.find(ByteVector.fromByteArray([0x1A, 0x45, 0xDF, 0xA3]));
        if (firstElementOffset < 0) {
            throw new CorruptFileError("Invalid EBML file, missing header element");
        }

        // The general structure of the file that we care about will look like this:
        // https://www.matroska.org/technical/diagram.html
        //
        // - EBML_HEADER (= 1)
        //   - EBML_DOC_TYPE
        //   - EBML_DOC_TYPE_VERSION
        //   - EBML_DOC_TYPE_READ_VERSION
        //   - EBML_MAX_ID_LENGTH
        //   - EBML_MAX_SIZE_LENGTH
        //   - EBML_READ_VERSION
        //   - EBML_VERSION
        // - SEGMENT (=1)
        //   - ATTACHMENTS (>=0)
        //     - ATTACHED_FILE (>=0)
        //   - INFO (=1)
        //     - DURATION
        //     - TIME_CODE_SCALE
        //   - TAGS
        //     - TAG (>=1)
        //       - SIMPLE_TAG (>=1)
        //       - TARGETS (=1)
        //   - TRACKS
        //     - TRACK_ENTRY

        // Read the header first in order to determine information for parsing the rest of it
        const parser = new EbmlParser(this, firstElementOffset, this.length);
        try {
            const segmentReadResults: SegmentReadResults[] = [];
            const actions = new Map<number, (e: EbmlElement) => void>([
                [EbmlIds.EBML_HEADER, e => {
                    const header = this.readEbmlHeader(e);
                    parser.maxIdLength = header.ebmlMaxIdLength;
                    parser.maxSizeLength = header.ebmlMaxSizeLength;
                }],
                [MatroskaIds.SEGMENT, e => {
                    segmentReadResults.push(this.readSegment(e));
                }]
            ]);
            EbmlParser.processElements(parser, actions);

            if (segmentReadResults.length > 1) {
                throw new UnsupportedFormatError(
                    "Matroska files with >1 segment element are not supported by this version of the library."
                );
            } else if (segmentReadResults.length === 0) {
                throw new CorruptFileError("Matroska file is missing required segment element");
            }

            return segmentReadResults[0];
        } finally {
            parser.dispose();
        }
    }

    private readEbmlHeader(headerElement: EbmlElement): EbmlHeader {
        // NOTE: If it ever becomes necessary to separate EBML functionality from Matroska/WebM
        // functionality, this method should be moved.

        // Read the contents of the header
        const result: EbmlHeader = {};
        const headerParseActions = new Map<number, (element: EbmlElement) => void>([
            [EbmlIds.EBML_VERSION, e => result.ebmlVersion = e.getSafeUint()],
            [EbmlIds.EBML_READ_VERSION, e => result.ebmlReadVersion = e.getSafeUint()],
            [EbmlIds.EBML_MAX_ID_LENGTH, e => result.ebmlMaxIdLength = e.getSafeUint()],
            [EbmlIds.EBML_MAX_SIZE_LENGTH, e => result.ebmlMaxSizeLength = e.getSafeUint()],
            [EbmlIds.EBML_DOC_TYPE, e => result.docType = e.getString()],
            [EbmlIds.EBML_DOC_TYPE_VERSION, e => result.docTypeVersion = e.getSafeUint()],
            [EbmlIds.EBML_DOC_TYPE_READ_VERSION, e => result.docTypeReadVersion = e.getSafeUint()]
        ]);
        EbmlParser.processElements(headerElement.getParser(), headerParseActions);

        if (!result.docType || !MatroskaFile.SUPPORTED_DOCTYPES.includes(result.docType)) {
            throw new UnsupportedFormatError(
                `EBML doctype ${result.docType} is not supported by Matroska file loader`
            );
        }

        return result;
    }

    private readSegment(segmentsElement: EbmlElement): SegmentReadResults {
        // Read the children of the segment element
        const attachments: MatroskaAttachment[] = [];
        const tags: MatroskaTag[] = [];
        const tracks: Track[] = [];
        let durationMilliseconds;
        let tagSizeOnDisk;

        const segmentParseActions = new Map<number, (e: EbmlElement) => void>([
            [MatroskaIds.ATTACHMENTS, e => {
                attachments.push(...this.readSegmentAttachments(e))
            }],
            [MatroskaIds.INFO, e => {
                durationMilliseconds = this.readSegmentInfo(e);
            }],
            [MatroskaIds.TAGS, e => {
                if (tags.length > 0) {
                    // @TODO: Add support for this.
                    throw new NotImplementedError("Multiple tags elements within segment is not supported");
                }
                const tagResults = this.readSegmentTags(e);
                tags.push(... tagResults.tags);
                tagSizeOnDisk = tagResults.sizeOnDisk;
            }],
            [MatroskaIds.TRACKS, e => {
                tracks.push(... this.readSegmentTracks(e));
            }]

            // [MatroskaIds.CHAPTERS, undefined],
            // [MatroskaIds.CLUSTER, undefined],
            // [MatroskaIds.CUES, undefined],
            // [MatroskaIds.SEEK_HEAD, undefined],
        ]);
        EbmlParser.processElements(segmentsElement.getParser(), segmentParseActions);

        return <SegmentReadResults>{
            attachments: attachments,
            durationMilliseconds: durationMilliseconds,
            tags: tags,
            tagSizeOnDisk: tagSizeOnDisk,
            tracks: tracks,
        };
    }

    private readSegmentAttachments(attachmentsElement: EbmlElement): MatroskaAttachment[] {
        const attachments: MatroskaAttachment[] = [];
        const attachmentParseActions = new Map<number, (e: EbmlElement) => void>([
            [MatroskaIds.ATTACHED_FILE, e => attachments.push(MatroskaAttachment.fromAttachmentElement(e))]
        ]);
        EbmlParser.processElements(attachmentsElement.getParser(), attachmentParseActions);

        return attachments;
    }

    private readSegmentInfo(infoElement: EbmlElement): number|undefined {
        // @TODO: If read style is too low, don't read
        let segmentTicks: number|undefined;
        let timestampScale: number|undefined;

        const segmentInfoParseActions = new Map<number, (parser: EbmlElement) => void>([
            [MatroskaIds.DURATION, e => segmentTicks = e.getDouble()],
            [MatroskaIds.TIME_CODE_SCALE, e => timestampScale = e.getSafeUint()],
            // [MatroskaIds.TITLE, undefined] @TODO Is this used? If so how do we use it?
        ]);
        EbmlParser.processElements(infoElement.getParser(), segmentInfoParseActions);

        // @TODO: Verify that the logic for determining duration is correct.

        // Calculate duration in milliseconds
        // Matroska stores duration as nanoseconds when multiplied by the timecode scale. There are
        // 1,000,000 ns per ms.
        return timestampScale && segmentTicks
            ? segmentTicks * timestampScale / 1000000
            : segmentTicks;
    }

    private readSegmentTag(tagElement: EbmlElement, docTypeVersion: number): MatroskaTag[] {
        const simpleTags: MatroskaTagValue[] = [];
        let tagTarget: MatroskaTagTarget|undefined;

        const parserActions = new Map<number, (e: EbmlElement) => void>([
            [MatroskaIds.SIMPLE_TAG, e => {
                simpleTags.push(MatroskaTagValue.fromSimpleTagElement(e, docTypeVersion))
            }],
            [MatroskaIds.TARGETS, e => {
                tagTarget = MatroskaTagTarget.fromTargetsElement(e);
            }]
        ]);
        EbmlParser.processElements(tagElement.getParser(), parserActions);

        // @TODO: Allow omitted target element by setting target to "everything"
        // @TODO: Maybe add setting to prefer writing to "everything" position

        if (!tagTarget) {
            throw new NotImplementedError(
                "This version of node-taglib-sharp does not support tags without target element"
            );
        }

        // Create the tag wrapper objects
        // @TODO: Why does it think tagTarget can be undefined at this point?
        return simpleTags.map(t => new MatroskaTag(t, tagTarget!.clone()));
    }

    private readSegmentTags(tagsElement: EbmlElement): {tags: MatroskaTag[], sizeOnDisk: number} {
        const tags: MatroskaTag[] = [];

        const parserActions = new Map<number, (e: EbmlElement) => void>([
            [MatroskaIds.TAG, e => tags.push(... this.readSegmentTag(e))]
        ]);
        EbmlParser.processElements(tagsElement.getParser(), parserActions);

        return {tags: tags, sizeOnDisk: tagsElement.length};
    }

    private readSegmentTracks(tracksElement: EbmlElement): Track[] {
        // @TODO: Only read if read style is > average

        const tracks: Track[] = [];
        const trackParseActions = new Map<number, (e: EbmlElement) => void>([
            [MatroskaIds.TRACK_ENTRY, e => tracks.push(TrackFactory.fromTrackElement(e))]
        ]);
        EbmlParser.processElements(tracksElement.getParser(), trackParseActions);

        return tracks;
    }

    //#endregion
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
