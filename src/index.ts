// BASE EXPORTS ////////////////////////////////////////////////////////////
// Base/Support classes
export {ByteVector, StringType} from "./byteVector";
export {CorruptFileError, NotImplementedError} from "./errors";
export {File, FileAccessMode, FileTypeConstructor, FileTypeResolver, ReadStyle} from "./file";
export {LocalFileAbstraction} from "./fileAbstraction";

// Base Tag Classes
export {default as CombinedTag} from "./combinedTag";
export {default as Genres} from "./genres";
export {ICodec, IAudioCodec, ILosslessAudioCodec, IVideoCodec, IPhotoCodec, MediaTypes} from "./iCodec";
export {IPicture, PictureType} from "./picture";
export {default as PictureLazy} from "./pictureLazy";
export {default as Properties} from "./properties";
export {Tag, TagTypes} from "./tag";

// ID3v2 ///////////////////////////////////////////////////////////////////
export {default as Id3v2ExtendedHeader} from "./id3v2/id3v2ExtendedHeader";
export {default as Id3v2FrameFactory} from "./id3v2/frames/frameFactory";
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
export {default as Id3v2UnsynchronizedFrame} from "./id3v2/frames/unsynchronizedLyricsFrame";
export {
    UrlLinkFrame as Id3v2UrlLinkFrame,
    UserUrlLinkFrame as Id3v2UserUrlLinkFrame
} from "./id3v2/frames/urlLinkFrame";

// MPEG ////////////////////////////////////////////////////////////////////
export {default as MpegAudioFile} from "./mpeg/audioFile";
