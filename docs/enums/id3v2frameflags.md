[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2FrameFlags

# Enumeration: Id3v2FrameFlags

## Table of contents

### Enumeration members

- [Compression](id3v2frameflags.md#compression)
- [DataLengthIndicator](id3v2frameflags.md#datalengthindicator)
- [Desynchronized](id3v2frameflags.md#desynchronized)
- [Encryption](id3v2frameflags.md#encryption)
- [FileAlterPreservation](id3v2frameflags.md#filealterpreservation)
- [GroupingIdentity](id3v2frameflags.md#groupingidentity)
- [None](id3v2frameflags.md#none)
- [ReadOnly](id3v2frameflags.md#readonly)
- [TagAlterPreservation](id3v2frameflags.md#tagalterpreservation)

## Enumeration members

### Compression

• **Compression**: = 8

Frame data is compressed.

___

### DataLengthIndicator

• **DataLengthIndicator**: = 1

Frame has a data length indicator.

___

### Desynchronized

• **Desynchronized**: = 2

Frame data has been desynchronized.

___

### Encryption

• **Encryption**: = 4

Frame data is encrypted.

___

### FileAlterPreservation

• **FileAlterPreservation**: = 8192

Frame is to be deleted if the file is altered.

___

### GroupingIdentity

• **GroupingIdentity**: = 64

Frame has a grouping identity.

___

### None

• **None**: = 0

Header contains no flags.

___

### ReadOnly

• **ReadOnly**: = 4096

Frame is read-only and should not be altered.

___

### TagAlterPreservation

• **TagAlterPreservation**: = 16384

Frame is to be deleted if the tag is altered.
