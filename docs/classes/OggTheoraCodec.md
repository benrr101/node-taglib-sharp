[node-taglib-sharp](../README.md) / [Exports](../modules.md) / OggTheoraCodec

# Class: OggTheoraCodec

Represents an Ogg Theora bitstream for use in an Ogg file.

## Implements

- [`IOggCodec`](../interfaces/IOggCodec.md)
- [`IVideoCodec`](../interfaces/IVideoCodec.md)

## Table of contents

### Constructors

- [constructor](OggTheoraCodec.md#constructor)

### Accessors

- [commentData](OggTheoraCodec.md#commentdata)
- [description](OggTheoraCodec.md#description)
- [durationMilliseconds](OggTheoraCodec.md#durationmilliseconds)
- [mediaTypes](OggTheoraCodec.md#mediatypes)
- [videoHeight](OggTheoraCodec.md#videoheight)
- [videoWidth](OggTheoraCodec.md#videowidth)

### Methods

- [readPacket](OggTheoraCodec.md#readpacket)
- [setDuration](OggTheoraCodec.md#setduration)
- [writeCommentPacket](OggTheoraCodec.md#writecommentpacket)
- [isHeaderPacket](OggTheoraCodec.md#isheaderpacket)

## Constructors

### constructor

• **new OggTheoraCodec**(`headerPacket`)

Constructs and initializes a new instance using the provided header packet.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `headerPacket` | [`ByteVector`](ByteVector.md) | Packet that contains the Theora header data |

## Accessors

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

[IVideoCodec](../interfaces/IVideoCodec.md).[description](../interfaces/IVideoCodec.md#description)

___

### durationMilliseconds

• `get` **durationMilliseconds**(): `number`

Duration of the media in milliseconds represented by the current instance.

#### Returns

`number`

#### Implementation of

[IVideoCodec](../interfaces/IVideoCodec.md).[durationMilliseconds](../interfaces/IVideoCodec.md#durationmilliseconds)

___

### mediaTypes

• `get` **mediaTypes**(): [`MediaTypes`](../enums/MediaTypes.md)

Types of media represented by the current instance, bitwise combined.

#### Returns

[`MediaTypes`](../enums/MediaTypes.md)

#### Implementation of

[IVideoCodec](../interfaces/IVideoCodec.md).[mediaTypes](../interfaces/IVideoCodec.md#mediatypes)

___

### videoHeight

• `get` **videoHeight**(): `number`

Height of the video in pixels represented by the current instance.

#### Returns

`number`

#### Implementation of

[IVideoCodec](../interfaces/IVideoCodec.md).[videoHeight](../interfaces/IVideoCodec.md#videoheight)

___

### videoWidth

• `get` **videoWidth**(): `number`

Width of the video in pixels represented by the current instance.

#### Returns

`number`

#### Implementation of

[IVideoCodec](../interfaces/IVideoCodec.md).[videoWidth](../interfaces/IVideoCodec.md#videowidth)

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

Checks to see if packet is a Theora header packet.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `packet` | [`ByteVector`](ByteVector.md) | Packet to check |

#### Returns

`boolean`
