**node-taglib-sharp**

> [README](../README.md) / [Globals](../globals.md) / ["src/mpeg/audioFile"](../modules/_src_mpeg_audiofile_.md) / AudioFile

# Class: AudioFile

## Hierarchy

* [NonContainerFile](_src_noncontainer_noncontainerfile_.noncontainerfile.md)

  ↳ **AudioFile**

## Index

### Constructors

* [constructor](_src_mpeg_audiofile_.audiofile.md#constructor)

### Properties

* [\_fileAbstraction](_src_mpeg_audiofile_.audiofile.md#_fileabstraction)
* [\_fileStream](_src_mpeg_audiofile_.audiofile.md#_filestream)
* [\_invariantEndPosition](_src_mpeg_audiofile_.audiofile.md#_invariantendposition)
* [\_invariantStartPosition](_src_mpeg_audiofile_.audiofile.md#_invariantstartposition)
* [\_tagTypesOnDisk](_src_mpeg_audiofile_.audiofile.md#_tagtypesondisk)

### Accessors

* [corruptionReasons](_src_mpeg_audiofile_.audiofile.md#corruptionreasons)
* [endTag](_src_mpeg_audiofile_.audiofile.md#endtag)
* [fileAbstraction](_src_mpeg_audiofile_.audiofile.md#fileabstraction)
* [invariantEndPosition](_src_mpeg_audiofile_.audiofile.md#invariantendposition)
* [invariantStartPosition](_src_mpeg_audiofile_.audiofile.md#invariantstartposition)
* [isPossiblyCorrupt](_src_mpeg_audiofile_.audiofile.md#ispossiblycorrupt)
* [isWritable](_src_mpeg_audiofile_.audiofile.md#iswritable)
* [length](_src_mpeg_audiofile_.audiofile.md#length)
* [mimeType](_src_mpeg_audiofile_.audiofile.md#mimetype)
* [mode](_src_mpeg_audiofile_.audiofile.md#mode)
* [name](_src_mpeg_audiofile_.audiofile.md#name)
* [position](_src_mpeg_audiofile_.audiofile.md#position)
* [properties](_src_mpeg_audiofile_.audiofile.md#properties)
* [startTag](_src_mpeg_audiofile_.audiofile.md#starttag)
* [tag](_src_mpeg_audiofile_.audiofile.md#tag)
* [tagTypes](_src_mpeg_audiofile_.audiofile.md#tagtypes)
* [tagTypesOnDisk](_src_mpeg_audiofile_.audiofile.md#tagtypesondisk)
* [bufferSize](_src_mpeg_audiofile_.audiofile.md#buffersize)

### Methods

* [dispose](_src_mpeg_audiofile_.audiofile.md#dispose)
* [find](_src_mpeg_audiofile_.audiofile.md#find)
* [getTag](_src_mpeg_audiofile_.audiofile.md#gettag)
* [insert](_src_mpeg_audiofile_.audiofile.md#insert)
* [markAsCorrupt](_src_mpeg_audiofile_.audiofile.md#markascorrupt)
* [preSave](_src_mpeg_audiofile_.audiofile.md#presave)
* [rFind](_src_mpeg_audiofile_.audiofile.md#rfind)
* [readBlock](_src_mpeg_audiofile_.audiofile.md#readblock)
* [readEnd](_src_mpeg_audiofile_.audiofile.md#readend)
* [readProperties](_src_mpeg_audiofile_.audiofile.md#readproperties)
* [readStart](_src_mpeg_audiofile_.audiofile.md#readstart)
* [removeBlock](_src_mpeg_audiofile_.audiofile.md#removeblock)
* [removeTags](_src_mpeg_audiofile_.audiofile.md#removetags)
* [save](_src_mpeg_audiofile_.audiofile.md#save)
* [seek](_src_mpeg_audiofile_.audiofile.md#seek)
* [truncate](_src_mpeg_audiofile_.audiofile.md#truncate)
* [writeBlock](_src_mpeg_audiofile_.audiofile.md#writeblock)
* [addFileType](_src_mpeg_audiofile_.audiofile.md#addfiletype)
* [addFileTypeResolver](_src_mpeg_audiofile_.audiofile.md#addfiletyperesolver)
* [createFromAbstraction](_src_mpeg_audiofile_.audiofile.md#createfromabstraction)
* [createFromPath](_src_mpeg_audiofile_.audiofile.md#createfrompath)
* [removeFileType](_src_mpeg_audiofile_.audiofile.md#removefiletype)
* [removeFileTypeResolver](_src_mpeg_audiofile_.audiofile.md#removefiletyperesolver)

## Constructors

### constructor

\+ **new AudioFile**(`file`: [IFileAbstraction](../interfaces/_src_fileabstraction_.ifileabstraction.md) \| string, `propertiesStyle`: [ReadStyle](../enums/_src_file_.readstyle.md)): [AudioFile](_src_mpeg_audiofile_.audiofile.md)

*Overrides [NonContainerFile](_src_noncontainer_noncontainerfile_.noncontainerfile.md).[constructor](_src_noncontainer_noncontainerfile_.noncontainerfile.md#constructor)*

*Defined in src/mpeg/audioFile.ts:11*

#### Parameters:

Name | Type |
------ | ------ |
`file` | [IFileAbstraction](../interfaces/_src_fileabstraction_.ifileabstraction.md) \| string |
`propertiesStyle` | [ReadStyle](../enums/_src_file_.readstyle.md) |

**Returns:** [AudioFile](_src_mpeg_audiofile_.audiofile.md)

## Properties

### \_fileAbstraction

• `Protected` **\_fileAbstraction**: [IFileAbstraction](../interfaces/_src_fileabstraction_.ifileabstraction.md)

*Inherited from [File](_src_file_.file.md).[_fileAbstraction](_src_file_.file.md#_fileabstraction)*

*Defined in src/file.ts:89*

___

### \_fileStream

• `Protected` **\_fileStream**: [IStream](../interfaces/_src_stream_.istream.md)

*Inherited from [File](_src_file_.file.md).[_fileStream](_src_file_.file.md#_filestream)*

*Defined in src/file.ts:90*

___

### \_invariantEndPosition

• `Protected` **\_invariantEndPosition**: number = -1

*Inherited from [File](_src_file_.file.md).[_invariantEndPosition](_src_file_.file.md#_invariantendposition)*

*Defined in src/file.ts:91*

___

### \_invariantStartPosition

• `Protected` **\_invariantStartPosition**: number = -1

*Inherited from [File](_src_file_.file.md).[_invariantStartPosition](_src_file_.file.md#_invariantstartposition)*

*Defined in src/file.ts:92*

___

### \_tagTypesOnDisk

• `Protected` **\_tagTypesOnDisk**: [TagTypes](../enums/_src_tag_.tagtypes.md) = TagTypes.None

*Inherited from [File](_src_file_.file.md).[_tagTypesOnDisk](_src_file_.file.md#_tagtypesondisk)*

*Defined in src/file.ts:93*

## Accessors

### corruptionReasons

• get **corruptionReasons**(): string[]

*Inherited from [File](_src_file_.file.md).[corruptionReasons](_src_file_.file.md#corruptionreasons)*

*Defined in src/file.ts:178*

Reasons for which this file is marked as corrupt.

**Returns:** string[]

___

### endTag

• `Protected`get **endTag**(): [EndTag](_src_noncontainer_endtag_.endtag.md)

*Inherited from [NonContainerFile](_src_noncontainer_noncontainerfile_.noncontainerfile.md).[endTag](_src_noncontainer_noncontainerfile_.noncontainerfile.md#endtag)*

*Defined in src/nonContainer/nonContainerFile.ts:41*

Gets the collection of tags appearing at the end of the file.

**Returns:** [EndTag](_src_noncontainer_endtag_.endtag.md)

___

### fileAbstraction

• get **fileAbstraction**(): [IFileAbstraction](../interfaces/_src_fileabstraction_.ifileabstraction.md)

*Inherited from [File](_src_file_.file.md).[fileAbstraction](_src_file_.file.md#fileabstraction)*

*Defined in src/file.ts:183*

Gets the {@see IFileAbstraction} representing the file.

**Returns:** [IFileAbstraction](../interfaces/_src_fileabstraction_.ifileabstraction.md)

___

### invariantEndPosition

• get **invariantEndPosition**(): number

*Inherited from [File](_src_file_.file.md).[invariantEndPosition](_src_file_.file.md#invariantendposition)*

*Defined in src/file.ts:189*

Gets the position at which the invariant (media) portion of the current instance ends. If
the value could not be determined, `-1` is returned;

**Returns:** number

___

### invariantStartPosition

• get **invariantStartPosition**(): number

*Inherited from [File](_src_file_.file.md).[invariantStartPosition](_src_file_.file.md#invariantstartposition)*

*Defined in src/file.ts:195*

Gets the position at which the invariant (media) portion of the current instance begins. If
the value could not be determined, `-1` is returned.

**Returns:** number

___

### isPossiblyCorrupt

• get **isPossiblyCorrupt**(): boolean

*Inherited from [File](_src_file_.file.md).[isPossiblyCorrupt](_src_file_.file.md#ispossiblycorrupt)*

*Defined in src/file.ts:201*

Indicates whether or not this file may be corrupt. Files with unknown corruptions should not
be written.

**Returns:** boolean

___

### isWritable

• get **isWritable**(): boolean

*Inherited from [File](_src_file_.file.md).[isWritable](_src_file_.file.md#iswritable)*

*Defined in src/file.ts:206*

Indicates whether or not tags can be written back to the current file.

**Returns:** boolean

___

### length

• get **length**(): number

*Inherited from [File](_src_file_.file.md).[length](_src_file_.file.md#length)*

*Defined in src/file.ts:212*

Gets the length of the file represented by the current instance. Value will be 0 if the file
is not open for reading;

**Returns:** number

___

### mimeType

• get **mimeType**(): string

*Inherited from [File](_src_file_.file.md).[mimeType](_src_file_.file.md#mimetype)*

*Defined in src/file.ts:218*

Gets the MimeType of the file as determined by {@see File.create} if that method was used to
create the current instance.

**Returns:** string

___

### mode

• get **mode**(): [FileAccessMode](../enums/_src_file_.fileaccessmode.md)

*Inherited from [File](_src_file_.file.md).[mode](_src_file_.file.md#mode)*

*Defined in src/file.ts:223*

Gets the file access mode in use by the current instance.

**Returns:** [FileAccessMode](../enums/_src_file_.fileaccessmode.md)

• set **mode**(`val`: [FileAccessMode](../enums/_src_file_.fileaccessmode.md)): void

*Inherited from [File](_src_file_.file.md).[mode](_src_file_.file.md#mode)*

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

*Inherited from [File](_src_file_.file.md).[name](_src_file_.file.md#name)*

*Defined in src/file.ts:267*

Gets the name of the file as stored in its file abstraction.

**Returns:** string

___

### position

• get **position**(): number

*Inherited from [File](_src_file_.file.md).[position](_src_file_.file.md#position)*

*Defined in src/file.ts:273*

Gets the seek position in the internal stream used by the current instance. Value will be 0
if the file is not open for reading

**Returns:** number

___

### properties

• get **properties**(): [Properties](_src_properties_.properties.md)

*Inherited from [NonContainerFile](_src_noncontainer_noncontainerfile_.noncontainerfile.md).[properties](_src_noncontainer_noncontainerfile_.noncontainerfile.md#properties)*

*Overrides [File](_src_file_.file.md).[properties](_src_file_.file.md#properties)*

*Defined in src/nonContainer/nonContainerFile.ts:56*

Gets the media properties of the file represented by the current instance.

**Returns:** [Properties](_src_properties_.properties.md)

___

### startTag

• `Protected`get **startTag**(): [StartTag](_src_noncontainer_starttag_.starttag.md)

*Inherited from [NonContainerFile](_src_noncontainer_noncontainerfile_.noncontainerfile.md).[startTag](_src_noncontainer_noncontainerfile_.noncontainerfile.md#starttag)*

*Defined in src/nonContainer/nonContainerFile.ts:46*

Gets the collection of tags appearing at the start of the file.

**Returns:** [StartTag](_src_noncontainer_starttag_.starttag.md)

___

### tag

• get **tag**(): [NonContainerTag](_src_noncontainer_noncontainertag_.noncontainertag.md)

*Inherited from [NonContainerFile](_src_noncontainer_noncontainerfile_.noncontainerfile.md).[tag](_src_noncontainer_noncontainerfile_.noncontainerfile.md#tag)*

*Overrides [File](_src_file_.file.md).[tag](_src_file_.file.md#tag)*

*Defined in src/nonContainer/nonContainerFile.ts:51*

Gets an abstract representation of all tags stored in the current instance.

**Returns:** [NonContainerTag](_src_noncontainer_noncontainertag_.noncontainertag.md)

___

### tagTypes

• get **tagTypes**(): [TagTypes](../enums/_src_tag_.tagtypes.md)

*Inherited from [File](_src_file_.file.md).[tagTypes](_src_file_.file.md#tagtypes)*

*Defined in src/file.ts:291*

Gets the tag typescontained in the current instance.

**Returns:** [TagTypes](../enums/_src_tag_.tagtypes.md)

___

### tagTypesOnDisk

• get **tagTypesOnDisk**(): [TagTypes](../enums/_src_tag_.tagtypes.md)

*Inherited from [File](_src_file_.file.md).[tagTypesOnDisk](_src_file_.file.md#tagtypesondisk)*

*Defined in src/file.ts:296*

Gets the tag types contained in the physical file represented by the current instance.

**Returns:** [TagTypes](../enums/_src_tag_.tagtypes.md)

___

### bufferSize

• `Static`get **bufferSize**(): number

*Inherited from [File](_src_file_.file.md).[bufferSize](_src_file_.file.md#buffersize)*

*Defined in src/file.ts:173*

Gets the buffer size to use when reading large blocks of data

**Returns:** number

## Methods

### dispose

▸ **dispose**(): void

*Inherited from [File](_src_file_.file.md).[dispose](_src_file_.file.md#dispose)*

*Defined in src/file.ts:351*

Dispose the current instance. Equivalent to setting the mode to closed.

**Returns:** void

___

### find

▸ **find**(`pattern`: [ByteVector](_src_bytevector_.bytevector.md), `startPosition`: number, `before?`: [ByteVector](_src_bytevector_.bytevector.md)): number

*Inherited from [File](_src_file_.file.md).[find](_src_file_.file.md#find)*

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

▸ **getTag**(`type`: [TagTypes](../enums/_src_tag_.tagtypes.md), `create`: boolean): [Tag](_src_tag_.tag.md)

*Overrides [File](_src_file_.file.md).[getTag](_src_file_.file.md#gettag)*

*Defined in src/mpeg/audioFile.ts:28*

Gets a tag of a specified type from the current instance, optionally creating a new tag if
possible.
If an {@see Id3v2Tag} is added to the current instance, it will be placed at the start of
the file. On the other hand, {@see Id3v1Tag} and {@see ApeTag} will be added to the end of
the file. All other tag types will be ignored.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`type` | [TagTypes](../enums/_src_tag_.tagtypes.md) | Type of tag to create |
`create` | boolean | Whether or not to try and create the tag if one is not found |

**Returns:** [Tag](_src_tag_.tag.md)

Tag Tag that was found in or added to the current instance. If no matching tag was
    found and none was created, `undefined` is returned.

___

### insert

▸ **insert**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `start`: number, `replace`: number): void

*Inherited from [File](_src_file_.file.md).[insert](_src_file_.file.md#insert)*

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

*Inherited from [File](_src_file_.file.md).[markAsCorrupt](_src_file_.file.md#markascorrupt)*

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

*Inherited from [File](_src_file_.file.md).[preSave](_src_file_.file.md#presave)*

*Defined in src/file.ts:679*

Prepares to save the file. This must be called at the beginning of every File.save() method.

**Returns:** void

___

### rFind

▸ **rFind**(`pattern`: [ByteVector](_src_bytevector_.bytevector.md), `startPosition`: number, `after?`: [ByteVector](_src_bytevector_.bytevector.md)): number

*Inherited from [File](_src_file_.file.md).[rFind](_src_file_.file.md#rfind)*

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

*Inherited from [File](_src_file_.file.md).[readBlock](_src_file_.file.md#readblock)*

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

### readEnd

▸ `Protected`**readEnd**(`end`: number, `propertiesStyle`: [ReadStyle](../enums/_src_file_.readstyle.md)): void

*Overrides [NonContainerFile](_src_noncontainer_noncontainerfile_.noncontainerfile.md).[readEnd](_src_noncontainer_noncontainerfile_.noncontainerfile.md#readend)*

*Defined in src/mpeg/audioFile.ts:46*

#### Parameters:

Name | Type |
------ | ------ |
`end` | number |
`propertiesStyle` | [ReadStyle](../enums/_src_file_.readstyle.md) |

**Returns:** void

___

### readProperties

▸ `Protected`**readProperties**(`start`: number, `end`: number, `propertiesStyle`: [ReadStyle](../enums/_src_file_.readstyle.md)): [Properties](_src_properties_.properties.md)

*Overrides [NonContainerFile](_src_noncontainer_noncontainerfile_.noncontainerfile.md).[readProperties](_src_noncontainer_noncontainerfile_.noncontainerfile.md#readproperties)*

*Defined in src/mpeg/audioFile.ts:57*

#### Parameters:

Name | Type |
------ | ------ |
`start` | number |
`end` | number |
`propertiesStyle` | [ReadStyle](../enums/_src_file_.readstyle.md) |

**Returns:** [Properties](_src_properties_.properties.md)

___

### readStart

▸ `Protected`**readStart**(`start`: number, `propertiesStyle`: [ReadStyle](../enums/_src_file_.readstyle.md)): void

*Overrides [NonContainerFile](_src_noncontainer_noncontainerfile_.noncontainerfile.md).[readStart](_src_noncontainer_noncontainerfile_.noncontainerfile.md#readstart)*

*Defined in src/mpeg/audioFile.ts:62*

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

▸ **removeTags**(`types`: [TagTypes](../enums/_src_tag_.tagtypes.md)): void

*Inherited from [NonContainerFile](_src_noncontainer_noncontainerfile_.noncontainerfile.md).[removeTags](_src_noncontainer_noncontainerfile_.noncontainerfile.md#removetags)*

*Overrides [File](_src_file_.file.md).[removeTags](_src_file_.file.md#removetags)*

*Defined in src/nonContainer/nonContainerFile.ts:78*

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

*Defined in src/nonContainer/nonContainerFile.ts:63*

**`inheritdoc`** BaseFile.save

**Returns:** void

___

### seek

▸ **seek**(`offset`: number, `origin`: [SeekOrigin](../enums/_src_stream_.seekorigin.md)): void

*Inherited from [File](_src_file_.file.md).[seek](_src_file_.file.md#seek)*

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

*Inherited from [File](_src_file_.file.md).[truncate](_src_file_.file.md#truncate)*

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

*Inherited from [File](_src_file_.file.md).[writeBlock](_src_file_.file.md#writeblock)*

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

*Inherited from [File](_src_file_.file.md).[addFileType](_src_file_.file.md#addfiletype)*

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

*Inherited from [File](_src_file_.file.md).[addFileTypeResolver](_src_file_.file.md#addfiletyperesolver)*

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

*Inherited from [File](_src_file_.file.md).[createFromAbstraction](_src_file_.file.md#createfromabstraction)*

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

*Inherited from [File](_src_file_.file.md).[createFromPath](_src_file_.file.md#createfrompath)*

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

*Inherited from [File](_src_file_.file.md).[removeFileType](_src_file_.file.md#removefiletype)*

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

*Inherited from [File](_src_file_.file.md).[removeFileTypeResolver](_src_file_.file.md#removefiletyperesolver)*

*Defined in src/file.ts:341*

Used for removing a file type resolver during unit testing

#### Parameters:

Name | Type |
------ | ------ |
`resolver` | [FileTypeResolver](../modules/_src_file_.md#filetyperesolver) |

**Returns:** void
