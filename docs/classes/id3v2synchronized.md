[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2Synchronized

# Class: Id3v2Synchronized

This class extends Frame and implements support for ID3v2 Synchronized Lyrics and Text (SYLT)
frames.

## Hierarchy

* [*Id3v2Frame*](id3v2frame.md)

  ↳ **Id3v2Synchronized**

## Table of contents

### Properties

- [\_header](id3v2synchronized.md#_header)

### Accessors

- [description](id3v2synchronized.md#description)
- [encryptionId](id3v2synchronized.md#encryptionid)
- [flags](id3v2synchronized.md#flags)
- [format](id3v2synchronized.md#format)
- [frameClassType](id3v2synchronized.md#frameclasstype)
- [frameId](id3v2synchronized.md#frameid)
- [groupId](id3v2synchronized.md#groupid)
- [language](id3v2synchronized.md#language)
- [size](id3v2synchronized.md#size)
- [text](id3v2synchronized.md#text)
- [textEncoding](id3v2synchronized.md#textencoding)
- [textType](id3v2synchronized.md#texttype)

### Methods

- [clone](id3v2synchronized.md#clone)
- [fieldData](id3v2synchronized.md#fielddata)
- [parseFields](id3v2synchronized.md#parsefields)
- [render](id3v2synchronized.md#render)
- [renderFields](id3v2synchronized.md#renderfields)
- [setData](id3v2synchronized.md#setdata)
- [correctEncoding](id3v2synchronized.md#correctencoding)
- [find](id3v2synchronized.md#find)
- [findPreferred](id3v2synchronized.md#findpreferred)
- [fromInfo](id3v2synchronized.md#frominfo)
- [fromOffsetRawData](id3v2synchronized.md#fromoffsetrawdata)
- [fromRawData](id3v2synchronized.md#fromrawdata)

## Properties

### \_header

• `Protected` **\_header**: [*Id3v2FrameHeader*](id3v2frameheader.md)

Inherited from: [Id3v2Frame](id3v2frame.md).[_header](id3v2frame.md#_header)

## Accessors

### description

• **description**(): *string*

Gets the description of the current instance.

**Returns:** *string*

• **description**(`value`: *string*): *void*

Sets the description of the current instance.
There should only be one frame with a matching description, type, and ISO-639-2 language
code per tag.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | *string* | Description to store    |

**Returns:** *void*

___

### encryptionId

• **encryptionId**(): *number*

Gets the encryption ID applied to the current instance.

**Returns:** *number*

number Value containing the encryption identifier for the current instance or
    `undefined` if not set.

• **encryptionId**(`value`: *number*): *void*

Sets the encryption ID applied to the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | *number* | Value containing the encryption identifier for the current instance. Must be an     8-bit unsigned integer. Setting to `undefined` will remove the encryption header and ID    |

**Returns:** *void*

number Value containing the encryption identifier for the current instance or
    `undefined` if not set.

___

### flags

• **flags**(): [*Id3v2FrameFlags*](../enums/id3v2frameflags.md)

Gets the frame flags applied to the current instance.

**Returns:** [*Id3v2FrameFlags*](../enums/id3v2frameflags.md)

• **flags**(`value`: [*Id3v2FrameFlags*](../enums/id3v2frameflags.md)): *void*

Sets the frame flags applied to the current instance.
If the value includes either [Id3v2FrameFlags.Encryption](../enums/id3v2frameflags.md#encryption) or
[Id3v2FrameFlags.Compression](../enums/id3v2frameflags.md#compression), [render](id3v2synchronized.md#render) will throw.

#### Parameters:

Name | Type |
------ | ------ |
`value` | [*Id3v2FrameFlags*](../enums/id3v2frameflags.md) |

**Returns:** *void*

___

### format

• **format**(): [*Id3v2TimestampFormat*](../enums/id3v2timestampformat.md)

Gets the timestamp format used by the current instance.

**Returns:** [*Id3v2TimestampFormat*](../enums/id3v2timestampformat.md)

• **format**(`value`: [*Id3v2TimestampFormat*](../enums/id3v2timestampformat.md)): *void*

Sets the timestamp format used by the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | [*Id3v2TimestampFormat*](../enums/id3v2timestampformat.md) | Timestamp format to use    |

**Returns:** *void*

___

### frameClassType

• **frameClassType**(): [*Id3v2FrameClassType*](../enums/id3v2frameclasstype.md)

**`inheritdoc`** 

**Returns:** [*Id3v2FrameClassType*](../enums/id3v2frameclasstype.md)

___

### frameId

• **frameId**(): [*Id3v2FrameIdentifier*](id3v2frameidentifier.md)

Gets the frame ID for the current instance.

**Returns:** [*Id3v2FrameIdentifier*](id3v2frameidentifier.md)

FrameIdentifier Object representing of the identifier of the frame

___

### groupId

• **groupId**(): *number*

Gets the grouping ID applied to the current instance.

**Returns:** *number*

number Value containing the grouping identifier for the current instance, or
    `undefined` if not set.

• **groupId**(`value`: *number*): *void*

Sets the grouping ID applied to the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | *number* | Grouping identifier for the current instance. Must be a 8-bit unsigned integer.     Setting to `undefined` will remove the grouping identity header and ID    |

**Returns:** *void*

number Value containing the grouping identifier for the current instance, or
    `undefined` if not set.

___

### language

• **language**(): *string*

Gets the ISO-639-2 language code stored in the current instance

**Returns:** *string*

• **language**(`value`: *string*): *void*

Sets the ISO-639-2 language code stored in the current instance.
There should only be one frame with a matching description, type, and ISO-639-2 language
code per tag.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | *string* | ISO-639-2 language code stored in the current instance    |

**Returns:** *void*

___

### size

• **size**(): *number*

Gets the size of the current instance as it was last stored on disk.
NOTE: This value is not used outside of reading a frame from disk, so newly created frames
    should not have this value set.

**Returns:** *number*

___

### text

• **text**(): [*Id3v2SynchronizedLyricsFrame*](id3v2synchronizedlyricsframe.md)[]

Gets the text contained in the current instance

**Returns:** [*Id3v2SynchronizedLyricsFrame*](id3v2synchronizedlyricsframe.md)[]

• **text**(`value`: [*Id3v2SynchronizedLyricsFrame*](id3v2synchronizedlyricsframe.md)[]): *void*

Sets the text contained in the current instance

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | [*Id3v2SynchronizedLyricsFrame*](id3v2synchronizedlyricsframe.md)[] | Text contained in the current instance    |

**Returns:** *void*

___

### textEncoding

• **textEncoding**(): [*StringType*](../enums/stringtype.md)

Gets the text encoding to use when storing the current instance

**Returns:** [*StringType*](../enums/stringtype.md)

• **textEncoding**(`value`: [*StringType*](../enums/stringtype.md)): *void*

Sets the text encoding to use when storing the current instance.
This encoding is overridden when rendering if [Id3v2Settings.forceDefaultEncoding](id3v2settings.md#forcedefaultencoding) is
`true` or the render version does not support it.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | [*StringType*](../enums/stringtype.md) | Text encoding to use when storing the current instance    |

**Returns:** *void*

___

### textType

• **textType**(): [*Id3v2SynchronizedTextType*](../enums/id3v2synchronizedtexttype.md)

Gets the type of text contained in the current instance

**Returns:** [*Id3v2SynchronizedTextType*](../enums/id3v2synchronizedtexttype.md)

• **textType**(`value`: [*Id3v2SynchronizedTextType*](../enums/id3v2synchronizedtexttype.md)): *void*

Sets the type of text contained in the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | [*Id3v2SynchronizedTextType*](../enums/id3v2synchronizedtexttype.md) | Type of the synchronized text    |

**Returns:** *void*

## Methods

### clone

▸ **clone**(): [*Id3v2Frame*](id3v2frame.md)

**`inheritdoc`** 

**Returns:** [*Id3v2Frame*](id3v2frame.md)

Overrides: [Id3v2Frame](id3v2frame.md)

___

### fieldData

▸ `Protected`**fieldData**(`frameData`: [*ByteVector*](bytevector.md), `offset`: *number*, `version`: *number*, `dataIncludesHeader`: *boolean*): [*ByteVector*](bytevector.md)

Extracts the field data from the raw portion of an ID3v2 frame.
This method is necessary for extracting extra data prepended to the frame such the as
grouping ID.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`frameData` | [*ByteVector*](bytevector.md) | Raw frame data   |
`offset` | *number* | Index at which the data is contained   |
`version` | *number* | Version of the ID3v2 tag the data was originally encoded with   |
`dataIncludesHeader` | *boolean* | `true` if `frameData` includes the header, `false`     otherwise    |

**Returns:** [*ByteVector*](bytevector.md)

Inherited from: [Id3v2Frame](id3v2frame.md)

___

### parseFields

▸ `Protected`**parseFields**(`data`: [*ByteVector*](bytevector.md), `_version`: *number*): *void*

**`inheritdoc`** 

#### Parameters:

Name | Type |
------ | ------ |
`data` | [*ByteVector*](bytevector.md) |
`_version` | *number* |

**Returns:** *void*

Overrides: [Id3v2Frame](id3v2frame.md)

___

### render

▸ **render**(`version`: *number*): [*ByteVector*](bytevector.md)

Renders the current instance, encoded in a specified ID3v2 version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`version` | *number* | Version of ID3v2 to use when encoding the current instance    |

**Returns:** [*ByteVector*](bytevector.md)

Inherited from: [Id3v2Frame](id3v2frame.md)

___

### renderFields

▸ `Protected`**renderFields**(`version`: *number*): [*ByteVector*](bytevector.md)

**`inheritdoc`** 

#### Parameters:

Name | Type |
------ | ------ |
`version` | *number* |

**Returns:** [*ByteVector*](bytevector.md)

Overrides: [Id3v2Frame](id3v2frame.md)

___

### setData

▸ `Protected`**setData**(`data`: [*ByteVector*](bytevector.md), `offset`: *number*, `readHeader`: *boolean*, `version`: *number*): *void*

Populates the current instance by reading the raw frame from disk, optionally reading the
header.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [*ByteVector*](bytevector.md) | Raw ID3v2 frame   |
`offset` | *number* | Offset in `data` at which the frame begins.   |
`readHeader` | *boolean* | Whether or not to read the reader into the current instance.   |
`version` | *number* | Version of the ID3v2 tag the data was encoded with    |

**Returns:** *void*

Inherited from: [Id3v2Frame](id3v2frame.md)

___

### correctEncoding

▸ `Protected` `Static`**correctEncoding**(`type`: [*StringType*](../enums/stringtype.md), `version`: *number*): [*StringType*](../enums/stringtype.md)

Converts an encoding to be a supported encoding for a specified tag version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`type` | [*StringType*](../enums/stringtype.md) | Value containing the original encoding   |
`version` | *number* | Value containing the ID3v2 version to be encoded.   |

**Returns:** [*StringType*](../enums/stringtype.md)

StringType Value containing the correct encoding to use, based on
    [Id3v2Settings.forceDefaultEncoding](id3v2settings.md#forcedefaultencoding) and what is supported by
    `version`

Inherited from: [Id3v2Frame](id3v2frame.md)

___

### find

▸ `Static`**find**(`frames`: [*Id3v2Synchronized*](id3v2synchronized.md)[], `description`: *string*, `textType`: [*Id3v2SynchronizedTextType*](../enums/id3v2synchronizedtexttype.md), `language?`: *string*): [*Id3v2Synchronized*](id3v2synchronized.md)

Gets a specified lyrics frame from a list of synchronized lyrics frames

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`frames` | [*Id3v2Synchronized*](id3v2synchronized.md)[] | List of frames to search   |
`description` | *string* | Description to match   |
`textType` | [*Id3v2SynchronizedTextType*](../enums/id3v2synchronizedtexttype.md) | Text type to match   |
`language?` | *string* | Optionally, ISO-639-2 language code to match   |

**Returns:** [*Id3v2Synchronized*](id3v2synchronized.md)

SynchronizedLyricsFrame Frame containing the matching user, `undefined` if a match
    was not found

___

### findPreferred

▸ `Static`**findPreferred**(`frames`: [*Id3v2Synchronized*](id3v2synchronized.md)[], `description`: *string*, `language`: *string*, `textType`: [*Id3v2SynchronizedTextType*](../enums/id3v2synchronizedtexttype.md)): [*Id3v2Synchronized*](id3v2synchronized.md)

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
`frames` | [*Id3v2Synchronized*](id3v2synchronized.md)[] | List of frames to search for the best match   |
`description` | *string* | Description to match   |
`language` | *string* | ISO-639-2 language code to match   |
`textType` | [*Id3v2SynchronizedTextType*](../enums/id3v2synchronizedtexttype.md) | Text type to match   |

**Returns:** [*Id3v2Synchronized*](id3v2synchronized.md)

SynchronizedLyricsFrame The matching frame or `undefined` if a match was not found

___

### fromInfo

▸ `Static`**fromInfo**(`description`: *string*, `language`: *string*, `textType`: [*Id3v2SynchronizedTextType*](../enums/id3v2synchronizedtexttype.md), `encoding?`: [*StringType*](../enums/stringtype.md)): [*Id3v2Synchronized*](id3v2synchronized.md)

Constructs and initializes a new instance with a specified description, ISO-639-2 language
code, text type, and text encoding.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`description` | *string* | - | Description of the synchronized lyrics frame   |
`language` | *string* | - | ISO-639-2 language code of the new instance   |
`textType` | [*Id3v2SynchronizedTextType*](../enums/id3v2synchronizedtexttype.md) | - | Type of the text to store in the new instance   |
`encoding` | [*StringType*](../enums/stringtype.md) | ... | Encoding to use when rendering text in this new instance    |

**Returns:** [*Id3v2Synchronized*](id3v2synchronized.md)

___

### fromOffsetRawData

▸ `Static`**fromOffsetRawData**(`data`: [*ByteVector*](bytevector.md), `offset`: *number*, `header`: [*Id3v2FrameHeader*](id3v2frameheader.md), `version`: *number*): [*Id3v2Synchronized*](id3v2synchronized.md)

Constructs and initializes a new instance by reading its raw data in a specified ID3v2
format.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [*ByteVector*](bytevector.md) | Raw representation of the new instance   |
`offset` | *number* | Offset into `data` where the frame begins. Must be unsigned, safe     integer   |
`header` | [*Id3v2FrameHeader*](id3v2frameheader.md) | Header of the frame found at `offset` in `data`   |
`version` | *number* | ID3v2 version the frame was originally encoded with    |

**Returns:** [*Id3v2Synchronized*](id3v2synchronized.md)

___

### fromRawData

▸ `Static`**fromRawData**(`data`: [*ByteVector*](bytevector.md), `version`: *number*): [*Id3v2Synchronized*](id3v2synchronized.md)

Constructs and initializes a new instance by reading its raw data in a specified ID3v2
format.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [*ByteVector*](bytevector.md) | Raw representation of the new instance   |
`version` | *number* | ID3v2 version the raw frame is encoded with. Must be unsigned 8-bit integer.    |

**Returns:** [*Id3v2Synchronized*](id3v2synchronized.md)
