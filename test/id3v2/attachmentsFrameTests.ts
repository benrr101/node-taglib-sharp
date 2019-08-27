import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import * as TypeMoq from "typemoq";
import {slow, suite, test, timeout} from "mocha-typescript";

import AttachmentFrame from "../../src/id3v2/frames/attachmentFrame";
import {IPicture, PictureType} from "../../src/picture";
import TestConstants from "../testConstants";
import {FrameClassType} from "../../src/id3v2/frames/frame";
import FrameTypes from "../../src/id3v2/frameTypes";
import Id3v2TagSettings from "../../src/id3v2/id3v2TagSettings";
import {ByteVector} from "../../src/byteVector";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

// Test constants
const description = "foo";
const filename = "foo.bar";
const mimeType = "foo/bar";
const picType = PictureType.ColoredFish;

@suite(timeout(3000), slow(1000)) class FromPictureTests {
    @test
    public falsyPicture() {
        // Act/Assert
        assert.throws(() => { AttachmentFrame.fromPicture(undefined); });
        assert.throws(() => { AttachmentFrame.fromPicture(null); });
    }

    @test
    public validPicture() {
        // Arrange
        const pictureMoq = TypeMoq.Mock.ofType<IPicture>();
        pictureMoq.setup((p) => p.type).returns(() => picType);
        pictureMoq.setup((p) => p.mimeType).returns(() => mimeType);
        pictureMoq.setup((p) => p.filename).returns(() => filename);
        pictureMoq.setup((p) => p.description).returns(() => description);
        pictureMoq.setup((p) => p.data).returns(() => TestConstants.testByteVector);

        // Act
        const output = AttachmentFrame.fromPicture(pictureMoq.object);

        // Assert
        assert.isTrue(ByteVector.equal(output.frameId, FrameTypes.APIC));

        assert.strictEqual(output.data, TestConstants.testByteVector);
        assert.strictEqual(output.description, description);
        assert.strictEqual(output.filename, filename);
        assert.strictEqual(output.frameClassType, FrameClassType.AttachmentFrame);
        assert.isTrue(output.isLoaded);
        assert.strictEqual(output.mimeType, mimeType);
        assert.strictEqual(output.textEncoding, Id3v2TagSettings.defaultEncoding);
    }
}
