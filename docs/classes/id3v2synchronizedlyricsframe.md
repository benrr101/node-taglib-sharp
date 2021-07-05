[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2SynchronizedLyricsFrame

# Class: Id3v2SynchronizedLyricsFrame

This structure contains a single entry in a [SynchronizedLyricsFrame](../enums/id3v2frameclasstype.md#synchronizedlyricsframe) object.

## Table of contents

### Constructors

- [constructor](id3v2synchronizedlyricsframe.md#constructor)

### Properties

- [text](id3v2synchronizedlyricsframe.md#text)

### Accessors

- [time](id3v2synchronizedlyricsframe.md#time)

### Methods

- [clone](id3v2synchronizedlyricsframe.md#clone)
- [render](id3v2synchronizedlyricsframe.md#render)

## Constructors

### constructor

• **new Id3v2SynchronizedLyricsFrame**(`time`, `text`)

Constructs and initializes a new instance with a specified time and text.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `time` | `number` | Offset into the media that owns this element when this element should be     displayed. See {@link TimestampFormat} for possible values. |
| `text` | `string` | Text for the point in time |

## Properties

### text

• **text**: `string`

Text for the point in time represented by the current instance.

## Accessors

### time

• `get` **time**(): `number`

Gets time offset of the current instance. The specific format this text element is defined
in {@link SynchronizedLyricsFrame.format} of the frame that owns this element.

#### Returns

`number`

• `set` **time**(`value`): `void`

Sets time offset of the current instance. The specific format this text element is defined
in {@link SynchronizedLyricsFrame.format} of the frame that owns this element.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Offset of the current instance, must be a safe |

#### Returns

`void`

## Methods

### clone

▸ **clone**(): [`Id3v2SynchronizedLyricsFrame`](id3v2synchronizedlyricsframe.md)

Creates a copy of this instance.

#### Returns

[`Id3v2SynchronizedLyricsFrame`](id3v2synchronizedlyricsframe.md)

___

### render

▸ **render**(`encoding`): [`ByteVector`](bytevector.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `encoding` | [`StringType`](../enums/stringtype.md) |

#### Returns

[`ByteVector`](bytevector.md)
