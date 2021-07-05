[node-taglib-sharp](../README.md) / [Exports](../modules.md) / AviAudioStream

# Class: AviAudioStream

Representation of an AVI audio stream to support reading audio stream data.

## Hierarchy

- [`AviStream`](avistream.md)

  ↳ **`AviAudioStream`**

## Table of contents

### Constructors

- [constructor](aviaudiostream.md#constructor)

### Properties

- [\_codec](aviaudiostream.md#_codec)
- [\_header](aviaudiostream.md#_header)

### Accessors

- [codec](aviaudiostream.md#codec)
- [header](aviaudiostream.md#header)

### Methods

- [parseItem](aviaudiostream.md#parseitem)
- [parseStreamList](aviaudiostream.md#parsestreamlist)

## Constructors

### constructor

• **new AviAudioStream**(`header`)

Constructs and initializes a new instance with a specified stream header.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `header` | [`AviStreamHeader`](avistreamheader.md) | Header that defines the stream |

#### Overrides

[AviStream](avistream.md).[constructor](avistream.md#constructor)

## Properties

### \_codec

• `Protected` **\_codec**: [`ICodec`](../interfaces/icodec.md)

#### Inherited from

[AviStream](avistream.md).[_codec](avistream.md#_codec)

___

### \_header

• `Protected` `Readonly` **\_header**: [`AviStreamHeader`](avistreamheader.md)

#### Inherited from

[AviStream](avistream.md).[_header](avistream.md#_header)

## Accessors

### codec

• `get` **codec**(): [`ICodec`](../interfaces/icodec.md)

Gets the codec information for this stream.

#### Returns

[`ICodec`](../interfaces/icodec.md)

___

### header

• `get` **header**(): [`AviStreamHeader`](avistreamheader.md)

Gets the header for this stream.

#### Returns

[`AviStreamHeader`](avistreamheader.md)

## Methods

### parseItem

▸ `Protected` **parseItem**(`id`, `data`, `start`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `data` | [`ByteVector`](bytevector.md) |
| `start` | `number` |

#### Returns

`void`

#### Overrides

[AviStream](avistream.md).[parseItem](avistream.md#parseitem)

___

### parseStreamList

▸ `Static` **parseStreamList**(`data`): [`AviStream`](avistream.md)

Parses a raw AVI stream list and returns the stream information

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`ByteVector`](bytevector.md) |

#### Returns

[`AviStream`](avistream.md)

#### Inherited from

[AviStream](avistream.md).[parseStreamList](avistream.md#parsestreamlist)
