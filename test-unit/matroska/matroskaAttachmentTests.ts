import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";
import {Mock} from "typemoq";

import EbmlElement from "../../src/ebml/ebmlElement";
import MatroskaAttachment from "../../src/matroska/matroskaAttachment";
import MatroskaTestUtils from "./utils";
import TestFile from "../utilities/testFile";
import {ByteVector, StringType} from "../../src/byteVector";
import {MatroskaIds} from "../../src/matroska/matroskaIds";
import {IPicture, PictureType} from "../../src/picture";
import {Testers} from "../utilities/testers";

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
        const element = new EbmlElement(TestFile.getFile([]), 0, MatroskaIds.ATTACHED_FILE, 0, {});
        const attachment = MatroskaAttachment.fromAttachmentElement(element);

        // Act / Assert
        assert.throws(() => attachment.load());
        assert.isFalse(attachment.isLoaded);
    }

    @test
    public load_fromElement_notAPicture() {
        // Arrange
        const bytes = [
            0x46, 0x7E,       // ID (FILE_DESCRIPTION)
            0x83,             // Size (3)
            0x41, 0x42, 0x43, // Value (ABC)
            0x46, 0x6E,       // ID (FILE_NAME)
            0x83,             // Size (3)
            0x42, 0x43, 0x44, // Value (BCD)
            0x46, 0x60,       // Id (FILE_MIME_TYPE)
            0x83,             // Size (3)
            0x43, 0x44, 0x45, // Value (CDE)
            0x46, 0xAE,       // ID (FILE_UID)
            0x88,             // Size (8)
            0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
            0x46, 0x5C,       // ID (FILE_DATA)
            0x83,             // Size (3)
            0x44, 0x45, 0x46  // Value (DEF)
        ];
        const element = new EbmlElement(TestFile.getFile(bytes), 0, MatroskaIds.ATTACHED_FILE, bytes.length, {});
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
        const element = new EbmlElement(TestFile.getFile(bytes), 0, MatroskaIds.ATTACHED_FILE, bytes.length, {});
        const attachment = MatroskaAttachment.fromAttachmentElement(element);

        // Act
        attachment.load();

        // Assert
        assert.isTrue(attachment.isLoaded);
        assert.strictEqual(attachment.type, PictureType.Other);
    }

    @test
    public load_fromElement_filenameType() {
        // Arrange
        const bytes = ByteVector.concatenate(
            // Id (FILE_MIME_TYPE)
            0x46, 0x60,
            // Size (3)
            0x89,
            // Value (CDE)
            ByteVector.fromString("image/gif", StringType.UTF8),
            0x46, 0x6E,       // ID (FILE_NAME)
            0x8F,             // Size (3)
            ByteVector.fromString("ColoredFISH.gif", StringType.UTF8), // Value (BCD)
            0x46, 0x5C,       // ID (FILE_DATA)
            0x83,             // Size (3)
            0x44, 0x45, 0x46  // Value (DEF)
        );
        const element = new EbmlElement(TestFile.getFile(bytes), 0, MatroskaIds.ATTACHED_FILE, bytes.length, {});
        const attachment = MatroskaAttachment.fromAttachmentElement(element);

        // Act
        attachment.load();

        // Assert
        assert.isTrue(attachment.isLoaded);
        assert.strictEqual(attachment.type, PictureType.ColoredFish);
    }

    @test
    public load_fromPicture_noFilenameOrMimeType() {
        // Arrange
        const picture: IPicture = {
            data: ByteVector.empty(),
            description: "a colored fish",
            type: PictureType.ColoredFish,
            filename: null,
            mimeType: null
        };
        const attachment = MatroskaAttachment.fromPicture(picture);

        // Act / Assert
        assert.throws(() => attachment.load());
    }

    @test
    public load_fromPicture_withFilenameNoMimeType() {
        // Arrange
        const picture: IPicture = {
            data: ByteVector.fromString("foobarbaz", StringType.UTF8),
            description: "a colored fish",
            filename: "fish.gif",
            mimeType: null,
            type: PictureType.ColoredFish
        };
        const attachment = MatroskaAttachment.fromPicture(picture);

        // Act
        attachment.load();

        // Assert
        assert.isTrue(attachment.isLoaded);
        Testers.bvEqual(attachment.data, picture.data);
        assert.strictEqual(attachment.description, picture.description);
        assert.strictEqual(attachment.filename, "ColoredFish.gif");
        assert.strictEqual(attachment.mimeType, "image/gif");
        assert.ok(attachment.uid);
    }

    @test
    public load_fromPicture_withMimeTypeNoFilename() {
        // Arrange
        const picture: IPicture = {
            data: ByteVector.fromString("foobarbaz", StringType.UTF8),
            description: "a colored fish",
            filename: null,
            mimeType: "image/gif",
            type: PictureType.ColoredFish
        };
        const attachment = MatroskaAttachment.fromPicture(picture);

        // Act
        attachment.load();

        // Assert
        assert.isTrue(attachment.isLoaded);
        Testers.bvEqual(attachment.data, picture.data);
        assert.strictEqual(attachment.description, picture.description);
        assert.strictEqual(attachment.filename, "ColoredFish.gif");
        assert.strictEqual(attachment.mimeType, "image/gif");
        assert.strictEqual(attachment.type, PictureType.ColoredFish);
    }

    @test
    public load_fromPicture_unknownMimeType() {
        // Arrange
        const picture: IPicture = {
            data: ByteVector.fromString("foobarbaz", StringType.UTF8),
            description: "a colored fish",
            filename: "foobar.gif",
            mimeType: "foo/bar",
            type: PictureType.ColoredFish
        };
        const attachment = MatroskaAttachment.fromPicture(picture);

        // Act
        attachment.load();

        // Assert
        assert.isTrue(attachment.isLoaded);
        Testers.bvEqual(attachment.data, picture.data);
        assert.strictEqual(attachment.description, picture.description);
        assert.strictEqual(attachment.filename, "ColoredFish.bin");
        assert.strictEqual(attachment.mimeType, "foo/bar");
        assert.strictEqual(attachment.type, PictureType.ColoredFish);
    }

    @test
    public set_data() {
        // Arrange
        const attachment = this.getTestAttachment();
        const data = ByteVector.fromString("foobarbaz", StringType.UTF8);

        // Act
        attachment.data = data;

        // Assert
        assert.strictEqual(attachment.data, data);
    }

    @test
    public set_description() {
        // Arrange
        const attachment = this.getTestAttachment();
        const description = "foobarbaz";

        // Act
        attachment.description = description;

        // Assert
        assert.strictEqual(attachment.description, description);
    }

    @test
    public set_filename() {
        // Arrange
        const attachment = this.getTestAttachment();
        const filename = "foobarbaz.gif";

        // Act
        attachment.filename = filename;

        // Assert
        assert.strictEqual(attachment.filename, filename);
    }

    @test
    public set_mimetype() {
        // Arrange
        const attachment = this.getTestAttachment();
        const mimeType = "image/jpeg";

        // Act
        attachment.mimeType = mimeType;

        // Assert
        assert.strictEqual(attachment.mimeType, mimeType);
    }

    @test
    public set_type() {
        // Arrange
        const attachment = this.getTestAttachment();
        const type = PictureType.DuringPerformance;

        // Act
        attachment.type = type;

        // Assert
        assert.strictEqual(attachment.type, type);
        assert.strictEqual(attachment.filename, "DuringPerformance.gif");
    }

    private getTestAttachment() {
        const picture: IPicture = {
            data: ByteVector.empty(),
            description: "foo",
            filename: "bar",
            mimeType: "image/gif",
            type: PictureType.ColoredFish,
        };
        return MatroskaAttachment.fromPicture(picture);
    }
}
