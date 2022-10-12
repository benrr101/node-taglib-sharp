import {Tag} from "../tag";
import {EbmlParser} from "../ebml/ebmlParser";
import {Guards} from "../utils";
import MatroskaSimpleTag from "./matroskaSimpleTag";

export default class MatroskaTag extends Tag {

    private _tags: MatroskaSimpleTag[] = [];
    private _sizeOnDisk: number = 0;

    private constructor() {
        super();
    }

    public static fromEmpty(): MatroskaTag {
        return new MatroskaTag();
    }

    public static fromTagsEntry(parser: EbmlParser): MatroskaTag {
        Guards.truthy(parser, "parser");

        const tag = new MatroskaTag();
        tag._sizeOnDisk = parser.length;

        return tag;
    }
}
