import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import {slow, suite, test, timeout} from "mocha-typescript";

import {ByteVector, StringType} from "../src/byteVector";
import {Picture} from "../src/picture";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

@suite(timeout(3000), slow(1000))
class Picture_StaticMethodTests {
    @test
    public getExtensionFromData_noMatch() {
        // Arrange
        const data = ByteVector.fromString("FOObarBaZ");

        // Act
        const output = Picture.getExtensionFromData(data);

        // Assert
        assert.isUndefined(output);
    }

    @test
    public getExtensionFromData_dataTooShort() {
        // Arrange
        const data = ByteVector.fromSize(2);

        // Act
        const output = Picture.getExtensionFromData(data);

        // Assert
        assert.isUndefined(output);
    }

    @test
    public getExtensionFromData_jpeg() {
        // Arrange
        const data = ByteVector.concatenate(
            0xFF, 0xD8, 0xFF,
            ByteVector.fromString("foobarbaz")
        );

        // Act
        const output = Picture.getExtensionFromData(data);

        // Assert
        assert.strictEqual(output, ".jpg");
    }

    @test
    public getExtensionFromData_png() {
        // Arrange
        const data = ByteVector.concatenate(0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A);

        // Act
        const output = Picture.getExtensionFromData(data);

        // Assert
        assert.strictEqual(output, ".png");
    }

    @test
    public getExtensionFromData_bmp() {
        // Arrange
        const data = ByteVector.fromString("BMfoobarbaz", StringType.Latin1);

        // Act
        const output = Picture.getExtensionFromData(data);

        // Assert
        assert.strictEqual(output, ".bmp");
    }

    @test
    public getExtensionFromData_gif() {
        // Arrange
        const data = ByteVector.fromString("GIF8foobarbaz", StringType.Latin1);

        // Act
        const output = Picture.getExtensionFromData(data);

        // Assert
        assert.strictEqual(output, ".gif");
    }

    @test
    public getExtensionFromMimeType_noMatch() {
        // Act
        const output = Picture.getExtensionFromMimeType("audio/foobarbaz");

        // Assert
        assert.isUndefined(output);
    }

    @test
    public getExtensionFromMimeType_mp3() {
        // Act
        const output = Picture.getExtensionFromMimeType("audio/mpeg");

        // Assert
        assert.strictEqual(output, ".mp3");
    }

    @test
    public getExtensionFromMimeType_bin() {
        // Act
        const output = Picture.getExtensionFromMimeType("application/octet-stream");

        // Assert
        assert.strictEqual(output, ".bin");
    }

    @test
    public getExtensionFromMimeType_matchFound() {
        // Act
        const output = Picture.getExtensionFromMimeType("application/rtf");

        // Assert
        assert.strictEqual(output, ".rtf");
    }

    @test
    public getMimeTypeFromExtension_extensionNotGiven() {
        // Act
        const output = Picture.getMimeTypeFromExtension("");

        // Assert
        assert.strictEqual(output, "application/octet-stream");
    }

    @test
    public getMimeTypeFromExtension_noExtension() {
        // Act
        const output = Picture.getMimeTypeFromExtension("gif");

        // Assert
        assert.strictEqual(output, "image/gif");
    }

    @test
    public getMimeTypeFromExtension_matchFound() {
        // Act
        const output = Picture.getMimeTypeFromExtension("/foo/bar/baz.jpg");

        // Assert
        assert.strictEqual(output, "image/jpeg");
    }

    @test
    public getMimeTypeFromExtension_noMatchFound() {
        // Act
        const output = Picture.getMimeTypeFromExtension("/foo/bar/baz.qqq");

        // Assert
        assert.strictEqual(output, "application/octet-stream");
    }
}
