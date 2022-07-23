[node-taglib-sharp](../README.md) / [Exports](../modules.md) / OggCodecFactory

# Class: OggCodecFactory

Factory for creating codecs from the first packet of the Ogg bitstream.

**`remarks`** By default, only codecs provided by the library will be matched. However, custom codec
    support can be added by using {@see addCodecProvider}.

## Table of contents

### Constructors

- [constructor](OggCodecFactory.md#constructor)

### Methods

- [addCodecProvider](OggCodecFactory.md#addcodecprovider)
- [clearCustomProviders](OggCodecFactory.md#clearcustomproviders)
- [getCodec](OggCodecFactory.md#getcodec)

## Constructors

### constructor

• **new OggCodecFactory**()

## Methods

### addCodecProvider

▸ `Static` **addCodecProvider**(`provider`): `void`

Adds a custom codec provider to try before using standard codec creation methods.
Codec providers are used before standard methods so custom checking can be used and new
formats can be added. They are executed in reverse order in which they are added.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `provider` | `CodecProvider` | Codec provider function     * firstPacket: ByteVector First packet of the bitstream     * returns IOggCodec if method was able to match the packet, falsy otherwise |

#### Returns

`void`

___

### clearCustomProviders

▸ `Static` **clearCustomProviders**(): `void`

Clears the custom providers from the factory.

#### Returns

`void`

___

### getCodec

▸ `Static` **getCodec**(`packet`): `default`

Determines the correc codec to use for a stream header packet.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `packet` | [`ByteVector`](ByteVector.md) | First packet of an Ogg logical bitstream. |

#### Returns

`default`
