[node-taglib-sharp](../README.md) / [Exports](../modules.md) / MpegContainerFile

# Class: MpegContainerFile

This class extends {@link NonContainerFile} to provide tagging and properties support for
MPEG-1, MPEG-2, and MPEG-2.5 video files.

**`remarks`** A [Id3v1Tag](id3v1tag.md) and [Id3v2Tag](id3v2tag.md) will be added automatically to any file that
    does not contain one. This change does not affect the file until it is saved and can be
    reversed using the following method:
    `file.removeTags(file.tagTypes & ~file.tagTypesOnDisk);`

## Hierarchy

- `NonContainerFile`

  ↳ **`MpegContainerFile`**

## Table of contents

### Constructors

- [constructor](mpegfile.md#constructor)

### Properties

- [\_fileAbstraction](mpegfile.md#_fileabstraction)
- [\_fileStream](mpegfile.md#_filestream)
- [\_invariantEndPosition](mpegfile.md#_invariantendposition)
- [\_invariantStartPosition](mpegfile.md#_invariantstartposition)
- [\_tagTypesOnDisk](mpegfile.md#_tagtypesondisk)

### Accessors

- [corruptionReasons](mpegfile.md#corruptionreasons)
- [endTag](mpegfile.md#endtag)
- [fileAbstraction](mpegfile.md#fileabstraction)
- [invariantEndPosition](mpegfile.md#invariantendposition)
- [invariantStartPosition](mpegfile.md#invariantstartposition)
- [isPossiblyCorrupt](mpegfile.md#ispossiblycorrupt)
- [isWritable](mpegfile.md#iswritable)
- [length](mpegfile.md#length)
- [mimeType](mpegfile.md#mimetype)
- [mode](mpegfile.md#mode)
- [name](mpegfile.md#name)
- [position](mpegfile.md#position)
- [properties](mpegfile.md#properties)
- [startTag](mpegfile.md#starttag)
- [tag](mpegfile.md#tag)
- [tagTypes](mpegfile.md#tagtypes)
- [tagTypesOnDisk](mpegfile.md#tagtypesondisk)
- [bufferSize](mpegfile.md#buffersize)

### Methods

- [dispose](mpegfile.md#dispose)
- [find](mpegfile.md#find)
- [getTag](mpegfile.md#gettag)
- [insert](mpegfile.md#insert)
- [markAsCorrupt](mpegfile.md#markascorrupt)
- [preSave](mpegfile.md#presave)
- [rFind](mpegfile.md#rfind)
- [readBlock](mpegfile.md#readblock)
- [readEnd](mpegfile.md#readend)
- [readProperties](mpegfile.md#readproperties)
- [readStart](mpegfile.md#readstart)
- [removeBlock](mpegfile.md#removeblock)
- [removeTags](mpegfile.md#removetags)
- [save](mpegfile.md#save)
- [seek](mpegfile.md#seek)
- [truncate](mpegfile.md#truncate)
- [writeBlock](mpegfile.md#writeblock)
- [addFileType](mpegfile.md#addfiletype)
- [addFileTypeResolver](mpegfile.md#addfiletyperesolver)
- [createFromAbstraction](mpegfile.md#createfromabstraction)
- [createFromPath](mpegfile.md#createfrompath)
- [removeFileType](mpegfile.md#removefiletype)
- [removeFileTypeResolver](mpegfile.md#removefiletyperesolver)

## Constructors

### constructor

• **new MpegContainerFile**(`file`, `propertiesStyle`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | `string` \| `IFileAbstraction` |
| `propertiesStyle` | [`ReadStyle`](../enums/readstyle.md) |

#### Overrides

NonContainerFile.constructor

## Properties

### \_fileAbstraction

• `Protected` **\_fileAbstraction**: `IFileAbstraction`

#### Inherited from

NonContainerFile.\_fileAbstraction

___

### \_fileStream

• `Protected` **\_fileStream**: `IStream`

#### Inherited from

NonContainerFile.\_fileStream

___

### \_invariantEndPosition

• `Protected` **\_invariantEndPosition**: `number` = `-1`

#### Inherited from

NonContainerFile.\_invariantEndPosition

___

### \_invariantStartPosition

• `Protected` **\_invariantStartPosition**: `number` = `-1`

#### Inherited from

NonContainerFile.\_invariantStartPosition

___

### \_tagTypesOnDisk

• `Protected` **\_tagTypesOnDisk**: [`TagTypes`](../enums/tagtypes.md)

#### Inherited from

NonContainerFile.\_tagTypesOnDisk

## Accessors

### corruptionReasons

• `get` **corruptionReasons**(): `string`[]

Reasons for which this file is marked as corrupt.

#### Returns

`string`[]

___

### endTag

• `Protected` `get` **endTag**(): `default`

Gets the collection of tags appearing at the end of the file.

#### Returns

`default`

___

### fileAbstraction

• `get` **fileAbstraction**(): `IFileAbstraction`

Gets the {@link IFileAbstraction} representing the file.

#### Returns

`IFileAbstraction`

___

### invariantEndPosition

• `get` **invariantEndPosition**(): `number`

Gets the position at which the invariant (media) portion of the current instance ends. If
the value could not be determined, `-1` is returned;

#### Returns

`number`

___

### invariantStartPosition

• `get` **invariantStartPosition**(): `number`

Gets the position at which the invariant (media) portion of the current instance begins. If
the value could not be determined, `-1` is returned.

#### Returns

`number`

___

### isPossiblyCorrupt

• `get` **isPossiblyCorrupt**(): `boolean`

Indicates whether or not this file may be corrupt. Files with unknown corruptions should not
be written.

#### Returns

`boolean`

___

### isWritable

• `get` **isWritable**(): `boolean`

Indicates whether or not tags can be written back to the current file.

#### Returns

`boolean`

___

### length

• `get` **length**(): `number`

Gets the length of the file represented by the current instance. Value will be 0 if the file
is not open for reading;

#### Returns

`number`

___

### mimeType

• `get` **mimeType**(): `string`

Gets the MimeType of the file as determined during creation of the instance.

#### Returns

`string`

___

### mode

• `get` **mode**(): [`FileAccessMode`](../enums/fileaccessmode.md)

Gets the file access mode in use by the current instance.

#### Returns

[`FileAccessMode`](../enums/fileaccessmode.md)

• `set` **mode**(`val`): `void`

Sets the file access mode in use by the current instance. Changing the value will cause the
stream currently in use to be closed, except when a change is made from
[FileAccessMode.Write](../enums/fileaccessmode.md#write) to [FileAccessMode.Read](../enums/fileaccessmode.md#read) which has no effect.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | [`FileAccessMode`](../enums/fileaccessmode.md) | File access mode to change to |

#### Returns

`void`

___

### name

• `get` **name**(): `string`

Gets the name of the file as stored in its file abstraction.

#### Returns

`string`

___

### position

• `get` **position**(): `number`

Gets the seek position in the internal stream used by the current instance. Value will be 0
if the file is not open for reading

#### Returns

`number`

___

### properties

• `get` **properties**(): [`Properties`](properties.md)

Gets the media properties of the file represented by the current instance.

#### Returns

[`Properties`](properties.md)

___

### startTag

• `Protected` `get` **startTag**(): `default`

Gets the collection of tags appearing at the start of the file.

#### Returns

`default`

___

### tag

• `get` **tag**(): `default`

Gets an abstract representation of all tags stored in the current instance.

#### Returns

`default`

___

### tagTypes

• `get` **tagTypes**(): [`TagTypes`](../enums/tagtypes.md)

Gets the tag types contained in the current instance.

#### Returns

[`TagTypes`](../enums/tagtypes.md)

___

### tagTypesOnDisk

• `get` **tagTypesOnDisk**(): [`TagTypes`](../enums/tagtypes.md)

Gets the tag types contained in the physical file represented by the current instance.

#### Returns

[`TagTypes`](../enums/tagtypes.md)

___

### bufferSize

• `Static` `get` **bufferSize**(): `number`

Gets the buffer size to use when reading large blocks of data

#### Returns

`number`

## Methods

### dispose

▸ **dispose**(): `void`

Dispose the current instance. Equivalent to setting the mode to closed.

#### Returns

`void`

#### Inherited from

NonContainerFile.dispose

___

### find

▸ **find**(`pattern`, `startPosition?`, `before?`): `number`

Searches forward through a file for a specified pattern, starting at a specified offset.

**`throws`** Error Thrown if `pattern` is not provided or `startPosition` is not a
    positive, safe integer.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `pattern` | [`ByteVector`](bytevector.md) | `undefined` | Pattern to search for in the current instance. Must be smaller than the |
| `startPosition` | `number` | `0` | Seek position to start searching. Must be positive, safe integer. |
| `before?` | [`ByteVector`](bytevector.md) | `undefined` | Optional pattern that the searched for pattern must appear before. If this     pattern is found first, `-1` is returned. |

#### Returns

`number`

Index at which the value was found. If not found, `-1` is returned.

#### Inherited from

NonContainerFile.find

___

### getTag

▸ **getTag**(`type`, `create`): [`Tag`](tag.md)

Gets a tag of a specified type from the current instance, optionally creating a new tag if
possible.

**`remarks`** [Id3v2Tag](id3v2tag.md), [Id3v1Tag](id3v1tag.md), and [ApeTag](apetag.md) will be added to the end of
    the file. All other tag types will be ignored as they are unsupported by MPEG files.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | [`TagTypes`](../enums/tagtypes.md) | Type of tag to read |
| `create` | `boolean` | Whether or not to try and create the tag if one is not found |

#### Returns

[`Tag`](tag.md)

Tag Tag that was found in or added to the current instance. If no matching tag was
    found and none was created, `undefined` is returned.

#### Overrides

NonContainerFile.getTag

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
| `data` | [`ByteVector`](bytevector.md) | `undefined` | Data to insert into the file. |
| `start` | `number` | `undefined` | Index into the file at which to insert the data. Must be safe positive integer. |
| `replace` | `number` | `0` | Number of bytes to replace. Typically this is the original size of the data     block so that a new block will replace the old one. |

#### Returns

`void`

#### Inherited from

NonContainerFile.insert

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

NonContainerFile.markAsCorrupt

___

### preSave

▸ `Protected` **preSave**(): `void`

Prepares to save the file. This must be called at the beginning of every File.save() method.

#### Returns

`void`

#### Inherited from

NonContainerFile.preSave

___

### rFind

▸ **rFind**(`pattern`, `startPosition?`, `after?`): `number`

Searched backwards through a file for a specified pattern, starting at a specified offset.

**`throws`** Error Thrown if `pattern` was not provided or if `startPosition` is
    not a safe, positive integer.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `pattern` | [`ByteVector`](bytevector.md) | `undefined` | Pattern to search for in the current instance. Must be shorter than the     [bufferSize](mpegfile.md#buffersize) |
| `startPosition` | `number` | `0` | Seek position from which to start searching. |
| `after?` | [`ByteVector`](bytevector.md) | `undefined` | Pattern that the searched for pattern must appear after. If this pattern is     found first, `-1` is returned. |

#### Returns

`number`

Index at which the value wa found. If not found, `-1` is returned.

#### Inherited from

NonContainerFile.rFind

___

### readBlock

▸ **readBlock**(`length`): [`ByteVector`](bytevector.md)

Reads a specified number of bytes at the current seek position from the current position.
This method reads the block of data at the current seek position. To change the seek
position, use [File.seek](file.md#seek).

**`throws`** Error Thrown when `length` is not a positive, safe integer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `length` | `number` | Number of bytes to read. |

#### Returns

[`ByteVector`](bytevector.md)

ByteVector Object containing the data read from the current instance.

#### Inherited from

NonContainerFile.readBlock

___

### readEnd

▸ `Protected` **readEnd**(`end`, `propertiesStyle`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `end` | `number` |
| `propertiesStyle` | [`ReadStyle`](../enums/readstyle.md) |

#### Returns

`void`

#### Overrides

NonContainerFile.readEnd

___

### readProperties

▸ `Protected` **readProperties**(`_start`, `_end`, `_propertiesStyle`): [`Properties`](properties.md)

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `_start` | `number` |
| `_end` | `number` |
| `_propertiesStyle` | [`ReadStyle`](../enums/readstyle.md) |

#### Returns

[`Properties`](properties.md)

#### Overrides

NonContainerFile.readProperties

___

### readStart

▸ `Protected` **readStart**(`start`, `propertiesStyle`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `start` | `number` |
| `propertiesStyle` | [`ReadStyle`](../enums/readstyle.md) |

#### Returns

`void`

#### Overrides

NonContainerFile.readStart

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

NonContainerFile.removeBlock

___

### removeTags

▸ **removeTags**(`types`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `types` | [`TagTypes`](../enums/tagtypes.md) |

#### Returns

`void`

#### Inherited from

NonContainerFile.removeTags

___

### save

▸ **save**(): `void`

**`inheritdoc`**

#### Returns

`void`

#### Inherited from

NonContainerFile.save

___

### seek

▸ **seek**(`offset`, `origin?`): `void`

Moves the read/write pointer to a specified offset in the current instance, relative to a
specified origin.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `offset` | `number` | Byte offset to seek to. Must be a safe, positive integer. |
| `origin` | `SeekOrigin` | Origin from which to seek |

#### Returns

`void`

#### Inherited from

NonContainerFile.seek

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

NonContainerFile.truncate

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
| `data` | [`ByteVector`](bytevector.md) | ByteVector containing data to the current instance. |

#### Returns

`void`

#### Inherited from

NonContainerFile.writeBlock

___

### addFileType

▸ `Static` **addFileType**(`mimeType`, `constructor`, `override?`): `void`

Registers the constructor for a subclass of [File](file.md) with the MimeType it is associated
with. Optionally, the MimeType can be forcefully overridden if it was already registered.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `mimeType` | `string` | `undefined` | MimeType to register this subclass constructor to. |
| `constructor` | [`FileTypeConstructor`](../modules.md#filetypeconstructor) | `undefined` | Constructor for a subclass of [File](file.md) that will be called if a file     with a MimeType of `mimeType` is created. |
| `override` | `boolean` | `false` | If `true` and a subclass of [File](file.md) was already registered to     `mimeType`, it will be forcefully overridden. If `false`, an {@link Error} will be     thrown if a subclass already registered to the MimeType.} |

#### Returns

`void`

#### Inherited from

NonContainerFile.addFileType

___

### addFileTypeResolver

▸ `Static` **addFileTypeResolver**(`resolver`): `void`

Registers a [FileTypeResolver](../modules.md#filetyperesolver) to the front of the list of file type resolvers.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `resolver` | [`FileTypeResolver`](../modules.md#filetyperesolver) | Function to handle resolving a subclass of [File](file.md) from an     {@link IFileAbstraction} |

#### Returns

`void`

#### Inherited from

NonContainerFile.addFileTypeResolver

___

### createFromAbstraction

▸ `Static` **createFromAbstraction**(`abstraction`, `mimeType?`, `propertiesStyle?`): [`File`](file.md)

Creates a new instance of a [File](file.md) subclass for a specified file abstraction, MimeType,
and property read style.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `abstraction` | `IFileAbstraction` | Object to use when reading/writing from the current instance. |
| `mimeType?` | `string` | Optional, MimeType to use for determining the subclass of [File](file.md) to     return. If omitted, the MimeType will be guessed based on the file's extension. |
| `propertiesStyle` | [`ReadStyle`](../enums/readstyle.md) | Optional, level of detail to use when reading the media information     from the new instance. If omitted, [ReadStyle.Average](../enums/readstyle.md#average) is used. |

#### Returns

[`File`](file.md)

New instance of [File](file.md) as read from the specified abstraction.

#### Inherited from

NonContainerFile.createFromAbstraction

___

### createFromPath

▸ `Static` **createFromPath**(`filePath`, `mimeType?`, `propertiesStyle?`): [`File`](file.md)

Creates a new instance of [File](file.md) subclass for a specified file path, MimeType, and
property read style.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filePath` | `string` | Path to the file to read/write. |
| `mimeType?` | `string` | Optional, MimeType to use for determining the subclass of [File](file.md) to     return. If omitted, the MimeType will be guessed based on the file's extension. |
| `propertiesStyle` | [`ReadStyle`](../enums/readstyle.md) | Optional, level of detail to use when reading the media information     from the new instance. If omitted [ReadStyle.Average](../enums/readstyle.md#average) is used. |

#### Returns

[`File`](file.md)

New instance of [File](file.md) as read from the specified path.

#### Inherited from

NonContainerFile.createFromPath

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

NonContainerFile.removeFileType

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

NonContainerFile.removeFileTypeResolver
