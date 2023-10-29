[node-taglib-sharp](../README.md) / [Exports](../modules.md) / WaveFileSettings

# Class: WaveFileSettings

This class contains settings related to WAV file operations. Open files will need to be re-read
in order for changes to take effect.

## Table of contents

### Constructors

- [constructor](WaveFileSettings.md#constructor)

### Properties

- [SUPPORTED\_TAG\_TYPES](WaveFileSettings.md#supported_tag_types)

### Accessors

- [defaultTagTypes](WaveFileSettings.md#defaulttagtypes)

## Constructors

### constructor

• **new WaveFileSettings**()

## Properties

### SUPPORTED\_TAG\_TYPES

▪ `Static` `Readonly` **SUPPORTED\_TAG\_TYPES**: `number`

The types of tags that are supported by WAV files.

## Accessors

### defaultTagTypes

• `Static` `get` **defaultTagTypes**(): [`TagTypes`](../enums/TagTypes.md)

Gets the default types of tags for an WAV file. When opening a file, if these tag types do
not exist on the file, they will be created.

#### Returns

[`TagTypes`](../enums/TagTypes.md)

• `Static` `set` **defaultTagTypes**(`value`): `void`

Sets the default types of tags for an WAV file. When opening a file, if these tag types do
not exist on the file, they will be created. See [SUPPORTED_TAG_TYPES](WaveFileSettings.md#supported_tag_types) for a list of tag
types that are supported by node-taglib-sharp for WAV files.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`TagTypes`](../enums/TagTypes.md) |

#### Returns

`void`
