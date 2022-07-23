[node-taglib-sharp](../README.md) / [Exports](../modules.md) / FlacTag

# Class: FlacTag

Collection of tags that can be stored in a FLAC file.

**`remarks`** The FLAC file specification states that tagging should be done via a XIPH comment block
    and any pictures should be stored in a FLAC picture block. However, tagging can be done via
    ID3 and APE tags at the beginning or end of the file, same as MP3 and other files. This
    class provides a unified access into all the tags a FLAC file may contain.

## Hierarchy

- [`CombinedTag`](CombinedTag.md)

  ↳ **`FlacTag`**

## Table of contents

### Constructors

- [constructor](FlacTag.md#constructor)

### Accessors

- [album](FlacTag.md#album)
- [albumArtists](FlacTag.md#albumartists)
- [albumArtistsSort](FlacTag.md#albumartistssort)
- [albumSort](FlacTag.md#albumsort)
- [amazonId](FlacTag.md#amazonid)
- [beatsPerMinute](FlacTag.md#beatsperminute)
- [comment](FlacTag.md#comment)
- [composers](FlacTag.md#composers)
- [composersSort](FlacTag.md#composerssort)
- [conductor](FlacTag.md#conductor)
- [copyright](FlacTag.md#copyright)
- [dateTagged](FlacTag.md#datetagged)
- [description](FlacTag.md#description)
- [disc](FlacTag.md#disc)
- [discCount](FlacTag.md#disccount)
- [endTag](FlacTag.md#endtag)
- [firstAlbumArtist](FlacTag.md#firstalbumartist)
- [firstAlbumArtistSort](FlacTag.md#firstalbumartistsort)
- [firstComposer](FlacTag.md#firstcomposer)
- [firstComposerSort](FlacTag.md#firstcomposersort)
- [firstGenre](FlacTag.md#firstgenre)
- [firstPerformer](FlacTag.md#firstperformer)
- [firstPerformerSort](FlacTag.md#firstperformersort)
- [genres](FlacTag.md#genres)
- [grouping](FlacTag.md#grouping)
- [initialKey](FlacTag.md#initialkey)
- [isCompilation](FlacTag.md#iscompilation)
- [isEmpty](FlacTag.md#isempty)
- [isrc](FlacTag.md#isrc)
- [joinedAlbumArtists](FlacTag.md#joinedalbumartists)
- [joinedComposers](FlacTag.md#joinedcomposers)
- [joinedGenres](FlacTag.md#joinedgenres)
- [joinedPerformers](FlacTag.md#joinedperformers)
- [joinedPerformersSort](FlacTag.md#joinedperformerssort)
- [lyrics](FlacTag.md#lyrics)
- [musicBrainzArtistId](FlacTag.md#musicbrainzartistid)
- [musicBrainzDiscId](FlacTag.md#musicbrainzdiscid)
- [musicBrainzReleaseArtistId](FlacTag.md#musicbrainzreleaseartistid)
- [musicBrainzReleaseCountry](FlacTag.md#musicbrainzreleasecountry)
- [musicBrainzReleaseGroupId](FlacTag.md#musicbrainzreleasegroupid)
- [musicBrainzReleaseId](FlacTag.md#musicbrainzreleaseid)
- [musicBrainzReleaseStatus](FlacTag.md#musicbrainzreleasestatus)
- [musicBrainzReleaseType](FlacTag.md#musicbrainzreleasetype)
- [musicBrainzTrackId](FlacTag.md#musicbrainztrackid)
- [musicIpId](FlacTag.md#musicipid)
- [performers](FlacTag.md#performers)
- [performersRole](FlacTag.md#performersrole)
- [performersSort](FlacTag.md#performerssort)
- [pictures](FlacTag.md#pictures)
- [publisher](FlacTag.md#publisher)
- [remixedBy](FlacTag.md#remixedby)
- [replayGainAlbumGain](FlacTag.md#replaygainalbumgain)
- [replayGainAlbumPeak](FlacTag.md#replaygainalbumpeak)
- [replayGainTrackGain](FlacTag.md#replaygaintrackgain)
- [replayGainTrackPeak](FlacTag.md#replaygaintrackpeak)
- [sizeOnDisk](FlacTag.md#sizeondisk)
- [startTag](FlacTag.md#starttag)
- [subtitle](FlacTag.md#subtitle)
- [supportedTagTypes](FlacTag.md#supportedtagtypes)
- [tagTypes](FlacTag.md#tagtypes)
- [tags](FlacTag.md#tags)
- [title](FlacTag.md#title)
- [titleSort](FlacTag.md#titlesort)
- [track](FlacTag.md#track)
- [trackCount](FlacTag.md#trackcount)
- [xiphComment](FlacTag.md#xiphcomment)
- [year](FlacTag.md#year)

### Methods

- [addTag](FlacTag.md#addtag)
- [clear](FlacTag.md#clear)
- [copyTo](FlacTag.md#copyto)
- [createTag](FlacTag.md#createtag)
- [getTag](FlacTag.md#gettag)
- [removeTags](FlacTag.md#removetags)
- [replaceTag](FlacTag.md#replacetag)
- [setInfoTag](FlacTag.md#setinfotag)
- [validateTagCreation](FlacTag.md#validatetagcreation)
- [firstInGroup](FlacTag.md#firstingroup)
- [isFalsyOrLikeEmpty](FlacTag.md#isfalsyorlikeempty)
- [joinGroup](FlacTag.md#joingroup)
- [tagTypeFlagsToArray](FlacTag.md#tagtypeflagstoarray)

## Constructors

### constructor

• **new FlacTag**(`startTag`, `endTag`, `xiphTag`, `flacPictures`)

Constructs and initializes a new FLAC tag using the component tags provided.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `startTag` | `default` | Required, collection of tags at the start of the file |
| `endTag` | `default` | Required, collection of tags at the end of the file |
| `xiphTag` | [`XiphComment`](XiphComment.md) | Optional, Xiph comment tag from the FLAC file |
| `flacPictures` | [`XiphPicture`](XiphPicture.md)[] | Optional, array of pictures found in the file |

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

### endTag

• `get` **endTag**(): `default`

Gets the collection of tags appearing at the end of the file.

#### Returns

`default`

___

### firstAlbumArtist

• `get` **firstAlbumArtist**(): `string`

Gets the first value contained in [albumArtists](FlacTag.md#albumartists).

#### Returns

`string`

#### Inherited from

CombinedTag.firstAlbumArtist

___

### firstAlbumArtistSort

• `get` **firstAlbumArtistSort**(): `string`

Gets the first value contained in [albumArtistsSort](FlacTag.md#albumartistssort)

#### Returns

`string`

#### Inherited from

CombinedTag.firstAlbumArtistSort

___

### firstComposer

• `get` **firstComposer**(): `string`

Gets the first value contained in [composers](FlacTag.md#composers)

#### Returns

`string`

#### Inherited from

CombinedTag.firstComposer

___

### firstComposerSort

• `get` **firstComposerSort**(): `string`

Gets the first value contained in [composersSort](FlacTag.md#composerssort)

#### Returns

`string`

#### Inherited from

CombinedTag.firstComposerSort

___

### firstGenre

• `get` **firstGenre**(): `string`

Gets the first value contained in [genres](FlacTag.md#genres)

#### Returns

`string`

#### Inherited from

CombinedTag.firstGenre

___

### firstPerformer

• `get` **firstPerformer**(): `string`

Gets the first value contained in [performers](FlacTag.md#performers)

#### Returns

`string`

#### Inherited from

CombinedTag.firstPerformer

___

### firstPerformerSort

• `get` **firstPerformerSort**(): `string`

Gets the first value contained in [performersSort](FlacTag.md#performerssort)

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

Gets a semicolon and space separated string containing the values in [albumArtists](FlacTag.md#albumartists)

#### Returns

`string`

#### Inherited from

CombinedTag.joinedAlbumArtists

___

### joinedComposers

• `get` **joinedComposers**(): `string`

Gets a semicolon and space separated string containing the values in [composers](FlacTag.md#composers)

#### Returns

`string`

#### Inherited from

CombinedTag.joinedComposers

___

### joinedGenres

• `get` **joinedGenres**(): `string`

Gets a semicolon and space separated string containing the values in [genres](FlacTag.md#genres)

#### Returns

`string`

#### Inherited from

CombinedTag.joinedGenres

___

### joinedPerformers

• `get` **joinedPerformers**(): `string`

Gets a semicolon and space separated string containing the values in [performers](FlacTag.md#performers)

#### Returns

`string`

#### Inherited from

CombinedTag.joinedPerformers

___

### joinedPerformersSort

• `get` **joinedPerformersSort**(): `string`

Gets a semicolon and space separated string containing the values in [performersSort](FlacTag.md#performerssort)

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
for music. This must match the [performers](FlacTag.md#performers) array (for each person, correspond one/more
role). Several roles for the same artist/actor can be separated with semicolons. For
example: "Bass; Backing Vocals; Vibraphone".

**`inheritdoc`**

#### Returns

`string`[]

#### Inherited from

CombinedTag.performersRole

• `set` **performersRole**(`val`): `void`

Gets the characters portrayed by an actor for a video or instruments played by a musician
for music. This must match the [performers](FlacTag.md#performers) array (for each person, correspond one/more
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
For FLAC files, FLAC-style pictures are preferentially returned. If those don't exist the
pictures that are stored in the

#### Returns

[`IPicture`](../interfaces/IPicture.md)[]

#### Overrides

CombinedTag.pictures

• `set` **pictures**(`value`): `void`

Gets a collection of pictures associated with the media represented by the current instance.

**`inheritdoc`**
For FLAC files, pictures are preferentially stored in FLAC-style picture blocks.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`IPicture`](../interfaces/IPicture.md)[] |

#### Returns

`void`

#### Overrides

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

### sizeOnDisk

• `get` **sizeOnDisk**(): `number`

Gets the size of the tag in bytes on disk as it was read from disk.

**`inheritdoc`**

**`remarks`** Note that tags may not appear contiguously in a file. Access the [tags](FlacTag.md#tags)
    contained in this object to see the size of each tag on the disk.

#### Returns

`number`

#### Inherited from

CombinedTag.sizeOnDisk

___

### startTag

• `get` **startTag**(): `default`

Gets the collection of tags appearing at the start of the file.

#### Returns

`default`

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

**`remarks`** For a standard tag, the value should be intuitive. For example, Id3v2Tag objects have
    a value of [TagTypes.Id3v2](../enums/TagTypes.md#id3v2). However, for CombinedTag type objects, they may
    contain multiple or no types.

#### Returns

[`TagTypes`](../enums/TagTypes.md)

#### Overrides

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

### xiphComment

• `get` **xiphComment**(): [`XiphComment`](XiphComment.md)

Gets the Xiph comment that is stored in the current instance.

#### Returns

[`XiphComment`](XiphComment.md)

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

#### Overrides

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

▸ **createTag**(`tagType`, `copy`): [`Tag`](Tag.md)

Creates a new instance of the desired tag type and adds it to the current instance. If the
tag type is unsupported in the current context or the tag type already exists, an error will
be thrown.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tagType` | [`TagTypes`](../enums/TagTypes.md) | Type of tag to create |
| `copy` | `boolean` | Whether or not to copy the contents of the current instance to the newly created     tag instance |

#### Returns

[`Tag`](Tag.md)

Tag The newly created tag

#### Overrides

[CombinedTag](CombinedTag.md).[createTag](CombinedTag.md#createtag)

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

▸ **removeTags**(`tagTypes`): `void`

Remove all tags that match the specified tagTypes. This is performed recursively. Any nested
`CombinedTag` instances are left in place.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tagTypes` | [`TagTypes`](../enums/TagTypes.md) | Types of tags to remove |

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
