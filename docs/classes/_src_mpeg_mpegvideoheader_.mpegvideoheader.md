**[node-taglib-sharp](../README.md)**

> [Globals](../globals.md) / ["src/mpeg/mpegVideoHeader"](../modules/_src_mpeg_mpegvideoheader_.md) / MpegVideoHeader

# Class: MpegVideoHeader

Provides information about an MPEG video stream.

## Hierarchy

* **MpegVideoHeader**

## Implements

* [IVideoCodec](../interfaces/_src_icodec_.ivideocodec.md)

## Index

### Constructors

* [constructor](_src_mpeg_mpegvideoheader_.mpegvideoheader.md#constructor)

### Accessors

* [description](_src_mpeg_mpegvideoheader_.mpegvideoheader.md#description)
* [durationMilliseconds](_src_mpeg_mpegvideoheader_.mpegvideoheader.md#durationmilliseconds)
* [mediaTypes](_src_mpeg_mpegvideoheader_.mpegvideoheader.md#mediatypes)
* [videoBitrate](_src_mpeg_mpegvideoheader_.mpegvideoheader.md#videobitrate)
* [videoFrameRate](_src_mpeg_mpegvideoheader_.mpegvideoheader.md#videoframerate)
* [videoHeight](_src_mpeg_mpegvideoheader_.mpegvideoheader.md#videoheight)
* [videoWidth](_src_mpeg_mpegvideoheader_.mpegvideoheader.md#videowidth)

## Constructors

### constructor

\+ **new MpegVideoHeader**(`file`: [File](_src_file_.file.md), `position`: number): [MpegVideoHeader](_src_mpeg_mpegvideoheader_.mpegvideoheader.md)

Constructs and initializes a new instance of [MpegVideoHeader](_src_mpeg_mpegvideoheader_.mpegvideoheader.md) by reading it from a
specified location in a specified file.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`file` | [File](_src_file_.file.md) | File to read the header from |
`position` | number | Position in `file` at which the header begins  |

**Returns:** [MpegVideoHeader](_src_mpeg_mpegvideoheader_.mpegvideoheader.md)

## Accessors

### description

• get **description**(): string

Gets a text description of the media represented by the current instance.

**`inheritdoc`** 

**Returns:** string

___

### durationMilliseconds

• get **durationMilliseconds**(): number

Duration of the media in milliseconds represented by the current instance.

**`inheritdoc`** 
For MPEG, this is always 0

**`todo:`** Can we calculate the duration?

**Returns:** number

___

### mediaTypes

• get **mediaTypes**(): [MediaTypes](../enums/_src_icodec_.mediatypes.md)

Types of media represented by the current instance, bitwise combined.

**`inheritdoc`** 

**Returns:** [MediaTypes](../enums/_src_icodec_.mediatypes.md)

___

### videoBitrate

• get **videoBitrate**(): number

**`inheritdoc`** 

**Returns:** number

___

### videoFrameRate

• get **videoFrameRate**(): number

**`inheritdoc`** 

**Returns:** number

___

### videoHeight

• get **videoHeight**(): number

Height of the video in pixels represented by the current instance.

**`inheritdoc`** 

**Returns:** number

___

### videoWidth

• get **videoWidth**(): number

Width of the video in pixels represented by the current instance.

**`inheritdoc`** 

**Returns:** number
