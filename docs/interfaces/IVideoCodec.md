[node-taglib-sharp](../README.md) / [Exports](../modules.md) / IVideoCodec

# Interface: IVideoCodec

Interface that inherits the common codec information and adds video-specific information.
When dealing with an [ICodec](ICodec.md), if [mediaTypes](ICodec.md#mediatypes) contains
[Video](../enums/MediaTypes.md#video), it is safe to assume that the object also inherits [IVideoCodec](IVideoCodec.md)
and can be recast without issue.

## Hierarchy

- [`ICodec`](ICodec.md)

  ↳ **`IVideoCodec`**

## Implemented by

- [`Mpeg4IsoVisualSampleEntry`](../classes/Mpeg4IsoVisualSampleEntry.md)
- [`MpegVideoHeader`](../classes/MpegVideoHeader.md)
- [`OggTheoraCodec`](../classes/OggTheoraCodec.md)
- [`Properties`](../classes/Properties.md)
- [`RiffBitmapInfoHeader`](../classes/RiffBitmapInfoHeader.md)

## Table of contents

### Properties

- [description](IVideoCodec.md#description)
- [durationMilliseconds](IVideoCodec.md#durationmilliseconds)
- [mediaTypes](IVideoCodec.md#mediatypes)
- [videoHeight](IVideoCodec.md#videoheight)
- [videoWidth](IVideoCodec.md#videowidth)

## Properties

### description

• **description**: `string`

Gets a text description of the media represented by the current instance.

#### Inherited from

[ICodec](ICodec.md).[description](ICodec.md#description)

___

### durationMilliseconds

• **durationMilliseconds**: `number`

Duration of the media in milliseconds represented by the current instance.

**`TODO`**

Ensure milliseconds is the right way to interpret this field

#### Inherited from

[ICodec](ICodec.md).[durationMilliseconds](ICodec.md#durationmilliseconds)

___

### mediaTypes

• **mediaTypes**: [`MediaTypes`](../enums/MediaTypes.md)

Types of media represented by the current instance, bitwise combined.

#### Inherited from

[ICodec](ICodec.md).[mediaTypes](ICodec.md#mediatypes)

___

### videoHeight

• **videoHeight**: `number`

Height of the video in pixels represented by the current instance.

___

### videoWidth

• **videoWidth**: `number`

Width of the video in pixels represented by the current instance.
