import {ByteVector, StringType} from "../../src";
import EbmlElement from "../../src/ebml/ebmlElement";
import TestFile from "../utilities/testFile";
import EbmlParserOptions from "../../src/ebml/ebmlParserOptions";

export default class MatroskaTestUtils {
    public static readonly defaultOptions = new EbmlParserOptions();

    public static getTestElement(value: string|boolean|number|bigint|ByteVector, id: number): EbmlElement {
        let bytes: ByteVector;
        // noinspection FallThroughInSwitchStatementJS
        switch (typeof (value)) {
            case "object":
                if (value instanceof ByteVector) {
                    bytes = value;
                }
                break;

            case "string":
                bytes = ByteVector.fromString(value, StringType.UTF8);
                break;

            case "bigint":
                bytes = ByteVector.fromUlong(value);
                break;

            case "boolean":
                value = value ? 1 : 0;

            case "number":
                bytes = ByteVector.fromUint(value);
                break;
        }

        return new EbmlElement(TestFile.getFile(bytes), 0, id, bytes.length, MatroskaTestUtils.defaultOptions);
    }
}
