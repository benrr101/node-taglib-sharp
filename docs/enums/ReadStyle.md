[node-taglib-sharp](../README.md) / [Exports](../modules.md) / ReadStyle

# Enumeration: ReadStyle

Specifies the options to use when reading the media. Can be treated as flags.

## Table of contents

### Enumeration Members

- [Average](ReadStyle.md#average)
- [None](ReadStyle.md#none)
- [PictureLazy](ReadStyle.md#picturelazy)

## Enumeration Members

### Average

• **Average** = ``2``

The media properties will be read with average accuracy.

___

### None

• **None** = ``0``

The media properties will not be read.

___

### PictureLazy

• **PictureLazy** = ``4``

Use the [PictureLazy](../classes/PictureLazy.md) class in the property [pictures](../classes/Tag.md#pictures). This will avoid
loading picture content when reading the tag. Picture will be read lazily, when the picture
content is accessed.
