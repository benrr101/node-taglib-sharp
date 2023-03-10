[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Id3v2FrameFlags

# Enumeration: Id3v2FrameFlags

Indicates the flags applied to a [Id3v2FrameHeader](../classes/Id3v2FrameHeader.md) object.

## Table of contents

### Enumeration Members

- [Compression](Id3v2FrameFlags.md#compression)
- [DataLengthIndicator](Id3v2FrameFlags.md#datalengthindicator)
- [Encryption](Id3v2FrameFlags.md#encryption)
- [FileAlterPreservation](Id3v2FrameFlags.md#filealterpreservation)
- [GroupingIdentity](Id3v2FrameFlags.md#groupingidentity)
- [None](Id3v2FrameFlags.md#none)
- [ReadOnly](Id3v2FrameFlags.md#readonly)
- [TagAlterPreservation](Id3v2FrameFlags.md#tagalterpreservation)
- [Unsynchronized](Id3v2FrameFlags.md#unsynchronized)

## Enumeration Members

### Compression

• **Compression** = ``8``

Frame data is compressed.

___

### DataLengthIndicator

• **DataLengthIndicator** = ``1``

Frame has a data length indicator.

___

### Encryption

• **Encryption** = ``4``

Frame data is encrypted.

___

### FileAlterPreservation

• **FileAlterPreservation** = ``8192``

Frame is to be deleted if the file is altered.

___

### GroupingIdentity

• **GroupingIdentity** = ``64``

Frame has a grouping identity.

___

### None

• **None** = ``0``

Header contains no flags.

___

### ReadOnly

• **ReadOnly** = ``4096``

Frame is read-only and should not be altered.

___

### TagAlterPreservation

• **TagAlterPreservation** = ``16384``

Frame is to be deleted if the tag is altered.

___

### Unsynchronized

• **Unsynchronized** = ``2``

Frame data has been unsynchronized using the ID3v2 unsynchronization scheme.
