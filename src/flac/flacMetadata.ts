import CombinedTag from "../combinedTag";
import FlacBlock from "./flacBlock";
import {IPicture} from "../iPicture";
import {Guards} from "../utils";
import {FlacBlockType} from "./flacBlockHeader";
import XiphPicture from "../xiph/xiphPicture";

export default class FlacMetadata extends CombinedTag {
    private _pictures: IPicture[] = [];

    public constructor(blocks: FlacBlock[]) {
        super();

        Guards.truthy(blocks, "blocks");

        for (const block of blocks) {
            if (block.dataSize === 0) {
                continue;
            }

            if (block.type === FlacBlockType.XiphComment) {
                this.addTagInternal(XiphComment.fromData(block));
            } else if (block.type === FlacBlockType.Picture) {
                this._pictures.push(XiphPicture.fromRawData(block.data));
            }
        }
    }


}
