[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v1Tag

# Class: Id3v1Tag

Extends [Tag](tag.md) to provide support for reading and writing tags stored in the ID3v1.1 format.

## Hierarchy

- [`Tag`](tag.md)

  ↳ **`Id3v1Tag`**

## Table of contents

### Properties

- [fileIdentifier](id3v1tag.md#fileidentifier)
- [size](id3v1tag.md#size)

### Accessors

- [album](id3v1tag.md#album)
- [albumArtists](id3v1tag.md#albumartists)
- [albumArtistsSort](id3v1tag.md#albumartistssort)
- [albumSort](id3v1tag.md#albumsort)
- [amazonId](id3v1tag.md#amazonid)
- [beatsPerMinute](id3v1tag.md#beatsperminute)
- [comment](id3v1tag.md#comment)
- [composers](id3v1tag.md#composers)
- [composersSort](id3v1tag.md#composerssort)
- [conductor](id3v1tag.md#conductor)
- [copyright](id3v1tag.md#copyright)
- [dateTagged](id3v1tag.md#datetagged)
- [description](id3v1tag.md#description)
- [disc](id3v1tag.md#disc)
- [discCount](id3v1tag.md#disccount)
- [firstAlbumArtist](id3v1tag.md#firstalbumartist)
- [firstAlbumArtistSort](id3v1tag.md#firstalbumartistsort)
- [firstComposer](id3v1tag.md#firstcomposer)
- [firstComposerSort](id3v1tag.md#firstcomposersort)
- [firstGenre](id3v1tag.md#firstgenre)
- [firstPerformer](id3v1tag.md#firstperformer)
- [firstPerformerSort](id3v1tag.md#firstperformersort)
- [genres](id3v1tag.md#genres)
- [grouping](id3v1tag.md#grouping)
- [initialKey](id3v1tag.md#initialkey)
- [isEmpty](id3v1tag.md#isempty)
- [isrc](id3v1tag.md#isrc)
- [joinedAlbumArtists](id3v1tag.md#joinedalbumartists)
- [joinedComposers](id3v1tag.md#joinedcomposers)
- [joinedGenres](id3v1tag.md#joinedgenres)
- [joinedPerformers](id3v1tag.md#joinedperformers)
- [joinedPerformersSort](id3v1tag.md#joinedperformerssort)
- [lyrics](id3v1tag.md#lyrics)
- [musicBrainzArtistId](id3v1tag.md#musicbrainzartistid)
- [musicBrainzDiscId](id3v1tag.md#musicbrainzdiscid)
- [musicBrainzReleaseArtistId](id3v1tag.md#musicbrainzreleaseartistid)
- [musicBrainzReleaseCountry](id3v1tag.md#musicbrainzreleasecountry)
- [musicBrainzReleaseGroupId](id3v1tag.md#musicbrainzreleasegroupid)
- [musicBrainzReleaseId](id3v1tag.md#musicbrainzreleaseid)
- [musicBrainzReleaseStatus](id3v1tag.md#musicbrainzreleasestatus)
- [musicBrainzReleaseType](id3v1tag.md#musicbrainzreleasetype)
- [musicBrainzTrackId](id3v1tag.md#musicbrainztrackid)
- [musicIpId](id3v1tag.md#musicipid)
- [performers](id3v1tag.md#performers)
- [performersRole](id3v1tag.md#performersrole)
- [performersSort](id3v1tag.md#performerssort)
- [pictures](id3v1tag.md#pictures)
- [publisher](id3v1tag.md#publisher)
- [remixedBy](id3v1tag.md#remixedby)
- [replayGainAlbumGain](id3v1tag.md#replaygainalbumgain)
- [replayGainAlbumPeak](id3v1tag.md#replaygainalbumpeak)
- [replayGainTrackGain](id3v1tag.md#replaygaintrackgain)
- [replayGainTrackPeak](id3v1tag.md#replaygaintrackpeak)
- [sizeOnDisk](id3v1tag.md#sizeondisk)
- [subtitle](id3v1tag.md#subtitle)
- [tagTypes](id3v1tag.md#tagtypes)
- [title](id3v1tag.md#title)
- [titleSort](id3v1tag.md#titlesort)
- [track](id3v1tag.md#track)
- [trackCount](id3v1tag.md#trackcount)
- [year](id3v1tag.md#year)

### Methods

- [clear](id3v1tag.md#clear)
- [copyTo](id3v1tag.md#copyto)
- [render](id3v1tag.md#render)
- [setInfoTag](id3v1tag.md#setinfotag)
- [firstInGroup](id3v1tag.md#firstingroup)
- [fromData](id3v1tag.md#fromdata)
- [fromEmpty](id3v1tag.md#fromempty)
- [fromFile](id3v1tag.md#fromfile)
- [isFalsyOrLikeEmpty](id3v1tag.md#isfalsyorlikeempty)
- [joinGroup](id3v1tag.md#joingroup)
- [tagTypeFlagsToArray](id3v1tag.md#tagtypeflagstoarray)

## Properties

### fileIdentifier

▪ `Static` `Readonly` **fileIdentifier**: [`ByteVector`](bytevector.md)

Identifier used to recognize an ID3v1 tag.

___

### size

▪ `Static` `Readonly` **size**: ``128``

Size of an ID3v1 tag.

## Accessors

### album

• `get` **album**(): `string`

Gets the album of the media represented by the current instance. For video media, this
represents the collection the video belongs to.

**`inheritdoc`**

#### Returns

`string`

Album of the media represented by the current instance or `undefined` if no value
    is present

• `set` **album**(`value`): `void`

Gets the album of the media represented by the current instance. For video media, this
represents the collection the video belongs to.

**`inheritdoc`**

**`remarks`** When stored on disk, only the first 30 bytes of the latin-1 encoded value will
    be stored. This may result in data loss.

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

**`remarks`** This field is typically optional but aids in the sorting of compilations or albums
    with multiple artist. For example, if an album has several artists, sorting by artist
    will split up albums by the same artist. Having a single album artist for an entire
    album solves this problem.
    As this value is to be used as a sorting key, it should be used with less variation
    than [performers](id3v1tag.md#performers). Where performers can be broken into multiple artists, it is
    best to stick to a single name. Eg, "Super8 & Tab"

#### Returns

`string`[]

Band or artist credited with the creation of the entire album or collection
    containing the media described by the current instance or an empty array if no value is
    present

• `set` **albumArtists**(`value`): `void`

Sets the bands or artists who is credited credited in the creation of the entire album or
collection containing the media described by the current instance.

**`remarks`** This field is typically optional but aids in the sorting of compilations or albums
    with multiple artist. For example, if an album has several artists, sorting by artist
    will split up albums by the same artist. Having a single album artist for an entire
    album solves this problem.
    As this value is to be used as a sorting key, it should be used with less variation
    than [performers](id3v1tag.md#performers). Where performers can be broken into multiple artists, it is
    best to stick to a single name. Eg, "Super8 & Tab"

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string`[] | Band or artist credited with the creation of the entire album or collection     containing the media described by the current instance or an empty array if no value is     present |

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

**`see`** albumArtists

**`remarks`** This is used to provide more control over how the media is sorted. Typical uses are to
    skip articles or sort by last by last name. For example "Ben Folds" might be sorted as
    "Folds, Ben".
    As this value is to be used as a sorting key, it should be used with less variation than
    [performers](id3v1tag.md#performers). Where [performers](id3v1tag.md#performers) can be broken into multiple performers, it is
    best to stick to a single album artist. Eg, "Van Buuren, Armin"

#### Returns

`string`[]

Sortable names for the bands/artists are credited with the creation of the entire
    album or collection containing the media described by the current instance, or an empty
    array if no value is present.

• `set` **albumArtistsSort**(`value`): `void`

Sets the sortable names of the bands/artists who are credited with creating the entire
album or collection containing the media described by the current instance.

**`see`** albumArtists

**`remarks`** This is used to provide more control over how the media is sorted. Typical uses are to
    skip articles or sort by last by last name. For example "Ben Folds" might be sorted as
    "Folds, Ben".
    As this value is to be used as a sorting key, it should be used with less variation than
    [performers](id3v1tag.md#performers). Where [performers](id3v1tag.md#performers) can be broken into multiple performers, it is
    best to stick to a single album artist. Eg, "Van Buuren, Armin"

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string`[] | Sortable names for the bands/artists are credited with the creation of the     entire album or collection containing the media described by the current instance, or an     empty array if no value is present. |

#### Returns

`void`

Sortable names for the bands/artists are credited with the creation of the entire
    album or collection containing the media described by the current instance, or an empty
    array if no value is present.

___

### albumSort

• `get` **albumSort**(): `string`

Gets the sortable name of the album title of the media represented by the current instance.

**`see`** album

**`remarks`** This field is typically optional but aids in sort of compilations or albums with
    similar titles.

#### Returns

`string`

Sortable name for the album title of the media or `undefined` if the value is not
    present

• `set` **albumSort**(`value`): `void`

Sets the sortable name of the album title of the media represented by the current instance.

**`see`** album

**`remarks`** This field is typically optional but aids in sort of compilations or albums with
    similar titles.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Sortable name for the album title of the media or `undefined` if the value is     not present |

#### Returns

`void`

Sortable name for the album title of the media or `undefined` if the value is not
    present

___

### amazonId

• `get` **amazonId**(): `string`

Gets the Amazon ID of the media represented by the current instance.

**`remarks`** This field represents the AmazonID, also called the ASIN, and is used to uniquely
    identify the particular track or album in the Amazon catalog.

#### Returns

`string`

Amazon ID of the media represented by the current instance or `undefined` if no
    value is present

• `set` **amazonId**(`value`): `void`

Sets the Amazon ID of the media represented by the current instance.

**`remarks`** This field represents the AmazonID, also called the ASIN, and is used to uniquely
    identify the particular track or album in the Amazon catalog.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Amazon ID of the media represented by the current instance or `undefined` if no     value is present |

#### Returns

`void`

Amazon ID of the media represented by the current instance or `undefined` if no
    value is present

___

### beatsPerMinute

• `get` **beatsPerMinute**(): `number`

Gets the number of beats per minute in the audio of the media represented by the current
instance.

**`remarks`** This field is useful for DJ's who are trying to beat match tracks. It should be
    calculated from the audio or pulled from a database.

#### Returns

`number`

Beats per minute of the audio in the media represented by the current instance, or
    `0` if not specified

• `set` **beatsPerMinute**(`value`): `void`

Sets the number of beats per minute in the audio of the media represented by the current
instance.

**`remarks`** This field is useful for DJ's who are trying to beat match tracks. It should be
    calculated from the audio or pulled from a database.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Beats per minute of the audio in the media represented by the current instance,     or `0` if not specified |

#### Returns

`void`

Beats per minute of the audio in the media represented by the current instance, or
    `0` if not specified

___

### comment

• `get` **comment**(): `string`

Gets a user comment on the media represented by the current instance.

**`inheritdoc`**

#### Returns

`string`

User comments on the media represented by the current instance or `undefined` if
    the value is not present

• `set` **comment**(`value`): `void`

Gets a user comment on the media represented by the current instance.

**`inheritdoc`**

**`remarks`** When stored on disk, only the first 28 bytes of the latin-1 encoded value will
    be stored. This may result in lost data.

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

**`remarks`** This field represents the composers, song writers, script writers, or persons who
    claim authorship of the media.

#### Returns

`string`[]

Composers of the media represented by the current instance of an empty array if no
    value is present.

• `set` **composers**(`value`): `void`

Sets the composers of the media represented by the current instance.

**`remarks`** This field represents the composers, song writers, script writers, or persons who
    claim authorship of the media.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string`[] | Composers of the media represented by the current instance of an empty array if     no value is present. |

#### Returns

`void`

Composers of the media represented by the current instance of an empty array if no
    value is present.

___

### composersSort

• `get` **composersSort**(): `string`[]

Gets the sortable names of the composers of the media represented by the current instance.

**`see`** composers

**`remarks`** This field is typically optional but aids in the sorting of compilations or albums
    with multiple composers.

#### Returns

`string`[]

Sortable names for the composers of the media represented by the current instance
    or an empty array if no value is present.

• `set` **composersSort**(`value`): `void`

Sets the sortable names of the composers of the media represented by the current instance.

**`see`** composers

**`remarks`** This field is typically optional but aids in the sorting of compilations or albums
    with multiple composers.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string`[] | Sortable names for the composers of the media represented by the current     instance or an empty array if no value is present. |

#### Returns

`void`

Sortable names for the composers of the media represented by the current instance
    or an empty array if no value is present.

___

### conductor

• `get` **conductor**(): `string`

Gets the conductor or director of the media represented by the current instance.

**`remarks`** This field is most useful for organizing classical music and movies.

#### Returns

`string`

Conductor or director of the media represented by the current instance or
    `undefined` if no value present.

• `set` **conductor**(`value`): `void`

Sets the conductor or director of the media represented by the current instance.

**`remarks`** This field is most useful for organizing classical music and movies.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Conductor or director of the media represented by the current instance or     `undefined` if no value present. |

#### Returns

`void`

Conductor or director of the media represented by the current instance or
    `undefined` if no value present.

___

### copyright

• `get` **copyright**(): `string`

Gets the copyright information for the media represented by the current instance.

**`remarks`** This field should be used for storing copyright information. It may be useful to show
    this information somewhere in the program while the media is playing.
    Players should not support editing this field, but media creation tools should
    definitely allow modification.

#### Returns

`string`

Copyright information for the media represented by the current instance or
    `undefined` if no value is present.

• `set` **copyright**(`value`): `void`

Sets the copyright information for the media represented by the current instance.

**`remarks`** This field should be used for storing copyright information. It may be useful to show
    this information somewhere in the program while the media is playing.
    Players should not support editing this field, but media creation tools should
    definitely allow modification.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Copyright information for the media represented by the current instance or     `undefined` if no value is present. |

#### Returns

`void`

Copyright information for the media represented by the current instance or
    `undefined` if no value is present.

___

### dateTagged

• `get` **dateTagged**(): `Date`

Gets the date and time at which the tag has been written.

#### Returns

`Date`

Date/time at which the tag has been written, or `undefined` if no value is present

• `set` **dateTagged**(`value`): `void`

Sets the date and time at which the tag has been written.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `Date` | Date/time at which the tag has been written, or `undefined` if no value is     present |

#### Returns

`void`

Date/time at which the tag has been written, or `undefined` if no value is present

___

### description

• `get` **description**(): `string`

Gets a short description of the media. For music, this could be the comment that the artist
made of his/her work. For a video, this should be a short summary of the story/plot, but
generally no spoliers. This should give the impression of what to expect in the media.

**`remarks`** This is especially relevant for a movie. For example, for "Fear and Loathing in Las
    Vegas", this could be "An oddball journalist and his psychopathic lawyer travel to Las
    Vegas for a series of psychedelic escapades."

#### Returns

`string`

Description of the media represented by the current instance or `undefined` if no
    value is present

• `set` **description**(`value`): `void`

Sets a short description of the media. For music, this could be the comment that the artist
made of his/her work. For a video, this should be a short summary of the story/plot, but
generally no spoliers. This should give the impression of what to expect in the media.

**`remarks`** This is especially relevant for a movie. For example, for "Fear and Loathing in Las
    Vegas", this could be "An oddball journalist and his psychopathic lawyer travel to Las
    Vegas for a series of psychedelic escapades."

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Description of the media represented by the current instance or `undefined` if     no value is present |

#### Returns

`void`

Description of the media represented by the current instance or `undefined` if no
    value is present

___

### disc

• `get` **disc**(): `number`

Gets the number of the disc containing the media represented by the current instance in the
boxed set. For a series, this represents the season number.

**`remarks`** This value should be the same as the number that appears on the disc. For example, if
    the disc is the first of three, the value should be `1`. It should be no more than
    [discCount](id3v1tag.md#disccount) if [discCount](id3v1tag.md#disccount) is non-zero.

#### Returns

`number`

Number of the disc or season of the media represented by the current instance in a
    boxed set.

• `set` **disc**(`value`): `void`

Sets the number of the disc containing the media represented by the current instance in the
boxed set. For a series, this represents the season number.

**`remarks`** This value should be the same as the number that appears on the disc. For example, if
    the disc is the first of three, the value should be `1`. It should be no more than
    [discCount](id3v1tag.md#disccount) if [discCount](id3v1tag.md#disccount) is non-zero.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Number of the disc or season of the media represented by the current instance     in a boxed set. |

#### Returns

`void`

Number of the disc or season of the media represented by the current instance in a
    boxed set.

___

### discCount

• `get` **discCount**(): `number`

Gets the number of discs or seasons in the boxed set containing the media represented by the
current instance.

**`remarks`** If non-zero, this should be at least equal to [disc](id3v1tag.md#disc). If [disc](id3v1tag.md#disc) is zero,
    this value should also be zero.

#### Returns

`number`

Number of discs or seasons in the boxed set containing the media represented by the
    current instance or `0` if not specified.

• `set` **discCount**(`value`): `void`

Sets the number of discs or seasons in the boxed set containing the media represented by the
current instance.

**`remarks`** If non-zero, this should be at least equal to [disc](id3v1tag.md#disc). If [disc](id3v1tag.md#disc) is zero,
    this value should also be zero.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Number of discs or seasons in the boxed set containing the media represented by     the current instance or `0` if not specified. |

#### Returns

`void`

Number of discs or seasons in the boxed set containing the media represented by the
    current instance or `0` if not specified.

___

### firstAlbumArtist

• `get` **firstAlbumArtist**(): `string`

Gets the the first value contained in [albumArtists](id3v1tag.md#albumartists).

#### Returns

`string`

___

### firstAlbumArtistSort

• `get` **firstAlbumArtistSort**(): `string`

Gets the first value contained in [albumArtistsSort](id3v1tag.md#albumartistssort)

#### Returns

`string`

___

### firstComposer

• `get` **firstComposer**(): `string`

Gets the first value contained in [composers](id3v1tag.md#composers)

#### Returns

`string`

___

### firstComposerSort

• `get` **firstComposerSort**(): `string`

Gets the first value contained in [composersSort](id3v1tag.md#composerssort)

#### Returns

`string`

___

### firstGenre

• `get` **firstGenre**(): `string`

Gets the first value contained in [genres](id3v1tag.md#genres)

#### Returns

`string`

___

### firstPerformer

• `get` **firstPerformer**(): `string`

Gets the first value contained in [performers](id3v1tag.md#performers)

#### Returns

`string`

___

### firstPerformerSort

• `get` **firstPerformerSort**(): `string`

Gets the first value contained in [performersSort](id3v1tag.md#performerssort)

#### Returns

`string`

___

### genres

• `get` **genres**(): `string`[]

Gets the genres of the media represented by the current instance.

**`inheritdoc`**

#### Returns

`string`[]

Genres of the media represented by the current instance or an empty array if no
    value is present.

• `set` **genres**(`value`): `void`

Gets the genres of the media represented by the current instance.

**`inheritdoc`**

**`remarks`** Only first genre will be stored and only if it is an exact match for a value in
    the list of audio genres. All other values will result in the property being cleared.

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

**`remarks`** This field contains a non-physical group to which the track belongs. In classical
    music this could be a movement. It could also be parts of a series like "Introduction",
    "Closing Remarks", etc.

#### Returns

`string`

Grouping on the album which the media in the current instance belongs to or
    `undefined` if no value is present.

• `set` **grouping**(`value`): `void`

Sets the grouping on the album which the media in the current instance belongs to.

**`remarks`** This field contains a non-physical group to which the track belongs. In classical
    music this could be a movement. It could also be parts of a series like "Introduction",
    "Closing Remarks", etc.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Grouping on the album which the media in the current instance belongs to or     `undefined` if no value is present. |

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

**`remarks`** In the default implementation, this checks the values supported by [Tag](tag.md), but it
    may be extended by child classes to support other values.

#### Returns

`boolean`

`true` if the current instance does not contain any values. `false` otherwise

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

### joinedAlbumArtists

• `get` **joinedAlbumArtists**(): `string`

Gets a semicolon and space separated string containing the values in [albumArtists](id3v1tag.md#albumartists)

#### Returns

`string`

___

### joinedComposers

• `get` **joinedComposers**(): `string`

Gets a semicolon and space separated string containing the values in [composers](id3v1tag.md#composers)

#### Returns

`string`

___

### joinedGenres

• `get` **joinedGenres**(): `string`

Gets a semicolon and space separated string containing the values in [genres](id3v1tag.md#genres)

#### Returns

`string`

___

### joinedPerformers

• `get` **joinedPerformers**(): `string`

Gets a semicolon and space separated string containing the values in [performers](id3v1tag.md#performers)

#### Returns

`string`

___

### joinedPerformersSort

• `get` **joinedPerformersSort**(): `string`

Gets a semicolon and space separated string containing the values in [performersSort](id3v1tag.md#performerssort)

#### Returns

`string`

___

### lyrics

• `get` **lyrics**(): `string`

Gets the lyrics or script of the media represented by the current instance.

**`remarks`** This field contains a plain text representation of the lyrics or scripts with line
    breaks and whitespace being the only formatting marks.
    Some formats support more advanced lyrics, like synchronized lyrics, but those must be
    accessed using format-specific implementations.

#### Returns

`string`

Lyrics or script of the media represented by the current instance or `undefined` if
    no value is present

• `set` **lyrics**(`value`): `void`

Sets the lyrics or script of the media represented by the current instance.

**`remarks`** This field contains a plain text representation of the lyrics or scripts with line
    breaks and whitespace being the only formatting marks.
    Some formats support more advanced lyrics, like synchronized lyrics, but those must be
    accessed using format-specific implementations.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Lyrics or script of the media represented by the current instance or     `undefined` if no value is present |

#### Returns

`void`

Lyrics or script of the media represented by the current instance or `undefined` if
    no value is present

___

### musicBrainzArtistId

• `get` **musicBrainzArtistId**(): `string`

Gets the MusicBrainz artist ID of the media represented by the current instance.

**`remarks`** This field represents the MusicBrainz ArtistID, and is used to uniquely identify a
    particular artist of the track.

#### Returns

`string`

MusicBrainz ArtistID of the media represented by the current instance or
    `undefined` if no value is present

• `set` **musicBrainzArtistId**(`value`): `void`

Sets the MusicBrainz artist ID of the media represented by the current instance.

**`remarks`** This field represents the MusicBrainz ArtistID, and is used to uniquely identify a
    particular artist of the track.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | MusicBrainz ArtistID of the media represented by the current instance or     `undefined` if no value is present |

#### Returns

`void`

MusicBrainz ArtistID of the media represented by the current instance or
    `undefined` if no value is present

___

### musicBrainzDiscId

• `get` **musicBrainzDiscId**(): `string`

Gets the MusicBrainz disc ID of the media represented by the current instance.

**`remarks`** This field represents the MusicBrainz DiscID and is used to uniquely identify the
    particular released media associated with this track.

#### Returns

`string`

MusicBrainz DiscID of the media represented by the current instance or `undefined`
    if no value is present

• `set` **musicBrainzDiscId**(`value`): `void`

Sets the MusicBrainz disc ID of the media represented by the current instance.

**`remarks`** This field represents the MusicBrainz DiscID and is used to uniquely identify the
    particular released media associated with this track.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | MusicBrainz DiscID of the media represented by the current instance or     `undefined` if no value is present |

#### Returns

`void`

MusicBrainz DiscID of the media represented by the current instance or `undefined`
    if no value is present

___

### musicBrainzReleaseArtistId

• `get` **musicBrainzReleaseArtistId**(): `string`

Gets the MusicBrainz release artist ID of the media represented by the current instance.

**`remarks`** This field represents the MusicBrainz ReleaseArtistID, and is used to uniquely
    identify a particular album artist credited with the album.

#### Returns

`string`

MusicBrainz ReleaseArtistID of the media represented by the current instance or
    `undefined` if no value is present

• `set` **musicBrainzReleaseArtistId**(`value`): `void`

Sets the MusicBrainz release artist ID of the media represented by the current instance.

**`remarks`** This field represents the MusicBrainz ReleaseArtistID, and is used to uniquely
    identify a particular album artist credited with the album.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | MusicBrainz ReleaseArtistID of the media represented by the current instance or     `undefined` if no value is present |

#### Returns

`void`

MusicBrainz ReleaseArtistID of the media represented by the current instance or
    `undefined` if no value is present

___

### musicBrainzReleaseCountry

• `get` **musicBrainzReleaseCountry**(): `string`

Gets the MusicBrainz release country of the media represented by the current instance.

**`remarks`** This field represents the MusicBrainz ReleaseCountry which describes the country in
    which an album was released. Note that the release country of an album is not
    necessarily the country in which it was produced. The label itself will typically be
    more relevant. Eg, a release on "Foo Records UK" that has "Made in Austria" printed on
    it will likely be a UK release.

#### Returns

`string`

MusicBrainz ReleaseCountry of the media represented by the current instance or
    `undefined` if no value is present

• `set` **musicBrainzReleaseCountry**(`value`): `void`

Sets the MusicBrainz release country of the media represented by the current instance.

**`remarks`** This field represents the MusicBrainz ReleaseCountry which describes the country in
    which an album was released. Note that the release country of an album is not
    necessarily the country in which it was produced. The label itself will typically be
    more relevant. Eg, a release on "Foo Records UK" that has "Made in Austria" printed on
    it will likely be a UK release.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | MusicBrainz ReleaseCountry of the media represented by the current instance or     `undefined` if no value is present |

#### Returns

`void`

MusicBrainz ReleaseCountry of the media represented by the current instance or
    `undefined` if no value is present

___

### musicBrainzReleaseGroupId

• `get` **musicBrainzReleaseGroupId**(): `string`

Gets the MusicBrainz release group ID of the media represented by the current instance.

**`remarks`** This field represents the MusicBrainz ReleaseGroupID and is used to uniquely identify
    a particular release group to which this track belongs.

#### Returns

`string`

MusicBrainz ReleaseGroupID of the media represented by the current instance or
    `undefined` if no value is present

• `set` **musicBrainzReleaseGroupId**(`value`): `void`

Sets the MusicBrainz release group ID of the media represented by the current instance.

**`remarks`** This field represents the MusicBrainz ReleaseGroupID and is used to uniquely identify
    a particular release group to which this track belongs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | MusicBrainz ReleaseGroupID of the media represented by the current instance or     `undefined` if no value is present |

#### Returns

`void`

MusicBrainz ReleaseGroupID of the media represented by the current instance or
    `undefined` if no value is present

___

### musicBrainzReleaseId

• `get` **musicBrainzReleaseId**(): `string`

Gets the MusicBrainz release ID of the media represented by the current instance.

**`remarks`** This field represents the MusicBrains ReleaseID and is used to uniquely identify a
    particular release to which this track belongs.

#### Returns

`string`

MusicBrainz ReleaseID of the media represented by the current instance or
    `undefined` if no value is present

• `set` **musicBrainzReleaseId**(`value`): `void`

Sets the MusicBrainz release ID of the media represented by the current instance.

**`remarks`** This field represents the MusicBrains ReleaseID and is used to uniquely identify a
    particular release to which this track belongs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | MusicBrainz ReleaseID of the media represented by the current instance or     `undefined` if no value is present |

#### Returns

`void`

MusicBrainz ReleaseID of the media represented by the current instance or
    `undefined` if no value is present

___

### musicBrainzReleaseStatus

• `get` **musicBrainzReleaseStatus**(): `string`

Gets the MusicBrainz release status of the media represented by the current instance.

**`remarks`** This field represents the MusicBrainz ReleaseStatus used to describe how 'official' a
    release is. Common statuses are: `Official`, `Promotion`, `Bootleg`, `Pseudo-release`.

#### Returns

`string`

MusicBrainz ReleaseStatus of the media represented by the current instance or
    `undefined` if no value is present

• `set` **musicBrainzReleaseStatus**(`value`): `void`

Sets the MusicBrainz release status of the media represented by the current instance.

**`remarks`** This field represents the MusicBrainz ReleaseStatus used to describe how 'official' a
    release is. Common statuses are: `Official`, `Promotion`, `Bootleg`, `Pseudo-release`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | MusicBrainz ReleaseStatus of the media represented by the current instance or     `undefined` if no value is present |

#### Returns

`void`

MusicBrainz ReleaseStatus of the media represented by the current instance or
    `undefined` if no value is present

___

### musicBrainzReleaseType

• `get` **musicBrainzReleaseType**(): `string`

Gets the MusicBrainz release type of the media represented by the current instance.

**`remarks`** This field represents the MusicBrainz ReleaseType that describes what kind of release
    a release is. Common types are: `Single`, `Album`, `EP`, `Compilation`, `Soundtrack,
    `SpokenWord`, `Interview`, `Audiobook`, `Live`, `Remix`, and `Other`. Careful thought
    must be given when using this field to decide if a particular track "is a compilation".

#### Returns

`string`

MusicBrainz ReleaseType of the media represented by the current instance or
    `undefined` if no value is present

• `set` **musicBrainzReleaseType**(`value`): `void`

Sets the MusicBrainz release type of the media represented by the current instance.

**`remarks`** This field represents the MusicBrainz ReleaseType that describes what kind of release
    a release is. Common types are: `Single`, `Album`, `EP`, `Compilation`, `Soundtrack,
    `SpokenWord`, `Interview`, `Audiobook`, `Live`, `Remix`, and `Other`. Careful thought
    must be given when using this field to decide if a particular track "is a compilation".

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | MusicBrainz ReleaseType of the media represented by the current instance or     `undefined` if no value is present |

#### Returns

`void`

MusicBrainz ReleaseType of the media represented by the current instance or
    `undefined` if no value is present

___

### musicBrainzTrackId

• `get` **musicBrainzTrackId**(): `string`

Gets the MusicBrainz track ID of the media represented by the media represented by the
current instance.

**`remarks`** This field represents the MusicBrainz TrackID and is used to uniquely identify a
    particular track.

#### Returns

`string`

MusicBrainz TrackID of the media represented by the current instance or `undefined`
    if no value is present

• `set` **musicBrainzTrackId**(`value`): `void`

Sets the MusicBrainz track ID of the media represented by the media represented by the
current instance.

**`remarks`** This field represents the MusicBrainz TrackID and is used to uniquely identify a
    particular track.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | MusicBrainz TrackID of the media represented by the current instance or     `undefined` if no value is present |

#### Returns

`void`

MusicBrainz TrackID of the media represented by the current instance or `undefined`
    if no value is present

___

### musicIpId

• `get` **musicIpId**(): `string`

Gets the MusicIP PUID of the media represented by the current instance.

**`remarks`** This field represents the MusicIP PUID, an acoustic fingerprint identifier. It
    identifies wht this track "sounds like".

#### Returns

`string`

MusicIP PUID of the media represented by the current instance or `undefined` if no
    value is present

• `set` **musicIpId**(`value`): `void`

Sets the MusicIP PUID of the media represented by the current instance.

**`remarks`** This field represents the MusicIP PUID, an acoustic fingerprint identifier. It
    identifies wht this track "sounds like".

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | MusicIP PUID of the media represented by the current instance or `undefined`     if no value is present |

#### Returns

`void`

MusicIP PUID of the media represented by the current instance or `undefined` if no
    value is present

___

### performers

• `get` **performers**(): `string`[]

Gets the performers or artists who performed in the media described by the current instance.

**`inheritdoc`**

#### Returns

`string`[]

Performers who performed in the media described by the current instance or an empty
    array if no value is present.

• `set` **performers**(`value`): `void`

Gets the performers or artists who performed in the media described by the current instance.

**`inheritdoc`**

**`remarks`** When stored on disk, only the first 30 bytes of the latin-1 encoded value will
    be stored, minus a byte for each additional performer (ie, two performers will only have
    29 bytes and three performers will only have 28 bytes). This may result in data loss.

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
for music. This must match the [performers](id3v1tag.md#performers) array (for each person, correspond one/more
role). Several roles for the same artist/actor can be separated with semicolons. For
example: "Bass; Backing Vocals; Vibraphone".

**`remarks`** It is highly important to match each role to the performers. This means that an entry
    in the [performersRole](id3v1tag.md#performersrole) array is `undefined` to maintain the relationship between
    `performers[i]` and `performersRole[i]`.

#### Returns

`string`[]

Array containing the roles played by the performers in the media described by the
    current instance, or an empty array if no value is present.

• `set` **performersRole**(`value`): `void`

Sets the characters portrayed by an actor for a video or instruments played by a musician
for music. This must match the [performers](id3v1tag.md#performers) array (for each person, correspond one/more
role). Several roles for the same artist/actor can be separated with semicolons. For
example: "Bass; Backing Vocals; Vibraphone".

**`remarks`** It is highly important to match each role to the performers. This means that an entry
    in the [performersRole](id3v1tag.md#performersrole) array is `undefined` to maintain the relationship between
    `performers[i]` and `performersRole[i]`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string`[] | Array containing the roles played by the performers in the media described by     the current instance, or an empty array if no value is present. |

#### Returns

`void`

Array containing the roles played by the performers in the media described by the
    current instance, or an empty array if no value is present.

___

### performersSort

• `get` **performersSort**(): `string`[]

Gets the sortable names of the performers or artists who performed in the media described by
the current instance.

**`remarks`** This is used to provide more control over how the media is sorted. Typical uses are to
    skip articles or sort by last name. For example, "The Pillows" might be sorted as
    "Pillows, The".

**`see`** performers

#### Returns

`string`[]

Sortable names for the performers who performed in the media described by the
    current instance, or an empty array if no value is present.

• `set` **performersSort**(`value`): `void`

Gets the sortable names of the performers or artists who performed in the media described by
the current instance.

**`remarks`** This is used to provide more control over how the media is sorted. Typical uses are to
    skip articles or sort by last name. For example, "The Pillows" might be sorted as
    "Pillows, The".

**`see`** performers

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string`[] | Sortable names for the performers who performed in the media described by the     current instance, or an empty array if no value is present. |

#### Returns

`void`

Sortable names for the performers who performed in the media described by the
    current instance, or an empty array if no value is present.

___

### pictures

• `get` **pictures**(): [`IPicture`](../interfaces/ipicture.md)[]

Gets a collection of pictures associated with the media represented by the current instance.

**`remarks`** Typically, this value is used to store an album cover or icon to use for the file, but
    it is capable of holding any type of image or file, including pictures of the band, the
    recording studio, the concert, etc.

#### Returns

[`IPicture`](../interfaces/ipicture.md)[]

Array containing a collection of pictures associated with the media represented by
    the current instance or an empty array if no pictures are present.

• `set` **pictures**(`value`): `void`

Sets a collection of pictures associated with the media represented by the current instance.

**`remarks`** Typically, this value is used to store an album cover or icon to use for the file, but
    it is capable of holding any type of image or file, including pictures of the band, the
    recording studio, the concert, etc.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`IPicture`](../interfaces/ipicture.md)[] | Array containing a collection of pictures associated with the media represented by     the current instance or an empty array if no pictures are present. |

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

#### Returns

`number`

Album gain as per the ReplayGain specifications, in dB, or `NaN` if no value is set

• `set` **replayGainAlbumGain**(`value`): `void`

Sets the ReplayGain album gain in dB.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Album gain as per the ReplayGain specifications, in dB, or `NaN` if no value is     set |

#### Returns

`void`

Album gain as per the ReplayGain specifications, in dB, or `NaN` if no value is set

___

### replayGainAlbumPeak

• `get` **replayGainAlbumPeak**(): `number`

Gets the ReplayGain album peak sample.

#### Returns

`number`

Album peak as per the ReplayGain specifications, or `NaN` if no value is set

• `set` **replayGainAlbumPeak**(`value`): `void`

Sets the ReplayGain album peak sample.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Album peak as per the ReplayGain specifications, or `NaN` if no value is set |

#### Returns

`void`

Album peak as per the ReplayGain specifications, or `NaN` if no value is set

___

### replayGainTrackGain

• `get` **replayGainTrackGain**(): `number`

Gets the ReplayGain track gain in dB.

#### Returns

`number`

Track gain as per ReplayGain specifications, in dB, or `NaN` if no value is set

• `set` **replayGainTrackGain**(`value`): `void`

Sets the ReplayGain track gain in dB.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Track gain as per ReplayGain specifications, in dB, or `NaN` if no value is set |

#### Returns

`void`

Track gain as per ReplayGain specifications, in dB, or `NaN` if no value is set

___

### replayGainTrackPeak

• `get` **replayGainTrackPeak**(): `number`

Gets the ReplayGain track peak sample.

#### Returns

`number`

Track peak as per the ReplayGain specifications, or `NaN` if no value is set

• `set` **replayGainTrackPeak**(`value`): `void`

Sets the ReplayGain track peak sample.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Track peak as per the ReplayGain specifications, or `NaN` if no value is set |

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

**`remarks`** This field gives a nice/short precision to the title, which is typically below the
    title on the front cover of the media. For example for "Ocean's 13", this would be
    "Revenge is a funny thing".

#### Returns

`string`

Subtitle of the media represented by the current instance or `undefined` if no
    value is present

• `set` **subtitle**(`value`): `void`

Sets a description, one-line. It represents the tagline of the vide/music.

**`remarks`** This field gives a nice/short precision to the title, which is typically below the
    title on the front cover of the media. For example for "Ocean's 13", this would be
    "Revenge is a funny thing".

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Subtitle of the media represented by the current instance or `undefined` if no     value is present |

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

**`inheritdoc`**

#### Returns

`string`

Title of the media described by the current instance or `undefined` if no value is
    present.

• `set` **title**(`value`): `void`

Gets the title for the media described by the current instance.

**`inheritdoc`**

**`remarks`** When stored on disk, only the first 30 bytes of the latin-1 encoded value will
    be stored. This may result in lost data.

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

**`remarks`** Possibly used to sort compilations or episodic content.

#### Returns

`string`

Sortable name of the media described by the current instance or `undefined` if no
    value is present

• `set` **titleSort**(`value`): `void`

Sets the sortable name for the title of the media described by the current instance.

**`remarks`** Possibly used to sort compilations or episodic content.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Sortable name of the media described by the current instance or `undefined` if     no value is present |

#### Returns

`void`

Sortable name of the media described by the current instance or `undefined` if no
    value is present

___

### track

• `get` **track**(): `number`

Gets the position of the media represented by the current instance in its containing album
or season (for a series).

**`inheritdoc`**

#### Returns

`number`

Position of the media represented by the current instance in its containing album
    or `0` if not specified.

• `set` **track**(`value`): `void`

Gets the position of the media represented by the current instance in its containing album
or season (for a series).

**`inheritdoc`**

**`remarks`** Only values betweenInclusive 1 and 255 will be stored. All other values will result in
    the property being zeroed.

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

**`remarks`** If non-zero, this value should be equal to or greater than [track](id3v1tag.md#track). If
    [track](id3v1tag.md#track) is `0`, this value should also be `0`.

#### Returns

`number`

Number of tracks in the album or number of episodes in a series of the media
    represented by the current instance or `0` if not specified.

• `set` **trackCount**(`value`): `void`

Sets the number of tracks in the album or the number of episodes in a series of the media
represented by the current instance.

**`remarks`** If non-zero, this value should be equal to or greater than [track](id3v1tag.md#track). If
    [track](id3v1tag.md#track) is `0`, this value should also be `0`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Number of tracks in the album or number of episodes in a series of the media     represented by the current instance or `0` if not specified. |

#### Returns

`void`

Number of tracks in the album or number of episodes in a series of the media
    represented by the current instance or `0` if not specified.

___

### year

• `get` **year**(): `number`

Gets the year that the media represented by the current instance was recorded.

**`inheritdoc`**

#### Returns

`number`

Year that the media represented by the current instance was created or `0` if no
    value is present.

• `set` **year**(`value`): `void`

Gets the year that the media represented by the current instance was recorded.

**`inheritdoc`**

**`remarks`** Only values betweenInclusive 1 and 9999 will be stored. All other values will result in
    the property being zeroed.

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

#### Inherited from

[Tag](tag.md).[copyTo](tag.md#copyto)

___

### render

▸ **render**(): [`ByteVector`](bytevector.md)

Renders the current instance as a raw ID3v1 tag.

#### Returns

[`ByteVector`](bytevector.md)

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

▸ `Static` **fromData**(`data`): [`Id3v1Tag`](id3v1tag.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`ByteVector`](bytevector.md) |

#### Returns

[`Id3v1Tag`](id3v1tag.md)

___

### fromEmpty

▸ `Static` **fromEmpty**(): [`Id3v1Tag`](id3v1tag.md)

Constructs and initializes a new instance of [Id3v1Tag](id3v1tag.md) with no contents.

#### Returns

[`Id3v1Tag`](id3v1tag.md)

___

### fromFile

▸ `Static` **fromFile**(`file`, `position`): [`Id3v1Tag`](id3v1tag.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | [`File`](file.md) |
| `position` | `number` |

#### Returns

[`Id3v1Tag`](id3v1tag.md)

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
