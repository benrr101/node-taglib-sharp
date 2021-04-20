[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2UnsynchronizedFrame

# Class: Id3v2UnsynchronizedFrame

## Hierarchy

* [*Id3v2Frame*](id3v2frame.md)

  ↳ **Id3v2UnsynchronizedFrame**

## Table of contents

### Properties

- [\_header](id3v2unsynchronizedframe.md#_header)

### Accessors

- [description](id3v2unsynchronizedframe.md#description)
- [encryptionId](id3v2unsynchronizedframe.md#encryptionid)
- [flags](id3v2unsynchronizedframe.md#flags)
- [frameClassType](id3v2unsynchronizedframe.md#frameclasstype)
- [frameId](id3v2unsynchronizedframe.md#frameid)
- [groupId](id3v2unsynchronizedframe.md#groupid)
- [language](id3v2unsynchronizedframe.md#language)
- [size](id3v2unsynchronizedframe.md#size)
- [text](id3v2unsynchronizedframe.md#text)
- [textEncoding](id3v2unsynchronizedframe.md#textencoding)

### Methods

- [clone](id3v2unsynchronizedframe.md#clone)
- [fieldData](id3v2unsynchronizedframe.md#fielddata)
- [parseFields](id3v2unsynchronizedframe.md#parsefields)
- [render](id3v2unsynchronizedframe.md#render)
- [renderFields](id3v2unsynchronizedframe.md#renderfields)
- [setData](id3v2unsynchronizedframe.md#setdata)
- [toString](id3v2unsynchronizedframe.md#tostring)
- [correctEncoding](id3v2unsynchronizedframe.md#correctencoding)
- [find](id3v2unsynchronizedframe.md#find)
- [findAll](id3v2unsynchronizedframe.md#findall)
- [findPreferred](id3v2unsynchronizedframe.md#findpreferred)
- [fromData](id3v2unsynchronizedframe.md#fromdata)
- [fromOffsetRawData](id3v2unsynchronizedframe.md#fromoffsetrawdata)
- [fromRawData](id3v2unsynchronizedframe.md#fromrawdata)

## Properties

### \_header

• `Protected` **\_header**: [*Id3v2FrameHeader*](id3v2frameheader.md)

Inherited from: [Id3v2Frame](id3v2frame.md).[_header](id3v2frame.md#_header)

## Accessors

### description

• **description**(): *string*

Gets the description of the contents of the current instance.

**Returns:** *string*

• **description**(`value`: *string*): *void*

Sets the description of the contents of the current instance.
There should only be one frame with a this description and ISO-639-2 code per tag.

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string* |

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
[Id3v2FrameFlags.Compression](../enums/id3v2frameflags.md#compression), [render](id3v2unsynchronizedframe.md#render) will throw.

#### Parameters:

Name | Type |
------ | ------ |
`value` | [*Id3v2FrameFlags*](../enums/id3v2frameflags.md) |

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

Gets the ISO-639-2 language code for the contents of this instance.

**Returns:** *string*

• **language**(`value`: *string*): *void*

Sets the ISO-639-2 language code for the contents of this instance.

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string* |

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

• **text**(): *string*

Gets the text stored in the current instance.

**Returns:** *string*

• **text**(`value`: *string*): *void*

Sets the text stored in the current instance.

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string* |

**Returns:** *void*

___

### textEncoding

• **textEncoding**(): [*StringType*](../enums/stringtype.md)

Gets the text encoding to use when storing the current instance.

**Returns:** [*StringType*](../enums/stringtype.md)

• **textEncoding**(`value`: [*StringType*](../enums/stringtype.md)): *void*

Sets the text encoding to use when storing the current instance.

#### Parameters:

Name | Type |
------ | ------ |
`value` | [*StringType*](../enums/stringtype.md) |

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

### toString

▸ **toString**(): *string*

**Returns:** *string*

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

▸ `Static`**find**(`frames`: [*Id3v2UnsynchronizedFrame*](id3v2unsynchronizedframe.md)[], `description`: *string*, `language`: *string*): [*Id3v2UnsynchronizedFrame*](id3v2unsynchronizedframe.md)

Gets the first unsynchronized lyrics frame from a list of frames that matches the provided
parameters.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`frames` | [*Id3v2UnsynchronizedFrame*](id3v2unsynchronizedframe.md)[] | List of frames to search   |
`description` | *string* | Description to match   |
`language` | *string* | Optionally, ISO-639-2 language code to match   |

**Returns:** [*Id3v2UnsynchronizedFrame*](id3v2unsynchronizedframe.md)

UnsynchronizedLyricsFrame Frame that matches provided parameters, `undefined` if a
    match was not found

___

### findAll

▸ `Static`**findAll**(`frames`: [*Id3v2UnsynchronizedFrame*](id3v2unsynchronizedframe.md)[], `description`: *string*, `language`: *string*): [*Id3v2UnsynchronizedFrame*](id3v2unsynchronizedframe.md)[]

Gets all unsynchronized lyrics frames that match the provided parameters from a list of
frames

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`frames` | [*Id3v2UnsynchronizedFrame*](id3v2unsynchronizedframe.md)[] | List of frames to search   |
`description` | *string* | Description to match   |
`language` | *string* | Optionally, ISO-639-2 language code to match   |

**Returns:** [*Id3v2UnsynchronizedFrame*](id3v2unsynchronizedframe.md)[]

UnsynchronizedLyricsFrame[] List of frames matching provided parameters, empty
    array if no matches were found

___

### findPreferred

▸ `Static`**findPreferred**(`frames`: [*Id3v2UnsynchronizedFrame*](id3v2unsynchronizedframe.md)[], `description`: *string*, `language`: *string*): [*Id3v2UnsynchronizedFrame*](id3v2unsynchronizedframe.md)

Gets a specified unsynchronized frame from the list of frames, trying to match the
description and language but, failing a perfect match, accepting an incomplete match.
The method tries matching with the following order of precedence:
* First frame with a matching description and language
* First frame with a matching language
* First frame with a matching description
* First frame

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`frames` | [*Id3v2UnsynchronizedFrame*](id3v2unsynchronizedframe.md)[] | List of frames to search   |
`description` | *string* | Description to match   |
`language` | *string* | ISO-639-2 language code to match    |

**Returns:** [*Id3v2UnsynchronizedFrame*](id3v2unsynchronizedframe.md)

___

### fromData

▸ `Static`**fromData**(`description`: *string*, `language?`: *string*, `encoding?`: [*StringType*](../enums/stringtype.md)): [*Id3v2UnsynchronizedFrame*](id3v2unsynchronizedframe.md)

Constructs and initializes a new instance from the provided data

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`description` | *string* | - | Description of the frame   |
`language?` | *string* | - | ISO-639-2 language code for the content of the frame   |
`encoding` | [*StringType*](../enums/stringtype.md) | ... | Encoding to use when storing the content of the frame    |

**Returns:** [*Id3v2UnsynchronizedFrame*](id3v2unsynchronizedframe.md)

___

### fromOffsetRawData

▸ `Static`**fromOffsetRawData**(`data`: [*ByteVector*](bytevector.md), `offset`: *number*, `header`: [*Id3v2FrameHeader*](id3v2frameheader.md), `version`: *number*): [*Id3v2UnsynchronizedFrame*](id3v2unsynchronizedframe.md)

Constructs and initializes a new instance by reading its raw data in a specified ID3v2
version. This method allows for offset reading from the data byte vector.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [*ByteVector*](bytevector.md) | Raw representation of the new frame   |
`offset` | *number* | What offset in `data` the frame actually begins. Must be positive,     safe integer   |
`header` | [*Id3v2FrameHeader*](id3v2frameheader.md) | Header of the frame found at `data` in the data   |
`version` | *number* | ID3v2 version the frame was originally encoded with    |

**Returns:** [*Id3v2UnsynchronizedFrame*](id3v2unsynchronizedframe.md)

___

### fromRawData

▸ `Static`**fromRawData**(`data`: [*ByteVector*](bytevector.md), `version`: *number*): [*Id3v2UnsynchronizedFrame*](id3v2unsynchronizedframe.md)

Constructs and initializes a new instance by reading its raw data in a specified
ID3v2 version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [*ByteVector*](bytevector.md) | Raw representation of the new frame   |
`version` | *number* | ID3v2 version the raw frame is encoded with, must be a positive 8-bit integer    |

**Returns:** [*Id3v2UnsynchronizedFrame*](id3v2unsynchronizedframe.md)
