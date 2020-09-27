**node-taglib-sharp**

> [README](../README.md) / [Globals](../globals.md) / ["src/id3v2/frames/relativeVolumeFrame"](../modules/_src_id3v2_frames_relativevolumeframe_.md) / ChannelData

# Class: ChannelData

## Hierarchy

* **ChannelData**

## Index

### Constructors

* [constructor](_src_id3v2_frames_relativevolumeframe_.channeldata.md#constructor)

### Accessors

* [channelType](_src_id3v2_frames_relativevolumeframe_.channeldata.md#channeltype)
* [isSet](_src_id3v2_frames_relativevolumeframe_.channeldata.md#isset)
* [peakBits](_src_id3v2_frames_relativevolumeframe_.channeldata.md#peakbits)
* [peakVolume](_src_id3v2_frames_relativevolumeframe_.channeldata.md#peakvolume)
* [volumeAdjustment](_src_id3v2_frames_relativevolumeframe_.channeldata.md#volumeadjustment)

### Methods

* [render](_src_id3v2_frames_relativevolumeframe_.channeldata.md#render)
* [fromData](_src_id3v2_frames_relativevolumeframe_.channeldata.md#fromdata)

## Constructors

### constructor

\+ **new ChannelData**(`channel`: [ChannelType](../enums/_src_id3v2_frames_relativevolumeframe_.channeltype.md)): [ChannelData](_src_id3v2_frames_relativevolumeframe_.channeldata.md)

*Defined in src/id3v2/frames/relativeVolumeFrame.ts:62*

#### Parameters:

Name | Type |
------ | ------ |
`channel` | [ChannelType](../enums/_src_id3v2_frames_relativevolumeframe_.channeltype.md) |

**Returns:** [ChannelData](_src_id3v2_frames_relativevolumeframe_.channeldata.md)

## Accessors

### channelType

• get **channelType**(): [ChannelType](../enums/_src_id3v2_frames_relativevolumeframe_.channeltype.md)

*Defined in src/id3v2/frames/relativeVolumeFrame.ts:85*

**Returns:** [ChannelType](../enums/_src_id3v2_frames_relativevolumeframe_.channeltype.md)

___

### isSet

• get **isSet**(): boolean

*Defined in src/id3v2/frames/relativeVolumeFrame.ts:87*

**Returns:** boolean

___

### peakBits

• get **peakBits**(): number

*Defined in src/id3v2/frames/relativeVolumeFrame.ts:96*

Number of bits used to express the peak volume.

**Returns:** number

• set **peakBits**(`value`: number): void

*Defined in src/id3v2/frames/relativeVolumeFrame.ts:101*

Number of bits used to express the peak volume.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | number | Bits used to express the peak volume. Must be an integer betweenInclusive 1 and 64  |

**Returns:** void

___

### peakVolume

• get **peakVolume**(): BigInt.BigInteger

*Defined in src/id3v2/frames/relativeVolumeFrame.ts:112*

Value of the peak sample in the file. It's unclear exactly how this works, but the ID3v2.4
documentation explains this value as betweenInclusive 0 and 255 - but can be expressed using any
number of bits ({@see peakBits}).

**Returns:** BigInt.BigInteger

• set **peakVolume**(`value`: BigInt.BigInteger): void

*Defined in src/id3v2/frames/relativeVolumeFrame.ts:119*

Value of the peak sample in the file. It's unclear exactly how this works, but the ID3v2.4
documentation explains this value as betweenInclusive 0 and 255 - but can be expressed using any
number of bits ({@see peakBits}).

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | BigInt.BigInteger | Peak volume value. Must fit in the number of bits set in {@see peakBits}  |

**Returns:** void

___

### volumeAdjustment

• get **volumeAdjustment**(): number

*Defined in src/id3v2/frames/relativeVolumeFrame.ts:135*

Volume adjustment of the track in dB.

**Returns:** number

• set **volumeAdjustment**(`value`: number): void

*Defined in src/id3v2/frames/relativeVolumeFrame.ts:141*

Volume adjustment of the track in dB. This value is expressed as a fixed-precision value
betweenInclusive -64 and 64. Don't worry about the math, we'll do it for you.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | number | Volume adjustment. Must be betweenInclusive -64 and 64.  |

**Returns:** void

## Methods

### render

▸ **render**(): [ByteVector](_src_bytevector_.bytevector.md)

*Defined in src/id3v2/frames/relativeVolumeFrame.ts:147*

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### fromData

▸ `Static`**fromData**(`bytes`: [ByteVector](_src_bytevector_.bytevector.md)): [ChannelData](_src_id3v2_frames_relativevolumeframe_.channeldata.md)

*Defined in src/id3v2/frames/relativeVolumeFrame.ts:68*

#### Parameters:

Name | Type |
------ | ------ |
`bytes` | [ByteVector](_src_bytevector_.bytevector.md) |

**Returns:** [ChannelData](_src_id3v2_frames_relativevolumeframe_.channeldata.md)
