import * as Chai from "chai";
import * as TypeMoq from "typemoq";
import {suite, test} from "@testdeck/mocha";

import TestStream from "./utilities/testStream";
import {IFileAbstraction} from "../src/fileAbstraction";
import {ByteVector, StringType} from "../src/byteVector";
import {PictureLazy, PictureType} from "../src/picture";
import {Allow, Testers} from "./utilities/testers";

// Setup chai
const assert = Chai.assert;

@suite class PictureLazy_Tests {
    @test
    public fromData_falsyData() {
        // Act / Assert
        Testers.testTruthy((v: ByteVector) => { PictureLazy.fromData(v); });
    }

    @test
    public fromData_canGetExtension() {
        // Arrange
        const data = ByteVector.concatenate(
            0xFF, 0xD8, 0xFF,
            ByteVector.fromString("foobarbaz", StringType.Latin1)
        );

        // Act
        const picture = PictureLazy.fromData(data);

        // Assert
        assert.isOk(picture);
        Testers.bvEqual(picture.data, data);
        assert.strictEqual(picture.description, "cover.jpg");
        assert.strictEqual(picture.filename, "cover.jpg");
        assert.strictEqual(picture.mimeType, "image/jpeg");
        assert.isTrue(picture.isLoaded);
        assert.strictEqual(picture.type, PictureType.FrontCover);
    }

    @test
    public fromData_cannotGetExtension() {
        // Arrange
        const data = ByteVector.fromString("foobarbaz", StringType.Latin1);

        // Act
        const picture = PictureLazy.fromData(data);

        // Assert
        assert.isOk(picture);
        Testers.bvEqual(picture.data, data);
        assert.isUndefined(picture.description);
        assert.strictEqual(picture.filename, "UnknownType");
        assert.strictEqual(picture.mimeType, "application/octet-stream");
        assert.isTrue(picture.isLoaded);
        assert.strictEqual(picture.type, PictureType.NotAPicture);
    }

    @test
    public fromFile_invalidParameters() {
        // Arrange
        const mockFile = TypeMoq.Mock.ofType<IFileAbstraction>();

        // Act / Assert
        Testers.testTruthy((v: IFileAbstraction) => { PictureLazy.fromFile(v, 0 , 0); });
        Testers.testInt((v: number) => { PictureLazy.fromFile(mockFile.object, v, 0); });
        Testers.testInt((v: number) => { PictureLazy.fromFile(mockFile.object, v, 0); }, Allow.Undefined);
    }

    @test
    public fromFile_hasImageFilenameNoOffsetReadAll() {
        // Arrange
        const data = ByteVector.fromString("foobarbaz", StringType.Latin1);
        const mockStream = new TestStream(data, false);

        const mockFile = TypeMoq.Mock.ofType<IFileAbstraction>();
        mockFile.setup((f) => f.name).returns(() => "foobarbaz.jpg");
        mockFile.setup((f) => f.readStream).returns(() => mockStream);
        mockFile.setup((f) => f.closeStream(mockStream));

        // Act
        const picture = PictureLazy.fromFile(mockFile.object, 0);

        // Assert
        PictureLazy_Tests.assertFileLazyPicture(
            picture,
            data,
            "foobarbaz.jpg",
            "foobarbaz.jpg",
            "image/jpeg",
            PictureType.FrontCover
        );
    }

    @test
    public fromFile_hasNonImageFilenameNoOffsetReadAll() {
        // Arrange
        const data = ByteVector.fromString("foobarbaz", StringType.Latin1);
        const mockStream = new TestStream(data, false);

        const mockFile = TypeMoq.Mock.ofType<IFileAbstraction>();
        mockFile.setup((f) => f.name).returns(() => "foobarbaz.bin");
        mockFile.setup((f) => f.readStream).returns(() => mockStream);
        mockFile.setup((f) => f.closeStream(mockStream));

        // Act
        const picture = PictureLazy.fromFile(mockFile.object, 0);

        // Assert
        PictureLazy_Tests.assertFileLazyPicture(
            picture,
            data,
            "foobarbaz.bin",
            "foobarbaz.bin",
            "application/octet-stream",
            PictureType.NotAPicture
        );
    }

