import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import Id3v2Settings from "../../src/id3v2/id3v2Settings";
import GenreFrame from "../../src/id3v2/frames/genreFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameFlags, Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Testers} from "../utilities/testers";

@suite
class Id3v2_GenreFrameTests {

    // region Property tests

    @test
    public fromEncoding() {
        // Act
        const frame = GenreFrame.fromEncoding(StringType.UTF16BE);

        // Assert
        assert.isOk(frame);
        assert.strictEqual(frame.frameClassType, FrameClassType.GenreFrame);
        assert.strictEqual(frame.frameId, FrameIdentifiers.TCON);
        assert.deepStrictEqual(frame.text, []);
        assert.strictEqual(frame.textEncoding, StringType.UTF16BE);
    }

    @test
    public text_returnsCopy() {
        // Arrange
        const frame = GenreFrame.fromEncoding();
        frame.text = ["foo", "bar"];

        // Act
        const text = frame.text;
        text.push("baz");

        // Assert
        assert.deepStrictEqual(frame.text, ["foo", "bar"]);
    }

    @test
    public text_setFalsyReturnsEmptyArray() {
        // Arrange
        const frame = GenreFrame.fromEncoding();

        // Act
        frame.text = undefined;

        // Assert
        assert.deepStrictEqual(frame.text, []);
    }

    @test
    public textEncoding() {
        // Arrange
        const frame = GenreFrame.fromEncoding();

        // Act
        frame.textEncoding = StringType.UTF16BE;

        // Assert
        assert.strictEqual(frame.textEncoding, StringType.UTF16BE);
    }

    // endregion

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

    @test
    public parse_v2V3EmptyFrame() {
        this.testFrameParseV2V3(ByteVector.concatenate(StringType.UTF16BE), []);
    }

    @test
    public parse_v2V3StartsWithDelimiter() {
        const payload = ByteVector.concatenate(
            StringType.UTF16BE,
            ByteVector.getTextDelimiter(StringType.UTF16BE),
            ByteVector.fromString("foo", StringType.UTF16BE)
        );

        this.testFrameParseV2V3(payload, []);
    }

    @test
    public parse_v4ListOfStrings() {
        const payload = ByteVector.concatenate(
            StringType.UTF16BE,
            ByteVector.fromString("32", StringType.UTF16BE),
            ByteVector.getTextDelimiter(StringType.UTF16BE),
            ByteVector.fromString("(32)", StringType.UTF16BE),
            ByteVector.getTextDelimiter(StringType.UTF16BE),
            ByteVector.fromString("some genre", StringType.UTF16BE)
        );

        this.testFrameParse(4, payload, [
            "Classical",
            "(32)",
            "some genre"
        ]);
    }

    @test
    public parse_v4CoverRemix() {
        this.testFrameParseV4(["CR"], ["Cover"]);
        this.testFrameParseV4(["RX"], ["Remix"]);
    }

    @test
    public parse_v4CoverRemixWithRefinement() {
        this.testFrameParseV4(["CR foo", "RX bar"], ["CR foo", "RX bar"]);
    }

    @test
    public parse_v4CoverRemixWithParentheses() {
        this.testFrameParseV4(["(CR)", "(RX)"], ["(CR)", "(RX)"]);
    }

    @test
    public parse_v4CoverRemixWithEscapedParentheses() {
        this.testFrameParseV4(["CR f((oo", "RX b((ar"], ["CR f((oo", "RX b((ar"]);
    }

    @test
    public parse_v4CoverRemixWithUnescapedParentheses() {
        this.testFrameParseV4(["CR f(oo", "RX b(ar"], ["CR f(oo", "RX b(ar"]);
    }

    @test
    public parse_v2V3WithTrailingNulls() {
        const payload = ByteVector.concatenate(
            StringType.UTF16BE,
            ByteVector.fromString("(32)", StringType.UTF16BE),
            ByteVector.getTextDelimiter(StringType.UTF16BE),
            ByteVector.getTextDelimiter(StringType.UTF16BE)
        );

        this.testFrameParse(2, payload, ["Classical"]);
        this.testFrameParse(3, payload, ["Classical"]);
    }

