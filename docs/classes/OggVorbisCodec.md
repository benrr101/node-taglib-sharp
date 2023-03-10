[node-taglib-sharp](../README.md) / [Exports](../modules.md) / OggVorbisCodec

# Class: OggVorbisCodec

Represents an Ogg Vorbis bitstream for use in an Ogg file.

## Implements

- [`IOggCodec`](../interfaces/IOggCodec.md)
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

**`Remarks`**

For Vorbis files, this is the nominal bitrate as specified in the identification
    header. This may be significantly different from the actual average since this header
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

Reads an Ogg packet that has been encountered in the stream, looking for the comment data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `packet` | [`ByteVector`](ByteVector.md) | Packet to read |

#### Returns

`boolean`

#### Implementation of

[IOggCodec](../interfaces/IOggCodec.md).[readPacket](../interfaces/IOggCodec.md#readpacket)

___

### setDuration

▸ **setDuration**(`firstGranularPosition`, `lastGranularPosition`): `void`

Sets the file offset information necessary for calculating the duration of the stream. Once
called, the duration can be accessed by calling [durationMilliseconds](../interfaces/ICodec.md#durationmilliseconds).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `firstGranularPosition` | `number` | First granular position of the stream |
| `lastGranularPosition` | `number` | Last granular position of the stream |

#### Returns

`void`

#### Implementation of

[IOggCodec](../interfaces/IOggCodec.md).[setDuration](../interfaces/IOggCodec.md#setduration)

___

### writeCommentPacket

▸ **writeCommentPacket**(`packets`, `comment`): `void`

Renders and write the provided comment into the provided list of packets.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `packets` | [`ByteVector`](ByteVector.md)[] | List of packets the comment packet should be written into. |
| `comment` | [`XiphComment`](XiphComment.md) | Xiph comment to write into the list of packets. |

#### Returns

`void`

#### Implementation of

[IOggCodec](../interfaces/IOggCodec.md).[writeCommentPacket](../interfaces/IOggCodec.md#writecommentpacket)

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
