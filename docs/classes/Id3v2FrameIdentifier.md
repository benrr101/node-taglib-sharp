[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2FrameIdentifier

# Class: Id3v2FrameIdentifier

Represents the identifier of a frame, depending on the version this may be 3 or 4
bytes. Provides a simple way to switch between the identifiers used for different versions.

**`Remarks`**

This class is implemented in an attempt to unify frame identifiers, make it easy to
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

## Table of contents

### Constructors

- [constructor](Id3v2FrameIdentifier.md#constructor)

### Accessors

- [isTextFrame](Id3v2FrameIdentifier.md#istextframe)
- [isUrlFrame](Id3v2FrameIdentifier.md#isurlframe)

### Methods

- [render](Id3v2FrameIdentifier.md#render)
- [toString](Id3v2FrameIdentifier.md#tostring)

## Constructors

### constructor

• **new Id3v2FrameIdentifier**(`v4`, `v3`, `v2`)

Constructs and initializes a new instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v4` | `string` | Identifier string to use on ID3v2.4 tags. If not supplied, frame type is not valid for ID3v2.4 tags. |
| `v3` | `string` | Identifier string to use on ID3v2.3 tags. If not supplied, frame type is not valid for ID3v2.4 tags. |
| `v2` | `string` | Identifier string to use on ID3v2.2 tags. If not supplied, frame type is not valid for ID3v2.2 tags. |

## Accessors

### isTextFrame

• `get` **isTextFrame**(): `boolean`

Whether the frame identifier indicates the frame is a text frame.

#### Returns

`boolean`

___

### isUrlFrame

• `get` **isUrlFrame**(): `boolean`

Whether the frame identifier indicates the frame is a URL frame.

#### Returns

`boolean`

## Methods

### render

▸ **render**(`version`): [`ByteVector`](ByteVector.md)

Renders the frame identifier by returning the identifier string for the specified ID3v2
version.

**`Throws`**

NotSupportedError Thrown if the frame identifier does not contain a string for the
    provided ID3v2 version.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `version` | `number` | Version of ID3v2 to render the current instance for |

#### Returns

[`ByteVector`](ByteVector.md)

___

### toString

▸ **toString**(): `string`

Generates a string representation of the frame identifier.

**`Remarks`**

This always returns the string for the newest version of ID3v2. Therefore, this method
    should only be used for diagnostic purposes, and not for generating file contents.

#### Returns

`string`
