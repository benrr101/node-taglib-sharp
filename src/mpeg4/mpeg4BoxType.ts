import {ByteVector, StringType} from "../byteVector";

/**
 * Provides references to different box types used by the library. This class is used to severely reduce the number
 * of times these types are created in {@link AppleTag,} greatly improving the speed at which warm files are read.
 */
export default class Mpeg4BoxType {
    /** QuickTime album artist box */
    public static readonly AART = this.getType("aART");
    /** QuickTime album box */
    public static readonly ALB = this.getType("©alb");
    /** QuickTime artist box */
    public static readonly ART = this.getType("©ART");
    /** QuickTime comment box */
    public static readonly CMT = this.getType("©cmt");
    /** QuickTime conductor box? @TODO: Verify this works should not be ©con */
    public static readonly COND = this.getType("cond");
    /** QuickTime cover art box */
    public static readonly COVR = this.getType("covr");
    /** ISO 64-bit chunk offset box */
    public static readonly CO64 = this.getType("co64");
    /** QuickTime compilation flag box */
    public static readonly CPIL = this.getType("cpil");
    /** QuickTime copyright box */
    public static readonly CPRT = this.getType("cprt");
    /** iTunesInfo tag data box */
    public static readonly DATA = this.getType("data");
    /** QuickTime content create date */
    public static readonly DAY = this.getType("©day");
    /** QuickTime description box @TODO: What about DSCP used in 3gp videos? */
    public static readonly DESC = this.getType("desc");
    /** QuickTime disk number box */
    public static readonly DISK = this.getType("disk");
    /** Date tagged box? @TODO: There's no record of this one */
    public static readonly DTAG = this.getType("dtag");
    /** ISO Elementary stream descriptor box */
    public static readonly ESDS = this.getType("esds");
    /** ISO Free space box */
    public static readonly FREE = this.getType("free");
    /** ISO File type box */
    public static readonly FTYP = this.getType("ftyp");
    /** QuickTime genre box */
    public static readonly GEN = this.getType("©gen");
    /** 3GPP genre box? */
    public static readonly GNRE = this.getType("gnre");
    /** QuickTime gouping box */
    public static readonly GRP = this.getType("©grp");
    /** ISO handler box */
    public static readonly HDLR = this.getType("hdlr");
    /** Quicktime item list box */
    public static readonly ILST = this.getType("ilst");
    /** iTunesInfo tag box */
    public static readonly ITUNES_TAG_BOX = this.getType("----");
    /** QuickTIme lyrics box */
    public static readonly LYR = this.getType("©lyr");
    /** ISO media data container box */
    public static readonly MDAT = this.getType("mdat");
    /** ISO media information container box */
    public static readonly MDIA = this.getType("mdia");
    /** ISO metadata container box */
    public static readonly META = this.getType("meta");
    /** iTunesInfo tag meaning box */
    public static readonly MEAN = this.getType("mean");
    /** ISO media information container box */
    public static readonly MINF = this.getType("minf");
    /** ISO box containing all metadata */
    public static readonly MOOV = this.getType("moov");
    /** ISO movie header and overall declarations box */
    public static readonly MVHD = this.getType("mvhd");
    /** QuickTime title box */
    public static readonly NAM = this.getType("©nam");
    /** iTunesInfo tag name box */
    public static readonly NAME = this.getType("name");
    /** Performers role box? @TODO: There's no record of this one */
    public static readonly ROLE = this.getType("role");
    /** ISO free space box */
    public static readonly SKIP = this.getType("skip");
    /** QuickTime sortable album artist box */
    public static readonly SOAA = this.getType("soaa");
    /** QuickTime sortable album title box */
    public static readonly SOAL = this.getType("soal");
    /** QuickTime sortable artist box */
    public static readonly SOAR = this.getType("soar");
    /** QuickTime sortable composer box */
    public static readonly SOCO = this.getType("soco");
    /** QuickTime sortable title box */
    public static readonly SONM = this.getType("sonm");
    /** ISO sample table box */
    public static readonly STBL = this.getType("stbl");
    /** ISO chunk offset box */
    public static readonly STCO = this.getType("stco");
    /** ISO sample description box */
    public static readonly STSD = this.getType("stsd");
    /** Subtitle box? @TODO: There's no record of this one */
    public static readonly SUBT = this.getType("Subt");
    /** Alias text box? @TODO: There's no record of this one */
    public static readonly TEXT = this.getType("text");
    /** QuickTime BPM box */
    public static readonly TMPO = this.getType("tmpo");
    /** ISO track container box */
    public static readonly TRAK = this.getType("trak");
    /** QuickTime track number box */
    public static readonly TRKN = this.getType("trkn");
    /** ISO User data box */
    public static readonly UDTA = this.getType("udta");
    /** Alias URL box? @TODO: There's no record of this one */
    public static readonly URL = this.getType("©url");
    /** ISO user extension box */
    public static readonly UUID = this.getType("uuid");
    /** QuickTime composer box */
    public static readonly WRT = this.getType("©wrt");

    private static getType(id: string): ByteVector {
        return ByteVector.fromString(id, StringType.Latin1).makeReadOnly();
    }
}
