[node-taglib-sharp](../README.md) / [Exports](../modules.md) / ApeTag

# Class: ApeTag

Provides a representation of an APEv2 tag which can be read from and written to disk.

## Hierarchy

* [*Tag*](tag.md)

  ↳ **ApeTag**

## Table of contents

### Accessors

- [album](apetag.md#album)
- [albumArtists](apetag.md#albumartists)
- [albumArtistsSort](apetag.md#albumartistssort)
- [albumSort](apetag.md#albumsort)
- [amazonId](apetag.md#amazonid)
- [beatsPerMinute](apetag.md#beatsperminute)
- [comment](apetag.md#comment)
- [composers](apetag.md#composers)
- [composersSort](apetag.md#composerssort)
- [conductor](apetag.md#conductor)
- [copyright](apetag.md#copyright)
- [dateTagged](apetag.md#datetagged)
- [description](apetag.md#description)
- [disc](apetag.md#disc)
- [discCount](apetag.md#disccount)
- [firstAlbumArtist](apetag.md#firstalbumartist)
- [firstAlbumArtistSort](apetag.md#firstalbumartistsort)
- [firstComposer](apetag.md#firstcomposer)
- [firstComposerSort](apetag.md#firstcomposersort)
- [firstGenre](apetag.md#firstgenre)
- [firstPerformer](apetag.md#firstperformer)
- [firstPerformerSort](apetag.md#firstperformersort)
- [genres](apetag.md#genres)
- [grouping](apetag.md#grouping)
- [initialKey](apetag.md#initialkey)
- [isEmpty](apetag.md#isempty)
- [isHeaderPresent](apetag.md#isheaderpresent)
- [isrc](apetag.md#isrc)
- [items](apetag.md#items)
- [joinedAlbumArtists](apetag.md#joinedalbumartists)
- [joinedComposers](apetag.md#joinedcomposers)
- [joinedGenres](apetag.md#joinedgenres)
- [joinedPerformers](apetag.md#joinedperformers)
- [joinedPerformersSort](apetag.md#joinedperformerssort)
- [lyrics](apetag.md#lyrics)
- [musicBrainzArtistId](apetag.md#musicbrainzartistid)
- [musicBrainzDiscId](apetag.md#musicbrainzdiscid)
- [musicBrainzReleaseArtistId](apetag.md#musicbrainzreleaseartistid)
- [musicBrainzReleaseCountry](apetag.md#musicbrainzreleasecountry)
- [musicBrainzReleaseGroupId](apetag.md#musicbrainzreleasegroupid)
- [musicBrainzReleaseId](apetag.md#musicbrainzreleaseid)
- [musicBrainzReleaseStatus](apetag.md#musicbrainzreleasestatus)
- [musicBrainzReleaseType](apetag.md#musicbrainzreleasetype)
- [musicBrainzTrackId](apetag.md#musicbrainztrackid)
- [musicIpId](apetag.md#musicipid)
- [performers](apetag.md#performers)
- [performersRole](apetag.md#performersrole)
- [performersSort](apetag.md#performerssort)
- [pictures](apetag.md#pictures)
- [publisher](apetag.md#publisher)
- [remixedBy](apetag.md#remixedby)
- [replayGainAlbumGain](apetag.md#replaygainalbumgain)
- [replayGainAlbumPeak](apetag.md#replaygainalbumpeak)
- [replayGainTrackGain](apetag.md#replaygaintrackgain)
- [replayGainTrackPeak](apetag.md#replaygaintrackpeak)
- [subtitle](apetag.md#subtitle)
- [tagTypes](apetag.md#tagtypes)
- [title](apetag.md#title)
- [titleSort](apetag.md#titlesort)
- [track](apetag.md#track)
- [trackCount](apetag.md#trackcount)
- [year](apetag.md#year)

### Methods

- [appendStringValue](apetag.md#appendstringvalue)
- [appendStringValues](apetag.md#appendstringvalues)
- [clear](apetag.md#clear)
- [copyTo](apetag.md#copyto)
- [getItem](apetag.md#getitem)
- [hasItem](apetag.md#hasitem)
- [removeItem](apetag.md#removeitem)
- [render](apetag.md#render)
- [setInfoTag](apetag.md#setinfotag)
- [setItem](apetag.md#setitem)
- [setNumericValue](apetag.md#setnumericvalue)
- [setStringValue](apetag.md#setstringvalue)
- [setStringValues](apetag.md#setstringvalues)
- [firstInGroup](apetag.md#firstingroup)
- [fromData](apetag.md#fromdata)
- [fromEmpty](apetag.md#fromempty)
- [fromFile](apetag.md#fromfile)
- [isFalsyOrLikeEmpty](apetag.md#isfalsyorlikeempty)
- [joinGroup](apetag.md#joingroup)

## Accessors

### album

• **album**(): *string*

Gets the album of the media represented by the current instance. For video media, this
represents the collection the video belongs to.

**`inheritdoc`** Album item

**Returns:** *string*

Album of the media represented by the current instance or `undefined` if no value
    is present

• **album**(`value`: *string*): *void*

Gets the album of the media represented by the current instance. For video media, this
represents the collection the video belongs to.

**`inheritdoc`** Album item

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

**`inheritdoc`** 
This property is implemented using the "Album Artist" item and "AlbumArtist" as a backup if
it exists.

**Returns:** *string*[]

Band or artist credited with the creation of the entire album or collection
    containing the media described by the current instance or an empty array if no value is
    present

• **albumArtists**(`value`: *string*[]): *void*

Gets the band or artist who is credited credited in the creation of the entire album or
collection containing the media described by the current instance.

**`inheritdoc`** 
Will be stored in "Album Artist" primarily. If "AlbumArtist" exists, value will also be
stored there for compatibility.

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

**`inheritdoc`** AlbumArtistSort item

**Returns:** *string*[]

Sortable names for the bands/artists are credited with the creation of the entire
    album or collection containing the media described by the current instance, or an empty
    array if no value is present.

• **albumArtistsSort**(`value`: *string*[]): *void*

Gets the sortable names of the bands/artists who are credited with creating the entire
album or collection containing the media described by the current instance.

**`inheritdoc`** AlbumArtistSort item

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

**`inheritdoc`** AlbumSort item

**Returns:** *string*

Sortable name for the album title of the media or `undefined` if the value is not
    present

• **albumSort**(`value`: *string*): *void*

Gets the sortable name of the album title of the media represented by the current instance.

**`inheritdoc`** AlbumSort item

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

**`inheritdoc`** ASIN item

**Returns:** *string*

Amazon ID of the media represented by the current instance or `undefined` if no
    value is present

• **amazonId**(`value`: *string*): *void*

Gets the Amazon ID of the media represented by the current instance.

**`inheritdoc`** ASIN item

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

**`inheritdoc`** BPM item

**Returns:** *number*

Beats per minute of the audio in the media represented by the current instance, or
    `0` if not specified

• **beatsPerMinute**(`value`: *number*): *void*

Gets the number of beats per minute in the audio of the media represented by the current
instance.

**`inheritdoc`** BPM item

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

**`inheritdoc`** Comment item

**Returns:** *string*

User comments on the media represented by the current instance or `undefined` if
    the value is not present

• **comment**(`value`: *string*): *void*

Gets a user comment on the media represented by the current instance.

**`inheritdoc`** Comment item

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

**`inheritdoc`** Composer item

**Returns:** *string*[]

Composers of the media represented by the current instance of an empty array if no
    value is present.

• **composers**(`value`: *string*[]): *void*

Gets the composers of the media represented by the current instance.

**`inheritdoc`** Composer item

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

**`inheritdoc`** ComposerSort item

**Returns:** *string*[]

Sortable names for the composers of the media represented by the current instance
    or an empty array if no value is present.

• **composersSort**(`value`: *string*[]): *void*

Gets the sortable names of the composers of the media represented by the current instance.

**`inheritdoc`** ComposerSort

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

**`inheritdoc`** Conductor item

**Returns:** *string*

Conductor or director of the media represented by the current instance or
    `undefined` if no value present.

• **conductor**(`value`: *string*): *void*

Gets the conductor or director of the media represented by the current instance.

**`inheritdoc`** Conductor item

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

**`inheritdoc`** Copyright item

**Returns:** *string*

Copyright information for the media represented by the current instance or
    `undefined` if no value is present.

• **copyright**(`value`: *string*): *void*

Gets the copyright information for the media represented by the current instance.

**`inheritdoc`** Copyright item

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

**`inheritdoc`** DateTagged item

**Returns:** Date

Date/time at which the tag has been written, or `undefined` if no value is present

• **dateTagged**(`value`: Date): *void*

Gets the date and time at which the tag has been written.

**`inheritdoc`** DateTagged item

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

**`inheritdoc`** Description item

**Returns:** *string*

Description of the media represented by the current instance or `undefined` if no
    value is present

• **description**(`value`: *string*): *void*

Gets a short description of the media. For music, this could be the comment that the artist
made of his/her work. For a video, this should be a short summary of the story/plot, but
generally no spoliers. This should give the impression of what to expect in the media.

**`inheritdoc`** Description item

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

**`inheritdoc`** Disc item numerator

**Returns:** *number*

Number of the disc or season of the media represented by the current instance in a
    boxed set.

• **disc**(`value`: *number*): *void*

Gets the number of the disc containing the media represented by the current instance in the
boxed set. For a series, this represents the season number.

**`inheritdoc`** Disc item numerator

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

**`inheritdoc`** Disc item denominator

**Returns:** *number*

Number of discs or seasons in the boxed set containing the media represented by the
    current instance or `0` if not specified.

• **discCount**(`value`: *number*): *void*

Gets the number of discs or seasons in the boxed set containing the media represented by the
current instance.

**`inheritdoc`** Disc item denominator

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

Gets the the first value contained in [albumArtists](apetag.md#albumartists).

**Returns:** *string*

___

### firstAlbumArtistSort

• **firstAlbumArtistSort**(): *string*

Gets the first value contained in [albumArtistsSort](apetag.md#albumartistssort)

**Returns:** *string*

___

### firstComposer

• **firstComposer**(): *string*

Gets the first value contained in [composers](apetag.md#composers)

**Returns:** *string*

___

### firstComposerSort

• **firstComposerSort**(): *string*

Gets the first value contained in [composersSort](apetag.md#composerssort)

**Returns:** *string*

___

### firstGenre

• **firstGenre**(): *string*

Gets the first value contained in [genres](apetag.md#genres)

**Returns:** *string*

___

### firstPerformer

• **firstPerformer**(): *string*

Gets the first value contained in [performers](apetag.md#performers)

**Returns:** *string*

___

### firstPerformerSort

• **firstPerformerSort**(): *string*

Gets the first value contained in [performersSort](apetag.md#performerssort)

**Returns:** *string*

___

### genres

• **genres**(): *string*[]

Gets the genres of the media represented by the current instance.

**`inheritdoc`** Genre item

**Returns:** *string*[]

Genres of the media represented by the current instance or an empty array if no
    value is present.

• **genres**(`value`: *string*[]): *void*

Gets the genres of the media represented by the current instance.

**`inheritdoc`** Genre item

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

**`inheritdoc`** Grouping item

**Returns:** *string*

Grouping on the album which the media in the current instance belongs to or
    `undefined` if no value is present.

• **grouping**(`value`: *string*): *void*

Gets the grouping on the album which the media in the current instance belongs to.

**`inheritdoc`** Grouping item

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

**Returns:** *string*

Initial key of the track or `undefined` if no value is set

• **initialKey**(`value`: *string*): *void*

Sets the initial key of the track.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | *string* | Initial key of the track or `undefined` if no value is set    |

**Returns:** *void*

Initial key of the track or `undefined` if no value is set

___

### isEmpty

• **isEmpty**(): *boolean*

Gets whether or not the current instance is empty.

**`inheritdoc`** 

**Returns:** *boolean*

`true` if the current instance does not contain any values. `false` otherwise

___

### isHeaderPresent

• **isHeaderPresent**(): *boolean*

Gets whether or not the current instance has a header when rendered.

**Returns:** *boolean*

• **isHeaderPresent**(`value`: *boolean*): *void*

Sets whether or not the current instance has a header when rendered.

#### Parameters:

Name | Type |
------ | ------ |
`value` | *boolean* |

**Returns:** *void*

___

### isrc

• **isrc**(): *string*

Gets the ISRC (International Standard Recording Code) of the track.

**Returns:** *string*

the ISRC of the track or `undefined` if no value is set

• **isrc**(`value`: *string*): *void*

Sets the ISRC (International Standard Recording Code) of the track.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | *string* | the ISRC of the track or `undefined` if no value is set    |

**Returns:** *void*

the ISRC of the track or `undefined` if no value is set

___

### items

• **items**(): *ApeTagItem*[]

Gets all items stored in the current instance

**Returns:** *ApeTagItem*[]

___

### joinedAlbumArtists

• **joinedAlbumArtists**(): *string*

Gets a semicolon and space separated string containing the values in [albumArtists](apetag.md#albumartists)

**Returns:** *string*

___

### joinedComposers

• **joinedComposers**(): *string*

Gets a semicolon and space separated string containing the values in [composers](apetag.md#composers)

**Returns:** *string*

___

### joinedGenres

• **joinedGenres**(): *string*

Gets a semicolon and space separated string containing the values in [genres](apetag.md#genres)

**Returns:** *string*

___

### joinedPerformers

• **joinedPerformers**(): *string*

Gets a semicolon and space separated string containing the values in [performers](apetag.md#performers)

**Returns:** *string*

___

### joinedPerformersSort

• **joinedPerformersSort**(): *string*

Gets a semicolon and space separated string containing the values in [performersSort](apetag.md#performerssort)

**Returns:** *string*

___

### lyrics

• **lyrics**(): *string*

Gets the lyrics or script of the media represented by the current instance.

**`inheritdoc`** Lyrics item

**Returns:** *string*

Lyrics or script of the media represented by the current instance or `undefined` if
    no value is present

• **lyrics**(`value`: *string*): *void*

Gets the lyrics or script of the media represented by the current instance.

**`inheritdoc`** Lyrics item

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

**`inheritdoc`** MUSICBRAINZ_ARTISTID item

**Returns:** *string*

MusicBrainz ArtistID of the media represented by the current instance or
    `undefined` if no value is present

• **musicBrainzArtistId**(`value`: *string*): *void*

Gets the MusicBrainz artist ID of the media represented by the current instance.

**`inheritdoc`** MUSICBRAINZ_ARTISTID item

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

**`inheritdoc`** MUSICBRAINZ_DISCID item

**Returns:** *string*

MusicBrainz DiscID of the media represented by the current instance or `undefined`
    if no value is present

• **musicBrainzDiscId**(`value`: *string*): *void*

Gets the MusicBrainz disc ID of the media represented by the current instance.

**`inheritdoc`** MUSICBRAINZ_DISCID item

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

**`inheritdoc`** MUSICBRAINZ_ARTISTID item

**Returns:** *string*

MusicBrainz ReleaseArtistID of the media represented by the current instance or
    `undefined` if no value is present

• **musicBrainzReleaseArtistId**(`value`: *string*): *void*

Gets the MusicBrainz release artist ID of the media represented by the current instance.

**`inheritdoc`** MUSICBRAINZ_ARTISTID item

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

**`inheritdoc`** RELEASECOUNTRY item

**Returns:** *string*

MusicBrainz ReleaseCountry of the media represented by the current instance or
    `undefined` if no value is present

• **musicBrainzReleaseCountry**(`value`: *string*): *void*

Gets the MusicBrainz release country of the media represented by the current instance.

**`inheritdoc`** RELEASECOUNTRY item

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

**`inheritdoc`** MUSICBRAINZ_RELEASEGROUPID item

**Returns:** *string*

MusicBrainz ReleaseGroupID of the media represented by the current instance or
    `undefined` if no value is present

• **musicBrainzReleaseGroupId**(`value`: *string*): *void*

Gets the MusicBrainz release group ID of the media represented by the current instance.

**`inheritdoc`** MUSICBRAINZ_RELEASEGROUPID item

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

**`inheritdoc`** MUSICBRAINZ_ALBUMID item

**Returns:** *string*

MusicBrainz ReleaseID of the media represented by the current instance or
    `undefined` if no value is present

• **musicBrainzReleaseId**(`value`: *string*): *void*

Gets the MusicBrainz release ID of the media represented by the current instance.

**`inheritdoc`** MUSICBRAINZ_ALBUMID item

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

**`inheritdoc`** MUSICBRAINZ_ALBUMSTATUS item

**Returns:** *string*

MusicBrainz ReleaseStatus of the media represented by the current instance or
    `undefined` if no value is present

• **musicBrainzReleaseStatus**(`value`: *string*): *void*

Gets the MusicBrainz release status of the media represented by the current instance.

**`inheritdoc`** MUSICBRAINZ_ALBUMSTATUS item

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

**`inheritdoc`** MUSICBRAINZ_ALBUMTYPE item

**Returns:** *string*

MusicBrainz ReleaseType of the media represented by the current instance or
    `undefined` if no value is present

• **musicBrainzReleaseType**(`value`: *string*): *void*

Gets the MusicBrainz release type of the media represented by the current instance.

**`inheritdoc`** MUSICBRAINZ_ALBUMTYPE item

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

**`inheritdoc`** MUSICBRAINZ_TRACKID item

**Returns:** *string*

MusicBrainz TrackID of the media represented by the current instance or `undefined`
    if no value is present

• **musicBrainzTrackId**(`value`: *string*): *void*

Gets the MusicBrainz track ID of the media represented by the media represented by the
current instance.

**`inheritdoc`** MUSICBRAINZ_TRACKID item

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

**`inheritdoc`** MUSICIP_PUID item

**Returns:** *string*

MusicIP PUID of the media represented by the current instance or `undefined` if no
    value is present

• **musicIpId**(`value`: *string*): *void*

Gets the MusicIP PUID of the media represented by the current instance.

**`inheritdoc`** MUSICIP_PUID item

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

**`inheritdoc`** Artist item

**Returns:** *string*[]

Performers who performed in the media described by the current instance or an empty
    array if no value is present.

• **performers**(`value`: *string*[]): *void*

Gets the performers or artists who performed in the media described by the current instance.

**`inheritdoc`** Artist item

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
for music. This must match the [performers](apetag.md#performers) array (for each person, correspond one/more
role). Several roles for the same artist/actor can be separated with semicolons. For
example: "Bass; Backing Vocals; Vibraphone".

**`inheritdoc`** PerformersRole item

**Returns:** *string*[]

Array containing the roles played by the performers in the media described by the
    current instance, or an empty array if no value is present.

• **performersRole**(`value`: *string*[]): *void*

Gets the characters portrayed by an actor for a video or instruments played by a musician
for music. This must match the [performers](apetag.md#performers) array (for each person, correspond one/more
role). Several roles for the same artist/actor can be separated with semicolons. For
example: "Bass; Backing Vocals; Vibraphone".

**`inheritdoc`** PerformersRole item

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

**`inheritdoc`** ArtistSort item

**Returns:** *string*[]

Sortable names for the performers who performed in the media described by the
    current instance, or an empty array if no value is present.

• **performersSort**(`value`: *string*[]): *void*

Gets the sortable names of the performers or artists who performed in the media described by
the current instance.

**`inheritdoc`** ArtistSort item

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

**`inheritdoc`** Cover Art items

**Returns:** [*IPicture*](../interfaces/ipicture.md)[]

Array containing a collection of pictures associated with the media represented by
    the current instance or an empty array if no pictures are present.

• **pictures**(`value`: [*IPicture*](../interfaces/ipicture.md)[]): *void*

Gets a collection of pictures associated with the media represented by the current instance.

**`inheritdoc`** Cover Art items

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

**Returns:** *string*

Publisher of the track or `undefined` if no value is set

• **publisher**(`value`: *string*): *void*

Sets the publisher of the track.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | *string* | Publisher of the track or `undefined` if no value is set    |

**Returns:** *void*

Publisher of the track or `undefined` if no value is set

___

### remixedBy

• **remixedBy**(): *string*

Gets the remixer of the track.

**Returns:** *string*

Remixer of the track or `undefined` if no value is set

• **remixedBy**(`value`: *string*): *void*

Sets the remixer of the track.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | *string* | Remixer of the track or `undefined` if no value is set    |

**Returns:** *void*

Remixer of the track or `undefined` if no value is set

___

### replayGainAlbumGain

• **replayGainAlbumGain**(): *number*

Gets the ReplayGain album gain in dB.

**`inheritdoc`** REPLAYGAIN_ALBUM_GAIN item

**Returns:** *number*

Album gain as per the ReplayGain specifications, in dB, or `NaN` if no value is set

• **replayGainAlbumGain**(`value`: *number*): *void*

Gets the ReplayGain album gain in dB.

**`inheritdoc`** REPLAYGAIN_ALBUM_GAIN item

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

**`inheritdoc`** REPLAYGAIN_ALBUM_PEAK item

**Returns:** *number*

Album peak as per the ReplayGain specifications, or `NaN` if no value is set

• **replayGainAlbumPeak**(`value`: *number*): *void*

Gets the ReplayGain album peak sample.

**`inheritdoc`** REPLAYGAIN_ALBUM_PEAK item

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

**`inheritdoc`** REPLAYGAIN_TRACK_GAIN item

**Returns:** *number*

Track gain as per ReplayGain specifications, in dB, or `NaN` if no value is set

• **replayGainTrackGain**(`value`: *number*): *void*

Gets the ReplayGain track gain in dB.

**`inheritdoc`** REPLAYGAIN_TRACK_GAIN item

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

**`inheritdoc`** REPLAYGAIN_TRACK_PEAK item

**Returns:** *number*

Track peak as per the ReplayGain specifications, or `NaN` if no value is set

• **replayGainTrackPeak**(`value`: *number*): *void*

Gets the ReplayGain track peak sample.

**`inheritdoc`** REPLAYGAIN_TRACK_PEAK item

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

**`inheritdoc`** Subtitle item

**Returns:** *string*

Subtitle of the media represented by the current instance or `undefined` if no
    value is present

• **subtitle**(`value`: *string*): *void*

Gets a description, one-line. It represents the tagline of the vide/music.

**`inheritdoc`** Subtitle

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

**`inheritdoc`** Title item

**Returns:** *string*

Title of the media described by the current instance or `undefined` if no value is
    present.

• **title**(`value`: *string*): *void*

Gets the title for the media described by the current instance.

**`inheritdoc`** Title item

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

**`inheritdoc`** TitleSort item

**Returns:** *string*

Sortable name of the media described by the current instance or `undefined` if no
    value is present

• **titleSort**(`value`: *string*): *void*

Gets the sortable name for the title of the media described by the current instance.

**`inheritdoc`** TitleSort item

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

**`inheritdoc`** Track item numerator

**Returns:** *number*

Position of the media represented by the current instance in its containing album
    or `0` if not specified.

• **track**(`value`: *number*): *void*

Gets the position of the media represented by the current instance in its containing album
or season (for a series).

**`inheritdoc`** Track item numerator

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

**`inheritdoc`** Track item denominator

**Returns:** *number*

Number of tracks in the album or number of episodes in a series of the media
    represented by the current instance or `0` if not specified.

• **trackCount**(`value`: *number*): *void*

Gets the number of tracks in the album or the number of episodes in a series of the media
represented by the current instance.

**`inheritdoc`** Track item denominator

#### Parameters:

Name | Type |
------ | ------ |
`value` | *number* |

**Returns:** *void*

Number of tracks in the album or number of episodes in a series of the media
    represented by the current instance or `0` if not specified.

___

### year

• **year**(): *number*

Gets the year that the media represented by the current instance was recorded.

**`inheritdoc`** Year item

**Returns:** *number*

Year that the media represented by the current instance was created or `0` if no
    value is present.

• **year**(`value`: *number*): *void*

Gets the year that the media represented by the current instance was recorded.

**`inheritdoc`** Year item

#### Parameters:

Name | Type |
------ | ------ |
`value` | *number* |

**Returns:** *void*

Year that the media represented by the current instance was created or `0` if no
    value is present.

## Methods

### appendStringValue

▸ **appendStringValue**(`key`: *string*, `value`: *string*): *void*

Adds a single value to the contents of an item. Creates a new item if one does not exist.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`key` | *string* | Key to use to lookup to item to add `value` to   |
`value` | *string* | Values to add to item identified by `key`    |

**Returns:** *void*

___

### appendStringValues

▸ **appendStringValues**(`key`: *string*, `values`: *string*[]): *void*

Adds a lists of strings to the values stored in a specified item. Creates a new item if one
does not already exist.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`key` | *string* | Key to use to lookup the item   |
`values` | *string*[] | Values to add to the item    |

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

#### Parameters:

Name | Type |
------ | ------ |
`target` | [*Tag*](tag.md) |
`overwrite` | *boolean* |

**Returns:** *void*

Overrides: [Tag](tag.md)

___

### getItem

▸ **getItem**(`key`: *string*): *ApeTagItem*

Gets an item from the current instance identified by `key`.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`key` | *string* | Identifier for the item to get   |

**Returns:** *ApeTagItem*

ApeTagItem Item specified by `key` if it exists, undefined is
    returned otherwise

___

### hasItem

▸ **hasItem**(`key`: *string*): *boolean*

Determines if any items with the specified `key` exist in the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`key` | *string* | Identifier for looking up a matching item   |

**Returns:** *boolean*

boolean `true` if an item with the specified key exists, `false` otherwise

___

### removeItem

▸ **removeItem**(`key`: *string*): *void*

Removes all items from the current instance with the specified `key`.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`key` | *string* | Identifier of the items to remove.    |

**Returns:** *void*

___

### render

▸ **render**(): [*ByteVector*](bytevector.md)

Renders the current instance as a raw APEv2 tag.

**Returns:** [*ByteVector*](bytevector.md)

ByteVector Bytes that represent the current instance

___

### setInfoTag

▸ **setInfoTag**(): *void*

Set the tags that represent the tagger software (node-taglib-sharp) itself.

**`remarks`** This is typically a method to call just before saving a tag.

**Returns:** *void*

Inherited from: [Tag](tag.md)

___

### setItem

▸ **setItem**(`item`: *ApeTagItem*): *void*

Adds an item to the current instance, replacing an existing one with the same key.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`item` | *ApeTagItem* | Item to add to the current instance    |

**Returns:** *void*

___

### setNumericValue

▸ **setNumericValue**(`key`: *string*, `numerator`: *number*, `denominator`: *number*): *void*

Stores a number in a specified item. If both `numerator` and
`denominator` are provided the item will be set to `numerator/denominator`. If
neither `numerator` nor `denominator` are provided, the item will be
removed from this tag. A new item is created if one with the specified `key` does
not exist.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`key` | *string* | Identifier for the item to set the item   |
`numerator` | *number* | Whole number of top half of the fraction if `denominator` is     provided   |
`denominator` | *number* | Bottom half of the fraction to store. Can be `undefined` if only     `numerator` is needed.    |

**Returns:** *void*

___

### setStringValue

▸ **setStringValue**(`key`: *string*, `value`: *string*): *void*

Stores a string in the item specified by `key`. This will replace the contents of
the specified item. If `value` is falsy, the item will be removed.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`key` | *string* | Item to set the value of   |
`value` | *string* | String to store in the item. If falsy, the specified item will be removed    |

**Returns:** *void*

___

### setStringValues

▸ **setStringValues**(`key`: *string*, `values`: *string*[]): *void*

Stores a list of strings in the item specified by `key`. This will replace the
contents of the specified item. If `value` is falsy or empty, the item will be removed

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`key` | *string* | Item to set the value of   |
`values` | *string*[] | String to store in the item. If falsy or empty, the specified item will be     removed    |

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

▸ `Static`**fromData**(`data`: [*ByteVector*](bytevector.md)): [*ApeTag*](apetag.md)

Constructs and initializes a new instance by reading the contents of a raw tag in a
specified [ByteVector](bytevector.md) object.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [*ByteVector*](bytevector.md) | Object containing the raw tag    |

**Returns:** [*ApeTag*](apetag.md)

___

### fromEmpty

▸ `Static`**fromEmpty**(): [*ApeTag*](apetag.md)

Constructs an empty APEv2 tag.

**Returns:** [*ApeTag*](apetag.md)

___

### fromFile

▸ `Static`**fromFile**(`file`: [*File*](file.md), `position`: *number*): [*ApeTag*](apetag.md)

Constructs a new instance by reading the contents from a specified position in a specified
file.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`file` | [*File*](file.md) | File to read the tag from   |
`position` | *number* | Position where the tag starts    |

**Returns:** [*ApeTag*](apetag.md)

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
