[node-taglib-sharp](../README.md) / [Exports](../modules.md) / MpegAudioHeader

# Class: MpegAudioHeader

Provides information about an MPEG audio stream. For more information and definition of the
header, see http://www.mpgedit.org/mpgedit/mpeg_format/mpeghdr.htm

## Implements

- [`IAudioCodec`](../interfaces/IAudioCodec.md)

## Table of contents

### Accessors

- [audioBitrate](MpegAudioHeader.md#audiobitrate)
- [audioChannels](MpegAudioHeader.md#audiochannels)
- [audioSampleRate](MpegAudioHeader.md#audiosamplerate)
- [channelMode](MpegAudioHeader.md#channelmode)
- [description](MpegAudioHeader.md#description)
- [durationMilliseconds](MpegAudioHeader.md#durationmilliseconds)
- [isCopyrighted](MpegAudioHeader.md#iscopyrighted)
- [isOriginal](MpegAudioHeader.md#isoriginal)
- [isProtected](MpegAudioHeader.md#isprotected)
- [layer](MpegAudioHeader.md#layer)
- [mediaTypes](MpegAudioHeader.md#mediatypes)
- [vbrHeader](MpegAudioHeader.md#vbrheader)
- [version](MpegAudioHeader.md#version)

### Methods

- [fromFile](MpegAudioHeader.md#fromfile)

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

Whether the current audio is copyrighted.

#### Returns

`boolean`

___

### isOriginal

• `get` **isOriginal**(): `boolean`

Whether the current audio is original.

#### Returns

`boolean`

___

### isProtected

• `get` **isProtected**(): `boolean`

Gets whether the audio represented by the current instance is protected by CRC.

#### Returns

`boolean`

___

### layer

• `get` **layer**(): `number`

Gets the MPEG audio layer used to encode the audio represented by the current instance.

#### Returns

`number`

___

### mediaTypes

• `get` **mediaTypes**(): [`MediaTypes`](../enums/MediaTypes.md)

Types of media represented by the current instance, bitwise combined.

#### Returns

[`MediaTypes`](../enums/MediaTypes.md)

#### Implementation of

[IAudioCodec](../interfaces/IAudioCodec.md).[mediaTypes](../interfaces/IAudioCodec.md#mediatypes)

___

### vbrHeader

• `get` **vbrHeader**(): `default`

Gets the variable bitrate header (VBR) if the MPEG audio frame contains one.

#### Returns

`default`

___

### version

• `get` **version**(): [`MpegVersion`](../enums/MpegVersion.md)

Gets the MPEG version used to encode the audio represented by the current instance.

#### Returns

[`MpegVersion`](../enums/MpegVersion.md)

## Methods

### fromFile

▸ `Static` **fromFile**(`file`, `searchStart`, `searchEnd`, `streamBytes?`): [`MpegAudioHeader`](MpegAudioHeader.md)

Constructs an MPEG audio header by searching the provided file for an MPEG sync signature
and reading the header that immediately follows.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | [`File`](File.md) | File from which to read the audio header |
| `searchStart` | `number` | Offset into the file to begin searching |
| `searchEnd` | `number` | Offset into the file to stop searching |
| `streamBytes?` | `number` | Total number of bytes in the audio stream. Used to calculate duration if a VBR header does not additionally specify it. If VBR header is not present and streamBytes is `undefined`, then duration will be 0. |

#### Returns

[`MpegAudioHeader`](MpegAudioHeader.md)

MpegAudioHeader Header as read from the file, `undefined` if not found.
