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

Gets the album of the media represented by the current instance. For video media, this
represents the collection the video belongs to.

This field represents the name of the album the media belongs to. In the case of a
boxed set, it should be the name of the entire set rather than the individual disc. In
the case of a series, this should be the name of the series, rather than the season of a
series.

For example, "Kintsugi" (an album by Death Cab for Cutie), "The Complete Red Green Show"
(a boxed set of TV episodes), or "Shark Tank" (a series with several seasons).

**`Remarks`**

Implemented via the `DIRC` item.

#### Returns

`string`

#### Overrides

RiffListTag.album

• `set` **album**(`value`): `void`

Sets the album of the media represented by the current instance. For video media, this
represents the collection the video belongs to.

This field represents the name of the album the media belongs to. In the case of a
boxed set, it should be the name of the entire set rather than the individual disc. In
the case of a series, this should be the name of the series, rather than the season of a
series.

For example, "Kintsugi" (an album by Death Cab for Cutie), "The Complete Red Green Show"
(a boxed set of TV episodes), or "Shark Tank" (a series with several seasons).

**`Remarks`**

Implemented via the `DIRC` item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | of the media represented by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Overrides

RiffListTag.album

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
than [performers](InfoTag.md#performers). Where performers can be broken into multiple artists, it is
best to stick to a single name. Eg, "Super8 & Tab"

**`Remarks`**

Implemented via the `IART` item.

#### Returns

`string`[]

#### Overrides

RiffListTag.albumArtists

• `set` **albumArtists**(`value`): `void`

Sets the bands or artists who are credited in the creation of the entire album or
collection containing the media described by the current instance.

This field is typically optional but aids in the sorting of compilations or albums
with multiple artist. For example, if an album has several artists, sorting by artist
will split up albums by the same artist. Having a single album artist for an entire
album solves this problem.
As this value is to be used as a sorting key, it should be used with less variation
than [performers](InfoTag.md#performers). Where performers can be broken into multiple artists, it is
best to stick to a single name. Eg, "Super8 & Tab"

**`Remarks`**

Implemented via the `IART` item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string`[] | Band or artist credited with the creation of the entire album or collection containing the media described by the current instance or an empty array if no value is present |

#### Returns

`void`

#### Overrides

RiffListTag.albumArtists

___

### albumArtistsSort

• `get` **albumArtistsSort**(): `string`[]

Gets the sortable names of the bands/artists who are credited with creating the entire
album or collection containing the media described by the current instance. See also:
[albumArtists](InfoTag.md#albumartists)

This is used to provide more control over how the media is sorted. Typical uses are to
skip articles or sort by last name. For example "Ben Folds" might be sorted as
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
album or collection containing the media described by the current instance. See also:
[albumArtists](InfoTag.md#albumartists)

This is used to provide more control over how the media is sorted. Typical uses are to
skip articles or sort by last name. For example "Ben Folds" might be sorted as
"Folds, Ben".
As this value is to be used as a sorting key, it should be used with less variation than
[performers](InfoTag.md#performers). Where [performers](InfoTag.md#performers) can be broken into multiple performers, it is
best to stick to a single album artist. Eg, "Van Buuren, Armin"

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string`[] | Sortable names for the bands/artists are credited with the creation of the entire album or collection containing the media described by the current instance, or an empty array if no value is present. |

#### Returns

`void`

#### Inherited from

RiffListTag.albumArtistsSort

___

### albumSort

• `get` **albumSort**(): `string`

Gets the sortable name of the album title of the media represented by the current instance.
See also: [album](InfoTag.md#album)

This field is typically optional but aids in sort of compilations or albums with
similar titles.

#### Returns

`string`

Sortable name for the album title of the media or `undefined` if the value is not
    present

#### Inherited from

RiffListTag.albumSort

• `set` **albumSort**(`value`): `void`

Sets the sortable name of the album title of the media represented by the current instance.
See also: [album](InfoTag.md#album)

This field is typically optional but aids in sort of compilations or albums with
similar titles.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Sortable name for the album title of the media or `undefined` if the value is not present |

#### Returns

`void`

#### Inherited from

RiffListTag.albumSort

___

### amazonId

• `get` **amazonId**(): `string`

Gets the Amazon ID of the media represented by the current instance.

This field represents the AmazonID, also called the ASIN, and is used to uniquely
identify the particular track or album in the Amazon catalog.

#### Returns

`string`

Amazon ID of the media represented by the current instance or `undefined` if no
    value is present

#### Inherited from

RiffListTag.amazonId

• `set` **amazonId**(`value`): `void`

Sets the Amazon ID of the media represented by the current instance.

This field represents the AmazonID, also called the ASIN, and is used to uniquely
identify the particular track or album in the Amazon catalog.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Amazon ID of the media represented by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Inherited from

RiffListTag.amazonId

___

### beatsPerMinute

• `get` **beatsPerMinute**(): `number`

Gets the number of beats per minute in the audio of the media represented by the current
instance.

This field is useful for DJ's who are trying to beat match tracks. It should be
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

This field is useful for DJ's who are trying to beat match tracks. It should be
calculated from the audio or pulled from a database.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Beats per minute of the audio in the media represented by the current instance, or `0` if not specified |

#### Returns

`void`

#### Inherited from

RiffListTag.beatsPerMinute

___

### comment

• `get` **comment**(): `string`

Gets a user comment on the media represented by the current instance.

This field should be used to store user notes and comments. There is no constraint on
what text can be stored here, but it should not contain programmatic data.
Because this field contains notes the user might think of while consuming the media,
it may be useful for an application to make this field easily accessible, perhaps even
including it in the main interface.

**`Remarks`**

Implemented via the `ICMT` item.

#### Returns

`string`

#### Overrides

RiffListTag.comment

• `set` **comment**(`value`): `void`

Sets a user comment on the media represented by the current instance.

This field should be used to store user notes and comments. There is no constraint on
what text can be stored here, but it should not contain programmatic data.
Because this field contains notes the user might think of while consuming the media,
it may be useful for an application to make this field easily accessible, perhaps even
including it in the main interface.

**`Remarks`**

Implemented via the `ICMT` item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | User comments on the media represented by the current instance or `undefined` if the value is not present |

#### Returns

`void`

#### Overrides

RiffListTag.comment

___

### composers

• `get` **composers**(): `string`[]

Gets the composers of the media represented by the current instance.

This field represents the composers, songwriters, scriptwriters, or persons who
claim authorship of the media.

**`Remarks`**

Implemented via the `IWRI` item.

#### Returns

`string`[]

#### Overrides

RiffListTag.composers

• `set` **composers**(`value`): `void`

Sets the composers of the media represented by the current instance.

This field represents the composers, songwriters, scriptwriters, or persons who
claim authorship of the media.

**`Remarks`**

Implemented via the `IWRI` item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string`[] | Composers of the media represented by the current instance of an empty array if no value is present. |

#### Returns

`void`

#### Overrides

RiffListTag.composers

___

### composersSort

• `get` **composersSort**(): `string`[]

Gets the sortable names of the composers of the media represented by the current instance.
See also: [composers](InfoTag.md#composers)

This field is typically optional but aids in the sorting of compilations or albums
with multiple composers.

#### Returns

`string`[]

Sortable names for the composers of the media represented by the current instance
    or an empty array if no value is present.

#### Inherited from

RiffListTag.composersSort

• `set` **composersSort**(`value`): `void`

Sets the sortable names of the composers of the media represented by the current instance.
See also: [composers](InfoTag.md#composers)

This field is typically optional but aids in the sorting of compilations or albums
with multiple composers.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string`[] | Sortable names for the composers of the media represented by the current instance or an empty array if no value is present. |

#### Returns

`void`

#### Inherited from

RiffListTag.composersSort

___

### conductor

• `get` **conductor**(): `string`

Gets the conductor or director of the media represented by the current instance.

This field is most useful for organizing classical music and movies.

**`Remarks`**

Implemented via the `ICNM` item.

#### Returns

`string`

#### Overrides

RiffListTag.conductor

• `set` **conductor**(`value`): `void`

Sets the conductor or director of the media represented by the current instance.

This field is most useful for organizing classical music and movies.

**`Remarks`**

Implemented via the `ISBJ` item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Conductor or director of the media represented by the current instance or `undefined` if no value present. |

#### Returns

`void`

#### Overrides

RiffListTag.conductor

___

### copyright

• `get` **copyright**(): `string`

Gets the copyright information for the media represented by the current instance.

This field should be used for storing copyright information. It may be useful to show
this information somewhere in the program while the media is playing.
Players should not support editing this field, but media creation tools should
definitely allow modification.

**`Remarks`**

Implemented via the `ICOP` item.

#### Returns

`string`

#### Overrides

RiffListTag.copyright

• `set` **copyright**(`value`): `void`

Sets the copyright information for the media represented by the current instance.

This field should be used for storing copyright information. It may be useful to show
this information somewhere in the program while the media is playing.
Players should not support editing this field, but media creation tools should
definitely allow modification.

**`Remarks`**

Implemented via the `ICOP` item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Copyright information for the media represented by the current instance or `undefined` if no value is present. |

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
| `value` | `Date` | Date/time at which the tag has been written, or `undefined` if no value is present |

#### Returns

`void`

#### Inherited from

RiffListTag.dateTagged

___

### description

• `get` **description**(): `string`

Gets a short description of the media. For music, this could be the comment that the artist
made of his/her work. For a video, this should be a short summary of the story/plot, but
generally no spoliers. This should give the impression of what to expect in the media.

This is especially relevant for a movie. For example, for "Fear and Loathing in Las
Vegas", this could be "An oddball journalist and his psychopathic lawyer travel to Las
Vegas for a series of psychedelic escapades."

**`Remarks`**

Implemented via the `ISBJ` item.

#### Returns

`string`

#### Overrides

RiffListTag.description

• `set` **description**(`value`): `void`

Sets a short description of the media. For music, this could be the comment that the artist
made of his/her work. For a video, this should be a short summary of the story/plot, but
generally no spoliers. This should give the impression of what to expect in the media.

This is especially relevant for a movie. For example, for "Fear and Loathing in Las
Vegas", this could be "An oddball journalist and his psychopathic lawyer travel to Las
Vegas for a series of psychedelic escapades."

**`Remarks`**

Implemented via the `ISBJ` item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Description of the media represented by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Overrides

RiffListTag.description

___

### disc

• `get` **disc**(): `number`

Gets the number of the disc containing the media represented by the current instance in the
boxed set. For a series, this represents the season number.

This value should be the same as the number that appears on the disc. For example, if
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

This value should be the same as the number that appears on the disc. For example, if
the disc is the first of three, the value should be `1`. It should be no more than
[discCount](InfoTag.md#disccount) if [discCount](InfoTag.md#disccount) is non-zero.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Number of the disc or season of the media represented by the current instance in a boxed set. |

#### Returns

`void`

#### Inherited from

RiffListTag.disc

___

### discCount

• `get` **discCount**(): `number`

Gets the number of discs or seasons in the boxed set containing the media represented by the
current instance.

If non-zero, this should be at least equal to [disc](InfoTag.md#disc). If [disc](InfoTag.md#disc) is zero,
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

If non-zero, this should be at least equal to [disc](InfoTag.md#disc). If [disc](InfoTag.md#disc) is zero,
this value should also be zero.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Number of discs or seasons in the boxed set containing the media represented by the current instance or `0` if not specified. |

#### Returns

`void`

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

Gets the genres of the media represented by the current instance.

This field represents genres that apply to the song, album, or video. This is often
used for filtering media.
A list of common audio genres as popularized by ID3v1 is stored in `genres.ts`.
Additionally, `genres.ts` contains video genres as used by DivX.

**`Remarks`**

Implemented via the `IGNR` item.

#### Returns

`string`[]

#### Overrides

RiffListTag.genres

• `set` **genres**(`value`): `void`

Sets the genres of the media represented by the current instance.

This field represents genres that apply to the song, album, or video. This is often
used for filtering media.
A list of common audio genres as popularized by ID3v1 is stored in `genres.ts.
Additionally, `genres.ts` contains video genres as used by DivX.

**`Remarks`**

Implemented via the `IGNR` item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string`[] | Genres of the media represented by the current instance or an empty array if no value is present. |

#### Returns

`void`

#### Overrides

RiffListTag.genres

___

### grouping

• `get` **grouping**(): `string`

Gets the grouping on the album which the media in the current instance belongs to.

This field contains a non-physical group to which the track belongs. In classical
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

This field contains a non-physical group to which the track belongs. In classical
music this could be a movement. It could also be parts of a series like "Introduction",
"Closing Remarks", etc.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Grouping on the album which the media in the current instance belongs to or `undefined` if no value is present. |

#### Returns

`void`

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

#### Inherited from

RiffListTag.initialKey

___

### isCompilation

• `get` **isCompilation**(): `boolean`

Gets whether the album described by the current instance is a compilation.

#### Returns

`boolean`

#### Inherited from

RiffListTag.isCompilation

• `set` **isCompilation**(`value`): `void`

Gets whether the album described by the current instance is a compilation.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `boolean` | Whether the album described by the current instance is a compilation |

#### Returns

`void`

#### Inherited from

RiffListTag.isCompilation

___

### isEmpty

• `get` **isEmpty**(): `boolean`

Gets whether the current instance is empty.

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

ISRC of the track or `undefined` if no value is set

#### Inherited from

RiffListTag.isrc

• `set` **isrc**(`value`): `void`

Sets the ISRC (International Standard Recording Code) of the track.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | ISRC of the track or `undefined` if no value is set |

#### Returns

`void`

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

**`Remarks`**

Tags based on RiffLists are only supposed to support certain fields. Modify at your
    own risk.

#### Returns

[`RiffList`](RiffList.md)

#### Inherited from

RiffListTag.list

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

Lyrics or script of the media represented by the current instance or `undefined` if
    no value is present

#### Inherited from

RiffListTag.lyrics

• `set` **lyrics**(`value`): `void`

Sets the lyrics or script of the media represented by the current instance.

This field contains a plain text representation of the lyrics or scripts with line
breaks and whitespace being the only formatting marks.
Some formats support more advanced lyrics, like synchronized lyrics, but those must be
accessed using format-specific implementations.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Lyrics or script of the media represented by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Inherited from

RiffListTag.lyrics

___

### musicBrainzArtistId

• `get` **musicBrainzArtistId**(): `string`

Gets the MusicBrainz artist ID of the media represented by the current instance.

This field represents the MusicBrainz ArtistID, and is used to uniquely identify a
particular artist of the track.

#### Returns

`string`

MusicBrainz ArtistID of the media represented by the current instance or
    `undefined` if no value is present

#### Inherited from

RiffListTag.musicBrainzArtistId

• `set` **musicBrainzArtistId**(`value`): `void`

Sets the MusicBrainz artist ID of the media represented by the current instance.

This field represents the MusicBrainz ArtistID, and is used to uniquely identify a
particular artist of the track.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | MusicBrainz ArtistID of the media represented by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Inherited from

RiffListTag.musicBrainzArtistId

___

### musicBrainzDiscId

• `get` **musicBrainzDiscId**(): `string`

Gets the MusicBrainz disc ID of the media represented by the current instance.

This field represents the MusicBrainz DiscID and is used to uniquely identify the
particular released media associated with this track.

#### Returns

`string`

MusicBrainz DiscID of the media represented by the current instance or `undefined`
    if no value is present

#### Inherited from

RiffListTag.musicBrainzDiscId

• `set` **musicBrainzDiscId**(`value`): `void`

Sets the MusicBrainz disc ID of the media represented by the current instance.

This field represents the MusicBrainz DiscID and is used to uniquely identify the
particular released media associated with this track.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | MusicBrainz DiscID of the media represented by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Inherited from

RiffListTag.musicBrainzDiscId

___

### musicBrainzReleaseArtistId

• `get` **musicBrainzReleaseArtistId**(): `string`

Gets the MusicBrainz release artist ID of the media represented by the current instance.

This field represents the MusicBrainz ReleaseArtistID, and is used to uniquely
identify a particular album artist credited with the album.

#### Returns

`string`

MusicBrainz ReleaseArtistID of the media represented by the current instance or
    `undefined` if no value is present

#### Inherited from

RiffListTag.musicBrainzReleaseArtistId

• `set` **musicBrainzReleaseArtistId**(`value`): `void`

Sets the MusicBrainz release artist ID of the media represented by the current instance.

This field represents the MusicBrainz ReleaseArtistID, and is used to uniquely
identify a particular album artist credited with the album.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | MusicBrainz ReleaseArtistID of the media represented by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Inherited from

RiffListTag.musicBrainzReleaseArtistId

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

MusicBrainz ReleaseCountry of the media represented by the current instance or
    `undefined` if no value is present

#### Inherited from

RiffListTag.musicBrainzReleaseCountry

• `set` **musicBrainzReleaseCountry**(`value`): `void`

Sets the MusicBrainz release country of the media represented by the current instance.

This field represents the MusicBrainz ReleaseCountry which describes the country in
which an album was released. Note that the release country of an album is not
necessarily the country in which it was produced. The label itself will typically be
more relevant. Eg, a release on "Foo Records UK" that has "Made in Austria" printed on
it will likely be a UK release.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | MusicBrainz ReleaseCountry of the media represented by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Inherited from

RiffListTag.musicBrainzReleaseCountry

___

### musicBrainzReleaseGroupId

• `get` **musicBrainzReleaseGroupId**(): `string`

Gets the MusicBrainz release group ID of the media represented by the current instance.

This field represents the MusicBrainz ReleaseGroupID and is used to uniquely identify
a particular release group to which this track belongs.

#### Returns

`string`

MusicBrainz ReleaseGroupID of the media represented by the current instance or
    `undefined` if no value is present

#### Inherited from

RiffListTag.musicBrainzReleaseGroupId

• `set` **musicBrainzReleaseGroupId**(`value`): `void`

Sets the MusicBrainz release group ID of the media represented by the current instance.

This field represents the MusicBrainz ReleaseGroupID and is used to uniquely identify
a particular release group to which this track belongs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | MusicBrainz ReleaseGroupID of the media represented by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Inherited from

RiffListTag.musicBrainzReleaseGroupId

___

### musicBrainzReleaseId

• `get` **musicBrainzReleaseId**(): `string`

Gets the MusicBrainz release ID of the media represented by the current instance.

This field represents the MusicBrains ReleaseID and is used to uniquely identify a
particular release to which this track belongs.

#### Returns

`string`

MusicBrainz ReleaseID of the media represented by the current instance or
    `undefined` if no value is present

#### Inherited from

RiffListTag.musicBrainzReleaseId

• `set` **musicBrainzReleaseId**(`value`): `void`

Sets the MusicBrainz release ID of the media represented by the current instance.

This field represents the MusicBrains ReleaseID and is used to uniquely identify a
particular release to which this track belongs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | MusicBrainz ReleaseID of the media represented by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Inherited from

RiffListTag.musicBrainzReleaseId

___

### musicBrainzReleaseStatus

• `get` **musicBrainzReleaseStatus**(): `string`

Gets the MusicBrainz release status of the media represented by the current instance.

This field represents the MusicBrainz ReleaseStatus used to describe how 'official' a
release is. Common statuses are: `Official`, `Promotion`, `Bootleg`, `Pseudo-release`.

#### Returns

`string`

MusicBrainz ReleaseStatus of the media represented by the current instance or
    `undefined` if no value is present

#### Inherited from

RiffListTag.musicBrainzReleaseStatus

• `set` **musicBrainzReleaseStatus**(`value`): `void`

Sets the MusicBrainz release status of the media represented by the current instance.

This field represents the MusicBrainz ReleaseStatus used to describe how 'official' a
release is. Common statuses are: `Official`, `Promotion`, `Bootleg`, `Pseudo-release`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | MusicBrainz ReleaseStatus of the media represented by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Inherited from

RiffListTag.musicBrainzReleaseStatus

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

RiffListTag.musicBrainzReleaseType

• `set` **musicBrainzReleaseType**(`value`): `void`

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
| `value` | `string` |

#### Returns

`void`

#### Inherited from

RiffListTag.musicBrainzReleaseType

___

### musicBrainzTrackId

• `get` **musicBrainzTrackId**(): `string`

Gets the MusicBrainz track ID of the media represented by the media represented by the
current instance.

This field represents the MusicBrainz TrackID and is used to uniquely identify a
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

This field represents the MusicBrainz TrackID and is used to uniquely identify a
particular track.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | MusicBrainz TrackID of the media represented by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Inherited from

RiffListTag.musicBrainzTrackId

___

### musicIpId

• `get` **musicIpId**(): `string`

Gets the MusicIP PUID of the media represented by the current instance.

This field represents the MusicIP PUID, an acoustic fingerprint identifier. It
identifies wht this track "sounds like".

#### Returns

`string`

MusicIP PUID of the media represented by the current instance or `undefined` if no
    value is present

#### Inherited from

RiffListTag.musicIpId

• `set` **musicIpId**(`value`): `void`

Sets the MusicIP PUID of the media represented by the current instance.

This field represents the MusicIP PUID, an acoustic fingerprint identifier. It
identifies wht this track "sounds like".

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | MusicIP PUID of the media represented by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Inherited from

RiffListTag.musicIpId

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

**`Remarks`**

Implemented via the `ISTR` item.

#### Returns

`string`[]

#### Overrides

RiffListTag.performers

• `set` **performers**(`value`): `void`

Sets the performers or artists who performed in the media described by the current instance.

This field is most commonly called "Artists" in audio media or "Actors" in video
media, and should be used to represent each artist/actor appearing in the media. It can
be simple in the form of "Above & Beyond" or more complicated in the form of
"Jono Grant, Tony McGuinness, Paavo Siljamäki", depending on the preferences of the
user and the degree to which they organize their media collection.
As the preference of the user may vary, applications should avoid limiting the user in
what constitutes the performers field - especially regarding the number of performers.

**`Remarks`**

Implemented via the `ISTR` item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string`[] | Performers who performed in the media described by the current instance or an empty array if no value is present. |

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

It is highly important to match each role to the performers. This means that an entry
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

It is highly important to match each role to the performers. This means that an entry
in the [performersRole](InfoTag.md#performersrole) array is `undefined` to maintain the relationship between
`performers[i]` and `performersRole[i]`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string`[] | Array containing the roles played by the performers in the media described by the current instance, or an empty array if no value is present. |

#### Returns

`void`

#### Inherited from

RiffListTag.performersRole

___

### performersSort

• `get` **performersSort**(): `string`[]

Gets the sortable names of the performers or artists who performed in the media described by
the current instance.

This is used to provide more control over how the media is sorted. Typical uses are to
skip articles or sort by last name. For example, "The Pillows" might be sorted as
"Pillows, The". See also: [performers](InfoTag.md#performers)

#### Returns

`string`[]

Sortable names for the performers who performed in the media described by the
    current instance, or an empty array if no value is present.

#### Inherited from

RiffListTag.performersSort

• `set` **performersSort**(`value`): `void`

Gets the sortable names of the performers or artists who performed in the media described by
the current instance.

This is used to provide more control over how the media is sorted. Typical uses are to
skip articles or sort by last name. For example, "The Pillows" might be sorted as
"Pillows, The". See also: [performers](InfoTag.md#performers)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string`[] | Sortable names for the performers who performed in the media described by the current instance, or an empty array if no value is present. |

#### Returns

`void`

#### Inherited from

RiffListTag.performersSort

___

### pictures

• `get` **pictures**(): [`IPicture`](../interfaces/IPicture.md)[]

Gets a collection of pictures associated with the media represented by the current instance.

Typically, this value is used to store an album cover or icon to use for the file, but
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

Typically, this value is used to store an album cover or icon to use for the file, but
it is capable of holding any type of image or file, including pictures of the band, the
recording studio, the concert, etc.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`IPicture`](../interfaces/IPicture.md)[] | Array containing a collection of pictures associated with the media represented by the current instance or an empty array if no pictures are present. |

#### Returns

`void`

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
| `value` | `number` | Album gain as per the ReplayGain specifications, in dB, or `NaN` if no value is set |

#### Returns

`void`

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

#### Inherited from

RiffListTag.replayGainTrackPeak

___

### sizeOnDisk

• `get` **sizeOnDisk**(): `number`

Gets the size of the tag in bytes on disk as it was read from disk.

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

**`Remarks`**

The value must be `StringType.Latin1` or `StringType.UTF8`.

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

This field gives a nice/short precision to the title, which is typically below the
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

This field gives a nice/short precision to the title, which is typically below the
title on the front cover of the media. For example for "Ocean's 13", this would be
"Revenge is a funny thing".

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Subtitle of the media represented by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Inherited from

RiffListTag.subtitle

___

### tagTypes

• `get` **tagTypes**(): [`TagTypes`](../enums/TagTypes.md)

Gets the tag types contained in the current instance. A bit wise combined [TagTypes](../enums/TagTypes.md)
containing the tag types contained in the current instance.

#### Returns

[`TagTypes`](../enums/TagTypes.md)

#### Overrides

RiffListTag.tagTypes

___

### title

• `get` **title**(): `string`

Gets the title for the media described by the current instance.

**`Remarks`**

Implemented via the `INAM` item.

#### Returns

`string`

#### Overrides

RiffListTag.title

• `set` **title**(`value`): `void`

Sets the title for the media described by the current instance.

The title is most commonly the name of the song, episode or a movie title. For example
"Time Won't Me Go" (a song by The Bravery), "Three Stories" (an episode of House MD), or
"Fear and Loathing In Las Vegas" (a movie).

**`Remarks`**

Implemented via the `INAM` item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Title of the media described by the current instance or `undefined` if no value is present. |

#### Returns

`void`

#### Overrides

RiffListTag.title

___

### titleSort

• `get` **titleSort**(): `string`

Gets the sortable name for the title of the media described by the current instance.

Possibly used to sort compilations or episodic content.

#### Returns

`string`

Sortable name of the media described by the current instance or `undefined` if no
    value is present

#### Inherited from

RiffListTag.titleSort

• `set` **titleSort**(`value`): `void`

Sets the sortable name for the title of the media described by the current instance.

Possibly used to sort compilations or episodic content.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Sortable name of the media described by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Inherited from

RiffListTag.titleSort

___

### track

• `get` **track**(): `number`

Gets the position of the media represented by the current instance in its containing album
or season (for a series).

This value should be the same as is listed on the album cover and no more than
[trackCount](InfoTag.md#trackcount), if [trackCount](InfoTag.md#trackcount) is non-zero.
Most tagging formats store this as a string. To help sorting, a two-digit zero-padded
value is used in the resulting tag.
For a series, this property represents the episodes in a season of the series.

**`Remarks`**

Implemented via the `IPRT` item.

#### Returns

`number`

#### Overrides

RiffListTag.track

• `set` **track**(`value`): `void`

Sets the position of the media represented by the current instance in its containing album
or season (for a series).

This value should be the same as is listed on the album cover and no more than
[trackCount](InfoTag.md#trackcount), if [trackCount](InfoTag.md#trackcount) is non-zero.
Most tagging formats store this as a string. To help sorting, a two-digit zero-padded
value is used in the resulting tag.
For a series, this property represents the episodes in a season of the series.

**`Remarks`**

Implemented via the `IPRT` item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Position of the media represented by the current instance in its containing album or `0` if not specified. |

#### Returns

`void`

#### Overrides

RiffListTag.track

___

### trackCount

• `get` **trackCount**(): `number`

Gets the number of tracks on the album or the number of episodes in a series of the media
represented by the current instance.

If non-zero, this value should be equal to or greater than [track](InfoTag.md#track). If
[track](InfoTag.md#track) is `0`, this value should also be `0`.

**`Remarks`**

Implemented via the `IFRM` item.

#### Returns

`number`

#### Overrides

RiffListTag.trackCount

• `set` **trackCount**(`value`): `void`

Sets the number of tracks on the album or the number of episodes in a series of the media
represented by the current instance.

If non-zero, this value should be equal to or greater than [track](InfoTag.md#track). If
[track](InfoTag.md#track) is `0`, this value should also be `0`.

**`Remarks`**

Implemented via the `IFRM` item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Number of tracks on the album or number of episodes in a series of the media represented by the current instance or `0` if not specified. |

#### Returns

`void`

#### Overrides

RiffListTag.trackCount

___

### year

• `get` **year**(): `number`

Gets the year that the media represented by the current instance was recorded.

Years greater than 9999 cannot be stored by most tagging formats and will be cleared
if a higher value is set. Some tagging formats store higher precision dates which will
be truncated when this property is set. Format specific implementations are necessary to
access the higher precision values.

**`Remarks`**

Implemented via the `ICRD` item.

#### Returns

`number`

#### Overrides

RiffListTag.year

• `set` **year**(`value`): `void`

Sets the year that the media represented by the current instance was recorded.

Years greater than 9999 cannot be stored by most tagging formats and will be cleared
if a higher value is set. Some tagging formats store higher precision dates which will
be truncated when this property is set. Format specific implementations are necessary to
access the higher precision values.

**`Remarks`**

Implemented via the `ICRD` item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Year that the media represented by the current instance was created or `0` if no value is present. |

#### Returns

`void`

#### Overrides

RiffListTag.year

## Methods

### clear

▸ **clear**(): `void`

Clears all values stored in the current instance.

#### Returns

`void`

#### Inherited from

[RiffListTag](RiffListTag.md).[clear](RiffListTag.md#clear)

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

Generates an array of tag types that are set in the provided flags value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tagTypes` | [`TagTypes`](../enums/TagTypes.md) | Tag types that have been OR'd together. |

#### Returns

[`TagTypes`](../enums/TagTypes.md)[]

#### Inherited from

[RiffListTag](RiffListTag.md).[tagTypeFlagsToArray](RiffListTag.md#tagtypeflagstoarray)
