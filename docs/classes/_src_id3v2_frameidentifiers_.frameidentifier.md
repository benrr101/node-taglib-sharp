**[node-taglib-sharp](../README.md)**

> [Globals](../globals.md) / ["src/id3v2/frameIdentifiers"](../modules/_src_id3v2_frameidentifiers_.md) / FrameIdentifier

# Class: FrameIdentifier

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

* **FrameIdentifier**

## Index

### Constructors

* [constructor](_src_id3v2_frameidentifiers_.frameidentifier.md#constructor)

### Accessors

* [isTextFrame](_src_id3v2_frameidentifiers_.frameidentifier.md#istextframe)
* [isUrlFrame](_src_id3v2_frameidentifiers_.frameidentifier.md#isurlframe)

### Methods

* [render](_src_id3v2_frameidentifiers_.frameidentifier.md#render)
* [toString](_src_id3v2_frameidentifiers_.frameidentifier.md#tostring)

## Constructors

### constructor

\+ **new FrameIdentifier**(`v4`: string, `v3`: string, `v2`: string): [FrameIdentifier](_src_id3v2_frameidentifiers_.frameidentifier.md)

#### Parameters:

Name | Type |
------ | ------ |
`v4` | string |
`v3` | string |
`v2` | string |

**Returns:** [FrameIdentifier](_src_id3v2_frameidentifiers_.frameidentifier.md)

## Accessors

### isTextFrame

• get **isTextFrame**(): boolean

**Returns:** boolean

___

### isUrlFrame

• get **isUrlFrame**(): boolean

**Returns:** boolean

## Methods

### render

▸ **render**(`version`: number): [ByteVector](_src_bytevector_.bytevector.md)

#### Parameters:

Name | Type |
------ | ------ |
`version` | number |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### toString

▸ **toString**(): string

**Returns:** string
