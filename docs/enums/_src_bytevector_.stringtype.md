**node-taglib-sharp**

> [README](../README.md) / [Globals](../globals.md) / ["src/byteVector"](../modules/_src_bytevector_.md) / StringType

# Enumeration: StringType

**`summary`** Specifies the text encoding used when converting betweenInclusive a {@link string} and a
         [ByteVector](../classes/_src_bytevector_.bytevector.md).

**`remarks`** This enumeration is used by {@link ByteVector.FromString(string,StringType)} and
         {@link ByteVector.ToString(StringType)}

## Index

### Enumeration members

* [Latin1](_src_bytevector_.stringtype.md#latin1)
* [UTF16](_src_bytevector_.stringtype.md#utf16)
* [UTF16BE](_src_bytevector_.stringtype.md#utf16be)
* [UTF16LE](_src_bytevector_.stringtype.md#utf16le)
* [UTF8](_src_bytevector_.stringtype.md#utf8)

## Enumeration members

### Latin1

•  **Latin1**: {} = 0

*Defined in src/byteVector.ts:37*

**`summary`** The string is to be Latin-1 encoded.

___

### UTF16

•  **UTF16**: {} = 1

*Defined in src/byteVector.ts:42*

**`summary`** The string is to be UTF-16 encoded.

___

### UTF16BE

•  **UTF16BE**: {} = 2

*Defined in src/byteVector.ts:47*

**`summary`** The string is to be UTF-16BE encoded.

___

### UTF16LE

•  **UTF16LE**: {} = 4

*Defined in src/byteVector.ts:57*

**`summary`** The string is to be UTF-16LE encoded.

___

### UTF8

•  **UTF8**: {} = 3

*Defined in src/byteVector.ts:52*

**`summary`** The string is to be UTF-8 encoded.
