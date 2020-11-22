**[node-taglib-sharp](../README.md)**

> [Globals](../globals.md) / ["src/mpeg/xingHeader"](../modules/_src_mpeg_xingheader_.md) / XingHeader

# Class: XingHeader

Information about a variable bitrate MPEG audio stream

## Hierarchy

* **XingHeader**

## Index

### Properties

* [fileIdentifier](_src_mpeg_xingheader_.xingheader.md#fileidentifier)
* [unknown](_src_mpeg_xingheader_.xingheader.md#unknown)

### Accessors

* [isPresent](_src_mpeg_xingheader_.xingheader.md#ispresent)
* [totalFrames](_src_mpeg_xingheader_.xingheader.md#totalframes)
* [totalSize](_src_mpeg_xingheader_.xingheader.md#totalsize)

### Methods

* [fromData](_src_mpeg_xingheader_.xingheader.md#fromdata)
* [fromInfo](_src_mpeg_xingheader_.xingheader.md#frominfo)
* [xingHeaderOffset](_src_mpeg_xingheader_.xingheader.md#xingheaderoffset)

## Properties

### fileIdentifier

▪ `Static` `Readonly` **fileIdentifier**: [ByteVector](_src_bytevector_.bytevector.md) = ByteVector.fromString("Xing", undefined, undefined, true)

Identifier that appears in a file to indicate the start of a Xing header.

___

### unknown

▪ `Static` `Readonly` **unknown**: [XingHeader](_src_mpeg_xingheader_.xingheader.md) = XingHeader.fromInfo(0, 0)

An empty an unset Xing header

## Accessors

### isPresent

• get **isPresent**(): boolean

Whether or not a physical VBRI header is present in the file.

**Returns:** boolean

___

### totalFrames

• get **totalFrames**(): number

Gets the total number of frames in the file, as indicated by the current instance.

**Returns:** number

___

### totalSize

• get **totalSize**(): number

Gets the total size of the file, as indicated by the current instance.

**Returns:** number

## Methods

### fromData

▸ `Static`**fromData**(`data`: [ByteVector](_src_bytevector_.bytevector.md)): [XingHeader](_src_mpeg_xingheader_.xingheader.md)

Constructs a new instance by reading its raw contents.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | Raw data of the Xing header  |

**Returns:** [XingHeader](_src_mpeg_xingheader_.xingheader.md)

___

### fromInfo

▸ `Static`**fromInfo**(`frames`: number, `size`: number): [XingHeader](_src_mpeg_xingheader_.xingheader.md)

Constructs a new instance with a specified frame count and size.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`frames` | number | Frame count of the audio |
`size` | number | Stream size of the audio  |

**Returns:** [XingHeader](_src_mpeg_xingheader_.xingheader.md)

___

### xingHeaderOffset

▸ `Static`**xingHeaderOffset**(`version`: [MpegVersion](../enums/_src_mpeg_mpegenums_.mpegversion.md), `channelModel`: [ChannelMode](../enums/_src_mpeg_mpegenums_.channelmode.md)): number

Gets the offset at which a Xing header would appear in an MPEG audio packet based on the
version and channel mode.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`version` | [MpegVersion](../enums/_src_mpeg_mpegenums_.mpegversion.md) | Version of the MPEG audio packet |
`channelModel` | [ChannelMode](../enums/_src_mpeg_mpegenums_.channelmode.md) | Channel mode of the MPEG audio packet |

**Returns:** number

Offset into an MPEG audio packet where the Xing header would appear.
