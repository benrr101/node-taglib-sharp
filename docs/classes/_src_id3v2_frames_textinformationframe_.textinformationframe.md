**[node-taglib-sharp](../README.md)**

> [Globals](../globals.md) / ["src/id3v2/frames/textInformationFrame"](../modules/_src_id3v2_frames_textinformationframe_.md) / TextInformationFrame

# Class: TextInformationFrame

This class provides support for ID3v2 text information frames (section 4.2) covering `T000` to
`TZZZ`, excluding `TXXX`.
Text information frames contain the most commonly used values in tagging, including the artist,
track name, and just about any value that can be expressed as text. The following table contains
types and descriptions as found in the ID3 2.4.0 native frames specification (Copyright Martin
Nilsson 2000).
* TIT1 - The "Content Group Description" frame is used if the sound belongs to a larger category
  of sounds/music. For example, classical music is often sorted in different musical sections
  (eg. "Piano Concerto", "Weather - Hurricane").
* TIT2 - The "Title/Song name/Content description" frame is the actual name of the piece (eg.
  "Adagio", "Hurricane Donna").
* TIT3 - The "Subtitle/Description refinement" frame is used for information directly related to
  the contents title (eg. "Op. 16" or "Performed Live at Wembley").
* TALB - The "Album/Movie/Show title" frame is intended for the title of the recording (or
  source of sound) from which the audio in the file is taken.
* TOAL - The "Original album/movie/show title" frame is intended for the title of the original
  recording (or source of sound), if for example the music in the file should be a cover of a
  previously released song.
* TRCK - The "Track number/Position in set" frame is a numeric string containing the order
  number of the audio-file on its original recording. This MAY be extended with a "/" character
  and a numeric string containing the total number of tracks/elements on the original recording
  (eg "4/9").
* TPOS - The "Part of a set" frame is a numeric string that describes which part of a set the
  audio came from. This frame is used if the source described in the "TLAB" frame is divided
  into several mediums, eg. a double CD. The value MAY be extended with a "/" character and a
  numeric string containing the total number of parts in the set (eg. "1/2").
* TSST - The "Set Subtitle" frame is intended for the subtitle of the part of a set this track
  belongs to.
* TSRC - The "ISRC" frame should contain the International Standard Recording Code (12 chars).
* TPE1 - The "Lead artist/Lead performer/Soloist/Performing Group" frame is used for the main
  artist.
* TPE2 - The "Band/Orchestra/Accompaniment" frame is used for additional information about the
  performers in the recording.
* TPE3 - The "Conductor" frame is used for the name of the conductor.
* TPE4 - The "Interpreted, remixed, or otherwise modified by" frame contains more information
  about the people behind a remix and similar interpretations of another existing piece.
* TOPE - The "Original artist/Performer" frame is intended for the performer of the original
  recording, if for example the music in the file should be a cover of a previously released
  song.
* TEXT - The "Lyricist/Text writer" frame is intended for the writer of the text or lyrics in
  the recording.
* TOLY - The "Original lyricist/Text writer" frame is intended for the text writer of the
  original recording, if for example the music in the file should be a cover of a previously
  released song.
* TCOM - The "composer" frame is intended for the name of the composer.
* TMCL - The "musician credits list" frame is intended as a mapping betweenInclusive instruments and the
  musician who played it. Every odd field is an instrument and every even is an artist of a comma
  delimited list of artists.
* TIPL - The "Involved people list" frame is very similar to the musician credits list, but maps
  betweenInclusive functions, like producer, and names.
* TENC - The "Encoded by" frame contains the name of the person or organization that encoded the
  audio file. This field may contain a copyright message, if the audio file is also copyrighted
  by the encoder.
* TBPM - The "BPM" frame contains the number of beats per minute in the main part of the audio.
  The BPM is an integer and represented as a numeric string.
* TLEN - The "Length" frame contains the length of the audio file in milliseconds, represented
  as a numeric string.
