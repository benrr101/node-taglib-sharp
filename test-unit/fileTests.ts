import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import * as TypeMoq from "typemoq";
import PropertyTests from "./utilities/propertyTests";
import TestConstants from "./testConstants";
import {Testers} from "./utilities/testers";
import TestStream from "./utilities/testStream";
import {suite, test} from "mocha-typescript";

import Properties from "../src/properties";
import {File, FileAccessMode, FileTypeConstructor, FileTypeResolver, ReadStyle} from "../src/file";
import {IFileAbstraction} from "../src/fileAbstraction";
import {Tag, TagTypes} from "../src/tag";
import {IStream} from "../src/stream";
import {ByteVector} from "../src/byteVector";

// Setup Chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

@suite class FileTests {
    private static readonly chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private readonly pattern1 = ByteVector.fromString("efg");
    private readonly pattern3 = ByteVector.fromString("bbbbba");

    private readonly length1 = Math.floor(0.75 * File.bufferSize); // Smaller than buffer size
    private readonly length2 = Math.floor(1.5 * File.bufferSize);  // Bigger than buffer size
    private readonly length3 = Math.floor(3.1 * File.bufferSize);  // Even more bigger to catch special cases

    @test
    public createFromAbstraction_invalidAbstraction() {
        // Act / Assert
        Testers.testTruthy((v: IFileAbstraction) => { File.createFromAbstraction(v); });
    }

    @test
    public createFromAbstraction_noMimetypeProvided() {
        // Arrange
        const mockAbstraction = TypeMoq.Mock.ofType<IFileAbstraction>();
        mockAbstraction.setup((a) => a.name).returns(() => "foobarbaz.qux");
        const mockFile = new TestFile(mockAbstraction.object);

        const testResolver = TypeMoq.Mock.ofType<FileTypeResolver>();
        testResolver.setup((r) => r(
            TypeMoq.It.isAny(),
            TypeMoq.It.isAnyString(),
            TypeMoq.It.isAny()
        )).returns(() => mockFile);
        File.addFileTypeResolver(testResolver.object);

        try {
            // Act
            const file = File.createFromAbstraction(mockAbstraction.object);

            // Assert
            assert.isOk(file);
            assert.strictEqual(file, mockFile);
            assert.strictEqual(file.fileAbstraction, mockAbstraction.object);

            assert.isNotNull(file.corruptionReasons);
            assert.isEmpty(file.corruptionReasons);
            assert.strictEqual(file.invariantEndPosition, -1);
            assert.strictEqual(file.invariantStartPosition, -1);
            assert.isFalse(file.isPossiblyCorrupt);
            assert.isTrue(file.isWritable);
            assert.strictEqual(file.length, 0);
            assert.isUndefined(file.mimeType);
            assert.strictEqual(file.mode, FileAccessMode.Closed);
            assert.strictEqual(file.name, "foobarbaz.qux");
            assert.strictEqual(file.position, 0);
            assert.strictEqual(file.tagTypes, TagTypes.None);
            assert.strictEqual(file.tagTypesOnDisk, TagTypes.None);

            testResolver.verify((r) => r(
                TypeMoq.It.isAny(),
                TypeMoq.It.isValue("taglib/qux"),
                TypeMoq.It.isValue(ReadStyle.Average)
            ), TypeMoq.Times.once());
        } finally {
            // Cleanup
            File.removeFileTypeResolver(testResolver.object);
        }
    }

