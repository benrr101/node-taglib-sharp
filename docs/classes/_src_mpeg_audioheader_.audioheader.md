**node-taglib-sharp**

> [README](../README.md) / [Globals](../globals.md) / ["src/mpeg/audioHeader"](../modules/_src_mpeg_audioheader_.md) / AudioHeader

# Class: AudioHeader

Provides information about an MPEG audio stream. For more information and definition of the
header, see http://www.mpgedit.org/mpgedit/mpeg_format/mpeghdr.htm

## Hierarchy

* **AudioHeader**

## Implements

* [IAudioCodec](../interfaces/_src_icodec_.iaudiocodec.md)

## Index

### Properties

* [Unknown](_src_mpeg_audioheader_.audioheader.md#unknown)

### Accessors

* [audioBitrate](_src_mpeg_audioheader_.audioheader.md#audiobitrate)
* [audioChannels](_src_mpeg_audioheader_.audioheader.md#audiochannels)
* [audioFrameLength](_src_mpeg_audioheader_.audioheader.md#audioframelength)
* [audioLayer](_src_mpeg_audioheader_.audioheader.md#audiolayer)
* [audioSampleRate](_src_mpeg_audioheader_.audioheader.md#audiosamplerate)
* [channelMode](_src_mpeg_audioheader_.audioheader.md#channelmode)
* [description](_src_mpeg_audioheader_.audioheader.md#description)
* [durationMilliseconds](_src_mpeg_audioheader_.audioheader.md#durationmilliseconds)
* [isCopyrighted](_src_mpeg_audioheader_.audioheader.md#iscopyrighted)
* [isOriginal](_src_mpeg_audioheader_.audioheader.md#isoriginal)
* [isPadded](_src_mpeg_audioheader_.audioheader.md#ispadded)
* [isProtected](_src_mpeg_audioheader_.audioheader.md#isprotected)
* [mediaTypes](_src_mpeg_audioheader_.audioheader.md#mediatypes)
* [streamLength](_src_mpeg_audioheader_.audioheader.md#streamlength)
* [vbriHeader](_src_mpeg_audioheader_.audioheader.md#vbriheader)
* [version](_src_mpeg_audioheader_.audioheader.md#version)
* [xingHeader](_src_mpeg_audioheader_.audioheader.md#xingheader)

### Methods

* [find](_src_mpeg_audioheader_.audioheader.md#find)
* [fromData](_src_mpeg_audioheader_.audioheader.md#fromdata)
* [fromInfo](_src_mpeg_audioheader_.audioheader.md#frominfo)

## Properties

### Unknown

▪ `Static` `Readonly` **Unknown**: [AudioHeader](_src_mpeg_audioheader_.audioheader.md) = AudioHeader.fromInfo(0, 0, XingHeader.unknown, VbriHeader.unknown)

*Defined in src/mpeg/audioHeader.ts:15*

## Accessors

### audioBitrate

• get **audioBitrate**(): number

*Defined in src/mpeg/audioHeader.ts:136*

Bitrate of the audio represented by the current instance.

**`inheritdoc`** IAudioCodec.audioBitrate

**Returns:** number

___

### audioChannels

• get **audioChannels**(): number

*Defined in src/mpeg/audioHeader.ts:161*

Number of channels in the audio represented by the current instance.

**`inheritdoc`** IAudioCodec.audioChannels

**Returns:** number

___

### audioFrameLength

• get **audioFrameLength**(): number

*Defined in src/mpeg/audioHeader.ts:166*

Gets the length of the frames in the audio represented by the current instance.

**Returns:** number

___

### audioLayer

• get **audioLayer**(): number

*Defined in src/mpeg/audioHeader.ts:183*

Gets the MPEG audio layer used to encode the audio represented by the current instance.

**Returns:** number

___

### audioSampleRate

• get **audioSampleRate**(): number

*Defined in src/mpeg/audioHeader.ts:195*

Sample rate of the audio represented by the current instance.

**`inheritdoc`** IAudioCodec.audioSampleRate

**Returns:** number

___

### channelMode

• get **channelMode**(): [ChannelMode](../enums/_src_mpeg_mpegenums_.channelmode.md)

*Defined in src/mpeg/audioHeader.ts:204*

Gets the MPEG audio channel mode of the audio represented by the current instance.

**Returns:** [ChannelMode](../enums/_src_mpeg_mpegenums_.channelmode.md)

___

### description

• get **description**(): string

*Defined in src/mpeg/audioHeader.ts:207*

Gets a text description of the media represented by the current instance.

**`inheritdoc`** ICodec.description

**Returns:** string

___

### durationMilliseconds

• get **durationMilliseconds**(): number

*Defined in src/mpeg/audioHeader.ts:230*

Duration of the media in milliseconds represented by the current instance.

**`inheritdoc`** ICodec.duration

**Returns:** number

___

### isCopyrighted

• get **isCopyrighted**(): boolean

*Defined in src/mpeg/audioHeader.ts:259*

Whether or not the current audio is copyrighted.

**Returns:** boolean

___

### isOriginal

• get **isOriginal**(): boolean

*Defined in src/mpeg/audioHeader.ts:264*

Whether or not the current audio is original.

**Returns:** boolean

___

### isPadded

• get **isPadded**(): boolean

*Defined in src/mpeg/audioHeader.ts:269*

Whether or not the audio represented by the current instance is padded.

**Returns:** boolean

___

### isProtected

• get **isProtected**(): boolean

*Defined in src/mpeg/audioHeader.ts:274*

Gets whether the audio represented by the current instance is protected by CRC.

**Returns:** boolean

___

### mediaTypes

• get **mediaTypes**(): [MediaTypes](../enums/_src_icodec_.mediatypes.md)

*Defined in src/mpeg/audioHeader.ts:277*

Types of media represented by the current instance, bitwise combined.

**`inheritdoc`** ICodec.mediaTypes

**Returns:** [MediaTypes](../enums/_src_icodec_.mediatypes.md)

___

### streamLength

• set **streamLength**(`value`: number): void

*Defined in src/mpeg/audioHeader.ts:283*

Sets the length of the audio stream represented by the current instance.
If this value has not been set, {@see durationMilliseconds} will return an incorrect value.

#### Parameters:

Name | Type |
------ | ------ |
`value` | number |

**Returns:** void

___

### vbriHeader

• get **vbriHeader**(): [VbriHeader](_src_mpeg_vbriheader_.vbriheader.md)

*Defined in src/mpeg/audioHeader.ts:296*

Gets the VBRI header found in the audio. {@see VbriHeader.Unknown} is returned if no header
was found.

**Returns:** [VbriHeader](_src_mpeg_vbriheader_.vbriheader.md)

___

### version

• get **version**(): [MpegVersion](../enums/_src_mpeg_mpegenums_.mpegversion.md)

*Defined in src/mpeg/audioHeader.ts:301*

Gets the MPEG version used to encode the audio represented by the current instance.

**Returns:** [MpegVersion](../enums/_src_mpeg_mpegenums_.mpegversion.md)

___

### xingHeader

• get **xingHeader**(): [XingHeader](_src_mpeg_xingheader_.xingheader.md)

*Defined in src/mpeg/audioHeader.ts:316*

Gets the Xing header found in the audio. {@see XingHeader.Unknown} is returned if no header
was found.

**Returns:** [XingHeader](_src_mpeg_xingheader_.xingheader.md)

## Methods

### find

▸ `Static`**find**(`file`: [File](_src_file_.file.md), `position`: number, `length`: number): object

*Defined in src/mpeg/audioHeader.ts:332*

Searches for an audio header in a file starting at a specified position and searching
through a specified number of bytes.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`file` | [File](_src_file_.file.md) | - | File to search |
`position` | number | - | Position in {@paramref file} at which to start searching |
`length` | number | -1 | Maximum number of bytes to search before giving up. Defaults to `-1` to     have no maximum |

**Returns:** object

Name | Type |
------ | ------ |
`header` | [AudioHeader](_src_mpeg_audioheader_.audioheader.md) |
`success` | boolean |

    * `header` - the header that was found or {@see AudioHeader.Unknown} if a header was not
        found
    * `success` - whether or not a header was found

___

### fromData

▸ `Static`**fromData**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `file`: [File](_src_file_.file.md), `position`: number): [AudioHeader](_src_mpeg_audioheader_.audioheader.md)

*Defined in src/mpeg/audioHeader.ts:61*

Constructs and initializes a new instance by reading its contents from a data
{@see ByteVector} and its Xing header from the appropriate location in the
specified file.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | The header data to read |
`file` | [File](_src_file_.file.md) | File to read the Xing/VBRI header from |
`position` | number | Position into {@paramref file} where the header begins, must be a positive     8-bit integer.  |

**Returns:** [AudioHeader](_src_mpeg_audioheader_.audioheader.md)

___

### fromInfo

▸ `Static`**fromInfo**(`flags`: number, `streamLength`: number, `xingHeader`: [XingHeader](_src_mpeg_xingheader_.xingheader.md), `vbriHeader`: [VbriHeader](_src_mpeg_vbriheader_.vbriheader.md)): [AudioHeader](_src_mpeg_audioheader_.audioheader.md)

*Defined in src/mpeg/audioHeader.ts:110*

Constructs and initializes a new instance by populating it with specified values.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`flags` | number | Flags for the new instance |
`streamLength` | number | Stream length of the new instance |
`xingHeader` | [XingHeader](_src_mpeg_xingheader_.xingheader.md) | Xing header associated with the new instance |
`vbriHeader` | [VbriHeader](_src_mpeg_vbriheader_.vbriheader.md) | VBRI header associated with the new instance  |

**Returns:** [AudioHeader](_src_mpeg_audioheader_.audioheader.md)
