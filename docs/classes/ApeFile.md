[node-taglib-sharp](../README.md) / [Exports](../modules.md) / ApeFile

# Class: ApeFile

Provides tagging and properties support for Monkey's Audio APE files.
Note, a [ApeTag](ApeTag.md) will be added automatically to any file that doesn't contain one. This
change does not affect the physical file until [File.save](File.md#save) is called and can be reversed
using the following method: `file.removeTags(file.tagTypes & ~file.tagTypesOnDisk);`

## Hierarchy

- `default`

  ↳ **`ApeFile`**

## Table of contents

### Constructors

- [constructor](ApeFile.md#constructor)

### Accessors

- [corruptionReasons](ApeFile.md#corruptionreasons)
- [endTag](ApeFile.md#endtag)
- [fileAbstraction](ApeFile.md#fileabstraction)
- [hasTags](ApeFile.md#hastags)
- [isPossiblyCorrupt](ApeFile.md#ispossiblycorrupt)
- [isWritable](ApeFile.md#iswritable)
- [length](ApeFile.md#length)
- [mediaEndPosition](ApeFile.md#mediaendposition)
- [mediaStartPosition](ApeFile.md#mediastartposition)
- [mimeType](ApeFile.md#mimetype)
- [mode](ApeFile.md#mode)
- [name](ApeFile.md#name)
- [position](ApeFile.md#position)
- [properties](ApeFile.md#properties)
- [startTag](ApeFile.md#starttag)
- [tag](ApeFile.md#tag)
- [tagTypes](ApeFile.md#tagtypes)
- [tagTypesOnDisk](ApeFile.md#tagtypesondisk)
- [bufferSize](ApeFile.md#buffersize)

### Methods

- [dispose](ApeFile.md#dispose)
- [find](ApeFile.md#find)
- [getTag](ApeFile.md#gettag)
- [insert](ApeFile.md#insert)
- [markAsCorrupt](ApeFile.md#markascorrupt)
- [preSave](ApeFile.md#presave)
- [rFind](ApeFile.md#rfind)
- [readBlock](ApeFile.md#readblock)
- [readProperties](ApeFile.md#readproperties)
- [removeBlock](ApeFile.md#removeblock)
- [removeTags](ApeFile.md#removetags)
- [save](ApeFile.md#save)
- [seek](ApeFile.md#seek)
- [truncate](ApeFile.md#truncate)
- [writeBlock](ApeFile.md#writeblock)
- [addFileType](ApeFile.md#addfiletype)
- [addFileTypeResolver](ApeFile.md#addfiletyperesolver)
- [createFromAbstraction](ApeFile.md#createfromabstraction)
- [createFromPath](ApeFile.md#createfrompath)
- [removeFileType](ApeFile.md#removefiletype)
- [removeFileTypeResolver](ApeFile.md#removefiletyperesolver)

## Constructors

### constructor

• **new ApeFile**(`file`, `propertiesStyle`)

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | `string` \| `IFileAbstraction` |
| `propertiesStyle` | [`ReadStyle`](../enums/ReadStyle.md) |

#### Overrides

SandwichFile.constructor

## Accessors

### corruptionReasons

• `get` **corruptionReasons**(): `string`[]

Reasons for which this file is marked as corrupt.

#### Returns

`string`[]

#### Inherited from

SandwichFile.corruptionReasons

___

### endTag

• `Protected` `get` **endTag**(): `default`

Gets the collection of tags appearing at the end of the file.

#### Returns

`default`

#### Inherited from

SandwichFile.endTag

___

### fileAbstraction

• `get` **fileAbstraction**(): `IFileAbstraction`

Gets the {@link IFileAbstraction} representing the file.

#### Returns

`IFileAbstraction`

#### Inherited from

SandwichFile.fileAbstraction

___

### hasTags

• `get` **hasTags**(): `boolean`

Shortcut property to determine if a file has tags in memory.
NOTE: Just because `tag !== undefined` does not mean there are tags in memory.

#### Returns

`boolean`

#### Inherited from

SandwichFile.hasTags

___

### isPossiblyCorrupt

• `get` **isPossiblyCorrupt**(): `boolean`

Indicates whether or not this file may be corrupt. Files with unknown corruptions should not
be written.

#### Returns

`boolean`

#### Inherited from

SandwichFile.isPossiblyCorrupt

___

### isWritable

• `get` **isWritable**(): `boolean`

Indicates whether or not tags can be written back to the current file.

#### Returns

`boolean`

#### Inherited from

SandwichFile.isWritable

___

### length

• `get` **length**(): `number`

Gets the length of the file represented by the current instance. Value will be 0 if the file
is not open for reading;

#### Returns

`number`

#### Inherited from

SandwichFile.length

___

### mediaEndPosition

• `get` **mediaEndPosition**(): `number`

**`inheritdoc`**

#### Returns

`number`

#### Inherited from

SandwichFile.mediaEndPosition

___

### mediaStartPosition

• `get` **mediaStartPosition**(): `number`

**`inheritdoc`**

#### Returns

`number`

#### Inherited from

SandwichFile.mediaStartPosition

___

### mimeType

• `get` **mimeType**(): `string`

Gets the MimeType of the file as determined during creation of the instance.

#### Returns

`string`

#### Inherited from

SandwichFile.mimeType

___

### mode

• `get` **mode**(): [`FileAccessMode`](../enums/FileAccessMode.md)

Gets the file access mode in use by the current instance.

#### Returns

[`FileAccessMode`](../enums/FileAccessMode.md)

#### Inherited from

SandwichFile.mode

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

SandwichFile.mode

___

### name

• `get` **name**(): `string`

Gets the name of the file as stored in its file abstraction.

#### Returns

`string`

#### Inherited from

SandwichFile.name

___

### position

• `get` **position**(): `number`

Gets the seek position in the internal stream used by the current instance. Value will be 0
if the file is not open for reading

#### Returns

`number`

#### Inherited from

SandwichFile.position

___

### properties

• `get` **properties**(): [`Properties`](Properties.md)

Gets the media properties of the file represented by the current instance.

#### Returns

[`Properties`](Properties.md)

#### Inherited from

SandwichFile.properties

___

### startTag

• `Protected` `get` **startTag**(): `default`

Gets the collection of tags appearing at the start of the file.

#### Returns

`default`

#### Inherited from

SandwichFile.startTag

___

### tag

• `get` **tag**(): `default`

Gets an abstract representation of all tags stored in the current instance.

#### Returns

`default`

#### Inherited from

SandwichFile.tag

___

### tagTypes

• `get` **tagTypes**(): [`TagTypes`](../enums/TagTypes.md)

Gets the tag types contained in the current instance.

#### Returns

[`TagTypes`](../enums/TagTypes.md)

#### Inherited from

SandwichFile.tagTypes

___

### tagTypesOnDisk

• `get` **tagTypesOnDisk**(): [`TagTypes`](../enums/TagTypes.md)

Gets the tag types contained in the physical file represented by the current instance.

#### Returns

[`TagTypes`](../enums/TagTypes.md)

#### Inherited from

SandwichFile.tagTypesOnDisk

• `set` **tagTypesOnDisk**(`value`): `void`

Gets the tag types contained in the physical file represented by the current instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`TagTypes`](../enums/TagTypes.md) |

#### Returns

`void`

#### Inherited from

SandwichFile.tagTypesOnDisk

___

### bufferSize

• `Static` `get` **bufferSize**(): `number`

Gets the buffer size to use when reading large blocks of data

#### Returns

`number`

#### Inherited from

SandwichFile.bufferSize

## Methods

### dispose

▸ **dispose**(): `void`

Dispose the current instance. Equivalent to setting the mode to closed.

#### Returns

`void`

#### Inherited from

SandwichFile.dispose

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

SandwichFile.find

___

### getTag

▸ **getTag**(`type`, `create`): [`Tag`](Tag.md)

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`TagTypes`](../enums/TagTypes.md) |
| `create` | `boolean` |

#### Returns

[`Tag`](Tag.md)

#### Inherited from

SandwichFile.getTag

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

SandwichFile.insert

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

SandwichFile.markAsCorrupt

___

### preSave

▸ `Protected` **preSave**(): `void`

Prepares to save the file. This must be called at the beginning of every File.save() method.

#### Returns

`void`

#### Inherited from

SandwichFile.preSave

___

### rFind

▸ **rFind**(`pattern`, `startPosition?`): `number`

Searches backwards through a file for a specified pattern, starting at a specified offset.

**`throws`** Error Thrown if `pattern` was not provided or if `startPosition` is
    not a safe, positive integer.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `pattern` | [`ByteVector`](ByteVector.md) | `undefined` | Pattern to search for in the current instance. Must be shorter than the     [bufferSize](ApeFile.md#buffersize) |
| `startPosition` | `number` | `0` | Number of bytes from end of the file to begin searching. |

#### Returns

`number`

Index at which the value wa found. If not found, `-1` is returned.

#### Inherited from

SandwichFile.rFind

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

SandwichFile.readBlock

___

### readProperties

▸ `Protected` **readProperties**(`readStyle`): [`Properties`](Properties.md)

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `readStyle` | [`ReadStyle`](../enums/ReadStyle.md) |

#### Returns

[`Properties`](Properties.md)

#### Overrides

SandwichFile.readProperties

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

SandwichFile.removeBlock

___

### removeTags

▸ **removeTags**(`types`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `types` | [`TagTypes`](../enums/TagTypes.md) |

#### Returns

`void`

#### Inherited from

SandwichFile.removeTags

___

### save

▸ **save**(): `void`

**`inheritdoc`**

#### Returns

`void`

#### Inherited from

SandwichFile.save

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

SandwichFile.seek

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

SandwichFile.truncate

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

SandwichFile.writeBlock

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

SandwichFile.addFileType

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

SandwichFile.addFileTypeResolver

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

SandwichFile.createFromAbstraction

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

SandwichFile.createFromPath

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

SandwichFile.removeFileType

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

SandwichFile.removeFileTypeResolver
