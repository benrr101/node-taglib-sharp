import * as Chai from "chai";
import * as TypeMoq from "typemoq";
import Testers from "../utilities/testers";
import TestFile from "../utilities/testFile";
import {suite, test} from "mocha-typescript";

import AiffStreamHeader from "../../src/aiff/aiffStreamHeader";
import {ByteVector} from "../../src/byteVector";
import {File} from "../../src/file";
import {MediaTypes} from "../../src/iCodec";

// Setup Chai
const assert = Chai.assert;

@suite class Aiff_StreamHeaderTests {
    @test
    public constructor_invalidData() {
        // Arrange
        const testFunc = (a: ByteVector, b: number) => { const _ = new AiffStreamHeader(a, b); };

        // Act / Asseert
        Testers.testTruthy((v: ByteVector) => testFunc(v, 0));
        Testers.testUint((v: number) => testFunc(ByteVector.empty(), v));
    }

    @test
    public constructor_dataDoesNotStartWithIdentifier() {
        // Act / Assert
        assert.throws(() => { const _ = new AiffStreamHeader(ByteVector.fromSize(10), 0); });
    }

    @test
    public constructor_validDataSuite() {
        // I seriously cannot justify testing this whole suite with separate tests.
        const cases = [
            { indicator: 44100, temp: 0x0E, expectedSampleRate: 44100 },
            { indicator: 44100, temp: 0x0D, expectedSampleRate: 22050 },
            { indicator: 44100, temp: 0x0C, expectedSampleRate: 11025 },
            { indicator: 48000, temp: 0x0E, expectedSampleRate: 48000 },
            { indicator: 48000, temp: 0x0D, expectedSampleRate: 24000 },
            { indicator: 64000, temp: }
        ]
    }
}
