[node-taglib-sharp](../README.md) / [Exports](../modules.md) / ApeTag

# Class: ApeTag

Provides a representation of an APEv2 tag which can be read from and written to disk.

## Hierarchy

- [`Tag`](tag.md)

  ↳ **`ApeTag`**

## Table of contents

### Accessors

- [album](apetag.md#album)
- [albumArtists](apetag.md#albumartists)
- [albumArtistsSort](apetag.md#albumartistssort)
- [albumSort](apetag.md#albumsort)
- [amazonId](apetag.md#amazonid)
- [beatsPerMinute](apetag.md#beatsperminute)
- [comment](apetag.md#comment)
- [composers](apetag.md#composers)
- [composersSort](apetag.md#composerssort)
- [conductor](apetag.md#conductor)
- [copyright](apetag.md#copyright)
- [dateTagged](apetag.md#datetagged)
- [description](apetag.md#description)
- [disc](apetag.md#disc)
- [discCount](apetag.md#disccount)
- [firstAlbumArtist](apetag.md#firstalbumartist)
- [firstAlbumArtistSort](apetag.md#firstalbumartistsort)
- [firstComposer](apetag.md#firstcomposer)
- [firstComposerSort](apetag.md#firstcomposersort)
- [firstGenre](apetag.md#firstgenre)
- [firstPerformer](apetag.md#firstperformer)
- [firstPerformerSort](apetag.md#firstperformersort)
- [genres](apetag.md#genres)
- [grouping](apetag.md#grouping)
- [initialKey](apetag.md#initialkey)
- [isEmpty](apetag.md#isempty)
- [isHeaderPresent](apetag.md#isheaderpresent)
- [isrc](apetag.md#isrc)
- [items](apetag.md#items)
- [joinedAlbumArtists](apetag.md#joinedalbumartists)
- [joinedComposers](apetag.md#joinedcomposers)
- [joinedGenres](apetag.md#joinedgenres)
- [joinedPerformers](apetag.md#joinedperformers)
- [joinedPerformersSort](apetag.md#joinedperformerssort)
- [lyrics](apetag.md#lyrics)
- [musicBrainzArtistId](apetag.md#musicbrainzartistid)
- [musicBrainzDiscId](apetag.md#musicbrainzdiscid)
- [musicBrainzReleaseArtistId](apetag.md#musicbrainzreleaseartistid)
- [musicBrainzReleaseCountry](apetag.md#musicbrainzreleasecountry)
- [musicBrainzReleaseGroupId](apetag.md#musicbrainzreleasegroupid)
- [musicBrainzReleaseId](apetag.md#musicbrainzreleaseid)
- [musicBrainzReleaseStatus](apetag.md#musicbrainzreleasestatus)
- [musicBrainzReleaseType](apetag.md#musicbrainzreleasetype)
- [musicBrainzTrackId](apetag.md#musicbrainztrackid)
- [musicIpId](apetag.md#musicipid)
- [performers](apetag.md#performers)
- [performersRole](apetag.md#performersrole)
- [performersSort](apetag.md#performerssort)
- [pictures](apetag.md#pictures)
- [publisher](apetag.md#publisher)
- [remixedBy](apetag.md#remixedby)
- [replayGainAlbumGain](apetag.md#replaygainalbumgain)
- [replayGainAlbumPeak](apetag.md#replaygainalbumpeak)
- [replayGainTrackGain](apetag.md#replaygaintrackgain)
- [replayGainTrackPeak](apetag.md#replaygaintrackpeak)
- [sizeOnDisk](apetag.md#sizeondisk)
- [subtitle](apetag.md#subtitle)
- [tagTypes](apetag.md#tagtypes)
- [title](apetag.md#title)
- [titleSort](apetag.md#titlesort)
- [track](apetag.md#track)
- [trackCount](apetag.md#trackcount)
- [year](apetag.md#year)

### Methods

- [appendStringValue](apetag.md#appendstringvalue)
- [appendStringValues](apetag.md#appendstringvalues)
- [clear](apetag.md#clear)
- [copyTo](apetag.md#copyto)
- [getItem](apetag.md#getitem)
- [hasItem](apetag.md#hasitem)
- [removeItem](apetag.md#removeitem)
- [render](apetag.md#render)
- [setInfoTag](apetag.md#setinfotag)
- [setItem](apetag.md#setitem)
- [setNumericValue](apetag.md#setnumericvalue)
- [setStringValue](apetag.md#setstringvalue)
- [setStringValues](apetag.md#setstringvalues)
- [firstInGroup](apetag.md#firstingroup)
- [fromData](apetag.md#fromdata)
- [fromEmpty](apetag.md#fromempty)
- [fromFile](apetag.md#fromfile)
- [isFalsyOrLikeEmpty](apetag.md#isfalsyorlikeempty)
- [joinGroup](apetag.md#joingroup)
- [tagTypeFlagsToArray](apetag.md#tagtypeflagstoarray)

## Accessors

### album

• `get` **album**(): `string`

Gets the album of the media represented by the current instance. For video media, this
represents the collection the video belongs to.

**`inheritdoc`** Album item

#### Returns

`string`

Album of the media represented by the current instance or `undefined` if no value
    is present

• `set` **album**(`value`): `void`

Gets the album of the media represented by the current instance. For video media, this
represents the collection the video belongs to.

**`inheritdoc`** Album item

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

**`inheritdoc`**
This property is implemented using the "Album Artist" item and "AlbumArtist" as a backup if
it exists.

#### Returns

`string`[]

Band or artist credited with the creation of the entire album or collection
    containing the media described by the current instance or an empty array if no value is
    present

• `set` **albumArtists**(`value`): `void`

Gets the band or artist who is credited credited in the creation of the entire album or
collection containing the media described by the current instance.

**`inheritdoc`**
Will be stored in "Album Artist" primarily. If "AlbumArtist" exists, value will also be
stored there for compatibility.

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

**`inheritdoc`** AlbumArtistSort item

#### Returns

`string`[]

Sortable names for the bands/artists are credited with the creation of the entire
    album or collection containing the media described by the current instance, or an empty
    array if no value is present.

• `set` **albumArtistsSort**(`value`): `void`

Gets the sortable names of the bands/artists who are credited with creating the entire
album or collection containing the media described by the current instance.

**`inheritdoc`** AlbumArtistSort item

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

**`inheritdoc`** AlbumSort item

#### Returns

`string`

Sortable name for the album title of the media or `undefined` if the value is not
    present

• `set` **albumSort**(`value`): `void`

Gets the sortable name of the album title of the media represented by the current instance.

**`inheritdoc`** AlbumSort item

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

**`inheritdoc`** ASIN item

#### Returns

`string`

Amazon ID of the media represented by the current instance or `undefined` if no
    value is present

• `set` **amazonId**(`value`): `void`

Gets the Amazon ID of the media represented by the current instance.

**`inheritdoc`** ASIN item

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

**`inheritdoc`** BPM item

#### Returns

`number`

Beats per minute of the audio in the media represented by the current instance, or
    `0` if not specified

• `set` **beatsPerMinute**(`value`): `void`

Gets the number of beats per minute in the audio of the media represented by the current
instance.

**`inheritdoc`** BPM item

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

**`inheritdoc`** Comment item

#### Returns

`string`

User comments on the media represented by the current instance or `undefined` if
    the value is not present

• `set` **comment**(`value`): `void`

Gets a user comment on the media represented by the current instance.

**`inheritdoc`** Comment item

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

**`inheritdoc`** Composer item

#### Returns

`string`[]

Composers of the media represented by the current instance of an empty array if no
    value is present.

• `set` **composers**(`value`): `void`

Gets the composers of the media represented by the current instance.

**`inheritdoc`** Composer item

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

**`inheritdoc`** ComposerSort item

#### Returns

`string`[]

Sortable names for the composers of the media represented by the current instance
    or an empty array if no value is present.

• `set` **composersSort**(`value`): `void`

Gets the sortable names of the composers of the media represented by the current instance.

**`inheritdoc`** ComposerSort

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

**`inheritdoc`** Conductor item

#### Returns

`string`

Conductor or director of the media represented by the current instance or
    `undefined` if no value present.

• `set` **conductor**(`value`): `void`

Gets the conductor or director of the media represented by the current instance.

**`inheritdoc`** Conductor item

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

**`inheritdoc`** Copyright item

#### Returns

`string`

Copyright information for the media represented by the current instance or
    `undefined` if no value is present.

• `set` **copyright**(`value`): `void`

Gets the copyright information for the media represented by the current instance.

**`inheritdoc`** Copyright item

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

**`inheritdoc`** DateTagged item

#### Returns

`Date`

Date/time at which the tag has been written, or `undefined` if no value is present

• `set` **dateTagged**(`value`): `void`

Gets the date and time at which the tag has been written.

**`inheritdoc`** DateTagged item

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

**`inheritdoc`** Description item

#### Returns

`string`

Description of the media represented by the current instance or `undefined` if no
    value is present

• `set` **description**(`value`): `void`

Gets a short description of the media. For music, this could be the comment that the artist
made of his/her work. For a video, this should be a short summary of the story/plot, but
generally no spoliers. This should give the impression of what to expect in the media.

**`inheritdoc`** Description item

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

**`inheritdoc`** Disc item numerator

#### Returns

`number`

Number of the disc or season of the media represented by the current instance in a
    boxed set.

• `set` **disc**(`value`): `void`

Gets the number of the disc containing the media represented by the current instance in the
boxed set. For a series, this represents the season number.

**`inheritdoc`** Disc item numerator

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

**`inheritdoc`** Disc item denominator

#### Returns

`number`

Number of discs or seasons in the boxed set containing the media represented by the
    current instance or `0` if not specified.

• `set` **discCount**(`value`): `void`

Gets the number of discs or seasons in the boxed set containing the media represented by the
current instance.

**`inheritdoc`** Disc item denominator

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

Number of discs or seasons in the boxed set containing the media represented by the
    current instance or `0` if not specified.

___

### firstAlbumArtist

• `get` **firstAlbumArtist**(): `string`

Gets the the first value contained in [albumArtists](apetag.md#albumartists).

#### Returns

`string`

___

### firstAlbumArtistSort

• `get` **firstAlbumArtistSort**(): `string`

Gets the first value contained in [albumArtistsSort](apetag.md#albumartistssort)

#### Returns

`string`

___

### firstComposer

• `get` **firstComposer**(): `string`

Gets the first value contained in [composers](apetag.md#composers)

#### Returns

`string`

___

### firstComposerSort

• `get` **firstComposerSort**(): `string`

Gets the first value contained in [composersSort](apetag.md#composerssort)

#### Returns

`string`

___

### firstGenre

• `get` **firstGenre**(): `string`

Gets the first value contained in [genres](apetag.md#genres)

#### Returns

`string`

___

### firstPerformer

• `get` **firstPerformer**(): `string`

Gets the first value contained in [performers](apetag.md#performers)

#### Returns

`string`

___

### firstPerformerSort

• `get` **firstPerformerSort**(): `string`

Gets the first value contained in [performersSort](apetag.md#performerssort)

#### Returns

`string`

___

### genres

• `get` **genres**(): `string`[]

Gets the genres of the media represented by the current instance.

**`inheritdoc`** Genre item

#### Returns

`string`[]

Genres of the media represented by the current instance or an empty array if no
    value is present.

• `set` **genres**(`value`): `void`

Gets the genres of the media represented by the current instance.

**`inheritdoc`** Genre item

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

**`inheritdoc`** Grouping item

#### Returns

`string`

Grouping on the album which the media in the current instance belongs to or
    `undefined` if no value is present.

• `set` **grouping**(`value`): `void`

Gets the grouping on the album which the media in the current instance belongs to.

**`inheritdoc`** Grouping item

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

Gets whether or not the current instance is empty.

**`inheritdoc`**

#### Returns

`boolean`

`true` if the current instance does not contain any values. `false` otherwise

___

### isHeaderPresent

• `get` **isHeaderPresent**(): `boolean`

Gets whether or not the current instance has a header when rendered.

#### Returns

`boolean`

• `set` **isHeaderPresent**(`value`): `void`

Sets whether or not the current instance has a header when rendered.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`

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

### items

• `get` **items**(): `ApeTagItem`[]

Gets all items stored in the current instance

#### Returns

`ApeTagItem`[]

___

### joinedAlbumArtists

• `get` **joinedAlbumArtists**(): `string`

Gets a semicolon and space separated string containing the values in [albumArtists](apetag.md#albumartists)

#### Returns

`string`

___

### joinedComposers

• `get` **joinedComposers**(): `string`

Gets a semicolon and space separated string containing the values in [composers](apetag.md#composers)

#### Returns

`string`

___

### joinedGenres

• `get` **joinedGenres**(): `string`

Gets a semicolon and space separated string containing the values in [genres](apetag.md#genres)

#### Returns

`string`

___

### joinedPerformers

• `get` **joinedPerformers**(): `string`

Gets a semicolon and space separated string containing the values in [performers](apetag.md#performers)

#### Returns

`string`

___

### joinedPerformersSort

• `get` **joinedPerformersSort**(): `string`

Gets a semicolon and space separated string containing the values in [performersSort](apetag.md#performerssort)

#### Returns

`string`

___

### lyrics

• `get` **lyrics**(): `string`

Gets the lyrics or script of the media represented by the current instance.

**`inheritdoc`** Lyrics item

#### Returns

`string`

Lyrics or script of the media represented by the current instance or `undefined` if
    no value is present

• `set` **lyrics**(`value`): `void`

Gets the lyrics or script of the media represented by the current instance.

**`inheritdoc`** Lyrics item

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

**`inheritdoc`** MUSICBRAINZ_ARTISTID item

#### Returns

`string`

MusicBrainz ArtistID of the media represented by the current instance or
    `undefined` if no value is present

• `set` **musicBrainzArtistId**(`value`): `void`

Gets the MusicBrainz artist ID of the media represented by the current instance.

**`inheritdoc`** MUSICBRAINZ_ARTISTID item

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

**`inheritdoc`** MUSICBRAINZ_DISCID item

#### Returns

`string`

MusicBrainz DiscID of the media represented by the current instance or `undefined`
    if no value is present

• `set` **musicBrainzDiscId**(`value`): `void`

Gets the MusicBrainz disc ID of the media represented by the current instance.

**`inheritdoc`** MUSICBRAINZ_DISCID item

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

**`inheritdoc`** MUSICBRAINZ_ARTISTID item

#### Returns

`string`

MusicBrainz ReleaseArtistID of the media represented by the current instance or
    `undefined` if no value is present

• `set` **musicBrainzReleaseArtistId**(`value`): `void`

Gets the MusicBrainz release artist ID of the media represented by the current instance.

**`inheritdoc`** MUSICBRAINZ_ARTISTID item

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

**`inheritdoc`** RELEASECOUNTRY item

#### Returns

`string`

MusicBrainz ReleaseCountry of the media represented by the current instance or
    `undefined` if no value is present

• `set` **musicBrainzReleaseCountry**(`value`): `void`

Gets the MusicBrainz release country of the media represented by the current instance.

**`inheritdoc`** RELEASECOUNTRY item

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

**`inheritdoc`** MUSICBRAINZ_RELEASEGROUPID item

#### Returns

`string`

MusicBrainz ReleaseGroupID of the media represented by the current instance or
    `undefined` if no value is present

• `set` **musicBrainzReleaseGroupId**(`value`): `void`

Gets the MusicBrainz release group ID of the media represented by the current instance.

**`inheritdoc`** MUSICBRAINZ_RELEASEGROUPID item

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

**`inheritdoc`** MUSICBRAINZ_ALBUMID item

#### Returns

`string`

MusicBrainz ReleaseID of the media represented by the current instance or
    `undefined` if no value is present

• `set` **musicBrainzReleaseId**(`value`): `void`

Gets the MusicBrainz release ID of the media represented by the current instance.

**`inheritdoc`** MUSICBRAINZ_ALBUMID item

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

**`inheritdoc`** MUSICBRAINZ_ALBUMSTATUS item

#### Returns

`string`

MusicBrainz ReleaseStatus of the media represented by the current instance or
    `undefined` if no value is present

• `set` **musicBrainzReleaseStatus**(`value`): `void`

Gets the MusicBrainz release status of the media represented by the current instance.

**`inheritdoc`** MUSICBRAINZ_ALBUMSTATUS item

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

**`inheritdoc`** MUSICBRAINZ_ALBUMTYPE item

#### Returns

`string`

MusicBrainz ReleaseType of the media represented by the current instance or
    `undefined` if no value is present

• `set` **musicBrainzReleaseType**(`value`): `void`

Gets the MusicBrainz release type of the media represented by the current instance.

**`inheritdoc`** MUSICBRAINZ_ALBUMTYPE item

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

**`inheritdoc`** MUSICBRAINZ_TRACKID item

#### Returns

`string`

MusicBrainz TrackID of the media represented by the current instance or `undefined`
    if no value is present

• `set` **musicBrainzTrackId**(`value`): `void`

Gets the MusicBrainz track ID of the media represented by the media represented by the
current instance.

**`inheritdoc`** MUSICBRAINZ_TRACKID item

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

**`inheritdoc`** MUSICIP_PUID item

#### Returns

`string`

MusicIP PUID of the media represented by the current instance or `undefined` if no
    value is present

• `set` **musicIpId**(`value`): `void`

Gets the MusicIP PUID of the media represented by the current instance.

**`inheritdoc`** MUSICIP_PUID item

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

**`inheritdoc`** Artist item

#### Returns

`string`[]

Performers who performed in the media described by the current instance or an empty
    array if no value is present.

• `set` **performers**(`value`): `void`

Gets the performers or artists who performed in the media described by the current instance.

**`inheritdoc`** Artist item

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
for music. This must match the [performers](apetag.md#performers) array (for each person, correspond one/more
role). Several roles for the same artist/actor can be separated with semicolons. For
example: "Bass; Backing Vocals; Vibraphone".

**`inheritdoc`** PerformersRole item

#### Returns

`string`[]

Array containing the roles played by the performers in the media described by the
    current instance, or an empty array if no value is present.

• `set` **performersRole**(`value`): `void`

Gets the characters portrayed by an actor for a video or instruments played by a musician
for music. This must match the [performers](apetag.md#performers) array (for each person, correspond one/more
role). Several roles for the same artist/actor can be separated with semicolons. For
example: "Bass; Backing Vocals; Vibraphone".

**`inheritdoc`** PerformersRole item

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

**`inheritdoc`** ArtistSort item

#### Returns

`string`[]

Sortable names for the performers who performed in the media described by the
    current instance, or an empty array if no value is present.

• `set` **performersSort**(`value`): `void`

Gets the sortable names of the performers or artists who performed in the media described by
the current instance.

**`inheritdoc`** ArtistSort item

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

**`inheritdoc`** Cover Art items

#### Returns

[`IPicture`](../interfaces/ipicture.md)[]

Array containing a collection of pictures associated with the media represented by
    the current instance or an empty array if no pictures are present.

• `set` **pictures**(`value`): `void`

Gets a collection of pictures associated with the media represented by the current instance.

**`inheritdoc`** Cover Art items

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

**`inheritdoc`** REPLAYGAIN_ALBUM_GAIN item

#### Returns

`number`

Album gain as per the ReplayGain specifications, in dB, or `NaN` if no value is set

• `set` **replayGainAlbumGain**(`value`): `void`

Gets the ReplayGain album gain in dB.

**`inheritdoc`** REPLAYGAIN_ALBUM_GAIN item

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

**`inheritdoc`** REPLAYGAIN_ALBUM_PEAK item

#### Returns

`number`

Album peak as per the ReplayGain specifications, or `NaN` if no value is set

• `set` **replayGainAlbumPeak**(`value`): `void`

Gets the ReplayGain album peak sample.

**`inheritdoc`** REPLAYGAIN_ALBUM_PEAK item

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

**`inheritdoc`** REPLAYGAIN_TRACK_GAIN item

#### Returns

`number`

Track gain as per ReplayGain specifications, in dB, or `NaN` if no value is set

• `set` **replayGainTrackGain**(`value`): `void`

Gets the ReplayGain track gain in dB.

**`inheritdoc`** REPLAYGAIN_TRACK_GAIN item

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

**`inheritdoc`** REPLAYGAIN_TRACK_PEAK item

#### Returns

`number`

Track peak as per the ReplayGain specifications, or `NaN` if no value is set

• `set` **replayGainTrackPeak**(`value`): `void`

Gets the ReplayGain track peak sample.

**`inheritdoc`** REPLAYGAIN_TRACK_PEAK item

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

**`inheritdoc`** Subtitle item

#### Returns

`string`

Subtitle of the media represented by the current instance or `undefined` if no
    value is present

• `set` **subtitle**(`value`): `void`

Gets a description, one-line. It represents the tagline of the vide/music.

**`inheritdoc`** Subtitle

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

**`inheritdoc`**

#### Returns

[`TagTypes`](../enums/tagtypes.md)

___

### title

• `get` **title**(): `string`

Gets the title for the media described by the current instance.

**`inheritdoc`** Title item

#### Returns

`string`

Title of the media described by the current instance or `undefined` if no value is
    present.

• `set` **title**(`value`): `void`

Gets the title for the media described by the current instance.

**`inheritdoc`** Title item

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

**`inheritdoc`** TitleSort item

#### Returns

`string`

Sortable name of the media described by the current instance or `undefined` if no
    value is present

• `set` **titleSort**(`value`): `void`

Gets the sortable name for the title of the media described by the current instance.

**`inheritdoc`** TitleSort item

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

**`inheritdoc`** Track item numerator

#### Returns

`number`

Position of the media represented by the current instance in its containing album
    or `0` if not specified.

• `set` **track**(`value`): `void`

Gets the position of the media represented by the current instance in its containing album
or season (for a series).

**`inheritdoc`** Track item numerator

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

**`inheritdoc`** Track item denominator

#### Returns

`number`

Number of tracks in the album or number of episodes in a series of the media
    represented by the current instance or `0` if not specified.

• `set` **trackCount**(`value`): `void`

Gets the number of tracks in the album or the number of episodes in a series of the media
represented by the current instance.

**`inheritdoc`** Track item denominator

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

Number of tracks in the album or number of episodes in a series of the media
    represented by the current instance or `0` if not specified.

___

### year

• `get` **year**(): `number`

Gets the year that the media represented by the current instance was recorded.

**`inheritdoc`** Year item

#### Returns

`number`

Year that the media represented by the current instance was created or `0` if no
    value is present.

• `set` **year**(`value`): `void`

Gets the year that the media represented by the current instance was recorded.

**`inheritdoc`** Year item

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

Year that the media represented by the current instance was created or `0` if no
    value is present.

## Methods

### appendStringValue

▸ **appendStringValue**(`key`, `value`): `void`

Adds a single value to the contents of an item. Creates a new item if one does not exist.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Key to use to lookup to item to add `value` to |
| `value` | `string` | Values to add to item identified by `key` |

#### Returns

`void`

___

### appendStringValues

▸ **appendStringValues**(`key`, `values`): `void`

Adds a lists of strings to the values stored in a specified item. Creates a new item if one
does not already exist.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Key to use to lookup the item |
| `values` | `string`[] | Values to add to the item |

#### Returns

`void`

___

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

| Name | Type |
| :------ | :------ |
| `target` | [`Tag`](tag.md) |
| `overwrite` | `boolean` |

#### Returns

`void`

#### Overrides

[Tag](tag.md).[copyTo](tag.md#copyto)

___

### getItem

▸ **getItem**(`key`): `ApeTagItem`

Gets an item from the current instance identified by `key`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Identifier for the item to get |

#### Returns

`ApeTagItem`

ApeTagItem Item specified by `key` if it exists, undefined is
    returned otherwise

___

### hasItem

▸ **hasItem**(`key`): `boolean`

Determines if any items with the specified `key` exist in the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Identifier for looking up a matching item |

#### Returns

`boolean`

boolean `true` if an item with the specified key exists, `false` otherwise

___

### removeItem

▸ **removeItem**(`key`): `void`

Removes all items from the current instance with the specified `key`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Identifier of the items to remove. |

#### Returns

`void`

___

### render

▸ **render**(): [`ByteVector`](bytevector.md)

Renders the current instance as a raw APEv2 tag.

#### Returns

[`ByteVector`](bytevector.md)

ByteVector Bytes that represent the current instance

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

### setItem

▸ **setItem**(`item`): `void`

Adds an item to the current instance, replacing an existing one with the same key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | `ApeTagItem` | Item to add to the current instance |

#### Returns

`void`

___

### setNumericValue

▸ **setNumericValue**(`key`, `numerator`, `denominator`): `void`

Stores a number in a specified item. If both `numerator` and
`denominator` are provided the item will be set to `numerator/denominator`. If
neither `numerator` nor `denominator` are provided, the item will be
removed from this tag. A new item is created if one with the specified `key` does
not exist.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Identifier for the item to set the item |
| `numerator` | `number` | Whole number of top half of the fraction if `denominator` is     provided |
| `denominator` | `number` | Bottom half of the fraction to store. Can be `undefined` if only     `numerator` is needed. |

#### Returns

`void`

___

### setStringValue

▸ **setStringValue**(`key`, `value`): `void`

Stores a string in the item specified by `key`. This will replace the contents of
the specified item. If `value` is falsy, the item will be removed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Item to set the value of |
| `value` | `string` | String to store in the item. If falsy, the specified item will be removed |

#### Returns

`void`

___

### setStringValues

▸ **setStringValues**(`key`, `values`): `void`

Stores a list of strings in the item specified by `key`. This will replace the
contents of the specified item. If `value` is falsy or empty, the item will be removed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Item to set the value of |
| `values` | `string`[] | String to store in the item. If falsy or empty, the specified item will be     removed |

#### Returns

`void`

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

▸ `Static` **fromData**(`data`): [`ApeTag`](apetag.md)

Constructs and initializes a new instance by reading the contents of a raw tag in a
specified [ByteVector](bytevector.md) object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](bytevector.md) | Object containing the raw tag |

#### Returns

[`ApeTag`](apetag.md)

___

### fromEmpty

▸ `Static` **fromEmpty**(): [`ApeTag`](apetag.md)

Constructs an empty APEv2 tag.

#### Returns

[`ApeTag`](apetag.md)

___

### fromFile

▸ `Static` **fromFile**(`file`, `position`): [`ApeTag`](apetag.md)

Constructs a new instance by reading the contents from a specified position in a specified
file.

**`remarks`** If `position` points to the beginning of the tag footer, the footer will be read
    and then the parser will backup and start reading from the beginning of the file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | [`File`](file.md) | File to read the tag from |
| `position` | `number` | Position where the tag header or footer begins |

#### Returns

[`ApeTag`](apetag.md)

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
