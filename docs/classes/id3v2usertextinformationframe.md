[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2UserTextInformationFrame

# Class: Id3v2UserTextInformationFrame

## Hierarchy

* [*Id3v2TextInformationFrame*](id3v2textinformationframe.md)

  ↳ **Id3v2UserTextInformationFrame**

## Table of contents

### Properties

- [\_encoding](id3v2usertextinformationframe.md#_encoding)
- [\_header](id3v2usertextinformationframe.md#_header)
- [\_rawData](id3v2usertextinformationframe.md#_rawdata)
- [\_rawVersion](id3v2usertextinformationframe.md#_rawversion)
- [\_textFields](id3v2usertextinformationframe.md#_textfields)

### Accessors

- [description](id3v2usertextinformationframe.md#description)
- [encryptionId](id3v2usertextinformationframe.md#encryptionid)
- [flags](id3v2usertextinformationframe.md#flags)
- [frameClassType](id3v2usertextinformationframe.md#frameclasstype)
- [frameId](id3v2usertextinformationframe.md#frameid)
- [groupId](id3v2usertextinformationframe.md#groupid)
- [size](id3v2usertextinformationframe.md#size)
- [text](id3v2usertextinformationframe.md#text)
- [textEncoding](id3v2usertextinformationframe.md#textencoding)

### Methods

- [clone](id3v2usertextinformationframe.md#clone)
- [fieldData](id3v2usertextinformationframe.md#fielddata)
- [parseFields](id3v2usertextinformationframe.md#parsefields)
- [parseRawData](id3v2usertextinformationframe.md#parserawdata)
- [render](id3v2usertextinformationframe.md#render)
- [renderFields](id3v2usertextinformationframe.md#renderfields)
- [setData](id3v2usertextinformationframe.md#setdata)
- [toString](id3v2usertextinformationframe.md#tostring)
- [correctEncoding](id3v2usertextinformationframe.md#correctencoding)
- [findTextInformationFrame](id3v2usertextinformationframe.md#findtextinformationframe)
- [findUserTextInformationFrame](id3v2usertextinformationframe.md#findusertextinformationframe)
- [fromDescription](id3v2usertextinformationframe.md#fromdescription)
- [fromIdentifier](id3v2usertextinformationframe.md#fromidentifier)
- [fromOffsetRawData](id3v2usertextinformationframe.md#fromoffsetrawdata)
- [fromRawData](id3v2usertextinformationframe.md#fromrawdata)

## Properties

### \_encoding

• `Protected` **\_encoding**: [*StringType*](../enums/stringtype.md)

Inherited from: [Id3v2TextInformationFrame](id3v2textinformationframe.md).[_encoding](id3v2textinformationframe.md#_encoding)

___

### \_header

• `Protected` **\_header**: [*Id3v2FrameHeader*](id3v2frameheader.md)

Inherited from: [Id3v2TextInformationFrame](id3v2textinformationframe.md).[_header](id3v2textinformationframe.md#_header)

___

### \_rawData

• `Protected` **\_rawData**: [*ByteVector*](bytevector.md)

Inherited from: [Id3v2TextInformationFrame](id3v2textinformationframe.md).[_rawData](id3v2textinformationframe.md#_rawdata)

___

### \_rawVersion

• `Protected` **\_rawVersion**: *number*

Inherited from: [Id3v2TextInformationFrame](id3v2textinformationframe.md).[_rawVersion](id3v2textinformationframe.md#_rawversion)

___

### \_textFields

• `Protected` **\_textFields**: *string*[]

Inherited from: [Id3v2TextInformationFrame](id3v2textinformationframe.md).[_textFields](id3v2textinformationframe.md#_textfields)

## Accessors

### description

• **description**(): *string*

Gets the description stored in the current instance.

**Returns:** *string*

• **description**(`value`: *string*): *void*

Sets the description stored in the current instance.
There should only be one frame with the specified description per tag.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | *string* | Description to store in the current instance.    |

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
[Id3v2FrameFlags.Compression](../enums/id3v2frameflags.md#compression), [render](id3v2usertextinformationframe.md#render) will throw.

#### Parameters:

Name | Type |
------ | ------ |
`value` | [*Id3v2FrameFlags*](../enums/id3v2frameflags.md) |

**Returns:** *void*

___

### frameClassType

• **frameClassType**(): [*Id3v2FrameClassType*](../enums/id3v2frameclasstype.md)

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

### size

• **size**(): *number*

Gets the size of the current instance as it was last stored on disk.
NOTE: This value is not used outside of reading a frame from disk, so newly created frames
    should not have this value set.

**Returns:** *number*

___

### text

• **text**(): *string*[]

Gets the text contained in the current instance.
NOTE: Modifying the contents of the returned value will not modify the contents of the
current instance. The value must be reassigned for the value to change.

**Returns:** *string*[]

• **text**(`value`: *string*[]): *void*

Sets the text contained in the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | *string*[] | Array of text values to store in the current instance    |

**Returns:** *void*

___

### textEncoding

• **textEncoding**(): [*StringType*](../enums/stringtype.md)

Gets the text encoding to use when rendering the current instance.

**Returns:** [*StringType*](../enums/stringtype.md)

• **textEncoding**(`value`: [*StringType*](../enums/stringtype.md)): *void*

Sets the text encoding to use when rendering the current instance.
This value will be overridden if [Id3v2Settings.forceDefaultEncoding](id3v2settings.md#forcedefaultencoding) is `true`.

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

Overrides: [Id3v2TextInformationFrame](id3v2textinformationframe.md)

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

Inherited from: [Id3v2TextInformationFrame](id3v2textinformationframe.md)

___

### parseFields

▸ `Protected`**parseFields**(`data`: [*ByteVector*](bytevector.md), `version`: *number*): *void*

**`inheritdoc`** 

#### Parameters:

Name | Type |
------ | ------ |
`data` | [*ByteVector*](bytevector.md) |
`version` | *number* |

**Returns:** *void*

Inherited from: [Id3v2TextInformationFrame](id3v2textinformationframe.md)

___

### parseRawData

▸ `Protected`**parseRawData**(): *void*

Performs the actual parsing of the raw data.
Because of the high parsing cost and relatively low usage of the class [parseFields](id3v2usertextinformationframe.md#parsefields)
only stores the field data so it can be parsed on demand. Whenever a property or method is
called which requires the data, this method is called, and only on the first call does it
actually parse the data.

**Returns:** *void*

Inherited from: [Id3v2TextInformationFrame](id3v2textinformationframe.md)

___

### render

▸ **render**(`version`: *number*): [*ByteVector*](bytevector.md)

Renders the current instance, encoded in a specified ID3v2 version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`version` | *number* | ID3v2 version to use when encoding the current instance. Must be a positive     8-bit integer.   |

**Returns:** [*ByteVector*](bytevector.md)

ByteVector Rendered version of the current instance.

Inherited from: [Id3v2TextInformationFrame](id3v2textinformationframe.md)

___

### renderFields

▸ `Protected`**renderFields**(`version`: *number*): [*ByteVector*](bytevector.md)

**`inheritdoc`** 

#### Parameters:

Name | Type |
------ | ------ |
`version` | *number* |

**Returns:** [*ByteVector*](bytevector.md)

Inherited from: [Id3v2TextInformationFrame](id3v2textinformationframe.md)

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

Inherited from: [Id3v2TextInformationFrame](id3v2textinformationframe.md)

___

### toString

▸ **toString**(): *string*

**`inheritdoc`** 

**Returns:** *string*

Overrides: [Id3v2TextInformationFrame](id3v2textinformationframe.md)

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

Inherited from: [Id3v2TextInformationFrame](id3v2textinformationframe.md)

___

### findTextInformationFrame

▸ `Static`**findTextInformationFrame**(`frames`: [*Id3v2TextInformationFrame*](id3v2textinformationframe.md)[], `ident`: [*Id3v2FrameIdentifier*](id3v2frameidentifier.md)): [*Id3v2TextInformationFrame*](id3v2textinformationframe.md)

Gets a [TextInformationFrame](../enums/id3v2frameclasstype.md#textinformationframe) object of a specified type from a specified type from a
list of text information frames.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`frames` | [*Id3v2TextInformationFrame*](id3v2textinformationframe.md)[] | List of frames to search   |
`ident` | [*Id3v2FrameIdentifier*](id3v2frameidentifier.md) | Frame identifier to search for   |

**Returns:** [*Id3v2TextInformationFrame*](id3v2textinformationframe.md)

TextInformationFrame Matching frame if it exists in `tag`, `undefined` if
    a matching frame was not found

Inherited from: [Id3v2TextInformationFrame](id3v2textinformationframe.md)

___

### findUserTextInformationFrame

▸ `Static`**findUserTextInformationFrame**(`frames`: [*Id3v2UserTextInformationFrame*](id3v2usertextinformationframe.md)[], `description`: *string*, `caseSensitive?`: *boolean*): [*Id3v2UserTextInformationFrame*](id3v2usertextinformationframe.md)

Gets a user text information frame from a specified tag

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`frames` | [*Id3v2UserTextInformationFrame*](id3v2usertextinformationframe.md)[] | - | Object to search in   |
`description` | *string* | - | Description to use to match the frame in the `tag`   |
`caseSensitive` | *boolean* | true | Whether or not to search for the frame case-sensitively.   |

**Returns:** [*Id3v2UserTextInformationFrame*](id3v2usertextinformationframe.md)

UserTextInformationFrame Frame containing the matching user, `undefined` if a match
    was not found

___

### fromDescription

▸ `Static`**fromDescription**(`description`: *string*, `encoding?`: [*StringType*](../enums/stringtype.md)): [*Id3v2UserTextInformationFrame*](id3v2usertextinformationframe.md)

Constructs and initializes a new instance with a specified description and text encoding.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`description` | *string* | - | Description of the new frame   |
`encoding` | [*StringType*](../enums/stringtype.md) | ... | Text encoding to use when rendering the new frame    |

**Returns:** [*Id3v2UserTextInformationFrame*](id3v2usertextinformationframe.md)

___

### fromIdentifier

▸ `Static`**fromIdentifier**(`identifier`: [*Id3v2FrameIdentifier*](id3v2frameidentifier.md), `encoding?`: [*StringType*](../enums/stringtype.md)): [*Id3v2TextInformationFrame*](id3v2textinformationframe.md)

Constructs and initializes a new instance with a specified identifier

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`identifier` | [*Id3v2FrameIdentifier*](id3v2frameidentifier.md) | - | Byte vector containing the identifier for the frame   |
`encoding` | [*StringType*](../enums/stringtype.md) | ... | Optionally, the encoding to use for the new instance. If omitted, defaults     to [Id3v2Settings.defaultEncoding](id3v2settings.md#defaultencoding)    |

**Returns:** [*Id3v2TextInformationFrame*](id3v2textinformationframe.md)

Inherited from: [Id3v2TextInformationFrame](id3v2textinformationframe.md)

___

### fromOffsetRawData

▸ `Static`**fromOffsetRawData**(`data`: [*ByteVector*](bytevector.md), `offset`: *number*, `header`: [*Id3v2FrameHeader*](id3v2frameheader.md), `version`: *number*): [*Id3v2UserTextInformationFrame*](id3v2usertextinformationframe.md)

Constructs and initializes a new instance by reading its raw data in a specified ID3v2
version. This method allows for offset reading from the data byte vector.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [*ByteVector*](bytevector.md) | Raw representation of the new frame   |
`offset` | *number* | What offset in `data` the frame actually begins. Must be positive,     safe integer   |
`header` | [*Id3v2FrameHeader*](id3v2frameheader.md) | Header of the frame found at `data` in the data   |
`version` | *number* | ID3v2 version the frame was originally encoded with    |

**Returns:** [*Id3v2UserTextInformationFrame*](id3v2usertextinformationframe.md)

Overrides: [Id3v2TextInformationFrame](id3v2textinformationframe.md)

___

### fromRawData

▸ `Static`**fromRawData**(`data`: [*ByteVector*](bytevector.md), `version`: *number*): [*Id3v2UserTextInformationFrame*](id3v2usertextinformationframe.md)

Constructs and initializes a new instance by reading its raw data in a specified
ID3v2 version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [*ByteVector*](bytevector.md) | Raw representation of the new frame   |
`version` | *number* | ID3v2 version the raw frame is encoded with, must be a positive 8-bit integer    |

**Returns:** [*Id3v2UserTextInformationFrame*](id3v2usertextinformationframe.md)

Overrides: [Id3v2TextInformationFrame](id3v2textinformationframe.md)
