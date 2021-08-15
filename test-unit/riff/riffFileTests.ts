import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import CombinedTag from "../../src/combinedTag";
import RiffFile from "../../src/riff/riffFile";
import {default as TestFile} from "../utilities/testFile";
import {default as Resources} from "./resources";
import {ByteVector} from "../../src/byteVector";
import {ReadStyle} from "../../src/file";
import {IFileAbstraction} from "../../src/fileAbstraction";
import {TagTypes} from "../../src/tag";
import {Testers} from "../utilities/testers";

@suite class Riff_RiffFileTests {
    @test
    public constructor_invalidParams() {
        // Act / Assert
        Testers.testTruthy<string | IFileAbstraction>((v) => new RiffFile(v, ReadStyle.None));
    }

    @test
    public constructor_aviFile_noTagsNoCodecs() {
        // Arrange
        const dataBytes = ByteVector.concatenate(
            ByteVector.fromString("AVI "),
            Resources.getAviHeaderBlock([]),
            ByteVector.fromString("movi"),
            ByteVector.fromUInt(10, false),
            ByteVector.fromSize(10)
        );
        const fileBytes = ByteVector.concatenate(
            RiffFile.fileIdentifier,
            ByteVector.fromUInt(dataBytes.length, false),
            dataBytes
        );
        const testAbstraction = TestFile.getFileAbstraction(fileBytes);

        // Act
        const file = new RiffFile(testAbstraction, ReadStyle.Average);

        // Assert
        assert.isOk(file.properties);

        assert.isOk(file.tag);
        assert.instanceOf(file.tag, CombinedTag);
        assert.strictEqual(file.tag.tagTypes, TagTypes.Id3v2 | TagTypes.RiffInfo | TagTypes.MovieId | TagTypes.DivX);
        assert.strictEqual((<CombinedTag> file.tag).tags.length, 4);
        assert.isTrue(file.tag.isEmpty);
    }
}
