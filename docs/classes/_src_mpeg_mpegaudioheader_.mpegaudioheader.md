**[node-taglib-sharp](../README.md)**

> [Globals](../globals.md) / ["src/mpeg/mpegAudioHeader"](../modules/_src_mpeg_mpegaudioheader_.md) / MpegAudioHeader

# Class: MpegAudioHeader

Provides information about an MPEG audio stream. For more information and definition of the
header, see http://www.mpgedit.org/mpgedit/mpeg_format/mpeghdr.htm

## Hierarchy

* **MpegAudioHeader**

## Implements

* [IAudioCodec](../interfaces/_src_icodec_.iaudiocodec.md)

## Index

### Properties

* [Unknown](_src_mpeg_mpegaudioheader_.mpegaudioheader.md#unknown)

### Accessors

* [audioBitrate](_src_mpeg_mpegaudioheader_.mpegaudioheader.md#audiobitrate)
* [audioChannels](_src_mpeg_mpegaudioheader_.mpegaudioheader.md#audiochannels)
* [audioFrameLength](_src_mpeg_mpegaudioheader_.mpegaudioheader.md#audioframelength)
* [audioLayer](_src_mpeg_mpegaudioheader_.mpegaudioheader.md#audiolayer)
* [audioSampleRate](_src_mpeg_mpegaudioheader_.mpegaudioheader.md#audiosamplerate)
* [channelMode](_src_mpeg_mpegaudioheader_.mpegaudioheader.md#channelmode)
* [description](_src_mpeg_mpegaudioheader_.mpegaudioheader.md#description)
* [durationMilliseconds](_src_mpeg_mpegaudioheader_.mpegaudioheader.md#durationmilliseconds)
* [isCopyrighted](_src_mpeg_mpegaudioheader_.mpegaudioheader.md#iscopyrighted)
* [isOriginal](_src_mpeg_mpegaudioheader_.mpegaudioheader.md#isoriginal)
* [isPadded](_src_mpeg_mpegaudioheader_.mpegaudioheader.md#ispadded)
* [isProtected](_src_mpeg_mpegaudioheader_.mpegaudioheader.md#isprotected)
* [mediaTypes](_src_mpeg_mpegaudioheader_.mpegaudioheader.md#mediatypes)
* [streamLength](_src_mpeg_mpegaudioheader_.mpegaudioheader.md#streamlength)
* [vbriHeader](_src_mpeg_mpegaudioheader_.mpegaudioheader.md#vbriheader)
* [version](_src_mpeg_mpegaudioheader_.mpegaudioheader.md#version)
* [xingHeader](_src_mpeg_mpegaudioheader_.mpegaudioheader.md#xingheader)

### Methods

* [find](_src_mpeg_mpegaudioheader_.mpegaudioheader.md#find)
* [fromData](_src_mpeg_mpegaudioheader_.mpegaudioheader.md#fromdata)
* [fromInfo](_src_mpeg_mpegaudioheader_.mpegaudioheader.md#frominfo)

## Properties

### Unknown

▪ `Static` `Readonly` **Unknown**: [MpegAudioHeader](_src_mpeg_mpegaudioheader_.mpegaudioheader.md) = MpegAudioHeader.fromInfo( 0, 0, XingHeader.unknown, VbriHeader.unknown )

## Accessors

### audioBitrate

• get **audioBitrate**(): number

Bitrate of the audio in kilibits per second represented by the current instance.

**`inheritdoc`** IAudioCodec.audioBitrate

**Returns:** number

___

### audioChannels

• get **audioChannels**(): number

Number of channels in the audio represented by the current instance.

**`inheritdoc`** IAudioCodec.audioChannels

**Returns:** number

___

### audioFrameLength

• get **audioFrameLength**(): number

Gets the length of the frames in the audio represented by the current instance.

**Returns:** number

___

### audioLayer

• get **audioLayer**(): number

Gets the MPEG audio layer used to encode the audio represented by the current instance.

**Returns:** number

___

### audioSampleRate

• get **audioSampleRate**(): number

Sample rate of the audio represented by the current instance.

**`inheritdoc`** IAudioCodec.audioSampleRate

**Returns:** number

___

### channelMode

• get **channelMode**(): [ChannelMode](../enums/_src_mpeg_mpegenums_.channelmode.md)

Gets the MPEG audio channel mode of the audio represented by the current instance.

**Returns:** [ChannelMode](../enums/_src_mpeg_mpegenums_.channelmode.md)

___

### description

• get **description**(): string

Gets a text description of the media represented by the current instance.

**`inheritdoc`** ICodec.description

**Returns:** string

___

### durationMilliseconds

• get **durationMilliseconds**(): number

Duration of the media in milliseconds represented by the current instance.

**`inheritdoc`** ICodec.duration

**Returns:** number

___

### isCopyrighted

• get **isCopyrighted**(): boolean

Whether or not the current audio is copyrighted.

**Returns:** boolean

___

### isOriginal

• get **isOriginal**(): boolean

Whether or not the current audio is original.

**Returns:** boolean

___

### isPadded

• get **isPadded**(): boolean

Whether or not the audio represented by the current instance is padded.

**Returns:** boolean

___

### isProtected

• get **isProtected**(): boolean

Gets whether the audio represented by the current instance is protected by CRC.

**Returns:** boolean

___

### mediaTypes

• get **mediaTypes**(): [MediaTypes](../enums/_src_icodec_.mediatypes.md)

Types of media represented by the current instance, bitwise combined.

**`inheritdoc`** ICodec.mediaTypes

**Returns:** [MediaTypes](../enums/_src_icodec_.mediatypes.md)

___

### streamLength

• set **streamLength**(`value`: number): void

Sets the length of the audio stream represented by the current instance.
If this value has not been set, [durationMilliseconds](_src_mpeg_mpegaudioheader_.mpegaudioheader.md#durationmilliseconds) will return an incorrect value.

#### Parameters:

Name | Type |
------ | ------ |
`value` | number |

**Returns:** void

___

### vbriHeader

• get **vbriHeader**(): [VbriHeader](_src_mpeg_vbriheader_.vbriheader.md)

Gets the VBRI header found in the audio. [VbriHeader.unknown](_src_mpeg_vbriheader_.vbriheader.md#unknown) is returned if no header
was found.

**Returns:** [VbriHeader](_src_mpeg_vbriheader_.vbriheader.md)

___

### version

• get **version**(): [MpegVersion](../enums/_src_mpeg_mpegenums_.mpegversion.md)

Gets the MPEG version used to encode the audio represented by the current instance.

**Returns:** [MpegVersion](../enums/_src_mpeg_mpegenums_.mpegversion.md)

___

### xingHeader

• get **xingHeader**(): [XingHeader](_src_mpeg_xingheader_.xingheader.md)

Gets the Xing header found in the audio. [XingHeader.unknown](_src_mpeg_xingheader_.xingheader.md#unknown) is returned if no header
was found.

**Returns:** [XingHeader](_src_mpeg_xingheader_.xingheader.md)

## Methods

### find

▸ `Static`**find**(`file`: [File](_src_file_.file.md), `position`: number, `length?`: number): object

Searches for an audio header in a file starting at a specified position and searching
through a specified number of bytes.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`file` | [File](_src_file_.file.md) | - | File to search |
`position` | number | - | Position in `file` at which to start searching |
`length` | number | -1 | Maximum number of bytes to search before giving up. Defaults to `-1` to     have no maximum |

**Returns:** object

Name | Type |
------ | ------ |
`header` | [MpegAudioHeader](_src_mpeg_mpegaudioheader_.mpegaudioheader.md) |
`success` | boolean |

    * `header` - the header that was found or [MpegAudioHeader.Unknown](_src_mpeg_mpegaudioheader_.mpegaudioheader.md#unknown) if a header was not
        found
    * `success` - whether or not a header was found

___

### fromData

▸ `Static`**fromData**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `file`: [File](_src_file_.file.md), `position`: number): [MpegAudioHeader](_src_mpeg_mpegaudioheader_.mpegaudioheader.md)

Constructs and initializes a new instance by reading its contents from a data
[ByteVector](_src_bytevector_.bytevector.md) and its Xing header from the appropriate location in the
specified file.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | The header data to read |
`file` | [File](_src_file_.file.md) | File to read the Xing/VBRI header from |
`position` | number | Position into `file` where the header begins, must be a positive     8-bit integer.  |

**Returns:** [MpegAudioHeader](_src_mpeg_mpegaudioheader_.mpegaudioheader.md)

___

### fromInfo

▸ `Static`**fromInfo**(`flags`: number, `streamLength`: number, `xingHeader`: [XingHeader](_src_mpeg_xingheader_.xingheader.md), `vbriHeader`: [VbriHeader](_src_mpeg_vbriheader_.vbriheader.md)): [MpegAudioHeader](_src_mpeg_mpegaudioheader_.mpegaudioheader.md)

Constructs and initializes a new instance by populating it with specified values.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`flags` | number | Flags for the new instance |
`streamLength` | number | Stream length of the new instance |
`xingHeader` | [XingHeader](_src_mpeg_xingheader_.xingheader.md) | Xing header associated with the new instance |
`vbriHeader` | [VbriHeader](_src_mpeg_vbriheader_.vbriheader.md) | VBRI header associated with the new instance  |

**Returns:** [MpegAudioHeader](_src_mpeg_mpegaudioheader_.mpegaudioheader.md)
