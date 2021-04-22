import {File} from "../file";
import {Guards} from "../utils";

export default class AviHeaderList {
    private readonly _codecs = [];

    private constructor(file: File, position: number, length: number) {
        Guards.truthy(file, "file");
        Guards.uint(length, "length");
        Guards.safeUint(position, "position");
        if (position > file.length - length) {
            throw new Error("Argument out of range: position must be less than length of file");
        }

        const list = 
    }
}
