[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2FrameIdentifier

# Class: Id3v2FrameIdentifier

**`summary`** Represents the identifier of a frame, depending on the version this may be 3 or 4
    bytes. Provides a simple way to switch between the identifiers used for different versions.

**`remarks`** This class is implemented in an attempt to unify frame identifiers, make it easy to
    switch versions, find frames between tags, and determine which frames are supported on which
    version of ID3v2.
    If you have a death wish, you can take your life into your own hands and construct your own
    FrameIdentifier for use in non-standard frames. This is VERY STRONGLY NOT ADVISED. Not only
    will you be breaking the ID3v2 standard making your frame not portable, but you will also
    have to ensure the FrameIdentifier instance you create is used everywhere the frame
    identifier is used.
    To make implementation and less memory intensive, FrameIdentifier instances for built-in
    frame identifiers are statically created and reused. This allows usage of the `===` to
    compare instances because they should always be the same.

## Hierarchy

* **Id3v2FrameIdentifier**

## Table of contents

### Constructors

- [constructor](id3v2frameidentifier.md#constructor)

### Accessors

- [isTextFrame](id3v2frameidentifier.md#istextframe)
- [isUrlFrame](id3v2frameidentifier.md#isurlframe)

### Methods

- [render](id3v2frameidentifier.md#render)
- [toString](id3v2frameidentifier.md#tostring)

## Constructors

### constructor

\+ **new Id3v2FrameIdentifier**(`v4`: *string*, `v3`: *string*, `v2`: *string*): [*Id3v2FrameIdentifier*](id3v2frameidentifier.md)

#### Parameters:

Name | Type |
------ | ------ |
`v4` | *string* |
`v3` | *string* |
`v2` | *string* |

**Returns:** [*Id3v2FrameIdentifier*](id3v2frameidentifier.md)

## Accessors

### isTextFrame

• **isTextFrame**(): *boolean*

**Returns:** *boolean*

___

### isUrlFrame

• **isUrlFrame**(): *boolean*

**Returns:** *boolean*

## Methods

### render

▸ **render**(`version`: *number*): [*ByteVector*](bytevector.md)

#### Parameters:

Name | Type |
------ | ------ |
`version` | *number* |

**Returns:** [*ByteVector*](bytevector.md)

___

### toString

▸ **toString**(): *string*

**Returns:** *string*
