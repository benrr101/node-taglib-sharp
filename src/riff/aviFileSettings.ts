import {TagTypes} from "../tag";
import {NumberUtils} from "../utils";

export default class AviFileSettings {
    public static readonly supportedTagTypes = TagTypes.DivX | TagTypes.Id3v2 | TagTypes.RiffInfo | TagTypes.MovieId;

    private static _defaultTagTypes = AviFileSettings.supportedTagTypes;

    /**
     * Gets the default types of tags for an AAC file. When opening a file, if these tag types do
     * not exist on the file, they will be created.
     */
    public static get defaultTagTypes(): TagTypes { return this._defaultTagTypes; }

    /**
     * Sets the default types of tags for an AAC file. When opening a file, if these tag types do
     * not exist on the file, they will be created. See {@link supportedTagTypes} for a list of tag
     * types that are supported by node-taglib-sharp for AAC files.
     */
    public static set defaultTagTypes(value: TagTypes) {
        const unsupportedTagTypes = NumberUtils.uintAnd(value, ~this.supportedTagTypes);
        if (unsupportedTagTypes !== 0) {
            throw new Error(`Argument error: node-taglib-sharp does not support tag types ${unsupportedTagTypes} for AVI files`);
        }

        this._defaultTagTypes = value;
    }
}
