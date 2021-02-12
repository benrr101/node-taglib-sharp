[node-taglib-sharp](../README.md) / [Exports](../modules.md) / AacFile

# Class: AacFile

This class extends [File](file.md) to provide tagging and properties for ADTS AAC audio files.

**`remarks`** A [Id3v1Tag](id3v1tag.md) and [Id3v2Tag](id3v2tag.md) will be added automatically to any file
    that doesn't contain one. This change does not affect the file until it is saved and can be
    reversed using the following method:
    `file.removeTags(file.tagTypes & ~file.tagTypesOnDisk);`

## Hierarchy

* *NonContainerFile*

  ↳ **AacFile**

## Table of contents

### Constructors

- [constructor](aacfile.md#constructor)

### Properties

- [\_fileAbstraction](aacfile.md#_fileabstraction)
- [\_fileStream](aacfile.md#_filestream)
- [\_invariantEndPosition](aacfile.md#_invariantendposition)
- [\_invariantStartPosition](aacfile.md#_invariantstartposition)
- [\_tagTypesOnDisk](aacfile.md#_tagtypesondisk)

### Accessors

- [bufferSize](aacfile.md#buffersize)
- [corruptionReasons](aacfile.md#corruptionreasons)
- [endTag](aacfile.md#endtag)
- [fileAbstraction](aacfile.md#fileabstraction)
- [invariantEndPosition](aacfile.md#invariantendposition)
- [invariantStartPosition](aacfile.md#invariantstartposition)
- [isPossiblyCorrupt](aacfile.md#ispossiblycorrupt)
- [isWritable](aacfile.md#iswritable)
- [length](aacfile.md#length)
- [mimeType](aacfile.md#mimetype)
- [mode](aacfile.md#mode)
- [name](aacfile.md#name)
- [position](aacfile.md#position)
- [properties](aacfile.md#properties)
- [startTag](aacfile.md#starttag)
- [tag](aacfile.md#tag)
- [tagTypes](aacfile.md#tagtypes)
- [tagTypesOnDisk](aacfile.md#tagtypesondisk)

### Methods

- [dispose](aacfile.md#dispose)
- [find](aacfile.md#find)
- [getTag](aacfile.md#gettag)
- [insert](aacfile.md#insert)
- [markAsCorrupt](aacfile.md#markascorrupt)
- [preSave](aacfile.md#presave)
- [rFind](aacfile.md#rfind)
- [readBlock](aacfile.md#readblock)
- [readEnd](aacfile.md#readend)
- [readProperties](aacfile.md#readproperties)
- [readStart](aacfile.md#readstart)
- [removeBlock](aacfile.md#removeblock)
- [removeTags](aacfile.md#removetags)
- [save](aacfile.md#save)
- [seek](aacfile.md#seek)
- [truncate](aacfile.md#truncate)
- [writeBlock](aacfile.md#writeblock)
- [addFileType](aacfile.md#addfiletype)
- [addFileTypeResolver](aacfile.md#addfiletyperesolver)
- [createFromAbstraction](aacfile.md#createfromabstraction)
- [createFromPath](aacfile.md#createfrompath)
- [removeFileType](aacfile.md#removefiletype)
- [removeFileTypeResolver](aacfile.md#removefiletyperesolver)

## Constructors

### constructor

\+ **new AacFile**(`file`: *string* \| IFileAbstraction, `propertiesStyle`: [*ReadStyle*](../enums/readstyle.md)): [*AacFile*](aacfile.md)

**`inheritdoc`** 

#### Parameters:

Name | Type |
------ | ------ |
`file` | *string* \| IFileAbstraction |
`propertiesStyle` | [*ReadStyle*](../enums/readstyle.md) |

**Returns:** [*AacFile*](aacfile.md)

## Properties

### \_fileAbstraction

• `Protected` **\_fileAbstraction**: IFileAbstraction

___

### \_fileStream

• `Protected` **\_fileStream**: IStream

___

### \_invariantEndPosition

• `Protected` **\_invariantEndPosition**: *number*= -1

___

### \_invariantStartPosition

• `Protected` **\_invariantStartPosition**: *number*= -1

___

### \_tagTypesOnDisk

• `Protected` **\_tagTypesOnDisk**: [*TagTypes*](../enums/tagtypes.md)

## Accessors

### bufferSize

• **bufferSize**(): *number*

Gets the buffer size to use when reading large blocks of data

**Returns:** *number*

___

### corruptionReasons

• **corruptionReasons**(): *string*[]

Reasons for which this file is marked as corrupt.

**Returns:** *string*[]

___

### endTag

• **endTag**(): *default*

Gets the collection of tags appearing at the end of the file.

**Returns:** *default*

___

### fileAbstraction

• **fileAbstraction**(): IFileAbstraction

Gets the {@link IFileAbstraction} representing the file.

**Returns:** IFileAbstraction

___

### invariantEndPosition

• **invariantEndPosition**(): *number*

Gets the position at which the invariant (media) portion of the current instance ends. If
the value could not be determined, `-1` is returned;

**Returns:** *number*

___

### invariantStartPosition

• **invariantStartPosition**(): *number*

Gets the position at which the invariant (media) portion of the current instance begins. If
the value could not be determined, `-1` is returned.

**Returns:** *number*

___

### isPossiblyCorrupt

• **isPossiblyCorrupt**(): *boolean*

Indicates whether or not this file may be corrupt. Files with unknown corruptions should not
be written.

**Returns:** *boolean*

___

### isWritable

• **isWritable**(): *boolean*

Indicates whether or not tags can be written back to the current file.

**Returns:** *boolean*

___

### length

• **length**(): *number*

Gets the length of the file represented by the current instance. Value will be 0 if the file
is not open for reading;

**Returns:** *number*

___

### mimeType

• **mimeType**(): *string*

Gets the MimeType of the file as determined during creation of the instance.

**Returns:** *string*

___

### mode

• **mode**(): [*FileAccessMode*](../enums/fileaccessmode.md)

Gets the file access mode in use by the current instance.

**Returns:** [*FileAccessMode*](../enums/fileaccessmode.md)

• **mode**(`val`: [*FileAccessMode*](../enums/fileaccessmode.md)): *void*

Sets the file access mode in use by the current instance. Changing the value will cause the
stream currently in use to be closed, except when a change is made from
[FileAccessMode.Write](../enums/fileaccessmode.md#write) to [FileAccessMode.Read](../enums/fileaccessmode.md#read) which has no effect.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`val` | [*FileAccessMode*](../enums/fileaccessmode.md) | File access mode to change to    |

**Returns:** *void*

___

### name

• **name**(): *string*

Gets the name of the file as stored in its file abstraction.

**Returns:** *string*

___

### position

• **position**(): *number*

Gets the seek position in the internal stream used by the current instance. Value will be 0
if the file is not open for reading

**Returns:** *number*

___

### properties

• **properties**(): [*Properties*](properties.md)

Gets the media properties of the file represented by the current instance.

**Returns:** [*Properties*](properties.md)

___

### startTag

• **startTag**(): *default*

Gets the collection of tags appearing at the start of the file.

**Returns:** *default*

___

### tag

• **tag**(): *default*

Gets an abstract representation of all tags stored in the current instance.

**Returns:** *default*

___

### tagTypes

• **tagTypes**(): [*TagTypes*](../enums/tagtypes.md)

Gets the tag types contained in the current instance.

**Returns:** [*TagTypes*](../enums/tagtypes.md)

___

### tagTypesOnDisk

• **tagTypesOnDisk**(): [*TagTypes*](../enums/tagtypes.md)

Gets the tag types contained in the physical file represented by the current instance.

**Returns:** [*TagTypes*](../enums/tagtypes.md)

## Methods

### dispose

▸ **dispose**(): *void*

Dispose the current instance. Equivalent to setting the mode to closed.

**Returns:** *void*

___

### find

▸ **find**(`pattern`: [*ByteVector*](bytevector.md), `startPosition?`: *number*, `before?`: [*ByteVector*](bytevector.md)): *number*

Searches forward through a file for a specified pattern, starting at a specified offset.

**`throws`** Error Thrown if `pattern` is not provided or `startPosition` is not a
    positive, safe integer.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`pattern` | [*ByteVector*](bytevector.md) | - | Pattern to search for in the current instance. Must be smaller than the   |
`startPosition` | *number* | 0 | Seek position to start searching. Must be positive, safe integer.   |
`before?` | [*ByteVector*](bytevector.md) | - | Optional pattern that the searched for pattern must appear before. If this     pattern is found first, `-1` is returned.   |

**Returns:** *number*

Index at which the value was found. If not found, `-1` is returned.

___

### getTag

▸ **getTag**(`type`: [*TagTypes*](../enums/tagtypes.md), `create`: *boolean*): [*Tag*](tag.md)

Gets a tag of a specified type from the current instance, optionally creating a new tag if
possible. If a [Id3v2Tag](id3v2tag.md) is added to the current instance, it will be placed at the
start of the file. On the other hand, [Id3v1Tag](id3v1tag.md) and [ApeTag](apetag.md) will be added to
the end of the file. All other tag types will be ignored.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`type` | [*TagTypes*](../enums/tagtypes.md) | Type of tag to read   |
`create` | *boolean* | Whether or not to create a tag if one is not found   |

**Returns:** [*Tag*](tag.md)

Tag Tag that was found in or added to the current instance. If no matching tag was
    found and none was created, `undefined` is returned.

___

### insert

▸ **insert**(`data`: [*ByteVector*](bytevector.md), `start`: *number*, `replace?`: *number*): *void*

Inserts a specified block of data into the file represented by the current instance, at a
specified location, replacing a specified number of bytes.

**`throws`** Error Thrown when: 1) data is falsey, 2) start is not a safe, positive number, or 3)
    replace is not a safe, positive number

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`data` | [*ByteVector*](bytevector.md) | - | Data to insert into the file.   |
`start` | *number* | - | Index into the file at which to insert the data. Must be safe positive integer.   |
`replace` | *number* | 0 | Number of bytes to replace. Typically this is the original size of the data     block so that a new block will replace the old one.   |

**Returns:** *void*

___

### markAsCorrupt

▸ **markAsCorrupt**(`reason`: *string*): *void*

Mark the current instance as corrupt. NOTE: Not intended to be used outside of this library.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`reason` | *string* | Reason why this file is considered to be corrupt    |

**Returns:** *void*

___

### preSave

▸ `Protected`**preSave**(): *void*

Prepares to save the file. This must be called at the beginning of every File.save() method.

**Returns:** *void*

___

### rFind

▸ **rFind**(`pattern`: [*ByteVector*](bytevector.md), `startPosition?`: *number*, `after?`: [*ByteVector*](bytevector.md)): *number*

Searched backwards through a file for a specified pattern, starting at a specified offset.

**`throws`** Error Thrown if `pattern` was not provided or if `startPosition` is
    not a safe, positive integer.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`pattern` | [*ByteVector*](bytevector.md) | - | Pattern to search for in the current instance. Must be shorter than the     [bufferSize](aacfile.md#buffersize)   |
`startPosition` | *number* | 0 | Seek position from which to start searching.   |
`after?` | [*ByteVector*](bytevector.md) | - | Pattern that the searched for pattern must appear after. If this pattern is     found first, `-1` is returned.   |

**Returns:** *number*

Index at which the value wa found. If not found, `-1` is returned.

___

### readBlock

▸ **readBlock**(`length`: *number*): [*ByteVector*](bytevector.md)

Reads a specified number of bytes at the current seek position from the current position.
This method reads the block of data at the current seek position. To change the seek
position, use [File.seek](file.md#seek).

**`throws`** Error Thrown when `length` is not a positive, safe integer.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`length` | *number* | Number of bytes to read.   |

**Returns:** [*ByteVector*](bytevector.md)

ByteVector Object containing the data read from the current instance.

___

### readEnd

▸ `Protected`**readEnd**(`_end`: *number*, `_propertiesStyle`: [*ReadStyle*](../enums/readstyle.md)): *void*

**`inheritdoc`** 

#### Parameters:

Name | Type |
------ | ------ |
`_end` | *number* |
`_propertiesStyle` | [*ReadStyle*](../enums/readstyle.md) |

**Returns:** *void*

___

### readProperties

▸ `Protected`**readProperties**(`start`: *number*, `end`: *number*, `_propertiesStyle`: [*ReadStyle*](../enums/readstyle.md)): [*Properties*](properties.md)

**`inheritdoc`** 

#### Parameters:

Name | Type |
------ | ------ |
`start` | *number* |
`end` | *number* |
`_propertiesStyle` | [*ReadStyle*](../enums/readstyle.md) |

**Returns:** [*Properties*](properties.md)

___

### readStart

▸ `Protected`**readStart**(`start`: *number*, `propertiesStyle`: [*ReadStyle*](../enums/readstyle.md)): *void*

**`inheritdoc`** 

#### Parameters:

Name | Type |
------ | ------ |
`start` | *number* |
`propertiesStyle` | [*ReadStyle*](../enums/readstyle.md) |

**Returns:** *void*

___

### removeBlock

▸ **removeBlock**(`start`: *number*, `length`: *number*): *void*

Removes a specified block of data from the file represented by the current instance.

**`throws`** Error thrown if 1) start is not a safe, positive integer or 2) length must be a safe
    integer.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`start` | *number* | Index into the file at which to remove data. Must be safe, positive integer.   |
`length` | *number* | Number of bytes to remove. Must be a safe integer.   |

**Returns:** *void*

___

### removeTags

▸ **removeTags**(`types`: [*TagTypes*](../enums/tagtypes.md)): *void*

**`inheritdoc`** 

#### Parameters:

Name | Type |
------ | ------ |
`types` | [*TagTypes*](../enums/tagtypes.md) |

**Returns:** *void*

___

### save

▸ **save**(): *void*

**`inheritdoc`** 

**Returns:** *void*

___

### seek

▸ **seek**(`offset`: *number*, `origin?`: SeekOrigin): *void*

Moves the read/write pointer to a specified offset in the current instance, relative to a
specified origin.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`offset` | *number* | - | Byte offset to seek to. Must be a safe, positive integer.   |
`origin` | SeekOrigin | ... | Origin from which to seek    |

**Returns:** *void*

___

### truncate

▸ `Protected`**truncate**(`length`: *number*): *void*

Resizes the current instance to a specific number of bytes.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`length` | *number* | Number of bytes to resize the file to, must be a safe, positive integer.    |

**Returns:** *void*

___

### writeBlock

▸ **writeBlock**(`data`: [*ByteVector*](bytevector.md)): *void*

Writes a block of data to the file represented by the current instance at the current seek
position. This will overwrite any existing data at the seek position and append new data to
the file if writing past the current end.

**`throws`** Error Thrown when `data` is not provided.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [*ByteVector*](bytevector.md) | ByteVector containing data to the current instance.   |

**Returns:** *void*

___

### addFileType

▸ `Static`**addFileType**(`mimeType`: *string*, `constructor`: [*FileTypeConstructor*](../modules.md#filetypeconstructor), `override?`: *boolean*): *void*

Registers the constructor for a subclass of [File](file.md) with the MimeType it is associated
with. Optionally, the MimeType can be forcefully overridden if it was already registered.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`mimeType` | *string* | - | MimeType to register this subclass constructor to.   |
`constructor` | [*FileTypeConstructor*](../modules.md#filetypeconstructor) | - | Constructor for a subclass of [File](file.md) that will be called if a file     with a MimeType of `mimeType` is created.   |
`override` | *boolean* | false | If `true` and a subclass of [File](file.md) was already registered to     `mimeType`, it will be forcefully overridden. If `false`, an {@link Error} will be     thrown if a subclass already registered to the MimeType.}    |

**Returns:** *void*

___

### addFileTypeResolver

▸ `Static`**addFileTypeResolver**(`resolver`: [*FileTypeResolver*](../modules.md#filetyperesolver)): *void*

Registers a [FileTypeResolver](../modules.md#filetyperesolver) to the front of the list of file type resolvers.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`resolver` | [*FileTypeResolver*](../modules.md#filetyperesolver) | Function to handle resolving a subclass of [File](file.md) from an     {@link IFileAbstraction}    |

**Returns:** *void*

___

### createFromAbstraction

▸ `Static`**createFromAbstraction**(`abstraction`: IFileAbstraction, `mimeType?`: *string*, `propertiesStyle?`: [*ReadStyle*](../enums/readstyle.md)): [*File*](file.md)

Creates a new instance of a [File](file.md) subclass for a specified file abstraction, MimeType,
and property read style.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`abstraction` | IFileAbstraction | - | Object to use when reading/writing from the current instance.   |
`mimeType?` | *string* | - | Optional, MimeType to use for determining the subclass of [File](file.md) to     return. If omitted, the MimeType will be guessed based on the file's extension.   |
`propertiesStyle` | [*ReadStyle*](../enums/readstyle.md) | ... | Optional, level of detail to use when reading the media information     from the new instance. If omitted, [ReadStyle.Average](../enums/readstyle.md#average) is used.   |

**Returns:** [*File*](file.md)

New instance of [File](file.md) as read from the specified abstraction.

___

### createFromPath

▸ `Static`**createFromPath**(`filePath`: *string*, `mimeType?`: *string*, `propertiesStyle?`: [*ReadStyle*](../enums/readstyle.md)): [*File*](file.md)

Creates a new instance of [File](file.md) subclass for a specified file path, MimeType, and
property read style.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`filePath` | *string* | - | Path to the file to read/write.   |
`mimeType?` | *string* | - | Optional, MimeType to use for determining the subclass of [File](file.md) to     return. If omitted, the MimeType will be guessed based on the file's extension.   |
`propertiesStyle` | [*ReadStyle*](../enums/readstyle.md) | ... | Optional, level of detail to use when reading the media information     from the new instance. If omitted [ReadStyle.Average](../enums/readstyle.md#average) is used.   |

**Returns:** [*File*](file.md)

New instance of [File](file.md) as read from the specified path.

___

### removeFileType

▸ `Static`**removeFileType**(`mimeType`: *string*): *void*

Used for removing a file type constructor during unit testing

#### Parameters:

Name | Type |
------ | ------ |
`mimeType` | *string* |

**Returns:** *void*

___

### removeFileTypeResolver

▸ `Static`**removeFileTypeResolver**(`resolver`: [*FileTypeResolver*](../modules.md#filetyperesolver)): *void*

Used for removing a file type resolver during unit testing

#### Parameters:

Name | Type |
------ | ------ |
`resolver` | [*FileTypeResolver*](../modules.md#filetyperesolver) |

**Returns:** *void*
