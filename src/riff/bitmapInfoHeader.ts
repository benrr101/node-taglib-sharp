/* tslint:disable:object-literal-key-quotes */
import {IVideoCodec, MediaTypes} from "../iCodec";
import {ByteVector} from "../byteVector";
import {Guards} from "../utils";
import {CorruptFileError} from "../errors";

/**
 * This class provides a representation of a Microsoft BitmapInfoHeader structure.
 * @link https://docs.microsoft.com/en-us/windows/win32/api/wingdi/ns-wingdi-bitmapinfoheader
 */
export default class BitmapInfoHeader implements IVideoCodec {
    public static readonly FOURCC_CODES = {
        /* 1978 */ 0x31393738: "A.M.Paredes predictor (LossLess)",
        /* 26LT */ 0x32364C54: "Discreet UC YUV 4:2:2:4 10-bit",
        /* 28DV */ 0x32384456: "Apple QuickTime DV (DVCPRO NTSC)",
        /* 28SM */ 0x3238534D: "Apple Graphics (SMC) codec (256 color)",
        /* 2VUY */ 0x32565559: "Optibase VideoPump 8-bit 4:2:2 Component Y'CbCr",
        /* 3IV0 */ 0x33495630: "MPEG4-based codec 3ivx",
        /* 3IV1 */ 0x33495631: "MPEG4-based codec 3ivx",
        /* 3IV2 */ 0x33495632: "MPEG4-based codec 3ivx",
        /* 3IVD */ 0x33495644: "Microsoft MPEG-4 v3 / Doctored 3ivx DivX",
        /* 3IVX */ 0x33495658: "MPEG4-based codec 3ivx",
        /* 3VID */ 0x33564944: "MPEG4-based codec 3ivx",
        /* 8BPS */ 0x38425053: "Apple QuickTime Planar RGB w/Alpha-channel",
        /* AAS4 */ 0x41415334: "Autodesk Animator codec (RLE)",
        /* AASC */ 0x41415343: "Autodesk Animator codec",
        /* ABVB */ 0x41425642: "Avid ABVB / NuVista MJPEG w/Alpha-channel",
        /* ABYR */ 0x41425952: "Kensington codec (low resolution, low frame rate (6fps) codec)",
        /* ACTL */ 0x4143544C: "Streambox ACT-L2",
        /* ADV1 */ 0x41445631: "Loronix WaveCodec",
        /* ADVJ */ 0x4144564A: "Avid M-JPEG (aka AVRn)",
        /* AEIK */ 0x4145494B: "Intel Indeo Video 3.2 (Vector Quantization)",
        /* AEMI */ 0x41454D49: "Array VideoONE MPEG1-I capture",
        /* AFLC */ 0x41464C43: "Autodesk Animator FLC (256 color)",
        /* AFLI */ 0x41464C49: "Autodesk Animator FLI (256 color)",
        /* AHDV */ 0x41484456: "CineForm 10-bit Visually Perfect HD (Wavelet)",
        /* AJPG */ 0x414A5047: "22fps JPEG-based codec",
        /* ALAC */ 0x414C4143: "Apple lossless audio",
        /* ALPH */ 0x414C5048: "Ziracom Video",
        /* AMPG */ 0x414D5047: "Array VideoONE MPEG w/Compression",
        /* ANIM */ 0x414E494D: "Intel RDX",
        /* AP41 */ 0x41503431: "AngelPotion Definitive / Hacked Microsoft MPEG-4 v3",
        /* AP42 */ 0x41503432: "AngelPotion Definitive / Hacked Microsoft MPEG-4 v3",
        /* ASLC */ 0x41534C43: "AlparySoft Lossless Codec",
        /* ASV1 */ 0x41535631: "Asus Video V1",
        /* ASV2 */ 0x41535632: "Asus Video V2",
        /* ASVX */ 0x41535658: "Asus Video 2.0",
        /* ATM4 */ 0x41544D34: "Ahead Nero Digital MPEG-4 Codec",
        /* AUR2 */ 0x41555232: "AuraVision Aura 2",
        /* AURA */ 0x41555241: "AuraVision Aura 1",
        /* AUVX */ 0x41555658: "USH AUVX video codec",
        /* AV1X */ 0x41563158: "Avid 1:1x (QuickTime)",
        /* AVC1 */ 0x41564331: "H.264/MPEG-4 AVC",
        /* AVD1 */ 0x41564431: "Avid DV (QuickTime)",
        /* AVDJ */ 0x4156444A: "Avid Meridien JFIF w/Alpha-channel",
        /* AVDN */ 0x4156444E: "Avid DNxHD (QuickTime)",
        /* AVDV */ 0x41564456: "Avid DV",
        /* AVI1 */ 0x41564931: "MainConcept Motion JPEG Codec",
        /* AVI2 */ 0x41564932: "MainConcept Motion JPEG Codec",
        /* AVID */ 0x41564944: "Avid Motion JPEG",
        /* AVIS */ 0x41564953: "Alias for AviSynth",
        /* AVMP */ 0x41564D50: "Avid IMX (QuickTime)",
        /* AVRN */ 0x4156524E: "Avid Motion JPEG",
        /* AVUI */ 0x41565549: "Avid Meridien Uncompressed w/Alpha-channel",
        /* AVUP */ 0x41565550: "Avid 10-bit Packed (QuickTime)",
        /* AYUV */ 0x41595556: "4:4:4 YUV (AYUV)",
        /* AZPR */ 0x415A5052: "Apple QuickTime Video",
        /* AZRP */ 0x415A5250: "Apple QuickTime Video",
        /* BA81 */ 0x42413831: "Raw Bayer Data w/8 bits per sample",
        /* BHIV */ 0x42484956: "BeHere iVideo",
        /* BINK */ 0x42494E4B: "Bink Video (RAD Game Tools)",
        /* BITM */ 0x4249544D: "Microsoft H.261",
        /* BLOX */ 0x424C4F58: "Jan Jezabek BLOX MPEG Codec",
        /* BLZ0 */ 0x424C5A30: "Blizzard Decoder Filter DivX",
        /* BMV1 */ 0x424D5631: "MicroFirst Bitmap Video",
        /* BT20 */ 0x42543230: "Conexant/Brooktree Prosumer MediaStream",
        /* BTCV */ 0x42544356: "Conexant/Brooktree Composite Video",
        /* BTVC */ 0x42545643: "Conexant Composite Video",
        /* BW00 */ 0x42573030: "BergWave (Wavelet)",
        /* BW10 */ 0x42573130: "Broadway MPEG Capture w/Compression",
        /* BXBG */ 0x42584247: "BOXX BGR",
        /* BXRG */ 0x42585247: "BOXX RGB",
        /* BXY2 */ 0x42585932: "BOXX 10-bit YUV",
        /* BXYV */ 0x42585956: "BOXX YUV",
        /* BYR1 */ 0x42595231: "Raw Bayer data w/8 bits per sample",
        /* BYR2 */ 0x42595232: "Raw Bayer data w/12 bit precision samples in 16 bit words",
        /* CC12 */ 0x43433132: "Intel YUV12 / AuraVision Aura 2",
        /* CDV5 */ 0x43445635: "Canopus SD50 / DVHD",
        /* CDVC */ 0x43445643: "Canopus DV Codec",
        /* CDVH */ 0x43445648: "Canopus SD50 / DVHD",
        /* CFCC */ 0x43464343: "DPS Perception Motion JPEG",
        /* CFHD */ 0x43464844: "CineForm 10-bit Visually Perfect HD (Wavelet)",
        /* CGDI */ 0x43474449: "Microsoft Office 97 Camcorder Video",
        /* CHAM */ 0x4348414D: "Winnov Caviara Champagne",
        /* CJPG */ 0x434A5047: "Creative Video Blaster Webcam Go JPEG",
        /* CLJR */ 0x434C4A52: "Cirrus Logic YUV 4:1:1",
        /* CLLC */ 0x434C4C43: "Canopus LossLess",
        /* CLPL */ 0x434C504C: "Format similar to YV12 but including a level of indirection",
        /* CM10 */ 0x434D3130: "CyberLink MediaShow 1.0",
        /* CMYK */ 0x434D594B: "Common Data Format in Printing",
        /* COL0 */ 0x434F4C30: "Microsoft MPEG-4 v3",
        /* COL1 */ 0x434F4C31: "Microsoft MPEG-4 v3",
        /* CPLA */ 0x43504C41: "Weitek 4:2:0 YUV planar",
        /* CRAM */ 0x4352414D: "Microsoft Video 1",
        /* CSCD */ 0x43534344: "CamStudio Lossless Codec",
        /* CT10 */ 0x43543130: "CyberLink TalkingShow 1.0",
        /* CTRX */ 0x43545258: "Citrix Scalable Video Codec",
        /* CUVC */ 0x43555643: "Canopus HQ",
        /* CVID */ 0x43564944: "Cinepak by SuperMac",
        /* CWLT */ 0x43574C54: "Microsoft Color WLT DIB",
        /* CXY1 */ 0x43585931: "Conexant YUV 4:1:1",
        /* CXY2 */ 0x43585932: "Conexant YUV 4:2:2",
        /* CYUV */ 0x43595556: "Creative Labs YUV",
        /* CYUY */ 0x43595559: "ATI YUV",
        /* D261 */ 0x44323631: "DEC H.261, 24-bit",
        /* D263 */ 0x44323633: "DEC H.263, 24-bit",
        /* DAVC */ 0x44415643: "Dicas MPEGable H.264 / MPEG-4 AVC",
        /* DC25 */ 0x44433235: "MainConcept ProDV Codec",
        /* DCAP */ 0x44434150: "Pinnacle DV25 Codec",
        /* DCL1 */ 0x44434C31: "Data Connection Conferencing Codec",
        /* DCL2 */ 0x44434C32: "Data Connection Conferencing Codec",
        /* DCL3 */ 0x44434C33: "Data Connection Conferencing Codec",
        /* DCL4 */ 0x44434C34: "Data Connection Conferencing Codec",
        /* DCL5 */ 0x44434C35: "Data Connection Conferencing Codec",
        /* DCT0 */ 0x44435430: "WniWni Codec",
        /* DFSC */ 0x44465343: "DebugMode FrameServer VFW Codec",
        /* DIV1 */ 0x44495631: "FFmpeg OpenDivX",
        /* DIV2 */ 0x44495632: "Microsoft MPEG-4 v2",
        /* DIV3 */ 0x44495633: "DivX 3 Low-Motion",
        /* DIV4 */ 0x44495634: "DivX 3 Fast-Motion",
        /* DIV5 */ 0x44495635: "DivX 5.0",
        /* DIV6 */ 0x44495636: "DivX MPEG-4 / Microsoft MPEG-4 v3",
        /* DIVX */ 0x44495658: "DivX 4.0+ / OpenDivX",
        /* DJPG */ 0x444A5047: "Broadway 101 Motion JPEG codec",
        /* DM4V */ 0x444D3456: "Dicas MPEGable MPEG-4",
        /* DMB1 */ 0x444D4231: "Matrox Rainbow Runner Motion JPEG w/hardware compression",
        /* DMB2 */ 0x444D4232: "Paradigm Motion JPEG",
        /* DMK2 */ 0x444D4B32: "ViewSonic V36 PDA Video",
        /* DP02 */ 0x44503032: "DynaPel MPEG-4",
        /* DP16 */ 0x44503136: "YUV411 w/DPCM 6-bit compression",
        /* DP18 */ 0x44503138: "YUV411 w/DPCM 8-bit compression",
        /* DP26 */ 0x44503236: "YUV422 w/DPCM 6-bit compression",
        /* DP28 */ 0x44503238: "YUV422 w/DPCM 8-bit compression",
        /* DP96 */ 0x44503936: "YVU9 w/DPCM 6-bit compression",
        /* DP98 */ 0x44503938: "YVU9 w/DPCM 8-bit compression",
        /* DP9L */ 0x4450394C: "YVU9 w/DPCM 6-bit compression and thinned-out",
        /* DPS0 */ 0x44505330: "DPS Reality Motion JPEG",
        /* DPSC */ 0x44505343: "DPS PAR Motion JPEG",
        /* DRWX */ 0x44525758: "Pinnacle DV25 Codec",
        /* DSVD */ 0x44535644: "Microsoft DirectShow DV",
        /* DTMT */ 0x44544D54: "Media-100 Codec",
        /* DTNT */ 0x44544E54: "Media-100 Codec",
        /* DUCK */ 0x4455434B: "Duck TrueMotion S",
        /* DV10 */ 0x44563130: "BlueFish444 Lossless RGBA, YUV 10-bit",
        /* DV25 */ 0x44563235: "Matrox DVCPRO codec",
        /* DV50 */ 0x44563530: "Matrox DVCPRO50 codec",
        /* DVAN */ 0x4456414E: "Pinnacle miroVideo DV300 SW-only codec",
        /* DVCP */ 0x44564350: "Apple QuickTime DV (DVCPRO PAL)",
        /* DVCS */ 0x44564353: "MainConcept DV Codec",
        /* DVE2 */ 0x44564532: "Insoft DVE-2 Videoconferencing Codec",
        /* DVH1 */ 0x44564831: "Pinnacle DVHD100",
        /* DVHD */ 0x44564844: "DV 1125 lines at 30.00 Hz or 1250 lines at 25.00 Hz",
        /* DVIS */ 0x44564953: "VSYNC DualMoon Iris DV codec",
        /* DVLP */ 0x44564C50: "Radius SoftDV 16:9 PAL",
        /* DVMA */ 0x44564D41: "Darim Vision DVMPEG",
        /* DVNM */ 0x44564E4D: "Matsushita/Panasonic Video",
        /* DVOR */ 0x44564F52: "BlueFish444 Lossless RGBA, YUC 10-bit",
        /* DVPN */ 0x4456504E: "Apple QuickTime DV NTSC",
        /* DVPP */ 0x44565050: "Apple QuickTime DV PAL",
        /* DVR1 */ 0x44565231: "TARGA2000 Codec",
        /* DVRS */ 0x44565253: "VSYNC DualMoon Iris DV codec",
        /* DVSD */ 0x44565344: "DV 525 lines at 29.97 Hz or 625 lines at 25.00 Hz",
        /* DVSL */ 0x4456534C: "DV compressed in SD",
        /* DVX1 */ 0x44565831: "Lucent DVX1000SP Video Decoder",
        /* DVX2 */ 0x44565832: "Lucent DVX2000S Video Decoder",
        /* DVX3 */ 0x44565833: "Lucent DVX3000S Video Decoder",
        /* DX50 */ 0x44583530: "DivX 5.0",
        /* DXGM */ 0x4458474D: "EA Game Video Codec / Lord of the Rings Game Movies",
        /* DXSB */ 0x44585342: "DivX Subtitles Codec",
        /* DXT1 */ 0x44585431: "DirectX Compressed Texture w/1-bit alpha-channel)",
        /* DXT2 */ 0x44585432: "DirectX Compressed Texture",
        /* DXT3 */ 0x44585433: "DirectX Compressed Texture w/4-bit alpha-channel)",
        /* DXT4 */ 0x44585434: "DirectX Compressed Texture",
        /* DXT5 */ 0x44585435: "DirectX Compressed Texture w/3-bit alpha channel and interpolation)",
        /* DXTC */ 0x44585443: "DirectX Texture Compression",
        /* DXTN */ 0x4458544E: "DirectX Compressed Texture (DXTn)",
        /* EKQ0 */ 0x454B5130: "Elsa Graphics Card Quick Codec",
        /* ELK0 */ 0x454C4B30: "Elsa Graphics Card Codec",
        /* EM2V */ 0x454D3256: "Etymonix MPEG-2 I-frame",
        /* EMWC */ 0x454D5743: "EverAd Marquee WMA codec",
        /* EQK0 */ 0x45514B30: "Elsa graphics card quick codec",
        /* ES07 */ 0x45533037: "Eyestream 7 Codec",
        /* ESCP */ 0x45534350: "*|Escape|Eidos Technologies Escape codec",
        /* ETV1 */ 0x45545631: "eTreppid Video Codec",
        /* ETV2 */ 0x45545632: "eTreppid Video Codec",
        /* ETVC */ 0x45545643: "eTreppid Video Codec",
        /* FFDS */ 0x46464453: "FFDShow supported",
        /* FFV1 */ 0x46465631: "FFDShow Lossless video Codec",
        /* FFVH */ 0x46465648: "FFDShow FFVH Codec",
        /* FLIC */ 0x464C4943: "Autodesk FLI / FLC Animation|Autodesk FLI/FLC Animation",
        /* FLJP */ 0x464C4A50: "D-Vision Field Encoded Motion JPEG w/LSI",
        /* FLV1 */ 0x464C5631: "FFDShow FLV1 codec",
        /* FMJP */ 0x464D4A50: "D-Vision field-based ISO MJPEG",
        /* FMP4 */ 0x464D5034: "FFMpeg MPEG-4",
        /* FMVC */ 0x464D5643: "Fox Magic Software Screen Capture Codec",
        /* FPS1 */ 0x46505331: "Fraps Codec",
        /* FRLE */ 0x46524C45: "SoftLab-NSK Y16 + Alpha RLE",
        /* FRWA */ 0x46525741: "SoftLab-NSK Vision Forward Motion JPEG w/alpha-channel",
        /* FRWD */ 0x46525744: "SoftLab-NSK Vision Forward Motion JPEG",
        /* FRWT */ 0x46525754: "SoftLab-NSK Vision Forward Motion JPEG w/alpha-channel",
        /* FRWU */ 0x46525755: "SoftLab-NSK Vision Forward Uncompressed",
        /* FVF1 */ 0x46564631: "Iterated Systems Fractal Video Frame",
        /* FVFW */ 0x46564657: "XviD-based FFMpeg MPEG-4 codec",
        /* FXT1 */ 0x46585431: "3dfx Video",
        /* GEOX */ 0x47454F58: "GEOMEPG4",
        /* GEPJ */ 0x4745504A: "White Pine/Paradigm Matrix Motion JPEG Codec",
        /* GJPG */ 0x474A5047: "Grand Tech GT891x Codec",
        /* GLCC */ 0x474C4343: "GigaLink AV Capture codec",
        /* GLZW */ 0x474C5A57: "Motion LZW",
        /* GPEG */ 0x47504547: "Motion JPEG w/Floating Point",
        /* GPJM */ 0x47504A4D: "Pinnacle ReelTime Motion JPEG Codec",
        /* GREY */ 0x47524559: "Single 8-bit Y plane for monochrome images",
        /* GWLT */ 0x47574C54: "Microsoft Greyscale WLT DIB",
        /* H260 */ 0x48323630: "Intel ITU H.260",
        /* H261 */ 0x48323631: "Intel ITU H.261",
        /* H262 */ 0x48323632: "Intel ITU H.262",
        /* H263 */ 0x48323633: "Intel ITU H.263",
        /* H264 */ 0x48323634: "Intel ITU H.264",
        /* H265 */ 0x48323635: "Intel ITU H.265",
        /* H266 */ 0x48323636: "Intel ITU H.266",
        /* H267 */ 0x48323637: "Intel ITU H.267",
        /* H268 */ 0x48323638: "Intel ITU H.268",
        /* H269 */ 0x48323639: "Intel ITU H.263 for POTS-based videoconferencing",
        /* HD10 */ 0x48443130: "BlueFish444 Lossless RGBA, YUC 10-bit",
        /* HDX4 */ 0x48445834: "Jomigo HDX4",
        /* HDYC */ 0x48445943: "Raw YUV 4:2:2",
        /* HEVC */ 0x48455643: "H.265/HEVC",
        /* HFYU */ 0x48465955: "Huffman Lossless Codec",
        /* HMCR */ 0x484D4352: "Rendition Motion Compensation Format",
        /* HMRR */ 0x484D5252: "Rendition Motion Compensation Format",
        /* I263 */ 0x49323633: "Intel ITU H.263",
        /* I420 */ 0x49343230: "Intel Indeo 4 H.263",
    /* ICLB */ 0x49434C42: "*|CellB Videoconferencing Codec|InSoft CellB Videoconferencing Codec|InSoft, Inc. CellB videoconferencing codec",
    /* IDM0 */ 0x49444D30: "IDM Motion Wavelets 2.0",
    /* IF09 */ 0x49463039: "<a href="/codec/indeo">Indeo YVU9</a>|Microsoft H.261",
    /* IFO9 */ 0x49464F39: "Intel intermediate YUV9",
    /* IGOR */ 0x49474F52: "*|Power DVD|Power DVD",
    /* IJLV */ 0x494A4C56: "*",
    /* IJPG */ 0x494A5047: "*|Intergraph JPEG|Intergraph JPEG",
    /* ILVC */ 0x494C5643: "*|Layered Video|Intel Layered Video|Intel layered Video",
    /* ILVR */ 0x494C5652: "*|<a href="/codec/h264">ITU H.263+ Codec</a>|ITU H.263+ Codec|ITU-T's H.263+ compression standard",
    /* IMAC */ 0x494D4143: "Intel hardware motion compensation",
    /* IMC1 */ 0x494D4331: "As YV12, except the U and V planes each have the same stride as the Y plane",
    /* IMC2 */ 0x494D4332: "Similar to IMC1, except that the U and V lines are interleaved at half stride boundaries",
    /* IMC3 */ 0x494D4333: "As IMC1, except that U and V are swapped",
    /* IMC4 */ 0x494D4334: "As IMC2, except that U and V are swapped",
    /* IMJG */ 0x494D4A47: "Accom SphereOUS  MJPEG with Alpha-channel",
    /* IPDV */ 0x49504456: "*|Giga AVI DV Codec|Giga AVI DV Codec|IEEE 1394 digital video control and capture board format",
    /* IPJ2 */ 0x49504A32: "ImagePower MJPEG2000|Image Power JPEG2000",
    /* IPMA */ 0x49504D41: "*",
    /* IR21 */ 0x49523231: "*|<a href="/codec/indeo">Indeo 2.1</a>|Intel Indeo 2.1",
    /* IRAW */ 0x49524157: "*|Intel YUV Uncompressed|Intel YUV Uncompressed|Intel YUV uncompressed",
    /* ISME */ 0x49534D45: "*|Intel's next-generation video codec",
    /* IUYV */ 0x49555956: "Interlaced version of UYVY|Interlaced version of UYVY (line order 0,2,4 then 1,3,5 etc)|UYVY interlaced (even, then odd lines)",
    /* IV30 */ 0x49563330: "Intel Indeo Video 3",
    /* IV31 */ 0x49563331: "Intel Indeo Video 3.1",
    /* IV32 */ 0x49563332: "*|Intel Indeo Video 3.2",
    /* IV33 */ 0x49563333: "Intel Indeo Video 3.3",
    /* IV34 */ 0x49563334: "Intel Indeo Video 3.4",
    /* IV35 */ 0x49563335: "Intel Indeo Video 3.5",
    /* IV36 */ 0x49563336: "Intel Indeo Video 3.6",
    /* IV37 */ 0x49563337: "Intel Indeo Video 3.7",
    /* IV38 */ 0x49563338: "Intel Indeo Video 3.8",
    /* IV39 */ 0x49563339: "Intel Indeo Video 3.9|Intel Indeo Video Version 3",
    /* IV40 */ 0x49563430: "Intel Indeo Video 4.0",
    /* IV41 */ 0x49563431: "Intel Indeo Video 4.1",
    /* IV42 */ 0x49563432: "Intel Indeo Video 4.2",
    /* IV43 */ 0x49563433: "Intel Indeo Video 4.3",
    /* IV44 */ 0x49563434: "Intel Indeo Video 4.4",
    /* IV45 */ 0x49563435: "Intel Indeo Video 4.5",
    /* IV46 */ 0x49563436: "Intel Indeo Video 4.6",
    /* IV47 */ 0x49563437: "Intel Indeo Video 4.7",
    /* IV48 */ 0x49563438: "Intel Indeo Video 4.8",
    /* IV49 */ 0x49563439: "Intel Indeo Video 4.9|Intel Indeo Video Version 4",
    /* IV50 */ 0x49563530: "*|Intel Indeo Video 5.0 Wavelet|Intel Indeo Video Version 5",
    /* IY41 */ 0x49593431: "Interlaced version of Y41P|Interlaced version of Y41P (line order 0,2,4,...,1,3,5...)|LEAD Technologies, Inc. Y41P interlaced (even, then odd lines)",
    /* IYU1 */ 0x49595531: "12 bit IEEE 1394 Digital Camera|12 bit format used in mode 2 of the IEEE 1394 Digital Camera 1.04 spec|IEEE 1394 Digital Camera 1.04 Specification: mode 2, 12-bit YUV (4:1:1)",
    /* IYU2 */ 0x49595532: "24 bit IEEE 1394 Digital Camera|24 bit format used in mode 2 of the IEEE 1394 Digital Camera 1.04 spec|IEEE 1394 Digital Camera 1.04 Specification: mode 2, 24 bit YUV (4:4:4)",
    /* IYUV */ 0x49595556: "Planar YUV format|Intel Indeo iYUV 4:2:0",
    /* JBYR */ 0x4A425952: "*|</td><td>Kensington?|Kensington Video Codec",
    /* JFIF */ 0x4A464946: "Motion JPEG (FFmpeg)",
    /* JPEG */ 0x4A504547: "*|Still Image JPEG DIB|Still Image JPEG DIB|Microsoft Corporation Still image JPEG DIB.",
    /* JPGL */ 0x4A50474C: "*|Pegasus Lossless Motion JPEG|DIVIO JPEG Light for WebCams (Pegasus Lossless JPEG)",
    /* KMVC */ 0x4B4D5643: "*|Karl Morton's Video Codec (presumably)|Karl Morton Video Codec",
    /* KPCD */ 0x4B504344: "Kodak Photo CD",
    /* L261 */ 0x4C323631: "*|Lead Technologies H.261",
    /* L263 */ 0x4C323633: "*|Lead Technologies H.263",
    /* LAGS */ 0x4C414753: "Lagarith LossLess",
    /* LBYR */ 0x4C425952: "*|Creative WebCam codec",
    /* LCMW */ 0x4C434D57: "*|Lead Technologies Motion CMW Codec",
    /* LCW2 */ 0x4C435732: "*|Lead CMW wavelet 2.0|LEADTools MCMW 9Motion Wavelet)",
    /* LEAD */ 0x4C454144: "*|LEAD Video Codec|LEAD Video Codec|LEAD Technologies, Inc. Proprietary MCMP compression",
    /* LGRY */ 0x4C475259: "*|Lead Technologies Grayscale Image",
    /* LIA1 */ 0x4C494131: "Liafail",
    /* LJ11 */ 0x4C4A3131: "*",
    /* LJ22 */ 0x4C4A3232: "*",
    /* LJ2K */ 0x4C4A324B: "*|LEADTools JPEG2000",
    /* LJ44 */ 0x4C4A3434: "*",
    /* LJPG */ 0x4C4A5047: "*|LEAD Motion JPEG Codec|LEAD Technologies, Inc. Lossless JPEG compression",
    /* LMP2 */ 0x4C4D5032: "*|LEADTools MPEG2",
    /* LMP4 */ 0x4C4D5034: "*",
    /* LOCO */ 0x4C4F434F: "LOCO Lossless Codec",
    /* LSCR */ 0x4C534352: "LEAD Screen Capture",
    /* LSV0 */ 0x4C535630: "Infinop Inc. Video",
    /* LSVC */ 0x4C535643: "*|Infinop Lightning Strike constant bit rate video codec",
    /* LSVM */ 0x4C53564D: "*|Vianet Lighting Strike Vmail (Streaming)|Vianet Lighting Strike Vmail (Streaming)",
    /* LSVW */ 0x4C535657: "Infinop Lightning Strike multiple bit rate video codec",
    /* LSVX */ 0x4C535658: "*",
    /* LZO1 */ 0x4C5A4F31: "*|LZO compressed (lossless codec)",
    /* M101 */ 0x4D313031: "Matrox Electronic Systems, Ltd. Uncompressed field-based YUY2",
    /* M261 */ 0x4D323631: "*|Microsoft H.261",
    /* M263 */ 0x4D323633: "*|Microsoft H.263",
    /* M4CC */ 0x4D344343: "ESS MPEG4 Divio codec",
    /* M4S2 */ 0x4D345332: "*|Fully Compliant MPEG-4 v2|Microsoft MPEG-4 (hacked MS MPEG-4)|Microsoft ISO MPEG-4 video V1.1",
    /* MC12 */ 0x4D433132: "*|Motion Compensation Format|ATI Motion Compensation Format",
    /* MC24 */ 0x4D433234: "MainConcept Motion JPEG Codec",
    /* MCAM */ 0x4D43414D: "*|Motion Compensation Format|ATI Motion Compensation Format",
    /* MCZM */ 0x4D435A4D: "Theory MicroCosm Lossless 64bit RGB with Alpha-channel",
    /* MDVD */ 0x4D445644: "Alex MicroDVD Video|Alex MicroDVD Video (hacked MS MPEG-4)",
    /* MDVF */ 0x4D445646: "Pinnacle DV/DV50/DVHD100",
    /* MHFY */ 0x4D484659: "A.M.Paredes mhuffyYUV (LossLess)",
    /* MJ2C */ 0x4D4A3243: "*|Morgan Multimedia JPEG2000 Compression|Morgan Multimedia JPEG2000 Compression",
    /* MJPA */ 0x4D4A5041: "Pinnacle ReelTime MJPG hardware codec",
    /* MJPB */ 0x4D4A5042: "Motion JPEG codec",
    /* MJPG */ 0x4D4A5047: "*|Motion JPEG DIB Format|Motion JPEG including Huffman Tables|Motion JPEG",
    /* MJPX */ 0x4D4A5058: "Pegasus PICVideo Motion JPEG",
    /* MMES */ 0x4D4D4553: "*|Matrox MPEG-2 I-frame|Matrox MPEG-2 I-frame|Matrox MPEG-2 elementary video stream",
    /* MMIF */ 0x4D4D4946: "Matrox MPEG-2 elementary I-frame-only video stream",
    /* MNVD */ 0x4D4E5644: "MindBend MindVid LossLess",
    /* MP2A */ 0x4D503241: "*|Media Excel MPEG-2 Audio|Media Excel Inc. MPEG-2 audio",
    /* MP2T */ 0x4D503254: "*|Media Excel MPEG-2 Transport Stream|Media Excel Inc. MPEG-2 transport",
    /* MP2V */ 0x4D503256: "*|Media Excel MPEG-2 Video|Media Excel Inc. MPEG-2 video",
    /* MP41 */ 0x4D503431: "<a href='/codec/mpeg-4'>MPEG-4 Windows Media Video</a>|Microsoft MPEG-4 V1 (enhansed H263)",
    /* MP42 */ 0x4D503432: "*|<a href='/codec/mpeg-4'>MPEG-4 Windows Media Video</a>|Microsoft MPEG-4 V2|Microsoft MPEG-4 video codec V2",
    /* MP43 */ 0x4D503433: "*|<a href='/codec/mpeg-4'>MPEG-4 Windows Media Video</a>|Microsoft MPEG-4 V3|Microsoft MPEG-4 Version 3 Video",
    /* MP4A */ 0x4D503441: "*|Media Excel MPEG-4 Audio|Media Excel Inc. MPEG-4 audio",
    /* MP4S */ 0x4D503453: "*|Microsoft MPEG-4 (Windows Media 7.0)|Microsoft ISO MPEG-4 video V1.0",
    /* MP4T */ 0x4D503454: "*|Media Excel MPEG-4 Transport Stream|Media Excel Inc. MPEG-4 transport",
    /* MP4V */ 0x4D503456: "*|FFmpeg MPEG-4|Apple QuickTime MPEG-4 native|Media Excel Inc. MPEG-4 video",
    /* MPEG */ 0x4D504547: "*|MPEG-1|Chromatic MPEG 1 Video I Frame|Chromatic Research, Inc. MPEG-1 video, I frame",
    /* MPG1 */ 0x4D504731: "FFmpeg-1",
    /* MPG2 */ 0x4D504732: "FFmpeg-1",
    /* MPG3 */ 0x4D504733: "FFmpeg DivX ;-) (MS MPEG-4 v3)|Same as Low motion DivX MPEG-4",
    /* MPG4 */ 0x4D504734: "*|<a href='/codec/mpeg-4'>MPEG-4</a>|Microsoft MPEG-4 V1|Microsoft MPEG-4 Version 1 Video",
    /* MPGI */ 0x4D504749: "*|MPEG|Sigma Design MPEG-1 I-frame",
    /* MPNG */ 0x4D504E47: "PNG images decoder|Motion PNG codec",
    /* MR16 */ 0x4D523136: "*",
    /* MRCA */ 0x4D524341: "*|Mrcodec|FAST Multimedia MR Codec|FAST Multimedia AG Mrcodec",
    /* MRLE */ 0x4D524C45: "*|Run Length Encoding|Microsoft Run Length Encoding|Microsoft Run length encoding",
    /* MSS1 */ 0x4D535331: "Windows Screen Video|Windows Screen Video|Microsoft screen codec V1",
    /* MSS2 */ 0x4D535332: "Windows Media 9",
    /* MSUC */ 0x4D535543: "MSU LossLess",
    /* MSV1 */ 0x4D535631: "Microsoft video codec V1",
    /* MSVC */ 0x4D535643: "*|<a href='/codec/video1'>Video 1</a>|Microsoft Video 1|Microsoft Video 1",
    /* MSZH */ 0x4D535A48: "*|LCL (Lossless Codec Library)|Lossless codec (ZIP compression)",
    /* MTGA */ 0x4D544741: "Motion TGA images (24, 32 bpp)",
    /* MTX1 */ 0x4D545831: "Matrox Motion-JPEG codec",
    /* MTX2 */ 0x4D545832: "Matrox Motion-JPEG codec",
    /* MTX3 */ 0x4D545833: "Matrox Motion-JPEG codec",
    /* MTX4 */ 0x4D545834: "Matrox Motion-JPEG codec",
    /* MTX5 */ 0x4D545835: "Matrox Motion-JPEG codec",
    /* MTX6 */ 0x4D545836: "Matrox Motion-JPEG codec",
    /* MTX7 */ 0x4D545837: "Matrox Motion-JPEG codec",
    /* MTX8 */ 0x4D545838: "Matrox Motion-JPEG codec",
    /* MTX9 */ 0x4D545839: "Matrox Motion-JPEG codec",
    /* MV12 */ 0x4D563132: "Motion Pixels Codec|Motion Pixels Codec (old)",
    /* MVC9 */ 0x4D564339: "Nokia MVC video codec",
    /* MVI1 */ 0x4D564931: "*|Motion Pixels|Motion Pixels MVI",
    /* MVI2 */ 0x4D564932: "*|Motion Pixels|Motion Pixels MVI",
    /* MWV1 */ 0x4D575631: "*|Aware Motion Wavelets|Aware Motion Wavelets",
    /* MYUV */ 0x4D595556: "Media-100 844/X Uncompressed",
    /* NAVI */ 0x4E415649: "*|nAVI video codec (hacked MS MPEG-4)",
    /* NDIG */ 0x4E444947: "Ahead Nero Digital MPEG-4 Codec",
    /* NDSC */ 0x4E445343: "*",
    /* NDSM */ 0x4E44534D: "*",
    /* NDSP */ 0x4E445350: "*",
    /* NDSS */ 0x4E445353: "*",
    /* NDXC */ 0x4E445843: "*",
    /* NDXH */ 0x4E445848: "*",
    /* NDXP */ 0x4E445850: "*",
    /* NDXS */ 0x4E445853: "*",
    /* NHVU */ 0x4E485655: "*|NVidia Texture Format (GEForce 3)",
    /* NI24 */ 0x4E493234: "*",
    /* NO16 */ 0x4E4F3136: "Theory None16 64bit uncompressed RAW",
    /* NT00 */ 0x4E543030: "NewTek LightWave HDTV YUV with Alpha-channel|NewTek LigtWave HDTV YUV with Alpha-channel",
    /* NTN1 */ 0x4E544E31: "*|Video Compression 1|Nogatech Video Compression 1|Nogatech video compression 1",
    /* NTN2 */ 0x4E544E32: "*|Nogatech Video Compression 2 (GrabBee hardware coder)",
    /* NTSC */ 0x4E545343: "Radius SoftDV 16:9 NTSC",
    /* NUV1 */ 0x4E555631: "NuppelVideo|NuppelVideo",
    /* NV12 */ 0x4E563132: "8-bit Y plane followed by an interleaved U/V plane with 2x2 subsampling",
    /* NV21 */ 0x4E563231: "As NV12 with U and V reversed in the interleaved plane",
    /* NVDS */ 0x4E564453: "*|nVidia Texture Format",
    /* NVHS */ 0x4E564853: "*|NVidia Texture Format (GEForce 3)",
    /* NVS0 */ 0x4E565330: "nVidia Texture Compression Format",
    /* NVS1 */ 0x4E565331: "nVidia Texture Compression Format",
    /* NVS2 */ 0x4E565332: "nVidia Texture Compression Format",
    /* NVS3 */ 0x4E565333: "nVidia Texture Compression Format",
    /* NVS4 */ 0x4E565334: "nVidia Texture Compression Format",
    /* NVS5 */ 0x4E565335: "nVidia Texture Compression Format",
    /* NVT0 */ 0x4E565430: "nVidia Texture Compression Format",
    /* NVT1 */ 0x4E565431: "nVidia Texture Compression Format",
    /* NVT2 */ 0x4E565432: "nVidia Texture Compression Format",
    /* NVT3 */ 0x4E565433: "nVidia Texture Compression Format",
    /* NVT4 */ 0x4E565434: "nVidia Texture Compression Format",
    /* NVT5 */ 0x4E565435: "nVidia Texture Compression Format",
    /* NY12 */ 0x4E593132: "Nogatech YUV 12 format",
    /* NYUV */ 0x4E595556: "Nogatech YUV 422 format",
    /* PCL2 */ 0x50434C32: "Pinnacle RL video codec",
    /* PCLE */ 0x50434C45: "Pinnacle Studio 400 video codec",
    /* PDVC */ 0x50445643: "*|DVC codec|Panasonic DV codec",
    /* PGVV */ 0x50475656: "*|Radius Video Vision|Radius Video Vision Telecast (adaptive JPEG)",
    /* PHMO */ 0x50484D4F: "*|Photomotion|IBM Photomotion|IBM Corporation Photomotion",
    /* PIM1 */ 0x50494D31: "*|MPEG Realtime|Pinnacle DC1000 hardware codec (MPEG compression)",
    /* PIM2 */ 0x50494D32: "*|</td><td>Pegasus Imaging |Pegasus Imaging codec",
    /* PIMJ */ 0x50494D4A: "*|Lossless JPEG|Pegasus Imaging PICvideo Lossless JPEG",
    /* PIXL */ 0x5049584C: "*|MiroXL, Pinnacle PCTV|MiroVideo XL (Motion JPEG)",
    /* PJPG */ 0x504A5047: "*",
    /* PNG1 */ 0x504E4731: "Corecodec.org CorePNG Codec",
    /* PVEZ */ 0x5056455A: "*|PowerEZ|Horizons Technology PowerEZ codec",
    /* PVMM */ 0x50564D4D: "*|PacketVideo Corporation MPEG-4|PacketVideo Corporation MPEG-4",
    /* PVW2 */ 0x50565732: "*|Pegasus Wavelet Compression|Pegasus Imaging Wavelet 2000",
    /* PVWV */ 0x50565756: "Pegasus Imaging Wavelet 2000",
    /* PXLT */ 0x50584C54: "Apple Pixlet Codec|Apple Pixlet (Wavelet)",
    /* QDGX */ 0x51444758: "Apple QuickDraw GX",
    /* QPEG */ 0x51504547: "*|Q-Team|Q-Team QPEG 1.1|Q-Team QPEG 1.1 format video codec",
    /* QPEQ */ 0x51504551: "*|Q-Team QPEG 1.1",
    /* R210 */ 0x52323130: "BlackMagic YUV (Quick Time)",
    /* R411 */ 0x52343131: "Radius DV NTSC YUV",
    /* R420 */ 0x52343230: "Radius DV PAL YUV",
    /* RAVI */ 0x52415649: "GroupTRON ReferenceAVI codec (dummy for MPEG compressor)",
    /* RGB1 */ 0x52474231: "Uncompressed RGB332 3:3:2",
    /* RGBA */ 0x52474241: "Raw RGB w/ Alpha|Raw RGB with alpha",
    /* RGBO */ 0x5247424F: "Uncompressed RGB555 5:5:5",
    /* RGBP */ 0x52474250: "Uncompressed RGB565 5:6:5",
    /* RGBQ */ 0x52474251: "Uncompressed RGB555X 5:5:5 BE",
    /* RGBR */ 0x52474252: "Uncompressed RGB565X 5:6:5 BE",
    /* RGBT */ 0x52474254: "*|Raw RGB w/ Transparency|Uncompressed RGB with transparency|Computer Concepts Ltd. 32-bit support",
    /* RIVA */ 0x52495641: "NVIDIA Corporation Swizzled texture format",
    /* RLE4 */ 0x524C4534: "*|RLE 4bpp RGB|Run length encoded 4bpp RGB image",
    /* RLE8 */ 0x524C4538: "*|RLE 8bpp RGB|Run length encoded 8bpp RGB image",
    /* RLND */ 0x524C4E44: "Roland Corporation Video",
    /* RMP4 */ 0x524D5034: "*|REALmagic MPEG-4|REALmagic MPEG-4 Video Codec (Sigma Design, built on XviD)",
    /* ROQV */ 0x524F5156: "Id RoQ File Video Decoder|Id RoQ File Video Decoder",
    /* RPZA */ 0x52505A41: "*|Quicktime Apple Video|Apple Video 16 bit "road pizza"",
    /* RT21 */ 0x52543231: "*|Indeo 2.1|Intel Real Time Video 2.1|Intel Indeo 2.1",
    /* RTV0 */ 0x52545630: "NewTek VideoToaster (dummy format - only AVI header)",
    /* RUD0 */ 0x52554430: "Rududu video codec|Rududu video codec",
    /* RV10 */ 0x52563130: "RealVideo codec",
    /* RV13 */ 0x52563133: "RealVideo codec",
    /* RV20 */ 0x52563230: "*|RealVideo G2",
    /* RV30 */ 0x52563330: "*|RealVideo 8",
    /* RV40 */ 0x52563430: "*|RealVideo 9",
    /* S263 */ 0x53323633: "S263 codec (supported by ffdshow)|Sorenson Vision H.263",
    /* S422 */ 0x53343232: "*|VideoCap C210 YUV Codec",
    /* SAN3 */ 0x53414E33: "*|MPEG-4 codec (direct copy of DivX 3.11a)",
    /* SCCD */ 0x53434344: "Luminositi SoftCam codec",
    /* SDCC */ 0x53444343: "*|Digital Camera Codec|Sun Digital Camera Codec|Sun Digital Camera codec",
    /* SEDG */ 0x53454447: "*|Samsung MPEG-4 codec",
    /* SFMC */ 0x53464D43: "*|Surface Fitting Method|Crystal Net SFM (Surface Fitting Method) Codec|Crystal Net SFM codec",
    /* SHR0 */ 0x53485230: "BitJazz SheerVideo (realtime lossless)",
    /* SHR1 */ 0x53485231: "BitJazz SheerVideo (realtime lossless)",
    /* SHR2 */ 0x53485232: "BitJazz SheerVideo (realtime lossless)",
    /* SHR3 */ 0x53485233: "BitJazz SheerVideo (realtime lossless)",
    /* SHR4 */ 0x53485234: "BitJazz SheerVideo (realtime lossless)",
    /* SHR5 */ 0x53485235: "BitJazz SheerVideo (realtime lossless)",
    /* SHR6 */ 0x53485236: "BitJazz SheerVideo (realtime lossless)",
    /* SHR7 */ 0x53485237: "BitJazz SheerVideo (realtime lossless)",
    /* SJPG */ 0x534A5047: "CUseeMe Networks Codec",
    /* SL25 */ 0x534C3235: "SoftLab-NSK DVCPRO",
    /* SL50 */ 0x534C3530: "SoftLab-NSK DVCPRO50",
    /* SLDV */ 0x534C4456: "SoftLab-NSK Forward DV Draw codec",
    /* SLIF */ 0x534C4946: "SoftLab-NSK MPEG2 I-frames",
    /* SLMJ */ 0x534C4D4A: "SoftLab-NSK Forward MJPEG",
    /* SMKA */ 0x534D4B41: "*",
    /* SMP4 */ 0x534D5034: "*",
    /* SMSC */ 0x534D5343: "*|Proprietary codec|Radius proprietary codec",
    /* SMSD */ 0x534D5344: "*|Proprietary codec|Radius proprietary codec|Radius Proprietary",
    /* SMSV */ 0x534D5356: "*|WorldConnect Wavelet Streaming Video",
    /* SNOW */ 0x534E4F57: "SNOW codec (supported by ffdshow)",
    /* SP40 */ 0x53503430: "*|SunPlus YUV",
    /* SP44 */ 0x53503434: "*|<a href='/codec/sp54'>This is the only FOURCC used by Sunplus codec</a>|SunPlus Aiptek MegaCam Codec",
    /* SP53 */ 0x53503533: "SunPlus Aiptek MegaCam Codec",
    /* SP54 */ 0x53503534: "*|<a href='/codec/sp54'>Sunplus Sp54 Codec for Mustek GSmart Mini 2</a>|SunPlus Aiptek MegaCam Codec",
    /* SP55 */ 0x53503535: "SunPlus Aiptek MegaCam Codec",
    /* SP56 */ 0x53503536: "SunPlus Aiptek MegaCam Codec",
    /* SP57 */ 0x53503537: "SunPlus Aiptek MegaCam Codec",
    /* SP58 */ 0x53503538: "SunPlus Aiptek MegaCam Codec",
    /* SPIG */ 0x53504947: "*|Spigot|Radius Spigot",
    /* SPLC */ 0x53504C43: "Splash Studios ACM Audio Codec|Splash Studios ACM Audio Codec|Splash Studios ACM audio codec",
    /* SPRK */ 0x5350524B: "Sorenson Spark",
    /* SQZ2 */ 0x53515A32: "*|VXTreme Video Codec V2|Microsoft VXTreme Video Codec V2|Microsoft VXtreme video codec V2",
    /* STVA */ 0x53545641: "*|ST CMOS Imager Data (Bayer)|ST CMOS Imager Data (Bayer)",
    /* STVB */ 0x53545642: "*|ST CMOS Imager Data (Nudged Bayer)|ST CMOS Imager Data (Nudged Bayer)",
    /* STVC */ 0x53545643: "*|ST CMOS Imager Data (Bunched)|ST CMOS Imager Data (Bunched)",
    /* STVX */ 0x53545658: "*|ST CMOS Imager Data (Extended)",
    /* STVY */ 0x53545659: "*|ST CMOS Imager Data (Extended with Correction Data)",
    /* SV10 */ 0x53563130: "*|Video R1|Sorenson Media Video R1|Sorenson Video R1",
    /* SV3M */ 0x5356334D: "Sorenson SV3 module decoder",
    /* SVQ1 */ 0x53565131: "*|<a href='/codec/sorenson'>Sorenson Video</a>|Sorenson Video (Apple Quicktime 3)",
    /* SVQ3 */ 0x53565133: "*|Sorenson Video 3 (Apple Quicktime 5)|Sorenson Video 3 (Apple Quicktime 5)",
    /* SWC1 */ 0x53574331: "MainConcept Motion JPEG Codec",
    /* T420 */ 0x54343230: "Toshiba YUV 4:2:0|Toshiba YUV 4:2:0",
    /* THEO */ 0x5448454F: "FFVFW Supported Codec",
    /* TIFF */ 0x54494646: "Apple TIFF (with Alpha-channel)",
    /* TIM2 */ 0x54494D32: "Pinnacle RAL DVI",
    /* TLMS */ 0x544C4D53: "*|Motion Intraframe Codec|TeraLogic Motion Infraframe Codec A",
    /* TLST */ 0x544C5354: "*|Motion Intraframe Codec|TeraLogic Motion Infraframe Codec B|TeraLogic motion intraframe codec",
    /* TM20 */ 0x544D3230: "*|Duck TrueMotion 2.0|The Duck Corporation TrueMotion 2.0",
    /* TM2A */ 0x544D3241: "Duck TrueMotion Archiver 2.0",
    /* TM2X */ 0x544D3258: "*|Duck TrueMotion 2X",
    /* TMIC */ 0x544D4943: "*|Motion Intraframe Codec|TeraLogic Motion Intraframe Codec 2|TeraLogic motion intraframe codec",
    /* TMOT */ 0x544D4F54: "*|TrueMotion S|TrueMotion Video Compression|TrueMotion video compression algorithm",
    /* TR20 */ 0x54523230: "*|TrueMotion RT 2.0|Duck TrueMotion RT 2.0|The Duck Corporation TrueMotion RT 2.0",
    /* TRLE */ 0x54524C45: "Akula Alpha Pro Custom AVI (LossLess)",
    /* TRON */ 0x54524F4E: "GroupTRON ReferenceAVI codec (dummy for MPEG compressor)",
    /* TSCC */ 0x54534343: "*|TechSmith Screen Capture Codec|TechSmith Screen Capture Codec",
    /* TV10 */ 0x54563130: "*|Tecomac Low-Bit Rate Codec|Tecomac Low-Bit Rate Codec",
    /* TVJP */ 0x54564A50: "*|Targa 2000 board|TrueVision Field Encoded Motion JPEG (Targa emulation)",
    /* TVMJ */ 0x54564D4A: "*|Targa 2000 board|Truevision TARGA MJPEG Hardware Codec (or Targa emulation)",
    /* TY0N */ 0x5459304E: "*|Tecomac Low-Bit Rate Codec|Trident Decompression Driver",
    /* TY2C */ 0x54593243: "*|Trident Decompression Driver|Trident Decompression Driver",
    /* TY2N */ 0x5459324E: "*|</td><td>Trident Microsystems|Trident Decompression Driver",
    /* U263 */ 0x55323633: "UB Video H.263/H.263+/H.263++ Decoder|UB Video StreamForce H.263",
    /* UCOD */ 0x55434F44: "*|ClearVideo|ClearVideo (fractal compression-based codec)",
    /* ULTI */ 0x554C5449: "*|Ultimotion|IBM Corp. Ultimotion|IBM Corporation Ultimotion",
    /* UMP4 */ 0x554D5034: "UB Video MPEG 4|UB Video MPEG 4",
    /* UYNV */ 0x55594E56: "Same as UYVY|A direct copy of UYVY registered by nVidia to work around problems in some old codecs which did not like hardware that offered more than 2 UYVY surfaces",
    /* UYVP */ 0x55595650: "YCbCr 4:2:2 extended precision|YCbCr 4:2:2 extended precision 10-bits per component in U0Y0V0Y1 order|Evans & Sutherland YCbCr 4:2:2 extended precision, 10 bits per component (U0Y0V0Y1)",
    /* UYVU */ 0x55595655: "SoftLab-NSK Forward YUV codec",
    /* UYVY */ 0x55595659: "UYVY|YUV 4:2:2 (Y sample at every pixel, U and V sampled at every second pixel horizontally on each line)",
    /* V210 */ 0x56323130: "*|Optibase VideoPump 10-bit 4:2:2 Component YCbCr",
    /* V261 */ 0x56323631: "*|Lucent VX2000S|Lucent elemedia VX3000S|Lucent VX3000S video codec",
    /* V422 */ 0x56343232: "24-bit YUV 4:2:2|Vitec Multimedia YUV 4:2:2 as for UYVY, but with different component ordering within the u_int32 macropixel|VITEC Multimedia 24-bit YUV 4:2:2 format (CCIR 601)",
    /* V655 */ 0x56363535: "*|16-bit YUV 4:2:2|Vitec Multimedia 16 bit YUV 4:2:2 (6:5:5) format|VITEC Multimedia 16-bit YUV 4:2:2 format",
    /* VBLE */ 0x56424C45: "MarcFD VBLE Lossless Codec",
    /* VCR1 */ 0x56435231: "*|ATI VCR 1.0|ATI VCR 1.0",
    /* VCR2 */ 0x56435232: "*|ATI VCR 2.0 (MPEG YV12)",
    /* VCR3 */ 0x56435233: "ATI VCR 3.0",
    /* VCR4 */ 0x56435234: "ATI VCR 4.0",
    /* VCR5 */ 0x56435235: "ATI VCR 5.0",
    /* VCR6 */ 0x56435236: "ATI VCR 6.0",
    /* VCR7 */ 0x56435237: "ATI VCR 7.0",
    /* VCR8 */ 0x56435238: "ATI VCR 8.0",
    /* VCR9 */ 0x56435239: "ATI VCR 9.0",
    /* VCWV */ 0x56435756: "VideoCon wavelet",
    /* VDCT */ 0x56444354: "*|Video Maker Pro DIB|Video Maker Pro DIB|VITEC Multimedia Video Maker Pro DIB",
    /* VDOM */ 0x56444F4D: "*|VDOWave|VDOnet VDOWave",
    /* VDOW */ 0x56444F57: "*|<a href='/codec/vdolive'>VDOLive</a>|VDOLive (H.263)",
    /* VDST */ 0x56445354: "VirtualDub remote frameclient ICM driver",
    /* VDTZ */ 0x5644545A: "*|VideoTizer YUV Codec|Darim Vision VideoTizer YUV",
    /* VGPX */ 0x56475058: "*|VGPixel Codec|Alaris VideoGramPixel Codec|Alaris VGPixel video",
    /* VIDM */ 0x5649444D: "DivX 5.0 Pro Supported Codec",
    /* VIDS */ 0x56494453: "*|YUV 4:2:2 CCIR 601 for V422|Vitec Multimedia YUV 4:2:2 codec|VITEC Multimedia YUV 4:2:2 CCIR 601 for v422",
    /* VIFP */ 0x56494650: "*|VFAPI Reader Codec|Virtual Frame API codec (VFAPI dummy format)",
    /* VIV1 */ 0x56495631: "<a href='/codec/ffmpeg'>FFmpeg</a> H263+ decoder|Vivo H.263",
    /* VIV2 */ 0x56495632: "<a href='/codec/vivo'>Vivo H.263</a>|Vivo H.263",
    /* VIVO */ 0x5649564F: "*|<a href='/codec/vivo'>Vivo H.263</a>|Vivo H.263|Vivo H.263 video codec",
    /* VIXL */ 0x5649584C: "*|Video XL|MiroVideo XL (Motion JPEG)|miro Computer Products AG",
    /* VJPG */ 0x564A5047: "Video Communication Systems - A JPEG-based compression scheme for RGB bitmaps",
    /* VLV1 */ 0x564C5631: "*|Videologic codec|VideoLogic codec|VideoLogic Systems VLCAP.DRV",
    /* VP30 */ 0x56503330: "*|VP3|On2 (ex Duck TrueMotion) VP3",
    /* VP31 */ 0x56503331: "*|VP3|On2 (ex Duck TrueMotion) VP3",
    /* VP40 */ 0x56503430: "*|VP4|On2 TrueCast VP4",
    /* VP50 */ 0x56503530: "*|VP5|On2 TrueCast VP5",
    /* VP60 */ 0x56503630: "*|VP6|On2 TrueCast VP6",
    /* VP61 */ 0x56503631: "*|On2 TrueCast VP6.1",
    /* VP62 */ 0x56503632: "*|On2 TrueCast VP6.2",
    /* VP70 */ 0x56503730: "*|VP7|On2 TrueMotion VP7",
    /* VP80 */ 0x56503830: "*",
    /* VQC1 */ 0x56514331: "*|Vector-quantised codec 1 (high compression) http://eprints.ecs.soton.ac.uk/archive/00001310/01/VTC97-js.pdf|ViewQuest Technologies Inc. 0x31435156",
    /* VQC2 */ 0x56514332: "*|Vector-quantised codec 2 (research)|Vector-quantised codec 2 (high robustness against channel errors) http://eprints.ecs.soton.ac.uk/archive/00001310/01/VTC97-js.pdf|ViewQuest Technologies Inc. 0x32435156",
    /* VQJC */ 0x56514A43: "*",
    /* VQJP */ 0x56514A50: "ViewQuest Technologies Inc. VQ630 dual-mode digital camera",
    /* VQS4 */ 0x56515334: "ViewQuest Technologies Inc. VQ110 digital video camera",
    /* VR21 */ 0x56523231: "BlackMagic YUV (Quick Time)",
    /* VSSH */ 0x56535348: "VSS H.264|Vanguard VSS H.264",
    /* VSSV */ 0x56535356: "*|VSS Codec Light|Vanguard Software Solutions Video Codec",
    /* VSSW */ 0x56535357: "VSS Wavelet Video Codec|Vanguard VSS H.264",
    /* VTLP */ 0x56544C50: "Alaris VideoGramPiX|Alaris VideoGramPixel Codec",
    /* VUUU */ 0x56555555: "*",
    /* VX1K */ 0x5658314B: "*|VX1000S Video Codec|Lucent VX1000S Video Codec|Lucent VX1000S video codec",
    /* VX2K */ 0x5658324B: "*|VX2000S Video Codec|Lucent VX2000S Video Codec|Lucent VX2000S video codec",
    /* VXSP */ 0x56585350: "*|VX1000SP Video Codec|Lucent VX1000SP Video Codec|Lucent VX1000SP video codec9",
    /* VYU9 */ 0x56595539: "*|ATI YUV|ATI Technologies YUV",
    /* VYUY */ 0x56595559: "*|ATI YUV|ATI Packed YUV Data",
    /* WBVC */ 0x57425643: "*|W9960|Winbond W9960 codec|Winbond Electronics Corporation W9960",
    /* WHAM */ 0x5748414D: "*|<a href='/codec/video1'>Microsoft Video 1</a>|Microsoft Video 1",
    /* WINX */ 0x57494E58: "*|Winnov Software Compression|Winnov Software Compression|Winnov, Inc. Video",
    /* WJPG */ 0x574A5047: "*|Winbond JPEG?|Winbond JPEG (AverMedia USB devices)|Winbond motion JPEG bitstream format",
    /* WMV1 */ 0x574D5631: "*|<a href='/codec/ffmpeg'>FFmpeg</a> MS WMV1|Windows Media Video V7|Microsoft Windows Media Video Version 7",
    /* WMV2 */ 0x574D5632: "*|Windows Media Video 8|Windows Media Video V8|Microsoft Windows Media Video Version 8",
    /* WMV3 */ 0x574D5633: "*|Windows Media Video V9|Microsoft Windows Media Video Version 9",
    /* WMV7 */ 0x574D5637: "Windows Media Video 7",
    /* WMV8 */ 0x574D5638: "Windows Media Video 8",
    /* WMV9 */ 0x574D5639: "Possibly the same as VC-9, proposed new HD codec",
    /* WMVA */ 0x574D5641: "*|WMVA codec (supported by ffdshow)",
    /* WMVP */ 0x574D5650: "Windows Media Video V9",
    /* WNIX */ 0x574E4958: "WniWni Codec",
    /* WNV1 */ 0x574E5631: "*|Winnov Hardware Compression|WinNow Videum Hardware Compression",
    /* WNVA */ 0x574E5641: "Winnov hw compress",
    /* WPY2 */ 0x57505932: "Winnov, Inc. Video",
    /* WRLE */ 0x57524C45: "Apple QuickTime BMP Codec",
    /* WRPR */ 0x57525052: "VideoTools VideoServer Client Codec (wrapper for AviSynth)",
    /* WV1F */ 0x57563146: "WV1F codec (supported by ffdshow)",
    /* WVC1 */ 0x57564331: "*",
    /* WVLT */ 0x57564C54: "IllusionHope Wavelet 9/7",
    /* WVP2 */ 0x57565032: "WVP2 codec (supported by ffdshow)",
    /* WZCD */ 0x575A4344: "CORE Co. Ltd. iScan",
    /* WZDC */ 0x575A4443: "CORE Co. Ltd. iSnap",
    /* X263 */ 0x58323633: "*|Xirlink H.263",
    /* X264 */ 0x58323634: "*|XiWave GNU GPL x264 MPEG-4 Codec",
    /* XJPG */ 0x584A5047: "Xirlink JPEG-like compressor",
    /* XLV0 */ 0x584C5630: "*|XL Video Decoder|NetXL Inc. XL Video Decoder|XL video decoder",
    /* XMPG */ 0x584D5047: "*|XING MPEG|XING MPEG (I frame only)",
    /* XVID */ 0x58564944: "*|<a href='/codec/xvid'>XviD</a>|XviD MPEG-4 codec|XviD Video",
    /* XVIX */ 0x58564958: "Based on XviD MPEG-4 codec",
    /* XWV0 */ 0x58575630: "XiWave Video Codec",
    /* XWV1 */ 0x58575631: "XiWave Video Codec",
    /* XWV2 */ 0x58575632: "XiWave Video Codec",
    /* XWV3 */ 0x58575633: "XiWave Video Codec (Xi-3 Video)",
    /* XWV4 */ 0x58575634: "XiWave Video Codec",
    /* XWV5 */ 0x58575635: "XiWave Video Codec",
    /* XWV6 */ 0x58575636: "XiWave Video Codec",
    /* XWV7 */ 0x58575637: "XiWave Video Codec",
    /* XWV8 */ 0x58575638: "XiWave Video Codec",
    /* XWV9 */ 0x58575639: "XiWave Video Codec",
    /* XXAN */ 0x5858414E: "*|Codec useing Huffman and RLE encoding paired with basic interframing|Origin Video Codec (used in Wing Commander 3 and 4)",
    /* XYZP */ 0x58595A50: "Extended PAL format XYZ palette|Extended PAL format XYZ palette (www.riff.org)",
    /* Y211 */ 0x59323131: "YUV packed|Packed YUV format with Y sampled at every second pixel across each line and U and V sampled at every fourth pixel",
    /* Y216 */ 0x59323136: "Pinnacle TARGA CineWave YUV (Quick Time)",
    /* Y411 */ 0x59343131: "*|Same as Y41P|YUV 4:1:1 Packed",
    /* Y41B */ 0x59343142: "YUV 4:1:1 Planar|YUV 4:1:1 Planar",
    /* Y41P */ 0x59343150: "*|YUV 4:1:1 Packed|Conexant (ex Brooktree) YUV 4:1:1 Raw",
    /* Y41T */ 0x59343154: "PC1 4:1:1 with transparency|Format as for Y41P, but the lsb of each Y component is used to signal pixel transparency",
    /* Y422 */ 0x59343232: "Copy of UYVY used in Pyro WebCam firewire camera|Direct copy of UYVY as used by ADS Technologies Pyro WebCam firewire camera",
    /* Y42B */ 0x59343242: "YUV 4:2:2 Planar|YUV 4:2:2 Planar",
    /* Y42T */ 0x59343254: "UYVY with pixel transparency support|Format as for UYVY, but the lsb of each Y component is used to signal pixel transparency",
    /* Y444 */ 0x59343434: "*|IYU2 (iRez Stealth Fire camera)",
    /* Y800 */ 0x59383030: "Simple, single Y plane for monochrome images|Simple grayscale video",
    /* YC12 */ 0x59433132: "*|YUV 12 codec|Intel YUV12 Codec|Intel YUV12 Video",
    /* YCCK */ 0x5943434B: "Uncompressed YCbCr Video with key data",
    /* YMPG */ 0x594D5047: "YMPEG Alpha (dummy for MPEG-2 compressor)",
    /* YU12 */ 0x59553132: "ATI YV12 4:2:0 Planar",
    /* YU92 */ 0x59553932: "YUV|Intel - YUV|Intel YUV Video",
    /* YUNV */ 0x59554E56: "Same as YUY2|A direct copy of YUY2 registered by nVidia to work around problems in some old codecs which did not like hardware that offered more than 2 YUY2 surfaces",
    /* YUV2 */ 0x59555632: "Apple Component Video (YUV 4:2:2)",
    /* YUV8 */ 0x59555638: "*|MM_WINNOV_CAVIAR_YUV8|Winnov Caviar YUV8|Winnov Caviar YUV8 Video",
    /* YUV9 */ 0x59555639: "*|YUV9|Intel YUV9|Intel YUV Video",
    /* YUVP */ 0x59555650: "*|Extended PAL format YUV palette|YCbCr 4:2:2 extended precision 10-bits per component in Y0U0Y1V0 order",
    /* YUY2 */ 0x59555932: "*|YUV packed 4:2:2|YUV 4:2:2 as for UYVY but with different component ordering within the u_int32 macropixel",
    /* YUYP */ 0x59555950: "Evans & Sutherland YCbCr 4:2:2 extended precision, 10 bits per component Video",
    /* YUYV */ 0x59555956: "*|BI_YUYV, Canopus|Canopus YUV format|Canopus YUYV Compressor Video",
    /* YV12 */ 0x59563132: "*|Identical to IYUV but the order of the U and V planes is switched|ATI YVU12 4:2:0 Planar",
    /* YV16 */ 0x59563136: "*|Elecard YUV 4:2:2 Planar",
    /* YV92 */ 0x59563932: "*|Intel Smart Video Recorder YVU9",
    /* YVU9 */ 0x59565539: "Planar YUV format|Brooktree YVU9 Raw (YVU9 Planar)",
    /* YVYU */ 0x59565955: "YUV packed 4:2:2|YUV 4:2:2 as for UYVY but with different component ordering within the u_int32 macropixel",
    /* ZLIB */ 0x5A4C4942: "*|LCL (Lossless Codec Library) zlib compression|Lossless codec (ZIP compression)",
    /* ZMBV */ 0x5A4D4256: "*",
    /* ZPEG */ 0x5A504547: "*|Video Zipper|Metheus Video Zipper|Metheus Corporation Video Zipper",
    /* ZPG4 */ 0x5A504734: "VoDeo Solutions Video",
    /* ZYGO */ 0x5A59474F: "*|ZyGo Video Codec",
    /* ZYYY */ 0x5A595959: "*",

};


