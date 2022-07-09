[node-taglib-sharp](../README.md) / [Exports](../modules.md) / InfoTag

# Class: InfoTag

Provides support for reading and writing standard INFO tags.

## Hierarchy

- [`RiffListTag`](RiffListTag.md)

  ↳ **`InfoTag`**

## Table of contents

### Properties

- [LIST\_TYPE](InfoTag.md#list_type)

### Accessors

- [album](InfoTag.md#album)
- [albumArtists](InfoTag.md#albumartists)
- [albumArtistsSort](InfoTag.md#albumartistssort)
- [albumSort](InfoTag.md#albumsort)
- [amazonId](InfoTag.md#amazonid)
- [beatsPerMinute](InfoTag.md#beatsperminute)
- [comment](InfoTag.md#comment)
- [composers](InfoTag.md#composers)
- [composersSort](InfoTag.md#composerssort)
- [conductor](InfoTag.md#conductor)
- [copyright](InfoTag.md#copyright)
- [dateTagged](InfoTag.md#datetagged)
- [description](InfoTag.md#description)
- [disc](InfoTag.md#disc)
- [discCount](InfoTag.md#disccount)
- [firstAlbumArtist](InfoTag.md#firstalbumartist)
- [firstAlbumArtistSort](InfoTag.md#firstalbumartistsort)
- [firstComposer](InfoTag.md#firstcomposer)
- [firstComposerSort](InfoTag.md#firstcomposersort)
- [firstGenre](InfoTag.md#firstgenre)
- [firstPerformer](InfoTag.md#firstperformer)
- [firstPerformerSort](InfoTag.md#firstperformersort)
- [genres](InfoTag.md#genres)
- [grouping](InfoTag.md#grouping)
- [initialKey](InfoTag.md#initialkey)
- [isCompilation](InfoTag.md#iscompilation)
- [isEmpty](InfoTag.md#isempty)
- [isrc](InfoTag.md#isrc)
- [joinedAlbumArtists](InfoTag.md#joinedalbumartists)
- [joinedComposers](InfoTag.md#joinedcomposers)
- [joinedGenres](InfoTag.md#joinedgenres)
- [joinedPerformers](InfoTag.md#joinedperformers)
- [joinedPerformersSort](InfoTag.md#joinedperformerssort)
- [list](InfoTag.md#list)
- [lyrics](InfoTag.md#lyrics)
- [musicBrainzArtistId](InfoTag.md#musicbrainzartistid)
- [musicBrainzDiscId](InfoTag.md#musicbrainzdiscid)
- [musicBrainzReleaseArtistId](InfoTag.md#musicbrainzreleaseartistid)
- [musicBrainzReleaseCountry](InfoTag.md#musicbrainzreleasecountry)
- [musicBrainzReleaseGroupId](InfoTag.md#musicbrainzreleasegroupid)
- [musicBrainzReleaseId](InfoTag.md#musicbrainzreleaseid)
- [musicBrainzReleaseStatus](InfoTag.md#musicbrainzreleasestatus)
- [musicBrainzReleaseType](InfoTag.md#musicbrainzreleasetype)
- [musicBrainzTrackId](InfoTag.md#musicbrainztrackid)
- [musicIpId](InfoTag.md#musicipid)
- [performers](InfoTag.md#performers)
- [performersRole](InfoTag.md#performersrole)
- [performersSort](InfoTag.md#performerssort)
- [pictures](InfoTag.md#pictures)
- [publisher](InfoTag.md#publisher)
- [remixedBy](InfoTag.md#remixedby)
- [replayGainAlbumGain](InfoTag.md#replaygainalbumgain)
- [replayGainAlbumPeak](InfoTag.md#replaygainalbumpeak)
- [replayGainTrackGain](InfoTag.md#replaygaintrackgain)
- [replayGainTrackPeak](InfoTag.md#replaygaintrackpeak)
- [sizeOnDisk](InfoTag.md#sizeondisk)
- [stringType](InfoTag.md#stringtype)
- [subtitle](InfoTag.md#subtitle)
- [tagTypes](InfoTag.md#tagtypes)
- [title](InfoTag.md#title)
- [titleSort](InfoTag.md#titlesort)
- [track](InfoTag.md#track)
- [trackCount](InfoTag.md#trackcount)
- [year](InfoTag.md#year)

### Methods

- [clear](InfoTag.md#clear)
- [copyTo](InfoTag.md#copyto)
- [getFirstValueAsString](InfoTag.md#getfirstvalueasstring)
- [getValueAsUint](InfoTag.md#getvalueasuint)
- [getValues](InfoTag.md#getvalues)
- [getValuesAsStrings](InfoTag.md#getvaluesasstrings)
- [removeValue](InfoTag.md#removevalue)
- [render](InfoTag.md#render)
- [setInfoTag](InfoTag.md#setinfotag)
- [setValueFromUint](InfoTag.md#setvaluefromuint)
- [setValues](InfoTag.md#setvalues)
- [setValuesFromStrings](InfoTag.md#setvaluesfromstrings)
- [firstInGroup](InfoTag.md#firstingroup)
- [fromEmpty](InfoTag.md#fromempty)
- [fromList](InfoTag.md#fromlist)
- [isFalsyOrLikeEmpty](InfoTag.md#isfalsyorlikeempty)
- [joinGroup](InfoTag.md#joingroup)
- [tagTypeFlagsToArray](InfoTag.md#tagtypeflagstoarray)

## Properties

### LIST\_TYPE

▪ `Static` `Readonly` **LIST\_TYPE**: ``"INFO"``

Type of the list that contains an info tag.

## Accessors

### album

• `get` **album**(): `string`

**`inheritdoc`**

**`remarks`** Implemented via the `DIRC` item.

#### Returns

`string`

#### Overrides

RiffListTag.album

• `set` **album**(`value`): `void`

**`inheritdoc`**

**`remarks`** Implemented via the `DIRC` item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Overrides

RiffListTag.album

___

### albumArtists

• `get` **albumArtists**(): `string`[]

**`inheritdoc`**

**`remarks`** Implemented via the `IART` item.

#### Returns

`string`[]

#### Overrides

RiffListTag.albumArtists

• `set` **albumArtists**(`value`): `void`

**`inheritdoc`**

**`remarks`** Implemented via the `IART` item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string`[] |

#### Returns

`void`

#### Overrides

RiffListTag.albumArtists

___

### albumArtistsSort

• `get` **albumArtistsSort**(): `string`[]

Gets the sortable names of the bands/artists who are credited with creating the entire
album or collection containing the media described by the current instance.

**`see`** albumArtists

**`remarks`** This is used to provide more control over how the media is sorted. Typical uses are to
    skip articles or sort by last by last name. For example "Ben Folds" might be sorted as
    "Folds, Ben".
    As this value is to be used as a sorting key, it should be used with less variation than
    [performers](InfoTag.md#performers). Where [performers](InfoTag.md#performers) can be broken into multiple performers, it is
    best to stick to a single album artist. Eg, "Van Buuren, Armin"

#### Returns

`string`[]

Sortable names for the bands/artists are credited with the creation of the entire
    album or collection containing the media described by the current instance, or an empty
    array if no value is present.

#### Inherited from

RiffListTag.albumArtistsSort

• `set` **albumArtistsSort**(`value`): `void`

Sets the sortable names of the bands/artists who are credited with creating the entire
album or collection containing the media described by the current instance.

**`see`** albumArtists

**`remarks`** This is used to provide more control over how the media is sorted. Typical uses are to
    skip articles or sort by last by last name. For example "Ben Folds" might be sorted as
    "Folds, Ben".
    As this value is to be used as a sorting key, it should be used with less variation than
    [performers](InfoTag.md#performers). Where [performers](InfoTag.md#performers) can be broken into multiple performers, it is
    best to stick to a single album artist. Eg, "Van Buuren, Armin"

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string`[] | Sortable names for the bands/artists are credited with the creation of the     entire album or collection containing the media described by the current instance, or an     empty array if no value is present. |

#### Returns

`void`

Sortable names for the bands/artists are credited with the creation of the entire
    album or collection containing the media described by the current instance, or an empty
    array if no value is present.

#### Inherited from

RiffListTag.albumArtistsSort

___

### albumSort

• `get` **albumSort**(): `string`

Gets the sortable name of the album title of the media represented by the current instance.

**`see`** album

**`remarks`** This field is typically optional but aids in sort of compilations or albums with
    similar titles.

#### Returns

`string`

Sortable name for the album title of the media or `undefined` if the value is not
    present

#### Inherited from

RiffListTag.albumSort

• `set` **albumSort**(`value`): `void`

Sets the sortable name of the album title of the media represented by the current instance.

**`see`** album

**`remarks`** This field is typically optional but aids in sort of compilations or albums with
    similar titles.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Sortable name for the album title of the media or `undefined` if the value is     not present |

#### Returns

`void`

Sortable name for the album title of the media or `undefined` if the value is not
    present

#### Inherited from

RiffListTag.albumSort

___

### amazonId

• `get` **amazonId**(): `string`

Gets the Amazon ID of the media represented by the current instance.

**`remarks`** This field represents the AmazonID, also called the ASIN, and is used to uniquely
    identify the particular track or album in the Amazon catalog.

#### Returns

`string`

Amazon ID of the media represented by the current instance or `undefined` if no
    value is present

#### Inherited from

RiffListTag.amazonId

• `set` **amazonId**(`value`): `void`

Sets the Amazon ID of the media represented by the current instance.

**`remarks`** This field represents the AmazonID, also called the ASIN, and is used to uniquely
    identify the particular track or album in the Amazon catalog.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Amazon ID of the media represented by the current instance or `undefined` if no     value is present |

#### Returns

`void`

Amazon ID of the media represented by the current instance or `undefined` if no
    value is present

#### Inherited from

RiffListTag.amazonId

___

### beatsPerMinute

• `get` **beatsPerMinute**(): `number`

Gets the number of beats per minute in the audio of the media represented by the current
instance.

**`remarks`** This field is useful for DJ's who are trying to beat match tracks. It should be
    calculated from the audio or pulled from a database.

#### Returns

`number`

Beats per minute of the audio in the media represented by the current instance, or
    `0` if not specified

#### Inherited from

RiffListTag.beatsPerMinute

• `set` **beatsPerMinute**(`value`): `void`

Sets the number of beats per minute in the audio of the media represented by the current
instance.

**`remarks`** This field is useful for DJ's who are trying to beat match tracks. It should be
    calculated from the audio or pulled from a database.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Beats per minute of the audio in the media represented by the current instance,     or `0` if not specified |

#### Returns

`void`

Beats per minute of the audio in the media represented by the current instance, or
    `0` if not specified

#### Inherited from

RiffListTag.beatsPerMinute

___

### comment

• `get` **comment**(): `string`

**`inheritdoc`**

**`remarks`** Implemented via the `ICMT` item.

#### Returns

`string`

#### Overrides

RiffListTag.comment

• `set` **comment**(`value`): `void`

**`inheritdoc`**

**`remarks`** Implemented via the `ICMT` item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Overrides

RiffListTag.comment

___

### composers

• `get` **composers**(): `string`[]

**`inheritdoc`**

**`remarks`** Implemented via the `IWRI` item.

#### Returns

`string`[]

#### Overrides

RiffListTag.composers

• `set` **composers**(`value`): `void`

**`inheritdoc`**

**`remarks`** Implemented via the `IWRI` item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string`[] |

#### Returns

`void`

#### Overrides

RiffListTag.composers

___

### composersSort

• `get` **composersSort**(): `string`[]

Gets the sortable names of the composers of the media represented by the current instance.

**`see`** composers

**`remarks`** This field is typically optional but aids in the sorting of compilations or albums
    with multiple composers.

#### Returns

`string`[]

Sortable names for the composers of the media represented by the current instance
    or an empty array if no value is present.

#### Inherited from

RiffListTag.composersSort

• `set` **composersSort**(`value`): `void`

Sets the sortable names of the composers of the media represented by the current instance.

**`see`** composers

**`remarks`** This field is typically optional but aids in the sorting of compilations or albums
    with multiple composers.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string`[] | Sortable names for the composers of the media represented by the current     instance or an empty array if no value is present. |

#### Returns

`void`

Sortable names for the composers of the media represented by the current instance
    or an empty array if no value is present.

#### Inherited from

RiffListTag.composersSort

___

### conductor

• `get` **conductor**(): `string`

**`inheritdoc`**

**`remarks`** Implemented via the `ICNM` item.

#### Returns

`string`

#### Overrides

RiffListTag.conductor

• `set` **conductor**(`value`): `void`

**`inheritdoc`**

**`remarks`** Implemented via the `ISBJ` item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Overrides

RiffListTag.conductor

___

### copyright

• `get` **copyright**(): `string`

**`inheritdoc`**

**`remarks`** Implemented via the `ICOP` item.

#### Returns

`string`

#### Overrides

RiffListTag.copyright

• `set` **copyright**(`value`): `void`

**`inheritdoc`**

**`remarks`** Implemented via the `ICOP` item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Overrides

RiffListTag.copyright

___

### dateTagged

• `get` **dateTagged**(): `Date`

Gets the date and time at which the tag has been written.

#### Returns

`Date`

Date/time at which the tag has been written, or `undefined` if no value is present

#### Inherited from

RiffListTag.dateTagged

• `set` **dateTagged**(`value`): `void`

Sets the date and time at which the tag has been written.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `Date` | Date/time at which the tag has been written, or `undefined` if no value is     present |

#### Returns

`void`

Date/time at which the tag has been written, or `undefined` if no value is present

#### Inherited from

RiffListTag.dateTagged

___

### description

• `get` **description**(): `string`

**`inheritdoc`**

**`remarks`** Implemented via the `ISBJ` item.

#### Returns

`string`

#### Overrides

RiffListTag.description

• `set` **description**(`value`): `void`

**`inheritdoc`**

**`remarks`** Implemented via the `ISBJ` item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Overrides

RiffListTag.description

___

### disc

• `get` **disc**(): `number`

Gets the number of the disc containing the media represented by the current instance in the
boxed set. For a series, this represents the season number.

**`remarks`** This value should be the same as the number that appears on the disc. For example, if
    the disc is the first of three, the value should be `1`. It should be no more than
    [discCount](InfoTag.md#disccount) if [discCount](InfoTag.md#disccount) is non-zero.

#### Returns

`number`

Number of the disc or season of the media represented by the current instance in a
    boxed set.

#### Inherited from

RiffListTag.disc

• `set` **disc**(`value`): `void`

Sets the number of the disc containing the media represented by the current instance in the
boxed set. For a series, this represents the season number.

**`remarks`** This value should be the same as the number that appears on the disc. For example, if
    the disc is the first of three, the value should be `1`. It should be no more than
    [discCount](InfoTag.md#disccount) if [discCount](InfoTag.md#disccount) is non-zero.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Number of the disc or season of the media represented by the current instance     in a boxed set. |

#### Returns

`void`

Number of the disc or season of the media represented by the current instance in a
    boxed set.

#### Inherited from

RiffListTag.disc

___

### discCount

• `get` **discCount**(): `number`

Gets the number of discs or seasons in the boxed set containing the media represented by the
current instance.

**`remarks`** If non-zero, this should be at least equal to [disc](InfoTag.md#disc). If [disc](InfoTag.md#disc) is zero,
    this value should also be zero.

#### Returns

`number`

Number of discs or seasons in the boxed set containing the media represented by the
    current instance or `0` if not specified.

#### Inherited from

RiffListTag.discCount

• `set` **discCount**(`value`): `void`

Sets the number of discs or seasons in the boxed set containing the media represented by the
current instance.

**`remarks`** If non-zero, this should be at least equal to [disc](InfoTag.md#disc). If [disc](InfoTag.md#disc) is zero,
    this value should also be zero.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Number of discs or seasons in the boxed set containing the media represented by     the current instance or `0` if not specified. |

#### Returns

`void`

Number of discs or seasons in the boxed set containing the media represented by the
    current instance or `0` if not specified.

#### Inherited from

RiffListTag.discCount

___

### firstAlbumArtist

• `get` **firstAlbumArtist**(): `string`

Gets the first value contained in [albumArtists](InfoTag.md#albumartists).

#### Returns

`string`

#### Inherited from

RiffListTag.firstAlbumArtist

___

### firstAlbumArtistSort

• `get` **firstAlbumArtistSort**(): `string`

Gets the first value contained in [albumArtistsSort](InfoTag.md#albumartistssort)

#### Returns

`string`

#### Inherited from

RiffListTag.firstAlbumArtistSort

___

### firstComposer

• `get` **firstComposer**(): `string`

Gets the first value contained in [composers](InfoTag.md#composers)

#### Returns

`string`

#### Inherited from

RiffListTag.firstComposer

___

### firstComposerSort

• `get` **firstComposerSort**(): `string`

Gets the first value contained in [composersSort](InfoTag.md#composerssort)

#### Returns

`string`

#### Inherited from

RiffListTag.firstComposerSort

___

### firstGenre

• `get` **firstGenre**(): `string`

Gets the first value contained in [genres](InfoTag.md#genres)

#### Returns

`string`

#### Inherited from

RiffListTag.firstGenre

___

### firstPerformer

• `get` **firstPerformer**(): `string`

Gets the first value contained in [performers](InfoTag.md#performers)

#### Returns

`string`

#### Inherited from

RiffListTag.firstPerformer

___

### firstPerformerSort

• `get` **firstPerformerSort**(): `string`

Gets the first value contained in [performersSort](InfoTag.md#performerssort)

#### Returns

`string`

#### Inherited from

RiffListTag.firstPerformerSort

___

### genres

• `get` **genres**(): `string`[]

**`inheritdoc`**

**`remarks`** Implemented via the `IGNR` item.

#### Returns

`string`[]

#### Overrides

RiffListTag.genres

• `set` **genres**(`value`): `void`

**`inheritdoc`**

**`remarks`** Implemented via the `IGNR` item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string`[] |

#### Returns

`void`

#### Overrides

RiffListTag.genres

___

### grouping

• `get` **grouping**(): `string`

Gets the grouping on the album which the media in the current instance belongs to.

**`remarks`** This field contains a non-physical group to which the track belongs. In classical
    music this could be a movement. It could also be parts of a series like "Introduction",
    "Closing Remarks", etc.

#### Returns

`string`

Grouping on the album which the media in the current instance belongs to or
    `undefined` if no value is present.

#### Inherited from

RiffListTag.grouping

• `set` **grouping**(`value`): `void`

Sets the grouping on the album which the media in the current instance belongs to.

**`remarks`** This field contains a non-physical group to which the track belongs. In classical
    music this could be a movement. It could also be parts of a series like "Introduction",
    "Closing Remarks", etc.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Grouping on the album which the media in the current instance belongs to or     `undefined` if no value is present. |

#### Returns

`void`

Grouping on the album which the media in the current instance belongs to or
    `undefined` if no value is present.

#### Inherited from

RiffListTag.grouping

___

### initialKey

• `get` **initialKey**(): `string`

Gets the initial key of the track.

#### Returns

`string`

Initial key of the track or `undefined` if no value is set

#### Inherited from

RiffListTag.initialKey

• `set` **initialKey**(`value`): `void`

Sets the initial key of the track.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Initial key of the track or `undefined` if no value is set |

#### Returns

`void`

Initial key of the track or `undefined` if no value is set

#### Inherited from

RiffListTag.initialKey

___

### isCompilation

• `get` **isCompilation**(): `boolean`

Gets whether or not the album described by the current instance is a compilation.

#### Returns

`boolean`

#### Inherited from

RiffListTag.isCompilation

• `set` **isCompilation**(`value`): `void`

Gets whether or not the album described by the current instance is a compilation.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `boolean` | Whether or not the album described by the current instance is a compilation |

#### Returns

`void`

#### Inherited from

RiffListTag.isCompilation

___

### isEmpty

• `get` **isEmpty**(): `boolean`

**`inheritdoc`**

#### Returns

`boolean`

#### Inherited from

RiffListTag.isEmpty

___

### isrc

• `get` **isrc**(): `string`

Gets the ISRC (International Standard Recording Code) of the track.

#### Returns

`string`

the ISRC of the track or `undefined` if no value is set

#### Inherited from

RiffListTag.isrc

• `set` **isrc**(`value`): `void`

Sets the ISRC (International Standard Recording Code) of the track.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | the ISRC of the track or `undefined` if no value is set |

#### Returns

`void`

the ISRC of the track or `undefined` if no value is set

#### Inherited from

RiffListTag.isrc

___

### joinedAlbumArtists

• `get` **joinedAlbumArtists**(): `string`

Gets a semicolon and space separated string containing the values in [albumArtists](InfoTag.md#albumartists)

#### Returns

`string`

#### Inherited from

RiffListTag.joinedAlbumArtists

___

### joinedComposers

• `get` **joinedComposers**(): `string`

Gets a semicolon and space separated string containing the values in [composers](InfoTag.md#composers)

#### Returns

`string`

#### Inherited from

RiffListTag.joinedComposers

___

### joinedGenres

• `get` **joinedGenres**(): `string`

Gets a semicolon and space separated string containing the values in [genres](InfoTag.md#genres)

#### Returns

`string`

#### Inherited from

RiffListTag.joinedGenres

___

### joinedPerformers

• `get` **joinedPerformers**(): `string`

Gets a semicolon and space separated string containing the values in [performers](InfoTag.md#performers)

#### Returns

`string`

#### Inherited from

RiffListTag.joinedPerformers

___

### joinedPerformersSort

• `get` **joinedPerformersSort**(): `string`

Gets a semicolon and space separated string containing the values in [performersSort](InfoTag.md#performerssort)

#### Returns

`string`

#### Inherited from

RiffListTag.joinedPerformersSort

___

### list

• `get` **list**(): [`RiffList`](RiffList.md)

Gets the [RiffList](RiffList.md) that backs the data for this tag.

**`remarks`** Tags based on RiffLists are only supposed to support certain fields. Modify at your
    own risk.

#### Returns

[`RiffList`](RiffList.md)

#### Inherited from

RiffListTag.list

___

### lyrics

• `get` **lyrics**(): `string`

Gets the lyrics or script of the media represented by the current instance.

**`remarks`** This field contains a plain text representation of the lyrics or scripts with line
    breaks and whitespace being the only formatting marks.
    Some formats support more advanced lyrics, like synchronized lyrics, but those must be
    accessed using format-specific implementations.

#### Returns

`string`

Lyrics or script of the media represented by the current instance or `undefined` if
    no value is present

#### Inherited from

RiffListTag.lyrics

• `set` **lyrics**(`value`): `void`

Sets the lyrics or script of the media represented by the current instance.

**`remarks`** This field contains a plain text representation of the lyrics or scripts with line
    breaks and whitespace being the only formatting marks.
    Some formats support more advanced lyrics, like synchronized lyrics, but those must be
    accessed using format-specific implementations.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Lyrics or script of the media represented by the current instance or     `undefined` if no value is present |

#### Returns

`void`

Lyrics or script of the media represented by the current instance or `undefined` if
    no value is present

#### Inherited from

RiffListTag.lyrics

___

### musicBrainzArtistId

• `get` **musicBrainzArtistId**(): `string`

Gets the MusicBrainz artist ID of the media represented by the current instance.

**`remarks`** This field represents the MusicBrainz ArtistID, and is used to uniquely identify a
    particular artist of the track.

#### Returns

`string`

MusicBrainz ArtistID of the media represented by the current instance or
    `undefined` if no value is present

#### Inherited from

RiffListTag.musicBrainzArtistId

• `set` **musicBrainzArtistId**(`value`): `void`

Sets the MusicBrainz artist ID of the media represented by the current instance.

**`remarks`** This field represents the MusicBrainz ArtistID, and is used to uniquely identify a
    particular artist of the track.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | MusicBrainz ArtistID of the media represented by the current instance or     `undefined` if no value is present |

#### Returns

`void`

MusicBrainz ArtistID of the media represented by the current instance or
    `undefined` if no value is present

#### Inherited from

RiffListTag.musicBrainzArtistId

___

### musicBrainzDiscId

• `get` **musicBrainzDiscId**(): `string`

Gets the MusicBrainz disc ID of the media represented by the current instance.

**`remarks`** This field represents the MusicBrainz DiscID and is used to uniquely identify the
    particular released media associated with this track.

#### Returns

`string`

MusicBrainz DiscID of the media represented by the current instance or `undefined`
    if no value is present

#### Inherited from

RiffListTag.musicBrainzDiscId

• `set` **musicBrainzDiscId**(`value`): `void`

Sets the MusicBrainz disc ID of the media represented by the current instance.

**`remarks`** This field represents the MusicBrainz DiscID and is used to uniquely identify the
    particular released media associated with this track.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | MusicBrainz DiscID of the media represented by the current instance or     `undefined` if no value is present |

#### Returns

`void`

MusicBrainz DiscID of the media represented by the current instance or `undefined`
    if no value is present

#### Inherited from

RiffListTag.musicBrainzDiscId

___

### musicBrainzReleaseArtistId

• `get` **musicBrainzReleaseArtistId**(): `string`

Gets the MusicBrainz release artist ID of the media represented by the current instance.

**`remarks`** This field represents the MusicBrainz ReleaseArtistID, and is used to uniquely
    identify a particular album artist credited with the album.

#### Returns

`string`

MusicBrainz ReleaseArtistID of the media represented by the current instance or
    `undefined` if no value is present

#### Inherited from

RiffListTag.musicBrainzReleaseArtistId

• `set` **musicBrainzReleaseArtistId**(`value`): `void`

Sets the MusicBrainz release artist ID of the media represented by the current instance.

**`remarks`** This field represents the MusicBrainz ReleaseArtistID, and is used to uniquely
    identify a particular album artist credited with the album.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | MusicBrainz ReleaseArtistID of the media represented by the current instance or     `undefined` if no value is present |

#### Returns

`void`

MusicBrainz ReleaseArtistID of the media represented by the current instance or
    `undefined` if no value is present

#### Inherited from

RiffListTag.musicBrainzReleaseArtistId

___

### musicBrainzReleaseCountry

• `get` **musicBrainzReleaseCountry**(): `string`

Gets the MusicBrainz release country of the media represented by the current instance.

**`remarks`** This field represents the MusicBrainz ReleaseCountry which describes the country in
    which an album was released. Note that the release country of an album is not
    necessarily the country in which it was produced. The label itself will typically be
    more relevant. Eg, a release on "Foo Records UK" that has "Made in Austria" printed on
    it will likely be a UK release.

#### Returns

`string`

MusicBrainz ReleaseCountry of the media represented by the current instance or
    `undefined` if no value is present

#### Inherited from

RiffListTag.musicBrainzReleaseCountry

• `set` **musicBrainzReleaseCountry**(`value`): `void`

Sets the MusicBrainz release country of the media represented by the current instance.

**`remarks`** This field represents the MusicBrainz ReleaseCountry which describes the country in
    which an album was released. Note that the release country of an album is not
    necessarily the country in which it was produced. The label itself will typically be
    more relevant. Eg, a release on "Foo Records UK" that has "Made in Austria" printed on
    it will likely be a UK release.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | MusicBrainz ReleaseCountry of the media represented by the current instance or     `undefined` if no value is present |

#### Returns

`void`

MusicBrainz ReleaseCountry of the media represented by the current instance or
    `undefined` if no value is present

#### Inherited from

RiffListTag.musicBrainzReleaseCountry

___

### musicBrainzReleaseGroupId

• `get` **musicBrainzReleaseGroupId**(): `string`

Gets the MusicBrainz release group ID of the media represented by the current instance.

**`remarks`** This field represents the MusicBrainz ReleaseGroupID and is used to uniquely identify
    a particular release group to which this track belongs.

#### Returns

`string`

MusicBrainz ReleaseGroupID of the media represented by the current instance or
    `undefined` if no value is present

#### Inherited from

RiffListTag.musicBrainzReleaseGroupId

• `set` **musicBrainzReleaseGroupId**(`value`): `void`

Sets the MusicBrainz release group ID of the media represented by the current instance.

**`remarks`** This field represents the MusicBrainz ReleaseGroupID and is used to uniquely identify
    a particular release group to which this track belongs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | MusicBrainz ReleaseGroupID of the media represented by the current instance or     `undefined` if no value is present |

#### Returns

`void`

MusicBrainz ReleaseGroupID of the media represented by the current instance or
    `undefined` if no value is present

#### Inherited from

RiffListTag.musicBrainzReleaseGroupId

___

### musicBrainzReleaseId

• `get` **musicBrainzReleaseId**(): `string`

Gets the MusicBrainz release ID of the media represented by the current instance.

**`remarks`** This field represents the MusicBrains ReleaseID and is used to uniquely identify a
    particular release to which this track belongs.

#### Returns

`string`

MusicBrainz ReleaseID of the media represented by the current instance or
    `undefined` if no value is present

#### Inherited from

RiffListTag.musicBrainzReleaseId

• `set` **musicBrainzReleaseId**(`value`): `void`

Sets the MusicBrainz release ID of the media represented by the current instance.

**`remarks`** This field represents the MusicBrains ReleaseID and is used to uniquely identify a
    particular release to which this track belongs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | MusicBrainz ReleaseID of the media represented by the current instance or     `undefined` if no value is present |

#### Returns

`void`

MusicBrainz ReleaseID of the media represented by the current instance or
    `undefined` if no value is present

#### Inherited from

RiffListTag.musicBrainzReleaseId

___

### musicBrainzReleaseStatus

• `get` **musicBrainzReleaseStatus**(): `string`

Gets the MusicBrainz release status of the media represented by the current instance.

**`remarks`** This field represents the MusicBrainz ReleaseStatus used to describe how 'official' a
    release is. Common statuses are: `Official`, `Promotion`, `Bootleg`, `Pseudo-release`.

#### Returns

`string`

MusicBrainz ReleaseStatus of the media represented by the current instance or
    `undefined` if no value is present

#### Inherited from

RiffListTag.musicBrainzReleaseStatus

• `set` **musicBrainzReleaseStatus**(`value`): `void`

Sets the MusicBrainz release status of the media represented by the current instance.

**`remarks`** This field represents the MusicBrainz ReleaseStatus used to describe how 'official' a
    release is. Common statuses are: `Official`, `Promotion`, `Bootleg`, `Pseudo-release`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | MusicBrainz ReleaseStatus of the media represented by the current instance or     `undefined` if no value is present |

#### Returns

`void`

MusicBrainz ReleaseStatus of the media represented by the current instance or
    `undefined` if no value is present

#### Inherited from

RiffListTag.musicBrainzReleaseStatus

___

### musicBrainzReleaseType

• `get` **musicBrainzReleaseType**(): `string`

Gets the MusicBrainz release type of the media represented by the current instance.

**`remarks`** This field represents the MusicBrainz ReleaseType that describes what kind of release
    a release is. Common types are: `Single`, `Album`, `EP`, `Compilation`, `Soundtrack,
    `SpokenWord`, `Interview`, `Audiobook`, `Live`, `Remix`, and `Other`. Careful thought
    must be given when using this field to decide if a particular track "is a compilation".

#### Returns

`string`

MusicBrainz ReleaseType of the media represented by the current instance or
    `undefined` if no value is present

#### Inherited from

RiffListTag.musicBrainzReleaseType

• `set` **musicBrainzReleaseType**(`value`): `void`

Sets the MusicBrainz release type of the media represented by the current instance.

**`remarks`** This field represents the MusicBrainz ReleaseType that describes what kind of release
    a release is. Common types are: `Single`, `Album`, `EP`, `Compilation`, `Soundtrack,
    `SpokenWord`, `Interview`, `Audiobook`, `Live`, `Remix`, and `Other`. Careful thought
    must be given when using this field to decide if a particular track "is a compilation".

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | MusicBrainz ReleaseType of the media represented by the current instance or     `undefined` if no value is present |

#### Returns

`void`

MusicBrainz ReleaseType of the media represented by the current instance or
    `undefined` if no value is present

#### Inherited from

RiffListTag.musicBrainzReleaseType

___

### musicBrainzTrackId

• `get` **musicBrainzTrackId**(): `string`

Gets the MusicBrainz track ID of the media represented by the media represented by the
current instance.

**`remarks`** This field represents the MusicBrainz TrackID and is used to uniquely identify a
    particular track.

#### Returns

`string`

MusicBrainz TrackID of the media represented by the current instance or `undefined`
    if no value is present

#### Inherited from

RiffListTag.musicBrainzTrackId

• `set` **musicBrainzTrackId**(`value`): `void`

Sets the MusicBrainz track ID of the media represented by the media represented by the
current instance.

**`remarks`** This field represents the MusicBrainz TrackID and is used to uniquely identify a
    particular track.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | MusicBrainz TrackID of the media represented by the current instance or     `undefined` if no value is present |

#### Returns

`void`

MusicBrainz TrackID of the media represented by the current instance or `undefined`
    if no value is present

#### Inherited from

RiffListTag.musicBrainzTrackId

___

### musicIpId

• `get` **musicIpId**(): `string`

Gets the MusicIP PUID of the media represented by the current instance.

**`remarks`** This field represents the MusicIP PUID, an acoustic fingerprint identifier. It
    identifies wht this track "sounds like".

#### Returns

`string`

MusicIP PUID of the media represented by the current instance or `undefined` if no
    value is present

#### Inherited from

RiffListTag.musicIpId

• `set` **musicIpId**(`value`): `void`

Sets the MusicIP PUID of the media represented by the current instance.

**`remarks`** This field represents the MusicIP PUID, an acoustic fingerprint identifier. It
    identifies wht this track "sounds like".

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | MusicIP PUID of the media represented by the current instance or `undefined`     if no value is present |

#### Returns

`void`

MusicIP PUID of the media represented by the current instance or `undefined` if no
    value is present

#### Inherited from

RiffListTag.musicIpId

___

### performers

• `get` **performers**(): `string`[]

**`inheritdoc`**

**`remarks`** Implemented via the `ISTR` item.

#### Returns

`string`[]

#### Overrides

RiffListTag.performers

• `set` **performers**(`value`): `void`

**`inheritdoc`**

**`remarks`** Implemented via the `ISTR` item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string`[] |

#### Returns

`void`

#### Overrides

RiffListTag.performers

___

### performersRole

• `get` **performersRole**(): `string`[]

Gets the characters portrayed by an actor for a video or instruments played by a musician
for music. This must match the [performers](InfoTag.md#performers) array (for each person, correspond one/more
role). Several roles for the same artist/actor can be separated with semicolons. For
example: "Bass; Backing Vocals; Vibraphone".

**`remarks`** It is highly important to match each role to the performers. This means that an entry
    in the [performersRole](InfoTag.md#performersrole) array is `undefined` to maintain the relationship between
    `performers[i]` and `performersRole[i]`.

#### Returns

`string`[]

Array containing the roles played by the performers in the media described by the
    current instance, or an empty array if no value is present.

#### Inherited from

RiffListTag.performersRole

• `set` **performersRole**(`value`): `void`

Sets the characters portrayed by an actor for a video or instruments played by a musician
for music. This must match the [performers](InfoTag.md#performers) array (for each person, correspond one/more
role). Several roles for the same artist/actor can be separated with semicolons. For
example: "Bass; Backing Vocals; Vibraphone".

**`remarks`** It is highly important to match each role to the performers. This means that an entry
    in the [performersRole](InfoTag.md#performersrole) array is `undefined` to maintain the relationship between
    `performers[i]` and `performersRole[i]`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string`[] | Array containing the roles played by the performers in the media described by     the current instance, or an empty array if no value is present. |

#### Returns

`void`

Array containing the roles played by the performers in the media described by the
    current instance, or an empty array if no value is present.

#### Inherited from

RiffListTag.performersRole

___

### performersSort

• `get` **performersSort**(): `string`[]

Gets the sortable names of the performers or artists who performed in the media described by
the current instance.

**`remarks`** This is used to provide more control over how the media is sorted. Typical uses are to
    skip articles or sort by last name. For example, "The Pillows" might be sorted as
    "Pillows, The".

**`see`** performers

#### Returns

`string`[]

Sortable names for the performers who performed in the media described by the
    current instance, or an empty array if no value is present.

#### Inherited from

RiffListTag.performersSort

• `set` **performersSort**(`value`): `void`

Gets the sortable names of the performers or artists who performed in the media described by
the current instance.

**`remarks`** This is used to provide more control over how the media is sorted. Typical uses are to
    skip articles or sort by last name. For example, "The Pillows" might be sorted as
    "Pillows, The".

**`see`** performers

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string`[] | Sortable names for the performers who performed in the media described by the     current instance, or an empty array if no value is present. |

#### Returns

`void`

Sortable names for the performers who performed in the media described by the
    current instance, or an empty array if no value is present.

#### Inherited from

RiffListTag.performersSort

___

### pictures

• `get` **pictures**(): [`IPicture`](../interfaces/IPicture.md)[]

Gets a collection of pictures associated with the media represented by the current instance.

**`remarks`** Typically, this value is used to store an album cover or icon to use for the file, but
    it is capable of holding any type of image or file, including pictures of the band, the
    recording studio, the concert, etc.

#### Returns

[`IPicture`](../interfaces/IPicture.md)[]

Array containing a collection of pictures associated with the media represented by
    the current instance or an empty array if no pictures are present.

#### Inherited from

RiffListTag.pictures

• `set` **pictures**(`value`): `void`

Sets a collection of pictures associated with the media represented by the current instance.

**`remarks`** Typically, this value is used to store an album cover or icon to use for the file, but
    it is capable of holding any type of image or file, including pictures of the band, the
    recording studio, the concert, etc.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`IPicture`](../interfaces/IPicture.md)[] | Array containing a collection of pictures associated with the media represented by     the current instance or an empty array if no pictures are present. |

#### Returns

`void`

Array containing a collection of pictures associated with the media represented by
    the current instance or an empty array if no pictures are present.

#### Inherited from

RiffListTag.pictures

___

### publisher

• `get` **publisher**(): `string`

Gets the publisher of the track.

#### Returns

`string`

Publisher of the track or `undefined` if no value is set

#### Inherited from

RiffListTag.publisher

• `set` **publisher**(`value`): `void`

Sets the publisher of the track.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Publisher of the track or `undefined` if no value is set |

#### Returns

`void`

Publisher of the track or `undefined` if no value is set

#### Inherited from

RiffListTag.publisher

___

### remixedBy

• `get` **remixedBy**(): `string`

Gets the remixer of the track.

#### Returns

`string`

Remixer of the track or `undefined` if no value is set

#### Inherited from

RiffListTag.remixedBy

• `set` **remixedBy**(`value`): `void`

Sets the remixer of the track.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Remixer of the track or `undefined` if no value is set |

#### Returns

`void`

Remixer of the track or `undefined` if no value is set

#### Inherited from

RiffListTag.remixedBy

___

### replayGainAlbumGain

• `get` **replayGainAlbumGain**(): `number`

Gets the ReplayGain album gain in dB.

#### Returns

`number`

Album gain as per the ReplayGain specifications, in dB, or `NaN` if no value is set

#### Inherited from

RiffListTag.replayGainAlbumGain

• `set` **replayGainAlbumGain**(`value`): `void`

Sets the ReplayGain album gain in dB.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Album gain as per the ReplayGain specifications, in dB, or `NaN` if no value is     set |

#### Returns

`void`

Album gain as per the ReplayGain specifications, in dB, or `NaN` if no value is set

#### Inherited from

RiffListTag.replayGainAlbumGain

___

### replayGainAlbumPeak

• `get` **replayGainAlbumPeak**(): `number`

Gets the ReplayGain album peak sample.

#### Returns

`number`

Album peak as per the ReplayGain specifications, or `NaN` if no value is set

#### Inherited from

RiffListTag.replayGainAlbumPeak

• `set` **replayGainAlbumPeak**(`value`): `void`

Sets the ReplayGain album peak sample.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Album peak as per the ReplayGain specifications, or `NaN` if no value is set |

#### Returns

`void`

Album peak as per the ReplayGain specifications, or `NaN` if no value is set

#### Inherited from

RiffListTag.replayGainAlbumPeak

___

### replayGainTrackGain

• `get` **replayGainTrackGain**(): `number`

Gets the ReplayGain track gain in dB.

#### Returns

`number`

Track gain as per ReplayGain specifications, in dB, or `NaN` if no value is set

#### Inherited from

RiffListTag.replayGainTrackGain

• `set` **replayGainTrackGain**(`value`): `void`

Sets the ReplayGain track gain in dB.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Track gain as per ReplayGain specifications, in dB, or `NaN` if no value is set |

#### Returns

`void`

Track gain as per ReplayGain specifications, in dB, or `NaN` if no value is set

#### Inherited from

RiffListTag.replayGainTrackGain

___

### replayGainTrackPeak

• `get` **replayGainTrackPeak**(): `number`

Gets the ReplayGain track peak sample.

#### Returns

`number`

Track peak as per the ReplayGain specifications, or `NaN` if no value is set

#### Inherited from

RiffListTag.replayGainTrackPeak

• `set` **replayGainTrackPeak**(`value`): `void`

Sets the ReplayGain track peak sample.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Track peak as per the ReplayGain specifications, or `NaN` if no value is set |

#### Returns

`void`

Track peak as per the ReplayGain specifications, or `NaN` if no value is set

#### Inherited from

RiffListTag.replayGainTrackPeak

___

### sizeOnDisk

• `get` **sizeOnDisk**(): `number`

**`inheritdoc`**

#### Returns

`number`

#### Inherited from

RiffListTag.sizeOnDisk

___

### stringType

• `get` **stringType**(): [`StringType`](../enums/StringType.md)

Gets the type of string used for parsing and rendering the contents of this tag.

#### Returns

[`StringType`](../enums/StringType.md)

#### Inherited from

RiffListTag.stringType

• `set` **stringType**(`value`): `void`

Sets the type of string used for parsing and rendering the contents of this tag.

**`remarks`** The value must be `StringType.Latin1` or `StringType.UTF8`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`StringType`](../enums/StringType.md) |

#### Returns

`void`

#### Inherited from

RiffListTag.stringType

___

### subtitle

• `get` **subtitle**(): `string`

Gets a description, one-line. It represents the tagline of the vide/music.

**`remarks`** This field gives a nice/short precision to the title, which is typically below the
    title on the front cover of the media. For example for "Ocean's 13", this would be
    "Revenge is a funny thing".

#### Returns

`string`

Subtitle of the media represented by the current instance or `undefined` if no
    value is present

#### Inherited from

RiffListTag.subtitle

• `set` **subtitle**(`value`): `void`

Sets a description, one-line. It represents the tagline of the vide/music.

**`remarks`** This field gives a nice/short precision to the title, which is typically below the
    title on the front cover of the media. For example for "Ocean's 13", this would be
    "Revenge is a funny thing".

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Subtitle of the media represented by the current instance or `undefined` if no     value is present |

#### Returns

`void`

Subtitle of the media represented by the current instance or `undefined` if no
    value is present

#### Inherited from

RiffListTag.subtitle

___

### tagTypes

• `get` **tagTypes**(): [`TagTypes`](../enums/TagTypes.md)

**`inheritdoc`**

#### Returns

[`TagTypes`](../enums/TagTypes.md)

#### Overrides

RiffListTag.tagTypes

___

### title

• `get` **title**(): `string`

**`inheritdoc`**

**`remarks`** Implemented via the `INAM` item.

#### Returns

`string`

#### Overrides

RiffListTag.title

• `set` **title**(`value`): `void`

**`inheritdoc`**

**`remarks`** Implemented via the `INAM` item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Overrides

RiffListTag.title

___

### titleSort

• `get` **titleSort**(): `string`

Gets the sortable name for the title of the media described by the current instance.

**`remarks`** Possibly used to sort compilations or episodic content.

#### Returns

`string`

Sortable name of the media described by the current instance or `undefined` if no
    value is present

#### Inherited from

RiffListTag.titleSort

• `set` **titleSort**(`value`): `void`

Sets the sortable name for the title of the media described by the current instance.

**`remarks`** Possibly used to sort compilations or episodic content.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Sortable name of the media described by the current instance or `undefined` if     no value is present |

#### Returns

`void`

Sortable name of the media described by the current instance or `undefined` if no
    value is present

#### Inherited from

RiffListTag.titleSort

___

### track

• `get` **track**(): `number`

**`inheritdoc`**

**`remarks`** Implemented via the `IPRT` item.

#### Returns

`number`

#### Overrides

RiffListTag.track

• `set` **track**(`value`): `void`

**`inheritdoc`**

**`remarks`** Implemented via the `IPRT` item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Overrides

RiffListTag.track

___

### trackCount

• `get` **trackCount**(): `number`

**`inheritdoc`**

**`remarks`** Implemented via the `IFRM` item.

#### Returns

`number`

#### Overrides

RiffListTag.trackCount

• `set` **trackCount**(`value`): `void`

**`inheritdoc`**

**`remarks`** Implemented via the `IFRM` item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Overrides

RiffListTag.trackCount

___

### year

• `get` **year**(): `number`

**`inheritdoc`**

**`remarks`** Implemented via the `ICRD` item.

#### Returns

`number`

#### Overrides

RiffListTag.year

• `set` **year**(`value`): `void`

**`inheritdoc`**

**`remarks`** Implemented via the `ICRD` item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Overrides

RiffListTag.year

## Methods

### clear

▸ **clear**(): `void`

Clears all values stored in the current instance.

**`remarks`** The clearing procedure is format specific and should clear all values.

#### Returns

`void`

#### Inherited from

[RiffListTag](RiffListTag.md).[clear](RiffListTag.md#clear)

___

### copyTo

▸ **copyTo**(`target`, `overwrite`): `void`

Copies the values from the current instance to another [Tag](Tag.md), optionally overwriting
    existing values.

**`remarks`** This method only copies the most basic values when copying between different tag
    formats. However, if `target` is of the same type as the current instance,
    more advanced copying may be done. For example if both `this` and `target` are
    [Id3v2Tag](Id3v2Tag.md), all frames will be copied to the target.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | [`Tag`](Tag.md) | Target tag to copy values to |
| `overwrite` | `boolean` | Whether or not to copy values over existing ones |

#### Returns

`void`

#### Inherited from

[RiffListTag](RiffListTag.md).[copyTo](RiffListTag.md#copyto)

___

### getFirstValueAsString

▸ `Protected` **getFirstValueAsString**(`id`): `string`

Gets the first non-falsy string for the specified ID. If the item is not found, `undefined`
is returned.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | ID of the item to lookup in the list. |

#### Returns

`string`

#### Inherited from

[RiffListTag](RiffListTag.md).[getFirstValueAsString](RiffListTag.md#getfirstvalueasstring)

___

### getValueAsUint

▸ **getValueAsUint**(`id`): `number`

Gets the value for a specified item in the current instance as an unsigned integer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | ID of the item for which to get the value |

#### Returns

`number`

#### Inherited from

[RiffListTag](RiffListTag.md).[getValueAsUint](RiffListTag.md#getvalueasuint)

___

### getValues

▸ **getValues**(`id`): [`ByteVector`](ByteVector.md)[]

Gets the values for a specified item in the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | ID of the item of which to get the values |

#### Returns

[`ByteVector`](ByteVector.md)[]

#### Inherited from

[RiffListTag](RiffListTag.md).[getValues](RiffListTag.md#getvalues)

___

### getValuesAsStrings

▸ **getValuesAsStrings**(`id`): `string`[]

Gets the values for a specified item in the current instance as strings.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | ID of the item of which to get the values |

#### Returns

`string`[]

#### Inherited from

[RiffListTag](RiffListTag.md).[getValuesAsStrings](RiffListTag.md#getvaluesasstrings)

___

### removeValue

▸ **removeValue**(`id`): `void`

Removes the item with the specified ID from the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | ID of the item to remove |

#### Returns

`void`

#### Inherited from

[RiffListTag](RiffListTag.md).[removeValue](RiffListTag.md#removevalue)

___

### render

▸ **render**(): [`ByteVector`](ByteVector.md)

Renders the current instance, including list header and padding bytes, ready to be written
to a file.

#### Returns

[`ByteVector`](ByteVector.md)

#### Inherited from

[RiffListTag](RiffListTag.md).[render](RiffListTag.md#render)

___

### setInfoTag

▸ **setInfoTag**(): `void`

Set the tags that represent the tagger software (node-taglib-sharp) itself.

**`remarks`** This is typically a method to call just before saving a tag.

#### Returns

`void`

#### Inherited from

[RiffListTag](RiffListTag.md).[setInfoTag](RiffListTag.md#setinfotag)

___

### setValueFromUint

▸ **setValueFromUint**(`id`, `value`): `void`

Sets the value for a specified item in the current instance using an unsigned integer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | ID of the item to set |
| `value` | `number` | Value to store in the specified item, must be an unsigned 32-bit integer |

#### Returns

`void`

#### Inherited from

[RiffListTag](RiffListTag.md).[setValueFromUint](RiffListTag.md#setvaluefromuint)

___

### setValues

▸ **setValues**(`id`, `values`): `void`

Sets the value for a specified item in the current instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | ID of the item to set |
| `values` | [`ByteVector`](ByteVector.md)[] | Values to store in the specified item |

#### Returns

`void`

#### Inherited from

[RiffListTag](RiffListTag.md).[setValues](RiffListTag.md#setvalues)

___

### setValuesFromStrings

▸ **setValuesFromStrings**(`id`, `values`): `void`

Sets the value for a specified item in the current instance using a list of strings.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | ID of the item to set |
| `values` | `string`[] | Values to store in the specified item |

#### Returns

`void`

#### Inherited from

[RiffListTag](RiffListTag.md).[setValuesFromStrings](RiffListTag.md#setvaluesfromstrings)

___

### firstInGroup

▸ `Static` `Protected` **firstInGroup**(`group`): `string`

Gets the first string in an array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `group` | `string`[] | Array of strings to get the first string from. |

#### Returns

`string`

First string contained in `group` or `undefined` if the array is
    `undefined` or empty

#### Inherited from

[RiffListTag](RiffListTag.md).[firstInGroup](RiffListTag.md#firstingroup)

___

### fromEmpty

▸ `Static` **fromEmpty**(): [`InfoTag`](InfoTag.md)

Constructs and initializes a new, empty instance.

#### Returns

[`InfoTag`](InfoTag.md)

___

### fromList

▸ `Static` **fromList**(`list`): [`InfoTag`](InfoTag.md)

Constructs and initializes a new instance by reading the contents of a raw RIFF list stored
a file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `list` | [`RiffList`](RiffList.md) | List that contains the contents of the tag |

#### Returns

[`InfoTag`](InfoTag.md)

___

### isFalsyOrLikeEmpty

▸ `Static` `Protected` **isFalsyOrLikeEmpty**(`value`): `boolean`

Checks if a value is falsy or empty.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` \| `string`[] | Object to check |

#### Returns

`boolean`

If `value` is a string, `true` is returned if the value is falsy or all
    whitespace, `false` is returned otherwise. If `value` is an array of strings,
    the array must be falsy or all elements must be falsy or whitespace to return `true`.

#### Inherited from

[RiffListTag](RiffListTag.md).[isFalsyOrLikeEmpty](RiffListTag.md#isfalsyorlikeempty)

___

### joinGroup

▸ `Static` `Protected` **joinGroup**(`group`): `string`

Joins an array of string into a single, semicolon and space separated string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `group` | `string`[] | Array of string to join |

#### Returns

`string`

A semicolon and space separated string containing the values from `group`
    or undefined if the array is `undefined` or empty.

#### Inherited from

[RiffListTag](RiffListTag.md).[joinGroup](RiffListTag.md#joingroup)

___

### tagTypeFlagsToArray

▸ `Static` **tagTypeFlagsToArray**(`tagTypes`): [`TagTypes`](../enums/TagTypes.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `tagTypes` | [`TagTypes`](../enums/TagTypes.md) |

#### Returns

[`TagTypes`](../enums/TagTypes.md)[]

#### Inherited from

[RiffListTag](RiffListTag.md).[tagTypeFlagsToArray](RiffListTag.md#tagtypeflagstoarray)
