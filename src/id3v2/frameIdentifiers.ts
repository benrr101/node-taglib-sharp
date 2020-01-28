import {ByteVector, StringType} from "../byteVector";
import {Guards} from "../utils";

/**
 * @summary Represents the identifier of a frame, depending on the version this may be 3 or 4
 *     bytes. Provides a simple way to switch between the identifiers used for different versions.
 * @description This class is implemented in an attempt to unify frame identifiers, make it easy to
 *     switch versions, find frames between tags, and determine which frames are supported on which
 *     version of ID3v2.
 *     If you have a death wish, you can take your life into your own hands and construct your own
 *     FrameIdentifier for use in non-standard frames. This is VERY STRONGLY NOT ADVISED. Not only
 *     will you be breaking the ID3v2 standard making your frame not portable, but you will also
 *     have to ensure the FrameIdentifier instance you create is used everywhere the frame
 *     identifier is used.
 *     To make implementation and less memory intensive, FrameIdentifier instances for built-in
 *     frame identifiers are statically created and reused. This allows usage of the `===` to
 *     compare instances because they should always be the same.
 */
export class FrameIdentifier {
    private versionTable: {[key: number]: ByteVector} = {
        2: undefined,
        3: undefined,
        4: undefined
    };

    public constructor(v4: string, v3: string, v2: string) {
        this.versionTable[4] = v4
            ? ByteVector.fromString(v4, StringType.Latin1, undefined, true)
            : undefined;
        this.versionTable[4] = v3
            ? (v3 === v4 ? this.versionTable[4] : ByteVector.fromString(v3, StringType.Latin1, undefined, true))
            : undefined;
        this.versionTable[2] = v2
            ? ByteVector.fromString(v2, StringType.Latin1, undefined, true)
            : undefined;
    }

    public render(version: number): ByteVector {
        Guards.byte(version, "version");
        Guards.betweenInclusive(version, 2, 4, "version");
        if (!this.versionTable[version]) {
            const newest = this.versionTable[4] || this.versionTable[3] || this.versionTable[2];
            throw new Error(`Frame ${newest} is not supported in ID3v2 version ${version}`);
        }

        return this.versionTable[version];
    }
}

