import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";
import {Mock} from "typemoq";

import EbmlElement from "../../src/ebml/ebmlElement";
import EbmlParserOptions from "../../src/ebml/ebmlParserOptions";
import MatroskaAttachment from "../../src/matroska/matroskaAttachment";
import TestFile from "../utilities/testFile";
import {ByteVector, StringType} from "../../src/byteVector";
import {MatroskaIds} from "../../src/matroska/matroskaIds";
import {PictureType} from "../../src/picture";
import {Testers} from "../utilities/testers";
import MatroskaTestUtils from "./utils";

@suite
class Matroska_AttachmentTests {
    @test
    public fromAttachmentElement_invalidParameters() {
        // Act / Assert
        Testers.testTruthy((e: EbmlElement) => MatroskaAttachment.fromAttachmentElement(e));
        assert.throws(() => { MatroskaAttachment.fromAttachmentElement(Mock.ofType<EbmlElement>().object) });
    }

    @test
    public fromAttachmentElement_validParameters() {
        // Arrange
        const element = MatroskaTestUtils.getTestElement(ByteVector.empty(), MatroskaIds.ATTACHED_FILE);

        // Act
        const attachment = MatroskaAttachment.fromAttachmentElement(element);

        // Arrange
        assert.isOk(attachment);
        assert.isFalse(attachment.isLoaded);
    }

    @test
    public load_fromElement_missingDataElement() {
        // Arrange
        const element = new EbmlElement(TestFile.getFile([]), 0, MatroskaIds.ATTACHED_FILE, 0, new EbmlParserOptions());
        const attachment = MatroskaAttachment.fromAttachmentElement(element);

        // Act / Assert
        assert.throws(() => attachment.load());
        assert.isFalse(attachment.isLoaded);
    }

    @test
    public load_fromElement_notAPicture() {
        // Arrange
        const bytes = [
            0x46, 0x7E,       // Id (FILE_DESCRIPTION)
            0x83,             // Size (3)
            0x41, 0x42, 0x43, // Value (ABC)
            0x46, 0x6E,       // Id (FILE_NAME)
            0x83,             // Size (3)
            0x42, 0x43, 0x44, // Value (BCD)
            0x46, 0x60,       // Id (FILE_MIME_TYPE)
            0x83,             // Size (3)
            0x43, 0x44, 0x45, // Value (CDE)
            0x46, 0xAE,       // Id (FILE_UID)
            0x88,             // Size (8)
            0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
            0x46, 0x5C,       // Id (FILE_DATA)
            0x83,             // Size (3)
            0x44, 0x45, 0x46  // Value (DEF)
        ];
        const element = new EbmlElement(
            TestFile.getFile(bytes),
            0,
            MatroskaIds.ATTACHED_FILE,
            bytes.length, new EbmlParserOptions());
        const attachment = MatroskaAttachment.fromAttachmentElement(element);

        // Act
        attachment.load();

        // Assert
        assert.isTrue(attachment.isLoaded);
        Testers.bvEqual(attachment.data, ByteVector.fromString("DEF", StringType.UTF8));
        assert.strictEqual(attachment.description, "ABC");
        assert.strictEqual(attachment.filename, "BCD");
        assert.strictEqual(attachment.mimeType, "CDE");
        assert.strictEqual(attachment.type, PictureType.NotAPicture);
        assert.strictEqual(attachment.uid, BigInt("0x0102030405060708"));
    }

    @test
    public load_fromElement_otherPicture() {
        // Arrange
        const bytes = ByteVector.concatenate(
            // Id (FILE_MIME_TYPE)
            0x46, 0x60,
            // Size (3)
            0x89,
            // Value (CDE)
            ByteVector.fromString("image/gif", StringType.UTF8),
            0x46, 0x5C,       // Id (FILE_DATA)
            0x83,             // Size (3)
            0x44, 0x45, 0x46  // Value (DEF)
        );
        const element = new EbmlElement(
            TestFile.getFile(bytes),
            0,
            MatroskaIds.ATTACHED_FILE,
            bytes.length, new EbmlParserOptions());
        const attachment = MatroskaAttachment.fromAttachmentElement(element);

        // Act
        attachment.load();

        // Assert
        assert.isTrue(attachment.isLoaded);
        assert.strictEqual(attachment.type, PictureType.Other);
    }

    @test
    public load_fromElement_fileNameType() {
        // Arrange
        const bytes = ByteVector.concatenate(
            // Id (FILE_MIME_TYPE)
            0x46, 0x60,
            // Size (3)
            0x89,
            // Value (CDE)
            ByteVector.fromString("image/gif", StringType.UTF8),
            0x46, 0x6E,       // Id (FILE_NAME)
            0x8F,             // Size (3)
            ByteVector.fromString("ColoredFISH.gif", StringType.UTF8), // Value (BCD)
            0x46, 0x5C,       // Id (FILE_DATA)
            0x83,             // Size (3)
            0x44, 0x45, 0x46  // Value (DEF)
        );
        const element = new EbmlElement(
            TestFile.getFile(bytes),
            0,
            MatroskaIds.ATTACHED_FILE,
            bytes.length, new EbmlParserOptions());
        const attachment = MatroskaAttachment.fromAttachmentElement(element);

        // Act
        attachment.load();

        // Assert
        assert.isTrue(attachment.isLoaded);
        assert.strictEqual(attachment.type, PictureType.ColoredFish);
    }
}