    private readonly _bitCount: number;
    private readonly _colorsUsed: number;
    private readonly _compressionId: number;
    private readonly _headerSize: number;
    private readonly _height: number;
    private readonly _imageSize: number;
    private readonly _importantColors: number;
    private readonly _planes: number;
    private readonly _width: number;
    private readonly _xPixelsPerMeter: number;
    private readonly _yPixelsPerMeter: number;

    /**
     * Constructs and initializes a new instance by reading the raw structure from a specified
     * position in the provided {@link ByteVector}.
     * @param data ByteVector containing the raw data structure
     * @param offset Index into `data` where the raw bitmap info header begins. Must be a positive,
     *     32-bit integer.
     */
    public constructor(data: ByteVector, offset: number) {
        Guards.truthy(data, "data");
        Guards.uint(offset, "offset");
        if (offset + 40 < data.length) {
            throw new CorruptFileError("Expected 40 bytes");
        }

        this._headerSize = data.mid(offset, 4).toUInt(false);
        this._width = data.mid(offset + 4, 4).toUInt(false);
        this._height = data.mid(offset + 8, 4).toUInt(false);
        this._planes = data.mid(offset + 12, 2).toUShort(false);
        this._bitCount = data.mid(offset + 14, 2).toUShort(false);
        this._compressionId = data.mid(offset + 16, 4).toUInt(false);
        this._imageSize = data.mid(offset + 20, 4).toUInt(false);
        this._xPixelsPerMeter = data.mid(offset + 24, 4).toUInt(false);
        this._yPixelsPerMeter = data.mid(offset + 28, 4).toUInt(false);
        this._colorsUsed = data.mid(offset + 32, 4).toUInt(false);
        this._importantColors = data.mid(offset + 36, 4).toUInt(false);
    }

