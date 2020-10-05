**node-taglib-sharp**

> [README](../README.md) / [Globals](../globals.md) / ["src/id3v1/id3v1Tag"](../modules/_src_id3v1_id3v1tag_.md) / Id3v1Tag

# Class: Id3v1Tag

Extends {@see Tag} to provide support for reading and writing tags stored in the ID3v1.1 format.

## Hierarchy

* [Tag](_src_tag_.tag.md)

  ↳ **Id3v1Tag**

## Index

### Properties

* [fileIdentifier](_src_id3v1_id3v1tag_.id3v1tag.md#fileidentifier)
* [size](_src_id3v1_id3v1tag_.id3v1tag.md#size)

### Accessors

* [album](_src_id3v1_id3v1tag_.id3v1tag.md#album)
* [albumArtists](_src_id3v1_id3v1tag_.id3v1tag.md#albumartists)
* [albumArtistsSort](_src_id3v1_id3v1tag_.id3v1tag.md#albumartistssort)
* [albumSort](_src_id3v1_id3v1tag_.id3v1tag.md#albumsort)
* [amazonId](_src_id3v1_id3v1tag_.id3v1tag.md#amazonid)
* [beatsPerMinute](_src_id3v1_id3v1tag_.id3v1tag.md#beatsperminute)
* [comment](_src_id3v1_id3v1tag_.id3v1tag.md#comment)
* [composers](_src_id3v1_id3v1tag_.id3v1tag.md#composers)
* [composersSort](_src_id3v1_id3v1tag_.id3v1tag.md#composerssort)
* [conductor](_src_id3v1_id3v1tag_.id3v1tag.md#conductor)
* [copyright](_src_id3v1_id3v1tag_.id3v1tag.md#copyright)
* [dateTagged](_src_id3v1_id3v1tag_.id3v1tag.md#datetagged)
* [description](_src_id3v1_id3v1tag_.id3v1tag.md#description)
* [disc](_src_id3v1_id3v1tag_.id3v1tag.md#disc)
* [discCount](_src_id3v1_id3v1tag_.id3v1tag.md#disccount)
* [firstAlbumArtist](_src_id3v1_id3v1tag_.id3v1tag.md#firstalbumartist)
* [firstAlbumArtistSort](_src_id3v1_id3v1tag_.id3v1tag.md#firstalbumartistsort)
* [firstComposer](_src_id3v1_id3v1tag_.id3v1tag.md#firstcomposer)
* [firstComposerSort](_src_id3v1_id3v1tag_.id3v1tag.md#firstcomposersort)
* [firstGenre](_src_id3v1_id3v1tag_.id3v1tag.md#firstgenre)
* [firstPerformer](_src_id3v1_id3v1tag_.id3v1tag.md#firstperformer)
* [firstPerformerSort](_src_id3v1_id3v1tag_.id3v1tag.md#firstperformersort)
* [genres](_src_id3v1_id3v1tag_.id3v1tag.md#genres)
* [grouping](_src_id3v1_id3v1tag_.id3v1tag.md#grouping)
* [initialKey](_src_id3v1_id3v1tag_.id3v1tag.md#initialkey)
* [isEmpty](_src_id3v1_id3v1tag_.id3v1tag.md#isempty)
* [isrc](_src_id3v1_id3v1tag_.id3v1tag.md#isrc)
* [joinedAlbumArtists](_src_id3v1_id3v1tag_.id3v1tag.md#joinedalbumartists)
* [joinedComposers](_src_id3v1_id3v1tag_.id3v1tag.md#joinedcomposers)
* [joinedGenres](_src_id3v1_id3v1tag_.id3v1tag.md#joinedgenres)
* [joinedPerformers](_src_id3v1_id3v1tag_.id3v1tag.md#joinedperformers)
* [joinedPerformersSort](_src_id3v1_id3v1tag_.id3v1tag.md#joinedperformerssort)
* [lyrics](_src_id3v1_id3v1tag_.id3v1tag.md#lyrics)
* [musicBrainzArtistId](_src_id3v1_id3v1tag_.id3v1tag.md#musicbrainzartistid)
* [musicBrainzDiscId](_src_id3v1_id3v1tag_.id3v1tag.md#musicbrainzdiscid)
* [musicBrainzReleaseArtistId](_src_id3v1_id3v1tag_.id3v1tag.md#musicbrainzreleaseartistid)
* [musicBrainzReleaseCountry](_src_id3v1_id3v1tag_.id3v1tag.md#musicbrainzreleasecountry)
* [musicBrainzReleaseGroupId](_src_id3v1_id3v1tag_.id3v1tag.md#musicbrainzreleasegroupid)
* [musicBrainzReleaseId](_src_id3v1_id3v1tag_.id3v1tag.md#musicbrainzreleaseid)
* [musicBrainzReleaseStatus](_src_id3v1_id3v1tag_.id3v1tag.md#musicbrainzreleasestatus)
* [musicBrainzReleaseType](_src_id3v1_id3v1tag_.id3v1tag.md#musicbrainzreleasetype)
* [musicBrainzTrackId](_src_id3v1_id3v1tag_.id3v1tag.md#musicbrainztrackid)
* [musicIpId](_src_id3v1_id3v1tag_.id3v1tag.md#musicipid)
* [performers](_src_id3v1_id3v1tag_.id3v1tag.md#performers)
* [performersRole](_src_id3v1_id3v1tag_.id3v1tag.md#performersrole)
* [performersSort](_src_id3v1_id3v1tag_.id3v1tag.md#performerssort)
* [pictures](_src_id3v1_id3v1tag_.id3v1tag.md#pictures)
* [publisher](_src_id3v1_id3v1tag_.id3v1tag.md#publisher)
* [remixedBy](_src_id3v1_id3v1tag_.id3v1tag.md#remixedby)
* [replayGainAlbumGain](_src_id3v1_id3v1tag_.id3v1tag.md#replaygainalbumgain)
* [replayGainAlbumPeak](_src_id3v1_id3v1tag_.id3v1tag.md#replaygainalbumpeak)
* [replayGainTrackGain](_src_id3v1_id3v1tag_.id3v1tag.md#replaygaintrackgain)
* [replayGainTrackPeak](_src_id3v1_id3v1tag_.id3v1tag.md#replaygaintrackpeak)
* [subtitle](_src_id3v1_id3v1tag_.id3v1tag.md#subtitle)
* [tagTypes](_src_id3v1_id3v1tag_.id3v1tag.md#tagtypes)
* [title](_src_id3v1_id3v1tag_.id3v1tag.md#title)
* [titleSort](_src_id3v1_id3v1tag_.id3v1tag.md#titlesort)
* [track](_src_id3v1_id3v1tag_.id3v1tag.md#track)
* [trackCount](_src_id3v1_id3v1tag_.id3v1tag.md#trackcount)
* [year](_src_id3v1_id3v1tag_.id3v1tag.md#year)

### Methods

* [clear](_src_id3v1_id3v1tag_.id3v1tag.md#clear)
* [copyTo](_src_id3v1_id3v1tag_.id3v1tag.md#copyto)
* [render](_src_id3v1_id3v1tag_.id3v1tag.md#render)
* [setInfoTag](_src_id3v1_id3v1tag_.id3v1tag.md#setinfotag)
* [empty](_src_id3v1_id3v1tag_.id3v1tag.md#empty)
* [firstInGroup](_src_id3v1_id3v1tag_.id3v1tag.md#firstingroup)
* [fromData](_src_id3v1_id3v1tag_.id3v1tag.md#fromdata)
* [fromFile](_src_id3v1_id3v1tag_.id3v1tag.md#fromfile)
* [isNullOrLikeEmpty](_src_id3v1_id3v1tag_.id3v1tag.md#isnullorlikeempty)
* [joinGroup](_src_id3v1_id3v1tag_.id3v1tag.md#joingroup)

## Properties

### fileIdentifier

▪ `Static` `Readonly` **fileIdentifier**: [ByteVector](_src_bytevector_.bytevector.md) = ByteVector.fromString("TAG", StringType.UTF8)

*Defined in src/id3v1/id3v1Tag.ts:17*

Identifier used to recognize an ID3v1 tag.

___

### size

▪ `Static` `Readonly` **size**: 128 = 128

*Defined in src/id3v1/id3v1Tag.ts:22*

Size of an ID3v1 tag.

## Accessors

### album

• get **album**(): string

*Overrides [Tag](_src_tag_.tag.md).[album](_src_tag_.tag.md#album)*

*Defined in src/id3v1/id3v1Tag.ts:126*

**`inheritdoc`** 

**Returns:** string

• set **album**(`value`: string): void

*Overrides [Tag](_src_tag_.tag.md).[album](_src_tag_.tag.md#album)*

*Defined in src/id3v1/id3v1Tag.ts:132*

**`inheritdoc`** 

**`description`** When stored on disk, only the first 30 bytes of the latin-1 encoded value will
    be stored. This may result in data loss.

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### albumArtists

• get **albumArtists**(): string[]

*Inherited from [Tag](_src_tag_.tag.md).[albumArtists](_src_tag_.tag.md#albumartists)*

*Defined in src/tag.ts:129*

**Returns:** string[]

• set **albumArtists**(`value`: string[]): void

*Inherited from [Tag](_src_tag_.tag.md).[albumArtists](_src_tag_.tag.md#albumartists)*

*Defined in src/tag.ts:130*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string[] |

**Returns:** void

___

### albumArtistsSort

• get **albumArtistsSort**(): string[]

*Inherited from [Tag](_src_tag_.tag.md).[albumArtistsSort](_src_tag_.tag.md#albumartistssort)*

*Defined in src/tag.ts:132*

**Returns:** string[]

• set **albumArtistsSort**(`value`: string[]): void

*Inherited from [Tag](_src_tag_.tag.md).[albumArtistsSort](_src_tag_.tag.md#albumartistssort)*

*Defined in src/tag.ts:133*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string[] |

**Returns:** void

___

### albumSort

• get **albumSort**(): string

*Inherited from [Tag](_src_tag_.tag.md).[albumSort](_src_tag_.tag.md#albumsort)*

*Defined in src/tag.ts:144*

**Returns:** string

• set **albumSort**(`value`: string): void

*Inherited from [Tag](_src_tag_.tag.md).[albumSort](_src_tag_.tag.md#albumsort)*

*Defined in src/tag.ts:145*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### amazonId

• get **amazonId**(): string

*Inherited from [Tag](_src_tag_.tag.md).[amazonId](_src_tag_.tag.md#amazonid)*

*Defined in src/tag.ts:207*

**Returns:** string

• set **amazonId**(`value`: string): void

*Inherited from [Tag](_src_tag_.tag.md).[amazonId](_src_tag_.tag.md#amazonid)*

*Defined in src/tag.ts:208*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### beatsPerMinute

• get **beatsPerMinute**(): number

*Inherited from [Tag](_src_tag_.tag.md).[beatsPerMinute](_src_tag_.tag.md#beatsperminute)*

*Defined in src/tag.ts:174*

**Returns:** number

• set **beatsPerMinute**(`value`: number): void

*Inherited from [Tag](_src_tag_.tag.md).[beatsPerMinute](_src_tag_.tag.md#beatsperminute)*

*Defined in src/tag.ts:175*

#### Parameters:

Name | Type |
------ | ------ |
`value` | number |

**Returns:** void

___

### comment

• get **comment**(): string

*Overrides [Tag](_src_tag_.tag.md).[comment](_src_tag_.tag.md#comment)*

*Defined in src/id3v1/id3v1Tag.ts:135*

**`inheritdoc`** 

**Returns:** string

• set **comment**(`value`: string): void

*Overrides [Tag](_src_tag_.tag.md).[comment](_src_tag_.tag.md#comment)*

*Defined in src/id3v1/id3v1Tag.ts:141*

**`inheritdoc`** 

**`description`** When stored on disk, only the first 28 bytes of the latin-1 encoded value will
    be stored. This may result in lost data.

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### composers

• get **composers**(): string[]

*Inherited from [Tag](_src_tag_.tag.md).[composers](_src_tag_.tag.md#composers)*

*Defined in src/tag.ts:135*

**Returns:** string[]

• set **composers**(`value`: string[]): void

*Inherited from [Tag](_src_tag_.tag.md).[composers](_src_tag_.tag.md#composers)*

*Defined in src/tag.ts:136*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string[] |

**Returns:** void

___

### composersSort

• get **composersSort**(): string[]

*Inherited from [Tag](_src_tag_.tag.md).[composersSort](_src_tag_.tag.md#composerssort)*

*Defined in src/tag.ts:138*

**Returns:** string[]

• set **composersSort**(`value`: string[]): void

*Inherited from [Tag](_src_tag_.tag.md).[composersSort](_src_tag_.tag.md#composerssort)*

*Defined in src/tag.ts:139*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string[] |

**Returns:** void

___

### conductor

• get **conductor**(): string

*Inherited from [Tag](_src_tag_.tag.md).[conductor](_src_tag_.tag.md#conductor)*

*Defined in src/tag.ts:177*

**Returns:** string

• set **conductor**(`value`: string): void

*Inherited from [Tag](_src_tag_.tag.md).[conductor](_src_tag_.tag.md#conductor)*

*Defined in src/tag.ts:178*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### copyright

• get **copyright**(): string

*Inherited from [Tag](_src_tag_.tag.md).[copyright](_src_tag_.tag.md#copyright)*

*Defined in src/tag.ts:180*

**Returns:** string

• set **copyright**(`value`: string): void

*Inherited from [Tag](_src_tag_.tag.md).[copyright](_src_tag_.tag.md#copyright)*

*Defined in src/tag.ts:181*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### dateTagged

• get **dateTagged**(): Date \| undefined

*Inherited from [Tag](_src_tag_.tag.md).[dateTagged](_src_tag_.tag.md#datetagged)*

*Defined in src/tag.ts:183*

**Returns:** Date \| undefined

• set **dateTagged**(`value`: Date \| undefined): void

*Inherited from [Tag](_src_tag_.tag.md).[dateTagged](_src_tag_.tag.md#datetagged)*

*Defined in src/tag.ts:184*

#### Parameters:

Name | Type |
------ | ------ |
`value` | Date \| undefined |

**Returns:** void

___

### description

• get **description**(): string

*Inherited from [Tag](_src_tag_.tag.md).[description](_src_tag_.tag.md#description)*

*Defined in src/tag.ts:117*

**Returns:** string

• set **description**(`value`: string): void

*Inherited from [Tag](_src_tag_.tag.md).[description](_src_tag_.tag.md#description)*

*Defined in src/tag.ts:118*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### disc

• get **disc**(): number

*Inherited from [Tag](_src_tag_.tag.md).[disc](_src_tag_.tag.md#disc)*

*Defined in src/tag.ts:162*

**Returns:** number

• set **disc**(`value`: number): void

*Inherited from [Tag](_src_tag_.tag.md).[disc](_src_tag_.tag.md#disc)*

*Defined in src/tag.ts:163*

#### Parameters:

Name | Type |
------ | ------ |
`value` | number |

**Returns:** void

___

### discCount

• get **discCount**(): number

*Inherited from [Tag](_src_tag_.tag.md).[discCount](_src_tag_.tag.md#disccount)*

*Defined in src/tag.ts:165*

**Returns:** number

• set **discCount**(`value`: number): void

*Inherited from [Tag](_src_tag_.tag.md).[discCount](_src_tag_.tag.md#disccount)*

*Defined in src/tag.ts:166*

#### Parameters:

Name | Type |
------ | ------ |
`value` | number |

**Returns:** void

___

### firstAlbumArtist

• get **firstAlbumArtist**(): string

*Inherited from [Tag](_src_tag_.tag.md).[firstAlbumArtist](_src_tag_.tag.md#firstalbumartist)*

*Defined in src/tag.ts:246*

**Returns:** string

___

### firstAlbumArtistSort

• get **firstAlbumArtistSort**(): string

*Inherited from [Tag](_src_tag_.tag.md).[firstAlbumArtistSort](_src_tag_.tag.md#firstalbumartistsort)*

*Defined in src/tag.ts:248*

**Returns:** string

___

### firstComposer

• get **firstComposer**(): string

*Inherited from [Tag](_src_tag_.tag.md).[firstComposer](_src_tag_.tag.md#firstcomposer)*

*Defined in src/tag.ts:254*

**Returns:** string

___

### firstComposerSort

• get **firstComposerSort**(): string

*Inherited from [Tag](_src_tag_.tag.md).[firstComposerSort](_src_tag_.tag.md#firstcomposersort)*

*Defined in src/tag.ts:256*

**Returns:** string

___

### firstGenre

• get **firstGenre**(): string

*Inherited from [Tag](_src_tag_.tag.md).[firstGenre](_src_tag_.tag.md#firstgenre)*

*Defined in src/tag.ts:258*

**Returns:** string

___

### firstPerformer

• get **firstPerformer**(): string

*Inherited from [Tag](_src_tag_.tag.md).[firstPerformer](_src_tag_.tag.md#firstperformer)*

*Defined in src/tag.ts:250*

**Returns:** string

___

### firstPerformerSort

• get **firstPerformerSort**(): string

*Inherited from [Tag](_src_tag_.tag.md).[firstPerformerSort](_src_tag_.tag.md#firstperformersort)*

*Defined in src/tag.ts:252*

**Returns:** string

___

### genres

• get **genres**(): string[]

*Overrides [Tag](_src_tag_.tag.md).[genres](_src_tag_.tag.md#genres)*

*Defined in src/id3v1/id3v1Tag.ts:144*

**`inheritdoc`** 

**Returns:** string[]

• set **genres**(`value`: string[]): void

*Overrides [Tag](_src_tag_.tag.md).[genres](_src_tag_.tag.md#genres)*

*Defined in src/id3v1/id3v1Tag.ts:153*

**`inheritdoc`** 

**`description`** Only first genre will be stored and only if it is an exact match for a value in
    the list of audio genres. All other values will result in the property being cleared.

#### Parameters:

Name | Type |
------ | ------ |
`value` | string[] |

**Returns:** void

___

### grouping

• get **grouping**(): string

*Inherited from [Tag](_src_tag_.tag.md).[grouping](_src_tag_.tag.md#grouping)*

*Defined in src/tag.ts:171*

**Returns:** string

• set **grouping**(`value`: string): void

*Inherited from [Tag](_src_tag_.tag.md).[grouping](_src_tag_.tag.md#grouping)*

*Defined in src/tag.ts:172*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### initialKey

• get **initialKey**(): string

*Inherited from [Tag](_src_tag_.tag.md).[initialKey](_src_tag_.tag.md#initialkey)*

*Defined in src/tag.ts:231*

**Returns:** string

• set **initialKey**(`value`: string): void

*Inherited from [Tag](_src_tag_.tag.md).[initialKey](_src_tag_.tag.md#initialkey)*

*Defined in src/tag.ts:232*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### isEmpty

• get **isEmpty**(): boolean

*Inherited from [Tag](_src_tag_.tag.md).[isEmpty](_src_tag_.tag.md#isempty)*

*Defined in src/tag.ts:282*

**Returns:** boolean

___

### isrc

• get **isrc**(): string

*Inherited from [Tag](_src_tag_.tag.md).[isrc](_src_tag_.tag.md#isrc)*

*Defined in src/tag.ts:240*

**Returns:** string

• set **isrc**(`value`: string): void

*Inherited from [Tag](_src_tag_.tag.md).[isrc](_src_tag_.tag.md#isrc)*

*Defined in src/tag.ts:241*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### joinedAlbumArtists

• get **joinedAlbumArtists**(): string

*Inherited from [Tag](_src_tag_.tag.md).[joinedAlbumArtists](_src_tag_.tag.md#joinedalbumartists)*

*Defined in src/tag.ts:260*

**Returns:** string

___

### joinedComposers

• get **joinedComposers**(): string

*Inherited from [Tag](_src_tag_.tag.md).[joinedComposers](_src_tag_.tag.md#joinedcomposers)*

*Defined in src/tag.ts:266*

**Returns:** string

___

### joinedGenres

• get **joinedGenres**(): string

*Inherited from [Tag](_src_tag_.tag.md).[joinedGenres](_src_tag_.tag.md#joinedgenres)*

*Defined in src/tag.ts:268*

**Returns:** string

___

### joinedPerformers

• get **joinedPerformers**(): string

*Inherited from [Tag](_src_tag_.tag.md).[joinedPerformers](_src_tag_.tag.md#joinedperformers)*

*Defined in src/tag.ts:262*

**Returns:** string

___

### joinedPerformersSort

• get **joinedPerformersSort**(): string

*Inherited from [Tag](_src_tag_.tag.md).[joinedPerformersSort](_src_tag_.tag.md#joinedperformerssort)*

*Defined in src/tag.ts:264*

**Returns:** string

___

### lyrics

• get **lyrics**(): string

*Inherited from [Tag](_src_tag_.tag.md).[lyrics](_src_tag_.tag.md#lyrics)*

*Defined in src/tag.ts:168*

**Returns:** string

• set **lyrics**(`value`: string): void

*Inherited from [Tag](_src_tag_.tag.md).[lyrics](_src_tag_.tag.md#lyrics)*

*Defined in src/tag.ts:169*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### musicBrainzArtistId

• get **musicBrainzArtistId**(): string

*Inherited from [Tag](_src_tag_.tag.md).[musicBrainzArtistId](_src_tag_.tag.md#musicbrainzartistid)*

*Defined in src/tag.ts:186*

**Returns:** string

• set **musicBrainzArtistId**(`value`: string): void

*Inherited from [Tag](_src_tag_.tag.md).[musicBrainzArtistId](_src_tag_.tag.md#musicbrainzartistid)*

*Defined in src/tag.ts:187*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### musicBrainzDiscId

• get **musicBrainzDiscId**(): string

*Inherited from [Tag](_src_tag_.tag.md).[musicBrainzDiscId](_src_tag_.tag.md#musicbrainzdiscid)*

*Defined in src/tag.ts:201*

**Returns:** string

• set **musicBrainzDiscId**(`value`: string): void

*Inherited from [Tag](_src_tag_.tag.md).[musicBrainzDiscId](_src_tag_.tag.md#musicbrainzdiscid)*

*Defined in src/tag.ts:202*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### musicBrainzReleaseArtistId

• get **musicBrainzReleaseArtistId**(): string

*Inherited from [Tag](_src_tag_.tag.md).[musicBrainzReleaseArtistId](_src_tag_.tag.md#musicbrainzreleaseartistid)*

*Defined in src/tag.ts:195*

**Returns:** string

• set **musicBrainzReleaseArtistId**(`value`: string): void

*Inherited from [Tag](_src_tag_.tag.md).[musicBrainzReleaseArtistId](_src_tag_.tag.md#musicbrainzreleaseartistid)*

*Defined in src/tag.ts:196*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### musicBrainzReleaseCountry

• get **musicBrainzReleaseCountry**(): string

*Inherited from [Tag](_src_tag_.tag.md).[musicBrainzReleaseCountry](_src_tag_.tag.md#musicbrainzreleasecountry)*

*Defined in src/tag.ts:216*

**Returns:** string

• set **musicBrainzReleaseCountry**(`value`: string): void

*Inherited from [Tag](_src_tag_.tag.md).[musicBrainzReleaseCountry](_src_tag_.tag.md#musicbrainzreleasecountry)*

*Defined in src/tag.ts:217*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### musicBrainzReleaseGroupId

• get **musicBrainzReleaseGroupId**(): string

*Inherited from [Tag](_src_tag_.tag.md).[musicBrainzReleaseGroupId](_src_tag_.tag.md#musicbrainzreleasegroupid)*

*Defined in src/tag.ts:189*

**Returns:** string

• set **musicBrainzReleaseGroupId**(`value`: string): void

*Inherited from [Tag](_src_tag_.tag.md).[musicBrainzReleaseGroupId](_src_tag_.tag.md#musicbrainzreleasegroupid)*

*Defined in src/tag.ts:190*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### musicBrainzReleaseId

• get **musicBrainzReleaseId**(): string

*Inherited from [Tag](_src_tag_.tag.md).[musicBrainzReleaseId](_src_tag_.tag.md#musicbrainzreleaseid)*

*Defined in src/tag.ts:192*

**Returns:** string

• set **musicBrainzReleaseId**(`value`: string): void

*Inherited from [Tag](_src_tag_.tag.md).[musicBrainzReleaseId](_src_tag_.tag.md#musicbrainzreleaseid)*

*Defined in src/tag.ts:193*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### musicBrainzReleaseStatus

• get **musicBrainzReleaseStatus**(): string

*Inherited from [Tag](_src_tag_.tag.md).[musicBrainzReleaseStatus](_src_tag_.tag.md#musicbrainzreleasestatus)*

*Defined in src/tag.ts:210*

**Returns:** string

• set **musicBrainzReleaseStatus**(`value`: string): void

*Inherited from [Tag](_src_tag_.tag.md).[musicBrainzReleaseStatus](_src_tag_.tag.md#musicbrainzreleasestatus)*

*Defined in src/tag.ts:211*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### musicBrainzReleaseType

• get **musicBrainzReleaseType**(): string

*Inherited from [Tag](_src_tag_.tag.md).[musicBrainzReleaseType](_src_tag_.tag.md#musicbrainzreleasetype)*

*Defined in src/tag.ts:213*

**Returns:** string

• set **musicBrainzReleaseType**(`value`: string): void

*Inherited from [Tag](_src_tag_.tag.md).[musicBrainzReleaseType](_src_tag_.tag.md#musicbrainzreleasetype)*

*Defined in src/tag.ts:214*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### musicBrainzTrackId

• get **musicBrainzTrackId**(): string

*Inherited from [Tag](_src_tag_.tag.md).[musicBrainzTrackId](_src_tag_.tag.md#musicbrainztrackid)*

*Defined in src/tag.ts:198*

**Returns:** string

• set **musicBrainzTrackId**(`value`: string): void

*Inherited from [Tag](_src_tag_.tag.md).[musicBrainzTrackId](_src_tag_.tag.md#musicbrainztrackid)*

*Defined in src/tag.ts:199*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### musicIpId

• get **musicIpId**(): string

*Inherited from [Tag](_src_tag_.tag.md).[musicIpId](_src_tag_.tag.md#musicipid)*

*Defined in src/tag.ts:204*

**Returns:** string

• set **musicIpId**(`value`: string): void

*Inherited from [Tag](_src_tag_.tag.md).[musicIpId](_src_tag_.tag.md#musicipid)*

*Defined in src/tag.ts:205*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### performers

• get **performers**(): string[]

*Overrides [Tag](_src_tag_.tag.md).[performers](_src_tag_.tag.md#performers)*

*Defined in src/id3v1/id3v1Tag.ts:116*

**`inheritdoc`** 

**Returns:** string[]

• set **performers**(`value`: string[]): void

*Overrides [Tag](_src_tag_.tag.md).[performers](_src_tag_.tag.md#performers)*

*Defined in src/id3v1/id3v1Tag.ts:123*

**`inheritdoc`** 

**`description`** When stored on disk, only the first 30 bytes of the latin-1 encoded value will
    be stored, minus a byte for each additional performer (ie, two performers will only have
    29 bytes and three performers will only have 28 bytes). This may result in data loss.

#### Parameters:

Name | Type |
------ | ------ |
`value` | string[] |

**Returns:** void

___

### performersRole

• get **performersRole**(): string[]

*Inherited from [Tag](_src_tag_.tag.md).[performersRole](_src_tag_.tag.md#performersrole)*

*Defined in src/tag.ts:126*

**Returns:** string[]

• set **performersRole**(`value`: string[]): void

*Inherited from [Tag](_src_tag_.tag.md).[performersRole](_src_tag_.tag.md#performersrole)*

*Defined in src/tag.ts:127*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string[] |

**Returns:** void

___

### performersSort

• get **performersSort**(): string[]

*Inherited from [Tag](_src_tag_.tag.md).[performersSort](_src_tag_.tag.md#performerssort)*

*Defined in src/tag.ts:123*

**Returns:** string[]

• set **performersSort**(`value`: string[]): void

*Inherited from [Tag](_src_tag_.tag.md).[performersSort](_src_tag_.tag.md#performerssort)*

*Defined in src/tag.ts:124*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string[] |

**Returns:** void

___

### pictures

• get **pictures**(): [IPicture](../interfaces/_src_picture_.ipicture.md)[]

*Inherited from [Tag](_src_tag_.tag.md).[pictures](_src_tag_.tag.md#pictures)*

*Defined in src/tag.ts:243*

**Returns:** [IPicture](../interfaces/_src_picture_.ipicture.md)[]

• set **pictures**(`value`: [IPicture](../interfaces/_src_picture_.ipicture.md)[]): void

*Inherited from [Tag](_src_tag_.tag.md).[pictures](_src_tag_.tag.md#pictures)*

*Defined in src/tag.ts:244*

#### Parameters:

Name | Type |
------ | ------ |
`value` | [IPicture](../interfaces/_src_picture_.ipicture.md)[] |

**Returns:** void

___

### publisher

• get **publisher**(): string

*Inherited from [Tag](_src_tag_.tag.md).[publisher](_src_tag_.tag.md#publisher)*

*Defined in src/tag.ts:237*

**Returns:** string

• set **publisher**(`value`: string): void

*Inherited from [Tag](_src_tag_.tag.md).[publisher](_src_tag_.tag.md#publisher)*

*Defined in src/tag.ts:238*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### remixedBy

• get **remixedBy**(): string

*Inherited from [Tag](_src_tag_.tag.md).[remixedBy](_src_tag_.tag.md#remixedby)*

*Defined in src/tag.ts:234*

**Returns:** string

• set **remixedBy**(`value`: string): void

*Inherited from [Tag](_src_tag_.tag.md).[remixedBy](_src_tag_.tag.md#remixedby)*

*Defined in src/tag.ts:235*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### replayGainAlbumGain

• get **replayGainAlbumGain**(): number

*Inherited from [Tag](_src_tag_.tag.md).[replayGainAlbumGain](_src_tag_.tag.md#replaygainalbumgain)*

*Defined in src/tag.ts:225*

**Returns:** number

• set **replayGainAlbumGain**(`value`: number): void

*Inherited from [Tag](_src_tag_.tag.md).[replayGainAlbumGain](_src_tag_.tag.md#replaygainalbumgain)*

*Defined in src/tag.ts:226*

#### Parameters:

Name | Type |
------ | ------ |
`value` | number |

**Returns:** void

___

### replayGainAlbumPeak

• get **replayGainAlbumPeak**(): number

*Inherited from [Tag](_src_tag_.tag.md).[replayGainAlbumPeak](_src_tag_.tag.md#replaygainalbumpeak)*

*Defined in src/tag.ts:228*

**Returns:** number

• set **replayGainAlbumPeak**(`value`: number): void

*Inherited from [Tag](_src_tag_.tag.md).[replayGainAlbumPeak](_src_tag_.tag.md#replaygainalbumpeak)*

*Defined in src/tag.ts:229*

#### Parameters:

Name | Type |
------ | ------ |
`value` | number |

**Returns:** void

___

### replayGainTrackGain

• get **replayGainTrackGain**(): number

*Inherited from [Tag](_src_tag_.tag.md).[replayGainTrackGain](_src_tag_.tag.md#replaygaintrackgain)*

*Defined in src/tag.ts:219*

**Returns:** number

• set **replayGainTrackGain**(`value`: number): void

*Inherited from [Tag](_src_tag_.tag.md).[replayGainTrackGain](_src_tag_.tag.md#replaygaintrackgain)*

*Defined in src/tag.ts:220*

#### Parameters:

Name | Type |
------ | ------ |
`value` | number |

**Returns:** void

___

### replayGainTrackPeak

• get **replayGainTrackPeak**(): number

*Inherited from [Tag](_src_tag_.tag.md).[replayGainTrackPeak](_src_tag_.tag.md#replaygaintrackpeak)*

*Defined in src/tag.ts:222*

**Returns:** number

• set **replayGainTrackPeak**(`value`: number): void

*Inherited from [Tag](_src_tag_.tag.md).[replayGainTrackPeak](_src_tag_.tag.md#replaygaintrackpeak)*

*Defined in src/tag.ts:223*

#### Parameters:

Name | Type |
------ | ------ |
`value` | number |

**Returns:** void

___

### subtitle

• get **subtitle**(): string

*Inherited from [Tag](_src_tag_.tag.md).[subtitle](_src_tag_.tag.md#subtitle)*

*Defined in src/tag.ts:114*

**Returns:** string

• set **subtitle**(`value`: string): void

*Inherited from [Tag](_src_tag_.tag.md).[subtitle](_src_tag_.tag.md#subtitle)*

*Defined in src/tag.ts:115*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### tagTypes

• get **tagTypes**(): [TagTypes](../enums/_src_tag_.tagtypes.md)

*Overrides [Tag](_src_tag_.tag.md).[tagTypes](_src_tag_.tag.md#tagtypes)*

*Defined in src/id3v1/id3v1Tag.ts:104*

**Returns:** [TagTypes](../enums/_src_tag_.tagtypes.md)

___

### title

• get **title**(): string

*Overrides [Tag](_src_tag_.tag.md).[title](_src_tag_.tag.md#title)*

*Defined in src/id3v1/id3v1Tag.ts:107*

**`inheritdoc`** 

**Returns:** string

• set **title**(`value`: string): void

*Overrides [Tag](_src_tag_.tag.md).[title](_src_tag_.tag.md#title)*

*Defined in src/id3v1/id3v1Tag.ts:113*

**`inheritdoc`** 

**`description`** When stored on disk, only the first 30 bytes of the latin-1 encoded value will
    be stored. This may result in lost data.

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### titleSort

• get **titleSort**(): string

*Inherited from [Tag](_src_tag_.tag.md).[titleSort](_src_tag_.tag.md#titlesort)*

*Defined in src/tag.ts:111*

**Returns:** string

• set **titleSort**(`value`: string): void

*Inherited from [Tag](_src_tag_.tag.md).[titleSort](_src_tag_.tag.md#titlesort)*

*Defined in src/tag.ts:112*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### track

• get **track**(): number

*Overrides [Tag](_src_tag_.tag.md).[track](_src_tag_.tag.md#track)*

*Defined in src/id3v1/id3v1Tag.ts:174*

**`inheritdoc`** 

**Returns:** number

• set **track**(`value`: number): void

*Overrides [Tag](_src_tag_.tag.md).[track](_src_tag_.tag.md#track)*

*Defined in src/id3v1/id3v1Tag.ts:180*

**`inheritdoc`** 

**`description`** Only values betweenInclusive 1 and 255 will be stored. All other values will result in
    the property being zeroed.

#### Parameters:

Name | Type |
------ | ------ |
`value` | number |

**Returns:** void

___

### trackCount

• get **trackCount**(): number

*Inherited from [Tag](_src_tag_.tag.md).[trackCount](_src_tag_.tag.md#trackcount)*

*Defined in src/tag.ts:159*

**Returns:** number

• set **trackCount**(`value`: number): void

*Inherited from [Tag](_src_tag_.tag.md).[trackCount](_src_tag_.tag.md#trackcount)*

*Defined in src/tag.ts:160*

#### Parameters:

Name | Type |
------ | ------ |
`value` | number |

**Returns:** void

___

### year

• get **year**(): number

*Overrides [Tag](_src_tag_.tag.md).[year](_src_tag_.tag.md#year)*

*Defined in src/id3v1/id3v1Tag.ts:160*

**`inheritdoc`** 

**Returns:** number

• set **year**(`value`: number): void

*Overrides [Tag](_src_tag_.tag.md).[year](_src_tag_.tag.md#year)*

*Defined in src/id3v1/id3v1Tag.ts:169*

**`inheritdoc`** 

**`description`** Only values betweenInclusive 1 and 9999 will be stored. All other values will result in
    the property being zeroed.

#### Parameters:

Name | Type |
------ | ------ |
`value` | number |

**Returns:** void

## Methods

### clear

▸ **clear**(): void

*Overrides [Tag](_src_tag_.tag.md).[clear](_src_tag_.tag.md#clear)*

*Defined in src/id3v1/id3v1Tag.ts:185*

**`inheritdoc`** 

**Returns:** void

___

### copyTo

▸ **copyTo**(`target`: [Tag](_src_tag_.tag.md), `overwrite`: boolean): void

*Inherited from [Tag](_src_tag_.tag.md).[copyTo](_src_tag_.tag.md#copyto)*

*Defined in src/tag.ts:307*

#### Parameters:

Name | Type |
------ | ------ |
`target` | [Tag](_src_tag_.tag.md) |
`overwrite` | boolean |

**Returns:** void

___

### render

▸ **render**(): [ByteVector](_src_bytevector_.bytevector.md)

*Defined in src/id3v1/id3v1Tag.ts:88*

Renders the current instance as a raw ID3v1 tag.

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### setInfoTag

▸ **setInfoTag**(): void

*Inherited from [Tag](_src_tag_.tag.md).[setInfoTag](_src_tag_.tag.md#setinfotag)*

*Defined in src/tag.ts:303*

**Returns:** void

___

### empty

▸ `Static`**empty**(): [Id3v1Tag](_src_id3v1_id3v1tag_.id3v1tag.md)

*Defined in src/id3v1/id3v1Tag.ts:55*

Constructs and initializes a new instance of {@see Id3v1Tag} with no contents.

**Returns:** [Id3v1Tag](_src_id3v1_id3v1tag_.id3v1tag.md)

___

### firstInGroup

▸ `Static` `Protected`**firstInGroup**(`group`: string[]): string

*Inherited from [Tag](_src_tag_.tag.md).[firstInGroup](_src_tag_.tag.md#firstingroup)*

*Defined in src/tag.ts:270*

#### Parameters:

Name | Type |
------ | ------ |
`group` | string[] |

**Returns:** string

___

### fromData

▸ `Static`**fromData**(`data`: [ByteVector](_src_bytevector_.bytevector.md)): [Id3v1Tag](_src_id3v1_id3v1tag_.id3v1tag.md)

*Defined in src/id3v1/id3v1Tag.ts:61*

#### Parameters:

Name | Type |
------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) |

**Returns:** [Id3v1Tag](_src_id3v1_id3v1tag_.id3v1tag.md)

___

### fromFile

▸ `Static`**fromFile**(`file`: [File](_src_file_.file.md), `position`: number): [Id3v1Tag](_src_id3v1_id3v1tag_.id3v1tag.md)

*Defined in src/id3v1/id3v1Tag.ts:65*

#### Parameters:

Name | Type |
------ | ------ |
`file` | [File](_src_file_.file.md) |
`position` | number |

**Returns:** [Id3v1Tag](_src_id3v1_id3v1tag_.id3v1tag.md)

___

### isNullOrLikeEmpty

▸ `Static` `Protected`**isNullOrLikeEmpty**(`value`: string \| string[]): boolean

*Inherited from [Tag](_src_tag_.tag.md).[isNullOrLikeEmpty](_src_tag_.tag.md#isnullorlikeempty)*

*Defined in src/tag.ts:338*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string \| string[] |

**Returns:** boolean

___

### joinGroup

▸ `Static` `Protected`**joinGroup**(`group`: string[]): string

*Inherited from [Tag](_src_tag_.tag.md).[joinGroup](_src_tag_.tag.md#joingroup)*

*Defined in src/tag.ts:276*

#### Parameters:

Name | Type |
------ | ------ |
`group` | string[] |

**Returns:** string
