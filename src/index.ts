// BASE EXPORTS ////////////////////////////////////////////////////////////
// Base/Support classes
export {ByteVector, StringType} from "./byteVector";
export {CorruptFileError, NotImplementedError} from "./errors";
export {File, FileAccessMode, FileTypeConstructor, FileTypeResolver, ReadStyle} from "./file";
export {IDisposable, ILazy} from "./interfaces";
export {IFileAbstraction, LocalFileAbstraction} from "./fileAbstraction";
export {IStream, SeekOrigin} from "./stream";
export {default as UuidWrapper} from "./uuidWrapper";

// Base Tag Classes
export {default as CombinedTag} from "./combinedTag";
export {default as Genres} from "./genres";
export {IPicture, Picture, PictureLazy, PictureType} from "./picture";
export {ICodec, IAudioCodec, ILosslessAudioCodec, IVideoCodec, IPhotoCodec, MediaTypes, Properties} from "./properties";
export {Tag, TagTypes} from "./tag";

// Sandwich tag files
export {default as EndTag} from "./sandwich/endTag"
export {default as SandwichFile, ISandwichFile} from "./sandwich/sandwichFile";
export {default as SandwichTag} from "./sandwich/sandwichTag";
export {default as StartTag} from "./sandwich/startTag";

// AAC /////////////////////////////////////////////////////////////////////
export {default as AacFile} from "./aac/aacFile";
export {default as AacFileSettings} from "./aac/aacFileSettings";

// AIFF ////////////////////////////////////////////////////////////////////
export {default as AiffFile} from "./aiff/aiffFile";

// APE /////////////////////////////////////////////////////////////////////
export {default as ApeFile} from "./ape/apeFile";
export {default as ApeFileSettings} from "./ape/apeFileSettings";
export {default as ApeTag} from "./ape/apeTag";
export {ApeTagItem, ApeTagItemType} from "./ape/apeTagItem";

// ASF /////////////////////////////////////////////////////////////////////
export {default as AsfFile} from "./asf/asfFile";
export {default as AsfTag} from "./asf/asfTag";
export {ObjectType as AsfObjectType} from "./asf/constants";

// Objects
export {default as AsfBaseObject} from "./asf/objects/baseObject";
export {default as AsfContentDescriptionObject} from "./asf/objects/contentDescriptionObject";
export {
    DataType as AsfObjectDataType,
    DescriptorValue as AsfDescriptorValue
} from "./asf/objects/descriptorBase";
export {
    ContentDescriptor as AsfContentDescriptor,
    ExtendedContentDescriptionObject as AsfExtendedContentDescriptionObject
} from "./asf/objects/extendedContentDescriptionObject";
export { default as AsfFilePropertiesObject } from "./asf/objects/filePropertiesObject";
export { default as AsfHeaderExtensionObject } from "./asf/objects/headerExtensionObject";
export { default as AsfHeaderObject } from "./asf/objects/headerObject";
export {
    MetadataDescriptor as AsfMetadataDescriptor,
    MetadataLibraryObject as AsfMetadataLibraryObject
} from "./asf/objects/metadataLibraryObject";
export { default as AsfPaddingObject } from "./asf/objects/paddingObject";
export { default as AsfStreamPropertiesObject } from "./asf/objects/streamPropertiesObject";
export { default as AsfUnknownObject } from "./asf/objects/unknownObject";

// FLAC ////////////////////////////////////////////////////////////////////
export {FlacBlock, FlacBlockType} from "./flac/flacBlock";
export {default as FlacFile} from "./flac/flacFile";
export {default as FlacFileSettings} from "./flac/flacFileSettings";
export {default as FlacTag} from "./flac/flacTag";

// ID3v1 ///////////////////////////////////////////////////////////////////
export {default as Id3v1Tag} from "./id3v1/id3v1Tag";

// ID3v2 ///////////////////////////////////////////////////////////////////
export {default as Id3v2ExtendedHeader} from "./id3v2/id3v2ExtendedHeader";
export {
    FrameIdentifier as Id3v2FrameIdentifier,
    FrameIdentifiers as Id3v2FrameIdentifiers,
} from "./id3v2/frameIdentifiers";
export {default as Id3v2Settings} from "./id3v2/id3v2Settings";
export {default as Id3v2Tag} from "./id3v2/id3v2Tag";
export {default as Id3v2TagFooter} from "./id3v2/id3v2TagFooter";
export {Id3v2TagHeader, Id3v2TagHeaderFlags} from "./id3v2/id3v2TagHeader";
export {
    SynchronizedTextType as Id3v2SynchronizedTextType,
    TimestampFormat as Id3v2TimestampFormat,
    EventType as Id3v2EventType
} from "./id3v2/utilTypes";

