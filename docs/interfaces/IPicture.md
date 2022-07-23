[node-taglib-sharp](../README.md) / [Exports](../modules.md) / IPicture

# Interface: IPicture

Interface that provides generic information about a picture, including its contents, as used by
various formats.

## Implemented by

- [`Id3v2AttachmentFrame`](../classes/Id3v2AttachmentFrame.md)
- [`Picture`](../classes/Picture.md)
- [`PictureLazy`](../classes/PictureLazy.md)
- [`XiphPicture`](../classes/XiphPicture.md)

## Table of contents

### Properties

- [data](IPicture.md#data)
- [description](IPicture.md#description)
- [filename](IPicture.md#filename)
- [mimeType](IPicture.md#mimetype)
- [type](IPicture.md#type)

## Properties

### data

• **data**: [`ByteVector`](../classes/ByteVector.md)

Gets and sets the picture data stored in the current instance.

___

### description

• **description**: `string`

Gets and sets a description of the picture stored in the current instance. Optional.

___

### filename

• **filename**: `string`

Gets and sets a filename of the picture stored in the current instance. Optional.

___

### mimeType

• **mimeType**: `string`

Gets and sets the mime-type of the picture data stored in the current instance.

___

### type

• **type**: [`PictureType`](../enums/PictureType.md)

Gets and sets the type of the content visible in the picture stored in the current instance.
