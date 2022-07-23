[node-taglib-sharp](../README.md) / [Exports](../modules.md) / IPhotoCodec

# Interface: IPhotoCodec

Interface that inherits the common codec information and adds photo-specific information.
When dealing with an [ICodec](ICodec.md), if [ICodec.mediaTypes](ICodec.md#mediatypes) contains
[MediaTypes.Photo](../enums/MediaTypes.md#photo), it is safe to assume that the object also inherits [IPhotoCodec](IPhotoCodec.md)
and can be recast without issue.

## Hierarchy

- [`ICodec`](ICodec.md)

  ↳ **`IPhotoCodec`**

## Implemented by

- [`Properties`](../classes/Properties.md)

## Table of contents

### Properties

- [description](IPhotoCodec.md#description)
- [durationMilliseconds](IPhotoCodec.md#durationmilliseconds)
- [mediaTypes](IPhotoCodec.md#mediatypes)
- [photoHeight](IPhotoCodec.md#photoheight)
- [photoQuality](IPhotoCodec.md#photoquality)
- [photoWidth](IPhotoCodec.md#photowidth)

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

**`todo`** Ensure milliseconds is the right way to interpret this field

#### Inherited from

[ICodec](ICodec.md).[durationMilliseconds](ICodec.md#durationmilliseconds)

___

### mediaTypes

• **mediaTypes**: [`MediaTypes`](../enums/MediaTypes.md)

Types of media represented by the current instance, bitwise combined.

#### Inherited from

[ICodec](ICodec.md).[mediaTypes](ICodec.md#mediatypes)

___

### photoHeight

• **photoHeight**: `number`

Height of the photo in pixels represented by the current instance.

___

### photoQuality

• **photoQuality**: `number`

Format-specific quality indicator of the photo represented by the current instance.
A value of `0` means there was no quality indicator for the format or file.

___

### photoWidth

• **photoWidth**: `number`

Width of the photo in pixels represented by the current instance.
