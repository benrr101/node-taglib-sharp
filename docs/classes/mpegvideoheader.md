[node-taglib-sharp](../README.md) / [Exports](../modules.md) / MpegVideoHeader

# Class: MpegVideoHeader

Provides information about an MPEG video stream.

## Hierarchy

* **MpegVideoHeader**

## Implements

* [*IVideoCodec*](../interfaces/ivideocodec.md)

## Table of contents

### Constructors

- [constructor](mpegvideoheader.md#constructor)

### Accessors

- [description](mpegvideoheader.md#description)
- [durationMilliseconds](mpegvideoheader.md#durationmilliseconds)
- [mediaTypes](mpegvideoheader.md#mediatypes)
- [videoBitrate](mpegvideoheader.md#videobitrate)
- [videoFrameRate](mpegvideoheader.md#videoframerate)
- [videoHeight](mpegvideoheader.md#videoheight)
- [videoWidth](mpegvideoheader.md#videowidth)

## Constructors

### constructor

\+ **new MpegVideoHeader**(`file`: [*File*](file.md), `position`: *number*): [*MpegVideoHeader*](mpegvideoheader.md)

Constructs and initializes a new instance of [MpegVideoHeader](mpegvideoheader.md) by reading it from a
specified location in a specified file.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`file` | [*File*](file.md) | File to read the header from   |
`position` | *number* | Position in `file` at which the header begins    |

**Returns:** [*MpegVideoHeader*](mpegvideoheader.md)

## Accessors

### description

• **description**(): *string*

Gets a text description of the media represented by the current instance.

**Returns:** *string*

Implementation of: [IVideoCodec](../interfaces/ivideocodec.md).[description](../interfaces/ivideocodec.md#description)

___

### durationMilliseconds

• **durationMilliseconds**(): *number*

Duration of the media in milliseconds represented by the current instance.

**`todo:`** Can we calculate the duration?

**Returns:** *number*

Implementation of: [IVideoCodec](../interfaces/ivideocodec.md).[durationMilliseconds](../interfaces/ivideocodec.md#durationmilliseconds)

___

### mediaTypes

• **mediaTypes**(): [*MediaTypes*](../enums/mediatypes.md)

Types of media represented by the current instance, bitwise combined.

**Returns:** [*MediaTypes*](../enums/mediatypes.md)

Implementation of: [IVideoCodec](../interfaces/ivideocodec.md).[mediaTypes](../interfaces/ivideocodec.md#mediatypes)

___

### videoBitrate

• **videoBitrate**(): *number*

**`inheritdoc`** 

**Returns:** *number*

___

### videoFrameRate

• **videoFrameRate**(): *number*

**`inheritdoc`** 

**Returns:** *number*

___

### videoHeight

• **videoHeight**(): *number*

Height of the video in pixels represented by the current instance.

**Returns:** *number*

Implementation of: [IVideoCodec](../interfaces/ivideocodec.md).[videoHeight](../interfaces/ivideocodec.md#videoheight)

___

### videoWidth

• **videoWidth**(): *number*

Width of the video in pixels represented by the current instance.

**Returns:** *number*

Implementation of: [IVideoCodec](../interfaces/ivideocodec.md).[videoWidth](../interfaces/ivideocodec.md#videowidth)
