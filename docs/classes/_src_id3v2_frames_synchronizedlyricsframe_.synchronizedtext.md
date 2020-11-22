**[node-taglib-sharp](../README.md)**

> [Globals](../globals.md) / ["src/id3v2/frames/synchronizedLyricsFrame"](../modules/_src_id3v2_frames_synchronizedlyricsframe_.md) / SynchronizedText

# Class: SynchronizedText

This structure contains a single entry in a [SynchronizedLyricsFrame](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md) object.

## Hierarchy

* **SynchronizedText**

## Index

### Constructors

* [constructor](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedtext.md#constructor)

### Properties

* [text](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedtext.md#text)
* [time](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedtext.md#time)

### Methods

* [clone](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedtext.md#clone)
* [render](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedtext.md#render)

## Constructors

### constructor

\+ **new SynchronizedText**(`time`: number, `text`: string): [SynchronizedText](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedtext.md)

Constructs and initializes a new instance with a specified time and text.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`time` | number | Offset into the media that owns this element when this element should be     displayed. See [TimestampFormat](../enums/_src_id3v2_utiltypes_.timestampformat.md) for possible values. |
`text` | string | Text for the point in time  |

**Returns:** [SynchronizedText](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedtext.md)

## Properties

### text

•  **text**: string

Text for the point in time represented by the current instance.

___

### time

•  **time**: number

Time offset of the current instance. The specific format this text element is defined in
[SynchronizedLyricsFrame.format](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md#format) of the frame that owns this element.

## Methods

### clone

▸ **clone**(): [SynchronizedText](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedtext.md)

Creates a copy of this instance.

**Returns:** [SynchronizedText](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedtext.md)

___

### render

▸ **render**(`encoding`: [StringType](../enums/_src_bytevector_.stringtype.md)): [ByteVector](_src_bytevector_.bytevector.md)

#### Parameters:

Name | Type |
------ | ------ |
`encoding` | [StringType](../enums/_src_bytevector_.stringtype.md) |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)
