[node-taglib-sharp](../README.md) / [Exports](../modules.md) / AiffFile

# Class: AiffFile

## Hierarchy

- [`File`](File.md)

  ↳ **`AiffFile`**

## Table of contents

### Constructors

- [constructor](AiffFile.md#constructor)

### Properties

- [AIFF\_FORM\_TYPE](AiffFile.md#aiff_form_type)
- [COMM\_IDENTIFIER](AiffFile.md#comm_identifier)
- [FILE\_IDENTIFIER](AiffFile.md#file_identifier)
- [ID3\_IDENTIFIER](AiffFile.md#id3_identifier)
- [SOUND\_IDENTIFIER](AiffFile.md#sound_identifier)

### Accessors

- [corruptionReasons](AiffFile.md#corruptionreasons)
- [fileAbstraction](AiffFile.md#fileabstraction)
- [hasTags](AiffFile.md#hastags)
- [isPossiblyCorrupt](AiffFile.md#ispossiblycorrupt)
- [isWritable](AiffFile.md#iswritable)
- [length](AiffFile.md#length)
- [mimeType](AiffFile.md#mimetype)
- [mode](AiffFile.md#mode)
- [name](AiffFile.md#name)
- [position](AiffFile.md#position)
- [properties](AiffFile.md#properties)
- [tag](AiffFile.md#tag)
- [tagTypes](AiffFile.md#tagtypes)
- [tagTypesOnDisk](AiffFile.md#tagtypesondisk)
- [bufferSize](AiffFile.md#buffersize)

### Methods

- [dispose](AiffFile.md#dispose)
- [find](AiffFile.md#find)
- [getTag](AiffFile.md#gettag)
- [insert](AiffFile.md#insert)
- [markAsCorrupt](AiffFile.md#markascorrupt)
- [preSave](AiffFile.md#presave)
- [rFind](AiffFile.md#rfind)
- [readBlock](AiffFile.md#readblock)
- [removeBlock](AiffFile.md#removeblock)
- [removeTags](AiffFile.md#removetags)
- [save](AiffFile.md#save)
- [seek](AiffFile.md#seek)
- [truncate](AiffFile.md#truncate)
- [writeBlock](AiffFile.md#writeblock)
- [addFileType](AiffFile.md#addfiletype)
- [addFileTypeResolver](AiffFile.md#addfiletyperesolver)
- [createFromAbstraction](AiffFile.md#createfromabstraction)
- [createFromPath](AiffFile.md#createfrompath)
- [removeFileType](AiffFile.md#removefiletype)
- [removeFileTypeResolver](AiffFile.md#removefiletyperesolver)

## Constructors

### constructor

• **new AiffFile**(`file`, `propertiesStyle`)

Constructs and initializes a new instance of [AiffFile](AiffFile.md) for a specified file
abstraction and specified read style.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `string` \| `IFileAbstraction` | File abstraction to use when reading and writing to the file |
| `propertiesStyle` | [`ReadStyle`](../enums/ReadStyle.md) | Level of accuracy to read the media properties, or     [ReadStyle.None](../enums/ReadStyle.md#none) to ignore the properties |

#### Overrides

[File](File.md).[constructor](File.md#constructor)

## Properties

### AIFF\_FORM\_TYPE

▪ `Static` `Readonly` **AIFF\_FORM\_TYPE**: [`ByteVector`](ByteVector.md)

Identifier used to recognize an AIFF form type.

___

### COMM\_IDENTIFIER

▪ `Static` `Readonly` **COMM\_IDENTIFIER**: [`ByteVector`](ByteVector.md)

Identifier used to recognize an AIFF common chunk.

___

### FILE\_IDENTIFIER

▪ `Static` `Readonly` **FILE\_IDENTIFIER**: [`ByteVector`](ByteVector.md)

Identifier used to recognize an AIFF file.

___

### ID3\_IDENTIFIER

▪ `Static` `Readonly` **ID3\_IDENTIFIER**: [`ByteVector`](ByteVector.md)

Identifier used to recognize an AIFF ID3 chunk.

___

### SOUND\_IDENTIFIER

▪ `Static` `Readonly` **SOUND\_IDENTIFIER**: [`ByteVector`](ByteVector.md)

Identifier used to recognize an AIFF sound data chunk.

## Accessors

### corruptionReasons

• `get` **corruptionReasons**(): `string`[]

Reasons for which this file is marked as corrupt.

#### Returns

`string`[]

#### Inherited from

File.corruptionReasons

___

### fileAbstraction

• `get` **fileAbstraction**(): `IFileAbstraction`

Gets the {@link IFileAbstraction} representing the file.

#### Returns

`IFileAbstraction`

#### Inherited from

File.fileAbstraction

___

### hasTags

• `get` **hasTags**(): `boolean`

Shortcut property to determine if a file has tags in memory.
NOTE: Just because `tag !== undefined` does not mean there are tags in memory.

#### Returns

`boolean`

#### Inherited from

File.hasTags

___

### isPossiblyCorrupt

• `get` **isPossiblyCorrupt**(): `boolean`

Indicates whether or not this file may be corrupt. Files with unknown corruptions should not
be written.

#### Returns

`boolean`

#### Inherited from

File.isPossiblyCorrupt

___

### isWritable

• `get` **isWritable**(): `boolean`

Indicates whether or not tags can be written back to the current file.

#### Returns

`boolean`

#### Inherited from

File.isWritable

___

### length

• `get` **length**(): `number`

Gets the length of the file represented by the current instance. Value will be 0 if the file
is not open for reading;

#### Returns

`number`

#### Inherited from

File.length

___

### mimeType

• `get` **mimeType**(): `string`

Gets the MimeType of the file as determined during creation of the instance.

#### Returns

`string`

#### Inherited from

File.mimeType

___

### mode

• `get` **mode**(): [`FileAccessMode`](../enums/FileAccessMode.md)

Gets the file access mode in use by the current instance.

#### Returns

[`FileAccessMode`](../enums/FileAccessMode.md)

#### Inherited from

File.mode

• `set` **mode**(`val`): `void`

Sets the file access mode in use by the current instance. Changing the value will cause the
stream currently in use to be closed, except when a change is made from
[FileAccessMode.Write](../enums/FileAccessMode.md#write) to [FileAccessMode.Read](../enums/FileAccessMode.md#read) which has no effect.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | [`FileAccessMode`](../enums/FileAccessMode.md) | File access mode to change to |

#### Returns

`void`

#### Inherited from

File.mode

___

### name

• `get` **name**(): `string`

Gets the name of the file as stored in its file abstraction.

#### Returns

`string`

#### Inherited from

File.name

___

### position

• `get` **position**(): `number`

Gets the seek position in the internal stream used by the current instance. Value will be 0
if the file is not open for reading

#### Returns

`number`

#### Inherited from

File.position

___

### properties

• `get` **properties**(): [`Properties`](Properties.md)

**`inheritdoc`**

#### Returns

[`Properties`](Properties.md)

#### Overrides

File.properties

___

### tag

• `get` **tag**(): [`Tag`](Tag.md)

**`inheritdoc`**

#### Returns

[`Tag`](Tag.md)

#### Overrides

File.tag

___

### tagTypes

• `get` **tagTypes**(): [`TagTypes`](../enums/TagTypes.md)

Gets the tag types contained in the current instance.

#### Returns

[`TagTypes`](../enums/TagTypes.md)

#### Inherited from

File.tagTypes

___

### tagTypesOnDisk

• `get` **tagTypesOnDisk**(): [`TagTypes`](../enums/TagTypes.md)

Gets the tag types contained in the physical file represented by the current instance.

#### Returns

[`TagTypes`](../enums/TagTypes.md)

#### Inherited from

File.tagTypesOnDisk

• `set` **tagTypesOnDisk**(`value`): `void`

Gets the tag types contained in the physical file represented by the current instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`TagTypes`](../enums/TagTypes.md) |

#### Returns

`void`

#### Inherited from

File.tagTypesOnDisk

___

### bufferSize

• `Static` `get` **bufferSize**(): `number`

Gets the buffer size to use when reading large blocks of data

#### Returns

`number`

#### Inherited from

File.bufferSize

## Methods

### dispose

▸ **dispose**(): `void`

Dispose the current instance. Equivalent to setting the mode to closed.

#### Returns

`void`

#### Inherited from

[File](File.md).[dispose](File.md#dispose)

___

### find

▸ **find**(`pattern`, `startPosition?`, `before?`): `number`

Searches forward through a file for a specified pattern, starting at a specified offset.

**`throws`** Error Thrown if `pattern` is not provided or `startPosition` is not a
    positive, safe integer.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `pattern` | [`ByteVector`](ByteVector.md) | `undefined` | Pattern to search for in the current instance. Must be smaller than the |
| `startPosition` | `number` | `0` | Seek position to start searching. Must be positive, safe integer. |
| `before?` | [`ByteVector`](ByteVector.md) | `undefined` | Optional pattern that the searched for pattern must appear before. If this     pattern is found first, `-1` is returned. |

#### Returns

`number`

Index at which the value was found. If not found, `-1` is returned.

#### Inherited from

[File](File.md).[find](File.md#find)

___

### getTag

▸ **getTag**(`type`, `create`): [`Tag`](Tag.md)

Gets a tag of the specified type from the current instance, optionally creating a new tag if
possible.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | [`TagTypes`](../enums/TagTypes.md) | Type of tag to read. |
| `create` | `boolean` | Whether or not to try and create the tag if one is not found. `true` does not     guarantee the tag will be created. For example, trying to create an ID3v2 tag on an OGG     Vorbis file will always fail. |

#### Returns

[`Tag`](Tag.md)

Tag object containing the tag that was found in or added to the current instance.
    If no matching tag was found and none was created, `undefined` is returned. It is safe
    to assume that if `undefined` is not returned, the returned tag can be cast to the
    appropriate type.

#### Overrides

[File](File.md).[getTag](File.md#gettag)

___

### insert

▸ **insert**(`data`, `start`, `replace?`): `void`

Inserts a specified block of data into the file represented by the current instance, at a
specified location, replacing a specified number of bytes.

**`throws`** Error Thrown when: 1) data is falsey, 2) start is not a safe, positive number, or 3)
    replace is not a safe, positive number

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `data` | [`ByteVector`](ByteVector.md) | `undefined` | Data to insert into the file. |
| `start` | `number` | `undefined` | Index into the file at which to insert the data. Must be safe positive integer. |
| `replace` | `number` | `0` | Number of bytes to replace. Typically this is the original size of the data     block so that a new block will replace the old one. |

#### Returns

`void`

#### Inherited from

[File](File.md).[insert](File.md#insert)

___

### markAsCorrupt

▸ **markAsCorrupt**(`reason`): `void`

Mark the current instance as corrupt. NOTE: Not intended to be used outside of this library.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reason` | `string` | Reason why this file is considered to be corrupt |

#### Returns

`void`

#### Inherited from

[File](File.md).[markAsCorrupt](File.md#markascorrupt)

___

### preSave

▸ `Protected` **preSave**(): `void`

Prepares to save the file. This must be called at the beginning of every File.save() method.

#### Returns

`void`

#### Inherited from

[File](File.md).[preSave](File.md#presave)

___

### rFind

▸ **rFind**(`pattern`, `startPosition?`): `number`

Searches backwards through a file for a specified pattern, starting at a specified offset.

**`throws`** Error Thrown if `pattern` was not provided or if `startPosition` is
    not a safe, positive integer.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `pattern` | [`ByteVector`](ByteVector.md) | `undefined` | Pattern to search for in the current instance. Must be shorter than the     [bufferSize](AiffFile.md#buffersize) |
| `startPosition` | `number` | `0` | Number of bytes from end of the file to begin searching. |

#### Returns

`number`

Index at which the value wa found. If not found, `-1` is returned.

#### Inherited from

[File](File.md).[rFind](File.md#rfind)

___

### readBlock

▸ **readBlock**(`length`): [`ByteVector`](ByteVector.md)

Reads a specified number of bytes at the current seek position from the current position.
This method reads the block of data at the current seek position. To change the seek
position, use [File.seek](File.md#seek).

**`throws`** Error Thrown when `length` is not a positive, safe integer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `length` | `number` | Number of bytes to read. |

#### Returns

[`ByteVector`](ByteVector.md)

ByteVector Object containing the data read from the current instance.

#### Inherited from

[File](File.md).[readBlock](File.md#readblock)

___

### removeBlock

▸ **removeBlock**(`start`, `length`): `void`

Removes a specified block of data from the file represented by the current instance.

**`throws`** Error thrown if 1) start is not a safe, positive integer or 2) length must be a safe
    integer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `start` | `number` | Index into the file at which to remove data. Must be safe, positive integer. |
| `length` | `number` | Number of bytes to remove. Must be a safe integer. |

#### Returns

`void`

#### Inherited from

[File](File.md).[removeBlock](File.md#removeblock)

___

### removeTags

▸ **removeTags**(`types`): `void`

Removes a set of tag types from the current instance. In order to remove all tags from a
file, pass [TagTypes.AllTags](../enums/TagTypes.md#alltags) as `types`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `types` | [`TagTypes`](../enums/TagTypes.md) | Bitwise combined [TagTypes](../enums/TagTypes.md) value containing the tag types to be removed     from the file |

#### Returns

`void`

#### Overrides

[File](File.md).[removeTags](File.md#removetags)

___

### save

▸ **save**(): `void`

Saves the changes made in the current instance to the file it represents.

#### Returns

`void`

#### Overrides

[File](File.md).[save](File.md#save)

___

### seek

▸ **seek**(`offset`, `origin?`): `void`

Moves the read/write pointer to a specified offset in the current instance, relative to a
specified origin.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `offset` | `number` | `undefined` | Byte offset to seek to. Must be a safe, positive integer. |
| `origin` | `SeekOrigin` | `SeekOrigin.Begin` | Origin from which to seek |

#### Returns

`void`

#### Inherited from

[File](File.md).[seek](File.md#seek)

___

### truncate

▸ `Protected` **truncate**(`length`): `void`

Resizes the current instance to a specific number of bytes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `length` | `number` | Number of bytes to resize the file to, must be a safe, positive integer. |

#### Returns

`void`

#### Inherited from

[File](File.md).[truncate](File.md#truncate)

___

### writeBlock

▸ **writeBlock**(`data`): `void`

Writes a block of data to the file represented by the current instance at the current seek
position. This will overwrite any existing data at the seek position and append new data to
the file if writing past the current end.

**`throws`** Error Thrown when `data` is not provided.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](ByteVector.md) | ByteVector containing data to the current instance. |

#### Returns

`void`

#### Inherited from

[File](File.md).[writeBlock](File.md#writeblock)

___

### addFileType

▸ `Static` **addFileType**(`mimeType`, `constructor`, `override?`): `void`

Registers the constructor for a subclass of [File](File.md) with the MimeType it is associated
with. Optionally, the MimeType can be forcefully overridden if it was already registered.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `mimeType` | `string` | `undefined` | MimeType to register this subclass constructor to. |
| `constructor` | [`FileTypeConstructor`](../modules.md#filetypeconstructor) | `undefined` | Constructor for a subclass of [File](File.md) that will be called if a file     with a MimeType of `mimeType` is created. |
| `override` | `boolean` | `false` | If `true` and a subclass of [File](File.md) was already registered to     `mimeType`, it will be forcefully overridden. If `false`, an {@link Error} will be     thrown if a subclass already registered to the MimeType.} |

#### Returns

`void`

#### Inherited from

[File](File.md).[addFileType](File.md#addfiletype)

___

### addFileTypeResolver

▸ `Static` **addFileTypeResolver**(`resolver`): `void`

Registers a [FileTypeResolver](../modules.md#filetyperesolver) to the front of the list of file type resolvers.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `resolver` | [`FileTypeResolver`](../modules.md#filetyperesolver) | Function to handle resolving a subclass of [File](File.md) from an     {@link IFileAbstraction} |

#### Returns

`void`

#### Inherited from

[File](File.md).[addFileTypeResolver](File.md#addfiletyperesolver)

___

### createFromAbstraction

▸ `Static` **createFromAbstraction**(`abstraction`, `mimeType?`, `propertiesStyle?`): [`File`](File.md)

Creates a new instance of a [File](File.md) subclass for a specified file abstraction, MimeType,
and property read style.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `abstraction` | `IFileAbstraction` | `undefined` | Object to use when reading/writing from the current instance. |
| `mimeType?` | `string` | `undefined` | Optional, MimeType to use for determining the subclass of [File](File.md) to     return. If omitted, the MimeType will be guessed based on the file's extension. |
| `propertiesStyle` | [`ReadStyle`](../enums/ReadStyle.md) | `ReadStyle.Average` | Optional, level of detail to use when reading the media information     from the new instance. If omitted, [ReadStyle.Average](../enums/ReadStyle.md#average) is used. |

#### Returns

[`File`](File.md)

New instance of [File](File.md) as read from the specified abstraction.

#### Inherited from

[File](File.md).[createFromAbstraction](File.md#createfromabstraction)

___

### createFromPath

▸ `Static` **createFromPath**(`filePath`, `mimeType?`, `propertiesStyle?`): [`File`](File.md)

Creates a new instance of [File](File.md) subclass for a specified file path, MimeType, and
property read style.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `filePath` | `string` | `undefined` | Path to the file to read/write. |
| `mimeType?` | `string` | `undefined` | Optional, MimeType to use for determining the subclass of [File](File.md) to     return. If omitted, the MimeType will be guessed based on the file's extension. |
| `propertiesStyle` | [`ReadStyle`](../enums/ReadStyle.md) | `ReadStyle.Average` | Optional, level of detail to use when reading the media information     from the new instance. If omitted [ReadStyle.Average](../enums/ReadStyle.md#average) is used. |

#### Returns

[`File`](File.md)

New instance of [File](File.md) as read from the specified path.

#### Inherited from

[File](File.md).[createFromPath](File.md#createfrompath)

___

### removeFileType

▸ `Static` **removeFileType**(`mimeType`): `void`

Used for removing a file type constructor during unit testing

#### Parameters

| Name | Type |
| :------ | :------ |
| `mimeType` | `string` |

#### Returns

`void`

#### Inherited from

[File](File.md).[removeFileType](File.md#removefiletype)

___

### removeFileTypeResolver

▸ `Static` **removeFileTypeResolver**(`resolver`): `void`

Used for removing a file type resolver during unit testing

#### Parameters

| Name | Type |
| :------ | :------ |
| `resolver` | [`FileTypeResolver`](../modules.md#filetyperesolver) |

#### Returns

`void`

#### Inherited from

[File](File.md).[removeFileTypeResolver](File.md#removefiletyperesolver)
