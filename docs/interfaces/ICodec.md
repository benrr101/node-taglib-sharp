[node-taglib-sharp](../README.md) / [Exports](../modules.md) / ICodec

# Interface: ICodec

Interface that provides basic information common to all media codecs

## Hierarchy

- **`ICodec`**

  ↳ [`IAudioCodec`](IAudioCodec.md)

  ↳ [`IVideoCodec`](IVideoCodec.md)

  ↳ [`IPhotoCodec`](IPhotoCodec.md)

  ↳ [`IOggCodec`](IOggCodec.md)

## Table of contents

### Properties

- [description](ICodec.md#description)
- [durationMilliseconds](ICodec.md#durationmilliseconds)
- [mediaTypes](ICodec.md#mediatypes)

## Properties

### description

• **description**: `string`

Gets a text description of the media represented by the current instance.

___

### durationMilliseconds

• **durationMilliseconds**: `number`

Duration of the media in milliseconds represented by the current instance.

**`TODO`**

Ensure milliseconds is the right way to interpret this field

___

### mediaTypes

• **mediaTypes**: [`MediaTypes`](../enums/MediaTypes.md)

Types of media represented by the current instance, bitwise combined.
