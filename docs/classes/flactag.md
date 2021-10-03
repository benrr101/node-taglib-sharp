[node-taglib-sharp](../README.md) / [Exports](../modules.md) / FlacTag

# Class: FlacTag

Collection of tags that can be stored in a FLAC file.

**`remarks`** The FLAC file specification states that tagging should be done via a XIPH comment block
    and any pictures should be stored in a FLAC picture block. However, tagging can be done via
    ID3 and APE tags at the beginning or end of the file, same as MP3 and other files. This
    class provides a unified access into all the tags a FLAC file may contain.

## Hierarchy

- [`CombinedTag`](combinedtag.md)

  ↳ **`FlacTag`**

## Table of contents

### Constructors

- [constructor](flactag.md#constructor)

### Accessors

- [album](flactag.md#album)
- [albumArtists](flactag.md#albumartists)
- [albumArtistsSort](flactag.md#albumartistssort)
- [albumSort](flactag.md#albumsort)
- [amazonId](flactag.md#amazonid)
- [beatsPerMinute](flactag.md#beatsperminute)
- [comment](flactag.md#comment)
- [composers](flactag.md#composers)
- [composersSort](flactag.md#composerssort)
- [conductor](flactag.md#conductor)
- [copyright](flactag.md#copyright)
- [dateTagged](flactag.md#datetagged)
- [description](flactag.md#description)
- [disc](flactag.md#disc)
- [discCount](flactag.md#disccount)
- [endTag](flactag.md#endtag)
- [firstAlbumArtist](flactag.md#firstalbumartist)
- [firstAlbumArtistSort](flactag.md#firstalbumartistsort)
- [firstComposer](flactag.md#firstcomposer)
- [firstComposerSort](flactag.md#firstcomposersort)
- [firstGenre](flactag.md#firstgenre)
- [firstPerformer](flactag.md#firstperformer)
- [firstPerformerSort](flactag.md#firstperformersort)
- [genres](flactag.md#genres)
- [grouping](flactag.md#grouping)
- [initialKey](flactag.md#initialkey)
- [isEmpty](flactag.md#isempty)
- [isrc](flactag.md#isrc)
- [joinedAlbumArtists](flactag.md#joinedalbumartists)
- [joinedComposers](flactag.md#joinedcomposers)
- [joinedGenres](flactag.md#joinedgenres)
- [joinedPerformers](flactag.md#joinedperformers)
- [joinedPerformersSort](flactag.md#joinedperformerssort)
- [lyrics](flactag.md#lyrics)
- [musicBrainzArtistId](flactag.md#musicbrainzartistid)
- [musicBrainzDiscId](flactag.md#musicbrainzdiscid)
- [musicBrainzReleaseArtistId](flactag.md#musicbrainzreleaseartistid)
- [musicBrainzReleaseCountry](flactag.md#musicbrainzreleasecountry)
- [musicBrainzReleaseGroupId](flactag.md#musicbrainzreleasegroupid)
- [musicBrainzReleaseId](flactag.md#musicbrainzreleaseid)
- [musicBrainzReleaseStatus](flactag.md#musicbrainzreleasestatus)
- [musicBrainzReleaseType](flactag.md#musicbrainzreleasetype)
- [musicBrainzTrackId](flactag.md#musicbrainztrackid)
- [musicIpId](flactag.md#musicipid)
- [performers](flactag.md#performers)
- [performersRole](flactag.md#performersrole)
- [performersSort](flactag.md#performerssort)
- [pictures](flactag.md#pictures)
- [publisher](flactag.md#publisher)
- [remixedBy](flactag.md#remixedby)
- [replayGainAlbumGain](flactag.md#replaygainalbumgain)
- [replayGainAlbumPeak](flactag.md#replaygainalbumpeak)
- [replayGainTrackGain](flactag.md#replaygaintrackgain)
- [replayGainTrackPeak](flactag.md#replaygaintrackpeak)
- [sizeOnDisk](flactag.md#sizeondisk)
- [startTag](flactag.md#starttag)
- [subtitle](flactag.md#subtitle)
- [supportedTagTypes](flactag.md#supportedtagtypes)
- [tagTypes](flactag.md#tagtypes)
- [tags](flactag.md#tags)
- [title](flactag.md#title)
- [titleSort](flactag.md#titlesort)
- [track](flactag.md#track)
- [trackCount](flactag.md#trackcount)
- [xiphComment](flactag.md#xiphcomment)
- [year](flactag.md#year)

### Methods

- [addTag](flactag.md#addtag)
- [clear](flactag.md#clear)
- [copyTo](flactag.md#copyto)
- [createTag](flactag.md#createtag)
- [getTag](flactag.md#gettag)
- [removeTags](flactag.md#removetags)
- [setInfoTag](flactag.md#setinfotag)
- [validateTagCreation](flactag.md#validatetagcreation)
- [firstInGroup](flactag.md#firstingroup)
- [isFalsyOrLikeEmpty](flactag.md#isfalsyorlikeempty)
- [joinGroup](flactag.md#joingroup)
- [tagTypeFlagsToArray](flactag.md#tagtypeflagstoarray)

## Constructors

### constructor

• **new FlacTag**(`startTag`, `endTag`, `xiphTag`, `flacPictures`)

Constructs and initializes a new FLAC tag using the component tags provided.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `startTag` | `default` | Required, collection of tags at the start of the file |
| `endTag` | `default` | Required, collection of tags at the end of the file |
| `xiphTag` | [`XiphComment`](xiphcomment.md) | Optional, Xiph comment tag from the FLAC file |
| `flacPictures` | [`XiphPicture`](xiphpicture.md)[] | Optional, array of pictures found in the file |

#### Overrides

[CombinedTag](combinedtag.md).[constructor](combinedtag.md#constructor)

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

### endTag

• `get` **endTag**(): `default`

Gets the collection of tags appearing at the end of the file.

#### Returns

`default`

___

### firstAlbumArtist

• `get` **firstAlbumArtist**(): `string`

Gets the the first value contained in [albumArtists](flactag.md#albumartists).

#### Returns

`string`

___

### firstAlbumArtistSort

• `get` **firstAlbumArtistSort**(): `string`

Gets the first value contained in [albumArtistsSort](flactag.md#albumartistssort)

#### Returns

`string`

___

### firstComposer

• `get` **firstComposer**(): `string`

Gets the first value contained in [composers](flactag.md#composers)

#### Returns

`string`

___

### firstComposerSort

• `get` **firstComposerSort**(): `string`

Gets the first value contained in [composersSort](flactag.md#composerssort)

#### Returns

`string`

___

### firstGenre

• `get` **firstGenre**(): `string`

Gets the first value contained in [genres](flactag.md#genres)

#### Returns

`string`

___

### firstPerformer

• `get` **firstPerformer**(): `string`

Gets the first value contained in [performers](flactag.md#performers)

#### Returns

`string`

___

### firstPerformerSort

• `get` **firstPerformerSort**(): `string`

Gets the first value contained in [performersSort](flactag.md#performerssort)

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

Gets a semicolon and space separated string containing the values in [albumArtists](flactag.md#albumartists)

#### Returns

`string`

___

### joinedComposers

• `get` **joinedComposers**(): `string`

Gets a semicolon and space separated string containing the values in [composers](flactag.md#composers)

#### Returns

`string`

___

### joinedGenres

• `get` **joinedGenres**(): `string`

Gets a semicolon and space separated string containing the values in [genres](flactag.md#genres)

#### Returns

`string`

___

### joinedPerformers

• `get` **joinedPerformers**(): `string`

Gets a semicolon and space separated string containing the values in [performers](flactag.md#performers)

#### Returns

`string`

___

### joinedPerformersSort

• `get` **joinedPerformersSort**(): `string`

Gets a semicolon and space separated string containing the values in [performersSort](flactag.md#performerssort)

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
match the [performers](flactag.md#performers) array (for each person correspond one/more role). Several roles
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

**`inheritdoc`**
For FLAC files, FLAC-style pictures are preferentially returned. If those don't exist the
pictures that are stored in the

#### Returns

[`IPicture`](../interfaces/ipicture.md)[]

• `set` **pictures**(`value`): `void`

Gets a collection of pictures associated with the media represented by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**`inheritdoc`**
For FLAC files, pictures are preferentially stored in FLAC-style picture blocks.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`IPicture`](../interfaces/ipicture.md)[] |

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

### sizeOnDisk

• `get` **sizeOnDisk**(): `number`

Gets the size of the tag in bytes on disk as it was read from disk.

**`inheritdoc`**

**`remarks`** Note that tags may not appear contiguously in a file. Access the [tags](flactag.md#tags)
    contained in this object to see the size of each tag on the disk.

#### Returns

`number`

___

### startTag

• `get` **startTag**(): `default`

Gets the collection of tags appearing at the start of the file.

#### Returns

`default`

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

### supportedTagTypes

• `get` **supportedTagTypes**(): [`TagTypes`](../enums/tagtypes.md)

Gets the types of tags that are supported by this instance of a combined tag. Only these tag
types can be added to the instance.

#### Returns

[`TagTypes`](../enums/tagtypes.md)

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

Gets all tags contained within the current instance. If the tags within this tag are also
[CombinedTag](combinedtag.md)s, the retrieval will recurse and return a flat list of nested tags.

**`remarks`** Modifications of the returned array will not be retained.

#### Returns

[`Tag`](tag.md)[]

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

### xiphComment

• `get` **xiphComment**(): [`XiphComment`](xiphcomment.md)

Gets the Xiph comment that is stored in the current instance.

#### Returns

[`XiphComment`](xiphcomment.md)

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

### addTag

▸ `Protected` **addTag**(`tag`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | [`Tag`](tag.md) |

#### Returns

`void`

#### Inherited from

[CombinedTag](combinedtag.md).[addTag](combinedtag.md#addtag)

___

### clear

▸ **clear**(): `void`

Clears all values stored in the current instance.

**`remarks`** The clearing procedure is format specific and should clear all values.

#### Returns

`void`

#### Overrides

[CombinedTag](combinedtag.md).[clear](combinedtag.md#clear)

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

[CombinedTag](combinedtag.md).[copyTo](combinedtag.md#copyto)

___

### createTag

▸ **createTag**(`tagType`, `copy`): [`Tag`](tag.md)

Creates a new instance of the desired tag type and adds it to the current instance. If the
tag type is unsupported in the current context or the tag type already exists, an error will
be thrown.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tagType` | [`TagTypes`](../enums/tagtypes.md) | Type of tag to create |
| `copy` | `boolean` | Whether or not to copy the contents of the current instance to the newly created     tag instance |

#### Returns

[`Tag`](tag.md)

Tag The newly created tag

#### Overrides

[CombinedTag](combinedtag.md).[createTag](combinedtag.md#createtag)

___

### getTag

▸ **getTag**<`TTag`\>(`tagType`): `TTag`

Gets a tag of the specified tag type if a matching tag exists in the current instance.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TTag` | extends [`Tag`](tag.md)<`TTag`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tagType` | [`TagTypes`](../enums/tagtypes.md) | Type of tag to retrieve |

#### Returns

`TTag`

Tag Tag with specified type, if it exists. `undefined` otherwise.

#### Inherited from

[CombinedTag](combinedtag.md).[getTag](combinedtag.md#gettag)

___

### removeTags

▸ **removeTags**(`tagTypes`): `void`

Remove all tags that match the specified tagTypes. This is performed recursively. Any nested
`CombinedTag` instances are left in place.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tagTypes` | [`TagTypes`](../enums/tagtypes.md) | Types of tags to remove |

#### Returns

`void`

#### Overrides

[CombinedTag](combinedtag.md).[removeTags](combinedtag.md#removetags)

___

### setInfoTag

▸ **setInfoTag**(): `void`

Set the tags that represent the tagger software (node-taglib-sharp) itself.

**`remarks`** This is typically a method to call just before saving a tag.

#### Returns

`void`

#### Inherited from

[CombinedTag](combinedtag.md).[setInfoTag](combinedtag.md#setinfotag)

___

### validateTagCreation

▸ `Protected` **validateTagCreation**(`tagType`): `void`

Verifies if a tag can be added to the current instance. The criteria for validation are:
* A tag of the given tag type does not already exist
* The given tag type is supported by the current instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tagType` | [`TagTypes`](../enums/tagtypes.md) | Tag type that the caller wants to create |

#### Returns

`void`

#### Inherited from

[CombinedTag](combinedtag.md).[validateTagCreation](combinedtag.md#validatetagcreation)

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

[CombinedTag](combinedtag.md).[firstInGroup](combinedtag.md#firstingroup)

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

[CombinedTag](combinedtag.md).[isFalsyOrLikeEmpty](combinedtag.md#isfalsyorlikeempty)

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

[CombinedTag](combinedtag.md).[joinGroup](combinedtag.md#joingroup)

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

[CombinedTag](combinedtag.md).[tagTypeFlagsToArray](combinedtag.md#tagtypeflagstoarray)
