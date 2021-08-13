import {ByteVector} from "../byteVector";

/**
 * Interface for chunks that appear in a RIFF file.
 */
export default interface IRiffChunk {
    /**
     * Offset into the file where the chunk begins. This is `undefined` if the object was
     * constructed directly from data.
     */
    chunkStart: number|undefined;

    /**
     * FOURCC code for the chunk.
     */
    fourcc: string;

    /**
     * Original size of the chunk, including header and padding byte. This value does not update if
     * the contents of the chunk changes.
     */
    originalTotalSize: number;

    /**
     * Renders the chunk, including the header and padding byte.
     */
    render(): ByteVector;
}
