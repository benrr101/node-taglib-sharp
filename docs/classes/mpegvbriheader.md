[node-taglib-sharp](../README.md) / [Exports](../modules.md) / MpegVbriHeader

# Class: MpegVbriHeader

Information about a variable bitrate MPEG audio stream encoded by the Fraunhofer encoder

## Table of contents

### Properties

- [fileIdentifier](mpegvbriheader.md#fileidentifier)
- [unknown](mpegvbriheader.md#unknown)
- [vbriHeaderOffset](mpegvbriheader.md#vbriheaderoffset)

### Accessors

- [isPresent](mpegvbriheader.md#ispresent)
- [totalFrames](mpegvbriheader.md#totalframes)
- [totalSize](mpegvbriheader.md#totalsize)

### Methods

- [fromData](mpegvbriheader.md#fromdata)
- [fromInfo](mpegvbriheader.md#frominfo)

## Properties

### fileIdentifier

▪ `Static` `Readonly` **fileIdentifier**: [`ByteVector`](bytevector.md)

Identifier that appears in the file to indicate the start of the VBRI header.

___

### unknown

▪ `Static` `Readonly` **unknown**: [`MpegVbriHeader`](mpegvbriheader.md)

An empty and unset VBRI header.

___

### vbriHeaderOffset

▪ `Static` `Readonly` **vbriHeaderOffset**: ``36``

Offset at which a VBRI header would appear in an MPEG audio packet. Always 32 bytes after
the end of the first MPEG header.

## Accessors

### isPresent

• `get` **isPresent**(): `boolean`

Whether or not a physical VBRI header is present in the file.

#### Returns

`boolean`

___

### totalFrames

• `get` **totalFrames**(): `number`

Gets the total number of frames in the file, as indicated by the current instance.

#### Returns

`number`

___

### totalSize

• `get` **totalSize**(): `number`

Gets the total size of the file, as indicated by the current instance.

#### Returns

`number`

## Methods

### fromData

▸ `Static` **fromData**(`data`): [`MpegVbriHeader`](mpegvbriheader.md)

Constructs a new instance from the raw data of the header.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](bytevector.md) | Data to read the VBRI header from |

#### Returns

[`MpegVbriHeader`](mpegvbriheader.md)

___

### fromInfo

▸ `Static` **fromInfo**(`frames`, `size`): [`MpegVbriHeader`](mpegvbriheader.md)

Constructs a new instance with a specified frame count and size.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `frames` | `number` | Frame count of the audio |
| `size` | `number` | Stream size of the audio |

#### Returns

[`MpegVbriHeader`](mpegvbriheader.md)
