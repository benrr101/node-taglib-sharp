import { suite, test } from "@testdeck/mocha";
import { assert } from "chai";
import { ByteVector, IPicture, Mpeg4File, PictureLazy, ReadStyle, StringType } from "../../src";
import { IFileAbstraction } from "../../src/fileAbstraction";
import { default as TestFile } from "../utilities/testFile";

@suite
class Mpeg4Tests {
    private readonly singleValue: string = "01234567890123456789012345678901234567890123456789";
    private readonly multipleValues: string[] = ["A123456789", "B123456789", "C123456789", "D123456789", "E123456789"];
    private readonly genres: string[] = ["Rap", "Jazz", "Non-Genre", "Blues"];

    private createFile(): Mpeg4File {
        const data = new Uint8Array([
            0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70, 0x6d, 0x70, 0x34, 0x32, 0x00, 0x00, 0x00, 0x00, 0x6d, 0x70, 0x34, 0x32, 0x69,
            0x73, 0x6f, 0x6d, 0x00, 0x00, 0x00, 0x08, 0x6d, 0x6f, 0x6f, 0x76,
        ]);

        const fileBytes = ByteVector.fromByteArray(data);

        const testAbstraction: IFileAbstraction = TestFile.getFileAbstraction(fileBytes);

        return new Mpeg4File(testAbstraction, ReadStyle.None);
    }

    private createPicture(pictureData: string): IPicture {
        const data = ByteVector.concatenate(0xff, 0xd8, 0xff, ByteVector.fromString(pictureData, StringType.Latin1));

        // Act
        const picture = PictureLazy.fromData(data);

        return picture;
    }

    @test
    public testTitle() {
        // Arrange
        const file: Mpeg4File = this.createFile();

        // Act
        const initialIsEmpty = file.tag.isEmpty;
        const initialValue = file.tag.title;

        file.tag.title = this.singleValue;

        const setIsEmpty = file.tag.isEmpty;
        const setValue = file.tag.title;

        file.tag.title = "";

        const clearedIsEmpty = file.tag.isEmpty;
        const clearedValue = file.tag.title;

        // Assert
        assert.isTrue(initialIsEmpty);
        assert.isUndefined(initialValue);

        assert.isFalse(setIsEmpty);
        assert.equal(setValue, this.singleValue);

        assert.isTrue(clearedIsEmpty);
        assert.isUndefined(clearedValue);
    }

    @test
    public testPerformers() {
        // Arrange
        const file: Mpeg4File = this.createFile();

        // Act
        const initialIsEmpty = file.tag.isEmpty;
        const initialValue = file.tag.performers;

        file.tag.performers = this.multipleValues;

        const setIsEmpty = file.tag.isEmpty;
        const setValue = file.tag.performers;

        file.tag.performers = [];

        const clearedIsEmpty = file.tag.isEmpty;
        const clearedValue = file.tag.performers;

        // Assert
        assert.isTrue(initialIsEmpty);
        assert.equal(initialValue.length, 0);

        assert.isFalse(setIsEmpty);
        assert.equal(setValue.length, this.multipleValues.length);
        assert.deepEqual(setValue, this.multipleValues);

        assert.isTrue(clearedIsEmpty);
        assert.equal(clearedValue.length, 0);
    }

    @test
    public testAlbumArtists() {
        // Arrange
        const file: Mpeg4File = this.createFile();

        // Act
        const initialIsEmpty = file.tag.isEmpty;
        const initialValue = file.tag.albumArtists;

        file.tag.albumArtists = this.multipleValues;

        const setIsEmpty = file.tag.isEmpty;
        const setValue = file.tag.albumArtists;

        file.tag.albumArtists = [];

        const clearedIsEmpty = file.tag.isEmpty;
        const clearedValue = file.tag.albumArtists;

        // Assert
        assert.isTrue(initialIsEmpty);
        assert.equal(initialValue.length, 0);

        assert.isFalse(setIsEmpty);
        assert.equal(setValue.length, this.multipleValues.length);
        assert.deepEqual(setValue, this.multipleValues);

        assert.isTrue(clearedIsEmpty);
        assert.equal(clearedValue.length, 0);
    }

