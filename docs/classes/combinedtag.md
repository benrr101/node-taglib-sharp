[node-taglib-sharp](../README.md) / [Exports](../modules.md) / CombinedTag

# Class: CombinedTag

## Hierarchy

- [`Tag`](tag.md)

  ↳ **`CombinedTag`**

## Table of contents

### Constructors

- [constructor](combinedtag.md#constructor)

### Properties

- [\_tags](combinedtag.md#_tags)

### Accessors

- [album](combinedtag.md#album)
- [albumArtists](combinedtag.md#albumartists)
- [albumArtistsSort](combinedtag.md#albumartistssort)
- [albumSort](combinedtag.md#albumsort)
- [amazonId](combinedtag.md#amazonid)
- [beatsPerMinute](combinedtag.md#beatsperminute)
- [comment](combinedtag.md#comment)
- [composers](combinedtag.md#composers)
- [composersSort](combinedtag.md#composerssort)
- [conductor](combinedtag.md#conductor)
- [copyright](combinedtag.md#copyright)
- [dateTagged](combinedtag.md#datetagged)
- [description](combinedtag.md#description)
- [disc](combinedtag.md#disc)
- [discCount](combinedtag.md#disccount)
- [firstAlbumArtist](combinedtag.md#firstalbumartist)
- [firstAlbumArtistSort](combinedtag.md#firstalbumartistsort)
- [firstComposer](combinedtag.md#firstcomposer)
- [firstComposerSort](combinedtag.md#firstcomposersort)
- [firstGenre](combinedtag.md#firstgenre)
- [firstPerformer](combinedtag.md#firstperformer)
- [firstPerformerSort](combinedtag.md#firstperformersort)
- [genres](combinedtag.md#genres)
- [grouping](combinedtag.md#grouping)
- [initialKey](combinedtag.md#initialkey)
- [isEmpty](combinedtag.md#isempty)
- [isrc](combinedtag.md#isrc)
- [joinedAlbumArtists](combinedtag.md#joinedalbumartists)
- [joinedComposers](combinedtag.md#joinedcomposers)
- [joinedGenres](combinedtag.md#joinedgenres)
- [joinedPerformers](combinedtag.md#joinedperformers)
- [joinedPerformersSort](combinedtag.md#joinedperformerssort)
- [lyrics](combinedtag.md#lyrics)
- [musicBrainzArtistId](combinedtag.md#musicbrainzartistid)
- [musicBrainzDiscId](combinedtag.md#musicbrainzdiscid)
- [musicBrainzReleaseArtistId](combinedtag.md#musicbrainzreleaseartistid)
- [musicBrainzReleaseCountry](combinedtag.md#musicbrainzreleasecountry)
- [musicBrainzReleaseGroupId](combinedtag.md#musicbrainzreleasegroupid)
- [musicBrainzReleaseId](combinedtag.md#musicbrainzreleaseid)
- [musicBrainzReleaseStatus](combinedtag.md#musicbrainzreleasestatus)
- [musicBrainzReleaseType](combinedtag.md#musicbrainzreleasetype)
- [musicBrainzTrackId](combinedtag.md#musicbrainztrackid)
- [musicIpId](combinedtag.md#musicipid)
- [performers](combinedtag.md#performers)
- [performersRole](combinedtag.md#performersrole)
- [performersSort](combinedtag.md#performerssort)
- [pictures](combinedtag.md#pictures)
- [publisher](combinedtag.md#publisher)
- [remixedBy](combinedtag.md#remixedby)
- [replayGainAlbumGain](combinedtag.md#replaygainalbumgain)
- [replayGainAlbumPeak](combinedtag.md#replaygainalbumpeak)
- [replayGainTrackGain](combinedtag.md#replaygaintrackgain)
- [replayGainTrackPeak](combinedtag.md#replaygaintrackpeak)
- [subtitle](combinedtag.md#subtitle)
- [tagTypes](combinedtag.md#tagtypes)
- [tags](combinedtag.md#tags)
- [title](combinedtag.md#title)
- [titleSort](combinedtag.md#titlesort)
- [track](combinedtag.md#track)
- [trackCount](combinedtag.md#trackcount)
- [year](combinedtag.md#year)

### Methods

- [addTagInternal](combinedtag.md#addtaginternal)
- [clear](combinedtag.md#clear)
- [clearTags](combinedtag.md#cleartags)
- [copyTo](combinedtag.md#copyto)
- [insertTag](combinedtag.md#inserttag)
- [removeTag](combinedtag.md#removetag)
- [setInfoTag](combinedtag.md#setinfotag)
- [setTags](combinedtag.md#settags)
- [firstInGroup](combinedtag.md#firstingroup)
- [isFalsyOrLikeEmpty](combinedtag.md#isfalsyorlikeempty)
- [joinGroup](combinedtag.md#joingroup)

## Constructors

### constructor

• **new CombinedTag**(`tags?`)

Constructs and initializes a new instance of [CombinedTag](combinedtag.md).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tags?` | [`Tag`](tag.md)[] | Optionally, a list of tags to combine in the new instance. |

#### Overrides

[Tag](tag.md).[constructor](tag.md#constructor)

## Properties

### \_tags

• `Protected` **\_tags**: [`Tag`](tag.md)[]

## Accessors

### album

• `get` **album**(): `string`

Gets the album title for the media described by the current instance.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

`string`

• `set` **album**(`val`): `void`

Sets the album title for the media described by the current instance.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

___

### albumArtists

• `get` **albumArtists**(): `string`[]

Gets the band or artist is credited in the creation of the entire album or collection
containing the media described by the current instance.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

`string`[]

• `set` **albumArtists**(`val`): `void`

Sets the band or artist is credited in the creation of the entire album or collection
containing the media described by the current instance.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string`[] |

#### Returns

`void`

___

### albumArtistsSort

• `get` **albumArtistsSort**(): `string`[]

Gets the band or artist is credited in the creation of the entire album or collection
containing the media described by the current instance.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

`string`[]

• `set` **albumArtistsSort**(`val`): `void`

Sets the band or artist is credited in the creation of the entire album or collection
containing the media described by the current instance.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string`[] |

#### Returns

`void`

___

### albumSort

• `get` **albumSort**(): `string`

Gets the album title for sorting the media described by the current instance.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

`string`

• `set` **albumSort**(`val`): `void`

Sets the album title for sorting the media described by the current instance.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

___

### amazonId

• `get` **amazonId**(): `string`

Gets the Amazon ID.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

`string`

• `set` **amazonId**(`val`): `void`

Sets the Amazon ID.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

___

### beatsPerMinute

• `get` **beatsPerMinute**(): `number`

Gets the number of beats per minute of the media represented by the current instance.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

`number`

• `set` **beatsPerMinute**(`val`): `void`

Sets the number of beats per minute of the media represented by the current instance. Must
be a positive integer positive integer.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

___

### comment

• `get` **comment**(): `string`

Gets a user comment for the media described by the current instance.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

`string`

• `set` **comment**(`val`): `void`

Sets a user comment for the media described by the current instance.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

___

### composers

• `get` **composers**(): `string`[]

Gets the composers of the media represented by the current instance.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

`string`[]

• `set` **composers**(`val`): `void`

Sets the composers of the media represented by the current instance.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string`[] |

#### Returns

`void`

___

### composersSort

• `get` **composersSort**(): `string`[]

Gets the composers of the media represented by the current instance.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

`string`[]

• `set` **composersSort**(`val`): `void`

Sets the composers of the media represented by the current instance.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string`[] |

#### Returns

`void`

___

### conductor

• `get` **conductor**(): `string`

Gets the conductor or director of the media represented by the current instance.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

`string`

• `set` **conductor**(`val`): `void`

Sets the conductor or director of the media represented by the current instance.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

___

### copyright

• `get` **copyright**(): `string`

Gets the copyright information of the media represented by the current instance.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

`string`

• `set` **copyright**(`val`): `void`

Sets the copyright information of the media represented by the current instance.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

___

### dateTagged

• `get` **dateTagged**(): `Date`

Gets the date at which the tag has been written.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

`Date`

• `set` **dateTagged**(`val`): `void`

Sets the date at which the tag has been written

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Date` |

#### Returns

`void`

___

### description

• `get` **description**(): `string`

Gets the description for the media described by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**`remarks`** This is especially relevant for a movie. For example, for "Back to the Future
    2", this could be "After visiting 2015, Marty McFly must repeat his visit to 1955 to
    prevent disastrous changes to 1985...without interfering with his first trip".

#### Returns

`string`

• `set` **description**(`val`): `void`

Sets the description for the media described by the current instance.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

___

### disc

• `get` **disc**(): `number`

Gets the number of the disc containing the media represented by the current instance in a
boxed set.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

`number`

• `set` **disc**(`val`): `void`

Sets the number of the disc containing the media represented by the current instance in a
boxed set. Must be a positive integer positive integer.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

___

### discCount

• `get` **discCount**(): `number`

Gets the number of the discs in the boxed set containing the media represented by the
current instance.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

`number`

• `set` **discCount**(`val`): `void`

Sets the number of the discs in the boxed set containing the media represented by the
current instance. Must be a positive integer positive integer.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

___

### firstAlbumArtist

• `get` **firstAlbumArtist**(): `string`

Gets the the first value contained in [albumArtists](combinedtag.md#albumartists).

#### Returns

`string`

___

### firstAlbumArtistSort

• `get` **firstAlbumArtistSort**(): `string`

Gets the first value contained in [albumArtistsSort](combinedtag.md#albumartistssort)

#### Returns

`string`

___

### firstComposer

• `get` **firstComposer**(): `string`

Gets the first value contained in [composers](combinedtag.md#composers)

#### Returns

`string`

___

### firstComposerSort

• `get` **firstComposerSort**(): `string`

Gets the first value contained in [composersSort](combinedtag.md#composerssort)

#### Returns

`string`

___

### firstGenre

• `get` **firstGenre**(): `string`

Gets the first value contained in [genres](combinedtag.md#genres)

#### Returns

`string`

___

### firstPerformer

• `get` **firstPerformer**(): `string`

Gets the first value contained in [performers](combinedtag.md#performers)

#### Returns

`string`

___

### firstPerformerSort

• `get` **firstPerformerSort**(): `string`

Gets the first value contained in [performersSort](combinedtag.md#performerssort)

#### Returns

`string`

___

### genres

• `get` **genres**(): `string`[]

Gets the album genres of the media represented by the current instance.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

`string`[]

• `set` **genres**(`val`): `void`

Sets the album genres of the media described by the current instance.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string`[] |

#### Returns

`void`

___

### grouping

• `get` **grouping**(): `string`

Gets the grouping on the album which the media in the current instance belongs to.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

`string`

• `set` **grouping**(`val`): `void`

Sets the grouping on the album which the media in the current instance belongs to.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

___

### initialKey

• `get` **initialKey**(): `string`

Gets the initial key of the media represented by the current instance.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

`string`

• `set` **initialKey**(`val`): `void`

Sets the initial key of the media represented by the current instance.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

___

### isEmpty

• `get` **isEmpty**(): `boolean`

Whether or not the current instance is empty. If all child tags are empty, `true` is
returned, `false` otherwise.

#### Returns

`boolean`

___

### isrc

• `get` **isrc**(): `string`

Gets the ISRC (International Standard Recording Code) of the media represented by the
current instance.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

`string`

• `set` **isrc**(`val`): `void`

Sets the ISRC (International Standard Recording Code) of the media represented by the
current instance.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

___

### joinedAlbumArtists

• `get` **joinedAlbumArtists**(): `string`

Gets a semicolon and space separated string containing the values in [albumArtists](combinedtag.md#albumartists)

#### Returns

`string`

___

### joinedComposers

• `get` **joinedComposers**(): `string`

Gets a semicolon and space separated string containing the values in [composers](combinedtag.md#composers)

#### Returns

`string`

___

### joinedGenres

• `get` **joinedGenres**(): `string`

Gets a semicolon and space separated string containing the values in [genres](combinedtag.md#genres)

#### Returns

`string`

___

### joinedPerformers

• `get` **joinedPerformers**(): `string`

Gets a semicolon and space separated string containing the values in [performers](combinedtag.md#performers)

#### Returns

`string`

___

### joinedPerformersSort

• `get` **joinedPerformersSort**(): `string`

Gets a semicolon and space separated string containing the values in [performersSort](combinedtag.md#performerssort)

#### Returns

`string`

___

### lyrics

• `get` **lyrics**(): `string`

Gets the lyrics or script of the media represented by the current instance.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

`string`

• `set` **lyrics**(`val`): `void`

Sets the lyrics or script of the media represented by the current instance.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

___

### musicBrainzArtistId

• `get` **musicBrainzArtistId**(): `string`

Gets the MusicBrainz artist ID.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

`string`

• `set` **musicBrainzArtistId**(`val`): `void`

Sets the MusicBrainz artist ID.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

___

### musicBrainzDiscId

• `get` **musicBrainzDiscId**(): `string`

Gets the MusicBrainz disc ID.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

`string`

• `set` **musicBrainzDiscId**(`val`): `void`

Sets the MusicBrainz disc ID.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

___

### musicBrainzReleaseArtistId

• `get` **musicBrainzReleaseArtistId**(): `string`

Gets the MusicBrainz release artist ID.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

`string`

• `set` **musicBrainzReleaseArtistId**(`val`): `void`

Sets the MusicBrainz release artist ID.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

___

### musicBrainzReleaseCountry

• `get` **musicBrainzReleaseCountry**(): `string`

Gets the MusicBrainz release country.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

`string`

• `set` **musicBrainzReleaseCountry**(`val`): `void`

Sets the MusicBrainz release country.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

___

### musicBrainzReleaseGroupId

• `get` **musicBrainzReleaseGroupId**(): `string`

Gets the MusicBrainz release group ID.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

`string`

• `set` **musicBrainzReleaseGroupId**(`val`): `void`

Sets the MusicBrainz release group ID.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

___

### musicBrainzReleaseId

• `get` **musicBrainzReleaseId**(): `string`

Gets the MusicBrainz release ID.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

`string`

• `set` **musicBrainzReleaseId**(`val`): `void`

Sets the MusicBrainz release ID.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

___

### musicBrainzReleaseStatus

• `get` **musicBrainzReleaseStatus**(): `string`

Gets the MusicBrainz release status.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

`string`

• `set` **musicBrainzReleaseStatus**(`val`): `void`

Sets the MusicBrainz release status.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

___

### musicBrainzReleaseType

• `get` **musicBrainzReleaseType**(): `string`

Gets the MusicBrainz release type.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

`string`

• `set` **musicBrainzReleaseType**(`val`): `void`

Sets the MusicBrainz release type.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

___

### musicBrainzTrackId

• `get` **musicBrainzTrackId**(): `string`

Gets the MusicBrainz track ID.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

`string`

• `set` **musicBrainzTrackId**(`val`): `void`

Sets the MusicBrainz track ID.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

___

### musicIpId

• `get` **musicIpId**(): `string`

Gets the MusicIP PUID.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

`string`

• `set` **musicIpId**(`val`): `void`

Sets the MusicIP PUID.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

___

### performers

• `get` **performers**(): `string`[]

Gets the performers or artists who performed in the media described by the current instance.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

`string`[]

• `set` **performers**(`val`): `void`

Sets the performers in the media described by the current instance.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string`[] |

#### Returns

`void`

___

### performersRole

• `get` **performersRole**(): `string`[]

Gets the characters for a video media, or instruments played for music media. This should
match the [performers](combinedtag.md#performers) array (for each person correspond one/more role). Several roles
for the same artist/actor can be made up with semicolons. For example, "Marty McFly; Marty
McFly Jr.; Marlene McFly".
Returns the first non-null/non-undefined value from the child tags.

**`remarks`** This is typically useful for movies, although the instrument played by each
    artist in a music file may be of relevance.
    It is highly important to match each role to the performers. This means that a role may
    be `null\undefined` to keep a match betweenInclusive performers[i] and performersRole[i].

#### Returns

`string`[]

• `set` **performersRole**(`val`): `void`

Sets the characters in a video media, or instruments played for music media.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string`[] |

#### Returns

`void`

___

### performersSort

• `get` **performersSort**(): `string`[]

Gets the performers or artists who performed in the media described by the current instance.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

`string`[]

• `set` **performersSort**(`val`): `void`

Sets the performers in the media described by the current instance.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string`[] |

#### Returns

`void`

___

### pictures

• `get` **pictures**(): [`IPicture`](../interfaces/ipicture.md)[]

Gets a collection of pictures associated with the media represented by the current instance.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

[`IPicture`](../interfaces/ipicture.md)[]

• `set` **pictures**(`val`): `void`

Sets the collection of pictures associated with the current media.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | [`IPicture`](../interfaces/ipicture.md)[] |

#### Returns

`void`

___

### publisher

• `get` **publisher**(): `string`

Gets the publisher of the media represented by the current instance.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

`string`

• `set` **publisher**(`val`): `void`

Sets the publisher of the media represented by the current instance.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

___

### remixedBy

• `get` **remixedBy**(): `string`

Gets the remixer of the media represented by the current instance.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

`string`

• `set` **remixedBy**(`val`): `void`

Sets the remixer of the media represented by the current instance.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

___

### replayGainAlbumGain

• `get` **replayGainAlbumGain**(): `number`

Gets the ReplayGain album gain in dB.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

`number`

• `set` **replayGainAlbumGain**(`val`): `void`

Sets the ReplayGain album gain in dB.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

___

### replayGainAlbumPeak

• `get` **replayGainAlbumPeak**(): `number`

Gets the ReplayGain album peak sample.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

`number`

• `set` **replayGainAlbumPeak**(`val`): `void`

Sets the ReplayGain album peak sample.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

___

### replayGainTrackGain

• `get` **replayGainTrackGain**(): `number`

Gets the ReplayGain track gain in dB.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

`number`

• `set` **replayGainTrackGain**(`val`): `void`

Sets the ReplayGain track gain in dB.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

___

### replayGainTrackPeak

• `get` **replayGainTrackPeak**(): `number`

Gets the ReplayGain track peak sample.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

`number`

• `set` **replayGainTrackPeak**(`val`): `void`

Sets the ReplayGain track peak sample.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

___

### subtitle

• `get` **subtitle**(): `string`

Gets the subtitle for the media described by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**`remarks`** This field gives a nice short precision to the title, which is typically below
    the title on the front cover of the media. Example: for "Back to the Future", this would
    be "It's About Time".

#### Returns

`string`

• `set` **subtitle**(`val`): `void`

Sets the subtitle for the media described by the current instance.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

___

### tagTypes

• `get` **tagTypes**(): [`TagTypes`](../enums/tagtypes.md)

Gets the tag types contained in the current instance.

#### Returns

[`TagTypes`](../enums/tagtypes.md)

TagTypes Bitwise combined tag types contained in all child tags.

___

### tags

• `get` **tags**(): [`Tag`](tag.md)[]

Gets the tags combined in the current instance.

#### Returns

[`Tag`](tag.md)[]

• `set` **tags**(`tags`): `void`

Sets the child tags to combine in the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tags` | [`Tag`](tag.md)[] | Array of tags to combine |

#### Returns

`void`

___

### title

• `get` **title**(): `string`

Gets the title for the media described by the current instance.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

`string`

• `set` **title**(`val`): `void`

Sets the title for the media described by the current instance.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

___

### titleSort

• `get` **titleSort**(): `string`

Gets the title used for sorting the media described by the current instance.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

`string`

• `set` **titleSort**(`val`): `void`

Sets the title used for sorting the media described by the current instance.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

___

### track

• `get` **track**(): `number`

Gets the position of the media represented by the current instance in its containing album.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

`number`

• `set` **track**(`val`): `void`

Sets the position of the media represented by the current instance in its containing album.
Must be a positive integer positive integer.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

___

### trackCount

• `get` **trackCount**(): `number`

Gets the number of tracks in the album containing the media represented by the current
instance.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

`number`

• `set` **trackCount**(`val`): `void`

Sets the number of tracks in the album containing the media represented by the current
instance. Must be a positive integer positive integer.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

___

### year

• `get` **year**(): `number`

Gets the year that the media represented by the current instance was recorded.
Returns the first non-null/non-undefined value from the child tags.

#### Returns

`number`

• `set` **year**(`val`): `void`

Sets the year that the media represented by the current instance was recorded. Must be a
positive integer.
Sets the value on all child tags

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

## Methods

### addTagInternal

▸ `Protected` **addTagInternal**(`tag`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | [`Tag`](tag.md) |

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

### clearTags

▸ `Protected` **clearTags**(): `void`

#### Returns

`void`

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

[Tag](tag.md).[copyTo](tag.md#copyto)

___

### insertTag

▸ `Protected` **insertTag**(`index`, `tag`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |
| `tag` | [`Tag`](tag.md) |

#### Returns

`void`

___

### removeTag

▸ `Protected` **removeTag**(`tag`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | [`Tag`](tag.md) |

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

### setTags

▸ **setTags**(...`tags`): `void`

Sets the child tags to combine in the current instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...tags` | [`Tag`](tag.md)[] | Tags to combine, falsy tags will be ignored |

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
