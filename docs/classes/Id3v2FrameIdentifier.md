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

#### Parameters

| Name | Type |
| :------ | :------ |
| `v4` | `string` |
| `v3` | `string` |
| `v2` | `string` |

## Accessors

### isTextFrame

• `get` **isTextFrame**(): `boolean`

#### Returns

`boolean`

___

### isUrlFrame

• `get` **isUrlFrame**(): `boolean`

#### Returns

`boolean`

## Methods

### render

▸ **render**(`version`): [`ByteVector`](ByteVector.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `version` | `number` |

#### Returns

[`ByteVector`](ByteVector.md)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`