    @test
    public testComposers() {
        // Arrange
        const file: Mpeg4File = this.createFile();

        // Act
        const initialIsEmpty = file.tag.isEmpty;
        const initialValue = file.tag.composers;

        file.tag.composers = this.multipleValues;

        const setIsEmpty = file.tag.isEmpty;
        const setValue = file.tag.composers;

        file.tag.composers = [];

        const clearedIsEmpty = file.tag.isEmpty;
        const clearedValue = file.tag.composers;

        // Assert
        assert.isTrue(initialIsEmpty);
        assert.equal(initialValue.length, 0);

        assert.isFalse(setIsEmpty);
        assert.equal(setValue.length, this.multipleValues.length);
        assert.deepEqual(setValue, this.multipleValues);

        assert.isTrue(clearedIsEmpty);
        assert.equal(clearedValue.length, 0);
    }

    @test
    public testAlbum() {
        // Arrange
        const file: Mpeg4File = this.createFile();

        // Act
        const initialIsEmpty = file.tag.isEmpty;
        const initialValue = file.tag.album;

        file.tag.album = this.singleValue;

        const setIsEmpty = file.tag.isEmpty;
        const setValue = file.tag.album;

        file.tag.album = "";

        const clearedIsEmpty = file.tag.isEmpty;
        const clearedValue = file.tag.album;

        // Assert
        assert.isTrue(initialIsEmpty);
        assert.isUndefined(initialValue);

        assert.isFalse(setIsEmpty);
        assert.equal(setValue, this.singleValue);

        assert.isTrue(clearedIsEmpty);
        assert.isUndefined(clearedValue);
    }

    @test
    public testComment() {
        // Arrange
        const file: Mpeg4File = this.createFile();

        // Act
        const initialIsEmpty = file.tag.isEmpty;
        const initialValue = file.tag.comment;

        file.tag.comment = this.singleValue;

        const setIsEmpty = file.tag.isEmpty;
        const setValue = file.tag.comment;

        file.tag.comment = "";

        const clearedIsEmpty = file.tag.isEmpty;
        const clearedValue = file.tag.comment;

        // Assert
        assert.isTrue(initialIsEmpty);
        assert.isUndefined(initialValue);

        assert.isFalse(setIsEmpty);
        assert.equal(setValue, this.singleValue);

        assert.isTrue(clearedIsEmpty);
        assert.isUndefined(clearedValue);
    }

    @test
    public testGenres() {
        // Arrange
        const file: Mpeg4File = this.createFile();

        // Act
        const initialIsEmpty = file.tag.isEmpty;
        const initialValue = file.tag.genres;

        file.tag.genres = this.genres;

        const setIsEmpty = file.tag.isEmpty;
        const setValue = file.tag.genres;

        file.tag.genres = [];

        const clearedIsEmpty = file.tag.isEmpty;
        const clearedValue = file.tag.genres;

        // Assert
        assert.isTrue(initialIsEmpty);
        assert.equal(initialValue.length, 0);

        assert.isFalse(setIsEmpty);
        assert.equal(setValue.length, this.genres.length);
        assert.deepEqual(setValue, this.genres);

        assert.isTrue(clearedIsEmpty);
        assert.equal(clearedValue.length, 0);
    }

    @test
    public testYear() {
        // Arrange
        const file: Mpeg4File = this.createFile();

        // Act
        const initialIsEmpty = file.tag.isEmpty;
        const initialValue = file.tag.year;

        file.tag.year = 1999;

        const setIsEmpty = file.tag.isEmpty;
        const setValue = file.tag.year;

        file.tag.year = 0;

        const clearedIsEmpty = file.tag.isEmpty;
        const clearedValue = file.tag.year;

        // Assert
        assert.isTrue(initialIsEmpty);
        assert.equal(initialValue, 0);

        assert.isFalse(setIsEmpty);
        assert.equal(setValue, 1999);

        assert.isTrue(clearedIsEmpty);
        assert.equal(clearedValue, 0);
    }

    @test
    public testTrack() {
        // Arrange
        const file: Mpeg4File = this.createFile();

        // Act
        const initialIsEmpty = file.tag.isEmpty;
        const initialValue = file.tag.track;

        file.tag.track = 199;

        const setIsEmpty = file.tag.isEmpty;
        const setValue = file.tag.track;

        file.tag.track = 0;

        const clearedIsEmpty = file.tag.isEmpty;
        const clearedValue = file.tag.track;

        // Assert
        assert.isTrue(initialIsEmpty);
        assert.equal(initialValue, 0);

        assert.isFalse(setIsEmpty);
        assert.equal(setValue, 199);

        assert.isTrue(clearedIsEmpty);
        assert.equal(clearedValue, 0);
    }

