[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Mpeg4AppleTag

# Class: Mpeg4AppleTag

Abstract class that provides generic access to standard tag features. All tag types will extend
this class.
Because not every tag type supports the same features, it may be useful to check that the value
is stored by re-reading the property after it is set.

## Hierarchy

- [`Tag`](Tag.md)

  ↳ **`Mpeg4AppleTag`**

## Table of contents

### Constructors

- [constructor](Mpeg4AppleTag.md#constructor)

### Accessors

- [album](Mpeg4AppleTag.md#album)
- [albumArtists](Mpeg4AppleTag.md#albumartists)
- [albumArtistsSort](Mpeg4AppleTag.md#albumartistssort)
- [albumSort](Mpeg4AppleTag.md#albumsort)
- [amazonId](Mpeg4AppleTag.md#amazonid)
- [beatsPerMinute](Mpeg4AppleTag.md#beatsperminute)
- [comment](Mpeg4AppleTag.md#comment)
- [composers](Mpeg4AppleTag.md#composers)
- [composersSort](Mpeg4AppleTag.md#composerssort)
- [conductor](Mpeg4AppleTag.md#conductor)
- [copyright](Mpeg4AppleTag.md#copyright)
- [dateTagged](Mpeg4AppleTag.md#datetagged)
- [description](Mpeg4AppleTag.md#description)
- [disc](Mpeg4AppleTag.md#disc)
- [discCount](Mpeg4AppleTag.md#disccount)
- [firstAlbumArtist](Mpeg4AppleTag.md#firstalbumartist)
- [firstAlbumArtistSort](Mpeg4AppleTag.md#firstalbumartistsort)
- [firstComposer](Mpeg4AppleTag.md#firstcomposer)
- [firstComposerSort](Mpeg4AppleTag.md#firstcomposersort)
- [firstGenre](Mpeg4AppleTag.md#firstgenre)
- [firstPerformer](Mpeg4AppleTag.md#firstperformer)
- [firstPerformerSort](Mpeg4AppleTag.md#firstperformersort)
- [genres](Mpeg4AppleTag.md#genres)
- [grouping](Mpeg4AppleTag.md#grouping)
- [initialKey](Mpeg4AppleTag.md#initialkey)
- [isCompilation](Mpeg4AppleTag.md#iscompilation)
- [isEmpty](Mpeg4AppleTag.md#isempty)
- [isrc](Mpeg4AppleTag.md#isrc)
- [joinedAlbumArtists](Mpeg4AppleTag.md#joinedalbumartists)
- [joinedComposers](Mpeg4AppleTag.md#joinedcomposers)
- [joinedGenres](Mpeg4AppleTag.md#joinedgenres)
- [joinedPerformers](Mpeg4AppleTag.md#joinedperformers)
- [joinedPerformersSort](Mpeg4AppleTag.md#joinedperformerssort)
- [lyrics](Mpeg4AppleTag.md#lyrics)
- [musicBrainzArtistId](Mpeg4AppleTag.md#musicbrainzartistid)
- [musicBrainzDiscId](Mpeg4AppleTag.md#musicbrainzdiscid)
- [musicBrainzReleaseArtistId](Mpeg4AppleTag.md#musicbrainzreleaseartistid)
- [musicBrainzReleaseCountry](Mpeg4AppleTag.md#musicbrainzreleasecountry)
- [musicBrainzReleaseGroupId](Mpeg4AppleTag.md#musicbrainzreleasegroupid)
- [musicBrainzReleaseId](Mpeg4AppleTag.md#musicbrainzreleaseid)
- [musicBrainzReleaseStatus](Mpeg4AppleTag.md#musicbrainzreleasestatus)
- [musicBrainzReleaseType](Mpeg4AppleTag.md#musicbrainzreleasetype)
- [musicBrainzTrackId](Mpeg4AppleTag.md#musicbrainztrackid)
- [musicIpId](Mpeg4AppleTag.md#musicipid)
- [performers](Mpeg4AppleTag.md#performers)
- [performersRole](Mpeg4AppleTag.md#performersrole)
- [performersSort](Mpeg4AppleTag.md#performerssort)
- [pictures](Mpeg4AppleTag.md#pictures)
- [publisher](Mpeg4AppleTag.md#publisher)
- [remixedBy](Mpeg4AppleTag.md#remixedby)
- [replayGainAlbumGain](Mpeg4AppleTag.md#replaygainalbumgain)
- [replayGainAlbumPeak](Mpeg4AppleTag.md#replaygainalbumpeak)
- [replayGainTrackGain](Mpeg4AppleTag.md#replaygaintrackgain)
- [replayGainTrackPeak](Mpeg4AppleTag.md#replaygaintrackpeak)
- [sizeOnDisk](Mpeg4AppleTag.md#sizeondisk)
- [subtitle](Mpeg4AppleTag.md#subtitle)
- [tagTypes](Mpeg4AppleTag.md#tagtypes)
- [title](Mpeg4AppleTag.md#title)
- [titleSort](Mpeg4AppleTag.md#titlesort)
- [track](Mpeg4AppleTag.md#track)
- [trackCount](Mpeg4AppleTag.md#trackcount)
- [year](Mpeg4AppleTag.md#year)

### Methods

- [clear](Mpeg4AppleTag.md#clear)
- [copyTo](Mpeg4AppleTag.md#copyto)
- [getFirstItunesString](Mpeg4AppleTag.md#getfirstitunesstring)
- [getFirstQuickTimeData](Mpeg4AppleTag.md#getfirstquicktimedata)
- [getFirstQuickTimeString](Mpeg4AppleTag.md#getfirstquicktimestring)
- [getItunesStrings](Mpeg4AppleTag.md#getitunesstrings)
- [getQuickTimeData](Mpeg4AppleTag.md#getquicktimedata)
- [getQuickTimeStrings](Mpeg4AppleTag.md#getquicktimestrings)
- [setItunesStrings](Mpeg4AppleTag.md#setitunesstrings)
- [setQuickTimeData](Mpeg4AppleTag.md#setquicktimedata)
- [setQuickTimeString](Mpeg4AppleTag.md#setquicktimestring)
- [setQuickTimeStrings](Mpeg4AppleTag.md#setquicktimestrings)
- [firstInGroup](Mpeg4AppleTag.md#firstingroup)
- [isFalsyOrLikeEmpty](Mpeg4AppleTag.md#isfalsyorlikeempty)
- [joinGroup](Mpeg4AppleTag.md#joingroup)
- [tagTypeFlagsToArray](Mpeg4AppleTag.md#tagtypeflagstoarray)

## Constructors

### constructor

• **new Mpeg4AppleTag**(`box`)

Constructs and initializes a new instance of AppleTag for a specified ISO user data box.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `box` | [`Mpeg4IsoUserDataBox`](Mpeg4IsoUserDataBox.md) | A IsoUserDataBox from which the tag is to be read. |

#### Overrides

[Tag](Tag.md).[constructor](Tag.md#constructor)

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

#### Overrides

Tag.album

• `set` **album**(`v`): `void`

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
| `v` | `string` | of the media represented by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Overrides

Tag.album

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
than [performers](Mpeg4AppleTag.md#performers). Where performers can be broken into multiple artists, it is
best to stick to a single name. Eg, "Super8 & Tab"

#### Returns

`string`[]

#### Overrides

Tag.albumArtists

• `set` **albumArtists**(`v`): `void`

Sets the bands or artists who are credited in the creation of the entire album or
collection containing the media described by the current instance.

This field is typically optional but aids in the sorting of compilations or albums
with multiple artist. For example, if an album has several artists, sorting by artist
will split up albums by the same artist. Having a single album artist for an entire
album solves this problem.
As this value is to be used as a sorting key, it should be used with less variation
than [performers](Mpeg4AppleTag.md#performers). Where performers can be broken into multiple artists, it is
best to stick to a single name. Eg, "Super8 & Tab"

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `string`[] | Band or artist credited with the creation of the entire album or collection containing the media described by the current instance or an empty array if no value is present |

#### Returns

`void`

#### Overrides

Tag.albumArtists

___

### albumArtistsSort

• `get` **albumArtistsSort**(): `string`[]

Gets the sortable names of the bands/artists who are credited with creating the entire
album or collection containing the media described by the current instance. See also:
[albumArtists](Mpeg4AppleTag.md#albumartists)

This is used to provide more control over how the media is sorted. Typical uses are to
skip articles or sort by last name. For example "Ben Folds" might be sorted as
"Folds, Ben".
As this value is to be used as a sorting key, it should be used with less variation than
[performers](Mpeg4AppleTag.md#performers). Where [performers](Mpeg4AppleTag.md#performers) can be broken into multiple performers, it is
best to stick to a single album artist. Eg, "Van Buuren, Armin"

#### Returns

`string`[]

#### Overrides

Tag.albumArtistsSort

• `set` **albumArtistsSort**(`v`): `void`

Sets the sortable names of the bands/artists who are credited with creating the entire
album or collection containing the media described by the current instance. See also:
[albumArtists](Mpeg4AppleTag.md#albumartists)

This is used to provide more control over how the media is sorted. Typical uses are to
skip articles or sort by last name. For example "Ben Folds" might be sorted as
"Folds, Ben".
As this value is to be used as a sorting key, it should be used with less variation than
[performers](Mpeg4AppleTag.md#performers). Where [performers](Mpeg4AppleTag.md#performers) can be broken into multiple performers, it is
best to stick to a single album artist. Eg, "Van Buuren, Armin"

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `string`[] | Sortable names for the bands/artists are credited with the creation of the entire album or collection containing the media described by the current instance, or an empty array if no value is present. |

#### Returns

`void`

#### Overrides

Tag.albumArtistsSort

___

### albumSort

• `get` **albumSort**(): `string`

Gets the sortable name of the album title of the media represented by the current instance.
See also: [album](Mpeg4AppleTag.md#album)

This field is typically optional but aids in sort of compilations or albums with
similar titles.

#### Returns

`string`

#### Overrides

Tag.albumSort

• `set` **albumSort**(`v`): `void`

Sets the sortable name of the album title of the media represented by the current instance.
See also: [album](Mpeg4AppleTag.md#album)

This field is typically optional but aids in sort of compilations or albums with
similar titles.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `string` | Sortable name for the album title of the media or `undefined` if the value is not present |

#### Returns

`void`

#### Overrides

Tag.albumSort

___

### amazonId

• `get` **amazonId**(): `string`

Gets the Amazon ID of the media represented by the current instance.

This field represents the AmazonID, also called the ASIN, and is used to uniquely
identify the particular track or album in the Amazon catalog.

#### Returns

`string`

#### Overrides

Tag.amazonId

• `set` **amazonId**(`v`): `void`

Sets the Amazon ID of the media represented by the current instance.

This field represents the AmazonID, also called the ASIN, and is used to uniquely
identify the particular track or album in the Amazon catalog.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `string` | Amazon ID of the media represented by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Overrides

Tag.amazonId

___

### beatsPerMinute

• `get` **beatsPerMinute**(): `number`

Gets the number of beats per minute in the audio of the media represented by the current
instance.

This field is useful for DJ's who are trying to beat match tracks. It should be
calculated from the audio or pulled from a database.

#### Returns

`number`

#### Overrides

Tag.beatsPerMinute

• `set` **beatsPerMinute**(`v`): `void`

Sets the number of beats per minute in the audio of the media represented by the current
instance.

This field is useful for DJ's who are trying to beat match tracks. It should be
calculated from the audio or pulled from a database.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `number` | Beats per minute of the audio in the media represented by the current instance, or `0` if not specified |

#### Returns

`void`

#### Overrides

Tag.beatsPerMinute

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

#### Overrides

Tag.comment

• `set` **comment**(`v`): `void`

Sets a user comment on the media represented by the current instance.

This field should be used to store user notes and comments. There is no constraint on
what text can be stored here, but it should not contain programmatic data.
Because this field contains notes the user might think of while consuming the media,
it may be useful for an application to make this field easily accessible, perhaps even
including it in the main interface.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `string` | User comments on the media represented by the current instance or `undefined` if the value is not present |

#### Returns

`void`

#### Overrides

Tag.comment

___

### composers

• `get` **composers**(): `string`[]

Gets the composers of the media represented by the current instance.

This field represents the composers, songwriters, scriptwriters, or persons who
claim authorship of the media.

#### Returns

`string`[]

#### Overrides

Tag.composers

• `set` **composers**(`v`): `void`

Sets the composers of the media represented by the current instance.

This field represents the composers, songwriters, scriptwriters, or persons who
claim authorship of the media.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `string`[] | Composers of the media represented by the current instance of an empty array if no value is present. |

#### Returns

`void`

#### Overrides

Tag.composers

___

### composersSort

• `get` **composersSort**(): `string`[]

Gets the sortable names of the composers of the media represented by the current instance.
See also: [composers](Mpeg4AppleTag.md#composers)

This field is typically optional but aids in the sorting of compilations or albums
with multiple composers.

#### Returns

`string`[]

#### Overrides

Tag.composersSort

• `set` **composersSort**(`v`): `void`

Sets the sortable names of the composers of the media represented by the current instance.
See also: [composers](Mpeg4AppleTag.md#composers)

This field is typically optional but aids in the sorting of compilations or albums
with multiple composers.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `string`[] | Sortable names for the composers of the media represented by the current instance or an empty array if no value is present. |

#### Returns

`void`

#### Overrides

Tag.composersSort

___

### conductor

• `get` **conductor**(): `string`

Gets the conductor or director of the media represented by the current instance.

This field is most useful for organizing classical music and movies.

#### Returns

`string`

#### Overrides

Tag.conductor

• `set` **conductor**(`v`): `void`

Sets the conductor or director of the media represented by the current instance.

This field is most useful for organizing classical music and movies.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `string` | Conductor or director of the media represented by the current instance or `undefined` if no value present. |

#### Returns

`void`

#### Overrides

Tag.conductor

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

#### Overrides

Tag.copyright

• `set` **copyright**(`v`): `void`

Sets the copyright information for the media represented by the current instance.

This field should be used for storing copyright information. It may be useful to show
this information somewhere in the program while the media is playing.
Players should not support editing this field, but media creation tools should
definitely allow modification.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `string` | Copyright information for the media represented by the current instance or `undefined` if no value is present. |

#### Returns

`void`

#### Overrides

Tag.copyright

___

### dateTagged

• `get` **dateTagged**(): `Date`

Gets the date and time at which the tag has been written.

#### Returns

`Date`

#### Overrides

Tag.dateTagged

• `set` **dateTagged**(`value`): `void`

Sets the date and time at which the tag has been written.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `Date` | Date/time at which the tag has been written, or `undefined` if no value is present |

#### Returns

`void`

#### Overrides

Tag.dateTagged

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

#### Overrides

Tag.description

• `set` **description**(`v`): `void`

Sets a short description of the media. For music, this could be the comment that the artist
made of his/her work. For a video, this should be a short summary of the story/plot, but
generally no spoliers. This should give the impression of what to expect in the media.

This is especially relevant for a movie. For example, for "Fear and Loathing in Las
Vegas", this could be "An oddball journalist and his psychopathic lawyer travel to Las
Vegas for a series of psychedelic escapades."

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `string` | Description of the media represented by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Overrides

Tag.description

___

### disc

• `get` **disc**(): `number`

Gets the number of the disc containing the media represented by the current instance in the
boxed set. For a series, this represents the season number.

This value should be the same as the number that appears on the disc. For example, if
the disc is the first of three, the value should be `1`. It should be no more than
[discCount](Mpeg4AppleTag.md#disccount) if [discCount](Mpeg4AppleTag.md#disccount) is non-zero.

#### Returns

`number`

#### Overrides

Tag.disc

• `set` **disc**(`v`): `void`

Sets the number of the disc containing the media represented by the current instance in the
boxed set. For a series, this represents the season number.

This value should be the same as the number that appears on the disc. For example, if
the disc is the first of three, the value should be `1`. It should be no more than
[discCount](Mpeg4AppleTag.md#disccount) if [discCount](Mpeg4AppleTag.md#disccount) is non-zero.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `number` | Number of the disc or season of the media represented by the current instance in a boxed set. |

#### Returns

`void`

#### Overrides

Tag.disc

___

### discCount

• `get` **discCount**(): `number`

Gets the number of discs or seasons in the boxed set containing the media represented by the
current instance.

If non-zero, this should be at least equal to [disc](Mpeg4AppleTag.md#disc). If [disc](Mpeg4AppleTag.md#disc) is zero,
this value should also be zero.

#### Returns

`number`

#### Overrides

Tag.discCount

• `set` **discCount**(`v`): `void`

Sets the number of discs or seasons in the boxed set containing the media represented by the
current instance.

If non-zero, this should be at least equal to [disc](Mpeg4AppleTag.md#disc). If [disc](Mpeg4AppleTag.md#disc) is zero,
this value should also be zero.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `number` | Number of discs or seasons in the boxed set containing the media represented by the current instance or `0` if not specified. |

#### Returns

`void`

#### Overrides

Tag.discCount

___

### firstAlbumArtist

• `get` **firstAlbumArtist**(): `string`

Gets the first value contained in [albumArtists](Mpeg4AppleTag.md#albumartists).

#### Returns

`string`

#### Inherited from

Tag.firstAlbumArtist

___

### firstAlbumArtistSort

• `get` **firstAlbumArtistSort**(): `string`

Gets the first value contained in [albumArtistsSort](Mpeg4AppleTag.md#albumartistssort)

#### Returns

`string`

#### Inherited from

Tag.firstAlbumArtistSort

___

### firstComposer

• `get` **firstComposer**(): `string`

Gets the first value contained in [composers](Mpeg4AppleTag.md#composers)

#### Returns

`string`

#### Inherited from

Tag.firstComposer

___

### firstComposerSort

• `get` **firstComposerSort**(): `string`

Gets the first value contained in [composersSort](Mpeg4AppleTag.md#composerssort)

#### Returns

`string`

#### Inherited from

Tag.firstComposerSort

___

### firstGenre

• `get` **firstGenre**(): `string`

Gets the first value contained in [genres](Mpeg4AppleTag.md#genres)

#### Returns

`string`

#### Inherited from

Tag.firstGenre

___

### firstPerformer

• `get` **firstPerformer**(): `string`

Gets the first value contained in [performers](Mpeg4AppleTag.md#performers)

#### Returns

`string`

#### Inherited from

Tag.firstPerformer

___

### firstPerformerSort

• `get` **firstPerformerSort**(): `string`

Gets the first value contained in [performersSort](Mpeg4AppleTag.md#performerssort)

#### Returns

`string`

#### Inherited from

Tag.firstPerformerSort

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

#### Overrides

Tag.genres

• `set` **genres**(`v`): `void`

Sets the genres of the media represented by the current instance.

This field represents genres that apply to the song, album, or video. This is often
used for filtering media.
A list of common audio genres as popularized by ID3v1 is stored in `genres.ts.
Additionally, `genres.ts` contains video genres as used by DivX.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `string`[] | Genres of the media represented by the current instance or an empty array if no value is present. |

#### Returns

`void`

#### Overrides

Tag.genres

___

### grouping

• `get` **grouping**(): `string`

Gets the grouping on the album which the media in the current instance belongs to.

This field contains a non-physical group to which the track belongs. In classical
music this could be a movement. It could also be parts of a series like "Introduction",
"Closing Remarks", etc.

#### Returns

`string`

#### Overrides

Tag.grouping

• `set` **grouping**(`v`): `void`

Sets the grouping on the album which the media in the current instance belongs to.

This field contains a non-physical group to which the track belongs. In classical
music this could be a movement. It could also be parts of a series like "Introduction",
"Closing Remarks", etc.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `string` | Grouping on the album which the media in the current instance belongs to or `undefined` if no value is present. |

#### Returns

`void`

#### Overrides

Tag.grouping

___

### initialKey

• `get` **initialKey**(): `string`

Gets the initial key of the track.

#### Returns

`string`

#### Overrides

Tag.initialKey

• `set` **initialKey**(`v`): `void`

Sets the initial key of the track.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `string` | Initial key of the track or `undefined` if no value is set |

#### Returns

`void`

#### Overrides

Tag.initialKey

___

### isCompilation

• `get` **isCompilation**(): `boolean`

Gets whether the album described by the current instance is a compilation.

#### Returns

`boolean`

#### Overrides

Tag.isCompilation

• `set` **isCompilation**(`v`): `void`

Gets whether the album described by the current instance is a compilation.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `boolean` | Whether the album described by the current instance is a compilation |

#### Returns

`void`

#### Overrides

Tag.isCompilation

___

### isEmpty

• `get` **isEmpty**(): `boolean`

Gets whether the current instance is empty.

#### Returns

`boolean`

#### Overrides

Tag.isEmpty

___

### isrc

• `get` **isrc**(): `string`

Gets the ISRC (International Standard Recording Code) of the track.

#### Returns

`string`

#### Overrides

Tag.isrc

• `set` **isrc**(`v`): `void`

Sets the ISRC (International Standard Recording Code) of the track.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `string` | ISRC of the track or `undefined` if no value is set |

#### Returns

`void`

#### Overrides

Tag.isrc

___

### joinedAlbumArtists

• `get` **joinedAlbumArtists**(): `string`

Gets a semicolon and space separated string containing the values in [albumArtists](Mpeg4AppleTag.md#albumartists)

#### Returns

`string`

#### Inherited from

Tag.joinedAlbumArtists

___

### joinedComposers

• `get` **joinedComposers**(): `string`

Gets a semicolon and space separated string containing the values in [composers](Mpeg4AppleTag.md#composers)

#### Returns

`string`

#### Inherited from

Tag.joinedComposers

___

### joinedGenres

• `get` **joinedGenres**(): `string`

Gets a semicolon and space separated string containing the values in [genres](Mpeg4AppleTag.md#genres)

#### Returns

`string`

#### Inherited from

Tag.joinedGenres

___

### joinedPerformers

• `get` **joinedPerformers**(): `string`

Gets a semicolon and space separated string containing the values in [performers](Mpeg4AppleTag.md#performers)

#### Returns

`string`

#### Inherited from

Tag.joinedPerformers

___

### joinedPerformersSort

• `get` **joinedPerformersSort**(): `string`

Gets a semicolon and space separated string containing the values in [performersSort](Mpeg4AppleTag.md#performerssort)

#### Returns

`string`

#### Inherited from

Tag.joinedPerformersSort

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

#### Overrides

Tag.lyrics

• `set` **lyrics**(`v`): `void`

Sets the lyrics or script of the media represented by the current instance.

This field contains a plain text representation of the lyrics or scripts with line
breaks and whitespace being the only formatting marks.
Some formats support more advanced lyrics, like synchronized lyrics, but those must be
accessed using format-specific implementations.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `string` | Lyrics or script of the media represented by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Overrides

Tag.lyrics

___

### musicBrainzArtistId

• `get` **musicBrainzArtistId**(): `string`

Gets the MusicBrainz artist ID of the media represented by the current instance.

This field represents the MusicBrainz ArtistID, and is used to uniquely identify a
particular artist of the track.

#### Returns

`string`

#### Overrides

Tag.musicBrainzArtistId

• `set` **musicBrainzArtistId**(`v`): `void`

Sets the MusicBrainz artist ID of the media represented by the current instance.

This field represents the MusicBrainz ArtistID, and is used to uniquely identify a
particular artist of the track.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `string` | MusicBrainz ArtistID of the media represented by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Overrides

Tag.musicBrainzArtistId

___

### musicBrainzDiscId

• `get` **musicBrainzDiscId**(): `string`

Gets the MusicBrainz disc ID of the media represented by the current instance.

This field represents the MusicBrainz DiscID and is used to uniquely identify the
particular released media associated with this track.

#### Returns

`string`

#### Overrides

Tag.musicBrainzDiscId

• `set` **musicBrainzDiscId**(`v`): `void`

Sets the MusicBrainz disc ID of the media represented by the current instance.

This field represents the MusicBrainz DiscID and is used to uniquely identify the
particular released media associated with this track.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `string` | MusicBrainz DiscID of the media represented by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Overrides

Tag.musicBrainzDiscId

___

### musicBrainzReleaseArtistId

• `get` **musicBrainzReleaseArtistId**(): `string`

Gets the MusicBrainz release artist ID of the media represented by the current instance.

This field represents the MusicBrainz ReleaseArtistID, and is used to uniquely
identify a particular album artist credited with the album.

#### Returns

`string`

#### Overrides

Tag.musicBrainzReleaseArtistId

• `set` **musicBrainzReleaseArtistId**(`v`): `void`

Sets the MusicBrainz release artist ID of the media represented by the current instance.

This field represents the MusicBrainz ReleaseArtistID, and is used to uniquely
identify a particular album artist credited with the album.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `string` | MusicBrainz ReleaseArtistID of the media represented by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Overrides

Tag.musicBrainzReleaseArtistId

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

#### Overrides

Tag.musicBrainzReleaseCountry

• `set` **musicBrainzReleaseCountry**(`v`): `void`

Sets the MusicBrainz release country of the media represented by the current instance.

This field represents the MusicBrainz ReleaseCountry which describes the country in
which an album was released. Note that the release country of an album is not
necessarily the country in which it was produced. The label itself will typically be
more relevant. Eg, a release on "Foo Records UK" that has "Made in Austria" printed on
it will likely be a UK release.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `string` | MusicBrainz ReleaseCountry of the media represented by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Overrides

Tag.musicBrainzReleaseCountry

___

### musicBrainzReleaseGroupId

• `get` **musicBrainzReleaseGroupId**(): `string`

Gets the MusicBrainz release group ID of the media represented by the current instance.

This field represents the MusicBrainz ReleaseGroupID and is used to uniquely identify
a particular release group to which this track belongs.

#### Returns

`string`

#### Overrides

Tag.musicBrainzReleaseGroupId

• `set` **musicBrainzReleaseGroupId**(`v`): `void`

Sets the MusicBrainz release group ID of the media represented by the current instance.

This field represents the MusicBrainz ReleaseGroupID and is used to uniquely identify
a particular release group to which this track belongs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `string` | MusicBrainz ReleaseGroupID of the media represented by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Overrides

Tag.musicBrainzReleaseGroupId

___

### musicBrainzReleaseId

• `get` **musicBrainzReleaseId**(): `string`

Gets the MusicBrainz release ID of the media represented by the current instance.

This field represents the MusicBrains ReleaseID and is used to uniquely identify a
particular release to which this track belongs.

#### Returns

`string`

#### Overrides

Tag.musicBrainzReleaseId

• `set` **musicBrainzReleaseId**(`v`): `void`

Sets the MusicBrainz release ID of the media represented by the current instance.

This field represents the MusicBrains ReleaseID and is used to uniquely identify a
particular release to which this track belongs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `string` | MusicBrainz ReleaseID of the media represented by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Overrides

Tag.musicBrainzReleaseId

___

### musicBrainzReleaseStatus

• `get` **musicBrainzReleaseStatus**(): `string`

Gets the MusicBrainz release status of the media represented by the current instance.

This field represents the MusicBrainz ReleaseStatus used to describe how 'official' a
release is. Common statuses are: `Official`, `Promotion`, `Bootleg`, `Pseudo-release`.

#### Returns

`string`

#### Overrides

Tag.musicBrainzReleaseStatus

• `set` **musicBrainzReleaseStatus**(`v`): `void`

Sets the MusicBrainz release status of the media represented by the current instance.

This field represents the MusicBrainz ReleaseStatus used to describe how 'official' a
release is. Common statuses are: `Official`, `Promotion`, `Bootleg`, `Pseudo-release`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `string` | MusicBrainz ReleaseStatus of the media represented by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Overrides

Tag.musicBrainzReleaseStatus

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

#### Overrides

Tag.musicBrainzReleaseType

• `set` **musicBrainzReleaseType**(`v`): `void`

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
| `v` | `string` |

#### Returns

`void`

#### Overrides

Tag.musicBrainzReleaseType

___

### musicBrainzTrackId

• `get` **musicBrainzTrackId**(): `string`

Gets the MusicBrainz track ID of the media represented by the media represented by the
current instance.

This field represents the MusicBrainz TrackID and is used to uniquely identify a
particular track.

#### Returns

`string`

#### Overrides

Tag.musicBrainzTrackId

• `set` **musicBrainzTrackId**(`v`): `void`

Sets the MusicBrainz track ID of the media represented by the media represented by the
current instance.

This field represents the MusicBrainz TrackID and is used to uniquely identify a
particular track.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `string` | MusicBrainz TrackID of the media represented by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Overrides

Tag.musicBrainzTrackId

___

### musicIpId

• `get` **musicIpId**(): `string`

Gets the MusicIP PUID of the media represented by the current instance.

This field represents the MusicIP PUID, an acoustic fingerprint identifier. It
identifies wht this track "sounds like".

#### Returns

`string`

#### Overrides

Tag.musicIpId

• `set` **musicIpId**(`v`): `void`

Sets the MusicIP PUID of the media represented by the current instance.

This field represents the MusicIP PUID, an acoustic fingerprint identifier. It
identifies wht this track "sounds like".

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `string` | MusicIP PUID of the media represented by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Overrides

Tag.musicIpId

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

#### Overrides

Tag.performers

• `set` **performers**(`v`): `void`

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
| `v` | `string`[] | Performers who performed in the media described by the current instance or an empty array if no value is present. |

#### Returns

`void`

#### Overrides

Tag.performers

___

### performersRole

• `get` **performersRole**(): `string`[]

Gets the characters portrayed by an actor for a video or instruments played by a musician
for music. This must match the [performers](Mpeg4AppleTag.md#performers) array (for each person, correspond one/more
role). Several roles for the same artist/actor can be separated with semicolons. For
example: "Bass; Backing Vocals; Vibraphone".

It is highly important to match each role to the performers. This means that an entry
in the [performersRole](Mpeg4AppleTag.md#performersrole) array is `undefined` to maintain the relationship between
`performers[i]` and `performersRole[i]`.

#### Returns

`string`[]

#### Overrides

Tag.performersRole

• `set` **performersRole**(`v`): `void`

Sets the characters portrayed by an actor for a video or instruments played by a musician
for music. This must match the [performers](Mpeg4AppleTag.md#performers) array (for each person, correspond one/more
role). Several roles for the same artist/actor can be separated with semicolons. For
example: "Bass; Backing Vocals; Vibraphone".

It is highly important to match each role to the performers. This means that an entry
in the [performersRole](Mpeg4AppleTag.md#performersrole) array is `undefined` to maintain the relationship between
`performers[i]` and `performersRole[i]`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `string`[] | Array containing the roles played by the performers in the media described by the current instance, or an empty array if no value is present. |

#### Returns

`void`

#### Overrides

Tag.performersRole

___

### performersSort

• `get` **performersSort**(): `string`[]

Gets the sortable names of the performers or artists who performed in the media described by
the current instance.

This is used to provide more control over how the media is sorted. Typical uses are to
skip articles or sort by last name. For example, "The Pillows" might be sorted as
"Pillows, The". See also: [performers](Mpeg4AppleTag.md#performers)

#### Returns

`string`[]

#### Overrides

Tag.performersSort

• `set` **performersSort**(`v`): `void`

Gets the sortable names of the performers or artists who performed in the media described by
the current instance.

This is used to provide more control over how the media is sorted. Typical uses are to
skip articles or sort by last name. For example, "The Pillows" might be sorted as
"Pillows, The". See also: [performers](Mpeg4AppleTag.md#performers)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `string`[] | Sortable names for the performers who performed in the media described by the current instance, or an empty array if no value is present. |

#### Returns

`void`

#### Overrides

Tag.performersSort

___

### pictures

• `get` **pictures**(): [`IPicture`](../interfaces/IPicture.md)[]

Gets a collection of pictures associated with the media represented by the current instance.

Typically, this value is used to store an album cover or icon to use for the file, but
it is capable of holding any type of image or file, including pictures of the band, the
recording studio, the concert, etc.

#### Returns

[`IPicture`](../interfaces/IPicture.md)[]

#### Overrides

Tag.pictures

• `set` **pictures**(`v`): `void`

Sets a collection of pictures associated with the media represented by the current instance.

Typically, this value is used to store an album cover or icon to use for the file, but
it is capable of holding any type of image or file, including pictures of the band, the
recording studio, the concert, etc.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | [`IPicture`](../interfaces/IPicture.md)[] | Array containing a collection of pictures associated with the media represented by the current instance or an empty array if no pictures are present. |

#### Returns

`void`

#### Overrides

Tag.pictures

___

### publisher

• `get` **publisher**(): `string`

Gets the publisher of the track.

#### Returns

`string`

#### Overrides

Tag.publisher

• `set` **publisher**(`v`): `void`

Sets the publisher of the track.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `string` | Publisher of the track or `undefined` if no value is set |

#### Returns

`void`

#### Overrides

Tag.publisher

___

### remixedBy

• `get` **remixedBy**(): `string`

Gets the remixer of the track.

#### Returns

`string`

#### Overrides

Tag.remixedBy

• `set` **remixedBy**(`v`): `void`

Sets the remixer of the track.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `string` | Remixer of the track or `undefined` if no value is set |

#### Returns

`void`

#### Overrides

Tag.remixedBy

___

### replayGainAlbumGain

• `get` **replayGainAlbumGain**(): `number`

Gets the ReplayGain album gain in dB.

#### Returns

`number`

#### Overrides

Tag.replayGainAlbumGain

• `set` **replayGainAlbumGain**(`v`): `void`

Sets the ReplayGain album gain in dB.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `number` | Album gain as per the ReplayGain specifications, in dB, or `NaN` if no value is set |

#### Returns

`void`

#### Overrides

Tag.replayGainAlbumGain

___

### replayGainAlbumPeak

• `get` **replayGainAlbumPeak**(): `number`

Gets the ReplayGain album peak sample.

#### Returns

`number`

#### Overrides

Tag.replayGainAlbumPeak

• `set` **replayGainAlbumPeak**(`v`): `void`

Sets the ReplayGain album peak sample.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `number` | Album peak as per the ReplayGain specifications, or `NaN` if no value is set |

#### Returns

`void`

#### Overrides

Tag.replayGainAlbumPeak

___

### replayGainTrackGain

• `get` **replayGainTrackGain**(): `number`

Gets the ReplayGain track gain in dB.

#### Returns

`number`

#### Overrides

Tag.replayGainTrackGain

• `set` **replayGainTrackGain**(`v`): `void`

Sets the ReplayGain track gain in dB.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `number` | Track gain as per ReplayGain specifications, in dB, or `NaN` if no value is set |

#### Returns

`void`

#### Overrides

Tag.replayGainTrackGain

___

### replayGainTrackPeak

• `get` **replayGainTrackPeak**(): `number`

Gets the ReplayGain track peak sample.

#### Returns

`number`

#### Overrides

Tag.replayGainTrackPeak

• `set` **replayGainTrackPeak**(`v`): `void`

Sets the ReplayGain track peak sample.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `number` | Track peak as per the ReplayGain specifications, or `NaN` if no value is set |

#### Returns

`void`

#### Overrides

Tag.replayGainTrackPeak

___

### sizeOnDisk

• `get` **sizeOnDisk**(): `number`

Gets the size of the tag in bytes on disk as it was read from disk.

#### Returns

`number`

#### Overrides

Tag.sizeOnDisk

___

### subtitle

• `get` **subtitle**(): `string`

Gets a description, one-line. It represents the tagline of the vide/music.

This field gives a nice/short precision to the title, which is typically below the
title on the front cover of the media. For example for "Ocean's 13", this would be
"Revenge is a funny thing".

#### Returns

`string`

#### Overrides

Tag.subtitle

• `set` **subtitle**(`v`): `void`

Sets a description, one-line. It represents the tagline of the vide/music.

This field gives a nice/short precision to the title, which is typically below the
title on the front cover of the media. For example for "Ocean's 13", this would be
"Revenge is a funny thing".

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `string` | Subtitle of the media represented by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Overrides

Tag.subtitle

___

### tagTypes

• `get` **tagTypes**(): [`TagTypes`](../enums/TagTypes.md)

Gets the tag types contained in the current instance. A bit wise combined [TagTypes](../enums/TagTypes.md)
containing the tag types contained in the current instance.

#### Returns

[`TagTypes`](../enums/TagTypes.md)

#### Overrides

Tag.tagTypes

___

### title

• `get` **title**(): `string`

Gets the title for the media described by the current instance.

#### Returns

`string`

#### Overrides

Tag.title

• `set` **title**(`v`): `void`

Sets the title for the media described by the current instance.

The title is most commonly the name of the song, episode or a movie title. For example
"Time Won't Me Go" (a song by The Bravery), "Three Stories" (an episode of House MD), or
"Fear and Loathing In Las Vegas" (a movie).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `string` | Title of the media described by the current instance or `undefined` if no value is present. |

#### Returns

`void`

#### Overrides

Tag.title

___

### titleSort

• `get` **titleSort**(): `string`

Gets the sortable name for the title of the media described by the current instance.

Possibly used to sort compilations or episodic content.

#### Returns

`string`

#### Overrides

Tag.titleSort

• `set` **titleSort**(`v`): `void`

Sets the sortable name for the title of the media described by the current instance.

Possibly used to sort compilations or episodic content.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `string` | Sortable name of the media described by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Overrides

Tag.titleSort

___

### track

• `get` **track**(): `number`

Gets the position of the media represented by the current instance in its containing album
or season (for a series).

This value should be the same as is listed on the album cover and no more than
[trackCount](Mpeg4AppleTag.md#trackcount), if [trackCount](Mpeg4AppleTag.md#trackcount) is non-zero.
Most tagging formats store this as a string. To help sorting, a two-digit zero-padded
value is used in the resulting tag.
For a series, this property represents the episodes in a season of the series.

#### Returns

`number`

#### Overrides

Tag.track

• `set` **track**(`v`): `void`

Sets the position of the media represented by the current instance in its containing album
or season (for a series).

This value should be the same as is listed on the album cover and no more than
[trackCount](Mpeg4AppleTag.md#trackcount), if [trackCount](Mpeg4AppleTag.md#trackcount) is non-zero.
Most tagging formats store this as a string. To help sorting, a two-digit zero-padded
value is used in the resulting tag.
For a series, this property represents the episodes in a season of the series.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `number` | Position of the media represented by the current instance in its containing album or `0` if not specified. |

#### Returns

`void`

#### Overrides

Tag.track

___

### trackCount

• `get` **trackCount**(): `number`

Gets the number of tracks on the album or the number of episodes in a series of the media
represented by the current instance.

If non-zero, this value should be equal to or greater than [track](Mpeg4AppleTag.md#track). If
[track](Mpeg4AppleTag.md#track) is `0`, this value should also be `0`.

#### Returns

`number`

#### Overrides

Tag.trackCount

• `set` **trackCount**(`v`): `void`

Sets the number of tracks on the album or the number of episodes in a series of the media
represented by the current instance.

If non-zero, this value should be equal to or greater than [track](Mpeg4AppleTag.md#track). If
[track](Mpeg4AppleTag.md#track) is `0`, this value should also be `0`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `number` | Number of tracks on the album or number of episodes in a series of the media represented by the current instance or `0` if not specified. |

#### Returns

`void`

#### Overrides

Tag.trackCount

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

#### Overrides

Tag.year

• `set` **year**(`v`): `void`

Sets the year that the media represented by the current instance was recorded.

Years greater than 9999 cannot be stored by most tagging formats and will be cleared
if a higher value is set. Some tagging formats store higher precision dates which will
be truncated when this property is set. Format specific implementations are necessary to
access the higher precision values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `number` | Year that the media represented by the current instance was created or `0` if no value is present. |

#### Returns

`void`

#### Overrides

Tag.year

## Methods

### clear

▸ **clear**(): `void`

Clears all values stored in the current instance.

#### Returns

`void`

#### Overrides

[Tag](Tag.md).[clear](Tag.md#clear)

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

[Tag](Tag.md).[copyTo](Tag.md#copyto)

___

### getFirstItunesString

▸ **getFirstItunesString**(`meanString`, `nameString`): `string`

Gets the first string from the iTunes boxes with the given MEAN/NAME combination.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `meanString` | `string` | MEAN box contents to search for |
| `nameString` | `string` | NAME box contents to search for |

#### Returns

`string`

string Text contents of the first iTunes box found with the given MEAN/NAME
    combination or `undefined` if no matches found.

___

### getFirstQuickTimeData

▸ **getFirstQuickTimeData**(`boxType`, `flags?`, `predicate?`): [`ByteVector`](ByteVector.md)

Gets the raw data contents of the first box within this tag's ILST box that matches the
provided `boxType`, optionally matching `flags` and a predicate.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `boxType` | [`ByteVector`](ByteVector.md) | `undefined` | Type of box to search for |
| `flags` | [`Mpeg4AppleDataBoxFlagType`](../enums/Mpeg4AppleDataBoxFlagType.md) | `AppleDataBoxFlagType.ContainsData` | Optional flags to match, defaults to AppleDataBoxFlagType.ContainsData |
| `predicate?` | (`d`: [`ByteVector`](ByteVector.md)) => `boolean` | `undefined` | Optional additional criteria the box must match |

#### Returns

[`ByteVector`](ByteVector.md)

ByteVector Raw data contents of the first matching box. `undefined` if no matches
    are found

___

### getFirstQuickTimeString

▸ **getFirstQuickTimeString**(`boxType`): `string`

Gets the text contents of the first box within this tag's ILST box that matches the provided
`boxType`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `boxType` | [`ByteVector`](ByteVector.md) | Type of the box to search for. |

#### Returns

`string`

string Text contents of the first matching box. `undefined` if no matches are found

___

### getItunesStrings

▸ **getItunesStrings**(`meanString`, `nameString`): `string`[]

Gets all strings from the iTunes boxes with the given MEAN/NAME combination.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `meanString` | `string` | MEAN box contents to look for |
| `nameString` | `string` | NAME box contents to look for |

#### Returns

`string`[]

string[] Text contents of the iTunes boxes with the given NAME/MEAN combination or
    `[]` if there are no matches.

___

### getQuickTimeData

▸ **getQuickTimeData**(`boxType`, `flags?`): [`ByteVector`](ByteVector.md)[]

Gets the raw data of all boxes within this tag's ILST box of the given `boxType`, optionally
matching the provided `flags
@param boxType Type of box to search for
@param flags Optional, box flags to search for. Defaults to
    {@link AppleDataBoxFlagType.ContainsData}
@returns ByteVector[] Raw contents of the matching boxes, `[]` if no matches are found.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `boxType` | [`ByteVector`](ByteVector.md) | `undefined` |
| `flags` | [`Mpeg4AppleDataBoxFlagType`](../enums/Mpeg4AppleDataBoxFlagType.md) | `AppleDataBoxFlagType.ContainsData` |

#### Returns

[`ByteVector`](ByteVector.md)[]

___

### getQuickTimeStrings

▸ **getQuickTimeStrings**(`boxType`): `string`[]

Gets the text contents of all boxes with the given `boxType` inside the tag's ILST box.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `boxType` | [`ByteVector`](ByteVector.md) | Type of box to search for |

#### Returns

`string`[]

string[] Text contents of all boxes with the given `boxType` or `undefined` if no
    matches were found.

___

### setItunesStrings

▸ **setItunesStrings**(`meanString`, `nameString`, `...dataStrings`): `void`

Stores the provided `dataStrings` in iTunes boxes with the provided MEAN and NAME strings.
This replaces any existing boxes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `meanString` | `string` | MEAN box contents to set |
| `nameString` | `string` | NAME box contents to set |
| `...dataStrings` | `string`[] | Contents of the iTunes box to store. Use `[]` or `undefined` to clear the existing contents and leave empty. |

#### Returns

`void`

___

### setQuickTimeData

▸ **setQuickTimeData**(`boxType`, `data`, `flags?`): `void`

Stores the provided `data` in boxes with the provided box type. If `flags` are provided, the
DATA boxes created to store `data` will have the `flags` applied to them. This replaces all
existing boxes of the given type.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `boxType` | [`ByteVector`](ByteVector.md) | `undefined` | Type of the box to set |
| `data` | [`ByteVector`](ByteVector.md)[] | `undefined` | Data to store in the boxes |
| `flags` | [`Mpeg4AppleDataBoxFlagType`](../enums/Mpeg4AppleDataBoxFlagType.md) | `AppleDataBoxFlagType.ContainsData` | Optional, flags to set on the DATA boxes |

#### Returns

`void`

___

### setQuickTimeString

▸ **setQuickTimeString**(`boxType`, `dataString`): `void`

Stores the provided string in a box with the provided box type. This replaces all boxes of
the given type with a single box containing the provided data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `boxType` | [`ByteVector`](ByteVector.md) | Type of box to set |
| `dataString` | `string` | Contents to store in the box |

#### Returns

`void`

___

### setQuickTimeStrings

▸ **setQuickTimeStrings**(`boxType`, `dataStrings`): `void`

Stores the provided strings in boxes with the provided box type. This replaces all boxes of
the given type with a single box of the given type containing a DATA box for each of the
provided `dataStrings`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `boxType` | [`ByteVector`](ByteVector.md) | Type of box to set |
| `dataStrings` | `string`[] | Contents to store in the box |

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

[Tag](Tag.md).[firstInGroup](Tag.md#firstingroup)

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

[Tag](Tag.md).[isFalsyOrLikeEmpty](Tag.md#isfalsyorlikeempty)

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

[Tag](Tag.md).[joinGroup](Tag.md#joingroup)

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

[Tag](Tag.md).[tagTypeFlagsToArray](Tag.md#tagtypeflagstoarray)
