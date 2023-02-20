/**
 * Class that stores the options used for parsing the current EBML element.
 */
export default interface EbmlParserOptions {
    /**
     * Maximum permitted length in bytes of element IDs.
     */
    maxIdLength?: number;

    /**
     * Maximum permitted length in bytes of the expressions of all element data size.
     */
    maxSizeLength?: number;
}
