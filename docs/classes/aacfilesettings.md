[node-taglib-sharp](../README.md) / [Exports](../modules.md) / AacFileSettings

# Class: AacFileSettings

This class contains settings related to AAC file operations. Open files will need to be re-read
in order for changes to take effect.

## Table of contents

### Constructors

- [constructor](aacfilesettings.md#constructor)

### Properties

- [supportedTagTypes](aacfilesettings.md#supportedtagtypes)

### Accessors

- [defaultTagTypes](aacfilesettings.md#defaulttagtypes)
- [preferApeTagAtFileEnd](aacfilesettings.md#preferapetagatfileend)
- [preferId3v2TagAtFileEnd](aacfilesettings.md#preferid3v2tagatfileend)

## Constructors

### constructor

• **new AacFileSettings**()

## Properties

### supportedTagTypes

▪ `Static` `Readonly` **supportedTagTypes**: `number`

## Accessors

### defaultTagTypes

• `Static` `get` **defaultTagTypes**(): [`TagTypes`](../enums/tagtypes.md)

Gets the default types of tags for an AAC file. When opening a file, if these tag types do
not exist on the file, they will be created.

#### Returns

[`TagTypes`](../enums/tagtypes.md)

• `Static` `set` **defaultTagTypes**(`value`): `void`

Sets the default types of tags for an AAC file. When opening a file, if these tag types do
not exist on the file, they will be created. See [supportedTagTypes](aacfilesettings.md#supportedtagtypes) for a list of tag
types that are supported by node-taglib-sharp for AAC files.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`TagTypes`](../enums/tagtypes.md) |

#### Returns

`void`

___

### preferApeTagAtFileEnd

• `Static` `get` **preferApeTagAtFileEnd**(): `boolean`

Gets whether or not *new* APE tags should be stored at the end of the file. If `true` new
APE tags will be stored at the end of the file. If `false` new APE tags will be stored at
the beginning of the file (not recommended). Note, this only affects *new* APE tags.
Existing APE tags will not be moved unless removed and re-added.

**`default`** `true`

#### Returns

`boolean`

• `Static` `set` **preferApeTagAtFileEnd**(`value`): `void`

Gets whether or not *new* APE tags should be stored at the end of the file. If `true` new
APE tags will be stored at the end of the file. If `false` new APE tags will be stored at
the beginning of the file (not recommended). Note, this only affects *new* APE tags.
Existing APE tags will not be moved unless removed and re-added.

**`default`** `true`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`

___

### preferId3v2TagAtFileEnd

• `Static` `get` **preferId3v2TagAtFileEnd**(): `boolean`

Gets whether or not *new* ID3v2 tags should be stored at the end of the file. If `true` new
ID3v2 tags will be stored at the end of the file. If `false` new ID3v2 tags will be stored
at the beginning of the file. Note, this only affects *new* ID3v2 tags. Existing ID3v2 tags
will not be moved unless removed and re-added.

**`remarks`** In order to store an ID3v2 tag at the end of a file, it must have a tag footer. Tag
    footers are only supported in ID3v2.4. If the ID3v2 version is changed, it will cause an
    error to be thrown when the tag is rendered.

**`default`** `false`

#### Returns

`boolean`

• `Static` `set` **preferId3v2TagAtFileEnd**(`value`): `void`

Sets whether or not *new* ID3v2 tags should be stored at the end of the file. If `true` new
ID3v2 tags will be stored at the end of the file. If `false` new ID3v2 tags will be stored
at the beginning of the file. Note, this only affects *new* ID3v2 tags. Existing ID3v2 tags
will not be moved unless removed and re-added.
* @remarks In order to store an ID3v2 tag at the end of a file, it must have a tag footer. Tag
    footers are only supported in ID3v2.4. If the ID3v2 version is changed, it will cause an
    error to be thrown when the tag is rendered.

**`default`** `false`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`
