import { ByteVector, StringType } from "../byteVector";
import Mpeg4Utils from "./mpeg4Utils";

/**
 * Provides references to different box types used by the library. This class is used to severely reduce the number
 * of times these types are created in @see AppleTag, greatly improving the speed at which warm files are read.
 */
export default class Mpeg4BoxType {
    public static readonly Aart: ByteVector = ByteVector.fromString("aART", StringType.UTF8).makeReadOnly();
    public static readonly Alb: ByteVector = Mpeg4Utils.fixId(ByteVector.fromString("alb", StringType.UTF8));
    public static readonly Art: ByteVector = Mpeg4Utils.fixId(ByteVector.fromString("ART", StringType.UTF8));
    public static readonly Cmt: ByteVector = Mpeg4Utils.fixId(ByteVector.fromString("cmt", StringType.UTF8));
    public static readonly Cond: ByteVector = ByteVector.fromString("cond", StringType.UTF8).makeReadOnly();
    public static readonly Covr: ByteVector = ByteVector.fromString("covr", StringType.UTF8).makeReadOnly();
    public static readonly Co64: ByteVector = ByteVector.fromString("co64", StringType.UTF8).makeReadOnly();
    public static readonly Cpil: ByteVector = ByteVector.fromString("cpil", StringType.UTF8).makeReadOnly();
    public static readonly Cprt: ByteVector = ByteVector.fromString("cprt", StringType.UTF8).makeReadOnly();
    public static readonly Data: ByteVector = ByteVector.fromString("data", StringType.UTF8).makeReadOnly();
    public static readonly Day: ByteVector = Mpeg4Utils.fixId(ByteVector.fromString("day", StringType.UTF8));
    public static readonly Desc: ByteVector = ByteVector.fromString("desc", StringType.UTF8).makeReadOnly();
    public static readonly Disk: ByteVector = ByteVector.fromString("disk", StringType.UTF8).makeReadOnly();
    public static readonly Dtag: ByteVector = ByteVector.fromString("dtag", StringType.UTF8).makeReadOnly();
    public static readonly Esds: ByteVector = ByteVector.fromString("esds", StringType.UTF8).makeReadOnly();
    public static readonly Ilst: ByteVector = ByteVector.fromString("ilst", StringType.UTF8).makeReadOnly();
    public static readonly Free: ByteVector = ByteVector.fromString("free", StringType.UTF8).makeReadOnly();
    public static readonly Gen: ByteVector = Mpeg4Utils.fixId(ByteVector.fromString("gen", StringType.UTF8));
    public static readonly Gnre: ByteVector = ByteVector.fromString("gnre", StringType.UTF8).makeReadOnly();
    public static readonly Grp: ByteVector = Mpeg4Utils.fixId(ByteVector.fromString("grp", StringType.UTF8));
    public static readonly Hdlr: ByteVector = ByteVector.fromString("hdlr", StringType.UTF8).makeReadOnly();
    public static readonly Lyr: ByteVector = Mpeg4Utils.fixId(ByteVector.fromString("lyr", StringType.UTF8));
    public static readonly Mdat: ByteVector = ByteVector.fromString("mdat", StringType.UTF8).makeReadOnly();
    public static readonly Mdia: ByteVector = ByteVector.fromString("mdia", StringType.UTF8).makeReadOnly();
    public static readonly Meta: ByteVector = ByteVector.fromString("meta", StringType.UTF8).makeReadOnly();
    public static readonly Mean: ByteVector = ByteVector.fromString("mean", StringType.UTF8).makeReadOnly();
    public static readonly Minf: ByteVector = ByteVector.fromString("minf", StringType.UTF8).makeReadOnly();
    public static readonly Moov: ByteVector = ByteVector.fromString("moov", StringType.UTF8).makeReadOnly();
    public static readonly Mvhd: ByteVector = ByteVector.fromString("mvhd", StringType.UTF8).makeReadOnly();
    public static readonly Nam: ByteVector = Mpeg4Utils.fixId(ByteVector.fromString("nam", StringType.UTF8));
    public static readonly Name: ByteVector = ByteVector.fromString("name", StringType.UTF8).makeReadOnly();
    public static readonly Role: ByteVector = ByteVector.fromString("role", StringType.UTF8).makeReadOnly();
    public static readonly Skip: ByteVector = ByteVector.fromString("skip", StringType.UTF8).makeReadOnly();
    public static readonly Soaa: ByteVector = ByteVector.fromString("soaa", StringType.UTF8).makeReadOnly(); // Album Artist Sort
    public static readonly Soar: ByteVector = ByteVector.fromString("soar", StringType.UTF8).makeReadOnly(); // Performer Sort
    public static readonly Soco: ByteVector = ByteVector.fromString("soco", StringType.UTF8).makeReadOnly(); // Composer Sort
    public static readonly Sonm: ByteVector = ByteVector.fromString("sonm", StringType.UTF8).makeReadOnly(); // Track Title Sort
    public static readonly Soal: ByteVector = ByteVector.fromString("soal", StringType.UTF8).makeReadOnly(); // Album Title Sort
    public static readonly Stbl: ByteVector = ByteVector.fromString("stbl", StringType.UTF8).makeReadOnly();
    public static readonly Stco: ByteVector = ByteVector.fromString("stco", StringType.UTF8).makeReadOnly();
    public static readonly Stsd: ByteVector = ByteVector.fromString("stsd", StringType.UTF8).makeReadOnly();
    public static readonly Subt: ByteVector = ByteVector.fromString("Subt", StringType.UTF8).makeReadOnly();
    public static readonly Text: ByteVector = ByteVector.fromString("text", StringType.UTF8).makeReadOnly();
    public static readonly Tmpo: ByteVector = ByteVector.fromString("tmpo", StringType.UTF8).makeReadOnly();
    public static readonly Trak: ByteVector = ByteVector.fromString("trak", StringType.UTF8).makeReadOnly();
    public static readonly Trkn: ByteVector = ByteVector.fromString("trkn", StringType.UTF8).makeReadOnly();
    public static readonly Udta: ByteVector = ByteVector.fromString("udta", StringType.UTF8).makeReadOnly();
    public static readonly Url: ByteVector = Mpeg4Utils.fixId(ByteVector.fromString("url", StringType.UTF8));
    public static readonly Uuid: ByteVector = ByteVector.fromString("uuid", StringType.UTF8).makeReadOnly();
    public static readonly Wrt: ByteVector = Mpeg4Utils.fixId(ByteVector.fromString("wrt", StringType.UTF8));
    public static readonly DASH: ByteVector = ByteVector.fromString("----", StringType.UTF8).makeReadOnly();

    // Handler types.
    public static readonly Soun: ByteVector = ByteVector.fromString("soun", StringType.UTF8).makeReadOnly();
    public static readonly Vide: ByteVector = ByteVector.fromString("vide", StringType.UTF8).makeReadOnly();

    // Another handler type, found in wild in audio file ripped using iTunes.
    public static readonly Alis: ByteVector = ByteVector.fromString("alis", StringType.UTF8).makeReadOnly();
}
