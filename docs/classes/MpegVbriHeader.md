[node-taglib-sharp](../README.md) / [Exports](../modules.md) / MpegVbriHeader

# Class: MpegVbriHeader

Information about a variable bitrate MPEG audio stream encoded by the Fraunhofer encoder

## Hierarchy

- `default`

  ↳ **`MpegVbriHeader`**

## Table of contents

### Accessors

- [bitrateKilobytes](MpegVbriHeader.md#bitratekilobytes)
- [durationMilliseconds](MpegVbriHeader.md#durationmilliseconds)
- [totalBytes](MpegVbriHeader.md#totalbytes)
- [totalFrames](MpegVbriHeader.md#totalframes)

### Methods

- [fromFile](MpegVbriHeader.md#fromfile)

## Accessors

### bitrateKilobytes

• `get` **bitrateKilobytes**(): `number`

Gets the bitrate of the ile in kilobytes per second, if it could be calculated using the
current instance. `undefined`, otherwise.

#### Returns

`number`

#### Inherited from

VbrHeader.bitrateKilobytes

___

### durationMilliseconds

• `get` **durationMilliseconds**(): `number`

Gets the duration of the file in milliseconds, if it could be calculated using the current
instance. `undefined`, otherwise.

#### Returns

`number`

#### Inherited from

VbrHeader.durationMilliseconds

___

### totalBytes

• `get` **totalBytes**(): `number`

Gets the total size of the file in bytes, as indicated by the current instance.

#### Returns

`number`

#### Inherited from

VbrHeader.totalBytes

___

### totalFrames

• `get` **totalFrames**(): `number`

Gets the total number of frames in the file, as indicated by the current instance.

#### Returns

`number`

#### Inherited from

VbrHeader.totalFrames

## Methods

### fromFile

▸ `Static` **fromFile**(`file`, `mpegHeaderPosition`, `samplesPerFrame`, `samplesPerSecond`): [`MpegVbriHeader`](MpegVbriHeader.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | [`File`](File.md) |
| `mpegHeaderPosition` | `number` |
| `samplesPerFrame` | `number` |
| `samplesPerSecond` | `number` |

#### Returns

[`MpegVbriHeader`](MpegVbriHeader.md)
