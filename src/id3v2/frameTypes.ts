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
    APIC: ByteVector.fromString("APIC", StringType.UTF8),
    COMM: ByteVector.fromString("COMM", StringType.UTF8),
    EQUA: ByteVector.fromString("EQUA", StringType.UTF8),
    ETCO: ByteVector.fromString("ETCO", StringType.UTF8),
    GEOB: ByteVector.fromString("GEOB", StringType.UTF8),
    MCDI: ByteVector.fromString("MCDI", StringType.UTF8),
    PCNT: ByteVector.fromString("PCNT", StringType.UTF8),
    POPM: ByteVector.fromString("POPM", StringType.UTF8),
    PRIV: ByteVector.fromString("PRIV", StringType.UTF8),
    RVA2: ByteVector.fromString("RVA2", StringType.UTF8),
    RVAD: ByteVector.fromString("RVAD", StringType.UTF8),
    SYLT: ByteVector.fromString("SYLT", StringType.UTF8),
    TALB: ByteVector.fromString("TALB", StringType.UTF8),
    TBPM: ByteVector.fromString("TBPM", StringType.UTF8),
    TCMP: ByteVector.fromString("TCMP", StringType.UTF8),
    TCOM: ByteVector.fromString("TCOM", StringType.UTF8),
    TCON: ByteVector.fromString("TCON", StringType.UTF8),
    TCOP: ByteVector.fromString("TCOP", StringType.UTF8),
    TDAT: ByteVector.fromString("TDAT", StringType.UTF8),
    TDRC: ByteVector.fromString("TDRC", StringType.UTF8),
    TDTG: ByteVector.fromString("TDTG", StringType.UTF8),
    TEXT: ByteVector.fromString("TEXT", StringType.UTF8),
    TIME: ByteVector.fromString("TIME", StringType.UTF8),
    TIT1: ByteVector.fromString("TIT1", StringType.UTF8),
    TIT2: ByteVector.fromString("TIT2", StringType.UTF8),
    TIT3: ByteVector.fromString("TIT3", StringType.UTF8),
    TKEY: ByteVector.fromString("TKEY", StringType.UTF8),
    TMCL: ByteVector.fromString("TMCL", StringType.UTF8),
    TOLY: ByteVector.fromString("TOLY", StringType.UTF8),
    TOPE: ByteVector.fromString("TOPE", StringType.UTF8),
    TPE1: ByteVector.fromString("TPE1", StringType.UTF8),
    TPE2: ByteVector.fromString("TPE2", StringType.UTF8),
    TPE3: ByteVector.fromString("TPE3", StringType.UTF8),
    TPE4: ByteVector.fromString("TPE4", StringType.UTF8),
    TPOS: ByteVector.fromString("TPOS", StringType.UTF8),
    TPUB: ByteVector.fromString("TPUB", StringType.UTF8),
    TRCK: ByteVector.fromString("TRCK", StringType.UTF8),
    TRDA: ByteVector.fromString("TRDA", StringType.UTF8),
    TSIZ: ByteVector.fromString("TSIZ", StringType.UTF8),
    TSO2: ByteVector.fromString("TSO2", StringType.UTF8), // Album Artist Sort Frame
    TSOA: ByteVector.fromString("TSOA", StringType.UTF8), // Album Title Sort Frame
    TSOC: ByteVector.fromString("TSOC", StringType.UTF8), // Composer Sort Frame
    TSOP: ByteVector.fromString("TSOP", StringType.UTF8), // Performer Sort Frame
    TSOT: ByteVector.fromString("TSOT", StringType.UTF8), // Track Title Sort Frame
    TSRC: ByteVector.fromString("TSRC", StringType.UTF8),
    TXXX: ByteVector.fromString("TXXX", StringType.UTF8),
    TYER: ByteVector.fromString("TYER", StringType.UTF8),
    UFID: ByteVector.fromString("UFID", StringType.UTF8),
    USER: ByteVector.fromString("USER", StringType.UTF8),
    USLT: ByteVector.fromString("USLT", StringType.UTF8),
    WCOM: ByteVector.fromString("WCOM", StringType.UTF8),
    WCOP: ByteVector.fromString("WCOP", StringType.UTF8),
    WOAF: ByteVector.fromString("WOAF", StringType.UTF8),
    WOAR: ByteVector.fromString("WOAR", StringType.UTF8),
    WOAS: ByteVector.fromString("WOAS", StringType.UTF8),
    WORS: ByteVector.fromString("WORS", StringType.UTF8),
    WPAY: ByteVector.fromString("WPAY", StringType.UTF8),
    WPUB: ByteVector.fromString("WPUB", StringType.UTF8),
    WXXX: ByteVector.fromString("WXXX", StringType.UTF8)
};