    @test
    public createFromAbstraction_mimetypeProvided() {
        // Arrange
        const mockAbstraction = TypeMoq.Mock.ofType<IFileAbstraction>();
        mockAbstraction.setup((a) => a.name).returns(() => "foobarbaz.qux");

        File.addFileType("taglib/qux", TestFile);

        try {
            // Act
            const file = File.createFromAbstraction(mockAbstraction.object);

            // Assert
            assert.isOk(file);
            assert.strictEqual(file.fileAbstraction, mockAbstraction.object);

            assert.isNotNull(file.corruptionReasons);
            assert.isEmpty(file.corruptionReasons);
            assert.strictEqual(file.invariantEndPosition, -1);
            assert.strictEqual(file.invariantStartPosition, -1);
            assert.isFalse(file.isPossiblyCorrupt);
            assert.isTrue(file.isWritable);
            assert.strictEqual(file.length, 0);
            assert.isUndefined(file.mimeType);
            assert.strictEqual(file.mode, FileAccessMode.Closed);
            assert.strictEqual(file.name, "foobarbaz.qux");
            assert.strictEqual(file.position, 0);
            assert.strictEqual(file.tagTypes, TagTypes.None);
            assert.strictEqual(file.tagTypesOnDisk, TagTypes.None);
        } finally {
            // Cleanup
            File.removeFileType("taglib/qux");
        }
    }

    @test
    public createFromPath_invalidParams() {
        // Act / Assert
        Testers.testString((v: string) => { File.createFromPath(v); });
    }

    @test
    public createFromPath_mimetypeNotProvided() {
        // Arrange
        const testResolver = TypeMoq.Mock.ofType<FileTypeResolver>();
        testResolver.setup((r) => r(
            TypeMoq.It.isAny(),
            TypeMoq.It.isAnyString(),
            TypeMoq.It.isAny()
        )).returns((a) => new TestFile(a));
        File.addFileTypeResolver(testResolver.object);

        try {
            // Act
            const file = File.createFromPath(TestConstants.testFilePath);

            // Assert
            assert.isOk(file);
            assert.isOk(file.fileAbstraction);

            assert.isNotNull(file.corruptionReasons);
            assert.isEmpty(file.corruptionReasons);
            assert.strictEqual(file.invariantEndPosition, -1);
            assert.strictEqual(file.invariantStartPosition, -1);
            assert.isFalse(file.isPossiblyCorrupt);
            assert.isTrue(file.isWritable);
            assert.strictEqual(file.length, 0);
            assert.isUndefined(file.mimeType);
            assert.strictEqual(file.mode, FileAccessMode.Closed);
            assert.strictEqual(file.name, TestConstants.testFilePath);
            assert.strictEqual(file.position, 0);
            assert.strictEqual(file.tagTypes, TagTypes.None);
            assert.strictEqual(file.tagTypesOnDisk, TagTypes.None);

            testResolver.verify((r) => r(
                TypeMoq.It.isAny(),
                TypeMoq.It.isValue("taglib/txt"),
                TypeMoq.It.isValue(ReadStyle.Average)
            ), TypeMoq.Times.once());
        } finally {
            // Cleanup
            File.removeFileTypeResolver(testResolver.object);
        }
    }

    @test
    public createFromPath_mimetypeProvided() {
        // Arrange
        File.addFileType("foo/bar", TestFile);

        try {
            // Act
            const file = File.createFromPath(TestConstants.testFilePath, "foo/bar");

            // Assert
            assert.isOk(file);
            assert.isOk(file.fileAbstraction);

            assert.isNotNull(file.corruptionReasons);
            assert.isEmpty(file.corruptionReasons);
            assert.strictEqual(file.invariantEndPosition, -1);
            assert.strictEqual(file.invariantStartPosition, -1);
            assert.isFalse(file.isPossiblyCorrupt);
            assert.isTrue(file.isWritable);
            assert.strictEqual(file.length, 0);
            assert.isUndefined(file.mimeType);
            assert.strictEqual(file.mode, FileAccessMode.Closed);
            assert.strictEqual(file.name, TestConstants.testFilePath);
            assert.strictEqual(file.position, 0);
            assert.strictEqual(file.tagTypes, TagTypes.None);
            assert.strictEqual(file.tagTypesOnDisk, TagTypes.None);
        } finally {
            // Cleanup
            File.removeFileType("foo/bar");
        }
    }

