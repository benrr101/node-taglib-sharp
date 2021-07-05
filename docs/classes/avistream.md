[node-taglib-sharp](../README.md) / [Exports](../modules.md) / AviStream

# Class: AviStream

Base class representing a stream in an AVI file. Provides basic support for parsing a raw AVI
stream list.

## Hierarchy

- **`AviStream`**

  ↳ [`AviAudioStream`](aviaudiostream.md)

  ↳ [`AviVideoStream`](avivideostream.md)

## Table of contents

### Constructors

- [constructor](avistream.md#constructor)

### Properties

- [\_codec](avistream.md#_codec)
- [\_header](avistream.md#_header)

### Accessors

- [codec](avistream.md#codec)
- [header](avistream.md#header)

### Methods

- [parseItem](avistream.md#parseitem)
- [parseStreamList](avistream.md#parsestreamlist)

## Constructors

### constructor

• `Protected` **new AviStream**(`header`)

Constructs and initializes a new instance with a specified stream header.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `header` | [`AviStreamHeader`](avistreamheader.md) | The stream's header |

## Properties

### \_codec

• `Protected` **\_codec**: [`ICodec`](../interfaces/icodec.md)

___

### \_header

• `Protected` `Readonly` **\_header**: [`AviStreamHeader`](avistreamheader.md)

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

▸ `Protected` `Abstract` **parseItem**(`id`, `data`, `start`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `data` | [`ByteVector`](bytevector.md) |
| `start` | `number` |

#### Returns

`void`

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
