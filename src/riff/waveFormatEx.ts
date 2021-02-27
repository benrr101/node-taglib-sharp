import {ByteVector} from "../byteVector";
import {ILosslessAudioCodec, MediaTypes} from "../iCodec";
import {Guards} from "../utils";
import {CorruptFileError} from "../errors";

export default class WaveFormatEx implements ILosslessAudioCodec {
    public static readonly WAVE_FORMAT_TAGS: {[key: number]: string} = {
        0x0000: "Unknown Wave Format",
        0x0001: "PCM Audio",
    0x0002: "Microsoft ADPCM",
    0x0003: "PCM Audio in IEEE Floating-Point Format",
    0x0004: "Compaq VSELP Audio",
    0x0005: "IBM CVSD Audio",
    0x0006: "Microsoft ALAW Audio",
    0x0007: "Microsoft MULAW Audio",
    0x0008: "Microsoft DTS Audio",
    0x0009: "Microsoft DRM Encrypted Audio",
    0x000A: "Microsoft Speech Ausio",
    0x000B: "Microsoft Windows Media RT Voice Audio",
    0x0010: "OKI ADPCM Audio",
    0x0011: "Intel ADPCM Audio",
    0x0012: "Videologic MediaSpace ADPCM Audio",
    0x0013: "Sierra ADPCM Audio",
    0x0014: "Antex G723 ADPCM Audio",
    0x0015: "DSP Solutions DIGISTD Audio",
    0x0016: "DSP Solutions DIGIFIX Audio",
    0x0017: "Dialogic OKI ADPCM Audio",
    0x0018: "Media Vision ADPCM Audio for Jazz 16",
    0x0019: "HP CU Audio",
    0x001A: "HP Dynamic Voice Audio",
    0x0020: "Yamaha ADPCM Audio",
    0x0021: "Speech Compression Sonarc Audio",
    0x0022: "DSP Group True Speech Audio ",
    0x0023: "Echo Speech Audio",
    0x0024: "Virtual Music Audiofile AF36 Audio",
    0x0025: "Audio Processing Technology APTX Audio",
    0x0026: "Virtual Music Audiofile AF10 Audio",
    0x0027: "Aculab Prosody 1612 Speech Card Audio",
    0x0028: "Merging Technologies LRC Audio",
    0x0030: "Dolby AC2 Audio",
    0x0031: "Microsoft Corporation GSM6.10 Audio",
    0x0032: "Microsoft Corporation MSN Audio",
    0x0033: "Antex Electronics Corporation ANTEX_ADPCME",
    0x0034: "Control Resources Limited CONTROL_RES_VQLPC",
    0x0035: "DSP Solutions, Inc. DIGIREAL",
    0x0036: "DSP Solutions, Inc. DIGIADPCM",
    0x0037: "Control Resources Limited CONTROL_RES_CR10",
    0x0038: "Natural MicroSystems NMS_VBXADPCM",
    0x0039: "Crystal Semiconductor IMA ADPCM CS_IMAADPCM",
    0x003A: "Echo Speech Corporation ECHOSC3",
    0x003B: "Rockwell International ROCKWELL_ADPCM",
    0x003C: "Rockwell International ROCKWELL_DIGITALK",
    0x003D: "Xebec Multimedia Solutions Limited XEBEC",
    0x0040: "Antex Electronics Corporation G721_ADPCM",
    0x0041: "Antex Electronics Corporation G728_CELP",
    0x0042: "Microsoft Corporation MSG723",
    0x0043: "Intel Corp. INTEL_G723_1",
    0x0044: "Intel Corp. INTEL_G729",
    0x0045: "Sharp SHARP_G726",
    0x0050: "Microsoft Corporation MPEG",
    0x0052: "InSoft, Inc. RT24",
    0x0053: "InSoft, Inc. PAC",
    #define  WAVE_FORMAT_MPEGLAYER3                 0x0055 /* ISO/MPEG Layer3 Format Tag */
    0x0059: "Lucent Technologies LUCENT_G723",
    0x0060: "Cirrus Logic CIRRUS",
    0x0061: "ESS Technology ESPCM",
    0x0062: "Voxware Inc VOXWARE",
    0x0063: "Canopus, co., Ltd. CANOPUS_ATRAC",
    0x0064: "APICOM G726_ADPCM",
    0x0065: "APICOM G722_ADPCM",
    0x0066: "Microsoft Corporation DSAT",
    0x0067: "Microsoft Corporation DSAT_DISPLAY",
    0x0069: "Voxware Inc VOXWARE_BYTE_ALIGNED",
    0x0070: "Voxware Inc VOXWARE_AC8",
    0x0071: "Voxware Inc VOXWARE_AC10",
    0x0072: "Voxware Inc VOXWARE_AC16",
    0x0073: "Voxware Inc VOXWARE_AC20",
    0x0074: "Voxware Inc VOXWARE_RT24",
    0x0075: "Voxware Inc VOXWARE_RT29",
    0x0076: "Voxware Inc VOXWARE_RT29HW",
    0x0077: "Voxware Inc VOXWARE_VR12",
    0x0078: "Voxware Inc VOXWARE_VR18",
    0x0079: "Voxware Inc VOXWARE_TQ40",
    0x007A: "Voxware Inc VOXWARE_SC3",
    0x007B: "Voxware Inc VOXWARE_SC3_1",
    0x0080: "Softsound, Ltd. SOFTSOUND",
    0x0081: "Voxware Inc VOXWARE_TQ60",
    0x0082: "Microsoft Corporation MSRT24",
    #define  WAVE_FORMAT_G729A                      0x0083 /* AT&T Labs, Inc. */
    0x0084: "Motion Pixels MVI_MVI2",
    #define  WAVE_FORMAT_DF_G726                    0x0085 /* DataFusion Systems (Pty) (Ltd) */
    #define  WAVE_FORMAT_DF_GSM610                  0x0086 /* DataFusion Systems (Pty) (Ltd) */
    0x0088: "Iterated Systems, Inc. ISIAUDIO",
    #define  WAVE_FORMAT_ONLIVE                     0x0089 /* OnLive! Technologies, Inc. */
    0x008A: "Multitude Inc. MULTITUDE_FT_SX20",
    0x008B: "Infocom INFOCOM_ITS_G721_ADPCM",
    0x008C: "Convedia Corp. CONVEDIA_G729",
    0x008D: "Congruency Inc. CONGRUENCY",
    0x0091: "Siemens Business Communications Sys SBC24",
    0x0092: "Sonic Foundry DOLBY_AC3_SPDIF",
    0x0093: "MediaSonic MEDIASONIC_G723",
    0x0094: "Aculab plc PROSODY_8KBPS",
    0x0097: "ZyXEL Communications, Inc. ZYXEL_ADPCM",
    0x0098: "Philips Speech Processing PHILIPS_LPCBB",
    0x0099: "Studer Professional Audio AG PACKED",
    0x00A0: "Malden Electronics Ltd. MALDEN_PHONYTALK",
    0x00A1: "Racal recorders RACAL_RECORDER_GSM",
    0x00A2: "Racal recorders RACAL_RECORDER_G720_A",
    0x00A3: "Racal recorders RACAL_RECORDER_G723_1",
    0x00A4: "Racal recorders RACAL_RECORDER_TETRA_ACELP",
    0x00B0: "NEC Corp. NEC_AAC",
    #define  WAVE_FORMAT_RAW_AAC1                   0x00FF /* For Raw AAC, with format block AudioSpecificConfig() (as defined by MPEG-4), that follows WAVEFORMATEX */
    0x0100: "Rhetorex Inc. RHETOREX_ADPCM",
    0x0101: "BeCubed Software Inc. IRAT",
    0x0111: "Vivo Software VIVO_G723",
    0x0112: "Vivo Software VIVO_SIREN",
    0x0120: "Philips Speech Processing PHILIPS_CELP",
    0x0121: "Philips Speech Processing PHILIPS_GRUNDIG",
    0x0123: "Digital Equipment Corporation DIGITAL_G723",
    0x0125: "Sanyo Electric Co., Ltd. SANYO_LD_ADPCM",
    0x0130: "Sipro Lab Telecom Inc. SIPROLAB_ACEPLNET",
    0x0131: "Sipro Lab Telecom Inc. SIPROLAB_ACELP4800",
    0x0132: "Sipro Lab Telecom Inc. SIPROLAB_ACELP8V3",
    0x0133: "Sipro Lab Telecom Inc. SIPROLAB_G729",
    0x0134: "Sipro Lab Telecom Inc. SIPROLAB_G729A",
    0x0135: "Sipro Lab Telecom Inc. SIPROLAB_KELVIN",
    0x0136: "VoiceAge Corp. VOICEAGE_AMR",
    0x0140: "Dictaphone Corporation G726ADPCM",
    0x0141: "Dictaphone Corporation DICTAPHONE_CELP68",
    0x0142: "Dictaphone Corporation DICTAPHONE_CELP54",
    0x0150: "Qualcomm, Inc. QUALCOMM_PUREVOICE",
    0x0151: "Qualcomm, Inc. QUALCOMM_HALFRATE",
    0x0155: "Ring Zero Systems, Inc. TUBGSM",
    0x0160: "Microsoft Corporation MSAUDIO1",
    0x0161: "Microsoft Corporation WMAUDIO2",
    0x0162: "Microsoft Corporation WMAUDIO3",
    0x0163: "Microsoft Corporation WMAUDIO_LOSSLESS",
    0x0164: "Microsoft Corporation WMASPDIF",
    0x0170: "Unisys Corp. UNISYS_NAP_ADPCM",
    0x0171: "Unisys Corp. UNISYS_NAP_ULAW",
    0x0172: "Unisys Corp. UNISYS_NAP_ALAW",
    0x0173: "Unisys Corp. UNISYS_NAP_16K",
    0x0174: "SyCom Technologies SYCOM_ACM_SYC008",
    0x0175: "SyCom Technologies SYCOM_ACM_SYC701_G726L",
    0x0176: "SyCom Technologies SYCOM_ACM_SYC701_CELP54",
    0x0177: "SyCom Technologies SYCOM_ACM_SYC701_CELP68",
    0x0178: "Knowledge Adventure, Inc. KNOWLEDGE_ADVENTURE_ADPCM",
    0x0180: "Fraunhofer IIS FRAUNHOFER_IIS_MPEG2_AAC",
    0x0190: "Digital Theatre Systems, Inc. DTS_DS",
    0x0200: "Creative Labs, Inc CREATIVE_ADPCM",
    0x0202: "Creative Labs, Inc CREATIVE_FASTSPEECH8",
    0x0203: "Creative Labs, Inc CREATIVE_FASTSPEECH10",
    0x0210: "UHER informatic GmbH UHER_ADPCM",
    0x0215: "Ulead Systems, Inc. ULEAD_DV_AUDIO",
    0x0216: "Ulead Systems, Inc. ULEAD_DV_AUDIO_1",
    0x0220: "Quarterdeck Corporation QUARTERDECK",
    #define  WAVE_FORMAT_ILINK_VC                   0x0230 /* I-link Worldwide */
    0x0240: "Aureal Semiconductor RAW_SPORT",
    0x0241: "ESS Technology, Inc. ESST_AC3",
    #define  WAVE_FORMAT_GENERIC_PASSTHRU           0x0249
    0x0250: "Interactive Products, Inc. IPI_HSX",
    0x0251: "Interactive Products, Inc. IPI_RPELP",
    0x0260: "Consistent Software CS2",
    0x0270: "Sony Corp. SONY_SCX",
    0x0271: "Sony Corp. SONY_SCY",
    0x0272: "Sony Corp. SONY_ATRAC3",
    0x0273: "Sony Corp. SONY_SPC",
    0x0280: "Telum Inc. TELUM_AUDIO",
    0x0281: "Telum Inc. TELUM_IA_AUDIO",
    0x0285: "Norcom Electronics Corp. NORCOM_VOICE_SYSTEMS_ADPCM",
    0x0300: "Fujitsu Corp. FM_TOWNS_SND",
    0x0350: "Micronas Semiconductors, Inc. MICRONAS",
    0x0351: "Micronas Semiconductors, Inc. MICRONAS_CELP833",
    0x0400: "Brooktree Corporation BTV_DIGITAL",
    0x0401: "Intel Corp. INTEL_MUSIC_CODER",
    0x0402: "Ligos INDEO_AUDIO",
    0x0450: "QDesign Corporation QDESIGN_MUSIC",
    0x0500: "On2 Technologies ON2_VP7_AUDIO",
    0x0501: "On2 Technologies ON2_VP6_AUDIO",
    #define  WAVE_FORMAT_VME_VMPCM                  0x0680 /* AT&T Labs, Inc. */
    #define  WAVE_FORMAT_TPC                        0x0681 /* AT&T Labs, Inc. */
    0x08AE: "Clearjump LIGHTWAVE_LOSSLESS",
    #define  WAVE_FORMAT_OLIGSM                     0x1000 /* Ing C. Olivetti & C., S.p.A. */
    #define  WAVE_FORMAT_OLIADPCM                   0x1001 /* Ing C. Olivetti & C., S.p.A. */
    #define  WAVE_FORMAT_OLICELP                    0x1002 /* Ing C. Olivetti & C., S.p.A. */
    #define  WAVE_FORMAT_OLISBC                     0x1003 /* Ing C. Olivetti & C., S.p.A. */
    #define  WAVE_FORMAT_OLIOPR                     0x1004 /* Ing C. Olivetti & C., S.p.A. */
    #define  WAVE_FORMAT_LH_CODEC                   0x1100 /* Lernout & Hauspie */
    #define  WAVE_FORMAT_LH_CODEC_CELP              0x1101 /* Lernout & Hauspie */
    #define  WAVE_FORMAT_LH_CODEC_SBC8              0x1102 /* Lernout & Hauspie */
    #define  WAVE_FORMAT_LH_CODEC_SBC12             0x1103 /* Lernout & Hauspie */
    #define  WAVE_FORMAT_LH_CODEC_SBC16             0x1104 /* Lernout & Hauspie */
    0x1400: "Norris Communications, Inc. NORRIS",
    0x1401: "ISIAudio ISIAUDIO_2",
    #define  WAVE_FORMAT_SOUNDSPACE_MUSICOMPRESS    0x1500 /* AT&T Labs, Inc. */
    0x1600: "Microsoft Corporation MPEG_ADTS_AAC",
    0x1601: "Microsoft Corporation MPEG_RAW_AAC",
    #define  WAVE_FORMAT_MPEG_LOAS                  0x1602 /* Microsoft Corporation (MPEG-4 Audio Transport Streams (LOAS/LATM) */
    0x1608: "Microsoft Corporation NOKIA_MPEG_ADTS_AAC",
    0x1609: "Microsoft Corporation NOKIA_MPEG_RAW_AAC",
    0x160A: "Microsoft Corporation VODAFONE_MPEG_ADTS_AAC",
    0x160B: "Microsoft Corporation VODAFONE_MPEG_RAW_AAC",
    #define  WAVE_FORMAT_MPEG_HEAAC                 0x1610 /* Microsoft Corporation (MPEG-2 AAC or MPEG-4 HE-AAC v1/v2 streams with any payload (ADTS, ADIF, LOAS/LATM, RAW). Format block includes MP4 AudioSpecificConfig() -- see HEAACWAVEFORMAT below */
    0x181C: "Voxware Inc. VOXWARE_RT24_SPEECH",
    0x1971: "Sonic Foundry SONICFOUNDRY_LOSSLESS",
    0x1979: "Innings Telecom Inc. INNINGS_TELECOM_ADPCM",
    0x1C07: "Lucent Technologies LUCENT_SX8300P",
    0x1C0C: "Lucent Technologies LUCENT_SX5363S",
    0x1F03: "CUSeeMe CUSEEME",
    0x1FC4: "NTCSoft NTCSOFT_ALF2CM_ACM",
    0x2000: "FAST Multimedia AG DVM",
    #define  WAVE_FORMAT_DTS2                       0x2001
    #define  WAVE_FORMAT_MAKEAVIS                   0x3313
    0x4143: "Divio, Inc. DIVIO_MPEG4_AAC",
    0x4201: "Nokia NOKIA_ADAPTIVE_MULTIRATE",
    0x4243: "Divio, Inc. DIVIO_G726",
    0x434C: "LEAD Technologies LEAD_SPEECH",
    0x564C: "LEAD Technologies LEAD_VORBIS",
    0x5756: "xiph.org WAVPACK_AUDIO",
    0x6C61: "Apple Lossless ALAC",
    0x674F: "Ogg Vorbis OGG_VORBIS_MODE_1",
    0x6750: "Ogg Vorbis OGG_VORBIS_MODE_2",
    0x6751: "Ogg Vorbis OGG_VORBIS_MODE_3",
    0x676F: "Ogg Vorbis OGG_VORBIS_MODE_1_PLUS",
    0x6770: "Ogg Vorbis OGG_VORBIS_MODE_2_PLUS",
    0x6771: "Ogg Vorbis OGG_VORBIS_MODE_3_PLUS",
    0x7000: "3COM Corp. 3COM_NBX",
    0x704F: "Opus OPUS",
    #define  WAVE_FORMAT_FAAD_AAC                   0x706D
    0x7361: "AMR Narrowband AMR_NB",
    0x7362: "AMR Wideband AMR_WB",
    0x7363: "AMR Wideband Plus AMR_WP",
    #define  WAVE_FORMAT_GSM_AMR_CBR                0x7A21 /* GSMA/3GPP */
    #define  WAVE_FORMAT_GSM_AMR_VBR_SID            0x7A22 /* GSMA/3GPP */
    0xA100: "Comverse Infosys COMVERSE_INFOSYS_G723_1",
    0xA101: "Comverse Infosys COMVERSE_INFOSYS_AVQSBC",
    0xA102: "Comverse Infosys COMVERSE_INFOSYS_SBC",
    0xA103: "Symbol Technologies SYMBOL_G729_A",
    0xA104: "VoiceAge Corp. VOICEAGE_AMR_WB",
    0xA105: "Ingenient Technologies, Inc. INGENIENT_G726",
    #define  WAVE_FORMAT_MPEG4_AAC                  0xA106 /* ISO/MPEG-4 */
    0xA107: "Encore Software ENCORE_G726",
    0xA108: "ZOLL Medical Corp. ZOLL_ASAO",
    0xA109: "xiph.org SPEEX_VOICE",
    0xA10A: "Vianix LLC VIANIX_MASC",
    0xA10B: "Microsoft WM9_SPECTRUM_ANALYZER",
    0xA10C: "Microsoft WMF_SPECTRUM_ANAYZER",
    #define  WAVE_FORMAT_GSM_610                    0xA10D
    #define  WAVE_FORMAT_GSM_620                    0xA10E
    #define  WAVE_FORMAT_GSM_660                    0xA10F
    #define  WAVE_FORMAT_GSM_690                    0xA110
    #define  WAVE_FORMAT_GSM_ADAPTIVE_MULTIRATE_WB  0xA111
    0xA112: "Polycom POLYCOM_G722",
    0xA113: "Polycom POLYCOM_G728",
    0xA114: "Polycom POLYCOM_G729_A",
    0xA115: "Polycom POLYCOM_SIREN",
    0xA116: "Global IP GLOBAL_IP_ILBC",
    0xA117: "RadioTime RADIOTIME_TIME_SHIFT_RADIO",
    0xA118: "Nice Systems NICE_ACA",
    0xA119: "Nice Systems NICE_ADPCM",
    0xA11A: "Vocord Telecom VOCORD_G721",
    0xA11B: "Vocord Telecom VOCORD_G726",
    0xA11C: "Vocord Telecom VOCORD_G722_1",
    0xA11D: "Vocord Telecom VOCORD_G728",
    0xA11E: "Vocord Telecom VOCORD_G729",
    0xA11F: "Vocord Telecom VOCORD_G729_A",
    0xA120: "Vocord Telecom VOCORD_G723_1",
    0xA121: "Vocord Telecom VOCORD_LBC",
    0xA122: "Nice Systems NICE_G728",
    0xA123: "France Telecom FRACE_TELECOM_G729",
    0xA124: "CODIAN CODIAN",
    0xF1AC: "flac.sourceforge.net FLAC",
    }