    @test
    public createInternal_unsupported() {
        // Arrange
        const testResolver = TypeMoq.Mock.ofType<FileTypeResolver>();
        testResolver.setup((r) => r(
            TypeMoq.It.isAny(),
            TypeMoq.It.isAnyString(),
            TypeMoq.It.isAny()
        )).returns(() => undefined);
        File.addFileTypeResolver(testResolver.object);

        File.addFileType("foobar/baz", TestFile);

        try {
            // Act / Assert
            assert.throws(() => File.createFromPath(TestConstants.testFilePath, "foo/bar"));
        } finally {
            // Cleanup
            File.removeFileTypeResolver(testResolver.object);
            File.removeFileType("foobar/baz");
        }
    }

    @test
    public setMode_closedToClosed() {
        const testAction = (f: File) => {
            // Prereq
            assert.strictEqual(f.mode, FileAccessMode.Closed);

            // Act / Assert
            PropertyTests.propertyRoundTrip((v) => f.mode = v, () => f.mode, FileAccessMode.Closed);
        };
        this.testWithMockAbstraction(testAction);
    }

    @test
    public setMode_closedToRead() {
        const testAction = (f: TestFile) => {
            // Act / Assert
            PropertyTests.propertyRoundTrip((v) => f.mode = v, () => f.mode, FileAccessMode.Read);

            assert.isOk(f.stream);
            assert.isFalse(f.stream.canWrite);
        };
        this.testWithMockAbstraction(testAction);
    }

    @test
    public setMode_closedToWrite() {
        const testAction = (f: TestFile) => {
            // Act / Assert
            PropertyTests.propertyRoundTrip((v) => f.mode = v, () => f.mode, FileAccessMode.Write);

            assert.isOk(f.stream);
            assert.isTrue(f.stream.canWrite);
        };
        this.testWithMockAbstraction(testAction);
    }

    @test
    public setMode_readToRead() {
        const testAction = (f: TestFile, a: TypeMoq.IMock<IFileAbstraction>) => {
            // Arrange
            f.mode = FileAccessMode.Read;
            const readStream = f.stream;

            // Act / Assert
            PropertyTests.propertyRoundTrip((v) => f.mode = v, () => f.mode, FileAccessMode.Read);
            assert.strictEqual(f.stream, readStream);

            a.verify((ma) => ma.closeStream(TypeMoq.It.isAny()), TypeMoq.Times.never());
        };
        this.testWithMockAbstraction(testAction);
    }

    @test
    public setMode_readToWrite() {
        const testAction = (f: TestFile, a: TypeMoq.IMock<IFileAbstraction>) => {
            // Arrange
            f.mode = FileAccessMode.Read;
            const readStream = f.stream;

            // Act
            f.mode = FileAccessMode.Write;

            // Assert
            assert.strictEqual(f.mode, FileAccessMode.Write);
            assert.isOk(f.stream);
            assert.isTrue(f.stream.canWrite);
            assert.notStrictEqual(f.stream, readStream);

            a.verify((ma) => ma.closeStream(TypeMoq.It.isAny()), TypeMoq.Times.once());
        };
        this.testWithMockAbstraction(testAction);
    }

    @test
    public setMode_readToClosed() {
        const testAction = (f: TestFile, a: TypeMoq.IMock<IFileAbstraction>) => {
            // Arrange
            f.mode = FileAccessMode.Read;

            // Act
            f.mode = FileAccessMode.Closed;

            // Assert
            assert.strictEqual(f.mode, FileAccessMode.Closed);
            assert.isUndefined(f.stream);

            a.verify((ma) => ma.closeStream(TypeMoq.It.isAny()), TypeMoq.Times.once());
        };
        this.testWithMockAbstraction(testAction);
    }

    @test
    public setMode_writeToWrite() {
        const testAction = (f: TestFile, a: TypeMoq.IMock<IFileAbstraction>) => {
            // Arrange
            f.mode = FileAccessMode.Write;
            const writeStream = f.stream;

            // Act
            f.mode = FileAccessMode.Write;

            // Assert
            assert.strictEqual(f.mode, FileAccessMode.Write);
            assert.isOk(f.stream);
            assert.strictEqual(f.stream, writeStream);

            a.verify((ma) => ma.closeStream(TypeMoq.It.isAny()), TypeMoq.Times.never());
        };
        this.testWithMockAbstraction(testAction);
    }

