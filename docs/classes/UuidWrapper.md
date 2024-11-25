[node-taglib-sharp](../README.md) / [Exports](../modules.md) / UuidWrapper

# Class: UuidWrapper

Wrapper around the UUID package to make it easier to handle UUIDs.

## Table of contents

### Constructors

- [constructor](UuidWrapper.md#constructor)

### Methods

- [equals](UuidWrapper.md#equals)
- [toBytes](UuidWrapper.md#tobytes)
- [toString](UuidWrapper.md#tostring)

## Constructors

### constructor

• **new UuidWrapper**(`source?`)

Constructs an instance using either the supplied UUID or generating a new, random one.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source?` | `string` \| [`ByteVector`](ByteVector.md) | If provided, it is used as the bytes of the instance. If a falsy value is provided, a new v4 UUID will be generated. |

## Methods

### equals

▸ **equals**(`b`): `boolean`

Determines whether this instance and another instance represent the same UUID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `b` | [`UuidWrapper`](UuidWrapper.md) | The other UUID to compare this one to. |

#### Returns

`boolean`

___

### toBytes

▸ **toBytes**(): [`ByteVector`](ByteVector.md)

Gets the bytes that make up the UUID.

#### Returns

[`ByteVector`](ByteVector.md)

___

### toString

▸ **toString**(): `string`

Gets a string representation of the UUID.

#### Returns

`string`
