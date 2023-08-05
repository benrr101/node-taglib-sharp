import { ByteVector, StringType } from "../byteVector";
import Mpeg4Utils from "./mpeg4Utils";

/**
 * Provides references to different box types used by the library. This class is used to severely reduce the number
 * of times these types are created in @see AppleTag, greatly improving the speed at which warm files are read.
 */
export default class Mpeg4BoxType {
    public static readonly AART = ByteVector.fromString("aART", StringType.UTF8).makeReadOnly();
    public static readonly ALB = Mpeg4Utils.fixId(ByteVector.fromString("alb", StringType.UTF8));
    public static readonly ART = Mpeg4Utils.fixId(ByteVector.fromString("ART", StringType.UTF8));
    public static readonly CMT = Mpeg4Utils.fixId(ByteVector.fromString("cmt", StringType.UTF8));
    public static readonly COND = ByteVector.fromString("cond", StringType.UTF8).makeReadOnly();
    public static readonly COVR = ByteVector.fromString("covr", StringType.UTF8).makeReadOnly();
    public static readonly CO64 = ByteVector.fromString("co64", StringType.UTF8).makeReadOnly();
    public static readonly CPIL = ByteVector.fromString("cpil", StringType.UTF8).makeReadOnly();
    public static readonly CPRT = ByteVector.fromString("cprt", StringType.UTF8).makeReadOnly();
    public static readonly DATA = ByteVector.fromString("data", StringType.UTF8).makeReadOnly();
    public static readonly DAY = Mpeg4Utils.fixId(ByteVector.fromString("day", StringType.UTF8));
    public static readonly DESC = ByteVector.fromString("desc", StringType.UTF8).makeReadOnly();
    public static readonly DISK = ByteVector.fromString("disk", StringType.UTF8).makeReadOnly();
    public static readonly DTAG = ByteVector.fromString("dtag", StringType.UTF8).makeReadOnly();
    public static readonly ESDS = ByteVector.fromString("esds", StringType.UTF8).makeReadOnly();
    public static readonly ILST = ByteVector.fromString("ilst", StringType.UTF8).makeReadOnly();
    public static readonly FREE = ByteVector.fromString("free", StringType.UTF8).makeReadOnly();
    public static readonly GEN = Mpeg4Utils.fixId(ByteVector.fromString("gen", StringType.UTF8));
    public static readonly GNRE = ByteVector.fromString("gnre", StringType.UTF8).makeReadOnly();
    public static readonly GRP = Mpeg4Utils.fixId(ByteVector.fromString("grp", StringType.UTF8));
    public static readonly HDLR = ByteVector.fromString("hdlr", StringType.UTF8).makeReadOnly();
    public static readonly LYR = Mpeg4Utils.fixId(ByteVector.fromString("lyr", StringType.UTF8));
    public static readonly MDAT = ByteVector.fromString("mdat", StringType.UTF8).makeReadOnly();
    public static readonly MDIA = ByteVector.fromString("mdia", StringType.UTF8).makeReadOnly();
    public static readonly META = ByteVector.fromString("meta", StringType.UTF8).makeReadOnly();
    public static readonly MEAN = ByteVector.fromString("mean", StringType.UTF8).makeReadOnly();
    public static readonly MINF = ByteVector.fromString("minf", StringType.UTF8).makeReadOnly();
    public static readonly MOOV = ByteVector.fromString("moov", StringType.UTF8).makeReadOnly();
    public static readonly MVHD = ByteVector.fromString("mvhd", StringType.UTF8).makeReadOnly();
    public static readonly NAM = Mpeg4Utils.fixId(ByteVector.fromString("nam", StringType.UTF8));
    public static readonly NAME = ByteVector.fromString("name", StringType.UTF8).makeReadOnly();
    public static readonly ROLE = ByteVector.fromString("role", StringType.UTF8).makeReadOnly();
    public static readonly SKIP = ByteVector.fromString("skip", StringType.UTF8).makeReadOnly();
    public static readonly SOAA = ByteVector.fromString("soaa", StringType.UTF8).makeReadOnly(); // Album Artist Sort
    public static readonly SOAR = ByteVector.fromString("soar", StringType.UTF8).makeReadOnly(); // Performer Sort
    public static readonly SOCO = ByteVector.fromString("soco", StringType.UTF8).makeReadOnly(); // Composer Sort
    public static readonly SONM = ByteVector.fromString("sonm", StringType.UTF8).makeReadOnly(); // Track Title Sort
    public static readonly SOAL = ByteVector.fromString("soal", StringType.UTF8).makeReadOnly(); // Album Title Sort
    public static readonly STBL = ByteVector.fromString("stbl", StringType.UTF8).makeReadOnly();
    public static readonly STCO = ByteVector.fromString("stco", StringType.UTF8).makeReadOnly();
    public static readonly STSD = ByteVector.fromString("stsd", StringType.UTF8).makeReadOnly();
    public static readonly SUBT = ByteVector.fromString("Subt", StringType.UTF8).makeReadOnly();
    public static readonly TEXT = ByteVector.fromString("text", StringType.UTF8).makeReadOnly();
    public static readonly TMPO = ByteVector.fromString("tmpo", StringType.UTF8).makeReadOnly();
    public static readonly TRAK = ByteVector.fromString("trak", StringType.UTF8).makeReadOnly();
    public static readonly TRKN = ByteVector.fromString("trkn", StringType.UTF8).makeReadOnly();
    public static readonly UDTA = ByteVector.fromString("udta", StringType.UTF8).makeReadOnly();
    public static readonly URL = Mpeg4Utils.fixId(ByteVector.fromString("url", StringType.UTF8));
    public static readonly UUID = ByteVector.fromString("uuid", StringType.UTF8).makeReadOnly();
    public static readonly WRT = Mpeg4Utils.fixId(ByteVector.fromString("wrt", StringType.UTF8));
    public static readonly DASH = ByteVector.fromString("----", StringType.UTF8).makeReadOnly();

    // Handler types.
    public static readonly SOUN = ByteVector.fromString("soun", StringType.UTF8).makeReadOnly();
    public static readonly VIDE = ByteVector.fromString("vide", StringType.UTF8).makeReadOnly();

    // Another handler type, found in wild in audio file ripped using iTunes.
    public static readonly ALIS = ByteVector.fromString("alis", StringType.UTF8).makeReadOnly();
}
