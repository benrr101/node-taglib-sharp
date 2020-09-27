**node-taglib-sharp**

> [README](../README.md) / [Globals](../globals.md) / ["src/tag"](../modules/_src_tag_.md) / Tag

# Class: Tag

## Hierarchy

* **Tag**

  ↳ [CombinedTag](_src_combinedtag_.combinedtag.md)

  ↳ [Id3v1Tag](_src_id3v1_id3v1tag_.id3v1tag.md)

  ↳ [Id3v2Tag](_src_id3v2_id3v2tag_.id3v2tag.md)

## Index

### Properties

* [tagTypes](_src_tag_.tag.md#tagtypes)

### Accessors

* [album](_src_tag_.tag.md#album)
* [albumArtists](_src_tag_.tag.md#albumartists)
* [albumArtistsSort](_src_tag_.tag.md#albumartistssort)
* [albumSort](_src_tag_.tag.md#albumsort)
* [amazonId](_src_tag_.tag.md#amazonid)
* [beatsPerMinute](_src_tag_.tag.md#beatsperminute)
* [comment](_src_tag_.tag.md#comment)
* [composers](_src_tag_.tag.md#composers)
* [composersSort](_src_tag_.tag.md#composerssort)
* [conductor](_src_tag_.tag.md#conductor)
* [copyright](_src_tag_.tag.md#copyright)
* [dateTagged](_src_tag_.tag.md#datetagged)
* [description](_src_tag_.tag.md#description)
* [disc](_src_tag_.tag.md#disc)
* [discCount](_src_tag_.tag.md#disccount)
* [firstAlbumArtist](_src_tag_.tag.md#firstalbumartist)
* [firstAlbumArtistSort](_src_tag_.tag.md#firstalbumartistsort)
* [firstComposer](_src_tag_.tag.md#firstcomposer)
* [firstComposerSort](_src_tag_.tag.md#firstcomposersort)
* [firstGenre](_src_tag_.tag.md#firstgenre)
* [firstPerformer](_src_tag_.tag.md#firstperformer)
* [firstPerformerSort](_src_tag_.tag.md#firstperformersort)
* [genres](_src_tag_.tag.md#genres)
* [grouping](_src_tag_.tag.md#grouping)
* [initialKey](_src_tag_.tag.md#initialkey)
* [isEmpty](_src_tag_.tag.md#isempty)
* [isrc](_src_tag_.tag.md#isrc)
* [joinedAlbumArtists](_src_tag_.tag.md#joinedalbumartists)
* [joinedComposers](_src_tag_.tag.md#joinedcomposers)
* [joinedGenres](_src_tag_.tag.md#joinedgenres)
* [joinedPerformers](_src_tag_.tag.md#joinedperformers)
* [joinedPerformersSort](_src_tag_.tag.md#joinedperformerssort)
* [lyrics](_src_tag_.tag.md#lyrics)
* [musicBrainzArtistId](_src_tag_.tag.md#musicbrainzartistid)
* [musicBrainzDiscId](_src_tag_.tag.md#musicbrainzdiscid)
* [musicBrainzReleaseArtistId](_src_tag_.tag.md#musicbrainzreleaseartistid)
* [musicBrainzReleaseCountry](_src_tag_.tag.md#musicbrainzreleasecountry)
* [musicBrainzReleaseGroupId](_src_tag_.tag.md#musicbrainzreleasegroupid)
* [musicBrainzReleaseId](_src_tag_.tag.md#musicbrainzreleaseid)
* [musicBrainzReleaseStatus](_src_tag_.tag.md#musicbrainzreleasestatus)
* [musicBrainzReleaseType](_src_tag_.tag.md#musicbrainzreleasetype)
* [musicBrainzTrackId](_src_tag_.tag.md#musicbrainztrackid)
* [musicIpId](_src_tag_.tag.md#musicipid)
* [performers](_src_tag_.tag.md#performers)
* [performersRole](_src_tag_.tag.md#performersrole)
* [performersSort](_src_tag_.tag.md#performerssort)
* [pictures](_src_tag_.tag.md#pictures)
* [publisher](_src_tag_.tag.md#publisher)
* [remixedBy](_src_tag_.tag.md#remixedby)
* [replayGainAlbumGain](_src_tag_.tag.md#replaygainalbumgain)
* [replayGainAlbumPeak](_src_tag_.tag.md#replaygainalbumpeak)
* [replayGainTrackGain](_src_tag_.tag.md#replaygaintrackgain)
* [replayGainTrackPeak](_src_tag_.tag.md#replaygaintrackpeak)
* [subtitle](_src_tag_.tag.md#subtitle)
* [title](_src_tag_.tag.md#title)
* [titleSort](_src_tag_.tag.md#titlesort)
* [track](_src_tag_.tag.md#track)
* [trackCount](_src_tag_.tag.md#trackcount)
* [year](_src_tag_.tag.md#year)

### Methods

* [clear](_src_tag_.tag.md#clear)
* [copyTo](_src_tag_.tag.md#copyto)
* [setInfoTag](_src_tag_.tag.md#setinfotag)
* [firstInGroup](_src_tag_.tag.md#firstingroup)
* [isNullOrLikeEmpty](_src_tag_.tag.md#isnullorlikeempty)
* [joinGroup](_src_tag_.tag.md#joingroup)

## Properties

### tagTypes

• `Abstract` **tagTypes**: [TagTypes](../enums/_src_tag_.tagtypes.md)

*Defined in src/tag.ts:106*

## Accessors

### album

• get **album**(): string

*Defined in src/tag.ts:141*

**Returns:** string

• set **album**(`value`: string): void

*Defined in src/tag.ts:142*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### albumArtists

• get **albumArtists**(): string[]

*Defined in src/tag.ts:129*

**Returns:** string[]

• set **albumArtists**(`value`: string[]): void

*Defined in src/tag.ts:130*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string[] |

**Returns:** void

___

### albumArtistsSort

• get **albumArtistsSort**(): string[]

*Defined in src/tag.ts:132*

**Returns:** string[]

• set **albumArtistsSort**(`value`: string[]): void

*Defined in src/tag.ts:133*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string[] |

**Returns:** void

___

### albumSort

• get **albumSort**(): string

*Defined in src/tag.ts:144*

**Returns:** string

• set **albumSort**(`value`: string): void

*Defined in src/tag.ts:145*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### amazonId

• get **amazonId**(): string

*Defined in src/tag.ts:207*

**Returns:** string

• set **amazonId**(`value`: string): void

*Defined in src/tag.ts:208*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### beatsPerMinute

• get **beatsPerMinute**(): number

*Defined in src/tag.ts:174*

**Returns:** number

• set **beatsPerMinute**(`value`: number): void

*Defined in src/tag.ts:175*

#### Parameters:

Name | Type |
------ | ------ |
`value` | number |

**Returns:** void

___

### comment

• get **comment**(): string

*Defined in src/tag.ts:147*

**Returns:** string

• set **comment**(`value`: string): void

*Defined in src/tag.ts:148*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### composers

• get **composers**(): string[]

*Defined in src/tag.ts:135*

**Returns:** string[]

• set **composers**(`value`: string[]): void

*Defined in src/tag.ts:136*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string[] |

**Returns:** void

___

### composersSort

• get **composersSort**(): string[]

*Defined in src/tag.ts:138*

**Returns:** string[]

• set **composersSort**(`value`: string[]): void

*Defined in src/tag.ts:139*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string[] |

**Returns:** void

___

### conductor

• get **conductor**(): string

*Defined in src/tag.ts:177*

**Returns:** string

• set **conductor**(`value`: string): void

*Defined in src/tag.ts:178*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### copyright

• get **copyright**(): string

*Defined in src/tag.ts:180*

**Returns:** string

• set **copyright**(`value`: string): void

*Defined in src/tag.ts:181*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### dateTagged

• get **dateTagged**(): Date \| undefined

*Defined in src/tag.ts:183*

**Returns:** Date \| undefined

• set **dateTagged**(`value`: Date \| undefined): void

*Defined in src/tag.ts:184*

#### Parameters:

Name | Type |
------ | ------ |
`value` | Date \| undefined |

**Returns:** void

___

### description

• get **description**(): string

*Defined in src/tag.ts:117*

**Returns:** string

• set **description**(`value`: string): void

*Defined in src/tag.ts:118*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### disc

• get **disc**(): number

*Defined in src/tag.ts:162*

**Returns:** number

• set **disc**(`value`: number): void

*Defined in src/tag.ts:163*

#### Parameters:

Name | Type |
------ | ------ |
`value` | number |

**Returns:** void

___

### discCount

• get **discCount**(): number

*Defined in src/tag.ts:165*

**Returns:** number

• set **discCount**(`value`: number): void

*Defined in src/tag.ts:166*

#### Parameters:

Name | Type |
------ | ------ |
`value` | number |

**Returns:** void

___

### firstAlbumArtist

• get **firstAlbumArtist**(): string

*Defined in src/tag.ts:246*

**Returns:** string

___

### firstAlbumArtistSort

• get **firstAlbumArtistSort**(): string

*Defined in src/tag.ts:248*

**Returns:** string

___

### firstComposer

• get **firstComposer**(): string

*Defined in src/tag.ts:254*

**Returns:** string

___

### firstComposerSort

• get **firstComposerSort**(): string

*Defined in src/tag.ts:256*

**Returns:** string

___

### firstGenre

• get **firstGenre**(): string

*Defined in src/tag.ts:258*

**Returns:** string

___

### firstPerformer

• get **firstPerformer**(): string

*Defined in src/tag.ts:250*

**Returns:** string

___

### firstPerformerSort

• get **firstPerformerSort**(): string

*Defined in src/tag.ts:252*

**Returns:** string

___

### genres

• get **genres**(): string[]

*Defined in src/tag.ts:150*

**Returns:** string[]

• set **genres**(`value`: string[]): void

*Defined in src/tag.ts:151*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string[] |

**Returns:** void

___

### grouping

• get **grouping**(): string

*Defined in src/tag.ts:171*

**Returns:** string

• set **grouping**(`value`: string): void

*Defined in src/tag.ts:172*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### initialKey

• get **initialKey**(): string

*Defined in src/tag.ts:231*

**Returns:** string

• set **initialKey**(`value`: string): void

*Defined in src/tag.ts:232*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### isEmpty

• get **isEmpty**(): boolean

*Defined in src/tag.ts:282*

**Returns:** boolean

___

### isrc

• get **isrc**(): string

*Defined in src/tag.ts:240*

**Returns:** string

• set **isrc**(`value`: string): void

*Defined in src/tag.ts:241*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### joinedAlbumArtists

• get **joinedAlbumArtists**(): string

*Defined in src/tag.ts:260*

**Returns:** string

___

### joinedComposers

• get **joinedComposers**(): string

*Defined in src/tag.ts:266*

**Returns:** string

___

### joinedGenres

• get **joinedGenres**(): string

*Defined in src/tag.ts:268*

**Returns:** string

___

### joinedPerformers

• get **joinedPerformers**(): string

*Defined in src/tag.ts:262*

**Returns:** string

___

### joinedPerformersSort

• get **joinedPerformersSort**(): string

*Defined in src/tag.ts:264*

**Returns:** string

___

### lyrics

• get **lyrics**(): string

*Defined in src/tag.ts:168*

**Returns:** string

• set **lyrics**(`value`: string): void

*Defined in src/tag.ts:169*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### musicBrainzArtistId

• get **musicBrainzArtistId**(): string

*Defined in src/tag.ts:186*

**Returns:** string

• set **musicBrainzArtistId**(`value`: string): void

*Defined in src/tag.ts:187*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### musicBrainzDiscId

• get **musicBrainzDiscId**(): string

*Defined in src/tag.ts:201*

**Returns:** string

• set **musicBrainzDiscId**(`value`: string): void

*Defined in src/tag.ts:202*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### musicBrainzReleaseArtistId

• get **musicBrainzReleaseArtistId**(): string

*Defined in src/tag.ts:195*

**Returns:** string

• set **musicBrainzReleaseArtistId**(`value`: string): void

*Defined in src/tag.ts:196*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### musicBrainzReleaseCountry

• get **musicBrainzReleaseCountry**(): string

*Defined in src/tag.ts:216*

**Returns:** string

• set **musicBrainzReleaseCountry**(`value`: string): void

*Defined in src/tag.ts:217*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### musicBrainzReleaseGroupId

• get **musicBrainzReleaseGroupId**(): string

*Defined in src/tag.ts:189*

**Returns:** string

• set **musicBrainzReleaseGroupId**(`value`: string): void

*Defined in src/tag.ts:190*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### musicBrainzReleaseId

• get **musicBrainzReleaseId**(): string

*Defined in src/tag.ts:192*

**Returns:** string

• set **musicBrainzReleaseId**(`value`: string): void

*Defined in src/tag.ts:193*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### musicBrainzReleaseStatus

• get **musicBrainzReleaseStatus**(): string

*Defined in src/tag.ts:210*

**Returns:** string

• set **musicBrainzReleaseStatus**(`value`: string): void

*Defined in src/tag.ts:211*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### musicBrainzReleaseType

• get **musicBrainzReleaseType**(): string

*Defined in src/tag.ts:213*

**Returns:** string

• set **musicBrainzReleaseType**(`value`: string): void

*Defined in src/tag.ts:214*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### musicBrainzTrackId

• get **musicBrainzTrackId**(): string

*Defined in src/tag.ts:198*

**Returns:** string

• set **musicBrainzTrackId**(`value`: string): void

*Defined in src/tag.ts:199*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### musicIpId

• get **musicIpId**(): string

*Defined in src/tag.ts:204*

**Returns:** string

• set **musicIpId**(`value`: string): void

*Defined in src/tag.ts:205*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### performers

• get **performers**(): string[]

*Defined in src/tag.ts:120*

**Returns:** string[]

• set **performers**(`value`: string[]): void

*Defined in src/tag.ts:121*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string[] |

**Returns:** void

___

### performersRole

• get **performersRole**(): string[]

*Defined in src/tag.ts:126*

**Returns:** string[]

• set **performersRole**(`value`: string[]): void

*Defined in src/tag.ts:127*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string[] |

**Returns:** void

___

### performersSort

• get **performersSort**(): string[]

*Defined in src/tag.ts:123*

**Returns:** string[]

• set **performersSort**(`value`: string[]): void

*Defined in src/tag.ts:124*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string[] |

**Returns:** void

___

### pictures

• get **pictures**(): [IPicture](../interfaces/_src_picture_.ipicture.md)[]

*Defined in src/tag.ts:243*

**Returns:** [IPicture](../interfaces/_src_picture_.ipicture.md)[]

• set **pictures**(`value`: [IPicture](../interfaces/_src_picture_.ipicture.md)[]): void

*Defined in src/tag.ts:244*

#### Parameters:

Name | Type |
------ | ------ |
`value` | [IPicture](../interfaces/_src_picture_.ipicture.md)[] |

**Returns:** void

___

### publisher

• get **publisher**(): string

*Defined in src/tag.ts:237*

**Returns:** string

• set **publisher**(`value`: string): void

*Defined in src/tag.ts:238*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### remixedBy

• get **remixedBy**(): string

*Defined in src/tag.ts:234*

**Returns:** string

• set **remixedBy**(`value`: string): void

*Defined in src/tag.ts:235*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### replayGainAlbumGain

• get **replayGainAlbumGain**(): number

*Defined in src/tag.ts:225*

**Returns:** number

• set **replayGainAlbumGain**(`value`: number): void

*Defined in src/tag.ts:226*

#### Parameters:

Name | Type |
------ | ------ |
`value` | number |

**Returns:** void

___

### replayGainAlbumPeak

• get **replayGainAlbumPeak**(): number

*Defined in src/tag.ts:228*

**Returns:** number

• set **replayGainAlbumPeak**(`value`: number): void

*Defined in src/tag.ts:229*

#### Parameters:

Name | Type |
------ | ------ |
`value` | number |

**Returns:** void

___

### replayGainTrackGain

• get **replayGainTrackGain**(): number

*Defined in src/tag.ts:219*

**Returns:** number

• set **replayGainTrackGain**(`value`: number): void

*Defined in src/tag.ts:220*

#### Parameters:

Name | Type |
------ | ------ |
`value` | number |

**Returns:** void

___

### replayGainTrackPeak

• get **replayGainTrackPeak**(): number

*Defined in src/tag.ts:222*

**Returns:** number

• set **replayGainTrackPeak**(`value`: number): void

*Defined in src/tag.ts:223*

#### Parameters:

Name | Type |
------ | ------ |
`value` | number |

**Returns:** void

___

### subtitle

• get **subtitle**(): string

*Defined in src/tag.ts:114*

**Returns:** string

• set **subtitle**(`value`: string): void

*Defined in src/tag.ts:115*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### title

• get **title**(): string

*Defined in src/tag.ts:108*

**Returns:** string

• set **title**(`value`: string): void

*Defined in src/tag.ts:109*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### titleSort

• get **titleSort**(): string

*Defined in src/tag.ts:111*

**Returns:** string

• set **titleSort**(`value`: string): void

*Defined in src/tag.ts:112*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### track

• get **track**(): number

*Defined in src/tag.ts:156*

**Returns:** number

• set **track**(`value`: number): void

*Defined in src/tag.ts:157*

#### Parameters:

Name | Type |
------ | ------ |
`value` | number |

**Returns:** void

___

### trackCount

• get **trackCount**(): number

*Defined in src/tag.ts:159*

**Returns:** number

• set **trackCount**(`value`: number): void

*Defined in src/tag.ts:160*

#### Parameters:

Name | Type |
------ | ------ |
`value` | number |

**Returns:** void

___

### year

• get **year**(): number

*Defined in src/tag.ts:153*

**Returns:** number

• set **year**(`value`: number): void

*Defined in src/tag.ts:154*

#### Parameters:

Name | Type |
------ | ------ |
`value` | number |

**Returns:** void

## Methods

### clear

▸ `Abstract`**clear**(): void

*Defined in src/tag.ts:301*

**Returns:** void

___

### copyTo

▸ **copyTo**(`target`: [Tag](_src_tag_.tag.md), `overwrite`: boolean): void

*Defined in src/tag.ts:307*

#### Parameters:

Name | Type |
------ | ------ |
`target` | [Tag](_src_tag_.tag.md) |
`overwrite` | boolean |

**Returns:** void

___

### setInfoTag

▸ **setInfoTag**(): void

*Defined in src/tag.ts:303*

**Returns:** void

___

### firstInGroup

▸ `Static` `Protected`**firstInGroup**(`group`: string[]): string

*Defined in src/tag.ts:270*

#### Parameters:

Name | Type |
------ | ------ |
`group` | string[] |

**Returns:** string

___

### isNullOrLikeEmpty

▸ `Static` `Protected`**isNullOrLikeEmpty**(`value`: string \| string[]): boolean

*Defined in src/tag.ts:338*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string \| string[] |

**Returns:** boolean

___

### joinGroup

▸ `Static` `Protected`**joinGroup**(`group`: string[]): string

*Defined in src/tag.ts:276*

#### Parameters:

Name | Type |
------ | ------ |
`group` | string[] |

**Returns:** string
