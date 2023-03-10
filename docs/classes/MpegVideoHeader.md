[node-taglib-sharp](../README.md) / [Exports](../modules.md) / MpegVideoHeader

# Class: MpegVideoHeader

Provides information about an MPEG video stream.

## Implements

- [`IVideoCodec`](../interfaces/IVideoCodec.md)

## Table of contents

### Constructors

- [constructor](MpegVideoHeader.md#constructor)

### Accessors

- [description](MpegVideoHeader.md#description)
- [durationMilliseconds](MpegVideoHeader.md#durationmilliseconds)
- [mediaTypes](MpegVideoHeader.md#mediatypes)
- [videoBitrate](MpegVideoHeader.md#videobitrate)
- [videoFrameRate](MpegVideoHeader.md#videoframerate)
- [videoHeight](MpegVideoHeader.md#videoheight)
- [videoWidth](MpegVideoHeader.md#videowidth)

## Constructors

### constructor

• **new MpegVideoHeader**(`file`, `position`)

Constructs and initializes a new instance of [MpegVideoHeader](MpegVideoHeader.md) by reading it from a
specified location in a specified file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | [`File`](File.md) | File to read the header from |
| `position` | `number` | Position in `file` at which the header begins |

## Accessors

### description

• `get` **description**(): `string`

Gets a text description of the media represented by the current instance.

#### Returns

`string`

#### Implementation of

[IVideoCodec](../interfaces/IVideoCodec.md).[description](../interfaces/IVideoCodec.md#description)

___

### durationMilliseconds

• `get` **durationMilliseconds**(): `number`

Duration of the media in milliseconds represented by the current instance.

**`Remarks`**

For MPEG, this is always 0

#### Returns

`number`

#### Implementation of

[IVideoCodec](../interfaces/IVideoCodec.md).[durationMilliseconds](../interfaces/IVideoCodec.md#durationmilliseconds)

___

### mediaTypes

• `get` **mediaTypes**(): [`MediaTypes`](../enums/MediaTypes.md)

Types of media represented by the current instance, bitwise combined.

#### Returns

[`MediaTypes`](../enums/MediaTypes.md)

#### Implementation of

[IVideoCodec](../interfaces/IVideoCodec.md).[mediaTypes](../interfaces/IVideoCodec.md#mediatypes)

___

### videoBitrate

• `get` **videoBitrate**(): `number`

**`Inherit Doc`**

#### Returns

`number`

___

### videoFrameRate

• `get` **videoFrameRate**(): `number`

**`Inherit Doc`**

#### Returns

`number`

___

### videoHeight

• `get` **videoHeight**(): `number`

Height of the video in pixels represented by the current instance.

#### Returns

`number`

#### Implementation of

[IVideoCodec](../interfaces/IVideoCodec.md).[videoHeight](../interfaces/IVideoCodec.md#videoheight)

___

### videoWidth

• `get` **videoWidth**(): `number`

Width of the video in pixels represented by the current instance.

#### Returns

`number`

#### Implementation of

[IVideoCodec](../interfaces/IVideoCodec.md).[videoWidth](../interfaces/IVideoCodec.md#videowidth)
