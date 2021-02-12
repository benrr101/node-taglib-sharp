[node-taglib-sharp](../README.md) / [Exports](../modules.md) / CombinedTag

# Class: CombinedTag

## Hierarchy

* [*Tag*](tag.md)

  ↳ **CombinedTag**

## Table of contents

### Constructors

- [constructor](combinedtag.md#constructor)

### Properties

- [\_tags](combinedtag.md#_tags)

### Accessors

- [album](combinedtag.md#album)
- [albumArtists](combinedtag.md#albumartists)
- [albumArtistsSort](combinedtag.md#albumartistssort)
- [albumSort](combinedtag.md#albumsort)
- [amazonId](combinedtag.md#amazonid)
- [beatsPerMinute](combinedtag.md#beatsperminute)
- [comment](combinedtag.md#comment)
- [composers](combinedtag.md#composers)
- [composersSort](combinedtag.md#composerssort)
- [conductor](combinedtag.md#conductor)
- [copyright](combinedtag.md#copyright)
- [dateTagged](combinedtag.md#datetagged)
- [description](combinedtag.md#description)
- [disc](combinedtag.md#disc)
- [discCount](combinedtag.md#disccount)
- [firstAlbumArtist](combinedtag.md#firstalbumartist)
- [firstAlbumArtistSort](combinedtag.md#firstalbumartistsort)
- [firstComposer](combinedtag.md#firstcomposer)
- [firstComposerSort](combinedtag.md#firstcomposersort)
- [firstGenre](combinedtag.md#firstgenre)
- [firstPerformer](combinedtag.md#firstperformer)
- [firstPerformerSort](combinedtag.md#firstperformersort)
- [genres](combinedtag.md#genres)
- [grouping](combinedtag.md#grouping)
- [initialKey](combinedtag.md#initialkey)
- [isEmpty](combinedtag.md#isempty)
- [isrc](combinedtag.md#isrc)
- [joinedAlbumArtists](combinedtag.md#joinedalbumartists)
- [joinedComposers](combinedtag.md#joinedcomposers)
- [joinedGenres](combinedtag.md#joinedgenres)
- [joinedPerformers](combinedtag.md#joinedperformers)
- [joinedPerformersSort](combinedtag.md#joinedperformerssort)
- [lyrics](combinedtag.md#lyrics)
- [musicBrainzArtistId](combinedtag.md#musicbrainzartistid)
- [musicBrainzDiscId](combinedtag.md#musicbrainzdiscid)
- [musicBrainzReleaseArtistId](combinedtag.md#musicbrainzreleaseartistid)
- [musicBrainzReleaseCountry](combinedtag.md#musicbrainzreleasecountry)
- [musicBrainzReleaseGroupId](combinedtag.md#musicbrainzreleasegroupid)
- [musicBrainzReleaseId](combinedtag.md#musicbrainzreleaseid)
- [musicBrainzReleaseStatus](combinedtag.md#musicbrainzreleasestatus)
- [musicBrainzReleaseType](combinedtag.md#musicbrainzreleasetype)
- [musicBrainzTrackId](combinedtag.md#musicbrainztrackid)
- [musicIpId](combinedtag.md#musicipid)
- [performers](combinedtag.md#performers)
- [performersRole](combinedtag.md#performersrole)
- [performersSort](combinedtag.md#performerssort)
- [pictures](combinedtag.md#pictures)
- [publisher](combinedtag.md#publisher)
- [remixedBy](combinedtag.md#remixedby)
- [replayGainAlbumGain](combinedtag.md#replaygainalbumgain)
- [replayGainAlbumPeak](combinedtag.md#replaygainalbumpeak)
- [replayGainTrackGain](combinedtag.md#replaygaintrackgain)
- [replayGainTrackPeak](combinedtag.md#replaygaintrackpeak)
- [subtitle](combinedtag.md#subtitle)
- [tagTypes](combinedtag.md#tagtypes)
- [tags](combinedtag.md#tags)
- [title](combinedtag.md#title)
- [titleSort](combinedtag.md#titlesort)
- [track](combinedtag.md#track)
- [trackCount](combinedtag.md#trackcount)
- [year](combinedtag.md#year)

### Methods

- [addTagInternal](combinedtag.md#addtaginternal)
- [clear](combinedtag.md#clear)
- [clearTags](combinedtag.md#cleartags)
- [copyTo](combinedtag.md#copyto)
- [insertTag](combinedtag.md#inserttag)
- [removeTag](combinedtag.md#removetag)
- [setInfoTag](combinedtag.md#setinfotag)
- [setTags](combinedtag.md#settags)
- [firstInGroup](combinedtag.md#firstingroup)
- [isFalsyOrLikeEmpty](combinedtag.md#isfalsyorlikeempty)
- [joinGroup](combinedtag.md#joingroup)

## Constructors

### constructor

\+ **new CombinedTag**(`tags?`: [*Tag*](tag.md)[]): [*CombinedTag*](combinedtag.md)

Constructs and initializes a new instance of [CombinedTag](combinedtag.md).

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`tags?` | [*Tag*](tag.md)[] | Optionally, a list of tags to combine in the new instance.    |

**Returns:** [*CombinedTag*](combinedtag.md)

Inherited from: [Tag](tag.md)

## Properties

### \_tags

• `Protected` **\_tags**: [*Tag*](tag.md)[]

## Accessors

### album

• **album**(): *string*

Gets the album title for the media described by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** *string*

• **album**(`val`: *string*): *void*

Sets the album title for the media described by the current instance.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *string* |

**Returns:** *void*

___

### albumArtists

• **albumArtists**(): *string*[]

Gets the band or artist is credited in the creation of the entire album or collection
containing the media described by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** *string*[]

• **albumArtists**(`val`: *string*[]): *void*

Sets the band or artist is credited in the creation of the entire album or collection
containing the media described by the current instance.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *string*[] |

**Returns:** *void*

___

### albumArtistsSort

• **albumArtistsSort**(): *string*[]

Gets the band or artist is credited in the creation of the entire album or collection
containing the media described by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** *string*[]

• **albumArtistsSort**(`val`: *string*[]): *void*

Sets the band or artist is credited in the creation of the entire album or collection
containing the media described by the current instance.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *string*[] |

**Returns:** *void*

___

### albumSort

• **albumSort**(): *string*

Gets the album title for sorting the media described by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** *string*

• **albumSort**(`val`: *string*): *void*

Sets the album title for sorting the media described by the current instance.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *string* |

**Returns:** *void*

___

### amazonId

• **amazonId**(): *string*

Gets the Amazon ID.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** *string*

• **amazonId**(`val`: *string*): *void*

Sets the Amazon ID.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *string* |

**Returns:** *void*

___

### beatsPerMinute

• **beatsPerMinute**(): *number*

Gets the number of beats per minute of the media represented by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** *number*

• **beatsPerMinute**(`val`: *number*): *void*

Sets the number of beats per minute of the media represented by the current instance. Must
be a positive integer positive integer.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *number* |

**Returns:** *void*

___

### comment

• **comment**(): *string*

Gets a user comment for the media described by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** *string*

• **comment**(`val`: *string*): *void*

Sets a user comment for the media described by the current instance.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *string* |

**Returns:** *void*

___

### composers

• **composers**(): *string*[]

Gets the composers of the media represented by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** *string*[]

• **composers**(`val`: *string*[]): *void*

Sets the composers of the media represented by the current instance.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *string*[] |

**Returns:** *void*

___

### composersSort

• **composersSort**(): *string*[]

Gets the composers of the media represented by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** *string*[]

• **composersSort**(`val`: *string*[]): *void*

Sets the composers of the media represented by the current instance.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *string*[] |

**Returns:** *void*

___

### conductor

• **conductor**(): *string*

Gets the conductor or director of the media represented by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** *string*

• **conductor**(`val`: *string*): *void*

Sets the conductor or director of the media represented by the current instance.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *string* |

**Returns:** *void*

___

### copyright

• **copyright**(): *string*

Gets the copyright information of the media represented by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** *string*

• **copyright**(`val`: *string*): *void*

Sets the copyright information of the media represented by the current instance.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *string* |

**Returns:** *void*

___

### dateTagged

• **dateTagged**(): Date

Gets the date at which the tag has been written.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** Date

• **dateTagged**(`val`: Date): *void*

Sets the date at which the tag has been written

#### Parameters:

Name | Type |
------ | ------ |
`val` | Date |

**Returns:** *void*

___

### description

• **description**(): *string*

Gets the description for the media described by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**`remarks`** This is especially relevant for a movie. For example, for "Back to the Future
    2", this could be "After visiting 2015, Marty McFly must repeat his visit to 1955 to
    prevent disastrous changes to 1985...without interfering with his first trip".

**Returns:** *string*

• **description**(`val`: *string*): *void*

Sets the description for the media described by the current instance.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *string* |

**Returns:** *void*

___

### disc

• **disc**(): *number*

Gets the number of the disc containing the media represented by the current instance in a
boxed set.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** *number*

• **disc**(`val`: *number*): *void*

Sets the number of the disc containing the media represented by the current instance in a
boxed set. Must be a positive integer positive integer.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *number* |

**Returns:** *void*

___

### discCount

• **discCount**(): *number*

Gets the number of the discs in the boxed set containing the media represented by the
current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** *number*

• **discCount**(`val`: *number*): *void*

Sets the number of the discs in the boxed set containing the media represented by the
current instance. Must be a positive integer positive integer.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *number* |

**Returns:** *void*

___

### firstAlbumArtist

• **firstAlbumArtist**(): *string*

Gets the the first value contained in [albumArtists](combinedtag.md#albumartists).

**Returns:** *string*

___

### firstAlbumArtistSort

• **firstAlbumArtistSort**(): *string*

Gets the first value contained in [albumArtistsSort](combinedtag.md#albumartistssort)

**Returns:** *string*

___

### firstComposer

• **firstComposer**(): *string*

Gets the first value contained in [composers](combinedtag.md#composers)

**Returns:** *string*

___

### firstComposerSort

• **firstComposerSort**(): *string*

Gets the first value contained in [composersSort](combinedtag.md#composerssort)

**Returns:** *string*

___

### firstGenre

• **firstGenre**(): *string*

Gets the first value contained in [genres](combinedtag.md#genres)

**Returns:** *string*

___

### firstPerformer

• **firstPerformer**(): *string*

Gets the first value contained in [performers](combinedtag.md#performers)

**Returns:** *string*

___

### firstPerformerSort

• **firstPerformerSort**(): *string*

Gets the first value contained in [performersSort](combinedtag.md#performerssort)

**Returns:** *string*

___

### genres

• **genres**(): *string*[]

Gets the album genres of the media represented by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** *string*[]

• **genres**(`val`: *string*[]): *void*

Sets the album genres of the media described by the current instance.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *string*[] |

**Returns:** *void*

___

### grouping

• **grouping**(): *string*

Gets the grouping on the album which the media in the current instance belongs to.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** *string*

• **grouping**(`val`: *string*): *void*

Sets the grouping on the album which the media in the current instance belongs to.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *string* |

**Returns:** *void*

___

### initialKey

• **initialKey**(): *string*

Gets the initial key of the media represented by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** *string*

• **initialKey**(`val`: *string*): *void*

Sets the initial key of the media represented by the current instance.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *string* |

**Returns:** *void*

___

### isEmpty

• **isEmpty**(): *boolean*

Whether or not the current instance is empty. If all child tags are empty, `true` is
returned, `false` otherwise.

**Returns:** *boolean*

___

### isrc

• **isrc**(): *string*

Gets the ISRC (International Standard Recording Code) of the media represented by the
current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** *string*

• **isrc**(`val`: *string*): *void*

Sets the ISRC (International Standard Recording Code) of the media represented by the
current instance.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *string* |

**Returns:** *void*

___

### joinedAlbumArtists

• **joinedAlbumArtists**(): *string*

Gets a semicolon and space separated string containing the values in [albumArtists](combinedtag.md#albumartists)

**Returns:** *string*

___

### joinedComposers

• **joinedComposers**(): *string*

Gets a semicolon and space separated string containing the values in [composers](combinedtag.md#composers)

**Returns:** *string*

___

### joinedGenres

• **joinedGenres**(): *string*

Gets a semicolon and space separated string containing the values in [genres](combinedtag.md#genres)

**Returns:** *string*

___

### joinedPerformers

• **joinedPerformers**(): *string*

Gets a semicolon and space separated string containing the values in [performers](combinedtag.md#performers)

**Returns:** *string*

___

### joinedPerformersSort

• **joinedPerformersSort**(): *string*

Gets a semicolon and space separated string containing the values in [performersSort](combinedtag.md#performerssort)

**Returns:** *string*

___

### lyrics

• **lyrics**(): *string*

Gets the lyrics or script of the media represented by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** *string*

• **lyrics**(`val`: *string*): *void*

Sets the lyrics or script of the media represented by the current instance.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *string* |

**Returns:** *void*

___

### musicBrainzArtistId

• **musicBrainzArtistId**(): *string*

Gets the MusicBrainz artist ID.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** *string*

• **musicBrainzArtistId**(`val`: *string*): *void*

Sets the MusicBrainz artist ID.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *string* |

**Returns:** *void*

___

### musicBrainzDiscId

• **musicBrainzDiscId**(): *string*

Gets the MusicBrainz disc ID.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** *string*

• **musicBrainzDiscId**(`val`: *string*): *void*

Sets the MusicBrainz disc ID.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *string* |

**Returns:** *void*

___

### musicBrainzReleaseArtistId

• **musicBrainzReleaseArtistId**(): *string*

Gets the MusicBrainz release artist ID.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** *string*

• **musicBrainzReleaseArtistId**(`val`: *string*): *void*

Sets the MusicBrainz release artist ID.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *string* |

**Returns:** *void*

___

### musicBrainzReleaseCountry

• **musicBrainzReleaseCountry**(): *string*

Gets the MusicBrainz release country.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** *string*

• **musicBrainzReleaseCountry**(`val`: *string*): *void*

Sets the MusicBrainz release country.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *string* |

**Returns:** *void*

___

### musicBrainzReleaseGroupId

• **musicBrainzReleaseGroupId**(): *string*

Gets the MusicBrainz release group ID.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** *string*

• **musicBrainzReleaseGroupId**(`val`: *string*): *void*

Sets the MusicBrainz release group ID.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *string* |

**Returns:** *void*

___

### musicBrainzReleaseId

• **musicBrainzReleaseId**(): *string*

Gets the MusicBrainz release ID.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** *string*

• **musicBrainzReleaseId**(`val`: *string*): *void*

Sets the MusicBrainz release ID.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *string* |

**Returns:** *void*

___

### musicBrainzReleaseStatus

• **musicBrainzReleaseStatus**(): *string*

Gets the MusicBrainz release status.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** *string*

• **musicBrainzReleaseStatus**(`val`: *string*): *void*

Sets the MusicBrainz release status.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *string* |

**Returns:** *void*

___

### musicBrainzReleaseType

• **musicBrainzReleaseType**(): *string*

Gets the MusicBrainz release type.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** *string*

• **musicBrainzReleaseType**(`val`: *string*): *void*

Sets the MusicBrainz release type.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *string* |

**Returns:** *void*

___

### musicBrainzTrackId

• **musicBrainzTrackId**(): *string*

Gets the MusicBrainz track ID.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** *string*

• **musicBrainzTrackId**(`val`: *string*): *void*

Sets the MusicBrainz track ID.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *string* |

**Returns:** *void*

___

### musicIpId

• **musicIpId**(): *string*

Gets the MusicIP PUID.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** *string*

• **musicIpId**(`val`: *string*): *void*

Sets the MusicIP PUID.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *string* |

**Returns:** *void*

___

### performers

• **performers**(): *string*[]

Gets the performers or artists who performed in the media described by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** *string*[]

• **performers**(`val`: *string*[]): *void*

Sets the performers in the media described by the current instance.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *string*[] |

**Returns:** *void*

___

### performersRole

• **performersRole**(): *string*[]

Gets the characters for a video media, or instruments played for music media. This should
match the [performers](combinedtag.md#performers) array (for each person correspond one/more role). Several roles
for the same artist/actor can be made up with semicolons. For example, "Marty McFly; Marty
McFly Jr.; Marlene McFly".
Returns the first non-null/non-undefined value from the child tags.

**`remarks`** This is typically useful for movies, although the instrument played by each
    artist in a music file may be of relevance.
    It is highly important to match each role to the performers. This means that a role may
    be `null\undefined` to keep a match betweenInclusive performers[i] and performersRole[i].

**Returns:** *string*[]

• **performersRole**(`val`: *string*[]): *void*

Sets the characters in a video media, or instruments played for music media.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *string*[] |

**Returns:** *void*

___

### performersSort

• **performersSort**(): *string*[]

Gets the performers or artists who performed in the media described by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** *string*[]

• **performersSort**(`val`: *string*[]): *void*

Sets the performers in the media described by the current instance.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *string*[] |

**Returns:** *void*

___

### pictures

• **pictures**(): [*IPicture*](../interfaces/ipicture.md)[]

Gets a collection of pictures associated with the media represented by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** [*IPicture*](../interfaces/ipicture.md)[]

• **pictures**(`val`: [*IPicture*](../interfaces/ipicture.md)[]): *void*

Sets the collection of pictures associated with the current media.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | [*IPicture*](../interfaces/ipicture.md)[] |

**Returns:** *void*

___

### publisher

• **publisher**(): *string*

Gets the publisher of the media represented by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** *string*

• **publisher**(`val`: *string*): *void*

Sets the publisher of the media represented by the current instance.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *string* |

**Returns:** *void*

___

### remixedBy

• **remixedBy**(): *string*

Gets the remixer of the media represented by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** *string*

• **remixedBy**(`val`: *string*): *void*

Sets the remixer of the media represented by the current instance.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *string* |

**Returns:** *void*

___

### replayGainAlbumGain

• **replayGainAlbumGain**(): *number*

Gets the ReplayGain album gain in dB.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** *number*

• **replayGainAlbumGain**(`val`: *number*): *void*

Sets the ReplayGain album gain in dB.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *number* |

**Returns:** *void*

___

### replayGainAlbumPeak

• **replayGainAlbumPeak**(): *number*

Gets the ReplayGain album peak sample.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** *number*

• **replayGainAlbumPeak**(`val`: *number*): *void*

Sets the ReplayGain album peak sample.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *number* |

**Returns:** *void*

___

### replayGainTrackGain

• **replayGainTrackGain**(): *number*

Gets the ReplayGain track gain in dB.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** *number*

• **replayGainTrackGain**(`val`: *number*): *void*

Sets the ReplayGain track gain in dB.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *number* |

**Returns:** *void*

___

### replayGainTrackPeak

• **replayGainTrackPeak**(): *number*

Gets the ReplayGain track peak sample.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** *number*

• **replayGainTrackPeak**(`val`: *number*): *void*

Sets the ReplayGain track peak sample.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *number* |

**Returns:** *void*

___

### subtitle

• **subtitle**(): *string*

Gets the subtitle for the media described by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**`remarks`** This field gives a nice short precision to the title, which is typically below
    the title on the front cover of the media. Example: for "Back to the Future", this would
    be "It's About Time".

**Returns:** *string*

• **subtitle**(`val`: *string*): *void*

Sets the subtitle for the media described by the current instance.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *string* |

**Returns:** *void*

___

### tagTypes

• **tagTypes**(): [*TagTypes*](../enums/tagtypes.md)

Gets the tag types contained in the current instance.

**Returns:** [*TagTypes*](../enums/tagtypes.md)

TagTypes Bitwise combined tag types contained in all child tags.

___

### tags

• **tags**(): [*Tag*](tag.md)[]

Gets the tags combined in the current instance.

**Returns:** [*Tag*](tag.md)[]

• **tags**(`tags`: [*Tag*](tag.md)[]): *void*

Sets the child tags to combine in the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`tags` | [*Tag*](tag.md)[] | Array of tags to combine    |

**Returns:** *void*

___

### title

• **title**(): *string*

Gets the title for the media described by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** *string*

• **title**(`val`: *string*): *void*

Sets the title for the media described by the current instance.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *string* |

**Returns:** *void*

___

### titleSort

• **titleSort**(): *string*

Gets the title used for sorting the media described by the current instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** *string*

• **titleSort**(`val`: *string*): *void*

Sets the title used for sorting the media described by the current instance.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *string* |

**Returns:** *void*

___

### track

• **track**(): *number*

Gets the position of the media represented by the current instance in its containing album.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** *number*

• **track**(`val`: *number*): *void*

Sets the position of the media represented by the current instance in its containing album.
Must be a positive integer positive integer.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *number* |

**Returns:** *void*

___

### trackCount

• **trackCount**(): *number*

Gets the number of tracks in the album containing the media represented by the current
instance.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** *number*

• **trackCount**(`val`: *number*): *void*

Sets the number of tracks in the album containing the media represented by the current
instance. Must be a positive integer positive integer.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *number* |

**Returns:** *void*

___

### year

• **year**(): *number*

Gets the year that the media represented by the current instance was recorded.
Returns the first non-null/non-undefined value from the child tags.

**Returns:** *number*

• **year**(`val`: *number*): *void*

Sets the year that the media represented by the current instance was recorded. Must be a
positive integer.
Sets the value on all child tags

#### Parameters:

Name | Type |
------ | ------ |
`val` | *number* |

**Returns:** *void*

## Methods

### addTagInternal

▸ `Protected`**addTagInternal**(`tag`: [*Tag*](tag.md)): *void*

#### Parameters:

Name | Type |
------ | ------ |
`tag` | [*Tag*](tag.md) |

**Returns:** *void*

___

### clear

▸ **clear**(): *void*

**`inheritdoc`** 
Clears all child tags.

**Returns:** *void*

Overrides: [Tag](tag.md)

___

### clearTags

▸ `Protected`**clearTags**(): *void*

**Returns:** *void*

___

### copyTo

▸ **copyTo**(`target`: [*Tag*](tag.md), `overwrite`: *boolean*): *void*

Copies the values from the current instance to another [Tag](tag.md), optionally overwriting
    existing values.

**`remarks`** This method only copies the mist basic values when copying between different tag
    formats. However, if `target` is of the same type as the current instance,
    more advanced copying may be done. For example if both `this` and `target` are
    [Id3v2Tag](id3v2tag.md), all frames will be copied to the target.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`target` | [*Tag*](tag.md) | Target tag to copy values to   |
`overwrite` | *boolean* | Whether or not to copy values over existing ones    |

**Returns:** *void*

Inherited from: [Tag](tag.md)

___

### insertTag

▸ `Protected`**insertTag**(`index`: *number*, `tag`: [*Tag*](tag.md)): *void*

#### Parameters:

Name | Type |
------ | ------ |
`index` | *number* |
`tag` | [*Tag*](tag.md) |

**Returns:** *void*

___

### removeTag

▸ `Protected`**removeTag**(`tag`: [*Tag*](tag.md)): *void*

#### Parameters:

Name | Type |
------ | ------ |
`tag` | [*Tag*](tag.md) |

**Returns:** *void*

___

### setInfoTag

▸ **setInfoTag**(): *void*

Set the tags that represent the tagger software (node-taglib-sharp) itself.

**`remarks`** This is typically a method to call just before saving a tag.

**Returns:** *void*

Inherited from: [Tag](tag.md)

___

### setTags

▸ **setTags**(...`tags`: [*Tag*](tag.md)[]): *void*

Sets the child tags to combine in the current instance

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`...tags` | [*Tag*](tag.md)[] | Tags to combine, falsy tags will be ignored    |

**Returns:** *void*

___

### firstInGroup

▸ `Protected` `Static`**firstInGroup**(`group`: *string*[]): *string*

Gets the first string in an array.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`group` | *string*[] | Array of strings to get the first string from.   |

**Returns:** *string*

First string contained in `group` or `undefined` if the array is
    `undefined` or empty

Inherited from: [Tag](tag.md)

___

### isFalsyOrLikeEmpty

▸ `Protected` `Static`**isFalsyOrLikeEmpty**(`value`: *string* \| *string*[]): *boolean*

Checks if a value is falsy or empty.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | *string* \| *string*[] | Object to check   |

**Returns:** *boolean*

If `value` is a string, `true` is returned if the value is falsy or all
    whitespace, `false` is returned otherwise. If `value` is an array of strings,
    the array must be falsy or all elements must be falsy or whitespace to return `true`.

Inherited from: [Tag](tag.md)

___

### joinGroup

▸ `Protected` `Static`**joinGroup**(`group`: *string*[]): *string*

Joins an array of string into a single, semicolon and space separated string.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`group` | *string*[] | Array of string to join   |

**Returns:** *string*

A semicolon and space separated string containing the values from `group`
    or undefined if the array is `undefined` or empty.

Inherited from: [Tag](tag.md)
