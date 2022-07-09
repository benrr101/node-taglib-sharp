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
- [setInfoTag](AsfTag.md#setinfotag)
- [firstInGroup](AsfTag.md#firstingroup)
- [fromEmpty](AsfTag.md#fromempty)
- [fromHeader](AsfTag.md#fromheader)
- [isFalsyOrLikeEmpty](AsfTag.md#isfalsyorlikeempty)
- [joinGroup](AsfTag.md#joingroup)
- [pictureFromData](AsfTag.md#picturefromdata)
- [pictureToData](AsfTag.md#picturetodata)
- [tagTypeFlagsToArray](AsfTag.md#tagtypeflagstoarray)

## Accessors

### album

• `get` **album**(): `string`

**`inheritdoc`**

**`remarks`** via `WM/AlbumTitle` or `Album` descriptors
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-albumtitle

#### Returns

`string`

#### Overrides

Tag.album

• `set` **album**(`value`): `void`

**`inheritdoc`**

**`remarks`** via `WM/AlbumTitle` or `Album` descriptors
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-albumtitle

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

**`inheritdoc`**

**`remarks`** via `WM/AlbumArtist` or `AlbumArtist` descriptors

#### Returns

`string`[]

#### Overrides

Tag.albumArtists

• `set` **albumArtists**(`value`): `void`

**`inheritdoc`**

**`remarks`** via `WM/AlbumArtist` or `AlbumArtist` descriptors

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string`[] |

#### Returns

`void`

#### Overrides

Tag.albumArtists

___

### albumArtistsSort

• `get` **albumArtistsSort**(): `string`[]

**`inheritdoc`**

**`remarks`** via `WM/AlbumArtistSortOrder` descriptor
    http://msdn.microsoft.com/en-us/library/aa386866(VS.85).aspx

#### Returns

`string`[]

#### Overrides

Tag.albumArtistsSort

• `set` **albumArtistsSort**(`value`): `void`

**`inheritdoc`**

**`remarks`** via `WM/AlbumArtistSortOrder` descriptor
    http://msdn.microsoft.com/en-us/library/aa386866(VS.85).aspx

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string`[] |

#### Returns

`void`

#### Overrides

Tag.albumArtistsSort

___

### albumSort

• `get` **albumSort**(): `string`

**`inheritdoc`**

**`remarks`** via `WM/AlbumSortOrder` descriptors

#### Returns

`string`

#### Overrides

Tag.albumSort

• `set` **albumSort**(`value`): `void`

**`inheritdoc`**

**`remarks`** via `WM/AlbumSortOrder` descriptors

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Overrides

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

**`inheritdoc`**

**`remarks`** via `WM/BeatsPerMinute` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-beatsperminute

#### Returns

`number`

#### Overrides

Tag.beatsPerMinute

• `set` **beatsPerMinute**(`value`): `void`

**`inheritdoc`**

**`remarks`** via `WM/BeatsPerMinute` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-beatsperminute

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Overrides

Tag.beatsPerMinute

___

### comment

• `get` **comment**(): `string`

**`inheritdoc`**

**`remarks`** via `WM/Text` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-text
    It should be noted that many applications store comments in the field read by
    [description](AsfTag.md#description).

#### Returns

`string`

#### Overrides

Tag.comment

• `set` **comment**(`value`): `void`

**`inheritdoc`**

**`remarks`** via `WM/Text` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-text
    It should be noted that many applications store comments in the field read by
    [description](AsfTag.md#description).

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

**`inheritdoc`**

**`remarks`** via `WM/Composer` or `Composer` descriptors
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-composer

#### Returns

`string`[]

#### Overrides

Tag.composers

• `set` **composers**(`value`): `void`

**`inheritdoc`**

**`remarks`** via `WM/Composer` or `Composer` descriptors
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-composer

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string`[] |

#### Returns

`void`

#### Overrides

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

**`inheritdoc`**

**`remarks`** via `WM/Conductor` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-conductor

#### Returns

`string`

#### Overrides

Tag.conductor

• `set` **conductor**(`value`): `void`

**`inheritdoc`**

**`remarks`** via `WM/Conductor` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-conductor

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

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

**`inheritdoc`**

**`remarks`** via {@link ContentDescriptionObject.copyright}

#### Returns

`string`

#### Overrides

Tag.copyright

• `set` **copyright**(`value`): `void`

**`inheritdoc`**

**`remarks`** via {@link ContentDescriptionObject.copyright}

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

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
| `value` | `Date` | Date/time at which the tag has been written, or `undefined` if no value is     present |

#### Returns

`void`

Date/time at which the tag has been written, or `undefined` if no value is present

#### Inherited from

Tag.dateTagged

___

### description

• `get` **description**(): `string`

**`inheritdoc`**

**`remarks`** via {@link ContentDescriptor.description}
    Some applications will use this field for storing comments.

#### Returns

`string`

#### Overrides

Tag.description

• `set` **description**(`value`): `void`

**`inheritdoc`**

**`remarks`** via {@link ContentDescriptor.description}
    Some applications will use this field for storing comments.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Overrides

Tag.description

___

### disc

• `get` **disc**(): `number`

**`inheritdoc`**

**`remarks`** via `WM/PartOfSet` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-partofset

#### Returns

`number`

#### Overrides

Tag.disc

• `set` **disc**(`value`): `void`

**`inheritdoc`**

**`remarks`** via `WM/PartOfSet` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-partofset

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Overrides

Tag.disc

___

### discCount

• `get` **discCount**(): `number`

**`inheritdoc`**

**`remarks`** via `WM/PartOfSet` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-partofset

#### Returns

`number`

#### Overrides

Tag.discCount

• `set` **discCount**(`value`): `void`

**`inheritdoc`**

**`remarks`** via `WM/PartOfSet` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-partofset

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

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

**`inheritdoc`**

**`remarks`** via `WM/Genre`, `WM/GenreID`, or `Genre` descriptors
     https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-genre
     https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-genreid

#### Returns

`string`[]

#### Overrides

Tag.genres

• `set` **genres**(`value`): `void`

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

#### Overrides

Tag.genres

___

### grouping

• `get` **grouping**(): `string`

**`inheritdoc`**

**`remarks`** via `WM/ContentGroupDescription` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-contentgroupdescription

#### Returns

`string`

#### Overrides

Tag.grouping

• `set` **grouping**(`value`): `void`

**`inheritdoc`**

**`remarks`** via `WM/ContentGroupDescription` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-contentgroupdescription

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

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

**`inheritdoc`**

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

**`inheritdoc`**

**`remarks`** via `WM/Lyrics` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-lyrics

#### Returns

`string`

#### Overrides

Tag.lyrics

• `set` **lyrics**(`value`): `void`

**`inheritdoc`**

**`remarks`** via `WM/Lyrics` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-lyrics

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

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

**`inheritdoc`**

**`remarks`** via `MusicBrainz/Artist Id` descriptor

#### Returns

`string`

#### Overrides

Tag.musicBrainzArtistId

• `set` **musicBrainzArtistId**(`value`): `void`

**`inheritdoc`**

**`remarks`** via `MusicBrainz/Artist Id` descriptor

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Overrides

Tag.musicBrainzArtistId

___

### musicBrainzDiscId

• `get` **musicBrainzDiscId**(): `string`

**`inheritdoc`**

**`remarks`** via `MusicBrainz/Disc Id` descriptor

#### Returns

`string`

#### Overrides

Tag.musicBrainzDiscId

• `set` **musicBrainzDiscId**(`value`): `void`

**`inheritdoc`**

**`remarks`** via `MusicBrainz/Disc Id` descriptor

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Overrides

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

**`inheritdoc`**

**`remarks`** via `MusicBrainz/Album Release Country` descriptor

#### Returns

`string`

#### Overrides

Tag.musicBrainzReleaseCountry

• `set` **musicBrainzReleaseCountry**(`value`): `void`

**`inheritdoc`**

**`remarks`** via `MusicBrainz/Album Release Country` descriptor

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Overrides

Tag.musicBrainzReleaseCountry

___

### musicBrainzReleaseGroupId

• `get` **musicBrainzReleaseGroupId**(): `string`

**`inheritdoc`**

**`remarks`** via `MusicBrainz/Release Group Id` descriptor

#### Returns

`string`

#### Overrides

Tag.musicBrainzReleaseGroupId

• `set` **musicBrainzReleaseGroupId**(`value`): `void`

**`inheritdoc`**

**`remarks`** via `MusicBrainz/Release Group Id` descriptor

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Overrides

Tag.musicBrainzReleaseGroupId

___

### musicBrainzReleaseId

• `get` **musicBrainzReleaseId**(): `string`

**`inheritdoc`**

**`remarks`** via `MusicBrainz/Album Id` descriptor

#### Returns

`string`

#### Overrides

Tag.musicBrainzReleaseId

• `set` **musicBrainzReleaseId**(`value`): `void`

**`inheritdoc`**

**`remarks`** via `MusicBrainz/Album Id` descriptor

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Overrides

Tag.musicBrainzReleaseId

___

### musicBrainzReleaseStatus

• `get` **musicBrainzReleaseStatus**(): `string`

**`inheritdoc`**

**`remarks`** via `MusicBrainz/Album Status` descriptor

#### Returns

`string`

#### Overrides

Tag.musicBrainzReleaseStatus

• `set` **musicBrainzReleaseStatus**(`value`): `void`

**`inheritdoc`**

**`remarks`** via `MusicBrainz/Album Status` descriptor

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Overrides

Tag.musicBrainzReleaseStatus

___

### musicBrainzReleaseType

• `get` **musicBrainzReleaseType**(): `string`

**`inheritdoc`**

**`remarks`** via `MusicBrainz/Album Type` descriptor

#### Returns

`string`

#### Overrides

Tag.musicBrainzReleaseType

• `set` **musicBrainzReleaseType**(`value`): `void`

**`inheritdoc`**

**`remarks`** via `MusicBrainz/Album Type` descriptor

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

**`inheritdoc`**

**`remarks`** via `MusicBrainz/Track Id` descriptor

#### Returns

`string`

#### Overrides

Tag.musicBrainzTrackId

• `set` **musicBrainzTrackId**(`value`): `void`

**`inheritdoc`**

**`remarks`** via `MusicBrainz/Track Id` descriptor

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Overrides

Tag.musicBrainzTrackId

___

### musicIpId

• `get` **musicIpId**(): `string`

**`inheritdoc`**

**`remarks`** via `MusicIP/PUID` descriptor

#### Returns

`string`

#### Overrides

Tag.musicIpId

• `set` **musicIpId**(`value`): `void`

**`inheritdoc`**

**`remarks`** via `MusicIP/PUID` descriptor

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Overrides

Tag.musicIpId

___

### performers

• `get` **performers**(): `string`[]

**`inheritdoc`**

**`remarks`** via {@link ContentDescriptor.author}

#### Returns

`string`[]

#### Overrides

Tag.performers

• `set` **performers**(`value`): `void`

**`inheritdoc`**

**`remarks`** via {@link ContentDescriptor.author}

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
for music. This must match the [performers](AsfTag.md#performers) array (for each person, correspond one/more
role). Several roles for the same artist/actor can be separated with semicolons. For
example: "Bass; Backing Vocals; Vibraphone".

**`remarks`** It is highly important to match each role to the performers. This means that an entry
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

**`remarks`** It is highly important to match each role to the performers. This means that an entry
    in the [performersRole](AsfTag.md#performersrole) array is `undefined` to maintain the relationship between
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

**`inheritdoc`**

**`remarks`** via "WM/ArtistSortOrder" descriptor
    http://msdn.microsoft.com/en-us/library/aa386866(VS.85).aspx

#### Returns

`string`[]

#### Overrides

Tag.performersSort

• `set` **performersSort**(`value`): `void`

**`inheritdoc`**

**`remarks`** via "WM/ArtistSortOrder" descriptor
    http://msdn.microsoft.com/en-us/library/aa386866(VS.85).aspx

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string`[] |

#### Returns

`void`

#### Overrides

Tag.performersSort

___

### pictures

• `get` **pictures**(): [`IPicture`](../interfaces/IPicture.md)[]

**`inheritdoc`**

**`remarks`** via the `WM/Picture` content descriptor and description record.
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wmpicture
    Modifications to the returned array will not stored.

#### Returns

[`IPicture`](../interfaces/IPicture.md)[]

#### Overrides

Tag.pictures

• `set` **pictures**(`value`): `void`

**`inheritdoc`**

**`remarks`** via the `WM/Picture` content descriptor and description record.
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wmpicture

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`IPicture`](../interfaces/IPicture.md)[] |

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

**`inheritdoc`**

**`remarks`** via `ReplayGain/Album` descriptor

#### Returns

`number`

#### Overrides

Tag.replayGainAlbumGain

• `set` **replayGainAlbumGain**(`value`): `void`

**`inheritdoc`**

**`remarks`** via `ReplayGain/Album` descriptor

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Overrides

Tag.replayGainAlbumGain

___

### replayGainAlbumPeak

• `get` **replayGainAlbumPeak**(): `number`

**`inheritdoc`**

**`remarks`** via `ReplayGain/Album Peak` descriptor

#### Returns

`number`

#### Overrides

Tag.replayGainAlbumPeak

• `set` **replayGainAlbumPeak**(`value`): `void`

**`inheritdoc`**

**`remarks`** via `ReplayGain/Album Peak` descriptor

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Overrides

Tag.replayGainAlbumPeak

___

### replayGainTrackGain

• `get` **replayGainTrackGain**(): `number`

**`inheritdoc`**

**`remarks`** via `ReplayGain/Track` descriptor

#### Returns

`number`

#### Overrides

Tag.replayGainTrackGain

• `set` **replayGainTrackGain**(`value`): `void`

**`inheritdoc`**

**`remarks`** via `ReplayGain/Track` descriptor

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Overrides

Tag.replayGainTrackGain

___

### replayGainTrackPeak

• `get` **replayGainTrackPeak**(): `number`

**`inheritdoc`**

**`remarks`** via `ReplayGain/Track Peak` descriptor

#### Returns

`number`

#### Overrides

Tag.replayGainTrackPeak

• `set` **replayGainTrackPeak**(`value`): `void`

**`inheritdoc`**

**`remarks`** via `ReplayGain/Track Peak` descriptor

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Overrides

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

**`inheritdoc`**

**`remarks`** via `WM/SubTitle` descriptor
    https://msdn.microsoft.com/en-us/library/windows/desktop/dd757997(v=vs.85).aspx

#### Returns

`string`

#### Overrides

Tag.subtitle

• `set` **subtitle**(`value`): `void`

**`inheritdoc`**

**`remarks`** via `WM/SubTitle` descriptor
    https://msdn.microsoft.com/en-us/library/windows/desktop/dd757997(v=vs.85).aspx

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Overrides

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

**`remarks`** via content description object

#### Returns

`string`

#### Overrides

Tag.title

• `set` **title**(`value`): `void`

**`inheritdoc`**

**`remarks`** via content description object

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

**`inheritdoc`**

**`remarks`** via "WM/TitleSortOrder"
    http://msdn.microsoft.com/en-us/library/aa386866(VS.85).aspx

#### Returns

`string`

#### Overrides

Tag.titleSort

• `set` **titleSort**(`value`): `void`

**`inheritdoc`**

**`remarks`** via "WM/TitleSortOrder"
    http://msdn.microsoft.com/en-us/library/aa386866(VS.85).aspx

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Overrides

Tag.titleSort

___

### track

• `get` **track**(): `number`

**`inheritdoc`**

**`remarks`** via `WM/TrackNumber` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-tracknumber

#### Returns

`number`

#### Overrides

Tag.track

• `set` **track**(`value`): `void`

**`inheritdoc`**

**`remarks`** via `WM/TrackNumber` descriptor
    https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-tracknumber

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

**`inheritdoc`**

**`remarks`** via `TrackTotal` descriptor

#### Returns

`number`

#### Overrides

Tag.trackCount

• `set` **trackCount**(`value`): `void`

**`inheritdoc`**

**`remarks`** via `TrackTotal` descriptor

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Overrides

Tag.trackCount

___

### year

• `get` **year**(): `number`

**`inheritdoc`**

**`remarks`** via `WM/Year` descriptor
     https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-year

#### Returns

`number`

#### Overrides

Tag.year

• `set` **year**(`value`): `void`

**`inheritdoc`**

**`remarks`** via `WM/Year` descriptor
     https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-year

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

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

▸ **getDescriptors**(...`names`): [`AsfContentDescriptor`](AsfContentDescriptor.md)[]

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
| `...descriptors` | [`AsfContentDescriptor`](AsfContentDescriptor.md)[] | Descriptors to add to the new instance |

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

### fromEmpty

▸ `Static` **fromEmpty**(): [`AsfTag`](AsfTag.md)

Constructs and initializes a new, empty instance.

#### Returns

[`AsfTag`](AsfTag.md)

___

### fromHeader

▸ `Static` **fromHeader**(`header`): [`AsfTag`](AsfTag.md)

Constructs and initializes a new instance using the children of a {@link HeaderObject}
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

### pictureFromData

▸ `Static` **pictureFromData**(`data`): [`Picture`](Picture.md)

**`internal`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`ByteVector`](ByteVector.md) |

#### Returns

[`Picture`](Picture.md)

___

### pictureToData

▸ `Static` **pictureToData**(`picture`): [`ByteVector`](ByteVector.md)

**`internal`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `picture` | [`IPicture`](../interfaces/IPicture.md) |

#### Returns

[`ByteVector`](ByteVector.md)

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