    @test
    public setMode_writeToRead() {
        const testAction = (f: TestFile, a: TypeMoq.IMock<IFileAbstraction>) => {
            // Arrange
            f.mode = FileAccessMode.Write;
            const writeStream = f.stream;

            // Act
            f.mode = FileAccessMode.Read;

            // Assert
            assert.strictEqual(f.mode, FileAccessMode.Write);
            assert.isOk(f.stream);
            assert.strictEqual(f.stream, writeStream);

            a.verify((ma) => ma.closeStream(TypeMoq.It.isAny()), TypeMoq.Times.never());
        };
        this.testWithMockAbstraction(testAction);
    }

    @test
    public setMode_writeToClosed() {
        const testAction = (f: TestFile, a: TypeMoq.IMock<IFileAbstraction>) => {
            // Arrange
            f.mode = FileAccessMode.Write;

            // Act
            f.mode = FileAccessMode.Closed;

            // Assert
            assert.strictEqual(f.mode, FileAccessMode.Closed);
            assert.isUndefined(f.stream);

            a.verify((ma) => ma.closeStream(TypeMoq.It.isAny()), TypeMoq.Times.once());
        };
        this.testWithMockAbstraction(testAction);
    }

    @test
    public addFileType_invalidParameters() {
        // Act / Assert
        Testers.testString((v: string) => { File.addFileType(v, TestFile, false); });
        Testers.testTruthy((v: FileTypeConstructor) => { File.addFileType("foo/bar", v, false); });
    }

    @test
    public addFileType_overrideTurnedOff() {
        // Arrange
        File.addFileType("foo/bar", TestFile);

        try {
            // Act / Assert
            assert.throws(() => File.addFileType("foo/bar", TestFile, false));
        } finally {
            File.removeFileType("foo/bar");
        }
    }

    @test
    public addFileTypeResolver_invalidParameters() {
        // Act / Assert
        Testers.testTruthy((v: FileTypeResolver) => { File.addFileTypeResolver(v); });
    }

    @test
    public dispose() {
        const testAction = (f: TestFile) => {
            // Arrange
            f.mode = FileAccessMode.Read;

            // Act
            f.dispose();

            // Assert
            assert.strictEqual(f.mode, FileAccessMode.Closed);
        };
        this.testWithMockAbstraction(testAction);
    }

    @test
    public find_file1() {
        const testAction = (f: TestFile) => {
            // f.insert(ByteVector.fromString("123"), 4, 2);

            // Act / Assert
            assert.strictEqual(f.find(ByteVector.fromString("U")), FileTests.chars.indexOf("U"));

            assert.strictEqual(f.find(this.pattern1), -1);
            assert.strictEqual(f.find(this.pattern1, 9), -1);

            f.insert(this.pattern1, this.length1 - 10, this.pattern1.length); // Insert closer to end
            assert.strictEqual(f.find(this.pattern1), this.length1 - 10);

            f.insert(this.pattern1, this.length1 / 2, this.pattern1.length); // Insert somewhere in the middle
            assert.strictEqual(f.find(this.pattern1), this.length1 / 2);

            f.insert(this.pattern1, 10, this.pattern1.length); // Insert closer to beginning
            assert.strictEqual(f.find(this.pattern1), 10);
        };
        this.testWithMemoryStream(testAction, this.length1);
    }

