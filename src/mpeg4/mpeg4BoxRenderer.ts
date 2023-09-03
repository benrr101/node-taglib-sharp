import Mpeg4Box from "./boxes/mpeg4Box";
import {ByteVector} from "../byteVector";
import IsoFreeSpaceBox from "./boxes/isoFreeSpaceBox";
import Mpeg4BoxType from "./mpeg4BoxType";

export default class Mpeg4BoxRenderer {
    public static renderBox(box: Mpeg4Box): ByteVector {

        let freeFound = false;
        const outputVectors: ByteVector[] = [];

        // Write children or data
        if (box.hasChildren) {
            for (const child of box.children) {
                if (box instanceof IsoFreeSpaceBox) {
                    freeFound = true;
                } else {
                    outputVectors.push(this.renderBox(child));
                }
            }
        } else if (box.data) {
            outputVectors.push(box.data);
        }

        // If there was a free, don't take it away, and let meta be a special case
        if (freeFound || ByteVector.equals(box.boxType, Mpeg4BoxType.META)) {
            const newSizeSoFar = outputVectors.reduce((accum, current) => accum + current.length, 0);
            const sizeDifference = box.dataSize - newSizeSoFar;
            let newPadding: IsoFreeSpaceBox;
            if (box.header.dataSize !== 0 && sizeDifference >= 8) {
                // If we have room for free space, add it so we don't have to resize the file
                newPadding = IsoFreeSpaceBox.fromPadding(sizeDifference);
            } else {
                // If we're getting bigger, get a lot bigger so we might not have to do this again
                newPadding = IsoFreeSpaceBox.fromPadding(2048);
            }

            outputVectors.push(this.renderBox(newPadding));
        }


        // Handle the box-specific headers
        const boxHeaders = box.renderBoxHeaders();
        if (boxHeaders?.length > 0) {
            outputVectors.splice(0, 0, ...boxHeaders);
        }

        // Adjust the data's header size for the new content, render the header
        box.header.dataSize = outputVectors.reduce((accum, current) => accum + current.length, 0);
        outputVectors.splice(0, 0, box.header.render());

        return ByteVector.concatenate(...outputVectors);
    }
}