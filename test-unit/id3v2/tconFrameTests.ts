import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import Id3v2Settings from "../../src/id3v2/id3v2Settings";
import {ByteVector, StringType} from "../../src/byteVector";
import {Id3v2FrameFlags, Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {TextInformationFrame} from "../../src/id3v2/frames/textInformationFrame";
import {Testers} from "../utilities/testers";

@suite
class Id3v2_TconFrameTests {

    // region Parse Tests

    @test
    public parse_singleTerm_string() {
        this.testFrameParseV2V3("Classical", ["Classical"]);
    }

    @test
    public parse_singleTerm_invalidParentheses() {
        this.testFrameParseV2V3("(foo)", ["(foo)"]);
    }

    @test
    public parse_singleTerm_singleStandardNumber() {
        this.testFrameParseV2V3("(32)", ["Classical"]);
    }

    @test
    public parse_singleTerm_singleRemixCover() {
        this.testFrameParseV2V3("(CR)", ["Cover"]);
        this.testFrameParseV2V3("(RX)", ["Remix"]);
    }

    @test
    public parse_singleTerm_singleStandardNumber_stringRefinement() {
        this.testFrameParseV2V3("(32)foo", ["Classical foo"]);
    }

    @test
    public parse_singleTerm_singleStandardNumber_stringRefinementWithEscape() {
        this.testFrameParseV2V3("(32)f((oo", ["Classical f(oo"]);
    }

    @test
    public parse_singleTerm_singleStandardNumber_stringRefinementWithoutEscape() {
        this.testFrameParseV2V3("(32)f(oo", ["Classical f(oo"]);
    }

    @test
    public parse_singleTerm_multipleStandardNumber() {
        this.testFrameParseV2V3("(32)(33)", ["Classical", "Instrumental"]);
    }

    @test
    public parse_singleTerm_multipleRemixCover() {
        this.testFrameParseV2V3("(CR)(RX)", ["Cover", "Remix"]);
    }

    @test
    public parse_singleTerm_multipleStandardNumber_stringRefinementOnFirst() {
        this.testFrameParseV2V3("(32)foo(33)", ["Classical foo", "Instrumental"]);
    }

    @test
    public parse_singleTerm_multipleStandardNumber_stringRefinementOnSecond() {
        this.testFrameParseV2V3("(32)(33)bar", ["Classical", "Instrumental bar"]);
    }

    @test
    public parse_singleTerm_multipleStandardNumber_stringRefinementOnBoth() {
        this.testFrameParseV2V3("(32)foo(33)bar", ["Classical foo", "Instrumental bar"]);
    }

    @test
    public parse_singleTerm_multipleStandardNumber_stringRefinementWithEscapeOnFirst() {
        this.testFrameParseV2V3("(32)f((oo(33)", ["Classical f(oo", "Instrumental"]);
    }

    @test
    public parse_singleTerm_multipleStandardNumber_stringRefinementWithEscapeOnSecond() {
        this.testFrameParseV2V3("(32)(33)b((ar", ["Classical", "Instrumental b(ar"]);
    }

    @test
    public parse_singleTerm_multipleStandardNumber_stringRefinementWithEscapeOnBoth() {
        this.testFrameParseV2V3("(32)f((oo(33)b((ar", ["Classical f(oo", "Instrumental b(ar"]);
    }

    @test
    public parse_singleTerm_multipleRemixCover_stringRefinementWithEscapeOnBoth() {
        this.testFrameParseV2V3("(CR)f((oo(RX)b((ar", ["Cover f(oo", "Remix b(ar"]);
    }

    @test
    public parse_singleTerm_multipleStandardNumber_stringRefinementWithoutEscapeOnFirst() {
        this.testFrameParseV2V3("(32)f(oo(33)", ["Classical f(oo(33)"]);
    }

    @test
    public parse_singleTerm_multipleStandardNumber_stringRefinementWithoutEscapeOnSecond() {
        this.testFrameParseV2V3("(32)(33)b(ar", ["Classical", "Instrumental b(ar"]);
    }

    @test
    public parse_singleTerm_multipleStandardNumber_stringRefinementWithoutEscapeOnBoth() {
        this.testFrameParseV2V3("(32)f(oo(33)b(ar", ["Classical f(oo(33)b(ar"]);
    }

    @test
    public parse_singleTerm_multipleRemixCover_stringRefinementWithoutEscapeOnBoth() {
        this.testFrameParseV2V3("(CR)f(oo(RX)b(ar", ["Cover f(oo(RX)b(ar"]);
    }

    @test
    public parse_singleTerm_singleNonstandardNumber_nonstandardNumericDisabled() {
        const partialSettings: PartialSettings = {useNonStandardV2V3NumericGenres: false};
        this.testFrameParseV2V3WithSettings(partialSettings, "32", ["32"]);
    }

    @test
    public parse_stringTerm_singleNonstandardNumber_nonstandardNumericEnabled() {
        const partialSettings: PartialSettings = {useNonStandardV2V3NumericGenres: true};
        this.testFrameParseV2V3WithSettings(partialSettings, "32", ["Classical"]);
    }

    @test
    public parse_singleTerm_singleNonstandardNumber_withString_nonstandardNumericDisabled() {
        const partialSettings: PartialSettings = {useNonStandardV2V3NumericGenres: false};
        this.testFrameParseV2V3WithSettings(partialSettings, "32foo", ["32foo"]);
    }

    @test
    public parse_singleTerm_singleNonstandardNumber_withString_nonstandardNumericEnabled() {
        const partialSettings: PartialSettings = {useNonStandardV2V3NumericGenres: true};
        this.testFrameParseV2V3WithSettings(partialSettings, "32foo", ["32foo"]);
    }

    @test
    public parse_singleTerm_multipleNonstandardNumber_withString_nonStandardNumericDisabled() {
        const partialSettings: PartialSettings = {useNonStandardV2V3NumericGenres: false};
        this.testFrameParseV2V3WithSettings(partialSettings, "32foo33bar", ["32foo33bar"]);
    }

    @test
    public parse_singleTerm_multipleNonstandardNumber_withString_nonStandardNumericEnabled() {
        const partialSettings: PartialSettings = {useNonStandardV2V3NumericGenres: true};
        this.testFrameParseV2V3WithSettings(partialSettings, "32foo33bar", ["32foo33bar"]);
    }

    @test
    public parse_multipleTerms_nonStandardSeparatorEnabled() {
        const partialSettings: PartialSettings = {useNonStandardV2V3GenreSeparators: true};
        this.testFrameParseV2V3WithSettings(
            partialSettings,
            "(32)Fux(33)Bux;34/Foo;Bar/Baz",
            ["Classical Fux", "Instrumental Bux", "Acid", "Foo", "Bar", "Baz"]
        );
    }

    @test
    public parse_multipleTerms_nonStandardSeparatorDisabled() {
        const partialSettings: PartialSettings = {useNonStandardV2V3GenreSeparators: false};
        this.testFrameParseV2V3WithSettings(
            partialSettings,
            "(32)Fux(33)Bux;34/Foo;Bar/Baz",
            ["Classical Fux", "Instrumental Bux;34/Foo;Bar/Baz"]
        );
    }

    // endregion

    // region Render tests

    @test
    public render_singleTerm_string() {
        this.testFrameRenderV2V3(["foobarbaz"], "foobarbaz");
    }

    @test
    public render_singleTerm_paren() {
        this.testFrameRenderV2V3(["f()()"], "f(()(()");
    }

    @test
    public render_singleTerm_numericString_useNumericGenresEnabled() {
        const settings: PartialSettings = { useNumericGenres: true };
        this.testFrameRenderV2V3WithSettings(settings, ["Classical"], "(32)");
    }

    @test
    public render_singleTerm_coverRemixString_useNumericGenresEnabled() {
        const settings: PartialSettings = { useNumericGenres: true };
        this.testFrameRenderV2V3WithSettings(settings, ["Cover"], "(CR)");
        this.testFrameRenderV2V3WithSettings(settings, ["Remix"], "(RX)");
    }

    @test
    public render_singleTerm_numericString_useNumericGenresDisabled() {
        const settings: PartialSettings = { useNumericGenres: false };
        this.testFrameRenderV2V3WithSettings(settings, ["Classical"], "Classical");
    }

    @test
    public render_singleTerm_coverRemixString_useNumericGenresDisabled() {
        const settings: PartialSettings = { useNumericGenres: false };
        this.testFrameRenderV2V3WithSettings(settings, ["Cover"], "Cover");
        this.testFrameRenderV2V3WithSettings(settings, ["Remix"], "Remix");
    }

    @test
    public render_multipleTerms_string() {
        this.testFrameRenderV2V3(["foo","bar","baz"], "foo;bar;baz");
    }

    @test
    public render_multipleTerms_numericGenre_useNumericGenresEnabled() {
        const settings: PartialSettings = { useNumericGenres: true };
        this.testFrameRenderV2V3WithSettings(settings, ["Classical", "Instrumental"], "(32)(33)");
    }

    @test
    public render_multipleTerms_numericGenre_useNumericGenresDisabled() {
        const settings: PartialSettings = { useNumericGenres: false };
        this.testFrameRenderV2V3WithSettings(settings, ["Classical", "Instrumental"], "Classical;Instrumental");
    }

    @test
    public render_multipleTerms_numericGenreWithRefinement() {
        this.testFrameRenderV2V3(["Classical foo", "Instrumental bar"], "Classical foo;Instrumental bar");
    }

    // endregion

    private testFrameParse(tagVersion: number, payload: string|ByteVector, expected: string[]) {
        // Arrange
        const bodyBytes = payload instanceof ByteVector
            ? payload
            : ByteVector.concatenate(
                StringType.UTF16BE,
                ByteVector.fromString(payload, StringType.UTF16BE),
            );

        const header = new Id3v2FrameHeader(FrameIdentifiers.TCON, Id3v2FrameFlags.None, bodyBytes.length);

        const frameBytes = ByteVector.concatenate(header.render(tagVersion), bodyBytes);
        const frame = TextInformationFrame.fromRawData(frameBytes, tagVersion);

        // Act
        const values = frame.text;

        // Assert
        assert.deepStrictEqual(values, expected);
    }

    private testFrameParseV2V3(payload: string, expected: string[]) {
        this.testFrameParse(2, payload, expected);
        this.testFrameParse(3, payload, expected);
    }

    private testFrameParseV2V3WithSettings(settings: PartialSettings, payload: string, expected: string[]) {
        const action = () => { this.testFrameParseV2V3(payload, expected); };
        this.testWithSettings(settings, action);
    }

    private testFrameRender(tagVersion: number, fields: string[], expected: string) {
        // Arrange
        const frame = TextInformationFrame.fromIdentifier(FrameIdentifiers.TCON);
        frame.textEncoding = StringType.UTF16BE;
        frame.text = fields;

        // Act
        const result = frame.render(tagVersion);

        // Assert
        const expectedBody = ByteVector.concatenate(
            StringType.UTF16BE,
            ByteVector.fromString(expected, StringType.UTF16BE)
        );

        const expectedHeader = Id3v2FrameHeader.fromFrameIdentifier(FrameIdentifiers.TCON);
        expectedHeader.frameSize = expectedBody.length;

        const expectedBytes = ByteVector.concatenate(
            expectedHeader.render(tagVersion),
            expectedBody
        );

        Testers.bvEqual(result, expectedBytes);
    }

    private testFrameRenderV2V3(fields: string[], expected: string) {
        this.testFrameRender(2, fields, expected);
        this.testFrameRender(3, fields, expected);
    }

    private testFrameRenderV2V3WithSettings(settings: PartialSettings, fields: string[], expected: string) {
        const action = () => { this.testFrameRenderV2V3(fields, expected); };
        this.testWithSettings(settings, action);
    }

    private testWithSettings(settings: PartialSettings, action: () => void) {
        // Setup
        const originalUseNonStandardV2V3GenreSeparators = Id3v2Settings.useNonStandardV2V3GenreSeparators;
        if (settings.useNonStandardV2V3GenreSeparators !== undefined) {
            Id3v2Settings.useNonStandardV2V3GenreSeparators = settings.useNonStandardV2V3GenreSeparators;
        }

        const originalUseNonStandardV2V3NumericGenres = Id3v2Settings.useNonStandardV2V3NumericGenres;
        if (settings.useNonStandardV2V3NumericGenres !== undefined) {
            Id3v2Settings.useNonStandardV2V3NumericGenres = settings.useNonStandardV2V3NumericGenres;
        }

        const originalUseNumericGenres = Id3v2Settings.useNumericGenres;
        if (settings.useNumericGenres !== undefined) {
            Id3v2Settings.useNumericGenres = settings.useNumericGenres;
        }

        try {
            // Run
            action();
        } finally {
            // Cleanup
            Id3v2Settings.useNonStandardV2V3GenreSeparators = originalUseNonStandardV2V3GenreSeparators;
            Id3v2Settings.useNonStandardV2V3NumericGenres = originalUseNonStandardV2V3NumericGenres;
            Id3v2Settings.useNumericGenres = originalUseNumericGenres;
        }
    }
}

interface PartialSettings {
    useNonStandardV2V3GenreSeparators?: boolean;
    useNonStandardV2V3NumericGenres?: boolean;
    useNumericGenres?: boolean;
}
