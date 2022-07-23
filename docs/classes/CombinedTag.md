[node-taglib-sharp](../README.md) / [Exports](../modules.md) / CombinedTag

# Class: CombinedTag

This class provides a unified way of accessing tag data from multiple tag types.

## Hierarchy

- [`Tag`](Tag.md)

  ↳ **`CombinedTag`**

  ↳↳ [`FlacTag`](FlacTag.md)

  ↳↳ [`OggTag`](OggTag.md)

## Table of contents

### Constructors

- [constructor](CombinedTag.md#constructor)

### Accessors

- [album](CombinedTag.md#album)
- [albumArtists](CombinedTag.md#albumartists)
- [albumArtistsSort](CombinedTag.md#albumartistssort)
- [albumSort](CombinedTag.md#albumsort)
- [amazonId](CombinedTag.md#amazonid)
- [beatsPerMinute](CombinedTag.md#beatsperminute)
- [comment](CombinedTag.md#comment)
- [composers](CombinedTag.md#composers)
- [composersSort](CombinedTag.md#composerssort)
- [conductor](CombinedTag.md#conductor)
- [copyright](CombinedTag.md#copyright)
- [dateTagged](CombinedTag.md#datetagged)
- [description](CombinedTag.md#description)
- [disc](CombinedTag.md#disc)
- [discCount](CombinedTag.md#disccount)
- [firstAlbumArtist](CombinedTag.md#firstalbumartist)
- [firstAlbumArtistSort](CombinedTag.md#firstalbumartistsort)
- [firstComposer](CombinedTag.md#firstcomposer)
- [firstComposerSort](CombinedTag.md#firstcomposersort)
- [firstGenre](CombinedTag.md#firstgenre)
- [firstPerformer](CombinedTag.md#firstperformer)
- [firstPerformerSort](CombinedTag.md#firstperformersort)
- [genres](CombinedTag.md#genres)
- [grouping](CombinedTag.md#grouping)
- [initialKey](CombinedTag.md#initialkey)
- [isCompilation](CombinedTag.md#iscompilation)
- [isEmpty](CombinedTag.md#isempty)
- [isrc](CombinedTag.md#isrc)
- [joinedAlbumArtists](CombinedTag.md#joinedalbumartists)
- [joinedComposers](CombinedTag.md#joinedcomposers)
- [joinedGenres](CombinedTag.md#joinedgenres)
- [joinedPerformers](CombinedTag.md#joinedperformers)
- [joinedPerformersSort](CombinedTag.md#joinedperformerssort)
- [lyrics](CombinedTag.md#lyrics)
- [musicBrainzArtistId](CombinedTag.md#musicbrainzartistid)
- [musicBrainzDiscId](CombinedTag.md#musicbrainzdiscid)
- [musicBrainzReleaseArtistId](CombinedTag.md#musicbrainzreleaseartistid)
- [musicBrainzReleaseCountry](CombinedTag.md#musicbrainzreleasecountry)
- [musicBrainzReleaseGroupId](CombinedTag.md#musicbrainzreleasegroupid)
- [musicBrainzReleaseId](CombinedTag.md#musicbrainzreleaseid)
- [musicBrainzReleaseStatus](CombinedTag.md#musicbrainzreleasestatus)
- [musicBrainzReleaseType](CombinedTag.md#musicbrainzreleasetype)
- [musicBrainzTrackId](CombinedTag.md#musicbrainztrackid)
- [musicIpId](CombinedTag.md#musicipid)
- [performers](CombinedTag.md#performers)
- [performersRole](CombinedTag.md#performersrole)
- [performersSort](CombinedTag.md#performerssort)
- [pictures](CombinedTag.md#pictures)
- [publisher](CombinedTag.md#publisher)
- [remixedBy](CombinedTag.md#remixedby)
- [replayGainAlbumGain](CombinedTag.md#replaygainalbumgain)
- [replayGainAlbumPeak](CombinedTag.md#replaygainalbumpeak)
- [replayGainTrackGain](CombinedTag.md#replaygaintrackgain)
- [replayGainTrackPeak](CombinedTag.md#replaygaintrackpeak)
- [sizeOnDisk](CombinedTag.md#sizeondisk)
- [subtitle](CombinedTag.md#subtitle)
- [supportedTagTypes](CombinedTag.md#supportedtagtypes)
- [tagTypes](CombinedTag.md#tagtypes)
- [tags](CombinedTag.md#tags)
- [title](CombinedTag.md#title)
- [titleSort](CombinedTag.md#titlesort)
- [track](CombinedTag.md#track)
- [trackCount](CombinedTag.md#trackcount)
- [year](CombinedTag.md#year)

### Methods

- [addTag](CombinedTag.md#addtag)
- [clear](CombinedTag.md#clear)
- [copyTo](CombinedTag.md#copyto)
- [createTag](CombinedTag.md#createtag)
- [getTag](CombinedTag.md#gettag)
- [removeTags](CombinedTag.md#removetags)
- [replaceTag](CombinedTag.md#replacetag)
- [setInfoTag](CombinedTag.md#setinfotag)
- [validateTagCreation](CombinedTag.md#validatetagcreation)
- [firstInGroup](CombinedTag.md#firstingroup)
- [isFalsyOrLikeEmpty](CombinedTag.md#isfalsyorlikeempty)
- [joinGroup](CombinedTag.md#joingroup)
- [tagTypeFlagsToArray](CombinedTag.md#tagtypeflagstoarray)

## Constructors

### constructor

• `Protected` **new CombinedTag**(`supportedTagTypes`, `writeToAllTags`, `tags?`)

Constructs and initializes a new instance of [CombinedTag](CombinedTag.md).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `supportedTagTypes` | [`TagTypes`](../enums/TagTypes.md) | Types of tags that are supported by this instance of the combined |
| `writeToAllTags` | `boolean` | Whether to write to all tags in the instance (`true`) or to the first     tag in the instance (`false`). |
| `tags?` | [`Tag`](Tag.md)[] | Optionally, a list of tags to combine in the new instance. |

#### Overrides

[Tag](Tag.md).[constructor](Tag.md#constructor)

## Accessors

### album

• `get` **album**(): `string`

**`inheritdoc`**

#### Returns

`string`

#### Overrides

Tag.album

• `set` **album**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Overrides

Tag.album

___

### albumArtists

• `get` **albumArtists**(): `string`[]

**`inheritdoc`**

#### Returns

`string`[]

#### Overrides

Tag.albumArtists

• `set` **albumArtists**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string`[] |

#### Returns

`void`

#### Overrides

Tag.albumArtists

___

### albumArtistsSort

• `get` **albumArtistsSort**(): `string`[]

**`inheritdoc`**

#### Returns

`string`[]

#### Overrides

Tag.albumArtistsSort

• `set` **albumArtistsSort**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string`[] |

#### Returns

`void`

#### Overrides

Tag.albumArtistsSort

___

### albumSort

• `get` **albumSort**(): `string`

**`inheritdoc`**

#### Returns

`string`

#### Overrides

Tag.albumSort

• `set` **albumSort**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Overrides

Tag.albumSort

___

### amazonId

• `get` **amazonId**(): `string`

**`inheritdoc`**

#### Returns

`string`

#### Overrides

Tag.amazonId

• `set` **amazonId**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Overrides

Tag.amazonId

___

### beatsPerMinute

• `get` **beatsPerMinute**(): `number`

**`inheritdoc`**

#### Returns

`number`

#### Overrides

Tag.beatsPerMinute

• `set` **beatsPerMinute**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

#### Overrides

Tag.beatsPerMinute

___

### comment

• `get` **comment**(): `string`

**`inheritdoc`**

#### Returns

`string`

#### Overrides

Tag.comment

• `set` **comment**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Overrides

Tag.comment

___

### composers

• `get` **composers**(): `string`[]

**`inheritdoc`**

#### Returns

`string`[]

#### Overrides

Tag.composers

• `set` **composers**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string`[] |

#### Returns

`void`

#### Overrides

Tag.composers

___

### composersSort

• `get` **composersSort**(): `string`[]

**`inheritdoc`**

#### Returns

`string`[]

#### Overrides

Tag.composersSort

• `set` **composersSort**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string`[] |

#### Returns

`void`

#### Overrides

Tag.composersSort

___

### conductor

• `get` **conductor**(): `string`

**`inheritdoc`**

#### Returns

`string`

#### Overrides

Tag.conductor

• `set` **conductor**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Overrides

Tag.conductor

___

### copyright

• `get` **copyright**(): `string`

**`inheritdoc`**

#### Returns

`string`

#### Overrides

Tag.copyright

• `set` **copyright**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Overrides

Tag.copyright

___

### dateTagged

• `get` **dateTagged**(): `Date`

**`inheritdoc`**

#### Returns

`Date`

#### Overrides

Tag.dateTagged

• `set` **dateTagged**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Date` |

#### Returns

`void`

#### Overrides

Tag.dateTagged

___

### description

• `get` **description**(): `string`

**`inheritdoc`**

#### Returns

`string`

#### Overrides

Tag.description

• `set` **description**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Overrides

Tag.description

___

### disc

• `get` **disc**(): `number`

**`inheritdoc`**

#### Returns

`number`

#### Overrides

Tag.disc

• `set` **disc**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

#### Overrides

Tag.disc

___

### discCount

• `get` **discCount**(): `number`

**`inheritdoc`**

#### Returns

`number`

#### Overrides

Tag.discCount

• `set` **discCount**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

#### Overrides

Tag.discCount

___

### firstAlbumArtist

• `get` **firstAlbumArtist**(): `string`

Gets the first value contained in [albumArtists](CombinedTag.md#albumartists).

#### Returns

`string`

#### Inherited from

Tag.firstAlbumArtist

___

### firstAlbumArtistSort

• `get` **firstAlbumArtistSort**(): `string`

Gets the first value contained in [albumArtistsSort](CombinedTag.md#albumartistssort)

#### Returns

`string`

#### Inherited from

Tag.firstAlbumArtistSort

___

### firstComposer

• `get` **firstComposer**(): `string`

Gets the first value contained in [composers](CombinedTag.md#composers)

#### Returns

`string`

#### Inherited from

Tag.firstComposer

___

### firstComposerSort

• `get` **firstComposerSort**(): `string`

Gets the first value contained in [composersSort](CombinedTag.md#composerssort)

#### Returns

`string`

#### Inherited from

Tag.firstComposerSort

___

### firstGenre

• `get` **firstGenre**(): `string`

Gets the first value contained in [genres](CombinedTag.md#genres)

#### Returns

`string`

#### Inherited from

Tag.firstGenre

___

### firstPerformer

• `get` **firstPerformer**(): `string`

Gets the first value contained in [performers](CombinedTag.md#performers)

#### Returns

`string`

#### Inherited from

Tag.firstPerformer

___

### firstPerformerSort

• `get` **firstPerformerSort**(): `string`

Gets the first value contained in [performersSort](CombinedTag.md#performerssort)

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

• `set` **genres**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string`[] |

#### Returns

`void`

#### Overrides

Tag.genres

___

### grouping

• `get` **grouping**(): `string`

**`inheritdoc`**

#### Returns

`string`

#### Overrides

Tag.grouping

• `set` **grouping**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Overrides

Tag.grouping

___

### initialKey

• `get` **initialKey**(): `string`

**`inheritdoc`**

#### Returns

`string`

#### Overrides

Tag.initialKey

• `set` **initialKey**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Overrides

Tag.initialKey

___

### isCompilation

• `get` **isCompilation**(): `boolean`

**`inheritdoc`**

#### Returns

`boolean`

#### Overrides

Tag.isCompilation

• `set` **isCompilation**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `boolean` |

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

**`inheritdoc`**

#### Returns

`string`

#### Overrides

Tag.isrc

• `set` **isrc**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Overrides

Tag.isrc

___

### joinedAlbumArtists

• `get` **joinedAlbumArtists**(): `string`

Gets a semicolon and space separated string containing the values in [albumArtists](CombinedTag.md#albumartists)

#### Returns

`string`

#### Inherited from

Tag.joinedAlbumArtists

___

### joinedComposers

• `get` **joinedComposers**(): `string`

Gets a semicolon and space separated string containing the values in [composers](CombinedTag.md#composers)

#### Returns

`string`

#### Inherited from

Tag.joinedComposers

___

### joinedGenres

• `get` **joinedGenres**(): `string`

Gets a semicolon and space separated string containing the values in [genres](CombinedTag.md#genres)

#### Returns

`string`

#### Inherited from

Tag.joinedGenres

___

### joinedPerformers

• `get` **joinedPerformers**(): `string`

Gets a semicolon and space separated string containing the values in [performers](CombinedTag.md#performers)

#### Returns

`string`

#### Inherited from

Tag.joinedPerformers

___

### joinedPerformersSort

• `get` **joinedPerformersSort**(): `string`

Gets a semicolon and space separated string containing the values in [performersSort](CombinedTag.md#performerssort)

#### Returns

`string`

#### Inherited from

Tag.joinedPerformersSort

___

### lyrics

• `get` **lyrics**(): `string`

**`inheritdoc`**

#### Returns

`string`

#### Overrides

Tag.lyrics

• `set` **lyrics**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Overrides

Tag.lyrics

___

### musicBrainzArtistId

• `get` **musicBrainzArtistId**(): `string`

**`inheritdoc`**

#### Returns

`string`

#### Overrides

Tag.musicBrainzArtistId

• `set` **musicBrainzArtistId**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Overrides

Tag.musicBrainzArtistId

___

### musicBrainzDiscId

• `get` **musicBrainzDiscId**(): `string`

**`inheritdoc`**

#### Returns

`string`

#### Overrides

Tag.musicBrainzDiscId

• `set` **musicBrainzDiscId**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Overrides

Tag.musicBrainzDiscId

___

### musicBrainzReleaseArtistId

• `get` **musicBrainzReleaseArtistId**(): `string`

**`inheritdoc`**

#### Returns

`string`

#### Overrides

Tag.musicBrainzReleaseArtistId

• `set` **musicBrainzReleaseArtistId**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Overrides

Tag.musicBrainzReleaseArtistId

___

### musicBrainzReleaseCountry

• `get` **musicBrainzReleaseCountry**(): `string`

**`inheritdoc`**

#### Returns

`string`

#### Overrides

Tag.musicBrainzReleaseCountry

• `set` **musicBrainzReleaseCountry**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Overrides

Tag.musicBrainzReleaseCountry

___

### musicBrainzReleaseGroupId

• `get` **musicBrainzReleaseGroupId**(): `string`

**`inheritdoc`**

#### Returns

`string`

#### Overrides

Tag.musicBrainzReleaseGroupId

• `set` **musicBrainzReleaseGroupId**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Overrides

Tag.musicBrainzReleaseGroupId

___

### musicBrainzReleaseId

• `get` **musicBrainzReleaseId**(): `string`

**`inheritdoc`**

#### Returns

`string`

#### Overrides

Tag.musicBrainzReleaseId

• `set` **musicBrainzReleaseId**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Overrides

Tag.musicBrainzReleaseId

___

### musicBrainzReleaseStatus

• `get` **musicBrainzReleaseStatus**(): `string`

**`inheritdoc`**

#### Returns

`string`

#### Overrides

Tag.musicBrainzReleaseStatus

• `set` **musicBrainzReleaseStatus**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Overrides

Tag.musicBrainzReleaseStatus

___

### musicBrainzReleaseType

• `get` **musicBrainzReleaseType**(): `string`

**`inheritdoc`**

#### Returns

`string`

#### Overrides

Tag.musicBrainzReleaseType

• `set` **musicBrainzReleaseType**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Overrides

Tag.musicBrainzReleaseType

___

### musicBrainzTrackId

• `get` **musicBrainzTrackId**(): `string`

**`inheritdoc`**

#### Returns

`string`

#### Overrides

Tag.musicBrainzTrackId

• `set` **musicBrainzTrackId**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Overrides

Tag.musicBrainzTrackId

___

### musicIpId

• `get` **musicIpId**(): `string`

**`inheritdoc`**

#### Returns

`string`

#### Overrides

Tag.musicIpId

• `set` **musicIpId**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Overrides

Tag.musicIpId

___

### performers

• `get` **performers**(): `string`[]

**`inheritdoc`**

#### Returns

`string`[]

#### Overrides

Tag.performers

• `set` **performers**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string`[] |

#### Returns

`void`

#### Overrides

Tag.performers

___

### performersRole

• `get` **performersRole**(): `string`[]

**`inheritdoc`**

#### Returns

`string`[]

#### Overrides

Tag.performersRole

• `set` **performersRole**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string`[] |

#### Returns

`void`

#### Overrides

Tag.performersRole

___

### performersSort

• `get` **performersSort**(): `string`[]

**`inheritdoc`**

#### Returns

`string`[]

#### Overrides

Tag.performersSort

• `set` **performersSort**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string`[] |

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

• `set` **pictures**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | [`IPicture`](../interfaces/IPicture.md)[] |

#### Returns

`void`

#### Overrides

Tag.pictures

___

### publisher

• `get` **publisher**(): `string`

**`inheritdoc`**

#### Returns

`string`

#### Overrides

Tag.publisher

• `set` **publisher**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Overrides

Tag.publisher

___

### remixedBy

• `get` **remixedBy**(): `string`

**`inheritdoc`**

#### Returns

`string`

#### Overrides

Tag.remixedBy

• `set` **remixedBy**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Overrides

Tag.remixedBy

___

### replayGainAlbumGain

• `get` **replayGainAlbumGain**(): `number`

**`inheritdoc`**

#### Returns

`number`

#### Overrides

Tag.replayGainAlbumGain

• `set` **replayGainAlbumGain**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

#### Overrides

Tag.replayGainAlbumGain

___

### replayGainAlbumPeak

• `get` **replayGainAlbumPeak**(): `number`

**`inheritdoc`**

#### Returns

`number`

#### Overrides

Tag.replayGainAlbumPeak

• `set` **replayGainAlbumPeak**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

#### Overrides

Tag.replayGainAlbumPeak

___

### replayGainTrackGain

• `get` **replayGainTrackGain**(): `number`

**`inheritdoc`**

#### Returns

`number`

#### Overrides

Tag.replayGainTrackGain

• `set` **replayGainTrackGain**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

#### Overrides

Tag.replayGainTrackGain

___

### replayGainTrackPeak

• `get` **replayGainTrackPeak**(): `number`

**`inheritdoc`**

#### Returns

`number`

#### Overrides

Tag.replayGainTrackPeak

• `set` **replayGainTrackPeak**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

#### Overrides

Tag.replayGainTrackPeak

___

### sizeOnDisk

• `get` **sizeOnDisk**(): `number`

**`inheritdoc`**

**`remarks`** Note that tags may not appear contiguously in a file. Access the [tags](CombinedTag.md#tags)
    contained in this object to see the size of each tag on the disk.

#### Returns

`number`

#### Overrides

Tag.sizeOnDisk

___

### subtitle

• `get` **subtitle**(): `string`

**`inheritdoc`**

#### Returns

`string`

#### Overrides

Tag.subtitle

• `set` **subtitle**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Overrides

Tag.subtitle

___

### supportedTagTypes

• `get` **supportedTagTypes**(): [`TagTypes`](../enums/TagTypes.md)

Gets the types of tags that are supported by this instance of a combined tag. Only these tag
types can be added to the instance.

#### Returns

[`TagTypes`](../enums/TagTypes.md)

___

### tagTypes

• `get` **tagTypes**(): [`TagTypes`](../enums/TagTypes.md)

**`inheritdoc`**

#### Returns

[`TagTypes`](../enums/TagTypes.md)

#### Overrides

Tag.tagTypes

___

### tags

• `get` **tags**(): [`Tag`](Tag.md)[]

Gets all tags contained within the current instance. If the tags within this tag are also
[CombinedTag](CombinedTag.md)s, the retrieval will recurse and return a flat list of nested tags.

**`remarks`** Modifications of the returned array will not be retained.

#### Returns

[`Tag`](Tag.md)[]

___

### title

• `get` **title**(): `string`

**`inheritdoc`**

#### Returns

`string`

#### Overrides

Tag.title

• `set` **title**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Overrides

Tag.title

___

### titleSort

• `get` **titleSort**(): `string`

**`inheritdoc`**

#### Returns

`string`

#### Overrides

Tag.titleSort

• `set` **titleSort**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

#### Overrides

Tag.titleSort

___

### track

• `get` **track**(): `number`

**`inheritdoc`**

#### Returns

`number`

#### Overrides

Tag.track

• `set` **track**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

#### Overrides

Tag.track

___

### trackCount

• `get` **trackCount**(): `number`

**`inheritdoc`**

#### Returns

`number`

#### Overrides

Tag.trackCount

• `set` **trackCount**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

#### Overrides

Tag.trackCount

___

### year

• `get` **year**(): `number`

**`inheritdoc`**

#### Returns

`number`

#### Overrides

Tag.year

• `set` **year**(`val`): `void`

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

#### Overrides

Tag.year

## Methods

### addTag

▸ `Protected` **addTag**(`tag`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | [`Tag`](Tag.md) |

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

### createTag

▸ `Abstract` **createTag**(`tagType`, `copy`): [`Tag`](Tag.md)

Creates a new instance of the desired tag type and adds it to the current instance. If the
tag type is unsupported in the current context or the tag type already exists, an error will
be thrown.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tagType` | [`TagTypes`](../enums/TagTypes.md) | Type of tag to create |
| `copy` | `boolean` | Whether or not to copy the contents of the current instance to the newly created     tag instance |

#### Returns

[`Tag`](Tag.md)

Tag The newly created tag

___

### getTag

▸ **getTag**<`TTag`\>(`tagType`): `TTag`

Gets a tag of the specified tag type if a matching tag exists in the current instance.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TTag` | extends [`Tag`](Tag.md)<`TTag`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tagType` | [`TagTypes`](../enums/TagTypes.md) | Type of tag to retrieve |

#### Returns

`TTag`

Tag Tag with specified type, if it exists. `undefined` otherwise.

___

### removeTags

▸ **removeTags**(`tagTypes`): `void`

Remove all tags that match the specified tagTypes. This is performed recursively. Any nested
`CombinedTag` instances are left in place.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tagTypes` | [`TagTypes`](../enums/TagTypes.md) | Types of tags to remove |

#### Returns

`void`

___

### replaceTag

▸ `Protected` **replaceTag**(`oldTag`, `newTag`): `void`

This is used for special cases where the order of tags is important.

#### Parameters

| Name | Type |
| :------ | :------ |
| `oldTag` | [`Tag`](Tag.md) |
| `newTag` | [`Tag`](Tag.md) |

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

### validateTagCreation

▸ `Protected` **validateTagCreation**(`tagType`): `void`

Verifies if a tag can be added to the current instance. The criteria for validation are:
* A tag of the given tag type does not already exist
* The given tag type is supported by the current instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tagType` | [`TagTypes`](../enums/TagTypes.md) | Tag type that the caller wants to create |

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

#### Parameters

| Name | Type |
| :------ | :------ |
| `tagTypes` | [`TagTypes`](../enums/TagTypes.md) |

#### Returns

[`TagTypes`](../enums/TagTypes.md)[]

#### Inherited from

[Tag](Tag.md).[tagTypeFlagsToArray](Tag.md#tagtypeflagstoarray)
