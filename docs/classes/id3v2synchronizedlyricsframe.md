[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2SynchronizedLyricsFrame

# Class: Id3v2SynchronizedLyricsFrame

This structure contains a single entry in a [SynchronizedLyricsFrame](../enums/id3v2frameclasstype.md#synchronizedlyricsframe) object.

## Hierarchy

* **Id3v2SynchronizedLyricsFrame**

## Table of contents

### Constructors

- [constructor](id3v2synchronizedlyricsframe.md#constructor)

### Properties

- [text](id3v2synchronizedlyricsframe.md#text)
- [time](id3v2synchronizedlyricsframe.md#time)

### Methods

- [clone](id3v2synchronizedlyricsframe.md#clone)
- [render](id3v2synchronizedlyricsframe.md#render)

## Constructors

### constructor

\+ **new Id3v2SynchronizedLyricsFrame**(`time`: *number*, `text`: *string*): [*Id3v2SynchronizedLyricsFrame*](id3v2synchronizedlyricsframe.md)

Constructs and initializes a new instance with a specified time and text.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`time` | *number* | Offset into the media that owns this element when this element should be     displayed. See {@link TimestampFormat} for possible values.   |
`text` | *string* | Text for the point in time    |

**Returns:** [*Id3v2SynchronizedLyricsFrame*](id3v2synchronizedlyricsframe.md)

## Properties

### text

• **text**: *string*

Text for the point in time represented by the current instance.

___

### time

• **time**: *number*

Time offset of the current instance. The specific format this text element is defined in
{@link SynchronizedLyricsFrame.format} of the frame that owns this element.

## Methods

### clone

▸ **clone**(): [*Id3v2SynchronizedLyricsFrame*](id3v2synchronizedlyricsframe.md)

Creates a copy of this instance.

**Returns:** [*Id3v2SynchronizedLyricsFrame*](id3v2synchronizedlyricsframe.md)

___

### render

▸ **render**(`encoding`: [*StringType*](../enums/stringtype.md)): [*ByteVector*](bytevector.md)

#### Parameters:

Name | Type |
------ | ------ |
`encoding` | [*StringType*](../enums/stringtype.md) |

**Returns:** [*ByteVector*](bytevector.md)
