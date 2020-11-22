**[node-taglib-sharp](../README.md)**

> [Globals](../globals.md) / ["src/iCodec"](../modules/_src_icodec_.md) / IPhotoCodec

# Interface: IPhotoCodec

Interface that inherits the common codec information and adds photo-specific information.
When dealing with an [ICodec](_src_icodec_.icodec.md), if [ICodec.mediaTypes](_src_icodec_.icodec.md#mediatypes) contains
[MediaTypes.Photo](../enums/_src_icodec_.mediatypes.md#photo), it is safe to assume that the object also inherits [IPhotoCodec](_src_icodec_.iphotocodec.md)
and can be recast without issue.

## Hierarchy

* [ICodec](_src_icodec_.icodec.md)

  ↳ **IPhotoCodec**

## Implemented by

* [Properties](../classes/_src_properties_.properties.md)

## Index

### Properties

* [description](_src_icodec_.iphotocodec.md#description)
* [durationMilliseconds](_src_icodec_.iphotocodec.md#durationmilliseconds)
* [mediaTypes](_src_icodec_.iphotocodec.md#mediatypes)
* [photoHeight](_src_icodec_.iphotocodec.md#photoheight)
* [photoQuality](_src_icodec_.iphotocodec.md#photoquality)
* [photoWidth](_src_icodec_.iphotocodec.md#photowidth)

## Properties

### description

•  **description**: string

*Inherited from [ICodec](_src_icodec_.icodec.md).[description](_src_icodec_.icodec.md#description)*

Gets a text description of the media represented by the current instance.

___

### durationMilliseconds

•  **durationMilliseconds**: number

*Inherited from [ICodec](_src_icodec_.icodec.md).[durationMilliseconds](_src_icodec_.icodec.md#durationmilliseconds)*

Duration of the media in milliseconds represented by the current instance.

**`todo`** Ensure milliseconds is the right way to interpret this field

___

### mediaTypes

•  **mediaTypes**: [MediaTypes](../enums/_src_icodec_.mediatypes.md)

*Inherited from [ICodec](_src_icodec_.icodec.md).[mediaTypes](_src_icodec_.icodec.md#mediatypes)*

Types of media represented by the current instance, bitwise combined.

___

### photoHeight

•  **photoHeight**: number

Height of the photo in pixels represented by the current instance.

___

### photoQuality

•  **photoQuality**: number

Format-specific quality indicator of the photo represented by the current instance.
A value of `0` means there was no quality indicator for the format or file.

___

### photoWidth

•  **photoWidth**: number

Width of the photo in pixels represented by the current instance.
