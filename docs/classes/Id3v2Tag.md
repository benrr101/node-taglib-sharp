[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2Tag

# Class: Id3v2Tag

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
- [parse](Id3v2Tag.md#parse)
- [readFromEnd](Id3v2Tag.md#readfromend)
- [readFromStart](Id3v2Tag.md#readfromstart)
- [removeFrame](Id3v2Tag.md#removeframe)
- [removeFrames](Id3v2Tag.md#removeframes)
- [render](Id3v2Tag.md#render)
- [replaceFrame](Id3v2Tag.md#replaceframe)
- [setInfoTag](Id3v2Tag.md#setinfotag)
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

**`inheritdoc`** TALB frame

#### Returns

`string`

#### Overrides

Tag.album

• `set` **album**(`value`): `void`

**`inheritdoc`** TALB frame

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

**`inheritdoc`** TSO2 frame

#### Returns

`string`[]

#### Overrides

Tag.albumArtists

• `set` **albumArtists**(`value`): `void`

**`inheritdoc`** TSO2 frame

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

**`inheritdoc`** TPE2 frame

#### Returns

`string`[]

#### Overrides

Tag.albumArtistsSort

• `set` **albumArtistsSort**(`value`): `void`

**`inheritdoc`** TPE2 frame

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

**`inheritdoc`** TSOA frame

#### Returns

`string`

#### Overrides

Tag.albumSort

• `set` **albumSort**(`value`): `void`

**`inheritdoc`** TSOA frame

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

**`inheritdoc`** TXXX:ASIN

#### Returns

`string`

#### Overrides

Tag.amazonId

• `set` **amazonId**(`value`): `void`

**`inheritdoc`** TXXX:ASIN

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

**`inheritdoc`** TBPM frame

#### Returns

`number`

#### Overrides

Tag.beatsPerMinute

• `set` **beatsPerMinute**(`value`): `void`

**`inheritdoc`** TBPM frame

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

**`inheritdoc`** COMM frame

#### Returns

`string`

#### Overrides

Tag.comment

• `set` **comment**(`value`): `void`

**`inheritdoc`** COMM frame

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

**`inheritdoc`** TCOM frame

#### Returns

`string`[]

#### Overrides

Tag.composers

• `set` **composers**(`value`): `void`

**`inheritdoc`** TCOM frame

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

**`inheritdoc`** TSOC frame

#### Returns

`string`[]

#### Overrides

Tag.composersSort

• `set` **composersSort**(`value`): `void`

**`inheritdoc`** TSOC frame

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

**`inheritdoc`** TPE3 frame

#### Returns

`string`

#### Overrides

Tag.conductor

• `set` **conductor**(`value`): `void`

**`inheritdoc`** TPE3 frame

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

**`inheritdoc`** TCOP frame

#### Returns

`string`

#### Overrides

Tag.copyright

• `set` **copyright**(`value`): `void`

**`inheritdoc`** TCOP frame

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

**`inheritdoc`** TDTG frame

#### Returns

`Date`

#### Overrides

Tag.dateTagged

• `set` **dateTagged**(`value`): `void`

**`inheritdoc`** TDTG frame

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

**`inheritdoc`** user text frame "description"

#### Returns

`string`

#### Overrides

Tag.description

• `set` **description**(`value`): `void`

**`inheritdoc`** user text frame "description"

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

**`inheritdoc`** TPOS frame

#### Returns

`number`

#### Overrides

Tag.disc

• `set` **disc**(`value`): `void`

**`inheritdoc`** TPOS frame

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

**`inheritdoc`** TPOS frame

#### Returns

`number`

#### Overrides

Tag.discCount

• `set` **discCount**(`value`): `void`

**`inheritdoc`** TPOS frame

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
| `value` | [`Id3v2TagHeaderFlags`](../enums/Id3v2TagHeaderFlags.md) | Bitwise combined [Id3v2TagHeaderFlags](../enums/Id3v2TagHeaderFlags.md) value containing flags applied to the     current instance. |

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

**`inheritdoc`** TCON frame

#### Returns

`string`[]

#### Overrides

Tag.genres

• `set` **genres**(`value`): `void`

**`inheritdoc`** TCON frame

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

**`inheritdoc`** TIT1 frame

#### Returns

`string`

#### Overrides

Tag.grouping

• `set` **grouping**(`value`): `void`

**`inheritdoc`** TIT1 frame

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

**`inheritdoc`** TKEY frame

#### Returns

`string`

#### Overrides

Tag.initialKey

• `set` **initialKey**(`value`): `void`

**`inheritdoc`** TKEY frame

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

**`inheritdoc`**

**`remarks`** This property is implemented using the TCMP Text Information Frame to provide
support for a feature of the Apple iPod and iTunes products (ie, this is a non-standard
field).

#### Returns

`boolean`

#### Overrides

Tag.isCompilation

• `set` **isCompilation**(`value`): `void`

**`inheritdoc`**

**`remarks`** This property is implemented using the TCMP Text Information Frame to provide
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

**`inheritdoc`**

#### Returns

`boolean`

#### Overrides

Tag.isEmpty

___

### isrc

• `get` **isrc**(): `string`

**`inheritdoc`** TSRC frame

#### Returns

`string`

#### Overrides

Tag.isrc

• `set` **isrc**(`value`): `void`

**`inheritdoc`** TSRC frame

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

**`inheritdoc`** USLT frame

#### Returns

`string`

#### Overrides

Tag.lyrics

• `set` **lyrics**(`value`): `void`

**`inheritdoc`** USLT frame

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

**`inheritdoc`** TXXX:MusicBrainz Artist Id frame

#### Returns

`string`

#### Overrides

Tag.musicBrainzArtistId

• `set` **musicBrainzArtistId**(`value`): `void`

**`inheritdoc`** TXXX:MusicBrainz Artist Id frame

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

**`inheritdoc`** TXXX:MusicBrainz Disc Id frame

#### Returns

`string`

#### Overrides

Tag.musicBrainzDiscId

• `set` **musicBrainzDiscId**(`value`): `void`

**`inheritdoc`** TXXX:MusicBrainz Disc Id frame

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

**`inheritdoc`** TXXX:MusicBrainz Album Artist Id frame

#### Returns

`string`

#### Overrides

Tag.musicBrainzReleaseArtistId

• `set` **musicBrainzReleaseArtistId**(`value`): `void`

**`inheritdoc`** TXXX:MusicBrainz Album Artist Id frame

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

**`inheritdoc`** TXXX:MusicBrainz Album Release Country frame

#### Returns

`string`

#### Overrides

Tag.musicBrainzReleaseCountry

• `set` **musicBrainzReleaseCountry**(`value`): `void`

**`inheritdoc`** TXXX:MusicBrainz Album Release Country frame

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

**`inheritdoc`** TXXX:MusicBrainz Release Group Id frame

#### Returns

`string`

#### Overrides

Tag.musicBrainzReleaseGroupId

• `set` **musicBrainzReleaseGroupId**(`value`): `void`

**`inheritdoc`** TXXX:MusicBrainz Release Group Id frame

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

**`inheritdoc`** TXXX:MusicBrainz Album Id frame

#### Returns

`string`

#### Overrides

Tag.musicBrainzReleaseId

• `set` **musicBrainzReleaseId**(`value`): `void`

**`inheritdoc`** TXXX:MusicBrainz Album Id frame

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

**`inheritdoc`** TXXX:MusicBrainz Album Status frame

#### Returns

`string`

#### Overrides

Tag.musicBrainzReleaseStatus

• `set` **musicBrainzReleaseStatus**(`value`): `void`

**`inheritdoc`** TXXX:MusicBrainz Album Status frame

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

**`inheritdoc`** TXXX:MusicBrainz Album Type frame

#### Returns

`string`

#### Overrides

Tag.musicBrainzReleaseType

• `set` **musicBrainzReleaseType**(`value`): `void`

**`inheritdoc`** TXXX:MusicBrainz Album Type frame

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

**`inheritdoc`** UFID:http://musicbrainz.org frame

#### Returns

`string`

#### Overrides

Tag.musicBrainzTrackId

• `set` **musicBrainzTrackId**(`value`): `void`

**`inheritdoc`** UFID:http://musicbrainz.org frame

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

**`inheritdoc`** TXXX:MusicIP PUID frame

#### Returns

`string`

#### Overrides

Tag.musicIpId

• `set` **musicIpId**(`value`): `void`

**`inheritdoc`** TXXX:MusicIP PUID frame

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

**`inheritdoc`** TPE1 frame

#### Returns

`string`[]

#### Overrides

Tag.performers

• `set` **performers**(`value`): `void`

**`inheritdoc`** TPE1 frame

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

**`inheritdoc`** TMCL frame

#### Returns

`string`[]

#### Overrides

Tag.performersRole

• `set` **performersRole**(`value`): `void`

**`inheritdoc`** TMCL frame

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

**`inheritdoc`** TSOP frame

#### Returns

`string`[]

#### Overrides

Tag.performersSort

• `set` **performersSort**(`value`): `void`

**`inheritdoc`** TSOP frame

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

**`inheritdoc`** APIC frame

#### Returns

[`IPicture`](../interfaces/IPicture.md)[]

#### Overrides

Tag.pictures

• `set` **pictures**(`value`): `void`

**`inheritdoc`** APIC frame

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

**`inheritdoc`** TPUB frame

#### Returns

`string`

#### Overrides

Tag.publisher

• `set` **publisher**(`value`): `void`

**`inheritdoc`** TPUB frame

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

**`inheritdoc`** TPE4 frame

#### Returns

`string`

#### Overrides

Tag.remixedBy

• `set` **remixedBy**(`value`): `void`

**`inheritdoc`** TPE4 frame

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

**`inheritdoc`** TXXX:REPLAYGAIN_ALBUM_GAIN frame

#### Returns

`number`

#### Overrides

Tag.replayGainAlbumGain

• `set` **replayGainAlbumGain**(`value`): `void`

**`inheritdoc`** TXXX:REPLAYGAIN_ALBUM_GAIN frame

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

**`inheritdoc`** TXXX:REPLAYGAIN_ALBUM_PEAK frame

#### Returns

`number`

#### Overrides

Tag.replayGainAlbumPeak

• `set` **replayGainAlbumPeak**(`value`): `void`

**`inheritdoc`** TXXX:REPLAYGAIN_ALBUM_PEAK frame

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

**`inheritdoc`** TXXX:REPLAY_GAIN_TRACK_GAIN frame

#### Returns

`number`

#### Overrides

Tag.replayGainTrackGain

• `set` **replayGainTrackGain**(`value`): `void`

**`inheritdoc`** TXXX:REPLAY_GAIN_TRACK_GAIN frame

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

**`inheritdoc`** TXXX:REPLAYGAIN_TRACK_PEAK frame

#### Returns

`number`

#### Overrides

Tag.replayGainTrackPeak

• `set` **replayGainTrackPeak**(`value`): `void`

**`inheritdoc`** TXXX:REPLAYGAIN_TRACK_PEAK frame

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

**`inheritdoc`** TIT3 frame

#### Returns

`string`

#### Overrides

Tag.subtitle

• `set` **subtitle**(`value`): `void`

**`inheritdoc`** TIT3 frame

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

**`inheritdoc`** TIT2 frame

#### Returns

`string`

#### Overrides

Tag.title

• `set` **title**(`value`): `void`

**`inheritdoc`** TIT2 frame

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

**`inheritdoc`** TSOT frame

#### Returns

`string`

#### Overrides

Tag.titleSort

• `set` **titleSort**(`value`): `void`

**`inheritdoc`** TSOT frame

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

**`inheritdoc`** TRCK frame

#### Returns

`number`

#### Overrides

Tag.track

• `set` **track**(`value`): `void`

**`inheritdoc`** TRCK frame

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

**`inheritdoc`** TRCK frame

#### Returns

`number`

#### Overrides

Tag.trackCount

• `set` **trackCount**(`value`): `void`

**`inheritdoc`** TRCK frame

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

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

**`inheritdoc`**
If a TDRC frame exists, the year will be read from that. If a TDRC frame doesn't exist and a
TYER or TYE frame exists, the year will be read from that. Failing both cases, 0 will be
returned.

#### Returns

`number`

#### Overrides

Tag.year

• `set` **year**(`value`): `void`

**`inheritdoc`**
NOTE: values >9999 will remove the frame

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

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
| `value` | `string` | ISO-639-2 language code to use. If the language is unknown `"   "` is the     appropriate filler |

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

### getFramesByClassType

▸ **getFramesByClassType**<`TFrame`\>(`type`): `TFrame`[]

Gets all frames with a specific frame class type.
NOTE: This diverges from the .NET implementation due to the inability to do type checking
like in .NET (ie `x is y`). Instead type guards are added to each frame class which provides
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

string Text of the specified frame, or `undefined` if no value was found

___

### parse

▸ `Protected` **parse**(`data`, `file`, `position`, `style`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`ByteVector`](ByteVector.md) |
| `file` | [`File`](File.md) |
| `position` | `number` |
| `style` | [`ReadStyle`](../enums/ReadStyle.md) |

#### Returns

`void`

___

### readFromEnd

▸ `Protected` **readFromEnd**(`file`, `position`, `style`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | [`File`](File.md) |
| `position` | `number` |
| `style` | [`ReadStyle`](../enums/ReadStyle.md) |

#### Returns

`void`

___

### readFromStart

▸ `Protected` **readFromStart**(`file`, `position`, `style`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | [`File`](File.md) |
| `position` | `number` |
| `style` | [`ReadStyle`](../enums/ReadStyle.md) |

#### Returns

`void`

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
version specified by [defaultVersion](Id3v2Settings.md#defaultversion). If [forceDefaultVersion](Id3v2Settings.md#forcedefaultversion) is `true`, all
tags will be rendered using that version, except for tags with footers which must be in
version 4.

#### Returns

[`ByteVector`](ByteVector.md)

ByteVector The rendered tag.

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

### setInfoTag

▸ **setInfoTag**(): `void`

Set the tags that represent the tagger software (node-taglib-sharp) itself.

**`remarks`** This is typically a method to call just before saving a tag.

#### Returns

`void`

#### Inherited from

[Tag](Tag.md).[setInfoTag](Tag.md#setinfotag)

___

### setNumberFrame

▸ **setNumberFrame**(`ident`, `numerator`, `denominator`, `minPlaces?`): `void`

Sets the numerical values for a specified text information frame.
If both `numerator` and `denominator` are `0`, the frame will be removed
from the tag. If `denominator` is zero, `numerator` will be stored by
itself. Otherwise the values will be stored as `{numerator}/{denominator}`.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `ident` | [`Id3v2FrameIdentifier`](Id3v2FrameIdentifier.md) | `undefined` | Identity of the frame to set |
| `numerator` | `number` | `undefined` | Value containing the top half of the fraction, or the number if     `denominator` is zero |
| `denominator` | `number` | `undefined` | Value containing the bottom half of the fraction |
| `minPlaces` | `number` | `1` | Minimum number of digits to use to display the `numerator`, if     the numerator has less than this number of digits, it will be filled with leading zeroes. |

#### Returns

`void`

___

### setTextFrame

▸ **setTextFrame**(`ident`, ...`text`): `void`

Sets the text for a specified text information frame.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ident` | [`Id3v2FrameIdentifier`](Id3v2FrameIdentifier.md) | Identifier of the frame to set the data for |
| `...text` | `string`[] | Text to set for the specified frame or `undefined`/`null`/`""` to remove all     frames with that identifier. |

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

Id3v2Tag Tag with the data from the byte vector read into it

___

### fromEmpty

▸ `Static` **fromEmpty**(): [`Id3v2Tag`](Id3v2Tag.md)

#### Returns

[`Id3v2Tag`](Id3v2Tag.md)

___

### fromFileEnd

▸ `Static` **fromFileEnd**(`file`, `position`, `style`): [`Id3v2Tag`](Id3v2Tag.md)

Constructs and initializes a new Tag by reading the end of the tag first.

**`remarks`** This method should only be used if reading tags at the end of a file. Only ID3v2.4
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

**`remarks`** This method is the most flexible way of reading ID3v2 tags.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | [`File`](File.md) | File from which the contents of the new instance is to be read |
| `position` | `number` | Offset into the file where the tag begins |
| `style` | [`ReadStyle`](../enums/ReadStyle.md) | How the data is to be read into the current instance |

#### Returns

[`Id3v2Tag`](Id3v2Tag.md)

Id3v2Tag Tag with the data from the file read into it

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
