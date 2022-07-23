[node-taglib-sharp](../README.md) / [Exports](../modules.md) / OggVorbisCodec

# Class: OggVorbisCodec

Represents an Ogg Vorbis bitstream for use in an Ogg file.

## Implements

- `default`
- [`IAudioCodec`](../interfaces/IAudioCodec.md)

## Table of contents

### Constructors

- [constructor](OggVorbisCodec.md#constructor)

### Accessors

- [audioBitrate](OggVorbisCodec.md#audiobitrate)
- [audioChannels](OggVorbisCodec.md#audiochannels)
- [audioSampleRate](OggVorbisCodec.md#audiosamplerate)
- [commentData](OggVorbisCodec.md#commentdata)
- [description](OggVorbisCodec.md#description)
- [durationMilliseconds](OggVorbisCodec.md#durationmilliseconds)
- [mediaTypes](OggVorbisCodec.md#mediatypes)

### Methods

- [readPacket](OggVorbisCodec.md#readpacket)
- [setDuration](OggVorbisCodec.md#setduration)
- [writeCommentPacket](OggVorbisCodec.md#writecommentpacket)
- [isHeaderPacket](OggVorbisCodec.md#isheaderpacket)

## Constructors

### constructor

• **new OggVorbisCodec**(`headerPacket`)

Constructs and initializes a new instance using the provided header packet.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `headerPacket` | [`ByteVector`](ByteVector.md) | Packet that contains the Vorbis header data |

## Accessors

### audioBitrate

• `get` **audioBitrate**(): `number`

Bitrate of the audio in kilobits per second represented by the current instance.

**`remarks`** For Vorbis files, this is the nominal bitrate as specified in the identification
    header. This may be significantly different than the actual average since this header
    only provides decoding hints.

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

### commentData

• `get` **commentData**(): [`ByteVector`](ByteVector.md)

Gets the raw Xiph comment data contained in the codec.

#### Returns

[`ByteVector`](ByteVector.md)

#### Implementation of

IOggCodec.commentData

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

### mediaTypes

• `get` **mediaTypes**(): [`MediaTypes`](../enums/MediaTypes.md)

Types of media represented by the current instance, bitwise combined.

#### Returns

[`MediaTypes`](../enums/MediaTypes.md)

#### Implementation of

[IAudioCodec](../interfaces/IAudioCodec.md).[mediaTypes](../interfaces/IAudioCodec.md#mediatypes)

## Methods

### readPacket

▸ **readPacket**(`packet`): `boolean`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `packet` | [`ByteVector`](ByteVector.md) |

#### Returns

`boolean`

#### Implementation of

IOggCodec.readPacket

___

### setDuration

▸ **setDuration**(`firstGranularPosition`, `lastGranularPosition`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `firstGranularPosition` | `number` |
| `lastGranularPosition` | `number` |

#### Returns

`void`

#### Implementation of

IOggCodec.setDuration

___

### writeCommentPacket

▸ **writeCommentPacket**(`packets`, `comment`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `packets` | [`ByteVector`](ByteVector.md)[] |
| `comment` | [`XiphComment`](XiphComment.md) |

#### Returns

`void`

#### Implementation of

IOggCodec.writeCommentPacket

___

### isHeaderPacket

▸ `Static` **isHeaderPacket**(`packet`): `boolean`

Determines if a packet is a Vorbis header packet.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `packet` | [`ByteVector`](ByteVector.md) | Packet to check |

#### Returns

`boolean`
