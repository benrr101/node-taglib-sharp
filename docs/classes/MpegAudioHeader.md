[node-taglib-sharp](../README.md) / [Exports](../modules.md) / MpegAudioHeader

# Class: MpegAudioHeader

Provides information about an MPEG audio stream. For more information and definition of the
header, see http://www.mpgedit.org/mpgedit/mpeg_format/mpeghdr.htm

## Implements

- [`IAudioCodec`](../interfaces/IAudioCodec.md)

## Table of contents

### Properties

- [UNKNOWN](MpegAudioHeader.md#unknown)

### Accessors

- [audioBitrate](MpegAudioHeader.md#audiobitrate)
- [audioChannels](MpegAudioHeader.md#audiochannels)
- [audioFrameLength](MpegAudioHeader.md#audioframelength)
- [audioLayer](MpegAudioHeader.md#audiolayer)
- [audioSampleRate](MpegAudioHeader.md#audiosamplerate)
- [channelMode](MpegAudioHeader.md#channelmode)
- [description](MpegAudioHeader.md#description)
- [durationMilliseconds](MpegAudioHeader.md#durationmilliseconds)
- [isCopyrighted](MpegAudioHeader.md#iscopyrighted)
- [isOriginal](MpegAudioHeader.md#isoriginal)
- [isPadded](MpegAudioHeader.md#ispadded)
- [isProtected](MpegAudioHeader.md#isprotected)
- [mediaTypes](MpegAudioHeader.md#mediatypes)
- [vbriHeader](MpegAudioHeader.md#vbriheader)
- [version](MpegAudioHeader.md#version)
- [xingHeader](MpegAudioHeader.md#xingheader)

### Methods

- [find](MpegAudioHeader.md#find)
- [fromData](MpegAudioHeader.md#fromdata)
- [fromInfo](MpegAudioHeader.md#frominfo)

## Properties

### UNKNOWN

▪ `Static` `Readonly` **UNKNOWN**: [`MpegAudioHeader`](MpegAudioHeader.md)

Static instance of an audio header that has unknown information.

## Accessors

### audioBitrate

• `get` **audioBitrate**(): `number`

Bitrate of the audio in kilobits per second represented by the current instance.

#### Returns

`number`

#### Implementation of

[IAudioCodec](../interfaces/IAudioCodec.md).[audioBitrate](../interfaces/IAudioCodec.md#audiobitrate)

___

### audioChannels

• `get` **audioChannels**(): `number`

Number of channels in the audio represented by the current instance.

#### Returns

`number`

#### Implementation of

[IAudioCodec](../interfaces/IAudioCodec.md).[audioChannels](../interfaces/IAudioCodec.md#audiochannels)

___

### audioFrameLength

• `get` **audioFrameLength**(): `number`

Gets the length of the frames in the audio represented by the current instance.

#### Returns

`number`

___

### audioLayer

• `get` **audioLayer**(): `number`

Gets the MPEG audio layer used to encode the audio represented by the current instance.

#### Returns

`number`

___

### audioSampleRate

• `get` **audioSampleRate**(): `number`

Sample rate of the audio represented by the current instance.

#### Returns

`number`

#### Implementation of

[IAudioCodec](../interfaces/IAudioCodec.md).[audioSampleRate](../interfaces/IAudioCodec.md#audiosamplerate)

___

### channelMode

• `get` **channelMode**(): [`MpegAudioChannelMode`](../enums/MpegAudioChannelMode.md)

Gets the MPEG audio channel mode of the audio represented by the current instance.

#### Returns

[`MpegAudioChannelMode`](../enums/MpegAudioChannelMode.md)

___

### description

• `get` **description**(): `string`

Gets a text description of the media represented by the current instance.

#### Returns

`string`

#### Implementation of

[IAudioCodec](../interfaces/IAudioCodec.md).[description](../interfaces/IAudioCodec.md#description)

___

### durationMilliseconds

• `get` **durationMilliseconds**(): `number`

Duration of the media in milliseconds represented by the current instance.

#### Returns

`number`

#### Implementation of

[IAudioCodec](../interfaces/IAudioCodec.md).[durationMilliseconds](../interfaces/IAudioCodec.md#durationmilliseconds)

___

### isCopyrighted

• `get` **isCopyrighted**(): `boolean`

Whether or not the current audio is copyrighted.

#### Returns

`boolean`

___

### isOriginal

• `get` **isOriginal**(): `boolean`

Whether or not the current audio is original.

#### Returns

`boolean`

___

### isPadded

• `get` **isPadded**(): `boolean`

Whether or not the audio represented by the current instance is padded.

#### Returns

`boolean`

___

### isProtected

• `get` **isProtected**(): `boolean`

Gets whether the audio represented by the current instance is protected by CRC.

#### Returns

`boolean`

___

### mediaTypes

• `get` **mediaTypes**(): [`MediaTypes`](../enums/MediaTypes.md)

Types of media represented by the current instance, bitwise combined.

#### Returns

[`MediaTypes`](../enums/MediaTypes.md)

#### Implementation of

[IAudioCodec](../interfaces/IAudioCodec.md).[mediaTypes](../interfaces/IAudioCodec.md#mediatypes)

___

### vbriHeader

• `get` **vbriHeader**(): [`MpegVbriHeader`](MpegVbriHeader.md)

Gets the VBRI header found in the audio. VbriHeader.UNKNOWN is returned if no header
was found.

#### Returns

[`MpegVbriHeader`](MpegVbriHeader.md)

___

### version

• `get` **version**(): [`MpegVersion`](../enums/MpegVersion.md)

Gets the MPEG version used to encode the audio represented by the current instance.

#### Returns

[`MpegVersion`](../enums/MpegVersion.md)

___

### xingHeader

• `get` **xingHeader**(): [`MpegXingHeader`](MpegXingHeader.md)

Gets the Xing header found in the audio. XingHeader.UNKNOWN is returned if no header
was found.

#### Returns

[`MpegXingHeader`](MpegXingHeader.md)

## Methods

### find

▸ `Static` **find**(`file`, `position`, `length?`): [`MpegAudioHeader`](MpegAudioHeader.md)

Searches for an audio header in a file starting at a specified position and searching
through a specified number of bytes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | [`File`](File.md) | File to search |
| `position` | `number` | Position in `file` at which to start searching |
| `length?` | `number` | Maximum number of bytes to search before giving up. Defaults to `-1` to have no maximum |

#### Returns

[`MpegAudioHeader`](MpegAudioHeader.md)

The header that was found or `undefined` if a header was not found

___

### fromData

▸ `Static` **fromData**(`data`, `file`, `position`): [`MpegAudioHeader`](MpegAudioHeader.md)

Constructs and initializes a new instance by reading its contents from a data
[ByteVector](ByteVector.md) and its Xing header from the appropriate location in the
specified file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](ByteVector.md) | The header data to read |
| `file` | [`File`](File.md) | File to read the Xing/VBRI header from |
| `position` | `number` | Position into `file` where the header begins, must be a positive 8-bit integer. |

#### Returns

[`MpegAudioHeader`](MpegAudioHeader.md)

___

### fromInfo

▸ `Static` **fromInfo**(`flags`, `streamLength`, `xingHeader`, `vbriHeader`): [`MpegAudioHeader`](MpegAudioHeader.md)

Constructs and initializes a new instance by populating it with specified values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `flags` | `number` | Flags for the new instance |
| `streamLength` | `number` | Stream length of the new instance |
| `xingHeader` | [`MpegXingHeader`](MpegXingHeader.md) | Xing header associated with the new instance |
| `vbriHeader` | [`MpegVbriHeader`](MpegVbriHeader.md) | VBRI header associated with the new instance |

#### Returns

[`MpegAudioHeader`](MpegAudioHeader.md)
