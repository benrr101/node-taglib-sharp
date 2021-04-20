[node-taglib-sharp](README.md) / Exports

# node-taglib-sharp

## Table of contents

### Enumerations

- [AsfObjectDataType](enums/asfobjectdatatype.md)
- [FileAccessMode](enums/fileaccessmode.md)
- [Id3v2EventType](enums/id3v2eventtype.md)
- [Id3v2FrameClassType](enums/id3v2frameclasstype.md)
- [Id3v2FrameFlags](enums/id3v2frameflags.md)
- [Id3v2RelativeVolumeFrameChannelType](enums/id3v2relativevolumeframechanneltype.md)
- [Id3v2SynchronizedTextType](enums/id3v2synchronizedtexttype.md)
- [Id3v2TagHeaderFlags](enums/id3v2tagheaderflags.md)
- [Id3v2TimestampFormat](enums/id3v2timestampformat.md)
- [MediaTypes](enums/mediatypes.md)
- [MpegAudioChannelMode](enums/mpegaudiochannelmode.md)
- [MpegVersion](enums/mpegversion.md)
- [PictureType](enums/picturetype.md)
- [ReadStyle](enums/readstyle.md)
- [StringType](enums/stringtype.md)
- [TagTypes](enums/tagtypes.md)

### Classes

- [AacFile](classes/aacfile.md)
- [AiffFile](classes/aifffile.md)
- [ApeFile](classes/apefile.md)
- [ApeTag](classes/apetag.md)
- [AsfContentDescriptionObject](classes/asfcontentdescriptionobject.md)
- [AsfContentDescriptor](classes/asfcontentdescriptor.md)
- [AsfExtendedContentDescriptionObject](classes/asfextendedcontentdescriptionobject.md)
- [AsfFile](classes/asffile.md)
- [AsfFilePropertiesObject](classes/asffilepropertiesobject.md)
- [AsfHeaderExtensionObject](classes/asfheaderextensionobject.md)
- [AsfHeaderObject](classes/asfheaderobject.md)
- [AsfMetadataDescriptor](classes/asfmetadatadescriptor.md)
- [AsfMetadataLibraryObject](classes/asfmetadatalibraryobject.md)
- [AsfPaddingObject](classes/asfpaddingobject.md)
- [AsfStreamPropertiesObject](classes/asfstreampropertiesobject.md)
- [AsfTag](classes/asftag.md)
- [AsfUnknownObject](classes/asfunknownobject.md)
- [ByteVector](classes/bytevector.md)
- [CombinedTag](classes/combinedtag.md)
- [CorruptFileError](classes/corruptfileerror.md)
- [File](classes/file.md)
- [Id3v1Tag](classes/id3v1tag.md)
- [Id3v2AttachmentFrame](classes/id3v2attachmentframe.md)
- [Id3v2CommentsFrame](classes/id3v2commentsframe.md)
- [Id3v2EventTimeCode](classes/id3v2eventtimecode.md)
- [Id3v2EventTimeCodeFrame](classes/id3v2eventtimecodeframe.md)
- [Id3v2ExtendedHeader](classes/id3v2extendedheader.md)
- [Id3v2Frame](classes/id3v2frame.md)
- [Id3v2FrameHeader](classes/id3v2frameheader.md)
- [Id3v2FrameIdentifier](classes/id3v2frameidentifier.md)
- [Id3v2MusicCdIdentifierFrame](classes/id3v2musiccdidentifierframe.md)
- [Id3v2PlayCountFrame](classes/id3v2playcountframe.md)
- [Id3v2PopularimeterFrame](classes/id3v2popularimeterframe.md)
- [Id3v2PrivateFrame](classes/id3v2privateframe.md)
- [Id3v2RelativeVolumeFrame](classes/id3v2relativevolumeframe.md)
- [Id3v2RelativeVolumeFrameChannelData](classes/id3v2relativevolumeframechanneldata.md)
- [Id3v2Settings](classes/id3v2settings.md)
- [Id3v2Synchronized](classes/id3v2synchronized.md)
- [Id3v2SynchronizedLyricsFrame](classes/id3v2synchronizedlyricsframe.md)
- [Id3v2Tag](classes/id3v2tag.md)
- [Id3v2TagFooter](classes/id3v2tagfooter.md)
- [Id3v2TagHeader](classes/id3v2tagheader.md)
- [Id3v2TermsOfUseFrame](classes/id3v2termsofuseframe.md)
- [Id3v2TextInformationFrame](classes/id3v2textinformationframe.md)
- [Id3v2UniqueFileIdentifierFrame](classes/id3v2uniquefileidentifierframe.md)
- [Id3v2UnknownFrame](classes/id3v2unknownframe.md)
- [Id3v2UnsynchronizedFrame](classes/id3v2unsynchronizedframe.md)
- [Id3v2UrlLinkFrame](classes/id3v2urllinkframe.md)
- [Id3v2UserTextInformationFrame](classes/id3v2usertextinformationframe.md)
- [Id3v2UserUrlLinkFrame](classes/id3v2userurllinkframe.md)
- [LocalFileAbstraction](classes/localfileabstraction.md)
- [MpegAudioFile](classes/mpegaudiofile.md)
- [MpegAudioHeader](classes/mpegaudioheader.md)
- [MpegFile](classes/mpegfile.md)
- [MpegVbriHeader](classes/mpegvbriheader.md)
- [MpegVideoHeader](classes/mpegvideoheader.md)
- [MpegXingHeader](classes/mpegxingheader.md)
- [NotImplementedError](classes/notimplementederror.md)
- [Picture](classes/picture.md)
- [PictureLazy](classes/picturelazy.md)
- [Properties](classes/properties.md)
- [Tag](classes/tag.md)

