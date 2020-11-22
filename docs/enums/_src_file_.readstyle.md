**[node-taglib-sharp](../README.md)**

> [Globals](../globals.md) / ["src/file"](../modules/_src_file_.md) / ReadStyle

# Enumeration: ReadStyle

Specifies the options to use when reading the media. Can be treated as flags.

## Index

### Enumeration members

* [Average](_src_file_.readstyle.md#average)
* [None](_src_file_.readstyle.md#none)
* [PictureLazy](_src_file_.readstyle.md#picturelazy)

## Enumeration members

### Average

•  **Average**:  = 2

The media properties will be read with average accuracy.

___

### None

•  **None**:  = 0

The media properties will not be read.

___

### PictureLazy

•  **PictureLazy**:  = 4

Use the [PictureLazy](_src_file_.readstyle.md#picturelazy) class in the the property [Tag.pictures](../classes/_src_tag_.tag.md#pictures). This will avoid
loading picture content when reading the tag. Picture will be read lazily, when the picture
content is accessed.
