[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v1Tag

# Class: Id3v1Tag

Extends [Tag](Tag.md) to provide support for reading and writing tags stored in the ID3v1.1 format.

## Hierarchy

- [`Tag`](Tag.md)

  ↳ **`Id3v1Tag`**

## Table of contents

### Properties

- [FILE\_IDENTIFIER](Id3v1Tag.md#file_identifier)
- [TOTAL\_SIZE](Id3v1Tag.md#total_size)

### Accessors

- [album](Id3v1Tag.md#album)
- [albumArtists](Id3v1Tag.md#albumartists)
- [albumArtistsSort](Id3v1Tag.md#albumartistssort)
- [albumSort](Id3v1Tag.md#albumsort)
- [amazonId](Id3v1Tag.md#amazonid)
- [beatsPerMinute](Id3v1Tag.md#beatsperminute)
- [comment](Id3v1Tag.md#comment)
- [composers](Id3v1Tag.md#composers)
- [composersSort](Id3v1Tag.md#composerssort)
- [conductor](Id3v1Tag.md#conductor)
- [copyright](Id3v1Tag.md#copyright)
- [dateTagged](Id3v1Tag.md#datetagged)
- [description](Id3v1Tag.md#description)
- [disc](Id3v1Tag.md#disc)
- [discCount](Id3v1Tag.md#disccount)
- [firstAlbumArtist](Id3v1Tag.md#firstalbumartist)
- [firstAlbumArtistSort](Id3v1Tag.md#firstalbumartistsort)
- [firstComposer](Id3v1Tag.md#firstcomposer)
- [firstComposerSort](Id3v1Tag.md#firstcomposersort)
- [firstGenre](Id3v1Tag.md#firstgenre)
- [firstPerformer](Id3v1Tag.md#firstperformer)
- [firstPerformerSort](Id3v1Tag.md#firstperformersort)
- [genres](Id3v1Tag.md#genres)
- [grouping](Id3v1Tag.md#grouping)
- [initialKey](Id3v1Tag.md#initialkey)
- [isCompilation](Id3v1Tag.md#iscompilation)
- [isEmpty](Id3v1Tag.md#isempty)
- [isrc](Id3v1Tag.md#isrc)
- [joinedAlbumArtists](Id3v1Tag.md#joinedalbumartists)
- [joinedComposers](Id3v1Tag.md#joinedcomposers)
- [joinedGenres](Id3v1Tag.md#joinedgenres)
- [joinedPerformers](Id3v1Tag.md#joinedperformers)
- [joinedPerformersSort](Id3v1Tag.md#joinedperformerssort)
- [lyrics](Id3v1Tag.md#lyrics)
- [musicBrainzArtistId](Id3v1Tag.md#musicbrainzartistid)
- [musicBrainzDiscId](Id3v1Tag.md#musicbrainzdiscid)
- [musicBrainzReleaseArtistId](Id3v1Tag.md#musicbrainzreleaseartistid)
- [musicBrainzReleaseCountry](Id3v1Tag.md#musicbrainzreleasecountry)
- [musicBrainzReleaseGroupId](Id3v1Tag.md#musicbrainzreleasegroupid)
- [musicBrainzReleaseId](Id3v1Tag.md#musicbrainzreleaseid)
- [musicBrainzReleaseStatus](Id3v1Tag.md#musicbrainzreleasestatus)
- [musicBrainzReleaseType](Id3v1Tag.md#musicbrainzreleasetype)
- [musicBrainzTrackId](Id3v1Tag.md#musicbrainztrackid)
- [musicIpId](Id3v1Tag.md#musicipid)
- [performers](Id3v1Tag.md#performers)
- [performersRole](Id3v1Tag.md#performersrole)
- [performersSort](Id3v1Tag.md#performerssort)
- [pictures](Id3v1Tag.md#pictures)
- [publisher](Id3v1Tag.md#publisher)
- [remixedBy](Id3v1Tag.md#remixedby)
- [replayGainAlbumGain](Id3v1Tag.md#replaygainalbumgain)
- [replayGainAlbumPeak](Id3v1Tag.md#replaygainalbumpeak)
- [replayGainTrackGain](Id3v1Tag.md#replaygaintrackgain)
- [replayGainTrackPeak](Id3v1Tag.md#replaygaintrackpeak)
- [sizeOnDisk](Id3v1Tag.md#sizeondisk)
- [subtitle](Id3v1Tag.md#subtitle)
- [tagTypes](Id3v1Tag.md#tagtypes)
- [title](Id3v1Tag.md#title)
- [titleSort](Id3v1Tag.md#titlesort)
- [track](Id3v1Tag.md#track)
- [trackCount](Id3v1Tag.md#trackcount)
- [year](Id3v1Tag.md#year)

### Methods

- [clear](Id3v1Tag.md#clear)
- [copyTo](Id3v1Tag.md#copyto)
- [render](Id3v1Tag.md#render)
- [setInfoTag](Id3v1Tag.md#setinfotag)
- [firstInGroup](Id3v1Tag.md#firstingroup)
- [fromData](Id3v1Tag.md#fromdata)
- [fromEmpty](Id3v1Tag.md#fromempty)
- [fromFile](Id3v1Tag.md#fromfile)
- [isFalsyOrLikeEmpty](Id3v1Tag.md#isfalsyorlikeempty)
- [joinGroup](Id3v1Tag.md#joingroup)
- [tagTypeFlagsToArray](Id3v1Tag.md#tagtypeflagstoarray)

## Properties

### FILE\_IDENTIFIER

▪ `Static` `Readonly` **FILE\_IDENTIFIER**: [`ByteVector`](ByteVector.md)

Identifier used to recognize an ID3v1 tag.

___

### TOTAL\_SIZE

▪ `Static` `Readonly` **TOTAL\_SIZE**: ``128``

Size of an ID3v1 tag.

## Accessors

### album

• `get` **album**(): `string`

**`inheritdoc`**

#### Returns

`string`

#### Overrides

Tag.album

• `set` **album**(`value`): `void`

**`inheritdoc`**

**`remarks`** When stored on disk, only the first 30 bytes of the latin-1 encoded value will
    be stored. This may result in data loss.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Overrides

Tag.album

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
    than [performers](Id3v1Tag.md#performers). Where performers can be broken into multiple artists, it is
    best to stick to a single name. Eg, "Super8 & Tab"

#### Returns

`string`[]

Band or artist credited with the creation of the entire album or collection
    containing the media described by the current instance or an empty array if no value is
    present

#### Inherited from

Tag.albumArtists

• `set` **albumArtists**(`value`): `void`

Sets the bands or artists who is credited credited in the creation of the entire album or
collection containing the media described by the current instance.

**`remarks`** This field is typically optional but aids in the sorting of compilations or albums
    with multiple artist. For example, if an album has several artists, sorting by artist
    will split up albums by the same artist. Having a single album artist for an entire
    album solves this problem.
    As this value is to be used as a sorting key, it should be used with less variation
    than [performers](Id3v1Tag.md#performers). Where performers can be broken into multiple artists, it is
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

#### Inherited from

Tag.albumArtists

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
    [performers](Id3v1Tag.md#performers). Where [performers](Id3v1Tag.md#performers) can be broken into multiple performers, it is
    best to stick to a single album artist. Eg, "Van Buuren, Armin"

#### Returns

`string`[]

Sortable names for the bands/artists are credited with the creation of the entire
    album or collection containing the media described by the current instance, or an empty
    array if no value is present.

#### Inherited from

Tag.albumArtistsSort

• `set` **albumArtistsSort**(`value`): `void`

Sets the sortable names of the bands/artists who are credited with creating the entire
album or collection containing the media described by the current instance.

**`see`** albumArtists

**`remarks`** This is used to provide more control over how the media is sorted. Typical uses are to
    skip articles or sort by last by last name. For example "Ben Folds" might be sorted as
    "Folds, Ben".
    As this value is to be used as a sorting key, it should be used with less variation than
    [performers](Id3v1Tag.md#performers). Where [performers](Id3v1Tag.md#performers) can be broken into multiple performers, it is
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

#### Inherited from

Tag.albumArtistsSort

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

#### Inherited from

Tag.albumSort

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

#### Inherited from

Tag.albumSort

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

#### Inherited from

Tag.amazonId

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

#### Inherited from

Tag.amazonId

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

#### Inherited from

Tag.beatsPerMinute

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

#### Inherited from

Tag.beatsPerMinute

___

### comment

• `get` **comment**(): `string`

**`inheritdoc`**

#### Returns

`string`

#### Overrides

Tag.comment

• `set` **comment**(`value`): `void`

**`inheritdoc`**

**`remarks`** When stored on disk, only the first 28 bytes of the latin-1 encoded value will
    be stored. This may result in lost data.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Overrides

Tag.comment

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

#### Inherited from

Tag.composers

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

#### Inherited from

Tag.composers

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

#### Inherited from

Tag.composersSort

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

#### Inherited from

Tag.composersSort

___

### conductor

• `get` **conductor**(): `string`

Gets the conductor or director of the media represented by the current instance.

**`remarks`** This field is most useful for organizing classical music and movies.

#### Returns

`string`

Conductor or director of the media represented by the current instance or
    `undefined` if no value present.

#### Inherited from

Tag.conductor

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

#### Inherited from

Tag.conductor

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

#### Inherited from

Tag.copyright

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

#### Inherited from

Tag.copyright

___

### dateTagged

• `get` **dateTagged**(): `Date`

Gets the date and time at which the tag has been written.

#### Returns

`Date`

Date/time at which the tag has been written, or `undefined` if no value is present

#### Inherited from

Tag.dateTagged

• `set` **dateTagged**(`value`): `void`

Sets the date and time at which the tag has been written.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `Date` | Date/time at which the tag has been written, or `undefined` if no value is     present |

#### Returns

`void`

Date/time at which the tag has been written, or `undefined` if no value is present

#### Inherited from

Tag.dateTagged

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

#### Inherited from

Tag.description

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

#### Inherited from

Tag.description

___

### disc

• `get` **disc**(): `number`

Gets the number of the disc containing the media represented by the current instance in the
boxed set. For a series, this represents the season number.

**`remarks`** This value should be the same as the number that appears on the disc. For example, if
    the disc is the first of three, the value should be `1`. It should be no more than
    [discCount](Id3v1Tag.md#disccount) if [discCount](Id3v1Tag.md#disccount) is non-zero.

#### Returns

`number`

Number of the disc or season of the media represented by the current instance in a
    boxed set.

#### Inherited from

Tag.disc

• `set` **disc**(`value`): `void`

Sets the number of the disc containing the media represented by the current instance in the
boxed set. For a series, this represents the season number.

**`remarks`** This value should be the same as the number that appears on the disc. For example, if
    the disc is the first of three, the value should be `1`. It should be no more than
    [discCount](Id3v1Tag.md#disccount) if [discCount](Id3v1Tag.md#disccount) is non-zero.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Number of the disc or season of the media represented by the current instance     in a boxed set. |

#### Returns

`void`

Number of the disc or season of the media represented by the current instance in a
    boxed set.

#### Inherited from

Tag.disc

___

### discCount

• `get` **discCount**(): `number`

Gets the number of discs or seasons in the boxed set containing the media represented by the
current instance.

**`remarks`** If non-zero, this should be at least equal to [disc](Id3v1Tag.md#disc). If [disc](Id3v1Tag.md#disc) is zero,
    this value should also be zero.

#### Returns

`number`

Number of discs or seasons in the boxed set containing the media represented by the
    current instance or `0` if not specified.

#### Inherited from

Tag.discCount

• `set` **discCount**(`value`): `void`

Sets the number of discs or seasons in the boxed set containing the media represented by the
current instance.

**`remarks`** If non-zero, this should be at least equal to [disc](Id3v1Tag.md#disc). If [disc](Id3v1Tag.md#disc) is zero,
    this value should also be zero.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Number of discs or seasons in the boxed set containing the media represented by     the current instance or `0` if not specified. |

#### Returns

`void`

Number of discs or seasons in the boxed set containing the media represented by the
    current instance or `0` if not specified.

#### Inherited from

Tag.discCount

___

### firstAlbumArtist

• `get` **firstAlbumArtist**(): `string`

Gets the first value contained in [albumArtists](Id3v1Tag.md#albumartists).

#### Returns

`string`

#### Inherited from

Tag.firstAlbumArtist

___

### firstAlbumArtistSort

• `get` **firstAlbumArtistSort**(): `string`

Gets the first value contained in [albumArtistsSort](Id3v1Tag.md#albumartistssort)

#### Returns

`string`

#### Inherited from

Tag.firstAlbumArtistSort

___

### firstComposer

• `get` **firstComposer**(): `string`

Gets the first value contained in [composers](Id3v1Tag.md#composers)

#### Returns

`string`

#### Inherited from

Tag.firstComposer

___

### firstComposerSort

• `get` **firstComposerSort**(): `string`

Gets the first value contained in [composersSort](Id3v1Tag.md#composerssort)

#### Returns

`string`

#### Inherited from

Tag.firstComposerSort

___

### firstGenre

• `get` **firstGenre**(): `string`

Gets the first value contained in [genres](Id3v1Tag.md#genres)

#### Returns

`string`

#### Inherited from

Tag.firstGenre

___

### firstPerformer

• `get` **firstPerformer**(): `string`

Gets the first value contained in [performers](Id3v1Tag.md#performers)

#### Returns

`string`

#### Inherited from

Tag.firstPerformer

___

### firstPerformerSort

• `get` **firstPerformerSort**(): `string`

Gets the first value contained in [performersSort](Id3v1Tag.md#performerssort)

#### Returns

`string`

#### Inherited from

Tag.firstPerformerSort

___

### genres

• `get` **genres**(): `string`[]

**`inheritdoc`**

#### Returns

`string`[]

#### Overrides

Tag.genres

• `set` **genres**(`value`): `void`

**`inheritdoc`**

**`remarks`** Only first genre will be stored and only if it is an exact match for a value in
    the list of audio genres. All other values will result in the property being cleared.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string`[] |

#### Returns

`void`

#### Overrides

Tag.genres

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

#### Inherited from

Tag.grouping

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

#### Inherited from

Tag.grouping

___

### initialKey

• `get` **initialKey**(): `string`

Gets the initial key of the track.

#### Returns

`string`

Initial key of the track or `undefined` if no value is set

#### Inherited from

Tag.initialKey

• `set` **initialKey**(`value`): `void`

Sets the initial key of the track.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Initial key of the track or `undefined` if no value is set |

#### Returns

`void`

Initial key of the track or `undefined` if no value is set

#### Inherited from

Tag.initialKey

___

### isCompilation

• `get` **isCompilation**(): `boolean`

Gets whether or not the album described by the current instance is a compilation.

#### Returns

`boolean`

#### Inherited from

Tag.isCompilation

• `set` **isCompilation**(`value`): `void`

Gets whether or not the album described by the current instance is a compilation.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `boolean` | Whether or not the album described by the current instance is a compilation |

#### Returns

`void`

#### Inherited from

Tag.isCompilation

___

### isEmpty

• `get` **isEmpty**(): `boolean`

Gets whether or not the current instance is empty.

**`remarks`** In the default implementation, this checks the values supported by [Tag](Tag.md), but it
    may be extended by child classes to support other values.

#### Returns

`boolean`

`true` if the current instance does not contain any values. `false` otherwise

#### Inherited from

Tag.isEmpty

___

### isrc

• `get` **isrc**(): `string`

Gets the ISRC (International Standard Recording Code) of the track.

#### Returns

`string`

the ISRC of the track or `undefined` if no value is set

#### Inherited from

Tag.isrc

• `set` **isrc**(`value`): `void`

Sets the ISRC (International Standard Recording Code) of the track.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | the ISRC of the track or `undefined` if no value is set |

#### Returns

`void`

the ISRC of the track or `undefined` if no value is set

#### Inherited from

Tag.isrc

___

### joinedAlbumArtists

• `get` **joinedAlbumArtists**(): `string`

Gets a semicolon and space separated string containing the values in [albumArtists](Id3v1Tag.md#albumartists)

#### Returns

`string`

#### Inherited from

Tag.joinedAlbumArtists

___

### joinedComposers

• `get` **joinedComposers**(): `string`

Gets a semicolon and space separated string containing the values in [composers](Id3v1Tag.md#composers)

#### Returns

`string`

#### Inherited from

Tag.joinedComposers

___

### joinedGenres

• `get` **joinedGenres**(): `string`

Gets a semicolon and space separated string containing the values in [genres](Id3v1Tag.md#genres)

#### Returns

`string`

#### Inherited from

Tag.joinedGenres

___

### joinedPerformers

• `get` **joinedPerformers**(): `string`

Gets a semicolon and space separated string containing the values in [performers](Id3v1Tag.md#performers)

#### Returns

`string`

#### Inherited from

Tag.joinedPerformers

___

### joinedPerformersSort

• `get` **joinedPerformersSort**(): `string`

Gets a semicolon and space separated string containing the values in [performersSort](Id3v1Tag.md#performerssort)

#### Returns

`string`

#### Inherited from

Tag.joinedPerformersSort

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

#### Inherited from

Tag.lyrics

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

#### Inherited from

Tag.lyrics

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

#### Inherited from

Tag.musicBrainzArtistId

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

#### Inherited from

Tag.musicBrainzArtistId

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

#### Inherited from

Tag.musicBrainzDiscId

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

#### Inherited from

Tag.musicBrainzDiscId

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

#### Inherited from

Tag.musicBrainzReleaseArtistId

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

#### Inherited from

Tag.musicBrainzReleaseArtistId

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

#### Inherited from

Tag.musicBrainzReleaseCountry

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

#### Inherited from

Tag.musicBrainzReleaseCountry

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

#### Inherited from

Tag.musicBrainzReleaseGroupId

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

#### Inherited from

Tag.musicBrainzReleaseGroupId

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

#### Inherited from

Tag.musicBrainzReleaseId

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

#### Inherited from

Tag.musicBrainzReleaseId

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

#### Inherited from

Tag.musicBrainzReleaseStatus

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

#### Inherited from

Tag.musicBrainzReleaseStatus

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

#### Inherited from

Tag.musicBrainzReleaseType

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

#### Inherited from

Tag.musicBrainzReleaseType

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

#### Inherited from

Tag.musicBrainzTrackId

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

#### Inherited from

Tag.musicBrainzTrackId

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

#### Inherited from

Tag.musicIpId

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

#### Inherited from

Tag.musicIpId

___

### performers

• `get` **performers**(): `string`[]

**`inheritdoc`**

#### Returns

`string`[]

#### Overrides

Tag.performers

• `set` **performers**(`value`): `void`

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

#### Overrides

Tag.performers

___

### performersRole

• `get` **performersRole**(): `string`[]

Gets the characters portrayed by an actor for a video or instruments played by a musician
for music. This must match the [performers](Id3v1Tag.md#performers) array (for each person, correspond one/more
role). Several roles for the same artist/actor can be separated with semicolons. For
example: "Bass; Backing Vocals; Vibraphone".

**`remarks`** It is highly important to match each role to the performers. This means that an entry
    in the [performersRole](Id3v1Tag.md#performersrole) array is `undefined` to maintain the relationship between
    `performers[i]` and `performersRole[i]`.

#### Returns

`string`[]

Array containing the roles played by the performers in the media described by the
    current instance, or an empty array if no value is present.

#### Inherited from

Tag.performersRole

• `set` **performersRole**(`value`): `void`

Sets the characters portrayed by an actor for a video or instruments played by a musician
for music. This must match the [performers](Id3v1Tag.md#performers) array (for each person, correspond one/more
role). Several roles for the same artist/actor can be separated with semicolons. For
example: "Bass; Backing Vocals; Vibraphone".

**`remarks`** It is highly important to match each role to the performers. This means that an entry
    in the [performersRole](Id3v1Tag.md#performersrole) array is `undefined` to maintain the relationship between
    `performers[i]` and `performersRole[i]`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string`[] | Array containing the roles played by the performers in the media described by     the current instance, or an empty array if no value is present. |

#### Returns

`void`

Array containing the roles played by the performers in the media described by the
    current instance, or an empty array if no value is present.

#### Inherited from

Tag.performersRole

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

#### Inherited from

Tag.performersSort

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

#### Inherited from

Tag.performersSort

___

### pictures

• `get` **pictures**(): [`IPicture`](../interfaces/IPicture.md)[]

Gets a collection of pictures associated with the media represented by the current instance.

**`remarks`** Typically, this value is used to store an album cover or icon to use for the file, but
    it is capable of holding any type of image or file, including pictures of the band, the
    recording studio, the concert, etc.

#### Returns

[`IPicture`](../interfaces/IPicture.md)[]

Array containing a collection of pictures associated with the media represented by
    the current instance or an empty array if no pictures are present.

#### Inherited from

Tag.pictures

• `set` **pictures**(`value`): `void`

Sets a collection of pictures associated with the media represented by the current instance.

**`remarks`** Typically, this value is used to store an album cover or icon to use for the file, but
    it is capable of holding any type of image or file, including pictures of the band, the
    recording studio, the concert, etc.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`IPicture`](../interfaces/IPicture.md)[] | Array containing a collection of pictures associated with the media represented by     the current instance or an empty array if no pictures are present. |

#### Returns

`void`

Array containing a collection of pictures associated with the media represented by
    the current instance or an empty array if no pictures are present.

#### Inherited from

Tag.pictures

___

### publisher

• `get` **publisher**(): `string`

Gets the publisher of the track.

#### Returns

`string`

Publisher of the track or `undefined` if no value is set

#### Inherited from

Tag.publisher

• `set` **publisher**(`value`): `void`

Sets the publisher of the track.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Publisher of the track or `undefined` if no value is set |

#### Returns

`void`

Publisher of the track or `undefined` if no value is set

#### Inherited from

Tag.publisher

___

### remixedBy

• `get` **remixedBy**(): `string`

Gets the remixer of the track.

#### Returns

`string`

Remixer of the track or `undefined` if no value is set

#### Inherited from

Tag.remixedBy

• `set` **remixedBy**(`value`): `void`

Sets the remixer of the track.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Remixer of the track or `undefined` if no value is set |

#### Returns

`void`

Remixer of the track or `undefined` if no value is set

#### Inherited from

Tag.remixedBy

___

### replayGainAlbumGain

• `get` **replayGainAlbumGain**(): `number`

Gets the ReplayGain album gain in dB.

#### Returns

`number`

Album gain as per the ReplayGain specifications, in dB, or `NaN` if no value is set

#### Inherited from

Tag.replayGainAlbumGain

• `set` **replayGainAlbumGain**(`value`): `void`

Sets the ReplayGain album gain in dB.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Album gain as per the ReplayGain specifications, in dB, or `NaN` if no value is     set |

#### Returns

`void`

Album gain as per the ReplayGain specifications, in dB, or `NaN` if no value is set

#### Inherited from

Tag.replayGainAlbumGain

___

### replayGainAlbumPeak

• `get` **replayGainAlbumPeak**(): `number`

Gets the ReplayGain album peak sample.

#### Returns

`number`

Album peak as per the ReplayGain specifications, or `NaN` if no value is set

#### Inherited from

Tag.replayGainAlbumPeak

• `set` **replayGainAlbumPeak**(`value`): `void`

Sets the ReplayGain album peak sample.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Album peak as per the ReplayGain specifications, or `NaN` if no value is set |

#### Returns

`void`

Album peak as per the ReplayGain specifications, or `NaN` if no value is set

#### Inherited from

Tag.replayGainAlbumPeak

___

### replayGainTrackGain

• `get` **replayGainTrackGain**(): `number`

Gets the ReplayGain track gain in dB.

#### Returns

`number`

Track gain as per ReplayGain specifications, in dB, or `NaN` if no value is set

#### Inherited from

Tag.replayGainTrackGain

• `set` **replayGainTrackGain**(`value`): `void`

Sets the ReplayGain track gain in dB.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Track gain as per ReplayGain specifications, in dB, or `NaN` if no value is set |

#### Returns

`void`

Track gain as per ReplayGain specifications, in dB, or `NaN` if no value is set

#### Inherited from

Tag.replayGainTrackGain

___

### replayGainTrackPeak

• `get` **replayGainTrackPeak**(): `number`

Gets the ReplayGain track peak sample.

#### Returns

`number`

Track peak as per the ReplayGain specifications, or `NaN` if no value is set

#### Inherited from

Tag.replayGainTrackPeak

• `set` **replayGainTrackPeak**(`value`): `void`

Sets the ReplayGain track peak sample.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Track peak as per the ReplayGain specifications, or `NaN` if no value is set |

#### Returns

`void`

Track peak as per the ReplayGain specifications, or `NaN` if no value is set

#### Inherited from

Tag.replayGainTrackPeak

___

### sizeOnDisk

• `get` **sizeOnDisk**(): `number`

**`inheritdoc`**

#### Returns

`number`

#### Overrides

Tag.sizeOnDisk

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

#### Inherited from

Tag.subtitle

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

#### Inherited from

Tag.subtitle

___

### tagTypes

• `get` **tagTypes**(): [`TagTypes`](../enums/TagTypes.md)

Gets the tag types contained in the current instance. A bit wise combined [TagTypes](../enums/TagTypes.md)
containing the tag types contained in the current instance.

**`inheritdoc`**

#### Returns

[`TagTypes`](../enums/TagTypes.md)

#### Overrides

Tag.tagTypes

___

### title

• `get` **title**(): `string`

**`inheritdoc`**

#### Returns

`string`

#### Overrides

Tag.title

• `set` **title**(`value`): `void`

**`inheritdoc`**

**`remarks`** When stored on disk, only the first 30 bytes of the latin-1 encoded value will
    be stored. This may result in lost data.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Overrides

Tag.title

___

### titleSort

• `get` **titleSort**(): `string`

Gets the sortable name for the title of the media described by the current instance.

**`remarks`** Possibly used to sort compilations or episodic content.

#### Returns

`string`

Sortable name of the media described by the current instance or `undefined` if no
    value is present

#### Inherited from

Tag.titleSort

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

#### Inherited from

Tag.titleSort

___

### track

• `get` **track**(): `number`

**`inheritdoc`**

#### Returns

`number`

#### Overrides

Tag.track

• `set` **track**(`value`): `void`

**`inheritdoc`**

**`remarks`** Only values betweenInclusive 1 and 255 will be stored. All other values will result in
    the property being zeroed.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Overrides

Tag.track

___

### trackCount

• `get` **trackCount**(): `number`

Gets the number of tracks in the album or the number of episodes in a series of the media
represented by the current instance.

**`remarks`** If non-zero, this value should be equal to or greater than [track](Id3v1Tag.md#track). If
    [track](Id3v1Tag.md#track) is `0`, this value should also be `0`.

#### Returns

`number`

Number of tracks in the album or number of episodes in a series of the media
    represented by the current instance or `0` if not specified.

#### Inherited from

Tag.trackCount

• `set` **trackCount**(`value`): `void`

Sets the number of tracks in the album or the number of episodes in a series of the media
represented by the current instance.

**`remarks`** If non-zero, this value should be equal to or greater than [track](Id3v1Tag.md#track). If
    [track](Id3v1Tag.md#track) is `0`, this value should also be `0`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Number of tracks in the album or number of episodes in a series of the media     represented by the current instance or `0` if not specified. |

#### Returns

`void`

Number of tracks in the album or number of episodes in a series of the media
    represented by the current instance or `0` if not specified.

#### Inherited from

Tag.trackCount

___

### year

• `get` **year**(): `number`

**`inheritdoc`**

#### Returns

`number`

#### Overrides

Tag.year

• `set` **year**(`value`): `void`

**`inheritdoc`**

**`remarks`** Only values betweenInclusive 1 and 9999 will be stored. All other values will result in
    the property being zeroed.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Overrides

Tag.year

## Methods

### clear

▸ **clear**(): `void`

Clears all values stored in the current instance.

**`remarks`** The clearing procedure is format specific and should clear all values.

#### Returns

`void`

#### Overrides

[Tag](Tag.md).[clear](Tag.md#clear)

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

[Tag](Tag.md).[copyTo](Tag.md#copyto)

___

### render

▸ **render**(): [`ByteVector`](ByteVector.md)

Renders the current instance as a raw ID3v1 tag.

#### Returns

[`ByteVector`](ByteVector.md)

___

### setInfoTag

▸ **setInfoTag**(): `void`

Set the tags that represent the tagger software (node-taglib-sharp) itself.

**`remarks`** This is typically a method to call just before saving a tag.

#### Returns

`void`

#### Inherited from

[Tag](Tag.md).[setInfoTag](Tag.md#setinfotag)

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

▸ `Static` **fromData**(`data`): [`Id3v1Tag`](Id3v1Tag.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`ByteVector`](ByteVector.md) |

#### Returns

[`Id3v1Tag`](Id3v1Tag.md)

___

### fromEmpty

▸ `Static` **fromEmpty**(): [`Id3v1Tag`](Id3v1Tag.md)

Constructs and initializes a new instance of [Id3v1Tag](Id3v1Tag.md) with no contents.

#### Returns

[`Id3v1Tag`](Id3v1Tag.md)

___

### fromFile

▸ `Static` **fromFile**(`file`, `position`): [`Id3v1Tag`](Id3v1Tag.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | [`File`](File.md) |
| `position` | `number` |

#### Returns

[`Id3v1Tag`](Id3v1Tag.md)

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

#### Parameters

| Name | Type |
| :------ | :------ |
| `tagTypes` | [`TagTypes`](../enums/TagTypes.md) |

#### Returns

[`TagTypes`](../enums/TagTypes.md)[]

#### Inherited from

[Tag](Tag.md).[tagTypeFlagsToArray](Tag.md#tagtypeflagstoarray)
