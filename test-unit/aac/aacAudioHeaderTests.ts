import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import * as TypeMoq from "typemoq";
import Testers from "../utilities/testers";
import TestFile from "../utilities/testFile";
import {suite, test} from "mocha-typescript";

import AacAudioHeader from "../../src/aac/aacAudioHeader";
import Mpeg4AudioTypes from "../../src/mpeg4/mpeg4AudioTypes";
import {ByteVector} from "../../src/byteVector";
import {File} from "../../src/file";
import {MediaTypes} from "../../src/iCodec";

// Setup Chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

// Test constants
const sampleHeaderBytes = ByteVector.fromByteArray(new Uint8Array([0xFF, 0xF5, 0x55, 0x55, 0x55, 0x55, 0x55]));

@suite class Aac_AudioHeaderTests {
    @test
    public constructor_invalidData() {
        // Arrange
        const testFunc = (a: number, b: number, c: number, d: number) => { const _  = new AacAudioHeader(a, b, c, d); };

        // Act / Assert
        Testers.testUint((v: number) => testFunc(v, 0, 0, 0));
        Testers.testUint((v: number) => testFunc(0, 0, v, 0));
        Testers.testUint((v: number) => testFunc(0, 0, 0, v));
        assert.throws(() => testFunc(0, -1, 0, 0));
    }

    @test
    public constructor_validData() {
        // Act
        const header = new AacAudioHeader(1, 1.23, 2, 3);

        // Assert
        assert.strictEqual(header.audioBitrate, 1.23);
        assert.strictEqual(header.audioChannels, 1);
        assert.strictEqual(header.audioSampleRate, 2);
        assert.isTrue(header.description.indexOf("ADTS AAC") >= 0);
        assert.isTrue(header.description.indexOf(Mpeg4AudioTypes[3]) >= 0);
        assert.isUndefined(header.durationMilliseconds);
        assert.strictEqual(header.mediaTypes, MediaTypes.Audio);
    }

    @test
    public setStreamLength_invalidValue() {
        // Arrange
        const header = new AacAudioHeader(1, 1.23, 2, 3);

        // Act / Assert
        Testers.testUint((v: number) => { header.streamLength = v; });
    }

    @test
    public setStreamLength_validValue() {
        // Arrange
        const header = new AacAudioHeader(1, 64, 44100, 3);

        // Act
        header.streamLength = 1234;

        // Assert
        assert.strictEqual(header.durationMilliseconds, 154.25);
    }

    @test
    public find_invalidParameters() {
        // Arrange
        const mockFile = TypeMoq.Mock.ofType<File>();

        // Act / Assert
        Testers.testTruthy((v: File) => { AacAudioHeader.find(v, 0, 0); });
        Testers.testUint((v: number) => { AacAudioHeader.find(mockFile.object, v, 0); });
        Testers.testUint((v: number) => { AacAudioHeader.find(mockFile.object, 0, v); }, true);
    }

    @test
    public find_fileTooShort() {
        // Arrange
        const mockFile = TestFile.getFile(ByteVector.fromSize(10));

        // Act
        const output = AacAudioHeader.find(mockFile, 8);

        // Assert
        assert.isUndefined(output);
    }

    @test
    public find_headerNotInFile() {
        // Arrange
        const mockFile = TestFile.getFile(ByteVector.fromSize(File.bufferSize * 4));

        // Act
        const output = AacAudioHeader.find(mockFile, 2, undefined);

        // Assert
        assert.isUndefined(output);
    }

    @test
    public find_headerInFileRequiresMultipleBufferReads() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromSize((File.bufferSize * 2.5) + 1),
            sampleHeaderBytes,
            ByteVector.fromSize(20)
        );
        const mockFile = TestFile.getFile(data);

        // Act
        const output = AacAudioHeader.find(mockFile, 0, undefined);

        // Assert
        assert.isOk(output);
        assert.strictEqual(output.audioBitrate, 321.25);
        assert.strictEqual(output.audioChannels, 5);
        assert.strictEqual(output.audioSampleRate, 32000);
        assert.isTrue(output.description.indexOf("ADTS AAC") >= 0);
        assert.isTrue(output.description.indexOf(Mpeg4AudioTypes[2]) >= 0);
        assert.isUndefined(output.durationMilliseconds);
        assert.strictEqual(output.mediaTypes, MediaTypes.Audio);
    }
}
