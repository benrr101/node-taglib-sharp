**node-taglib-sharp**

> [README](../README.md) / [Globals](../globals.md) / ["src/properties"](../modules/_src_properties_.md) / Properties

# Class: Properties

## Hierarchy

* **Properties**

## Implements

* [ILosslessAudioCodec](../interfaces/_src_icodec_.ilosslessaudiocodec.md)
* [IVideoCodec](../interfaces/_src_icodec_.ivideocodec.md)
* [IPhotoCodec](../interfaces/_src_icodec_.iphotocodec.md)

## Index

### Constructors

* [constructor](_src_properties_.properties.md#constructor)

### Accessors

* [audioBitrate](_src_properties_.properties.md#audiobitrate)
* [audioChannels](_src_properties_.properties.md#audiochannels)
* [audioSampleRate](_src_properties_.properties.md#audiosamplerate)
* [bitsPerSample](_src_properties_.properties.md#bitspersample)
* [codecs](_src_properties_.properties.md#codecs)
* [description](_src_properties_.properties.md#description)
* [durationMilliseconds](_src_properties_.properties.md#durationmilliseconds)
* [mediaTypes](_src_properties_.properties.md#mediatypes)
* [photoHeight](_src_properties_.properties.md#photoheight)
* [photoQuality](_src_properties_.properties.md#photoquality)
* [photoWidth](_src_properties_.properties.md#photowidth)
* [videoHeight](_src_properties_.properties.md#videoheight)
* [videoWidth](_src_properties_.properties.md#videowidth)

## Constructors

### constructor

\+ **new Properties**(`durationMilli`: number, `codecs`: [ICodec](../interfaces/_src_icodec_.icodec.md)[]): [Properties](_src_properties_.properties.md)

*Defined in src/properties.ts:6*

Constructs and initializes a new instance of {@see Properties} with the specified codecs and
duration.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`durationMilli` | number | 0 | Duration of the media in milliseconds or 0 if the duration is to be        read from the codecs. |
`codecs` | [ICodec](../interfaces/_src_icodec_.icodec.md)[] | [] | Array of codecs to be used in the new instance.  |

**Returns:** [Properties](_src_properties_.properties.md)

## Accessors

### audioBitrate

• get **audioBitrate**(): number

*Defined in src/properties.ts:64*

Gets the bitrate of the audio represented by the current instance. This value is equal to
the first non-zero audio bitrate, or zero if no codecs with audio information were found.

**Returns:** number

___

### audioChannels

• get **audioChannels**(): number

*Defined in src/properties.ts:71*

Gets the number of channels in the audio represented by the current instance.

**Returns:** number

___

### audioSampleRate

• get **audioSampleRate**(): number

*Defined in src/properties.ts:79*

Gets the sample rate of the audio represented by the current instance. This value is equal
to the first non-zero audio bitrate, or zero if no audio codecs were found.

**Returns:** number

___

### bitsPerSample

• get **bitsPerSample**(): number

*Defined in src/properties.ts:88*

Gets the number of bits per sample in the audio represented by the current instance. This
value is equal to the first non-zero quantization, or zero if no lossless autio codecs were
found in the current instance.

**Returns:** number

___

### codecs

• get **codecs**(): [ICodec](../interfaces/_src_icodec_.icodec.md)[]

*Defined in src/properties.ts:23*

Gets the codecs contained in the current instance

**Returns:** [ICodec](../interfaces/_src_icodec_.icodec.md)[]

___

### description

• get **description**(): string

*Defined in src/properties.ts:31*

Gets a string description of the media represented by the current instance. Values are
joined by semi-colons.

**Returns:** string

___

### durationMilliseconds

• get **durationMilliseconds**(): number

*Defined in src/properties.ts:40*

Gets the duration of the media represented by the current instance. If the value was set in
the constructor, that value is returned, otherwise the longest codec duration is used.

**Returns:** number

___

### mediaTypes

• get **mediaTypes**(): [MediaTypes](../enums/_src_icodec_.mediatypes.md)

*Defined in src/properties.ts:52*

Gets the types of media represented by the current instance.

**Returns:** [MediaTypes](../enums/_src_icodec_.mediatypes.md)

___

### photoHeight

• get **photoHeight**(): number

*Defined in src/properties.ts:99*

Gets the height of the photo in pixels represented by the current instance.

**Returns:** number

___

### photoQuality

• get **photoQuality**(): number

*Defined in src/properties.ts:107*

Gets the format-specific quality identifier of the photo represented by the current
instance. A value of `0` means that there was no quality indicator for the format or file.

**Returns:** number

___

### photoWidth

• get **photoWidth**(): number

*Defined in src/properties.ts:114*

Gets the width of the photo in pixels represented by the current instance.

**Returns:** number

___

### videoHeight

• get **videoHeight**(): number

*Defined in src/properties.ts:126*

Gets the height of the video represented by the current instance.
This value is equal to the first non-zero video height;

**Returns:** number

___

### videoWidth

• get **videoWidth**(): number

*Defined in src/properties.ts:134*

Gets the width of the video represented by the current instance.
This value is equal to the first non-zero video height.

**Returns:** number
