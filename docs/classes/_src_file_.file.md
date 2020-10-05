**node-taglib-sharp**

> [README](../README.md) / [Globals](../globals.md) / ["src/file"](../modules/_src_file_.md) / File

# Class: File

This abstract class provides a basic framework for reading and writing to a file, as well as
accessing basic tagging and media properties.

**`description`** This class is agnostic to all specific media types. Its child classes, on the other
    hand, support the intricacies of different media and tagging formats. For example
    {@see Mpeg4File} supports the MPEG-4 specification and Apple's tagging format. Each file
    type can be created using its format specific constructors, but the preferred method is to
    use {@see File.createFromPath} or {@see File.createFromAbstraction} as it automatically
    detects the appropriate class from the file extension or provided MimeType.

## Hierarchy

* **File**

  ↳ [NonContainerFile](_src_noncontainer_noncontainerfile_.noncontainerfile.md)

## Index

### Constructors

* [constructor](_src_file_.file.md#constructor)

### Properties

* [\_fileAbstraction](_src_file_.file.md#_fileabstraction)
* [\_fileStream](_src_file_.file.md#_filestream)
* [\_invariantEndPosition](_src_file_.file.md#_invariantendposition)
* [\_invariantStartPosition](_src_file_.file.md#_invariantstartposition)
* [\_tagTypesOnDisk](_src_file_.file.md#_tagtypesondisk)

### Accessors

* [corruptionReasons](_src_file_.file.md#corruptionreasons)
* [fileAbstraction](_src_file_.file.md#fileabstraction)
* [invariantEndPosition](_src_file_.file.md#invariantendposition)
* [invariantStartPosition](_src_file_.file.md#invariantstartposition)
* [isPossiblyCorrupt](_src_file_.file.md#ispossiblycorrupt)
* [isWritable](_src_file_.file.md#iswritable)
* [length](_src_file_.file.md#length)
* [mimeType](_src_file_.file.md#mimetype)
* [mode](_src_file_.file.md#mode)
* [name](_src_file_.file.md#name)
* [position](_src_file_.file.md#position)
* [properties](_src_file_.file.md#properties)
* [tag](_src_file_.file.md#tag)
* [tagTypes](_src_file_.file.md#tagtypes)
* [tagTypesOnDisk](_src_file_.file.md#tagtypesondisk)
* [bufferSize](_src_file_.file.md#buffersize)

### Methods

* [dispose](_src_file_.file.md#dispose)
* [find](_src_file_.file.md#find)
* [getTag](_src_file_.file.md#gettag)
* [insert](_src_file_.file.md#insert)
* [markAsCorrupt](_src_file_.file.md#markascorrupt)
* [preSave](_src_file_.file.md#presave)
* [rFind](_src_file_.file.md#rfind)
* [readBlock](_src_file_.file.md#readblock)
* [removeBlock](_src_file_.file.md#removeblock)
* [removeTags](_src_file_.file.md#removetags)
* [save](_src_file_.file.md#save)
* [seek](_src_file_.file.md#seek)
* [truncate](_src_file_.file.md#truncate)
* [writeBlock](_src_file_.file.md#writeblock)
* [addFileType](_src_file_.file.md#addfiletype)
* [addFileTypeResolver](_src_file_.file.md#addfiletyperesolver)
* [createFromAbstraction](_src_file_.file.md#createfromabstraction)
* [createFromPath](_src_file_.file.md#createfrompath)
* [removeFileType](_src_file_.file.md#removefiletype)
* [removeFileTypeResolver](_src_file_.file.md#removefiletyperesolver)

## Constructors

### constructor

\+ `Protected`**new File**(`file`: [IFileAbstraction](../interfaces/_src_fileabstraction_.ifileabstraction.md) \| string): [File](_src_file_.file.md)

*Defined in src/file.ts:96*

#### Parameters:

Name | Type |
------ | ------ |
`file` | [IFileAbstraction](../interfaces/_src_fileabstraction_.ifileabstraction.md) \| string |

**Returns:** [File](_src_file_.file.md)

## Properties

### \_fileAbstraction

• `Protected` **\_fileAbstraction**: [IFileAbstraction](../interfaces/_src_fileabstraction_.ifileabstraction.md)

*Defined in src/file.ts:89*

___

### \_fileStream

• `Protected` **\_fileStream**: [IStream](../interfaces/_src_stream_.istream.md)

*Defined in src/file.ts:90*

___

### \_invariantEndPosition

• `Protected` **\_invariantEndPosition**: number = -1

*Defined in src/file.ts:91*

___

### \_invariantStartPosition

• `Protected` **\_invariantStartPosition**: number = -1

*Defined in src/file.ts:92*

___

### \_tagTypesOnDisk

• `Protected` **\_tagTypesOnDisk**: [TagTypes](../enums/_src_tag_.tagtypes.md) = TagTypes.None

*Defined in src/file.ts:93*

## Accessors

### corruptionReasons

• get **corruptionReasons**(): string[]

*Defined in src/file.ts:178*

Reasons for which this file is marked as corrupt.

**Returns:** string[]

___

### fileAbstraction

• get **fileAbstraction**(): [IFileAbstraction](../interfaces/_src_fileabstraction_.ifileabstraction.md)

*Defined in src/file.ts:183*

Gets the {@see IFileAbstraction} representing the file.

**Returns:** [IFileAbstraction](../interfaces/_src_fileabstraction_.ifileabstraction.md)

___

### invariantEndPosition

• get **invariantEndPosition**(): number

*Defined in src/file.ts:189*

Gets the position at which the invariant (media) portion of the current instance ends. If
the value could not be determined, `-1` is returned;

**Returns:** number

___

### invariantStartPosition

• get **invariantStartPosition**(): number

*Defined in src/file.ts:195*

Gets the position at which the invariant (media) portion of the current instance begins. If
the value could not be determined, `-1` is returned.

**Returns:** number

___

### isPossiblyCorrupt

• get **isPossiblyCorrupt**(): boolean

*Defined in src/file.ts:201*

Indicates whether or not this file may be corrupt. Files with unknown corruptions should not
be written.

**Returns:** boolean

___

### isWritable

• get **isWritable**(): boolean

*Defined in src/file.ts:206*

Indicates whether or not tags can be written back to the current file.

**Returns:** boolean

___

### length

• get **length**(): number

*Defined in src/file.ts:212*

Gets the length of the file represented by the current instance. Value will be 0 if the file
is not open for reading;

**Returns:** number

___

### mimeType

• get **mimeType**(): string

*Defined in src/file.ts:218*

Gets the MimeType of the file as determined by {@see File.create} if that method was used to
create the current instance.

**Returns:** string

___

### mode

• get **mode**(): [FileAccessMode](../enums/_src_file_.fileaccessmode.md)

*Defined in src/file.ts:223*

Gets the file access mode in use by the current instance.

**Returns:** [FileAccessMode](../enums/_src_file_.fileaccessmode.md)

• set **mode**(`val`: [FileAccessMode](../enums/_src_file_.fileaccessmode.md)): void

*Defined in src/file.ts:239*

Sets the file access mode in use by the current instance. Changing the value will cause the
stream currently in use to be closed, except when a change is made from
{@see FileAccessMode.Write} to {@see FileAccessMode.Read} which has no effect.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`val` | [FileAccessMode](../enums/_src_file_.fileaccessmode.md) | File access mode to change to  |

**Returns:** void

___

### name

• get **name**(): string

*Defined in src/file.ts:267*

Gets the name of the file as stored in its file abstraction.

**Returns:** string

___

### position

• get **position**(): number

*Defined in src/file.ts:273*

Gets the seek position in the internal stream used by the current instance. Value will be 0
if the file is not open for reading

**Returns:** number

___

### properties

• get **properties**(): [Properties](_src_properties_.properties.md)

*Defined in src/file.ts:278*

Gets the media properties of the file represented by the current instance.

**Returns:** [Properties](_src_properties_.properties.md)

___

### tag

• get **tag**(): [Tag](_src_tag_.tag.md)

*Defined in src/file.ts:286*

Gets an abstract representaion of all tags stored in the current instance.

**`description`** This property provides generic and general access to the most common tagging
    features of a file. To access or add a specific type of tag in the file, use
    {@see File.getTag}.

**Returns:** [Tag](_src_tag_.tag.md)

___

### tagTypes

• get **tagTypes**(): [TagTypes](../enums/_src_tag_.tagtypes.md)

*Defined in src/file.ts:291*

Gets the tag typescontained in the current instance.

**Returns:** [TagTypes](../enums/_src_tag_.tagtypes.md)

___

### tagTypesOnDisk

• get **tagTypesOnDisk**(): [TagTypes](../enums/_src_tag_.tagtypes.md)

*Defined in src/file.ts:296*

Gets the tag types contained in the physical file represented by the current instance.

**Returns:** [TagTypes](../enums/_src_tag_.tagtypes.md)

___

### bufferSize

• `Static`get **bufferSize**(): number

*Defined in src/file.ts:173*

Gets the buffer size to use when reading large blocks of data

**Returns:** number

## Methods

### dispose

▸ **dispose**(): void

*Defined in src/file.ts:351*

Dispose the current instance. Equivalent to setting the mode to closed.

**Returns:** void

___

### find

▸ **find**(`pattern`: [ByteVector](_src_bytevector_.bytevector.md), `startPosition`: number, `before?`: [ByteVector](_src_bytevector_.bytevector.md)): number

*Defined in src/file.ts:365*

Searches forward through a file for a specified pattern, starting at a specified offset.

**`throws`** Error Thrown if {@param pattern} is not provided or {@param startPosition} is not a
    positive, safe integer.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`pattern` | [ByteVector](_src_bytevector_.bytevector.md) | - | Pattern to search for in the current instance. Must be smaller than the |
`startPosition` | number | 0 | Seek position to start searching. Must be positive, safe integer. |
`before?` | [ByteVector](_src_bytevector_.bytevector.md) | - | Optional pattern that the searched for pattern must appear before. If this     pattern is found first, `-1` is returned. |

**Returns:** number

Index at which the value was found. If not found, `-1` is returned.

___

### getTag

▸ `Abstract`**getTag**(`types`: [TagTypes](../enums/_src_tag_.tagtypes.md), `create`: boolean): [Tag](_src_tag_.tag.md)

*Defined in src/file.ts:434*

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

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`types` | [TagTypes](../enums/_src_tag_.tagtypes.md) | Type of tag to read. |
`create` | boolean | Whether or not to try and create the tag if one is not found. `true` does not     guarantee the tag will be created. For example, trying to create an ID3v2 tag on an OGG     Vorbis file will always fail. |

**Returns:** [Tag](_src_tag_.tag.md)

Tag object containing the tag that was found in or added to the current instance.
    If no matching tag was found and none was created, `undefined` is returned. It is safe
    to assume that if `undefined` is not returned, the returned tag can be cast to the
    appropriate type.

___

### insert

▸ **insert**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `start`: number, `replace`: number): void

*Defined in src/file.ts:446*

Inserts a specified block of data into the file represented by the current instance, at a
specified location, replacing a specified number of bytes.

**`throws`** Error Thrown when: 1) data is falsey, 2) start is not a safe, positive number, or 3)
    replace is not a safe, positive number

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | - | Data to insert into the file. |
`start` | number | - | Index into the file at which to insert the data. Must be safe positive integer. |
`replace` | number | 0 | Number of bytes to replace. Typically this is the original size of the data     block so that a new block will replace the old one. |

**Returns:** void

___

### markAsCorrupt

▸ **markAsCorrupt**(`reason`: string): void

*Defined in src/file.ts:505*

Mark the current instance as corrupt. NOTE: Not intended to be used outside of this library.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`reason` | string | Reason why this file is considered to be corrupt  |

**Returns:** void

___

### preSave

▸ `Protected`**preSave**(): void

*Defined in src/file.ts:679*

Prepares to save the file. This must be called at the beginning of every File.save() method.

**Returns:** void

___

### rFind

▸ **rFind**(`pattern`: [ByteVector](_src_bytevector_.bytevector.md), `startPosition`: number, `after?`: [ByteVector](_src_bytevector_.bytevector.md)): number

*Defined in src/file.ts:591*

Searched backwards through a file for a specified patterh, starting at a specified offset.

**`throws`** Error Thrown if {@param pattern} was not provided or if {@param startPosition} is
    not a safe, positive integer.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`pattern` | [ByteVector](_src_bytevector_.bytevector.md) | - | Pattern to search for in the current instance. Must be shorter than the     {@see bufferSize} |
`startPosition` | number | 0 | Seek position from which to start searching. |
`after?` | [ByteVector](_src_bytevector_.bytevector.md) | - | Pattern that the searched for pattern must appear after. If this pattern is     found first, `-1` is returned. |

**Returns:** number

Index at which the value wa found. If not found, `-1` is returned.

___

### readBlock

▸ **readBlock**(`length`: number): [ByteVector](_src_bytevector_.bytevector.md)

*Defined in src/file.ts:517*

Reads a specified number of bytes at the current seek position from the current position.
This method reads the block of data at the current seek position. To change the seek
position, use {@see File.seek}.

**`throws`** Error Thrown when {@param length} is not a positive, safe integer.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`length` | number | Number of bytes to read. |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

ByteVector Object containing the data read from the current instance.

___

### removeBlock

▸ **removeBlock**(`start`: number, `length`: number): void

*Defined in src/file.ts:545*

Removes a specified block of data from the file represented by the current instance.

**`throws`** Error thrown if 1) start is not a safe, positive integer or 2) length must be a safe
    integer.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`start` | number | Index into the file at which to remove data. Must be safe, positive integer. |
`length` | number | Number of bytes to remove. Must be a safe integer. |

**Returns:** void

___

### removeTags

▸ `Abstract`**removeTags**(`types`: [TagTypes](../enums/_src_tag_.tagtypes.md)): void

*Defined in src/file.ts:578*

Removes a set of tag types from the current instance. In order to remove all tags from a
file, pass {@see TagTypes.AllTags} as {@param types}

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`types` | [TagTypes](../enums/_src_tag_.tagtypes.md) | Bitwise combined {@see TagTypes} value containing the tag types to be removed     from the file  |

**Returns:** void

___

### save

▸ `Abstract`**save**(): void

*Defined in src/file.ts:642*

Saves the changes made in the current instance to the file it represents.

**Returns:** void

___

### seek

▸ **seek**(`offset`: number, `origin`: [SeekOrigin](../enums/_src_stream_.seekorigin.md)): void

*Defined in src/file.ts:650*

Moves the read/write pointer to a specified offset in the current instance, relative to a
specified origin.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`offset` | number | - | Byte offset to seek to. Must be a safe, positive integer. |
`origin` | [SeekOrigin](../enums/_src_stream_.seekorigin.md) | SeekOrigin.Begin | Origin from which to seek  |

**Returns:** void

___

### truncate

▸ `Protected`**truncate**(`length`: number): void

*Defined in src/file.ts:695*

Resizes the current instance to a specific number of bytes.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`length` | number | Number of bytes to resize the file to, must be a safe, positive integer.  |

**Returns:** void

___

### writeBlock

▸ **writeBlock**(`data`: [ByteVector](_src_bytevector_.bytevector.md)): void

*Defined in src/file.ts:664*

Writes a block of data to the file represented by the current instance at the current seek
posiotion. This will overwrite any existing data at the seek position and append new data to
the file if writing past the current end.

**`throws`** Error Thrown when {@param data} is not provided.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | ByteVector containing data to the current instance. |

**Returns:** void

___

### addFileType

▸ `Static`**addFileType**(`mimeType`: string, `constructor`: [FileTypeConstructor](../modules/_src_file_.md#filetypeconstructor), `override`: boolean): void

*Defined in src/file.ts:312*

Registers the constructor for a subclass of {@see File} with the MimeType it is associated
with. Optionally, the MimeType can be forcefully overridden if it was already registered.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`mimeType` | string | - | MimeType to register this subclass constructor to. |
`constructor` | [FileTypeConstructor](../modules/_src_file_.md#filetypeconstructor) | - | Constructor for a subclass of {@see File} that will be called if a file     with a MimeType of {@param mimeType} is created. |
`override` | boolean | false | If `true` and a subclass of {@see File} was already registered to     {@param mimeType}, it will be forcefully overridden. If `false`, an {@see Error} will be     thrown if a subclass already registered to the MimeType.}  |

**Returns:** void

___

### addFileTypeResolver

▸ `Static`**addFileTypeResolver**(`resolver`: [FileTypeResolver](../modules/_src_file_.md#filetyperesolver)): void

*Defined in src/file.ts:326*

Registers a {@see FileTypeResolver} to the front of the list of file type resolvers.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`resolver` | [FileTypeResolver](../modules/_src_file_.md#filetyperesolver) | Function to handle resolving a subclass of {@see File} from an     {@see IFileAbstraction}  |

**Returns:** void

___

### createFromAbstraction

▸ `Static`**createFromAbstraction**(`abstraction`: [IFileAbstraction](../interfaces/_src_fileabstraction_.ifileabstraction.md), `mimeType?`: string, `propertiesStyle`: [ReadStyle](../enums/_src_file_.readstyle.md)): [File](_src_file_.file.md)

*Defined in src/file.ts:117*

Creates a new instance of a {@see File} subclass for a specified file abstraction, MimeType,
and property read style.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`abstraction` | [IFileAbstraction](../interfaces/_src_fileabstraction_.ifileabstraction.md) | - | Object to use when reading/writing from the current instance. |
`mimeType?` | string | - | Optional, MimeType to use for determining the subclass of {@see File} to     return. If omitted, the MimeType will be guessed based on the file's extension. |
`propertiesStyle` | [ReadStyle](../enums/_src_file_.readstyle.md) | ReadStyle.Average | Optional, level of detail to use when reading the media information     from the new instance. If omitted, {@see ReadStyle.Average} is used. |

**Returns:** [File](_src_file_.file.md)

New instance of {@see File} as read from the specified abstraction.

___

### createFromPath

▸ `Static`**createFromPath**(`filePath`: string, `mimeType?`: string, `propertiesStyle`: [ReadStyle](../enums/_src_file_.readstyle.md)): [File](_src_file_.file.md)

*Defined in src/file.ts:135*

Creates a new instance of {@see File} subclass for a specified file path, MimeType, and
property read style.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`filePath` | string | - | Path to the file to read/write. |
`mimeType?` | string | - | Optional, MimeType to use for determining the subclass of {@see File} to     return. If omitted, the MimeType will be guessed based on the file's extension. |
`propertiesStyle` | [ReadStyle](../enums/_src_file_.readstyle.md) | ReadStyle.Average | Optional, level of detail to use when reading the media information     from the new instance. If omitted {@see ReadStyle.Average} is used. |

**Returns:** [File](_src_file_.file.md)

New instance of {@see File} as read from the specified path.

___

### removeFileType

▸ `Static`**removeFileType**(`mimeType`: string): void

*Defined in src/file.ts:334*

Used for removing a file type constructor during unit testing

#### Parameters:

Name | Type |
------ | ------ |
`mimeType` | string |

**Returns:** void

___

### removeFileTypeResolver

▸ `Static`**removeFileTypeResolver**(`resolver`: [FileTypeResolver](../modules/_src_file_.md#filetyperesolver)): void

*Defined in src/file.ts:341*

Used for removing a file type resolver during unit testing

#### Parameters:

Name | Type |
------ | ------ |
`resolver` | [FileTypeResolver](../modules/_src_file_.md#filetyperesolver) |

**Returns:** void