export class FrameIdentifiers {
    private static dict: {[key: string]: FrameIdentifier} = {
        AENC: new FrameIdentifier("AENC", "AENC", "CRA"), // Audio encryption
        APIC: new FrameIdentifier("APIC", "APIC", "PIC"), // Attached picture
        ASPI: new FrameIdentifier("ASPI", undefined, undefined), // Audio seek point table
        COMM: new FrameIdentifier("COMM", "COMM", "COM"), // Comments
        COMR: new FrameIdentifier("COMR", "COMR", undefined), // Commercial frame
        CRM : new FrameIdentifier(undefined, undefined, "CRM"), // Encrypted meta-frame
        ENCR: new FrameIdentifier("ENCR", "ENCR", undefined), // Encryption method registration
        EQU2: new FrameIdentifier("EQU2", "EQUA", undefined), // Equalization
        ETCO: new FrameIdentifier("ETCO", "ETCO", "ETC"), // Event timing codes
        GEOB: new FrameIdentifier("GEOB", "GEOB", "GEO"), // General encapsulated object
        GRID: new FrameIdentifier("GRID", "GRID", undefined), // Group identification registration
        LINK: new FrameIdentifier("LINK", "LINK", "LNK"), // Linked information
        MCDI: new FrameIdentifier("MCDI", "MCDI", "MCI"), // Music CD identifier
        MLLT: new FrameIdentifier("MLLT", "MLLT", "MLL"), // MPEG location lookup table
        OWNE: new FrameIdentifier("OWNE", "OWNE", undefined), // Ownership frame
        PCNT: new FrameIdentifier("PCNT", "PCNT", "CNT"), // Play count
        POPM: new FrameIdentifier("POPM", "POPM", "POP"), // Popularimeter
        POSS: new FrameIdentifier("POSS", "POSS", undefined), // Position synchronization frame
        PRIV: new FrameIdentifier("PRIV", "PRIV", undefined), // Private frame
        RBUF: new FrameIdentifier("RBUF", "RBUF", "BUF"), // Recommended buffer size
        RVA2: new FrameIdentifier("RVA2", "RVAD", "RVA"), // Relative volume adjustment
        RVRB: new FrameIdentifier("RVRB", "RVRB", "REV"), // Reverb
        SEEK: new FrameIdentifier("SEEK", undefined, undefined), // Seek frame
        SIGN: new FrameIdentifier("SIGN", undefined, undefined), // Signature frame
        SYLT: new FrameIdentifier("SYLT", "SYLT", "SLT"), // Synchronized lyric/text
        SYTC: new FrameIdentifier("SYTC", "SYTC", "STC"), // Synchronized tempo codes
        TALB: new FrameIdentifier("TALB", "TALB", "TAL"), // Album/Movie/Show title
        TBPM: new FrameIdentifier("TBPM", "TBPM", "TBP"), // BPM
        TCOM: new FrameIdentifier("TCOM", "TCOM", "TCM"), // Composer
        TCMP: new FrameIdentifier("TCMP", "TCMP", undefined),   // iTunes only "compilation" flag
        TCON: new FrameIdentifier("TCON", "TCON", "TCO"), // Content type
        TCOP: new FrameIdentifier("TCOP", "TCOP", "TCR"), // Copyright message
        TDAT: new FrameIdentifier(undefined, "TDAT", "TDA"), // Date
        TDEN: new FrameIdentifier("TDEN", undefined, undefined), // Encoding time
        TDLY: new FrameIdentifier("TDLY", "TDLY", "TDY"), // Playlist delay
        TDOR: new FrameIdentifier("TDOR", "TORY", "TOR"), // Original release time
        TDRC: new FrameIdentifier("TDRC", "TYER", "TYE"), // Recording time (v2.4/v2.3) / Year (v2.2)
        TDRL: new FrameIdentifier("TDRL", undefined, undefined), // Release time
        TDTG: new FrameIdentifier("TDTG", undefined, undefined), // Tagging time
        TENC: new FrameIdentifier("TENC", "TENC", "TEN"), // Encoded by
        TEXT: new FrameIdentifier("TEXT", "TEXT", "TXT"), // Lyricist/Text writer
        TFLT: new FrameIdentifier("TFLT", "TFLT", "TFT"), // File type
        TIME: new FrameIdentifier(undefined, "TIME", "TIM"), // Time
        TIPL: new FrameIdentifier("TIPL", "IPLS", "IPL"), // Involved people list
        TIT1: new FrameIdentifier("TIT1", "TIT1", "TT1"), // Content group description
        TIT2: new FrameIdentifier("TIT2", "TIT2", "TT2"), // Title/songname/content description
        TIT3: new FrameIdentifier("TIT3", "TIT3", "TT3"), // Subtitle/description refinement
        TKEY: new FrameIdentifier("TKEY", "TKEY", "TKE"), // Initial key
        TLAN: new FrameIdentifier("TLAN", "TLAN", "TLA"), // Language(s)
        TLEN: new FrameIdentifier("TLEN", "TLEN", "TLE"), // Length
        TMCL: new FrameIdentifier("TMCL", undefined, undefined), // Musician credit list
        TMED: new FrameIdentifier("TMED", "TMED", "TMT"), // Media type
        TMOO: new FrameIdentifier("TMOO", undefined, undefined), // Mood
        TOAL: new FrameIdentifier("TOAL", "TOAL", "TOT"), // Original album/movie/show title
        TOFN: new FrameIdentifier("TOFN", "TOFN", "TOF"), // Original filename
        TOLY: new FrameIdentifier("TOLY", "TOLY", "TOL"), // Original lyricist(s)/text writer(s)
        TOPE: new FrameIdentifier("TOPE", "TOPE", "TOA"), // Original artist(s)/performer(s)
        TOWN: new FrameIdentifier("TOWN", "TOWN", undefined), // File owner/licensee
        TPE1: new FrameIdentifier("TPE1", "TPE1", "TP1"), // Lead performer(s)/soloist(s)
        TPE2: new FrameIdentifier("TPE2", "TPE2", "TP2"), // Band/orchestra/accompaniment
        TPE3: new FrameIdentifier("TPE3", "TEP3", "TP3"), // Counductor/performer refinement
        TPE4: new FrameIdentifier("TPE4", "TEP4", "TP4"), // Interpreted, remixed, or otherwise modified by
        TPOS: new FrameIdentifier("TPOS", "TPOS", "TPA"), // Part of a set
        TPRO: new FrameIdentifier("TPRO", undefined, undefined), // Produced notice
        TPUB: new FrameIdentifier("TPUB", "TPUB", "TPB"), // Publisher
        TRCK: new FrameIdentifier("TRCK", "TRCK", "TRK"), // Track number/position in set
        TRDA: new FrameIdentifier(undefined, "TRDA", "TRD"), // Recording dates
        TRSN: new FrameIdentifier("TRSN", "TRSN", undefined), // Internet radio station name
        TRSO: new FrameIdentifier("TRSO", "TRSO", undefined), // Internet radio station owner
        TSIZ: new FrameIdentifier(undefined, "TSIZ", "TSI"), // Size
        TSOA: new FrameIdentifier("TSOA", undefined, undefined), // Album sort order
        TSOP: new FrameIdentifier("TSOP", undefined, undefined), // Performer sort order
        TSOT: new FrameIdentifier("TSOT", undefined, undefined), // Title sort order
        TSRC: new FrameIdentifier("TSRC", "TSRC", "TRC"), // ISRC (International standard recording code)
        TSSE: new FrameIdentifier("TSSE", "TSSE", "TSS"), // Software/hardware and setting used for encoding
        TSST: new FrameIdentifier("TSST", undefined, undefined), // Set subtitle
        TXXX: new FrameIdentifier("TXXX", "TXXX", "TXX"), // User defined text information frame
        UFID: new FrameIdentifier("UFID", "UFID", "UFI"), // Unique file identifer
        USER: new FrameIdentifier("USER", "USER", undefined), // Terms of use
        USLT: new FrameIdentifier("USLT", "USLT", "ULT"), // Unsynchronised lyric/text transcription
        WCOM: new FrameIdentifier("WCOM", "WCOM", "WCM"), // Commercial information URL
        WCOP: new FrameIdentifier("WCOP", "WCOP", "WCP"), // Copyright/legal information URL
        WOAF: new FrameIdentifier("WOAF", "WOAF", "WAF"), // Official audio file webpage URL
        WOAR: new FrameIdentifier("WOAR", "WOAR", "WAR"), // Official artist/performer webpage URL
        WOAS: new FrameIdentifier("WOAS", "WOAS", "WAS"), // Official audio source webpage URL
        WORS: new FrameIdentifier("WORS", "WORS", undefined), // Official internet radio station homepage URL
        WPAY: new FrameIdentifier("WPAY", "WPAY", undefined), // Payment URL
        WPUB: new FrameIdentifier("WPUB", "WPUB", "WPB"), // Publishers official webpage URL
        WXXX: new FrameIdentifier("WXXX", "WXXX", "WXX"), // User defined URL link frame
    };

