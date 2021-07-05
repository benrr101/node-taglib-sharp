[node-taglib-sharp](../README.md) / [Exports](../modules.md) / File

# Class: File

This abstract class provides a basic framework for reading and writing to a file, as well as
accessing basic tagging and media properties.

**`remarks`** This class is agnostic to all specific media types. Its child classes, on the other
    hand, support the intricacies of different media and tagging formats. For example
    {@link Mpeg4File} supports the MPEG-4 specification and Apple's tagging format. Each file
    type can be created using its format specific constructors, but the preferred method is to
    use [File.createFromPath](file.md#createfrompath) or [File.createFromAbstraction](file.md#createfromabstraction) as it automatically
    detects the appropriate class from the file extension or provided MimeType.

## Hierarchy

- **`File`**

  ↳ [`AiffFile`](aifffile.md)

  ↳ [`AsfFile`](asffile.md)

  ↳ [`RiffFile`](rifffile.md)

## Table of contents

### Constructors

- [constructor](file.md#constructor)

### Properties

- [\_fileAbstraction](file.md#_fileabstraction)
- [\_fileStream](file.md#_filestream)
- [\_invariantEndPosition](file.md#_invariantendposition)
- [\_invariantStartPosition](file.md#_invariantstartposition)
- [\_tagTypesOnDisk](file.md#_tagtypesondisk)

### Accessors

- [corruptionReasons](file.md#corruptionreasons)
- [fileAbstraction](file.md#fileabstraction)
- [invariantEndPosition](file.md#invariantendposition)
- [invariantStartPosition](file.md#invariantstartposition)
- [isPossiblyCorrupt](file.md#ispossiblycorrupt)
- [isWritable](file.md#iswritable)
- [length](file.md#length)
- [mimeType](file.md#mimetype)
- [mode](file.md#mode)
- [name](file.md#name)
- [position](file.md#position)
- [properties](file.md#properties)
- [tag](file.md#tag)
- [tagTypes](file.md#tagtypes)
- [tagTypesOnDisk](file.md#tagtypesondisk)
- [bufferSize](file.md#buffersize)

### Methods

- [dispose](file.md#dispose)
- [find](file.md#find)
- [getTag](file.md#gettag)
- [insert](file.md#insert)
- [markAsCorrupt](file.md#markascorrupt)
- [preSave](file.md#presave)
- [rFind](file.md#rfind)
- [readBlock](file.md#readblock)
- [removeBlock](file.md#removeblock)
- [removeTags](file.md#removetags)
- [save](file.md#save)
- [seek](file.md#seek)
- [truncate](file.md#truncate)
- [writeBlock](file.md#writeblock)
- [addFileType](file.md#addfiletype)
- [addFileTypeResolver](file.md#addfiletyperesolver)
- [createFromAbstraction](file.md#createfromabstraction)
- [createFromPath](file.md#createfrompath)
- [removeFileType](file.md#removefiletype)
- [removeFileTypeResolver](file.md#removefiletyperesolver)

## Constructors

### constructor

• `Protected` **new File**(`file`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | `string` \| `IFileAbstraction` |

## Properties

### \_fileAbstraction

• `Protected` **\_fileAbstraction**: `IFileAbstraction`

___

### \_fileStream

• `Protected` **\_fileStream**: `IStream`

___

### \_invariantEndPosition

• `Protected` **\_invariantEndPosition**: `number` = `-1`

___

### \_invariantStartPosition

• `Protected` **\_invariantStartPosition**: `number` = `-1`

___

### \_tagTypesOnDisk

• `Protected` **\_tagTypesOnDisk**: [`TagTypes`](../enums/tagtypes.md)

## Accessors

### corruptionReasons

• `get` **corruptionReasons**(): `string`[]

Reasons for which this file is marked as corrupt.

#### Returns

`string`[]

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

• `Abstract` `get` **properties**(): [`Properties`](properties.md)

Gets the media properties of the file represented by the current instance.

#### Returns

[`Properties`](properties.md)

___

### tag

• `Abstract` `get` **tag**(): [`Tag`](tag.md)

Gets an abstract representation of all tags stored in the current instance.

**`remarks`** This property provides generic and general access to the most common tagging
    features of a file. To access or add a specific type of tag in the file, use
    [File.getTag](file.md#gettag).

#### Returns

[`Tag`](tag.md)

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

___

### getTag

▸ `Abstract` **getTag**(`types`, `create`): [`Tag`](tag.md)

Gets a tag of the specified type from the current instance, optionally creating a new tag if
possible.

**`example`** ```
    id3 = file.getTag(TagTypes.ID3v2, true);
    if (id3) { (<ID3v2.Tag> id3).setTextFrame("TMOO", moods); }

    asf = file.getTag(TagTypes.Asf, true);
    if (asf) { (<Asf.Tag> adf).setDescriptorStrings(moods, "WM/Mood", "Mood"); }

    ape = file.getTag(TagTypes.Ape);
    if (ape) { (<Ape.Tag>).setValue("MOOD", moods); }
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `types` | [`TagTypes`](../enums/tagtypes.md) | Type of tag to read. |
| `create` | `boolean` | Whether or not to try and create the tag if one is not found. `true` does not     guarantee the tag will be created. For example, trying to create an ID3v2 tag on an OGG     Vorbis file will always fail. |

#### Returns

[`Tag`](tag.md)

Tag object containing the tag that was found in or added to the current instance.
    If no matching tag was found and none was created, `undefined` is returned. It is safe
    to assume that if `undefined` is not returned, the returned tag can be cast to the
    appropriate type.

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

___

### preSave

▸ `Protected` **preSave**(): `void`

Prepares to save the file. This must be called at the beginning of every File.save() method.

#### Returns

`void`

___

### rFind

▸ **rFind**(`pattern`, `startPosition?`, `after?`): `number`

Searched backwards through a file for a specified pattern, starting at a specified offset.

**`throws`** Error Thrown if `pattern` was not provided or if `startPosition` is
    not a safe, positive integer.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `pattern` | [`ByteVector`](bytevector.md) | `undefined` | Pattern to search for in the current instance. Must be shorter than the     [bufferSize](file.md#buffersize) |
| `startPosition` | `number` | `0` | Seek position from which to start searching. |
| `after?` | [`ByteVector`](bytevector.md) | `undefined` | Pattern that the searched for pattern must appear after. If this pattern is     found first, `-1` is returned. |

#### Returns

`number`

Index at which the value wa found. If not found, `-1` is returned.

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

___

### removeTags

▸ `Abstract` **removeTags**(`types`): `void`

Removes a set of tag types from the current instance. In order to remove all tags from a
file, pass [TagTypes.AllTags](../enums/tagtypes.md#alltags) as `types`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `types` | [`TagTypes`](../enums/tagtypes.md) | Bitwise combined [TagTypes](../enums/tagtypes.md) value containing the tag types to be removed     from the file |

#### Returns

`void`

___

### save

▸ `Abstract` **save**(): `void`

Saves the changes made in the current instance to the file it represents.

#### Returns

`void`

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
