**[node-taglib-sharp](../README.md)**

> [Globals](../globals.md) / ["src/mpeg/vbriHeader"](../modules/_src_mpeg_vbriheader_.md) / VbriHeader

# Class: VbriHeader

Information about a variable bitrate MPEG audio stream encoded by the Fraunhofer encoder

## Hierarchy

* **VbriHeader**

## Index

### Properties

* [fileIdentifier](_src_mpeg_vbriheader_.vbriheader.md#fileidentifier)
* [unknown](_src_mpeg_vbriheader_.vbriheader.md#unknown)
* [vbriHeaderOffset](_src_mpeg_vbriheader_.vbriheader.md#vbriheaderoffset)

### Accessors

* [isPresent](_src_mpeg_vbriheader_.vbriheader.md#ispresent)
* [totalFrames](_src_mpeg_vbriheader_.vbriheader.md#totalframes)
* [totalSize](_src_mpeg_vbriheader_.vbriheader.md#totalsize)

### Methods

* [fromData](_src_mpeg_vbriheader_.vbriheader.md#fromdata)
* [fromInfo](_src_mpeg_vbriheader_.vbriheader.md#frominfo)

## Properties

### fileIdentifier

▪ `Static` `Readonly` **fileIdentifier**: [ByteVector](_src_bytevector_.bytevector.md) = ByteVector.fromString("VBRI", undefined, undefined, true)

Identifier that appears in the file to indicate the start of the VBRI header.

___

### unknown

▪ `Static` `Readonly` **unknown**: [VbriHeader](_src_mpeg_vbriheader_.vbriheader.md) = VbriHeader.fromInfo(0, 0)

An empty and unset VBRI header.

___

### vbriHeaderOffset

▪ `Static` `Readonly` **vbriHeaderOffset**: 36 = 36

Offset at which a VBRI header would appear in an MPEG audio packet. Always 32 bytes after
the end of the first MPEG header.

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

▸ `Static`**fromData**(`data`: [ByteVector](_src_bytevector_.bytevector.md)): [VbriHeader](_src_mpeg_vbriheader_.vbriheader.md)

Constructs a new instance from the raw data of the header.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | Data to read the VBRI header from  |

**Returns:** [VbriHeader](_src_mpeg_vbriheader_.vbriheader.md)

___

### fromInfo

▸ `Static`**fromInfo**(`frames`: number, `size`: number): [VbriHeader](_src_mpeg_vbriheader_.vbriheader.md)

Constructs a new instance with a specified frame count and size.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`frames` | number | Frame count of the audio |
`size` | number | Stream size of the audio  |

**Returns:** [VbriHeader](_src_mpeg_vbriheader_.vbriheader.md)
