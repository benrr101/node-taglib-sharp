[node-taglib-sharp](../README.md) / [Exports](../modules.md) / MpegVbriHeader

# Class: MpegVbriHeader

Information about a variable bitrate MPEG audio stream encoded by the Fraunhofer encoder

## Hierarchy

* **MpegVbriHeader**

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

▪ `Readonly` `Static` **fileIdentifier**: [*ByteVector*](bytevector.md)

Identifier that appears in the file to indicate the start of the VBRI header.

___

### unknown

▪ `Readonly` `Static` **unknown**: [*MpegVbriHeader*](mpegvbriheader.md)

An empty and unset VBRI header.

___

### vbriHeaderOffset

▪ `Readonly` `Static` **vbriHeaderOffset**: *36*= 0x24

Offset at which a VBRI header would appear in an MPEG audio packet. Always 32 bytes after
the end of the first MPEG header.

## Accessors

### isPresent

• **isPresent**(): *boolean*

Whether or not a physical VBRI header is present in the file.

**Returns:** *boolean*

___

### totalFrames

• **totalFrames**(): *number*

Gets the total number of frames in the file, as indicated by the current instance.

**Returns:** *number*

___

### totalSize

• **totalSize**(): *number*

Gets the total size of the file, as indicated by the current instance.

**Returns:** *number*

## Methods

### fromData

▸ `Static`**fromData**(`data`: [*ByteVector*](bytevector.md)): [*MpegVbriHeader*](mpegvbriheader.md)

Constructs a new instance from the raw data of the header.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [*ByteVector*](bytevector.md) | Data to read the VBRI header from    |

**Returns:** [*MpegVbriHeader*](mpegvbriheader.md)

___

### fromInfo

▸ `Static`**fromInfo**(`frames`: *number*, `size`: *number*): [*MpegVbriHeader*](mpegvbriheader.md)

Constructs a new instance with a specified frame count and size.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`frames` | *number* | Frame count of the audio   |
`size` | *number* | Stream size of the audio    |

**Returns:** [*MpegVbriHeader*](mpegvbriheader.md)
