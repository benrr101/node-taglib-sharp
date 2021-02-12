[node-taglib-sharp](../README.md) / [Exports](../modules.md) / MpegAudioHeader

# Class: MpegAudioHeader

Provides information about an MPEG audio stream. For more information and definition of the
header, see http://www.mpgedit.org/mpgedit/mpeg_format/mpeghdr.htm

## Hierarchy

* **MpegAudioHeader**

## Implements

* [*IAudioCodec*](../interfaces/iaudiocodec.md)

## Table of contents

### Properties

- [Unknown](mpegaudioheader.md#unknown)

### Accessors

- [audioBitrate](mpegaudioheader.md#audiobitrate)
- [audioChannels](mpegaudioheader.md#audiochannels)
- [audioFrameLength](mpegaudioheader.md#audioframelength)
- [audioLayer](mpegaudioheader.md#audiolayer)
- [audioSampleRate](mpegaudioheader.md#audiosamplerate)
- [channelMode](mpegaudioheader.md#channelmode)
- [description](mpegaudioheader.md#description)
- [durationMilliseconds](mpegaudioheader.md#durationmilliseconds)
- [isCopyrighted](mpegaudioheader.md#iscopyrighted)
- [isOriginal](mpegaudioheader.md#isoriginal)
- [isPadded](mpegaudioheader.md#ispadded)
- [isProtected](mpegaudioheader.md#isprotected)
- [mediaTypes](mpegaudioheader.md#mediatypes)
- [streamLength](mpegaudioheader.md#streamlength)
- [vbriHeader](mpegaudioheader.md#vbriheader)
- [version](mpegaudioheader.md#version)
- [xingHeader](mpegaudioheader.md#xingheader)

### Methods

- [find](mpegaudioheader.md#find)
- [fromData](mpegaudioheader.md#fromdata)
- [fromInfo](mpegaudioheader.md#frominfo)

## Properties

### Unknown

▪ `Readonly` `Static` **Unknown**: [*MpegAudioHeader*](mpegaudioheader.md)

## Accessors

### audioBitrate

• **audioBitrate**(): *number*

Bitrate of the audio in kilobits per second represented by the current instance.

**Returns:** *number*

Implementation of: [IAudioCodec](../interfaces/iaudiocodec.md).[audioBitrate](../interfaces/iaudiocodec.md#audiobitrate)

___

### audioChannels

• **audioChannels**(): *number*

Number of channels in the audio represented by the current instance.

**Returns:** *number*

Implementation of: [IAudioCodec](../interfaces/iaudiocodec.md).[audioChannels](../interfaces/iaudiocodec.md#audiochannels)

___

### audioFrameLength

• **audioFrameLength**(): *number*

Gets the length of the frames in the audio represented by the current instance.

**Returns:** *number*

___

### audioLayer

• **audioLayer**(): *number*

Gets the MPEG audio layer used to encode the audio represented by the current instance.

**Returns:** *number*

___

### audioSampleRate

• **audioSampleRate**(): *number*

Sample rate of the audio represented by the current instance.

**Returns:** *number*

Implementation of: [IAudioCodec](../interfaces/iaudiocodec.md).[audioSampleRate](../interfaces/iaudiocodec.md#audiosamplerate)

___

### channelMode

• **channelMode**(): [*MpegAudioChannelMode*](../enums/mpegaudiochannelmode.md)

Gets the MPEG audio channel mode of the audio represented by the current instance.

**Returns:** [*MpegAudioChannelMode*](../enums/mpegaudiochannelmode.md)

___

### description

• **description**(): *string*

Gets a text description of the media represented by the current instance.

**Returns:** *string*

Implementation of: [IAudioCodec](../interfaces/iaudiocodec.md).[description](../interfaces/iaudiocodec.md#description)

___

### durationMilliseconds

• **durationMilliseconds**(): *number*

Duration of the media in milliseconds represented by the current instance.

**Returns:** *number*

Implementation of: [IAudioCodec](../interfaces/iaudiocodec.md).[durationMilliseconds](../interfaces/iaudiocodec.md#durationmilliseconds)

___

### isCopyrighted

• **isCopyrighted**(): *boolean*

Whether or not the current audio is copyrighted.

**Returns:** *boolean*

___

### isOriginal

• **isOriginal**(): *boolean*

Whether or not the current audio is original.

**Returns:** *boolean*

___

### isPadded

• **isPadded**(): *boolean*

Whether or not the audio represented by the current instance is padded.

**Returns:** *boolean*

___

### isProtected

• **isProtected**(): *boolean*

Gets whether the audio represented by the current instance is protected by CRC.

**Returns:** *boolean*

___

### mediaTypes

• **mediaTypes**(): [*MediaTypes*](../enums/mediatypes.md)

Types of media represented by the current instance, bitwise combined.

**Returns:** [*MediaTypes*](../enums/mediatypes.md)

Implementation of: [IAudioCodec](../interfaces/iaudiocodec.md).[mediaTypes](../interfaces/iaudiocodec.md#mediatypes)

___

### streamLength

• **streamLength**(`value`: *number*): *void*

Sets the length of the audio stream represented by the current instance.
If this value has not been set, [durationMilliseconds](mpegaudioheader.md#durationmilliseconds) will return an incorrect value.

#### Parameters:

Name | Type |
------ | ------ |
`value` | *number* |

**Returns:** *void*

___

### vbriHeader

• **vbriHeader**(): [*MpegVbriHeader*](mpegvbriheader.md)

Gets the VBRI header found in the audio. {@link VbriHeader.unknown} is returned if no header
was found.

**Returns:** [*MpegVbriHeader*](mpegvbriheader.md)

___

### version

• **version**(): [*MpegVersion*](../enums/mpegversion.md)

Gets the MPEG version used to encode the audio represented by the current instance.

**Returns:** [*MpegVersion*](../enums/mpegversion.md)

___

### xingHeader

• **xingHeader**(): [*MpegXingHeader*](mpegxingheader.md)

Gets the Xing header found in the audio. {@link XingHeader.unknown} is returned if no header
was found.

**Returns:** [*MpegXingHeader*](mpegxingheader.md)

## Methods

### find

▸ `Static`**find**(`file`: [*File*](file.md), `position`: *number*, `length?`: *number*): *object*

Searches for an audio header in a file starting at a specified position and searching
through a specified number of bytes.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`file` | [*File*](file.md) | - | File to search   |
`position` | *number* | - | Position in `file` at which to start searching   |
`length` | *number* | -1 | Maximum number of bytes to search before giving up. Defaults to `-1` to     have no maximum   |

**Returns:** *object*

Name | Type |
------ | ------ |
`header` | [*MpegAudioHeader*](mpegaudioheader.md) |
`success` | *boolean* |

    * `header` - the header that was found or [MpegAudioHeader.Unknown](mpegaudioheader.md#unknown) if a header was not
        found
    * `success` - whether or not a header was found

___

### fromData

▸ `Static`**fromData**(`data`: [*ByteVector*](bytevector.md), `file`: [*File*](file.md), `position`: *number*): [*MpegAudioHeader*](mpegaudioheader.md)

Constructs and initializes a new instance by reading its contents from a data
[ByteVector](bytevector.md) and its Xing header from the appropriate location in the
specified file.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [*ByteVector*](bytevector.md) | The header data to read   |
`file` | [*File*](file.md) | File to read the Xing/VBRI header from   |
`position` | *number* | Position into `file` where the header begins, must be a positive     8-bit integer.    |

**Returns:** [*MpegAudioHeader*](mpegaudioheader.md)

___

### fromInfo

▸ `Static`**fromInfo**(`flags`: *number*, `streamLength`: *number*, `xingHeader`: [*MpegXingHeader*](mpegxingheader.md), `vbriHeader`: [*MpegVbriHeader*](mpegvbriheader.md)): [*MpegAudioHeader*](mpegaudioheader.md)

Constructs and initializes a new instance by populating it with specified values.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`flags` | *number* | Flags for the new instance   |
`streamLength` | *number* | Stream length of the new instance   |
`xingHeader` | [*MpegXingHeader*](mpegxingheader.md) | Xing header associated with the new instance   |
`vbriHeader` | [*MpegVbriHeader*](mpegvbriheader.md) | VBRI header associated with the new instance    |

**Returns:** [*MpegAudioHeader*](mpegaudioheader.md)
