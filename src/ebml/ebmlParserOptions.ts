import {Guards} from "../utils";

/**
 * Class that stores the options used for parsing the current EBML element.
 */
export default class EbmlParserOptions {
    /**
     * Maximum size of the
     */
    public maxSize?: number;

    /**
     * Maximum permitted length in bytes of element IDs.
     */
    public maxIdLength?: number;

    /**
     * Maximum permitted length in bytes of the expressions of all element data size.
     */
    public maxSizeLength?: number;

    public clone(newLength: number): EbmlParserOptions {
        Guards.safeUint(newLength, "newLength");

        const clone = new EbmlParserOptions();
        clone.maxSize = newLength;
        clone.maxIdLength = this.maxIdLength;
        clone.maxSizeLength = this.maxSizeLength;
        return clone;
    }
}
