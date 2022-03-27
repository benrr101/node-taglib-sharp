import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";
import {Mock} from "typemoq";

import PropertyTests from "../utilities/propertyTests";
import XiphPicture from "../../src/xiph/xiphPicture";
import XiphTestResources from "./resources";
import {ByteVector} from "../../src/byteVector";
import {FlacBlock, FlacBlockType} from "../../src/flac/flacBlock";
import {IPicture, PictureType} from "../../src/picture";
import {Testers} from "../utilities/testers";

@suite
class Xiph_PictureTests {
    @test
    public fromXiphComment_invalidParameters() {
        // Act / Assert
        Testers.testTruthy((v: string) => XiphPicture.fromXiphComment(v));
        assert.throws(() => XiphPicture.fromXiphComment("abc"));
    }

    @test
    public fromXiphComment_notLazy() {
        // Act
        const picture = XiphPicture.fromXiphComment(XiphTestResources.pictureEncodedBytes);

        // Assert
        assert.isTrue(picture.isLoaded);
        assert.strictEqual(picture.colorDepth, XiphTestResources.pictureColorDepth);
        Testers.bvEqual(picture.data, XiphTestResources.pictureData);
        assert.strictEqual(picture.description, XiphTestResources.pictureDescription);
        assert.isUndefined(picture.filename);
        assert.strictEqual(picture.height, XiphTestResources.pictureHeight);
        assert.strictEqual(picture.indexedColors, XiphTestResources.pictureIndexedColors);
        assert.strictEqual(picture.mimeType, XiphTestResources.pictureMimeType);
        assert.strictEqual(picture.type, XiphTestResources.pictureType);
        assert.strictEqual(picture.width, XiphTestResources.pictureWidth);
    }

    @test
    public fromXiphComment_lazy() {
        // Act
        const picture = XiphPicture.fromXiphComment(XiphTestResources.pictureEncodedBytes, true);

        // Assert
        assert.isFalse(picture.isLoaded);
    }

    @test
    public fromFlacBlock_invalidParams() {
        // Act / Assert
        Testers.testTruthy((v: FlacBlock) => XiphPicture.fromFlacBlock(v, true));
    }

    @test
    public fromFlacBlock_blockTooSmall() {
        // Arrange
        const mockBlock = Mock.ofType<FlacBlock>();
        mockBlock.setup((m) => m.dataSize).returns(() => 31);

        // Act / Assert
        assert.throws(() => XiphPicture.fromFlacBlock(mockBlock.object));
    }

    @test
    public fromFlacBlock_notLazy() {
        // Arrange
        const block = FlacBlock.fromData(FlacBlockType.Picture, XiphTestResources.pictureBytes);

        // Act
        const picture = XiphPicture.fromFlacBlock(block);

        // Assert
        assert.isTrue(picture.isLoaded);
        assert.strictEqual(picture.colorDepth, XiphTestResources.pictureColorDepth);
        Testers.bvEqual(picture.data, XiphTestResources.pictureData);
        assert.strictEqual(picture.description, XiphTestResources.pictureDescription);
        assert.isUndefined(picture.filename);
        assert.strictEqual(picture.height, XiphTestResources.pictureHeight);
        assert.strictEqual(picture.indexedColors, XiphTestResources.pictureIndexedColors);
        assert.strictEqual(picture.mimeType, XiphTestResources.pictureMimeType);
        assert.strictEqual(picture.type, XiphTestResources.pictureType);
        assert.strictEqual(picture.width, XiphTestResources.pictureWidth);
    }

    @test
    public fromFlacBlock_lazy() {
        // Arrange
        const block = FlacBlock.fromData(FlacBlockType.Picture, XiphTestResources.pictureBytes);

        // Act
        const picture = XiphPicture.fromFlacBlock(block, true);

        // Assert
        assert.isFalse(picture.isLoaded);
    }

    @test
    public fromPicture_invalidParameters() {
        // Act / Assert
        Testers.testTruthy((v: IPicture) => XiphPicture.fromPicture(v));
    }

    @test
    public fromPicture_genericPicture() {
        // Arrange
        const mockPicture = Mock.ofType<IPicture>();
        mockPicture.setup((m) => m.type).returns(() => XiphTestResources.pictureType);
        mockPicture.setup((m) => m.mimeType).returns(() => XiphTestResources.pictureMimeType);
        mockPicture.setup((m) => m.filename).returns(() => "foobarbaz");
        mockPicture.setup((m) => m.description).returns(() => XiphTestResources.pictureDescription);
        mockPicture.setup((m) => m.data).returns(() => XiphTestResources.pictureData);

        // Act
        const picture = XiphPicture.fromPicture(mockPicture.object);

        // Assert
        assert.isTrue(picture.isLoaded);
        assert.strictEqual(picture.colorDepth, 0);
        Testers.bvEqual(picture.data, XiphTestResources.pictureData);
        assert.strictEqual(picture.description, XiphTestResources.pictureDescription);
        assert.strictEqual(picture.filename, "foobarbaz");
        assert.strictEqual(picture.height, 0);
        assert.strictEqual(picture.indexedColors, 0);
        assert.strictEqual(picture.mimeType, XiphTestResources.pictureMimeType);
        assert.strictEqual(picture.type, XiphTestResources.pictureType);
        assert.strictEqual(picture.width, 0);
    }

