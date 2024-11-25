[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2Tag

# Class: Id3v2Tag

Extends [Tag](Tag.md) to provide support for reading and writing tags stored in the ID3v2 format.

## Hierarchy

- [`Tag`](Tag.md)

  ↳ **`Id3v2Tag`**

## Table of contents

### Accessors

- [album](Id3v2Tag.md#album)
- [albumArtists](Id3v2Tag.md#albumartists)
- [albumArtistsSort](Id3v2Tag.md#albumartistssort)
- [albumSort](Id3v2Tag.md#albumsort)
- [amazonId](Id3v2Tag.md#amazonid)
- [beatsPerMinute](Id3v2Tag.md#beatsperminute)
- [comment](Id3v2Tag.md#comment)
- [composers](Id3v2Tag.md#composers)
- [composersSort](Id3v2Tag.md#composerssort)
- [conductor](Id3v2Tag.md#conductor)
- [copyright](Id3v2Tag.md#copyright)
- [dateTagged](Id3v2Tag.md#datetagged)
- [description](Id3v2Tag.md#description)
- [disc](Id3v2Tag.md#disc)
- [discCount](Id3v2Tag.md#disccount)
- [firstAlbumArtist](Id3v2Tag.md#firstalbumartist)
- [firstAlbumArtistSort](Id3v2Tag.md#firstalbumartistsort)
- [firstComposer](Id3v2Tag.md#firstcomposer)
- [firstComposerSort](Id3v2Tag.md#firstcomposersort)
- [firstGenre](Id3v2Tag.md#firstgenre)
- [firstPerformer](Id3v2Tag.md#firstperformer)
- [firstPerformerSort](Id3v2Tag.md#firstperformersort)
- [flags](Id3v2Tag.md#flags)
- [frames](Id3v2Tag.md#frames)
- [genres](Id3v2Tag.md#genres)
- [grouping](Id3v2Tag.md#grouping)
- [initialKey](Id3v2Tag.md#initialkey)
- [isCompilation](Id3v2Tag.md#iscompilation)
- [isEmpty](Id3v2Tag.md#isempty)
- [isrc](Id3v2Tag.md#isrc)
- [joinedAlbumArtists](Id3v2Tag.md#joinedalbumartists)
- [joinedComposers](Id3v2Tag.md#joinedcomposers)
- [joinedGenres](Id3v2Tag.md#joinedgenres)
- [joinedPerformers](Id3v2Tag.md#joinedperformers)
- [joinedPerformersSort](Id3v2Tag.md#joinedperformerssort)
- [lyrics](Id3v2Tag.md#lyrics)
- [musicBrainzArtistId](Id3v2Tag.md#musicbrainzartistid)
- [musicBrainzDiscId](Id3v2Tag.md#musicbrainzdiscid)
- [musicBrainzReleaseArtistId](Id3v2Tag.md#musicbrainzreleaseartistid)
- [musicBrainzReleaseCountry](Id3v2Tag.md#musicbrainzreleasecountry)
- [musicBrainzReleaseGroupId](Id3v2Tag.md#musicbrainzreleasegroupid)
- [musicBrainzReleaseId](Id3v2Tag.md#musicbrainzreleaseid)
- [musicBrainzReleaseStatus](Id3v2Tag.md#musicbrainzreleasestatus)
- [musicBrainzReleaseType](Id3v2Tag.md#musicbrainzreleasetype)
- [musicBrainzTrackId](Id3v2Tag.md#musicbrainztrackid)
- [musicIpId](Id3v2Tag.md#musicipid)
- [performers](Id3v2Tag.md#performers)
- [performersRole](Id3v2Tag.md#performersrole)
- [performersSort](Id3v2Tag.md#performerssort)
- [pictures](Id3v2Tag.md#pictures)
- [publisher](Id3v2Tag.md#publisher)
- [remixedBy](Id3v2Tag.md#remixedby)
- [replayGainAlbumGain](Id3v2Tag.md#replaygainalbumgain)
- [replayGainAlbumPeak](Id3v2Tag.md#replaygainalbumpeak)
- [replayGainTrackGain](Id3v2Tag.md#replaygaintrackgain)
- [replayGainTrackPeak](Id3v2Tag.md#replaygaintrackpeak)
- [sizeOnDisk](Id3v2Tag.md#sizeondisk)
- [subtitle](Id3v2Tag.md#subtitle)
- [tagTypes](Id3v2Tag.md#tagtypes)
- [title](Id3v2Tag.md#title)
- [titleSort](Id3v2Tag.md#titlesort)
- [track](Id3v2Tag.md#track)
- [trackCount](Id3v2Tag.md#trackcount)
- [version](Id3v2Tag.md#version)
- [year](Id3v2Tag.md#year)
- [language](Id3v2Tag.md#language)

### Methods

- [addFrame](Id3v2Tag.md#addframe)
- [clear](Id3v2Tag.md#clear)
- [copyTo](Id3v2Tag.md#copyto)
- [getFramesByClassType](Id3v2Tag.md#getframesbyclasstype)
- [getFramesByIdentifier](Id3v2Tag.md#getframesbyidentifier)
- [getTextAsString](Id3v2Tag.md#gettextasstring)
- [removeFrame](Id3v2Tag.md#removeframe)
- [removeFrames](Id3v2Tag.md#removeframes)
- [render](Id3v2Tag.md#render)
- [replaceFrame](Id3v2Tag.md#replaceframe)
- [setNumberFrame](Id3v2Tag.md#setnumberframe)
- [setTextFrame](Id3v2Tag.md#settextframe)
- [firstInGroup](Id3v2Tag.md#firstingroup)
- [fromData](Id3v2Tag.md#fromdata)
- [fromEmpty](Id3v2Tag.md#fromempty)
- [fromFileEnd](Id3v2Tag.md#fromfileend)
- [fromFileStart](Id3v2Tag.md#fromfilestart)
- [isFalsyOrLikeEmpty](Id3v2Tag.md#isfalsyorlikeempty)
- [joinGroup](Id3v2Tag.md#joingroup)
- [tagTypeFlagsToArray](Id3v2Tag.md#tagtypeflagstoarray)

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

Stored in the `TALB` frame

#### Returns

`string`

#### Overrides

Tag.album

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

Stored in the `TALB` frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | of the media represented by the current instance or `undefined` if no value is present |

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
than [performers](Id3v2Tag.md#performers). Where performers can be broken into multiple artists, it is
best to stick to a single name. Eg, "Super8 & Tab"

**`Remarks`**

Stored in the `TSO2` frame

#### Returns

`string`[]

#### Overrides

Tag.albumArtists

• `set` **albumArtists**(`value`): `void`

Sets the bands or artists who are credited in the creation of the entire album or
collection containing the media described by the current instance.

This field is typically optional but aids in the sorting of compilations or albums
with multiple artist. For example, if an album has several artists, sorting by artist
will split up albums by the same artist. Having a single album artist for an entire
album solves this problem.
As this value is to be used as a sorting key, it should be used with less variation
than [performers](Id3v2Tag.md#performers). Where performers can be broken into multiple artists, it is
best to stick to a single name. Eg, "Super8 & Tab"

**`Remarks`**

Stored in the `TSO2` frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string`[] | Band or artist credited with the creation of the entire album or collection containing the media described by the current instance or an empty array if no value is present |

#### Returns

`void`

#### Overrides

Tag.albumArtists

___

### albumArtistsSort

• `get` **albumArtistsSort**(): `string`[]

Gets the sortable names of the bands/artists who are credited with creating the entire
album or collection containing the media described by the current instance. See also:
[albumArtists](Id3v2Tag.md#albumartists)

This is used to provide more control over how the media is sorted. Typical uses are to
skip articles or sort by last name. For example "Ben Folds" might be sorted as
"Folds, Ben".
As this value is to be used as a sorting key, it should be used with less variation than
[performers](Id3v2Tag.md#performers). Where [performers](Id3v2Tag.md#performers) can be broken into multiple performers, it is
best to stick to a single album artist. Eg, "Van Buuren, Armin"

**`Remarks`**

Stored in the `TPE2` frame

#### Returns

`string`[]

#### Overrides

Tag.albumArtistsSort

• `set` **albumArtistsSort**(`value`): `void`

Sets the sortable names of the bands/artists who are credited with creating the entire
album or collection containing the media described by the current instance. See also:
[albumArtists](Id3v2Tag.md#albumartists)

This is used to provide more control over how the media is sorted. Typical uses are to
skip articles or sort by last name. For example "Ben Folds" might be sorted as
"Folds, Ben".
As this value is to be used as a sorting key, it should be used with less variation than
[performers](Id3v2Tag.md#performers). Where [performers](Id3v2Tag.md#performers) can be broken into multiple performers, it is
best to stick to a single album artist. Eg, "Van Buuren, Armin"

**`Remarks`**

Stored in the `TPE2` frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string`[] | Sortable names for the bands/artists are credited with the creation of the entire album or collection containing the media described by the current instance, or an empty array if no value is present. |

#### Returns

`void`

#### Overrides

Tag.albumArtistsSort

___

### albumSort

• `get` **albumSort**(): `string`

Gets the sortable name of the album title of the media represented by the current instance.
See also: [album](Id3v2Tag.md#album)

This field is typically optional but aids in sort of compilations or albums with
similar titles.

**`Remarks`**

Stored in the `TSOA` frame

#### Returns

`string`

#### Overrides

Tag.albumSort

• `set` **albumSort**(`value`): `void`

Sets the sortable name of the album title of the media represented by the current instance.
See also: [album](Id3v2Tag.md#album)

This field is typically optional but aids in sort of compilations or albums with
similar titles.

**`Remarks`**

Stored in the `TSOA` frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Sortable name for the album title of the media or `undefined` if the value is not present |

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

**`Remarks`**

via a TXXX `ASIN` frame

#### Returns

`string`

#### Overrides

Tag.amazonId

• `set` **amazonId**(`value`): `void`

Sets the Amazon ID of the media represented by the current instance.

This field represents the AmazonID, also called the ASIN, and is used to uniquely
identify the particular track or album in the Amazon catalog.

**`Remarks`**

via a TXXX `ASIN` frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Amazon ID of the media represented by the current instance or `undefined` if no value is present |

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

**`Remarks`**

Stored in the `TBPM` frame

#### Returns

`number`

#### Overrides

Tag.beatsPerMinute

• `set` **beatsPerMinute**(`value`): `void`

Sets the number of beats per minute in the audio of the media represented by the current
instance.

This field is useful for DJ's who are trying to beat match tracks. It should be
calculated from the audio or pulled from a database.

**`Remarks`**

Stored in the `TBPM` frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Beats per minute of the audio in the media represented by the current instance, or `0` if not specified |

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

**`Remarks`**

Stored in the `COMM` frame

#### Returns

`string`

#### Overrides

Tag.comment

• `set` **comment**(`value`): `void`

Sets a user comment on the media represented by the current instance.

This field should be used to store user notes and comments. There is no constraint on
what text can be stored here, but it should not contain programmatic data.
Because this field contains notes the user might think of while consuming the media,
it may be useful for an application to make this field easily accessible, perhaps even
including it in the main interface.

**`Remarks`**

Stored in the `COMM` frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | User comments on the media represented by the current instance or `undefined` if the value is not present |

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

**`Remarks`**

Stored in the `TCOM` frame

#### Returns

`string`[]

#### Overrides

Tag.composers

• `set` **composers**(`value`): `void`

Sets the composers of the media represented by the current instance.

This field represents the composers, songwriters, scriptwriters, or persons who
claim authorship of the media.

**`Remarks`**

Stored in the `TCOM` frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string`[] | Composers of the media represented by the current instance of an empty array if no value is present. |

#### Returns

`void`

#### Overrides

Tag.composers

___

### composersSort

• `get` **composersSort**(): `string`[]

Gets the sortable names of the composers of the media represented by the current instance.
See also: [composers](Id3v2Tag.md#composers)

This field is typically optional but aids in the sorting of compilations or albums
with multiple composers.

**`Remarks`**

Stored in the `TSOC` frame

#### Returns

`string`[]

#### Overrides

Tag.composersSort

• `set` **composersSort**(`value`): `void`

Sets the sortable names of the composers of the media represented by the current instance.
See also: [composers](Id3v2Tag.md#composers)

This field is typically optional but aids in the sorting of compilations or albums
with multiple composers.

**`Remarks`**

Stored in the `TSOC` frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string`[] | Sortable names for the composers of the media represented by the current instance or an empty array if no value is present. |

#### Returns

`void`

#### Overrides

Tag.composersSort

___

### conductor

• `get` **conductor**(): `string`

Gets the conductor or director of the media represented by the current instance.

This field is most useful for organizing classical music and movies.

**`Remarks`**

Stored in the `TPE3` frame

#### Returns

`string`

#### Overrides

Tag.conductor

• `set` **conductor**(`value`): `void`

Sets the conductor or director of the media represented by the current instance.

This field is most useful for organizing classical music and movies.

**`Remarks`**

Stored in the `TPE3` frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Conductor or director of the media represented by the current instance or `undefined` if no value present. |

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

**`Remarks`**

Stored in the `TCOP` frame

#### Returns

`string`

#### Overrides

Tag.copyright

• `set` **copyright**(`value`): `void`

Sets the copyright information for the media represented by the current instance.

This field should be used for storing copyright information. It may be useful to show
this information somewhere in the program while the media is playing.
Players should not support editing this field, but media creation tools should
definitely allow modification.

**`Remarks`**

Stored in the `TCOP` frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Copyright information for the media represented by the current instance or `undefined` if no value is present. |

#### Returns

`void`

#### Overrides

Tag.copyright

___

### dateTagged

• `get` **dateTagged**(): `Date`

Gets the date and time at which the tag has been written.

**`Remarks`**

Stored in the `TDTG` frame

#### Returns

`Date`

#### Overrides

Tag.dateTagged

• `set` **dateTagged**(`value`): `void`

Sets the date and time at which the tag has been written.

**`Remarks`**

Stored in the `TDTG` frame

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

**`Remarks`**

via user text frame "description"

#### Returns

`string`

#### Overrides

Tag.description

• `set` **description**(`value`): `void`

Sets a short description of the media. For music, this could be the comment that the artist
made of his/her work. For a video, this should be a short summary of the story/plot, but
generally no spoliers. This should give the impression of what to expect in the media.

This is especially relevant for a movie. For example, for "Fear and Loathing in Las
Vegas", this could be "An oddball journalist and his psychopathic lawyer travel to Las
Vegas for a series of psychedelic escapades."

**`Remarks`**

via user text frame "description"

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Description of the media represented by the current instance or `undefined` if no value is present |

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
[discCount](Id3v2Tag.md#disccount) if [discCount](Id3v2Tag.md#disccount) is non-zero.

**`Remarks`**

Stored in the `TPOS` frame

#### Returns

`number`

#### Overrides

Tag.disc

• `set` **disc**(`value`): `void`

Sets the number of the disc containing the media represented by the current instance in the
boxed set. For a series, this represents the season number.

This value should be the same as the number that appears on the disc. For example, if
the disc is the first of three, the value should be `1`. It should be no more than
[discCount](Id3v2Tag.md#disccount) if [discCount](Id3v2Tag.md#disccount) is non-zero.

**`Remarks`**

Stored in the `TPOS` frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Number of the disc or season of the media represented by the current instance in a boxed set. |

#### Returns

`void`

#### Overrides

Tag.disc

___

### discCount

• `get` **discCount**(): `number`

Gets the number of discs or seasons in the boxed set containing the media represented by the
current instance.

If non-zero, this should be at least equal to [disc](Id3v2Tag.md#disc). If [disc](Id3v2Tag.md#disc) is zero,
this value should also be zero.

**`Remarks`**

Stored in the `TPOS` frame

#### Returns

`number`

#### Overrides

Tag.discCount

• `set` **discCount**(`value`): `void`

Sets the number of discs or seasons in the boxed set containing the media represented by the
current instance.

If non-zero, this should be at least equal to [disc](Id3v2Tag.md#disc). If [disc](Id3v2Tag.md#disc) is zero,
this value should also be zero.

**`Remarks`**

Stored in the `TPOS` frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Number of discs or seasons in the boxed set containing the media represented by the current instance or `0` if not specified. |

#### Returns

`void`

#### Overrides

Tag.discCount

___

### firstAlbumArtist

• `get` **firstAlbumArtist**(): `string`

Gets the first value contained in [albumArtists](Id3v2Tag.md#albumartists).

#### Returns

`string`

#### Inherited from

Tag.firstAlbumArtist

___

### firstAlbumArtistSort

• `get` **firstAlbumArtistSort**(): `string`

Gets the first value contained in [albumArtistsSort](Id3v2Tag.md#albumartistssort)

#### Returns

`string`

#### Inherited from

Tag.firstAlbumArtistSort

___

### firstComposer

• `get` **firstComposer**(): `string`

Gets the first value contained in [composers](Id3v2Tag.md#composers)

#### Returns

`string`

#### Inherited from

Tag.firstComposer

___

### firstComposerSort

• `get` **firstComposerSort**(): `string`

Gets the first value contained in [composersSort](Id3v2Tag.md#composerssort)

#### Returns

`string`

#### Inherited from

Tag.firstComposerSort

___

### firstGenre

• `get` **firstGenre**(): `string`

Gets the first value contained in [genres](Id3v2Tag.md#genres)

#### Returns

`string`

#### Inherited from

Tag.firstGenre

___

### firstPerformer

• `get` **firstPerformer**(): `string`

Gets the first value contained in [performers](Id3v2Tag.md#performers)

#### Returns

`string`

#### Inherited from

Tag.firstPerformer

___

### firstPerformerSort

• `get` **firstPerformerSort**(): `string`

Gets the first value contained in [performersSort](Id3v2Tag.md#performerssort)

#### Returns

`string`

#### Inherited from

Tag.firstPerformerSort

___

### flags

• `get` **flags**(): [`Id3v2TagHeaderFlags`](../enums/Id3v2TagHeaderFlags.md)

Gets the header flags applied to the current instance.

#### Returns

[`Id3v2TagHeaderFlags`](../enums/Id3v2TagHeaderFlags.md)

• `set` **flags**(`value`): `void`

Sets the header flags applied to the current instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Id3v2TagHeaderFlags`](../enums/Id3v2TagHeaderFlags.md) | Bitwise combined [Id3v2TagHeaderFlags](../enums/Id3v2TagHeaderFlags.md) value containing flags applied to the current instance. |

#### Returns

`void`

___

### frames

• `get` **frames**(): [`Id3v2Frame`](Id3v2Frame.md)[]

Gets all frames contained in the current instance.

#### Returns

[`Id3v2Frame`](Id3v2Frame.md)[]

___

### genres

• `get` **genres**(): `string`[]

Gets the genres of the media represented by the current instance.

This field represents genres that apply to the song, album, or video. This is often
used for filtering media.
A list of common audio genres as popularized by ID3v1 is stored in `genres.ts`.
Additionally, `genres.ts` contains video genres as used by DivX.

**`Remarks`**

Stored in the `TCON` frame

#### Returns

`string`[]

#### Overrides

Tag.genres

• `set` **genres**(`value`): `void`

Sets the genres of the media represented by the current instance.

This field represents genres that apply to the song, album, or video. This is often
used for filtering media.
A list of common audio genres as popularized by ID3v1 is stored in `genres.ts.
Additionally, `genres.ts` contains video genres as used by DivX.

**`Remarks`**

Stored in the `TCON` frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string`[] | Genres of the media represented by the current instance or an empty array if no value is present. |

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

**`Remarks`**

Stored in the `TIT1` frame

#### Returns

`string`

#### Overrides

Tag.grouping

• `set` **grouping**(`value`): `void`

Sets the grouping on the album which the media in the current instance belongs to.

This field contains a non-physical group to which the track belongs. In classical
music this could be a movement. It could also be parts of a series like "Introduction",
"Closing Remarks", etc.

**`Remarks`**

Stored in the `TIT1` frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Grouping on the album which the media in the current instance belongs to or `undefined` if no value is present. |

#### Returns

`void`

#### Overrides

Tag.grouping

___

### initialKey

• `get` **initialKey**(): `string`

Gets the initial key of the track.

**`Remarks`**

Stored in the `TKEY` frame

#### Returns

`string`

#### Overrides

Tag.initialKey

• `set` **initialKey**(`value`): `void`

Sets the initial key of the track.

**`Remarks`**

Stored in the `TKEY` frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Initial key of the track or `undefined` if no value is set |

#### Returns

`void`

#### Overrides

Tag.initialKey

___

### isCompilation

• `get` **isCompilation**(): `boolean`

Gets whether the album described by the current instance is a compilation.

**`Remarks`**

This property is implemented using the TCMP Text Information Frame to provide
    support for a feature of the Apple iPod and iTunes products (ie, this is a non-standard
    field).

#### Returns

`boolean`

#### Overrides

Tag.isCompilation

• `set` **isCompilation**(`value`): `void`

Gets whether the album described by the current instance is a compilation.

**`Remarks`**

This property is implemented using the TCMP Text Information Frame to provide
    support for a feature of the Apple iPod and iTunes products (ie, this is a non-standard
    field).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `boolean` | Whether or not the album described by the current instance is a compilation |

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

**`Remarks`**

Stored in the `TSRC` frame

#### Returns

`string`

#### Overrides

Tag.isrc

• `set` **isrc**(`value`): `void`

Sets the ISRC (International Standard Recording Code) of the track.

**`Remarks`**

Stored in the `TSRC` frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | ISRC of the track or `undefined` if no value is set |

#### Returns

`void`

#### Overrides

Tag.isrc

___

### joinedAlbumArtists

• `get` **joinedAlbumArtists**(): `string`

Gets a semicolon and space separated string containing the values in [albumArtists](Id3v2Tag.md#albumartists)

#### Returns

`string`

#### Inherited from

Tag.joinedAlbumArtists

___

### joinedComposers

• `get` **joinedComposers**(): `string`

Gets a semicolon and space separated string containing the values in [composers](Id3v2Tag.md#composers)

#### Returns

`string`

#### Inherited from

Tag.joinedComposers

___

### joinedGenres

• `get` **joinedGenres**(): `string`

Gets a semicolon and space separated string containing the values in [genres](Id3v2Tag.md#genres)

#### Returns

`string`

#### Inherited from

Tag.joinedGenres

___

### joinedPerformers

• `get` **joinedPerformers**(): `string`

Gets a semicolon and space separated string containing the values in [performers](Id3v2Tag.md#performers)

#### Returns

`string`

#### Inherited from

Tag.joinedPerformers

___

### joinedPerformersSort

• `get` **joinedPerformersSort**(): `string`

Gets a semicolon and space separated string containing the values in [performersSort](Id3v2Tag.md#performerssort)

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

**`Remarks`**

Stored in the `USLT` frame

#### Returns

`string`

#### Overrides

Tag.lyrics

• `set` **lyrics**(`value`): `void`

Sets the lyrics or script of the media represented by the current instance.

This field contains a plain text representation of the lyrics or scripts with line
breaks and whitespace being the only formatting marks.
Some formats support more advanced lyrics, like synchronized lyrics, but those must be
accessed using format-specific implementations.

**`Remarks`**

Stored in the `USLT` frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Lyrics or script of the media represented by the current instance or `undefined` if no value is present |

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

**`Remarks`**

via TXXX:MusicBrainz Artist Id frame

#### Returns

`string`

#### Overrides

Tag.musicBrainzArtistId

• `set` **musicBrainzArtistId**(`value`): `void`

Sets the MusicBrainz artist ID of the media represented by the current instance.

This field represents the MusicBrainz ArtistID, and is used to uniquely identify a
particular artist of the track.

**`Remarks`**

via TXXX:MusicBrainz Artist Id frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | MusicBrainz ArtistID of the media represented by the current instance or `undefined` if no value is present |

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

**`Remarks`**

via a TXXX `MusicBrainz Disc Id` frame

#### Returns

`string`

#### Overrides

Tag.musicBrainzDiscId

• `set` **musicBrainzDiscId**(`value`): `void`

Sets the MusicBrainz disc ID of the media represented by the current instance.

This field represents the MusicBrainz DiscID and is used to uniquely identify the
particular released media associated with this track.

**`Remarks`**

via a TXXX `MusicBrainz Disc Id` frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | MusicBrainz DiscID of the media represented by the current instance or `undefined` if no value is present |

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

**`Remarks`**

via a TXXX `MusicBrainz Album Artist Id` frame

#### Returns

`string`

#### Overrides

Tag.musicBrainzReleaseArtistId

• `set` **musicBrainzReleaseArtistId**(`value`): `void`

Sets the MusicBrainz release artist ID of the media represented by the current instance.

This field represents the MusicBrainz ReleaseArtistID, and is used to uniquely
identify a particular album artist credited with the album.

**`Remarks`**

via a TXXX `MusicBrainz Album Artist Id` frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | MusicBrainz ReleaseArtistID of the media represented by the current instance or `undefined` if no value is present |

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

**`Remarks`**

via a TXXX `MusicBrainz Album Release Country` frame

#### Returns

`string`

#### Overrides

Tag.musicBrainzReleaseCountry

• `set` **musicBrainzReleaseCountry**(`value`): `void`

Sets the MusicBrainz release country of the media represented by the current instance.

This field represents the MusicBrainz ReleaseCountry which describes the country in
which an album was released. Note that the release country of an album is not
necessarily the country in which it was produced. The label itself will typically be
more relevant. Eg, a release on "Foo Records UK" that has "Made in Austria" printed on
it will likely be a UK release.

**`Remarks`**

via a TXXX `MusicBrainz Album Release Country` frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | MusicBrainz ReleaseCountry of the media represented by the current instance or `undefined` if no value is present |

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

**`Remarks`**

via a TXXX `MusicBrainz Release Group Id` frame

#### Returns

`string`

#### Overrides

Tag.musicBrainzReleaseGroupId

• `set` **musicBrainzReleaseGroupId**(`value`): `void`

Sets the MusicBrainz release group ID of the media represented by the current instance.

This field represents the MusicBrainz ReleaseGroupID and is used to uniquely identify
a particular release group to which this track belongs.

**`Remarks`**

via a TXXX `MusicBrainz Release Group Id` frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | MusicBrainz ReleaseGroupID of the media represented by the current instance or `undefined` if no value is present |

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

**`Remarks`**

via a TXXX `MusicBrainz Album Id` frame

#### Returns

`string`

#### Overrides

Tag.musicBrainzReleaseId

• `set` **musicBrainzReleaseId**(`value`): `void`

Sets the MusicBrainz release ID of the media represented by the current instance.

This field represents the MusicBrains ReleaseID and is used to uniquely identify a
particular release to which this track belongs.

**`Remarks`**

via a TXXX `MusicBrainz Album Id` frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | MusicBrainz ReleaseID of the media represented by the current instance or `undefined` if no value is present |

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

**`Remarks`**

via a TXXX `MusicBrainz Album Status` frame

#### Returns

`string`

#### Overrides

Tag.musicBrainzReleaseStatus

• `set` **musicBrainzReleaseStatus**(`value`): `void`

Sets the MusicBrainz release status of the media represented by the current instance.

This field represents the MusicBrainz ReleaseStatus used to describe how 'official' a
release is. Common statuses are: `Official`, `Promotion`, `Bootleg`, `Pseudo-release`.

**`Remarks`**

via a TXXX `MusicBrainz Album Status` frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | MusicBrainz ReleaseStatus of the media represented by the current instance or `undefined` if no value is present |

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

**`Remarks`**

via a TXXX `MusicBrainz Album Type` frame

#### Returns

`string`

#### Overrides

Tag.musicBrainzReleaseType

• `set` **musicBrainzReleaseType**(`value`): `void`

Sets the MusicBrainz release type of the media represented by the current instance.

This field represents the MusicBrainz ReleaseType that describes what kind of release
a release is. Common types are: `Single`, `Album`, `EP`, `Compilation`, `Soundtrack,
`SpokenWord`, `Interview`, `Audiobook`, `Live`, `Remix`, and `Other`. Careful thought
must be given when using this field to decide if a particular track "is a compilation".

@param value MusicBrainz ReleaseType of the media represented by the current instance or
    `undefined` if no value is present

**`Remarks`**

via a TXXX `MusicBrainz Album Type` frame

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

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

**`Remarks`**

via a UFID `http://musicbrainz.org` frame

#### Returns

`string`

#### Overrides

Tag.musicBrainzTrackId

• `set` **musicBrainzTrackId**(`value`): `void`

Sets the MusicBrainz track ID of the media represented by the media represented by the
current instance.

This field represents the MusicBrainz TrackID and is used to uniquely identify a
particular track.

**`Remarks`**

via a UFID `http://musicbrainz.org` frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | MusicBrainz TrackID of the media represented by the current instance or `undefined` if no value is present |

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

**`Remarks`**

via a TXXX `MusicIP PUID` frame

#### Returns

`string`

#### Overrides

Tag.musicIpId

• `set` **musicIpId**(`value`): `void`

Sets the MusicIP PUID of the media represented by the current instance.

This field represents the MusicIP PUID, an acoustic fingerprint identifier. It
identifies wht this track "sounds like".

**`Remarks`**

via a TXXX `MusicIP PUID` frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | MusicIP PUID of the media represented by the current instance or `undefined` if no value is present |

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

**`Remarks`**

Stored in the `TPE1` frame

#### Returns

`string`[]

#### Overrides

Tag.performers

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

Stored in the `TPE1` frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string`[] | Performers who performed in the media described by the current instance or an empty array if no value is present. |

#### Returns

`void`

#### Overrides

Tag.performers

___

### performersRole

• `get` **performersRole**(): `string`[]

Gets the characters portrayed by an actor for a video or instruments played by a musician
for music. This must match the [performers](Id3v2Tag.md#performers) array (for each person, correspond one/more
role). Several roles for the same artist/actor can be separated with semicolons. For
example: "Bass; Backing Vocals; Vibraphone".

It is highly important to match each role to the performers. This means that an entry
in the [performersRole](Id3v2Tag.md#performersrole) array is `undefined` to maintain the relationship between
`performers[i]` and `performersRole[i]`.

**`Remarks`**

Stored in the `TMCL` frame

#### Returns

`string`[]

#### Overrides

Tag.performersRole

• `set` **performersRole**(`value`): `void`

Sets the characters portrayed by an actor for a video or instruments played by a musician
for music. This must match the [performers](Id3v2Tag.md#performers) array (for each person, correspond one/more
role). Several roles for the same artist/actor can be separated with semicolons. For
example: "Bass; Backing Vocals; Vibraphone".

It is highly important to match each role to the performers. This means that an entry
in the [performersRole](Id3v2Tag.md#performersrole) array is `undefined` to maintain the relationship between
`performers[i]` and `performersRole[i]`.

**`Remarks`**

Stored in the `TMCL` frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string`[] | Array containing the roles played by the performers in the media described by the current instance, or an empty array if no value is present. |

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
"Pillows, The". See also: [performers](Id3v2Tag.md#performers)

**`Remarks`**

Stored in the `TSOP` frame

#### Returns

`string`[]

#### Overrides

Tag.performersSort

• `set` **performersSort**(`value`): `void`

Gets the sortable names of the performers or artists who performed in the media described by
the current instance.

This is used to provide more control over how the media is sorted. Typical uses are to
skip articles or sort by last name. For example, "The Pillows" might be sorted as
"Pillows, The". See also: [performers](Id3v2Tag.md#performers)

**`Remarks`**

Stored in the `TSOP` frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string`[] | Sortable names for the performers who performed in the media described by the current instance, or an empty array if no value is present. |

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

**`Remarks`**

Stored in the `APIC` frame

#### Returns

[`IPicture`](../interfaces/IPicture.md)[]

#### Overrides

Tag.pictures

• `set` **pictures**(`value`): `void`

Sets a collection of pictures associated with the media represented by the current instance.

Typically, this value is used to store an album cover or icon to use for the file, but
it is capable of holding any type of image or file, including pictures of the band, the
recording studio, the concert, etc.

**`Remarks`**

Stored in the `APIC` frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`IPicture`](../interfaces/IPicture.md)[] | Array containing a collection of pictures associated with the media represented by the current instance or an empty array if no pictures are present. |

#### Returns

`void`

#### Overrides

Tag.pictures

___

### publisher

• `get` **publisher**(): `string`

Gets the publisher of the track.

**`Remarks`**

Stored in the `TPUB` frame

#### Returns

`string`

#### Overrides

Tag.publisher

• `set` **publisher**(`value`): `void`

Sets the publisher of the track.

**`Remarks`**

Stored in the `TPUB` frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Publisher of the track or `undefined` if no value is set |

#### Returns

`void`

#### Overrides

Tag.publisher

___

### remixedBy

• `get` **remixedBy**(): `string`

Gets the remixer of the track.

**`Remarks`**

Stored in the `TPE4` frame

#### Returns

`string`

#### Overrides

Tag.remixedBy

• `set` **remixedBy**(`value`): `void`

Sets the remixer of the track.

**`Remarks`**

Stored in the `TPE4` frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Remixer of the track or `undefined` if no value is set |

#### Returns

`void`

#### Overrides

Tag.remixedBy

___

### replayGainAlbumGain

• `get` **replayGainAlbumGain**(): `number`

Gets the ReplayGain album gain in dB.

**`Remarks`**

via a TXXX `REPLAYGAIN_ALBUM_GAIN` frame

#### Returns

`number`

#### Overrides

Tag.replayGainAlbumGain

• `set` **replayGainAlbumGain**(`value`): `void`

Sets the ReplayGain album gain in dB.

**`Remarks`**

via a TXXX `REPLAYGAIN_ALBUM_GAIN` frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Album gain as per the ReplayGain specifications, in dB, or `NaN` if no value is set |

#### Returns

`void`

#### Overrides

Tag.replayGainAlbumGain

___

### replayGainAlbumPeak

• `get` **replayGainAlbumPeak**(): `number`

Gets the ReplayGain album peak sample.

**`Remarks`**

via a TXXX `REPLAYGAIN_ALBUM_PEAK` frame

#### Returns

`number`

#### Overrides

Tag.replayGainAlbumPeak

• `set` **replayGainAlbumPeak**(`value`): `void`

Sets the ReplayGain album peak sample.

**`Remarks`**

via a TXXX `REPLAYGAIN_ALBUM_PEAK` frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Album peak as per the ReplayGain specifications, or `NaN` if no value is set |

#### Returns

`void`

#### Overrides

Tag.replayGainAlbumPeak

___

### replayGainTrackGain

• `get` **replayGainTrackGain**(): `number`

Gets the ReplayGain track gain in dB.

**`Remarks`**

via a TXXX `REPLAY_GAIN_TRACK_GAIN` frame

#### Returns

`number`

#### Overrides

Tag.replayGainTrackGain

• `set` **replayGainTrackGain**(`value`): `void`

Sets the ReplayGain track gain in dB.

**`Remarks`**

via a TXXX `REPLAY_GAIN_TRACK_GAIN` frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Track gain as per ReplayGain specifications, in dB, or `NaN` if no value is set |

#### Returns

`void`

#### Overrides

Tag.replayGainTrackGain

___

### replayGainTrackPeak

• `get` **replayGainTrackPeak**(): `number`

Gets the ReplayGain track peak sample.

**`Remarks`**

via a TXXX `REPLAYGAIN_TRACK_PEAK` frame

#### Returns

`number`

#### Overrides

Tag.replayGainTrackPeak

• `set` **replayGainTrackPeak**(`value`): `void`

Sets the ReplayGain track peak sample.

**`Remarks`**

via a TXXX `REPLAYGAIN_TRACK_PEAK` frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Track peak as per the ReplayGain specifications, or `NaN` if no value is set |

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

**`Remarks`**

Stored in the `TIT3` frame

#### Returns

`string`

#### Overrides

Tag.subtitle

• `set` **subtitle**(`value`): `void`

Sets a description, one-line. It represents the tagline of the vide/music.

This field gives a nice/short precision to the title, which is typically below the
title on the front cover of the media. For example for "Ocean's 13", this would be
"Revenge is a funny thing".

**`Remarks`**

Stored in the `TIT3` frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Subtitle of the media represented by the current instance or `undefined` if no value is present |

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

**`Remarks`**

Stored in the `TIT2` frame

#### Returns

`string`

#### Overrides

Tag.title

• `set` **title**(`value`): `void`

Sets the title for the media described by the current instance.

The title is most commonly the name of the song, episode or a movie title. For example
"Time Won't Me Go" (a song by The Bravery), "Three Stories" (an episode of House MD), or
"Fear and Loathing In Las Vegas" (a movie).

**`Remarks`**

Stored in the `TIT2` frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Title of the media described by the current instance or `undefined` if no value is present. |

#### Returns

`void`

#### Overrides

Tag.title

___

### titleSort

• `get` **titleSort**(): `string`

Gets the sortable name for the title of the media described by the current instance.

Possibly used to sort compilations or episodic content.

**`Remarks`**

Stored in the `TSOT` frame

#### Returns

`string`

#### Overrides

Tag.titleSort

• `set` **titleSort**(`value`): `void`

Sets the sortable name for the title of the media described by the current instance.

Possibly used to sort compilations or episodic content.

**`Remarks`**

Stored in the `TSOT` frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Sortable name of the media described by the current instance or `undefined` if no value is present |

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
[trackCount](Id3v2Tag.md#trackcount), if [trackCount](Id3v2Tag.md#trackcount) is non-zero.
Most tagging formats store this as a string. To help sorting, a two-digit zero-padded
value is used in the resulting tag.
For a series, this property represents the episodes in a season of the series.

**`Remarks`**

Stored in the `TRCK` frame

#### Returns

`number`

#### Overrides

Tag.track

• `set` **track**(`value`): `void`

Sets the position of the media represented by the current instance in its containing album
or season (for a series).

This value should be the same as is listed on the album cover and no more than
[trackCount](Id3v2Tag.md#trackcount), if [trackCount](Id3v2Tag.md#trackcount) is non-zero.
Most tagging formats store this as a string. To help sorting, a two-digit zero-padded
value is used in the resulting tag.
For a series, this property represents the episodes in a season of the series.

**`Remarks`**

Stored in the `TRCK` frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Position of the media represented by the current instance in its containing album or `0` if not specified. |

#### Returns

`void`

#### Overrides

Tag.track

___

### trackCount

• `get` **trackCount**(): `number`

Gets the number of tracks on the album or the number of episodes in a series of the media
represented by the current instance.

If non-zero, this value should be equal to or greater than [track](Id3v2Tag.md#track). If
[track](Id3v2Tag.md#track) is `0`, this value should also be `0`.

**`Remarks`**

Stored in the `TRCK` frame

#### Returns

`number`

#### Overrides

Tag.trackCount

• `set` **trackCount**(`value`): `void`

Sets the number of tracks on the album or the number of episodes in a series of the media
represented by the current instance.

If non-zero, this value should be equal to or greater than [track](Id3v2Tag.md#track). If
[track](Id3v2Tag.md#track) is `0`, this value should also be `0`.

**`Remarks`**

Stored in the `TRCK` frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Number of tracks on the album or number of episodes in a series of the media represented by the current instance or `0` if not specified. |

#### Returns

`void`

#### Overrides

Tag.trackCount

___

### version

• `get` **version**(): `number`

Gets the ID3v2 version for the current instance.

#### Returns

`number`

• `set` **version**(`value`): `void`

Sets the ID3v2 version for the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | ID3v2 version for the current instance. Must be 2, 3, or 4. |

#### Returns

`void`

___

### year

• `get` **year**(): `number`

Gets the year that the media represented by the current instance was recorded.

Years greater than 9999 cannot be stored by most tagging formats and will be cleared
if a higher value is set. Some tagging formats store higher precision dates which will
be truncated when this property is set. Format specific implementations are necessary to
access the higher precision values.

**`Remarks`**

If a TDRC frame exists, the year will be read from that. If a TDRC frame doesn't exist and a
    TYER or TYE frame exists, the year will be read from that. Failing both cases, 0 will be
    returned.

#### Returns

`number`

#### Overrides

Tag.year

• `set` **year**(`value`): `void`

Sets the year that the media represented by the current instance was recorded.

Years greater than 9999 cannot be stored by most tagging formats and will be cleared
if a higher value is set. Some tagging formats store higher precision dates which will
be truncated when this property is set. Format specific implementations are necessary to
access the higher precision values.

**`Remarks`**

NOTE: values >9999 will remove the frame

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Year that the media represented by the current instance was created or `0` if no value is present. |

#### Returns

`void`

#### Overrides

Tag.year

___

### language

• `Static` `get` **language**(): `string`

Gets the ISO-639-2 language code to use when searching for and storing language specific
values.

#### Returns

`string`

• `Static` `set` **language**(`value`): `void`

Gets the ISO-639-2 language code to use when searching for and storing language specific
values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | ISO-639-2 language code to use. If the language is unknown ` ` (that is, three spaces) is the appropriate filler |

#### Returns

`void`

## Methods

### addFrame

▸ **addFrame**(`frame`): `void`

Adds a frame to the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `frame` | [`Id3v2Frame`](Id3v2Frame.md) | Frame to add to the current instance |

#### Returns

`void`

___

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

#### Overrides

[Tag](Tag.md).[copyTo](Tag.md#copyto)

___

### getFramesByClassType

▸ **getFramesByClassType**<`TFrame`\>(`type`): `TFrame`[]

Gets all frames with a specific frame class type.
NOTE: This diverges from the .NET implementation due to the inability to do type checking
like in .NET (ie `x is y`). Instead, type guards are added to each frame class which provides
the same functionality.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TFrame` | extends [`Id3v2Frame`](Id3v2Frame.md)<`TFrame`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | [`Id3v2FrameClassType`](../enums/Id3v2FrameClassType.md) | Class type of the frame to find |

#### Returns

`TFrame`[]

TFrame[] Array of frames with the specified class type

___

### getFramesByIdentifier

▸ **getFramesByIdentifier**<`TFrame`\>(`type`, `ident`): `TFrame`[]

Gets a list of frames with the specified identifier contained in the current instance.
NOTE: This implementation deviates a bit from the original .NET implementation due to the
inability to do `x is y` comparison by types in typescript without type guards.
`type` is the type guard for differentiating frame types. If all frames are needed
use [frames](Id3v2Tag.md#frames).

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TFrame` | extends [`Id3v2Frame`](Id3v2Frame.md)<`TFrame`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | [`Id3v2FrameClassType`](../enums/Id3v2FrameClassType.md) | Type of frame to return |
| `ident` | [`Id3v2FrameIdentifier`](Id3v2FrameIdentifier.md) | Identifier of the frame |

#### Returns

`TFrame`[]

TFrame[] Array of frames with the desired frame identifier

___

### getTextAsString

▸ **getTextAsString**(`ident`): `string`

Gets the text value from a specified text information frame (or URL frame if that was
specified).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ident` | [`Id3v2FrameIdentifier`](Id3v2FrameIdentifier.md) | Frame identifier of the text information frame to get the value from |

#### Returns

`string`

Text of the specified frame, or `undefined` if no value was found

___

### removeFrame

▸ **removeFrame**(`frame`): `void`

Removes a specified frame from the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `frame` | [`Id3v2Frame`](Id3v2Frame.md) | Object to remove from the current instance |

#### Returns

`void`

___

### removeFrames

▸ **removeFrames**(`ident`): `void`

Removes all frames with a specified identifier from the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ident` | [`Id3v2FrameIdentifier`](Id3v2FrameIdentifier.md) | Identifier of the frames to remove |

#### Returns

`void`

___

### render

▸ **render**(): [`ByteVector`](ByteVector.md)

Renders the current instance as a raw ID3v2 tag.
By default, tags will be rendered in the version they were loaded in and new tags using the
version specified by defaultVersion. If forceDefaultVersion is `true`, all
tags will be rendered using that version, except for tags with footers which must be in
version 4.

#### Returns

[`ByteVector`](ByteVector.md)

The rendered tag.

___

### replaceFrame

▸ **replaceFrame**(`oldFrame`, `newFrame`): `void`

Replaces an existing frame with a new one in the list contained in the current instance, or
adds a new one if the existing one is not contained.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `oldFrame` | [`Id3v2Frame`](Id3v2Frame.md) | Object to be replaced |
| `newFrame` | [`Id3v2Frame`](Id3v2Frame.md) | Object to replace `oldFrame` with |

#### Returns

`void`

___

### setNumberFrame

▸ **setNumberFrame**(`ident`, `numerator`, `denominator`, `minPlaces?`): `void`

Sets the numerical values for a specified text information frame.
If both `numerator` and `denominator` are `0`, the frame will be removed
from the tag. If `denominator` is zero, `numerator` will be stored by
itself. Otherwise, the values will be stored as `{numerator}/{denominator}`.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `ident` | [`Id3v2FrameIdentifier`](Id3v2FrameIdentifier.md) | `undefined` | Identity of the frame to set |
| `numerator` | `number` | `undefined` | Value containing the top half of the fraction, or the number if `denominator` is zero |
| `denominator` | `number` | `undefined` | Value containing the bottom half of the fraction |
| `minPlaces` | `number` | `1` | Minimum number of digits to use to display the `numerator`, if the numerator has less than this number of digits, it will be filled with leading zeroes. |

#### Returns

`void`

___

### setTextFrame

▸ **setTextFrame**(`ident`, `...text`): `void`

Sets the text for a specified text information frame.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ident` | [`Id3v2FrameIdentifier`](Id3v2FrameIdentifier.md) | Identifier of the frame to set the data for |
| `...text` | `string`[] | Text to set for the specified frame or `undefined`/`null`/`""` to remove all frames with that identifier. |

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

### fromData

▸ `Static` **fromData**(`data`): [`Id3v2Tag`](Id3v2Tag.md)

Constructs and initializes a new Tag by reading the contents from a specified
[ByteVector](ByteVector.md) object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](ByteVector.md) | Tag data to read into a tag object |

#### Returns

[`Id3v2Tag`](Id3v2Tag.md)

Tag with the data from the byte vector read into it

___

### fromEmpty

▸ `Static` **fromEmpty**(): [`Id3v2Tag`](Id3v2Tag.md)

Constructs and initializes an empty ID3v2 tag.

#### Returns

[`Id3v2Tag`](Id3v2Tag.md)

___

### fromFileEnd

▸ `Static` **fromFileEnd**(`file`, `position`, `style`): [`Id3v2Tag`](Id3v2Tag.md)

Constructs and initializes a new Tag by reading the end of the tag first.

**`Remarks`**

This method should only be used if reading tags at the end of a file. Only ID3v2.4
    tags support a footer, which is required to use this method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | [`File`](File.md) | File from which the contents of the new instance is to be read |
| `position` | `number` | Offset into the file where the tag ends |
| `style` | [`ReadStyle`](../enums/ReadStyle.md) | How the data is to be read into the current instance |

#### Returns

[`Id3v2Tag`](Id3v2Tag.md)

___

### fromFileStart

▸ `Static` **fromFileStart**(`file`, `position`, `style`): [`Id3v2Tag`](Id3v2Tag.md)

Constructs and initializes a new Tag by reading the beginning of the tag.

**`Remarks`**

This method is the most flexible way of reading ID3v2 tags.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | [`File`](File.md) | File from which the contents of the new instance is to be read |
| `position` | `number` | Offset into the file where the tag begins |
| `style` | [`ReadStyle`](../enums/ReadStyle.md) | How the data is to be read into the current instance |

#### Returns

[`Id3v2Tag`](Id3v2Tag.md)

Tag with the data from the file read into it

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
