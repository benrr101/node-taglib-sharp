import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";
import {Mock} from "typemoq";

import {default as TestFile} from "../utilities/testFile";
import {ByteVector} from "../../src/byteVector";
import {File} from "../../src/file";
import {FlacBlock, FlacBlockType} from "../../src/flac/flacBlock";
import {Testers} from "../utilities/testers";

@suite class Flac_BlockTests {
    @test
    public fromData_invalidArguments() {
        // Act / Assert
        Testers.testTruthy((v: ByteVector) => FlacBlock.fromData(FlacBlockType.Padding, v));
    }

    @test
    public fromData_dataTooBig() {
        // Arrange
        const mockData = Mock.ofType<ByteVector>();
        mockData.setup((m) => m.length).returns(() => Number.MAX_SAFE_INTEGER - 1);

        // Act / Assert
        assert.throws(() => FlacBlock.fromData(FlacBlockType.Padding, mockData.object));
    }

    @test
    public fromData_valid() {
        // Arrange
        const data = ByteVector.fromSize(10, 0xBE);

        // Act
        const block = FlacBlock.fromData(FlacBlockType.Padding, data);

        // Assert
        assert.isOk(block);
        assert.isTrue(block.isLoaded);
        assert.isUndefined(block.blockStart);
        Testers.bvEqual(block.data, data);
        assert.strictEqual(block.dataSize, data.length);
        assert.isFalse(block.isLastBlock);
        assert.strictEqual(block.totalSize, data.length + FlacBlock.HEADER_SIZE);
        assert.strictEqual(block.type, FlacBlockType.Padding);
    }

    @test
    public fromFile_invalidParams() {
        // Arrange
        const testFile = TestFile.getFile(ByteVector.fromSize(10));

        // Act / Assert
        Testers.testTruthy((v: File) => FlacBlock.fromFile(v, 0));
        Testers.testSafeUint((v) => FlacBlock.fromFile(testFile, v));
        assert.throws(() => FlacBlock.fromFile(testFile, 11));
    }

    @test
    public fromFile_validIsLastBlock() {
        // Arrange
        const fileBytes = ByteVector.concatenate(
            ByteVector.fromSize(10),
            ByteVector.fromUint(0x86123456),
            ByteVector.fromSize(10)
        );
        const file = TestFile.getFile(fileBytes);

        // Act
        const block = FlacBlock.fromFile(file, 10);

        // Assert
        assert.isOk(block);
        assert.isFalse(block.isLoaded);
        assert.strictEqual(block.blockStart, 10);
        assert.strictEqual(block.dataSize, 0x123456);
        assert.isTrue(block.isLastBlock);
        assert.strictEqual(block.totalSize, 0x123456 + FlacBlock.HEADER_SIZE);
        assert.strictEqual(block.type, FlacBlockType.Picture);
    }

    @test
    public fromFile_validIsNotLastBlock() {
        // Arrange
        const fileBytes = ByteVector.concatenate(
            ByteVector.fromSize(10),
            ByteVector.fromUint(0x06123456),
            ByteVector.fromSize(10)
        );
        const file = TestFile.getFile(fileBytes);

        // Act
        const block = FlacBlock.fromFile(file, 10);

        // Assert
        assert.isOk(block);
        assert.isFalse(block.isLoaded);
        assert.strictEqual(block.blockStart, 10);
        assert.strictEqual(block.dataSize, 0x123456);
        assert.isFalse(block.isLastBlock);
        assert.strictEqual(block.totalSize, 0x123456 + FlacBlock.HEADER_SIZE);
        assert.strictEqual(block.type, FlacBlockType.Picture);
    }

    @test
    public fromFile_loadsOnDataAccess() {
        // Arrange
        const fileBytes = ByteVector.concatenate(
            ByteVector.fromUint(0x0600000A),
            ByteVector.fromSize(10, 0x0B)
        );
        const file = TestFile.getFile(fileBytes);

        // Act
        const block = FlacBlock.fromFile(file, 0);
        const data = block.data;

        // Assert
        assert.isTrue(block.isLoaded);
        Testers.bvEqual(data, fileBytes.subarray(4));
    }

    @test
    public setBlockStart() {
        // Arrange
        const data = ByteVector.fromSize(10, 0xBE);
        const block = FlacBlock.fromData(FlacBlockType.Padding, data);

        // Act
        block.blockStart = 123;

        // Assert
        assert.strictEqual(block.blockStart, 123);
    }

    @test
    public render_isLastBlock() {
        // Arrange
        const data = ByteVector.fromSize(10, 0xBE);
        const block = FlacBlock.fromData(FlacBlockType.Padding, data);

        // Act
        const output = block.render(true);

        // Assert
        const expected = ByteVector.concatenate(
            0x81, 0x00, 0x00, 0x0A,
            data
        );
        Testers.bvEqual(output, expected);
    }

    @test
    public render_isNotLastBlock() {
        // Arrange
        const data = ByteVector.fromSize(10, 0xBE);
        const block = FlacBlock.fromData(FlacBlockType.Padding, data);

        // Act
        const output = block.render(false);

        // Assert
        const expected = ByteVector.concatenate(
            0x01, 0x00, 0x00, 0x0A,
            data
        );
        Testers.bvEqual(output, expected);
    }
}
