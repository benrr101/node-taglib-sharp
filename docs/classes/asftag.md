[node-taglib-sharp](../README.md) / [Exports](../modules.md) / AsfTag

# Class: AsfTag

This class extends [Tag](tag.md) to provide a representation of an ASF tag which can be read from
and written to disk.

## Hierarchy

- [`Tag`](tag.md)

  ↳ **`AsfTag`**

## Table of contents

### Accessors

- [album](asftag.md#album)
- [albumArtists](asftag.md#albumartists)
- [albumArtistsSort](asftag.md#albumartistssort)
- [albumSort](asftag.md#albumsort)
- [amazonId](asftag.md#amazonid)
- [beatsPerMinute](asftag.md#beatsperminute)
- [comment](asftag.md#comment)
- [composers](asftag.md#composers)
- [composersSort](asftag.md#composerssort)
- [conductor](asftag.md#conductor)
- [contentDescriptionObject](asftag.md#contentdescriptionobject)
- [copyright](asftag.md#copyright)
- [dateTagged](asftag.md#datetagged)
- [description](asftag.md#description)
- [disc](asftag.md#disc)
- [discCount](asftag.md#disccount)
- [extendedContentDescriptionObject](asftag.md#extendedcontentdescriptionobject)
- [firstAlbumArtist](asftag.md#firstalbumartist)
- [firstAlbumArtistSort](asftag.md#firstalbumartistsort)
- [firstComposer](asftag.md#firstcomposer)
- [firstComposerSort](asftag.md#firstcomposersort)
- [firstGenre](asftag.md#firstgenre)
- [firstPerformer](asftag.md#firstperformer)
- [firstPerformerSort](asftag.md#firstperformersort)
- [genres](asftag.md#genres)
- [grouping](asftag.md#grouping)
- [initialKey](asftag.md#initialkey)
- [isEmpty](asftag.md#isempty)
- [isrc](asftag.md#isrc)
- [joinedAlbumArtists](asftag.md#joinedalbumartists)
- [joinedComposers](asftag.md#joinedcomposers)
- [joinedGenres](asftag.md#joinedgenres)
- [joinedPerformers](asftag.md#joinedperformers)
- [joinedPerformersSort](asftag.md#joinedperformerssort)
- [lyrics](asftag.md#lyrics)
- [metadataLibraryObject](asftag.md#metadatalibraryobject)
- [musicBrainzAlbumArtistId](asftag.md#musicbrainzalbumartistid)
- [musicBrainzArtistId](asftag.md#musicbrainzartistid)
- [musicBrainzDiscId](asftag.md#musicbrainzdiscid)
- [musicBrainzReleaseArtistId](asftag.md#musicbrainzreleaseartistid)
- [musicBrainzReleaseCountry](asftag.md#musicbrainzreleasecountry)
- [musicBrainzReleaseGroupId](asftag.md#musicbrainzreleasegroupid)
- [musicBrainzReleaseId](asftag.md#musicbrainzreleaseid)
- [musicBrainzReleaseStatus](asftag.md#musicbrainzreleasestatus)
- [musicBrainzReleaseType](asftag.md#musicbrainzreleasetype)
- [musicBrainzTrackId](asftag.md#musicbrainztrackid)
- [musicIpId](asftag.md#musicipid)
- [performers](asftag.md#performers)
- [performersRole](asftag.md#performersrole)
- [performersSort](asftag.md#performerssort)
- [pictures](asftag.md#pictures)
- [publisher](asftag.md#publisher)
- [remixedBy](asftag.md#remixedby)
- [replayGainAlbumGain](asftag.md#replaygainalbumgain)
- [replayGainAlbumPeak](asftag.md#replaygainalbumpeak)
- [replayGainTrackGain](asftag.md#replaygaintrackgain)
- [replayGainTrackPeak](asftag.md#replaygaintrackpeak)
- [subtitle](asftag.md#subtitle)
- [tagTypes](asftag.md#tagtypes)
- [title](asftag.md#title)
- [titleSort](asftag.md#titlesort)
- [track](asftag.md#track)
- [trackCount](asftag.md#trackcount)
- [year](asftag.md#year)

### Methods

- [addDescriptor](asftag.md#adddescriptor)
- [clear](asftag.md#clear)
- [copyTo](asftag.md#copyto)
- [getDescriptorString](asftag.md#getdescriptorstring)
- [getDescriptorStrings](asftag.md#getdescriptorstrings)
- [getDescriptorUint](asftag.md#getdescriptoruint)
- [getDescriptors](asftag.md#getdescriptors)
- [removeDescriptors](asftag.md#removedescriptors)
- [setDescriptorString](asftag.md#setdescriptorstring)
- [setDescriptorStrings](asftag.md#setdescriptorstrings)
- [setDescriptors](asftag.md#setdescriptors)
- [setInfoTag](asftag.md#setinfotag)
- [firstInGroup](asftag.md#firstingroup)
- [fromEmpty](asftag.md#fromempty)
- [fromHeader](asftag.md#fromheader)
- [isFalsyOrLikeEmpty](asftag.md#isfalsyorlikeempty)
- [joinGroup](asftag.md#joingroup)
- [pictureFromData](asftag.md#picturefromdata)
- [pictureToData](asftag.md#picturetodata)

## Accessors

### album

• `get` **album**(): `string`

Gets the album of the media represented by the current instance. For video media, this
represents the collection the video belongs to.

**`inheritdoc`**

**`remarks`** via `WM/AlbumTitle` or `Album` descriptors
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-albumtitle

#### Returns

`string`

Album of the media represented by the current instance or `undefined` if no value
    is present

• `set` **album**(`value`): `void`

Gets the album of the media represented by the current instance. For video media, this
represents the collection the video belongs to.

**`inheritdoc`**

**`remarks`** via `WM/AlbumTitle` or `Album` descriptors
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-albumtitle

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

**`inheritdoc`**

**`remarks`** via `WM/AlbumArtist` or `AlbumArtist` descriptors

#### Returns

`string`[]

Band or artist credited with the creation of the entire album or collection
    containing the media described by the current instance or an empty array if no value is
    present

• `set` **albumArtists**(`value`): `void`

Gets the band or artist who is credited credited in the creation of the entire album or
collection containing the media described by the current instance.

**`inheritdoc`**

**`remarks`** via `WM/AlbumArtist` or `AlbumArtist` descriptors

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string`[] |

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

**`inheritdoc`**

**`remarks`** via `WM/AlbumArtistSortOrder` descriptor
    http://msdn.microsoft.com/en-us/library/aa386866(VS.85).aspx

#### Returns

`string`[]

Sortable names for the bands/artists are credited with the creation of the entire
    album or collection containing the media described by the current instance, or an empty
    array if no value is present.

• `set` **albumArtistsSort**(`value`): `void`

Gets the sortable names of the bands/artists who are credited with creating the entire
album or collection containing the media described by the current instance.

**`inheritdoc`**

**`remarks`** via `WM/AlbumArtistSortOrder` descriptor
    http://msdn.microsoft.com/en-us/library/aa386866(VS.85).aspx

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string`[] |

#### Returns

`void`

Sortable names for the bands/artists are credited with the creation of the entire
    album or collection containing the media described by the current instance, or an empty
    array if no value is present.

___

### albumSort

• `get` **albumSort**(): `string`

Gets the sortable name of the album title of the media represented by the current instance.

**`inheritdoc`**

**`remarks`** via `WM/AlbumSortOrder` descriptors

#### Returns

`string`

Sortable name for the album title of the media or `undefined` if the value is not
    present

• `set` **albumSort**(`value`): `void`

Gets the sortable name of the album title of the media represented by the current instance.

**`inheritdoc`**

**`remarks`** via `WM/AlbumSortOrder` descriptors

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

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

**`inheritdoc`**

**`remarks`** via `WM/BeatsPerMinute` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-beatsperminute

#### Returns

`number`

Beats per minute of the audio in the media represented by the current instance, or
    `0` if not specified

• `set` **beatsPerMinute**(`value`): `void`

Gets the number of beats per minute in the audio of the media represented by the current
instance.

**`inheritdoc`**

**`remarks`** via `WM/BeatsPerMinute` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-beatsperminute

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

Beats per minute of the audio in the media represented by the current instance, or
    `0` if not specified

___

### comment

• `get` **comment**(): `string`

Gets a user comment on the media represented by the current instance.

**`inheritdoc`**

**`remarks`** via `WM/Text` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-text
    It should be noted that many applications store comments in the field read by
    [description](asftag.md#description).

#### Returns

`string`

User comments on the media represented by the current instance or `undefined` if
    the value is not present

• `set` **comment**(`value`): `void`

Gets a user comment on the media represented by the current instance.

**`inheritdoc`**

**`remarks`** via `WM/Text` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-text
    It should be noted that many applications store comments in the field read by
    [description](asftag.md#description).

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

**`inheritdoc`**

**`remarks`** via `WM/Composer` or `Composer` descriptors
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-composer

#### Returns

`string`[]

Composers of the media represented by the current instance of an empty array if no
    value is present.

• `set` **composers**(`value`): `void`

Gets the composers of the media represented by the current instance.

**`inheritdoc`**

**`remarks`** via `WM/Composer` or `Composer` descriptors
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-composer

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string`[] |

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

**`inheritdoc`**

**`remarks`** via `WM/Conductor` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-conductor

#### Returns

`string`

Conductor or director of the media represented by the current instance or
    `undefined` if no value present.

• `set` **conductor**(`value`): `void`

Gets the conductor or director of the media represented by the current instance.

**`inheritdoc`**

**`remarks`** via `WM/Conductor` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-conductor

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

Conductor or director of the media represented by the current instance or
    `undefined` if no value present.

___

### contentDescriptionObject

• `get` **contentDescriptionObject**(): [`AsfContentDescriptionObject`](asfcontentdescriptionobject.md)

Gets the ASF content description object used by the current instance.

#### Returns

[`AsfContentDescriptionObject`](asfcontentdescriptionobject.md)

___

### copyright

• `get` **copyright**(): `string`

Gets the copyright information for the media represented by the current instance.

**`inheritdoc`**

**`remarks`** via {@link ContentDescriptionObject.copyright}

#### Returns

`string`

Copyright information for the media represented by the current instance or
    `undefined` if no value is present.

• `set` **copyright**(`value`): `void`

Gets the copyright information for the media represented by the current instance.

**`inheritdoc`**

**`remarks`** via {@link ContentDescriptionObject.copyright}

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

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

**`inheritdoc`**

**`remarks`** via {@link ContentDescriptor.description}
    Some applications will use this field for storing comments.

#### Returns

`string`

Description of the media represented by the current instance or `undefined` if no
    value is present

• `set` **description**(`value`): `void`

Gets a short description of the media. For music, this could be the comment that the artist
made of his/her work. For a video, this should be a short summary of the story/plot, but
generally no spoliers. This should give the impression of what to expect in the media.

**`inheritdoc`**

**`remarks`** via {@link ContentDescriptor.description}
    Some applications will use this field for storing comments.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

Description of the media represented by the current instance or `undefined` if no
    value is present

___

### disc

• `get` **disc**(): `number`

Gets the number of the disc containing the media represented by the current instance in the
boxed set. For a series, this represents the season number.

**`inheritdoc`**

**`remarks`** via `WM/PartOfSet` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-partofset

#### Returns

`number`

Number of the disc or season of the media represented by the current instance in a
    boxed set.

• `set` **disc**(`value`): `void`

Gets the number of the disc containing the media represented by the current instance in the
boxed set. For a series, this represents the season number.

**`inheritdoc`**

**`remarks`** via `WM/PartOfSet` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-partofset

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

Number of the disc or season of the media represented by the current instance in a
    boxed set.

___

### discCount

• `get` **discCount**(): `number`

Gets the number of discs or seasons in the boxed set containing the media represented by the
current instance.

**`inheritdoc`**

**`remarks`** via `WM/PartOfSet` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-partofset

#### Returns

`number`

Number of discs or seasons in the boxed set containing the media represented by the
    current instance or `0` if not specified.

• `set` **discCount**(`value`): `void`

Gets the number of discs or seasons in the boxed set containing the media represented by the
current instance.

**`inheritdoc`**

**`remarks`** via `WM/PartOfSet` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-partofset

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

Number of discs or seasons in the boxed set containing the media represented by the
    current instance or `0` if not specified.

___

### extendedContentDescriptionObject

• `get` **extendedContentDescriptionObject**(): [`AsfExtendedContentDescriptionObject`](asfextendedcontentdescriptionobject.md)

Gets the ASF extended content description used by the current instance.

#### Returns

[`AsfExtendedContentDescriptionObject`](asfextendedcontentdescriptionobject.md)

___

### firstAlbumArtist

• `get` **firstAlbumArtist**(): `string`

Gets the the first value contained in [albumArtists](asftag.md#albumartists).

#### Returns

`string`

___

### firstAlbumArtistSort

• `get` **firstAlbumArtistSort**(): `string`

Gets the first value contained in [albumArtistsSort](asftag.md#albumartistssort)

#### Returns

`string`

___

### firstComposer

• `get` **firstComposer**(): `string`

Gets the first value contained in [composers](asftag.md#composers)

#### Returns

`string`

___

### firstComposerSort

• `get` **firstComposerSort**(): `string`

Gets the first value contained in [composersSort](asftag.md#composerssort)

#### Returns

`string`

___

### firstGenre

• `get` **firstGenre**(): `string`

Gets the first value contained in [genres](asftag.md#genres)

#### Returns

`string`

___

### firstPerformer

• `get` **firstPerformer**(): `string`

Gets the first value contained in [performers](asftag.md#performers)

#### Returns

`string`

___

### firstPerformerSort

• `get` **firstPerformerSort**(): `string`

Gets the first value contained in [performersSort](asftag.md#performerssort)

#### Returns

`string`

___

### genres

• `get` **genres**(): `string`[]

Gets the genres of the media represented by the current instance.

**`inheritdoc`**

**`remarks`** via `WM/Genre`, `WM/GenreID`, or `Genre` descriptors
     https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-genre
     https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-genreid

#### Returns

`string`[]

Genres of the media represented by the current instance or an empty array if no
    value is present.

• `set` **genres**(`value`): `void`

Gets the genres of the media represented by the current instance.

**`inheritdoc`**

**`remarks`** via `WM/Genre`, `WM/GenreID`, or `Genre` descriptors
     https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-genre
     https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-genreid

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

**`inheritdoc`**

**`remarks`** via `WM/ContentGroupDescription` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-contentgroupdescription

#### Returns

`string`

Grouping on the album which the media in the current instance belongs to or
    `undefined` if no value is present.

• `set` **grouping**(`value`): `void`

Gets the grouping on the album which the media in the current instance belongs to.

**`inheritdoc`**

**`remarks`** via `WM/ContentGroupDescription` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-contentgroupdescription

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

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

**`inheritdoc`**

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

Gets a semicolon and space separated string containing the values in [albumArtists](asftag.md#albumartists)

#### Returns

`string`

___

### joinedComposers

• `get` **joinedComposers**(): `string`

Gets a semicolon and space separated string containing the values in [composers](asftag.md#composers)

#### Returns

`string`

___

### joinedGenres

• `get` **joinedGenres**(): `string`

Gets a semicolon and space separated string containing the values in [genres](asftag.md#genres)

#### Returns

`string`

___

### joinedPerformers

• `get` **joinedPerformers**(): `string`

Gets a semicolon and space separated string containing the values in [performers](asftag.md#performers)

#### Returns

`string`

___

### joinedPerformersSort

• `get` **joinedPerformersSort**(): `string`

Gets a semicolon and space separated string containing the values in [performersSort](asftag.md#performerssort)

#### Returns

`string`

___

### lyrics

• `get` **lyrics**(): `string`

Gets the lyrics or script of the media represented by the current instance.

**`inheritdoc`**

**`remarks`** via `WM/Lyrics` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-lyrics

#### Returns

`string`

Lyrics or script of the media represented by the current instance or `undefined` if
    no value is present

• `set` **lyrics**(`value`): `void`

Gets the lyrics or script of the media represented by the current instance.

**`inheritdoc`**

**`remarks`** via `WM/Lyrics` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-lyrics

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

Lyrics or script of the media represented by the current instance or `undefined` if
    no value is present

___

### metadataLibraryObject

• `get` **metadataLibraryObject**(): [`AsfMetadataLibraryObject`](asfmetadatalibraryobject.md)

Gets the ASF metadata library object used by the current instance.

#### Returns

[`AsfMetadataLibraryObject`](asfmetadatalibraryobject.md)

___

### musicBrainzAlbumArtistId

• `get` **musicBrainzAlbumArtistId**(): `string`

**`inheritdoc`**

**`remarks`** via `MusicBrainz/Album Artist Id` descriptor

#### Returns

`string`

• `set` **musicBrainzAlbumArtistId**(`value`): `void`

**`inheritdoc`**

**`remarks`** via `MusicBrainz/Artist Id` descriptor

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

**`inheritdoc`**

**`remarks`** via `MusicBrainz/Artist Id` descriptor

#### Returns

`string`

MusicBrainz ArtistID of the media represented by the current instance or
    `undefined` if no value is present

• `set` **musicBrainzArtistId**(`value`): `void`

Gets the MusicBrainz artist ID of the media represented by the current instance.

**`inheritdoc`**

**`remarks`** via `MusicBrainz/Artist Id` descriptor

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

MusicBrainz ArtistID of the media represented by the current instance or
    `undefined` if no value is present

___

### musicBrainzDiscId

• `get` **musicBrainzDiscId**(): `string`

Gets the MusicBrainz disc ID of the media represented by the current instance.

**`inheritdoc`**

**`remarks`** via `MusicBrainz/Disc Id` descriptor

#### Returns

`string`

MusicBrainz DiscID of the media represented by the current instance or `undefined`
    if no value is present

• `set` **musicBrainzDiscId**(`value`): `void`

Gets the MusicBrainz disc ID of the media represented by the current instance.

**`inheritdoc`**

**`remarks`** via `MusicBrainz/Disc Id` descriptor

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

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

**`inheritdoc`**

**`remarks`** via `MusicBrainz/Album Release Country` descriptor

#### Returns

`string`

MusicBrainz ReleaseCountry of the media represented by the current instance or
    `undefined` if no value is present

• `set` **musicBrainzReleaseCountry**(`value`): `void`

Gets the MusicBrainz release country of the media represented by the current instance.

**`inheritdoc`**

**`remarks`** via `MusicBrainz/Album Release Country` descriptor

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

MusicBrainz ReleaseCountry of the media represented by the current instance or
    `undefined` if no value is present

___

### musicBrainzReleaseGroupId

• `get` **musicBrainzReleaseGroupId**(): `string`

Gets the MusicBrainz release group ID of the media represented by the current instance.

**`inheritdoc`**

**`remarks`** via `MusicBrainz/Release Group Id` descriptor

#### Returns

`string`

MusicBrainz ReleaseGroupID of the media represented by the current instance or
    `undefined` if no value is present

• `set` **musicBrainzReleaseGroupId**(`value`): `void`

Gets the MusicBrainz release group ID of the media represented by the current instance.

**`inheritdoc`**

**`remarks`** via `MusicBrainz/Release Group Id` descriptor

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

MusicBrainz ReleaseGroupID of the media represented by the current instance or
    `undefined` if no value is present

___

### musicBrainzReleaseId

• `get` **musicBrainzReleaseId**(): `string`

Gets the MusicBrainz release ID of the media represented by the current instance.

**`inheritdoc`**

**`remarks`** via `MusicBrainz/Album Id` descriptor

#### Returns

`string`

MusicBrainz ReleaseID of the media represented by the current instance or
    `undefined` if no value is present

• `set` **musicBrainzReleaseId**(`value`): `void`

Gets the MusicBrainz release ID of the media represented by the current instance.

**`inheritdoc`**

**`remarks`** via `MusicBrainz/Album Id` descriptor

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

MusicBrainz ReleaseID of the media represented by the current instance or
    `undefined` if no value is present

___

### musicBrainzReleaseStatus

• `get` **musicBrainzReleaseStatus**(): `string`

Gets the MusicBrainz release status of the media represented by the current instance.

**`inheritdoc`**

**`remarks`** via `MusicBrainz/Album Status` descriptor

#### Returns

`string`

MusicBrainz ReleaseStatus of the media represented by the current instance or
    `undefined` if no value is present

• `set` **musicBrainzReleaseStatus**(`value`): `void`

Gets the MusicBrainz release status of the media represented by the current instance.

**`inheritdoc`**

**`remarks`** via `MusicBrainz/Album Status` descriptor

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

MusicBrainz ReleaseStatus of the media represented by the current instance or
    `undefined` if no value is present

___

### musicBrainzReleaseType

• `get` **musicBrainzReleaseType**(): `string`

Gets the MusicBrainz release type of the media represented by the current instance.

**`inheritdoc`**

**`remarks`** via `MusicBrainz/Album Type` descriptor

#### Returns

`string`

MusicBrainz ReleaseType of the media represented by the current instance or
    `undefined` if no value is present

• `set` **musicBrainzReleaseType**(`value`): `void`

Gets the MusicBrainz release type of the media represented by the current instance.

**`inheritdoc`**

**`remarks`** via `MusicBrainz/Album Type` descriptor

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

MusicBrainz ReleaseType of the media represented by the current instance or
    `undefined` if no value is present

___

### musicBrainzTrackId

• `get` **musicBrainzTrackId**(): `string`

Gets the MusicBrainz track ID of the media represented by the media represented by the
current instance.

**`inheritdoc`**

**`remarks`** via `MusicBrainz/Track Id` descriptor

#### Returns

`string`

MusicBrainz TrackID of the media represented by the current instance or `undefined`
    if no value is present

• `set` **musicBrainzTrackId**(`value`): `void`

Gets the MusicBrainz track ID of the media represented by the media represented by the
current instance.

**`inheritdoc`**

**`remarks`** via `MusicBrainz/Track Id` descriptor

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

MusicBrainz TrackID of the media represented by the current instance or `undefined`
    if no value is present

___

### musicIpId

• `get` **musicIpId**(): `string`

Gets the MusicIP PUID of the media represented by the current instance.

**`inheritdoc`**

**`remarks`** via `MusicIP/PUID` descriptor

#### Returns

`string`

MusicIP PUID of the media represented by the current instance or `undefined` if no
    value is present

• `set` **musicIpId**(`value`): `void`

Gets the MusicIP PUID of the media represented by the current instance.

**`inheritdoc`**

**`remarks`** via `MusicIP/PUID` descriptor

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

MusicIP PUID of the media represented by the current instance or `undefined` if no
    value is present

___

### performers

• `get` **performers**(): `string`[]

Gets the performers or artists who performed in the media described by the current instance.

**`inheritdoc`**

**`remarks`** via {@link ContentDescriptor.author}

#### Returns

`string`[]

Performers who performed in the media described by the current instance or an empty
    array if no value is present.

• `set` **performers**(`value`): `void`

Gets the performers or artists who performed in the media described by the current instance.

**`inheritdoc`**

**`remarks`** via {@link ContentDescriptor.author}

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
for music. This must match the [performers](asftag.md#performers) array (for each person, correspond one/more
role). Several roles for the same artist/actor can be separated with semicolons. For
example: "Bass; Backing Vocals; Vibraphone".

**`remarks`** It is highly important to match each role to the performers. This means that an entry
    in the [performersRole](asftag.md#performersrole) array is `undefined` to maintain the relationship between
    `performers[i]` and `performersRole[i]`.

#### Returns

`string`[]

Array containing the roles played by the performers in the media described by the
    current instance, or an empty array if no value is present.

• `set` **performersRole**(`value`): `void`

Sets the characters portrayed by an actor for a video or instruments played by a musician
for music. This must match the [performers](asftag.md#performers) array (for each person, correspond one/more
role). Several roles for the same artist/actor can be separated with semicolons. For
example: "Bass; Backing Vocals; Vibraphone".

**`remarks`** It is highly important to match each role to the performers. This means that an entry
    in the [performersRole](asftag.md#performersrole) array is `undefined` to maintain the relationship between
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

**`inheritdoc`**

**`remarks`** via "WM/ArtistSortOrder" descriptor
    http://msdn.microsoft.com/en-us/library/aa386866(VS.85).aspx

#### Returns

`string`[]

Sortable names for the performers who performed in the media described by the
    current instance, or an empty array if no value is present.

• `set` **performersSort**(`value`): `void`

Gets the sortable names of the performers or artists who performed in the media described by
the current instance.

**`inheritdoc`**

**`remarks`** via "WM/ArtistSortOrder" descriptor
    http://msdn.microsoft.com/en-us/library/aa386866(VS.85).aspx

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string`[] |

#### Returns

`void`

Sortable names for the performers who performed in the media described by the
    current instance, or an empty array if no value is present.

___

### pictures

• `get` **pictures**(): [`IPicture`](../interfaces/ipicture.md)[]

Gets a collection of pictures associated with the media represented by the current instance.

**`inheritdoc`**

**`remarks`** via the `WM/Picture` content descriptor and description record.
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wmpicture
    Modifications to the returned array will not stored.

#### Returns

[`IPicture`](../interfaces/ipicture.md)[]

Array containing a collection of pictures associated with the media represented by
    the current instance or an empty array if no pictures are present.

• `set` **pictures**(`value`): `void`

Gets a collection of pictures associated with the media represented by the current instance.

**`inheritdoc`**

**`remarks`** via the `WM/Picture` content descriptor and description record.
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wmpicture

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`IPicture`](../interfaces/ipicture.md)[] |

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

**`inheritdoc`**

**`remarks`** via `ReplayGain/Album` descriptor

#### Returns

`number`

Album gain as per the ReplayGain specifications, in dB, or `NaN` if no value is set

• `set` **replayGainAlbumGain**(`value`): `void`

Gets the ReplayGain album gain in dB.

**`inheritdoc`**

**`remarks`** via `ReplayGain/Album` descriptor

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

Album gain as per the ReplayGain specifications, in dB, or `NaN` if no value is set

___

### replayGainAlbumPeak

• `get` **replayGainAlbumPeak**(): `number`

Gets the ReplayGain album peak sample.

**`inheritdoc`**

**`remarks`** via `ReplayGain/Album Peak` descriptor

#### Returns

`number`

Album peak as per the ReplayGain specifications, or `NaN` if no value is set

• `set` **replayGainAlbumPeak**(`value`): `void`

Gets the ReplayGain album peak sample.

**`inheritdoc`**

**`remarks`** via `ReplayGain/Album Peak` descriptor

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

Album peak as per the ReplayGain specifications, or `NaN` if no value is set

___

### replayGainTrackGain

• `get` **replayGainTrackGain**(): `number`

Gets the ReplayGain track gain in dB.

**`inheritdoc`**

**`remarks`** via `ReplayGain/Track` descriptor

#### Returns

`number`

Track gain as per ReplayGain specifications, in dB, or `NaN` if no value is set

• `set` **replayGainTrackGain**(`value`): `void`

Gets the ReplayGain track gain in dB.

**`inheritdoc`**

**`remarks`** via `ReplayGain/Track` descriptor

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

Track gain as per ReplayGain specifications, in dB, or `NaN` if no value is set

___

### replayGainTrackPeak

• `get` **replayGainTrackPeak**(): `number`

Gets the ReplayGain track peak sample.

**`inheritdoc`**

**`remarks`** via `ReplayGain/Track Peak` descriptor

#### Returns

`number`

Track peak as per the ReplayGain specifications, or `NaN` if no value is set

• `set` **replayGainTrackPeak**(`value`): `void`

Gets the ReplayGain track peak sample.

**`inheritdoc`**

**`remarks`** via `ReplayGain/Track Peak` descriptor

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

Track peak as per the ReplayGain specifications, or `NaN` if no value is set

___

### subtitle

• `get` **subtitle**(): `string`

Gets a description, one-line. It represents the tagline of the vide/music.

**`inheritdoc`**

**`remarks`** via `WM/SubTitle` descriptor
    https://msdn.microsoft.com/en-us/library/windows/desktop/dd757997(v=vs.85).aspx

#### Returns

`string`

Subtitle of the media represented by the current instance or `undefined` if no
    value is present

• `set` **subtitle**(`value`): `void`

Gets a description, one-line. It represents the tagline of the vide/music.

**`inheritdoc`**

**`remarks`** via `WM/SubTitle` descriptor
    https://msdn.microsoft.com/en-us/library/windows/desktop/dd757997(v=vs.85).aspx

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

Subtitle of the media represented by the current instance or `undefined` if no
    value is present

___

### tagTypes

• `get` **tagTypes**(): [`TagTypes`](../enums/tagtypes.md)

Gets the tag types contained in the current instance. A bit wise combined [TagTypes](../enums/tagtypes.md)
containing the tag types contained in the current instance.

#### Returns

[`TagTypes`](../enums/tagtypes.md)

___

### title

• `get` **title**(): `string`

Gets the title for the media described by the current instance.

**`inheritdoc`**

**`remarks`** via content description object

#### Returns

`string`

Title of the media described by the current instance or `undefined` if no value is
    present.

• `set` **title**(`value`): `void`

Gets the title for the media described by the current instance.

**`inheritdoc`**

**`remarks`** via content description object

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

**`inheritdoc`**

**`remarks`** via "WM/TitleSortOrder"
    http://msdn.microsoft.com/en-us/library/aa386866(VS.85).aspx

#### Returns

`string`

Sortable name of the media described by the current instance or `undefined` if no
    value is present

• `set` **titleSort**(`value`): `void`

Gets the sortable name for the title of the media described by the current instance.

**`inheritdoc`**

**`remarks`** via "WM/TitleSortOrder"
    http://msdn.microsoft.com/en-us/library/aa386866(VS.85).aspx

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

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

**`remarks`** via `WM/TrackNumber` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-tracknumber

#### Returns

`number`

Position of the media represented by the current instance in its containing album
    or `0` if not specified.

• `set` **track**(`value`): `void`

Gets the position of the media represented by the current instance in its containing album
or season (for a series).

**`inheritdoc`**

**`remarks`** via `WM/TrackNumber` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-tracknumber

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

**`inheritdoc`**

**`remarks`** via `TrackTotal` descriptor

#### Returns

`number`

Number of tracks in the album or number of episodes in a series of the media
    represented by the current instance or `0` if not specified.

• `set` **trackCount**(`value`): `void`

Gets the number of tracks in the album or the number of episodes in a series of the media
represented by the current instance.

**`inheritdoc`**

**`remarks`** via `TrackTotal` descriptor

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

Number of tracks in the album or number of episodes in a series of the media
    represented by the current instance or `0` if not specified.

___

### year

• `get` **year**(): `number`

Gets the year that the media represented by the current instance was recorded.

**`inheritdoc`**

**`remarks`** via `WM/Year` descriptor
     https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-year

#### Returns

`number`

Year that the media represented by the current instance was created or `0` if no
    value is present.

• `set` **year**(`value`): `void`

Gets the year that the media represented by the current instance was recorded.

**`inheritdoc`**

**`remarks`** via `WM/Year` descriptor
     https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-year

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

Year that the media represented by the current instance was created or `0` if no
    value is present.

## Methods

### addDescriptor

▸ **addDescriptor**(`descriptor`): `void`

Adds a descriptor to the current instance's extended content description object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `descriptor` | [`AsfContentDescriptor`](asfcontentdescriptor.md) | Content descriptor to add to the current instance. Must be truthy |

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

### getDescriptorString

▸ **getDescriptorString**(...`names`): `string`

Gets the string contained in a specific descriptor from the extended content description
object in the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...names` | `string`[] | Names of the descriptors to look for |

#### Returns

`string`

string The contents of the first descriptor found who's name is in the provided
    collection of descriptor names

___

### getDescriptorStrings

▸ **getDescriptorStrings**(...`names`): `string`[]

Gets the strings contained in a specific descriptor from the extended content description
object in the current instance, as split by `;`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...names` | `string`[] | Names of the descriptors to look for |

#### Returns

`string`[]

string The contents of the first descriptor found who's name is in the provided
    collection of descriptor names, split by `;`

___

### getDescriptorUint

▸ **getDescriptorUint**(...`names`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...names` | `string`[] |

#### Returns

`number`

___

### getDescriptors

▸ **getDescriptors**(...`names`): [`AsfContentDescriptor`](asfcontentdescriptor.md)[]

Gets all descriptors in the extended description object with names matching any of the names
in the provided collection of names.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...names` | `string`[] | Collection of names to search the extended description object for |

#### Returns

[`AsfContentDescriptor`](asfcontentdescriptor.md)[]

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

▸ **setDescriptorString**(`value`, ...`names`): `void`

Sets the string for a collection of descriptors in the current instance.

**`remarks`** The value will be stored in the first value in `names` and the rest of the
    descriptors with the matching names will be cleared.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | Value to store or `undefined` to clear the value |
| `...names` | `string`[] | Names in which the value would be expected. For example, "WM/AlbumTitle" and     "Album" |

#### Returns

`void`

___

### setDescriptorStrings

▸ **setDescriptorStrings**(`value`, ...`names`): `void`

Sets the strings for a collection of descriptors in the current instance. The strings will
be stored as a single string, joined together with `; `.

**`remarks`** The value will be stored in the first value in `names` and the rest of the
    descriptors with the matching names will be cleared.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string`[] | Value to store or `undefined` to clear the value |
| `...names` | `string`[] | Names in which the value would be expected. For example, "WM/AlbumTitle" and     "Album" |

#### Returns

`void`

___

### setDescriptors

▸ **setDescriptors**(`name`, ...`descriptors`): `void`

Sets a collection of descriptors in the extended content description object for a given
name, removing the existing matching records.

**`remarks`** All added descriptors should have their name set to `name` but this is not
    verified by the method. The descriptors will be added with their own names and not the
    one provided as an argument, which is only used for removing existing values and
    determining where to position the new descriptors.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Name of the descriptors to be added/removed |
| `...descriptors` | [`AsfContentDescriptor`](asfcontentdescriptor.md)[] | Descriptors to add to the new instance |

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

### fromEmpty

▸ `Static` **fromEmpty**(): [`AsfTag`](asftag.md)

Constructs and initializes a new, empty instance.

#### Returns

[`AsfTag`](asftag.md)

___

### fromHeader

▸ `Static` **fromHeader**(`header`): [`AsfTag`](asftag.md)

Constructs and initializes a new instance using the children of a {@link HeaderObject}
object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `header` | [`AsfHeaderObject`](asfheaderobject.md) | Header object whose children will be used to populate the new instance |

#### Returns

[`AsfTag`](asftag.md)

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

### pictureFromData

▸ `Static` **pictureFromData**(`data`): [`Picture`](picture.md)

**`internal`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`ByteVector`](bytevector.md) |

#### Returns

[`Picture`](picture.md)

___

### pictureToData

▸ `Static` **pictureToData**(`picture`): [`ByteVector`](bytevector.md)

**`internal`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `picture` | [`IPicture`](../interfaces/ipicture.md) |

#### Returns

[`ByteVector`](bytevector.md)
