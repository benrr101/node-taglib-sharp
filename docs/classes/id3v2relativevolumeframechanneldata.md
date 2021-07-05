[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2RelativeVolumeFrameChannelData

# Class: Id3v2RelativeVolumeFrameChannelData

## Table of contents

### Constructors

- [constructor](id3v2relativevolumeframechanneldata.md#constructor)

### Accessors

- [channelType](id3v2relativevolumeframechanneldata.md#channeltype)
- [isSet](id3v2relativevolumeframechanneldata.md#isset)
- [peakBits](id3v2relativevolumeframechanneldata.md#peakbits)
- [peakVolume](id3v2relativevolumeframechanneldata.md#peakvolume)
- [volumeAdjustment](id3v2relativevolumeframechanneldata.md#volumeadjustment)

### Methods

- [render](id3v2relativevolumeframechanneldata.md#render)
- [fromData](id3v2relativevolumeframechanneldata.md#fromdata)

## Constructors

### constructor

• **new Id3v2RelativeVolumeFrameChannelData**(`channel`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `channel` | [`Id3v2RelativeVolumeFrameChannelType`](../enums/id3v2relativevolumeframechanneltype.md) |

## Accessors

### channelType

• `get` **channelType**(): [`Id3v2RelativeVolumeFrameChannelType`](../enums/id3v2relativevolumeframechanneltype.md)

#### Returns

[`Id3v2RelativeVolumeFrameChannelType`](../enums/id3v2relativevolumeframechanneltype.md)

___

### isSet

• `get` **isSet**(): `boolean`

#### Returns

`boolean`

___

### peakBits

• `get` **peakBits**(): `number`

Number of bits used to express the peak volume.

#### Returns

`number`

• `set` **peakBits**(`value`): `void`

Number of bits used to express the peak volume.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Bits used to express the peak volume. Must be an integer betweenInclusive 1 and 64 |

#### Returns

`void`

___

### peakVolume

• `get` **peakVolume**(): `bigint`

Value of the peak sample in the file. It's unclear exactly how this works, but the ID3v2.4
documentation explains this value as betweenInclusive 0 and 255 - but can be expressed using any
number of bits ([peakBits](id3v2relativevolumeframechanneldata.md#peakbits)).

#### Returns

`bigint`

• `set` **peakVolume**(`value`): `void`

Value of the peak sample in the file. It's unclear exactly how this works, but the ID3v2.4
documentation explains this value as betweenInclusive 0 and 255 - but can be expressed using any
number of bits ([peakBits](id3v2relativevolumeframechanneldata.md#peakbits)).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `bigint` | Peak volume value. Must fit in the number of bits set in [peakBits](id3v2relativevolumeframechanneldata.md#peakbits) |

#### Returns

`void`

___

### volumeAdjustment

• `get` **volumeAdjustment**(): `number`

Volume adjustment of the track in dB.

#### Returns

`number`

• `set` **volumeAdjustment**(`value`): `void`

Volume adjustment of the track in dB. This value is expressed as a fixed-precision value
betweenInclusive -64 and 64. Don't worry about the math, we'll do it for you.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Volume adjustment. Must be between -64 and 64, inclusive. |

#### Returns

`void`

## Methods

### render

▸ **render**(): [`ByteVector`](bytevector.md)

#### Returns

[`ByteVector`](bytevector.md)

___

### fromData

▸ `Static` **fromData**(`bytes`): [`Id3v2RelativeVolumeFrameChannelData`](id3v2relativevolumeframechanneldata.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `bytes` | [`ByteVector`](bytevector.md) |

#### Returns

[`Id3v2RelativeVolumeFrameChannelData`](id3v2relativevolumeframechanneldata.md)