    @test
    public testTrackCount() {
        // Arrange
        const file: Mpeg4File = this.createFile();

        // Act
        const initialIsEmpty = file.tag.isEmpty;
        const initialValue = file.tag.trackCount;

        file.tag.trackCount = 199;

        const setIsEmpty = file.tag.isEmpty;
        const setValue = file.tag.trackCount;

        file.tag.trackCount = 0;

        const clearedIsEmpty = file.tag.isEmpty;
        const clearedValue = file.tag.trackCount;

        // Assert
        assert.isTrue(initialIsEmpty);
        assert.equal(initialValue, 0);

        assert.isFalse(setIsEmpty);
        assert.equal(setValue, 199);

        assert.isTrue(clearedIsEmpty);
        assert.equal(clearedValue, 0);
    }

    @test
    public testDisc() {
        // Arrange
        const file: Mpeg4File = this.createFile();

        // Act
        const initialIsEmpty = file.tag.isEmpty;
        const initialValue = file.tag.disc;

        file.tag.disc = 199;

        const setIsEmpty = file.tag.isEmpty;
        const setValue = file.tag.disc;

        file.tag.disc = 0;

        const clearedIsEmpty = file.tag.isEmpty;
        const clearedValue = file.tag.disc;

        // Assert
        assert.isTrue(initialIsEmpty);
        assert.equal(initialValue, 0);

        assert.isFalse(setIsEmpty);
        assert.equal(setValue, 199);

        assert.isTrue(clearedIsEmpty);
        assert.equal(clearedValue, 0);
    }

    @test
    public testDiscCount() {
        // Arrange
        const file: Mpeg4File = this.createFile();

        // Act
        const initialIsEmpty = file.tag.isEmpty;
        const initialValue = file.tag.discCount;

        file.tag.discCount = 199;

        const setIsEmpty = file.tag.isEmpty;
        const setValue = file.tag.discCount;

        file.tag.discCount = 0;

        const clearedIsEmpty = file.tag.isEmpty;
        const clearedValue = file.tag.discCount;

        // Assert
        assert.isTrue(initialIsEmpty);
        assert.equal(initialValue, 0);

        assert.isFalse(setIsEmpty);
        assert.equal(setValue, 199);

        assert.isTrue(clearedIsEmpty);
        assert.equal(clearedValue, 0);
    }

    @test
    public testLyrics() {
        // Arrange
        const file: Mpeg4File = this.createFile();

        // Act
        const initialIsEmpty = file.tag.isEmpty;
        const initialValue = file.tag.lyrics;

        file.tag.lyrics = this.singleValue;

        const setIsEmpty = file.tag.isEmpty;
        const setValue = file.tag.lyrics;

        file.tag.lyrics = "";

        const clearedIsEmpty = file.tag.isEmpty;
        const clearedValue = file.tag.lyrics;

        // Assert
        assert.isTrue(initialIsEmpty);
        assert.isUndefined(initialValue);

        assert.isFalse(setIsEmpty);
        assert.equal(setValue, this.singleValue);

        assert.isTrue(clearedIsEmpty);
        assert.isUndefined(clearedValue);
    }

    @test
    public testGrouping() {
        // Arrange
        const file: Mpeg4File = this.createFile();

        // Act
        const initialIsEmpty = file.tag.isEmpty;
        const initialValue = file.tag.grouping;

        file.tag.grouping = this.singleValue;

        const setIsEmpty = file.tag.isEmpty;
        const setValue = file.tag.grouping;

        file.tag.grouping = "";

        const clearedIsEmpty = file.tag.isEmpty;
        const clearedValue = file.tag.grouping;

        // Assert
        assert.isTrue(initialIsEmpty);
        assert.isUndefined(initialValue);

        assert.isFalse(setIsEmpty);
        assert.equal(setValue, this.singleValue);

        assert.isTrue(clearedIsEmpty);
        assert.isUndefined(clearedValue);
    }

