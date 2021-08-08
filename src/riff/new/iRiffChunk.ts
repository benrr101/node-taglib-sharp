import {ByteVector} from "../../byteVector";

export default interface IRiffChunk {
    chunkStart: number|undefined;
    fourcc: string;
    originalTotalSize: number;

    render(): ByteVector;
}
