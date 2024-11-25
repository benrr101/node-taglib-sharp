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

This field represents the name of the album the media belongs to. In the case of a
boxed set, it should be the name of the entire set rather than the individual disc. In
the case of a series, this should be the name of the series, rather than the season of a
series.

For example, "Kintsugi" (an album by Death Cab for Cutie), "The Complete Red Green Show"
(a boxed set of TV episodes), or "Shark Tank" (a series with several seasons).

#### Returns

`string`

#### Inherited from

CombinedTag.album

• `set` **album**(`val`): `void`

Sets the album of the media represented by the current instance. For video media, this
represents the collection the video belongs to.

This field represents the name of the album the media belongs to. In the case of a
boxed set, it should be the name of the entire set rather than the individual disc. In
the case of a series, this should be the name of the series, rather than the season of a
series.

For example, "Kintsugi" (an album by Death Cab for Cutie), "The Complete Red Green Show"
(a boxed set of TV episodes), or "Shark Tank" (a series with several seasons).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `string` | of the media represented by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Inherited from

CombinedTag.album

___

### albumArtists

• `get` **albumArtists**(): `string`[]

Gets the band or artist who is credited in the creation of the entire album or
collection containing the media described by the current instance.

This field is typically optional but aids in the sorting of compilations or albums
with multiple artist. For example, if an album has several artists, sorting by artist
will split up albums by the same artist. Having a single album artist for an entire
album solves this problem.
As this value is to be used as a sorting key, it should be used with less variation
than [performers](OggTag.md#performers). Where performers can be broken into multiple artists, it is
best to stick to a single name. Eg, "Super8 & Tab"

#### Returns

`string`[]

#### Inherited from

CombinedTag.albumArtists

• `set` **albumArtists**(`val`): `void`

Sets the bands or artists who are credited in the creation of the entire album or
collection containing the media described by the current instance.

This field is typically optional but aids in the sorting of compilations or albums
with multiple artist. For example, if an album has several artists, sorting by artist
will split up albums by the same artist. Having a single album artist for an entire
album solves this problem.
As this value is to be used as a sorting key, it should be used with less variation
than [performers](OggTag.md#performers). Where performers can be broken into multiple artists, it is
best to stick to a single name. Eg, "Super8 & Tab"

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `string`[] | Band or artist credited with the creation of the entire album or collection containing the media described by the current instance or an empty array if no value is present |

#### Returns

`void`

#### Inherited from

CombinedTag.albumArtists

___

### albumArtistsSort

• `get` **albumArtistsSort**(): `string`[]

Gets the sortable names of the bands/artists who are credited with creating the entire
album or collection containing the media described by the current instance. See also:
[albumArtists](OggTag.md#albumartists)

This is used to provide more control over how the media is sorted. Typical uses are to
skip articles or sort by last name. For example "Ben Folds" might be sorted as
"Folds, Ben".
As this value is to be used as a sorting key, it should be used with less variation than
[performers](OggTag.md#performers). Where [performers](OggTag.md#performers) can be broken into multiple performers, it is
best to stick to a single album artist. Eg, "Van Buuren, Armin"

#### Returns

`string`[]

#### Inherited from

CombinedTag.albumArtistsSort

• `set` **albumArtistsSort**(`val`): `void`

Sets the sortable names of the bands/artists who are credited with creating the entire
album or collection containing the media described by the current instance. See also:
[albumArtists](OggTag.md#albumartists)

This is used to provide more control over how the media is sorted. Typical uses are to
skip articles or sort by last name. For example "Ben Folds" might be sorted as
"Folds, Ben".
As this value is to be used as a sorting key, it should be used with less variation than
[performers](OggTag.md#performers). Where [performers](OggTag.md#performers) can be broken into multiple performers, it is
best to stick to a single album artist. Eg, "Van Buuren, Armin"

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `string`[] | Sortable names for the bands/artists are credited with the creation of the entire album or collection containing the media described by the current instance, or an empty array if no value is present. |

#### Returns

`void`

#### Inherited from

CombinedTag.albumArtistsSort

___

### albumSort

• `get` **albumSort**(): `string`

Gets the sortable name of the album title of the media represented by the current instance.
See also: [album](OggTag.md#album)

This field is typically optional but aids in sort of compilations or albums with
similar titles.

#### Returns

`string`

#### Inherited from

CombinedTag.albumSort

• `set` **albumSort**(`val`): `void`

Sets the sortable name of the album title of the media represented by the current instance.
See also: [album](OggTag.md#album)

This field is typically optional but aids in sort of compilations or albums with
similar titles.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `string` | Sortable name for the album title of the media or `undefined` if the value is not present |

#### Returns

`void`

#### Inherited from

CombinedTag.albumSort

___

### amazonId

• `get` **amazonId**(): `string`

Gets the Amazon ID of the media represented by the current instance.

This field represents the AmazonID, also called the ASIN, and is used to uniquely
identify the particular track or album in the Amazon catalog.

#### Returns

`string`

#### Inherited from

CombinedTag.amazonId

• `set` **amazonId**(`val`): `void`

Sets the Amazon ID of the media represented by the current instance.

This field represents the AmazonID, also called the ASIN, and is used to uniquely
identify the particular track or album in the Amazon catalog.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `string` | Amazon ID of the media represented by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Inherited from

CombinedTag.amazonId

___

### beatsPerMinute

• `get` **beatsPerMinute**(): `number`

Gets the number of beats per minute in the audio of the media represented by the current
instance.

This field is useful for DJ's who are trying to beat match tracks. It should be
calculated from the audio or pulled from a database.

#### Returns

`number`

#### Inherited from

CombinedTag.beatsPerMinute

• `set` **beatsPerMinute**(`val`): `void`

Sets the number of beats per minute in the audio of the media represented by the current
instance.

This field is useful for DJ's who are trying to beat match tracks. It should be
calculated from the audio or pulled from a database.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | Beats per minute of the audio in the media represented by the current instance, or `0` if not specified |

#### Returns

`void`

#### Inherited from

CombinedTag.beatsPerMinute

___

### comment

• `get` **comment**(): `string`

Gets a user comment on the media represented by the current instance.

This field should be used to store user notes and comments. There is no constraint on
what text can be stored here, but it should not contain programmatic data.
Because this field contains notes the user might think of while consuming the media,
it may be useful for an application to make this field easily accessible, perhaps even
including it in the main interface.

#### Returns

`string`

#### Inherited from

CombinedTag.comment

• `set` **comment**(`val`): `void`

Sets a user comment on the media represented by the current instance.

This field should be used to store user notes and comments. There is no constraint on
what text can be stored here, but it should not contain programmatic data.
Because this field contains notes the user might think of while consuming the media,
it may be useful for an application to make this field easily accessible, perhaps even
including it in the main interface.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `string` | User comments on the media represented by the current instance or `undefined` if the value is not present |

#### Returns

`void`

#### Inherited from

CombinedTag.comment

___

### comments

• `get` **comments**(): [`XiphComment`](XiphComment.md)[]

Gets the list of comments in the current instance, in the order they were added.

**`Remarks`**

Modifying this array makes no changes to the file. Use [setComment](OggTag.md#setcomment).

#### Returns

[`XiphComment`](XiphComment.md)[]

___

### composers

• `get` **composers**(): `string`[]

Gets the composers of the media represented by the current instance.

This field represents the composers, songwriters, scriptwriters, or persons who
claim authorship of the media.

#### Returns

`string`[]

#### Inherited from

CombinedTag.composers

• `set` **composers**(`val`): `void`

Sets the composers of the media represented by the current instance.

This field represents the composers, songwriters, scriptwriters, or persons who
claim authorship of the media.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `string`[] | Composers of the media represented by the current instance of an empty array if no value is present. |

#### Returns

`void`

#### Inherited from

CombinedTag.composers

___

### composersSort

• `get` **composersSort**(): `string`[]

Gets the sortable names of the composers of the media represented by the current instance.
See also: [composers](OggTag.md#composers)

This field is typically optional but aids in the sorting of compilations or albums
with multiple composers.

#### Returns

`string`[]

#### Inherited from

CombinedTag.composersSort

• `set` **composersSort**(`val`): `void`

Sets the sortable names of the composers of the media represented by the current instance.
See also: [composers](OggTag.md#composers)

This field is typically optional but aids in the sorting of compilations or albums
with multiple composers.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `string`[] | Sortable names for the composers of the media represented by the current instance or an empty array if no value is present. |

#### Returns

`void`

#### Inherited from

CombinedTag.composersSort

___

### conductor

• `get` **conductor**(): `string`

Gets the conductor or director of the media represented by the current instance.

This field is most useful for organizing classical music and movies.

#### Returns

`string`

#### Inherited from

CombinedTag.conductor

• `set` **conductor**(`val`): `void`

Sets the conductor or director of the media represented by the current instance.

This field is most useful for organizing classical music and movies.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `string` | Conductor or director of the media represented by the current instance or `undefined` if no value present. |

#### Returns

`void`

#### Inherited from

CombinedTag.conductor

___

### copyright

• `get` **copyright**(): `string`

Gets the copyright information for the media represented by the current instance.

This field should be used for storing copyright information. It may be useful to show
this information somewhere in the program while the media is playing.
Players should not support editing this field, but media creation tools should
definitely allow modification.

#### Returns

`string`

#### Inherited from

CombinedTag.copyright

• `set` **copyright**(`val`): `void`

Sets the copyright information for the media represented by the current instance.

This field should be used for storing copyright information. It may be useful to show
this information somewhere in the program while the media is playing.
Players should not support editing this field, but media creation tools should
definitely allow modification.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `string` | Copyright information for the media represented by the current instance or `undefined` if no value is present. |

#### Returns

`void`

#### Inherited from

CombinedTag.copyright

___

### dateTagged

• `get` **dateTagged**(): `Date`

Gets the date and time at which the tag has been written.

#### Returns

`Date`

#### Inherited from

CombinedTag.dateTagged

• `set` **dateTagged**(`val`): `void`

Sets the date and time at which the tag has been written.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `Date` | Date/time at which the tag has been written, or `undefined` if no value is present |

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

This is especially relevant for a movie. For example, for "Fear and Loathing in Las
Vegas", this could be "An oddball journalist and his psychopathic lawyer travel to Las
Vegas for a series of psychedelic escapades."

#### Returns

`string`

#### Inherited from

CombinedTag.description

• `set` **description**(`val`): `void`

Sets a short description of the media. For music, this could be the comment that the artist
made of his/her work. For a video, this should be a short summary of the story/plot, but
generally no spoliers. This should give the impression of what to expect in the media.

This is especially relevant for a movie. For example, for "Fear and Loathing in Las
Vegas", this could be "An oddball journalist and his psychopathic lawyer travel to Las
Vegas for a series of psychedelic escapades."

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `string` | Description of the media represented by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Inherited from

CombinedTag.description

___

### disc

• `get` **disc**(): `number`

Gets the number of the disc containing the media represented by the current instance in the
boxed set. For a series, this represents the season number.

This value should be the same as the number that appears on the disc. For example, if
the disc is the first of three, the value should be `1`. It should be no more than
[discCount](OggTag.md#disccount) if [discCount](OggTag.md#disccount) is non-zero.

#### Returns

`number`

#### Inherited from

CombinedTag.disc

• `set` **disc**(`val`): `void`

Sets the number of the disc containing the media represented by the current instance in the
boxed set. For a series, this represents the season number.

This value should be the same as the number that appears on the disc. For example, if
the disc is the first of three, the value should be `1`. It should be no more than
[discCount](OggTag.md#disccount) if [discCount](OggTag.md#disccount) is non-zero.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | Number of the disc or season of the media represented by the current instance in a boxed set. |

#### Returns

`void`

#### Inherited from

CombinedTag.disc

___

### discCount

• `get` **discCount**(): `number`

Gets the number of discs or seasons in the boxed set containing the media represented by the
current instance.

If non-zero, this should be at least equal to [disc](OggTag.md#disc). If [disc](OggTag.md#disc) is zero,
this value should also be zero.

#### Returns

`number`

#### Inherited from

CombinedTag.discCount

• `set` **discCount**(`val`): `void`

Sets the number of discs or seasons in the boxed set containing the media represented by the
current instance.

If non-zero, this should be at least equal to [disc](OggTag.md#disc). If [disc](OggTag.md#disc) is zero,
this value should also be zero.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | Number of discs or seasons in the boxed set containing the media represented by the current instance or `0` if not specified. |

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

This field represents genres that apply to the song, album, or video. This is often
used for filtering media.
A list of common audio genres as popularized by ID3v1 is stored in `genres.ts`.
Additionally, `genres.ts` contains video genres as used by DivX.

#### Returns

`string`[]

#### Inherited from

CombinedTag.genres

• `set` **genres**(`val`): `void`

Sets the genres of the media represented by the current instance.

This field represents genres that apply to the song, album, or video. This is often
used for filtering media.
A list of common audio genres as popularized by ID3v1 is stored in `genres.ts.
Additionally, `genres.ts` contains video genres as used by DivX.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `string`[] | Genres of the media represented by the current instance or an empty array if no value is present. |

#### Returns

`void`

#### Inherited from

CombinedTag.genres

___

### grouping

• `get` **grouping**(): `string`

Gets the grouping on the album which the media in the current instance belongs to.

This field contains a non-physical group to which the track belongs. In classical
music this could be a movement. It could also be parts of a series like "Introduction",
"Closing Remarks", etc.

#### Returns

`string`

#### Inherited from

CombinedTag.grouping

• `set` **grouping**(`val`): `void`

Sets the grouping on the album which the media in the current instance belongs to.

This field contains a non-physical group to which the track belongs. In classical
music this could be a movement. It could also be parts of a series like "Introduction",
"Closing Remarks", etc.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `string` | Grouping on the album which the media in the current instance belongs to or `undefined` if no value is present. |

#### Returns

`void`

#### Inherited from

CombinedTag.grouping

___

### initialKey

• `get` **initialKey**(): `string`

Gets the initial key of the track.

#### Returns

`string`

#### Inherited from

CombinedTag.initialKey

• `set` **initialKey**(`val`): `void`

Sets the initial key of the track.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `string` | Initial key of the track or `undefined` if no value is set |

#### Returns

`void`

#### Inherited from

CombinedTag.initialKey

___

### isCompilation

• `get` **isCompilation**(): `boolean`

Gets whether the album described by the current instance is a compilation.

#### Returns

`boolean`

#### Inherited from

CombinedTag.isCompilation

• `set` **isCompilation**(`val`): `void`

Gets whether the album described by the current instance is a compilation.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `boolean` | Whether the album described by the current instance is a compilation |

#### Returns

`void`

#### Inherited from

CombinedTag.isCompilation

___

### isEmpty

• `get` **isEmpty**(): `boolean`

Gets whether the current instance is empty.

#### Returns

`boolean`

#### Inherited from

CombinedTag.isEmpty

___

### isrc

• `get` **isrc**(): `string`

Gets the ISRC (International Standard Recording Code) of the track.

#### Returns

`string`

#### Inherited from

CombinedTag.isrc

• `set` **isrc**(`val`): `void`

Sets the ISRC (International Standard Recording Code) of the track.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `string` | ISRC of the track or `undefined` if no value is set |

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

This field contains a plain text representation of the lyrics or scripts with line
breaks and whitespace being the only formatting marks.
Some formats support more advanced lyrics, like synchronized lyrics, but those must be
accessed using format-specific implementations.

#### Returns

`string`

#### Inherited from

CombinedTag.lyrics

• `set` **lyrics**(`val`): `void`

Sets the lyrics or script of the media represented by the current instance.

This field contains a plain text representation of the lyrics or scripts with line
breaks and whitespace being the only formatting marks.
Some formats support more advanced lyrics, like synchronized lyrics, but those must be
accessed using format-specific implementations.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `string` | Lyrics or script of the media represented by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Inherited from

CombinedTag.lyrics

___

### musicBrainzArtistId

• `get` **musicBrainzArtistId**(): `string`

Gets the MusicBrainz artist ID of the media represented by the current instance.

This field represents the MusicBrainz ArtistID, and is used to uniquely identify a
particular artist of the track.

#### Returns

`string`

#### Inherited from

CombinedTag.musicBrainzArtistId

• `set` **musicBrainzArtistId**(`val`): `void`

Sets the MusicBrainz artist ID of the media represented by the current instance.

This field represents the MusicBrainz ArtistID, and is used to uniquely identify a
particular artist of the track.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `string` | MusicBrainz ArtistID of the media represented by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Inherited from

CombinedTag.musicBrainzArtistId

___

### musicBrainzDiscId

• `get` **musicBrainzDiscId**(): `string`

Gets the MusicBrainz disc ID of the media represented by the current instance.

This field represents the MusicBrainz DiscID and is used to uniquely identify the
particular released media associated with this track.

#### Returns

`string`

#### Inherited from

CombinedTag.musicBrainzDiscId

• `set` **musicBrainzDiscId**(`val`): `void`

Sets the MusicBrainz disc ID of the media represented by the current instance.

This field represents the MusicBrainz DiscID and is used to uniquely identify the
particular released media associated with this track.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `string` | MusicBrainz DiscID of the media represented by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Inherited from

CombinedTag.musicBrainzDiscId

___

### musicBrainzReleaseArtistId

• `get` **musicBrainzReleaseArtistId**(): `string`

Gets the MusicBrainz release artist ID of the media represented by the current instance.

This field represents the MusicBrainz ReleaseArtistID, and is used to uniquely
identify a particular album artist credited with the album.

#### Returns

`string`

#### Inherited from

CombinedTag.musicBrainzReleaseArtistId

• `set` **musicBrainzReleaseArtistId**(`val`): `void`

Sets the MusicBrainz release artist ID of the media represented by the current instance.

This field represents the MusicBrainz ReleaseArtistID, and is used to uniquely
identify a particular album artist credited with the album.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `string` | MusicBrainz ReleaseArtistID of the media represented by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Inherited from

CombinedTag.musicBrainzReleaseArtistId

___

### musicBrainzReleaseCountry

• `get` **musicBrainzReleaseCountry**(): `string`

Gets the MusicBrainz release country of the media represented by the current instance.

This field represents the MusicBrainz ReleaseCountry which describes the country in
which an album was released. Note that the release country of an album is not
necessarily the country in which it was produced. The label itself will typically be
more relevant. Eg, a release on "Foo Records UK" that has "Made in Austria" printed on
it will likely be a UK release.

#### Returns

`string`

#### Inherited from

CombinedTag.musicBrainzReleaseCountry

• `set` **musicBrainzReleaseCountry**(`val`): `void`

Sets the MusicBrainz release country of the media represented by the current instance.

This field represents the MusicBrainz ReleaseCountry which describes the country in
which an album was released. Note that the release country of an album is not
necessarily the country in which it was produced. The label itself will typically be
more relevant. Eg, a release on "Foo Records UK" that has "Made in Austria" printed on
it will likely be a UK release.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `string` | MusicBrainz ReleaseCountry of the media represented by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Inherited from

CombinedTag.musicBrainzReleaseCountry

___

### musicBrainzReleaseGroupId

• `get` **musicBrainzReleaseGroupId**(): `string`

Gets the MusicBrainz release group ID of the media represented by the current instance.

This field represents the MusicBrainz ReleaseGroupID and is used to uniquely identify
a particular release group to which this track belongs.

#### Returns

`string`

#### Inherited from

CombinedTag.musicBrainzReleaseGroupId

• `set` **musicBrainzReleaseGroupId**(`val`): `void`

Sets the MusicBrainz release group ID of the media represented by the current instance.

This field represents the MusicBrainz ReleaseGroupID and is used to uniquely identify
a particular release group to which this track belongs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `string` | MusicBrainz ReleaseGroupID of the media represented by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Inherited from

CombinedTag.musicBrainzReleaseGroupId

___

### musicBrainzReleaseId

• `get` **musicBrainzReleaseId**(): `string`

Gets the MusicBrainz release ID of the media represented by the current instance.

This field represents the MusicBrains ReleaseID and is used to uniquely identify a
particular release to which this track belongs.

#### Returns

`string`

#### Inherited from

CombinedTag.musicBrainzReleaseId

• `set` **musicBrainzReleaseId**(`val`): `void`

Sets the MusicBrainz release ID of the media represented by the current instance.

This field represents the MusicBrains ReleaseID and is used to uniquely identify a
particular release to which this track belongs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `string` | MusicBrainz ReleaseID of the media represented by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Inherited from

CombinedTag.musicBrainzReleaseId

___

### musicBrainzReleaseStatus

• `get` **musicBrainzReleaseStatus**(): `string`

Gets the MusicBrainz release status of the media represented by the current instance.

This field represents the MusicBrainz ReleaseStatus used to describe how 'official' a
release is. Common statuses are: `Official`, `Promotion`, `Bootleg`, `Pseudo-release`.

#### Returns

`string`

#### Inherited from

CombinedTag.musicBrainzReleaseStatus

• `set` **musicBrainzReleaseStatus**(`val`): `void`

Sets the MusicBrainz release status of the media represented by the current instance.

This field represents the MusicBrainz ReleaseStatus used to describe how 'official' a
release is. Common statuses are: `Official`, `Promotion`, `Bootleg`, `Pseudo-release`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `string` | MusicBrainz ReleaseStatus of the media represented by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Inherited from

CombinedTag.musicBrainzReleaseStatus

___

### musicBrainzReleaseType

• `get` **musicBrainzReleaseType**(): `string`

Gets the MusicBrainz release type of the media represented by the current instance.

This field represents the MusicBrainz ReleaseType that describes what kind of release
a release is. Common types are: `Single`, `Album`, `EP`, `Compilation`, `Soundtrack,
`SpokenWord`, `Interview`, `Audiobook`, `Live`, `Remix`, and `Other`. Careful thought
must be given when using this field to decide if a particular track "is a compilation".

@returns
    MusicBrainz ReleaseType of the media represented by the current instance or
    `undefined` if no value is present

#### Returns

`string`

#### Inherited from

CombinedTag.musicBrainzReleaseType

• `set` **musicBrainzReleaseType**(`val`): `void`

Sets the MusicBrainz release type of the media represented by the current instance.

This field represents the MusicBrainz ReleaseType that describes what kind of release
a release is. Common types are: `Single`, `Album`, `EP`, `Compilation`, `Soundtrack,
`SpokenWord`, `Interview`, `Audiobook`, `Live`, `Remix`, and `Other`. Careful thought
must be given when using this field to decide if a particular track "is a compilation".

@param value MusicBrainz ReleaseType of the media represented by the current instance or
    `undefined` if no value is present

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

This field represents the MusicBrainz TrackID and is used to uniquely identify a
particular track.

#### Returns

`string`

#### Inherited from

CombinedTag.musicBrainzTrackId

• `set` **musicBrainzTrackId**(`val`): `void`

Sets the MusicBrainz track ID of the media represented by the media represented by the
current instance.

This field represents the MusicBrainz TrackID and is used to uniquely identify a
particular track.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `string` | MusicBrainz TrackID of the media represented by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Inherited from

CombinedTag.musicBrainzTrackId

___

### musicIpId

• `get` **musicIpId**(): `string`

Gets the MusicIP PUID of the media represented by the current instance.

This field represents the MusicIP PUID, an acoustic fingerprint identifier. It
identifies wht this track "sounds like".

#### Returns

`string`

#### Inherited from

CombinedTag.musicIpId

• `set` **musicIpId**(`val`): `void`

Sets the MusicIP PUID of the media represented by the current instance.

This field represents the MusicIP PUID, an acoustic fingerprint identifier. It
identifies wht this track "sounds like".

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `string` | MusicIP PUID of the media represented by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Inherited from

CombinedTag.musicIpId

___

### performers

• `get` **performers**(): `string`[]

Gets the performers or artists who performed in the media described by the current instance.

This field is most commonly called "Artists" in audio media or "Actors" in video
media, and should be used to represent each artist/actor appearing in the media. It can
be simple in the form of "Above & Beyond" or more complicated in the form of
"Jono Grant, Tony McGuinness, Paavo Siljamäki", depending on the preferences of the
user and the degree to which they organize their media collection.
As the preference of the user may vary, applications should avoid limiting the user in
what constitutes the performers field - especially in regard to number of performers.

#### Returns

`string`[]

#### Inherited from

CombinedTag.performers

• `set` **performers**(`val`): `void`

Sets the performers or artists who performed in the media described by the current instance.

This field is most commonly called "Artists" in audio media or "Actors" in video
media, and should be used to represent each artist/actor appearing in the media. It can
be simple in the form of "Above & Beyond" or more complicated in the form of
"Jono Grant, Tony McGuinness, Paavo Siljamäki", depending on the preferences of the
user and the degree to which they organize their media collection.
As the preference of the user may vary, applications should avoid limiting the user in
what constitutes the performers field - especially regarding the number of performers.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `string`[] | Performers who performed in the media described by the current instance or an empty array if no value is present. |

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

It is highly important to match each role to the performers. This means that an entry
in the [performersRole](OggTag.md#performersrole) array is `undefined` to maintain the relationship between
`performers[i]` and `performersRole[i]`.

#### Returns

`string`[]

#### Inherited from

CombinedTag.performersRole

• `set` **performersRole**(`val`): `void`

Sets the characters portrayed by an actor for a video or instruments played by a musician
for music. This must match the [performers](OggTag.md#performers) array (for each person, correspond one/more
role). Several roles for the same artist/actor can be separated with semicolons. For
example: "Bass; Backing Vocals; Vibraphone".

It is highly important to match each role to the performers. This means that an entry
in the [performersRole](OggTag.md#performersrole) array is `undefined` to maintain the relationship between
`performers[i]` and `performersRole[i]`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `string`[] | Array containing the roles played by the performers in the media described by the current instance, or an empty array if no value is present. |

#### Returns

`void`

#### Inherited from

CombinedTag.performersRole

___

### performersSort

• `get` **performersSort**(): `string`[]

Gets the sortable names of the performers or artists who performed in the media described by
the current instance.

This is used to provide more control over how the media is sorted. Typical uses are to
skip articles or sort by last name. For example, "The Pillows" might be sorted as
"Pillows, The". See also: [performers](OggTag.md#performers)

#### Returns

`string`[]

#### Inherited from

CombinedTag.performersSort

• `set` **performersSort**(`val`): `void`

Gets the sortable names of the performers or artists who performed in the media described by
the current instance.

This is used to provide more control over how the media is sorted. Typical uses are to
skip articles or sort by last name. For example, "The Pillows" might be sorted as
"Pillows, The". See also: [performers](OggTag.md#performers)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `string`[] | Sortable names for the performers who performed in the media described by the current instance, or an empty array if no value is present. |

#### Returns

`void`

#### Inherited from

CombinedTag.performersSort

___

### pictures

• `get` **pictures**(): [`IPicture`](../interfaces/IPicture.md)[]

Gets a collection of pictures associated with the media represented by the current instance.

Typically, this value is used to store an album cover or icon to use for the file, but
it is capable of holding any type of image or file, including pictures of the band, the
recording studio, the concert, etc.

#### Returns

[`IPicture`](../interfaces/IPicture.md)[]

#### Inherited from

CombinedTag.pictures

• `set` **pictures**(`val`): `void`

Sets a collection of pictures associated with the media represented by the current instance.

Typically, this value is used to store an album cover or icon to use for the file, but
it is capable of holding any type of image or file, including pictures of the band, the
recording studio, the concert, etc.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | [`IPicture`](../interfaces/IPicture.md)[] | Array containing a collection of pictures associated with the media represented by the current instance or an empty array if no pictures are present. |

#### Returns

`void`

#### Inherited from

CombinedTag.pictures

___

### publisher

• `get` **publisher**(): `string`

Gets the publisher of the track.

#### Returns

`string`

#### Inherited from

CombinedTag.publisher

• `set` **publisher**(`val`): `void`

Sets the publisher of the track.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `string` | Publisher of the track or `undefined` if no value is set |

#### Returns

`void`

#### Inherited from

CombinedTag.publisher

___

### remixedBy

• `get` **remixedBy**(): `string`

Gets the remixer of the track.

#### Returns

`string`

#### Inherited from

CombinedTag.remixedBy

• `set` **remixedBy**(`val`): `void`

Sets the remixer of the track.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `string` | Remixer of the track or `undefined` if no value is set |

#### Returns

`void`

#### Inherited from

CombinedTag.remixedBy

___

### replayGainAlbumGain

• `get` **replayGainAlbumGain**(): `number`

Gets the ReplayGain album gain in dB.

#### Returns

`number`

#### Inherited from

CombinedTag.replayGainAlbumGain

• `set` **replayGainAlbumGain**(`val`): `void`

Sets the ReplayGain album gain in dB.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | Album gain as per the ReplayGain specifications, in dB, or `NaN` if no value is set |

#### Returns

`void`

#### Inherited from

CombinedTag.replayGainAlbumGain

___

### replayGainAlbumPeak

• `get` **replayGainAlbumPeak**(): `number`

Gets the ReplayGain album peak sample.

#### Returns

`number`

#### Inherited from

CombinedTag.replayGainAlbumPeak

• `set` **replayGainAlbumPeak**(`val`): `void`

Sets the ReplayGain album peak sample.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | Album peak as per the ReplayGain specifications, or `NaN` if no value is set |

#### Returns

`void`

#### Inherited from

CombinedTag.replayGainAlbumPeak

___

### replayGainTrackGain

• `get` **replayGainTrackGain**(): `number`

Gets the ReplayGain track gain in dB.

#### Returns

`number`

#### Inherited from

CombinedTag.replayGainTrackGain

• `set` **replayGainTrackGain**(`val`): `void`

Sets the ReplayGain track gain in dB.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | Track gain as per ReplayGain specifications, in dB, or `NaN` if no value is set |

#### Returns

`void`

#### Inherited from

CombinedTag.replayGainTrackGain

___

### replayGainTrackPeak

• `get` **replayGainTrackPeak**(): `number`

Gets the ReplayGain track peak sample.

#### Returns

`number`

#### Inherited from

CombinedTag.replayGainTrackPeak

• `set` **replayGainTrackPeak**(`val`): `void`

Sets the ReplayGain track peak sample.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | Track peak as per the ReplayGain specifications, or `NaN` if no value is set |

#### Returns

`void`

#### Inherited from

CombinedTag.replayGainTrackPeak

___

### serialNumbers

• `get` **serialNumbers**(): `number`[]

Gets the list of stream serial numbers that have comments associated with them.

**`Remarks`**

Modifying this array makes no changes to the file. Use [setComment](OggTag.md#setcomment).

#### Returns

`number`[]

___

### sizeOnDisk

• `get` **sizeOnDisk**(): `number`

Gets the size of the tag in bytes on disk as it was read from disk.

#### Returns

`number`

#### Overrides

CombinedTag.sizeOnDisk

___

### subtitle

• `get` **subtitle**(): `string`

Gets a description, one-line. It represents the tagline of the vide/music.

This field gives a nice/short precision to the title, which is typically below the
title on the front cover of the media. For example for "Ocean's 13", this would be
"Revenge is a funny thing".

#### Returns

`string`

#### Inherited from

CombinedTag.subtitle

• `set` **subtitle**(`val`): `void`

Sets a description, one-line. It represents the tagline of the vide/music.

This field gives a nice/short precision to the title, which is typically below the
title on the front cover of the media. For example for "Ocean's 13", this would be
"Revenge is a funny thing".

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `string` | Subtitle of the media represented by the current instance or `undefined` if no value is present |

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

#### Returns

[`TagTypes`](../enums/TagTypes.md)

#### Inherited from

CombinedTag.tagTypes

___

### tags

• `get` **tags**(): [`Tag`](Tag.md)[]

Gets all tags contained within the current instance. If the tags within this tag are also
[CombinedTag](CombinedTag.md)s, the retrieval will recurse and return a flat list of nested tags.

**`Remarks`**

Modifications of the returned array will not be retained.

#### Returns

[`Tag`](Tag.md)[]

#### Inherited from

CombinedTag.tags

___

### title

• `get` **title**(): `string`

Gets the title for the media described by the current instance.

#### Returns

`string`

#### Inherited from

CombinedTag.title

• `set` **title**(`val`): `void`

Sets the title for the media described by the current instance.

The title is most commonly the name of the song, episode or a movie title. For example
"Time Won't Me Go" (a song by The Bravery), "Three Stories" (an episode of House MD), or
"Fear and Loathing In Las Vegas" (a movie).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `string` | Title of the media described by the current instance or `undefined` if no value is present. |

#### Returns

`void`

#### Inherited from

CombinedTag.title

___

### titleSort

• `get` **titleSort**(): `string`

Gets the sortable name for the title of the media described by the current instance.

Possibly used to sort compilations or episodic content.

#### Returns

`string`

#### Inherited from

CombinedTag.titleSort

• `set` **titleSort**(`val`): `void`

Sets the sortable name for the title of the media described by the current instance.

Possibly used to sort compilations or episodic content.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `string` | Sortable name of the media described by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Inherited from

CombinedTag.titleSort

___

### track

• `get` **track**(): `number`

Gets the position of the media represented by the current instance in its containing album
or season (for a series).

This value should be the same as is listed on the album cover and no more than
[trackCount](OggTag.md#trackcount), if [trackCount](OggTag.md#trackcount) is non-zero.
Most tagging formats store this as a string. To help sorting, a two-digit zero-padded
value is used in the resulting tag.
For a series, this property represents the episodes in a season of the series.

#### Returns

`number`

#### Inherited from

CombinedTag.track

• `set` **track**(`val`): `void`

Sets the position of the media represented by the current instance in its containing album
or season (for a series).

This value should be the same as is listed on the album cover and no more than
[trackCount](OggTag.md#trackcount), if [trackCount](OggTag.md#trackcount) is non-zero.
Most tagging formats store this as a string. To help sorting, a two-digit zero-padded
value is used in the resulting tag.
For a series, this property represents the episodes in a season of the series.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | Position of the media represented by the current instance in its containing album or `0` if not specified. |

#### Returns

`void`

#### Inherited from

CombinedTag.track

___

### trackCount

• `get` **trackCount**(): `number`

Gets the number of tracks on the album or the number of episodes in a series of the media
represented by the current instance.

If non-zero, this value should be equal to or greater than [track](OggTag.md#track). If
[track](OggTag.md#track) is `0`, this value should also be `0`.

#### Returns

`number`

#### Inherited from

CombinedTag.trackCount

• `set` **trackCount**(`val`): `void`

Sets the number of tracks on the album or the number of episodes in a series of the media
represented by the current instance.

If non-zero, this value should be equal to or greater than [track](OggTag.md#track). If
[track](OggTag.md#track) is `0`, this value should also be `0`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | Number of tracks on the album or number of episodes in a series of the media represented by the current instance or `0` if not specified. |

#### Returns

`void`

#### Inherited from

CombinedTag.trackCount

___

### year

• `get` **year**(): `number`

Gets the year that the media represented by the current instance was recorded.

Years greater than 9999 cannot be stored by most tagging formats and will be cleared
if a higher value is set. Some tagging formats store higher precision dates which will
be truncated when this property is set. Format specific implementations are necessary to
access the higher precision values.

#### Returns

`number`

#### Inherited from

CombinedTag.year

• `set` **year**(`val`): `void`

Sets the year that the media represented by the current instance was recorded.

Years greater than 9999 cannot be stored by most tagging formats and will be cleared
if a higher value is set. Some tagging formats store higher precision dates which will
be truncated when this property is set. Format specific implementations are necessary to
access the higher precision values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | Year that the media represented by the current instance was created or `0` if no value is present. |

#### Returns

`void`

#### Inherited from

CombinedTag.year

## Methods

### addTag

▸ `Protected` **addTag**(`tag`): `void`

Adds the provided tag to the list of tags contained in the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tag` | [`Tag`](Tag.md) | Tag to add to the current instance. |

#### Returns

`void`

#### Inherited from

[CombinedTag](CombinedTag.md).[addTag](CombinedTag.md#addtag)

___

### clear

▸ **clear**(): `void`

Clears all values stored in the current instance.

**`Remarks`**

Clears all child tags.

#### Returns

`void`

#### Inherited from

[CombinedTag](CombinedTag.md).[clear](CombinedTag.md#clear)

___

### copyTo

▸ **copyTo**(`target`, `overwrite`): `void`

Copies the values from the current instance to another [Tag](Tag.md), optionally overwriting
existing values.

This method only copies the most basic values when copying between different tag
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

**`Remarks`**

Tags cannot be added or removed from Ogg files. This will always throw.

#### Returns

[`Tag`](Tag.md)

#### Overrides

[CombinedTag](CombinedTag.md).[createTag](CombinedTag.md#createtag)

___

### getComment

▸ **getComment**(`streamSerialNumber`): [`XiphComment`](XiphComment.md)

Retrieves a Xiph comment for a given stream.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `streamSerialNumber` | `number` | Serial number of the stream that contains the desired comment. Must be a positive 32-bit integer. |

#### Returns

[`XiphComment`](XiphComment.md)

Xiph comment of the provided stream is returned if it exists, otherwise
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

Tag with specified type, if it exists. `undefined` otherwise.

#### Inherited from

[CombinedTag](CombinedTag.md).[getTag](CombinedTag.md#gettag)

___

### removeTags

▸ **removeTags**(): `void`

Remove all tags that match the specified tagTypes. This is performed recursively. Any nested
`CombinedTag` instances are left in place.

**`Remarks`**

Tags cannot be added or removed from Ogg files. This will do nothing.

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

**`Remarks`**

As per Ogg spec, each stream must have a Xiph comment header. Therefore, comments
    cannot be set to a falsy value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `streamSerialNumber` | `number` | Serial number of the stream in which to store the comment. Must be a positive 32-bit integer |
| `comment` | [`XiphComment`](XiphComment.md) | Xiph comment to store in the stream. Use `undefined` to clear the comment from the stream |

#### Returns

`void`

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

Generates an array of tag types that are set in the provided flags value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tagTypes` | [`TagTypes`](../enums/TagTypes.md) | Tag types that have been OR'd together. |

#### Returns

[`TagTypes`](../enums/TagTypes.md)[]

#### Inherited from

[CombinedTag](CombinedTag.md).[tagTypeFlagsToArray](CombinedTag.md#tagtypeflagstoarray)
