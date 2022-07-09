[node-taglib-sharp](../README.md) / [Exports](../modules.md) / OggTag

# Class: OggTag

This class combines a collection of [XiphComment](XiphComment.md) objects so that tagging properties can
be read from each but are only set to the first comment of the file.

## Hierarchy

- [`CombinedTag`](CombinedTag.md)

  ↳ **`OggTag`**

## Table of contents

### Constructors

- [constructor](OggTag.md#constructor)

### Accessors

- [album](OggTag.md#album)
- [albumArtists](OggTag.md#albumartists)
- [albumArtistsSort](OggTag.md#albumartistssort)
- [albumSort](OggTag.md#albumsort)
- [amazonId](OggTag.md#amazonid)
- [beatsPerMinute](OggTag.md#beatsperminute)
- [comment](OggTag.md#comment)
- [comments](OggTag.md#comments)
- [composers](OggTag.md#composers)
- [composersSort](OggTag.md#composerssort)
- [conductor](OggTag.md#conductor)
- [copyright](OggTag.md#copyright)
- [dateTagged](OggTag.md#datetagged)
- [description](OggTag.md#description)
- [disc](OggTag.md#disc)
- [discCount](OggTag.md#disccount)
- [firstAlbumArtist](OggTag.md#firstalbumartist)
- [firstAlbumArtistSort](OggTag.md#firstalbumartistsort)
- [firstComposer](OggTag.md#firstcomposer)
- [firstComposerSort](OggTag.md#firstcomposersort)
- [firstGenre](OggTag.md#firstgenre)
- [firstPerformer](OggTag.md#firstperformer)
- [firstPerformerSort](OggTag.md#firstperformersort)
- [genres](OggTag.md#genres)
- [grouping](OggTag.md#grouping)
- [initialKey](OggTag.md#initialkey)
- [isCompilation](OggTag.md#iscompilation)
- [isEmpty](OggTag.md#isempty)
- [isrc](OggTag.md#isrc)
- [joinedAlbumArtists](OggTag.md#joinedalbumartists)
- [joinedComposers](OggTag.md#joinedcomposers)
- [joinedGenres](OggTag.md#joinedgenres)
- [joinedPerformers](OggTag.md#joinedperformers)
- [joinedPerformersSort](OggTag.md#joinedperformerssort)
- [lyrics](OggTag.md#lyrics)
- [musicBrainzArtistId](OggTag.md#musicbrainzartistid)
- [musicBrainzDiscId](OggTag.md#musicbrainzdiscid)
- [musicBrainzReleaseArtistId](OggTag.md#musicbrainzreleaseartistid)
- [musicBrainzReleaseCountry](OggTag.md#musicbrainzreleasecountry)
- [musicBrainzReleaseGroupId](OggTag.md#musicbrainzreleasegroupid)
- [musicBrainzReleaseId](OggTag.md#musicbrainzreleaseid)
- [musicBrainzReleaseStatus](OggTag.md#musicbrainzreleasestatus)
- [musicBrainzReleaseType](OggTag.md#musicbrainzreleasetype)
- [musicBrainzTrackId](OggTag.md#musicbrainztrackid)
- [musicIpId](OggTag.md#musicipid)
- [performers](OggTag.md#performers)
- [performersRole](OggTag.md#performersrole)
- [performersSort](OggTag.md#performerssort)
- [pictures](OggTag.md#pictures)
- [publisher](OggTag.md#publisher)
- [remixedBy](OggTag.md#remixedby)
- [replayGainAlbumGain](OggTag.md#replaygainalbumgain)
- [replayGainAlbumPeak](OggTag.md#replaygainalbumpeak)
- [replayGainTrackGain](OggTag.md#replaygaintrackgain)
- [replayGainTrackPeak](OggTag.md#replaygaintrackpeak)
- [serialNumbers](OggTag.md#serialnumbers)
- [sizeOnDisk](OggTag.md#sizeondisk)
- [subtitle](OggTag.md#subtitle)
- [supportedTagTypes](OggTag.md#supportedtagtypes)
- [tagTypes](OggTag.md#tagtypes)
- [tags](OggTag.md#tags)
- [title](OggTag.md#title)
- [titleSort](OggTag.md#titlesort)
- [track](OggTag.md#track)
- [trackCount](OggTag.md#trackcount)
- [year](OggTag.md#year)

### Methods

- [addTag](OggTag.md#addtag)
- [clear](OggTag.md#clear)
- [copyTo](OggTag.md#copyto)
- [createTag](OggTag.md#createtag)
- [getComment](OggTag.md#getcomment)
- [getTag](OggTag.md#gettag)
- [removeTags](OggTag.md#removetags)
- [replaceTag](OggTag.md#replacetag)
- [setComment](OggTag.md#setcomment)
- [setInfoTag](OggTag.md#setinfotag)
- [validateTagCreation](OggTag.md#validatetagcreation)
- [firstInGroup](OggTag.md#firstingroup)
- [isFalsyOrLikeEmpty](OggTag.md#isfalsyorlikeempty)
- [joinGroup](OggTag.md#joingroup)
- [tagTypeFlagsToArray](OggTag.md#tagtypeflagstoarray)

## Constructors

### constructor

• **new OggTag**(`comments`)

Constructs and initializes a new instance with no contents.

#### Parameters

| Name | Type |
| :------ | :------ |
| `comments` | `Map`<`number`, [`XiphComment`](XiphComment.md)\> |

#### Overrides

[CombinedTag](CombinedTag.md).[constructor](CombinedTag.md#constructor)

## Accessors

### album

• `get` **album**(): `string`

Gets the album of the media represented by the current instance. For video media, this
represents the collection the video belongs to.

**`inheritdoc`**

#### Returns

`string`

#### Inherited from

CombinedTag.album

• `set` **album**(`val`): `void`

Gets the album of the media represented by the current instance. For video media, this
represents the collection the video belongs to.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Inherited from

CombinedTag.album

___

### albumArtists

• `get` **albumArtists**(): `string`[]

Gets the band or artist who is credited credited in the creation of the entire album or
collection containing the media described by the current instance.

**`inheritdoc`**

#### Returns

`string`[]

#### Inherited from

CombinedTag.albumArtists

• `set` **albumArtists**(`val`): `void`

Gets the band or artist who is credited credited in the creation of the entire album or
collection containing the media described by the current instance.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string`[] |

#### Returns

`void`

#### Inherited from

CombinedTag.albumArtists

___

### albumArtistsSort

• `get` **albumArtistsSort**(): `string`[]

Gets the sortable names of the bands/artists who are credited with creating the entire
album or collection containing the media described by the current instance.

**`inheritdoc`**

#### Returns

`string`[]

#### Inherited from

CombinedTag.albumArtistsSort

• `set` **albumArtistsSort**(`val`): `void`

Gets the sortable names of the bands/artists who are credited with creating the entire
album or collection containing the media described by the current instance.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string`[] |

#### Returns

`void`

#### Inherited from

CombinedTag.albumArtistsSort

___

### albumSort

• `get` **albumSort**(): `string`

Gets the sortable name of the album title of the media represented by the current instance.

**`inheritdoc`**

#### Returns

`string`

#### Inherited from

CombinedTag.albumSort

• `set` **albumSort**(`val`): `void`

Gets the sortable name of the album title of the media represented by the current instance.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Inherited from

CombinedTag.albumSort

___

### amazonId

• `get` **amazonId**(): `string`

Gets the Amazon ID of the media represented by the current instance.

**`inheritdoc`**

#### Returns

`string`

#### Inherited from

CombinedTag.amazonId

• `set` **amazonId**(`val`): `void`

Gets the Amazon ID of the media represented by the current instance.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Inherited from

CombinedTag.amazonId

___

### beatsPerMinute

• `get` **beatsPerMinute**(): `number`

Gets the number of beats per minute in the audio of the media represented by the current
instance.

**`inheritdoc`**

#### Returns

`number`

#### Inherited from

CombinedTag.beatsPerMinute

• `set` **beatsPerMinute**(`val`): `void`

Gets the number of beats per minute in the audio of the media represented by the current
instance.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

#### Inherited from

CombinedTag.beatsPerMinute

___

### comment

• `get` **comment**(): `string`

Gets a user comment on the media represented by the current instance.

**`inheritdoc`**

#### Returns

`string`

#### Inherited from

CombinedTag.comment

• `set` **comment**(`val`): `void`

Gets a user comment on the media represented by the current instance.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Inherited from

CombinedTag.comment

___

### comments

• `get` **comments**(): [`XiphComment`](XiphComment.md)[]

Gets the list of comments in the current instance, in the order they were added.

**`remarks`** Modifying this array makes no changes to the file. Use [setComment](OggTag.md#setcomment).

#### Returns

[`XiphComment`](XiphComment.md)[]

___

### composers

• `get` **composers**(): `string`[]

Gets the composers of the media represented by the current instance.

**`inheritdoc`**

#### Returns

`string`[]

#### Inherited from

CombinedTag.composers

• `set` **composers**(`val`): `void`

Gets the composers of the media represented by the current instance.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string`[] |

#### Returns

`void`

#### Inherited from

CombinedTag.composers

___

### composersSort

• `get` **composersSort**(): `string`[]

Gets the sortable names of the composers of the media represented by the current instance.

**`inheritdoc`**

#### Returns

`string`[]

#### Inherited from

CombinedTag.composersSort

• `set` **composersSort**(`val`): `void`

Gets the sortable names of the composers of the media represented by the current instance.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string`[] |

#### Returns

`void`

#### Inherited from

CombinedTag.composersSort

___

### conductor

• `get` **conductor**(): `string`

Gets the conductor or director of the media represented by the current instance.

**`inheritdoc`**

#### Returns

`string`

#### Inherited from

CombinedTag.conductor

• `set` **conductor**(`val`): `void`

Gets the conductor or director of the media represented by the current instance.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Inherited from

CombinedTag.conductor

___

### copyright

• `get` **copyright**(): `string`

Gets the copyright information for the media represented by the current instance.

**`inheritdoc`**

#### Returns

`string`

#### Inherited from

CombinedTag.copyright

• `set` **copyright**(`val`): `void`

Gets the copyright information for the media represented by the current instance.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Inherited from

CombinedTag.copyright

___

### dateTagged

• `get` **dateTagged**(): `Date`

Gets the date and time at which the tag has been written.

**`inheritdoc`**

#### Returns

`Date`

#### Inherited from

CombinedTag.dateTagged

• `set` **dateTagged**(`val`): `void`

Gets the date and time at which the tag has been written.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Date` |

#### Returns

`void`

#### Inherited from

CombinedTag.dateTagged

___

### description

• `get` **description**(): `string`

Gets a short description of the media. For music, this could be the comment that the artist
made of his/her work. For a video, this should be a short summary of the story/plot, but
generally no spoliers. This should give the impression of what to expect in the media.

**`inheritdoc`**

#### Returns

`string`

#### Inherited from

CombinedTag.description

• `set` **description**(`val`): `void`

Gets a short description of the media. For music, this could be the comment that the artist
made of his/her work. For a video, this should be a short summary of the story/plot, but
generally no spoliers. This should give the impression of what to expect in the media.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Inherited from

CombinedTag.description

___

### disc

• `get` **disc**(): `number`

Gets the number of the disc containing the media represented by the current instance in the
boxed set. For a series, this represents the season number.

**`inheritdoc`**

#### Returns

`number`

#### Inherited from

CombinedTag.disc

• `set` **disc**(`val`): `void`

Gets the number of the disc containing the media represented by the current instance in the
boxed set. For a series, this represents the season number.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

#### Inherited from

CombinedTag.disc

___

### discCount

• `get` **discCount**(): `number`

Gets the number of discs or seasons in the boxed set containing the media represented by the
current instance.

**`inheritdoc`**

#### Returns

`number`

#### Inherited from

CombinedTag.discCount

• `set` **discCount**(`val`): `void`

Gets the number of discs or seasons in the boxed set containing the media represented by the
current instance.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

#### Inherited from

CombinedTag.discCount

___

### firstAlbumArtist

• `get` **firstAlbumArtist**(): `string`

Gets the first value contained in [albumArtists](OggTag.md#albumartists).

#### Returns

`string`

#### Inherited from

CombinedTag.firstAlbumArtist

___

### firstAlbumArtistSort

• `get` **firstAlbumArtistSort**(): `string`

Gets the first value contained in [albumArtistsSort](OggTag.md#albumartistssort)

#### Returns

`string`

#### Inherited from

CombinedTag.firstAlbumArtistSort

___

### firstComposer

• `get` **firstComposer**(): `string`

Gets the first value contained in [composers](OggTag.md#composers)

#### Returns

`string`

#### Inherited from

CombinedTag.firstComposer

___

### firstComposerSort

• `get` **firstComposerSort**(): `string`

Gets the first value contained in [composersSort](OggTag.md#composerssort)

#### Returns

`string`

#### Inherited from

CombinedTag.firstComposerSort

___

### firstGenre

• `get` **firstGenre**(): `string`

Gets the first value contained in [genres](OggTag.md#genres)

#### Returns

`string`

#### Inherited from

CombinedTag.firstGenre

___

### firstPerformer

• `get` **firstPerformer**(): `string`

Gets the first value contained in [performers](OggTag.md#performers)

#### Returns

`string`

#### Inherited from

CombinedTag.firstPerformer

___

### firstPerformerSort

• `get` **firstPerformerSort**(): `string`

Gets the first value contained in [performersSort](OggTag.md#performerssort)

#### Returns

`string`

#### Inherited from

CombinedTag.firstPerformerSort

___

### genres

• `get` **genres**(): `string`[]

Gets the genres of the media represented by the current instance.

**`inheritdoc`**

#### Returns

`string`[]

#### Inherited from

CombinedTag.genres

• `set` **genres**(`val`): `void`

Gets the genres of the media represented by the current instance.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string`[] |

#### Returns

`void`

#### Inherited from

CombinedTag.genres

___

### grouping

• `get` **grouping**(): `string`

Gets the grouping on the album which the media in the current instance belongs to.

**`inheritdoc`**

#### Returns

`string`

#### Inherited from

CombinedTag.grouping

• `set` **grouping**(`val`): `void`

Gets the grouping on the album which the media in the current instance belongs to.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Inherited from

CombinedTag.grouping

___

### initialKey

• `get` **initialKey**(): `string`

Gets the initial key of the track.

**`inheritdoc`**

#### Returns

`string`

#### Inherited from

CombinedTag.initialKey

• `set` **initialKey**(`val`): `void`

Gets the initial key of the track.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Inherited from

CombinedTag.initialKey

___

### isCompilation

• `get` **isCompilation**(): `boolean`

Gets whether or not the album described by the current instance is a compilation.

**`inheritdoc`**

#### Returns

`boolean`

#### Inherited from

CombinedTag.isCompilation

• `set` **isCompilation**(`val`): `void`

Gets whether or not the album described by the current instance is a compilation.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `boolean` |

#### Returns

`void`

#### Inherited from

CombinedTag.isCompilation

___

### isEmpty

• `get` **isEmpty**(): `boolean`

Gets whether or not the current instance is empty.

**`inheritdoc`**

#### Returns

`boolean`

#### Inherited from

CombinedTag.isEmpty

___

### isrc

• `get` **isrc**(): `string`

Gets the ISRC (International Standard Recording Code) of the track.

**`inheritdoc`**

#### Returns

`string`

#### Inherited from

CombinedTag.isrc

• `set` **isrc**(`val`): `void`

Gets the ISRC (International Standard Recording Code) of the track.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Inherited from

CombinedTag.isrc

___

### joinedAlbumArtists

• `get` **joinedAlbumArtists**(): `string`

Gets a semicolon and space separated string containing the values in [albumArtists](OggTag.md#albumartists)

#### Returns

`string`

#### Inherited from

CombinedTag.joinedAlbumArtists

___

### joinedComposers

• `get` **joinedComposers**(): `string`

Gets a semicolon and space separated string containing the values in [composers](OggTag.md#composers)

#### Returns

`string`

#### Inherited from

CombinedTag.joinedComposers

___

### joinedGenres

• `get` **joinedGenres**(): `string`

Gets a semicolon and space separated string containing the values in [genres](OggTag.md#genres)

#### Returns

`string`

#### Inherited from

CombinedTag.joinedGenres

___

### joinedPerformers

• `get` **joinedPerformers**(): `string`

Gets a semicolon and space separated string containing the values in [performers](OggTag.md#performers)

#### Returns

`string`

#### Inherited from

CombinedTag.joinedPerformers

___

### joinedPerformersSort

• `get` **joinedPerformersSort**(): `string`

Gets a semicolon and space separated string containing the values in [performersSort](OggTag.md#performerssort)

#### Returns

`string`

#### Inherited from

CombinedTag.joinedPerformersSort

___

### lyrics

• `get` **lyrics**(): `string`

Gets the lyrics or script of the media represented by the current instance.

**`inheritdoc`**

#### Returns

`string`

#### Inherited from

CombinedTag.lyrics

• `set` **lyrics**(`val`): `void`

Gets the lyrics or script of the media represented by the current instance.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Inherited from

CombinedTag.lyrics

___

### musicBrainzArtistId

• `get` **musicBrainzArtistId**(): `string`

Gets the MusicBrainz artist ID of the media represented by the current instance.

**`inheritdoc`**

#### Returns

`string`

#### Inherited from

CombinedTag.musicBrainzArtistId

• `set` **musicBrainzArtistId**(`val`): `void`

Gets the MusicBrainz artist ID of the media represented by the current instance.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Inherited from

CombinedTag.musicBrainzArtistId

___

### musicBrainzDiscId

• `get` **musicBrainzDiscId**(): `string`

Gets the MusicBrainz disc ID of the media represented by the current instance.

**`inheritdoc`**

#### Returns

`string`

#### Inherited from

CombinedTag.musicBrainzDiscId

• `set` **musicBrainzDiscId**(`val`): `void`

Gets the MusicBrainz disc ID of the media represented by the current instance.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Inherited from

CombinedTag.musicBrainzDiscId

___

### musicBrainzReleaseArtistId

• `get` **musicBrainzReleaseArtistId**(): `string`

Gets the MusicBrainz release artist ID of the media represented by the current instance.

**`inheritdoc`**

#### Returns

`string`

#### Inherited from

CombinedTag.musicBrainzReleaseArtistId

• `set` **musicBrainzReleaseArtistId**(`val`): `void`

Gets the MusicBrainz release artist ID of the media represented by the current instance.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Inherited from

CombinedTag.musicBrainzReleaseArtistId

___

### musicBrainzReleaseCountry

• `get` **musicBrainzReleaseCountry**(): `string`

Gets the MusicBrainz release country of the media represented by the current instance.

**`inheritdoc`**

#### Returns

`string`

#### Inherited from

CombinedTag.musicBrainzReleaseCountry

• `set` **musicBrainzReleaseCountry**(`val`): `void`

Gets the MusicBrainz release country of the media represented by the current instance.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Inherited from

CombinedTag.musicBrainzReleaseCountry

___

### musicBrainzReleaseGroupId

• `get` **musicBrainzReleaseGroupId**(): `string`

Gets the MusicBrainz release group ID of the media represented by the current instance.

**`inheritdoc`**

#### Returns

`string`

#### Inherited from

CombinedTag.musicBrainzReleaseGroupId

• `set` **musicBrainzReleaseGroupId**(`val`): `void`

Gets the MusicBrainz release group ID of the media represented by the current instance.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Inherited from

CombinedTag.musicBrainzReleaseGroupId

___

### musicBrainzReleaseId

• `get` **musicBrainzReleaseId**(): `string`

Gets the MusicBrainz release ID of the media represented by the current instance.

**`inheritdoc`**

#### Returns

`string`

#### Inherited from

CombinedTag.musicBrainzReleaseId

• `set` **musicBrainzReleaseId**(`val`): `void`

Gets the MusicBrainz release ID of the media represented by the current instance.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Inherited from

CombinedTag.musicBrainzReleaseId

___

### musicBrainzReleaseStatus

• `get` **musicBrainzReleaseStatus**(): `string`

Gets the MusicBrainz release status of the media represented by the current instance.

**`inheritdoc`**

#### Returns

`string`

#### Inherited from

CombinedTag.musicBrainzReleaseStatus

• `set` **musicBrainzReleaseStatus**(`val`): `void`

Gets the MusicBrainz release status of the media represented by the current instance.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Inherited from

CombinedTag.musicBrainzReleaseStatus

___

### musicBrainzReleaseType

• `get` **musicBrainzReleaseType**(): `string`

Gets the MusicBrainz release type of the media represented by the current instance.

**`inheritdoc`**

#### Returns

`string`

#### Inherited from

CombinedTag.musicBrainzReleaseType

• `set` **musicBrainzReleaseType**(`val`): `void`

Gets the MusicBrainz release type of the media represented by the current instance.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Inherited from

CombinedTag.musicBrainzReleaseType

___

### musicBrainzTrackId

• `get` **musicBrainzTrackId**(): `string`

Gets the MusicBrainz track ID of the media represented by the media represented by the
current instance.

**`inheritdoc`**

#### Returns

`string`

#### Inherited from

CombinedTag.musicBrainzTrackId

• `set` **musicBrainzTrackId**(`val`): `void`

Gets the MusicBrainz track ID of the media represented by the media represented by the
current instance.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Inherited from

CombinedTag.musicBrainzTrackId

___

### musicIpId

• `get` **musicIpId**(): `string`

Gets the MusicIP PUID of the media represented by the current instance.

**`inheritdoc`**

#### Returns

`string`

#### Inherited from

CombinedTag.musicIpId

• `set` **musicIpId**(`val`): `void`

Gets the MusicIP PUID of the media represented by the current instance.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Inherited from

CombinedTag.musicIpId

___

### performers

• `get` **performers**(): `string`[]

Gets the performers or artists who performed in the media described by the current instance.

**`inheritdoc`**

#### Returns

`string`[]

#### Inherited from

CombinedTag.performers

• `set` **performers**(`val`): `void`

Gets the performers or artists who performed in the media described by the current instance.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string`[] |

#### Returns

`void`

#### Inherited from

CombinedTag.performers

___

### performersRole

• `get` **performersRole**(): `string`[]

Gets the characters portrayed by an actor for a video or instruments played by a musician
for music. This must match the [performers](OggTag.md#performers) array (for each person, correspond one/more
role). Several roles for the same artist/actor can be separated with semicolons. For
example: "Bass; Backing Vocals; Vibraphone".

**`inheritdoc`**

#### Returns

`string`[]

#### Inherited from

CombinedTag.performersRole

• `set` **performersRole**(`val`): `void`

Gets the characters portrayed by an actor for a video or instruments played by a musician
for music. This must match the [performers](OggTag.md#performers) array (for each person, correspond one/more
role). Several roles for the same artist/actor can be separated with semicolons. For
example: "Bass; Backing Vocals; Vibraphone".

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string`[] |

#### Returns

`void`

#### Inherited from

CombinedTag.performersRole

___

### performersSort

• `get` **performersSort**(): `string`[]

Gets the sortable names of the performers or artists who performed in the media described by
the current instance.

**`inheritdoc`**

#### Returns

`string`[]

#### Inherited from

CombinedTag.performersSort

• `set` **performersSort**(`val`): `void`

Gets the sortable names of the performers or artists who performed in the media described by
the current instance.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string`[] |

#### Returns

`void`

#### Inherited from

CombinedTag.performersSort

___

### pictures

• `get` **pictures**(): [`IPicture`](../interfaces/IPicture.md)[]

Gets a collection of pictures associated with the media represented by the current instance.

**`inheritdoc`**

#### Returns

[`IPicture`](../interfaces/IPicture.md)[]

#### Inherited from

CombinedTag.pictures

• `set` **pictures**(`val`): `void`

Gets a collection of pictures associated with the media represented by the current instance.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | [`IPicture`](../interfaces/IPicture.md)[] |

#### Returns

`void`

#### Inherited from

CombinedTag.pictures

___

### publisher

• `get` **publisher**(): `string`

Gets the publisher of the track.

**`inheritdoc`**

#### Returns

`string`

#### Inherited from

CombinedTag.publisher

• `set` **publisher**(`val`): `void`

Gets the publisher of the track.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Inherited from

CombinedTag.publisher

___

### remixedBy

• `get` **remixedBy**(): `string`

Gets the remixer of the track.

**`inheritdoc`**

#### Returns

`string`

#### Inherited from

CombinedTag.remixedBy

• `set` **remixedBy**(`val`): `void`

Gets the remixer of the track.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Inherited from

CombinedTag.remixedBy

___

### replayGainAlbumGain

• `get` **replayGainAlbumGain**(): `number`

Gets the ReplayGain album gain in dB.

**`inheritdoc`**

#### Returns

`number`

#### Inherited from

CombinedTag.replayGainAlbumGain

• `set` **replayGainAlbumGain**(`val`): `void`

Gets the ReplayGain album gain in dB.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

#### Inherited from

CombinedTag.replayGainAlbumGain

___

### replayGainAlbumPeak

• `get` **replayGainAlbumPeak**(): `number`

Gets the ReplayGain album peak sample.

**`inheritdoc`**

#### Returns

`number`

#### Inherited from

CombinedTag.replayGainAlbumPeak

• `set` **replayGainAlbumPeak**(`val`): `void`

Gets the ReplayGain album peak sample.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

#### Inherited from

CombinedTag.replayGainAlbumPeak

___

### replayGainTrackGain

• `get` **replayGainTrackGain**(): `number`

Gets the ReplayGain track gain in dB.

**`inheritdoc`**

#### Returns

`number`

#### Inherited from

CombinedTag.replayGainTrackGain

• `set` **replayGainTrackGain**(`val`): `void`

Gets the ReplayGain track gain in dB.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

#### Inherited from

CombinedTag.replayGainTrackGain

___

### replayGainTrackPeak

• `get` **replayGainTrackPeak**(): `number`

Gets the ReplayGain track peak sample.

**`inheritdoc`**

#### Returns

`number`

#### Inherited from

CombinedTag.replayGainTrackPeak

• `set` **replayGainTrackPeak**(`val`): `void`

Gets the ReplayGain track peak sample.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

#### Inherited from

CombinedTag.replayGainTrackPeak

___

### serialNumbers

• `get` **serialNumbers**(): `number`[]

Gets the list of stream serial numbers that have comments associated with them.

**`remarks`** Modifying this array makes no changes to the file. Use [setComment](OggTag.md#setcomment).

#### Returns

`number`[]

___

### sizeOnDisk

• `get` **sizeOnDisk**(): `number`

Gets the size of the tag in bytes on disk as it was read from disk.

**`inheritdoc`**

#### Returns

`number`

#### Overrides

CombinedTag.sizeOnDisk

___

### subtitle

• `get` **subtitle**(): `string`

Gets a description, one-line. It represents the tagline of the vide/music.

**`inheritdoc`**

#### Returns

`string`

#### Inherited from

CombinedTag.subtitle

• `set` **subtitle**(`val`): `void`

Gets a description, one-line. It represents the tagline of the vide/music.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Inherited from

CombinedTag.subtitle

___

### supportedTagTypes

• `get` **supportedTagTypes**(): [`TagTypes`](../enums/TagTypes.md)

Gets the types of tags that are supported by this instance of a combined tag. Only these tag
types can be added to the instance.

#### Returns

[`TagTypes`](../enums/TagTypes.md)

#### Inherited from

CombinedTag.supportedTagTypes

___

### tagTypes

• `get` **tagTypes**(): [`TagTypes`](../enums/TagTypes.md)

Gets the tag types contained in the current instance. A bit wise combined [TagTypes](../enums/TagTypes.md)
containing the tag types contained in the current instance.

**`inheritdoc`**

#### Returns

[`TagTypes`](../enums/TagTypes.md)

#### Inherited from

CombinedTag.tagTypes

___

### tags

• `get` **tags**(): [`Tag`](Tag.md)[]

Gets all tags contained within the current instance. If the tags within this tag are also
[CombinedTag](CombinedTag.md)s, the retrieval will recurse and return a flat list of nested tags.

**`remarks`** Modifications of the returned array will not be retained.

#### Returns

[`Tag`](Tag.md)[]

#### Inherited from

CombinedTag.tags

___

### title

• `get` **title**(): `string`

Gets the title for the media described by the current instance.

**`inheritdoc`**

#### Returns

`string`

#### Inherited from

CombinedTag.title

• `set` **title**(`val`): `void`

Gets the title for the media described by the current instance.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Inherited from

CombinedTag.title

___

### titleSort

• `get` **titleSort**(): `string`

Gets the sortable name for the title of the media described by the current instance.

**`inheritdoc`**

#### Returns

`string`

#### Inherited from

CombinedTag.titleSort

• `set` **titleSort**(`val`): `void`

Gets the sortable name for the title of the media described by the current instance.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Inherited from

CombinedTag.titleSort

___

### track

• `get` **track**(): `number`

Gets the position of the media represented by the current instance in its containing album
or season (for a series).

**`inheritdoc`**

#### Returns

`number`

#### Inherited from

CombinedTag.track

• `set` **track**(`val`): `void`

Gets the position of the media represented by the current instance in its containing album
or season (for a series).

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

#### Inherited from

CombinedTag.track

___

### trackCount

• `get` **trackCount**(): `number`

Gets the number of tracks in the album or the number of episodes in a series of the media
represented by the current instance.

**`inheritdoc`**

#### Returns

`number`

#### Inherited from

CombinedTag.trackCount

• `set` **trackCount**(`val`): `void`

Gets the number of tracks in the album or the number of episodes in a series of the media
represented by the current instance.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

#### Inherited from

CombinedTag.trackCount

___

### year

• `get` **year**(): `number`

Gets the year that the media represented by the current instance was recorded.

**`inheritdoc`**

#### Returns

`number`

#### Inherited from

CombinedTag.year

• `set` **year**(`val`): `void`

Gets the year that the media represented by the current instance was recorded.

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

#### Inherited from

CombinedTag.year

## Methods

### addTag

▸ `Protected` **addTag**(`tag`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | [`Tag`](Tag.md) |

#### Returns

`void`

#### Inherited from

[CombinedTag](CombinedTag.md).[addTag](CombinedTag.md#addtag)

___

### clear

▸ **clear**(): `void`

Clears all values stored in the current instance.

**`remarks`** The clearing procedure is format specific and should clear all values.

#### Returns

`void`

#### Inherited from

[CombinedTag](CombinedTag.md).[clear](CombinedTag.md#clear)

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

[CombinedTag](CombinedTag.md).[copyTo](CombinedTag.md#copyto)

___

### createTag

▸ **createTag**(): [`Tag`](Tag.md)

Creates a new instance of the desired tag type and adds it to the current instance. If the
tag type is unsupported in the current context or the tag type already exists, an error will
be thrown.

**`remarks`** Tags cannot be added or removed from Ogg files. This will always throw.

#### Returns

[`Tag`](Tag.md)

Tag The newly created tag

#### Overrides

[CombinedTag](CombinedTag.md).[createTag](CombinedTag.md#createtag)

___

### getComment

▸ **getComment**(`streamSerialNumber`): [`XiphComment`](XiphComment.md)

Retrieves a Xiph comment for a given stream.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `streamSerialNumber` | `number` | Serial number of the stream that contains the desired comment.     Must be a positive 32-bit integer. |

#### Returns

[`XiphComment`](XiphComment.md)

XiphComment Xiph comment of the provided stream is returned if it exists, otherwise
    `undefined` is returned.

___

### getTag

▸ **getTag**<`TTag`\>(`tagType`): `TTag`

Gets a tag of the specified tag type if a matching tag exists in the current instance.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TTag` | extends [`Tag`](Tag.md)<`TTag`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tagType` | [`TagTypes`](../enums/TagTypes.md) | Type of tag to retrieve |

#### Returns

`TTag`

Tag Tag with specified type, if it exists. `undefined` otherwise.

#### Inherited from

[CombinedTag](CombinedTag.md).[getTag](CombinedTag.md#gettag)

___

### removeTags

▸ **removeTags**(): `void`

Remove all tags that match the specified tagTypes. This is performed recursively. Any nested
`CombinedTag` instances are left in place.

**`remarks`** Tags cannot be added or removed from Ogg files. This will do nothing.

#### Returns

`void`

#### Overrides

[CombinedTag](CombinedTag.md).[removeTags](CombinedTag.md#removetags)

___

### replaceTag

▸ `Protected` **replaceTag**(`oldTag`, `newTag`): `void`

This is used for special cases where the order of tags is important.

#### Parameters

| Name | Type |
| :------ | :------ |
| `oldTag` | [`Tag`](Tag.md) |
| `newTag` | [`Tag`](Tag.md) |

#### Returns

`void`

#### Inherited from

[CombinedTag](CombinedTag.md).[replaceTag](CombinedTag.md#replacetag)

___

### setComment

▸ **setComment**(`streamSerialNumber`, `comment`): `void`

Stores or removes a Xiph comment in a given stream.

**`remarks`** As per Ogg spec, each stream must have a Xiph comment header. Therefore, comments
    cannot be set to a falsy value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `streamSerialNumber` | `number` | Serial number of the stream in which to store the comment. Must be     a positive 32-bit integer |
| `comment` | [`XiphComment`](XiphComment.md) | Xiph comment to store in the stream. Use `undefined` to clear the comment     from the stream |

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

[CombinedTag](CombinedTag.md).[setInfoTag](CombinedTag.md#setinfotag)

___

### validateTagCreation

▸ `Protected` **validateTagCreation**(`tagType`): `void`

Verifies if a tag can be added to the current instance. The criteria for validation are:
* A tag of the given tag type does not already exist
* The given tag type is supported by the current instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tagType` | [`TagTypes`](../enums/TagTypes.md) | Tag type that the caller wants to create |

#### Returns

`void`

#### Inherited from

[CombinedTag](CombinedTag.md).[validateTagCreation](CombinedTag.md#validatetagcreation)

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

[CombinedTag](CombinedTag.md).[firstInGroup](CombinedTag.md#firstingroup)

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

[CombinedTag](CombinedTag.md).[isFalsyOrLikeEmpty](CombinedTag.md#isfalsyorlikeempty)

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

[CombinedTag](CombinedTag.md).[joinGroup](CombinedTag.md#joingroup)

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

[CombinedTag](CombinedTag.md).[tagTypeFlagsToArray](CombinedTag.md#tagtypeflagstoarray)
