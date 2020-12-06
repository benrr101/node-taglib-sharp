**[node-taglib-sharp](../README.md)**

> [Globals](../globals.md) / ["src/aac/aacAudioHeader"](../modules/_src_aac_aacaudioheader_.md) / AacAudioHeader

# Class: AacAudioHeader

This structure implements [IAudioCodec](../interfaces/_src_icodec_.iaudiocodec.md) and provides information about an ADTS AAC audio
stream. NOTE: This header type should not be used for MPEG-4 encapsulated audio files.

## Hierarchy

* **AacAudioHeader**

## Implements

* [IAudioCodec](../interfaces/_src_icodec_.iaudiocodec.md)

## Index

### Constructors

* [constructor](_src_aac_aacaudioheader_.aacaudioheader.md#constructor)

### Properties

* [unknown](_src_aac_aacaudioheader_.aacaudioheader.md#unknown)

### Accessors

* [audioBitrate](_src_aac_aacaudioheader_.aacaudioheader.md#audiobitrate)
* [audioChannels](_src_aac_aacaudioheader_.aacaudioheader.md#audiochannels)
* [audioSampleRate](_src_aac_aacaudioheader_.aacaudioheader.md#audiosamplerate)
* [description](_src_aac_aacaudioheader_.aacaudioheader.md#description)
* [durationMilliseconds](_src_aac_aacaudioheader_.aacaudioheader.md#durationmilliseconds)
* [mediaTypes](_src_aac_aacaudioheader_.aacaudioheader.md#mediatypes)
* [streamLength](_src_aac_aacaudioheader_.aacaudioheader.md#streamlength)

### Methods

* [find](_src_aac_aacaudioheader_.aacaudioheader.md#find)

## Constructors

### constructor

\+ **new AacAudioHeader**(`channels`: number, `bitrate`: number, `sampleRate`: number, `mpegAudioType`: number): [AacAudioHeader](_src_aac_aacaudioheader_.aacaudioheader.md)

Constructs and initializes a new instance of [AacAudioHeader](_src_aac_aacaudioheader_.aacaudioheader.md) by populating it with the
specified values.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`channels` | number | Number of channels in the audio stream |
`bitrate` | number | Bitrate of the audio stream |
`sampleRate` | number | Sample rate of the audio stream |
`mpegAudioType` | number | ID of the MPEG-4 audio type  |

**Returns:** [AacAudioHeader](_src_aac_aacaudioheader_.aacaudioheader.md)

## Properties

### unknown

▪ `Static` `Readonly` **unknown**: [AacAudioHeader](_src_aac_aacaudioheader_.aacaudioheader.md) = new AacAudioHeader(0, 0, 0, 0)

An empty an unset header

## Accessors

### audioBitrate

• get **audioBitrate**(): number

Bitrate of the audio in kilibits per second represented by the current instance.

**`inheritdoc`** 

**Returns:** number

___

### audioChannels

• get **audioChannels**(): number

Number of channels in the audio represented by the current instance.

**`inheritdoc`** 

**Returns:** number

___

### audioSampleRate

• get **audioSampleRate**(): number

Sample rate of the audio represented by the current instance.

**`inheritdoc`** 

**Returns:** number

___

### description

• get **description**(): string

Gets a text description of the media represented by the current instance.

**`inheritdoc`** 

**Returns:** string

___

### durationMilliseconds

• get **durationMilliseconds**(): number

Duration of the media in milliseconds represented by the current instance.

**`inheritdoc`** 

**`remarks`** Until the stream length has been set ([streamLength](_src_aac_aacaudioheader_.aacaudioheader.md#streamlength)), this will return
    `undefined`.

**Returns:** number

___

### mediaTypes

• get **mediaTypes**(): [MediaTypes](../enums/_src_icodec_.mediatypes.md)

Types of media represented by the current instance, bitwise combined.

**`inheritdoc`** 

**Returns:** [MediaTypes](../enums/_src_icodec_.mediatypes.md)

___

### streamLength

• set **streamLength**(`value`: number): void

Sets the length of the audio stream represented by the current instance.

**`desc`** Until this value has been set, [durationMilliseconds](_src_aac_aacaudioheader_.aacaudioheader.md#durationmilliseconds) will return an incorrect
    value.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | number | Length in bytes of the audio stream represented by the current instance  |

**Returns:** void

## Methods

### find

▸ `Static`**find**(`file`: [File](_src_file_.file.md), `position`: number, `length?`: number): [AacAudioHeader](_src_aac_aacaudioheader_.aacaudioheader.md)

Searches for an audio header in a [File](_src_file_.file.md) starting at a specified position and
searching through a specified number of bytes.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`file` | [File](_src_file_.file.md) | File to search |
`position` | number | Seek position in `file` in which to start searching |
`length?` | number | maximum number of bytes to search before aborting. Omit to search entire file |

**Returns:** [AacAudioHeader](_src_aac_aacaudioheader_.aacaudioheader.md)

AacAudioHeader Header found or `undefined` if a header could not be found
