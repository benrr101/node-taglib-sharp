**node-taglib-sharp**

> [README](../README.md) / [Globals](../globals.md) / ["src/id3v2/frames/urlLinkFrame"](../modules/_src_id3v2_frames_urllinkframe_.md) / UserUrlLinkFrame

# Class: UserUrlLinkFrame

Provides support for ID3v2 User URL Link frames (WXXX).

## Hierarchy

* [UrlLinkFrame](_src_id3v2_frames_urllinkframe_.urllinkframe.md)

  ↳ **UserUrlLinkFrame**

## Index

### Properties

* [\_encoding](_src_id3v2_frames_urllinkframe_.userurllinkframe.md#_encoding)
* [\_header](_src_id3v2_frames_urllinkframe_.userurllinkframe.md#_header)
* [\_rawData](_src_id3v2_frames_urllinkframe_.userurllinkframe.md#_rawdata)
* [\_rawVersion](_src_id3v2_frames_urllinkframe_.userurllinkframe.md#_rawversion)
* [\_textFields](_src_id3v2_frames_urllinkframe_.userurllinkframe.md#_textfields)

### Accessors

* [description](_src_id3v2_frames_urllinkframe_.userurllinkframe.md#description)
* [encryptionId](_src_id3v2_frames_urllinkframe_.userurllinkframe.md#encryptionid)
* [flags](_src_id3v2_frames_urllinkframe_.userurllinkframe.md#flags)
* [frameClassType](_src_id3v2_frames_urllinkframe_.userurllinkframe.md#frameclasstype)
* [frameId](_src_id3v2_frames_urllinkframe_.userurllinkframe.md#frameid)
* [groupId](_src_id3v2_frames_urllinkframe_.userurllinkframe.md#groupid)
* [size](_src_id3v2_frames_urllinkframe_.userurllinkframe.md#size)
* [text](_src_id3v2_frames_urllinkframe_.userurllinkframe.md#text)
* [textEncoding](_src_id3v2_frames_urllinkframe_.userurllinkframe.md#textencoding)

### Methods

* [clone](_src_id3v2_frames_urllinkframe_.userurllinkframe.md#clone)
* [fieldData](_src_id3v2_frames_urllinkframe_.userurllinkframe.md#fielddata)
* [parseFields](_src_id3v2_frames_urllinkframe_.userurllinkframe.md#parsefields)
* [parseRawData](_src_id3v2_frames_urllinkframe_.userurllinkframe.md#parserawdata)
* [render](_src_id3v2_frames_urllinkframe_.userurllinkframe.md#render)
* [renderFields](_src_id3v2_frames_urllinkframe_.userurllinkframe.md#renderfields)
* [setData](_src_id3v2_frames_urllinkframe_.userurllinkframe.md#setdata)
* [toString](_src_id3v2_frames_urllinkframe_.userurllinkframe.md#tostring)
* [correctEncoding](_src_id3v2_frames_urllinkframe_.userurllinkframe.md#correctencoding)
* [findUrlLinkFrame](_src_id3v2_frames_urllinkframe_.userurllinkframe.md#findurllinkframe)
* [findUserUrlLinkFrame](_src_id3v2_frames_urllinkframe_.userurllinkframe.md#finduserurllinkframe)
* [fromDescription](_src_id3v2_frames_urllinkframe_.userurllinkframe.md#fromdescription)
* [fromIdentity](_src_id3v2_frames_urllinkframe_.userurllinkframe.md#fromidentity)
* [fromOffsetRawData](_src_id3v2_frames_urllinkframe_.userurllinkframe.md#fromoffsetrawdata)
* [fromRawData](_src_id3v2_frames_urllinkframe_.userurllinkframe.md#fromrawdata)

## Properties

### \_encoding

• `Protected` **\_encoding**: [StringType](../enums/_src_bytevector_.stringtype.md) = StringType.Latin1

*Inherited from [UrlLinkFrame](_src_id3v2_frames_urllinkframe_.urllinkframe.md).[_encoding](_src_id3v2_frames_urllinkframe_.urllinkframe.md#_encoding)*

*Defined in src/id3v2/frames/urlLinkFrame.ts:35*

___

### \_header

• `Protected` **\_header**: [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md)

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[_header](_src_id3v2_frames_frame_.frame.md#_header)*

*Defined in src/id3v2/frames/frame.ts:33*

___

### \_rawData

• `Protected` **\_rawData**: [ByteVector](_src_bytevector_.bytevector.md)

*Inherited from [UrlLinkFrame](_src_id3v2_frames_urllinkframe_.urllinkframe.md).[_rawData](_src_id3v2_frames_urllinkframe_.urllinkframe.md#_rawdata)*

*Defined in src/id3v2/frames/urlLinkFrame.ts:36*

___

### \_rawVersion

• `Protected` **\_rawVersion**: number

*Inherited from [UrlLinkFrame](_src_id3v2_frames_urllinkframe_.urllinkframe.md).[_rawVersion](_src_id3v2_frames_urllinkframe_.urllinkframe.md#_rawversion)*

*Defined in src/id3v2/frames/urlLinkFrame.ts:37*

___

### \_textFields

• `Protected` **\_textFields**: string[] = []

*Inherited from [UrlLinkFrame](_src_id3v2_frames_urllinkframe_.urllinkframe.md).[_textFields](_src_id3v2_frames_urllinkframe_.urllinkframe.md#_textfields)*

*Defined in src/id3v2/frames/urlLinkFrame.ts:38*

## Accessors

### description

• get **description**(): string

*Defined in src/id3v2/frames/urlLinkFrame.ts:322*

Gets the description stored in the current instance.

**Returns:** string

• set **description**(`value`: string): void

*Defined in src/id3v2/frames/urlLinkFrame.ts:330*

Sets the description stored in the current instance.
There should only be one frame with a matching description per tag.

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### encryptionId

• get **encryptionId**(): number \| undefined

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[encryptionId](_src_id3v2_frames_frame_.frame.md#encryptionid)*

*Defined in src/id3v2/frames/frame.ts:55*

Gets the encryption ID applied to the current instance.

**Returns:** number \| undefined

number Value containing the encryption identifer for the current instance or
    `undefined` if not set.

• set **encryptionId**(`value`: number \| undefined): void

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[encryptionId](_src_id3v2_frames_frame_.frame.md#encryptionid)*

*Defined in src/id3v2/frames/frame.ts:65*

Sets the encryption ID applied to the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | number \| undefined | Value containing the encryption identifier for the current instance. Must be an     8-bit unsigned integer. Setting to `undefined` will remove the encryption header and ID  |

**Returns:** void

number Value containing the encryption identifer for the current instance or
    `undefined` if not set.

___

### flags

• get **flags**(): [Id3v2FrameFlags](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md)

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[flags](_src_id3v2_frames_frame_.frame.md#flags)*

*Defined in src/id3v2/frames/frame.ts:78*

Gets the frame flags applied to the current instance.

**Returns:** [Id3v2FrameFlags](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md)

• set **flags**(`value`: [Id3v2FrameFlags](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md)): void

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[flags](_src_id3v2_frames_frame_.frame.md#flags)*

*Defined in src/id3v2/frames/frame.ts:84*

Sets the frame flags applied to the current instance.
If the value includes either {@see Id3v2FrameFlags.Encryption} or
{@see Id3v2FrameFlags.Compression}, {@see render} will throw.

#### Parameters:

Name | Type |
------ | ------ |
`value` | [Id3v2FrameFlags](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md) |

**Returns:** void

___

### frameClassType

• get **frameClassType**(): [FrameClassType](../enums/_src_id3v2_frames_frame_.frameclasstype.md)

*Overrides [UrlLinkFrame](_src_id3v2_frames_urllinkframe_.urllinkframe.md).[frameClassType](_src_id3v2_frames_urllinkframe_.urllinkframe.md#frameclasstype)*

*Defined in src/id3v2/frames/urlLinkFrame.ts:317*

**`inheritdoc`** 

**Returns:** [FrameClassType](../enums/_src_id3v2_frames_frame_.frameclasstype.md)

___

### frameId

• get **frameId**(): [FrameIdentifier](_src_id3v2_frameidentifiers_.frameidentifier.md)

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[frameId](_src_id3v2_frames_frame_.frame.md#frameid)*

*Defined in src/id3v2/frames/frame.ts:92*

Gets the frame ID for the current instance.

**Returns:** [FrameIdentifier](_src_id3v2_frameidentifiers_.frameidentifier.md)

FrameIdentifier Object representing of the identifier of the frame

___

### groupId

• get **groupId**(): number \| undefined

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[groupId](_src_id3v2_frames_frame_.frame.md#groupid)*

*Defined in src/id3v2/frames/frame.ts:99*

Gets the grouping ID applied to the current instance.

**Returns:** number \| undefined

number Value containing the grouping identifier for the current instance, or
    `undefined` if not set.

• set **groupId**(`value`: number \| undefined): void

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[groupId](_src_id3v2_frames_frame_.frame.md#groupid)*

*Defined in src/id3v2/frames/frame.ts:109*

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

*Defined in src/id3v2/frames/frame.ts:124*

Gets the size of the current instance as it was last stored on disk.
NOTE: This value is not used outside of reading a frame from disk, so newly created frames
    should not have this value set.

**Returns:** number

___

### text

• get **text**(): string[]

*Overrides [UrlLinkFrame](_src_id3v2_frames_urllinkframe_.urllinkframe.md).[text](_src_id3v2_frames_urllinkframe_.urllinkframe.md#text)*

*Defined in src/id3v2/frames/urlLinkFrame.ts:347*

Gets the text contained in the current instance.
NOTE: Modifying the contents of the returned value will not modify the contents of the
current instance. The value must be reassigned for the value to change.

**Returns:** string[]

• set **text**(`value`: string[]): void

*Overrides [UrlLinkFrame](_src_id3v2_frames_urllinkframe_.urllinkframe.md).[text](_src_id3v2_frames_urllinkframe_.urllinkframe.md#text)*

*Defined in src/id3v2/frames/urlLinkFrame.ts:360*

Sets the text contained in the current instance.

#### Parameters:

Name | Type |
------ | ------ |
`value` | string[] |

**Returns:** void

___

### textEncoding

• get **textEncoding**(): [StringType](../enums/_src_bytevector_.stringtype.md)

*Inherited from [UrlLinkFrame](_src_id3v2_frames_urllinkframe_.urllinkframe.md).[textEncoding](_src_id3v2_frames_urllinkframe_.urllinkframe.md#textencoding)*

*Defined in src/id3v2/frames/urlLinkFrame.ts:121*

Gets the text encoding to use when rendering the current instance.

**Returns:** [StringType](../enums/_src_bytevector_.stringtype.md)

• set **textEncoding**(`value`: [StringType](../enums/_src_bytevector_.stringtype.md)): void

*Inherited from [UrlLinkFrame](_src_id3v2_frames_urllinkframe_.urllinkframe.md).[textEncoding](_src_id3v2_frames_urllinkframe_.urllinkframe.md#textencoding)*

*Defined in src/id3v2/frames/urlLinkFrame.ts:130*

Sets the text encoding to use when rendering the current instance.
NOTE: This value will be overwritten if {@see Id3v2Tag.forceDefaultEncoding} is `true`.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | [StringType](../enums/_src_bytevector_.stringtype.md) |   |

**Returns:** void

## Methods

### clone

▸ **clone**(): [UserUrlLinkFrame](_src_id3v2_frames_urllinkframe_.userurllinkframe.md)

*Overrides [UrlLinkFrame](_src_id3v2_frames_urllinkframe_.urllinkframe.md).[clone](_src_id3v2_frames_urllinkframe_.urllinkframe.md#clone)*

*Defined in src/id3v2/frames/urlLinkFrame.ts:387*

**`inheritdoc`** 

**Returns:** [UserUrlLinkFrame](_src_id3v2_frames_urllinkframe_.userurllinkframe.md)

___

### fieldData

▸ `Protected`**fieldData**(`frameData`: [ByteVector](_src_bytevector_.bytevector.md), `offset`: number, `version`: number): [ByteVector](_src_bytevector_.bytevector.md)

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[fieldData](_src_id3v2_frames_frame_.frame.md#fielddata)*

*Defined in src/id3v2/frames/frame.ts:229*

Extracts the field data from the raw portion of an ID3v2 frame.
This method is necessary for extracting extra data prepended to the frame such the as
grouping ID.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`frameData` | [ByteVector](_src_bytevector_.bytevector.md) | Raw frame data |
`offset` | number | Index at which the data is contained |
`version` | number | Version of the ID3v2 tag the data was originally encoded with  |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### parseFields

▸ `Protected`**parseFields**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `version`: number): void

*Inherited from [UrlLinkFrame](_src_id3v2_frames_urllinkframe_.urllinkframe.md).[parseFields](_src_id3v2_frames_urllinkframe_.urllinkframe.md#parsefields)*

*Overrides [Frame](_src_id3v2_frames_frame_.frame.md).[parseFields](_src_id3v2_frames_frame_.frame.md#parsefields)*

*Defined in src/id3v2/frames/urlLinkFrame.ts:168*

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

*Inherited from [UrlLinkFrame](_src_id3v2_frames_urllinkframe_.urllinkframe.md).[parseRawData](_src_id3v2_frames_urllinkframe_.urllinkframe.md#parserawdata)*

*Defined in src/id3v2/frames/urlLinkFrame.ts:174*

**Returns:** void

___

### render

▸ **render**(`version`: number): [ByteVector](_src_bytevector_.bytevector.md)

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[render](_src_id3v2_frames_frame_.frame.md#render)*

*Defined in src/id3v2/frames/frame.ts:140*

Renders the current instance, encoded in a specified ID3v2 version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`version` | number | Version of ID3v2 to use when encoding the current instance  |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### renderFields

▸ `Protected`**renderFields**(`version`: number): [ByteVector](_src_bytevector_.bytevector.md)

*Inherited from [UrlLinkFrame](_src_id3v2_frames_urllinkframe_.urllinkframe.md).[renderFields](_src_id3v2_frames_urllinkframe_.urllinkframe.md#renderfields)*

*Overrides [Frame](_src_id3v2_frames_frame_.frame.md).[renderFields](_src_id3v2_frames_frame_.frame.md#renderfields)*

*Defined in src/id3v2/frames/urlLinkFrame.ts:222*

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

*Defined in src/id3v2/frames/frame.ts:299*

Populates the current instance by reading the raw frame from disk, optionally reading the
header.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | Raw ID3v2 frame |
`offset` | number | Offset in {@paramref data} at which the frame begins. |
`readHeader` | boolean | Whether or not to read the reader into the current instance. |
`version` | number | Version of the ID3v2 tag the data was encoded with  |

**Returns:** void

___

### toString

▸ **toString**(): string

*Overrides [UrlLinkFrame](_src_id3v2_frames_urllinkframe_.urllinkframe.md).[toString](_src_id3v2_frames_urllinkframe_.urllinkframe.md#tostring)*

*Defined in src/id3v2/frames/urlLinkFrame.ts:399*

**`inheritdoc`** 

**Returns:** string

___

### correctEncoding

▸ `Static` `Protected`**correctEncoding**(`type`: [StringType](../enums/_src_bytevector_.stringtype.md), `version`: number): [StringType](../enums/_src_bytevector_.stringtype.md)

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[correctEncoding](_src_id3v2_frames_frame_.frame.md#correctencoding)*

*Defined in src/id3v2/frames/frame.ts:209*

Converts an encoding to be a supported encoding for a specified tag version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`type` | [StringType](../enums/_src_bytevector_.stringtype.md) | Value containing the original encoding |
`version` | number | Value containing the ID3v2 version to be encoded. |

**Returns:** [StringType](../enums/_src_bytevector_.stringtype.md)

StringType Value containing the correct encoding to use, based on
    {@see Id3v2Settings.forceDefaultEncoding} and what is supported by
    {@paramref version}

___

### findUrlLinkFrame

▸ `Static`**findUrlLinkFrame**(`frames`: [UrlLinkFrame](_src_id3v2_frames_urllinkframe_.urllinkframe.md)[], `ident`: [FrameIdentifier](_src_id3v2_frameidentifiers_.frameidentifier.md)): [UrlLinkFrame](_src_id3v2_frames_urllinkframe_.urllinkframe.md)

*Inherited from [UrlLinkFrame](_src_id3v2_frames_urllinkframe_.urllinkframe.md).[findUrlLinkFrame](_src_id3v2_frames_urllinkframe_.urllinkframe.md#findurllinkframe)*

*Defined in src/id3v2/frames/urlLinkFrame.ts:143*

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

### findUserUrlLinkFrame

▸ `Static`**findUserUrlLinkFrame**(`frames`: [UserUrlLinkFrame](_src_id3v2_frames_urllinkframe_.userurllinkframe.md)[], `description`: string): [UserUrlLinkFrame](_src_id3v2_frames_urllinkframe_.userurllinkframe.md)

*Defined in src/id3v2/frames/urlLinkFrame.ts:379*

Gets a frame from a list of frames.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`frames` | [UserUrlLinkFrame](_src_id3v2_frames_urllinkframe_.userurllinkframe.md)[] | List of frames to search |
`description` | string | Description of the frame to match |

**Returns:** [UserUrlLinkFrame](_src_id3v2_frames_urllinkframe_.userurllinkframe.md)

UserUrlLinkFrame Frame containing the matching user, `undefined` if a match was not
    found

___

### fromDescription

▸ `Static`**fromDescription**(`description`: string): [UserUrlLinkFrame](_src_id3v2_frames_urllinkframe_.userurllinkframe.md)

*Defined in src/id3v2/frames/urlLinkFrame.ts:267*

Constructs and initializes a new instance using the provided description as the text
of the frame.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`description` | string | Description to use as text of the frame.  |

**Returns:** [UserUrlLinkFrame](_src_id3v2_frames_urllinkframe_.userurllinkframe.md)

___

### fromIdentity

▸ `Static`**fromIdentity**(`ident`: [FrameIdentifier](_src_id3v2_frameidentifiers_.frameidentifier.md)): [UrlLinkFrame](_src_id3v2_frames_urllinkframe_.urllinkframe.md)

*Inherited from [UrlLinkFrame](_src_id3v2_frames_urllinkframe_.urllinkframe.md).[fromIdentity](_src_id3v2_frames_urllinkframe_.urllinkframe.md#fromidentity)*

*Defined in src/id3v2/frames/urlLinkFrame.ts:50*

Constructs and initializes an empty frame with the provided frame identity

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`ident` | [FrameIdentifier](_src_id3v2_frameidentifiers_.frameidentifier.md) | Identity of the frame to construct  |

**Returns:** [UrlLinkFrame](_src_id3v2_frames_urllinkframe_.urllinkframe.md)

___

### fromOffsetRawData

▸ `Static`**fromOffsetRawData**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `offset`: number, `header`: [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md), `version`: number): [UserUrlLinkFrame](_src_id3v2_frames_urllinkframe_.userurllinkframe.md)

*Overrides [UrlLinkFrame](_src_id3v2_frames_urllinkframe_.urllinkframe.md).[fromOffsetRawData](_src_id3v2_frames_urllinkframe_.urllinkframe.md#fromoffsetrawdata)*

*Defined in src/id3v2/frames/urlLinkFrame.ts:282*

Constructs and initializes a new instance by reading its raw data in a specified ID3v2
version. This method allows for offset reading from the data bytevector.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | Raw representation of the new frame |
`offset` | number | What offset in {@paramref data} the frame actually begins. Must be positive,     safe integer |
`header` | [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md) | Header of the frame found at {@paramref data} in the data |
`version` | number | ID3v2 version the frame was originally encoded with  |

**Returns:** [UserUrlLinkFrame](_src_id3v2_frames_urllinkframe_.userurllinkframe.md)

___

### fromRawData

▸ `Static`**fromRawData**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `version`: number): [UserUrlLinkFrame](_src_id3v2_frames_urllinkframe_.userurllinkframe.md)

*Overrides [UrlLinkFrame](_src_id3v2_frames_urllinkframe_.urllinkframe.md).[fromRawData](_src_id3v2_frames_urllinkframe_.urllinkframe.md#fromrawdata)*

*Defined in src/id3v2/frames/urlLinkFrame.ts:303*

Constructs and initializes a new instance by reading its raw data in a specified
ID3v2 version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | Raw representation of the new frame |
`version` | number | ID3v2 version the raw frame is encoded with, must be a positive 8-bit integer  |

**Returns:** [UserUrlLinkFrame](_src_id3v2_frames_urllinkframe_.userurllinkframe.md)
