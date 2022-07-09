import {ByteVector, PictureType, StringType} from "../../src";

export default class XiphTestResources {
    public static readonly pictureData = ByteVector.fromString("foobarbaz", StringType.UTF8);
    public static readonly pictureMimeType = "application/octet-stream";
    public static readonly pictureDescription = "image";
    public static readonly pictureWidth = 640;
    public static readonly pictureHeight = 480;
    public static readonly pictureColorDepth = 123;
    public static readonly pictureIndexedColors = 234;
    public static readonly pictureType = PictureType.ColoredFish;
    public static readonly pictureBytes = ByteVector.concatenate(
        ByteVector.fromUint(XiphTestResources.pictureType),
        ByteVector.fromUint(XiphTestResources.pictureMimeType.length),
        ByteVector.fromString(XiphTestResources.pictureMimeType, StringType.UTF8),
        ByteVector.fromUint(XiphTestResources.pictureDescription.length),
        ByteVector.fromString(XiphTestResources.pictureDescription, StringType.UTF8),
        ByteVector.fromUint(XiphTestResources.pictureWidth),
        ByteVector.fromUint(XiphTestResources.pictureHeight),
        ByteVector.fromUint(XiphTestResources.pictureColorDepth),
        ByteVector.fromUint(XiphTestResources.pictureIndexedColors),
        ByteVector.fromUint(XiphTestResources.pictureData.length),
        XiphTestResources.pictureData
    );
    public static readonly pictureEncodedBytes = XiphTestResources.pictureBytes.toBase64String();
}
