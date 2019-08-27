import {ByteVector, StringType} from "../byteVector";

/**
 * @summary Provides references to different frame types used by the library.
 * @description This class is used to severely reduce the number of times these types are created in
 *     {@see Id3v2Tag}, greatly improving the speed at which warm files are read. It is, however,
 *     not necessary for external users to use this class. While the library may use
 *     `getTextAsString(FrameType.TIT2);` an external user could use `tag.getTextAsString("TIT2");`
 *     with the same result.
 */
export default {
    APIC: ByteVector.fromString("APIC", StringType.UTF8, undefined, true),
    COMM: ByteVector.fromString("COMM", StringType.UTF8, undefined, true),
    EQUA: ByteVector.fromString("EQUA", StringType.UTF8, undefined, true),
    ETCO: ByteVector.fromString("ETCO", StringType.UTF8, undefined, true),
    GEOB: ByteVector.fromString("GEOB", StringType.UTF8, undefined, true),
    MCDI: ByteVector.fromString("MCDI", StringType.UTF8, undefined, true),
    PCNT: ByteVector.fromString("PCNT", StringType.UTF8, undefined, true),
    POPM: ByteVector.fromString("POPM", StringType.UTF8, undefined, true),
    PRIV: ByteVector.fromString("PRIV", StringType.UTF8, undefined, true),
    RVA2: ByteVector.fromString("RVA2", StringType.UTF8, undefined, true),
    RVAD: ByteVector.fromString("RVAD", StringType.UTF8, undefined, true),
    SYLT: ByteVector.fromString("SYLT", StringType.UTF8, undefined, true),
    TALB: ByteVector.fromString("TALB", StringType.UTF8, undefined, true),
    TBPM: ByteVector.fromString("TBPM", StringType.UTF8, undefined, true),
    TCMP: ByteVector.fromString("TCMP", StringType.UTF8, undefined, true),
    TCOM: ByteVector.fromString("TCOM", StringType.UTF8, undefined, true),
    TCON: ByteVector.fromString("TCON", StringType.UTF8, undefined, true),
    TCOP: ByteVector.fromString("TCOP", StringType.UTF8, undefined, true),
    TDAT: ByteVector.fromString("TDAT", StringType.UTF8, undefined, true),
    TDRC: ByteVector.fromString("TDRC", StringType.UTF8, undefined, true),
    TDTG: ByteVector.fromString("TDTG", StringType.UTF8, undefined, true),
    TEXT: ByteVector.fromString("TEXT", StringType.UTF8, undefined, true),
    TIME: ByteVector.fromString("TIME", StringType.UTF8, undefined, true),
    TIT1: ByteVector.fromString("TIT1", StringType.UTF8, undefined, true),
    TIT2: ByteVector.fromString("TIT2", StringType.UTF8, undefined, true),
    TIT3: ByteVector.fromString("TIT3", StringType.UTF8, undefined, true),
    TKEY: ByteVector.fromString("TKEY", StringType.UTF8, undefined, true),
    TMCL: ByteVector.fromString("TMCL", StringType.UTF8, undefined, true),
    TOLY: ByteVector.fromString("TOLY", StringType.UTF8, undefined, true),
    TOPE: ByteVector.fromString("TOPE", StringType.UTF8, undefined, true),
    TPE1: ByteVector.fromString("TPE1", StringType.UTF8, undefined, true),
    TPE2: ByteVector.fromString("TPE2", StringType.UTF8, undefined, true),
    TPE3: ByteVector.fromString("TPE3", StringType.UTF8, undefined, true),
    TPE4: ByteVector.fromString("TPE4", StringType.UTF8, undefined, true),
    TPOS: ByteVector.fromString("TPOS", StringType.UTF8, undefined, true),
    TPUB: ByteVector.fromString("TPUB", StringType.UTF8, undefined, true),
    TRCK: ByteVector.fromString("TRCK", StringType.UTF8, undefined, true),
    TRDA: ByteVector.fromString("TRDA", StringType.UTF8, undefined, true),
    TSIZ: ByteVector.fromString("TSIZ", StringType.UTF8, undefined, true),
    TSO2: ByteVector.fromString("TSO2", StringType.UTF8, undefined, true), // Album Artist Sort Frame
    TSOA: ByteVector.fromString("TSOA", StringType.UTF8, undefined, true), // Album Title Sort Frame
    TSOC: ByteVector.fromString("TSOC", StringType.UTF8, undefined, true), // Composer Sort Frame
    TSOP: ByteVector.fromString("TSOP", StringType.UTF8, undefined, true), // Performer Sort Frame
    TSOT: ByteVector.fromString("TSOT", StringType.UTF8, undefined, true), // Track Title Sort Frame
    TSRC: ByteVector.fromString("TSRC", StringType.UTF8, undefined, true),
    TXXX: ByteVector.fromString("TXXX", StringType.UTF8, undefined, true),
    TYER: ByteVector.fromString("TYER", StringType.UTF8, undefined, true),
    UFID: ByteVector.fromString("UFID", StringType.UTF8, undefined, true),
    USER: ByteVector.fromString("USER", StringType.UTF8, undefined, true),
    USLT: ByteVector.fromString("USLT", StringType.UTF8, undefined, true),
    WCOM: ByteVector.fromString("WCOM", StringType.UTF8, undefined, true),
    WCOP: ByteVector.fromString("WCOP", StringType.UTF8, undefined, true),
    WOAF: ByteVector.fromString("WOAF", StringType.UTF8, undefined, true),
    WOAR: ByteVector.fromString("WOAR", StringType.UTF8, undefined, true),
    WOAS: ByteVector.fromString("WOAS", StringType.UTF8, undefined, true),
    WORS: ByteVector.fromString("WORS", StringType.UTF8, undefined, true),
    WPAY: ByteVector.fromString("WPAY", StringType.UTF8, undefined, true),
    WPUB: ByteVector.fromString("WPUB", StringType.UTF8, undefined, true),
    WXXX: ByteVector.fromString("WXXX", StringType.UTF8, undefined, true)
};
