[node-taglib-sharp](../README.md) / [Exports](../modules.md) / RiffBitmapInfoHeader

# Class: RiffBitmapInfoHeader

This class provides a representation of a Microsoft BitmapInfoHeader structure which provides
information about the dimensions and color format of a device-independent bitmap.

**`link`** https://docs.microsoft.com/en-us/windows/win32/api/wingdi/ns-wingdi-bitmapinfoheader

## Implements

- [`IVideoCodec`](../interfaces/IVideoCodec.md)

## Table of contents

### Constructors

- [constructor](RiffBitmapInfoHeader.md#constructor)

### Properties

- [FOURCC\_CODES](RiffBitmapInfoHeader.md#fourcc_codes)

### Accessors

- [bitCount](RiffBitmapInfoHeader.md#bitcount)
- [colorsUsed](RiffBitmapInfoHeader.md#colorsused)
- [compressionId](RiffBitmapInfoHeader.md#compressionid)
- [description](RiffBitmapInfoHeader.md#description)
- [durationMilliseconds](RiffBitmapInfoHeader.md#durationmilliseconds)
- [imageSize](RiffBitmapInfoHeader.md#imagesize)
- [importantColors](RiffBitmapInfoHeader.md#importantcolors)
- [mediaTypes](RiffBitmapInfoHeader.md#mediatypes)
- [planes](RiffBitmapInfoHeader.md#planes)
- [videoHeight](RiffBitmapInfoHeader.md#videoheight)
- [videoWidth](RiffBitmapInfoHeader.md#videowidth)
- [xPixelsPerMeter](RiffBitmapInfoHeader.md#xpixelspermeter)
- [yPixelsPerMeter](RiffBitmapInfoHeader.md#ypixelspermeter)

## Constructors

### constructor

• **new RiffBitmapInfoHeader**(`data`, `offset`)

Constructs and initializes a new instance by reading the raw structure from a specified
position in the provided [ByteVector](ByteVector.md).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](ByteVector.md) | ByteVector containing the raw data structure |
| `offset` | `number` | Index into `data` where the raw bitmap info header begins. Must be a positive,     32-bit integer. |

## Properties

### FOURCC\_CODES

▪ `Static` `Readonly` **FOURCC\_CODES**: `Map`<`number`, `string`\>

## Accessors

### bitCount

• `get` **bitCount**(): `number`

Gets the number of bits per pixel (bpp). For uncompressed formats, this value is the average
number of bits per pixel. For compressed formats, this value is the implied bit depth of the
uncompressed image, after the image has been decoded.

#### Returns

`number`

___

### colorsUsed

• `get` **colorsUsed**(): `number`

Gets the number of color indices in the color table that are actually used by the bitmap.

#### Returns

`number`

___

### compressionId

• `get` **compressionId**(): `number`

Gets the compression ID for the image.

**`remarks`** For compressed video and YUV formats, this is a FOURCC code, specified as a DWORD in
    little-endian order. For more information, see
    [https://docs.microsoft.com/en-us/windows/win32/directshow/fourcc-codes](https://docs.microsoft.com/en-us/windows/win32/directshow/fourcc-codes) and
    [https://www.fourcc.org/fourcc.php](https://www.fourcc.org/fourcc.php). For uncompressed RGB formats, the following
    values are possible:
    * `BI_RGB` = `0x00000000` => Uncompressed RGB
    * `BI_BITFIELDS` = `0x00000003` => Uncompressed RGB with color masks, valid for 16 and
      32 bpp bitmaps.

    [description](RiffBitmapInfoHeader.md#description) makes a best guess attempt to determine the name of the compression
    codec used.

#### Returns

`number`

___

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

#### Returns

`number`

#### Implementation of

[IVideoCodec](../interfaces/IVideoCodec.md).[durationMilliseconds](../interfaces/IVideoCodec.md#durationmilliseconds)

___

### imageSize

• `get` **imageSize**(): `number`

Gets the size, in bytes, of the image. This can be set to 0 for uncompressed RGB bitmaps.

#### Returns

`number`

___

### importantColors

• `get` **importantColors**(): `number`

Gets the number of color indices that are considered important for displaying the bitmap. If
this value is `0`, all colors are important.

#### Returns

`number`

___

### mediaTypes

• `get` **mediaTypes**(): [`MediaTypes`](../enums/MediaTypes.md)

Types of media represented by the current instance, bitwise combined.

#### Returns

[`MediaTypes`](../enums/MediaTypes.md)

#### Implementation of

[IVideoCodec](../interfaces/IVideoCodec.md).[mediaTypes](../interfaces/IVideoCodec.md#mediatypes)

___

### planes

• `get` **planes**(): `number`

Gets the number of planes in the image. This value is pretty much universally set to 1.

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

___

### xPixelsPerMeter

• `get` **xPixelsPerMeter**(): `number`

Gets the horizontal resolution, in pixels per meter, of the target device for the bitmap.

#### Returns

`number`

___

### yPixelsPerMeter

• `get` **yPixelsPerMeter**(): `number`

Gets the vertical resolution, in pixels per meter, of the target device for the bitmap.

#### Returns

`number`
