**[node-taglib-sharp](../README.md)**

> [Globals](../globals.md) / ["src/mpeg/mpegFile"](../modules/_src_mpeg_mpegfile_.md) / MpegFile

# Class: MpegFile

This class extends [NonContainerFile](_src_noncontainer_noncontainerfile_.noncontainerfile.md) to provide tagging and properties support for
MPEG-1, MPEG-2, and MPEG-2.5 video files.

**`remarks`** A [Id3v1Tag](_src_id3v1_id3v1tag_.id3v1tag.md) and [Id3v2Tag](_src_id3v2_id3v2tag_.id3v2tag.md) will be added automatically to any file that
    does not contain one. This change does not affect the file until it is saved and can be
    reversed using the following method:
    `file.removeTags(file.tagTypes & ~file.tagTypesOnDisk);`

## Hierarchy

* [NonContainerFile](_src_noncontainer_noncontainerfile_.noncontainerfile.md)

  ↳ **MpegFile**

## Index

### Constructors

* [constructor](_src_mpeg_mpegfile_.mpegfile.md#constructor)

### Properties

* [\_fileAbstraction](_src_mpeg_mpegfile_.mpegfile.md#_fileabstraction)
* [\_fileStream](_src_mpeg_mpegfile_.mpegfile.md#_filestream)
* [\_invariantEndPosition](_src_mpeg_mpegfile_.mpegfile.md#_invariantendposition)
* [\_invariantStartPosition](_src_mpeg_mpegfile_.mpegfile.md#_invariantstartposition)
* [\_tagTypesOnDisk](_src_mpeg_mpegfile_.mpegfile.md#_tagtypesondisk)

### Accessors

* [corruptionReasons](_src_mpeg_mpegfile_.mpegfile.md#corruptionreasons)
* [endTag](_src_mpeg_mpegfile_.mpegfile.md#endtag)
* [fileAbstraction](_src_mpeg_mpegfile_.mpegfile.md#fileabstraction)
* [invariantEndPosition](_src_mpeg_mpegfile_.mpegfile.md#invariantendposition)
* [invariantStartPosition](_src_mpeg_mpegfile_.mpegfile.md#invariantstartposition)
* [isPossiblyCorrupt](_src_mpeg_mpegfile_.mpegfile.md#ispossiblycorrupt)
* [isWritable](_src_mpeg_mpegfile_.mpegfile.md#iswritable)
* [length](_src_mpeg_mpegfile_.mpegfile.md#length)
* [mimeType](_src_mpeg_mpegfile_.mpegfile.md#mimetype)
* [mode](_src_mpeg_mpegfile_.mpegfile.md#mode)
* [name](_src_mpeg_mpegfile_.mpegfile.md#name)
* [position](_src_mpeg_mpegfile_.mpegfile.md#position)
* [properties](_src_mpeg_mpegfile_.mpegfile.md#properties)
* [startTag](_src_mpeg_mpegfile_.mpegfile.md#starttag)
* [tag](_src_mpeg_mpegfile_.mpegfile.md#tag)
* [tagTypes](_src_mpeg_mpegfile_.mpegfile.md#tagtypes)
* [tagTypesOnDisk](_src_mpeg_mpegfile_.mpegfile.md#tagtypesondisk)
* [bufferSize](_src_mpeg_mpegfile_.mpegfile.md#buffersize)

### Methods

* [dispose](_src_mpeg_mpegfile_.mpegfile.md#dispose)
* [find](_src_mpeg_mpegfile_.mpegfile.md#find)
* [getTag](_src_mpeg_mpegfile_.mpegfile.md#gettag)
* [insert](_src_mpeg_mpegfile_.mpegfile.md#insert)
* [markAsCorrupt](_src_mpeg_mpegfile_.mpegfile.md#markascorrupt)
* [preSave](_src_mpeg_mpegfile_.mpegfile.md#presave)
* [rFind](_src_mpeg_mpegfile_.mpegfile.md#rfind)
* [readBlock](_src_mpeg_mpegfile_.mpegfile.md#readblock)
* [readEnd](_src_mpeg_mpegfile_.mpegfile.md#readend)
* [readProperties](_src_mpeg_mpegfile_.mpegfile.md#readproperties)
* [readStart](_src_mpeg_mpegfile_.mpegfile.md#readstart)
* [removeBlock](_src_mpeg_mpegfile_.mpegfile.md#removeblock)
* [removeTags](_src_mpeg_mpegfile_.mpegfile.md#removetags)
* [save](_src_mpeg_mpegfile_.mpegfile.md#save)
* [seek](_src_mpeg_mpegfile_.mpegfile.md#seek)
* [truncate](_src_mpeg_mpegfile_.mpegfile.md#truncate)
* [writeBlock](_src_mpeg_mpegfile_.mpegfile.md#writeblock)
* [addFileType](_src_mpeg_mpegfile_.mpegfile.md#addfiletype)
* [addFileTypeResolver](_src_mpeg_mpegfile_.mpegfile.md#addfiletyperesolver)
* [createFromAbstraction](_src_mpeg_mpegfile_.mpegfile.md#createfromabstraction)
* [createFromPath](_src_mpeg_mpegfile_.mpegfile.md#createfrompath)
* [removeFileType](_src_mpeg_mpegfile_.mpegfile.md#removefiletype)
* [removeFileTypeResolver](_src_mpeg_mpegfile_.mpegfile.md#removefiletyperesolver)

## Constructors

### constructor

\+ **new MpegFile**(`file`: [IFileAbstraction](../interfaces/_src_fileabstraction_.ifileabstraction.md) \| string, `propertiesStyle`: [ReadStyle](../enums/_src_file_.readstyle.md)): [MpegFile](_src_mpeg_mpegfile_.mpegfile.md)

*Overrides [NonContainerFile](_src_noncontainer_noncontainerfile_.noncontainerfile.md).[constructor](_src_noncontainer_noncontainerfile_.noncontainerfile.md#constructor)*

#### Parameters:

Name | Type |
------ | ------ |
`file` | [IFileAbstraction](../interfaces/_src_fileabstraction_.ifileabstraction.md) \| string |
`propertiesStyle` | [ReadStyle](../enums/_src_file_.readstyle.md) |

**Returns:** [MpegFile](_src_mpeg_mpegfile_.mpegfile.md)

## Properties

### \_fileAbstraction

• `Protected` **\_fileAbstraction**: [IFileAbstraction](../interfaces/_src_fileabstraction_.ifileabstraction.md)

*Inherited from [File](_src_file_.file.md).[_fileAbstraction](_src_file_.file.md#_fileabstraction)*

___

### \_fileStream

• `Protected` **\_fileStream**: [IStream](../interfaces/_src_stream_.istream.md)

*Inherited from [File](_src_file_.file.md).[_fileStream](_src_file_.file.md#_filestream)*

___

### \_invariantEndPosition

• `Protected` **\_invariantEndPosition**: number = -1

*Inherited from [File](_src_file_.file.md).[_invariantEndPosition](_src_file_.file.md#_invariantendposition)*

___

### \_invariantStartPosition

• `Protected` **\_invariantStartPosition**: number = -1

*Inherited from [File](_src_file_.file.md).[_invariantStartPosition](_src_file_.file.md#_invariantstartposition)*

___

### \_tagTypesOnDisk

• `Protected` **\_tagTypesOnDisk**: [TagTypes](../enums/_src_tag_.tagtypes.md) = TagTypes.None

*Inherited from [File](_src_file_.file.md).[_tagTypesOnDisk](_src_file_.file.md#_tagtypesondisk)*

## Accessors

### corruptionReasons

• get **corruptionReasons**(): string[]

*Inherited from [File](_src_file_.file.md).[corruptionReasons](_src_file_.file.md#corruptionreasons)*

Reasons for which this file is marked as corrupt.

**Returns:** string[]

___

### endTag

• `Protected`get **endTag**(): [EndTag](_src_noncontainer_endtag_.endtag.md)

*Inherited from [NonContainerFile](_src_noncontainer_noncontainerfile_.noncontainerfile.md).[endTag](_src_noncontainer_noncontainerfile_.noncontainerfile.md#endtag)*

Gets the collection of tags appearing at the end of the file.

**Returns:** [EndTag](_src_noncontainer_endtag_.endtag.md)

___

### fileAbstraction

• get **fileAbstraction**(): [IFileAbstraction](../interfaces/_src_fileabstraction_.ifileabstraction.md)

*Inherited from [File](_src_file_.file.md).[fileAbstraction](_src_file_.file.md#fileabstraction)*

Gets the [IFileAbstraction](../interfaces/_src_fileabstraction_.ifileabstraction.md) representing the file.

**Returns:** [IFileAbstraction](../interfaces/_src_fileabstraction_.ifileabstraction.md)

___

### invariantEndPosition

• get **invariantEndPosition**(): number

*Inherited from [File](_src_file_.file.md).[invariantEndPosition](_src_file_.file.md#invariantendposition)*

Gets the position at which the invariant (media) portion of the current instance ends. If
the value could not be determined, `-1` is returned;

**Returns:** number

___

### invariantStartPosition

• get **invariantStartPosition**(): number

*Inherited from [File](_src_file_.file.md).[invariantStartPosition](_src_file_.file.md#invariantstartposition)*

Gets the position at which the invariant (media) portion of the current instance begins. If
the value could not be determined, `-1` is returned.

**Returns:** number

___

### isPossiblyCorrupt

• get **isPossiblyCorrupt**(): boolean

*Inherited from [File](_src_file_.file.md).[isPossiblyCorrupt](_src_file_.file.md#ispossiblycorrupt)*

Indicates whether or not this file may be corrupt. Files with unknown corruptions should not
be written.

**Returns:** boolean

___

### isWritable

• get **isWritable**(): boolean

*Inherited from [File](_src_file_.file.md).[isWritable](_src_file_.file.md#iswritable)*

Indicates whether or not tags can be written back to the current file.

**Returns:** boolean

___

### length

• get **length**(): number

*Inherited from [File](_src_file_.file.md).[length](_src_file_.file.md#length)*

Gets the length of the file represented by the current instance. Value will be 0 if the file
is not open for reading;

**Returns:** number

___

### mimeType

• get **mimeType**(): string

*Inherited from [File](_src_file_.file.md).[mimeType](_src_file_.file.md#mimetype)*

Gets the MimeType of the file as determined during creation of the instance.

**Returns:** string

___

### mode

• get **mode**(): [FileAccessMode](../enums/_src_file_.fileaccessmode.md)

*Inherited from [File](_src_file_.file.md).[mode](_src_file_.file.md#mode)*

Gets the file access mode in use by the current instance.

**Returns:** [FileAccessMode](../enums/_src_file_.fileaccessmode.md)

• set **mode**(`val`: [FileAccessMode](../enums/_src_file_.fileaccessmode.md)): void

*Inherited from [File](_src_file_.file.md).[mode](_src_file_.file.md#mode)*

Sets the file access mode in use by the current instance. Changing the value will cause the
stream currently in use to be closed, except when a change is made from
[FileAccessMode.Write](../enums/_src_file_.fileaccessmode.md#write) to [FileAccessMode.Read](../enums/_src_file_.fileaccessmode.md#read) which has no effect.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`val` | [FileAccessMode](../enums/_src_file_.fileaccessmode.md) | File access mode to change to  |

**Returns:** void

___

### name

• get **name**(): string

*Inherited from [File](_src_file_.file.md).[name](_src_file_.file.md#name)*

Gets the name of the file as stored in its file abstraction.

**Returns:** string

___

### position

• get **position**(): number

*Inherited from [File](_src_file_.file.md).[position](_src_file_.file.md#position)*

Gets the seek position in the internal stream used by the current instance. Value will be 0
if the file is not open for reading

**Returns:** number

___

### properties

• get **properties**(): [Properties](_src_properties_.properties.md)

*Inherited from [NonContainerFile](_src_noncontainer_noncontainerfile_.noncontainerfile.md).[properties](_src_noncontainer_noncontainerfile_.noncontainerfile.md#properties)*

*Overrides [File](_src_file_.file.md).[properties](_src_file_.file.md#properties)*

Gets the media properties of the file represented by the current instance.

**Returns:** [Properties](_src_properties_.properties.md)

___

### startTag

• `Protected`get **startTag**(): [StartTag](_src_noncontainer_starttag_.starttag.md)

*Inherited from [NonContainerFile](_src_noncontainer_noncontainerfile_.noncontainerfile.md).[startTag](_src_noncontainer_noncontainerfile_.noncontainerfile.md#starttag)*

Gets the collection of tags appearing at the start of the file.

**Returns:** [StartTag](_src_noncontainer_starttag_.starttag.md)

___

### tag

• get **tag**(): [NonContainerTag](_src_noncontainer_noncontainertag_.noncontainertag.md)

*Inherited from [NonContainerFile](_src_noncontainer_noncontainerfile_.noncontainerfile.md).[tag](_src_noncontainer_noncontainerfile_.noncontainerfile.md#tag)*

*Overrides [File](_src_file_.file.md).[tag](_src_file_.file.md#tag)*

Gets an abstract representation of all tags stored in the current instance.

**Returns:** [NonContainerTag](_src_noncontainer_noncontainertag_.noncontainertag.md)

___

### tagTypes

• get **tagTypes**(): [TagTypes](../enums/_src_tag_.tagtypes.md)

*Inherited from [File](_src_file_.file.md).[tagTypes](_src_file_.file.md#tagtypes)*

Gets the tag types contained in the current instance.

**Returns:** [TagTypes](../enums/_src_tag_.tagtypes.md)

___

### tagTypesOnDisk

• get **tagTypesOnDisk**(): [TagTypes](../enums/_src_tag_.tagtypes.md)

*Inherited from [File](_src_file_.file.md).[tagTypesOnDisk](_src_file_.file.md#tagtypesondisk)*

Gets the tag types contained in the physical file represented by the current instance.

**Returns:** [TagTypes](../enums/_src_tag_.tagtypes.md)

___

### bufferSize

• `Static`get **bufferSize**(): number

*Inherited from [File](_src_file_.file.md).[bufferSize](_src_file_.file.md#buffersize)*

Gets the buffer size to use when reading large blocks of data

**Returns:** number

## Methods

### dispose

▸ **dispose**(): void

*Inherited from [File](_src_file_.file.md).[dispose](_src_file_.file.md#dispose)*

Dispose the current instance. Equivalent to setting the mode to closed.

**Returns:** void

___

### find

▸ **find**(`pattern`: [ByteVector](_src_bytevector_.bytevector.md), `startPosition?`: number, `before?`: [ByteVector](_src_bytevector_.bytevector.md)): number

*Inherited from [File](_src_file_.file.md).[find](_src_file_.file.md#find)*

Searches forward through a file for a specified pattern, starting at a specified offset.

**`throws`** Error Thrown if `pattern` is not provided or `startPosition` is not a
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

▸ **getTag**(`type`: [TagTypes](../enums/_src_tag_.tagtypes.md), `create`: boolean): [Tag](_src_tag_.tag.md)

*Overrides [File](_src_file_.file.md).[getTag](_src_file_.file.md#gettag)*

Gets a tag of a specified type from the current instance, optionally creating a new tag if
possible.

**`remarks`** [Id3v2Tag](_src_id3v2_id3v2tag_.id3v2tag.md), [Id3v1Tag](_src_id3v1_id3v1tag_.id3v1tag.md), and [ApeTag](_src_ape_apetag_.apetag.md) will be added to the end of
    the file. All other tag types will be ignored as they are unsupported by MPEG files.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`type` | [TagTypes](../enums/_src_tag_.tagtypes.md) | Type of tag to read |
`create` | boolean | Whether or not to try and create the tag if one is not found |

**Returns:** [Tag](_src_tag_.tag.md)

Tag Tag that was found in or added to the current instance. If no matching tag was
    found and none was created, `undefined` is returned.

___

### insert

▸ **insert**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `start`: number, `replace?`: number): void

*Inherited from [File](_src_file_.file.md).[insert](_src_file_.file.md#insert)*

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

*Inherited from [File](_src_file_.file.md).[markAsCorrupt](_src_file_.file.md#markascorrupt)*

Mark the current instance as corrupt. NOTE: Not intended to be used outside of this library.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`reason` | string | Reason why this file is considered to be corrupt  |

**Returns:** void

___

### preSave

▸ `Protected`**preSave**(): void

*Inherited from [File](_src_file_.file.md).[preSave](_src_file_.file.md#presave)*

Prepares to save the file. This must be called at the beginning of every File.save() method.

**Returns:** void

___

### rFind

▸ **rFind**(`pattern`: [ByteVector](_src_bytevector_.bytevector.md), `startPosition?`: number, `after?`: [ByteVector](_src_bytevector_.bytevector.md)): number

*Inherited from [File](_src_file_.file.md).[rFind](_src_file_.file.md#rfind)*

Searched backwards through a file for a specified pattern, starting at a specified offset.

**`throws`** Error Thrown if `pattern` was not provided or if `startPosition` is
    not a safe, positive integer.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`pattern` | [ByteVector](_src_bytevector_.bytevector.md) | - | Pattern to search for in the current instance. Must be shorter than the     [bufferSize](_src_mpeg_mpegfile_.mpegfile.md#buffersize) |
`startPosition` | number | 0 | Seek position from which to start searching. |
`after?` | [ByteVector](_src_bytevector_.bytevector.md) | - | Pattern that the searched for pattern must appear after. If this pattern is     found first, `-1` is returned. |

**Returns:** number

Index at which the value wa found. If not found, `-1` is returned.

___

### readBlock

▸ **readBlock**(`length`: number): [ByteVector](_src_bytevector_.bytevector.md)

*Inherited from [File](_src_file_.file.md).[readBlock](_src_file_.file.md#readblock)*

Reads a specified number of bytes at the current seek position from the current position.
This method reads the block of data at the current seek position. To change the seek
position, use [File.seek](_src_file_.file.md#seek).

**`throws`** Error Thrown when `length` is not a positive, safe integer.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`length` | number | Number of bytes to read. |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

ByteVector Object containing the data read from the current instance.

___

### readEnd

▸ `Protected`**readEnd**(`end`: number, `propertiesStyle`: [ReadStyle](../enums/_src_file_.readstyle.md)): void

*Overrides [NonContainerFile](_src_noncontainer_noncontainerfile_.noncontainerfile.md).[readEnd](_src_noncontainer_noncontainerfile_.noncontainerfile.md#readend)*

**`inheritdoc`** 

#### Parameters:

Name | Type |
------ | ------ |
`end` | number |
`propertiesStyle` | [ReadStyle](../enums/_src_file_.readstyle.md) |

**Returns:** void

___

### readProperties

▸ `Protected`**readProperties**(`_start`: number, `_end`: number, `_propertiesStyle`: [ReadStyle](../enums/_src_file_.readstyle.md)): [Properties](_src_properties_.properties.md)

*Overrides [NonContainerFile](_src_noncontainer_noncontainerfile_.noncontainerfile.md).[readProperties](_src_noncontainer_noncontainerfile_.noncontainerfile.md#readproperties)*

**`inheritdoc`** 

#### Parameters:

Name | Type |
------ | ------ |
`_start` | number |
`_end` | number |
`_propertiesStyle` | [ReadStyle](../enums/_src_file_.readstyle.md) |

**Returns:** [Properties](_src_properties_.properties.md)

___

### readStart

▸ `Protected`**readStart**(`start`: number, `propertiesStyle`: [ReadStyle](../enums/_src_file_.readstyle.md)): void

*Overrides [NonContainerFile](_src_noncontainer_noncontainerfile_.noncontainerfile.md).[readStart](_src_noncontainer_noncontainerfile_.noncontainerfile.md#readstart)*

**`inheritdoc`** 

#### Parameters:

Name | Type |
------ | ------ |
`start` | number |
`propertiesStyle` | [ReadStyle](../enums/_src_file_.readstyle.md) |

**Returns:** void

___

### removeBlock

▸ **removeBlock**(`start`: number, `length`: number): void

*Inherited from [File](_src_file_.file.md).[removeBlock](_src_file_.file.md#removeblock)*

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

▸ **removeTags**(`types`: [TagTypes](../enums/_src_tag_.tagtypes.md)): void

*Inherited from [NonContainerFile](_src_noncontainer_noncontainerfile_.noncontainerfile.md).[removeTags](_src_noncontainer_noncontainerfile_.noncontainerfile.md#removetags)*

*Overrides [File](_src_file_.file.md).[removeTags](_src_file_.file.md#removetags)*

**`inheritdoc`** BaseFile.removeTags

#### Parameters:

Name | Type |
------ | ------ |
`types` | [TagTypes](../enums/_src_tag_.tagtypes.md) |

**Returns:** void

___

### save

▸ **save**(): void

*Inherited from [NonContainerFile](_src_noncontainer_noncontainerfile_.noncontainerfile.md).[save](_src_noncontainer_noncontainerfile_.noncontainerfile.md#save)*

*Overrides [File](_src_file_.file.md).[save](_src_file_.file.md#save)*

**`inheritdoc`** BaseFile.save

**Returns:** void

___

### seek

▸ **seek**(`offset`: number, `origin?`: [SeekOrigin](../enums/_src_stream_.seekorigin.md)): void

*Inherited from [File](_src_file_.file.md).[seek](_src_file_.file.md#seek)*

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

*Inherited from [File](_src_file_.file.md).[truncate](_src_file_.file.md#truncate)*

Resizes the current instance to a specific number of bytes.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`length` | number | Number of bytes to resize the file to, must be a safe, positive integer.  |

**Returns:** void

___

### writeBlock

▸ **writeBlock**(`data`: [ByteVector](_src_bytevector_.bytevector.md)): void

*Inherited from [File](_src_file_.file.md).[writeBlock](_src_file_.file.md#writeblock)*

Writes a block of data to the file represented by the current instance at the current seek
position. This will overwrite any existing data at the seek position and append new data to
the file if writing past the current end.

**`throws`** Error Thrown when `data` is not provided.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | ByteVector containing data to the current instance. |

**Returns:** void

___

### addFileType

▸ `Static`**addFileType**(`mimeType`: string, `constructor`: [FileTypeConstructor](../modules/_src_file_.md#filetypeconstructor), `override?`: boolean): void

*Inherited from [File](_src_file_.file.md).[addFileType](_src_file_.file.md#addfiletype)*

Registers the constructor for a subclass of [File](_src_file_.file.md) with the MimeType it is associated
with. Optionally, the MimeType can be forcefully overridden if it was already registered.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`mimeType` | string | - | MimeType to register this subclass constructor to. |
`constructor` | [FileTypeConstructor](../modules/_src_file_.md#filetypeconstructor) | - | Constructor for a subclass of [File](_src_file_.file.md) that will be called if a file     with a MimeType of `mimeType` is created. |
`override` | boolean | false | If `true` and a subclass of [File](_src_file_.file.md) was already registered to     `mimeType`, it will be forcefully overridden. If `false`, an [Error](_src_errors_.corruptfileerror.md#error) will be     thrown if a subclass already registered to the MimeType.}  |

**Returns:** void

___

### addFileTypeResolver

▸ `Static`**addFileTypeResolver**(`resolver`: [FileTypeResolver](../modules/_src_file_.md#filetyperesolver)): void

*Inherited from [File](_src_file_.file.md).[addFileTypeResolver](_src_file_.file.md#addfiletyperesolver)*

Registers a [FileTypeResolver](../modules/_src_file_.md#filetyperesolver) to the front of the list of file type resolvers.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`resolver` | [FileTypeResolver](../modules/_src_file_.md#filetyperesolver) | Function to handle resolving a subclass of [File](_src_file_.file.md) from an     [IFileAbstraction](../interfaces/_src_fileabstraction_.ifileabstraction.md)  |

**Returns:** void

___

### createFromAbstraction

▸ `Static`**createFromAbstraction**(`abstraction`: [IFileAbstraction](../interfaces/_src_fileabstraction_.ifileabstraction.md), `mimeType?`: string, `propertiesStyle?`: [ReadStyle](../enums/_src_file_.readstyle.md)): [File](_src_file_.file.md)

*Inherited from [File](_src_file_.file.md).[createFromAbstraction](_src_file_.file.md#createfromabstraction)*

Creates a new instance of a [File](_src_file_.file.md) subclass for a specified file abstraction, MimeType,
and property read style.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`abstraction` | [IFileAbstraction](../interfaces/_src_fileabstraction_.ifileabstraction.md) | - | Object to use when reading/writing from the current instance. |
`mimeType?` | string | - | Optional, MimeType to use for determining the subclass of [File](_src_file_.file.md) to     return. If omitted, the MimeType will be guessed based on the file's extension. |
`propertiesStyle` | [ReadStyle](../enums/_src_file_.readstyle.md) | ReadStyle.Average | Optional, level of detail to use when reading the media information     from the new instance. If omitted, [ReadStyle.Average](../enums/_src_file_.readstyle.md#average) is used. |

**Returns:** [File](_src_file_.file.md)

New instance of [File](_src_file_.file.md) as read from the specified abstraction.

___

### createFromPath

▸ `Static`**createFromPath**(`filePath`: string, `mimeType?`: string, `propertiesStyle?`: [ReadStyle](../enums/_src_file_.readstyle.md)): [File](_src_file_.file.md)

*Inherited from [File](_src_file_.file.md).[createFromPath](_src_file_.file.md#createfrompath)*

Creates a new instance of [File](_src_file_.file.md) subclass for a specified file path, MimeType, and
property read style.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`filePath` | string | - | Path to the file to read/write. |
`mimeType?` | string | - | Optional, MimeType to use for determining the subclass of [File](_src_file_.file.md) to     return. If omitted, the MimeType will be guessed based on the file's extension. |
`propertiesStyle` | [ReadStyle](../enums/_src_file_.readstyle.md) | ReadStyle.Average | Optional, level of detail to use when reading the media information     from the new instance. If omitted [ReadStyle.Average](../enums/_src_file_.readstyle.md#average) is used. |

**Returns:** [File](_src_file_.file.md)

New instance of [File](_src_file_.file.md) as read from the specified path.

___

### removeFileType

▸ `Static`**removeFileType**(`mimeType`: string): void

*Inherited from [File](_src_file_.file.md).[removeFileType](_src_file_.file.md#removefiletype)*

Used for removing a file type constructor during unit testing

#### Parameters:

Name | Type |
------ | ------ |
`mimeType` | string |

**Returns:** void

___

### removeFileTypeResolver

▸ `Static`**removeFileTypeResolver**(`resolver`: [FileTypeResolver](../modules/_src_file_.md#filetyperesolver)): void

*Inherited from [File](_src_file_.file.md).[removeFileTypeResolver](_src_file_.file.md#removefiletyperesolver)*

Used for removing a file type resolver during unit testing

#### Parameters:

Name | Type |
------ | ------ |
`resolver` | [FileTypeResolver](../modules/_src_file_.md#filetyperesolver) |

**Returns:** void