    @test
    public testBeatsPerMinute() {
        // Arrange
        const file: Mpeg4File = this.createFile();

        // Act
        const initialIsEmpty = file.tag.isEmpty;
        const initialValue = file.tag.beatsPerMinute;

        file.tag.beatsPerMinute = 199;

        const setIsEmpty = file.tag.isEmpty;
        const setValue = file.tag.beatsPerMinute;

        file.tag.beatsPerMinute = 0;

        const clearedIsEmpty = file.tag.isEmpty;
        const clearedValue = file.tag.beatsPerMinute;

        // Assert
        assert.isTrue(initialIsEmpty);
        assert.equal(initialValue, 0);

        assert.isFalse(setIsEmpty);
        assert.equal(setValue, 199);

        assert.isTrue(clearedIsEmpty);
        assert.equal(clearedValue, 0);
    }

    @test
    public testConductor() {
        // Arrange
        const file: Mpeg4File = this.createFile();

        // Act
        const initialIsEmpty = file.tag.isEmpty;
        const initialValue = file.tag.conductor;

        file.tag.conductor = this.singleValue;

        const setIsEmpty = file.tag.isEmpty;
        const setValue = file.tag.conductor;

        file.tag.conductor = "";

        const clearedIsEmpty = file.tag.isEmpty;
        const clearedValue = file.tag.conductor;

        // Assert
        assert.isTrue(initialIsEmpty);
        assert.isUndefined(initialValue);

        assert.isFalse(setIsEmpty);
        assert.equal(setValue, this.singleValue);

        assert.isTrue(clearedIsEmpty);
        assert.isUndefined(clearedValue);
    }

    @test
    public testCopyright() {
        // Arrange
        const file: Mpeg4File = this.createFile();

        // Act
        const initialIsEmpty = file.tag.isEmpty;
        const initialValue = file.tag.copyright;

        file.tag.copyright = this.singleValue;

        const setIsEmpty = file.tag.isEmpty;
        const setValue = file.tag.copyright;

        file.tag.copyright = "";

        const clearedIsEmpty = file.tag.isEmpty;
        const clearedValue = file.tag.copyright;

        // Assert
        assert.isTrue(initialIsEmpty);
        assert.isUndefined(initialValue);

        assert.isFalse(setIsEmpty);
        assert.equal(setValue, this.singleValue);

        assert.isTrue(clearedIsEmpty);
        assert.isUndefined(clearedValue);
    }

    @test
    public testPictures() {
        // Arrange
        const file: Mpeg4File = this.createFile();

        const pictures: IPicture[] = [this.createPicture("foo"), this.createPicture("bar"), this.createPicture("doe")];

        // Act & Assert
        assert.isTrue(file.tag.isEmpty);
        assert.equal(file.tag.pictures.length, 0);

        file.tag.pictures = pictures;

        assert.isFalse(file.tag.isEmpty);
        assert.equal(file.tag.pictures.length, pictures.length);

        for (let i = 0; i < pictures.length; i++) {
            assert.deepEqual(file.tag.pictures[i].data, pictures[i].data);
            assert.equal(file.tag.pictures[i].type, pictures[i].type);
            assert.equal(file.tag.pictures[i].description, pictures[i].description);
            assert.equal(file.tag.pictures[i].mimeType, pictures[i].mimeType);
        }

        file.tag.pictures = [];

        assert.isTrue(file.tag.isEmpty);
        assert.equal(file.tag.pictures.length, 0);
    }

    @test
    public testMusicBrainzArtistId() {
        // Arrange
        const file: Mpeg4File = this.createFile();

        // Act
        const initialIsEmpty = file.tag.isEmpty;
        const initialValue = file.tag.musicBrainzArtistId;

        file.tag.musicBrainzArtistId = this.singleValue;

        const setIsEmpty = file.tag.isEmpty;
        const setValue = file.tag.musicBrainzArtistId;

        file.tag.musicBrainzArtistId = "";

        const clearedIsEmpty = file.tag.isEmpty;
        const clearedValue = file.tag.musicBrainzArtistId;

        // Assert
        assert.isTrue(initialIsEmpty);
        assert.isUndefined(initialValue);

        assert.isFalse(setIsEmpty);
        assert.equal(setValue, this.singleValue);

        assert.isTrue(clearedIsEmpty);
        assert.isUndefined(clearedValue);
    }

