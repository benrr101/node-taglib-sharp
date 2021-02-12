[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2UrlLinkFrame

# Class: Id3v2UrlLinkFrame

Provides ID3v2 URL Link frame implementation (section 4.3.1) covering `W000` to `WZZZ`,
excluding `WXXX`.
With these frames dynamic data such as webpages with touring information, price information,
or plain ordinary news can be added to the tag. There may only be one URL link frame of its kind
in a tag, except when stated otherwise in the frame description. If the text string is followed
by a string termination, all the following information should be ignored and not be displayed.
The following table contains the types and descriptions as found in the ID3 2.4.0 native frames
specification.
* WCOM - The 'Commercial Information' frame is a URL pointing at a webpage with information
  such as where the album can be bought. There may be more than one WCOM frame per tag, but not
  with the same content.
* WCOP - The 'Copyright/Legal information' frame is a URL pointing at a webpage where the terms
  of use and ownership of the field is described.
* WOAF - The 'Official audio file webpage' frame is a URL pointing at a file specific webpage.
* WOAR - The 'Official artist/performer webpage' frame is a URL pointing at the artists'
  official webpage. There may be more than one WOAR frame in a tag if the audio contains more
  than one performer, but not with the same content.
* WOAS - THe 'Official audio source webpage' frame is a URL pointing at the official webpage of
  the source of the audio file, eg. a movie.
* WORS - The 'Official internet radio station homepage' frame contains a URL pointing at the
  homepage of the internet radio station.
* WPAY - The 'Payment' frame is a URL pointing at a webpage that will handle the process of
  paying for this file.
* WPUB - The 'Publisher's official webpage' frame is a URL pointing at the official webpage
  for the publisher.

## Hierarchy

* [*Id3v2Frame*](id3v2frame.md)

  ↳ **Id3v2UrlLinkFrame**

  ↳↳ [*Id3v2UserUrlLinkFrame*](id3v2userurllinkframe.md)

## Table of contents

### Constructors

- [constructor](id3v2urllinkframe.md#constructor)

### Properties

- [\_encoding](id3v2urllinkframe.md#_encoding)
- [\_header](id3v2urllinkframe.md#_header)
- [\_rawData](id3v2urllinkframe.md#_rawdata)
- [\_rawVersion](id3v2urllinkframe.md#_rawversion)
- [\_textFields](id3v2urllinkframe.md#_textfields)

### Accessors

- [encryptionId](id3v2urllinkframe.md#encryptionid)
- [flags](id3v2urllinkframe.md#flags)
- [frameClassType](id3v2urllinkframe.md#frameclasstype)
- [frameId](id3v2urllinkframe.md#frameid)
- [groupId](id3v2urllinkframe.md#groupid)
- [size](id3v2urllinkframe.md#size)
- [text](id3v2urllinkframe.md#text)
- [textEncoding](id3v2urllinkframe.md#textencoding)

### Methods

- [clone](id3v2urllinkframe.md#clone)
- [fieldData](id3v2urllinkframe.md#fielddata)
- [parseFields](id3v2urllinkframe.md#parsefields)
- [parseRawData](id3v2urllinkframe.md#parserawdata)
- [render](id3v2urllinkframe.md#render)
- [renderFields](id3v2urllinkframe.md#renderfields)
- [setData](id3v2urllinkframe.md#setdata)
- [toString](id3v2urllinkframe.md#tostring)
- [correctEncoding](id3v2urllinkframe.md#correctencoding)
- [findUrlLinkFrame](id3v2urllinkframe.md#findurllinkframe)
- [fromIdentity](id3v2urllinkframe.md#fromidentity)
- [fromOffsetRawData](id3v2urllinkframe.md#fromoffsetrawdata)
- [fromRawData](id3v2urllinkframe.md#fromrawdata)

## Constructors

### constructor

\+ `Protected`**new Id3v2UrlLinkFrame**(`header`: [*Id3v2FrameHeader*](id3v2frameheader.md)): [*Id3v2UrlLinkFrame*](id3v2urllinkframe.md)

#### Parameters:

Name | Type |
------ | ------ |
`header` | [*Id3v2FrameHeader*](id3v2frameheader.md) |

**Returns:** [*Id3v2UrlLinkFrame*](id3v2urllinkframe.md)

Inherited from: [Id3v2Frame](id3v2frame.md)

## Properties

### \_encoding

• `Protected` **\_encoding**: [*StringType*](../enums/stringtype.md)

___

### \_header

• `Protected` **\_header**: [*Id3v2FrameHeader*](id3v2frameheader.md)

Inherited from: [Id3v2Frame](id3v2frame.md).[_header](id3v2frame.md#_header)

___

### \_rawData

• `Protected` **\_rawData**: [*ByteVector*](bytevector.md)

___

### \_rawVersion

• `Protected` **\_rawVersion**: *number*

___

### \_textFields

• `Protected` **\_textFields**: *string*[]

## Accessors

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
[Id3v2FrameFlags.Compression](../enums/id3v2frameflags.md#compression), [render](id3v2urllinkframe.md#render) will throw.

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
Modifying the contents of the returned value will not modify the contents of the current
instance. The value must be reassigned for the value to change.

**Returns:** *string*[]

• **text**(`value`: *string*[]): *void*

Sets the text contained in the current instance.

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string*[] |

**Returns:** *void*

___

### textEncoding

• **textEncoding**(): [*StringType*](../enums/stringtype.md)

Gets the text encoding to use when rendering the current instance.

**Returns:** [*StringType*](../enums/stringtype.md)

• **textEncoding**(`value`: [*StringType*](../enums/stringtype.md)): *void*

Sets the text encoding to use when rendering the current instance.
NOTE: This value will be overwritten if [Id3v2Settings.forceDefaultEncoding](id3v2settings.md#forcedefaultencoding) is `true`.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | [*StringType*](../enums/stringtype.md) |     |

**Returns:** *void*

## Methods

### clone

▸ **clone**(): [*Id3v2UrlLinkFrame*](id3v2urllinkframe.md)

**`inheritdoc`** 

**Returns:** [*Id3v2UrlLinkFrame*](id3v2urllinkframe.md)

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

▸ `Protected`**parseFields**(`data`: [*ByteVector*](bytevector.md), `version`: *number*): *void*

**`inheritdoc`** 

#### Parameters:

Name | Type |
------ | ------ |
`data` | [*ByteVector*](bytevector.md) |
`version` | *number* |

**Returns:** *void*

Overrides: [Id3v2Frame](id3v2frame.md)

___

### parseRawData

▸ `Protected`**parseRawData**(): *void*

**Returns:** *void*

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

**`inheritdoc`** 

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

### findUrlLinkFrame

▸ `Static`**findUrlLinkFrame**(`frames`: [*Id3v2UrlLinkFrame*](id3v2urllinkframe.md)[], `ident`: [*Id3v2FrameIdentifier*](id3v2frameidentifier.md)): [*Id3v2UrlLinkFrame*](id3v2urllinkframe.md)

Gets the first frame that matches the provided type

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`frames` | [*Id3v2UrlLinkFrame*](id3v2urllinkframe.md)[] | Object to search in   |
`ident` | [*Id3v2FrameIdentifier*](id3v2frameidentifier.md) | Frame identifier to search for   |

**Returns:** [*Id3v2UrlLinkFrame*](id3v2urllinkframe.md)

UrlLinkFrame Frame containing the matching frameId, `undefined` if a match was
    not found

___

### fromIdentity

▸ `Static`**fromIdentity**(`ident`: [*Id3v2FrameIdentifier*](id3v2frameidentifier.md)): [*Id3v2UrlLinkFrame*](id3v2urllinkframe.md)

Constructs and initializes an empty frame with the provided frame identity

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`ident` | [*Id3v2FrameIdentifier*](id3v2frameidentifier.md) | Identity of the frame to construct    |

**Returns:** [*Id3v2UrlLinkFrame*](id3v2urllinkframe.md)

___

### fromOffsetRawData

▸ `Static`**fromOffsetRawData**(`data`: [*ByteVector*](bytevector.md), `offset`: *number*, `header`: [*Id3v2FrameHeader*](id3v2frameheader.md), `version`: *number*): [*Id3v2UrlLinkFrame*](id3v2urllinkframe.md)

Constructs and initializes a new instance by reading its raw data in a specified ID3v2
version. This method allows for offset reading from the data bytevector.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [*ByteVector*](bytevector.md) | Raw representation of the new frame   |
`offset` | *number* | What offset in `data` the frame actually begins. Must be positive,     safe integer   |
`header` | [*Id3v2FrameHeader*](id3v2frameheader.md) | Header of the frame found at `data` in the data   |
`version` | *number* | ID3v2 version the frame was originally encoded with    |

**Returns:** [*Id3v2UrlLinkFrame*](id3v2urllinkframe.md)

___

### fromRawData

▸ `Static`**fromRawData**(`data`: [*ByteVector*](bytevector.md), `version`: *number*): [*Id3v2UrlLinkFrame*](id3v2urllinkframe.md)

Constructs and initializes a new instance by reading its raw data in a specified
ID3v2 version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [*ByteVector*](bytevector.md) | Raw representation of the new frame   |
`version` | *number* | ID3v2 version the raw frame is encoded with, must be a positive 8-bit integer    |

**Returns:** [*Id3v2UrlLinkFrame*](id3v2urllinkframe.md)
