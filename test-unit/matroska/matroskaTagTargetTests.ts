import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import EbmlElement from "../../src/ebml/ebmlElement";
import MatroskaTestUtils from "./utils";
import TestFile from "../utilities/testFile";
import {MatroskaIds} from "../../src/matroska/matroskaIds";
import {MatroskaTagTarget, MatroskaTagTargetType} from "../../src/matroska/matroskaTagTarget";
import {Testers} from "../utilities/testers";

@suite
class Matroska_TagTargetTests {
    @test
    public fromEmpty() {
        // Act
        const target = MatroskaTagTarget.fromEmpty(MatroskaTagTargetType.EPISODE);

        // Assert
        assert.isOk(target);
        assert.isEmpty(target.attachmentUids);
        assert.isEmpty(target.chapterUids);
        assert.isEmpty(target.editionUids);
        assert.strictEqual(target.targetType, MatroskaTagTargetType.EPISODE);
        assert.isEmpty(target.trackUids);
    }

    @test
    public fromTargetElement_noElement() {
        // Act / Assert
        Testers.testTruthy<EbmlElement>((e) => MatroskaTagTarget.fromTargetsElement(e));
    }

    @test
    public fromTargetElement_invalidElement() {
        // Arrange
        const element = MatroskaTestUtils.getTestElement("foo", MatroskaIds.TAG);

        // Act / Assert
        assert.throws(() => MatroskaTagTarget.fromTargetsElement(element));
    }

    @test
    public fromTargetElement_valid() {
        // Arrange
        const bytes = [
            0x68, 0xCA,             // Identifier (TARGET_TYPE_VALUE)
            0x81,                   // Size (1)
            0x46,                   // Value (0x46)

            0x63, 0xCA,             // Identifier (TARGET_TYPE)
            0x83,                   // Size (3)
            0x41, 0x42, 0x43,       // Value (ABC)

            0x63, 0xC5,             // Identifier (TAG_TRACK_UID)
            0x88,                   // Size (8)
            0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,

            0x63, 0xC5,             // Identifier (TAG_TRACK_UID)
            0x88,                   // Size (8)
            0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09,

            0x63, 0xC9,             // Identifier (TAG_EDITION_UID)
            0x88,                   // Size (8)
            0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x00,

            0x63, 0xC9,             // Identifier (TAG_EDITION_UID)
            0x88,                   // Size (8)
            0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x00, 0x01,

            0x63, 0xC4,             // Identifier (TAG_CHAPTER_UID)
            0x88,                   // Size (8)
            0x05, 0x06, 0x07, 0x08, 0x09, 0x00, 0x01, 0x02,

            0x63, 0xC4,             // Identifier (TAG_CHAPTER_UID)
            0x88,                   // Size (8)
            0x06, 0x07, 0x08, 0x09, 0x00, 0x01, 0x02, 0x03,

            0x63, 0xC6,             // Identifier (TAG_ATTACHMENT_UID)
            0x88,                   // Size (8)
            0x07, 0x08, 0x09, 0x00, 0x01, 0x02, 0x03, 0x04,

            0x63, 0xC6,             // Identifier (TAG_ATTACHMENT_UID)
            0x88,                   // Size (8)
            0x08, 0x09, 0x00, 0x01, 0x02, 0x03, 0x04, 0x05
        ];
        const element = new EbmlElement(TestFile.getFile(bytes), 0, MatroskaIds.TARGETS, bytes.length, {});

        // Act
        const target = MatroskaTagTarget.fromTargetsElement(element);

        // Assert
        assert.isOk(target);
        assert.sameMembers(target.attachmentUids, [BigInt("0x0708090001020304"), BigInt("0x0809000102030405")]);
        assert.sameMembers(target.chapterUids, [BigInt("0x0506070809000102"), BigInt("0x0607080900010203")]);
        assert.sameMembers(target.editionUids, [BigInt("0x0304050607080900"), BigInt("0x0405060708090001")]);
        assert.strictEqual(target.targetType.string, "ABC");
        assert.strictEqual(target.targetType.value, 0x46);
        assert.sameMembers(target.trackUids, [BigInt("0x0102030405060708"), BigInt("0x0203040506070809")]);
    }

    @test
    public clone() {
        // Arrange
        const target = MatroskaTagTarget.fromEmpty(MatroskaTagTargetType.COLLECTION);
        target.attachmentUids.push(BigInt("0x0708090001020304"));
        target.chapterUids.push(BigInt("0x0506070809000102"));
        target.editionUids.push(BigInt("0x0304050607080900"));
        target.trackUids.push(BigInt("0x0102030405060708"));

        // Act
        const clone = target.clone();

        // Assert
        assert.isOk(clone);
        assert.sameMembers(target.attachmentUids, [BigInt("0x0708090001020304")]);
        assert.sameMembers(target.chapterUids, [BigInt("0x0506070809000102")]);
        assert.sameMembers(target.editionUids, [BigInt("0x0304050607080900")]);
        assert.strictEqual(target.targetType, MatroskaTagTargetType.COLLECTION);
        assert.sameMembers(target.trackUids, [BigInt("0x0102030405060708")]);
    }
}
