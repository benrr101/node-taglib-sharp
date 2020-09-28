**node-taglib-sharp**

> [README](../README.md) / [Globals](../globals.md) / ["src/nonContainer/startTag"](../modules/_src_noncontainer_starttag_.md) / StartTag

# Class: StartTag

Provides support for accessing and modifying a collection of tags appearing at the start of a
file.
This class is used by {@see NonContainerFile} to read all the tags appearing at the start of the
file but could be used by other classes. It currently supports ID3v2 and APE tags.

**`todo:`** JK NO IT DON'T SUPPORT APE YET.

## Hierarchy

* [CombinedTag](_src_combinedtag_.combinedtag.md)

  ↳ **StartTag**

## Index

### Constructors

* [constructor](_src_noncontainer_starttag_.starttag.md#constructor)

### Properties

* [\_tags](_src_noncontainer_starttag_.starttag.md#_tags)

### Accessors

* [album](_src_noncontainer_starttag_.starttag.md#album)
* [albumArtists](_src_noncontainer_starttag_.starttag.md#albumartists)
* [albumArtistsSort](_src_noncontainer_starttag_.starttag.md#albumartistssort)
* [albumSort](_src_noncontainer_starttag_.starttag.md#albumsort)
* [amazonId](_src_noncontainer_starttag_.starttag.md#amazonid)
* [beatsPerMinute](_src_noncontainer_starttag_.starttag.md#beatsperminute)
* [comment](_src_noncontainer_starttag_.starttag.md#comment)
* [composers](_src_noncontainer_starttag_.starttag.md#composers)
* [composersSort](_src_noncontainer_starttag_.starttag.md#composerssort)
* [conductor](_src_noncontainer_starttag_.starttag.md#conductor)
* [copyright](_src_noncontainer_starttag_.starttag.md#copyright)
* [dateTagged](_src_noncontainer_starttag_.starttag.md#datetagged)
* [description](_src_noncontainer_starttag_.starttag.md#description)
* [disc](_src_noncontainer_starttag_.starttag.md#disc)
* [discCount](_src_noncontainer_starttag_.starttag.md#disccount)
* [firstAlbumArtist](_src_noncontainer_starttag_.starttag.md#firstalbumartist)
* [firstAlbumArtistSort](_src_noncontainer_starttag_.starttag.md#firstalbumartistsort)
* [firstComposer](_src_noncontainer_starttag_.starttag.md#firstcomposer)
* [firstComposerSort](_src_noncontainer_starttag_.starttag.md#firstcomposersort)
* [firstGenre](_src_noncontainer_starttag_.starttag.md#firstgenre)
* [firstPerformer](_src_noncontainer_starttag_.starttag.md#firstperformer)
* [firstPerformerSort](_src_noncontainer_starttag_.starttag.md#firstperformersort)
* [genres](_src_noncontainer_starttag_.starttag.md#genres)
* [grouping](_src_noncontainer_starttag_.starttag.md#grouping)
* [initialKey](_src_noncontainer_starttag_.starttag.md#initialkey)
* [isEmpty](_src_noncontainer_starttag_.starttag.md#isempty)
* [isrc](_src_noncontainer_starttag_.starttag.md#isrc)
* [joinedAlbumArtists](_src_noncontainer_starttag_.starttag.md#joinedalbumartists)
* [joinedComposers](_src_noncontainer_starttag_.starttag.md#joinedcomposers)
* [joinedGenres](_src_noncontainer_starttag_.starttag.md#joinedgenres)
* [joinedPerformers](_src_noncontainer_starttag_.starttag.md#joinedperformers)
* [joinedPerformersSort](_src_noncontainer_starttag_.starttag.md#joinedperformerssort)
* [lyrics](_src_noncontainer_starttag_.starttag.md#lyrics)
* [musicBrainzArtistId](_src_noncontainer_starttag_.starttag.md#musicbrainzartistid)
* [musicBrainzDiscId](_src_noncontainer_starttag_.starttag.md#musicbrainzdiscid)
* [musicBrainzReleaseArtistId](_src_noncontainer_starttag_.starttag.md#musicbrainzreleaseartistid)
* [musicBrainzReleaseCountry](_src_noncontainer_starttag_.starttag.md#musicbrainzreleasecountry)
* [musicBrainzReleaseGroupId](_src_noncontainer_starttag_.starttag.md#musicbrainzreleasegroupid)
* [musicBrainzReleaseId](_src_noncontainer_starttag_.starttag.md#musicbrainzreleaseid)
* [musicBrainzReleaseStatus](_src_noncontainer_starttag_.starttag.md#musicbrainzreleasestatus)
* [musicBrainzReleaseType](_src_noncontainer_starttag_.starttag.md#musicbrainzreleasetype)
* [musicBrainzTrackId](_src_noncontainer_starttag_.starttag.md#musicbrainztrackid)
* [musicIpId](_src_noncontainer_starttag_.starttag.md#musicipid)
* [performers](_src_noncontainer_starttag_.starttag.md#performers)
* [performersRole](_src_noncontainer_starttag_.starttag.md#performersrole)
* [performersSort](_src_noncontainer_starttag_.starttag.md#performerssort)
* [pictures](_src_noncontainer_starttag_.starttag.md#pictures)
* [publisher](_src_noncontainer_starttag_.starttag.md#publisher)
* [remixedBy](_src_noncontainer_starttag_.starttag.md#remixedby)
* [replayGainAlbumGain](_src_noncontainer_starttag_.starttag.md#replaygainalbumgain)
* [replayGainAlbumPeak](_src_noncontainer_starttag_.starttag.md#replaygainalbumpeak)
* [replayGainTrackGain](_src_noncontainer_starttag_.starttag.md#replaygaintrackgain)
* [replayGainTrackPeak](_src_noncontainer_starttag_.starttag.md#replaygaintrackpeak)
* [subtitle](_src_noncontainer_starttag_.starttag.md#subtitle)
* [tagTypes](_src_noncontainer_starttag_.starttag.md#tagtypes)
* [tags](_src_noncontainer_starttag_.starttag.md#tags)
* [title](_src_noncontainer_starttag_.starttag.md#title)
* [titleSort](_src_noncontainer_starttag_.starttag.md#titlesort)
* [totalSize](_src_noncontainer_starttag_.starttag.md#totalsize)
* [track](_src_noncontainer_starttag_.starttag.md#track)
* [trackCount](_src_noncontainer_starttag_.starttag.md#trackcount)
* [year](_src_noncontainer_starttag_.starttag.md#year)

### Methods

* [addTag](_src_noncontainer_starttag_.starttag.md#addtag)
* [addTagInternal](_src_noncontainer_starttag_.starttag.md#addtaginternal)
* [clear](_src_noncontainer_starttag_.starttag.md#clear)
* [clearTags](_src_noncontainer_starttag_.starttag.md#cleartags)
* [copyTo](_src_noncontainer_starttag_.starttag.md#copyto)
* [insertTag](_src_noncontainer_starttag_.starttag.md#inserttag)
* [read](_src_noncontainer_starttag_.starttag.md#read)
* [removeTag](_src_noncontainer_starttag_.starttag.md#removetag)
* [removeTags](_src_noncontainer_starttag_.starttag.md#removetags)
* [render](_src_noncontainer_starttag_.starttag.md#render)
* [setInfoTag](_src_noncontainer_starttag_.starttag.md#setinfotag)
* [setTags](_src_noncontainer_starttag_.starttag.md#settags)
* [write](_src_noncontainer_starttag_.starttag.md#write)
* [firstInGroup](_src_noncontainer_starttag_.starttag.md#firstingroup)
* [isNullOrLikeEmpty](_src_noncontainer_starttag_.starttag.md#isnullorlikeempty)
* [joinGroup](_src_noncontainer_starttag_.starttag.md#joingroup)

## Constructors

### constructor

\+ **new StartTag**(`file`: [File](_src_file_.file.md)): [StartTag](_src_noncontainer_starttag_.starttag.md)

*Overrides [CombinedTag](_src_combinedtag_.combinedtag.md).[constructor](_src_combinedtag_.combinedtag.md#constructor)*

*Defined in src/nonContainer/startTag.ts:20*

Constructs a new instance for a specified file.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`file` | [File](_src_file_.file.md) | File on which the new instance will perform its operations  |

**Returns:** [StartTag](_src_noncontainer_starttag_.starttag.md)

## Properties

### \_tags

• `Protected` **\_tags**: [Tag](_src_tag_.tag.md)[]

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[_tags](_src_combinedtag_.combinedtag.md#_tags)*

*Defined in src/combinedTag.ts:5*

## Accessors

### album

• get **album**(): string

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[album](_src_combinedtag_.combinedtag.md#album)*

*Overrides [Tag](_src_tag_.tag.md).[album](_src_tag_.tag.md#album)*

*Defined in src/combinedTag.ts:184*

Gets the album title for the media described by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** string

• set **album**(`val`: string): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[album](_src_combinedtag_.combinedtag.md#album)*

*Overrides [Tag](_src_tag_.tag.md).[album](_src_tag_.tag.md#album)*

*Defined in src/combinedTag.ts:189*

Sets the album title for the media described by the current instance.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | string |

**Returns:** void

___

### albumArtists

• get **albumArtists**(): string[]

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[albumArtists](_src_combinedtag_.combinedtag.md#albumartists)*

*Overrides [Tag](_src_tag_.tag.md).[albumArtists](_src_tag_.tag.md#albumartists)*

*Defined in src/combinedTag.ts:137*

Gets the band or artist is credited in the creation of the entire album or collection
containing the media described by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** string[]

• set **albumArtists**(`val`: string[]): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[albumArtists](_src_combinedtag_.combinedtag.md#albumartists)*

*Overrides [Tag](_src_tag_.tag.md).[albumArtists](_src_tag_.tag.md#albumartists)*

*Defined in src/combinedTag.ts:143*

Sets the band or artist is credited in the creation of the entire album or collection
containing the media described by the current instance.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | string[] |

**Returns:** void

___

### albumArtistsSort

• get **albumArtistsSort**(): string[]

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[albumArtistsSort](_src_combinedtag_.combinedtag.md#albumartistssort)*

*Overrides [Tag](_src_tag_.tag.md).[albumArtistsSort](_src_tag_.tag.md#albumartistssort)*

*Defined in src/combinedTag.ts:150*

Gets the band or artist is credited in the creation of the entire album or collection
containing the media described by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** string[]

• set **albumArtistsSort**(`val`: string[]): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[albumArtistsSort](_src_combinedtag_.combinedtag.md#albumartistssort)*

*Overrides [Tag](_src_tag_.tag.md).[albumArtistsSort](_src_tag_.tag.md#albumartistssort)*

*Defined in src/combinedTag.ts:156*

Sets the band or artist is credited in the creation of the entire album or collection
containing the media described by the current instance.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | string[] |

**Returns:** void

___

### albumSort

• get **albumSort**(): string

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[albumSort](_src_combinedtag_.combinedtag.md#albumsort)*

*Overrides [Tag](_src_tag_.tag.md).[albumSort](_src_tag_.tag.md#albumsort)*

*Defined in src/combinedTag.ts:195*

Gets the album title for sorting the media described by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** string

• set **albumSort**(`val`: string): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[albumSort](_src_combinedtag_.combinedtag.md#albumsort)*

*Overrides [Tag](_src_tag_.tag.md).[albumSort](_src_tag_.tag.md#albumsort)*

*Defined in src/combinedTag.ts:200*

Sets the album title for sorting the media described by the current instance.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | string |

**Returns:** void

___

### amazonId

• get **amazonId**(): string

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[amazonId](_src_combinedtag_.combinedtag.md#amazonid)*

*Overrides [Tag](_src_tag_.tag.md).[amazonId](_src_tag_.tag.md#amazonid)*

*Defined in src/combinedTag.ts:438*

Gets the Amazon ID.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** string

• set **amazonId**(`val`: string): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[amazonId](_src_combinedtag_.combinedtag.md#amazonid)*

*Overrides [Tag](_src_tag_.tag.md).[amazonId](_src_tag_.tag.md#amazonid)*

*Defined in src/combinedTag.ts:443*

Sets the Amazon ID.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | string |

**Returns:** void

___

### beatsPerMinute

• get **beatsPerMinute**(): number

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[beatsPerMinute](_src_combinedtag_.combinedtag.md#beatsperminute)*

*Overrides [Tag](_src_tag_.tag.md).[beatsPerMinute](_src_tag_.tag.md#beatsperminute)*

*Defined in src/combinedTag.ts:313*

Gets the number of beats per minute of the media represented by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** number

• set **beatsPerMinute**(`val`: number): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[beatsPerMinute](_src_combinedtag_.combinedtag.md#beatsperminute)*

*Overrides [Tag](_src_tag_.tag.md).[beatsPerMinute](_src_tag_.tag.md#beatsperminute)*

*Defined in src/combinedTag.ts:319*

Sets the number of beats per minute of the media represented by the current instance. Must
be a positive integer positive integer.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | number |

**Returns:** void

___

### comment

• get **comment**(): string

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[comment](_src_combinedtag_.combinedtag.md#comment)*

*Overrides [Tag](_src_tag_.tag.md).[comment](_src_tag_.tag.md#comment)*

*Defined in src/combinedTag.ts:206*

Gets a user comment for the media described by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** string

• set **comment**(`val`: string): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[comment](_src_combinedtag_.combinedtag.md#comment)*

*Overrides [Tag](_src_tag_.tag.md).[comment](_src_tag_.tag.md#comment)*

*Defined in src/combinedTag.ts:211*

Sets a user comment for the media described by the current instance.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | string |

**Returns:** void

___

### composers

• get **composers**(): string[]

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[composers](_src_combinedtag_.combinedtag.md#composers)*

*Overrides [Tag](_src_tag_.tag.md).[composers](_src_tag_.tag.md#composers)*

*Defined in src/combinedTag.ts:162*

Gets the composers of the media represented by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** string[]

• set **composers**(`val`: string[]): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[composers](_src_combinedtag_.combinedtag.md#composers)*

*Overrides [Tag](_src_tag_.tag.md).[composers](_src_tag_.tag.md#composers)*

*Defined in src/combinedTag.ts:167*

Sets the composers of the media represented by the current instance.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | string[] |

**Returns:** void

___

### composersSort

• get **composersSort**(): string[]

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[composersSort](_src_combinedtag_.combinedtag.md#composerssort)*

*Overrides [Tag](_src_tag_.tag.md).[composersSort](_src_tag_.tag.md#composerssort)*

*Defined in src/combinedTag.ts:173*

Gets the composers of the media represented by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** string[]

• set **composersSort**(`val`: string[]): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[composersSort](_src_combinedtag_.combinedtag.md#composerssort)*

*Overrides [Tag](_src_tag_.tag.md).[composersSort](_src_tag_.tag.md#composerssort)*

*Defined in src/combinedTag.ts:178*

Sets the composers of the media represented by the current instance.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | string[] |

**Returns:** void

___

### conductor

• get **conductor**(): string

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[conductor](_src_combinedtag_.combinedtag.md#conductor)*

*Overrides [Tag](_src_tag_.tag.md).[conductor](_src_tag_.tag.md#conductor)*

*Defined in src/combinedTag.ts:325*

Gets the conductor or director of the media represented by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** string

• set **conductor**(`val`: string): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[conductor](_src_combinedtag_.combinedtag.md#conductor)*

*Overrides [Tag](_src_tag_.tag.md).[conductor](_src_tag_.tag.md#conductor)*

*Defined in src/combinedTag.ts:330*

Sets the conductor or director of the media represented by the current instance.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | string |

**Returns:** void

___

### copyright

• get **copyright**(): string

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[copyright](_src_combinedtag_.combinedtag.md#copyright)*

*Overrides [Tag](_src_tag_.tag.md).[copyright](_src_tag_.tag.md#copyright)*

*Defined in src/combinedTag.ts:336*

Gets the copyright information of the media represented by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** string

• set **copyright**(`val`: string): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[copyright](_src_combinedtag_.combinedtag.md#copyright)*

*Overrides [Tag](_src_tag_.tag.md).[copyright](_src_tag_.tag.md#copyright)*

*Defined in src/combinedTag.ts:341*

Sets the copyright information of the media represented by the current instance.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | string |

**Returns:** void

___

### dateTagged

• get **dateTagged**(): Date

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[dateTagged](_src_combinedtag_.combinedtag.md#datetagged)*

*Overrides [Tag](_src_tag_.tag.md).[dateTagged](_src_tag_.tag.md#datetagged)*

*Defined in src/combinedTag.ts:347*

Gets the date at which the tag has been written.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** Date

• set **dateTagged**(`val`: Date): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[dateTagged](_src_combinedtag_.combinedtag.md#datetagged)*

*Overrides [Tag](_src_tag_.tag.md).[dateTagged](_src_tag_.tag.md#datetagged)*

*Defined in src/combinedTag.ts:351*

Sets the date at which the tag has been written

#### Parameters:

Name | Type |
------ | ------ |
`val` | Date |

**Returns:** void

___

### description

• get **description**(): string

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[description](_src_combinedtag_.combinedtag.md#description)*

*Overrides [Tag](_src_tag_.tag.md).[description](_src_tag_.tag.md#description)*

*Defined in src/combinedTag.ts:85*

Gets the description for the media described by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**`description`** This is especially relevant for a movie. For example, for "Back to the Future
    2", this could be "After visiting 2015, Marty McFly must repeat his visit to 1955 to
    prevent disastrous changes to 1985...without interfering with his first trip".

**Returns:** string

• set **description**(`val`: string): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[description](_src_combinedtag_.combinedtag.md#description)*

*Overrides [Tag](_src_tag_.tag.md).[description](_src_tag_.tag.md#description)*

*Defined in src/combinedTag.ts:90*

Sets the description for the media described by the current instance.
Sets the value on all child tags

**`description`** This is especially relevant for a movie. For example, for "Back to the Future
    2", this could be "After visiting 2015, Marty McFly must repeat his visit to 1955 to
    prevent disastrous changes to 1985...without interfering with his first trip".

#### Parameters:

Name | Type |
------ | ------ |
`val` | string |

**Returns:** void

___

### disc

• get **disc**(): number

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[disc](_src_combinedtag_.combinedtag.md#disc)*

*Overrides [Tag](_src_tag_.tag.md).[disc](_src_tag_.tag.md#disc)*

*Defined in src/combinedTag.ts:266*

Gets the number of the disc containing the media represented by the current instance in a
boxed set.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** number

• set **disc**(`val`: number): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[disc](_src_combinedtag_.combinedtag.md#disc)*

*Overrides [Tag](_src_tag_.tag.md).[disc](_src_tag_.tag.md#disc)*

*Defined in src/combinedTag.ts:272*

Sets the number of the disc containing the media represented by the current instance in a
boxed set. Must be a positive integer positive integer.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | number |

**Returns:** void

___

### discCount

• get **discCount**(): number

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[discCount](_src_combinedtag_.combinedtag.md#disccount)*

*Overrides [Tag](_src_tag_.tag.md).[discCount](_src_tag_.tag.md#disccount)*

*Defined in src/combinedTag.ts:279*

Gets the number of the discs in the boxed set containing the media represented by the
current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** number

• set **discCount**(`val`: number): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[discCount](_src_combinedtag_.combinedtag.md#disccount)*

*Overrides [Tag](_src_tag_.tag.md).[discCount](_src_tag_.tag.md#disccount)*

*Defined in src/combinedTag.ts:285*

Sets the number of the discs in the boxed set containing the media represented by the
current instance. Must be a positive integer positive integer.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | number |

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

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[genres](_src_combinedtag_.combinedtag.md#genres)*

*Overrides [Tag](_src_tag_.tag.md).[genres](_src_tag_.tag.md#genres)*

*Defined in src/combinedTag.ts:217*

Gets the album genres of the media represented by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** string[]

• set **genres**(`val`: string[]): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[genres](_src_combinedtag_.combinedtag.md#genres)*

*Overrides [Tag](_src_tag_.tag.md).[genres](_src_tag_.tag.md#genres)*

*Defined in src/combinedTag.ts:222*

Sets the album genres of the media described by the current instance.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | string[] |

**Returns:** void

___

### grouping

• get **grouping**(): string

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[grouping](_src_combinedtag_.combinedtag.md#grouping)*

*Overrides [Tag](_src_tag_.tag.md).[grouping](_src_tag_.tag.md#grouping)*

*Defined in src/combinedTag.ts:302*

Gets the grouping on the album which the media in the current instance belongs to.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** string

• set **grouping**(`val`: string): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[grouping](_src_combinedtag_.combinedtag.md#grouping)*

*Overrides [Tag](_src_tag_.tag.md).[grouping](_src_tag_.tag.md#grouping)*

*Defined in src/combinedTag.ts:307*

Sets the grouping on the album which the media in the current instance belongs to.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | string |

**Returns:** void

___

### initialKey

• get **initialKey**(): string

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[initialKey](_src_combinedtag_.combinedtag.md#initialkey)*

*Overrides [Tag](_src_tag_.tag.md).[initialKey](_src_tag_.tag.md#initialkey)*

*Defined in src/combinedTag.ts:532*

Gets the initial key of the media represented by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** string

• set **initialKey**(`val`: string): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[initialKey](_src_combinedtag_.combinedtag.md#initialkey)*

*Overrides [Tag](_src_tag_.tag.md).[initialKey](_src_tag_.tag.md#initialkey)*

*Defined in src/combinedTag.ts:537*

Sets the initial key of the media represented by the current instance.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | string |

**Returns:** void

___

### isEmpty

• get **isEmpty**(): boolean

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[isEmpty](_src_combinedtag_.combinedtag.md#isempty)*

*Overrides [Tag](_src_tag_.tag.md).[isEmpty](_src_tag_.tag.md#isempty)*

*Defined in src/combinedTag.ts:589*

Whether or not the current instance is empty. If all child tags are empty, `true` is
returned, `false` otherwise.

**Returns:** boolean

___

### isrc

• get **isrc**(): string

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[isrc](_src_combinedtag_.combinedtag.md#isrc)*

*Overrides [Tag](_src_tag_.tag.md).[isrc](_src_tag_.tag.md#isrc)*

*Defined in src/combinedTag.ts:566*

Gets the ISRC (International Standard Recording Code) of the media represented by the
current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** string

• set **isrc**(`val`: string): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[isrc](_src_combinedtag_.combinedtag.md#isrc)*

*Overrides [Tag](_src_tag_.tag.md).[isrc](_src_tag_.tag.md#isrc)*

*Defined in src/combinedTag.ts:572*

Sets the ISRC (International Standard Recording Code) of the media represented by the
current instance.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | string |

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

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[lyrics](_src_combinedtag_.combinedtag.md#lyrics)*

*Overrides [Tag](_src_tag_.tag.md).[lyrics](_src_tag_.tag.md#lyrics)*

*Defined in src/combinedTag.ts:291*

Gets the lyrics or script of the media represented by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** string

• set **lyrics**(`val`: string): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[lyrics](_src_combinedtag_.combinedtag.md#lyrics)*

*Overrides [Tag](_src_tag_.tag.md).[lyrics](_src_tag_.tag.md#lyrics)*

*Defined in src/combinedTag.ts:296*

Sets the lyrics or script of the media represented by the current instance.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | string |

**Returns:** void

___

### musicBrainzArtistId

• get **musicBrainzArtistId**(): string

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[musicBrainzArtistId](_src_combinedtag_.combinedtag.md#musicbrainzartistid)*

*Overrides [Tag](_src_tag_.tag.md).[musicBrainzArtistId](_src_tag_.tag.md#musicbrainzartistid)*

*Defined in src/combinedTag.ts:357*

Gets the MusicBrainz artist ID.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** string

• set **musicBrainzArtistId**(`val`: string): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[musicBrainzArtistId](_src_combinedtag_.combinedtag.md#musicbrainzartistid)*

*Overrides [Tag](_src_tag_.tag.md).[musicBrainzArtistId](_src_tag_.tag.md#musicbrainzartistid)*

*Defined in src/combinedTag.ts:362*

Sets the MusicBrainz artist ID.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | string |

**Returns:** void

___

### musicBrainzDiscId

• get **musicBrainzDiscId**(): string

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[musicBrainzDiscId](_src_combinedtag_.combinedtag.md#musicbrainzdiscid)*

*Overrides [Tag](_src_tag_.tag.md).[musicBrainzDiscId](_src_tag_.tag.md#musicbrainzdiscid)*

*Defined in src/combinedTag.ts:416*

Gets the MusicBrainz disc ID.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** string

• set **musicBrainzDiscId**(`val`: string): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[musicBrainzDiscId](_src_combinedtag_.combinedtag.md#musicbrainzdiscid)*

*Overrides [Tag](_src_tag_.tag.md).[musicBrainzDiscId](_src_tag_.tag.md#musicbrainzdiscid)*

*Defined in src/combinedTag.ts:421*

Sets the MusicBrainz disc ID.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | string |

**Returns:** void

___

### musicBrainzReleaseArtistId

• get **musicBrainzReleaseArtistId**(): string

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[musicBrainzReleaseArtistId](_src_combinedtag_.combinedtag.md#musicbrainzreleaseartistid)*

*Overrides [Tag](_src_tag_.tag.md).[musicBrainzReleaseArtistId](_src_tag_.tag.md#musicbrainzreleaseartistid)*

*Defined in src/combinedTag.ts:392*

Gets the MusicBrainz release artist ID.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** string

• set **musicBrainzReleaseArtistId**(`val`: string): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[musicBrainzReleaseArtistId](_src_combinedtag_.combinedtag.md#musicbrainzreleaseartistid)*

*Overrides [Tag](_src_tag_.tag.md).[musicBrainzReleaseArtistId](_src_tag_.tag.md#musicbrainzreleaseartistid)*

*Defined in src/combinedTag.ts:397*

Sets the MusicBrainz release artist ID.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | string |

**Returns:** void

___

### musicBrainzReleaseCountry

• get **musicBrainzReleaseCountry**(): string

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[musicBrainzReleaseCountry](_src_combinedtag_.combinedtag.md#musicbrainzreleasecountry)*

*Overrides [Tag](_src_tag_.tag.md).[musicBrainzReleaseCountry](_src_tag_.tag.md#musicbrainzreleasecountry)*

*Defined in src/combinedTag.ts:475*

Gets the MusicBrainz release country.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** string

• set **musicBrainzReleaseCountry**(`val`: string): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[musicBrainzReleaseCountry](_src_combinedtag_.combinedtag.md#musicbrainzreleasecountry)*

*Overrides [Tag](_src_tag_.tag.md).[musicBrainzReleaseCountry](_src_tag_.tag.md#musicbrainzreleasecountry)*

*Defined in src/combinedTag.ts:480*

Sets the MusicBrainz release country.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | string |

**Returns:** void

___

### musicBrainzReleaseGroupId

• get **musicBrainzReleaseGroupId**(): string

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[musicBrainzReleaseGroupId](_src_combinedtag_.combinedtag.md#musicbrainzreleasegroupid)*

*Overrides [Tag](_src_tag_.tag.md).[musicBrainzReleaseGroupId](_src_tag_.tag.md#musicbrainzreleasegroupid)*

*Defined in src/combinedTag.ts:368*

Gets the MusicBrainz release group ID.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** string

• set **musicBrainzReleaseGroupId**(`val`: string): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[musicBrainzReleaseGroupId](_src_combinedtag_.combinedtag.md#musicbrainzreleasegroupid)*

*Overrides [Tag](_src_tag_.tag.md).[musicBrainzReleaseGroupId](_src_tag_.tag.md#musicbrainzreleasegroupid)*

*Defined in src/combinedTag.ts:373*

Sets the MusicBrainz release group ID.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | string |

**Returns:** void

___

### musicBrainzReleaseId

• get **musicBrainzReleaseId**(): string

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[musicBrainzReleaseId](_src_combinedtag_.combinedtag.md#musicbrainzreleaseid)*

*Overrides [Tag](_src_tag_.tag.md).[musicBrainzReleaseId](_src_tag_.tag.md#musicbrainzreleaseid)*

*Defined in src/combinedTag.ts:381*

Gets the MusicBrainz release ID.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** string

• set **musicBrainzReleaseId**(`val`: string): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[musicBrainzReleaseId](_src_combinedtag_.combinedtag.md#musicbrainzreleaseid)*

*Overrides [Tag](_src_tag_.tag.md).[musicBrainzReleaseId](_src_tag_.tag.md#musicbrainzreleaseid)*

*Defined in src/combinedTag.ts:386*

Sets the MusicBrainz release ID.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | string |

**Returns:** void

___

### musicBrainzReleaseStatus

• get **musicBrainzReleaseStatus**(): string

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[musicBrainzReleaseStatus](_src_combinedtag_.combinedtag.md#musicbrainzreleasestatus)*

*Overrides [Tag](_src_tag_.tag.md).[musicBrainzReleaseStatus](_src_tag_.tag.md#musicbrainzreleasestatus)*

*Defined in src/combinedTag.ts:449*

Gets the MusicBrainz release status.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** string

• set **musicBrainzReleaseStatus**(`val`: string): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[musicBrainzReleaseStatus](_src_combinedtag_.combinedtag.md#musicbrainzreleasestatus)*

*Overrides [Tag](_src_tag_.tag.md).[musicBrainzReleaseStatus](_src_tag_.tag.md#musicbrainzreleasestatus)*

*Defined in src/combinedTag.ts:454*

Sets the MusicBrainz release status.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | string |

**Returns:** void

___

### musicBrainzReleaseType

• get **musicBrainzReleaseType**(): string

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[musicBrainzReleaseType](_src_combinedtag_.combinedtag.md#musicbrainzreleasetype)*

*Overrides [Tag](_src_tag_.tag.md).[musicBrainzReleaseType](_src_tag_.tag.md#musicbrainzreleasetype)*

*Defined in src/combinedTag.ts:462*

Gets the MusicBrainz release type.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** string

• set **musicBrainzReleaseType**(`val`: string): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[musicBrainzReleaseType](_src_combinedtag_.combinedtag.md#musicbrainzreleasetype)*

*Overrides [Tag](_src_tag_.tag.md).[musicBrainzReleaseType](_src_tag_.tag.md#musicbrainzreleasetype)*

*Defined in src/combinedTag.ts:467*

Sets the MusicBrainz release type.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | string |

**Returns:** void

___

### musicBrainzTrackId

• get **musicBrainzTrackId**(): string

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[musicBrainzTrackId](_src_combinedtag_.combinedtag.md#musicbrainztrackid)*

*Overrides [Tag](_src_tag_.tag.md).[musicBrainzTrackId](_src_tag_.tag.md#musicbrainztrackid)*

*Defined in src/combinedTag.ts:405*

Gets the MusicBrainz track ID.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** string

• set **musicBrainzTrackId**(`val`: string): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[musicBrainzTrackId](_src_combinedtag_.combinedtag.md#musicbrainztrackid)*

*Overrides [Tag](_src_tag_.tag.md).[musicBrainzTrackId](_src_tag_.tag.md#musicbrainztrackid)*

*Defined in src/combinedTag.ts:410*

Sets the MusicBrainz track ID.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | string |

**Returns:** void

___

### musicIpId

• get **musicIpId**(): string

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[musicIpId](_src_combinedtag_.combinedtag.md#musicipid)*

*Overrides [Tag](_src_tag_.tag.md).[musicIpId](_src_tag_.tag.md#musicipid)*

*Defined in src/combinedTag.ts:427*

Gets the MusicIP PUID.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** string

• set **musicIpId**(`val`: string): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[musicIpId](_src_combinedtag_.combinedtag.md#musicipid)*

*Overrides [Tag](_src_tag_.tag.md).[musicIpId](_src_tag_.tag.md#musicipid)*

*Defined in src/combinedTag.ts:432*

Sets the MusicIP PUID.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | string |

**Returns:** void

___

### performers

• get **performers**(): string[]

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[performers](_src_combinedtag_.combinedtag.md#performers)*

*Overrides [Tag](_src_tag_.tag.md).[performers](_src_tag_.tag.md#performers)*

*Defined in src/combinedTag.ts:96*

Gets the performers or artists who performed in the media described by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** string[]

• set **performers**(`val`: string[]): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[performers](_src_combinedtag_.combinedtag.md#performers)*

*Overrides [Tag](_src_tag_.tag.md).[performers](_src_tag_.tag.md#performers)*

*Defined in src/combinedTag.ts:101*

Sets the performers in the media described by the current instance.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | string[] |

**Returns:** void

___

### performersRole

• get **performersRole**(): string[]

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[performersRole](_src_combinedtag_.combinedtag.md#performersrole)*

*Overrides [Tag](_src_tag_.tag.md).[performersRole](_src_tag_.tag.md#performersrole)*

*Defined in src/combinedTag.ts:125*

Gets the characters for a video media, or instruments played for music media. This should
match the {@see performers} array (for each person correspond one/more role). Several roles
for the same artist/actor can be made up with semicolons. For example, "Marty McFly; Marty
McFly Jr.; Marlene McFly".
Returns the first non-null/non-undefined value from the child tags.

**`description`** This is typically useful for movies, although the instrument played by each
    artist in a music file may be of relevance.
    It is highly important to match each role to the performers. This means that a role may
    be `null\undefined` to keep a match betweenInclusive performers[i] and performersRole[i].

**Returns:** string[]

• set **performersRole**(`val`: string[]): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[performersRole](_src_combinedtag_.combinedtag.md#performersrole)*

*Overrides [Tag](_src_tag_.tag.md).[performersRole](_src_tag_.tag.md#performersrole)*

*Defined in src/combinedTag.ts:130*

Sets the characters in a video media, or instruments played for music media.
Sets the value on all child tags

**`description`** This is typically useful for movies, although the instrument played by each
    artist in a music file may be of relevance.
    It is highly important to match each role to the performers. This means that a role may
    be `null\undefined` to keep a match betweenInclusive performers[i] and performersRole[i].

#### Parameters:

Name | Type |
------ | ------ |
`val` | string[] |

**Returns:** void

___

### performersSort

• get **performersSort**(): string[]

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[performersSort](_src_combinedtag_.combinedtag.md#performerssort)*

*Overrides [Tag](_src_tag_.tag.md).[performersSort](_src_tag_.tag.md#performerssort)*

*Defined in src/combinedTag.ts:107*

Gets the performers or artists who performed in the media described by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** string[]

• set **performersSort**(`val`: string[]): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[performersSort](_src_combinedtag_.combinedtag.md#performerssort)*

*Overrides [Tag](_src_tag_.tag.md).[performersSort](_src_tag_.tag.md#performerssort)*

*Defined in src/combinedTag.ts:112*

Sets the performers in the media described by the current instance.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | string[] |

**Returns:** void

___

### pictures

• get **pictures**(): [IPicture](../interfaces/_src_picture_.ipicture.md)[]

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[pictures](_src_combinedtag_.combinedtag.md#pictures)*

*Overrides [Tag](_src_tag_.tag.md).[pictures](_src_tag_.tag.md#pictures)*

*Defined in src/combinedTag.ts:578*

Gets a collection of pictures associated with the media represented by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** [IPicture](../interfaces/_src_picture_.ipicture.md)[]

• set **pictures**(`val`: [IPicture](../interfaces/_src_picture_.ipicture.md)[]): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[pictures](_src_combinedtag_.combinedtag.md#pictures)*

*Overrides [Tag](_src_tag_.tag.md).[pictures](_src_tag_.tag.md#pictures)*

*Defined in src/combinedTag.ts:583*

Sets the collection of pictures associated with the current media.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | [IPicture](../interfaces/_src_picture_.ipicture.md)[] |

**Returns:** void

___

### publisher

• get **publisher**(): string

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[publisher](_src_combinedtag_.combinedtag.md#publisher)*

*Overrides [Tag](_src_tag_.tag.md).[publisher](_src_tag_.tag.md#publisher)*

*Defined in src/combinedTag.ts:554*

Gets the publisher of the media represented by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** string

• set **publisher**(`val`: string): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[publisher](_src_combinedtag_.combinedtag.md#publisher)*

*Overrides [Tag](_src_tag_.tag.md).[publisher](_src_tag_.tag.md#publisher)*

*Defined in src/combinedTag.ts:559*

Sets the publisher of the media represented by the current instance.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | string |

**Returns:** void

___

### remixedBy

• get **remixedBy**(): string

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[remixedBy](_src_combinedtag_.combinedtag.md#remixedby)*

*Overrides [Tag](_src_tag_.tag.md).[remixedBy](_src_tag_.tag.md#remixedby)*

*Defined in src/combinedTag.ts:543*

Gets the remixer of the media represented by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** string

• set **remixedBy**(`val`: string): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[remixedBy](_src_combinedtag_.combinedtag.md#remixedby)*

*Overrides [Tag](_src_tag_.tag.md).[remixedBy](_src_tag_.tag.md#remixedby)*

*Defined in src/combinedTag.ts:548*

Sets the remixer of the media represented by the current instance.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | string |

**Returns:** void

___

### replayGainAlbumGain

• get **replayGainAlbumGain**(): number

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[replayGainAlbumGain](_src_combinedtag_.combinedtag.md#replaygainalbumgain)*

*Overrides [Tag](_src_tag_.tag.md).[replayGainAlbumGain](_src_tag_.tag.md#replaygainalbumgain)*

*Defined in src/combinedTag.ts:510*

Gets the ReplayGain album gain in dB.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** number

• set **replayGainAlbumGain**(`val`: number): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[replayGainAlbumGain](_src_combinedtag_.combinedtag.md#replaygainalbumgain)*

*Overrides [Tag](_src_tag_.tag.md).[replayGainAlbumGain](_src_tag_.tag.md#replaygainalbumgain)*

*Defined in src/combinedTag.ts:515*

Sets the ReplayGain album gain in dB.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | number |

**Returns:** void

___

### replayGainAlbumPeak

• get **replayGainAlbumPeak**(): number

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[replayGainAlbumPeak](_src_combinedtag_.combinedtag.md#replaygainalbumpeak)*

*Overrides [Tag](_src_tag_.tag.md).[replayGainAlbumPeak](_src_tag_.tag.md#replaygainalbumpeak)*

*Defined in src/combinedTag.ts:521*

Gets the ReplayGain album peak sample.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** number

• set **replayGainAlbumPeak**(`val`: number): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[replayGainAlbumPeak](_src_combinedtag_.combinedtag.md#replaygainalbumpeak)*

*Overrides [Tag](_src_tag_.tag.md).[replayGainAlbumPeak](_src_tag_.tag.md#replaygainalbumpeak)*

*Defined in src/combinedTag.ts:526*

Sets the ReplayGain album peak sample.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | number |

**Returns:** void

___

### replayGainTrackGain

• get **replayGainTrackGain**(): number

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[replayGainTrackGain](_src_combinedtag_.combinedtag.md#replaygaintrackgain)*

*Overrides [Tag](_src_tag_.tag.md).[replayGainTrackGain](_src_tag_.tag.md#replaygaintrackgain)*

*Defined in src/combinedTag.ts:488*

Gets the ReplayGain track gain in dB.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** number

• set **replayGainTrackGain**(`val`: number): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[replayGainTrackGain](_src_combinedtag_.combinedtag.md#replaygaintrackgain)*

*Overrides [Tag](_src_tag_.tag.md).[replayGainTrackGain](_src_tag_.tag.md#replaygaintrackgain)*

*Defined in src/combinedTag.ts:493*

Sets the ReplayGain track gain in dB.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | number |

**Returns:** void

___

### replayGainTrackPeak

• get **replayGainTrackPeak**(): number

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[replayGainTrackPeak](_src_combinedtag_.combinedtag.md#replaygaintrackpeak)*

*Overrides [Tag](_src_tag_.tag.md).[replayGainTrackPeak](_src_tag_.tag.md#replaygaintrackpeak)*

*Defined in src/combinedTag.ts:499*

Gets the ReplayGain track peak sample.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** number

• set **replayGainTrackPeak**(`val`: number): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[replayGainTrackPeak](_src_combinedtag_.combinedtag.md#replaygaintrackpeak)*

*Overrides [Tag](_src_tag_.tag.md).[replayGainTrackPeak](_src_tag_.tag.md#replaygaintrackpeak)*

*Defined in src/combinedTag.ts:504*

Sets the ReplayGain track peak sample.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | number |

**Returns:** void

___

### subtitle

• get **subtitle**(): string

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[subtitle](_src_combinedtag_.combinedtag.md#subtitle)*

*Overrides [Tag](_src_tag_.tag.md).[subtitle](_src_tag_.tag.md#subtitle)*

*Defined in src/combinedTag.ts:71*

Gets the subtitle for the media described by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**`description`** This field gives a nice short precision to the title, which is typically below
    the title on the front cover of the media. Example: for "Back to the Future", this would
    be "It's About Time".

**Returns:** string

• set **subtitle**(`val`: string): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[subtitle](_src_combinedtag_.combinedtag.md#subtitle)*

*Overrides [Tag](_src_tag_.tag.md).[subtitle](_src_tag_.tag.md#subtitle)*

*Defined in src/combinedTag.ts:76*

Sets the subtitle for the media described by the current instance.
Sets the value on all child tags

**`description`** This field gives a nice short precision to the title, which is typically below
    the title on the front cover of the media. Example: for "Back to the Future", this would
    be "It's About Time".

#### Parameters:

Name | Type |
------ | ------ |
`val` | string |

**Returns:** void

___

### tagTypes

• get **tagTypes**(): [TagTypes](../enums/_src_tag_.tagtypes.md)

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[tagTypes](_src_combinedtag_.combinedtag.md#tagtypes)*

*Overrides [Tag](_src_tag_.tag.md).[tagTypes](_src_tag_.tag.md#tagtypes)*

*Defined in src/combinedTag.ts:38*

Gets the tag types contained in the current instance.

**Returns:** [TagTypes](../enums/_src_tag_.tagtypes.md)

TagTypes Bitwise combined tag types contained in all child tags.

___

### tags

• get **tags**(): [Tag](_src_tag_.tag.md)[]

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[tags](_src_combinedtag_.combinedtag.md#tags)*

*Defined in src/combinedTag.ts:21*

Gets the tags combined in the current instance.

**Returns:** [Tag](_src_tag_.tag.md)[]

• set **tags**(`tags`: [Tag](_src_tag_.tag.md)[]): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[tags](_src_combinedtag_.combinedtag.md#tags)*

*Defined in src/combinedTag.ts:26*

Sets the child tags to combine in the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`tags` | [Tag](_src_tag_.tag.md)[] | Array of tags to combine  |

**Returns:** void

___

### title

• get **title**(): string

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[title](_src_combinedtag_.combinedtag.md#title)*

*Overrides [Tag](_src_tag_.tag.md).[title](_src_tag_.tag.md#title)*

*Defined in src/combinedTag.ts:46*

Gets the title for the media described by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** string

• set **title**(`val`: string): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[title](_src_combinedtag_.combinedtag.md#title)*

*Overrides [Tag](_src_tag_.tag.md).[title](_src_tag_.tag.md#title)*

*Defined in src/combinedTag.ts:51*

Sets the title for the media described by the current instance.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | string |

**Returns:** void

___

### titleSort

• get **titleSort**(): string

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[titleSort](_src_combinedtag_.combinedtag.md#titlesort)*

*Overrides [Tag](_src_tag_.tag.md).[titleSort](_src_tag_.tag.md#titlesort)*

*Defined in src/combinedTag.ts:57*

Gets the title used for sorting the media described by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** string

• set **titleSort**(`val`: string): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[titleSort](_src_combinedtag_.combinedtag.md#titlesort)*

*Overrides [Tag](_src_tag_.tag.md).[titleSort](_src_tag_.tag.md#titlesort)*

*Defined in src/combinedTag.ts:62*

Sets the title used for sorting the media described by the current instance.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | string |

**Returns:** void

___

### totalSize

• get **totalSize**(): number

*Defined in src/nonContainer/startTag.ts:37*

Gets the total size of the tags located at the beginning of the file by reading from
the file.

**Returns:** number

___

### track

• get **track**(): number

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[track](_src_combinedtag_.combinedtag.md#track)*

*Overrides [Tag](_src_tag_.tag.md).[track](_src_tag_.tag.md#track)*

*Defined in src/combinedTag.ts:240*

Gets the position of the media represented by the current instance in its containing album.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** number

• set **track**(`val`: number): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[track](_src_combinedtag_.combinedtag.md#track)*

*Overrides [Tag](_src_tag_.tag.md).[track](_src_tag_.tag.md#track)*

*Defined in src/combinedTag.ts:246*

Sets the position of the media represented by the current instance in its containing album.
Must be a positive integer positive integer.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | number |

**Returns:** void

___

### trackCount

• get **trackCount**(): number

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[trackCount](_src_combinedtag_.combinedtag.md#trackcount)*

*Overrides [Tag](_src_tag_.tag.md).[trackCount](_src_tag_.tag.md#trackcount)*

*Defined in src/combinedTag.ts:253*

Gets the number of tracks in the album containing the media represented by the current
instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** number

• set **trackCount**(`val`: number): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[trackCount](_src_combinedtag_.combinedtag.md#trackcount)*

*Overrides [Tag](_src_tag_.tag.md).[trackCount](_src_tag_.tag.md#trackcount)*

*Defined in src/combinedTag.ts:259*

Sets the number of tracks in the album containing the media represented by the current
instance. Must be a positive integer positive integer.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | number |

**Returns:** void

___

### year

• get **year**(): number

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[year](_src_combinedtag_.combinedtag.md#year)*

*Overrides [Tag](_src_tag_.tag.md).[year](_src_tag_.tag.md#year)*

*Defined in src/combinedTag.ts:228*

Gets the year that the media represented by the current instance was recorded.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** number

• set **year**(`val`: number): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[year](_src_combinedtag_.combinedtag.md#year)*

*Overrides [Tag](_src_tag_.tag.md).[year](_src_tag_.tag.md#year)*

*Defined in src/combinedTag.ts:234*

Sets the year that the media represented by the current instance was recorded. Must be a
positive integer.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | number |

**Returns:** void

## Methods

### addTag

▸ **addTag**(`type`: [TagTypes](../enums/_src_tag_.tagtypes.md), `copy`: [Tag](_src_tag_.tag.md)): [Tag](_src_tag_.tag.md)

*Defined in src/nonContainer/startTag.ts:60*

Adds a tag of a specified type to the current instance, optionally copying values from an
existing type.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`type` | [TagTypes](../enums/_src_tag_.tagtypes.md) | Type of the tag to add to the current instance. At the time of this writing,     this is limited to {@see TagTypes.Ape}, {@see TagTypes.Id3v1}, and {@see TagTypes.Id3v2} |
`copy` | [Tag](_src_tag_.tag.md) | Tag to copy values from using {@see Tag.copyTo}, or `undefined` if no tag is to     be copied. |

**Returns:** [Tag](_src_tag_.tag.md)

Tag Tag added to the current instance. `undefined` if a tag could not be created.

___

### addTagInternal

▸ `Protected`**addTagInternal**(`tag`: [Tag](_src_tag_.tag.md)): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[addTagInternal](_src_combinedtag_.combinedtag.md#addtaginternal)*

*Defined in src/combinedTag.ts:622*

#### Parameters:

Name | Type |
------ | ------ |
`tag` | [Tag](_src_tag_.tag.md) |

**Returns:** void

___

### clear

▸ **clear**(): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[clear](_src_combinedtag_.combinedtag.md#clear)*

*Overrides [Tag](_src_tag_.tag.md).[clear](_src_tag_.tag.md#clear)*

*Defined in src/combinedTag.ts:600*

Clears all child tags.

**`seealso`** Tag.clear

**Returns:** void

___

### clearTags

▸ `Protected`**clearTags**(): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[clearTags](_src_combinedtag_.combinedtag.md#cleartags)*

*Defined in src/combinedTag.ts:626*

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

### insertTag

▸ `Protected`**insertTag**(`index`: number, `tag`: [Tag](_src_tag_.tag.md)): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[insertTag](_src_combinedtag_.combinedtag.md#inserttag)*

*Defined in src/combinedTag.ts:630*

#### Parameters:

Name | Type |
------ | ------ |
`index` | number |
`tag` | [Tag](_src_tag_.tag.md) |

**Returns:** void

___

### read

▸ **read**(`style`: [ReadStyle](../enums/_src_file_.readstyle.md)): number

*Defined in src/nonContainer/startTag.ts:84*

Reads the tags stored at the start of the file into the current instance.

#### Parameters:

Name | Type |
------ | ------ |
`style` | [ReadStyle](../enums/_src_file_.readstyle.md) |

**Returns:** number

Seek position in the file at which the read tags end. This also marks where the
    media begins.

___

### removeTag

▸ `Protected`**removeTag**(`tag`: [Tag](_src_tag_.tag.md)): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[removeTag](_src_combinedtag_.combinedtag.md#removetag)*

*Defined in src/combinedTag.ts:634*

#### Parameters:

Name | Type |
------ | ------ |
`tag` | [Tag](_src_tag_.tag.md) |

**Returns:** void

___

### removeTags

▸ **removeTags**(`types`: [TagTypes](../enums/_src_tag_.tagtypes.md)): void

*Defined in src/nonContainer/startTag.ts:107*

Removes a set of tag types from the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`types` | [TagTypes](../enums/_src_tag_.tagtypes.md) | Tag types to be removed from the file. To remove all tags, use     {@see TagTypes.AllTags}  |

**Returns:** void

___

### render

▸ **render**(): [ByteVector](_src_bytevector_.bytevector.md)

*Defined in src/nonContainer/startTag.ts:121*

Renders the tags contained in the current instance.
The tags are rendered in the order that they are stored in the current instance.

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

ByteVector Physical representation of the tags stored in the current instance

___

### setInfoTag

▸ **setInfoTag**(): void

*Inherited from [Tag](_src_tag_.tag.md).[setInfoTag](_src_tag_.tag.md#setinfotag)*

*Defined in src/tag.ts:303*

**Returns:** void

___

### setTags

▸ **setTags**(...`tags`: [Tag](_src_tag_.tag.md)[]): void

*Inherited from [CombinedTag](_src_combinedtag_.combinedtag.md).[setTags](_src_combinedtag_.combinedtag.md#settags)*

*Defined in src/combinedTag.ts:613*

Sets the child tags to combine in the current instance

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`...tags` | [Tag](_src_tag_.tag.md)[] | Tags to combine, falsy tags will be ignored  |

**Returns:** void

___

### write

▸ **write**(): number

*Defined in src/nonContainer/startTag.ts:138*

Writes the tags contained in the current instance to the beginning of the file that created
it, overwriting the existing tags.

**Returns:** number

number Seek position in the file at which the written tags end. This also marks the
    seek position at which the media begins.

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
