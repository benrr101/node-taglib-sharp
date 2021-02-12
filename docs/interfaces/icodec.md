[node-taglib-sharp](../README.md) / [Exports](../modules.md) / ICodec

# Interface: ICodec

Interface that provides basic information common to all media codecs

## Hierarchy

* **ICodec**

  ↳ [*IAudioCodec*](iaudiocodec.md)

  ↳ [*IVideoCodec*](ivideocodec.md)

  ↳ [*IPhotoCodec*](iphotocodec.md)

## Table of contents

### Properties

- [description](icodec.md#description)
- [durationMilliseconds](icodec.md#durationmilliseconds)
- [mediaTypes](icodec.md#mediatypes)

## Properties

### description

• **description**: *string*

Gets a text description of the media represented by the current instance.

___

### durationMilliseconds

• **durationMilliseconds**: *number*

Duration of the media in milliseconds represented by the current instance.

**`todo`** Ensure milliseconds is the right way to interpret this field

___

### mediaTypes

• **mediaTypes**: [*MediaTypes*](../enums/mediatypes.md)

Types of media represented by the current instance, bitwise combined.
