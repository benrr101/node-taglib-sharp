[node-taglib-sharp](../README.md) / [Exports](../modules.md) / AviVideoStream

# Class: AviVideoStream

Representation of an AVI video stream to support reading video stream data.

## Hierarchy

- [`AviStream`](avistream.md)

  ↳ **`AviVideoStream`**

## Table of contents

### Constructors

- [constructor](avivideostream.md#constructor)

### Properties

- [\_codec](avivideostream.md#_codec)
- [\_header](avivideostream.md#_header)

### Accessors

- [codec](avivideostream.md#codec)
- [header](avivideostream.md#header)

### Methods

- [parseItem](avivideostream.md#parseitem)
- [parseStreamList](avivideostream.md#parsestreamlist)

## Constructors

### constructor

• **new AviVideoStream**(`header`)

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
