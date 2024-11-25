[node-taglib-sharp](../README.md) / [Exports](../modules.md) / FlacFile

# Class: FlacFile

This class extends [File](File.md) to provide tagging and properties for FLAC audio files.

**`Remarks`**

A FLAC file is usually tagged using a Xiph comment block with pictures stored in
    special FLAC picture blocks. Additionally, like many other file types, ID3v1, ID3v2, and APE
    tags can be added to used to tag a FLAC file by storing them at the beginning or end of the
    file. To control the type of tags that are created by default when opening the file, see
    [FlacFileSettings](FlacFileSettings.md).

## Hierarchy

- [`File`](File.md)

  ↳ **`FlacFile`**

## Implements

- [`ISandwichFile`](../interfaces/ISandwichFile.md)

## Table of contents

### Constructors

- [constructor](FlacFile.md#constructor)

### Properties

- [FILE\_IDENTIFIER](FlacFile.md#file_identifier)

### Accessors

- [corruptionReasons](FlacFile.md#corruptionreasons)
- [fileAbstraction](FlacFile.md#fileabstraction)
- [hasTags](FlacFile.md#hastags)
- [isPossiblyCorrupt](FlacFile.md#ispossiblycorrupt)
- [isWritable](FlacFile.md#iswritable)
- [length](FlacFile.md#length)
- [mediaEndPosition](FlacFile.md#mediaendposition)
- [mediaStartPosition](FlacFile.md#mediastartposition)
- [mimeType](FlacFile.md#mimetype)
- [mode](FlacFile.md#mode)
- [name](FlacFile.md#name)
- [position](FlacFile.md#position)
- [properties](FlacFile.md#properties)
- [tag](FlacFile.md#tag)
- [tagTypes](FlacFile.md#tagtypes)
- [tagTypesOnDisk](FlacFile.md#tagtypesondisk)
- [bufferSize](FlacFile.md#buffersize)

### Methods

- [dispose](FlacFile.md#dispose)
- [find](FlacFile.md#find)
- [getTag](FlacFile.md#gettag)
- [insert](FlacFile.md#insert)
- [markAsCorrupt](FlacFile.md#markascorrupt)
- [preSave](FlacFile.md#presave)
- [rFind](FlacFile.md#rfind)
- [readBlock](FlacFile.md#readblock)
- [removeBlock](FlacFile.md#removeblock)
- [removeTags](FlacFile.md#removetags)
- [save](FlacFile.md#save)
- [seek](FlacFile.md#seek)
- [truncate](FlacFile.md#truncate)
- [writeBlock](FlacFile.md#writeblock)
- [addFileType](FlacFile.md#addfiletype)
- [addFileTypeResolver](FlacFile.md#addfiletyperesolver)
- [createFromAbstraction](FlacFile.md#createfromabstraction)
- [createFromPath](FlacFile.md#createfrompath)
- [removeFileType](FlacFile.md#removefiletype)
- [removeFileTypeResolver](FlacFile.md#removefiletyperesolver)

## Constructors

### constructor

• **new FlacFile**(`file`, `propertiesStyle`)

Constructs and initializes a new instance of a FLAC file based on the provided file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `string` \| [`IFileAbstraction`](../interfaces/IFileAbstraction.md) | File abstraction or path to a file to open as a FLAC file |
| `propertiesStyle` | [`ReadStyle`](../enums/ReadStyle.md) | How in-depth to read the properties of the file |

#### Overrides

[File](File.md).[constructor](File.md#constructor)

## Properties

### FILE\_IDENTIFIER

▪ `Static` `Readonly` **FILE\_IDENTIFIER**: [`ByteVector`](ByteVector.md)

Magic string that indicates the file is a FLAC file.

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

• `get` **fileAbstraction**(): [`IFileAbstraction`](../interfaces/IFileAbstraction.md)

Gets the [IFileAbstraction](../interfaces/IFileAbstraction.md) representing the file.

#### Returns

[`IFileAbstraction`](../interfaces/IFileAbstraction.md)

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

Indicates whether this file may be corrupt. Files with unknown corruptions should not
be written.

#### Returns

`boolean`

#### Inherited from

File.isPossiblyCorrupt

___

### isWritable

• `get` **isWritable**(): `boolean`

Indicates whether tags can be written back to the current file.

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

### mediaEndPosition

• `get` **mediaEndPosition**(): `number`

Gets the position at which the media content of this file ends.

#### Returns

`number`

#### Implementation of

[ISandwichFile](../interfaces/ISandwichFile.md).[mediaEndPosition](../interfaces/ISandwichFile.md#mediaendposition)

___

### mediaStartPosition

• `get` **mediaStartPosition**(): `number`

Gets the position at which the media content of this file starts.

#### Returns

`number`

#### Implementation of

[ISandwichFile](../interfaces/ISandwichFile.md).[mediaStartPosition](../interfaces/ISandwichFile.md#mediastartposition)

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
[Write](../enums/FileAccessMode.md#write) to [Read](../enums/FileAccessMode.md#read) which has no effect.

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

Gets the media properties of the file represented by the current instance.

#### Returns

[`Properties`](Properties.md)

#### Overrides

File.properties

___

### tag

• `get` **tag**(): [`FlacTag`](FlacTag.md)

Gets an abstract representation of all tags stored in the current instance.

#### Returns

[`FlacTag`](FlacTag.md)

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

Sets the tag types contained in the physical file represented by the current instance.

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

**`Throws`**

Error Thrown if `pattern` is not provided or `startPosition` is not a
    positive, safe integer.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `pattern` | [`ByteVector`](ByteVector.md) | `undefined` | Pattern to search for in the current instance. Must be smaller than the |
| `startPosition` | `number` | `0` | Seek position to start searching. Must be positive, safe integer. |
| `before?` | [`ByteVector`](ByteVector.md) | `undefined` | Optional pattern that the searched for pattern must appear before. If this pattern is found first, `-1` is returned. |

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
| `create` | `boolean` | Whether or not to try and create the tag if one is not found. `true` does not guarantee the tag will be created. For example, trying to create an ID3v2 tag on an OGG Vorbis file will always fail. |

#### Returns

[`Tag`](Tag.md)

#### Overrides

[File](File.md).[getTag](File.md#gettag)

___

### insert

▸ **insert**(`data`, `start`, `replace?`): `void`

Inserts a specified block of data into the file represented by the current instance, at a
specified location, replacing a specified number of bytes.

**`Throws`**

Error Thrown when: 1) data is falsey, 2) start is not a safe, positive number, or 3)
    replace is not a safe, positive number

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `data` | [`ByteVector`](ByteVector.md) | `undefined` | Data to insert into the file. |
| `start` | `number` | `undefined` | Index into the file at which to insert the data. Must be safe positive integer. |
| `replace` | `number` | `0` | Number of bytes to replace. Typically, this is the original size of the data block so that a new block will replace the old one. |

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

**`Throws`**

Error Thrown if `pattern` was not provided or if `startPosition` is
    not a safe, positive integer.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `pattern` | [`ByteVector`](ByteVector.md) | `undefined` | Pattern to search for in the current instance. Must be shorter than the [bufferSize](FlacFile.md#buffersize) |
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
position, use [seek](File.md#seek).

**`Throws`**

Error Thrown when `length` is not a positive, safe integer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `length` | `number` | Number of bytes to read. |

#### Returns

[`ByteVector`](ByteVector.md)

Object containing the data read from the current instance.

#### Inherited from

[File](File.md).[readBlock](File.md#readblock)

___

### removeBlock

▸ **removeBlock**(`start`, `length`): `void`

Removes a specified block of data from the file represented by the current instance.

**`Throws`**

Error thrown if 1) start is not a safe, positive integer or 2) length must be a safe
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
file, pass [AllTags](../enums/TagTypes.md#alltags) as `types`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `types` | [`TagTypes`](../enums/TagTypes.md) | Bitwise combined [TagTypes](../enums/TagTypes.md) value containing the tag types to be removed from the file |

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
| `origin` | [`SeekOrigin`](../enums/SeekOrigin.md) | `SeekOrigin.Begin` | Origin from which to seek |

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

**`Throws`**

Error Thrown when `data` is not provided.

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
| `constructor` | [`FileTypeConstructor`](../modules.md#filetypeconstructor) | `undefined` | Constructor for a subclass of [File](File.md) that will be called if a file with a MimeType of `mimeType` is created. |
| `override` | `boolean` | `false` | If `true` and a subclass of [File](File.md) was already registered to `mimeType`, it will be forcefully overridden. If `false`, an `Error` will be thrown if a subclass already registered to the MimeType. |

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
| `resolver` | [`FileTypeResolver`](../modules.md#filetyperesolver) | Function to handle resolving a subclass of [File](File.md) from an [IFileAbstraction](../interfaces/IFileAbstraction.md) |

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
| `abstraction` | [`IFileAbstraction`](../interfaces/IFileAbstraction.md) | `undefined` | Object to use when reading/writing from the current instance. |
| `mimeType?` | `string` | `undefined` | Optional, MimeType to use for determining the subclass of [File](File.md) to return. If omitted, the MimeType will be guessed based on the file's extension. |
| `propertiesStyle` | [`ReadStyle`](../enums/ReadStyle.md) | `ReadStyle.Average` | Optional, level of detail to use when reading the media information from the new instance. If omitted, [Average](../enums/ReadStyle.md#average) is used. |

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
| `mimeType?` | `string` | `undefined` | Optional, MimeType to use for determining the subclass of [File](File.md) to return. If omitted, the MimeType will be guessed based on the file's extension. |
| `propertiesStyle` | [`ReadStyle`](../enums/ReadStyle.md) | `ReadStyle.Average` | Optional, level of detail to use when reading the media information from the new instance. If omitted [Average](../enums/ReadStyle.md#average) is used. |

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
