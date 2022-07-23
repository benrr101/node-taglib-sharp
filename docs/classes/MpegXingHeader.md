[node-taglib-sharp](../README.md) / [Exports](../modules.md) / MpegXingHeader

# Class: MpegXingHeader

Information about a variable bitrate MPEG audio stream

## Table of contents

### Properties

- [FILE\_IDENTIFIER](MpegXingHeader.md#file_identifier)
- [UNKNOWN](MpegXingHeader.md#unknown)

### Accessors

- [isPresent](MpegXingHeader.md#ispresent)
- [totalFrames](MpegXingHeader.md#totalframes)
- [totalSize](MpegXingHeader.md#totalsize)

### Methods

- [fromData](MpegXingHeader.md#fromdata)
- [fromInfo](MpegXingHeader.md#frominfo)
- [xingHeaderOffset](MpegXingHeader.md#xingheaderoffset)

## Properties

### FILE\_IDENTIFIER

▪ `Static` `Readonly` **FILE\_IDENTIFIER**: [`ByteVector`](ByteVector.md)

Identifier that appears in a file to indicate the start of a Xing header.

___

### UNKNOWN

▪ `Static` `Readonly` **UNKNOWN**: [`MpegXingHeader`](MpegXingHeader.md)

An empty an unset Xing header

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

▸ `Static` **fromData**(`data`): [`MpegXingHeader`](MpegXingHeader.md)

Constructs a new instance by reading its raw contents.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](ByteVector.md) | Raw data of the Xing header |

#### Returns

[`MpegXingHeader`](MpegXingHeader.md)

___

### fromInfo

▸ `Static` **fromInfo**(`frames`, `size`): [`MpegXingHeader`](MpegXingHeader.md)

Constructs a new instance with a specified frame count and size.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `frames` | `number` | Frame count of the audio |
| `size` | `number` | Stream size of the audio |

#### Returns

[`MpegXingHeader`](MpegXingHeader.md)

___

### xingHeaderOffset

▸ `Static` **xingHeaderOffset**(`version`, `channelModel`): `number`

Gets the offset at which a Xing header would appear in an MPEG audio packet based on the
version and channel mode.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `version` | [`MpegVersion`](../enums/MpegVersion.md) | Version of the MPEG audio packet |
| `channelModel` | [`MpegAudioChannelMode`](../enums/MpegAudioChannelMode.md) | Channel mode of the MPEG audio packet |

#### Returns

`number`

Offset into an MPEG audio packet where the Xing header would appear.