* TKEY - The "Initial key" frame contains the musical key in which the sound starts. It is
  represented as a string with a maximum length of 3 characters. The ground keys are represented
  with "A" - "G" and half keys are represented with "b" or "#". Minor is represented as "m", eg.
  "Dbm". Off key is represented with an "o" only.
* TLAN - The "language" frame should contain the languages of the text or lyrics spoken or sung
  in the audio. The language is represented with three characters according to ISO-639-2. If
  more than one language is used in the text, the language codes should follow according to the
  amount of usage.
* TCON - The "Content type" frame, which in ID3v1 was stored as one byte numeric value only, is
  now a string. You may use one or several of the ID3v1 types as numeric strings, or, since the
  category list would be impossible to maintain with accurate and up to date categories, define
  your own.
* TFLT - The "File type" frame indicates which type of audio this tag defines. (see the
  specification for more details)
* TMED - The "Media type" frame describes from which media the sound originated. (see the
  specification for more details)
* TMOO - The "mood" frame is intended to reflect the mood of the audio with a few keywords (eg.
  "Romantic" or "Sad").
* TCOP - The "Copyright message" frame, in which the string must begin with a year and a space
  character (making 5 characters), is intended for the copyright holder of the original sound,
  not the audio file itself. The absence of this frame means only that the copyright information
  is unavailable or has been removed, and must not be interpreted to mean that the audio is
  public domain. Every time this field is displayed, the field must be preceded with
  "Copyright " (C) " ", where (C) is one character showing the copyright mark.
* TPRO - The "Produced notice" frame, in which the string must begin with a year and a space
  character (making 5 characters), is intended for the production copyright holder of the
  production copyright holder of the original sound, not the audio file itself. Every time this
  field is displayed, the field must be preceded with "Produced " (P) " ", where (P) is one
  character showing the sound recording copyright symbol.
* TPUB - The "Publisher" frame contains the name of the label or publisher.
* TOWN - The "file owner/licensee" frame containing the name of the owner or licensee of the
  file and its contents.
* TRSN - The "Internet radio station name" frame contains the name of the internet radio
  station from which the audio is streamed.
* TRSO - The "Internet radio station owner" frame contains the name of the owner of the internet
  radio station from which the audio is streamed.
* TOFN - The "Original filename" frame contains the preferred filename for the file, since some
  media doesn't allow the desired length of the filename. The filename is case sensitive and
  includes its extension.
* TDLY - The "Playlist delay" frame defines the numbers of milliseconds of silence that should
  be inserted before this audio. The value zero indicates that this is a part of a multi-file
  audio track that should be played continuously.
* TDEN - The "Encoding time" frame contains a timestamp describing when the audio was encoded.
  Timestamp format is described in the ID3v2 structure document.
* TDOR - The "Original release time" frame contains a timestamp describing when the original
  recording was released. Timestamp format is described in the ID3v2 structure document.
* TDRC - The "Recording time" frame contains a timestamp describing when the audio was recorded.
  Timestamp format is described in the ID3v2 structure document.
* TDRL - The "Release time" frame contains a timestamp describing when the audio was first
  released. Timestamp format is described in the ID3v2 structure document.
* TDTG - The "Tagging time" frame contains a timestamp describing when the audio was tagged.
  Timestamp format is described in the ID3v2 structure document.
* TSSE - The "Software/Hardware and settings used for encoding" frame includes the used audio
  encoder and its settings when the file was encoded. Hardware refers to hardware encoders, not
  the computer on which a program was ran.
* TSOA - The "Album sort order" frame defines a string which should be used instead of the album
  name (TALB) for sorting purposes. For example, an album named "A Soundtrack" might be
  preferably sorted as "Soundtrack".
* TSOP - The "Performer sort order" frame defines a string which should be used instead of the
  performer (TPE2) for sorting purposes.
* TSOT - The "Title sort order" frame defines a string which should be used instead of the title
  (TIT2) for sorting purposes.

## Hierarchy

* [Frame](_src_id3v2_frames_frame_.frame.md)

  ↳ **TextInformationFrame**

  ↳↳ [UserTextInformationFrame](_src_id3v2_frames_textinformationframe_.usertextinformationframe.md)