    @test
    public find_file2() {
        const testAction = (f: TestFile) => {
            // Act / Assert
            assert.strictEqual(f.find(ByteVector.fromString("M")), FileTests.chars.indexOf("M"));

            assert.strictEqual(f.find(this.pattern1), -1);
            assert.strictEqual(f.find(this.pattern1, 3), -1);

            f.insert(this.pattern1, this.length2 - 30, this.pattern1.length);
            assert.strictEqual(f.find(this.pattern1), this.length2 - 30);

            f.insert(this.pattern1, this.length2 / 2, this.pattern1.length);
            assert.strictEqual(f.find(this.pattern1), this.length2 / 2);

            f.insert(this.pattern1, 30, this.pattern1.length);
            assert.strictEqual(f.find(this.pattern1), 30);

            assert.strictEqual(f.find(this.pattern1, 2), 30);
            assert.strictEqual(f.find(this.pattern1, 31), this.length2 / 2);
            assert.strictEqual(f.find(this.pattern1, this.length2 / 2 + 3), this.length2 - 30);
        };
        this.testWithMemoryStream(testAction, this.length2);
    }

    @test
    public find_file3() {
        const testAction = (f: TestFile) => {
            // Act / Assert
            assert.strictEqual(f.find(this.pattern1), -1);
            assert.strictEqual(f.find(this.pattern1, 13), -1);

            const bufferCross2 = 2 * File.bufferSize - Math.floor(this.pattern1.length / 2);
            f.insert(this.pattern1, bufferCross2, this.pattern1.length);
            assert.strictEqual(f.find(this.pattern1), bufferCross2);

            const bufferCross1 = File.bufferSize - Math.floor(this.pattern1.length / 2);
            f.insert(this.pattern1, bufferCross1, this.pattern1.length);
            assert.strictEqual(f.find(this.pattern1), bufferCross1);

            assert.strictEqual(f.find(this.pattern1, bufferCross1 + 1), bufferCross2);

            const bufferCross3 = File.bufferSize - 1;
            f.insert(this.pattern3, bufferCross3 - 1, this.pattern3.length);
            f.insert(this.pattern3, bufferCross3, this.pattern3.length);
            assert.strictEqual(f.find(this.pattern3), bufferCross3);
        };
        this.testWithMemoryStream(testAction, this.length3);
    }

    @test
    public find_tooBig() {
        const testAction = (f: TestFile) => {
            // Arrange
            const bytes = ByteVector.fromSize(File.bufferSize + 1);

            // Act / Assert
            assert.strictEqual(f.find(bytes), -1);
        };
        this.testWithMemoryStream(testAction, this.length1);
    }

    @test
    public insert_insertLessThanReplace() {
        const testAction = (f: TestFile) => {
            // Act
            f.insert(this.pattern1, 2, this.pattern1.length + 1);

            // Assert
            assert.strictEqual(f.find(this.pattern1), 2);
            assert.strictEqual(f.length, this.length1 - 1);
        };
        this.testWithMemoryStream(testAction, this.length1);
    }

    @test
    public markAsCorrupt_fileBecomesCorrupt() {
        const testAction = (f: TestFile) => {
            // Act
            f.markAsCorrupt("foobarbaz");

            // Assert
            assert.isTrue(f.isPossiblyCorrupt);
            assert.isNotNull(f.corruptionReasons);
            assert.strictEqual(f.corruptionReasons.length, 1);
            assert.sameDeepMembers(f.corruptionReasons, ["foobarbaz"]);
        };
        this.testWithMemoryStream(testAction, 10);
    }

    @test
    public readBlock_lengthIsZero() {
        const testAction = (f: TestFile) => {
            // Act
            const result = f.readBlock(0);

            // Assert
            assert.strictEqual(result.length, 0);
        };
        this.testWithMemoryStream(testAction, this.length1);
    }

    @test
    public rFind_file1() {
        const testAction = (f: TestFile, d: ByteVector) => {
            // Act / Assert
            assert.strictEqual(f.rFind(ByteVector.fromString("U")), d.data.lastIndexOf("U".charCodeAt(0)));

            assert.strictEqual(f.rFind(this.pattern1), -1);
            assert.strictEqual(f.rFind(this.pattern1, 9), -1);

            f.insert(this.pattern1, 10, this.pattern1.length); // Insert closer to beginning
            assert.strictEqual(f.rFind(this.pattern1), 10);

            f.insert(this.pattern1, this.length1 / 2, this.pattern1.length); // Insert somewhere in the middle
            assert.strictEqual(f.rFind(this.pattern1), this.length1 / 2);

            f.insert(this.pattern1, this.length1 - 10, this.pattern1.length); // Insert closer to end
            assert.strictEqual(f.rFind(this.pattern1), this.length1 - 10);
        };
        this.testWithMemoryStream(testAction, this.length1);
    }

