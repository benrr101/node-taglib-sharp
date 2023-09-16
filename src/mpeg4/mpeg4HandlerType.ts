import {ByteVector, StringType} from "../byteVector";

/**
 * These are some of the handler types.
 * @remarks Two sources for these handlers are:
 *   * https://cconcolato.github.io/mp4ra/handler.html#
 *   * https://exiftool.org/TagNames/QuickTime.html#Meta
 */
export default class Mpeg4HandlerType {
    /** Quicktime Alias */
    public static readonly ALIS = ByteVector.fromString("alis", StringType.UTF8).makeReadOnly();
    /** Quicktime Metadata */
    public static readonly MDIR = ByteVector.fromString("mdir", StringType.UTF8).makeReadOnly();
    /** Audio */
    public static readonly SOUN = ByteVector.fromString("soun", StringType.UTF8).makeReadOnly();
    /** Video **/
    public static readonly VIDE = ByteVector.fromString("vide", StringType.UTF8).makeReadOnly();
}