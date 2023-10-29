import { suite, test } from "@testdeck/mocha";
import { assert } from "chai";

import Mpeg4File from "../../src/mpeg4/mpeg4File";
import { default as TestFile } from "../utilities/testFile";
import { ByteVector, StringType } from "../../src/byteVector";
import { ReadStyle } from "../../src/file";
import { IPicture, PictureLazy } from "../../src/picture";

@suite
class Mpeg4Tests {
    private createFile(): Mpeg4File {
        const data = new Uint8Array([
            0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70, 0x6d, 0x70, 0x34,
            0x32, 0x00, 0x00, 0x00, 0x00, 0x6d, 0x70, 0x34, 0x32, 0x69, 0x73,
            0x6f, 0x6d, 0x00, 0x00, 0x00, 0x08, 0x6d, 0x6f, 0x6f, 0x76,
        ]);

        const fileBytes = ByteVector.fromByteArray(data);

        const testAbstraction = TestFile.getFileAbstraction(fileBytes);

        return new Mpeg4File(testAbstraction, ReadStyle.None);
    }

    private createPicture(pictureData: string): IPicture {
        const data = ByteVector.concatenate(0xff, 0xd8, 0xff, ByteVector.fromString(pictureData, StringType.Latin1));

        // Act
        return PictureLazy.fromData(data);
    }

    @test
    public testClear() {
        // Arrange
        const file: Mpeg4File = this.createFile();

        file.tag.title = "A";
        file.tag.performers = ["B"];
        file.tag.albumArtists = ["C"];
        file.tag.composers = ["D"];
        file.tag.album = "E";
        file.tag.comment = "F";
        file.tag.genres = ["Blues"];
        file.tag.year = 123;
        file.tag.track = 234;
        file.tag.trackCount = 234;
        file.tag.disc = 234;
        file.tag.discCount = 234;
        file.tag.lyrics = "G";
        file.tag.grouping = "H";
        file.tag.beatsPerMinute = 234;
        file.tag.conductor = "I";
        file.tag.copyright = "J";
        file.tag.pictures = [this.createPicture("foo")];

        const initialIsEmpty = file.tag.isEmpty;

        file.tag.clear();

        const clearedIsEmpty = file.tag.isEmpty;

        // Act

        // Assert
        assert.isFalse(initialIsEmpty);
        assert.isTrue(clearedIsEmpty);
        assert.isUndefined(file.tag.title);
        assert.equal(0, file.tag.performers.length);
        assert.equal(0, file.tag.albumArtists.length);
        assert.equal(0, file.tag.composers.length);
        assert.isUndefined(file.tag.album);
        assert.isUndefined(file.tag.comment);
        assert.equal(0, file.tag.genres.length);
        assert.equal(0, file.tag.year);
        assert.equal(0, file.tag.track);
        assert.equal(0, file.tag.trackCount);
        assert.equal(0, file.tag.disc);
        assert.equal(0, file.tag.discCount);
        assert.isUndefined(file.tag.lyrics);
        assert.isUndefined(file.tag.comment);
        assert.equal(0, file.tag.beatsPerMinute);
        assert.isUndefined(file.tag.conductor);
        assert.isUndefined(file.tag.copyright);
        assert.equal(0, file.tag.pictures.length);
    }
}
