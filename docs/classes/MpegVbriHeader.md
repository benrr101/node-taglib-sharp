[node-taglib-sharp](../README.md) / [Exports](../modules.md) / MpegVbriHeader

# Class: MpegVbriHeader

Information about a variable bitrate MPEG audio stream encoded by the Fraunhofer encoder

## Table of contents

### Properties

- [FILE\_IDENTIFIER](MpegVbriHeader.md#file_identifier)
- [UNKNOWN](MpegVbriHeader.md#unknown)
- [VBRI\_HEADER\_OFFSET](MpegVbriHeader.md#vbri_header_offset)

### Accessors

- [isPresent](MpegVbriHeader.md#ispresent)
- [totalFrames](MpegVbriHeader.md#totalframes)
- [totalSize](MpegVbriHeader.md#totalsize)

### Methods

- [fromData](MpegVbriHeader.md#fromdata)
- [fromInfo](MpegVbriHeader.md#frominfo)

## Properties

### FILE\_IDENTIFIER

▪ `Static` `Readonly` **FILE\_IDENTIFIER**: [`ByteVector`](ByteVector.md)

Identifier that appears in the file to indicate the start of the VBRI header.

___

### UNKNOWN

▪ `Static` `Readonly` **UNKNOWN**: [`MpegVbriHeader`](MpegVbriHeader.md)

An empty and unset VBRI header.

___

### VBRI\_HEADER\_OFFSET

▪ `Static` `Readonly` **VBRI\_HEADER\_OFFSET**: ``36``

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

▸ `Static` **fromData**(`data`): [`MpegVbriHeader`](MpegVbriHeader.md)

Constructs a new instance from the raw data of the header.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](ByteVector.md) | Data to read the VBRI header from |

#### Returns

[`MpegVbriHeader`](MpegVbriHeader.md)

___

### fromInfo

▸ `Static` **fromInfo**(`frames`, `size`): [`MpegVbriHeader`](MpegVbriHeader.md)

Constructs a new instance with a specified frame count and size.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `frames` | `number` | Frame count of the audio |
| `size` | `number` | Stream size of the audio |

#### Returns

[`MpegVbriHeader`](MpegVbriHeader.md)
