import ApeTag from "../ape/apeTag";
import CombinedTag from "../combinedTag";
import Id3v2Settings from "../id3v2/id3v2Settings";
import Id3v1Tag from "../id3v1/id3v1Tag";
import Id3v2Tag from "../id3v2/id3v2Tag";
import Id3v2TagFooter from "../id3v2/id3v2TagFooter";
import TagParser from "../startEndTags/tagParsers";
import {ApeTagFooter} from "../ape/apeTagFooter";
import {ByteVector} from "../byteVector";
import {CorruptFileError, UnsupportedFormatError} from "../errors";
import {File, ReadStyle} from "../file";
import {Id3v2TagHeaderFlags} from "../id3v2/id3v2TagHeader";
import {Tag, TagTypes} from "../tag";
import {Guards} from "../utils";

/**
 * Provides support for accessing and modifying a collection of tags appearing at the end of a
 * file.
 * This class is used by {@link NonContainerFile} to read all tags appearing at the end of the file
 * but could be used by other classes. It currently supports ID3v1, ID3v2, and APE tags.
 */
export default class EndTag extends CombinedTag {
    public static readonly supportedTagTypes: TagTypes = TagTypes.Ape | TagTypes.Id3v1 | TagTypes.Id3v2;

    /**
     * Constructs and initializes a new instance of an end tab by reading a file from the end until
     * non-tag contents are found.
     * @param file File to read the tags from
     * @param readStyle
     */
    public constructor(file: File, readStyle: ReadStyle) {
        super(EndTag.supportedTagTypes);

        Guards.truthy(file, "file");
        this.read(file, readStyle);
    }

    // #region Public Methods

    /** @inheritDoc */
    public createTag(type: TagTypes): Tag {
        this.validateTagCreation(type);

        let tag: Tag;
        switch (type) {
            case TagTypes.Ape:
                tag = ApeTag.fromEmpty();
                break;
            case TagTypes.Id3v1:
                tag = Id3v1Tag.fromEmpty();
                break;
            case TagTypes.Id3v2:
                // ID3v2 tags must be told to write a footer
                const id3v2Tag = Id3v2Tag.fromEmpty();
                // @TODO: have default version be configurable
                id3v2Tag.version = 4;
                id3v2Tag.flags |= Id3v2TagHeaderFlags.FooterPresent;
                tag = id3v2Tag;
                break;
            default:
                throw new UnsupportedFormatError(`Specified tag type ${type} is invalid`);
        }

        this.addTagInternal(tag);
        return tag;
    }

    /**
     * Renders the tags contained in the current instance. ID3v1 tag always goes at the end.
     * @returns ByteVector Physical representation of the tags stored in the current instance
     */
    public render(): ByteVector {
        // Note: by sorting these in reverse order, we ensure that ID3v1 is rendered at the end
        const tagBytes = this.tags.sort((t1, t2) => t1.tagTypes - t2.tagTypes)
            .map((t) => (<ApeTag|Id3v1Tag|Id3v2Tag> t).render());
        return ByteVector.concatenate(... tagBytes);
    }

    // #endregion

    private read(file: File, style: ReadStyle): void {
        this.clearTags();

        const parser = new EndTagParser(file, style);
        while (parser.read()) {
            this.addTagInternal(parser.currentTag);
        }
    }
}

/**
 * Class for parsing sequential tags at the end of the file.
 * @internal
 */
class EndTagParser extends TagParser {
    // Size of the block to read when looking for a tag footer, this must be large enough to
    // contain the largest footer identifier (a the time of writing, this is ID3v1)
    private static readonly readSize = Math.max(
        ApeTagFooter.size,
        Id3v2Settings.footerSize,
        Id3v1Tag.size
    );
    private static readonly identifierMappings = [
        {
            action: (f: File, p: number, _rs: ReadStyle) => ApeTag.fromFile(f, p),
            identifier: ApeTagFooter.fileIdentifier,
            offset: ApeTagFooter.size,
        },
        {
            action: (f: File, p: number, rs: ReadStyle) => Id3v2Tag.fromFile(f, p, rs),
            identifier: Id3v2TagFooter.fileIdentifier,
            offset: Id3v2Settings.footerSize
        },
        {
            action: (f: File, p: number, rs: ReadStyle) => Id3v1Tag.fromFile(f, p),
            identifier: Id3v1Tag.fileIdentifier,
            offset: Id3v1Tag.size
        }
    ];

    public constructor(file: File, readStyle: ReadStyle) {
        super(file, readStyle);
        this._fileOffset = this._file.length - EndTagParser.readSize;
    }

    public read(): boolean {
        try {
            // Read a footer from the file
            this._file.seek(this._fileOffset);
            const tagFooterBlock = this._file.readBlock(EndTagParser.readSize);

            // Check for any identifiers of a tag
            for (const mapping of EndTagParser.identifierMappings) {
                // Calculate how far from the end of the block to check
                const offset = tagFooterBlock.length - mapping.offset;
                if (tagFooterBlock.containsAt(mapping.identifier, offset)) {
                    this._currentTag = mapping.action(this._file, offset, this._readStyle);
                    this._fileOffset += EndTagParser.readSize - this._currentTag.sizeOnDisk;
                    return true;
                }
            }
        } catch (e) {
            if (!CorruptFileError.errorIs(e)) {
                throw e;
            }
        }

        return false;
    }
}
