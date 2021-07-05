[node-taglib-sharp](../README.md) / [Exports](../modules.md) / ReadStyle

# Enumeration: ReadStyle

Specifies the options to use when reading the media. Can be treated as flags.

## Table of contents

### Enumeration members

- [Average](readstyle.md#average)
- [None](readstyle.md#none)
- [PictureLazy](readstyle.md#picturelazy)

## Enumeration members

### Average

• **Average** = `2`

The media properties will be read with average accuracy.

___

### None

• **None** = `0`

The media properties will not be read.

___

### PictureLazy

• **PictureLazy** = `4`

Use the [PictureLazy](readstyle.md#picturelazy) class in the the property [Tag.pictures](../classes/tag.md#pictures). This will avoid
loading picture content when reading the tag. Picture will be read lazily, when the picture
content is accessed.
