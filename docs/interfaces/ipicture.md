[node-taglib-sharp](../README.md) / [Exports](../modules.md) / IPicture

# Interface: IPicture

Interface that provides generic information about a picture, including its contents, as used by
various formats.

## Implemented by

- [`Id3v2AttachmentFrame`](../classes/id3v2attachmentframe.md)
- [`Picture`](../classes/picture.md)
- [`PictureLazy`](../classes/picturelazy.md)

## Table of contents

### Properties

- [data](ipicture.md#data)
- [description](ipicture.md#description)
- [filename](ipicture.md#filename)
- [mimeType](ipicture.md#mimetype)
- [type](ipicture.md#type)

## Properties

### data

• **data**: [`ByteVector`](../classes/bytevector.md)

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

• **type**: [`PictureType`](../enums/picturetype.md)

Gets and sets the type of the content visible in the picture stored in the current instance.
