**node-taglib-sharp**

> [README](../README.md) / [Globals](../globals.md) / ["src/file"](../modules/_src_file_.md) / ReadStyle

# Enumeration: ReadStyle

Specifies the options to use when reading the media. Can be treated as flags.

## Index

### Enumeration members

* [Average](_src_file_.readstyle.md#average)
* [None](_src_file_.readstyle.md#none)
* [PictureLazy](_src_file_.readstyle.md#picturelazy)

## Enumeration members

### Average

•  **Average**: {} = 2

*Defined in src/file.ts:22*

The media properties will be read with average accuracy.

___

### None

•  **None**: {} = 0

*Defined in src/file.ts:15*

The media properties will not be read.

___

### PictureLazy

•  **PictureLazy**: {} = 4

*Defined in src/file.ts:29*

Use the {@see PictureLazy} class in the the property {@see Tag.pictures}. This will avoid
loading picture content when reading the tag. Picture will be read lazily, when the picture
content is accessed.
