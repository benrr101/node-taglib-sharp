[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2Settings

# Class: Id3v2Settings

This class contains settings related to ID3v2 tag operations. Open files will need to be
re-read in order for changes to take effect.

## Table of contents

### Accessors

- [defaultEncoding](Id3v2Settings.md#defaultencoding)
- [defaultVersion](Id3v2Settings.md#defaultversion)
- [footerSize](Id3v2Settings.md#footersize)
- [forceDefaultEncoding](Id3v2Settings.md#forcedefaultencoding)
- [forceDefaultVersion](Id3v2Settings.md#forcedefaultversion)
- [headerSize](Id3v2Settings.md#headersize)
- [strictFrameForVersion](Id3v2Settings.md#strictframeforversion)
- [useNonStandardV2V3GenreSeparators](Id3v2Settings.md#usenonstandardv2v3genreseparators)
- [useNonStandardV2V3NumericGenres](Id3v2Settings.md#usenonstandardv2v3numericgenres)
- [useNumericGenres](Id3v2Settings.md#usenumericgenres)

## Accessors

### defaultEncoding

• `Static` `get` **defaultEncoding**(): [`StringType`](../enums/StringType.md)

Gets the encoding to use when creating new frames.

#### Returns

[`StringType`](../enums/StringType.md)

• `Static` `set` **defaultEncoding**(`value`): `void`

Sets the encoding to use when creating new frames.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`StringType`](../enums/StringType.md) | Encoding to use when creating new frames |

#### Returns

`void`

___

### defaultVersion

• `Static` `get` **defaultVersion**(): `number`

Gets the default version to use when creating new tags.
If [forceDefaultEncoding](Id3v2Settings.md#forcedefaultencoding) is `true` then all tags will be rendered with this version.

#### Returns

`number`

• `Static` `set` **defaultVersion**(`value`): `void`

Sets the default version to use when creating new tags.
If [forceDefaultEncoding](Id3v2Settings.md#forcedefaultencoding) is `true` then all tags will be rendered with this version.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | ID3v2 version to use. Must be 2, 3, or 4. The default for this library is 3 |

#### Returns

`void`

___

### footerSize

• `Static` `get` **footerSize**(): `number`

Size of an ID3v2 footer in bytes

#### Returns

`number`

___

### forceDefaultEncoding

• `Static` `get` **forceDefaultEncoding**(): `boolean`

Gets whether to render all frames with the default encoding rather than their
original encoding.

#### Returns

`boolean`

• `Static` `set` **forceDefaultEncoding**(`value`): `void`

Sets whether to render all frames with the default encoding rather than their
original encoding.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `boolean` | If `true` frames will be rendered using [defaultEncoding](Id3v2Settings.md#defaultencoding) rather than their original encoding. |

#### Returns

`void`

___

### forceDefaultVersion

• `Static` `get` **forceDefaultVersion**(): `boolean`

Gets whether to save all tags in the default version rather than their original
version.

#### Returns

`boolean`

• `Static` `set` **forceDefaultVersion**(`value`): `void`

Sets whether to save all tags in the default version rather than their original
version.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `boolean` | If `true`, tags will be saved in the version defined in [defaultVersion](Id3v2Settings.md#defaultversion) rather than their original format, except tags with footers which will always be saved in version 4 |

#### Returns

`void`

___

### headerSize

• `Static` `get` **headerSize**(): `number`

Size of an ID3v2 header in bytes

#### Returns

`number`

___

### strictFrameForVersion

• `Static` `get` **strictFrameForVersion**(): `boolean`

Gets whether attempting to write a frame that is unsupported in the desired version
will throw an error.
If `true` writing a frame that is not supported in the desired version will throw an error
during the render process. If `false` if a frame is not supported in the desired version it
will be omitted from rendering and no error will be thrown.

#### Returns

`boolean`

• `Static` `set` **strictFrameForVersion**(`value`): `void`

Sets whether attempting to write a frame that is unsupported in the desired version
will throw an error.
If `true` writing a frame that is not supported in the desired version will throw an error
during the render process. If `false` if a frame is not supported in the desired version it
will be omitted from rendering and no error will be thrown.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`

___

### useNonStandardV2V3GenreSeparators

• `Static` `get` **useNonStandardV2V3GenreSeparators**(): `boolean`

Gets whether to use non-standard genre separators on ID3v2.2 and ID3v2.4.
If `true`, the TCO/TCON frame value will be separated by `;` and/or `/`, empty values will
be thrown out. If `false`, the TCO/TCON frame value will be returned as-is (after processing
standard, escaped numeric genres).

**`Remarks`**

The official ID3v2 standard makes no mention of separators for genres, one of the
    inherent flaws fixed in ID3v2.4. However, various media players, as well as the original
    implementation of TagLib#, support using `;` and `/` to separate genres. In order to
    maintain compatibility, this functionality is preserved, but can be disabled by setting
    [useNonStandardV2V3GenreSeparators](Id3v2Settings.md#usenonstandardv2v3genreseparators) to `false`.

#### Returns

`boolean`

• `Static` `set` **useNonStandardV2V3GenreSeparators**(`value`): `void`

Sets whether to use non-standard genre separators on ID3v2.2 and ID3v2.3.
If `true`, the TCO/TCON frame value will be separated by `;` and/or `/`, empty values will
be thrown out. If `false`, the TCO/TCON frame value will be returned as-is (after processing
standard, escaped numeric genres).

**`Remarks`**

The official ID3v2 standard makes no mention of separators for genres, one of the
    inherent flaws fixed in ID3v2.4. However, various media players, as well as the original
    implementation of TagLib#, support using `;` and `/` to separate genres. In order to
    maintain compatibility, this functionality is preserved, but can be disabled by setting
    [useNonStandardV2V3GenreSeparators](Id3v2Settings.md#usenonstandardv2v3genreseparators) to `false`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`

___

### useNonStandardV2V3NumericGenres

• `Static` `get` **useNonStandardV2V3NumericGenres**(): `boolean`

Gets whether to use non-standard numeric genre parsing on ID3v2.2 and ID3v2.3. If
`true`, a purely numeric TCO/TCON frame value will attempt to be parsed as a numeric genre.
If `false`, the TCO/TCON frame value will be returned without parsing purely numeric genres.

**`Remarks`**

The official ID3v2.2/ID3v2.3 standard only supports numeric genres if they are
    escaped inside parenthesis (eg, `(12)`). However, the original implementation of TagLib#
    allowed ID3v2.2 and ID3v2.3 tags to parse unescaped numeric genres. In order to maintain
    compatibility, this functionality is preserved, but can be disabled by setting
    [useNonStandardV2V3NumericGenres](Id3v2Settings.md#usenonstandardv2v3numericgenres) to `false`.

#### Returns

`boolean`

• `Static` `set` **useNonStandardV2V3NumericGenres**(`value`): `void`

Sets whether to use non-standard numeric genre parsing on ID3v2.2 and ID3v2.3. If
`true`, a purely numeric TCO/TCON frame value will attempt to be parsed as a numeric genre.
If `false`, the TCO/TCON frame value will be returned without parsing purely numeric genres.

**`Remarks`**

The official ID3v2.2/ID3v2.3 standard only supports numeric genres if they are
    escaped inside parenthesis (eg, `(12)`). However, the original implementation of TagLib#
    allowed ID3v2.2 and ID3v2.3 tags to parse unescaped numeric genres. In order to maintain
    compatibility, this functionality is preserved, but can be disabled by setting
    [useNonStandardV2V3NumericGenres](Id3v2Settings.md#usenonstandardv2v3numericgenres) to `false`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`

___

### useNumericGenres

• `Static` `get` **useNumericGenres**(): `boolean`

Gets whether to use ID3v1 style numeric genres when possible.
If `true`, the library will try looking up the numeric genre code when storing the value.
for ID3v2.2 and ID3v2.3 "Rock" would be stored as "(17)" and for ID3v2.4, it would be
stored as "17".

#### Returns

`boolean`

• `Static` `set` **useNumericGenres**(`value`): `void`

Sets whether to use ID3v1 style numeric genres when possible.
If `true`, the library will try looking up the numeric genre code when storing the value.
for ID3v2.2 and ID3v2.3 "Rock" would be stored as "(17)" and for ID3v2.4, it would be
stored as "17".

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `boolean` | Whether or not to use genres with numeric values when possible |

#### Returns

`void`
