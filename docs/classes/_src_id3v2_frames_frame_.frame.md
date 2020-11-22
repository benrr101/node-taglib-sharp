**[node-taglib-sharp](../README.md)**

> [Globals](../globals.md) / ["src/id3v2/frames/frame"](../modules/_src_id3v2_frames_frame_.md) / Frame

# Class: Frame

## Hierarchy

* **Frame**

  ↳ [AttachmentFrame](_src_id3v2_frames_attachmentframe_.attachmentframe.md)

  ↳ [CommentsFrame](_src_id3v2_frames_commentsframe_.commentsframe.md)

  ↳ [MusicCdIdentifierFrame](_src_id3v2_frames_musiccdidentifierframe_.musiccdidentifierframe.md)

  ↳ [PlayCountFrame](_src_id3v2_frames_playcountframe_.playcountframe.md)

  ↳ [PopularimeterFrame](_src_id3v2_frames_popularimeterframe_.popularimeterframe.md)

  ↳ [PrivateFrame](_src_id3v2_frames_privateframe_.privateframe.md)

  ↳ [TermsOfUseFrame](_src_id3v2_frames_termsofuseframe_.termsofuseframe.md)

  ↳ [UniqueFileIdentifierFrame](_src_id3v2_frames_uniquefileidentifierframe_.uniquefileidentifierframe.md)

  ↳ [UnknownFrame](_src_id3v2_frames_unknownframe_.unknownframe.md)

  ↳ [UnsynchronizedLyricsFrame](_src_id3v2_frames_unsynchronizedlyricsframe_.unsynchronizedlyricsframe.md)

  ↳ [EventTimeCodeFrame](_src_id3v2_frames_eventtimecodeframe_.eventtimecodeframe.md)

  ↳ [RelativeVolumeFrame](_src_id3v2_frames_relativevolumeframe_.relativevolumeframe.md)

  ↳ [SynchronizedLyricsFrame](_src_id3v2_frames_synchronizedlyricsframe_.synchronizedlyricsframe.md)

  ↳ [TextInformationFrame](_src_id3v2_frames_textinformationframe_.textinformationframe.md)

  ↳ [UrlLinkFrame](_src_id3v2_frames_urllinkframe_.urllinkframe.md)

## Index

### Constructors

* [constructor](_src_id3v2_frames_frame_.frame.md#constructor)

### Properties

* [\_header](_src_id3v2_frames_frame_.frame.md#_header)

### Accessors

* [encryptionId](_src_id3v2_frames_frame_.frame.md#encryptionid)
* [flags](_src_id3v2_frames_frame_.frame.md#flags)
* [frameClassType](_src_id3v2_frames_frame_.frame.md#frameclasstype)
* [frameId](_src_id3v2_frames_frame_.frame.md#frameid)
* [groupId](_src_id3v2_frames_frame_.frame.md#groupid)
* [size](_src_id3v2_frames_frame_.frame.md#size)

### Methods

* [clone](_src_id3v2_frames_frame_.frame.md#clone)
* [fieldData](_src_id3v2_frames_frame_.frame.md#fielddata)
* [parseFields](_src_id3v2_frames_frame_.frame.md#parsefields)
* [render](_src_id3v2_frames_frame_.frame.md#render)
* [renderFields](_src_id3v2_frames_frame_.frame.md#renderfields)
* [setData](_src_id3v2_frames_frame_.frame.md#setdata)
* [correctEncoding](_src_id3v2_frames_frame_.frame.md#correctencoding)

## Constructors

### constructor

\+ `Protected`**new Frame**(`header`: [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md)): [Frame](_src_id3v2_frames_frame_.frame.md)

#### Parameters:

Name | Type |
------ | ------ |
`header` | [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md) |

**Returns:** [Frame](_src_id3v2_frames_frame_.frame.md)

## Properties

### \_header

• `Protected` **\_header**: [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md)

## Accessors

### encryptionId

• get **encryptionId**(): number \| undefined

Gets the encryption ID applied to the current instance.

**Returns:** number \| undefined

number Value containing the encryption identifier for the current instance or
    `undefined` if not set.

• set **encryptionId**(`value`: number \| undefined): void

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

Gets the frame flags applied to the current instance.

**Returns:** [Id3v2FrameFlags](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md)

• set **flags**(`value`: [Id3v2FrameFlags](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md)): void

Sets the frame flags applied to the current instance.
If the value includes either [Id3v2FrameFlags.Encryption](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md#encryption) or
[Id3v2FrameFlags.Compression](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md#compression), [render](_src_id3v2_frames_frame_.frame.md#render) will throw.

#### Parameters:

Name | Type |
------ | ------ |
`value` | [Id3v2FrameFlags](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md) |

**Returns:** void

___

### frameClassType

• get **frameClassType**(): [FrameClassType](../enums/_src_id3v2_frames_frame_.frameclasstype.md)

**Returns:** [FrameClassType](../enums/_src_id3v2_frames_frame_.frameclasstype.md)

___

### frameId

• get **frameId**(): [FrameIdentifier](_src_id3v2_frameidentifiers_.frameidentifier.md)

Gets the frame ID for the current instance.

**Returns:** [FrameIdentifier](_src_id3v2_frameidentifiers_.frameidentifier.md)

FrameIdentifier Object representing of the identifier of the frame

___

### groupId

• get **groupId**(): number \| undefined

Gets the grouping ID applied to the current instance.

**Returns:** number \| undefined

number Value containing the grouping identifier for the current instance, or
    `undefined` if not set.

• set **groupId**(`value`: number \| undefined): void

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

Gets the size of the current instance as it was last stored on disk.
NOTE: This value is not used outside of reading a frame from disk, so newly created frames
    should not have this value set.

**Returns:** number

## Methods

### clone

▸ `Abstract`**clone**(): [Frame](_src_id3v2_frames_frame_.frame.md)

Creates a deep copy of the current instance.
This method is implemented by rendering the current instance as an ID3v2.4 frame and using
the frame factory to create a new frame. As such, this method should be overridden by child
classes.

**Returns:** [Frame](_src_id3v2_frames_frame_.frame.md)

___

### fieldData

▸ `Protected`**fieldData**(`frameData`: [ByteVector](_src_bytevector_.bytevector.md), `offset`: number, `version`: number, `dataIncludesHeader`: boolean): [ByteVector](_src_bytevector_.bytevector.md)

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

▸ `Protected` `Abstract`**parseFields**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `version`: number): void

Populates the values in this frame by parsing its field data in a specified version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | Extracted field data |
`version` | number | ID3v2 version the field data is encoded in  |

**Returns:** void

___

### render

▸ **render**(`version`: number): [ByteVector](_src_bytevector_.bytevector.md)

Renders the current instance, encoded in a specified ID3v2 version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`version` | number | Version of ID3v2 to use when encoding the current instance  |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### renderFields

▸ `Protected` `Abstract`**renderFields**(`version`: number): [ByteVector](_src_bytevector_.bytevector.md)

Renders the values in the current instance into field data for a specified version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`version` | number | ID3v2 version the field data is to be encoded in.  |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### setData

▸ `Protected`**setData**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `offset`: number, `readHeader`: boolean, `version`: number): void

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
