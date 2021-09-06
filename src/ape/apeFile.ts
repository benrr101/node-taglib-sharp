import ApeFileSettings from "./apeFileSettings";
import SandwichFile from "../sandwich/sandwichFile";
import Properties from "../properties";
import {ApeStreamHeader} from "./apeStreamHeader";
import {File, ReadStyle} from "../file";
import {IFileAbstraction} from "../fileAbstraction";
import {TagTypes} from "../tag";

/**
 * Provides tagging and properties support for Monkey's Audio APE files.
 * Note, a {@link ApeTag} will be added automatically to any file that doesn't contain one. This
 * change does not affect the physical file until {@link File.save} is called and can be reversed
 * using the following method: `file.removeTags(file.tagTypes & ~file.tagTypesOnDisk);`
 */
export default class ApeFile extends SandwichFile {
    private static readonly _defaultTagLocationMapping = new Map<TagTypes, () => boolean>([
        [TagTypes.Ape, () => ApeFileSettings.preferApeTagAtFileEnd],
        [TagTypes.Id3v1, () => true],
        [TagTypes.Id3v2, () => ApeFileSettings.preferId3v2TagAtFileEnd]
    ]);

    /** @inheritDoc */
    public constructor(file: IFileAbstraction|string, propertiesStyle: ReadStyle) {
        super(file, propertiesStyle, ApeFile._defaultTagLocationMapping, ApeFileSettings.defaultTagTypes);
    }

    /** @inheritDoc */
    protected readEnd(_end: number, _propertiesStyle: ReadStyle): void {
        this.getTag(TagTypes.Ape, true);
    }

    /** @inheritDoc */
    protected readProperties(readStyle: ReadStyle): Properties {
        // Skip if we're not reading the properties
        if ((readStyle & ReadStyle.Average) === 0) {
            return undefined;
        }

        // Find the header and use it to generate the properties
        this.seek(this.mediaStartPosition);
        const headerBlock = this.readBlock(ApeStreamHeader.size);
        const header = new ApeStreamHeader(headerBlock, this.mediaEndPosition - this.mediaStartPosition);
        return new Properties(header.durationMilliseconds, [header]);
    }
}

////////////////////////////////////////////////////////////////////////////
// Register the file type
[
    "taglib/ape",
    "audio/x-ape",
    "audio/ape",
    "application/x-ape"
].forEach((mt) => File.addFileType(mt, ApeFile));
