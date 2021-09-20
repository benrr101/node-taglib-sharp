import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";
import {Mock} from "typemoq";

import PropertyTests from "../utilities/propertyTests";
import XiphPicture from "../../src/xiph/xiphPicture";
import {ByteVector} from "../../src/byteVector";
import {FlacBlock, FlacBlockType} from "../../src/flac/flacBlock";
import {IPicture, PictureType} from "../../src/iPicture";
import {Testers} from "../utilities/testers";

@suite
class Xiph_PictureTests {
    private static readonly data = ByteVector.fromString("foobarbaz");
    private static readonly mimetype = "application/octet-stream";
    private static readonly description = "image";
    private static readonly width = 640;
    private static readonly height = 480;
    private static readonly colorDepth = 123;
    private static readonly indexedColors = 234;
    private static readonly type = PictureType.NotAPicture;
    private static readonly pictureBytes = ByteVector.concatenate(
        ByteVector.fromUInt(Xiph_PictureTests.type),
        ByteVector.fromUInt(Xiph_PictureTests.mimetype.length),
        ByteVector.fromString(Xiph_PictureTests.mimetype),
        ByteVector.fromUInt(Xiph_PictureTests.description.length),
        ByteVector.fromString(Xiph_PictureTests.description),
        ByteVector.fromUInt(Xiph_PictureTests.width),
        ByteVector.fromUInt(Xiph_PictureTests.height),
        ByteVector.fromUInt(Xiph_PictureTests.colorDepth),
        ByteVector.fromUInt(Xiph_PictureTests.indexedColors),
        ByteVector.fromUInt(Xiph_PictureTests.data.length),
        Xiph_PictureTests.data
    );
    private static readonly encodedPictureBytes = Buffer.from(Xiph_PictureTests.pictureBytes.data).toString("base64");

    @test
    public fromXiphComment_invalidParameters() {
        // Act / Assert
        Testers.testTruthy((v: string) => XiphPicture.fromXiphComment(v));
        assert.throws(() => XiphPicture.fromXiphComment(""));
    }

    @test
    public fromXiphComment_notLazy() {
        // Act
        const picture = XiphPicture.fromXiphComment(Xiph_PictureTests.encodedPictureBytes);

        // Assert
        assert.isTrue(picture.isLoaded);
        assert.strictEqual(picture.colorDepth, Xiph_PictureTests.colorDepth);
        assert.isTrue(ByteVector.equal(picture.data, Xiph_PictureTests.data));
        assert.strictEqual(picture.description, Xiph_PictureTests.description);
        assert.isUndefined(picture.filename);
        assert.strictEqual(picture.height, Xiph_PictureTests.height);
        assert.strictEqual(picture.indexedColors, Xiph_PictureTests.indexedColors);
        assert.strictEqual(picture.mimeType, Xiph_PictureTests.mimetype);
        assert.strictEqual(picture.type, Xiph_PictureTests.type);
        assert.strictEqual(picture.width, Xiph_PictureTests.width);
    }

    @test
    public fromXiphComment_lazy() {
        // Act
        const picture = XiphPicture.fromXiphComment(Xiph_PictureTests.encodedPictureBytes, true);

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
        const block = FlacBlock.fromData(FlacBlockType.Picture, Xiph_PictureTests.pictureBytes);

        // Act
        const picture = XiphPicture.fromFlacBlock(block);

        // Assert
        assert.isTrue(picture.isLoaded);
        assert.strictEqual(picture.colorDepth, Xiph_PictureTests.colorDepth);
        assert.isTrue(ByteVector.equal(picture.data, Xiph_PictureTests.data));
        assert.strictEqual(picture.description, Xiph_PictureTests.description);
        assert.isUndefined(picture.filename);
        assert.strictEqual(picture.height, Xiph_PictureTests.height);
        assert.strictEqual(picture.indexedColors, Xiph_PictureTests.indexedColors);
        assert.strictEqual(picture.mimeType, Xiph_PictureTests.mimetype);
        assert.strictEqual(picture.type, Xiph_PictureTests.type);
        assert.strictEqual(picture.width, Xiph_PictureTests.width);
    }

    @test
    public fromFlacBlock_lazy() {
        // Arrange
        const block = FlacBlock.fromData(FlacBlockType.Picture, Xiph_PictureTests.pictureBytes);

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
        mockPicture.setup((m) => m.type).returns(() => Xiph_PictureTests.type);
        mockPicture.setup((m) => m.mimeType).returns(() => Xiph_PictureTests.mimetype);
        mockPicture.setup((m) => m.filename).returns(() => "foobarbaz");
        mockPicture.setup((m) => m.description).returns(() => Xiph_PictureTests.description);
        mockPicture.setup((m) => m.data).returns(() => Xiph_PictureTests.data);

        // Act
        const picture = XiphPicture.fromPicture(mockPicture.object);

        // Assert
        assert.isTrue(picture.isLoaded);
        assert.isUndefined(picture.colorDepth);
        assert.isTrue(ByteVector.equal(picture.data, Xiph_PictureTests.data));
        assert.strictEqual(picture.description, Xiph_PictureTests.description);
        assert.strictEqual(picture.filename, "foobarbaz");
        assert.isUndefined(picture.height);
        assert.isUndefined(picture.indexedColors);
        assert.strictEqual(picture.mimeType, Xiph_PictureTests.mimetype);
        assert.strictEqual(picture.type, Xiph_PictureTests.type);
        assert.isUndefined(picture.width);
    }