    @test
    public parse_v4WithTrailingNulls() {
        const payload = ByteVector.concatenate(
            StringType.UTF16BE,
            ByteVector.fromString("32", StringType.UTF16BE),
            ByteVector.getTextDelimiter(StringType.UTF16BE),
            ByteVector.fromString("CR", StringType.UTF16BE),
            ByteVector.getTextDelimiter(StringType.UTF16BE),
            ByteVector.getTextDelimiter(StringType.UTF16BE)
        );

        this.testFrameParse(4, payload, ["Classical", "Cover"]);
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

    @test
    public render_v4SingleTermString() {
        this.testFrameRenderV4(["foobarbaz"], ["foobarbaz"]);
    }

    @test
    public render_v4MultipleTermsString() {
        this.testFrameRenderV4(["foo","bar","baz"], ["foo","bar","baz"]);
    }

    @test
    public render_v4SingleTerm_numericString_useNumericGenresEnabled() {
        const settings: PartialSettings = { useNumericGenres: true };
        this.testFrameRenderV4WithSettings(settings, ["Classical"], ["32"]);
    }

    @test
    public render_v4SingleTerm_numericString_useNumericGenresDisabled() {
        const settings: PartialSettings = { useNumericGenres: false };
        this.testFrameRenderV4WithSettings(settings, ["Classical"], ["Classical"]);
    }

    @test
    public render_v4SingleTerm_coverRemixString_useNumericGenresEnabled() {
        const settings: PartialSettings = { useNumericGenres: true };
        this.testFrameRenderV4WithSettings(settings, ["Cover"], ["CR"]);
        this.testFrameRenderV4WithSettings(settings, ["Remix"], ["RX"]);
    }

    @test
    public render_v4SingleTerm_coverRemixString_useNumericGenresDisabled() {
        const settings: PartialSettings = { useNumericGenres: false };
        this.testFrameRenderV4WithSettings(settings, ["Cover"], ["CR"]);
        this.testFrameRenderV4WithSettings(settings, ["Remix"], ["RX"]);
    }

    @test
    public render_v4MultipleTerms_numericGenre_useNumericGenresEnabled() {
        const settings: PartialSettings = { useNumericGenres: true };
        this.testFrameRenderV4WithSettings(
            settings,
            ["Classical", "Instrumental", "foo"],
            ["32", "33", "foo"]
        );
    }

    @test
    public render_v4MultipleTerms_numericGenre_useNumericGenresDisabled() {
        const settings: PartialSettings = { useNumericGenres: false };
        this.testFrameRenderV4WithSettings(
            settings,
            ["Classical", "Instrumental", "foo"],
            ["Classical", "Instrumental", "foo"]
        );
    }

    @test
    public render_v4MultipleTerms_numericGenreWithRefinement() {
        this.testFrameRenderV4(
            ["Classical foo", "Instrumental bar"],
            ["Classical foo", "Instrumental bar"]
        );
    }

    @test
    public render_v4EmptyTerms() {
        this.testFrameRenderV4(["foo", undefined, "", "bar"], ["foo", undefined, "", "bar"]);
    }

    // endregion

    // region Method tests

    @test
    public clone_returnsCopy() {
        // Arrange
        const frame = GenreFrame.fromEncoding(StringType.UTF16BE);
        frame.text = ["foo", "bar"];

        // Act
        const output = <GenreFrame> frame.clone();

        // Assert
        assert.isOk(output);
        assert.notStrictEqual(output, frame);
        assert.strictEqual(output.frameClassType, FrameClassType.GenreFrame);
        assert.strictEqual(output.frameId, FrameIdentifiers.TCON);
        assert.deepStrictEqual(output.text, ["foo", "bar"]);
        assert.strictEqual(output.textEncoding, StringType.UTF16BE);
    }

    @test
    public find_falsyFrames() {
        // Act/Assert
        Testers.testTruthy((v: GenreFrame[]) => { GenreFrame.findGenreFrame(v); });
    }

    @test
    public find_frameExists() {
        // Arrange
        const frame = GenreFrame.fromEncoding();

        // Act
        const output = GenreFrame.findGenreFrame([frame]);

        // Assert
        assert.strictEqual(output, frame);
    }

    @test
    public find_frameDoesNotExist() {
        // Act
        const output = GenreFrame.findGenreFrame([]);

        // Assert
        assert.isUndefined(output);
    }

    @test
    public toString_returnsSemicolonSeparatedText() {
        // Arrange
        const frame = GenreFrame.fromEncoding();
        frame.text = ["foo", "bar"];

        // Act
        const output = frame.toString();

        // Assert
        assert.strictEqual(output, "foo; bar");
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
        const frame = GenreFrame.fromOffsetRawData(frameBytes, 0, header, tagVersion);

        // Act
        const values = frame.text;

        // Assert
        assert.deepStrictEqual(values, expected);
    }

    private testFrameParseV2V3(payload: string|ByteVector, expected: string[]) {
        this.testFrameParse(2, payload, expected);
        this.testFrameParse(3, payload, expected);
    }

    private testFrameParseV2V3WithSettings(settings: PartialSettings, payload: string, expected: string[]) {
        const action = () => { this.testFrameParseV2V3(payload, expected); };
        this.testWithSettings(settings, action);
    }

    private testFrameParseV4(fields: string[], expected: string[]) {
        const payload = ByteVector.concatenate(
            StringType.UTF16BE,
            ... this.getDelimitedStrings(fields)
        );

        this.testFrameParse(4, payload, expected);
    }

    private testFrameRender(tagVersion: number, fields: string[], expected: string) {
        // Arrange
        const frame = GenreFrame.fromEncoding();
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

    private testFrameRenderV4(fields: string[], expected: string[]) {
        // Arrange
        const frame = GenreFrame.fromEncoding();
        frame.textEncoding = StringType.UTF16BE;
        frame.text = fields;

        // Act
        const result = frame.render(4);

        // Assert
        const expectedBody = ByteVector.concatenate(
            StringType.UTF16BE,
            ... this.getDelimitedStrings(expected)
        );

        const expectedHeader = Id3v2FrameHeader.fromFrameIdentifier(FrameIdentifiers.TCON);
        expectedHeader.frameSize = expectedBody.length;

        const expectedBytes = ByteVector.concatenate(
            expectedHeader.render(4),
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

    private testFrameRenderV4WithSettings(settings: PartialSettings, fields: string[], expected: string[]) {
        const action = () => { this.testFrameRenderV4(fields, expected); };
        this.testWithSettings(settings, action);
    }

    private getDelimitedStrings(fields: string[]): Array<ByteVector|number> {
        const parts = [];
        for (let i = 0; i < fields.length; i++) {
            if (i !== 0) {
                parts.push(ByteVector.getTextDelimiter(StringType.UTF16BE));
            }

            if (fields[i]) {
                parts.push(ByteVector.fromString(fields[i], StringType.UTF16BE));
            }
        }

        return parts;
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
