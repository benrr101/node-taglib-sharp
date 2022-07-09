[node-taglib-sharp](../README.md) / [Exports](../modules.md) / XiphComment

# Class: XiphComment

Provides support for reading and writing Xiph comment-style tags.

**`remarks`** Xiph comment tag properties are stored in "fields" of the form `KEY=value`, where `KEY`
    is the "field name". The field name can be defined multiple times in the tag which means
    each field can have multiple values.

## Hierarchy

- [`Tag`](Tag.md)

  ↳ **`XiphComment`**

## Table of contents

### Accessors

- [album](XiphComment.md#album)
- [albumArtists](XiphComment.md#albumartists)
- [albumArtistsSort](XiphComment.md#albumartistssort)
- [albumSort](XiphComment.md#albumsort)
- [amazonId](XiphComment.md#amazonid)
- [beatsPerMinute](XiphComment.md#beatsperminute)
- [comment](XiphComment.md#comment)
- [composers](XiphComment.md#composers)
- [composersSort](XiphComment.md#composerssort)
- [conductor](XiphComment.md#conductor)
- [copyright](XiphComment.md#copyright)
- [dateTagged](XiphComment.md#datetagged)
- [description](XiphComment.md#description)
- [disc](XiphComment.md#disc)
- [discCount](XiphComment.md#disccount)
- [fieldNames](XiphComment.md#fieldnames)
- [fieldValueCount](XiphComment.md#fieldvaluecount)
- [firstAlbumArtist](XiphComment.md#firstalbumartist)
- [firstAlbumArtistSort](XiphComment.md#firstalbumartistsort)
- [firstComposer](XiphComment.md#firstcomposer)
- [firstComposerSort](XiphComment.md#firstcomposersort)
- [firstGenre](XiphComment.md#firstgenre)
- [firstPerformer](XiphComment.md#firstperformer)
- [firstPerformerSort](XiphComment.md#firstperformersort)
- [genres](XiphComment.md#genres)
- [grouping](XiphComment.md#grouping)
- [initialKey](XiphComment.md#initialkey)
- [isCompilation](XiphComment.md#iscompilation)
- [isEmpty](XiphComment.md#isempty)
- [isrc](XiphComment.md#isrc)
- [joinedAlbumArtists](XiphComment.md#joinedalbumartists)
- [joinedComposers](XiphComment.md#joinedcomposers)
- [joinedGenres](XiphComment.md#joinedgenres)
- [joinedPerformers](XiphComment.md#joinedperformers)
- [joinedPerformersSort](XiphComment.md#joinedperformerssort)
- [lyrics](XiphComment.md#lyrics)
- [musicBrainzArtistId](XiphComment.md#musicbrainzartistid)
- [musicBrainzDiscId](XiphComment.md#musicbrainzdiscid)
- [musicBrainzReleaseArtistId](XiphComment.md#musicbrainzreleaseartistid)
- [musicBrainzReleaseCountry](XiphComment.md#musicbrainzreleasecountry)
- [musicBrainzReleaseGroupId](XiphComment.md#musicbrainzreleasegroupid)
- [musicBrainzReleaseId](XiphComment.md#musicbrainzreleaseid)
- [musicBrainzReleaseStatus](XiphComment.md#musicbrainzreleasestatus)
- [musicBrainzReleaseType](XiphComment.md#musicbrainzreleasetype)
- [musicBrainzTrackId](XiphComment.md#musicbrainztrackid)
- [musicIpId](XiphComment.md#musicipid)
- [performers](XiphComment.md#performers)
- [performersRole](XiphComment.md#performersrole)
- [performersSort](XiphComment.md#performerssort)
- [pictures](XiphComment.md#pictures)
- [publisher](XiphComment.md#publisher)
- [remixedBy](XiphComment.md#remixedby)
- [replayGainAlbumGain](XiphComment.md#replaygainalbumgain)
- [replayGainAlbumPeak](XiphComment.md#replaygainalbumpeak)
- [replayGainTrackGain](XiphComment.md#replaygaintrackgain)
- [replayGainTrackPeak](XiphComment.md#replaygaintrackpeak)
- [sizeOnDisk](XiphComment.md#sizeondisk)
- [subtitle](XiphComment.md#subtitle)
- [tagTypes](XiphComment.md#tagtypes)
- [title](XiphComment.md#title)
- [titleSort](XiphComment.md#titlesort)
- [track](XiphComment.md#track)
- [trackCount](XiphComment.md#trackcount)
- [vendorId](XiphComment.md#vendorid)
- [year](XiphComment.md#year)

### Methods

- [clear](XiphComment.md#clear)
- [copyTo](XiphComment.md#copyto)
- [getField](XiphComment.md#getfield)
- [getFieldFirstValue](XiphComment.md#getfieldfirstvalue)
- [removeField](XiphComment.md#removefield)
- [render](XiphComment.md#render)
- [setFieldAsStrings](XiphComment.md#setfieldasstrings)
- [setFieldAsUint](XiphComment.md#setfieldasuint)
- [setInfoTag](XiphComment.md#setinfotag)
- [firstInGroup](XiphComment.md#firstingroup)
- [fromData](XiphComment.md#fromdata)
- [fromEmpty](XiphComment.md#fromempty)
- [isFalsyOrLikeEmpty](XiphComment.md#isfalsyorlikeempty)
- [joinGroup](XiphComment.md#joingroup)
- [tagTypeFlagsToArray](XiphComment.md#tagtypeflagstoarray)

## Accessors

### album

• `get` **album**(): `string`

**`inheritdoc`** `ALBUM` field

#### Returns

`string`

#### Overrides

Tag.album

• `set` **album**(`value`): `void`

**`inheritdoc`** `ALBUM` field

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

**`inheritdoc`** `ALBUMARTIST` as per standard, though `ALBUM ARTIST` and `ENSEMBLE` will be
    checked if `ALBUMARTIST` is not set.

#### Returns

`string`[]

#### Overrides

Tag.albumArtists

• `set` **albumArtists**(`value`): `void`

**`inheritdoc`** `ALBUMARTIST`, as per the standard

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

**`inheritdoc`** `ALBUMARTISTSORT` field

#### Returns

`string`[]

#### Overrides

Tag.albumArtistsSort

• `set` **albumArtistsSort**(`value`): `void`

**`inheritdoc`** `ALBUMARTISTSORT` field

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

**`inheritdoc`** `ALBUMSORT` field

#### Returns

`string`

#### Overrides

Tag.albumSort

• `set` **albumSort**(`value`): `void`

**`inheritdoc`** `ALBUMSORT` field

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

**`inheritdoc`** `ASIN` field

#### Returns

`string`

#### Overrides

Tag.amazonId

• `set` **amazonId**(`value`): `void`

**`inheritdoc`** `ASIN` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Overrides

Tag.amazonId

___

### beatsPerMinute

• `get` **beatsPerMinute**(): `number`

**`inheritdoc`** `TEMPO` field preferentially, BPM field is used as a fallback.

**`remarks`** The field that stores the value will be used when setting a BPM in the future. This
    behavior can be controlled via {@link XiphSettings.useTempoToStoreBpm}.

#### Returns

`number`

#### Overrides

Tag.beatsPerMinute

• `set` **beatsPerMinute**(`value`): `void`

**`inheritdoc`**

**`remarks`** Value is stored via `TEMPO` field if {@link XiphSettings.useTempoToStoreBpm} is
    `true`. Value is stored via `BPM` if {@link XiphSettings.useTempoToStoreBpm} is `false`.
    The other field is removed when stored.

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

**`inheritdoc`** `COMMENT` field

#### Returns

`string`

#### Overrides

Tag.comment

• `set` **comment**(`value`): `void`

**`inheritdoc`** `COMMENT` field

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

**`inheritdoc`** `COMPOSER` field

#### Returns

`string`[]

#### Overrides

Tag.composers

• `set` **composers**(`value`): `void`

**`inheritdoc`** `COMPOSER` field

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

**`inheritdoc`** `COMPOSERSORT` field

#### Returns

`string`[]

#### Overrides

Tag.composersSort

• `set` **composersSort**(`value`): `void`

**`inheritdoc`** `COMPOSERSORT` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string`[] |

#### Returns

`void`

#### Overrides

Tag.composersSort

___

### conductor

• `get` **conductor**(): `string`

**`inheritdoc`** `CONDUCTOR` field

#### Returns

`string`

#### Overrides

Tag.conductor

• `set` **conductor**(`value`): `void`

**`inheritdoc`** `CONDUCTOR` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Overrides

Tag.conductor

___

### copyright

• `get` **copyright**(): `string`

**`inheritdoc`** `COPYRIGHT` field

#### Returns

`string`

#### Overrides

Tag.copyright

• `set` **copyright**(`value`): `void`

**`inheritdoc`** `GROUPING` field

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

**`inheritdoc`** `DATETAGGED` field

#### Returns

`Date`

#### Overrides

Tag.dateTagged

• `set` **dateTagged**(`value`): `void`

**`inheritdoc`** `DATETAGGED` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Date` |

#### Returns

`void`

#### Overrides

Tag.dateTagged

___

### description

• `get` **description**(): `string`

**`inheritdoc`** `DESCRIPTION` field

#### Returns

`string`

#### Overrides

Tag.description

• `set` **description**(`value`): `void`

**`inheritdoc`** `DESCRIPTION` field

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

**`inheritdoc`** `DISCNUMBER` field

#### Returns

`number`

#### Overrides

Tag.disc

• `set` **disc**(`value`): `void`

**`inheritdoc`** `DISCNUMBER` field

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

**`inheritdoc`** `DISCTOTAL` as per standard, but the denominator of `DISCNUMBER` is also
    used if `DISCTOTAL` is not available.

#### Returns

`number`

#### Overrides

Tag.discCount

• `set` **discCount**(`value`): `void`

**`inheritdoc`** `DISCTOTAL` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Overrides

Tag.discCount

___

### fieldNames

• `get` **fieldNames**(): `string`[]

Gets the names of the fields currently stored in the list of fields, excluding the pictures.

**`remarks`** This getter is useful for iterating over fields defined in this object in
    conjunction with [getField](XiphComment.md#getfield).

#### Returns

`string`[]

___

### fieldValueCount

• `get` **fieldValueCount**(): `number`

Gets the total number of values contained in the current instance, including the pictures.

#### Returns

`number`

___

### firstAlbumArtist

• `get` **firstAlbumArtist**(): `string`

Gets the first value contained in [albumArtists](XiphComment.md#albumartists).

#### Returns

`string`

#### Inherited from

Tag.firstAlbumArtist

___

### firstAlbumArtistSort

• `get` **firstAlbumArtistSort**(): `string`

Gets the first value contained in [albumArtistsSort](XiphComment.md#albumartistssort)

#### Returns

`string`

#### Inherited from

Tag.firstAlbumArtistSort

___

### firstComposer

• `get` **firstComposer**(): `string`

Gets the first value contained in [composers](XiphComment.md#composers)

#### Returns

`string`

#### Inherited from

Tag.firstComposer

___

### firstComposerSort

• `get` **firstComposerSort**(): `string`

Gets the first value contained in [composersSort](XiphComment.md#composerssort)

#### Returns

`string`

#### Inherited from

Tag.firstComposerSort

___

### firstGenre

• `get` **firstGenre**(): `string`

Gets the first value contained in [genres](XiphComment.md#genres)

#### Returns

`string`

#### Inherited from

Tag.firstGenre

___

### firstPerformer

• `get` **firstPerformer**(): `string`

Gets the first value contained in [performers](XiphComment.md#performers)

#### Returns

`string`

#### Inherited from

Tag.firstPerformer

___

### firstPerformerSort

• `get` **firstPerformerSort**(): `string`

Gets the first value contained in [performersSort](XiphComment.md#performerssort)

#### Returns

`string`

#### Inherited from

Tag.firstPerformerSort

___

### genres

• `get` **genres**(): `string`[]

**`inheritdoc`** `GENRE` field

#### Returns

`string`[]

#### Overrides

Tag.genres

• `set` **genres**(`value`): `void`

**`inheritdoc`** `GENRE` field

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

**`inheritdoc`** `GROUPING` field

#### Returns

`string`

#### Overrides

Tag.grouping

• `set` **grouping**(`value`): `void`

**`inheritdoc`** `GROUPING` field

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

**`inheritdoc`** `INITIALKEY` field

#### Returns

`string`

#### Overrides

Tag.initialKey

• `set` **initialKey**(`value`): `void`

**`inheritdoc`** `INITIALKEY` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Overrides

Tag.initialKey

___

### isCompilation

• `get` **isCompilation**(): `boolean`

**`inheritdoc`** `COMPILATION` field

#### Returns

`boolean`

#### Overrides

Tag.isCompilation

• `set` **isCompilation**(`value`): `void`

**`inheritdoc`** `COMPILATION` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`

#### Overrides

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

**`inheritdoc`** `ISRC` field

#### Returns

`string`

#### Overrides

Tag.isrc

• `set` **isrc**(`value`): `void`

**`inheritdoc`** `ISRC` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Overrides

Tag.isrc

___

### joinedAlbumArtists

• `get` **joinedAlbumArtists**(): `string`

Gets a semicolon and space separated string containing the values in [albumArtists](XiphComment.md#albumartists)

#### Returns

`string`

#### Inherited from

Tag.joinedAlbumArtists

___

### joinedComposers

• `get` **joinedComposers**(): `string`

Gets a semicolon and space separated string containing the values in [composers](XiphComment.md#composers)

#### Returns

`string`

#### Inherited from

Tag.joinedComposers

___

### joinedGenres

• `get` **joinedGenres**(): `string`

Gets a semicolon and space separated string containing the values in [genres](XiphComment.md#genres)

#### Returns

`string`

#### Inherited from

Tag.joinedGenres

___

### joinedPerformers

• `get` **joinedPerformers**(): `string`

Gets a semicolon and space separated string containing the values in [performers](XiphComment.md#performers)

#### Returns

`string`

#### Inherited from

Tag.joinedPerformers

___

### joinedPerformersSort

• `get` **joinedPerformersSort**(): `string`

Gets a semicolon and space separated string containing the values in [performersSort](XiphComment.md#performerssort)

#### Returns

`string`

#### Inherited from

Tag.joinedPerformersSort

___

### lyrics

• `get` **lyrics**(): `string`

**`inheritdoc`** `LYRICS` field

#### Returns

`string`

#### Overrides

Tag.lyrics

• `set` **lyrics**(`value`): `void`

**`inheritdoc`** `LYRICS` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Overrides

Tag.lyrics

___

### musicBrainzArtistId

• `get` **musicBrainzArtistId**(): `string`

**`inheritdoc`** `MUSICBRAINZ_ARTISTID` field

#### Returns

`string`

#### Overrides

Tag.musicBrainzArtistId

• `set` **musicBrainzArtistId**(`value`): `void`

**`inheritdoc`** `MUSICBRAINZ_ARTISTID` field

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

**`inheritdoc`** `MUSICBRAINZ_DISCID` field

#### Returns

`string`

#### Overrides

Tag.musicBrainzDiscId

• `set` **musicBrainzDiscId**(`value`): `void`

**`inheritdoc`** `MUSICBRAINZ_DISCID` field

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

**`inheritdoc`** `MUSICBRAINZ_ALBUMARTISTID` field

#### Returns

`string`

#### Overrides

Tag.musicBrainzReleaseArtistId

• `set` **musicBrainzReleaseArtistId**(`value`): `void`

**`inheritdoc`** `MUSICBRAINZ_ALBUMARTISTID` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Overrides

Tag.musicBrainzReleaseArtistId

___

### musicBrainzReleaseCountry

• `get` **musicBrainzReleaseCountry**(): `string`

**`inheritdoc`** `RELEASECOUNTRY` field

#### Returns

`string`

#### Overrides

Tag.musicBrainzReleaseCountry

• `set` **musicBrainzReleaseCountry**(`value`): `void`

**`inheritdoc`** `RELEASECOUNTRY` field

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

**`inheritdoc`** `MUSICBRAINZ_RELEASEGROUPID` field

#### Returns

`string`

#### Overrides

Tag.musicBrainzReleaseGroupId

• `set` **musicBrainzReleaseGroupId**(`value`): `void`

**`inheritdoc`** `MUSICBRAINZ_RELEASEGROUPID` field

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

**`inheritdoc`** `MUSICBRAINZ_ALBUMID` field

#### Returns

`string`

#### Overrides

Tag.musicBrainzReleaseId

• `set` **musicBrainzReleaseId**(`value`): `void`

**`inheritdoc`** `MUSICBRAINZ_ALBUMID` field

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

**`inheritdoc`** `MUSICBRAINZ_ALBUMSTATUS` field

#### Returns

`string`

#### Overrides

Tag.musicBrainzReleaseStatus

• `set` **musicBrainzReleaseStatus**(`value`): `void`

**`inheritdoc`** `MUSICBRAINZ_ALBUMSTATUS` field

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

**`inheritdoc`** `MUSICBRAINZ_ALBUMTYPE` field

#### Returns

`string`

#### Overrides

Tag.musicBrainzReleaseType

• `set` **musicBrainzReleaseType**(`value`): `void`

**`inheritdoc`** `MUSICBRAINZ_ALBUMTYPE` field

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

**`inheritdoc`** `MUSICBRAINZ_TRACKID` field

#### Returns

`string`

#### Overrides

Tag.musicBrainzTrackId

• `set` **musicBrainzTrackId**(`value`): `void`

**`inheritdoc`** `MUSICBRAINZ_TRACKID` field

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

**`inheritdoc`** `MUSICIP_PUID` field

#### Returns

`string`

#### Overrides

Tag.musicIpId

• `set` **musicIpId**(`value`): `void`

**`inheritdoc`** `MUSICID_PUID` field

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

**`inheritdoc`** `ARTIST` field

#### Returns

`string`[]

#### Overrides

Tag.performers

• `set` **performers**(`value`): `void`

**`inheritdoc`** `ARTIST` field

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

**`inheritdoc`** `ARTISTROLE` field

#### Returns

`string`[]

#### Overrides

Tag.performersRole

• `set` **performersRole**(`value`): `void`

**`inheritdoc`** `ARTISTROLE` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string`[] |

#### Returns

`void`

#### Overrides

Tag.performersRole

___

### performersSort

• `get` **performersSort**(): `string`[]

**`inheritdoc`** `ARTISTSORT` field

#### Returns

`string`[]

#### Overrides

Tag.performersSort

• `set` **performersSort**(`value`): `void`

**`inheritdoc`** `ARTIST` field

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

#### Returns

[`IPicture`](../interfaces/IPicture.md)[]

#### Overrides

Tag.pictures

• `set` **pictures**(`value`): `void`

**`inheritdoc`**

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

**`inheritdoc`** `ORGANIZATION` field

#### Returns

`string`

#### Overrides

Tag.publisher

• `set` **publisher**(`value`): `void`

**`inheritdoc`** `ORGANIZATION` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Overrides

Tag.publisher

___

### remixedBy

• `get` **remixedBy**(): `string`

**`inheritdoc`** `REMIXEDBY` field

#### Returns

`string`

#### Overrides

Tag.remixedBy

• `set` **remixedBy**(`value`): `void`

**`inheritdoc`** `REMIXEDBY` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Overrides

Tag.remixedBy

___

### replayGainAlbumGain

• `get` **replayGainAlbumGain**(): `number`

**`inheritdoc`** `REPLAYGAIN_ALBUM_GAIN` field

#### Returns

`number`

#### Overrides

Tag.replayGainAlbumGain

• `set` **replayGainAlbumGain**(`value`): `void`

**`inheritdoc`** `REPLAYGAIN_ALBUM_GAIN` field

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

**`inheritdoc`** `REPLAYGAIN_ALBUM_PEAK` field

#### Returns

`number`

#### Overrides

Tag.replayGainAlbumPeak

• `set` **replayGainAlbumPeak**(`value`): `void`

**`inheritdoc`** `REPLAYGAIN_TRACK_PEAK` field

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

**`inheritdoc`** `REPLAYGAIN_TRACK_GAIN` field

#### Returns

`number`

#### Overrides

Tag.replayGainTrackGain

• `set` **replayGainTrackGain**(`value`): `void`

**`inheritdoc`** `REPLAYGAIN_TRACK_GAIN` field

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

**`inheritdoc`** `REPLAYGAIN_TRACK_PEAK` field

#### Returns

`number`

#### Overrides

Tag.replayGainTrackPeak

• `set` **replayGainTrackPeak**(`value`): `void`

**`inheritdoc`** `REPLAYGAIN_TRACK_PEAK` field

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

**`inheritdoc`** `SUBTITLE` field

#### Returns

`string`

#### Overrides

Tag.subtitle

• `set` **subtitle**(`value`): `void`

**`inheritdoc`** `SUBTITLE` field

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

**`inheritdoc`** returns [TagTypes.Xiph](../enums/TagTypes.md#xiph)

#### Returns

[`TagTypes`](../enums/TagTypes.md)

#### Overrides

Tag.tagTypes

___

### title

• `get` **title**(): `string`

**`inheritdoc`** `TITLE` field

#### Returns

`string`

#### Overrides

Tag.title

• `set` **title**(`value`): `void`

**`inheritdoc`** `TITLE` field

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

**`inheritdoc`** `TITLESORT` field

#### Returns

`string`

#### Overrides

Tag.titleSort

• `set` **titleSort**(`value`): `void`

**`inheritdoc`** `TITLESORT` field

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

**`inheritdoc`** `TRACKNUMBER` field

#### Returns

`number`

#### Overrides

Tag.track

• `set` **track**(`value`): `void`

**`inheritdoc`** `TRACKNUMBER` field

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

**`inheritdoc`** `TRACKTOTAL` as per standard, but the denominator of `TRACKNUMBER` is also
    used if `TRACKTOTAL` is not available.

#### Returns

`number`

#### Overrides

Tag.trackCount

• `set` **trackCount**(`value`): `void`

**`inheritdoc`** `TRACKNUMBER` field

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Overrides

Tag.trackCount

___

### vendorId

• `get` **vendorId**(): `string`

Gets the vendor ID for the current instance.

#### Returns

`string`

___

### year

• `get` **year**(): `number`

**`inheritdoc`** `DATE` field

#### Returns

`number`

#### Overrides

Tag.year

• `set` **year**(`value`): `void`

**`inheritdoc`** `DATE` field

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

#### Overrides

[Tag](Tag.md).[copyTo](Tag.md#copyto)

___

### getField

▸ **getField**(`key`): `string`[]

Gets the field data for a given field identifier.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Field identifier to look up |

#### Returns

`string`[]

string[] Field data or undefined if the field cannot be found

___

### getFieldFirstValue

▸ **getFieldFirstValue**(`key`): `string`

Gets the first value in a field for a given field identifier.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Field identifier to look up |

#### Returns

`string`

string Field data or `undefined` if the field was notfound

___

### removeField

▸ **removeField**(`key`): `void`

Removes a field and all its values from the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Field identifier to remove |

#### Returns

`void`

___

### render

▸ **render**(`addFramingBit`): [`ByteVector`](ByteVector.md)

Renders the current instance as a raw Xiph comment, optionally adding a framing bit.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addFramingBit` | `boolean` | Whether or not to add a framing bit to the end of the content. |

#### Returns

[`ByteVector`](ByteVector.md)

___

### setFieldAsStrings

▸ **setFieldAsStrings**(`key`, ...`values`): `void`

Sets the contents of a specified field to the provided strings. All values are trimmed and
empty/undefined values are excluded.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Field identifier to set |
| `...values` | `string`[] | Values to store in the current instance |

#### Returns

`void`

___

### setFieldAsUint

▸ **setFieldAsUint**(`key`, `value`, `minPlaces?`): `void`

Sets the contents of a specified field to the provided number.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `key` | `string` | `undefined` | Field identifier to set |
| `value` | `number` | `undefined` | Value to store, must be a positive, 32-bit integer |
| `minPlaces` | `number` | `1` | Number of places to include at a minimum, if the number has fewer places     than this, the value will be padded with zeroes. |

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

### fromData

▸ `Static` **fromData**(`data`, `lazyLoadPictures`): [`XiphComment`](XiphComment.md)

Constructs and initializes a new instance by reading the contents of a raw Xiph comment from
a [ByteVector](ByteVector.md) object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](ByteVector.md) | Object containing a raw Xiph comment, cannot be falsey |
| `lazyLoadPictures` | `boolean` | Whether or not to load pictures lazily |

#### Returns

[`XiphComment`](XiphComment.md)

___

### fromEmpty

▸ `Static` **fromEmpty**(): [`XiphComment`](XiphComment.md)

Constructs and initializes a new instance with no contents.

#### Returns

[`XiphComment`](XiphComment.md)

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
