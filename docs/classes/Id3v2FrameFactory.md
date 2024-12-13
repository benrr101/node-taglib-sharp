[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2FrameFactory

# Class: Id3v2FrameFactory

Performs the necessary operations to determine and create the correct child classes of
Frame for a given raw ID3v2 frame.
By default, this will only load frames contained in the library. To add additional frames to the
process, register a frame creator with [addFrameCreator](Id3v2FrameFactory.md#addframecreator).

## Table of contents

### Constructors

- [constructor](Id3v2FrameFactory.md#constructor)

### Methods

- [addFrameCreator](Id3v2FrameFactory.md#addframecreator)
- [clearFrameCreators](Id3v2FrameFactory.md#clearframecreators)
- [createFrame](Id3v2FrameFactory.md#createframe)

## Constructors

### constructor

• **new Id3v2FrameFactory**()

## Methods

### addFrameCreator

▸ `Static` **addFrameCreator**(`creator`): `void`

Adds a custom frame creator to try before using standard frame creation methods.
Frame creators are used before standard methods so custom checking can be used and new
formats can be added. They are executed in reverse order in which they are added.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `creator` | [`Id3v2FrameCreator`](../modules.md#id3v2framecreator) | Frame creator function * data: ByteVector Raw ID3v2 frame * offset: number Offset in data at which the frame data begins (should be int) * header: Id3v2FrameHeader Header for the frame contained in data * version: number ID3v2 version the raw frame data is stored in (should be byte) * returns Frame if method was able to match the frame, falsy otherwise |

#### Returns

`void`

___

### clearFrameCreators

▸ `Static` **clearFrameCreators**(): `void`

Removes all custom frame creators

#### Returns

`void`

___

### createFrame

▸ `Static` **createFrame**(`data`, `file`, `offset`, `version`, `alreadyUnsynced`): `Object`

Creates a Frame object by reading it from raw ID3v2 frame data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ByteVector`](ByteVector.md) | Raw ID3v2 frame |
| `file` | [`File`](File.md) | File to read the frame from if `data` is falsy |
| `offset` | `number` | Index into `file` or in `data` if truthy, at which the frame begins. After reading, the offset where the next frame can be read is returned in the `offset` property of the returned object |
| `version` | `number` | ID3v2 version the frame is encoded with. Must be unsigned 8-bit int |
| `alreadyUnsynced` | `boolean` | Whether or not the entire tag has already been unsynchronized |

#### Returns

`Object`

Undefined is returned if there are no more frames to read.
    Object is returned if a frame was found. Object has the following properties:
    * frame: Frame that was read
    * offset: updated offset where the next frame starts

| Name | Type |
| :------ | :------ |
| `frame` | [`Id3v2Frame`](Id3v2Frame.md) |
| `offset` | `number` |
