[node-taglib-sharp](../README.md) / [Exports](../modules.md) / InfoTag

# Class: InfoTag

Provides support for reading and writing standard INFO tags.

## Hierarchy

- [`RiffListTag`](rifflisttag.md)

  ↳ **`InfoTag`**

## Table of contents

### Properties

- [listType](infotag.md#listtype)

### Accessors

- [album](infotag.md#album)
- [albumArtists](infotag.md#albumartists)
- [albumArtistsSort](infotag.md#albumartistssort)
- [albumSort](infotag.md#albumsort)
- [amazonId](infotag.md#amazonid)
- [beatsPerMinute](infotag.md#beatsperminute)
- [comment](infotag.md#comment)
- [composers](infotag.md#composers)
- [composersSort](infotag.md#composerssort)
- [conductor](infotag.md#conductor)
- [copyright](infotag.md#copyright)
- [dateTagged](infotag.md#datetagged)
- [description](infotag.md#description)
- [disc](infotag.md#disc)
- [discCount](infotag.md#disccount)
- [firstAlbumArtist](infotag.md#firstalbumartist)
- [firstAlbumArtistSort](infotag.md#firstalbumartistsort)
- [firstComposer](infotag.md#firstcomposer)
- [firstComposerSort](infotag.md#firstcomposersort)
- [firstGenre](infotag.md#firstgenre)
- [firstPerformer](infotag.md#firstperformer)
- [firstPerformerSort](infotag.md#firstperformersort)
- [genres](infotag.md#genres)
- [grouping](infotag.md#grouping)
- [initialKey](infotag.md#initialkey)
- [isEmpty](infotag.md#isempty)
- [isrc](infotag.md#isrc)
- [joinedAlbumArtists](infotag.md#joinedalbumartists)
- [joinedComposers](infotag.md#joinedcomposers)
- [joinedGenres](infotag.md#joinedgenres)
- [joinedPerformers](infotag.md#joinedperformers)
- [joinedPerformersSort](infotag.md#joinedperformerssort)
- [list](infotag.md#list)
- [lyrics](infotag.md#lyrics)
- [musicBrainzArtistId](infotag.md#musicbrainzartistid)
- [musicBrainzDiscId](infotag.md#musicbrainzdiscid)
- [musicBrainzReleaseArtistId](infotag.md#musicbrainzreleaseartistid)
- [musicBrainzReleaseCountry](infotag.md#musicbrainzreleasecountry)
- [musicBrainzReleaseGroupId](infotag.md#musicbrainzreleasegroupid)
- [musicBrainzReleaseId](infotag.md#musicbrainzreleaseid)
- [musicBrainzReleaseStatus](infotag.md#musicbrainzreleasestatus)
- [musicBrainzReleaseType](infotag.md#musicbrainzreleasetype)
- [musicBrainzTrackId](infotag.md#musicbrainztrackid)
- [musicIpId](infotag.md#musicipid)
- [performers](infotag.md#performers)
- [performersRole](infotag.md#performersrole)
- [performersSort](infotag.md#performerssort)
- [pictures](infotag.md#pictures)
- [publisher](infotag.md#publisher)
- [remixedBy](infotag.md#remixedby)
- [replayGainAlbumGain](infotag.md#replaygainalbumgain)
- [replayGainAlbumPeak](infotag.md#replaygainalbumpeak)
- [replayGainTrackGain](infotag.md#replaygaintrackgain)
- [replayGainTrackPeak](infotag.md#replaygaintrackpeak)
- [sizeOnDisk](infotag.md#sizeondisk)
- [stringType](infotag.md#stringtype)
- [subtitle](infotag.md#subtitle)
- [tagTypes](infotag.md#tagtypes)
- [title](infotag.md#title)
- [titleSort](infotag.md#titlesort)
- [track](infotag.md#track)
- [trackCount](infotag.md#trackcount)
- [year](infotag.md#year)

### Methods

- [clear](infotag.md#clear)
- [copyTo](infotag.md#copyto)
- [getFirstValueAsString](infotag.md#getfirstvalueasstring)
- [getValueAsUint](infotag.md#getvalueasuint)
- [getValues](infotag.md#getvalues)
- [getValuesAsStrings](infotag.md#getvaluesasstrings)
- [removeValue](infotag.md#removevalue)
- [render](infotag.md#render)
- [setInfoTag](infotag.md#setinfotag)
- [setValueFromUint](infotag.md#setvaluefromuint)
- [setValues](infotag.md#setvalues)
- [setValuesFromStrings](infotag.md#setvaluesfromstrings)
- [firstInGroup](infotag.md#firstingroup)
- [fromEmpty](infotag.md#fromempty)
- [fromList](infotag.md#fromlist)
- [isFalsyOrLikeEmpty](infotag.md#isfalsyorlikeempty)
- [joinGroup](infotag.md#joingroup)
- [tagTypeFlagsToArray](infotag.md#tagtypeflagstoarray)

## Properties

### listType

▪ `Static` `Readonly` **listType**: ``"INFO"``

Type of the list that contains an info tag.

## Accessors

### album

• `get` **album**(): `string`

**`inheritdoc`**

**`remarks`** Implemented via the `DIRC` item.

#### Returns

`string`

• `set` **album**(`value`): `void`

**`inheritdoc`**

**`remarks`** Implemented via the `DIRC` item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

___

### albumArtists

• `get` **albumArtists**(): `string`[]

**`inheritdoc`**

**`remarks`** Implemented via the `IART` item.

#### Returns

`string`[]

• `set` **albumArtists**(`value`): `void`

**`inheritdoc`**

**`remarks`** Implemented via the `IART` item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string`[] |

#### Returns

`void`

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
    [performers](infotag.md#performers). Where [performers](infotag.md#performers) can be broken into multiple performers, it is
    best to stick to a single album artist. Eg, "Van Buuren, Armin"

#### Returns

`string`[]

Sortable names for the bands/artists are credited with the creation of the entire
    album or collection containing the media described by the current instance, or an empty
    array if no value is present.

• `set` **albumArtistsSort**(`value`): `void`

Sets the sortable names of the bands/artists who are credited with creating the entire
album or collection containing the media described by the current instance.

**`see`** albumArtists

**`remarks`** This is used to provide more control over how the media is sorted. Typical uses are to
    skip articles or sort by last by last name. For example "Ben Folds" might be sorted as
    "Folds, Ben".
    As this value is to be used as a sorting key, it should be used with less variation than
    [performers](infotag.md#performers). Where [performers](infotag.md#performers) can be broken into multiple performers, it is
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

___

### comment

• `get` **comment**(): `string`

**`inheritdoc`**

**`remarks`** Implemented via the `ICMT` item.

#### Returns

`string`

• `set` **comment**(`value`): `void`

**`inheritdoc`**

**`remarks`** Implemented via the `ICMT` item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

___

### composers

• `get` **composers**(): `string`[]

**`inheritdoc`**

**`remarks`** Implemented via the `IWRI` item.

#### Returns

`string`[]

• `set` **composers**(`value`): `void`

**`inheritdoc`**

**`remarks`** Implemented via the `IWRI` item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string`[] |

#### Returns

`void`

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

___

### conductor

• `get` **conductor**(): `string`

**`inheritdoc`**

**`remarks`** Implemented via the `ICNM` item.

#### Returns

`string`

• `set` **conductor**(`value`): `void`

**`inheritdoc`**

**`remarks`** Implemented via the `ISBJ` item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

___

### copyright

• `get` **copyright**(): `string`

**`inheritdoc`**

**`remarks`** Implemented via the `ICOP` item.

#### Returns

`string`

• `set` **copyright**(`value`): `void`

**`inheritdoc`**

**`remarks`** Implemented via the `ICOP` item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

___

### dateTagged

• `get` **dateTagged**(): `Date`

Gets the date and time at which the tag has been written.

#### Returns

`Date`

Date/time at which the tag has been written, or `undefined` if no value is present

• `set` **dateTagged**(`value`): `void`

Sets the date and time at which the tag has been written.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `Date` | Date/time at which the tag has been written, or `undefined` if no value is     present |

#### Returns

`void`

Date/time at which the tag has been written, or `undefined` if no value is present

___

### description

• `get` **description**(): `string`

**`inheritdoc`**

**`remarks`** Implemented via the `ISBJ` item.

#### Returns

`string`

• `set` **description**(`value`): `void`

**`inheritdoc`**

**`remarks`** Implemented via the `ISBJ` item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

___

### disc

• `get` **disc**(): `number`

Gets the number of the disc containing the media represented by the current instance in the
boxed set. For a series, this represents the season number.

**`remarks`** This value should be the same as the number that appears on the disc. For example, if
    the disc is the first of three, the value should be `1`. It should be no more than
    [discCount](infotag.md#disccount) if [discCount](infotag.md#disccount) is non-zero.

#### Returns

`number`

Number of the disc or season of the media represented by the current instance in a
    boxed set.

• `set` **disc**(`value`): `void`

Sets the number of the disc containing the media represented by the current instance in the
boxed set. For a series, this represents the season number.

**`remarks`** This value should be the same as the number that appears on the disc. For example, if
    the disc is the first of three, the value should be `1`. It should be no more than
    [discCount](infotag.md#disccount) if [discCount](infotag.md#disccount) is non-zero.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Number of the disc or season of the media represented by the current instance     in a boxed set. |

#### Returns

`void`

Number of the disc or season of the media represented by the current instance in a
    boxed set.

___

### discCount

• `get` **discCount**(): `number`

Gets the number of discs or seasons in the boxed set containing the media represented by the
current instance.

**`remarks`** If non-zero, this should be at least equal to [disc](infotag.md#disc). If [disc](infotag.md#disc) is zero,
    this value should also be zero.

#### Returns

`number`

Number of discs or seasons in the boxed set containing the media represented by the
    current instance or `0` if not specified.

• `set` **discCount**(`value`): `void`

Sets the number of discs or seasons in the boxed set containing the media represented by the
current instance.

**`remarks`** If non-zero, this should be at least equal to [disc](infotag.md#disc). If [disc](infotag.md#disc) is zero,
    this value should also be zero.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Number of discs or seasons in the boxed set containing the media represented by     the current instance or `0` if not specified. |

#### Returns

`void`

Number of discs or seasons in the boxed set containing the media represented by the
    current instance or `0` if not specified.

___

### firstAlbumArtist

• `get` **firstAlbumArtist**(): `string`

Gets the the first value contained in [albumArtists](infotag.md#albumartists).

#### Returns

`string`

___

### firstAlbumArtistSort

• `get` **firstAlbumArtistSort**(): `string`

Gets the first value contained in [albumArtistsSort](infotag.md#albumartistssort)

#### Returns

`string`

___

### firstComposer

• `get` **firstComposer**(): `string`

Gets the first value contained in [composers](infotag.md#composers)

#### Returns

`string`

___

### firstComposerSort

• `get` **firstComposerSort**(): `string`

Gets the first value contained in [composersSort](infotag.md#composerssort)

#### Returns

`string`

___

### firstGenre

• `get` **firstGenre**(): `string`

Gets the first value contained in [genres](infotag.md#genres)

#### Returns

`string`

___

### firstPerformer

• `get` **firstPerformer**(): `string`

Gets the first value contained in [performers](infotag.md#performers)

#### Returns

`string`

___

### firstPerformerSort

• `get` **firstPerformerSort**(): `string`

Gets the first value contained in [performersSort](infotag.md#performerssort)

#### Returns

`string`

___

### genres

• `get` **genres**(): `string`[]

**`inheritdoc`**

**`remarks`** Implemented via the `IGNR` item.

#### Returns

`string`[]

• `set` **genres**(`value`): `void`

**`inheritdoc`**

**`remarks`** Implemented via the `IGNR` item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string`[] |

#### Returns

`void`

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

___

### initialKey

• `get` **initialKey**(): `string`

Gets the initial key of the track.

#### Returns

`string`

Initial key of the track or `undefined` if no value is set

• `set` **initialKey**(`value`): `void`

Sets the initial key of the track.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Initial key of the track or `undefined` if no value is set |

#### Returns

`void`

Initial key of the track or `undefined` if no value is set

___

### isEmpty

• `get` **isEmpty**(): `boolean`

**`inheritdoc`**

#### Returns

`boolean`

___

### isrc

• `get` **isrc**(): `string`

Gets the ISRC (International Standard Recording Code) of the track.

#### Returns

`string`

the ISRC of the track or `undefined` if no value is set

• `set` **isrc**(`value`): `void`

Sets the ISRC (International Standard Recording Code) of the track.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | the ISRC of the track or `undefined` if no value is set |

#### Returns

`void`

the ISRC of the track or `undefined` if no value is set

___

### joinedAlbumArtists

• `get` **joinedAlbumArtists**(): `string`

Gets a semicolon and space separated string containing the values in [albumArtists](infotag.md#albumartists)

#### Returns

`string`

___

### joinedComposers

• `get` **joinedComposers**(): `string`

Gets a semicolon and space separated string containing the values in [composers](infotag.md#composers)

#### Returns

`string`

___

### joinedGenres

• `get` **joinedGenres**(): `string`

Gets a semicolon and space separated string containing the values in [genres](infotag.md#genres)

#### Returns

`string`

___

### joinedPerformers

• `get` **joinedPerformers**(): `string`

Gets a semicolon and space separated string containing the values in [performers](infotag.md#performers)

#### Returns

`string`

___

### joinedPerformersSort

• `get` **joinedPerformersSort**(): `string`

Gets a semicolon and space separated string containing the values in [performersSort](infotag.md#performerssort)

#### Returns

`string`

___

### list

• `get` **list**(): [`RiffList`](rifflist.md)

Gets the [RiffList](rifflist.md) that backs the data for this tag.

**`remarks`** Tags based on RiffLists are only supposed to support certain fields. Modify at your
    own risk.

#### Returns

[`RiffList`](rifflist.md)

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

___

### performers

• `get` **performers**(): `string`[]

**`inheritdoc`**

**`remarks`** Implemented via the `ISTR` item.

#### Returns

`string`[]

• `set` **performers**(`value`): `void`

**`inheritdoc`**

**`remarks`** Implemented via the `ISTR` item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string`[] |

#### Returns

`void`

___

### performersRole

• `get` **performersRole**(): `string`[]

Gets the characters portrayed by an actor for a video or instruments played by a musician
for music. This must match the [performers](infotag.md#performers) array (for each person, correspond one/more
role). Several roles for the same artist/actor can be separated with semicolons. For
example: "Bass; Backing Vocals; Vibraphone".

**`remarks`** It is highly important to match each role to the performers. This means that an entry
    in the [performersRole](infotag.md#performersrole) array is `undefined` to maintain the relationship between
    `performers[i]` and `performersRole[i]`.

#### Returns

`string`[]

Array containing the roles played by the performers in the media described by the
    current instance, or an empty array if no value is present.

• `set` **performersRole**(`value`): `void`

Sets the characters portrayed by an actor for a video or instruments played by a musician
for music. This must match the [performers](infotag.md#performers) array (for each person, correspond one/more
role). Several roles for the same artist/actor can be separated with semicolons. For
example: "Bass; Backing Vocals; Vibraphone".

**`remarks`** It is highly important to match each role to the performers. This means that an entry
    in the [performersRole](infotag.md#performersrole) array is `undefined` to maintain the relationship between
    `performers[i]` and `performersRole[i]`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string`[] | Array containing the roles played by the performers in the media described by     the current instance, or an empty array if no value is present. |

#### Returns

`void`

Array containing the roles played by the performers in the media described by the
    current instance, or an empty array if no value is present.

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

___

### pictures

• `get` **pictures**(): [`IPicture`](../interfaces/ipicture.md)[]

Gets a collection of pictures associated with the media represented by the current instance.

**`remarks`** Typically, this value is used to store an album cover or icon to use for the file, but
    it is capable of holding any type of image or file, including pictures of the band, the
    recording studio, the concert, etc.

#### Returns

[`IPicture`](../interfaces/ipicture.md)[]

Array containing a collection of pictures associated with the media represented by
    the current instance or an empty array if no pictures are present.

• `set` **pictures**(`value`): `void`

Sets a collection of pictures associated with the media represented by the current instance.

**`remarks`** Typically, this value is used to store an album cover or icon to use for the file, but
    it is capable of holding any type of image or file, including pictures of the band, the
    recording studio, the concert, etc.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`IPicture`](../interfaces/ipicture.md)[] | Array containing a collection of pictures associated with the media represented by     the current instance or an empty array if no pictures are present. |

#### Returns

`void`

Array containing a collection of pictures associated with the media represented by
    the current instance or an empty array if no pictures are present.

___

### publisher

• `get` **publisher**(): `string`

Gets the publisher of the track.

#### Returns

`string`

Publisher of the track or `undefined` if no value is set

• `set` **publisher**(`value`): `void`

Sets the publisher of the track.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Publisher of the track or `undefined` if no value is set |

#### Returns

`void`

Publisher of the track or `undefined` if no value is set

___

### remixedBy

• `get` **remixedBy**(): `string`

Gets the remixer of the track.

#### Returns

`string`

Remixer of the track or `undefined` if no value is set

• `set` **remixedBy**(`value`): `void`

Sets the remixer of the track.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Remixer of the track or `undefined` if no value is set |

#### Returns

`void`

Remixer of the track or `undefined` if no value is set

___

### replayGainAlbumGain

• `get` **replayGainAlbumGain**(): `number`

Gets the ReplayGain album gain in dB.

#### Returns

`number`

Album gain as per the ReplayGain specifications, in dB, or `NaN` if no value is set

• `set` **replayGainAlbumGain**(`value`): `void`

Sets the ReplayGain album gain in dB.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Album gain as per the ReplayGain specifications, in dB, or `NaN` if no value is     set |

#### Returns

`void`

Album gain as per the ReplayGain specifications, in dB, or `NaN` if no value is set

___

### replayGainAlbumPeak

• `get` **replayGainAlbumPeak**(): `number`

Gets the ReplayGain album peak sample.

#### Returns

`number`

Album peak as per the ReplayGain specifications, or `NaN` if no value is set

• `set` **replayGainAlbumPeak**(`value`): `void`

Sets the ReplayGain album peak sample.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Album peak as per the ReplayGain specifications, or `NaN` if no value is set |

#### Returns

`void`

Album peak as per the ReplayGain specifications, or `NaN` if no value is set

___

### replayGainTrackGain

• `get` **replayGainTrackGain**(): `number`

Gets the ReplayGain track gain in dB.

#### Returns

`number`

Track gain as per ReplayGain specifications, in dB, or `NaN` if no value is set

• `set` **replayGainTrackGain**(`value`): `void`

Sets the ReplayGain track gain in dB.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Track gain as per ReplayGain specifications, in dB, or `NaN` if no value is set |

#### Returns

`void`

Track gain as per ReplayGain specifications, in dB, or `NaN` if no value is set

___

### replayGainTrackPeak

• `get` **replayGainTrackPeak**(): `number`

Gets the ReplayGain track peak sample.

#### Returns

`number`

Track peak as per the ReplayGain specifications, or `NaN` if no value is set

• `set` **replayGainTrackPeak**(`value`): `void`

Sets the ReplayGain track peak sample.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Track peak as per the ReplayGain specifications, or `NaN` if no value is set |

#### Returns

`void`

Track peak as per the ReplayGain specifications, or `NaN` if no value is set

___

### sizeOnDisk

• `get` **sizeOnDisk**(): `number`

**`inheritdoc`**

#### Returns

`number`

___

### stringType

• `get` **stringType**(): [`StringType`](../enums/stringtype.md)

Gets the type of string used for parsing and rendering the contents of this tag.

#### Returns

[`StringType`](../enums/stringtype.md)

• `set` **stringType**(`value`): `void`

Sets the type of string used for parsing and rendering the contents of this tag.

**`remarks`** The value must be `StringType.Latin1` or `StringType.UTF8`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`StringType`](../enums/stringtype.md) |

#### Returns

`void`

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

___

### tagTypes

• `get` **tagTypes**(): [`TagTypes`](../enums/tagtypes.md)

**`inheritdoc`**

#### Returns

[`TagTypes`](../enums/tagtypes.md)

___

### title

• `get` **title**(): `string`

**`inheritdoc`**

**`remarks`** Implemented via the `INAM` item.

#### Returns

`string`

• `set` **title**(`value`): `void`

**`inheritdoc`**

**`remarks`** Implemented via the `INAM` item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

___

### titleSort

• `get` **titleSort**(): `string`

Gets the sortable name for the title of the media described by the current instance.

**`remarks`** Possibly used to sort compilations or episodic content.

#### Returns

`string`

Sortable name of the media described by the current instance or `undefined` if no
    value is present

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

___

### track

• `get` **track**(): `number`

**`inheritdoc`**

**`remarks`** Implemented via the `IPRT` item.

#### Returns

`number`

• `set` **track**(`value`): `void`

**`inheritdoc`**

**`remarks`** Implemented via the `IPRT` item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

___

### trackCount

• `get` **trackCount**(): `number`

**`inheritdoc`**

**`remarks`** Implemented via the `IFRM` item.

#### Returns

`number`

• `set` **trackCount**(`value`): `void`

**`inheritdoc`**

**`remarks`** Implemented via the `IFRM` item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

___

### year

• `get` **year**(): `number`

**`inheritdoc`**

**`remarks`** Implemented via the `ICRD` item.

#### Returns

`number`

• `set` **year**(`value`): `void`

**`inheritdoc`**

**`remarks`** Implemented via the `ICRD` item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

## Methods

### clear

▸ **clear**(): `void`

Clears all values stored in the current instance.

**`remarks`** The clearing procedure is format specific and should clear all values.

#### Returns

`void`

#### Inherited from

[RiffListTag](rifflisttag.md).[clear](rifflisttag.md#clear)

___

### copyTo

▸ **copyTo**(`target`, `overwrite`): `void`

Copies the values from the current instance to another [Tag](tag.md), optionally overwriting
    existing values.

**`remarks`** This method only copies the most basic values when copying between different tag
    formats. However, if `target` is of the same type as the current instance,
    more advanced copying may be done. For example if both `this` and `target` are
    [Id3v2Tag](id3v2tag.md), all frames will be copied to the target.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | [`Tag`](tag.md) | Target tag to copy values to |
| `overwrite` | `boolean` | Whether or not to copy values over existing ones |

#### Returns

`void`

#### Inherited from

[RiffListTag](rifflisttag.md).[copyTo](rifflisttag.md#copyto)

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

[RiffListTag](rifflisttag.md).[getFirstValueAsString](rifflisttag.md#getfirstvalueasstring)

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

[RiffListTag](rifflisttag.md).[getValueAsUint](rifflisttag.md#getvalueasuint)

___

### getValues

▸ **getValues**(`id`): [`ByteVector`](bytevector.md)[]

Gets the values for a specified item in the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | ID of the item of which to get the values |

#### Returns

[`ByteVector`](bytevector.md)[]

#### Inherited from

[RiffListTag](rifflisttag.md).[getValues](rifflisttag.md#getvalues)

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

[RiffListTag](rifflisttag.md).[getValuesAsStrings](rifflisttag.md#getvaluesasstrings)

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

[RiffListTag](rifflisttag.md).[removeValue](rifflisttag.md#removevalue)

___

### render

▸ **render**(): [`ByteVector`](bytevector.md)

Renders the current instance, including list header and padding bytes, ready to be written
to a file.

#### Returns

[`ByteVector`](bytevector.md)

#### Inherited from

[RiffListTag](rifflisttag.md).[render](rifflisttag.md#render)

___

### setInfoTag

▸ **setInfoTag**(): `void`

Set the tags that represent the tagger software (node-taglib-sharp) itself.

**`remarks`** This is typically a method to call just before saving a tag.

#### Returns

`void`

#### Inherited from

[RiffListTag](rifflisttag.md).[setInfoTag](rifflisttag.md#setinfotag)

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

[RiffListTag](rifflisttag.md).[setValueFromUint](rifflisttag.md#setvaluefromuint)

___

### setValues

▸ **setValues**(`id`, `values`): `void`

Sets the value for a specified item in the current instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | ID of the item to set |
| `values` | [`ByteVector`](bytevector.md)[] | Values to store in the specified item |

#### Returns

`void`

#### Inherited from

[RiffListTag](rifflisttag.md).[setValues](rifflisttag.md#setvalues)

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

[RiffListTag](rifflisttag.md).[setValuesFromStrings](rifflisttag.md#setvaluesfromstrings)

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

[RiffListTag](rifflisttag.md).[firstInGroup](rifflisttag.md#firstingroup)

___

### fromEmpty

▸ `Static` **fromEmpty**(): [`InfoTag`](infotag.md)

Constructs and initializes a new, empty instance.

#### Returns

[`InfoTag`](infotag.md)

___

### fromList

▸ `Static` **fromList**(`list`): [`InfoTag`](infotag.md)

Constructs and initializes a new instance by reading the contents of a raw RIFF list stored
a file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `list` | [`RiffList`](rifflist.md) | List that contains the contents of the tag |

#### Returns

[`InfoTag`](infotag.md)

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

[RiffListTag](rifflisttag.md).[isFalsyOrLikeEmpty](rifflisttag.md#isfalsyorlikeempty)

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

[RiffListTag](rifflisttag.md).[joinGroup](rifflisttag.md#joingroup)

___

### tagTypeFlagsToArray

▸ `Static` **tagTypeFlagsToArray**(`tagTypes`): [`TagTypes`](../enums/tagtypes.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `tagTypes` | [`TagTypes`](../enums/tagtypes.md) |

#### Returns

[`TagTypes`](../enums/tagtypes.md)[]

#### Inherited from

[RiffListTag](rifflisttag.md).[tagTypeFlagsToArray](rifflisttag.md#tagtypeflagstoarray)
