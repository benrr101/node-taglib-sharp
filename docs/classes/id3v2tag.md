[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2Tag

# Class: Id3v2Tag

## Hierarchy

* [*Tag*](tag.md)

  ↳ **Id3v2Tag**

## Table of contents

### Accessors

- [album](id3v2tag.md#album)
- [albumArtists](id3v2tag.md#albumartists)
- [albumArtistsSort](id3v2tag.md#albumartistssort)
- [albumSort](id3v2tag.md#albumsort)
- [amazonId](id3v2tag.md#amazonid)
- [beatsPerMinute](id3v2tag.md#beatsperminute)
- [comment](id3v2tag.md#comment)
- [composers](id3v2tag.md#composers)
- [composersSort](id3v2tag.md#composerssort)
- [conductor](id3v2tag.md#conductor)
- [copyright](id3v2tag.md#copyright)
- [dateTagged](id3v2tag.md#datetagged)
- [description](id3v2tag.md#description)
- [disc](id3v2tag.md#disc)
- [discCount](id3v2tag.md#disccount)
- [firstAlbumArtist](id3v2tag.md#firstalbumartist)
- [firstAlbumArtistSort](id3v2tag.md#firstalbumartistsort)
- [firstComposer](id3v2tag.md#firstcomposer)
- [firstComposerSort](id3v2tag.md#firstcomposersort)
- [firstGenre](id3v2tag.md#firstgenre)
- [firstPerformer](id3v2tag.md#firstperformer)
- [firstPerformerSort](id3v2tag.md#firstperformersort)
- [flags](id3v2tag.md#flags)
- [frames](id3v2tag.md#frames)
- [genres](id3v2tag.md#genres)
- [grouping](id3v2tag.md#grouping)
- [initialKey](id3v2tag.md#initialkey)
- [isCompilation](id3v2tag.md#iscompilation)
- [isEmpty](id3v2tag.md#isempty)
- [isrc](id3v2tag.md#isrc)
- [joinedAlbumArtists](id3v2tag.md#joinedalbumartists)
- [joinedComposers](id3v2tag.md#joinedcomposers)
- [joinedGenres](id3v2tag.md#joinedgenres)
- [joinedPerformers](id3v2tag.md#joinedperformers)
- [joinedPerformersSort](id3v2tag.md#joinedperformerssort)
- [lyrics](id3v2tag.md#lyrics)
- [musicBrainzArtistId](id3v2tag.md#musicbrainzartistid)
- [musicBrainzDiscId](id3v2tag.md#musicbrainzdiscid)
- [musicBrainzReleaseArtistId](id3v2tag.md#musicbrainzreleaseartistid)
- [musicBrainzReleaseCountry](id3v2tag.md#musicbrainzreleasecountry)
- [musicBrainzReleaseGroupId](id3v2tag.md#musicbrainzreleasegroupid)
- [musicBrainzReleaseId](id3v2tag.md#musicbrainzreleaseid)
- [musicBrainzReleaseStatus](id3v2tag.md#musicbrainzreleasestatus)
- [musicBrainzReleaseType](id3v2tag.md#musicbrainzreleasetype)
- [musicBrainzTrackId](id3v2tag.md#musicbrainztrackid)
- [musicIpId](id3v2tag.md#musicipid)
- [performers](id3v2tag.md#performers)
- [performersRole](id3v2tag.md#performersrole)
- [performersSort](id3v2tag.md#performerssort)
- [pictures](id3v2tag.md#pictures)
- [publisher](id3v2tag.md#publisher)
- [remixedBy](id3v2tag.md#remixedby)
- [replayGainAlbumGain](id3v2tag.md#replaygainalbumgain)
- [replayGainAlbumPeak](id3v2tag.md#replaygainalbumpeak)
- [replayGainTrackGain](id3v2tag.md#replaygaintrackgain)
- [replayGainTrackPeak](id3v2tag.md#replaygaintrackpeak)
- [subtitle](id3v2tag.md#subtitle)
- [tagTypes](id3v2tag.md#tagtypes)
- [title](id3v2tag.md#title)
- [titleSort](id3v2tag.md#titlesort)
- [track](id3v2tag.md#track)
- [trackCount](id3v2tag.md#trackcount)
- [version](id3v2tag.md#version)
- [year](id3v2tag.md#year)
- [language](id3v2tag.md#language)

### Methods

- [addFrame](id3v2tag.md#addframe)
- [clear](id3v2tag.md#clear)
- [copyTo](id3v2tag.md#copyto)
- [getFramesByClassType](id3v2tag.md#getframesbyclasstype)
- [getFramesByIdentifier](id3v2tag.md#getframesbyidentifier)
- [getTextAsString](id3v2tag.md#gettextasstring)
- [parse](id3v2tag.md#parse)
- [read](id3v2tag.md#read)
- [removeFrame](id3v2tag.md#removeframe)
- [removeFrames](id3v2tag.md#removeframes)
- [render](id3v2tag.md#render)
- [replaceFrame](id3v2tag.md#replaceframe)
- [setInfoTag](id3v2tag.md#setinfotag)
- [setNumberFrame](id3v2tag.md#setnumberframe)
- [setTextFrame](id3v2tag.md#settextframe)
- [firstInGroup](id3v2tag.md#firstingroup)
- [fromData](id3v2tag.md#fromdata)
- [fromEmpty](id3v2tag.md#fromempty)
- [fromFile](id3v2tag.md#fromfile)
- [isFalsyOrLikeEmpty](id3v2tag.md#isfalsyorlikeempty)
- [joinGroup](id3v2tag.md#joingroup)

## Accessors

### album

• **album**(): *string*

Gets the album of the media represented by the current instance. For video media, this
represents the collection the video belongs to.

**`inheritdoc`** TALB frame

**Returns:** *string*

Album of the media represented by the current instance or `undefined` if no value
    is present

• **album**(`value`: *string*): *void*

Gets the album of the media represented by the current instance. For video media, this
represents the collection the video belongs to.

**`inheritdoc`** TALB frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string* |

**Returns:** *void*

Album of the media represented by the current instance or `undefined` if no value
    is present

___

### albumArtists

• **albumArtists**(): *string*[]

Gets the band or artist who is credited credited in the creation of the entire album or
collection containing the media described by the current instance.

**`inheritdoc`** TSO2 frame

**Returns:** *string*[]

Band or artist credited with the creation of the entire album or collection
    containing the media described by the current instance or an empty array if no value is
    present

• **albumArtists**(`value`: *string*[]): *void*

Gets the band or artist who is credited credited in the creation of the entire album or
collection containing the media described by the current instance.

**`inheritdoc`** TSO2 frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string*[] |

**Returns:** *void*

Band or artist credited with the creation of the entire album or collection
    containing the media described by the current instance or an empty array if no value is
    present

___

### albumArtistsSort

• **albumArtistsSort**(): *string*[]

Gets the sortable names of the bands/artists who are credited with creating the entire
album or collection containing the media described by the current instance.

**`inheritdoc`** TPE2 frame

**Returns:** *string*[]

Sortable names for the bands/artists are credited with the creation of the entire
    album or collection containing the media described by the current instance, or an empty
    array if no value is present.

• **albumArtistsSort**(`value`: *string*[]): *void*

Gets the sortable names of the bands/artists who are credited with creating the entire
album or collection containing the media described by the current instance.

**`inheritdoc`** TPE2 frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string*[] |

**Returns:** *void*

Sortable names for the bands/artists are credited with the creation of the entire
    album or collection containing the media described by the current instance, or an empty
    array if no value is present.

___

### albumSort

• **albumSort**(): *string*

Gets the sortable name of the album title of the media represented by the current instance.

**`inheritdoc`** TSOA frame

**Returns:** *string*

Sortable name for the album title of the media or `undefined` if the value is not
    present

• **albumSort**(`value`: *string*): *void*

Gets the sortable name of the album title of the media represented by the current instance.

**`inheritdoc`** TSOA frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string* |

**Returns:** *void*

Sortable name for the album title of the media or `undefined` if the value is not
    present

___

### amazonId

• **amazonId**(): *string*

Gets the Amazon ID of the media represented by the current instance.

**`inheritdoc`** TXXX:ASIN

**Returns:** *string*

Amazon ID of the media represented by the current instance or `undefined` if no
    value is present

• **amazonId**(`value`: *string*): *void*

Gets the Amazon ID of the media represented by the current instance.

**`inheritdoc`** TXXX:ASIN

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string* |

**Returns:** *void*

Amazon ID of the media represented by the current instance or `undefined` if no
    value is present

___

### beatsPerMinute

• **beatsPerMinute**(): *number*

Gets the number of beats per minute in the audio of the media represented by the current
instance.

**`inheritdoc`** TBPM frame

**Returns:** *number*

Beats per minute of the audio in the media represented by the current instance, or
    `0` if not specified

• **beatsPerMinute**(`value`: *number*): *void*

Gets the number of beats per minute in the audio of the media represented by the current
instance.

**`inheritdoc`** TBPM frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | *number* |

**Returns:** *void*

Beats per minute of the audio in the media represented by the current instance, or
    `0` if not specified

___

### comment

• **comment**(): *string*

Gets a user comment on the media represented by the current instance.

**`inheritdoc`** COMM frame

**Returns:** *string*

User comments on the media represented by the current instance or `undefined` if
    the value is not present

• **comment**(`value`: *string*): *void*

Gets a user comment on the media represented by the current instance.

**`inheritdoc`** COMM frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string* |

**Returns:** *void*

User comments on the media represented by the current instance or `undefined` if
    the value is not present

___

### composers

• **composers**(): *string*[]

Gets the composers of the media represented by the current instance.

**`inheritdoc`** TCOM frame

**Returns:** *string*[]

Composers of the media represented by the current instance of an empty array if no
    value is present.

• **composers**(`value`: *string*[]): *void*

Gets the composers of the media represented by the current instance.

**`inheritdoc`** TCOM frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string*[] |

**Returns:** *void*

Composers of the media represented by the current instance of an empty array if no
    value is present.

___

### composersSort

• **composersSort**(): *string*[]

Gets the sortable names of the composers of the media represented by the current instance.

**`inheritdoc`** TSOC frame

**Returns:** *string*[]

Sortable names for the composers of the media represented by the current instance
    or an empty array if no value is present.

• **composersSort**(`value`: *string*[]): *void*

Gets the sortable names of the composers of the media represented by the current instance.

**`inheritdoc`** TSOC frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string*[] |

**Returns:** *void*

Sortable names for the composers of the media represented by the current instance
    or an empty array if no value is present.

___

### conductor

• **conductor**(): *string*

Gets the conductor or director of the media represented by the current instance.

**`inheritdoc`** TPE3 frame

**Returns:** *string*

Conductor or director of the media represented by the current instance or
    `undefined` if no value present.

• **conductor**(`value`: *string*): *void*

Gets the conductor or director of the media represented by the current instance.

**`inheritdoc`** TPE3 frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string* |

**Returns:** *void*

Conductor or director of the media represented by the current instance or
    `undefined` if no value present.

___

### copyright

• **copyright**(): *string*

Gets the copyright information for the media represented by the current instance.

**`inheritdoc`** TCOP frame

**Returns:** *string*

Copyright information for the media represented by the current instance or
    `undefined` if no value is present.

• **copyright**(`value`: *string*): *void*

Gets the copyright information for the media represented by the current instance.

**`inheritdoc`** TCOP frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string* |

**Returns:** *void*

Copyright information for the media represented by the current instance or
    `undefined` if no value is present.

___

### dateTagged

• **dateTagged**(): Date

Gets the date and time at which the tag has been written.

**`inheritdoc`** TDTG frame

**Returns:** Date

Date/time at which the tag has been written, or `undefined` if no value is present

• **dateTagged**(`value`: Date): *void*

Gets the date and time at which the tag has been written.

**`inheritdoc`** TDTG frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | Date |

**Returns:** *void*

Date/time at which the tag has been written, or `undefined` if no value is present

___

### description

• **description**(): *string*

Gets a short description of the media. For music, this could be the comment that the artist
made of his/her work. For a video, this should be a short summary of the story/plot, but
generally no spoliers. This should give the impression of what to expect in the media.

**`inheritdoc`** user text frame "description"

**Returns:** *string*

Description of the media represented by the current instance or `undefined` if no
    value is present

• **description**(`value`: *string*): *void*

Gets a short description of the media. For music, this could be the comment that the artist
made of his/her work. For a video, this should be a short summary of the story/plot, but
generally no spoliers. This should give the impression of what to expect in the media.

**`inheritdoc`** user text frame "description"

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string* |

**Returns:** *void*

Description of the media represented by the current instance or `undefined` if no
    value is present

___

### disc

• **disc**(): *number*

Gets the number of the disc containing the media represented by the current instance in the
boxed set. For a series, this represents the season number.

**`inheritdoc`** TPOS frame

**Returns:** *number*

Number of the disc or season of the media represented by the current instance in a
    boxed set.

• **disc**(`value`: *number*): *void*

Gets the number of the disc containing the media represented by the current instance in the
boxed set. For a series, this represents the season number.

**`inheritdoc`** TPOS frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | *number* |

**Returns:** *void*

Number of the disc or season of the media represented by the current instance in a
    boxed set.

___

### discCount

• **discCount**(): *number*

Gets the number of discs or seasons in the boxed set containing the media represented by the
current instance.

**`inheritdoc`** TPOS frame

**Returns:** *number*

Number of discs or seasons in the boxed set containing the media represented by the
    current instance or `0` if not specified.

• **discCount**(`value`: *number*): *void*

Gets the number of discs or seasons in the boxed set containing the media represented by the
current instance.

**`inheritdoc`** TPOS frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | *number* |

**Returns:** *void*

Number of discs or seasons in the boxed set containing the media represented by the
    current instance or `0` if not specified.

___

### firstAlbumArtist

• **firstAlbumArtist**(): *string*

Gets the the first value contained in [albumArtists](id3v2tag.md#albumartists).

**Returns:** *string*

___

### firstAlbumArtistSort

• **firstAlbumArtistSort**(): *string*

Gets the first value contained in [albumArtistsSort](id3v2tag.md#albumartistssort)

**Returns:** *string*

___

### firstComposer

• **firstComposer**(): *string*

Gets the first value contained in [composers](id3v2tag.md#composers)

**Returns:** *string*

___

### firstComposerSort

• **firstComposerSort**(): *string*

Gets the first value contained in [composersSort](id3v2tag.md#composerssort)

**Returns:** *string*

___

### firstGenre

• **firstGenre**(): *string*

Gets the first value contained in [genres](id3v2tag.md#genres)

**Returns:** *string*

___

### firstPerformer

• **firstPerformer**(): *string*

Gets the first value contained in [performers](id3v2tag.md#performers)

**Returns:** *string*

___

### firstPerformerSort

• **firstPerformerSort**(): *string*

Gets the first value contained in [performersSort](id3v2tag.md#performerssort)

**Returns:** *string*

___

### flags

• **flags**(): [*Id3v2TagHeaderFlags*](../enums/id3v2tagheaderflags.md)

Gets the header flags applied to the current instance.

**Returns:** [*Id3v2TagHeaderFlags*](../enums/id3v2tagheaderflags.md)

• **flags**(`value`: [*Id3v2TagHeaderFlags*](../enums/id3v2tagheaderflags.md)): *void*

Sets the header flags applied to the current instance

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | [*Id3v2TagHeaderFlags*](../enums/id3v2tagheaderflags.md) | Bitwise combined [Id3v2TagHeaderFlags](../enums/id3v2tagheaderflags.md) value containing flags applied to the     current instance.    |

**Returns:** *void*

___

### frames

• **frames**(): [*Id3v2Frame*](id3v2frame.md)[]

Gets all frames contained in the current instance.

**Returns:** [*Id3v2Frame*](id3v2frame.md)[]

___

### genres

• **genres**(): *string*[]

Gets the genres of the media represented by the current instance.

**`inheritdoc`** TCON frame

**Returns:** *string*[]

Genres of the media represented by the current instance or an empty array if no
    value is present.

• **genres**(`value`: *string*[]): *void*

Gets the genres of the media represented by the current instance.

**`inheritdoc`** TCON frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string*[] |

**Returns:** *void*

Genres of the media represented by the current instance or an empty array if no
    value is present.

___

### grouping

• **grouping**(): *string*

Gets the grouping on the album which the media in the current instance belongs to.

**`inheritdoc`** TIT1 frame

**Returns:** *string*

Grouping on the album which the media in the current instance belongs to or
    `undefined` if no value is present.

• **grouping**(`value`: *string*): *void*

Gets the grouping on the album which the media in the current instance belongs to.

**`inheritdoc`** TIT1 frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string* |

**Returns:** *void*

Grouping on the album which the media in the current instance belongs to or
    `undefined` if no value is present.

___

### initialKey

• **initialKey**(): *string*

Gets the initial key of the track.

**`inheritdoc`** TKEY frame

**Returns:** *string*

Initial key of the track or `undefined` if no value is set

• **initialKey**(`value`: *string*): *void*

Gets the initial key of the track.

**`inheritdoc`** TKEY frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string* |

**Returns:** *void*

Initial key of the track or `undefined` if no value is set

___

### isCompilation

• **isCompilation**(): *boolean*

Gets whether or not the album described by the current instance is a compilation.
This property is implemented using the TCMP Text Information Frame to provide support for a
feature of the Apple iPod and iTunes products.

**Returns:** *boolean*

• **isCompilation**(`value`: *boolean*): *void*

Gets whether or not the album described by the current instance is a compilation.
This property is implemented using the TCMP Text Information Frame to provide support for a
feature of the Apple iPod and iTunes products.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | *boolean* | Whether or not the album described by the current instance is a compilation    |

**Returns:** *void*

___

### isEmpty

• **isEmpty**(): *boolean*

Gets whether or not the current instance is empty.

**`inheritdoc`** 

**Returns:** *boolean*

`true` if the current instance does not contain any values. `false` otherwise

___

### isrc

• **isrc**(): *string*

Gets the ISRC (International Standard Recording Code) of the track.

**`inheritdoc`** TSRC frame

**Returns:** *string*

the ISRC of the track or `undefined` if no value is set

• **isrc**(`value`: *string*): *void*

Gets the ISRC (International Standard Recording Code) of the track.

**`inheritdoc`** TSRC frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string* |

**Returns:** *void*

the ISRC of the track or `undefined` if no value is set

___

### joinedAlbumArtists

• **joinedAlbumArtists**(): *string*

Gets a semicolon and space separated string containing the values in [albumArtists](id3v2tag.md#albumartists)

**Returns:** *string*

___

### joinedComposers

• **joinedComposers**(): *string*

Gets a semicolon and space separated string containing the values in [composers](id3v2tag.md#composers)

**Returns:** *string*

___

### joinedGenres

• **joinedGenres**(): *string*

Gets a semicolon and space separated string containing the values in [genres](id3v2tag.md#genres)

**Returns:** *string*

___

### joinedPerformers

• **joinedPerformers**(): *string*

Gets a semicolon and space separated string containing the values in [performers](id3v2tag.md#performers)

**Returns:** *string*

___

### joinedPerformersSort

• **joinedPerformersSort**(): *string*

Gets a semicolon and space separated string containing the values in [performersSort](id3v2tag.md#performerssort)

**Returns:** *string*

___

### lyrics

• **lyrics**(): *string*

Gets the lyrics or script of the media represented by the current instance.

**`inheritdoc`** USLT frame

**Returns:** *string*

Lyrics or script of the media represented by the current instance or `undefined` if
    no value is present

• **lyrics**(`value`: *string*): *void*

Gets the lyrics or script of the media represented by the current instance.

**`inheritdoc`** USLT frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string* |

**Returns:** *void*

Lyrics or script of the media represented by the current instance or `undefined` if
    no value is present

___

### musicBrainzArtistId

• **musicBrainzArtistId**(): *string*

Gets the MusicBrainz artist ID of the media represented by the current instance.

**`inheritdoc`** TXXX:MusicBrainz Artist Id frame

**Returns:** *string*

MusicBrainz ArtistID of the media represented by the current instance or
    `undefined` if no value is present

• **musicBrainzArtistId**(`value`: *string*): *void*

Gets the MusicBrainz artist ID of the media represented by the current instance.

**`inheritdoc`** TXXX:MusicBrainz Artist Id frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string* |

**Returns:** *void*

MusicBrainz ArtistID of the media represented by the current instance or
    `undefined` if no value is present

___

### musicBrainzDiscId

• **musicBrainzDiscId**(): *string*

Gets the MusicBrainz disc ID of the media represented by the current instance.

**`inheritdoc`** TXXX:MusicBrainz Disc Id frame

**Returns:** *string*

MusicBrainz DiscID of the media represented by the current instance or `undefined`
    if no value is present

• **musicBrainzDiscId**(`value`: *string*): *void*

Gets the MusicBrainz disc ID of the media represented by the current instance.

**`inheritdoc`** TXXX:MusicBrainz Disc Id frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string* |

**Returns:** *void*

MusicBrainz DiscID of the media represented by the current instance or `undefined`
    if no value is present

___

### musicBrainzReleaseArtistId

• **musicBrainzReleaseArtistId**(): *string*

Gets the MusicBrainz release artist ID of the media represented by the current instance.

**`inheritdoc`** TXXX:MusicBrainz Album Artist Id frame

**Returns:** *string*

MusicBrainz ReleaseArtistID of the media represented by the current instance or
    `undefined` if no value is present

• **musicBrainzReleaseArtistId**(`value`: *string*): *void*

Gets the MusicBrainz release artist ID of the media represented by the current instance.

**`inheritdoc`** TXXX:MusicBrainz Album Artist Id frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string* |

**Returns:** *void*

MusicBrainz ReleaseArtistID of the media represented by the current instance or
    `undefined` if no value is present

___

### musicBrainzReleaseCountry

• **musicBrainzReleaseCountry**(): *string*

Gets the MusicBrainz release country of the media represented by the current instance.

**`inheritdoc`** TXXX:MusicBrainz Album Release Country frame

**Returns:** *string*

MusicBrainz ReleaseCountry of the media represented by the current instance or
    `undefined` if no value is present

• **musicBrainzReleaseCountry**(`value`: *string*): *void*

Gets the MusicBrainz release country of the media represented by the current instance.

**`inheritdoc`** TXXX:MusicBrainz Album Release Country frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string* |

**Returns:** *void*

MusicBrainz ReleaseCountry of the media represented by the current instance or
    `undefined` if no value is present

___

### musicBrainzReleaseGroupId

• **musicBrainzReleaseGroupId**(): *string*

Gets the MusicBrainz release group ID of the media represented by the current instance.

**`inheritdoc`** TXXX:MusicBrainz Release Group Id frame

**Returns:** *string*

MusicBrainz ReleaseGroupID of the media represented by the current instance or
    `undefined` if no value is present

• **musicBrainzReleaseGroupId**(`value`: *string*): *void*

Gets the MusicBrainz release group ID of the media represented by the current instance.

**`inheritdoc`** TXXX:MusicBrainz Release Group Id frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string* |

**Returns:** *void*

MusicBrainz ReleaseGroupID of the media represented by the current instance or
    `undefined` if no value is present

___

### musicBrainzReleaseId

• **musicBrainzReleaseId**(): *string*

Gets the MusicBrainz release ID of the media represented by the current instance.

**`inheritdoc`** TXXX:MusicBrainz Album Id frame

**Returns:** *string*

MusicBrainz ReleaseID of the media represented by the current instance or
    `undefined` if no value is present

• **musicBrainzReleaseId**(`value`: *string*): *void*

Gets the MusicBrainz release ID of the media represented by the current instance.

**`inheritdoc`** TXXX:MusicBrainz Album Id frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string* |

**Returns:** *void*

MusicBrainz ReleaseID of the media represented by the current instance or
    `undefined` if no value is present

___

### musicBrainzReleaseStatus

• **musicBrainzReleaseStatus**(): *string*

Gets the MusicBrainz release status of the media represented by the current instance.

**`inheritdoc`** TXXX:MusicBrainz Album Status frame

**Returns:** *string*

MusicBrainz ReleaseStatus of the media represented by the current instance or
    `undefined` if no value is present

• **musicBrainzReleaseStatus**(`value`: *string*): *void*

Gets the MusicBrainz release status of the media represented by the current instance.

**`inheritdoc`** TXXX:MusicBrainz Album Status frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string* |

**Returns:** *void*

MusicBrainz ReleaseStatus of the media represented by the current instance or
    `undefined` if no value is present

___

### musicBrainzReleaseType

• **musicBrainzReleaseType**(): *string*

Gets the MusicBrainz release type of the media represented by the current instance.

**`inheritdoc`** TXXX:MusicBrainz Album Type frame

**Returns:** *string*

MusicBrainz ReleaseType of the media represented by the current instance or
    `undefined` if no value is present

• **musicBrainzReleaseType**(`value`: *string*): *void*

Gets the MusicBrainz release type of the media represented by the current instance.

**`inheritdoc`** TXXX:MusicBrainz Album Type frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string* |

**Returns:** *void*

MusicBrainz ReleaseType of the media represented by the current instance or
    `undefined` if no value is present

___

### musicBrainzTrackId

• **musicBrainzTrackId**(): *string*

Gets the MusicBrainz track ID of the media represented by the media represented by the
current instance.

**`inheritdoc`** UFID:http://musicbrainz.org frame

**Returns:** *string*

MusicBrainz TrackID of the media represented by the current instance or `undefined`
    if no value is present

• **musicBrainzTrackId**(`value`: *string*): *void*

Gets the MusicBrainz track ID of the media represented by the media represented by the
current instance.

**`inheritdoc`** UFID:http://musicbrainz.org frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string* |

**Returns:** *void*

MusicBrainz TrackID of the media represented by the current instance or `undefined`
    if no value is present

___

### musicIpId

• **musicIpId**(): *string*

Gets the MusicIP PUID of the media represented by the current instance.

**`inheritdoc`** TXXX:MusicIP PUID frame

**Returns:** *string*

MusicIP PUID of the media represented by the current instance or `undefined` if no
    value is present

• **musicIpId**(`value`: *string*): *void*

Gets the MusicIP PUID of the media represented by the current instance.

**`inheritdoc`** TXXX:MusicIP PUID frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string* |

**Returns:** *void*

MusicIP PUID of the media represented by the current instance or `undefined` if no
    value is present

___

### performers

• **performers**(): *string*[]

Gets the performers or artists who performed in the media described by the current instance.

**`inheritdoc`** TPE1 frame

**Returns:** *string*[]

Performers who performed in the media described by the current instance or an empty
    array if no value is present.

• **performers**(`value`: *string*[]): *void*

Gets the performers or artists who performed in the media described by the current instance.

**`inheritdoc`** TPE1 frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string*[] |

**Returns:** *void*

Performers who performed in the media described by the current instance or an empty
    array if no value is present.

___

### performersRole

• **performersRole**(): *string*[]

Gets the characters portrayed by an actor for a video or instruments played by a musician
for music. This must match the [performers](id3v2tag.md#performers) array (for each person, correspond one/more
role). Several roles for the same artist/actor can be separated with semicolons. For
example: "Bass; Backing Vocals; Vibraphone".

**`inheritdoc`** TMCL frame

**Returns:** *string*[]

Array containing the roles played by the performers in the media described by the
    current instance, or an empty array if no value is present.

• **performersRole**(`value`: *string*[]): *void*

Gets the characters portrayed by an actor for a video or instruments played by a musician
for music. This must match the [performers](id3v2tag.md#performers) array (for each person, correspond one/more
role). Several roles for the same artist/actor can be separated with semicolons. For
example: "Bass; Backing Vocals; Vibraphone".

**`inheritdoc`** TMCL frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string*[] |

**Returns:** *void*

Array containing the roles played by the performers in the media described by the
    current instance, or an empty array if no value is present.

___

### performersSort

• **performersSort**(): *string*[]

Gets the sortable names of the performers or artists who performed in the media described by
the current instance.

**`inheritdoc`** TSOP frame

**Returns:** *string*[]

Sortable names for the performers who performed in the media described by the
    current instance, or an empty array if no value is present.

• **performersSort**(`value`: *string*[]): *void*

Gets the sortable names of the performers or artists who performed in the media described by
the current instance.

**`inheritdoc`** TSOP frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string*[] |

**Returns:** *void*

Sortable names for the performers who performed in the media described by the
    current instance, or an empty array if no value is present.

___

### pictures

• **pictures**(): [*IPicture*](../interfaces/ipicture.md)[]

Gets a collection of pictures associated with the media represented by the current instance.

**`inheritdoc`** APIC frame

**Returns:** [*IPicture*](../interfaces/ipicture.md)[]

Array containing a collection of pictures associated with the media represented by
    the current instance or an empty array if no pictures are present.

• **pictures**(`value`: [*IPicture*](../interfaces/ipicture.md)[]): *void*

Gets a collection of pictures associated with the media represented by the current instance.

**`inheritdoc`** APIC frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | [*IPicture*](../interfaces/ipicture.md)[] |

**Returns:** *void*

Array containing a collection of pictures associated with the media represented by
    the current instance or an empty array if no pictures are present.

___

### publisher

• **publisher**(): *string*

Gets the publisher of the track.

**`inheritdoc`** TPUB frame

**Returns:** *string*

Publisher of the track or `undefined` if no value is set

• **publisher**(`value`: *string*): *void*

Gets the publisher of the track.

**`inheritdoc`** TPUB frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string* |

**Returns:** *void*

Publisher of the track or `undefined` if no value is set

___

### remixedBy

• **remixedBy**(): *string*

Gets the remixer of the track.

**`inheritdoc`** TPE4 frame

**Returns:** *string*

Remixer of the track or `undefined` if no value is set

• **remixedBy**(`value`: *string*): *void*

Gets the remixer of the track.

**`inheritdoc`** TPE4 frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string* |

**Returns:** *void*

Remixer of the track or `undefined` if no value is set

___

### replayGainAlbumGain

• **replayGainAlbumGain**(): *number*

Gets the ReplayGain album gain in dB.

**`inheritdoc`** TXXX:REPLAYGAIN_ALBUM_GAIN frame

**Returns:** *number*

Album gain as per the ReplayGain specifications, in dB, or `NaN` if no value is set

• **replayGainAlbumGain**(`value`: *number*): *void*

Gets the ReplayGain album gain in dB.

**`inheritdoc`** TXXX:REPLAYGAIN_ALBUM_GAIN frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | *number* |

**Returns:** *void*

Album gain as per the ReplayGain specifications, in dB, or `NaN` if no value is set

___

### replayGainAlbumPeak

• **replayGainAlbumPeak**(): *number*

Gets the ReplayGain album peak sample.

**`inheritdoc`** TXXX:REPLAYGAIN_ALBUM_PEAK frame

**Returns:** *number*

Album peak as per the ReplayGain specifications, or `NaN` if no value is set

• **replayGainAlbumPeak**(`value`: *number*): *void*

Gets the ReplayGain album peak sample.

**`inheritdoc`** TXXX:REPLAYGAIN_ALBUM_PEAK frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | *number* |

**Returns:** *void*

Album peak as per the ReplayGain specifications, or `NaN` if no value is set

___

### replayGainTrackGain

• **replayGainTrackGain**(): *number*

Gets the ReplayGain track gain in dB.

**`inheritdoc`** TXXX:REPLAY_GAIN_TRACK_GAIN frame

**Returns:** *number*

Track gain as per ReplayGain specifications, in dB, or `NaN` if no value is set

• **replayGainTrackGain**(`value`: *number*): *void*

Gets the ReplayGain track gain in dB.

**`inheritdoc`** TXXX:REPLAY_GAIN_TRACK_GAIN frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | *number* |

**Returns:** *void*

Track gain as per ReplayGain specifications, in dB, or `NaN` if no value is set

___

### replayGainTrackPeak

• **replayGainTrackPeak**(): *number*

Gets the ReplayGain track peak sample.

**`inheritdoc`** TXXX:REPLAYGAIN_TRACK_PEAK frame

**Returns:** *number*

Track peak as per the ReplayGain specifications, or `NaN` if no value is set

• **replayGainTrackPeak**(`value`: *number*): *void*

Gets the ReplayGain track peak sample.

**`inheritdoc`** TXXX:REPLAYGAIN_TRACK_PEAK frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | *number* |

**Returns:** *void*

Track peak as per the ReplayGain specifications, or `NaN` if no value is set

___

### subtitle

• **subtitle**(): *string*

Gets a description, one-line. It represents the tagline of the vide/music.

**`inheritdoc`** TIT3 frame

**Returns:** *string*

Subtitle of the media represented by the current instance or `undefined` if no
    value is present

• **subtitle**(`value`: *string*): *void*

Gets a description, one-line. It represents the tagline of the vide/music.

**`inheritdoc`** TIT3 frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string* |

**Returns:** *void*

Subtitle of the media represented by the current instance or `undefined` if no
    value is present

___

### tagTypes

• **tagTypes**(): [*TagTypes*](../enums/tagtypes.md)

Gets the tag types contained in the current instance. A bit wise combined [TagTypes](../enums/tagtypes.md)
containing the tag types contained in the current instance.

**`inheritdoc`** 

**Returns:** [*TagTypes*](../enums/tagtypes.md)

___

### title

• **title**(): *string*

Gets the title for the media described by the current instance.

**`inheritdoc`** TIT2 frame

**Returns:** *string*

Title of the media described by the current instance or `undefined` if no value is
    present.

• **title**(`value`: *string*): *void*

Gets the title for the media described by the current instance.

**`inheritdoc`** TIT2 frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string* |

**Returns:** *void*

Title of the media described by the current instance or `undefined` if no value is
    present.

___

### titleSort

• **titleSort**(): *string*

Gets the sortable name for the title of the media described by the current instance.

**`inheritdoc`** TSOT frame

**Returns:** *string*

Sortable name of the media described by the current instance or `undefined` if no
    value is present

• **titleSort**(`value`: *string*): *void*

Gets the sortable name for the title of the media described by the current instance.

**`inheritdoc`** TSOT frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | *string* |

**Returns:** *void*

Sortable name of the media described by the current instance or `undefined` if no
    value is present

___

### track

• **track**(): *number*

Gets the position of the media represented by the current instance in its containing album
or season (for a series).

**`inheritdoc`** TRCK frame

**Returns:** *number*

Position of the media represented by the current instance in its containing album
    or `0` if not specified.

• **track**(`value`: *number*): *void*

Gets the position of the media represented by the current instance in its containing album
or season (for a series).

**`inheritdoc`** TRCK frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | *number* |

**Returns:** *void*

Position of the media represented by the current instance in its containing album
    or `0` if not specified.

___

### trackCount

• **trackCount**(): *number*

Gets the number of tracks in the album or the number of episodes in a series of the media
represented by the current instance.

**`inheritdoc`** TRCK frame

**Returns:** *number*

Number of tracks in the album or number of episodes in a series of the media
    represented by the current instance or `0` if not specified.

• **trackCount**(`value`: *number*): *void*

Gets the number of tracks in the album or the number of episodes in a series of the media
represented by the current instance.

**`inheritdoc`** TRCK frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | *number* |

**Returns:** *void*

Number of tracks in the album or number of episodes in a series of the media
    represented by the current instance or `0` if not specified.

___

### version

• **version**(): *number*

Gets the ID3v2 version for the current instance.

**Returns:** *number*

• **version**(`value`: *number*): *void*

Sets the ID3v2 version for the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | *number* | ID3v2 version for the current instance. Must be 2, 3, or 4.    |

**Returns:** *void*

___

### year

• **year**(): *number*

Gets the year that the media represented by the current instance was recorded.

**`inheritdoc`** 
If a TDRC frame exists, the year will be read from that. If a TDRC frame doesn't exist and a
TYER or TYE frame exists, the year will be read from that. Failing both cases, 0 will be
returned.

**Returns:** *number*

Year that the media represented by the current instance was created or `0` if no
    value is present.

• **year**(`value`: *number*): *void*

Gets the year that the media represented by the current instance was recorded.

**`inheritdoc`** 
NOTE: values >9999 will remove the frame

#### Parameters:

Name | Type |
------ | ------ |
`value` | *number* |

**Returns:** *void*

Year that the media represented by the current instance was created or `0` if no
    value is present.

___

### language

• `Static`**language**(): *string*

Gets the ISO-639-2 language code to use when searching for and storing language specific
values.

**Returns:** *string*

• `Static`**language**(`value`: *string*): *void*

Gets the ISO-639-2 language code to use when searching for and storing language specific
values.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | *string* | ISO-639-2 language code to use. If the language is unknown `"   "` is the     appropriate filler    |

**Returns:** *void*

## Methods

### addFrame

▸ **addFrame**(`frame`: [*Id3v2Frame*](id3v2frame.md)): *void*

Adds a frame to the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`frame` | [*Id3v2Frame*](id3v2frame.md) | Frame to add to the current instance    |

**Returns:** *void*

___

### clear

▸ **clear**(): *void*

**`inheritdoc`** 

**Returns:** *void*

Overrides: [Tag](tag.md)

___

### copyTo

▸ **copyTo**(`target`: [*Tag*](tag.md), `overwrite`: *boolean*): *void*

**`inheritdoc`** 

#### Parameters:

Name | Type |
------ | ------ |
`target` | [*Tag*](tag.md) |
`overwrite` | *boolean* |

**Returns:** *void*

Overrides: [Tag](tag.md)

___

### getFramesByClassType

▸ **getFramesByClassType**<TFrame\>(`type`: [*Id3v2FrameClassType*](../enums/id3v2frameclasstype.md)): TFrame[]

Gets all frames with a specific frame class type.
NOTE: This diverges from the .NET implementation due to the inability to do type checking
like in .NET (ie `x is y`). Instead type guards are added to each frame class which provides
the same functionality.

#### Type parameters:

Name | Type |
------ | ------ |
`TFrame` | [*Id3v2Frame*](id3v2frame.md)<TFrame\> |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`type` | [*Id3v2FrameClassType*](../enums/id3v2frameclasstype.md) | Class type of the frame to find   |

**Returns:** TFrame[]

TFrame[] Array of frames with the specified class type

___

### getFramesByIdentifier

▸ **getFramesByIdentifier**<TFrame\>(`type`: [*Id3v2FrameClassType*](../enums/id3v2frameclasstype.md), `ident`: [*Id3v2FrameIdentifier*](id3v2frameidentifier.md)): TFrame[]

Gets a list of frames with the specified identifier contained in the current instance.
NOTE: This implementation deviates a bit from the original .NET implementation due to the
inability to do `x is y` comparison by types in typescript without type guards.
`type` is the type guard for differentiating frame types. If all frames are needed
use [frames](id3v2tag.md#frames).

#### Type parameters:

Name | Type |
------ | ------ |
`TFrame` | [*Id3v2Frame*](id3v2frame.md)<TFrame\> |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`type` | [*Id3v2FrameClassType*](../enums/id3v2frameclasstype.md) | Type of frame to return   |
`ident` | [*Id3v2FrameIdentifier*](id3v2frameidentifier.md) | Identifier of the frame   |

**Returns:** TFrame[]

TFrame[] Array of frames with the desired frame identifier

___

### getTextAsString

▸ **getTextAsString**(`ident`: [*Id3v2FrameIdentifier*](id3v2frameidentifier.md)): *string*

Gets the text value from a specified text information frame (or URL frame if that was
specified).

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`ident` | [*Id3v2FrameIdentifier*](id3v2frameidentifier.md) | Frame identifier of the text information frame to get the value from   |

**Returns:** *string*

string Text of the specified frame, or `undefined` if no value was found

___

### parse

▸ `Protected`**parse**(`data`: [*ByteVector*](bytevector.md), `file`: [*File*](file.md), `position`: *number*, `style`: [*ReadStyle*](../enums/readstyle.md)): *void*

#### Parameters:

Name | Type |
------ | ------ |
`data` | [*ByteVector*](bytevector.md) |
`file` | [*File*](file.md) |
`position` | *number* |
`style` | [*ReadStyle*](../enums/readstyle.md) |

**Returns:** *void*

___

### read

▸ `Protected`**read**(`file`: [*File*](file.md), `position`: *number*, `style`: [*ReadStyle*](../enums/readstyle.md)): *void*

#### Parameters:

Name | Type |
------ | ------ |
`file` | [*File*](file.md) |
`position` | *number* |
`style` | [*ReadStyle*](../enums/readstyle.md) |

**Returns:** *void*

___

### removeFrame

▸ **removeFrame**(`frame`: [*Id3v2Frame*](id3v2frame.md)): *void*

Removes a specified frame from the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`frame` | [*Id3v2Frame*](id3v2frame.md) | Object to remove from the current instance    |

**Returns:** *void*

___

### removeFrames

▸ **removeFrames**(`ident`: [*Id3v2FrameIdentifier*](id3v2frameidentifier.md)): *void*

Removes all frames with a specified identifier from the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`ident` | [*Id3v2FrameIdentifier*](id3v2frameidentifier.md) | Identifier of the frames to remove    |

**Returns:** *void*

___

### render

▸ **render**(): [*ByteVector*](bytevector.md)

Renders the current instance as a raw ID3v2 tag.
By default, tags will be rendered in the version they were loaded in and new tags using the
version specified by [defaultVersion](id3v2settings.md#defaultversion). If [forceDefaultVersion](id3v2settings.md#forcedefaultversion) is `true`, all
tags will be rendered using that version, except for tags with footers which must be in
version 4.

**Returns:** [*ByteVector*](bytevector.md)

ByteVector The rendered tag.

___

### replaceFrame

▸ **replaceFrame**(`oldFrame`: [*Id3v2Frame*](id3v2frame.md), `newFrame`: [*Id3v2Frame*](id3v2frame.md)): *void*

Replaces an existing frame with a new one in the list contained in the current instance, or
adds a new one if the existing one is not contained.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`oldFrame` | [*Id3v2Frame*](id3v2frame.md) | Object to be replaced   |
`newFrame` | [*Id3v2Frame*](id3v2frame.md) | Object to replace `oldFrame` with    |

**Returns:** *void*

___

### setInfoTag

▸ **setInfoTag**(): *void*

Set the tags that represent the tagger software (node-taglib-sharp) itself.

**`remarks`** This is typically a method to call just before saving a tag.

**Returns:** *void*

Inherited from: [Tag](tag.md)

___

### setNumberFrame

▸ **setNumberFrame**(`ident`: [*Id3v2FrameIdentifier*](id3v2frameidentifier.md), `numerator`: *number*, `denominator`: *number*, `minPlaces?`: *number*): *void*

Sets the numerical values for a specified text information frame.
If both `numerator` and `denominator` are `0`, the frame will be removed
from the tag. If `denominator` is zero, `numerator` will be stored by
itself. Otherwise the values will be stored as `{numerator}/{denominator}`.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`ident` | [*Id3v2FrameIdentifier*](id3v2frameidentifier.md) | - | Identity of the frame to set   |
`numerator` | *number* | - | Value containing the top half of the fraction, or the number if     `denominator` is zero   |
`denominator` | *number* | - | Value containing the bottom half of the fraction   |
`minPlaces` | *number* | 1 | Minimum number of digits to use to display the `numerator`, if     the numerator has less than this number of digits, it will be filled with leading zeroes.    |

**Returns:** *void*

___

### setTextFrame

▸ **setTextFrame**(`ident`: [*Id3v2FrameIdentifier*](id3v2frameidentifier.md), ...`text`: *string*[]): *void*

Sets the text for a specified text information frame.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`ident` | [*Id3v2FrameIdentifier*](id3v2frameidentifier.md) | Identifier of the frame to set the data for   |
`...text` | *string*[] | Text to set for the specified frame or `undefined`/`null`/`""` to remove all     frames with that identifier.    |

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

### fromData

▸ `Static`**fromData**(`data`: [*ByteVector*](bytevector.md)): [*Id3v2Tag*](id3v2tag.md)

Constructs and initializes a new Tag by reading the contents from a specified
[ByteVector](bytevector.md) object.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [*ByteVector*](bytevector.md) | Tag data to read into a tag object   |

**Returns:** [*Id3v2Tag*](id3v2tag.md)

Id3v2Tag Tag with the data from the byte vector read into it

___

### fromEmpty

▸ `Static`**fromEmpty**(): [*Id3v2Tag*](id3v2tag.md)

**Returns:** [*Id3v2Tag*](id3v2tag.md)

___

### fromFile

▸ `Static`**fromFile**(`file`: [*File*](file.md), `position`: *number*, `style`: [*ReadStyle*](../enums/readstyle.md)): [*Id3v2Tag*](id3v2tag.md)

Constructs and initializes a new Tag by reading the contents from a specified position in
the provided file.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`file` | [*File*](file.md) | File from which the contents of the new instance is to be read   |
`position` | *number* | Offset into the file where the tag should be read from   |
`style` | [*ReadStyle*](../enums/readstyle.md) | How the data is to be read into the current instance   |

**Returns:** [*Id3v2Tag*](id3v2tag.md)

Id3v2Tag Tag with the data from the file read into it

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
