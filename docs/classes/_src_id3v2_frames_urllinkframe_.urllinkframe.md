**[node-taglib-sharp](../README.md)**

> [Globals](../globals.md) / ["src/id3v2/frames/urlLinkFrame"](../modules/_src_id3v2_frames_urllinkframe_.md) / UrlLinkFrame

# Class: UrlLinkFrame

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

* [Frame](_src_id3v2_frames_frame_.frame.md)

  ↳ **UrlLinkFrame**

  ↳↳ [UserUrlLinkFrame](_src_id3v2_frames_urllinkframe_.userurllinkframe.md)

## Index

### Constructors

* [constructor](_src_id3v2_frames_urllinkframe_.urllinkframe.md#constructor)

### Properties

* [\_encoding](_src_id3v2_frames_urllinkframe_.urllinkframe.md#_encoding)
* [\_header](_src_id3v2_frames_urllinkframe_.urllinkframe.md#_header)
* [\_rawData](_src_id3v2_frames_urllinkframe_.urllinkframe.md#_rawdata)
* [\_rawVersion](_src_id3v2_frames_urllinkframe_.urllinkframe.md#_rawversion)
* [\_textFields](_src_id3v2_frames_urllinkframe_.urllinkframe.md#_textfields)

### Accessors

* [encryptionId](_src_id3v2_frames_urllinkframe_.urllinkframe.md#encryptionid)
* [flags](_src_id3v2_frames_urllinkframe_.urllinkframe.md#flags)
* [frameClassType](_src_id3v2_frames_urllinkframe_.urllinkframe.md#frameclasstype)
* [frameId](_src_id3v2_frames_urllinkframe_.urllinkframe.md#frameid)
* [groupId](_src_id3v2_frames_urllinkframe_.urllinkframe.md#groupid)
* [size](_src_id3v2_frames_urllinkframe_.urllinkframe.md#size)
* [text](_src_id3v2_frames_urllinkframe_.urllinkframe.md#text)
* [textEncoding](_src_id3v2_frames_urllinkframe_.urllinkframe.md#textencoding)

### Methods

* [clone](_src_id3v2_frames_urllinkframe_.urllinkframe.md#clone)
* [fieldData](_src_id3v2_frames_urllinkframe_.urllinkframe.md#fielddata)
* [parseFields](_src_id3v2_frames_urllinkframe_.urllinkframe.md#parsefields)
* [parseRawData](_src_id3v2_frames_urllinkframe_.urllinkframe.md#parserawdata)
* [render](_src_id3v2_frames_urllinkframe_.urllinkframe.md#render)
* [renderFields](_src_id3v2_frames_urllinkframe_.urllinkframe.md#renderfields)
* [setData](_src_id3v2_frames_urllinkframe_.urllinkframe.md#setdata)
* [toString](_src_id3v2_frames_urllinkframe_.urllinkframe.md#tostring)
* [correctEncoding](_src_id3v2_frames_urllinkframe_.urllinkframe.md#correctencoding)
* [findUrlLinkFrame](_src_id3v2_frames_urllinkframe_.urllinkframe.md#findurllinkframe)
* [fromIdentity](_src_id3v2_frames_urllinkframe_.urllinkframe.md#fromidentity)
* [fromOffsetRawData](_src_id3v2_frames_urllinkframe_.urllinkframe.md#fromoffsetrawdata)
* [fromRawData](_src_id3v2_frames_urllinkframe_.urllinkframe.md#fromrawdata)

## Constructors

### constructor

\+ `Protected`**new UrlLinkFrame**(`header`: [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md)): [UrlLinkFrame](_src_id3v2_frames_urllinkframe_.urllinkframe.md)

*Overrides [Frame](_src_id3v2_frames_frame_.frame.md).[constructor](_src_id3v2_frames_frame_.frame.md#constructor)*

#### Parameters:

Name | Type |
------ | ------ |
`header` | [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md) |

**Returns:** [UrlLinkFrame](_src_id3v2_frames_urllinkframe_.urllinkframe.md)

## Properties

### \_encoding

• `Protected` **\_encoding**: [StringType](../enums/_src_bytevector_.stringtype.md) = StringType.Latin1

___

### \_header

• `Protected` **\_header**: [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md)

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[_header](_src_id3v2_frames_frame_.frame.md#_header)*

___

### \_rawData

• `Protected` **\_rawData**: [ByteVector](_src_bytevector_.bytevector.md)

___

### \_rawVersion

• `Protected` **\_rawVersion**: number

___

### \_textFields

• `Protected` **\_textFields**: string[] = []

## Accessors

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
[Id3v2FrameFlags.Compression](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md#compression), [render](_src_id3v2_frames_urllinkframe_.urllinkframe.md#render) will throw.

#### Parameters:

Name | Type |
------ | ------ |
`value` | [Id3v2FrameFlags](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md) |

**Returns:** void

___

### frameClassType

• get **frameClassType**(): [FrameClassType](../enums/_src_id3v2_frames_frame_.frameclasstype.md)

*Overrides [Frame](_src_id3v2_frames_frame_.frame.md).[frameClassType](_src_id3v2_frames_frame_.frame.md#frameclasstype)*

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

### size

• get **size**(): number

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[size](_src_id3v2_frames_frame_.frame.md#size)*

Gets the size of the current instance as it was last stored on disk.
NOTE: This value is not used outside of reading a frame from disk, so newly created frames
    should not have this value set.

**Returns:** number

___

### text

• get **text**(): string[]

Gets the text contained in the current instance.
Modifying the contents of the returned value will not modify the contents of the current
instance. The value must be reassigned for the value to change.

**Returns:** string[]

• set **text**(`value`: string[]): void

Sets the text contained in the current instance.

#### Parameters:

Name | Type |
------ | ------ |
`value` | string[] |

**Returns:** void

___

### textEncoding

• get **textEncoding**(): [StringType](../enums/_src_bytevector_.stringtype.md)

Gets the text encoding to use when rendering the current instance.

**Returns:** [StringType](../enums/_src_bytevector_.stringtype.md)

• set **textEncoding**(`value`: [StringType](../enums/_src_bytevector_.stringtype.md)): void

Sets the text encoding to use when rendering the current instance.
NOTE: This value will be overwritten if [Id3v2Settings.forceDefaultEncoding](_src_id3v2_id3v2settings_.id3v2settings.md#forcedefaultencoding) is `true`.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | [StringType](../enums/_src_bytevector_.stringtype.md) |   |

**Returns:** void

## Methods

### clone

▸ **clone**(): [UrlLinkFrame](_src_id3v2_frames_urllinkframe_.urllinkframe.md)

*Overrides [Frame](_src_id3v2_frames_frame_.frame.md).[clone](_src_id3v2_frames_frame_.frame.md#clone)*

**`inheritdoc`** 

**Returns:** [UrlLinkFrame](_src_id3v2_frames_urllinkframe_.urllinkframe.md)

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

▸ `Protected`**parseFields**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `version`: number): void

*Overrides [Frame](_src_id3v2_frames_frame_.frame.md).[parseFields](_src_id3v2_frames_frame_.frame.md#parsefields)*

**`inheritdoc`** 

#### Parameters:

Name | Type |
------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) |
`version` | number |

**Returns:** void

___

### parseRawData

▸ `Protected`**parseRawData**(): void

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

### toString

▸ **toString**(): string

**`inheritdoc`** 

**Returns:** string

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

### findUrlLinkFrame

▸ `Static`**findUrlLinkFrame**(`frames`: [UrlLinkFrame](_src_id3v2_frames_urllinkframe_.urllinkframe.md)[], `ident`: [FrameIdentifier](_src_id3v2_frameidentifiers_.frameidentifier.md)): [UrlLinkFrame](_src_id3v2_frames_urllinkframe_.urllinkframe.md)

Gets the first frame that matches the provided type

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`frames` | [UrlLinkFrame](_src_id3v2_frames_urllinkframe_.urllinkframe.md)[] | Object to search in |
`ident` | [FrameIdentifier](_src_id3v2_frameidentifiers_.frameidentifier.md) | Frame identifier to search for |

**Returns:** [UrlLinkFrame](_src_id3v2_frames_urllinkframe_.urllinkframe.md)

UrlLinkFrame Frame containing the matching frameId, `undefined` if a match was
    not found

___

### fromIdentity

▸ `Static`**fromIdentity**(`ident`: [FrameIdentifier](_src_id3v2_frameidentifiers_.frameidentifier.md)): [UrlLinkFrame](_src_id3v2_frames_urllinkframe_.urllinkframe.md)

Constructs and initializes an empty frame with the provided frame identity

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`ident` | [FrameIdentifier](_src_id3v2_frameidentifiers_.frameidentifier.md) | Identity of the frame to construct  |

**Returns:** [UrlLinkFrame](_src_id3v2_frames_urllinkframe_.urllinkframe.md)

___

### fromOffsetRawData

▸ `Static`**fromOffsetRawData**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `offset`: number, `header`: [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md), `version`: number): [UrlLinkFrame](_src_id3v2_frames_urllinkframe_.urllinkframe.md)

Constructs and initializes a new instance by reading its raw data in a specified ID3v2
version. This method allows for offset reading from the data bytevector.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | Raw representation of the new frame |
`offset` | number | What offset in `data` the frame actually begins. Must be positive,     safe integer |
`header` | [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md) | Header of the frame found at `data` in the data |
`version` | number | ID3v2 version the frame was originally encoded with  |

**Returns:** [UrlLinkFrame](_src_id3v2_frames_urllinkframe_.urllinkframe.md)

___

### fromRawData

▸ `Static`**fromRawData**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `version`: number): [UrlLinkFrame](_src_id3v2_frames_urllinkframe_.urllinkframe.md)

Constructs and initializes a new instance by reading its raw data in a specified
ID3v2 version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | Raw representation of the new frame |
`version` | number | ID3v2 version the raw frame is encoded with, must be a positive 8-bit integer  |

**Returns:** [UrlLinkFrame](_src_id3v2_frames_urllinkframe_.urllinkframe.md)