    @test
    public fromPicture_xiphPicture() {
        // Arrange
        const testPicture = XiphPicture.fromXiphComment(XiphTestResources.pictureEncodedBytes);

        // Act
        const picture = XiphPicture.fromPicture(testPicture);

        // Assert
        assert.isTrue(picture.isLoaded);
        assert.strictEqual(picture.colorDepth, XiphTestResources.pictureColorDepth);
        Testers.bvEqual(picture.data, XiphTestResources.pictureData);
        assert.strictEqual(picture.description, XiphTestResources.pictureDescription);
        assert.isUndefined(picture.filename);
        assert.strictEqual(picture.height, XiphTestResources.pictureHeight);
        assert.strictEqual(picture.indexedColors, XiphTestResources.pictureIndexedColors);
        assert.strictEqual(picture.mimeType, XiphTestResources.pictureMimeType);
        assert.strictEqual(picture.type, XiphTestResources.pictureType);
        assert.strictEqual(picture.width, XiphTestResources.pictureWidth);
    }

    @test
    public colorDepth() {
        // Arrange
        const picture = XiphPicture.fromXiphComment(XiphTestResources.pictureEncodedBytes);

        // Act / Assert
        Testers.testUint((v) => picture.colorDepth = v);
        PropertyTests.propertyRoundTrip((v) => picture.colorDepth = v, () => picture.colorDepth, 888);
    }

    @test
    public data() {
        // Arrange
        const picture = XiphPicture.fromXiphComment(XiphTestResources.pictureEncodedBytes);

        // Act / Assert
        Testers.testTruthy((v: ByteVector) => picture.data = v);
        PropertyTests.propertyRoundTrip((v) => picture.data = v, () => picture.data, ByteVector.fromSize(10));
    }

    @test
    public description() {
        // Arrange
        const picture = XiphPicture.fromXiphComment(XiphTestResources.pictureEncodedBytes);

        // Act / Assert
        Testers.testTruthy((v: string) => picture.description = v);
        PropertyTests.propertyRoundTrip((v) => picture.description = v, () => picture.description, "foo");
    }

    @test
    public filename() {
        // Arrange
        const picture = XiphPicture.fromXiphComment(XiphTestResources.pictureEncodedBytes);

        // Act / Assert
        PropertyTests.propertyRoundTrip((v) => picture.filename = v, () => picture.filename, "foo");
        PropertyTests.propertyRoundTrip((v) => picture.filename = v, () => picture.filename, undefined);
    }

    @test
    public height() {
        // Arrange
        const picture = XiphPicture.fromXiphComment(XiphTestResources.pictureEncodedBytes);

        // Act / Assert
        Testers.testUint((v) => picture.height = v);
        PropertyTests.propertyRoundTrip((v) => picture.height = v, () => picture.height, 888);
    }

    @test
    public indexedColors() {
        // Arrange
        const picture = XiphPicture.fromXiphComment(XiphTestResources.pictureEncodedBytes);

        // Act / Assert
        Testers.testUint((v) => picture.indexedColors = v);
        PropertyTests.propertyRoundTrip((v) => picture.indexedColors = v, () => picture.indexedColors, 888);
    }

    @test
    public mimeType() {
        // Arrange
        const picture = XiphPicture.fromXiphComment(XiphTestResources.pictureEncodedBytes);

        // Act / Assert
        Testers.testTruthy((v: string) => picture.mimeType = v);
        PropertyTests.propertyRoundTrip((v) => picture.mimeType = v, () => picture.mimeType, "foo");
    }

    @test
    public type() {
        // Arrange
        const picture = XiphPicture.fromXiphComment(XiphTestResources.pictureEncodedBytes);

        // Act / Assert
        PropertyTests.propertyRoundTrip((v) => picture.type = v, () => picture.type, PictureType.Artist);
    }

    @test
    public width() {
        // Arrange
        const picture = XiphPicture.fromXiphComment(XiphTestResources.pictureEncodedBytes);

        // Act / Assert
        Testers.testUint((v) => picture.width = v);
        PropertyTests.propertyRoundTrip((v) => picture.width = v, () => picture.width, 888);
    }

    @test
    public renderForFlacBlock() {
        // Arrange
        const picture = XiphPicture.fromXiphComment(XiphTestResources.pictureEncodedBytes);

        // Act
        const output = picture.renderForFlacBlock();

        // Assert
        Testers.bvEqual(output, XiphTestResources.pictureBytes);
    }

    @test
    public renderForXiphComment() {
        // Arrange
        const picture = XiphPicture.fromXiphComment(XiphTestResources.pictureEncodedBytes);

        // Act
        const output = picture.renderForXiphComment();

        // Assert
        assert.strictEqual(output, XiphTestResources.pictureEncodedBytes);
    }
}
