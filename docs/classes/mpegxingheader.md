[node-taglib-sharp](../README.md) / [Exports](../modules.md) / MpegXingHeader

# Class: MpegXingHeader

Information about a variable bitrate MPEG audio stream

## Table of contents

### Properties

- [fileIdentifier](mpegxingheader.md#fileidentifier)
- [unknown](mpegxingheader.md#unknown)

### Accessors

- [isPresent](mpegxingheader.md#ispresent)
- [totalFrames](mpegxingheader.md#totalframes)
- [totalSize](mpegxingheader.md#totalsize)

### Methods

- [fromData](mpegxingheader.md#fromdata)
- [fromInfo](mpegxingheader.md#frominfo)
- [xingHeaderOffset](mpegxingheader.md#xingheaderoffset)

## Properties

### fileIdentifier

▪ `Static` `Readonly` **fileIdentifier**: [`ByteVector`](bytevector.md)

Identifier that appears in a file to indicate the start of a Xing header.

___

### unknown

▪ `Static` `Readonly` **unknown**: [`MpegXingHeader`](mpegxingheader.md)

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

▸ `Static` **fromData**(`data`): [`MpegXingHeader`](mpegxingheader.md)

Constructs a new instance by reading its raw contents.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](bytevector.md) | Raw data of the Xing header |

#### Returns

[`MpegXingHeader`](mpegxingheader.md)

___

### fromInfo

▸ `Static` **fromInfo**(`frames`, `size`): [`MpegXingHeader`](mpegxingheader.md)

Constructs a new instance with a specified frame count and size.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `frames` | `number` | Frame count of the audio |
| `size` | `number` | Stream size of the audio |

#### Returns

[`MpegXingHeader`](mpegxingheader.md)

___

### xingHeaderOffset

▸ `Static` **xingHeaderOffset**(`version`, `channelModel`): `number`

Gets the offset at which a Xing header would appear in an MPEG audio packet based on the
version and channel mode.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `version` | [`MpegVersion`](../enums/mpegversion.md) | Version of the MPEG audio packet |
| `channelModel` | [`MpegAudioChannelMode`](../enums/mpegaudiochannelmode.md) | Channel mode of the MPEG audio packet |

#### Returns

`number`

Offset into an MPEG audio packet where the Xing header would appear.
