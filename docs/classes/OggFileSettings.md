[node-taglib-sharp](../README.md) / [Exports](../modules.md) / OggFileSettings

# Class: OggFileSettings

This class contains settings related to Ogg file operations. Open files will need to be re-read
in order for changes to take effect.

## Table of contents

### Constructors

- [constructor](OggFileSettings.md#constructor)

### Accessors

- [writeToAllComments](OggFileSettings.md#writetoallcomments)

## Constructors

### constructor

• **new OggFileSettings**()

## Accessors

### writeToAllComments

• `Static` `get` **writeToAllComments**(): `boolean`

Gets whether changes to Ogg tag fields should be written to all Xiph comments or just the
first Xiph comment in the file.

**`remarks`** Ogg files are required to have one Xiph comment per stream. In files with multiple
    streams, this means there are multiple Xiph comments per file.

#### Returns

`boolean`

• `Static` `set` **writeToAllComments**(`value`): `void`

Sets whether changes to Ogg tag fields should be written to all Xiph comments or just the
first Xiph comment in the file.

**`remarks`** Ogg files are required to have one Xiph comment per stream. In files with multiple
    streams, this means there are multiple Xiph comments per file.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`