    @test
    public testMusicBrainzReleaseId() {
        // Arrange
        const file: Mpeg4File = this.createFile();

        // Act
        const initialIsEmpty = file.tag.isEmpty;
        const initialValue = file.tag.musicBrainzReleaseId;

        file.tag.musicBrainzReleaseId = this.singleValue;

        const setIsEmpty = file.tag.isEmpty;
        const setValue = file.tag.musicBrainzReleaseId;

        file.tag.musicBrainzReleaseId = "";

        const clearedIsEmpty = file.tag.isEmpty;
        const clearedValue = file.tag.musicBrainzReleaseId;

        // Assert
        assert.isTrue(initialIsEmpty);
        assert.isUndefined(initialValue);

        assert.isFalse(setIsEmpty);
        assert.equal(setValue, this.singleValue);

        assert.isTrue(clearedIsEmpty);
        assert.isUndefined(clearedValue);
    }

    @test
    public testMusicBrainzReleaseGroupId() {
        // Arrange
        const file: Mpeg4File = this.createFile();

        // Act
        const initialIsEmpty = file.tag.isEmpty;
        const initialValue = file.tag.musicBrainzReleaseGroupId;

        file.tag.musicBrainzReleaseGroupId = this.singleValue;

        const setIsEmpty = file.tag.isEmpty;
        const setValue = file.tag.musicBrainzReleaseGroupId;

        file.tag.musicBrainzReleaseGroupId = "";

        const clearedIsEmpty = file.tag.isEmpty;
        const clearedValue = file.tag.musicBrainzReleaseGroupId;

        // Assert
        assert.isTrue(initialIsEmpty);
        assert.isUndefined(initialValue);

        assert.isFalse(setIsEmpty);
        assert.equal(setValue, this.singleValue);

        assert.isTrue(clearedIsEmpty);
        assert.isUndefined(clearedValue);
    }

    @test
    public testMusicBrainzReleaseArtistId() {
        // Arrange
        const file: Mpeg4File = this.createFile();

        // Act
        const initialIsEmpty = file.tag.isEmpty;
        const initialValue = file.tag.musicBrainzReleaseArtistId;

        file.tag.musicBrainzReleaseArtistId = this.singleValue;

        const setIsEmpty = file.tag.isEmpty;
        const setValue = file.tag.musicBrainzReleaseArtistId;

        file.tag.musicBrainzReleaseArtistId = "";

        const clearedIsEmpty = file.tag.isEmpty;
        const clearedValue = file.tag.musicBrainzReleaseArtistId;

        // Assert
        assert.isTrue(initialIsEmpty);
        assert.isUndefined(initialValue);

        assert.isFalse(setIsEmpty);
        assert.equal(setValue, this.singleValue);

        assert.isTrue(clearedIsEmpty);
        assert.isUndefined(clearedValue);
    }

    @test
    public testMusicBrainzTrackId() {
        // Arrange
        const file: Mpeg4File = this.createFile();

        // Act
        const initialIsEmpty = file.tag.isEmpty;
        const initialValue = file.tag.musicBrainzTrackId;

        file.tag.musicBrainzTrackId = this.singleValue;

        const setIsEmpty = file.tag.isEmpty;
        const setValue = file.tag.musicBrainzTrackId;

        file.tag.musicBrainzTrackId = "";

        const clearedIsEmpty = file.tag.isEmpty;
        const clearedValue = file.tag.musicBrainzTrackId;

        // Assert
        assert.isTrue(initialIsEmpty);
        assert.isUndefined(initialValue);

        assert.isFalse(setIsEmpty);
        assert.equal(setValue, this.singleValue);

        assert.isTrue(clearedIsEmpty);
        assert.isUndefined(clearedValue);
    }

    @test
    public testMusicBrainzDiscId() {
        // Arrange
        const file: Mpeg4File = this.createFile();

        // Act
        const initialIsEmpty = file.tag.isEmpty;
        const initialValue = file.tag.musicBrainzDiscId;

        file.tag.musicBrainzDiscId = this.singleValue;

        const setIsEmpty = file.tag.isEmpty;
        const setValue = file.tag.musicBrainzDiscId;

        file.tag.musicBrainzDiscId = "";

        const clearedIsEmpty = file.tag.isEmpty;
        const clearedValue = file.tag.musicBrainzDiscId;

        // Assert
        assert.isTrue(initialIsEmpty);
        assert.isUndefined(initialValue);

        assert.isFalse(setIsEmpty);
        assert.equal(setValue, this.singleValue);

        assert.isTrue(clearedIsEmpty);
        assert.isUndefined(clearedValue);
    }

