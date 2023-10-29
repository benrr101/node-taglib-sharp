[node-taglib-sharp](../README.md) / [Exports](../modules.md) / Mpeg4BoxType

# Class: Mpeg4BoxType

Provides references to different box types used by the library. This class is used to severely reduce the number
of times these types are created in AppleTag, greatly improving the speed at which warm files are read.

## Table of contents

### Constructors

- [constructor](Mpeg4BoxType.md#constructor)

### Properties

- [AART](Mpeg4BoxType.md#aart)
- [ALB](Mpeg4BoxType.md#alb)
- [ART](Mpeg4BoxType.md#art)
- [CMT](Mpeg4BoxType.md#cmt)
- [CO64](Mpeg4BoxType.md#co64)
- [COND](Mpeg4BoxType.md#cond)
- [COVR](Mpeg4BoxType.md#covr)
- [CPIL](Mpeg4BoxType.md#cpil)
- [CPRT](Mpeg4BoxType.md#cprt)
- [DATA](Mpeg4BoxType.md#data)
- [DAY](Mpeg4BoxType.md#day)
- [DESC](Mpeg4BoxType.md#desc)
- [DISK](Mpeg4BoxType.md#disk)
- [DTAG](Mpeg4BoxType.md#dtag)
- [ESDS](Mpeg4BoxType.md#esds)
- [FREE](Mpeg4BoxType.md#free)
- [FTYP](Mpeg4BoxType.md#ftyp)
- [GEN](Mpeg4BoxType.md#gen)
- [GNRE](Mpeg4BoxType.md#gnre)
- [GRP](Mpeg4BoxType.md#grp)
- [HDLR](Mpeg4BoxType.md#hdlr)
- [ILST](Mpeg4BoxType.md#ilst)
- [ITUNES\_TAG\_BOX](Mpeg4BoxType.md#itunes_tag_box)
- [LYR](Mpeg4BoxType.md#lyr)
- [MDAT](Mpeg4BoxType.md#mdat)
- [MDIA](Mpeg4BoxType.md#mdia)
- [MEAN](Mpeg4BoxType.md#mean)
- [META](Mpeg4BoxType.md#meta)
- [MINF](Mpeg4BoxType.md#minf)
- [MOOV](Mpeg4BoxType.md#moov)
- [MVHD](Mpeg4BoxType.md#mvhd)
- [NAM](Mpeg4BoxType.md#nam)
- [NAME](Mpeg4BoxType.md#name)
- [ROLE](Mpeg4BoxType.md#role)
- [SKIP](Mpeg4BoxType.md#skip)
- [SOAA](Mpeg4BoxType.md#soaa)
- [SOAL](Mpeg4BoxType.md#soal)
- [SOAR](Mpeg4BoxType.md#soar)
- [SOCO](Mpeg4BoxType.md#soco)
- [SONM](Mpeg4BoxType.md#sonm)
- [STBL](Mpeg4BoxType.md#stbl)
- [STCO](Mpeg4BoxType.md#stco)
- [STSD](Mpeg4BoxType.md#stsd)
- [SUBT](Mpeg4BoxType.md#subt)
- [TEXT](Mpeg4BoxType.md#text)
- [TMPO](Mpeg4BoxType.md#tmpo)
- [TRAK](Mpeg4BoxType.md#trak)
- [TRKN](Mpeg4BoxType.md#trkn)
- [UDTA](Mpeg4BoxType.md#udta)
- [URL](Mpeg4BoxType.md#url)
- [UUID](Mpeg4BoxType.md#uuid)
- [WRT](Mpeg4BoxType.md#wrt)

## Constructors

### constructor

• **new Mpeg4BoxType**()

## Properties

### AART

▪ `Static` `Readonly` **AART**: [`ByteVector`](ByteVector.md)

QuickTime album artist box

___

### ALB

▪ `Static` `Readonly` **ALB**: [`ByteVector`](ByteVector.md)

QuickTime album box

___

### ART

▪ `Static` `Readonly` **ART**: [`ByteVector`](ByteVector.md)

QuickTime artist box

___

### CMT

▪ `Static` `Readonly` **CMT**: [`ByteVector`](ByteVector.md)

QuickTime comment box

___

### CO64

▪ `Static` `Readonly` **CO64**: [`ByteVector`](ByteVector.md)

ISO 64-bit chunk offset box

___

### COND

▪ `Static` `Readonly` **COND**: [`ByteVector`](ByteVector.md)

QuickTime conductor box? @TODO: Verify this works should not be ©con

___

### COVR

▪ `Static` `Readonly` **COVR**: [`ByteVector`](ByteVector.md)

QuickTime cover art box

___

### CPIL

▪ `Static` `Readonly` **CPIL**: [`ByteVector`](ByteVector.md)

QuickTime compilation flag box

___

### CPRT

▪ `Static` `Readonly` **CPRT**: [`ByteVector`](ByteVector.md)

QuickTime copyright box

___

### DATA

▪ `Static` `Readonly` **DATA**: [`ByteVector`](ByteVector.md)

iTunesInfo tag data box

___

### DAY

▪ `Static` `Readonly` **DAY**: [`ByteVector`](ByteVector.md)

QuickTime content create date

___

### DESC

▪ `Static` `Readonly` **DESC**: [`ByteVector`](ByteVector.md)

QuickTime description box @TODO: What about DSCP used in 3gp videos?

___

### DISK

▪ `Static` `Readonly` **DISK**: [`ByteVector`](ByteVector.md)

QuickTime disk number box

___

### DTAG

▪ `Static` `Readonly` **DTAG**: [`ByteVector`](ByteVector.md)

Date tagged box? @TODO: There's no record of this one

___

### ESDS

▪ `Static` `Readonly` **ESDS**: [`ByteVector`](ByteVector.md)

ISO Elementary stream descriptor box

___

### FREE

▪ `Static` `Readonly` **FREE**: [`ByteVector`](ByteVector.md)

ISO Free space box

___

### FTYP

▪ `Static` `Readonly` **FTYP**: [`ByteVector`](ByteVector.md)

ISO File type box

___

### GEN

▪ `Static` `Readonly` **GEN**: [`ByteVector`](ByteVector.md)

QuickTime genre box

___

### GNRE

▪ `Static` `Readonly` **GNRE**: [`ByteVector`](ByteVector.md)

3GPP genre box?

___

### GRP

▪ `Static` `Readonly` **GRP**: [`ByteVector`](ByteVector.md)

QuickTime gouping box

___

### HDLR

▪ `Static` `Readonly` **HDLR**: [`ByteVector`](ByteVector.md)

ISO handler box

___

### ILST

▪ `Static` `Readonly` **ILST**: [`ByteVector`](ByteVector.md)

Quicktime item list box

___

### ITUNES\_TAG\_BOX

▪ `Static` `Readonly` **ITUNES\_TAG\_BOX**: [`ByteVector`](ByteVector.md)

iTunesInfo tag box

___

### LYR

▪ `Static` `Readonly` **LYR**: [`ByteVector`](ByteVector.md)

QuickTIme lyrics box

___

### MDAT

▪ `Static` `Readonly` **MDAT**: [`ByteVector`](ByteVector.md)

ISO media data container box

___

### MDIA

▪ `Static` `Readonly` **MDIA**: [`ByteVector`](ByteVector.md)

ISO media information container box

___

### MEAN

▪ `Static` `Readonly` **MEAN**: [`ByteVector`](ByteVector.md)

iTunesInfo tag meaning box

___

### META

▪ `Static` `Readonly` **META**: [`ByteVector`](ByteVector.md)

ISO metadata container box

___

### MINF

▪ `Static` `Readonly` **MINF**: [`ByteVector`](ByteVector.md)

ISO media information container box

___

### MOOV

▪ `Static` `Readonly` **MOOV**: [`ByteVector`](ByteVector.md)

ISO box containing all metadata

___

### MVHD

▪ `Static` `Readonly` **MVHD**: [`ByteVector`](ByteVector.md)

ISO movie header and overall declarations box

___

### NAM

▪ `Static` `Readonly` **NAM**: [`ByteVector`](ByteVector.md)

QuickTime title box

___

### NAME

▪ `Static` `Readonly` **NAME**: [`ByteVector`](ByteVector.md)

iTunesInfo tag name box

___

### ROLE

▪ `Static` `Readonly` **ROLE**: [`ByteVector`](ByteVector.md)

Performers role box? @TODO: There's no record of this one

___

### SKIP

▪ `Static` `Readonly` **SKIP**: [`ByteVector`](ByteVector.md)

ISO free space box

___

### SOAA

▪ `Static` `Readonly` **SOAA**: [`ByteVector`](ByteVector.md)

QuickTime sortable album artist box

___

### SOAL

▪ `Static` `Readonly` **SOAL**: [`ByteVector`](ByteVector.md)

QuickTime sortable album title box

___

### SOAR

▪ `Static` `Readonly` **SOAR**: [`ByteVector`](ByteVector.md)

QuickTime sortable artist box

___

### SOCO

▪ `Static` `Readonly` **SOCO**: [`ByteVector`](ByteVector.md)

QuickTime sortable composer box

___

### SONM

▪ `Static` `Readonly` **SONM**: [`ByteVector`](ByteVector.md)

QuickTime sortable title box

___

### STBL

▪ `Static` `Readonly` **STBL**: [`ByteVector`](ByteVector.md)

ISO sample table box

___

### STCO

▪ `Static` `Readonly` **STCO**: [`ByteVector`](ByteVector.md)

ISO chunk offset box

___

### STSD

▪ `Static` `Readonly` **STSD**: [`ByteVector`](ByteVector.md)

ISO sample description box

___

### SUBT

▪ `Static` `Readonly` **SUBT**: [`ByteVector`](ByteVector.md)

Subtitle box? @TODO: There's no record of this one

___

### TEXT

▪ `Static` `Readonly` **TEXT**: [`ByteVector`](ByteVector.md)

Alias text box? @TODO: There's no record of this one

___

### TMPO

▪ `Static` `Readonly` **TMPO**: [`ByteVector`](ByteVector.md)

QuickTime BPM box

___

### TRAK

▪ `Static` `Readonly` **TRAK**: [`ByteVector`](ByteVector.md)

ISO track container box

___

### TRKN

▪ `Static` `Readonly` **TRKN**: [`ByteVector`](ByteVector.md)

QuickTime track number box

___

### UDTA

▪ `Static` `Readonly` **UDTA**: [`ByteVector`](ByteVector.md)

ISO User data box

___

### URL

▪ `Static` `Readonly` **URL**: [`ByteVector`](ByteVector.md)

Alias URL box? @TODO: There's no record of this one

___

### UUID

▪ `Static` `Readonly` **UUID**: [`ByteVector`](ByteVector.md)

ISO user extension box

___

### WRT

▪ `Static` `Readonly` **WRT**: [`ByteVector`](ByteVector.md)

QuickTime composer box
