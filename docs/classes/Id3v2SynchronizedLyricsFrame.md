[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2SynchronizedLyricsFrame

# Class: Id3v2SynchronizedLyricsFrame

This structure contains a single entry in a SynchronizedLyricsFrame object.

## Table of contents

### Constructors

- [constructor](Id3v2SynchronizedLyricsFrame.md#constructor)

### Properties

- [text](Id3v2SynchronizedLyricsFrame.md#text)

### Accessors

- [time](Id3v2SynchronizedLyricsFrame.md#time)

### Methods

- [clone](Id3v2SynchronizedLyricsFrame.md#clone)
- [render](Id3v2SynchronizedLyricsFrame.md#render)

## Constructors

### constructor

• **new Id3v2SynchronizedLyricsFrame**(`time`, `text`)

Constructs and initializes a new instance with a specified time and text.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `time` | `number` | Offset into the media that owns this element when this element should be displayed. See TimestampFormat for possible values. |
| `text` | `string` | Text for the point in time |

## Properties

### text

• **text**: `string`

Text for the point in time represented by the current instance.

## Accessors

### time

• `get` **time**(): `number`

Gets time offset of the current instance. The specific format this text element is defined
in SynchronizedLyricsFrame.format of the frame that owns this element.

#### Returns

`number`

• `set` **time**(`value`): `void`

Sets time offset of the current instance. The specific format this text element is defined
in SynchronizedLyricsFrame.format of the frame that owns this element.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Offset of the current instance, must be a safe |

#### Returns

`void`

## Methods

### clone

▸ **clone**(): [`Id3v2SynchronizedLyricsFrame`](Id3v2SynchronizedLyricsFrame.md)

Creates a copy of this instance.

#### Returns

[`Id3v2SynchronizedLyricsFrame`](Id3v2SynchronizedLyricsFrame.md)

___

### render

▸ **render**(`encoding`): [`ByteVector`](ByteVector.md)

Generates a raw byte representation of the frame for writing to a file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `encoding` | [`StringType`](../enums/StringType.md) | Encoding to use for encoding the text of the frame. |

#### Returns

[`ByteVector`](ByteVector.md)
