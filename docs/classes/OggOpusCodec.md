[node-taglib-sharp](../README.md) / [Exports](../modules.md) / OggOpusCodec

# Class: OggOpusCodec

Represents an Ogg Opus bitstream for use within an Ogg file.

## Implements

- `default`
- [`IAudioCodec`](../interfaces/IAudioCodec.md)

## Table of contents

### Constructors

- [constructor](OggOpusCodec.md#constructor)

### Accessors

- [audioBitrate](OggOpusCodec.md#audiobitrate)
- [audioChannels](OggOpusCodec.md#audiochannels)
- [audioSampleRate](OggOpusCodec.md#audiosamplerate)
- [commentData](OggOpusCodec.md#commentdata)
- [description](OggOpusCodec.md#description)
- [durationMilliseconds](OggOpusCodec.md#durationmilliseconds)
- [mediaTypes](OggOpusCodec.md#mediatypes)
- [streamCount](OggOpusCodec.md#streamcount)

### Methods

- [readPacket](OggOpusCodec.md#readpacket)
- [setDuration](OggOpusCodec.md#setduration)
- [writeCommentPacket](OggOpusCodec.md#writecommentpacket)
- [isHeaderPacket](OggOpusCodec.md#isheaderpacket)

## Constructors

### constructor

• **new OggOpusCodec**(`headerPacket`)

Constructs and initializes a new instance using the provided header packet to read the
codec's header information.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `headerPacket` | [`ByteVector`](ByteVector.md) | Packet containing the header of the stream |

## Accessors

### audioBitrate

• `get` **audioBitrate**(): `number`

Bitrate of the audio in kilobits per second represented by the current instance.

**`remarks`** Always returns zero since bitrate is variable and no information is stored in the
    Ogg header (unlike Vorbis).

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

**`remarks`** This is the *input* sample rate used when the file was created. Opus uses a variety
    of sample rates internally, and as such the output sample rate is dependent on the
    decoder used. In most modern hardware cases, this will be 48kHz.

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

___

### streamCount

• `get` **streamCount**(): `number`

Gets the number of streams contained in the bitstream.

#### Returns

`number`

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

▸ `Static` **isHeaderPacket**(`headerPacket`): `boolean`

Determines whether an Opus header packet based on the presence of the Opus header
packet magic signature.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `headerPacket` | [`ByteVector`](ByteVector.md) | Packet to check |

#### Returns

`boolean`