    @test
    public testMusicIpId() {
        // Arrange
        const file: Mpeg4File = this.createFile();

        // Act
        const initialIsEmpty = file.tag.isEmpty;
        const initialValue = file.tag.musicIpId;

        file.tag.musicIpId = this.singleValue;

        const setIsEmpty = file.tag.isEmpty;
        const setValue = file.tag.musicIpId;

        file.tag.musicIpId = "";

        const clearedIsEmpty = file.tag.isEmpty;
        const clearedValue = file.tag.musicIpId;

        // Assert
        assert.isTrue(initialIsEmpty);
        assert.isUndefined(initialValue);

        assert.isFalse(setIsEmpty);
        assert.equal(setValue, this.singleValue);

        assert.isTrue(clearedIsEmpty);
        assert.isUndefined(clearedValue);
    }

    @test
    public testAmazonId() {
        // Arrange
        const file: Mpeg4File = this.createFile();

        // Act
        const initialIsEmpty = file.tag.isEmpty;
        const initialValue = file.tag.amazonId;

        file.tag.amazonId = this.singleValue;

        const setIsEmpty = file.tag.isEmpty;
        const setValue = file.tag.amazonId;

        file.tag.amazonId = "";

        const clearedIsEmpty = file.tag.isEmpty;
        const clearedValue = file.tag.amazonId;

        // Assert
        assert.isTrue(initialIsEmpty);
        assert.isUndefined(initialValue);

        assert.isFalse(setIsEmpty);
        assert.equal(setValue, this.singleValue);

        assert.isTrue(clearedIsEmpty);
        assert.isUndefined(clearedValue);
    }

    @test
    public testMusicBrainzReleaseStatus() {
        // Arrange
        const file: Mpeg4File = this.createFile();

        // Act
        const initialIsEmpty = file.tag.isEmpty;
        const initialValue = file.tag.musicBrainzReleaseStatus;

        file.tag.musicBrainzReleaseStatus = this.singleValue;

        const setIsEmpty = file.tag.isEmpty;
        const setValue = file.tag.musicBrainzReleaseStatus;

        file.tag.musicBrainzReleaseStatus = "";

        const clearedIsEmpty = file.tag.isEmpty;
        const clearedValue = file.tag.musicBrainzReleaseStatus;

        // Assert
        assert.isTrue(initialIsEmpty);
        assert.isUndefined(initialValue);

        assert.isFalse(setIsEmpty);
        assert.equal(setValue, this.singleValue);

        assert.isTrue(clearedIsEmpty);
        assert.isUndefined(clearedValue);
    }

    @test
    public testMusicBrainzReleaseType() {
        // Arrange
        const file: Mpeg4File = this.createFile();

        // Act
        const initialIsEmpty = file.tag.isEmpty;
        const initialValue = file.tag.musicBrainzReleaseType;

        file.tag.musicBrainzReleaseType = this.singleValue;

        const setIsEmpty = file.tag.isEmpty;
        const setValue = file.tag.musicBrainzReleaseType;

        file.tag.musicBrainzReleaseType = "";

        const clearedIsEmpty = file.tag.isEmpty;
        const clearedValue = file.tag.musicBrainzReleaseType;

        // Assert
        assert.isTrue(initialIsEmpty);
        assert.isUndefined(initialValue);

        assert.isFalse(setIsEmpty);
        assert.equal(setValue, this.singleValue);

        assert.isTrue(clearedIsEmpty);
        assert.isUndefined(clearedValue);
    }

    @test
    public testMusicBrainzReleaseCountry() {
        // Arrange
        const file: Mpeg4File = this.createFile();

        // Act
        const initialIsEmpty = file.tag.isEmpty;
        const initialValue = file.tag.musicBrainzReleaseCountry;

        file.tag.musicBrainzReleaseCountry = this.singleValue;

        const setIsEmpty = file.tag.isEmpty;
        const setValue = file.tag.musicBrainzReleaseCountry;

        file.tag.musicBrainzReleaseCountry = "";

        const clearedIsEmpty = file.tag.isEmpty;
        const clearedValue = file.tag.musicBrainzReleaseCountry;

        // Assert
        assert.isTrue(initialIsEmpty);
        assert.isUndefined(initialValue);

        assert.isFalse(setIsEmpty);
        assert.equal(setValue, this.singleValue);

        assert.isTrue(clearedIsEmpty);
        assert.isUndefined(clearedValue);
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
