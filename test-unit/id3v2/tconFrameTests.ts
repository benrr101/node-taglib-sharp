import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import Id3v2Settings from "../../src/id3v2/id3v2Settings";
import {ByteVector, StringType} from "../../src/byteVector";
import {Id3v2FrameFlags, Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {TextInformationFrame} from "../../src/id3v2/frames/textInformationFrame";

@suite
class Id3v2_TconFrameTests {
    @test
    public singleTerm_string() {
        this.testFrameV2V3("Classical", ["Classical"]);
    }

    @test
    public singleTerm_singleStandardNumber() {
        this.testFrameV2V3("(32)", ["Classical"]);
    }

    @test
    public singleTerm_singleStandardNumber_stringRefinement() {
        this.testFrameV2V3("(32)foo", ["Classical foo"]);
    }

    @test
    public singleTerm_singleStandardNumber_stringRefinementWithEscape() {
        this.testFrameV2V3("(32)f((oo", ["Classical f(oo"]);
    }

    @test
    public singleTerm_singleStandardNumber_stringRefinementWithoutEscape() {
        this.testFrameV2V3("(32)f(oo", ["Classical f(oo"]);
    }

    @test
    public singleTerm_multipleStandardNumber() {
        this.testFrameV2V3("(32)(33)", ["Classical", "Instrumental"]);
    }

    @test
    public singleTerm_multipleStandardNumber_stringRefinementOnFirst() {
        this.testFrameV2V3("(32)foo(33)", ["Classical foo", "Instrumental"]);
    }

    @test
    public singleTerm_multipleStandardNumber_stringRefinementOnSecond() {
        this.testFrameV2V3("(32)(33)bar", ["Classical", "Instrumental bar"]);
    }

    @test
    public singleTerm_multipleStandardNumber_stringRefinementOnBoth() {
        this.testFrameV2V3("(32)foo(33)bar", ["Classical foo", "Instrumental bar"]);
    }

    @test
    public singleTerm_multipleStandardNumber_stringRefinementWithEscapeOnFirst() {
        this.testFrameV2V3("(32)f((oo(33)", ["Classical f(oo", "Instrumental"]);
    }

    @test
    public singleTerm_multipleStandardNumber_stringRefinementWithEscapeOnSecond() {
        this.testFrameV2V3("(32)(33)b((ar", ["Classical", "Instrumental b(ar"]);
    }

    @test
    public singleTerm_multipleStandardNumber_stringRefinementWithEscapeOnBoth() {
        this.testFrameV2V3("(32)f((oo(33)b((ar", ["Classical f(oo", "Instrumental b(ar"]);
    }

    @test
    public singleTerm_multipleStandardNumber_stringRefinementWithoutEscapeOnFirst() {
        this.testFrameV2V3("(32)f(oo(33)", ["Classical f(oo(33)"]);
    }

    @test
    public singleTerm_multipleStandardNumber_stringRefinementWithoutEscapeOnSecond() {
        this.testFrameV2V3("(32)(33)b(ar", ["Classical", "Instrumental b(ar"]);
    }

    @test
    public singleTerm_multipleStandardNumber_stringRefinementWithoutEscapeOnBoth() {
        this.testFrameV2V3("(32)f(oo(33)b(ar", ["Classical f(oo(33)b(ar"]);
    }

    @test
    public singleTerm_singleNonstandardNumber_nonstandardNumericDisabled() {
        const partialSettings: PartialSettings = {useNonStandardV2V3NumericGenres: false};
        this.testFrameV2V3WithSettings(partialSettings, "32", ["32"]);
    }

    @test
    public stringTerm_singleNonstandardNumber_nonstandardNumericEnabled() {
        const partialSettings: PartialSettings = {useNonStandardV2V3NumericGenres: true};
        this.testFrameV2V3WithSettings(partialSettings, "32", ["Classical"]);
    }

    @test
    public singleTerm_singleNonstandardNumber_withString_nonstandardNumericDisabled() {
        const partialSettings: PartialSettings = {useNonStandardV2V3NumericGenres: false};
        this.testFrameV2V3WithSettings(partialSettings, "32foo", ["32foo"]);
    }

    @test
    public singleTerm_singleNonstandardNumber_withString_nonstandardNumericEnabled() {
        const partialSettings: PartialSettings = {useNonStandardV2V3NumericGenres: true};
        this.testFrameV2V3WithSettings(partialSettings, "32foo", ["32foo"]);
    }

    @test
    public singleTerm_multipleNonstandardNumber_withString_nonStandardNumericDisabled() {
        const partialSettings: PartialSettings = {useNonStandardV2V3NumericGenres: false};
        this.testFrameV2V3WithSettings(partialSettings, "32foo33bar", ["32foo33bar"]);
    }

    @test
    public singleTerm_multipleNonstandardNumber_withString_nonStandardNumericEnabled() {
        const partialSettings: PartialSettings = {useNonStandardV2V3NumericGenres: true};
        this.testFrameV2V3WithSettings(partialSettings, "32foo33bar", ["32foo33bar"]);
    }

    private testFrame(tagVersion: number, payload: string|ByteVector, expected: string[]) {
        // Arrange
        const payloadBytes = payload instanceof ByteVector
            ? payload
            : ByteVector.concatenate(
                StringType.UTF16BE,
                ByteVector.fromString(payload, StringType.UTF16BE),
            );

        const header = new Id3v2FrameHeader(FrameIdentifiers.TCON, Id3v2FrameFlags.None, payloadBytes.length);

        const frameBytes = ByteVector.concatenate(header.render(tagVersion), payloadBytes);
        const frame = TextInformationFrame.fromRawData(frameBytes, tagVersion);

        // Act
        const values = frame.text;

        // Assert
        assert.deepStrictEqual(values, expected);
    }

    private testFrameV2V3(payload: string, expected: string[]) {
        this.testFrame(2, payload, expected);
        this.testFrame(3, payload, expected);
    }

    private testFrameV2V3WithSettings(settings: PartialSettings, payload: string, expected: string[]) {
        // Setup
        const originalUseNonStandardV2V3GenreSeparators = Id3v2Settings.useNonStandardV2V3GenreSeparators;
        if (settings.useNonStandardV2V3NumericGenres !== undefined) {
            Id3v2Settings.useNonStandardV2V3GenreSeparators = settings.useNonStandardV2V3NumericGenres;
        }

        const originalUseNonStandardV2V3NumericGenres = Id3v2Settings.useNonStandardV2V3NumericGenres;
        if (settings.useNonStandardV2V3NumericGenres !== undefined) {
            Id3v2Settings.useNonStandardV2V3NumericGenres = settings.useNonStandardV2V3NumericGenres;
        }

        try {
            // Run
            this.testFrameV2V3(payload, expected);
        } finally {
            // Cleanup
            Id3v2Settings.useNonStandardV2V3GenreSeparators = originalUseNonStandardV2V3GenreSeparators;
            Id3v2Settings.useNonStandardV2V3NumericGenres = originalUseNonStandardV2V3NumericGenres;
        }
    }
}

interface PartialSettings {
    useNonStandardV2V3GenreSeparators?: boolean;
    useNonStandardV2V3NumericGenres?: boolean;
}