    @test
    public rFind_file2() {
        const testAction = (f: TestFile, d: ByteVector) => {
            // Act / Assert
            assert.strictEqual(f.rFind(ByteVector.fromString("M")), d.data.lastIndexOf("M".charCodeAt(0)));

            assert.strictEqual(f.rFind(this.pattern1), -1);
            assert.strictEqual(f.rFind(this.pattern1, 3), -1);

            f.insert(this.pattern1, 30);
            assert.strictEqual(f.rFind(this.pattern1), 30);

            f.insert(this.pattern1, this.length2 / 2, this.pattern1.length);
            assert.strictEqual(f.rFind(this.pattern1), this.length2 / 2);

            f.insert(this.pattern1, this.length2 - 30, this.pattern1.length);
            assert.strictEqual(f.rFind(this.pattern1), this.length2 - 30);

            assert.strictEqual(f.rFind(this.pattern1, 2), this.length2 - 30);
            assert.strictEqual(f.rFind(this.pattern1, 31), this.length2 / 2);
            assert.strictEqual(f.rFind(this.pattern1, this.length2 / 2 + 3), 30);
        };
        this.testWithMemoryStream(testAction, this.length2);
    }

    @test
    public rFind_file3() {
        const testAction = (f: TestFile) => {
            // Act / Assert
            assert.strictEqual(f.rFind(this.pattern1), -1);
            assert.strictEqual(f.rFind(this.pattern1, 13), -1);

            const bufferCross1 = File.bufferSize - Math.floor(this.pattern1.length / 2);
            const bufferCross2 = 2 * File.bufferSize - Math.floor(this.pattern1.length / 2);

            f.insert(this.pattern1, bufferCross1, this.pattern1.length);
            assert.strictEqual(f.rFind(this.pattern1), bufferCross1);
            assert.strictEqual(f.rFind(this.pattern1, bufferCross1 + this.pattern1.length), bufferCross1);

            f.insert(this.pattern1, bufferCross2, this.pattern1.length);
            assert.strictEqual(f.rFind(this.pattern1), bufferCross2);

            const bufferCross3 = File.bufferSize - 1;
            f.insert(this.pattern3, bufferCross3 - 1, this.pattern3.length);
            f.insert(this.pattern3, bufferCross3, this.pattern3.length);
            assert.strictEqual(f.rFind(this.pattern3), bufferCross3);
        };
        this.testWithMemoryStream(testAction, this.length3);
    }

    @test
    public removeBlock_invalidParams() {
        const testAction = (f: TestFile) => {
            // Act / Assert
            Testers.testSafeUint((v: number) => { f.removeBlock(v, 0); });
            Testers.testSafeInt((v: number) => { f.removeBlock(0, v); });
        };
        this.testWithMemoryStream(testAction, 10);
    }

    @test
    public removeBlock_nothingToDo() {
        const testAction = (f: TestFile, d: ByteVector) => {
            // Act
            f.removeBlock(0, 0);
            f.removeBlock(0, -1);

            // Assert
            // - Mode shouldn't have changed
            assert.strictEqual(f.mode, FileAccessMode.Closed);

            // - Open the stream to verify it's contents didn't change
            f.mode = FileAccessMode.Read;
            assert.isTrue(ByteVector.equal((<TestStream> f.stream).data, d));
        };
        this.testWithMemoryStream(testAction, 10);
    }

