**node-taglib-sharp**

> [README](../README.md) / [Globals](../globals.md) / ["src/id3v2/frames/textInformationFrame"](../modules/_src_id3v2_frames_textinformationframe_.md) / UserTextInformationFrame

# Class: UserTextInformationFrame

## Hierarchy

* [TextInformationFrame](_src_id3v2_frames_textinformationframe_.textinformationframe.md)

  ↳ **UserTextInformationFrame**

## Index

### Properties

* [\_encoding](_src_id3v2_frames_textinformationframe_.usertextinformationframe.md#_encoding)
* [\_header](_src_id3v2_frames_textinformationframe_.usertextinformationframe.md#_header)
* [\_rawData](_src_id3v2_frames_textinformationframe_.usertextinformationframe.md#_rawdata)
* [\_rawVersion](_src_id3v2_frames_textinformationframe_.usertextinformationframe.md#_rawversion)
* [\_textFields](_src_id3v2_frames_textinformationframe_.usertextinformationframe.md#_textfields)

### Accessors

* [description](_src_id3v2_frames_textinformationframe_.usertextinformationframe.md#description)
* [encryptionId](_src_id3v2_frames_textinformationframe_.usertextinformationframe.md#encryptionid)
* [flags](_src_id3v2_frames_textinformationframe_.usertextinformationframe.md#flags)
* [frameClassType](_src_id3v2_frames_textinformationframe_.usertextinformationframe.md#frameclasstype)
* [frameId](_src_id3v2_frames_textinformationframe_.usertextinformationframe.md#frameid)
* [groupId](_src_id3v2_frames_textinformationframe_.usertextinformationframe.md#groupid)
* [size](_src_id3v2_frames_textinformationframe_.usertextinformationframe.md#size)
* [text](_src_id3v2_frames_textinformationframe_.usertextinformationframe.md#text)
* [textEncoding](_src_id3v2_frames_textinformationframe_.usertextinformationframe.md#textencoding)

### Methods

* [clone](_src_id3v2_frames_textinformationframe_.usertextinformationframe.md#clone)
* [fieldData](_src_id3v2_frames_textinformationframe_.usertextinformationframe.md#fielddata)
* [parseFields](_src_id3v2_frames_textinformationframe_.usertextinformationframe.md#parsefields)
* [parseRawData](_src_id3v2_frames_textinformationframe_.usertextinformationframe.md#parserawdata)
* [render](_src_id3v2_frames_textinformationframe_.usertextinformationframe.md#render)
* [renderFields](_src_id3v2_frames_textinformationframe_.usertextinformationframe.md#renderfields)
* [setData](_src_id3v2_frames_textinformationframe_.usertextinformationframe.md#setdata)
* [toString](_src_id3v2_frames_textinformationframe_.usertextinformationframe.md#tostring)
* [correctEncoding](_src_id3v2_frames_textinformationframe_.usertextinformationframe.md#correctencoding)
* [findTextInformationFrame](_src_id3v2_frames_textinformationframe_.usertextinformationframe.md#findtextinformationframe)
* [findUserTextInformationFrame](_src_id3v2_frames_textinformationframe_.usertextinformationframe.md#findusertextinformationframe)
* [fromDescription](_src_id3v2_frames_textinformationframe_.usertextinformationframe.md#fromdescription)
* [fromIdentifier](_src_id3v2_frames_textinformationframe_.usertextinformationframe.md#fromidentifier)
* [fromOffsetRawData](_src_id3v2_frames_textinformationframe_.usertextinformationframe.md#fromoffsetrawdata)
* [fromRawData](_src_id3v2_frames_textinformationframe_.usertextinformationframe.md#fromrawdata)

## Properties

### \_encoding

• `Protected` **\_encoding**: [StringType](../enums/_src_bytevector_.stringtype.md) = Id3v2Settings.defaultEncoding

*Inherited from [TextInformationFrame](_src_id3v2_frames_textinformationframe_.textinformationframe.md).[_encoding](_src_id3v2_frames_textinformationframe_.textinformationframe.md#_encoding)*

*Defined in src/id3v2/frames/textInformationFrame.ts:150*

___

### \_header

• `Protected` **\_header**: [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md)

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[_header](_src_id3v2_frames_frame_.frame.md#_header)*

*Defined in src/id3v2/frames/frame.ts:33*

___

### \_rawData

• `Protected` **\_rawData**: [ByteVector](_src_bytevector_.bytevector.md)

*Inherited from [TextInformationFrame](_src_id3v2_frames_textinformationframe_.textinformationframe.md).[_rawData](_src_id3v2_frames_textinformationframe_.textinformationframe.md#_rawdata)*

*Defined in src/id3v2/frames/textInformationFrame.ts:151*

___

### \_rawVersion

• `Protected` **\_rawVersion**: number

*Inherited from [TextInformationFrame](_src_id3v2_frames_textinformationframe_.textinformationframe.md).[_rawVersion](_src_id3v2_frames_textinformationframe_.textinformationframe.md#_rawversion)*

*Defined in src/id3v2/frames/textInformationFrame.ts:152*

___

### \_textFields

• `Protected` **\_textFields**: string[] = []

*Inherited from [TextInformationFrame](_src_id3v2_frames_textinformationframe_.textinformationframe.md).[_textFields](_src_id3v2_frames_textinformationframe_.textinformationframe.md#_textfields)*

*Defined in src/id3v2/frames/textInformationFrame.ts:153*

## Accessors

### description

• get **description**(): string

*Defined in src/id3v2/frames/textInformationFrame.ts:632*

Gets the description stored in the current instance.

**Returns:** string

• set **description**(`value`: string): void

*Defined in src/id3v2/frames/textInformationFrame.ts:641*

Sets the description stored in the current instance.
There should only be one frame with the specified description per tag.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | string | Description to store in the current instance.  |

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

*Overrides [TextInformationFrame](_src_id3v2_frames_textinformationframe_.textinformationframe.md).[frameClassType](_src_id3v2_frames_textinformationframe_.textinformationframe.md#frameclasstype)*

*Defined in src/id3v2/frames/textInformationFrame.ts:627*

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

*Overrides [TextInformationFrame](_src_id3v2_frames_textinformationframe_.textinformationframe.md).[text](_src_id3v2_frames_textinformationframe_.textinformationframe.md#text)*

*Defined in src/id3v2/frames/textInformationFrame.ts:656*

Gets the text contained in the current instance.
NOTE: Modifying the contents of the returned value will not modify the contents of the
current instance. The value must be reassigned for the value to change.

**Returns:** string[]

• set **text**(`value`: string[]): void

*Overrides [TextInformationFrame](_src_id3v2_frames_textinformationframe_.textinformationframe.md).[text](_src_id3v2_frames_textinformationframe_.textinformationframe.md#text)*

*Defined in src/id3v2/frames/textInformationFrame.ts:668*

Sets the text contained in the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | string[] | Array of text values to store in the current instance  |

**Returns:** void

___

### textEncoding

• get **textEncoding**(): [StringType](../enums/_src_bytevector_.stringtype.md)

*Inherited from [TextInformationFrame](_src_id3v2_frames_textinformationframe_.textinformationframe.md).[textEncoding](_src_id3v2_frames_textinformationframe_.textinformationframe.md#textencoding)*

*Defined in src/id3v2/frames/textInformationFrame.ts:242*

Gets the text encoding to use when rendering the current instance.

**Returns:** [StringType](../enums/_src_bytevector_.stringtype.md)

• set **textEncoding**(`value`: [StringType](../enums/_src_bytevector_.stringtype.md)): void

*Inherited from [TextInformationFrame](_src_id3v2_frames_textinformationframe_.textinformationframe.md).[textEncoding](_src_id3v2_frames_textinformationframe_.textinformationframe.md#textencoding)*

*Defined in src/id3v2/frames/textInformationFrame.ts:250*

Sets the text encoding to use when rendering the current instance.
This value will be overridden if {@see Id3v2Tag.forceDefaultEncoding} is `true`.

#### Parameters:

Name | Type |
------ | ------ |
`value` | [StringType](../enums/_src_bytevector_.stringtype.md) |

**Returns:** void

## Methods

### clone

▸ **clone**(): [Frame](_src_id3v2_frames_frame_.frame.md)

*Overrides [TextInformationFrame](_src_id3v2_frames_textinformationframe_.textinformationframe.md).[clone](_src_id3v2_frames_textinformationframe_.textinformationframe.md#clone)*

*Defined in src/id3v2/frames/textInformationFrame.ts:698*

**`inheritdoc`** 

**Returns:** [Frame](_src_id3v2_frames_frame_.frame.md)

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

*Inherited from [TextInformationFrame](_src_id3v2_frames_textinformationframe_.textinformationframe.md).[parseFields](_src_id3v2_frames_textinformationframe_.textinformationframe.md#parsefields)*

*Overrides [Frame](_src_id3v2_frames_frame_.frame.md).[parseFields](_src_id3v2_frames_frame_.frame.md#parsefields)*

*Defined in src/id3v2/frames/textInformationFrame.ts:339*

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

*Inherited from [TextInformationFrame](_src_id3v2_frames_textinformationframe_.textinformationframe.md).[parseRawData](_src_id3v2_frames_textinformationframe_.textinformationframe.md#parserawdata)*

*Defined in src/id3v2/frames/textInformationFrame.ts:351*

Performs the actual parsing of the raw data.
Because of the high parsing cost and relatively low usage of the class {@see parseFields}
only stores the field data so it can be parsed on demand. Whenever a property or method is
called which requires the data, this method is called, and only on the first call does it
actually parse the data.

**Returns:** void

___

### render

▸ **render**(`version`: number): [ByteVector](_src_bytevector_.bytevector.md)

*Inherited from [TextInformationFrame](_src_id3v2_frames_textinformationframe_.textinformationframe.md).[render](_src_id3v2_frames_textinformationframe_.textinformationframe.md#render)*

*Overrides [Frame](_src_id3v2_frames_frame_.frame.md).[render](_src_id3v2_frames_frame_.frame.md#render)*

*Defined in src/id3v2/frames/textInformationFrame.ts:294*

Renders the current instance, encoded in a specified ID3v2 version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`version` | number | ID3v2 version to use when encoding the current instance. Must be a positive     8-bit integer. |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

ByteVector Rendered version of the current instance.

___

### renderFields

▸ `Protected`**renderFields**(`version`: number): [ByteVector](_src_bytevector_.bytevector.md)

*Inherited from [TextInformationFrame](_src_id3v2_frames_textinformationframe_.textinformationframe.md).[renderFields](_src_id3v2_frames_textinformationframe_.textinformationframe.md#renderfields)*

*Overrides [Frame](_src_id3v2_frames_frame_.frame.md).[renderFields](_src_id3v2_frames_frame_.frame.md#renderfields)*

*Defined in src/id3v2/frames/textInformationFrame.ts:464*

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

*Overrides [TextInformationFrame](_src_id3v2_frames_textinformationframe_.textinformationframe.md).[toString](_src_id3v2_frames_textinformationframe_.textinformationframe.md#tostring)*

*Defined in src/id3v2/frames/textInformationFrame.ts:709*

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

### findTextInformationFrame

▸ `Static`**findTextInformationFrame**(`frames`: [TextInformationFrame](_src_id3v2_frames_textinformationframe_.textinformationframe.md)[], `ident`: [FrameIdentifier](_src_id3v2_frameidentifiers_.frameidentifier.md)): [TextInformationFrame](_src_id3v2_frames_textinformationframe_.textinformationframe.md)

*Inherited from [TextInformationFrame](_src_id3v2_frames_textinformationframe_.textinformationframe.md).[findTextInformationFrame](_src_id3v2_frames_textinformationframe_.textinformationframe.md#findtextinformationframe)*

*Defined in src/id3v2/frames/textInformationFrame.ts:267*

Gets a {@see TextInformationFrame} object of a specified type from a specified type from a
list of text information frames.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`frames` | [TextInformationFrame](_src_id3v2_frames_textinformationframe_.textinformationframe.md)[] | List of frames to search |
`ident` | [FrameIdentifier](_src_id3v2_frameidentifiers_.frameidentifier.md) | Frame identifier to search for |

**Returns:** [TextInformationFrame](_src_id3v2_frames_textinformationframe_.textinformationframe.md)

TextInformationFrame Matching frame if it exists in {@paramref tag}, `undefined` if
    a matching frame was not found

___

### findUserTextInformationFrame

▸ `Static`**findUserTextInformationFrame**(`frames`: [UserTextInformationFrame](_src_id3v2_frames_textinformationframe_.usertextinformationframe.md)[], `description`: string, `caseSensitive`: boolean): [UserTextInformationFrame](_src_id3v2_frames_textinformationframe_.usertextinformationframe.md)

*Defined in src/id3v2/frames/textInformationFrame.ts:686*

Gets a user text information frame from a specified tag

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`frames` | [UserTextInformationFrame](_src_id3v2_frames_textinformationframe_.usertextinformationframe.md)[] | - | Object to search in |
`description` | string | - | Description to use to match the frame in the {@paramref tag} |
`caseSensitive` | boolean | true | Whether or not to search for the frame case-sensitively. |

**Returns:** [UserTextInformationFrame](_src_id3v2_frames_textinformationframe_.usertextinformationframe.md)

UserTextInformationFrame Frame containing the matching user, `undefined` if a match
    was not found

___

### fromDescription

▸ `Static`**fromDescription**(`description`: string, `encoding`: [StringType](../enums/_src_bytevector_.stringtype.md)): [UserTextInformationFrame](_src_id3v2_frames_textinformationframe_.usertextinformationframe.md)

*Defined in src/id3v2/frames/textInformationFrame.ts:573*

Constructs and initializes a new instance with a specified description and text encoding.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`description` | string | - | Description of the new frame |
`encoding` | [StringType](../enums/_src_bytevector_.stringtype.md) | Id3v2Settings.defaultEncoding | Text encoding to use when rendering the new frame  |

**Returns:** [UserTextInformationFrame](_src_id3v2_frames_textinformationframe_.usertextinformationframe.md)

___

### fromIdentifier

▸ `Static`**fromIdentifier**(`identifier`: [FrameIdentifier](_src_id3v2_frameidentifiers_.frameidentifier.md), `encoding`: [StringType](../enums/_src_bytevector_.stringtype.md)): [TextInformationFrame](_src_id3v2_frames_textinformationframe_.textinformationframe.md)

*Inherited from [TextInformationFrame](_src_id3v2_frames_textinformationframe_.textinformationframe.md).[fromIdentifier](_src_id3v2_frames_textinformationframe_.textinformationframe.md#fromidentifier)*

*Defined in src/id3v2/frames/textInformationFrame.ts:167*

Constructs and initializes a new instance with a specified identifier

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`identifier` | [FrameIdentifier](_src_id3v2_frameidentifiers_.frameidentifier.md) | - | Byte vector containing the identifier for the frame |
`encoding` | [StringType](../enums/_src_bytevector_.stringtype.md) | Id3v2Settings.defaultEncoding | Optionally, the encoding to use for the new instance. If omitted, defaults     to {@see Id3v2Tag.defaultEncoding}  |

**Returns:** [TextInformationFrame](_src_id3v2_frames_textinformationframe_.textinformationframe.md)

___

### fromOffsetRawData

▸ `Static`**fromOffsetRawData**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `offset`: number, `header`: [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md), `version`: number): [UserTextInformationFrame](_src_id3v2_frames_textinformationframe_.usertextinformationframe.md)

*Overrides [TextInformationFrame](_src_id3v2_frames_textinformationframe_.textinformationframe.md).[fromOffsetRawData](_src_id3v2_frames_textinformationframe_.textinformationframe.md#fromoffsetrawdata)*

*Defined in src/id3v2/frames/textInformationFrame.ts:592*

Constructs and initializes a new instance by reading its raw data in a specified ID3v2
version. This method allows for offset reading from the data bytevector.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | Raw representation of the new frame |
`offset` | number | What offset in {@paramref data} the frame actually begins. Must be positive,     safe integer |
`header` | [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md) | Header of the frame found at {@paramref data} in the data |
`version` | number | ID3v2 version the frame was originally encoded with  |

**Returns:** [UserTextInformationFrame](_src_id3v2_frames_textinformationframe_.usertextinformationframe.md)

___

### fromRawData

▸ `Static`**fromRawData**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `version`: number): [UserTextInformationFrame](_src_id3v2_frames_textinformationframe_.usertextinformationframe.md)

*Overrides [TextInformationFrame](_src_id3v2_frames_textinformationframe_.textinformationframe.md).[fromRawData](_src_id3v2_frames_textinformationframe_.textinformationframe.md#fromrawdata)*

*Defined in src/id3v2/frames/textInformationFrame.ts:614*

Constructs and initializes a new instance by reading its raw data in a specified
ID3v2 version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | Raw representation of the new frame |
`version` | number | ID3v2 version the raw frame is encoded with, must be a positive 8-bit integer  |

**Returns:** [UserTextInformationFrame](_src_id3v2_frames_textinformationframe_.usertextinformationframe.md)