// Frames
export {default as Id3v2AttachmentFrame} from "./id3v2/frames/attachmentFrame";
export {default as Id3v2CommentsFrame} from "./id3v2/frames/commentsFrame";
export {
    EventTimeCode as Id3v2EventTimeCode,
    EventTimeCodeFrame as Id3v2EventTimeCodeFrame
} from "./id3v2/frames/eventTimeCodeFrame";
export {
    Frame as Id3v2Frame,
    FrameClassType as Id3v2FrameClassType
} from "./id3v2/frames/frame";
export {
    FrameCreator as Id3v2FrameCreator,
    Id3v2FrameFactory
} from "./id3v2/frames/frameFactory";
export {Id3v2FrameFlags, Id3v2FrameHeader} from "./id3v2/frames/frameHeader";
export {default as Id3v2MusicCdIdentifierFrame} from "./id3v2/frames/musicCdIdentifierFrame";
export {default as Id3v2PlayCountFrame} from "./id3v2/frames/playCountFrame";
export {default as Id3v2PopularimeterFrame} from "./id3v2/frames/popularimeterFrame";
export {default as Id3v2PrivateFrame} from "./id3v2/frames/privateFrame";
export {
    ChannelData as Id3v2RelativeVolumeFrameChannelData,
    ChannelType as Id3v2RelativeVolumeFrameChannelType,
    RelativeVolumeFrame as Id3v2RelativeVolumeFrame
} from "./id3v2/frames/relativeVolumeFrame";
export {
    SynchronizedLyricsFrame as Id3v2Synchronized,
    SynchronizedText as Id3v2SynchronizedLyricsFrame
} from "./id3v2/frames/synchronizedLyricsFrame";
export {default as Id3v2TermsOfUseFrame} from "./id3v2/frames/termsOfUseFrame";
export {
    TextInformationFrame as Id3v2TextInformationFrame,
    UserTextInformationFrame as Id3v2UserTextInformationFrame
} from "./id3v2/frames/textInformationFrame";
export {default as Id3v2UniqueFileIdentifierFrame} from "./id3v2/frames/uniqueFileIdentifierFrame";
export {default as Id3v2UnknownFrame} from "./id3v2/frames/unknownFrame";
export {default as Id3v2UnsynchronizedLyricsFrame} from "./id3v2/frames/unsynchronizedLyricsFrame";
export {
    UrlLinkFrame as Id3v2UrlLinkFrame,
    UserUrlLinkFrame as Id3v2UserUrlLinkFrame
} from "./id3v2/frames/urlLinkFrame";

// Matroska/webm ///////////////////////////////////////////////////////////
export {default as MatroskaFile} from "./matroska/matroskaFile";

// MPEG1/2 /////////////////////////////////////////////////////////////////
export {default as MpegAudioFile} from "./mpeg/mpegAudioFile";
export {default as MpegAudioFileSettings} from "./mpeg/mpegAudioFileSettings";
export {default as MpegAudioHeader} from "./mpeg/mpegAudioHeader";
export {
    ChannelMode as MpegAudioChannelMode,
    MpegVersion as MpegVersion
} from "./mpeg/mpegEnums";
export {default as MpegContainerFile} from "./mpeg/mpegContainerFile";
export {default as MpegContainerFileSettings} from "./mpeg/mpegAudioFileSettings";
export {default as MpegVbriHeader} from "./mpeg/vbriHeader";
export {default as MpegVideoHeader} from "./mpeg/mpegVideoHeader";
export {default as MpegXingHeader} from "./mpeg/xingHeader";

// MPEG4 ///////////////////////////////////////////////////////////////////
export {default as Mpeg4File} from "./mpeg4/mpeg4File";
export {default as Mpeg4AppleTag} from "./mpeg4/appleTag";
export {default as Mpeg4BoxHeader} from "./mpeg4/mpeg4BoxHeader"

