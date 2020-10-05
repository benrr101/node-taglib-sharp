**node-taglib-sharp**

> [README](../README.md) / [Globals](../globals.md) / ["src/iCodec"](../modules/_src_icodec_.md) / IVideoCodec

# Interface: IVideoCodec

Interface that inherits the common codec information and adds video-specific information.
When dealing with an {@see ICodec}, if {@see ICodec.mediaTypes} contains
{@see MediaTypes.Video}, it is safe to assume that the object also inherits {@see IVideoCodec}
and can be recast without issue.

## Hierarchy

* [ICodec](_src_icodec_.icodec.md)

  ↳ **IVideoCodec**

## Implemented by

* [Properties](../classes/_src_properties_.properties.md)

## Index

### Properties

* [description](_src_icodec_.ivideocodec.md#description)
* [durationMilliseconds](_src_icodec_.ivideocodec.md#durationmilliseconds)
* [mediaTypes](_src_icodec_.ivideocodec.md#mediatypes)
* [videoHeight](_src_icodec_.ivideocodec.md#videoheight)
* [videoWidth](_src_icodec_.ivideocodec.md#videowidth)

## Properties

### description

•  **description**: string

*Inherited from [ICodec](_src_icodec_.icodec.md).[description](_src_icodec_.icodec.md#description)*

*Defined in src/iCodec.ts:44*

Gets a text description of the media represented by the current instance.

___

### durationMilliseconds

•  **durationMilliseconds**: number

*Inherited from [ICodec](_src_icodec_.icodec.md).[durationMilliseconds](_src_icodec_.icodec.md#durationmilliseconds)*

*Defined in src/iCodec.ts:50*

Duration of the media in milliseconds represented by the current instance.

**`todo`** Ensure milliseconds is the right way to interpret this field

___

### mediaTypes

•  **mediaTypes**: [MediaTypes](../enums/_src_icodec_.mediatypes.md)

*Inherited from [ICodec](_src_icodec_.icodec.md).[mediaTypes](_src_icodec_.icodec.md#mediatypes)*

*Defined in src/iCodec.ts:55*

Types of media represented by the current instance, bitwise combined.

___

### videoHeight

•  **videoHeight**: number

*Defined in src/iCodec.ts:104*

Height of the video in pixels represented by the current instance.

___

### videoWidth

•  **videoWidth**: number

*Defined in src/iCodec.ts:109*

Width of the video in pixels represented by the current instance.
