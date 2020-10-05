**node-taglib-sharp**

> [README](../README.md) / [Globals](../globals.md) / ["src/id3v2/frames/commentsFrame"](../modules/_src_id3v2_frames_commentsframe_.md) / CommentsFrame

# Class: CommentsFrame

Class that extends {@see Frame}, implementing support for ID3v2 Comments (COMM) frames.
A {@see CommentsFrame} should be used for storing user readable comments on the media file.
When reading comments from a file, {@see CommentsFrame.getPreferred} should be used as it
gracefully falls back to comments that you, as a developer, may not be expecting. When writing
comments, however, it is best to use {@see get} as it forces it to be written in the exact
version you are specifying.

## Hierarchy

* [Frame](_src_id3v2_frames_frame_.frame.md)

  ↳ **CommentsFrame**

## Index

### Properties

* [\_header](_src_id3v2_frames_commentsframe_.commentsframe.md#_header)

### Accessors

* [description](_src_id3v2_frames_commentsframe_.commentsframe.md#description)
* [encryptionId](_src_id3v2_frames_commentsframe_.commentsframe.md#encryptionid)
* [flags](_src_id3v2_frames_commentsframe_.commentsframe.md#flags)
* [frameClassType](_src_id3v2_frames_commentsframe_.commentsframe.md#frameclasstype)
* [frameId](_src_id3v2_frames_commentsframe_.commentsframe.md#frameid)
* [groupId](_src_id3v2_frames_commentsframe_.commentsframe.md#groupid)
* [language](_src_id3v2_frames_commentsframe_.commentsframe.md#language)
* [size](_src_id3v2_frames_commentsframe_.commentsframe.md#size)
* [text](_src_id3v2_frames_commentsframe_.commentsframe.md#text)
* [textEncoding](_src_id3v2_frames_commentsframe_.commentsframe.md#textencoding)

### Methods

* [clone](_src_id3v2_frames_commentsframe_.commentsframe.md#clone)
* [fieldData](_src_id3v2_frames_commentsframe_.commentsframe.md#fielddata)
* [parseFields](_src_id3v2_frames_commentsframe_.commentsframe.md#parsefields)
* [render](_src_id3v2_frames_commentsframe_.commentsframe.md#render)
* [renderFields](_src_id3v2_frames_commentsframe_.commentsframe.md#renderfields)
* [setData](_src_id3v2_frames_commentsframe_.commentsframe.md#setdata)
* [toString](_src_id3v2_frames_commentsframe_.commentsframe.md#tostring)
* [correctEncoding](_src_id3v2_frames_commentsframe_.commentsframe.md#correctencoding)
* [find](_src_id3v2_frames_commentsframe_.commentsframe.md#find)
* [findAll](_src_id3v2_frames_commentsframe_.commentsframe.md#findall)
* [findPreferred](_src_id3v2_frames_commentsframe_.commentsframe.md#findpreferred)
* [fromDescription](_src_id3v2_frames_commentsframe_.commentsframe.md#fromdescription)
* [fromOffsetRawData](_src_id3v2_frames_commentsframe_.commentsframe.md#fromoffsetrawdata)
* [fromRawData](_src_id3v2_frames_commentsframe_.commentsframe.md#fromrawdata)

## Properties

### \_header

• `Protected` **\_header**: [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md)

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[_header](_src_id3v2_frames_frame_.frame.md#_header)*

*Defined in src/id3v2/frames/frame.ts:33*

## Accessors

### description

• get **description**(): string

*Defined in src/id3v2/frames/commentsFrame.ts:101*

Gets the description stored in the current instance, or empty string if not set.

**Returns:** string

• set **description**(`value`: string): void

*Defined in src/id3v2/frames/commentsFrame.ts:108*

Sets the description stored in the current instance.
There should only be one frame with a matching description and ISO-639-2 language code per
tag.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | string | Description of the instance  |

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

*Overrides [Frame](_src_id3v2_frames_frame_.frame.md).[frameClassType](_src_id3v2_frames_frame_.frame.md#frameclasstype)*

*Defined in src/id3v2/frames/commentsFrame.ts:96*

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

### language

• get **language**(): string

*Defined in src/id3v2/frames/commentsFrame.ts:113*

Gets the ISO-639-2 language code stored in the current instance or 'XXX' if not set

**Returns:** string

• set **language**(`value`: string): void

*Defined in src/id3v2/frames/commentsFrame.ts:122*

Sets the ISO-639-2 language code stored in the current instance

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | string | Language code to store  |

**Returns:** void

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

• get **text**(): string

*Defined in src/id3v2/frames/commentsFrame.ts:127*

Gets the comment text stored in the current instance, or empty string if not set.

**Returns:** string

• set **text**(`value`: string): void

*Defined in src/id3v2/frames/commentsFrame.ts:132*

Sets the comment text stored in the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | string | Comment text to store  |

**Returns:** void

___

### textEncoding

• get **textEncoding**(): [StringType](../enums/_src_bytevector_.stringtype.md)

*Defined in src/id3v2/frames/commentsFrame.ts:137*

Gets the text encoding to use when storing the current instance.

**Returns:** [StringType](../enums/_src_bytevector_.stringtype.md)

• set **textEncoding**(`value`: [StringType](../enums/_src_bytevector_.stringtype.md)): void

*Defined in src/id3v2/frames/commentsFrame.ts:142*

Sets the text encoding to use when storing the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | [StringType](../enums/_src_bytevector_.stringtype.md) | Text encoding to use when storing the current instance  |

**Returns:** void

## Methods

### clone

▸ **clone**(): [Frame](_src_id3v2_frames_frame_.frame.md)

*Overrides [Frame](_src_id3v2_frames_frame_.frame.md).[clone](_src_id3v2_frames_frame_.frame.md#clone)*

*Defined in src/id3v2/frames/commentsFrame.ts:236*

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

*Overrides [Frame](_src_id3v2_frames_frame_.frame.md).[parseFields](_src_id3v2_frames_frame_.frame.md#parsefields)*

*Defined in src/id3v2/frames/commentsFrame.ts:250*

#### Parameters:

Name | Type |
------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) |
`version` | number |

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

*Overrides [Frame](_src_id3v2_frames_frame_.frame.md).[renderFields](_src_id3v2_frames_frame_.frame.md#renderfields)*

*Defined in src/id3v2/frames/commentsFrame.ts:276*

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

*Defined in src/id3v2/frames/commentsFrame.ts:246*

Gets a string representation of the current instance.

**Returns:** string

string String with the comment text

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

### find

▸ `Static`**find**(`frames`: [CommentsFrame](_src_id3v2_frames_commentsframe_.commentsframe.md)[], `description`: string, `language?`: string): [CommentsFrame](_src_id3v2_frames_commentsframe_.commentsframe.md)

*Defined in src/id3v2/frames/commentsFrame.ts:154*

Gets a comment frame that matched the provided parameters from the list of frames

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`frames` | [CommentsFrame](_src_id3v2_frames_commentsframe_.commentsframe.md)[] | Frames to search for best matching frame |
`description` | string | Description of the comments frame to match |
`language?` | string | Optional, ISO-639-2 language code to match |

**Returns:** [CommentsFrame](_src_id3v2_frames_commentsframe_.commentsframe.md)

CommentsFrame Object containing the matching frame or `undefined` if a match was
    not found

___

### findAll

▸ `Static`**findAll**(`frames`: [CommentsFrame](_src_id3v2_frames_commentsframe_.commentsframe.md)[], `description`: string, `language?`: string): [CommentsFrame](_src_id3v2_frames_commentsframe_.commentsframe.md)[]

*Defined in src/id3v2/frames/commentsFrame.ts:172*

Gets all comment frames that match the provided parameters from the list of frames

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`frames` | [CommentsFrame](_src_id3v2_frames_commentsframe_.commentsframe.md)[] | Frames to search |
`description` | string | Description of the comments frame to match |
`language?` | string | Optional, ISO-639-2 language code to match |

**Returns:** [CommentsFrame](_src_id3v2_frames_commentsframe_.commentsframe.md)[]

CommentsFrame[] Array of comments frames that match the provided parameters or an
    empty array if none were found

___

### findPreferred

▸ `Static`**findPreferred**(`frames`: [CommentsFrame](_src_id3v2_frames_commentsframe_.commentsframe.md)[], `description`: string, `language?`: string): [CommentsFrame](_src_id3v2_frames_commentsframe_.commentsframe.md)

*Defined in src/id3v2/frames/commentsFrame.ts:194*

Gets a specified comments frame from the specified tag, trying to match the description and
language but accepting an incomplete match.
The method tries matching with the following order of precedence:
* The first frame with a matching description and language
* The first frame with a matching language
* The first frame with a matching description
* The first frame

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`frames` | [CommentsFrame](_src_id3v2_frames_commentsframe_.commentsframe.md)[] | Frames to search for best matching frame |
`description` | string | Description to match |
`language?` | string | ISO-639-2 language code to match  |

**Returns:** [CommentsFrame](_src_id3v2_frames_commentsframe_.commentsframe.md)

___

### fromDescription

▸ `Static`**fromDescription**(`description`: string, `language?`: string, `encoding`: [StringType](../enums/_src_bytevector_.stringtype.md)): [CommentsFrame](_src_id3v2_frames_commentsframe_.commentsframe.md)

*Defined in src/id3v2/frames/commentsFrame.ts:35*

Constructs and initializes a new CommentsFrame from a description

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`description` | string | - | Description of the new frame |
`language?` | string | - | Optional, ISO-639-2 language code for the new frame |
`encoding` | [StringType](../enums/_src_bytevector_.stringtype.md) | Id3v2Settings.defaultEncoding | Optional, text encoding to use when rendering the new frame  |

**Returns:** [CommentsFrame](_src_id3v2_frames_commentsframe_.commentsframe.md)

___

### fromOffsetRawData

▸ `Static`**fromOffsetRawData**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `offset`: number, `header`: [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md), `version`: number): [CommentsFrame](_src_id3v2_frames_commentsframe_.commentsframe.md)

*Defined in src/id3v2/frames/commentsFrame.ts:59*

Constructs and initializes a new CommentsFrame by reading its raw data in a specified ID3v2
version. This method allows for offset reading from the data bytevector.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | Raw representation of the new frame |
`offset` | number | What offset in {@paramref data} the frame actually begins. Must be positive,     safe integer |
`header` | [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md) | Header of the frame found at {@paramref data} in the data |
`version` | number | ID3v2 version the frame was originally encoded with  |

**Returns:** [CommentsFrame](_src_id3v2_frames_commentsframe_.commentsframe.md)

___

### fromRawData

▸ `Static`**fromRawData**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `version`: number): [CommentsFrame](_src_id3v2_frames_commentsframe_.commentsframe.md)

*Defined in src/id3v2/frames/commentsFrame.ts:82*

Constructs and initializes a new CommentsFrame by reading its raw data in a specified
ID3v2 version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | Raw representation of the new frame |
`version` | number | ID3v2 version the frame was originally encoded with  |

**Returns:** [CommentsFrame](_src_id3v2_frames_commentsframe_.commentsframe.md)
