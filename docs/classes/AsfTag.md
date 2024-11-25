[node-taglib-sharp](../README.md) / [Exports](../modules.md) / AsfTag

# Class: AsfTag

This class extends [Tag](Tag.md) to provide a representation of an ASF tag which can be read from
and written to disk.

## Hierarchy

- [`Tag`](Tag.md)

  ↳ **`AsfTag`**

## Table of contents

### Accessors

- [album](AsfTag.md#album)
- [albumArtists](AsfTag.md#albumartists)
- [albumArtistsSort](AsfTag.md#albumartistssort)
- [albumSort](AsfTag.md#albumsort)
- [amazonId](AsfTag.md#amazonid)
- [beatsPerMinute](AsfTag.md#beatsperminute)
- [comment](AsfTag.md#comment)
- [composers](AsfTag.md#composers)
- [composersSort](AsfTag.md#composerssort)
- [conductor](AsfTag.md#conductor)
- [contentDescriptionObject](AsfTag.md#contentdescriptionobject)
- [copyright](AsfTag.md#copyright)
- [dateTagged](AsfTag.md#datetagged)
- [description](AsfTag.md#description)
- [disc](AsfTag.md#disc)
- [discCount](AsfTag.md#disccount)
- [extendedContentDescriptionObject](AsfTag.md#extendedcontentdescriptionobject)
- [firstAlbumArtist](AsfTag.md#firstalbumartist)
- [firstAlbumArtistSort](AsfTag.md#firstalbumartistsort)
- [firstComposer](AsfTag.md#firstcomposer)
- [firstComposerSort](AsfTag.md#firstcomposersort)
- [firstGenre](AsfTag.md#firstgenre)
- [firstPerformer](AsfTag.md#firstperformer)
- [firstPerformerSort](AsfTag.md#firstperformersort)
- [genres](AsfTag.md#genres)
- [grouping](AsfTag.md#grouping)
- [initialKey](AsfTag.md#initialkey)
- [isCompilation](AsfTag.md#iscompilation)
- [isEmpty](AsfTag.md#isempty)
- [isrc](AsfTag.md#isrc)
- [joinedAlbumArtists](AsfTag.md#joinedalbumartists)
- [joinedComposers](AsfTag.md#joinedcomposers)
- [joinedGenres](AsfTag.md#joinedgenres)
- [joinedPerformers](AsfTag.md#joinedperformers)
- [joinedPerformersSort](AsfTag.md#joinedperformerssort)
- [lyrics](AsfTag.md#lyrics)
- [metadataLibraryObject](AsfTag.md#metadatalibraryobject)
- [musicBrainzAlbumArtistId](AsfTag.md#musicbrainzalbumartistid)
- [musicBrainzArtistId](AsfTag.md#musicbrainzartistid)
- [musicBrainzDiscId](AsfTag.md#musicbrainzdiscid)
- [musicBrainzReleaseArtistId](AsfTag.md#musicbrainzreleaseartistid)
- [musicBrainzReleaseCountry](AsfTag.md#musicbrainzreleasecountry)
- [musicBrainzReleaseGroupId](AsfTag.md#musicbrainzreleasegroupid)
- [musicBrainzReleaseId](AsfTag.md#musicbrainzreleaseid)
- [musicBrainzReleaseStatus](AsfTag.md#musicbrainzreleasestatus)
- [musicBrainzReleaseType](AsfTag.md#musicbrainzreleasetype)
- [musicBrainzTrackId](AsfTag.md#musicbrainztrackid)
- [musicIpId](AsfTag.md#musicipid)
- [performers](AsfTag.md#performers)
- [performersRole](AsfTag.md#performersrole)
- [performersSort](AsfTag.md#performerssort)
- [pictures](AsfTag.md#pictures)
- [publisher](AsfTag.md#publisher)
- [remixedBy](AsfTag.md#remixedby)
- [replayGainAlbumGain](AsfTag.md#replaygainalbumgain)
- [replayGainAlbumPeak](AsfTag.md#replaygainalbumpeak)
- [replayGainTrackGain](AsfTag.md#replaygaintrackgain)
- [replayGainTrackPeak](AsfTag.md#replaygaintrackpeak)
- [sizeOnDisk](AsfTag.md#sizeondisk)
- [subtitle](AsfTag.md#subtitle)
- [tagTypes](AsfTag.md#tagtypes)
- [title](AsfTag.md#title)
- [titleSort](AsfTag.md#titlesort)
- [track](AsfTag.md#track)
- [trackCount](AsfTag.md#trackcount)
- [year](AsfTag.md#year)

### Methods

- [addDescriptor](AsfTag.md#adddescriptor)
- [clear](AsfTag.md#clear)
- [copyTo](AsfTag.md#copyto)
- [getDescriptorString](AsfTag.md#getdescriptorstring)
- [getDescriptorStrings](AsfTag.md#getdescriptorstrings)
- [getDescriptorUint](AsfTag.md#getdescriptoruint)
- [getDescriptors](AsfTag.md#getdescriptors)
- [removeDescriptors](AsfTag.md#removedescriptors)
- [setDescriptorString](AsfTag.md#setdescriptorstring)
- [setDescriptorStrings](AsfTag.md#setdescriptorstrings)
- [setDescriptors](AsfTag.md#setdescriptors)
- [firstInGroup](AsfTag.md#firstingroup)
- [fromEmpty](AsfTag.md#fromempty)
- [fromHeader](AsfTag.md#fromheader)
- [isFalsyOrLikeEmpty](AsfTag.md#isfalsyorlikeempty)
- [joinGroup](AsfTag.md#joingroup)
- [tagTypeFlagsToArray](AsfTag.md#tagtypeflagstoarray)

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

Stored in the `WM/AlbumTitle` or `Album` descriptors
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-albumtitle

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

Stored in the `WM/AlbumTitle` or `Album` descriptors
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-albumtitle

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
than [performers](AsfTag.md#performers). Where performers can be broken into multiple artists, it is
best to stick to a single name. Eg, "Super8 & Tab"

**`Remarks`**

Stored in the `WM/AlbumArtist` or `AlbumArtist` descriptors

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
than [performers](AsfTag.md#performers). Where performers can be broken into multiple artists, it is
best to stick to a single name. Eg, "Super8 & Tab"

**`Remarks`**

Stored in the `WM/AlbumArtist` or `AlbumArtist` descriptors

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
[albumArtists](AsfTag.md#albumartists)

This is used to provide more control over how the media is sorted. Typical uses are to
skip articles or sort by last name. For example "Ben Folds" might be sorted as
"Folds, Ben".
As this value is to be used as a sorting key, it should be used with less variation than
[performers](AsfTag.md#performers). Where [performers](AsfTag.md#performers) can be broken into multiple performers, it is
best to stick to a single album artist. Eg, "Van Buuren, Armin"

**`Remarks`**

Stored in the `WM/AlbumArtistSortOrder` descriptor
    http://msdn.microsoft.com/en-us/library/aa386866(VS.85).aspx

#### Returns

`string`[]

#### Overrides

Tag.albumArtistsSort

• `set` **albumArtistsSort**(`value`): `void`

Sets the sortable names of the bands/artists who are credited with creating the entire
album or collection containing the media described by the current instance. See also:
[albumArtists](AsfTag.md#albumartists)

This is used to provide more control over how the media is sorted. Typical uses are to
skip articles or sort by last name. For example "Ben Folds" might be sorted as
"Folds, Ben".
As this value is to be used as a sorting key, it should be used with less variation than
[performers](AsfTag.md#performers). Where [performers](AsfTag.md#performers) can be broken into multiple performers, it is
best to stick to a single album artist. Eg, "Van Buuren, Armin"

**`Remarks`**

Stored in the `WM/AlbumArtistSortOrder` descriptor
    http://msdn.microsoft.com/en-us/library/aa386866(VS.85).aspx

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
See also: [album](AsfTag.md#album)

This field is typically optional but aids in sort of compilations or albums with
similar titles.

**`Remarks`**

Stored in the `WM/AlbumSortOrder` descriptors

#### Returns

`string`

#### Overrides

Tag.albumSort

• `set` **albumSort**(`value`): `void`

Sets the sortable name of the album title of the media represented by the current instance.
See also: [album](AsfTag.md#album)

This field is typically optional but aids in sort of compilations or albums with
similar titles.

**`Remarks`**

Stored in the `WM/AlbumSortOrder` descriptors

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

#### Returns

`string`

Amazon ID of the media represented by the current instance or `undefined` if no
    value is present

#### Inherited from

Tag.amazonId

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

Tag.amazonId

___

### beatsPerMinute

• `get` **beatsPerMinute**(): `number`

Gets the number of beats per minute in the audio of the media represented by the current
instance.

This field is useful for DJ's who are trying to beat match tracks. It should be
calculated from the audio or pulled from a database.

**`Remarks`**

Stored in the `WM/BeatsPerMinute` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-beatsperminute

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

Stored in the `WM/BeatsPerMinute` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-beatsperminute

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

Stored in the `WM/Text` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-text
    It should be noted that many applications store comments in the field read by
    [description](AsfTag.md#description).

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

Stored in the `WM/Text` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-text
    It should be noted that many applications store comments in the field read by
    [description](AsfTag.md#description).

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

Stored in the `WM/Composer` or `Composer` descriptors
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-composer

#### Returns

`string`[]

#### Overrides

Tag.composers

• `set` **composers**(`value`): `void`

Sets the composers of the media represented by the current instance.

This field represents the composers, songwriters, scriptwriters, or persons who
claim authorship of the media.

**`Remarks`**

Stored in the `WM/Composer` or `Composer` descriptors
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-composer

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
See also: [composers](AsfTag.md#composers)

This field is typically optional but aids in the sorting of compilations or albums
with multiple composers.

#### Returns

`string`[]

Sortable names for the composers of the media represented by the current instance
    or an empty array if no value is present.

#### Inherited from

Tag.composersSort

• `set` **composersSort**(`value`): `void`

Sets the sortable names of the composers of the media represented by the current instance.
See also: [composers](AsfTag.md#composers)

This field is typically optional but aids in the sorting of compilations or albums
with multiple composers.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string`[] | Sortable names for the composers of the media represented by the current instance or an empty array if no value is present. |

#### Returns

`void`

#### Inherited from

Tag.composersSort

___

### conductor

• `get` **conductor**(): `string`

Gets the conductor or director of the media represented by the current instance.

This field is most useful for organizing classical music and movies.

**`Remarks`**

Stored in the `WM/Conductor` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-conductor

#### Returns

`string`

#### Overrides

Tag.conductor

• `set` **conductor**(`value`): `void`

Sets the conductor or director of the media represented by the current instance.

This field is most useful for organizing classical music and movies.

**`Remarks`**

Stored in the `WM/Conductor` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-conductor

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Conductor or director of the media represented by the current instance or `undefined` if no value present. |

#### Returns

`void`

#### Overrides

Tag.conductor

___

### contentDescriptionObject

• `get` **contentDescriptionObject**(): [`AsfContentDescriptionObject`](AsfContentDescriptionObject.md)

Gets the ASF content description object used by the current instance.

#### Returns

[`AsfContentDescriptionObject`](AsfContentDescriptionObject.md)

___

### copyright

• `get` **copyright**(): `string`

Gets the copyright information for the media represented by the current instance.

This field should be used for storing copyright information. It may be useful to show
this information somewhere in the program while the media is playing.
Players should not support editing this field, but media creation tools should
definitely allow modification.

**`Remarks`**

Stored in the ContentDescriptionObject.copyright

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

Stored in the ContentDescriptionObject.copyright

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
| `value` | `Date` | Date/time at which the tag has been written, or `undefined` if no value is present |

#### Returns

`void`

#### Inherited from

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

Stored in the ContentDescriptionObject.description
    Some applications will use this field for storing comments.

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

Stored in the ContentDescriptionObject.description
    Some applications will use this field for storing comments.

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
[discCount](AsfTag.md#disccount) if [discCount](AsfTag.md#disccount) is non-zero.

**`Remarks`**

Stored in the `WM/PartOfSet` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-partofset

#### Returns

`number`

#### Overrides

Tag.disc

• `set` **disc**(`value`): `void`

Sets the number of the disc containing the media represented by the current instance in the
boxed set. For a series, this represents the season number.

This value should be the same as the number that appears on the disc. For example, if
the disc is the first of three, the value should be `1`. It should be no more than
[discCount](AsfTag.md#disccount) if [discCount](AsfTag.md#disccount) is non-zero.

**`Remarks`**

Stored in the `WM/PartOfSet` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-partofset

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

If non-zero, this should be at least equal to [disc](AsfTag.md#disc). If [disc](AsfTag.md#disc) is zero,
this value should also be zero.

**`Remarks`**

Stored in the `WM/PartOfSet` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-partofset

#### Returns

`number`

#### Overrides

Tag.discCount

• `set` **discCount**(`value`): `void`

Sets the number of discs or seasons in the boxed set containing the media represented by the
current instance.

If non-zero, this should be at least equal to [disc](AsfTag.md#disc). If [disc](AsfTag.md#disc) is zero,
this value should also be zero.

**`Remarks`**

Stored in the `WM/PartOfSet` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-partofset

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Number of discs or seasons in the boxed set containing the media represented by the current instance or `0` if not specified. |

#### Returns

`void`

#### Overrides

Tag.discCount

___

### extendedContentDescriptionObject

• `get` **extendedContentDescriptionObject**(): [`AsfExtendedContentDescriptionObject`](AsfExtendedContentDescriptionObject.md)

Gets the ASF extended content description used by the current instance.

#### Returns

[`AsfExtendedContentDescriptionObject`](AsfExtendedContentDescriptionObject.md)

___

### firstAlbumArtist

• `get` **firstAlbumArtist**(): `string`

Gets the first value contained in [albumArtists](AsfTag.md#albumartists).

#### Returns

`string`

#### Inherited from

Tag.firstAlbumArtist

___

### firstAlbumArtistSort

• `get` **firstAlbumArtistSort**(): `string`

Gets the first value contained in [albumArtistsSort](AsfTag.md#albumartistssort)

#### Returns

`string`

#### Inherited from

Tag.firstAlbumArtistSort

___

### firstComposer

• `get` **firstComposer**(): `string`

Gets the first value contained in [composers](AsfTag.md#composers)

#### Returns

`string`

#### Inherited from

Tag.firstComposer

___

### firstComposerSort

• `get` **firstComposerSort**(): `string`

Gets the first value contained in [composersSort](AsfTag.md#composerssort)

#### Returns

`string`

#### Inherited from

Tag.firstComposerSort

___

### firstGenre

• `get` **firstGenre**(): `string`

Gets the first value contained in [genres](AsfTag.md#genres)

#### Returns

`string`

#### Inherited from

Tag.firstGenre

___

### firstPerformer

• `get` **firstPerformer**(): `string`

Gets the first value contained in [performers](AsfTag.md#performers)

#### Returns

`string`

#### Inherited from

Tag.firstPerformer

___

### firstPerformerSort

• `get` **firstPerformerSort**(): `string`

Gets the first value contained in [performersSort](AsfTag.md#performerssort)

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

**`Remarks`**

Stored in the `WM/Genre`, `WM/GenreID`, or `Genre` descriptors
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-genre
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-genreid

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

Stored in the `WM/Genre`, `WM/GenreID`, or `Genre` descriptors
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-genre
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-genreid

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

Stored in the `WM/ContentGroupDescription` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-contentgroupdescription

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

Stored in the `WM/ContentGroupDescription` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-contentgroupdescription

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

#### Inherited from

Tag.initialKey

___

### isCompilation

• `get` **isCompilation**(): `boolean`

Gets whether the album described by the current instance is a compilation.

#### Returns

`boolean`

#### Inherited from

Tag.isCompilation

• `set` **isCompilation**(`value`): `void`

Gets whether the album described by the current instance is a compilation.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `boolean` | Whether the album described by the current instance is a compilation |

#### Returns

`void`

#### Inherited from

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

ISRC of the track or `undefined` if no value is set

#### Inherited from

Tag.isrc

• `set` **isrc**(`value`): `void`

Sets the ISRC (International Standard Recording Code) of the track.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | ISRC of the track or `undefined` if no value is set |

#### Returns

`void`

#### Inherited from

Tag.isrc

___

### joinedAlbumArtists

• `get` **joinedAlbumArtists**(): `string`

Gets a semicolon and space separated string containing the values in [albumArtists](AsfTag.md#albumartists)

#### Returns

`string`

#### Inherited from

Tag.joinedAlbumArtists

___

### joinedComposers

• `get` **joinedComposers**(): `string`

Gets a semicolon and space separated string containing the values in [composers](AsfTag.md#composers)

#### Returns

`string`

#### Inherited from

Tag.joinedComposers

___

### joinedGenres

• `get` **joinedGenres**(): `string`

Gets a semicolon and space separated string containing the values in [genres](AsfTag.md#genres)

#### Returns

`string`

#### Inherited from

Tag.joinedGenres

___

### joinedPerformers

• `get` **joinedPerformers**(): `string`

Gets a semicolon and space separated string containing the values in [performers](AsfTag.md#performers)

#### Returns

`string`

#### Inherited from

Tag.joinedPerformers

___

### joinedPerformersSort

• `get` **joinedPerformersSort**(): `string`

Gets a semicolon and space separated string containing the values in [performersSort](AsfTag.md#performerssort)

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

Stored in the `WM/Lyrics` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-lyrics

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

Stored in the `WM/Lyrics` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-lyrics

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Lyrics or script of the media represented by the current instance or `undefined` if no value is present |

#### Returns

`void`

#### Overrides

Tag.lyrics

___

### metadataLibraryObject

• `get` **metadataLibraryObject**(): [`AsfMetadataLibraryObject`](AsfMetadataLibraryObject.md)

Gets the ASF metadata library object used by the current instance.

#### Returns

[`AsfMetadataLibraryObject`](AsfMetadataLibraryObject.md)

___

### musicBrainzAlbumArtistId

• `get` **musicBrainzAlbumArtistId**(): `string`

**`Inherit Doc`**

**`Remarks`**

Stored in the `MusicBrainz/Album Artist Id` descriptor

#### Returns

`string`

• `set` **musicBrainzAlbumArtistId**(`value`): `void`

**`Inherit Doc`**

**`Remarks`**

Stored in the `MusicBrainz/Artist Id` descriptor

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

___

### musicBrainzArtistId

• `get` **musicBrainzArtistId**(): `string`

Gets the MusicBrainz artist ID of the media represented by the current instance.

This field represents the MusicBrainz ArtistID, and is used to uniquely identify a
particular artist of the track.

**`Remarks`**

Stored in the `MusicBrainz/Artist Id` descriptor

#### Returns

`string`

#### Overrides

Tag.musicBrainzArtistId

• `set` **musicBrainzArtistId**(`value`): `void`

Sets the MusicBrainz artist ID of the media represented by the current instance.

This field represents the MusicBrainz ArtistID, and is used to uniquely identify a
particular artist of the track.

**`Remarks`**

Stored in the `MusicBrainz/Artist Id` descriptor

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

Stored in the `MusicBrainz/Disc Id` descriptor

#### Returns

`string`

#### Overrides

Tag.musicBrainzDiscId

• `set` **musicBrainzDiscId**(`value`): `void`

Sets the MusicBrainz disc ID of the media represented by the current instance.

This field represents the MusicBrainz DiscID and is used to uniquely identify the
particular released media associated with this track.

**`Remarks`**

Stored in the `MusicBrainz/Disc Id` descriptor

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

#### Returns

`string`

MusicBrainz ReleaseArtistID of the media represented by the current instance or
    `undefined` if no value is present

#### Inherited from

Tag.musicBrainzReleaseArtistId

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

Stored in the `MusicBrainz/Album Release Country` descriptor

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

Stored in the `MusicBrainz/Album Release Country` descriptor

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

Stored in the `MusicBrainz/Release Group Id` descriptor

#### Returns

`string`

#### Overrides

Tag.musicBrainzReleaseGroupId

• `set` **musicBrainzReleaseGroupId**(`value`): `void`

Sets the MusicBrainz release group ID of the media represented by the current instance.

This field represents the MusicBrainz ReleaseGroupID and is used to uniquely identify
a particular release group to which this track belongs.

**`Remarks`**

Stored in the `MusicBrainz/Release Group Id` descriptor

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

Stored in the `MusicBrainz/Album Id` descriptor

#### Returns

`string`

#### Overrides

Tag.musicBrainzReleaseId

• `set` **musicBrainzReleaseId**(`value`): `void`

Sets the MusicBrainz release ID of the media represented by the current instance.

This field represents the MusicBrains ReleaseID and is used to uniquely identify a
particular release to which this track belongs.

**`Remarks`**

Stored in the `MusicBrainz/Album Id` descriptor

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

Stored in the `MusicBrainz/Album Status` descriptor

#### Returns

`string`

#### Overrides

Tag.musicBrainzReleaseStatus

• `set` **musicBrainzReleaseStatus**(`value`): `void`

Sets the MusicBrainz release status of the media represented by the current instance.

This field represents the MusicBrainz ReleaseStatus used to describe how 'official' a
release is. Common statuses are: `Official`, `Promotion`, `Bootleg`, `Pseudo-release`.

**`Remarks`**

Stored in the `MusicBrainz/Album Status` descriptor

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

Stored in the `MusicBrainz/Album Type` descriptor

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

Stored in the `MusicBrainz/Album Type` descriptor

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

Stored in the `MusicBrainz/Track Id` descriptor

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

Stored in the `MusicBrainz/Track Id` descriptor

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

Stored in the `MusicIP/PUID` descriptor

#### Returns

`string`

#### Overrides

Tag.musicIpId

• `set` **musicIpId**(`value`): `void`

Sets the MusicIP PUID of the media represented by the current instance.

This field represents the MusicIP PUID, an acoustic fingerprint identifier. It
identifies wht this track "sounds like".

**`Remarks`**

Stored in the `MusicIP/PUID` descriptor

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

Stored in the ContentDescriptionObject.author

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

Stored in the ContentDescriptionObject.author

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
for music. This must match the [performers](AsfTag.md#performers) array (for each person, correspond one/more
role). Several roles for the same artist/actor can be separated with semicolons. For
example: "Bass; Backing Vocals; Vibraphone".

It is highly important to match each role to the performers. This means that an entry
in the [performersRole](AsfTag.md#performersrole) array is `undefined` to maintain the relationship between
`performers[i]` and `performersRole[i]`.

#### Returns

`string`[]

Array containing the roles played by the performers in the media described by the
    current instance, or an empty array if no value is present.

#### Inherited from

Tag.performersRole

• `set` **performersRole**(`value`): `void`

Sets the characters portrayed by an actor for a video or instruments played by a musician
for music. This must match the [performers](AsfTag.md#performers) array (for each person, correspond one/more
role). Several roles for the same artist/actor can be separated with semicolons. For
example: "Bass; Backing Vocals; Vibraphone".

It is highly important to match each role to the performers. This means that an entry
in the [performersRole](AsfTag.md#performersrole) array is `undefined` to maintain the relationship between
`performers[i]` and `performersRole[i]`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string`[] | Array containing the roles played by the performers in the media described by the current instance, or an empty array if no value is present. |

#### Returns

`void`

#### Inherited from

Tag.performersRole

___

### performersSort

• `get` **performersSort**(): `string`[]

Gets the sortable names of the performers or artists who performed in the media described by
the current instance.

This is used to provide more control over how the media is sorted. Typical uses are to
skip articles or sort by last name. For example, "The Pillows" might be sorted as
"Pillows, The". See also: [performers](AsfTag.md#performers)

**`Remarks`**

Stored in the `WM/ArtistSortOrder` descriptor
    http://msdn.microsoft.com/en-us/library/aa386866(VS.85).aspx

#### Returns

`string`[]

#### Overrides

Tag.performersSort

• `set` **performersSort**(`value`): `void`

Gets the sortable names of the performers or artists who performed in the media described by
the current instance.

This is used to provide more control over how the media is sorted. Typical uses are to
skip articles or sort by last name. For example, "The Pillows" might be sorted as
"Pillows, The". See also: [performers](AsfTag.md#performers)

**`Remarks`**

Stored in the `WM/ArtistSortOrder` descriptor
    http://msdn.microsoft.com/en-us/library/aa386866(VS.85).aspx

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

Stored in the `WM/Picture` content descriptor and description record.
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wmpicture
    Modifications to the returned array will not be stored.

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

Stored in the `WM/Picture` content descriptor and description record.
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wmpicture

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

#### Inherited from

Tag.remixedBy

___

### replayGainAlbumGain

• `get` **replayGainAlbumGain**(): `number`

Gets the ReplayGain album gain in dB.

**`Remarks`**

Stored in the `ReplayGain/Album` descriptor

#### Returns

`number`

#### Overrides

Tag.replayGainAlbumGain

• `set` **replayGainAlbumGain**(`value`): `void`

Sets the ReplayGain album gain in dB.

**`Remarks`**

Stored in the `ReplayGain/Album` descriptor

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

Stored in the `ReplayGain/Album Peak` descriptor

#### Returns

`number`

#### Overrides

Tag.replayGainAlbumPeak

• `set` **replayGainAlbumPeak**(`value`): `void`

Sets the ReplayGain album peak sample.

**`Remarks`**

Stored in the `ReplayGain/Album Peak` descriptor

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

Stored in the `ReplayGain/Track` descriptor

#### Returns

`number`

#### Overrides

Tag.replayGainTrackGain

• `set` **replayGainTrackGain**(`value`): `void`

Sets the ReplayGain track gain in dB.

**`Remarks`**

Stored in the `ReplayGain/Track` descriptor

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

Stored in the `ReplayGain/Track Peak` descriptor

#### Returns

`number`

#### Overrides

Tag.replayGainTrackPeak

• `set` **replayGainTrackPeak**(`value`): `void`

Sets the ReplayGain track peak sample.

**`Remarks`**

Stored in the `ReplayGain/Track Peak` descriptor

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

Stored in the `WM/SubTitle` descriptor
    https://msdn.microsoft.com/en-us/library/windows/desktop/dd757997(v=vs.85).aspx

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

Stored in the `WM/SubTitle` descriptor
    https://msdn.microsoft.com/en-us/library/windows/desktop/dd757997(v=vs.85).aspx

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

Stored in the content description object

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

Stored in the content description object

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

Stored in the `WM/TitleSortOrder`
    http://msdn.microsoft.com/en-us/library/aa386866(VS.85).aspx

#### Returns

`string`

#### Overrides

Tag.titleSort

• `set` **titleSort**(`value`): `void`

Sets the sortable name for the title of the media described by the current instance.

Possibly used to sort compilations or episodic content.

**`Remarks`**

Stored in the `WM/TitleSortOrder`
    http://msdn.microsoft.com/en-us/library/aa386866(VS.85).aspx

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
[trackCount](AsfTag.md#trackcount), if [trackCount](AsfTag.md#trackcount) is non-zero.
Most tagging formats store this as a string. To help sorting, a two-digit zero-padded
value is used in the resulting tag.
For a series, this property represents the episodes in a season of the series.

**`Remarks`**

Stored in the `WM/TrackNumber` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-tracknumber

#### Returns

`number`

#### Overrides

Tag.track

• `set` **track**(`value`): `void`

Sets the position of the media represented by the current instance in its containing album
or season (for a series).

This value should be the same as is listed on the album cover and no more than
[trackCount](AsfTag.md#trackcount), if [trackCount](AsfTag.md#trackcount) is non-zero.
Most tagging formats store this as a string. To help sorting, a two-digit zero-padded
value is used in the resulting tag.
For a series, this property represents the episodes in a season of the series.

**`Remarks`**

Stored in the `WM/TrackNumber` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-tracknumber

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

If non-zero, this value should be equal to or greater than [track](AsfTag.md#track). If
[track](AsfTag.md#track) is `0`, this value should also be `0`.

**`Remarks`**

Stored in the `TrackTotal` descriptor

#### Returns

`number`

#### Overrides

Tag.trackCount

• `set` **trackCount**(`value`): `void`

Sets the number of tracks on the album or the number of episodes in a series of the media
represented by the current instance.

If non-zero, this value should be equal to or greater than [track](AsfTag.md#track). If
[track](AsfTag.md#track) is `0`, this value should also be `0`.

**`Remarks`**

Stored in the `TrackTotal` descriptor

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Number of tracks on the album or number of episodes in a series of the media represented by the current instance or `0` if not specified. |

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

**`Remarks`**

Stored in the `WM/Year` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-year

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

Stored in the `WM/Year` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-year

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Year that the media represented by the current instance was created or `0` if no value is present. |

#### Returns

`void`

#### Overrides

Tag.year

## Methods

### addDescriptor

▸ **addDescriptor**(`descriptor`): `void`

Adds a descriptor to the current instance's extended content description object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `descriptor` | [`AsfContentDescriptor`](AsfContentDescriptor.md) | Content descriptor to add to the current instance. Must be truthy |

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

#### Inherited from

[Tag](Tag.md).[copyTo](Tag.md#copyto)

___

### getDescriptorString

▸ **getDescriptorString**(`...names`): `string`

Gets the string contained in a specific descriptor from the extended content description
object in the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...names` | `string`[] | Names of the descriptors to look for |

#### Returns

`string`

The contents of the first descriptor found whose name is in the provided
    collection of descriptor names

___

### getDescriptorStrings

▸ **getDescriptorStrings**(`...names`): `string`[]

Gets the strings contained in a specific descriptor from the extended content description
object in the current instance, as split by `;`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...names` | `string`[] | Names of the descriptors to look for |

#### Returns

`string`[]

The contents of the first descriptor found whose name is in the provided
    collection of descriptor names, split by `;`

___

### getDescriptorUint

▸ **getDescriptorUint**(`...names`): `number`

Gets the unsigned integer contained in a specific descriptor from the extended content
description object in the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...names` | `string`[] | Names of the descriptors to look for |

#### Returns

`number`

The contents of the first descriptor found whose name is in the provided
    collection of descriptor names

___

### getDescriptors

▸ **getDescriptors**(`...names`): [`AsfContentDescriptor`](AsfContentDescriptor.md)[]

Gets all descriptors in the extended description object with names matching any of the names
in the provided collection of names.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...names` | `string`[] | Collection of names to search the extended description object for |

#### Returns

[`AsfContentDescriptor`](AsfContentDescriptor.md)[]

___

### removeDescriptors

▸ **removeDescriptors**(`name`): `void`

Removes all descriptors with a specified name from the extended content description object
in the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Name of the descriptor to remove rom the current instance |

#### Returns

`void`

___

### setDescriptorString

▸ **setDescriptorString**(`value`, `...names`): `void`

Sets the string for a collection of descriptors in the current instance.

**`Remarks`**

The value will be stored in the first value in `names` and the rest of the
    descriptors with the matching names will be cleared.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Value to store or `undefined` to clear the value |
| `...names` | `string`[] | Names in which the value would be expected. For example, `WM/AlbumTitle` and `Album` |

#### Returns

`void`

___

### setDescriptorStrings

▸ **setDescriptorStrings**(`value`, `...names`): `void`

Sets the strings for a collection of descriptors in the current instance. The strings will
be stored as a single string, joined together with `; `.

**`Remarks`**

The value will be stored in the first value in `names` and the rest of the
    descriptors with the matching names will be cleared.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string`[] | Value to store or `undefined` to clear the value |
| `...names` | `string`[] | Names in which the value would be expected. For example, `WM/AlbumTitle` and `Album` |

#### Returns

`void`

___

### setDescriptors

▸ **setDescriptors**(`name`, `...descriptors`): `void`

Sets a collection of descriptors in the extended content description object for a given
name, removing the existing matching records.

**`Remarks`**

All added descriptors should have their name set to `name` but this is not
    verified by the method. The descriptors will be added with their own names and not the
    one provided as an argument, which is only used for removing existing values and
    determining where to position the new descriptors.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Name of the descriptors to be added/removed |
| `...descriptors` | [`AsfContentDescriptor`](AsfContentDescriptor.md)[] | Descriptors to add to the new instance |

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

### fromEmpty

▸ `Static` **fromEmpty**(): [`AsfTag`](AsfTag.md)

Constructs and initializes a new, empty instance.

#### Returns

[`AsfTag`](AsfTag.md)

___

### fromHeader

▸ `Static` **fromHeader**(`header`): [`AsfTag`](AsfTag.md)

Constructs and initializes a new instance using the children of a HeaderObject
object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `header` | [`AsfHeaderObject`](AsfHeaderObject.md) | Header object whose children will be used to populate the new instance |

#### Returns

[`AsfTag`](AsfTag.md)

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
