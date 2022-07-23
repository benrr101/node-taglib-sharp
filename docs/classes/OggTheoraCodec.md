[node-taglib-sharp](../README.md) / [Exports](../modules.md) / OggTheoraCodec

# Class: OggTheoraCodec

Represents an Ogg Theora bitstream for use in an Ogg file.

## Implements

- `default`
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

**`inheritdoc`**

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

Checks to see if packet is a Theora header packet.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `packet` | [`ByteVector`](ByteVector.md) | Packet to check |

#### Returns

`boolean`
