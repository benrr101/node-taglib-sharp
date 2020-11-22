**[node-taglib-sharp](../README.md)**

> [Globals](../globals.md) / ["src/id3v2/id3v2Settings"](../modules/_src_id3v2_id3v2settings_.md) / Id3v2Settings

# Class: Id3v2Settings

## Hierarchy

* **Id3v2Settings**

## Index

### Accessors

* [defaultEncoding](_src_id3v2_id3v2settings_.id3v2settings.md#defaultencoding)
* [defaultVersion](_src_id3v2_id3v2settings_.id3v2settings.md#defaultversion)
* [footerSize](_src_id3v2_id3v2settings_.id3v2settings.md#footersize)
* [forceDefaultEncoding](_src_id3v2_id3v2settings_.id3v2settings.md#forcedefaultencoding)
* [forceDefaultVersion](_src_id3v2_id3v2settings_.id3v2settings.md#forcedefaultversion)
* [headerSize](_src_id3v2_id3v2settings_.id3v2settings.md#headersize)
* [strictFrameForVersion](_src_id3v2_id3v2settings_.id3v2settings.md#strictframeforversion)
* [useNumericGenres](_src_id3v2_id3v2settings_.id3v2settings.md#usenumericgenres)

## Accessors

### defaultEncoding

• `Static`get **defaultEncoding**(): [StringType](../enums/_src_bytevector_.stringtype.md)

Gets the encoding to use when creating new frames.

**Returns:** [StringType](../enums/_src_bytevector_.stringtype.md)

• `Static`set **defaultEncoding**(`value`: [StringType](../enums/_src_bytevector_.stringtype.md)): void

Sets the encoding to use when creating new frames.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | [StringType](../enums/_src_bytevector_.stringtype.md) | Encoding to use when creating new frames  |

**Returns:** void

___

### defaultVersion

• `Static`get **defaultVersion**(): number

Gets the default version to use when creating new tags.
If [forceDefaultEncoding](_src_id3v2_id3v2settings_.id3v2settings.md#forcedefaultencoding) is `true` then all tags will be rendered with this version.

**Returns:** number

• `Static`set **defaultVersion**(`value`: number): void

Sets the default version to use when creating new tags.
If [forceDefaultEncoding](_src_id3v2_id3v2settings_.id3v2settings.md#forcedefaultencoding) is `true` then all tags will be rendered with this version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | number | ID3v2 version to use. Must be 2, 3, or 4. The default for this library is 3  |

**Returns:** void

___

### footerSize

• `Static`get **footerSize**(): number

Size of an ID3v2 footer in bytes

**Returns:** number

___

### forceDefaultEncoding

• `Static`get **forceDefaultEncoding**(): boolean

Gets whether or not to render all frames with the default encoding rather than their
original encoding.

**Returns:** boolean

• `Static`set **forceDefaultEncoding**(`value`: boolean): void

Sets whether or not to render all frames with the default encoding rather than their
original encoding.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | boolean | If `true` frames will be rendered using [defaultEncoding](_src_id3v2_id3v2settings_.id3v2settings.md#defaultencoding) rather than     their original encoding.  |

**Returns:** void

___

### forceDefaultVersion

• `Static`get **forceDefaultVersion**(): boolean

Gets whether or not to save all tags in the default version rather than their original
version.

**Returns:** boolean

• `Static`set **forceDefaultVersion**(`value`: boolean): void

Sets whether or not to save all tags in the default version rather than their original
version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | boolean | If `true`, tags will be saved in the version defined in [defaultVersion](_src_id3v2_id3v2settings_.id3v2settings.md#defaultversion)     rather than their original format, with the exception of tags with footers which will     always be saved in version 4  |

**Returns:** void

___

### headerSize

• `Static`get **headerSize**(): number

Size of an ID3v2 header in bytes

**Returns:** number

___

### strictFrameForVersion

• `Static`get **strictFrameForVersion**(): boolean

Gets whether or not attempting to write a frame that is unsupported in the desired version
will throw an error.
If `true` writing a frame that is not supported in the desired version will throw an error
during the render process. If `false` if a frame is not supported in the desired version it
will be omitted from rendering and no error will be thrown.

**Returns:** boolean

• `Static`set **strictFrameForVersion**(`value`: boolean): void

Sets whether or not attempting to write a frame that is unsupported in the desired version
will throw an error.
If `true` writing a frame that is not supported in the desired version will throw an error
during the render process. If `false` if a frame is not supported in the desired version it
will be omitted from rendering and no error will be thrown.

#### Parameters:

Name | Type |
------ | ------ |
`value` | boolean |

**Returns:** void

___

### useNumericGenres

• `Static`get **useNumericGenres**(): boolean

Gets whether or not to use ID3v1 style numeric genres when possible.
If `true`, the library will try looking up the numeric genre code when storing the value.
for ID3v2.2 and ID3v2.3 "Rock" would be stored as "(17)" and for ID3v2.4, it would be
stored as "17".

**Returns:** boolean

• `Static`set **useNumericGenres**(`value`: boolean): void

Sets whether or not to use ID3v1 style numeric genres when possible.
If `true`, the library will try looking up the numeric genre code when storing the value.
for ID3v2.2 and ID3v2.3 "Rock" would be stored as "(17)" and for ID3v2.4, it would be
stored as "17".

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | boolean | Whether or not to use genres with numeric values when values when possible  |

**Returns:** void