    // #region Properties

    /**
     * Gets the number of bits per pixel (bpp). For uncompressed formats, this value is the average
     * number of bits per pixel. For compressed formats, this value is the implied bit depth of the
     * uncompressed image, after the image has been decoded.
     */
    public get bitCount(): number { return this._bitCount; }

    /**
     * Gets the number of color indices in the color table that are actually used by the bitmap.
     */
    public get colorsUsed(): number { return this._colorsUsed; }

    /**
     * Gets the compression ID for the image.
     * @remarks For compressed video and YUV formats, this is a FOURCC code, specified as a DWORD in
     *     little-endian order. For more information, see
     *     {@link https://docs.microsoft.com/en-us/windows/win32/directshow/fourcc-codes} and
     *     {@link https://www.fourcc.org/fourcc.php}. For uncompressed RGB formats, the following
     *     values are possible:
     *     * `BI_RGB` = `0x00000000` => Uncompressed RGB
     *     * `BI_BITFIELDS` = `0x00000003` => Uncompressed RGB with color masks, valid for 16 and
     *       32 bpp bitmaps.
     *
     *     {@link description} makes a best guess attempt to determine the name of the compression
     *     codec used.
     */
    public get compressionId(): number { return this._compressionId; }

    /**
     * @inheritDoc
     * @developerNotes This list was cobbled together using
     *   * The original .NET source
     *   * https://omiod.com/codec/list.php
     *   * https://www.fourcc.org/
     *   If any FOURCCs are missing or wrong, submit a PR and include a link to some source saying
     *   this FOURCC exists.
     */
    public get description(): string {
        switch (this._compressionId) {
            case 0x31393738: // 1978
                return "A.M.Paredes predictor";
            case 0x32565559: // 2VUY
                return "2VUY / BlackMagic";
            case 0x33495630: // 3IV0
                return "3ivx";
            case 0x33495631: // 3IV1
                return "3ivx";
            case 0x33495632: // 3IV2
                return "3ivx";
            case 0x33495644: // 3IVD
                return "FFmpeg DivX (MS MPEG-4 v3)";
            case 0x33495658: // 3IVX
                return "3ivx";
            case 0x33564944: // 3VID
                return "3ivx (MPEG4-based)";
            case 0x38425053: // 8BPS
                return "Planar RGB Codec";
            case 0x41415334: // AAS4
                return "Autodesk Animator codec (RLE)";
            case 0x41415343: // AASC
                return "Autodesk Animator codec (RLE)";
            case 0x41425952: // ABYR
                return "Kensington codec";
            case 0x4143544C: // ACTL
                return "Streambox ACT-L2";
            case 0x41445631: // ADV1
                return "WaveCodec";
            case 0x4144564A: // ADVJ
                return "Avid M-JPEG";
            case 0x4145494B: // AEIK
                return "Intel Indeo Video 3.2";
            case 0x41454D49: // AEMI
                return "Array VideoONE MPEG1-I Capture";
            case 0x41464C43: // AFLC
                return "Autodesk Animator FLC (256 color)";
            case 0x41464C49: // AFLI
                return "AFLI - Autodesk Animator FLI (256 color)";
            case 0x41484456: // AHDV
                return "CineForm 10-bit Visually Perfect HD (Wavelet)";
            case 0x414A5047: // AJPG
                return "22fps JPEG-based codec for digital cameras";
            case 0x414C4143: // ALAC
                return "Apple lossless audio";
            case 0x414C5048: // ALPH
                return "Ziracom Video";
            case 0x414D5047: // AMPG
                return "Array VideoONE MPEG";
            case 0x414E494D: // ANIM
                return "Intel RDX";
            case 0x41503431: // AP41
                return "AngelPotion Definitive";
            case 0x41503432: // AP42
                return "AngelPotion Definitive (Hack Microsoft MP43)";
            case 0x41534C43: // ASLC
                return "Alparysoft Lossless Codec";
            case 0x41535631: // ASV1
                return "Asus Video";
            case 0x41535632: // ASV2
                return "Asus Video (2)";
            case 0x41535658: // ASVX
                return "Asus Video 2.0";
            case 0x41544D34: // ATM4
                return "Ahead Nero Digital MPEG-4 Codec";
            case 0x41555232: // AUR2
                return "AuraVision Aura 2 Codec - YUV 422";
            case 0x41555241: // AURA
                return "AuraVision Aura 1 Codec - YUV 411";
            case 0x41555658: // AUVX
                return "USH GmbH AUVX video codec";
            case 0x41563158: // AV1X
                return "Avid 1:1x (Quick Time)";
            case 0x41564331: // AVC1
                return "H.264/MPEG-4 AVC";
            case 0x41564431: // AVD1
                return "Avid DV (Quick Time)";
            case 0x4156444A: // AVDJ
                return "Independent JPEG Group's codec";
            case 0x4156444E: // AVDN
                return "Avid DNxHD (Quick Time)";
            case 0x41564456: // AVDV
                return "Avid DV";
            case 0x41564931: // AVI1
                return "MainConcept Motion JPEG Codec";
            case 0x41564932: // AVI2
                return "MainConcept Motion JPEG Codec";
            case 0x41564944: // AVID
                return "Avid Motion JPEG";
            case 0x41564953: // AVIS
                return "Wrapper for AviSynth (Dummy codec)";
            case 0x41564D50: // AVMP
                return "Avid IMX (Quick Time)";
            case 0x4156524E: // AVRN
                return "Independent JPEG Group's codec";
            case 0x41565549: // AVUI
                return "Avid Meridien Uncompressed w/alpha";
            case 0x41565550: // AVUP
                return "Avid 10bit Packed (Quick Time)";
            case 0x41595556: // AYUV
                return "4:4:4 YUV format";
            case 0x415A5052: // AZPR
                return "Quicktime Apple Video";
            case 0x415A5250: // AZRP
                return "Apple QuickTime";
            case 0x42484956: // BHIV
                return "BeHere iVideo";
            case 0x42494E4B: // BINK
                return "Bink Video";
            case 0x4249544D: // BITM
                return "Microsoft H.261";
            case 0x424C4F58: // BLOX
                return "Jan Jezabek BLOX MPEG Codec";
            case 0x424C5A30: // BLZ0
                return "FFmpeg MPEG-4";
            case 0x424D5631: // BMV1
                return "MicroFirst Bitmap Video";
            case 0x42543230: // BT20
                return "Brooktree MediaStream Codec";
            case 0x42544356: // BTCV
                return "Brooktree Composite Video Codec";
            case 0x42545643: // BTVC
                return "Conexant Composite Video";
            case 0x42573030: // BW00
                return "BergWave (Wavelet)";
            case 0x42573130: // BW10
                return "Broadway MPEG Capture/Compression";
            case 0x42584247: // BXBG
                return "BOXX BGR";
            case 0x42585247: // BXRG
                return "BOXX RGB";
            case 0x42585932: // BXY2
                return "BOXX 10-bit YUV";
            case 0x42585956: // BXYV
                return "BOXX YUV";
            case 0x43433132: // CC12
                return "Intel YUV12 Codec";
            case 0x43445635: // CDV5
                return "Canopus SD50/DVHD";
            case 0x43445643: // CDVC
                return "Canopus DV Codec";
            case 0x43445648: // CDVH
                return "Canopus SD50/DVHD";
            case 0x43464343: // CFCC
                return "DPS Perception";
            case 0x43464844: // CFHD
                return "CineForm 10-bit Visually Perfect HD (Wavelet)";
            case 0x43474449: // CGDI
                return "Microsoft CamCorder in Office 97";
            case 0x4348414D: // CHAM
                return "Winnov Caviara Champagne";
            case 0x434A5047: // CJPG
                return "WebCam JPEG";
            case 0x434C4A52: // CLJR
                return "Cirrus Logic AccuPak";
            case 0x434C4C43: // CLLC
                return "Canopus LossLess";
            case 0x434C504C: // CLPL
                return "Format similar to YV12 but including a level of indirection.";
            case 0x434D3130: // CM10
                return "CyberLink Corporation MediaShow 1.0.";
            case 0x434D594B: // CMYK
                return "Common Data Format in Printing";
            case 0x434F4C30: // COL0
                return "FFmpeg DivX ;-) (MS MPEG-4 v3)";
            case 0x434F4C31: // COL1
                return "FFmpeg DivX ;-) (MS MPEG-4 v3)";
            case 0x43504C41: // CPLA
                return "Weitek 4:2:0 YUV Planar";
            case 0x4352414D: // CRAM
                return "Microsoft Video 1";
            case 0x43534344: // CSCD
                return "CamStudio Codec";
            case 0x43543130: // CT10
                return "CyberLink Corporation TalkingShow 1.0.";
            case 0x43545258: // CTRX
                return "Citrix Scalable Video Codec";
            case 0x43555643: // CUVC
                return "Canopus HQ";
            case 0x43564944: // CVID
                return "Cinepak by SuperMac";
            case 0x43574C54: // CWLT
                return "Microsoft Corporation Video";
            case 0x43585931: // CXY1
                return "Conexant YUV 4:1:1";
            case 0x43585932: // CXY2
                return "Conexant YUV 4:2:2";
            case 0x43595556: // CYUV
                return "Creative Labs YUV";
            case 0x43595559: // CYUY
                return "ATI Proprietary YUV compression algorithm";
            case 0x44323631: // D261
                return "H.261, 24bit";
            case 0x44323633: // D263
                return "H.263, 24bit";
            case 0x44434C31: // DCL1
                return "Data Connection Conferencing Codec";
            case 0x44495631: // DIV1
                return "FFmpeg OpenDivX";
            case 0x44495632: // DIV2
                return "Microsoft MPEG-4 v1/v2";
            case 0x44495633: // DIV3
                return "DivX 3 Low-Motion";
            case 0x44495634: // DIV4
                return "DivX 3 Fast-Motion";
            case 0x44495635: // DIV5
                return "DivX 5.0";
            case 0x44495636: // DIV6
                return "DivX (MS MPEG-4 v3)";
            case 0x44495658: // DIVX
                return "DivX Video";
            case 0x444a5047: // DJPG
                return "Broadway 101 Motion JPEG codec";
            case 0x444D4231: // DMB1
                return "Rainbow Runner hardware compression";
            case 0x444D4232: // DMB2
                return "MJPEG";
            case 0x44503136: // DP16
                return "YUV411 with DPCM 6-bit compression";
            case 0x44503138: // DP18
                return "YUV411 with DPCM 8-bit compression";
            case 0x44503236: // DP26
                return "YUV422 with DPCM 6-bit compression";
            case 0x44503238: // DP28
                return "YUV422 with DPCM 8-bit compression";
            case 0x44503936: // DP96
                return "YVU9 with DPCM 6-bit compression";
            case 0x44503938: // DP98
                return "YVU9 with DPCM 8-bit compression";
            case 0x4450394c: // DP9L
                return "YVU9 with DPCM 6-bit compression and thinned-out";
            case 0x44505330: // DPS0
                return "DPS Reality Motion JPEG";
            case 0x44505343: // DPSC
                return "DPS PAR Motion JPEG";
            case 0x44535644: // DSVD
                return "DV Codec";
            case 0x4455434B: // DUCK
                return "The Duck Corporation TrueMotion 1.0";
            case 0x44563235: // DV25
                return "DVCPRO";
            case 0x44563530: // DV50
                return "DVCPRO50";
            case 0x44564532: // DVE2
                return "DVE-2 Videoconferencing Codec";
            case 0x44564831: // DVH1
                return "DVCPROHD";
            case 0x44564844: // DVHD
                return "50Mbps Consumer DV";
            case 0x44564D41: // DVMA
                return "Darim Vision DVMPEG";
            case 0x44564e4d: // DVNM:
                return "Matsushita Electrical Industrial Co., Ltd. Video";
            case 0x44565344: // DVSD
                return "25Mbps Consumer DV";
            case 0x4456534C: // DVSL
                return "12.5Mbps Consumer DV";
            case 0x44565831: // DVX1
                return "Lucent DVX1000SP Video Decoder";
            case 0x44565832: // DVX2
                return "Lucent DVX2000S Video Decoder";
            case 0x44565833: // DVX3
                return "Lucent DVX3000S Video Decoder";
            case 0x44583530: // DX50
                return "DivX Version 5 Video";
            case 0x4458474D: // DXGM
                return "Lord of the Rings game movies";
            case 0x44585443: // DXTC
                return "DirectX Texture Compression";
            case 0x454B5130: // EKQ0
                return "Elsa Quick Codec";
            case 0x454C4B30: // ELK0
                return "related to Elsa Graphics cards";
            case 0x454D3256: // EM2V
                return "Etymonix MPEG-2 Video";
            case 0x454D5743: // EMWC
                return "EverAd Marquee WMA Codec";
            case 0x45533037: // ES07
                return "Eyestream 7 Codec";
            case 0x45534350: // ESCP
                return "Escape";
            case 0x45545631: // ETV1
            case 0x45545632: // ETV2
            case 0x45545643: // ETVC
                return "eTreppid Video Codec";
            case 0x46465631: // FFV1
                return "FFMPEG Codec";
            case 0x464C4943: // FLIC
                return "Autodesk FLI / FLC Animation";
            case 0x464C4A50: // FLJP
                return "Field Encoded Motion JPEG with LSI Bitstream Format";
            case 0x464D5034: // FMP4
                return "FFMpeg";
            case 0x464D5643: // FMVC
                return "FM&amp;nbsp;Screen Capture Codec";
            case 0x46505331: // FPS1
                return "Fraps Codec";
            case 0x46525741: // FRWA
                return "Softlab-Nsk Ltd. Forward Motion JPEG with Alpha Channel";
            case 0x46525744: // FRWD
                return "Softlab-Nsk Ltd. Forward Motion JPEG";
            case 0x46525754: // FRWT
                return "Softlab-Nsk Ltd. Forward Motion JPEG+Alpha";
            case 0x46564631: // FVF1
                return "Iterated Systems, Inc. Fractal Video Frame";
            case 0x46585431: // FXT1:
                return "3dfx Interactive, Inc. Video";
            case 0x47454F58: // GEOX
                return "GEOMPEG4";
            case 0x474C5A57: // GLZW
                return "Motion LZW";
            case 0x47504547: // GPEG
                return "Motion JPEG";
            case 0x47574C54: // GWLT
                return "Microsoft Greyscale WLT DIB";
            case 0x48323631: // H261
                return "ITU H.261";
            case 0x48323632: // H262
                return "ITU H.261";
            case 0x48323633: // H263
                return "ITU H.263";
            case 0x48323634: // H264
                return "ITU H.264";
            case 0x48323635: // H265
                return "ITU H.265";
            case 0x48323636: // H261
                return "ITU H.266";
            case 0x48445943: // HDYC
                return "Raw YUV 4:2:2";
            case 0x48455643: // HEVC
                return "H.265/HEVC";
            case 0x48465955: // HFYU
                return "Huffman Lossless Codec";
            case 0x49323633: // I263
                return "ITU H.263";
            case 0x49343230: // I420
                return "RAW I420";
            case 0x49434C42: // ICLB
                return "InSoft, Inc. CellB Videoconferencing Codec";
            case 0x49463039: // IF09
                return "Intel Intermediate YVU9";
            case 0x49474F52: // IGOR
                return "Power DVD";
            case 0x494A4C56: // IJLV
                return "Intel JPEG Library Video Codec";
            case 0x494A5047: // IJPG
                return "Intergraph JPEG";
            case 0x494C5643: // ILVC
                return "Intel Layered Video";
            case 0x494C5652: // ILVR
                return "ITU H.263+ Codec";
            case 0x494D4143: // IMAC
                return "Intel Hardware Motion Compensation";
            case 0x49504456: // IPDV
                return "Giga AVI DV Codec";
            case 0x49504A32: // IPJ2
                return "ImagePower MJPEG2000";
            case 0x49504D41: // IPMA
                return "IPMA Video Codec";
            case 0x49523231: // IR21
                return "Intel Indeo 2.1";
            case 0x49524157: // IRAW
                return "Intel YUV Uncompressed";
            case 0x49534D45: // ISME
                return "Intel's Next-Generation Video Codec";
            case 0x49555956: // IUYV
                return "UYVY Interlaced";
            case 0x49563330: // IV30
            case 0x49563331: // IV30
                return "Intel Indeo 3";
            case 0x49563332: // IV32
                return "Intel Indeo 3.2";
            case 0x49563333: // IV33
            case 0x49563334: // IV34
            case 0x49563335: // IV35
            case 0x49563336: // IV36
            case 0x49563337: // IV37
            case 0x49563338: // IV38
            case 0x49563339: // IV39
                return "Intel Indeo 3";
            case 0x49563430: // IV40
            case 0x49563431: // IV41
            case 0x49563432: // IV42
            case 0x49563433: // IV43
            case 0x49563434: // IV44
            case 0x49563435: // IV45
            case 0x49563436: // IV46
            case 0x49563437: // IV47
            case 0x49563438: // IV48
            case 0x49563439: // IV49
                return "Intel Indeo 4.1";
            case 0x49563530: // IV50
                return "Intel Indeo 5";
            case 0x49593431: // IY41
                return "LEAD Technologies, Inc. Y41P Interlaced";
            case 0x49595531: // IYU1
                return "IEEE 1394 Digital Camera 1.04, 12-bit YUV (4:1:1)";
            case 0x49595532: // IYU2
                return "IEEE 1394 Digital Camera 1.04, 24-bit YUV (4:4:4)";
            case 0x49595556: // IYUV
                return "Planar YUV format";
            case 0x4A504547: // JPEG
                return "Microsoft Still Image JPEG DIB";
            case 0x4B4D5643: // KMVC
                return "Karl Morton's Video Codec";
            case 0x4C323633: // L263
                return "LEAD H.263";
            case 0x4C434D57: // LCMW
                return "LEAD MCMW Video Codec";
            case 0x4C435732: // LCW2
                return "LEAD MJPEG2000";
            case 0x4C454144: // LEAD
                return "LEAD Video Codec";
            case 0x4C494131: // LIA1
                return "Liafail";
            case 0x4C4A3131: // LJ11
                return "LEAD JPEG 4:1:1";
            case 0x4C4A3232: // LJ22
                return "LEAD JPEG 4:2:2";
            case 0x4C4A324B: // LJ2K
                return "LEAD MJPEG 2000";
            case 0x4C4A3434: // LJ44
                return "LEAD JPEG 4:4:4";
            case 0x4C4A5047: // LJPG
                return "LEAD MJPEG Codec";
            case 0x4C4D5032: // LMP2
                return "LEAD MPEG-2 Video Codec";
            case 0x4C4D5034: // LMP4
                return "LEAD MPEG-4 Video Codec";
            case 0x4C535630: // LSV0
                return "Infiniop Inc. Video";
            case 0x4C535643: // LSVC
                return "Infinop Lightning Strike CBR Video Codec";
            case 0x4C53564D: // LSVM
                return "Vianet Lighting Strike Vmail (Streaming)";
            case 0x4C535657: // LSVW:
                return "Infinop Lightning Strike MBR Video Codec";
            case 0x4C535658: // LSVX
                return "Lightning Strike Video Codec";
            case 0x4C5A4F31: // LZO1
                return "Lempel-Ziv-Oberhumer Codec";
            case 0x4d313031: // M101
                return "Matrox Electronic Systems, Ltd. Uncompressed field-based YUY2";
            case 0x4D345332: // M4S2
                return "Microsoft ISO MPEG-4 v1.1";
            case 0x4D433132: // MC12
                return "Motion Compensation Format";
            case 0x4D43414D: // MCAM
                return "Motion Compensation Format";
            case 0x4D445644: // MDVD
                return "Alex MicroDVD Video";
            case 0x4D4A3243: // MJ2C
                return "Motion JPEG 2000";
            case 0x4D4A5047: // MJPG
                return "Motion JPEG";
            case 0x4D4D4553: // MMES
                return "Matrox MPEG-2 Elementary Video Stream";
            case 0x4D4D4946: // MMIF
                return "Matrox MPEG-2 Elementary I-frame-only Video Stream";
            case 0x4D503241: // MP2A
                return "Media Excel Inc. MPEG-2 Audio";
            case 0x4D503254: // MP2T
                return "Media Excel Inc. MPEG-2 Transport";
            case 0x4D503256: // MP2V
                return "Media Excel Inc. MPEG-2 Video";
            case 0x4D503431: // MP41
                return "<a href='/codec/mpeg-4'>MPEG-4 Windows Media Video</a>";
            case 0x4D503432: // MP42
                return "Microsoft MPEG-4 Video Codec v2";
            case 0x4D503433: // MP43
                return "Microsoft MPEG-4 v3 Video";
            case 0x4D503441: // MP4A
                return "Media Excel Inc. MPEG-4 Audio";
            case 0x4D503453: // MP4S
                return "Microsoft ISO MPEG-4 Video v1.0";
            case 0x4D503454: // MP4T
                return "Media Excel Inc. MPEG-4 Transport";
            case 0x4D503456: // MP4V
                return "Media Excel Inc. MPEG-4 Video";
            case 0x4D504547: // MPEG
                return "Chromatic Research, Inc. MPEG-1 Video, I-frame";
            case 0x4D504733: // MPG3
                return "DivX MPEG4 Low Motion";
            case 0x4D504734: // MPG4
                return "Microsoft MPEG-4 v1 Video";
            case 0x4D504749: // MPGI
                return "MPEG";
            case 0x4D504E47: // MPNG
                return "Motion PNG Codec";
            case 0x4D524341: // MRCA
                return "FAST Multimedia MR Codec";
            case 0x4D524C45: // MRLE
                return "Microsoft Run Length Encoding";
            case 0x4D535331: // MSS1
                return "Windows Screen Video";
            case 0x4D535631: // MSV1
                return "Microsoft Video Codec v1";
            case 0x4D535643: // MSVC
                return "Microsoft Video 1";
            case 0x4D535A48: // MSZH
                return "Loss-Less Codec Library with ZIP Compression";
            case 0x4D563130: // MV10
            case 0x4D563131: // MV11
            case 0x4D563132: // MV12
            case 0x4D563939: // MV99
            case 0x4D564331: // MVC1
            case 0x4D564332: // MVC2
            case 0x4D564339: // MVC9
                return "Motion Pixels Codec";
            case 0x4D564931: // MVI1
                return "Motion Pixels MVI1 Codec";
            case 0x4D564932: // MVI2
                return "Motion Pixels MVI2 Codec";
            case 0x4D575631: // MWV1
                return "Aware Motion Wavelets";
            case 0x4E493234: // NI24
                return "ni24";
            case 0x4E543030: // NT00
                return "NewTek LightWave HDTV YUV with Alpha-channel";
            case 0x4E544E31: // NTN1
                return "Nogatech Video Compression 1";
            case 0x4E555631: // NUV1
                return "NuppelVideo";
            case 0x4E593132: // NY12
                return "Nogatech YUV 12 Format";
            case 0x4E595556: // NYUV
                return "Nogatech YUV 422 Format";
            case 0x50434c32: // PCL2
                return "Pinnacle RL Video Codec";
            case 0x50434C45: // PCLE
                return "Pinnacle Studio 400 Video Codec";
            case 0x50445643: // PDVC
                return "DVC codec";
            case 0x50475656: // PGVV
                return "Radius Video Vision";
            case 0x50484D4F: // PHMO
                return "IBM Photomotion";
            case 0x50494D31: // PIM1
                return "MPEG Realtime";
            case 0x50494D32: // PIM2
                return "</td><td>Pegasus Imaging ";
            case 0x50494D4A: // PIMJ
                return "Pegasus Lossless JPEG";
            case 0x5049584C: // PIXL
                return "Video XL";
            case 0x5056455A: // PVEZ
                return "PowerEZ";
            case 0x50564D4D: // PVMM
                return "PacketVideo Corporation MPEG-4";
            case 0x50565732: // PVW2
                return "Pegasus Wavelet 2000 Compression";
            case 0x50584C54: // PXLT
                return "Apple Pixlet Codec";
            case 0x51504547: // QPEG
                return "Q-Team QPEG 1.1 Format Video Codec";
            case 0x52474241: // RGBA
                return "Raw RGB w/ Alpha";
            case 0x52474254: // RGBT
                return "Raw RGB w/ Transparency";
            case 0x52495641: // RIVA
                return "NVIDIA Swizzled Texture Format";
            case 0x524C4534: // RLE4
                return "Run-length Encoded 4bpp RGB";
            case 0x524C4538: // RLE8
                return "Run-length Encoded 8bpp RGB";
            case 0x524C4E44: // RLND
                return "Roland Corporation Video";
            case 0x524D5034: // RMP4
                return "REALmagic MPEG-4";
            case 0x524F5156: // ROQV
                return "Id RoQ File Video Decoder";
            case 0x52505A41: // RPZA
                return "Apple Video";
            case 0x52543231: // RT21
                return "Intel Indeo 2.1";
            case 0x52554430: // RUD0
                return "Rududu video codec";
            case 0x53323633: // S263
                return "Sorenson Vision H.263";
            case 0x53343232: // S422
                return "VideoCap C210";
            case 0x53434344: // SCCD
                return "Luminositi SoftCam Codec";
            case 0x53444343: // SDCC
                return "Sun Digital Camera Codec";
            case 0x53464D43: // SFMC
                return "Crystal Net Surface Fitting Method Codec";
            case 0x534D4B41: // SMKA
                return "Smacker audio codec";
            case 0x534D5343: // SMSC
            case 0x534D5344: // SMSD
                return "Radius Proprietary Codec";
            case 0x53503430: // SP40
                return "SunPlus YUV";
            case 0x53503430: // SP40
            case 0x53503434: // SP44
            case 0x53503533: // SP53
            case 0x53503534: // SP54
            case 0x53503535: // SP55
            case 0x53503536: // SP56
            case 0x53503537: // SP57
            case 0x53503538: // SP58
                return "SunPlus Aiptek MegaCam Codec";
            case 0x53504947: // SPIG
                return "Radius Spigot";
            case 0x53504C43: // SPLC
                return "Splash Studios ACM Audio Codec";
            case 0x53515A32: // SQZ2
                return "Mivrosoft VXTreme Video Codec v2";
            case 0x53545641: // STVA
                return "ST CMOS Imager Data (Bayer)";
            case 0x53545642: // STVB
                return "ST CMOS Imager Data (Nudged Bayer)";
            case 0x53545643: // STVC
                return "ST CMOS Imager Data (Bunched)";
            case 0x53545658: // STVX
                return "ST CMOS Imager Data (Extended)";
            case 0x53545659: // STVY
                return "ST CMOS Imager Data (Extended w/Correction Data)";
            case 0x53563130: // SV10
                return "Sorenson Video R1";
            case 0x5356334D: // SV3M
                return "Sorenson SV3 Module Decoder";
            case 0x53565131: // SVQ1
                return "Sorenson Video 1";
            case 0x53565133: // SVQ3
                return "Sorenson Video 3 (Apple Quicktime 5)";
            case 0x54343230: // T420
                return "Toshiba YUV 4:2:0";
            case 0x544C4D53: // TLMS
                return "TeraLogic Motion Intraframe Codec A";
            case 0x544C5354: // TLST
                return "TeraLogic Motion Intraframe Codec B";
            case 0x544d3230: // TM20
                return "Duck TrueMotion 2.0";
            case 0x544d3241: // TM2A
                return "Duck TrueMotion Archiver 2.0";
            case 0x544d3258: // TM2X
                return "Duck TrueMotion Archiver 2X";
            case 0x544D4943: // TMIC
                return "TeraLogic Motion Intraframe Codec 2";
            case 0x544D4F54: // TMOT
                return "TrueMotion Video Compression";
            case 0x54523230: // TR20
                return "Duck TrueMotion RT 2.0";
            case 0x54534343: // TSCC
                return "TechSmith Screen Capture Codec";
            case 0x54563130: // TV10
                return "Tecomac Low-Bit Rate Codec";
            case 0x54564A50: // TVJP
                return "Targa 2000 board";
            case 0x54564D4A: // TVMJ
                return "Targa 2000 board";
            case 0x5459304E: // TY0N
                return "Tecomac Low-Bit Rate Codec";
            case 0x54593243: // TY2C
                return "Trident Decompression Driver";
            case 0x5459324E: // TY2N
                return "</td><td>Trident Microsystems";
            case 0x55323633: // U263
                return "UB Video H.263/H.263+/H.263++ Decoder";
            case 0x55434F44: // UCOD
                return "ClearVideo";
            case 0x554C5449: // ULTI
                return "IBM Ultimotion";
            case 0x554D5034: // UMP4
                return "UB Video MPEG 4";
            case 0x55594E56: // UYNV
                return "UYVY Copy For NVIDIA Compatibility";
            case 0x55595650: // UYVP
                return "YCbCr 4:2:2 Extended Precision";
            case 0x55595659: // UYVY
                return "YUV 4:2:2";
            case 0x56323631: // V261
                return "Lucent VX2000S Video Codec";
            case 0x56343232: // V422
                return "Vitec Multimedia 24-bit YUV 4:2:2";
            case 0x56363535: // V655
                return "Vitec Multimedia 16-bit YUV 4:2:2";
            case 0x56435231: // VCR1
                return "ATI VCR 1.0";
            case 0x56435232: // VCR1
                return "ATI VCR 1.0";
            case 0x56435233: // VCR1
                return "ATI VCR 1.0";
            case 0x56435234: // VCR1
                return "ATI VCR 1.0";
            case 0x56435235: // VCR1
                return "ATI VCR 1.0";
            case 0x56435236: // VCR1
                return "ATI VCR 1.0";
            case 0x56435237: // VCR1
                return "ATI VCR 1.0";
            case 0x56435238: // VCR1
                return "ATI VCR 1.0";
            case 0x56435239: // VCR1
                return "ATI VCR 1.0";

            case 0x56444354: // VDCT
                return "Video Maker Pro DIB";
            case 0x56444F4D: // VDOM
                return "VDOWave";
            case 0x56444F57: // VDOW
                return "<a href='/codec/vdolive'>VDOLive</a>";
            case 0x5644545A: // VDTZ
                return "VideoTizer YUV Codec";
            case 0x56475058: // VGPX
                return "VideoGramPix";
            case 0x56494453: // VIDS
                return "YUV 4:2:2 CCIR 601 for V422";
            case 0x56494650: // VIFP
                return "VFAPI Codec";
            case 0x56495631: // VIV1
                return "<a href='/codec/ffmpeg'>FFmpeg</a> H263+ decoder";
            case 0x56495632: // VIV2
                return "<a href='/codec/vivo'>Vivo H.263</a>";
            case 0x5649564F: // VIVO
                return "<a href='/codec/vivo'>Vivo H.263</a>";
            case 0x5649584C: // VIXL
                return "Video XL";
            case 0x564C5631: // VLV1
                return "Videologic codec";
            case 0x56503330: // VP30
                return "VP3";
            case 0x56503331: // VP31
                return "VP3";
            case 0x56503430: // VP40
                return "VP4";
            case 0x56503530: // VP50
                return "VP5";
            case 0x56503630: // VP60
                return "VP6";
            case 0x56503730: // VP70
                return "VP7";
            case 0x56514332: // VQC2
                return "Vector-quantised codec 2 (research)";
            case 0x56535348: // VSSH
                return "VSS H.264";
            case 0x56535356: // VSSV
                return "VSS Video";
            case 0x56535357: // VSSW
                return "VSS Wavelet Video Codec";
            case 0x56544C50: // VTLP
                return "Alaris VideoGramPiX";
            case 0x5658314B: // VX1K
                return "VX1000S Video Codec";
            case 0x5658324B: // VX2K
                return "VX2000S Video Codec";
            case 0x56585350: // VXSP
                return "VX1000SP Video Codec";
            case 0x56595539: // VYU9
                return "ATI YUV";
            case 0x56595559: // VYUY
                return "ATI YUV";
            case 0x57425643: // WBVC
                return "W9960";
            case 0x5748414D: // WHAM
                return "<a href='/codec/video1'>Microsoft Video 1</a>";
            case 0x57494E58: // WINX
                return "Winnov Software Compression";
            case 0x574A5047: // WJPG
                return "Winbond JPEG";
            case 0x574D5631: // WMV1
                return "<a href='/codec/ffmpeg'>FFmpeg</a> MS WMV1";
            case 0x574D5632: // WMV2
                return "Windows Media Video 8";
            case 0x574D5633: // WMV3
                return "Windows Media Video 9";
            case 0x574D5637: // WMV7
                return "Windows Media Video 7";
            case 0x574D5638: // WMV8
                return "Windows Media Video 8";
            case 0x574D5639: // WMV9
                return "Possibly the same as VC-9, proposed new HD codec";
            case 0x574E5631: // WNV1
                return "Winnov Hardware Compression";
            case 0x58323634: // X264
                return "H.264";
            case 0x584C5630: // XLV0
                return "XL Video Decoder";
            case 0x584D5047: // XMPG
                return "XING MPEG";
            case 0x58564944: // XVID
                return "XVID MPEG-4";
            case 0x5858414E: // XXAN
                return "Codec useing Huffman and RLE encoding paired with basic interframing";
            case 0x58595A50: // XYZP
                return "Extended PAL format XYZ palette";
            case 0x59323131: // Y211
                return "YUV packed";
            case 0x59343131: // Y411
                return "Same as Y41P";
            case 0x59343142: // Y41B
                return "YUV 4:1:1 Planar";
            case 0x59343150: // Y41P
                return "Brooktree YUV 4:1:1";
            case 0x59343154: // Y41T
                return "PC1 4:1:1 with transparency";
            case 0x59343232: // Y422
                return "Copy of UYVY used in Pyro WebCam firewire camera";
            case 0x59343242: // Y42B
                return "YUV 4:2:2 Planar";
            case 0x59343254: // Y42T
                return "UYVY with pixel transparency support";
            case 0x59383030: // Y800
                return "Simple, single Y plane for monochrome images";
            case 0x59433132: // YC12
                return "YUV 12 codec";
            case 0x59553932: // YU92
                return "YUV";
            case 0x59554E56: // YUNV
                return "Same as YUY2";
            case 0x59555638: // YUV8
                return "MM_WINNOV_CAVIAR_YUV8";
            case 0x59555639: // YUV9
                return "YUV9 Raw Format";
            case 0x59555650: // YUVP
                return "Extended PAL format YUV palette";
            case 0x59555932: // YUY2
                return "YUV packed 4:2:2";
            case 0x59555956: // YUYV
                return "BI_YUYV, Canopus";
            case 0x59563132: // YV12
                return "YUV 4:2:0 Planar";
            case 0x59565539: // YVU9
                return "Planar YUV format";
            case 0x59565955: // YVYU
                return "YUV packed 4:2:2";
            case 0x5A4C4942: // ZLIB
                return "LCL (Lossless Codec Library) zlib compression";
            case 0x5A4D4256: // ZMBV
                return "The DoxBox Project";
            case 0x5A504547: // ZPEG
                return "Video Zipper";
            case 0x5A59474F: // ZYGO
                return "ZyGoVideo";
        }
    }

