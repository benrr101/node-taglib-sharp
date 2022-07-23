[node-taglib-sharp](../README.md) / [Exports](../modules.md) / ApeTag

# Class: ApeTag

Provides a representation of an APEv2 tag which can be read from and written to disk.

## Hierarchy

- [`Tag`](Tag.md)

  ↳ **`ApeTag`**

## Table of contents

### Accessors

- [album](ApeTag.md#album)
- [albumArtists](ApeTag.md#albumartists)
- [albumArtistsSort](ApeTag.md#albumartistssort)
- [albumSort](ApeTag.md#albumsort)
- [amazonId](ApeTag.md#amazonid)
- [beatsPerMinute](ApeTag.md#beatsperminute)
- [comment](ApeTag.md#comment)
- [composers](ApeTag.md#composers)
- [composersSort](ApeTag.md#composerssort)
- [conductor](ApeTag.md#conductor)
- [copyright](ApeTag.md#copyright)
- [dateTagged](ApeTag.md#datetagged)
- [description](ApeTag.md#description)
- [disc](ApeTag.md#disc)
- [discCount](ApeTag.md#disccount)
- [firstAlbumArtist](ApeTag.md#firstalbumartist)
- [firstAlbumArtistSort](ApeTag.md#firstalbumartistsort)
- [firstComposer](ApeTag.md#firstcomposer)
- [firstComposerSort](ApeTag.md#firstcomposersort)
- [firstGenre](ApeTag.md#firstgenre)
- [firstPerformer](ApeTag.md#firstperformer)
- [firstPerformerSort](ApeTag.md#firstperformersort)
- [genres](ApeTag.md#genres)
- [grouping](ApeTag.md#grouping)
- [initialKey](ApeTag.md#initialkey)
- [isCompilation](ApeTag.md#iscompilation)
- [isEmpty](ApeTag.md#isempty)
- [isHeaderPresent](ApeTag.md#isheaderpresent)
- [isrc](ApeTag.md#isrc)
- [items](ApeTag.md#items)
- [joinedAlbumArtists](ApeTag.md#joinedalbumartists)
- [joinedComposers](ApeTag.md#joinedcomposers)
- [joinedGenres](ApeTag.md#joinedgenres)
- [joinedPerformers](ApeTag.md#joinedperformers)
- [joinedPerformersSort](ApeTag.md#joinedperformerssort)
- [lyrics](ApeTag.md#lyrics)
- [musicBrainzArtistId](ApeTag.md#musicbrainzartistid)
- [musicBrainzDiscId](ApeTag.md#musicbrainzdiscid)
- [musicBrainzReleaseArtistId](ApeTag.md#musicbrainzreleaseartistid)
- [musicBrainzReleaseCountry](ApeTag.md#musicbrainzreleasecountry)
- [musicBrainzReleaseGroupId](ApeTag.md#musicbrainzreleasegroupid)
- [musicBrainzReleaseId](ApeTag.md#musicbrainzreleaseid)
- [musicBrainzReleaseStatus](ApeTag.md#musicbrainzreleasestatus)
- [musicBrainzReleaseType](ApeTag.md#musicbrainzreleasetype)
- [musicBrainzTrackId](ApeTag.md#musicbrainztrackid)
- [musicIpId](ApeTag.md#musicipid)
- [performers](ApeTag.md#performers)
- [performersRole](ApeTag.md#performersrole)
- [performersSort](ApeTag.md#performerssort)
- [pictures](ApeTag.md#pictures)
- [publisher](ApeTag.md#publisher)
- [remixedBy](ApeTag.md#remixedby)
- [replayGainAlbumGain](ApeTag.md#replaygainalbumgain)
- [replayGainAlbumPeak](ApeTag.md#replaygainalbumpeak)
- [replayGainTrackGain](ApeTag.md#replaygaintrackgain)
- [replayGainTrackPeak](ApeTag.md#replaygaintrackpeak)
- [sizeOnDisk](ApeTag.md#sizeondisk)
- [subtitle](ApeTag.md#subtitle)
- [tagTypes](ApeTag.md#tagtypes)
- [title](ApeTag.md#title)
- [titleSort](ApeTag.md#titlesort)
- [track](ApeTag.md#track)
- [trackCount](ApeTag.md#trackcount)
- [year](ApeTag.md#year)

### Methods

- [appendStringValue](ApeTag.md#appendstringvalue)
- [appendStringValues](ApeTag.md#appendstringvalues)
- [clear](ApeTag.md#clear)
- [copyTo](ApeTag.md#copyto)
- [getItem](ApeTag.md#getitem)
- [hasItem](ApeTag.md#hasitem)
- [removeItem](ApeTag.md#removeitem)
- [render](ApeTag.md#render)
- [setInfoTag](ApeTag.md#setinfotag)
- [setItem](ApeTag.md#setitem)
- [setNumericValue](ApeTag.md#setnumericvalue)
- [setStringValue](ApeTag.md#setstringvalue)
- [setStringValues](ApeTag.md#setstringvalues)
- [firstInGroup](ApeTag.md#firstingroup)
- [fromData](ApeTag.md#fromdata)
- [fromEmpty](ApeTag.md#fromempty)
- [fromFile](ApeTag.md#fromfile)
- [isFalsyOrLikeEmpty](ApeTag.md#isfalsyorlikeempty)
- [joinGroup](ApeTag.md#joingroup)
- [tagTypeFlagsToArray](ApeTag.md#tagtypeflagstoarray)

## Accessors

### album

• `get` **album**(): `string`

**`inheritdoc`** Album item

#### Returns

`string`

#### Overrides

Tag.album

• `set` **album**(`value`): `void`

**`inheritdoc`** Album item

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
This property is implemented using the "Album Artist" item and "AlbumArtist" as a backup if
it exists.

#### Returns

`string`[]

#### Overrides

Tag.albumArtists

• `set` **albumArtists**(`value`): `void`

**`inheritdoc`**
Will be stored in "Album Artist" primarily. If "AlbumArtist" exists, value will also be
stored there for compatibility.

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

**`inheritdoc`** AlbumArtistSort item

#### Returns

`string`[]

#### Overrides

Tag.albumArtistsSort

• `set` **albumArtistsSort**(`value`): `void`

**`inheritdoc`** AlbumArtistSort item

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

**`inheritdoc`** AlbumSort item

#### Returns

`string`

#### Overrides

Tag.albumSort

• `set` **albumSort**(`value`): `void`

**`inheritdoc`** AlbumSort item

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

**`inheritdoc`** ASIN item

#### Returns

`string`

#### Overrides

Tag.amazonId

• `set` **amazonId**(`value`): `void`

**`inheritdoc`** ASIN item

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

**`inheritdoc`** BPM item

#### Returns

`number`

#### Overrides

Tag.beatsPerMinute

• `set` **beatsPerMinute**(`value`): `void`

**`inheritdoc`** BPM item

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

**`inheritdoc`** Comment item

#### Returns

`string`

#### Overrides

Tag.comment

• `set` **comment**(`value`): `void`

**`inheritdoc`** Comment item

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

**`inheritdoc`** Composer item

#### Returns

`string`[]

#### Overrides

Tag.composers

• `set` **composers**(`value`): `void`

**`inheritdoc`** Composer item

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

**`inheritdoc`** ComposerSort item

#### Returns

`string`[]

#### Overrides

Tag.composersSort

• `set` **composersSort**(`value`): `void`

**`inheritdoc`** ComposerSort

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

**`inheritdoc`** Conductor item

#### Returns

`string`

#### Overrides

Tag.conductor

• `set` **conductor**(`value`): `void`

**`inheritdoc`** Conductor item

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

**`inheritdoc`** Copyright item

#### Returns

`string`

#### Overrides

Tag.copyright

• `set` **copyright**(`value`): `void`

**`inheritdoc`** Copyright item

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

**`inheritdoc`** DateTagged item

#### Returns

`Date`

#### Overrides

Tag.dateTagged

• `set` **dateTagged**(`value`): `void`

**`inheritdoc`** DateTagged item

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

**`inheritdoc`** Description item

#### Returns

`string`

#### Overrides

Tag.description

• `set` **description**(`value`): `void`

**`inheritdoc`** Description item

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

**`inheritdoc`** Disc item numerator

#### Returns

`number`

#### Overrides

Tag.disc

• `set` **disc**(`value`): `void`

**`inheritdoc`** Disc item numerator

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

**`inheritdoc`** Disc item denominator

#### Returns

`number`

#### Overrides

Tag.discCount

• `set` **discCount**(`value`): `void`

**`inheritdoc`** Disc item denominator

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Overrides

Tag.discCount

___

### firstAlbumArtist

• `get` **firstAlbumArtist**(): `string`

Gets the first value contained in [albumArtists](ApeTag.md#albumartists).

#### Returns

`string`

#### Inherited from

Tag.firstAlbumArtist

___

### firstAlbumArtistSort

• `get` **firstAlbumArtistSort**(): `string`

Gets the first value contained in [albumArtistsSort](ApeTag.md#albumartistssort)

#### Returns

`string`

#### Inherited from

Tag.firstAlbumArtistSort

___

### firstComposer

• `get` **firstComposer**(): `string`

Gets the first value contained in [composers](ApeTag.md#composers)

#### Returns

`string`

#### Inherited from

Tag.firstComposer

___

### firstComposerSort

• `get` **firstComposerSort**(): `string`

Gets the first value contained in [composersSort](ApeTag.md#composerssort)

#### Returns

`string`

#### Inherited from

Tag.firstComposerSort

___

### firstGenre

• `get` **firstGenre**(): `string`

Gets the first value contained in [genres](ApeTag.md#genres)

#### Returns

`string`

#### Inherited from

Tag.firstGenre

___

### firstPerformer

• `get` **firstPerformer**(): `string`

Gets the first value contained in [performers](ApeTag.md#performers)

#### Returns

`string`

#### Inherited from

Tag.firstPerformer

___

### firstPerformerSort

• `get` **firstPerformerSort**(): `string`

Gets the first value contained in [performersSort](ApeTag.md#performerssort)

#### Returns

`string`

#### Inherited from

Tag.firstPerformerSort

___

### genres

• `get` **genres**(): `string`[]

**`inheritdoc`** Genre item

#### Returns

`string`[]

#### Overrides

Tag.genres

• `set` **genres**(`value`): `void`

**`inheritdoc`** Genre item

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

**`inheritdoc`** Grouping item

#### Returns

`string`

#### Overrides

Tag.grouping

• `set` **grouping**(`value`): `void`

**`inheritdoc`** Grouping item

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

### isHeaderPresent

• `get` **isHeaderPresent**(): `boolean`

Gets whether or not the current instance has a header when rendered.

#### Returns

`boolean`

• `set` **isHeaderPresent**(`value`): `void`

Sets whether or not the current instance has a header when rendered.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`

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

### items

• `get` **items**(): `ApeTagItem`[]

Gets all items stored in the current instance

#### Returns

`ApeTagItem`[]

___

### joinedAlbumArtists

• `get` **joinedAlbumArtists**(): `string`

Gets a semicolon and space separated string containing the values in [albumArtists](ApeTag.md#albumartists)

#### Returns

`string`

#### Inherited from

Tag.joinedAlbumArtists

___

### joinedComposers

• `get` **joinedComposers**(): `string`

Gets a semicolon and space separated string containing the values in [composers](ApeTag.md#composers)

#### Returns

`string`

#### Inherited from

Tag.joinedComposers

___

### joinedGenres

• `get` **joinedGenres**(): `string`

Gets a semicolon and space separated string containing the values in [genres](ApeTag.md#genres)

#### Returns

`string`

#### Inherited from

Tag.joinedGenres

___

### joinedPerformers

• `get` **joinedPerformers**(): `string`

Gets a semicolon and space separated string containing the values in [performers](ApeTag.md#performers)

#### Returns

`string`

#### Inherited from

Tag.joinedPerformers

___

### joinedPerformersSort

• `get` **joinedPerformersSort**(): `string`

Gets a semicolon and space separated string containing the values in [performersSort](ApeTag.md#performerssort)

#### Returns

`string`

#### Inherited from

Tag.joinedPerformersSort

___

### lyrics

• `get` **lyrics**(): `string`

**`inheritdoc`** Lyrics item

#### Returns

`string`

#### Overrides

Tag.lyrics

• `set` **lyrics**(`value`): `void`

**`inheritdoc`** Lyrics item

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

**`inheritdoc`** MUSICBRAINZ_ARTISTID item

#### Returns

`string`

#### Overrides

Tag.musicBrainzArtistId

• `set` **musicBrainzArtistId**(`value`): `void`

**`inheritdoc`** MUSICBRAINZ_ARTISTID item

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

**`inheritdoc`** MUSICBRAINZ_DISCID item

#### Returns

`string`

#### Overrides

Tag.musicBrainzDiscId

• `set` **musicBrainzDiscId**(`value`): `void`

**`inheritdoc`** MUSICBRAINZ_DISCID item

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

**`inheritdoc`** MUSICBRAINZ_ARTISTID item

#### Returns

`string`

#### Overrides

Tag.musicBrainzReleaseArtistId

• `set` **musicBrainzReleaseArtistId**(`value`): `void`

**`inheritdoc`** MUSICBRAINZ_ARTISTID item

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

**`inheritdoc`** RELEASECOUNTRY item

#### Returns

`string`

#### Overrides

Tag.musicBrainzReleaseCountry

• `set` **musicBrainzReleaseCountry**(`value`): `void`

**`inheritdoc`** RELEASECOUNTRY item

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

**`inheritdoc`** MUSICBRAINZ_RELEASEGROUPID item

#### Returns

`string`

#### Overrides

Tag.musicBrainzReleaseGroupId

• `set` **musicBrainzReleaseGroupId**(`value`): `void`

**`inheritdoc`** MUSICBRAINZ_RELEASEGROUPID item

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

**`inheritdoc`** MUSICBRAINZ_ALBUMID item

#### Returns

`string`

#### Overrides

Tag.musicBrainzReleaseId

• `set` **musicBrainzReleaseId**(`value`): `void`

**`inheritdoc`** MUSICBRAINZ_ALBUMID item

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

**`inheritdoc`** MUSICBRAINZ_ALBUMSTATUS item

#### Returns

`string`

#### Overrides

Tag.musicBrainzReleaseStatus

• `set` **musicBrainzReleaseStatus**(`value`): `void`

**`inheritdoc`** MUSICBRAINZ_ALBUMSTATUS item

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

**`inheritdoc`** MUSICBRAINZ_ALBUMTYPE item

#### Returns

`string`

#### Overrides

Tag.musicBrainzReleaseType

• `set` **musicBrainzReleaseType**(`value`): `void`

**`inheritdoc`** MUSICBRAINZ_ALBUMTYPE item

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

**`inheritdoc`** MUSICBRAINZ_TRACKID item

#### Returns

`string`

#### Overrides

Tag.musicBrainzTrackId

• `set` **musicBrainzTrackId**(`value`): `void`

**`inheritdoc`** MUSICBRAINZ_TRACKID item

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

**`inheritdoc`** MUSICIP_PUID item

#### Returns

`string`

#### Overrides

Tag.musicIpId

• `set` **musicIpId**(`value`): `void`

**`inheritdoc`** MUSICIP_PUID item

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

**`inheritdoc`** Artist item

#### Returns

`string`[]

#### Overrides

Tag.performers

• `set` **performers**(`value`): `void`

**`inheritdoc`** Artist item

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

**`inheritdoc`** PerformersRole item

#### Returns

`string`[]

#### Overrides

Tag.performersRole

• `set` **performersRole**(`value`): `void`

**`inheritdoc`** PerformersRole item

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

**`inheritdoc`** ArtistSort item

#### Returns

`string`[]

#### Overrides

Tag.performersSort

• `set` **performersSort**(`value`): `void`

**`inheritdoc`** ArtistSort item

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

**`inheritdoc`** Cover Art items

#### Returns

[`IPicture`](../interfaces/IPicture.md)[]

#### Overrides

Tag.pictures

• `set` **pictures**(`value`): `void`

**`inheritdoc`** Cover Art items

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

**`inheritdoc`** REPLAYGAIN_ALBUM_GAIN item

#### Returns

`number`

#### Overrides

Tag.replayGainAlbumGain

• `set` **replayGainAlbumGain**(`value`): `void`

**`inheritdoc`** REPLAYGAIN_ALBUM_GAIN item

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

**`inheritdoc`** REPLAYGAIN_ALBUM_PEAK item

#### Returns

`number`

#### Overrides

Tag.replayGainAlbumPeak

• `set` **replayGainAlbumPeak**(`value`): `void`

**`inheritdoc`** REPLAYGAIN_ALBUM_PEAK item

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

**`inheritdoc`** REPLAYGAIN_TRACK_GAIN item

#### Returns

`number`

#### Overrides

Tag.replayGainTrackGain

• `set` **replayGainTrackGain**(`value`): `void`

**`inheritdoc`** REPLAYGAIN_TRACK_GAIN item

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

**`inheritdoc`** REPLAYGAIN_TRACK_PEAK item

#### Returns

`number`

#### Overrides

Tag.replayGainTrackPeak

• `set` **replayGainTrackPeak**(`value`): `void`

**`inheritdoc`** REPLAYGAIN_TRACK_PEAK item

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

**`inheritdoc`** Subtitle item

#### Returns

`string`

#### Overrides

Tag.subtitle

• `set` **subtitle**(`value`): `void`

**`inheritdoc`** Subtitle

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

**`inheritdoc`** Title item

#### Returns

`string`

#### Overrides

Tag.title

• `set` **title**(`value`): `void`

**`inheritdoc`** Title item

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

**`inheritdoc`** TitleSort item

#### Returns

`string`

#### Overrides

Tag.titleSort

• `set` **titleSort**(`value`): `void`

**`inheritdoc`** TitleSort item

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

**`inheritdoc`** Track item numerator

#### Returns

`number`

#### Overrides

Tag.track

• `set` **track**(`value`): `void`

**`inheritdoc`** Track item numerator

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

**`inheritdoc`** Track item denominator

#### Returns

`number`

#### Overrides

Tag.trackCount

• `set` **trackCount**(`value`): `void`

**`inheritdoc`** Track item denominator

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

**`inheritdoc`** Year item

#### Returns

`number`

#### Overrides

Tag.year

• `set` **year**(`value`): `void`

**`inheritdoc`** Year item

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Overrides

Tag.year

## Methods

### appendStringValue

▸ **appendStringValue**(`key`, `value`): `void`

Adds a single value to the contents of an item. Creates a new item if one does not exist.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Key to use to lookup to item to add `value` to |
| `value` | `string` | Values to add to item identified by `key` |

#### Returns

`void`

___

### appendStringValues

▸ **appendStringValues**(`key`, `values`): `void`

Adds a lists of strings to the values stored in a specified item. Creates a new item if one
does not already exist.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Key to use to lookup the item |
| `values` | `string`[] | Values to add to the item |

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

| Name | Type |
| :------ | :------ |
| `target` | [`Tag`](Tag.md) |
| `overwrite` | `boolean` |

#### Returns

`void`

#### Overrides

[Tag](Tag.md).[copyTo](Tag.md#copyto)

___

### getItem

▸ **getItem**(`key`): `ApeTagItem`

Gets an item from the current instance identified by `key`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Identifier for the item to get |

#### Returns

`ApeTagItem`

ApeTagItem Item specified by `key` if it exists, undefined is
    returned otherwise

___

### hasItem

▸ **hasItem**(`key`): `boolean`

Determines if any items with the specified `key` exist in the current instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Identifier for looking up a matching item |

#### Returns

`boolean`

boolean `true` if an item with the specified key exists, `false` otherwise

___

### removeItem

▸ **removeItem**(`key`): `void`

Removes all items from the current instance with the specified `key`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Identifier of the items to remove. |

#### Returns

`void`

___

### render

▸ **render**(): [`ByteVector`](ByteVector.md)

Renders the current instance as a raw APEv2 tag.

#### Returns

[`ByteVector`](ByteVector.md)

ByteVector Bytes that represent the current instance

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

### setItem

▸ **setItem**(`item`): `void`

Adds an item to the current instance, replacing an existing one with the same key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | `ApeTagItem` | Item to add to the current instance |

#### Returns

`void`

___

### setNumericValue

▸ **setNumericValue**(`key`, `numerator`, `denominator`): `void`

Stores a number in a specified item. If both `numerator` and
`denominator` are provided the item will be set to `numerator/denominator`. If
neither `numerator` nor `denominator` are provided, the item will be
removed from this tag. A new item is created if one with the specified `key` does
not exist.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Identifier for the item to set the item |
| `numerator` | `number` | Whole number of top half of the fraction if `denominator` is     provided |
| `denominator` | `number` | Bottom half of the fraction to store. Can be `undefined` if only     `numerator` is needed. |

#### Returns

`void`

___

### setStringValue

▸ **setStringValue**(`key`, `value`): `void`

Stores a string in the item specified by `key`. This will replace the contents of
the specified item. If `value` is falsy, the item will be removed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Item to set the value of |
| `value` | `string` | String to store in the item. If falsy, the specified item will be removed |

#### Returns

`void`

___

### setStringValues

▸ **setStringValues**(`key`, `values`): `void`

Stores a list of strings in the item specified by `key`. This will replace the
contents of the specified item. If `value` is falsy or empty, the item will be removed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Item to set the value of |
| `values` | `string`[] | String to store in the item. If falsy or empty, the specified item will be     removed |

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

▸ `Static` **fromData**(`data`): [`ApeTag`](ApeTag.md)

Constructs and initializes a new instance by reading the contents of a raw tag in a
specified [ByteVector](ByteVector.md) object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](ByteVector.md) | Object containing the raw tag |

#### Returns

[`ApeTag`](ApeTag.md)

___

### fromEmpty

▸ `Static` **fromEmpty**(): [`ApeTag`](ApeTag.md)

Constructs an empty APEv2 tag.

#### Returns

[`ApeTag`](ApeTag.md)

___

### fromFile

▸ `Static` **fromFile**(`file`, `position`): [`ApeTag`](ApeTag.md)

Constructs a new instance by reading the contents from a specified position in a specified
file.

**`remarks`** If `position` points to the beginning of the tag footer, the footer will be read
    and then the parser will backup and start reading from the beginning of the file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | [`File`](File.md) | File to read the tag from |
| `position` | `number` | Position where the tag header or footer begins |

#### Returns

[`ApeTag`](ApeTag.md)

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