### Interfaces

- [IAudioCodec](interfaces/iaudiocodec.md)
- [ICodec](interfaces/icodec.md)
- [ILosslessAudioCodec](interfaces/ilosslessaudiocodec.md)
- [IPhotoCodec](interfaces/iphotocodec.md)
- [IPicture](interfaces/ipicture.md)
- [IVideoCodec](interfaces/ivideocodec.md)

### Type aliases

- [FileTypeConstructor](modules.md#filetypeconstructor)
- [FileTypeResolver](modules.md#filetyperesolver)

### Properties

- [Genres](modules.md#genres)
- [Id3v2FrameFactory](modules.md#id3v2framefactory)

### Variables

- [Id3v2FrameIdentifiers](modules.md#id3v2frameidentifiers)

## Type aliases

### FileTypeConstructor

Ƭ **FileTypeConstructor**: (`abstraction`: IFileAbstraction, `style`: [*ReadStyle*](enums/readstyle.md)) => [*File*](classes/file.md)

___

### FileTypeResolver

Ƭ **FileTypeResolver**: (`abstraction`: IFileAbstraction, `mimetype`: *string*, `style`: [*ReadStyle*](enums/readstyle.md)) => [*File*](classes/file.md)

Delegate is used for intervening in [File.createFromPath](classes/file.md#createfrompath) by resolving the filetype before
any standard resolution operations.

**`param`** File to be read.

**`param`** MimeType of the file.

**`param`** How to read media properties from the file

**`returns`** New instance of [File](classes/file.md) or `undefined` if the resolver could not be matched

**`remarks`** A FileTypeResolver is one way of altering the behavior of
    [File.createFromPath](classes/file.md#createfrompath) When [File.createFromPath](classes/file.md#createfrompath) is called, the registered
    resolvers are invoked in reverse order in which they were registered. The resolver may then
    perform any operations necessary, including other type-finding methods. If the resolver
    returns a new [File](classes/file.md) it will instantly be returned, by [File.createFromPath](classes/file.md#createfrompath). If
    it returns `undefined`, [File.createFromPath](classes/file.md#createfrompath) will continue to process. If the resolver
    throws an exception, it will be uncaught. To register a resolver, use
    [File.addFileTypeResolver](classes/file.md#addfiletyperesolver).

## Properties

### Genres

• **Genres**: { `audioToIndex`: (`name`: *string*) => *number* ; `indexToAudio`: (`index`: *string* \| *number*, `allowParenthesis`: *boolean*) => *string* ; `indexToVideo`: (`index`: *string* \| *number*, `allowParenthesis`: *boolean*) => *string* ; `videoToIndex`: (`name`: *string*) => *number*  }

#### Type declaration:

Name | Type |
------ | ------ |
`audioToIndex` | (`name`: *string*) => *number* |
`indexToAudio` | (`index`: *string* \| *number*, `allowParenthesis`: *boolean*) => *string* |
`indexToVideo` | (`index`: *string* \| *number*, `allowParenthesis`: *boolean*) => *string* |
`videoToIndex` | (`name`: *string*) => *number* |

___

### Id3v2FrameFactory

• **Id3v2FrameFactory**: { `addFrameCreator`: (`creator`: FrameCreator) => *void* ; `clearFrameCreators`: () => *void* ; `createFrame`: (`data`: [*ByteVector*](classes/bytevector.md), `file`: [*File*](classes/file.md), `offset`: *number*, `version`: *number*, `alreadyUnsynced`: *boolean*) => { `frame`: [*Id3v2Frame*](classes/id3v2frame.md) ; `offset`: *number*  }  }

#### Type declaration:

Name | Type |
------ | ------ |
`addFrameCreator` | (`creator`: FrameCreator) => *void* |
`clearFrameCreators` | () => *void* |
`createFrame` | (`data`: [*ByteVector*](classes/bytevector.md), `file`: [*File*](classes/file.md), `offset`: *number*, `version`: *number*, `alreadyUnsynced`: *boolean*) => { `frame`: [*Id3v2Frame*](classes/id3v2frame.md) ; `offset`: *number*  } |

## Variables

### Id3v2FrameIdentifiers

• `Const` **Id3v2FrameIdentifiers**: *object*
