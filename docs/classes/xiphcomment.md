[node-taglib-sharp](../README.md) / [Exports](../modules.md) / XiphComment

# Class: XiphComment

Provides support for reading and writing Xiph comment-style tags.

**`remarks`** Xiph comment tag properties are stored in "fields" of the form `KEY=value`, where `KEY`
    is the "field name". The field name can be defined multiple times in the tag which means
    each field can have multiple values.

## Hierarchy

- [`Tag`](tag.md)

  ↳ **`XiphComment`**

## Table of contents

### Accessors

- [album](xiphcomment.md#album)
- [albumArtists](xiphcomment.md#albumartists)
- [albumArtistsSort](xiphcomment.md#albumartistssort)
- [albumSort](xiphcomment.md#albumsort)
- [amazonId](xiphcomment.md#amazonid)
- [beatsPerMinute](xiphcomment.md#beatsperminute)
- [comment](xiphcomment.md#comment)
- [composers](xiphcomment.md#composers)
- [composersSort](xiphcomment.md#composerssort)
- [conductor](xiphcomment.md#conductor)
- [copyright](xiphcomment.md#copyright)
- [dateTagged](xiphcomment.md#datetagged)
- [description](xiphcomment.md#description)
- [disc](xiphcomment.md#disc)
- [discCount](xiphcomment.md#disccount)
- [fieldNames](xiphcomment.md#fieldnames)
- [fieldValueCount](xiphcomment.md#fieldvaluecount)
- [firstAlbumArtist](xiphcomment.md#firstalbumartist)
- [firstAlbumArtistSort](xiphcomment.md#firstalbumartistsort)
- [firstComposer](xiphcomment.md#firstcomposer)
- [firstComposerSort](xiphcomment.md#firstcomposersort)
- [firstGenre](xiphcomment.md#firstgenre)
- [firstPerformer](xiphcomment.md#firstperformer)
- [firstPerformerSort](xiphcomment.md#firstperformersort)
- [genres](xiphcomment.md#genres)
- [grouping](xiphcomment.md#grouping)
- [initialKey](xiphcomment.md#initialkey)
- [isCompilation](xiphcomment.md#iscompilation)
- [isEmpty](xiphcomment.md#isempty)
- [isrc](xiphcomment.md#isrc)
- [joinedAlbumArtists](xiphcomment.md#joinedalbumartists)
- [joinedComposers](xiphcomment.md#joinedcomposers)
- [joinedGenres](xiphcomment.md#joinedgenres)
- [joinedPerformers](xiphcomment.md#joinedperformers)
- [joinedPerformersSort](xiphcomment.md#joinedperformerssort)
- [lyrics](xiphcomment.md#lyrics)
- [musicBrainzArtistId](xiphcomment.md#musicbrainzartistid)
- [musicBrainzDiscId](xiphcomment.md#musicbrainzdiscid)
- [musicBrainzReleaseArtistId](xiphcomment.md#musicbrainzreleaseartistid)
- [musicBrainzReleaseCountry](xiphcomment.md#musicbrainzreleasecountry)
- [musicBrainzReleaseGroupId](xiphcomment.md#musicbrainzreleasegroupid)
- [musicBrainzReleaseId](xiphcomment.md#musicbrainzreleaseid)
- [musicBrainzReleaseStatus](xiphcomment.md#musicbrainzreleasestatus)
- [musicBrainzReleaseType](xiphcomment.md#musicbrainzreleasetype)
- [musicBrainzTrackId](xiphcomment.md#musicbrainztrackid)
- [musicIpId](xiphcomment.md#musicipid)
- [performers](xiphcomment.md#performers)
- [performersRole](xiphcomment.md#performersrole)
- [performersSort](xiphcomment.md#performerssort)
- [pictures](xiphcomment.md#pictures)
- [publisher](xiphcomment.md#publisher)
- [remixedBy](xiphcomment.md#remixedby)
- [replayGainAlbumGain](xiphcomment.md#replaygainalbumgain)
- [replayGainAlbumPeak](xiphcomment.md#replaygainalbumpeak)
- [replayGainTrackGain](xiphcomment.md#replaygaintrackgain)
- [replayGainTrackPeak](xiphcomment.md#replaygaintrackpeak)
- [sizeOnDisk](xiphcomment.md#sizeondisk)
- [subtitle](xiphcomment.md#subtitle)
- [tagTypes](xiphcomment.md#tagtypes)
- [title](xiphcomment.md#title)
- [titleSort](xiphcomment.md#titlesort)
- [track](xiphcomment.md#track)
- [trackCount](xiphcomment.md#trackcount)
- [vendorId](xiphcomment.md#vendorid)
- [year](xiphcomment.md#year)

### Methods

- [clear](xiphcomment.md#clear)
- [copyTo](xiphcomment.md#copyto)
- [getField](xiphcomment.md#getfield)
- [getFieldFirstValue](xiphcomment.md#getfieldfirstvalue)
- [removeField](xiphcomment.md#removefield)
- [render](xiphcomment.md#render)
- [setFieldAsStrings](xiphcomment.md#setfieldasstrings)
- [setFieldAsUint](xiphcomment.md#setfieldasuint)
- [setInfoTag](xiphcomment.md#setinfotag)
- [firstInGroup](xiphcomment.md#firstingroup)
- [fromData](xiphcomment.md#fromdata)
- [fromEmpty](xiphcomment.md#fromempty)
- [isFalsyOrLikeEmpty](xiphcomment.md#isfalsyorlikeempty)
- [joinGroup](xiphcomment.md#joingroup)
- [tagTypeFlagsToArray](xiphcomment.md#tagtypeflagstoarray)

## Accessors

### album

• `get` **album**(): `string`

Gets the album of the media represented by the current instance. For video media, this
represents the collection the video belongs to.

**`inheritdoc`** `ALBUM` field

#### Returns

`string`

Album of the media represented by the current instance or `undefined` if no value
    is present

• `set` **album**(`value`): `void`

Gets the album of the media represented by the current instance. For video media, this
represents the collection the video belongs to.

**`inheritdoc`** `ALBUM` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

Album of the media represented by the current instance or `undefined` if no value
    is present

___

### albumArtists

• `get` **albumArtists**(): `string`[]

Gets the band or artist who is credited credited in the creation of the entire album or
collection containing the media described by the current instance.

**`inheritdoc`** `ALBUMARTIST` as per standard, though `ALBUM ARTIST` and `ENSEMBLE` will be
    checked if `ALBUMARTIST` is not set.

#### Returns

`string`[]

Band or artist credited with the creation of the entire album or collection
    containing the media described by the current instance or an empty array if no value is
    present

• `set` **albumArtists**(`value`): `void`

Gets the band or artist who is credited credited in the creation of the entire album or
collection containing the media described by the current instance.

**`inheritdoc`** `ALBUMARTIST`, as per the standard

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string`[] |

#### Returns

`void`

Band or artist credited with the creation of the entire album or collection
    containing the media described by the current instance or an empty array if no value is
    present

___

### albumArtistsSort

• `get` **albumArtistsSort**(): `string`[]

Gets the sortable names of the bands/artists who are credited with creating the entire
album or collection containing the media described by the current instance.

**`inheritdoc`** `ALBUMARTISTSORT` field

#### Returns

`string`[]

Sortable names for the bands/artists are credited with the creation of the entire
    album or collection containing the media described by the current instance, or an empty
    array if no value is present.

• `set` **albumArtistsSort**(`value`): `void`

Gets the sortable names of the bands/artists who are credited with creating the entire
album or collection containing the media described by the current instance.

**`inheritdoc`** `ALBUMARTISTSORT` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string`[] |

#### Returns

`void`

Sortable names for the bands/artists are credited with the creation of the entire
    album or collection containing the media described by the current instance, or an empty
    array if no value is present.

___

### albumSort

• `get` **albumSort**(): `string`

Gets the sortable name of the album title of the media represented by the current instance.

**`inheritdoc`** `ALBUMSORT` field

#### Returns

`string`

Sortable name for the album title of the media or `undefined` if the value is not
    present

• `set` **albumSort**(`value`): `void`

Gets the sortable name of the album title of the media represented by the current instance.

**`inheritdoc`** `ALBUMSORT` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

Sortable name for the album title of the media or `undefined` if the value is not
    present

___

### amazonId

• `get` **amazonId**(): `string`

Gets the Amazon ID of the media represented by the current instance.

**`inheritdoc`** `ASIN` field

#### Returns

`string`

Amazon ID of the media represented by the current instance or `undefined` if no
    value is present

• `set` **amazonId**(`value`): `void`

Gets the Amazon ID of the media represented by the current instance.

**`inheritdoc`** `ASIN` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

Amazon ID of the media represented by the current instance or `undefined` if no
    value is present

___

### beatsPerMinute

• `get` **beatsPerMinute**(): `number`

Gets the number of beats per minute in the audio of the media represented by the current
instance.

**`inheritdoc`** `TEMPO` field preferentially, BPM field is used as a fallback.

**`remarks`** The field that stores the value will be used when setting a BPM in the future. This
    behavior can be controlled via {@link XiphSettings.useTempoToStoreBpm}.

#### Returns

`number`

Beats per minute of the audio in the media represented by the current instance, or
    `0` if not specified

• `set` **beatsPerMinute**(`value`): `void`

Gets the number of beats per minute in the audio of the media represented by the current
instance.

**`inheritdoc`**

**`remarks`** Value is stored via `TEMPO` field if {@link XiphSettings.useTempoToStoreBpm} is
    `true`. Value is stored via `BPM` if {@link XiphSettings.useTempoToStoreBpm} is `false`.
    The other field is removed when stored.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

Beats per minute of the audio in the media represented by the current instance, or
    `0` if not specified

___

### comment

• `get` **comment**(): `string`

Gets a user comment on the media represented by the current instance.

**`inheritdoc`** `COMMENT` field

#### Returns

`string`

User comments on the media represented by the current instance or `undefined` if
    the value is not present

• `set` **comment**(`value`): `void`

Gets a user comment on the media represented by the current instance.

**`inheritdoc`** `COMMENT` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

User comments on the media represented by the current instance or `undefined` if
    the value is not present

___

### composers

• `get` **composers**(): `string`[]

Gets the composers of the media represented by the current instance.

**`inheritdoc`** `COMPOSER` field

#### Returns

`string`[]

Composers of the media represented by the current instance of an empty array if no
    value is present.

• `set` **composers**(`value`): `void`

Gets the composers of the media represented by the current instance.

**`inheritdoc`** `COMPOSER` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string`[] |

#### Returns

`void`

Composers of the media represented by the current instance of an empty array if no
    value is present.

___

### composersSort

• `get` **composersSort**(): `string`[]

Gets the sortable names of the composers of the media represented by the current instance.

**`inheritdoc`** `COMPOSERSORT` field

#### Returns

`string`[]

Sortable names for the composers of the media represented by the current instance
    or an empty array if no value is present.

• `set` **composersSort**(`value`): `void`

Gets the sortable names of the composers of the media represented by the current instance.

**`inheritdoc`** `COMPOSERSORT` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string`[] |

#### Returns

`void`

Sortable names for the composers of the media represented by the current instance
    or an empty array if no value is present.

___

### conductor

• `get` **conductor**(): `string`

Gets the conductor or director of the media represented by the current instance.

**`inheritdoc`** `CONDUCTOR` field

#### Returns

`string`

Conductor or director of the media represented by the current instance or
    `undefined` if no value present.

• `set` **conductor**(`value`): `void`

Gets the conductor or director of the media represented by the current instance.

**`inheritdoc`** `CONDUCTOR` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

Conductor or director of the media represented by the current instance or
    `undefined` if no value present.

___

### copyright

• `get` **copyright**(): `string`

Gets the copyright information for the media represented by the current instance.

**`inheritdoc`** `COPYRIGHT` field

#### Returns

`string`

Copyright information for the media represented by the current instance or
    `undefined` if no value is present.

• `set` **copyright**(`value`): `void`

Gets the copyright information for the media represented by the current instance.

**`inheritdoc`** `GROUPING` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

Copyright information for the media represented by the current instance or
    `undefined` if no value is present.

___

### dateTagged

• `get` **dateTagged**(): `Date`

Gets the date and time at which the tag has been written.

**`inheritdoc`** `DATETAGGED` field

#### Returns

`Date`

Date/time at which the tag has been written, or `undefined` if no value is present

• `set` **dateTagged**(`value`): `void`

Gets the date and time at which the tag has been written.

**`inheritdoc`** `DATETAGGED` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Date` |

#### Returns

`void`

Date/time at which the tag has been written, or `undefined` if no value is present

___

### description

• `get` **description**(): `string`

Gets a short description of the media. For music, this could be the comment that the artist
made of his/her work. For a video, this should be a short summary of the story/plot, but
generally no spoliers. This should give the impression of what to expect in the media.

**`inheritdoc`** `DESCRIPTION` field

#### Returns

`string`

Description of the media represented by the current instance or `undefined` if no
    value is present

• `set` **description**(`value`): `void`

Gets a short description of the media. For music, this could be the comment that the artist
made of his/her work. For a video, this should be a short summary of the story/plot, but
generally no spoliers. This should give the impression of what to expect in the media.

**`inheritdoc`** `DESCRIPTION` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

Description of the media represented by the current instance or `undefined` if no
    value is present

___

### disc

• `get` **disc**(): `number`

Gets the number of the disc containing the media represented by the current instance in the
boxed set. For a series, this represents the season number.

**`inheritdoc`** `DISCNUMBER` field

#### Returns

`number`

Number of the disc or season of the media represented by the current instance in a
    boxed set.

• `set` **disc**(`value`): `void`

Gets the number of the disc containing the media represented by the current instance in the
boxed set. For a series, this represents the season number.

**`inheritdoc`** `DISCNUMBER` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

Number of the disc or season of the media represented by the current instance in a
    boxed set.

___

### discCount

• `get` **discCount**(): `number`

Gets the number of discs or seasons in the boxed set containing the media represented by the
current instance.

**`inheritdoc`** `DISCTOTAL` as per standard, but the denominator of `DISCNUMBER` is also
    used if `DISCTOTAL` is not available.

#### Returns

`number`

Number of discs or seasons in the boxed set containing the media represented by the
    current instance or `0` if not specified.

• `set` **discCount**(`value`): `void`

Gets the number of discs or seasons in the boxed set containing the media represented by the
current instance.

**`inheritdoc`** `DISCTOTAL` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

Number of discs or seasons in the boxed set containing the media represented by the
    current instance or `0` if not specified.

___

### fieldNames

• `get` **fieldNames**(): `string`[]

Gets the names of the fields currently stored in the list of fields, excluding the pictures.

**`remarks`** This getter is useful for iterating over fields defined in this object in
    conjunction with [getField](xiphcomment.md#getfield).

#### Returns

`string`[]

___

### fieldValueCount

• `get` **fieldValueCount**(): `number`

Gets the total number of values contained in the current instance, including the pictures.

#### Returns

`number`

___

### firstAlbumArtist

• `get` **firstAlbumArtist**(): `string`

Gets the the first value contained in [albumArtists](xiphcomment.md#albumartists).

#### Returns

`string`

___

### firstAlbumArtistSort

• `get` **firstAlbumArtistSort**(): `string`

Gets the first value contained in [albumArtistsSort](xiphcomment.md#albumartistssort)

#### Returns

`string`

___

### firstComposer

• `get` **firstComposer**(): `string`

Gets the first value contained in [composers](xiphcomment.md#composers)

#### Returns

`string`

___

### firstComposerSort

• `get` **firstComposerSort**(): `string`

Gets the first value contained in [composersSort](xiphcomment.md#composerssort)

#### Returns

`string`

___

### firstGenre

• `get` **firstGenre**(): `string`

Gets the first value contained in [genres](xiphcomment.md#genres)

#### Returns

`string`

___

### firstPerformer

• `get` **firstPerformer**(): `string`

Gets the first value contained in [performers](xiphcomment.md#performers)

#### Returns

`string`

___

### firstPerformerSort

• `get` **firstPerformerSort**(): `string`

Gets the first value contained in [performersSort](xiphcomment.md#performerssort)

#### Returns

`string`

___

### genres

• `get` **genres**(): `string`[]

Gets the genres of the media represented by the current instance.

**`inheritdoc`** `GENRE` field

#### Returns

`string`[]

Genres of the media represented by the current instance or an empty array if no
    value is present.

• `set` **genres**(`value`): `void`

Gets the genres of the media represented by the current instance.

**`inheritdoc`** `GENRE` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string`[] |

#### Returns

`void`

Genres of the media represented by the current instance or an empty array if no
    value is present.

___

### grouping

• `get` **grouping**(): `string`

Gets the grouping on the album which the media in the current instance belongs to.

**`inheritdoc`** `GROUPING` field

#### Returns

`string`

Grouping on the album which the media in the current instance belongs to or
    `undefined` if no value is present.

• `set` **grouping**(`value`): `void`

Gets the grouping on the album which the media in the current instance belongs to.

**`inheritdoc`** `GROUPING` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

Grouping on the album which the media in the current instance belongs to or
    `undefined` if no value is present.

___

### initialKey

• `get` **initialKey**(): `string`

Gets the initial key of the track.

**`inheritdoc`** `INITIALKEY` field

#### Returns

`string`

Initial key of the track or `undefined` if no value is set

• `set` **initialKey**(`value`): `void`

Gets the initial key of the track.

**`inheritdoc`** `INITIALKEY` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

Initial key of the track or `undefined` if no value is set

___

### isCompilation

• `get` **isCompilation**(): `boolean`

**`inheritdoc`** `COMPILATION` field

#### Returns

`boolean`

• `set` **isCompilation**(`value`): `void`

**`inheritdoc`** `COMPILATION` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`

___

### isEmpty

• `get` **isEmpty**(): `boolean`

Gets whether or not the current instance is empty.

**`inheritdoc`**

#### Returns

`boolean`

`true` if the current instance does not contain any values. `false` otherwise

___

### isrc

• `get` **isrc**(): `string`

Gets the ISRC (International Standard Recording Code) of the track.

**`inheritdoc`** `ISRC` field

#### Returns

`string`

the ISRC of the track or `undefined` if no value is set

• `set` **isrc**(`value`): `void`

Gets the ISRC (International Standard Recording Code) of the track.

**`inheritdoc`** `ISRC` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

the ISRC of the track or `undefined` if no value is set

___

### joinedAlbumArtists

• `get` **joinedAlbumArtists**(): `string`

Gets a semicolon and space separated string containing the values in [albumArtists](xiphcomment.md#albumartists)

#### Returns

`string`

___

### joinedComposers

• `get` **joinedComposers**(): `string`

Gets a semicolon and space separated string containing the values in [composers](xiphcomment.md#composers)

#### Returns

`string`

___

### joinedGenres

• `get` **joinedGenres**(): `string`

Gets a semicolon and space separated string containing the values in [genres](xiphcomment.md#genres)

#### Returns

`string`

___

### joinedPerformers

• `get` **joinedPerformers**(): `string`

Gets a semicolon and space separated string containing the values in [performers](xiphcomment.md#performers)

#### Returns

`string`

___

### joinedPerformersSort

• `get` **joinedPerformersSort**(): `string`

Gets a semicolon and space separated string containing the values in [performersSort](xiphcomment.md#performerssort)

#### Returns

`string`

___

### lyrics

• `get` **lyrics**(): `string`

Gets the lyrics or script of the media represented by the current instance.

**`inheritdoc`** `LYRICS` field

#### Returns

`string`

Lyrics or script of the media represented by the current instance or `undefined` if
    no value is present

• `set` **lyrics**(`value`): `void`

Gets the lyrics or script of the media represented by the current instance.

**`inheritdoc`** `LYRICS` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

Lyrics or script of the media represented by the current instance or `undefined` if
    no value is present

___

### musicBrainzArtistId

• `get` **musicBrainzArtistId**(): `string`

Gets the MusicBrainz artist ID of the media represented by the current instance.

**`inheritdoc`** `MUSICBRAINZ_ARTISTID` field

#### Returns

`string`

MusicBrainz ArtistID of the media represented by the current instance or
    `undefined` if no value is present

• `set` **musicBrainzArtistId**(`value`): `void`

Gets the MusicBrainz artist ID of the media represented by the current instance.

**`inheritdoc`** `MUSICBRAINZ_ARTISTID` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

MusicBrainz ArtistID of the media represented by the current instance or
    `undefined` if no value is present

___

### musicBrainzDiscId

• `get` **musicBrainzDiscId**(): `string`

Gets the MusicBrainz disc ID of the media represented by the current instance.

**`inheritdoc`** `MUSICBRAINZ_DISCID` field

#### Returns

`string`

MusicBrainz DiscID of the media represented by the current instance or `undefined`
    if no value is present

• `set` **musicBrainzDiscId**(`value`): `void`

Gets the MusicBrainz disc ID of the media represented by the current instance.

**`inheritdoc`** `MUSICBRAINZ_DISCID` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

MusicBrainz DiscID of the media represented by the current instance or `undefined`
    if no value is present

___

### musicBrainzReleaseArtistId

• `get` **musicBrainzReleaseArtistId**(): `string`

Gets the MusicBrainz release artist ID of the media represented by the current instance.

**`inheritdoc`** `MUSICBRAINZ_ALBUMARTISTID` field

#### Returns

`string`

MusicBrainz ReleaseArtistID of the media represented by the current instance or
    `undefined` if no value is present

• `set` **musicBrainzReleaseArtistId**(`value`): `void`

Gets the MusicBrainz release artist ID of the media represented by the current instance.

**`inheritdoc`** `MUSICBRAINZ_ALBUMARTISTID` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

MusicBrainz ReleaseArtistID of the media represented by the current instance or
    `undefined` if no value is present

___

### musicBrainzReleaseCountry

• `get` **musicBrainzReleaseCountry**(): `string`

Gets the MusicBrainz release country of the media represented by the current instance.

**`inheritdoc`** `RELEASECOUNTRY` field

#### Returns

`string`

MusicBrainz ReleaseCountry of the media represented by the current instance or
    `undefined` if no value is present

• `set` **musicBrainzReleaseCountry**(`value`): `void`

Gets the MusicBrainz release country of the media represented by the current instance.

**`inheritdoc`** `RELEASECOUNTRY` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

MusicBrainz ReleaseCountry of the media represented by the current instance or
    `undefined` if no value is present

___

### musicBrainzReleaseGroupId

• `get` **musicBrainzReleaseGroupId**(): `string`

Gets the MusicBrainz release group ID of the media represented by the current instance.

**`inheritdoc`** `MUSICBRAINZ_RELEASEGROUPID` field

#### Returns

`string`

MusicBrainz ReleaseGroupID of the media represented by the current instance or
    `undefined` if no value is present

• `set` **musicBrainzReleaseGroupId**(`value`): `void`

Gets the MusicBrainz release group ID of the media represented by the current instance.

**`inheritdoc`** `MUSICBRAINZ_RELEASEGROUPID` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

MusicBrainz ReleaseGroupID of the media represented by the current instance or
    `undefined` if no value is present

___

### musicBrainzReleaseId

• `get` **musicBrainzReleaseId**(): `string`

Gets the MusicBrainz release ID of the media represented by the current instance.

**`inheritdoc`** `MUSICBRAINZ_ALBUMID` field

#### Returns

`string`

MusicBrainz ReleaseID of the media represented by the current instance or
    `undefined` if no value is present

• `set` **musicBrainzReleaseId**(`value`): `void`

Gets the MusicBrainz release ID of the media represented by the current instance.

**`inheritdoc`** `MUSICBRAINZ_ALBUMID` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

MusicBrainz ReleaseID of the media represented by the current instance or
    `undefined` if no value is present

___

### musicBrainzReleaseStatus

• `get` **musicBrainzReleaseStatus**(): `string`

Gets the MusicBrainz release status of the media represented by the current instance.

**`inheritdoc`** `MUSICBRAINZ_ALBUMSTATUS` field

#### Returns

`string`

MusicBrainz ReleaseStatus of the media represented by the current instance or
    `undefined` if no value is present

• `set` **musicBrainzReleaseStatus**(`value`): `void`

Gets the MusicBrainz release status of the media represented by the current instance.

**`inheritdoc`** `MUSICBRAINZ_ALBUMSTATUS` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

MusicBrainz ReleaseStatus of the media represented by the current instance or
    `undefined` if no value is present

___

### musicBrainzReleaseType

• `get` **musicBrainzReleaseType**(): `string`

Gets the MusicBrainz release type of the media represented by the current instance.

**`inheritdoc`** `MUSICBRAINZ_ALBUMTYPE` field

#### Returns

`string`

MusicBrainz ReleaseType of the media represented by the current instance or
    `undefined` if no value is present

• `set` **musicBrainzReleaseType**(`value`): `void`

Gets the MusicBrainz release type of the media represented by the current instance.

**`inheritdoc`** `MUSICBRAINZ_ALBUMTYPE` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

MusicBrainz ReleaseType of the media represented by the current instance or
    `undefined` if no value is present

___

### musicBrainzTrackId

• `get` **musicBrainzTrackId**(): `string`

Gets the MusicBrainz track ID of the media represented by the media represented by the
current instance.

**`inheritdoc`** `MUSICBRAINZ_TRACKID` field

#### Returns

`string`

MusicBrainz TrackID of the media represented by the current instance or `undefined`
    if no value is present

• `set` **musicBrainzTrackId**(`value`): `void`

Gets the MusicBrainz track ID of the media represented by the media represented by the
current instance.

**`inheritdoc`** `MUSICBRAINZ_TRACKID` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

MusicBrainz TrackID of the media represented by the current instance or `undefined`
    if no value is present

___

### musicIpId

• `get` **musicIpId**(): `string`

Gets the MusicIP PUID of the media represented by the current instance.

**`inheritdoc`** `MUSICIP_PUID` field

#### Returns

`string`

MusicIP PUID of the media represented by the current instance or `undefined` if no
    value is present

• `set` **musicIpId**(`value`): `void`

Gets the MusicIP PUID of the media represented by the current instance.

**`inheritdoc`** `MUSICID_PUID` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

MusicIP PUID of the media represented by the current instance or `undefined` if no
    value is present

___

### performers

• `get` **performers**(): `string`[]

Gets the performers or artists who performed in the media described by the current instance.

**`inheritdoc`** `ARTIST` field

#### Returns

`string`[]

Performers who performed in the media described by the current instance or an empty
    array if no value is present.

• `set` **performers**(`value`): `void`

Gets the performers or artists who performed in the media described by the current instance.

**`inheritdoc`** `ARTIST` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string`[] |

#### Returns

`void`

Performers who performed in the media described by the current instance or an empty
    array if no value is present.

___

### performersRole

• `get` **performersRole**(): `string`[]

Gets the characters portrayed by an actor for a video or instruments played by a musician
for music. This must match the [performers](xiphcomment.md#performers) array (for each person, correspond one/more
role). Several roles for the same artist/actor can be separated with semicolons. For
example: "Bass; Backing Vocals; Vibraphone".

**`inheritdoc`** `ARTISTROLE` field

#### Returns

`string`[]

Array containing the roles played by the performers in the media described by the
    current instance, or an empty array if no value is present.

• `set` **performersRole**(`value`): `void`

Gets the characters portrayed by an actor for a video or instruments played by a musician
for music. This must match the [performers](xiphcomment.md#performers) array (for each person, correspond one/more
role). Several roles for the same artist/actor can be separated with semicolons. For
example: "Bass; Backing Vocals; Vibraphone".

**`inheritdoc`** `ARTISTROLE` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string`[] |

#### Returns

`void`

Array containing the roles played by the performers in the media described by the
    current instance, or an empty array if no value is present.

___

### performersSort

• `get` **performersSort**(): `string`[]

Gets the sortable names of the performers or artists who performed in the media described by
the current instance.

**`inheritdoc`** `ARTISTSORT` field

#### Returns

`string`[]

Sortable names for the performers who performed in the media described by the
    current instance, or an empty array if no value is present.

• `set` **performersSort**(`value`): `void`

Gets the sortable names of the performers or artists who performed in the media described by
the current instance.

**`inheritdoc`** `ARTIST` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string`[] |

#### Returns

`void`

Sortable names for the performers who performed in the media described by the
    current instance, or an empty array if no value is present.

___

### pictures

• `get` **pictures**(): [`IPicture`](../interfaces/ipicture.md)[]

Gets a collection of pictures associated with the media represented by the current instance.

**`inheritdoc`**

#### Returns

[`IPicture`](../interfaces/ipicture.md)[]

Array containing a collection of pictures associated with the media represented by
    the current instance or an empty array if no pictures are present.

• `set` **pictures**(`value`): `void`

Gets a collection of pictures associated with the media represented by the current instance.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`IPicture`](../interfaces/ipicture.md)[] |

#### Returns

`void`

Array containing a collection of pictures associated with the media represented by
    the current instance or an empty array if no pictures are present.

___

### publisher

• `get` **publisher**(): `string`

Gets the publisher of the track.

**`inheritdoc`** `ORGANIZATION` field

#### Returns

`string`

Publisher of the track or `undefined` if no value is set

• `set` **publisher**(`value`): `void`

Gets the publisher of the track.

**`inheritdoc`** `ORGANIZATION` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

Publisher of the track or `undefined` if no value is set

___

### remixedBy

• `get` **remixedBy**(): `string`

Gets the remixer of the track.

**`inheritdoc`** `REMIXEDBY` field

#### Returns

`string`

Remixer of the track or `undefined` if no value is set

• `set` **remixedBy**(`value`): `void`

Gets the remixer of the track.

**`inheritdoc`** `REMIXEDBY` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

Remixer of the track or `undefined` if no value is set

___

### replayGainAlbumGain

• `get` **replayGainAlbumGain**(): `number`

Gets the ReplayGain album gain in dB.

**`inheritdoc`** `REPLAYGAIN_ALBUM_GAIN` field

#### Returns

`number`

Album gain as per the ReplayGain specifications, in dB, or `NaN` if no value is set

• `set` **replayGainAlbumGain**(`value`): `void`

Gets the ReplayGain album gain in dB.

**`inheritdoc`** `REPLAYGAIN_ALBUM_GAIN` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

Album gain as per the ReplayGain specifications, in dB, or `NaN` if no value is set

___

### replayGainAlbumPeak

• `get` **replayGainAlbumPeak**(): `number`

Gets the ReplayGain album peak sample.

**`inheritdoc`** `REPLAYGAIN_ALBUM_PEAK` field

#### Returns

`number`

Album peak as per the ReplayGain specifications, or `NaN` if no value is set

• `set` **replayGainAlbumPeak**(`value`): `void`

Gets the ReplayGain album peak sample.

**`inheritdoc`** `REPLAYGAIN_TRACK_PEAK` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

Album peak as per the ReplayGain specifications, or `NaN` if no value is set

___

### replayGainTrackGain

• `get` **replayGainTrackGain**(): `number`

Gets the ReplayGain track gain in dB.

**`inheritdoc`** `REPLAYGAIN_TRACK_GAIN` field

#### Returns

`number`

Track gain as per ReplayGain specifications, in dB, or `NaN` if no value is set

• `set` **replayGainTrackGain**(`value`): `void`

Gets the ReplayGain track gain in dB.

**`inheritdoc`** `REPLAYGAIN_TRACK_GAIN` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

Track gain as per ReplayGain specifications, in dB, or `NaN` if no value is set

___

### replayGainTrackPeak

• `get` **replayGainTrackPeak**(): `number`

Gets the ReplayGain track peak sample.

**`inheritdoc`** `REPLAYGAIN_TRACK_PEAK` field

#### Returns

`number`

Track peak as per the ReplayGain specifications, or `NaN` if no value is set

• `set` **replayGainTrackPeak**(`value`): `void`

Gets the ReplayGain track peak sample.

**`inheritdoc`** `REPLAYGAIN_TRACK_PEAK` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

Track peak as per the ReplayGain specifications, or `NaN` if no value is set

___

### sizeOnDisk

• `get` **sizeOnDisk**(): `number`

Gets the size of the tag in bytes on disk as it was read from disk.

**`inheritdoc`**

#### Returns

`number`

___

### subtitle

• `get` **subtitle**(): `string`

Gets a description, one-line. It represents the tagline of the vide/music.

**`inheritdoc`** `SUBTITLE` field

#### Returns

`string`

Subtitle of the media represented by the current instance or `undefined` if no
    value is present

• `set` **subtitle**(`value`): `void`

Gets a description, one-line. It represents the tagline of the vide/music.

**`inheritdoc`** `SUBTITLE` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

Subtitle of the media represented by the current instance or `undefined` if no
    value is present

___

### tagTypes

• `get` **tagTypes**(): [`TagTypes`](../enums/tagtypes.md)

Gets the tag types contained in the current instance. A bit wise combined [TagTypes](../enums/tagtypes.md)
containing the tag types contained in the current instance.

**`inheritdoc`** returns [TagTypes.Xiph](../enums/tagtypes.md#xiph)

#### Returns

[`TagTypes`](../enums/tagtypes.md)

___

### title

• `get` **title**(): `string`

Gets the title for the media described by the current instance.

**`inheritdoc`** `TITLE` field

#### Returns

`string`

Title of the media described by the current instance or `undefined` if no value is
    present.

• `set` **title**(`value`): `void`

Gets the title for the media described by the current instance.

**`inheritdoc`** `TITLE` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

Title of the media described by the current instance or `undefined` if no value is
    present.

___

### titleSort

• `get` **titleSort**(): `string`

Gets the sortable name for the title of the media described by the current instance.

**`inheritdoc`** `TITLESORT` field

#### Returns

`string`

Sortable name of the media described by the current instance or `undefined` if no
    value is present

• `set` **titleSort**(`value`): `void`

Gets the sortable name for the title of the media described by the current instance.

**`inheritdoc`** `TITLESORT` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

Sortable name of the media described by the current instance or `undefined` if no
    value is present

___

### track

• `get` **track**(): `number`

Gets the position of the media represented by the current instance in its containing album
or season (for a series).

**`inheritdoc`** `TRACKNUMBER` field

#### Returns

`number`

Position of the media represented by the current instance in its containing album
    or `0` if not specified.

• `set` **track**(`value`): `void`

Gets the position of the media represented by the current instance in its containing album
or season (for a series).

**`inheritdoc`** `TRACKNUMBER` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

Position of the media represented by the current instance in its containing album
    or `0` if not specified.

___

### trackCount

• `get` **trackCount**(): `number`

Gets the number of tracks in the album or the number of episodes in a series of the media
represented by the current instance.

**`inheritdoc`** `TRACKTOTAL` as per standard, but the denominator of `TRACKNUMBER` is also
    used if `TRACKTOTAL` is not available.

#### Returns

`number`

Number of tracks in the album or number of episodes in a series of the media
    represented by the current instance or `0` if not specified.

• `set` **trackCount**(`value`): `void`

Gets the number of tracks in the album or the number of episodes in a series of the media
represented by the current instance.

**`inheritdoc`** `TRACKNUMBER` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

Number of tracks in the album or number of episodes in a series of the media
    represented by the current instance or `0` if not specified.

___

### vendorId

• `get` **vendorId**(): `string`

Gets the vendor ID for the current instance.

#### Returns

`string`

___

### year

• `get` **year**(): `number`

Gets the year that the media represented by the current instance was recorded.

**`inheritdoc`** `DATE` field

#### Returns

`number`

Year that the media represented by the current instance was created or `0` if no
    value is present.

• `set` **year**(`value`): `void`

Gets the year that the media represented by the current instance was recorded.

**`inheritdoc`** `DATE` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

Year that the media represented by the current instance was created or `0` if no
    value is present.

## Methods

### clear

▸ **clear**(): `void`

Clears all values stored in the current instance.

**`remarks`** The clearing procedure is format specific and should clear all values.

#### Returns

`void`

#### Overrides

[Tag](tag.md).[clear](tag.md#clear)

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

#### Overrides

[Tag](tag.md).[copyTo](tag.md#copyto)

___

### getField

▸ **getField**(`key`): `string`[]

Gets the field data for a given field identifier.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Field identifier to look up |

#### Returns

`string`[]

string[] Field data or undefined if the field cannot be found

___

### getFieldFirstValue

▸ **getFieldFirstValue**(`key`): `string`

Gets the first value in a field for a given field identifier.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Field identifier to look up |

#### Returns

`string`

string Field data or `undefined` if the field was notfound

___

### removeField

▸ **removeField**(`key`): `void`

Removes a field and all its values from the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Field identifier to remove |

#### Returns

`void`

___

### render

▸ **render**(`addFramingBit`): [`ByteVector`](bytevector.md)

Renders the current instance as a raw Xiph comment, optionally adding a framing bit.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addFramingBit` | `boolean` | Whether or not to add a framing bit to the end of the content. |

#### Returns

[`ByteVector`](bytevector.md)

___

### setFieldAsStrings

▸ **setFieldAsStrings**(`key`, ...`values`): `void`

Sets the contents of a specified field to the provided strings. All values are trimmed and
empty/undefined values are excluded.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Field identifier to set |
| `...values` | `string`[] | Values to store in the current instance |

#### Returns

`void`

___

### setFieldAsUint

▸ **setFieldAsUint**(`key`, `value`, `minPlaces?`): `void`

Sets the contents of a specified field to the provided number.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `key` | `string` | `undefined` | Field identifier to set |
| `value` | `number` | `undefined` | Value to store, must be a positive, 32-bit integer |
| `minPlaces` | `number` | `1` | Number of places to include at a minimum, if the number has fewer places     than this, the value will be padded with zeroes. |

#### Returns

`void`

___

### setInfoTag

▸ **setInfoTag**(): `void`

Set the tags that represent the tagger software (node-taglib-sharp) itself.

**`remarks`** This is typically a method to call just before saving a tag.

#### Returns

`void`

#### Inherited from

[Tag](tag.md).[setInfoTag](tag.md#setinfotag)

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

[Tag](tag.md).[firstInGroup](tag.md#firstingroup)

___

### fromData

▸ `Static` **fromData**(`data`): [`XiphComment`](xiphcomment.md)

Constructs and initializes a new instance by reading the contents of a raw Xiph comment from
a [ByteVector](bytevector.md) object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](bytevector.md) | Object containing a raw Xiph comment, cannot be falsey |

#### Returns

[`XiphComment`](xiphcomment.md)

___

### fromEmpty

▸ `Static` **fromEmpty**(): [`XiphComment`](xiphcomment.md)

Constructs and initializes a new instance with no contents.

#### Returns

[`XiphComment`](xiphcomment.md)

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

[Tag](tag.md).[isFalsyOrLikeEmpty](tag.md#isfalsyorlikeempty)

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

[Tag](tag.md).[joinGroup](tag.md#joingroup)

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

[Tag](tag.md).[tagTypeFlagsToArray](tag.md#tagtypeflagstoarray)
