[node-taglib-sharp](../README.md) / [Exports](../modules.md) / IPhotoCodec

# Interface: IPhotoCodec

Interface that inherits the common codec information and adds photo-specific information.
When dealing with an [ICodec](icodec.md), if [ICodec.mediaTypes](icodec.md#mediatypes) contains
[MediaTypes.Photo](../enums/mediatypes.md#photo), it is safe to assume that the object also inherits [IPhotoCodec](iphotocodec.md)
and can be recast without issue.

## Hierarchy

* [*ICodec*](icodec.md)

  ↳ **IPhotoCodec**

## Implemented by

* [*Properties*](../classes/properties.md)

## Table of contents

### Properties

- [description](iphotocodec.md#description)
- [durationMilliseconds](iphotocodec.md#durationmilliseconds)
- [mediaTypes](iphotocodec.md#mediatypes)
- [photoHeight](iphotocodec.md#photoheight)
- [photoQuality](iphotocodec.md#photoquality)
- [photoWidth](iphotocodec.md#photowidth)

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

### photoHeight

• **photoHeight**: *number*

Height of the photo in pixels represented by the current instance.

___

### photoQuality

• **photoQuality**: *number*

Format-specific quality indicator of the photo represented by the current instance.
A value of `0` means there was no quality indicator for the format or file.

___

### photoWidth

• **photoWidth**: *number*

Width of the photo in pixels represented by the current instance.