## Index

### Constructors

* [constructor](_src_id3v2_frames_textinformationframe_.textinformationframe.md#constructor)

### Properties

* [\_encoding](_src_id3v2_frames_textinformationframe_.textinformationframe.md#_encoding)
* [\_header](_src_id3v2_frames_textinformationframe_.textinformationframe.md#_header)
* [\_rawData](_src_id3v2_frames_textinformationframe_.textinformationframe.md#_rawdata)
* [\_rawVersion](_src_id3v2_frames_textinformationframe_.textinformationframe.md#_rawversion)
* [\_textFields](_src_id3v2_frames_textinformationframe_.textinformationframe.md#_textfields)

### Accessors

* [encryptionId](_src_id3v2_frames_textinformationframe_.textinformationframe.md#encryptionid)
* [flags](_src_id3v2_frames_textinformationframe_.textinformationframe.md#flags)
* [frameClassType](_src_id3v2_frames_textinformationframe_.textinformationframe.md#frameclasstype)
* [frameId](_src_id3v2_frames_textinformationframe_.textinformationframe.md#frameid)
* [groupId](_src_id3v2_frames_textinformationframe_.textinformationframe.md#groupid)
* [size](_src_id3v2_frames_textinformationframe_.textinformationframe.md#size)
* [text](_src_id3v2_frames_textinformationframe_.textinformationframe.md#text)
* [textEncoding](_src_id3v2_frames_textinformationframe_.textinformationframe.md#textencoding)

### Methods

* [clone](_src_id3v2_frames_textinformationframe_.textinformationframe.md#clone)
* [fieldData](_src_id3v2_frames_textinformationframe_.textinformationframe.md#fielddata)
* [parseFields](_src_id3v2_frames_textinformationframe_.textinformationframe.md#parsefields)
* [parseRawData](_src_id3v2_frames_textinformationframe_.textinformationframe.md#parserawdata)
* [render](_src_id3v2_frames_textinformationframe_.textinformationframe.md#render)
* [renderFields](_src_id3v2_frames_textinformationframe_.textinformationframe.md#renderfields)
* [setData](_src_id3v2_frames_textinformationframe_.textinformationframe.md#setdata)
* [toString](_src_id3v2_frames_textinformationframe_.textinformationframe.md#tostring)
* [correctEncoding](_src_id3v2_frames_textinformationframe_.textinformationframe.md#correctencoding)
* [findTextInformationFrame](_src_id3v2_frames_textinformationframe_.textinformationframe.md#findtextinformationframe)
* [fromIdentifier](_src_id3v2_frames_textinformationframe_.textinformationframe.md#fromidentifier)
* [fromOffsetRawData](_src_id3v2_frames_textinformationframe_.textinformationframe.md#fromoffsetrawdata)
* [fromRawData](_src_id3v2_frames_textinformationframe_.textinformationframe.md#fromrawdata)

## Constructors

### constructor

\+ `Protected`**new TextInformationFrame**(`header`: [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md)): [TextInformationFrame](_src_id3v2_frames_textinformationframe_.textinformationframe.md)

*Overrides [Frame](_src_id3v2_frames_frame_.frame.md).[constructor](_src_id3v2_frames_frame_.frame.md#constructor)*

#### Parameters:

Name | Type |
------ | ------ |
`header` | [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md) |

**Returns:** [TextInformationFrame](_src_id3v2_frames_textinformationframe_.textinformationframe.md)

## Properties

### \_encoding

• `Protected` **\_encoding**: [StringType](../enums/_src_bytevector_.stringtype.md) = Id3v2Settings.defaultEncoding

___

### \_header

• `Protected` **\_header**: [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md)

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[_header](_src_id3v2_frames_frame_.frame.md#_header)*

___

### \_rawData

• `Protected` **\_rawData**: [ByteVector](_src_bytevector_.bytevector.md)

___

### \_rawVersion

• `Protected` **\_rawVersion**: number

___

### \_textFields

• `Protected` **\_textFields**: string[] = []

## Accessors

### encryptionId

• get **encryptionId**(): number \| undefined

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[encryptionId](_src_id3v2_frames_frame_.frame.md#encryptionid)*

Gets the encryption ID applied to the current instance.

**Returns:** number \| undefined

number Value containing the encryption identifier for the current instance or
    `undefined` if not set.

• set **encryptionId**(`value`: number \| undefined): void

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[encryptionId](_src_id3v2_frames_frame_.frame.md#encryptionid)*

Sets the encryption ID applied to the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | number \| undefined | Value containing the encryption identifier for the current instance. Must be an     8-bit unsigned integer. Setting to `undefined` will remove the encryption header and ID  |

**Returns:** void

number Value containing the encryption identifier for the current instance or
    `undefined` if not set.

___

### flags

• get **flags**(): [Id3v2FrameFlags](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md)

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[flags](_src_id3v2_frames_frame_.frame.md#flags)*

Gets the frame flags applied to the current instance.

**Returns:** [Id3v2FrameFlags](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md)

• set **flags**(`value`: [Id3v2FrameFlags](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md)): void

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[flags](_src_id3v2_frames_frame_.frame.md#flags)*

Sets the frame flags applied to the current instance.
If the value includes either [Id3v2FrameFlags.Encryption](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md#encryption) or
[Id3v2FrameFlags.Compression](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md#compression), [render](_src_id3v2_frames_textinformationframe_.textinformationframe.md#render) will throw.

#### Parameters:

Name | Type |
------ | ------ |
`value` | [Id3v2FrameFlags](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md) |

**Returns:** void

___

### frameClassType

• get **frameClassType**(): [FrameClassType](../enums/_src_id3v2_frames_frame_.frameclasstype.md)

*Overrides [Frame](_src_id3v2_frames_frame_.frame.md).[frameClassType](_src_id3v2_frames_frame_.frame.md#frameclasstype)*

**`inheritdoc`** 

**Returns:** [FrameClassType](../enums/_src_id3v2_frames_frame_.frameclasstype.md)

___

### frameId

• get **frameId**(): [FrameIdentifier](_src_id3v2_frameidentifiers_.frameidentifier.md)

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[frameId](_src_id3v2_frames_frame_.frame.md#frameid)*

Gets the frame ID for the current instance.

**Returns:** [FrameIdentifier](_src_id3v2_frameidentifiers_.frameidentifier.md)

FrameIdentifier Object representing of the identifier of the frame

___

### groupId

• get **groupId**(): number \| undefined

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[groupId](_src_id3v2_frames_frame_.frame.md#groupid)*

Gets the grouping ID applied to the current instance.

**Returns:** number \| undefined

number Value containing the grouping identifier for the current instance, or
    `undefined` if not set.

• set **groupId**(`value`: number \| undefined): void

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[groupId](_src_id3v2_frames_frame_.frame.md#groupid)*

Sets the grouping ID applied to the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | number \| undefined | Grouping identifier for the current instance. Must be a 8-bit unsigned integer.     Setting to `undefined` will remove the grouping identity header and ID  |

**Returns:** void

number Value containing the grouping identifier for the current instance, or
    `undefined` if not set.

___

### size

• get **size**(): number

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[size](_src_id3v2_frames_frame_.frame.md#size)*

Gets the size of the current instance as it was last stored on disk.
NOTE: This value is not used outside of reading a frame from disk, so newly created frames
    should not have this value set.

**Returns:** number

___

### text

• get **text**(): string[]

Gets the text contained in the current instance.
Note: Modifying the contents of the returned value will not modify the contents of the
current instance. The value must be reassigned for the value to change.

**Returns:** string[]

• set **text**(`value`: string[]): void

Sets the text contained in the current instance.

#### Parameters:

Name | Type |
------ | ------ |
`value` | string[] |

**Returns:** void

___

### textEncoding

• get **textEncoding**(): [StringType](../enums/_src_bytevector_.stringtype.md)

Gets the text encoding to use when rendering the current instance.

**Returns:** [StringType](../enums/_src_bytevector_.stringtype.md)

• set **textEncoding**(`value`: [StringType](../enums/_src_bytevector_.stringtype.md)): void

Sets the text encoding to use when rendering the current instance.
This value will be overridden if [Id3v2Settings.forceDefaultEncoding](_src_id3v2_id3v2settings_.id3v2settings.md#forcedefaultencoding) is `true`.

#### Parameters:

Name | Type |
------ | ------ |
`value` | [StringType](../enums/_src_bytevector_.stringtype.md) |

**Returns:** void

## Methods

### clone

▸ **clone**(): [Frame](_src_id3v2_frames_frame_.frame.md)

*Overrides [Frame](_src_id3v2_frames_frame_.frame.md).[clone](_src_id3v2_frames_frame_.frame.md#clone)*

**`inheritdoc`** 

**Returns:** [Frame](_src_id3v2_frames_frame_.frame.md)

___

### fieldData

▸ `Protected`**fieldData**(`frameData`: [ByteVector](_src_bytevector_.bytevector.md), `offset`: number, `version`: number, `dataIncludesHeader`: boolean): [ByteVector](_src_bytevector_.bytevector.md)

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[fieldData](_src_id3v2_frames_frame_.frame.md#fielddata)*

Extracts the field data from the raw portion of an ID3v2 frame.
This method is necessary for extracting extra data prepended to the frame such the as
grouping ID.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`frameData` | [ByteVector](_src_bytevector_.bytevector.md) | Raw frame data |
`offset` | number | Index at which the data is contained |
`version` | number | Version of the ID3v2 tag the data was originally encoded with |
`dataIncludesHeader` | boolean | `true` if `frameData` includes the header, `false`     otherwise  |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### parseFields

▸ `Protected`**parseFields**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `version`: number): void

*Overrides [Frame](_src_id3v2_frames_frame_.frame.md).[parseFields](_src_id3v2_frames_frame_.frame.md#parsefields)*

**`inheritdoc`** 

#### Parameters:

Name | Type |
------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) |
`version` | number |

**Returns:** void

___

### parseRawData

▸ `Protected`**parseRawData**(): void

Performs the actual parsing of the raw data.
Because of the high parsing cost and relatively low usage of the class [parseFields](_src_id3v2_frames_textinformationframe_.textinformationframe.md#parsefields)
only stores the field data so it can be parsed on demand. Whenever a property or method is
called which requires the data, this method is called, and only on the first call does it
actually parse the data.

**Returns:** void

___

### render

▸ **render**(`version`: number): [ByteVector](_src_bytevector_.bytevector.md)

*Overrides [Frame](_src_id3v2_frames_frame_.frame.md).[render](_src_id3v2_frames_frame_.frame.md#render)*

Renders the current instance, encoded in a specified ID3v2 version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`version` | number | ID3v2 version to use when encoding the current instance. Must be a positive     8-bit integer. |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

ByteVector Rendered version of the current instance.

___

### renderFields

▸ `Protected`**renderFields**(`version`: number): [ByteVector](_src_bytevector_.bytevector.md)

*Overrides [Frame](_src_id3v2_frames_frame_.frame.md).[renderFields](_src_id3v2_frames_frame_.frame.md#renderfields)*

**`inheritdoc`** 

#### Parameters:

Name | Type |
------ | ------ |
`version` | number |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### setData

▸ `Protected`**setData**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `offset`: number, `readHeader`: boolean, `version`: number): void

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[setData](_src_id3v2_frames_frame_.frame.md#setdata)*

Populates the current instance by reading the raw frame from disk, optionally reading the
header.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | Raw ID3v2 frame |
`offset` | number | Offset in `data` at which the frame begins. |
`readHeader` | boolean | Whether or not to read the reader into the current instance. |
`version` | number | Version of the ID3v2 tag the data was encoded with  |

**Returns:** void

___

### toString

▸ **toString**(): string

Returns a text representation of the current instance by combining the text with semicolons.

**Returns:** string

___

### correctEncoding

▸ `Static` `Protected`**correctEncoding**(`type`: [StringType](../enums/_src_bytevector_.stringtype.md), `version`: number): [StringType](../enums/_src_bytevector_.stringtype.md)

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[correctEncoding](_src_id3v2_frames_frame_.frame.md#correctencoding)*

Converts an encoding to be a supported encoding for a specified tag version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`type` | [StringType](../enums/_src_bytevector_.stringtype.md) | Value containing the original encoding |
`version` | number | Value containing the ID3v2 version to be encoded. |

**Returns:** [StringType](../enums/_src_bytevector_.stringtype.md)

StringType Value containing the correct encoding to use, based on
    [Id3v2Settings.forceDefaultEncoding](_src_id3v2_id3v2settings_.id3v2settings.md#forcedefaultencoding) and what is supported by
    `version`

___

### findTextInformationFrame

▸ `Static`**findTextInformationFrame**(`frames`: [TextInformationFrame](_src_id3v2_frames_textinformationframe_.textinformationframe.md)[], `ident`: [FrameIdentifier](_src_id3v2_frameidentifiers_.frameidentifier.md)): [TextInformationFrame](_src_id3v2_frames_textinformationframe_.textinformationframe.md)

Gets a [TextInformationFrame](_src_id3v2_frames_textinformationframe_.textinformationframe.md) object of a specified type from a specified type from a
list of text information frames.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`frames` | [TextInformationFrame](_src_id3v2_frames_textinformationframe_.textinformationframe.md)[] | List of frames to search |
`ident` | [FrameIdentifier](_src_id3v2_frameidentifiers_.frameidentifier.md) | Frame identifier to search for |

**Returns:** [TextInformationFrame](_src_id3v2_frames_textinformationframe_.textinformationframe.md)

TextInformationFrame Matching frame if it exists in `tag`, `undefined` if
    a matching frame was not found

___

### fromIdentifier

▸ `Static`**fromIdentifier**(`identifier`: [FrameIdentifier](_src_id3v2_frameidentifiers_.frameidentifier.md), `encoding?`: [StringType](../enums/_src_bytevector_.stringtype.md)): [TextInformationFrame](_src_id3v2_frames_textinformationframe_.textinformationframe.md)

Constructs and initializes a new instance with a specified identifier

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`identifier` | [FrameIdentifier](_src_id3v2_frameidentifiers_.frameidentifier.md) | - | Byte vector containing the identifier for the frame |
`encoding` | [StringType](../enums/_src_bytevector_.stringtype.md) | Id3v2Settings.defaultEncoding | Optionally, the encoding to use for the new instance. If omitted, defaults     to [Id3v2Settings.defaultEncoding](_src_id3v2_id3v2settings_.id3v2settings.md#defaultencoding)  |

**Returns:** [TextInformationFrame](_src_id3v2_frames_textinformationframe_.textinformationframe.md)

___

### fromOffsetRawData

▸ `Static`**fromOffsetRawData**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `offset`: number, `header`: [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md), `version`: number): [TextInformationFrame](_src_id3v2_frames_textinformationframe_.textinformationframe.md)

Constructs and initializes a new instance by reading its raw data in a specified ID3v2
version. This method allows for offset reading from the data bytevector.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | Raw representation of the new frame |
`offset` | number | What offset in `data` the frame actually begins. Must be positive,     safe integer |
`header` | [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md) | Header of the frame found at `data` in the data |
`version` | number | ID3v2 version the frame was originally encoded with  |

**Returns:** [TextInformationFrame](_src_id3v2_frames_textinformationframe_.textinformationframe.md)

___

### fromRawData

▸ `Static`**fromRawData**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `version`: number): [TextInformationFrame](_src_id3v2_frames_textinformationframe_.textinformationframe.md)

Constructs and initializes a new instance by reading its raw data in a specified
ID3v2 version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | Raw representation of the new frame |
`version` | number | ID3v2 version the raw frame is encoded with, must be a positive 8-bit integer  |

**Returns:** [TextInformationFrame](_src_id3v2_frames_textinformationframe_.textinformationframe.md)