// Boxes
export {default as Mpeg4BoxType} from "./mpeg4/mpeg4BoxType";
export {default as Mpeg4AppleAdditionalInfoBox} from "./mpeg4/boxes/appleAdditionalInfoBox";
export {default as Mpeg4AppleAnnotationBox} from "./mpeg4/boxes/appleAnnotationBox";
export {
    AppleDataBox as Mpeg4AppleDataBox,
    AppleDataBoxFlagType as Mpeg4AppleDataBoxFlagType
} from "./mpeg4/boxes/appleDataBox";
export {default as Mpeg4AppleElementaryStreamDescriptor} from "./mpeg4/boxes/appleElementaryStreamDescriptor";
export {default as Mpeg4AppleItemListBox} from "./mpeg4/boxes/appleItemListBox";
export {default as Mpeg4FullBox} from "./mpeg4/boxes/fullBox";
export {default as Mpeg4IsoAudioSampleEntry} from "./mpeg4/boxes/isoAudioSampleEntry";
export {default as Mpeg4IsoChunkLargeOffset} from "./mpeg4/boxes/isoChunkLargeOffsetBox";
export {default as Mpeg4IsoChunkOffsetBox} from "./mpeg4/boxes/isoChunkOffsetBox";
export {default as Mpeg4IsoFreeSpaceBox} from "./mpeg4/boxes/isoFreeSpaceBox";
export {default as Mpeg4IsoHandlerBox} from "./mpeg4/boxes/isoHandlerBox";
export {default as Mpeg4IsoMetaBox} from "./mpeg4/boxes/isoMetaBox";
export {default as Mpeg4IsoMovieHeaderBox} from "./mpeg4/boxes/isoMovieHeaderBox";
export {default as Mpeg4IsoSampleDescriptionBox} from "./mpeg4/boxes/isoSampleDescriptionBox";
export {default as Mpeg4IsoSampleEntry} from "./mpeg4/boxes/isoSampleEntry";
export {default as Mpeg4IsoSampleTableBox} from "./mpeg4/boxes/isoSampleTableBox";
export {default as Mpeg4IsoUnknownSampleEntry} from "./mpeg4/boxes/isoUnknownSampleEntry";
export {default as Mpeg4IsoUserDataBox} from "./mpeg4/boxes/isoUserDataBox";
export {default as Mpeg4IsoVisualSampleEntry} from "./mpeg4/boxes/isoVisualSampleEntry";
export {default as Mpeg4Box} from "./mpeg4/boxes/mpeg4Box";
export {default as Mpeg4TextBox} from "./mpeg4/boxes/textBox";
export {default as Mpeg4UnknownBox} from "./mpeg4/boxes/unknownBox";
export {default as Mpeg4UrlBox} from "./mpeg4/boxes/urlBox";

// OGG /////////////////////////////////////////////////////////////////////
export {default as OggFile} from "./ogg/oggFile";
export {default as OggFileSettings} from "./ogg/oggFileSettings";
export {default as OggTag} from "./ogg/oggTag";

export {
    default as OggCodecFactory,
    CodecProvider as OggCodecProvider
} from "./ogg/codecs/codecFactory";
export {default as IOggCodec} from "./ogg/codecs/iOggCodec";
export {default as OggOpusCodec} from "./ogg/codecs/opus";
export {default as OggTheoraCodec} from "./ogg/codecs/theora";
export {default as OggVorbisCodec} from "./ogg/codecs/vorbis";

// RIFF ////////////////////////////////////////////////////////////////////
export {default as RiffFile} from "./riff/riffFile";
export {
    AviStream,
    AviStreamType
} from "./riff/avi/aviStream";
export {default as AviFileSettings} from "./riff/aviFileSettings";
export {default as DivxTag} from "./riff/divxTag";
export {default as InfoTag} from "./riff/infoTag";
export {default as IRiffChunk} from "./riff/iRiffChunk";
export {default as MovieIdTag} from "./riff/movieIdTag";
export {default as RiffBitmapInfoHeader} from "./riff/riffBitmapInfoHeader";
export {default as RiffList} from "./riff/riffList";
export {default as RiffListTag} from "./riff/riffListTag";
export {default as RiffWaveFormatEx} from "./riff/riffWaveFormatEx";
export {default as WaveFileSettings} from "./riff/waveFileSettings";

// XIPH ////////////////////////////////////////////////////////////////////
export {default as XiphComment} from "./xiph/xiphComment";
export {default as XiphPicture} from "./xiph/xiphPicture";