    @test
    public seek_closedAccess() {
        const testAction = (f: TestFile) => {
            // Arrange - get the test stream
            f.mode = FileAccessMode.Read;
            const stream = <TestStream> f.stream;
            f.mode = FileAccessMode.Closed;

            // Act
            f.seek(123);

            // Assert
            assert.strictEqual(f.mode, FileAccessMode.Closed);
            assert.strictEqual(stream.position, 0);
        };
        this.testWithMemoryStream(testAction, 10);
    }

    @test
    public seek_validSeek() {
        const testAction = (f: TestFile) => {
            // Arrange - get the test stream
            f.mode = FileAccessMode.Read;
            const stream = <TestStream> f.stream;

            // Act
            f.seek(5);

            // Assert
            assert.strictEqual(stream.position, 5);
        };
        this.testWithMemoryStream(testAction, 10);
    }

    private testWithMockAbstraction(testAction: (f: File, a: TypeMoq.IMock<IFileAbstraction>) => void) {
        // Arrange
        const testResolver = TypeMoq.Mock.ofType<FileTypeResolver>();
        testResolver.setup((r) => r(
            TypeMoq.It.isAny(),
            TypeMoq.It.isAnyString(),
            TypeMoq.It.isAny()
        )).returns((a) => new TestFile(a));
        File.addFileTypeResolver(testResolver.object);

        const mockReadStream = TypeMoq.Mock.ofType<IStream>();
        mockReadStream.setup((rs) => rs.canWrite).returns(() => false);

        const mockWriteStream = TypeMoq.Mock.ofType<IStream>();
        mockWriteStream.setup((ws) => ws.canWrite).returns(() => true);

        const mockAbstraction = TypeMoq.Mock.ofType<IFileAbstraction>();
        mockAbstraction.setup((a) => a.readStream).returns(() => mockReadStream.object);
        mockAbstraction.setup((a) => a.writeStream).returns(() => mockWriteStream.object);
        mockAbstraction.setup((a) => a.closeStream(TypeMoq.It.isAny()));
        mockAbstraction.setup((a) => a.name).returns(() => TestConstants.testFilePath);

        const file = File.createFromAbstraction(mockAbstraction.object);

        try {
            testAction(file, mockAbstraction);
        } finally {
            // Cleanup
            File.removeFileTypeResolver(testResolver.object);
        }
    }

    private testWithMemoryStream(testAction: (f: File, inputData: ByteVector) => void, length: number) {
        // Arrange
        const testResolver = TypeMoq.Mock.ofType<FileTypeResolver>();
        testResolver.setup((r) => r(
            TypeMoq.It.isAny(),
            TypeMoq.It.isAnyString(),
            TypeMoq.It.isAny()
        )).returns((a) => new TestFile(a));
        File.addFileTypeResolver(testResolver.object);

        const data = ByteVector.fromSize(length);
        for (let i = 0; i < length; i++) {
            data.set(i, FileTests.chars.charCodeAt(i % FileTests.chars.length));
        }
        const stream = new TestStream(data, true);

        const mockAbstraction = TypeMoq.Mock.ofType<IFileAbstraction>();
        mockAbstraction.setup((a) => a.readStream).returns(() => stream);
        mockAbstraction.setup((a) => a.writeStream).returns(() => stream);
        mockAbstraction.setup((a) => a.closeStream(TypeMoq.It.isAny()));
        mockAbstraction.setup((a) => a.name).returns(() => TestConstants.testFilePath);

        const file = File.createFromAbstraction(mockAbstraction.object);

        try {
            testAction(file, data);
        } finally {
            // Cleanup
            File.removeFileTypeResolver(testResolver.object);
        }
    }
}

class TestFile extends File {
    constructor(abstraction: IFileAbstraction) {
        super(abstraction);
    }

    public get properties(): Properties { throw new Error("Not implemented"); }

    public get tag(): Tag { return undefined; }

    public get stream(): IStream { return this._fileStream; }

    public getTag(_types: TagTypes, _create: boolean): Tag {
        throw new Error("Not implemented");
    }

    public removeTags(_types: TagTypes): Tag {
        throw new Error("Not implemented");
    }

    public save() {
        throw new Error("Not implemented");
    }
}
