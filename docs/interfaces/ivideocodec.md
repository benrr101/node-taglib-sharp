[node-taglib-sharp](../README.md) / [Exports](../modules.md) / IVideoCodec

# Interface: IVideoCodec

Interface that inherits the common codec information and adds video-specific information.
When dealing with an [ICodec](icodec.md), if [ICodec.mediaTypes](icodec.md#mediatypes) contains
[MediaTypes.Video](../enums/mediatypes.md#video), it is safe to assume that the object also inherits [IVideoCodec](ivideocodec.md)
and can be recast without issue.

## Hierarchy

* [*ICodec*](icodec.md)

  ↳ **IVideoCodec**

## Implemented by

* [*MpegVideoHeader*](../classes/mpegvideoheader.md)
* [*Properties*](../classes/properties.md)

## Table of contents

### Properties

- [description](ivideocodec.md#description)
- [durationMilliseconds](ivideocodec.md#durationmilliseconds)
- [mediaTypes](ivideocodec.md#mediatypes)
- [videoHeight](ivideocodec.md#videoheight)
- [videoWidth](ivideocodec.md#videowidth)

## Properties

### description

• **description**: *string*

Gets a text description of the media represented by the current instance.

Inherited from: [ICodec](icodec.md).[description](icodec.md#description)

___

### durationMilliseconds

• **durationMilliseconds**: *number*

Duration of the media in milliseconds represented by the current instance.

**`todo`** Ensure milliseconds is the right way to interpret this field

Inherited from: [ICodec](icodec.md).[durationMilliseconds](icodec.md#durationmilliseconds)

___

### mediaTypes

• **mediaTypes**: [*MediaTypes*](../enums/mediatypes.md)

Types of media represented by the current instance, bitwise combined.

Inherited from: [ICodec](icodec.md).[mediaTypes](icodec.md#mediatypes)

___

### videoHeight

• **videoHeight**: *number*

Height of the video in pixels represented by the current instance.

___

### videoWidth

• **videoWidth**: *number*

Width of the video in pixels represented by the current instance.