    @test
    public fromPicture_xiphPicture() {
        // Arrange
        const testPicture = XiphPicture.fromXiphComment(Xiph_PictureTests.encodedPictureBytes);

        // Act
        const picture = XiphPicture.fromPicture(testPicture);

        // Assert
        assert.isTrue(picture.isLoaded);
        assert.strictEqual(picture.colorDepth, Xiph_PictureTests.colorDepth);
        assert.isTrue(ByteVector.equal(picture.data, Xiph_PictureTests.data));
        assert.strictEqual(picture.description, Xiph_PictureTests.description);
        assert.isUndefined(picture.filename);
        assert.strictEqual(picture.height, Xiph_PictureTests.height);
        assert.strictEqual(picture.indexedColors, Xiph_PictureTests.indexedColors);
        assert.strictEqual(picture.mimeType, Xiph_PictureTests.mimetype);
        assert.strictEqual(picture.type, Xiph_PictureTests.type);
        assert.strictEqual(picture.width, Xiph_PictureTests.width);
    }

    @test
    public colorDepth() {
        // Arrange
        const picture = XiphPicture.fromXiphComment(Xiph_PictureTests.encodedPictureBytes);

        // Act / Assert
        Testers.testUint((v) => picture.colorDepth = v);
        PropertyTests.propertyRoundTrip((v) => picture.colorDepth = v, () => picture.colorDepth, 888);
    }

    @test
    public data() {
        // Arrange
        const picture = XiphPicture.fromXiphComment(Xiph_PictureTests.encodedPictureBytes);

        // Act / Assert
        Testers.testTruthy((v: ByteVector) => picture.data = v);
        PropertyTests.propertyRoundTrip((v) => picture.data = v, () => picture.data, ByteVector.fromSize(10));
    }

    @test
    public description() {
        // Arrange
        const picture = XiphPicture.fromXiphComment(Xiph_PictureTests.encodedPictureBytes);

        // Act / Assert
        Testers.testTruthy((v: string) => picture.description = v);
        PropertyTests.propertyRoundTrip((v) => picture.description = v, () => picture.description, "foo");
    }

    @test
    public filename() {
        // Arrange
        const picture = XiphPicture.fromXiphComment(Xiph_PictureTests.encodedPictureBytes);

        // Act / Assert
        PropertyTests.propertyRoundTrip((v) => picture.filename = v, () => picture.filename, "foo");
        PropertyTests.propertyRoundTrip((v) => picture.filename = v, () => picture.filename, undefined);
    }

    @test
    public height() {
        // Arrange
        const picture = XiphPicture.fromXiphComment(Xiph_PictureTests.encodedPictureBytes);

        // Act / Assert
        Testers.testUint((v) => picture.height = v);
        PropertyTests.propertyRoundTrip((v) => picture.height = v, () => picture.height, 888);
    }

    @test
    public indexedColors() {
        // Arrange
        const picture = XiphPicture.fromXiphComment(Xiph_PictureTests.encodedPictureBytes);

        // Act / Assert
        Testers.testUint((v) => picture.indexedColors = v);
        PropertyTests.propertyRoundTrip((v) => picture.indexedColors = v, () => picture.indexedColors, 888);
    }

    @test
    public mimeType() {
        // Arrange
        const picture = XiphPicture.fromXiphComment(Xiph_PictureTests.encodedPictureBytes);

        // Act / Assert
        Testers.testTruthy((v: string) => picture.mimeType = v);
        PropertyTests.propertyRoundTrip((v) => picture.mimeType = v, () => picture.mimeType, "foo");
    }

    @test
    public type() {
        // Arrange
        const picture = XiphPicture.fromXiphComment(Xiph_PictureTests.encodedPictureBytes);

        // Act / Assert
        PropertyTests.propertyRoundTrip((v) => picture.type = v, () => picture.type, PictureType.Artist);
    }

    @test
    public width() {
        // Arrange
        const picture = XiphPicture.fromXiphComment(Xiph_PictureTests.encodedPictureBytes);

        // Act / Assert
        Testers.testUint((v) => picture.width = v);
        PropertyTests.propertyRoundTrip((v) => picture.width = v, () => picture.width, 888);
    }

    @test
    public renderForFlacBlock() {
        // Arrange
        const picture = XiphPicture.fromXiphComment(Xiph_PictureTests.encodedPictureBytes);

        // Act
        const output = picture.renderForFlacBlock();

        // Assert
        assert.isTrue(ByteVector.equal(output, Xiph_PictureTests.pictureBytes));
    }

    @test
    public renderForXiphComment() {
        // Arrange
        const picture = XiphPicture.fromXiphComment(Xiph_PictureTests.encodedPictureBytes);

        // Act
        const output = picture.renderForXiphComment();

        // Assert
        assert.strictEqual(output, Xiph_PictureTests.encodedPictureBytes);
    }
}
