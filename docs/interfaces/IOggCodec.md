[node-taglib-sharp](../README.md) / [Exports](../modules.md) / IOggCodec

# Interface: IOggCodec

Interface for an OGG codec.

## Hierarchy

- [`ICodec`](ICodec.md)

  ↳ **`IOggCodec`**

## Implemented by

- [`OggOpusCodec`](../classes/OggOpusCodec.md)
- [`OggTheoraCodec`](../classes/OggTheoraCodec.md)
- [`OggVorbisCodec`](../classes/OggVorbisCodec.md)

## Table of contents

### Properties

- [description](IOggCodec.md#description)
- [durationMilliseconds](IOggCodec.md#durationmilliseconds)
- [mediaTypes](IOggCodec.md#mediatypes)

### Accessors

- [commentData](IOggCodec.md#commentdata)

### Methods

- [readPacket](IOggCodec.md#readpacket)
- [setDuration](IOggCodec.md#setduration)
- [writeCommentPacket](IOggCodec.md#writecommentpacket)

## Properties

### description

• **description**: `string`

Gets a text description of the media represented by the current instance.

#### Inherited from

[ICodec](ICodec.md).[description](ICodec.md#description)

___

### durationMilliseconds

• **durationMilliseconds**: `number`

Duration of the media in milliseconds represented by the current instance.

**`TODO`**

Ensure milliseconds is the right way to interpret this field

#### Inherited from

[ICodec](ICodec.md).[durationMilliseconds](ICodec.md#durationmilliseconds)

___

### mediaTypes

• **mediaTypes**: [`MediaTypes`](../enums/MediaTypes.md)

Types of media represented by the current instance, bitwise combined.

#### Inherited from

[ICodec](ICodec.md).[mediaTypes](ICodec.md#mediatypes)

## Accessors

### commentData

• `get` **commentData**(): [`ByteVector`](../classes/ByteVector.md)

Gets the raw Xiph comment data contained in the codec.

#### Returns

[`ByteVector`](../classes/ByteVector.md)

## Methods

### readPacket

▸ **readPacket**(`packet`): `boolean`

Reads an Ogg packet that has been encountered in the stream, looking for the comment data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `packet` | [`ByteVector`](../classes/ByteVector.md) | Packet to read |

#### Returns

`boolean`

`true` if the codec has read all the necessary packets for the stream and
    does not need to be called again,

___

### setDuration

▸ **setDuration**(`firstGranularPosition`, `lastGranularPosition`): `void`

Sets the file offset information necessary for calculating the duration of the stream. Once
called, the duration can be accessed by calling [durationMilliseconds](ICodec.md#durationmilliseconds).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `firstGranularPosition` | `number` | First granular position of the stream |
| `lastGranularPosition` | `number` | Last granular position of the stream |

#### Returns

`void`

___

### writeCommentPacket

▸ **writeCommentPacket**(`packets`, `comment`): `void`

Renders and write the provided comment into the provided list of packets.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `packets` | [`ByteVector`](../classes/ByteVector.md)[] | List of packets the comment packet should be written into. |
| `comment` | [`XiphComment`](../classes/XiphComment.md) | Xiph comment to write into the list of packets. |

#### Returns

`void`
