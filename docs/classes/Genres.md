[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Genres

# Class: Genres

"Well known" genres and methods for converting between numeric representations of them and the
string representation of them.

## Table of contents

### Constructors

- [constructor](Genres.md#constructor)

### Properties

- [AUDIO\_GENRES](Genres.md#audio_genres)
- [VIDEO\_GENRES](Genres.md#video_genres)

### Methods

- [audioToIndex](Genres.md#audiotoindex)
- [indexToAudio](Genres.md#indextoaudio)
- [indexToVideo](Genres.md#indextovideo)
- [videoToIndex](Genres.md#videotoindex)

## Constructors

### constructor

• **new Genres**()

## Properties

### AUDIO\_GENRES

▪ `Static` `Readonly` **AUDIO\_GENRES**: `string`[]

ID3v1 audio genres. Index corresponds to the numeric value of the genre.

___

### VIDEO\_GENRES

▪ `Static` `Readonly` **VIDEO\_GENRES**: `string`[]

DivX video genres. Index corresponds to the numeric value of the genre.

## Methods

### audioToIndex

▸ `Static` **audioToIndex**(`name`): `number`

Gets the genre index for a specified audio genre.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Name of the genre to lookup |

#### Returns

`number`

Index of the genre in the audio array or 255 if it could not be found.

___

### indexToAudio

▸ `Static` **indexToAudio**(`index`, `allowParenthesis`): `string`

Gets the audio genre name for a specified index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `string` \| `number` | Index of the genre in the audio genre array. Can be a Number, string or string wrapped in `( )`, if `allowParenthesis` is set to `true` |
| `allowParenthesis` | `boolean` | Whether or not a number wrapped in parentheses is allowed |

#### Returns

`string`

Genre name if found, or `undefined` if `index` is outside the
    bounds of the audio genre array or if `index` is not valid.

___

### indexToVideo

▸ `Static` **indexToVideo**(`index`, `allowParenthesis`): `string`

Gets the video genre name for a specified index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `string` \| `number` | Index of the genre in the video genre array. Can be a Number, string or string wrapped in `( )` if `allowParenthesis` is set to `true` |
| `allowParenthesis` | `boolean` | Whether or not a number wrapped in parentheses is allowed |

#### Returns

`string`

Genre name if found, or `undefined` if `index` is outside the
    bounds of the video genre array or if `index` is not valid.

___

### videoToIndex

▸ `Static` **videoToIndex**(`name`): `number`

Gets the genre index for a specified video genre.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Name of the genre to lookup |

#### Returns

`number`

Index of the genre in the video array or 255 if it could not be found.