    /**
     * @inheritDoc
     * The duration is not known from the video codec in a RIFF format file.
     */
    public get durationMilliseconds(): number { return 0; }

    /**
     * Gets the size of the structure in bytes. This value does not include the size of the color
     * table or the size of the color masks, if they are appended to the end of the structure.
     */
    public get headerSize(): number { return this._headerSize; }

    /**
     * Gets the size, in bytes, of the image. This can be set to 0 for uncompressed RGB bitmaps.
     */
    public get imageSize(): number { return this._imageSize; }

    /**
     * Gets the number of color indices that are considered important for displaying the bitmap. If
     * this value is `0`, all colors are important.
     */
    public get importantColors(): number { return this._importantColors; }

    /** @inheritDoc */
    public get mediaTypes(): MediaTypes { return MediaTypes.Video; }

    /**
     * Gets the number of planes in the image. This value is pretty much universally set to 1.
     */
    public get planes(): number { return this._planes; }

    /** @inheritDoc */
    public get videoHeight(): number { return this._height; }

    /** @inheritDoc */
    public get videoWidth(): number { return this._width; }

    /**
     * Gets the horizontal resolution, in pixels per meter, of the target device for the bitmap.
     */
    public get xPixelsPerMeter(): number { return this._xPixelsPerMeter; }

    /**
     * Gets the vertical resolution, in pixels per meter, of the target device for the bitmap.
     */
    public get yPixelsPerMeter(): number { return this._yPixelsPerMeter; }

    // #endregion
}
