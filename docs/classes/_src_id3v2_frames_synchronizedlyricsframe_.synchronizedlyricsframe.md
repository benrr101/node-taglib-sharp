**[node-taglib-sharp](../README.md)**

> [Globals](../globals.md) / ["src/id3v2/frames/synchronizedLyricsFrame"](../modules/_src_id3v2_frames_synchronizedlyricsframe_.md) / SynchronizedLyricsFrame

# Class: SynchronizedLyricsFrame

This class extends Frame and implements support for ID3v2 Synchronized Lyrics and Text (SYLT)
frames.

## Hierarchy

* [Frame](_src_id3v2_frames_frame_.frame.md)

  ↳ **SynchronizedLyricsFrame**

## Index

### Properties

* [\_header](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md#_header)

### Accessors

* [description](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md#description)
* [encryptionId](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md#encryptionid)
* [flags](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md#flags)
* [format](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md#format)
* [frameClassType](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md#frameclasstype)
* [frameId](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md#frameid)
* [groupId](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md#groupid)
* [language](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md#language)
* [size](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md#size)
* [text](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md#text)
* [textEncoding](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md#textencoding)
* [textType](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md#texttype)

### Methods

* [clone](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md#clone)
* [fieldData](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md#fielddata)
* [parseFields](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md#parsefields)
* [render](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md#render)
* [renderFields](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md#renderfields)
* [setData](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md#setdata)
* [correctEncoding](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md#correctencoding)
* [find](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md#find)
* [findPreferred](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md#findpreferred)
* [fromInfo](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md#frominfo)
* [fromOffsetRawData](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md#fromoffsetrawdata)
* [fromRawData](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md#fromrawdata)

## Properties

### \_header

• `Protected` **\_header**: [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md)

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[_header](_src_id3v2_frames_frame_.frame.md#_header)*

## Accessors

### description

• get **description**(): string

Gets the description of the current instance.

**Returns:** string

• set **description**(`value`: string): void

Sets the description of the current instance.
There should only be one frame with a matching description, type, and ISO-639-2 language
code per tag.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | string | Description to store  |

**Returns:** void

___

### encryptionId

• get **encryptionId**(): number \| undefined

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[encryptionId](_src_id3v2_frames_frame_.frame.md#encryptionid)*

Gets the encryption ID applied to the current instance.

**Returns:** number \| undefined

number Value containing the encryption identifier for the current instance or
    `undefined` if not set.

• set **encryptionId**(`value`: number \| undefined): void

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[encryptionId](_src_id3v2_frames_frame_.frame.md#encryptionid)*

Sets the encryption ID applied to the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | number \| undefined | Value containing the encryption identifier for the current instance. Must be an     8-bit unsigned integer. Setting to `undefined` will remove the encryption header and ID  |

**Returns:** void

number Value containing the encryption identifier for the current instance or
    `undefined` if not set.

___

### flags

• get **flags**(): [Id3v2FrameFlags](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md)

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[flags](_src_id3v2_frames_frame_.frame.md#flags)*

Gets the frame flags applied to the current instance.

**Returns:** [Id3v2FrameFlags](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md)

• set **flags**(`value`: [Id3v2FrameFlags](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md)): void

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[flags](_src_id3v2_frames_frame_.frame.md#flags)*

Sets the frame flags applied to the current instance.
If the value includes either [Id3v2FrameFlags.Encryption](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md#encryption) or
[Id3v2FrameFlags.Compression](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md#compression), [render](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md#render) will throw.

#### Parameters:

Name | Type |
------ | ------ |
`value` | [Id3v2FrameFlags](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md) |

**Returns:** void

___

### format

• get **format**(): [TimestampFormat](../enums/_src_id3v2_utiltypes_.timestampformat.md)

Gets the timestamp format used by the current instance.

**Returns:** [TimestampFormat](../enums/_src_id3v2_utiltypes_.timestampformat.md)

• set **format**(`value`: [TimestampFormat](../enums/_src_id3v2_utiltypes_.timestampformat.md)): void

Sets the timestamp format used by the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | [TimestampFormat](../enums/_src_id3v2_utiltypes_.timestampformat.md) | Timestamp format to use  |

**Returns:** void

___

### frameClassType

• get **frameClassType**(): [FrameClassType](../enums/_src_id3v2_frames_frame_.frameclasstype.md)

*Overrides [Frame](_src_id3v2_frames_frame_.frame.md).[frameClassType](_src_id3v2_frames_frame_.frame.md#frameclasstype)*

**`inheritdoc`** 

**Returns:** [FrameClassType](../enums/_src_id3v2_frames_frame_.frameclasstype.md)

___

### frameId

• get **frameId**(): [FrameIdentifier](_src_id3v2_frameidentifiers_.frameidentifier.md)

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[frameId](_src_id3v2_frames_frame_.frame.md#frameid)*

Gets the frame ID for the current instance.

**Returns:** [FrameIdentifier](_src_id3v2_frameidentifiers_.frameidentifier.md)

FrameIdentifier Object representing of the identifier of the frame

___

### groupId

• get **groupId**(): number \| undefined

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[groupId](_src_id3v2_frames_frame_.frame.md#groupid)*

Gets the grouping ID applied to the current instance.

**Returns:** number \| undefined

number Value containing the grouping identifier for the current instance, or
    `undefined` if not set.

• set **groupId**(`value`: number \| undefined): void

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[groupId](_src_id3v2_frames_frame_.frame.md#groupid)*

Sets the grouping ID applied to the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | number \| undefined | Grouping identifier for the current instance. Must be a 8-bit unsigned integer.     Setting to `undefined` will remove the grouping identity header and ID  |

**Returns:** void

number Value containing the grouping identifier for the current instance, or
    `undefined` if not set.

___

### language

• get **language**(): string

Gets the ISO-639-2 language code stored in the current instance

**Returns:** string

• set **language**(`value`: string): void

Sets the ISO-639-2 language code stored in the current instance.
There should only be one frame with a matching description, type, and ISO-639-2 language
code per tag.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | string | ISO-639-2 language code stored in the current instance  |

**Returns:** void

___

### size

• get **size**(): number

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[size](_src_id3v2_frames_frame_.frame.md#size)*

Gets the size of the current instance as it was last stored on disk.
NOTE: This value is not used outside of reading a frame from disk, so newly created frames
    should not have this value set.

**Returns:** number

___

### text

• get **text**(): [SynchronizedText](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedtext.md)[]

Gets the text contained in the current instance

**Returns:** [SynchronizedText](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedtext.md)[]

• set **text**(`value`: [SynchronizedText](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedtext.md)[]): void

Sets the text contained in the current instance

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | [SynchronizedText](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedtext.md)[] | Text contained in the current instance  |

**Returns:** void

___

### textEncoding

• get **textEncoding**(): [StringType](../enums/_src_bytevector_.stringtype.md)

Gets the text encoding to use when storing the current instance

**Returns:** [StringType](../enums/_src_bytevector_.stringtype.md)

• set **textEncoding**(`value`: [StringType](../enums/_src_bytevector_.stringtype.md)): void

Sets the text encoding to use when storing the current instance.
This encoding is overridden when rendering if [Id3v2Settings.forceDefaultEncoding](_src_id3v2_id3v2settings_.id3v2settings.md#forcedefaultencoding) is
`true` or the render version does not support it.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | [StringType](../enums/_src_bytevector_.stringtype.md) | Text encoding to use when storing the current instance  |

**Returns:** void

___

### textType

• get **textType**(): [SynchronizedTextType](../enums/_src_id3v2_utiltypes_.synchronizedtexttype.md)

Gets the type of text contained in the current instance

**Returns:** [SynchronizedTextType](../enums/_src_id3v2_utiltypes_.synchronizedtexttype.md)

• set **textType**(`value`: [SynchronizedTextType](../enums/_src_id3v2_utiltypes_.synchronizedtexttype.md)): void

Sets the type of text contained in the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | [SynchronizedTextType](../enums/_src_id3v2_utiltypes_.synchronizedtexttype.md) | Type of the synchronized text  |

**Returns:** void

## Methods

### clone

▸ **clone**(): [Frame](_src_id3v2_frames_frame_.frame.md)

*Overrides [Frame](_src_id3v2_frames_frame_.frame.md).[clone](_src_id3v2_frames_frame_.frame.md#clone)*

**`inheritdoc`** 

**Returns:** [Frame](_src_id3v2_frames_frame_.frame.md)

___

### fieldData

▸ `Protected`**fieldData**(`frameData`: [ByteVector](_src_bytevector_.bytevector.md), `offset`: number, `version`: number, `dataIncludesHeader`: boolean): [ByteVector](_src_bytevector_.bytevector.md)

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[fieldData](_src_id3v2_frames_frame_.frame.md#fielddata)*

Extracts the field data from the raw portion of an ID3v2 frame.
This method is necessary for extracting extra data prepended to the frame such the as
grouping ID.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`frameData` | [ByteVector](_src_bytevector_.bytevector.md) | Raw frame data |
`offset` | number | Index at which the data is contained |
`version` | number | Version of the ID3v2 tag the data was originally encoded with |
`dataIncludesHeader` | boolean | `true` if `frameData` includes the header, `false`     otherwise  |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### parseFields

▸ `Protected`**parseFields**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `_version`: number): void

*Overrides [Frame](_src_id3v2_frames_frame_.frame.md).[parseFields](_src_id3v2_frames_frame_.frame.md#parsefields)*

**`inheritdoc`** 

#### Parameters:

Name | Type |
------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) |
`_version` | number |

**Returns:** void

___

### render

▸ **render**(`version`: number): [ByteVector](_src_bytevector_.bytevector.md)

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[render](_src_id3v2_frames_frame_.frame.md#render)*

Renders the current instance, encoded in a specified ID3v2 version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`version` | number | Version of ID3v2 to use when encoding the current instance  |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### renderFields

▸ `Protected`**renderFields**(`version`: number): [ByteVector](_src_bytevector_.bytevector.md)

*Overrides [Frame](_src_id3v2_frames_frame_.frame.md).[renderFields](_src_id3v2_frames_frame_.frame.md#renderfields)*

**`inheritdoc`** 

#### Parameters:

Name | Type |
------ | ------ |
`version` | number |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### setData

▸ `Protected`**setData**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `offset`: number, `readHeader`: boolean, `version`: number): void

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[setData](_src_id3v2_frames_frame_.frame.md#setdata)*

Populates the current instance by reading the raw frame from disk, optionally reading the
header.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | Raw ID3v2 frame |
`offset` | number | Offset in `data` at which the frame begins. |
`readHeader` | boolean | Whether or not to read the reader into the current instance. |
`version` | number | Version of the ID3v2 tag the data was encoded with  |

**Returns:** void

___

### correctEncoding

▸ `Static` `Protected`**correctEncoding**(`type`: [StringType](../enums/_src_bytevector_.stringtype.md), `version`: number): [StringType](../enums/_src_bytevector_.stringtype.md)

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[correctEncoding](_src_id3v2_frames_frame_.frame.md#correctencoding)*

Converts an encoding to be a supported encoding for a specified tag version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`type` | [StringType](../enums/_src_bytevector_.stringtype.md) | Value containing the original encoding |
`version` | number | Value containing the ID3v2 version to be encoded. |

**Returns:** [StringType](../enums/_src_bytevector_.stringtype.md)

StringType Value containing the correct encoding to use, based on
    [Id3v2Settings.forceDefaultEncoding](_src_id3v2_id3v2settings_.id3v2settings.md#forcedefaultencoding) and what is supported by
    `version`

___

### find

▸ `Static`**find**(`frames`: [SynchronizedLyricsFrame](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md)[], `description`: string, `textType`: [SynchronizedTextType](../enums/_src_id3v2_utiltypes_.synchronizedtexttype.md), `language?`: string): [SynchronizedLyricsFrame](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md)

Gets a specified lyrics frame from a list of synchronized lyrics frames

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`frames` | [SynchronizedLyricsFrame](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md)[] | List of frames to search |
`description` | string | Description to match |
`textType` | [SynchronizedTextType](../enums/_src_id3v2_utiltypes_.synchronizedtexttype.md) | Text type to match |
`language?` | string | Optionally, ISO-639-2 language code to match |

**Returns:** [SynchronizedLyricsFrame](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md)

SynchronizedLyricsFrame Frame containing the matching user, `undefined` if a match
    was not found

___

### findPreferred

▸ `Static`**findPreferred**(`frames`: [SynchronizedLyricsFrame](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md)[], `description`: string, `language`: string, `textType`: [SynchronizedTextType](../enums/_src_id3v2_utiltypes_.synchronizedtexttype.md)): [SynchronizedLyricsFrame](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md)

Gets a synchronized lyrics frame from the specified list, trying to match the description and
language but accepting an incomplete match.
This method tries matching with the following order of precedence:
* The first frame with a matching description, language, and type.
* The first frame with a matching description and language.
* The first frame with a matching language.
* The first frame with a matching description.
* The first frame with a matching type.
* The first frame.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`frames` | [SynchronizedLyricsFrame](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md)[] | List of frames to search for the best match |
`description` | string | Description to match |
`language` | string | ISO-639-2 language code to match |
`textType` | [SynchronizedTextType](../enums/_src_id3v2_utiltypes_.synchronizedtexttype.md) | Text type to match |

**Returns:** [SynchronizedLyricsFrame](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md)

SynchronizedLyricsFrame The matching frame or `undefined` if a match was not found

___

### fromInfo

▸ `Static`**fromInfo**(`description`: string, `language`: string, `textType`: [SynchronizedTextType](../enums/_src_id3v2_utiltypes_.synchronizedtexttype.md), `encoding?`: [StringType](../enums/_src_bytevector_.stringtype.md)): [SynchronizedLyricsFrame](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md)

Constructs and initializes a new instance with a specified description, ISO-639-2 language
code, text type, and text encoding.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`description` | string | - | Description of the synchronized lyrics frame |
`language` | string | - | ISO-639-2 language code of the new instance |
`textType` | [SynchronizedTextType](../enums/_src_id3v2_utiltypes_.synchronizedtexttype.md) | - | Type of the text to store in the new instance |
`encoding` | [StringType](../enums/_src_bytevector_.stringtype.md) | Id3v2Settings.defaultEncoding | Encoding to use when rendering text in this new instance  |

**Returns:** [SynchronizedLyricsFrame](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md)

___

### fromOffsetRawData

▸ `Static`**fromOffsetRawData**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `offset`: number, `header`: [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md), `version`: number): [SynchronizedLyricsFrame](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md)

Constructs and initializes a new instance by reading its raw data in a specified ID3v2
format.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | Raw representation of the new instance |
`offset` | number | Offset into `data` where the frame begins. Must be unsigned, safe     integer |
`header` | [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md) | Header of the frame found at `offset` in `data` |
`version` | number | ID3v2 version the frame was originally encoded with  |

**Returns:** [SynchronizedLyricsFrame](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md)

___

### fromRawData

▸ `Static`**fromRawData**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `version`: number): [SynchronizedLyricsFrame](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md)

Constructs and initializes a new instance by reading its raw data in a specified ID3v2
format.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | Raw representation of the new instance |
`version` | number | ID3v2 version the raw frame is encoded with. Must be unsigned 8-bit integer.  |

**Returns:** [SynchronizedLyricsFrame](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md)
