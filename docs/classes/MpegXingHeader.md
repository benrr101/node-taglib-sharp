[node-taglib-sharp](../README.md) / [Exports](../modules.md) / MpegXingHeader

# Class: MpegXingHeader

Information about a Xing variable bitrate MPEG audio stream. This provides a much more accurate
determination of bitrate and duration than just using the first MPEG frame header alone.

**`Remarks`**

There is a tiny, known bug in this implementation. According to Hydrogenaudio, for LAME
    v3.99.1, they tried to change the version string to start with L instead of LAME. This was
    rolled back in v3.99.2 due to backwards compat issues with decoders. However, to simplify
    the code here, I've just decided to only check for LAME. Thus, for files encoded with this
    broken version of LAME (or indeed with other encoders like Gogo), the file bitrate and
    duration will be slightly inaccurate.
    Please raise a GitHub issue if this is not good enough and make sure to say "I told you not
    to half-ass it, Ben".

## Hierarchy

- `default`

  ↳ **`MpegXingHeader`**

## Table of contents

### Accessors

- [bitrateKilobytes](MpegXingHeader.md#bitratekilobytes)
- [durationMilliseconds](MpegXingHeader.md#durationmilliseconds)
- [totalBytes](MpegXingHeader.md#totalbytes)
- [totalFrames](MpegXingHeader.md#totalframes)

### Methods

- [fromFile](MpegXingHeader.md#fromfile)

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

▸ `Static` **fromFile**(`file`, `mpegHeaderPosition`, `mpegVersion`, `mpegChannelMode`, `samplesPerFrame`, `samplesPerSecond`, `fallbackFileSize`): [`MpegXingHeader`](MpegXingHeader.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | [`File`](File.md) |
| `mpegHeaderPosition` | `number` |
| `mpegVersion` | [`MpegVersion`](../enums/MpegVersion.md) |
| `mpegChannelMode` | [`MpegAudioChannelMode`](../enums/MpegAudioChannelMode.md) |
| `samplesPerFrame` | `number` |
| `samplesPerSecond` | `number` |
| `fallbackFileSize` | `number` |

#### Returns

[`MpegXingHeader`](MpegXingHeader.md)