    @test
    public fromFile_noExtensionNoOffsetReadAll() {
        // Arrange
        const data = ByteVector.concatenate(
            0xFF, 0xD8, 0xFF,
            ByteVector.fromString("foobarbaz", StringType.Latin1)
        );
        const mockStream = new TestStream(data, false);

        const mockFile = TypeMoq.Mock.ofType<IFileAbstraction>();
        mockFile.setup((f) => f.name).returns(() => "fuxbuxqux");
        mockFile.setup((f) => f.readStream).returns(() => mockStream);
        mockFile.setup((f) => f.closeStream(mockStream));

        // Act
        const picture = PictureLazy.fromFile(mockFile.object, 0);

        // Assert
        PictureLazy_Tests.assertFileLazyPicture(
            picture,
            data,
            "fuxbuxqux",
            "fuxbuxqux",
            "image/jpeg",
            PictureType.FrontCover
        );
    }

    @test
    public fromFile_noExtensionNotImageNoOffsetReadAll() {
        // Arrange
        const data = ByteVector.fromString("foobarbaz", StringType.Latin1);
        const mockStream = new TestStream(data, false);

        const mockFile = TypeMoq.Mock.ofType<IFileAbstraction>();
        mockFile.setup((f) => f.name).returns(() => "fuxbuxqux");
        mockFile.setup((f) => f.readStream).returns(() => mockStream);
        mockFile.setup((f) => f.closeStream(mockStream));

        // Act
        const picture = PictureLazy.fromFile(mockFile.object, 0);

        // Assert
        PictureLazy_Tests.assertFileLazyPicture(
            picture,
            data,
            "fuxbuxqux",
            "fuxbuxqux",
            "application/octet-stream",
            PictureType.NotAPicture
        );
    }

    @test
    public fromFile_noFilenameNotImageFileNoOffsetReadAll() {
        // Arrange
        const data = ByteVector.fromString("foobarbaz", StringType.Latin1);
        const mockStream = new TestStream(data, false);

        const mockFile = TypeMoq.Mock.ofType<IFileAbstraction>();
        mockFile.setup((f) => f.name).returns(() => undefined);
        mockFile.setup((f) => f.readStream).returns(() => mockStream);
        mockFile.setup((f) => f.closeStream(mockStream));

        // Act
        const picture = PictureLazy.fromFile(mockFile.object, 0);

        // Assert
        PictureLazy_Tests.assertFileLazyPicture(
            picture,
            data,
            undefined,
            "UnknownType",
            "application/octet-stream",
            PictureType.NotAPicture
        );
    }

    @test
    public fromFile_hasOffsetReadAll() {
        const data = ByteVector.fromString("foobarbaz", StringType.Latin1);
        const allData = ByteVector.concatenate(
            0x00, 0x00,
            data
        );
        const mockStream = new TestStream(allData, false);

        const mockFile = TypeMoq.Mock.ofType<IFileAbstraction>();
        mockFile.setup((f) => f.name).returns(() => "foobarbaz.jpg");
        mockFile.setup((f) => f.readStream).returns(() => mockStream);
        mockFile.setup((f) => f.closeStream(mockStream));

        // Act
        const picture = PictureLazy.fromFile(mockFile.object, 2);

        // Assert
        PictureLazy_Tests.assertFileLazyPicture(
            picture,
            data,
            "foobarbaz.jpg",
            "foobarbaz.jpg",
            "image/jpeg",
            PictureType.FrontCover
        );
    }

    @test
    public fromFile_hasOffsetReadPartial() {
        const data = ByteVector.fromString("foobarbaz", StringType.Latin1);
        const allData = ByteVector.concatenate(
            0x00, 0x00,
            data,
            0x00, 0x00
        );
        const mockStream = new TestStream(allData, false);

        const mockFile = TypeMoq.Mock.ofType<IFileAbstraction>();
        mockFile.setup((f) => f.name).returns(() => "foobarbaz.jpg");
        mockFile.setup((f) => f.readStream).returns(() => mockStream);
        mockFile.setup((f) => f.closeStream(mockStream));

        // Act
        const picture = PictureLazy.fromFile(mockFile.object, 2, 9);

        // Assert
        PictureLazy_Tests.assertFileLazyPicture(
            picture,
            data,
            "foobarbaz.jpg",
            "foobarbaz.jpg",
            "image/jpeg",
            PictureType.FrontCover
        );
    }

    private static assertFileLazyPicture(
        picture: PictureLazy,
        d: ByteVector,
        desc: string,
        f: string,
        mt: string,
        t: PictureType
    ) {
        assert.isOk(picture);
        assert.isFalse(picture.isLoaded);

        Testers.bvEqual(picture.data, d);
        assert.strictEqual(picture.description, desc);
        assert.strictEqual(picture.filename, f);
        assert.strictEqual(picture.mimeType, mt);
        assert.strictEqual(picture.type, t);

        assert.isTrue(picture.isLoaded);
    }
}
