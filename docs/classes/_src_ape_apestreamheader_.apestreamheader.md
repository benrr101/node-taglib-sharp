**[node-taglib-sharp](../README.md)**

> [Globals](../globals.md) / ["src/ape/apeStreamHeader"](../modules/_src_ape_apestreamheader_.md) / ApeStreamHeader

# Class: ApeStreamHeader

Provides support for reading Monkey's Audio APE stream properties.

## Hierarchy

* **ApeStreamHeader**

## Implements

* [IAudioCodec](../interfaces/_src_icodec_.iaudiocodec.md)
* [ILosslessAudioCodec](../interfaces/_src_icodec_.ilosslessaudiocodec.md)

## Index

### Constructors

* [constructor](_src_ape_apestreamheader_.apestreamheader.md#constructor)

### Properties

* [fileIdentifier](_src_ape_apestreamheader_.apestreamheader.md#fileidentifier)
* [size](_src_ape_apestreamheader_.apestreamheader.md#size)

### Accessors

* [audioBitrate](_src_ape_apestreamheader_.apestreamheader.md#audiobitrate)
* [audioChannels](_src_ape_apestreamheader_.apestreamheader.md#audiochannels)
* [audioSampleRate](_src_ape_apestreamheader_.apestreamheader.md#audiosamplerate)
* [bitsPerSample](_src_ape_apestreamheader_.apestreamheader.md#bitspersample)
* [compressionLevel](_src_ape_apestreamheader_.apestreamheader.md#compressionlevel)
* [description](_src_ape_apestreamheader_.apestreamheader.md#description)
* [durationMilliseconds](_src_ape_apestreamheader_.apestreamheader.md#durationmilliseconds)
* [mediaTypes](_src_ape_apestreamheader_.apestreamheader.md#mediatypes)
* [version](_src_ape_apestreamheader_.apestreamheader.md#version)

## Constructors

### constructor

\+ **new ApeStreamHeader**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `streamLength`: number): [ApeStreamHeader](_src_ape_apestreamheader_.apestreamheader.md)

Constructs and initializes a new [ApeStreamHeader](_src_ape_apestreamheader_.apestreamheader.md) from a raw header block and stream
length.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | Raw stream header data beginning with [ApeStreamHeader.fileIdentifier](_src_ape_apestreamheader_.apestreamheader.md#fileidentifier) |
`streamLength` | number | Length of the stream in bytes  |

**Returns:** [ApeStreamHeader](_src_ape_apestreamheader_.apestreamheader.md)

## Properties

### fileIdentifier

▪ `Static` `Readonly` **fileIdentifier**: [ByteVector](_src_bytevector_.bytevector.md) = ByteVector.fromString("MAC ", StringType.Latin1, undefined, true)

Identifier used to recognize a Monkey's Audio file

___

### size

▪ `Static` `Readonly` **size**: 76 = 76

Size of a Monkey Audio Header

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

### bitsPerSample

• get **bitsPerSample**(): number

Number of bits per sample in the audio represented by the current instance.

**`inheritdoc`** 

**Returns:** number

___

### compressionLevel

• get **compressionLevel**(): [ApeCompressionLevel](../enums/_src_ape_apestreamheader_.apecompressionlevel.md)

Gets the level of compression used when encoding the audio represented by the current
instance

**Returns:** [ApeCompressionLevel](../enums/_src_ape_apestreamheader_.apecompressionlevel.md)

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

**Returns:** number

___

### mediaTypes

• get **mediaTypes**(): [MediaTypes](../enums/_src_icodec_.mediatypes.md)

Types of media represented by the current instance, bitwise combined.

**`inheritdoc`** 

**Returns:** [MediaTypes](../enums/_src_icodec_.mediatypes.md)

___

### version

• get **version**(): number

Gets the APE version of the audio represented by the current instance

**Returns:** number
