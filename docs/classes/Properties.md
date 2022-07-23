[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Properties

# Class: Properties

## Implements

- [`ILosslessAudioCodec`](../interfaces/ILosslessAudioCodec.md)
- [`IVideoCodec`](../interfaces/IVideoCodec.md)
- [`IPhotoCodec`](../interfaces/IPhotoCodec.md)

## Table of contents

### Constructors

- [constructor](Properties.md#constructor)

### Accessors

- [audioBitrate](Properties.md#audiobitrate)
- [audioChannels](Properties.md#audiochannels)
- [audioSampleRate](Properties.md#audiosamplerate)
- [bitsPerSample](Properties.md#bitspersample)
- [codecs](Properties.md#codecs)
- [description](Properties.md#description)
- [durationMilliseconds](Properties.md#durationmilliseconds)
- [mediaTypes](Properties.md#mediatypes)
- [photoHeight](Properties.md#photoheight)
- [photoQuality](Properties.md#photoquality)
- [photoWidth](Properties.md#photowidth)
- [videoHeight](Properties.md#videoheight)
- [videoWidth](Properties.md#videowidth)

## Constructors

### constructor

• **new Properties**(`durationMilli?`, `codecs?`)

Constructs and initializes a new instance of [Properties](Properties.md) with the specified codecs and
duration.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `durationMilli` | `number` | `0` | Duration of the media in milliseconds or 0 if the duration is to be        read from the codecs. |
| `codecs` | [`ICodec`](../interfaces/ICodec.md)[] | `[]` | Array of codecs to be used in the new instance. |

## Accessors

### audioBitrate

• `get` **audioBitrate**(): `number`

Gets the bitrate of the audio represented by the current instance. This value is equal to
the first non-zero audio bitrate, or zero if no codecs with audio information were found.

#### Returns

`number`

#### Implementation of

[ILosslessAudioCodec](../interfaces/ILosslessAudioCodec.md).[audioBitrate](../interfaces/ILosslessAudioCodec.md#audiobitrate)

___

### audioChannels

• `get` **audioChannels**(): `number`

Gets the number of channels in the audio represented by the current instance.

#### Returns

`number`

#### Implementation of

[ILosslessAudioCodec](../interfaces/ILosslessAudioCodec.md).[audioChannels](../interfaces/ILosslessAudioCodec.md#audiochannels)

___

### audioSampleRate

• `get` **audioSampleRate**(): `number`

Gets the sample rate of the audio represented by the current instance. This value is equal
to the first non-zero audio bitrate, or zero if no audio codecs were found.

#### Returns

`number`

#### Implementation of

[ILosslessAudioCodec](../interfaces/ILosslessAudioCodec.md).[audioSampleRate](../interfaces/ILosslessAudioCodec.md#audiosamplerate)

___

### bitsPerSample

• `get` **bitsPerSample**(): `number`

Gets the number of bits per sample in the audio represented by the current instance. This
value is equal to the first non-zero quantization, or zero if no lossless audio codecs were
found in the current instance.

#### Returns

`number`

#### Implementation of

[ILosslessAudioCodec](../interfaces/ILosslessAudioCodec.md).[bitsPerSample](../interfaces/ILosslessAudioCodec.md#bitspersample)

___

### codecs

• `get` **codecs**(): [`ICodec`](../interfaces/ICodec.md)[]

Gets the codecs contained in the current instance.

**`remarks`** The list of codecs should not be modified. As such, the returned codec list is a
    copy of codec list stored in this instance.

#### Returns

[`ICodec`](../interfaces/ICodec.md)[]

___

### description

• `get` **description**(): `string`

Gets a string description of the media represented by the current instance. Values are
joined by semi-colons.

#### Returns

`string`

#### Implementation of

[IPhotoCodec](../interfaces/IPhotoCodec.md).[description](../interfaces/IPhotoCodec.md#description)

___

### durationMilliseconds

• `get` **durationMilliseconds**(): `number`

Gets the duration of the media represented by the current instance. If the value was set in
the constructor, that value is returned, otherwise the longest codec duration is used.

#### Returns

`number`

#### Implementation of

[IPhotoCodec](../interfaces/IPhotoCodec.md).[durationMilliseconds](../interfaces/IPhotoCodec.md#durationmilliseconds)

___

### mediaTypes

• `get` **mediaTypes**(): [`MediaTypes`](../enums/MediaTypes.md)

Gets the types of media represented by the current instance.

#### Returns

[`MediaTypes`](../enums/MediaTypes.md)

#### Implementation of

[IPhotoCodec](../interfaces/IPhotoCodec.md).[mediaTypes](../interfaces/IPhotoCodec.md#mediatypes)

___

### photoHeight

• `get` **photoHeight**(): `number`

Gets the height of the photo in pixels represented by the current instance.

#### Returns

`number`

#### Implementation of

[IPhotoCodec](../interfaces/IPhotoCodec.md).[photoHeight](../interfaces/IPhotoCodec.md#photoheight)

___

### photoQuality

• `get` **photoQuality**(): `number`

Gets the format-specific quality identifier of the photo represented by the current
instance. A value of `0` means that there was no quality indicator for the format or file.

#### Returns

`number`

#### Implementation of

[IPhotoCodec](../interfaces/IPhotoCodec.md).[photoQuality](../interfaces/IPhotoCodec.md#photoquality)

___

### photoWidth

• `get` **photoWidth**(): `number`

Gets the width of the photo in pixels represented by the current instance.

#### Returns

`number`

#### Implementation of

[IPhotoCodec](../interfaces/IPhotoCodec.md).[photoWidth](../interfaces/IPhotoCodec.md#photowidth)

___

### videoHeight

• `get` **videoHeight**(): `number`

Gets the height of the video represented by the current instance.
This value is equal to the first non-zero video height;

#### Returns

`number`

#### Implementation of

[IVideoCodec](../interfaces/IVideoCodec.md).[videoHeight](../interfaces/IVideoCodec.md#videoheight)

___

### videoWidth

• `get` **videoWidth**(): `number`

Gets the width of the video represented by the current instance.
This value is equal to the first non-zero video height.

#### Returns

`number`

#### Implementation of

[IVideoCodec](../interfaces/IVideoCodec.md).[videoWidth](../interfaces/IVideoCodec.md#videowidth)
