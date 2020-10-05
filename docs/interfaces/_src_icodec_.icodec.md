**node-taglib-sharp**

> [README](../README.md) / [Globals](../globals.md) / ["src/iCodec"](../modules/_src_icodec_.md) / ICodec

# Interface: ICodec

Interface that provides basic information common to all media codecs

## Hierarchy

* **ICodec**

  ↳ [IAudioCodec](_src_icodec_.iaudiocodec.md)

  ↳ [IVideoCodec](_src_icodec_.ivideocodec.md)

  ↳ [IPhotoCodec](_src_icodec_.iphotocodec.md)

## Index

### Properties

* [description](_src_icodec_.icodec.md#description)
* [durationMilliseconds](_src_icodec_.icodec.md#durationmilliseconds)
* [mediaTypes](_src_icodec_.icodec.md#mediatypes)

## Properties

### description

•  **description**: string

*Defined in src/iCodec.ts:44*

Gets a text description of the media represented by the current instance.

___

### durationMilliseconds

•  **durationMilliseconds**: number

*Defined in src/iCodec.ts:50*

Duration of the media in milliseconds represented by the current instance.

**`todo`** Ensure milliseconds is the right way to interpret this field

___

### mediaTypes

•  **mediaTypes**: [MediaTypes](../enums/_src_icodec_.mediatypes.md)

*Defined in src/iCodec.ts:55*

Types of media represented by the current instance, bitwise combined.