    private readonly _averageBytesPerSecond: number;
    private readonly _bitsPerSample: number;
    private readonly _channels: number;
    private readonly _formatTag: number;
    private readonly _samplesPerSecond: number;

    public constructor(data: ByteVector, offset: number) {
        Guards.truthy(data, "data");
        Guards.uint(offset, "offset");
        if (offset + 16 < data.length) {
            throw new CorruptFileError("Expected 16 bytes");
        }

        this._formatTag = data.mid(offset, 2).toUShort(false);
        this._channels = data.mid(offset + 2, 2).toUShort(false);
        this._samplesPerSecond = data.mid(offset + 4, 4).toUInt(false);
        this._averageBytesPerSecond = data.mid(offset + 8, 4).toUInt(false);
        this._bitsPerSample = data.mid(offset + 14, 2).toUShort(false);
    }

    // #region Properties

    /** @inheritDoc */
    public get audioBitrate(): number { return this.averageBytesPerSecond * 8 / 10000; }

    /** @inheritDoc */
    public get audioChannels(): number { return this._channels; }

    /** @inheritDoc */
    public get audioSampleRate(): number { return this._samplesPerSecond; }

    /**
     * Gets the average data-transfer rate, in bytes per second, of audio described by the current
     * instance.
     */
    public get averageBytesPerSecond(): number { return this._averageBytesPerSecond; }

    /**
     * @inheritDoc
     * @remarks Some compression schemes cannot define a value for this field, so it may be `0`.
     */
    public get bitsPerSample(): number { return this._bitsPerSample; }

    /**
     * @inheritDoc
     * @remarks Duration cannot be found from this object
     */
    public get durationMilliseconds(): number { return 0; }

    /**
     * Gets the format tag of the audio described by the current instance.
     * @remarks Format tags indicate the codec of the audio contained in the file and are
     *     contained in a Microsoft registry. For a description of the format, use
     *     {@link description}. The complete list can be found in the Win32 mmreg.h SDK header file
     */
    public get formatTag(): number { return this._formatTag; }

    /** @inheritDoc */
    public get mediaTypes(): MediaTypes { return MediaTypes.LosslessAudio; }

    // #endregion
}
