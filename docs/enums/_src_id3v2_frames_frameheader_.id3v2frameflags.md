**[node-taglib-sharp](../README.md)**

> [Globals](../globals.md) / ["src/id3v2/frames/frameHeader"](../modules/_src_id3v2_frames_frameheader_.md) / Id3v2FrameFlags

# Enumeration: Id3v2FrameFlags

## Index

### Enumeration members

* [Compression](_src_id3v2_frames_frameheader_.id3v2frameflags.md#compression)
* [DataLengthIndicator](_src_id3v2_frames_frameheader_.id3v2frameflags.md#datalengthindicator)
* [Desynchronized](_src_id3v2_frames_frameheader_.id3v2frameflags.md#desynchronized)
* [Encryption](_src_id3v2_frames_frameheader_.id3v2frameflags.md#encryption)
* [FileAlterPreservation](_src_id3v2_frames_frameheader_.id3v2frameflags.md#filealterpreservation)
* [GroupingIdentity](_src_id3v2_frames_frameheader_.id3v2frameflags.md#groupingidentity)
* [None](_src_id3v2_frames_frameheader_.id3v2frameflags.md#none)
* [ReadOnly](_src_id3v2_frames_frameheader_.id3v2frameflags.md#readonly)
* [TagAlterPreservation](_src_id3v2_frames_frameheader_.id3v2frameflags.md#tagalterpreservation)

## Enumeration members

### Compression

•  **Compression**:  = 8

Frame data is compressed.

___

### DataLengthIndicator

•  **DataLengthIndicator**:  = 1

Frame has a data length indicator.

___

### Desynchronized

•  **Desynchronized**:  = 2

Frame data has been desynchronized.

___

### Encryption

•  **Encryption**:  = 4

Frame data is encrypted.

___

### FileAlterPreservation

•  **FileAlterPreservation**:  = 8192

Frame is to be deleted if the file is altered.

___

### GroupingIdentity

•  **GroupingIdentity**:  = 64

Frame has a grouping identity.

___

### None

•  **None**:  = 0

Header contains no flags.

___

### ReadOnly

•  **ReadOnly**:  = 4096

Frame is read-only and should not be altered.

___

### TagAlterPreservation

•  **TagAlterPreservation**:  = 16384

Frame is to be deleted if the tag is altered.