    public static AENC = FrameIdentifiers.dict.AENC;
    public static APIC = FrameIdentifiers.dict.APIC;
    public static ASPI = FrameIdentifiers.dict.ASPI;
    public static BUF =  FrameIdentifiers.dict.RBUF;
    public static CNT =  FrameIdentifiers.dict.PCNT;
    public static COM =  FrameIdentifiers.dict.COMM;
    public static COMM = FrameIdentifiers.dict.COMM;
    public static COMR = FrameIdentifiers.dict.COMR;
    public static CRA =  FrameIdentifiers.dict.AENC;
    public static CRM =  FrameIdentifiers.dict.CRM;
    public static ENCR = FrameIdentifiers.dict.ENCR;
    public static EQU2 = FrameIdentifiers.dict.EQU2;
    public static EQUA = FrameIdentifiers.dict.EQU2;
    public static ETC =  FrameIdentifiers.dict.ETCO;
    public static ETCO = FrameIdentifiers.dict.ETCO;
    public static GEO =  FrameIdentifiers.dict.GEOB;
    public static GEOB = FrameIdentifiers.dict.GEOB;
    public static GRID = FrameIdentifiers.dict.GRID;
    public static IPLS = FrameIdentifiers.dict.TIPL;
    public static LINK = FrameIdentifiers.dict.LINK;
    public static LNK =  FrameIdentifiers.dict.LINK;
    public static MCDI = FrameIdentifiers.dict.MCDI;
    public static MCI =  FrameIdentifiers.dict.MCDI;
    public static MLL =  FrameIdentifiers.dict.MLLT;
    public static MLLT = FrameIdentifiers.dict.MLLT;
    public static OWNE = FrameIdentifiers.dict.OWNE;
    public static PCNT = FrameIdentifiers.dict.PCNT;
    public static PIC =  FrameIdentifiers.dict.APIC;
    public static POP =  FrameIdentifiers.dict.POPM;
    public static POPM = FrameIdentifiers.dict.POPM;
    public static POSS = FrameIdentifiers.dict.POSS;
    public static PRIV = FrameIdentifiers.dict.PRIV;
    public static RBUF = FrameIdentifiers.dict.RBUF;
    public static REV =  FrameIdentifiers.dict.RVRB;
    public static RVA =  FrameIdentifiers.dict.RVA2;
    public static RVA2 = FrameIdentifiers.dict.RVA2;
    public static RVRB = FrameIdentifiers.dict.RVRB;
    public static SEEK = FrameIdentifiers.dict.SEEK;
    public static SIGN = FrameIdentifiers.dict.SIGN;
    public static SLT =  FrameIdentifiers.dict.SYLT;
    public static STC =  FrameIdentifiers.dict.SYTC;
    public static SYLT = FrameIdentifiers.dict.SYLT;
    public static SYTC = FrameIdentifiers.dict.SYTC;
    public static TAL =  FrameIdentifiers.dict.TALB;
    public static TALB = FrameIdentifiers.dict.TALB;
    public static TBP =  FrameIdentifiers.dict.TBPM;
    public static TBPM = FrameIdentifiers.dict.TBPM;
    public static TCM =  FrameIdentifiers.dict.TCOM;
    public static TCMP = FrameIdentifiers.dict.TCMP;
    public static TCO =  FrameIdentifiers.dict.TCON;
    public static TCOM = FrameIdentifiers.dict.TCOM;
    public static TCON = FrameIdentifiers.dict.TCON;
    public static TCOP = FrameIdentifiers.dict.TCOP;
    public static TCR =  FrameIdentifiers.dict.TCOP;
    public static TDA =  FrameIdentifiers.dict.TDAT;
    public static TDAT = FrameIdentifiers.dict.TDAT;
    public static TDEN = FrameIdentifiers.dict.TDEN;
    public static TDLY = FrameIdentifiers.dict.TDLY;
    public static TDOR = FrameIdentifiers.dict.TDOR;
    public static TDRC = FrameIdentifiers.dict.TDRC;
    public static TDRL = FrameIdentifiers.dict.TDRL;
    public static TDTG = FrameIdentifiers.dict.TDTG;
    public static TDY =  FrameIdentifiers.dict.TDLY;
    public static TEN =  FrameIdentifiers.dict.TENC;
    public static TENC = FrameIdentifiers.dict.TENC;
    public static TEXT = FrameIdentifiers.dict.TEXT;
    public static TFLT = FrameIdentifiers.dict.TFLT;
    public static TFT =  FrameIdentifiers.dict.TFLT;
    public static TIM =  FrameIdentifiers.dict.TIME;
    public static TIME = FrameIdentifiers.dict.TIME;
    public static TIPL = FrameIdentifiers.dict.TIPL;
    public static TIT1 = FrameIdentifiers.dict.TIT1;
    public static TIT2 = FrameIdentifiers.dict.TIT2;
    public static TIT3 = FrameIdentifiers.dict.TIT3;
    public static TKE =  FrameIdentifiers.dict.TKEY;
    public static TKYE = FrameIdentifiers.dict.TKEY;
    public static TLA =  FrameIdentifiers.dict.TLAN;
    public static TLAN = FrameIdentifiers.dict.TLAN;
    public static TLE =  FrameIdentifiers.dict.TLEN;
    public static TLEN = FrameIdentifiers.dict.TLEN;
    public static TMCL = FrameIdentifiers.dict.TMCL;
    public static TMED = FrameIdentifiers.dict.TMED;
    public static TMOO = FrameIdentifiers.dict.TMOO;
    public static TMT =  FrameIdentifiers.dict.TMED;
    public static TOA =  FrameIdentifiers.dict.TOPE;
    public static TOAL = FrameIdentifiers.dict.TOAL;
    public static TOF =  FrameIdentifiers.dict.TOFN;
    public static TOFN = FrameIdentifiers.dict.TOFN;
    public static TOL =  FrameIdentifiers.dict.TOLY;
    public static TOLY = FrameIdentifiers.dict.TOLY;
    public static TOPE = FrameIdentifiers.dict.TOPE;
    public static TOR =  FrameIdentifiers.dict.TDOR;
    public static TORY = FrameIdentifiers.dict.TDOR;
    public static TOT =  FrameIdentifiers.dict.TOAL;
    public static TOWN = FrameIdentifiers.dict.TOWN;
    public static TP1 =  FrameIdentifiers.dict.TPE1;
    public static TP2 =  FrameIdentifiers.dict.TPE2;
    public static TP3 =  FrameIdentifiers.dict.TPE3;
    public static TP4 =  FrameIdentifiers.dict.TPE4;
    public static TPA =  FrameIdentifiers.dict.TPOS;
    public static TPB =  FrameIdentifiers.dict.TPUB;
    public static TPE1 = FrameIdentifiers.dict.TPE1;
    public static TPE2 = FrameIdentifiers.dict.TPE2;
    public static TPE3 = FrameIdentifiers.dict.TPE3;
    public static TPE4 = FrameIdentifiers.dict.TPE4;
    public static TPOS = FrameIdentifiers.dict.TPOS;
    public static TPRO = FrameIdentifiers.dict.TPRO;
    public static TPUB = FrameIdentifiers.dict.TPUB;
    public static TRC =  FrameIdentifiers.dict.TSRC;
    public static TRCK = FrameIdentifiers.dict.TRCK;
    public static TRD =  FrameIdentifiers.dict.TRDA;
    public static TRDA = FrameIdentifiers.dict.TRDA;
    public static TRK =  FrameIdentifiers.dict.TRCK;
    public static TRSN = FrameIdentifiers.dict.TRSN;
    public static TRSO = FrameIdentifiers.dict.TRSO;
    public static TSI =  FrameIdentifiers.dict.TSIZ;
    public static TSIZ = FrameIdentifiers.dict.TSIZ;
    public static TSOA = FrameIdentifiers.dict.TSOA;
    public static TSOP = FrameIdentifiers.dict.TSOP;
    public static TSOT = FrameIdentifiers.dict.TSOT;
    public static TSRC = FrameIdentifiers.dict.TSRC;
    public static TSS =  FrameIdentifiers.dict.TSSE;
    public static TSSE = FrameIdentifiers.dict.TSSE;
    public static TSST = FrameIdentifiers.dict.TSST;
    public static TT1 =  FrameIdentifiers.dict.TIT1;
    public static TT2 =  FrameIdentifiers.dict.TIT2;
    public static TT3 =  FrameIdentifiers.dict.TIT3;
    public static TXT =  FrameIdentifiers.dict.TEXT;
    public static TXX =  FrameIdentifiers.dict.TXXX;
    public static TXXX = FrameIdentifiers.dict.TXXX;
    public static TYE =  FrameIdentifiers.dict.TDRC;
    public static TYER = FrameIdentifiers.dict.TDRC;
    public static UFI =  FrameIdentifiers.dict.UFID;
    public static UFID = FrameIdentifiers.dict.UFID;
    public static ULT =  FrameIdentifiers.dict.USLT;
    public static USER = FrameIdentifiers.dict.USER;
    public static USLT = FrameIdentifiers.dict.USLT;
    public static WAF =  FrameIdentifiers.dict.WOAF;
    public static WAR =  FrameIdentifiers.dict.WOAR;
    public static WAS =  FrameIdentifiers.dict.WOAS;
    public static WCM =  FrameIdentifiers.dict.WCOM;
    public static WCOM = FrameIdentifiers.dict.WCOM;
    public static WCOP = FrameIdentifiers.dict.WCOP;
    public static WCP =  FrameIdentifiers.dict.WCOP;
    public static WOAF = FrameIdentifiers.dict.WOAF;
    public static WOAR = FrameIdentifiers.dict.WOAR;
    public static WORS = FrameIdentifiers.dict.WORS;
    public static WPAY = FrameIdentifiers.dict.WPAY;
    public static WPB =  FrameIdentifiers.dict.WPUB;
    public static WPUB = FrameIdentifiers.dict.WPUB;
    public static WXX =  FrameIdentifiers.dict.WXXX;
    public static WXXX = FrameIdentifiers.dict.WXXX;
}
