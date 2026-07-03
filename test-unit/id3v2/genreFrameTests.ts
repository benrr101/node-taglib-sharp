import {params, suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import Frame from "../../src/id3v2/frames/frame";
import FrameConstructorTests from "./frameConstructorTests";
import GenreFrame from "../../src/id3v2/frames/genreFrame";
import Id3v2Settings from "../../src/id3v2/id3v2Settings";
import UnknownFrame from "../../src/id3v2/frames/unknownFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {Id3v2FrameFlags, Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Testers} from "../utilities/testers";

const assertFrame = (frame: GenreFrame, text: string[], textEncoding: StringType) => {
    assert.isOk(frame);
    assert.instanceOf<GenreFrame>(frame, GenreFrame);
    assert.strictEqual(frame.frameId, FrameIdentifiers.TCON);

    assert.deepStrictEqual(frame.text, text);
    assert.strictEqual(frame.textEncoding, textEncoding);
}

@suite
class Id3v2_GenreFrameTests extends FrameConstructorTests {

    get fromFieldBytes() { return GenreFrame.fromFieldBytes }

    // region Property tests

    @test
    public fromFields_nothing() {
        // Act
        const frame = GenreFrame.fromFields();

        // Assert
        assertFrame(frame, [], Id3v2Settings.defaultEncoding);
    }

    @test
    public fromFields_withText() {
        // Act
        const frame = GenreFrame.fromFields(["foo", "bar"]);

        // Assert
        assertFrame(frame, ["foo", "bar"], Id3v2Settings.defaultEncoding);
    }

    @test
    public fromFields_withTextEncoding() {
        // Act
        const frame = GenreFrame.fromFields(["foo", "bar"], StringType.UTF16BE);

        // Assert
        assertFrame(frame, ["foo", "bar"], StringType.UTF16BE);
    }

    @test
    public text_returnsCopy() {
        // Arrange
        const frame = GenreFrame.fromFields(["foo", "bar"]);

        // Act
        const text = frame.text;
        text.push("baz");

        // Assert
        assert.deepStrictEqual(frame.text, ["foo", "bar"]);
    }

    @test
    public text_setFalsyReturnsEmptyArray() {
        // Arrange
        const frame = GenreFrame.fromFields(["foo", "bar"]);

        // Act
        frame.text = undefined;

        // Assert
        assert.deepStrictEqual(frame.text, []);
    }

    @test
    public textEncoding() {
        // Arrange
        const frame = GenreFrame.fromFields(["foo", "bar"]);

        // Act
        frame.textEncoding = StringType.UTF16BE;

        // Assert
        assert.strictEqual(frame.textEncoding, StringType.UTF16BE);
    }

    // endregion

    // region Parse Tests

    @params(2, "v2")
    @params(3, "v3")
    public parse_emptyFrame(version: number) {
        this.testFrameParse(version, ByteVector.concatenate(StringType.UTF16BE), []);
    }

    @params(2, "v2")
    @params(3, "v3")
    public parse_v2V3StartsWithDelimiter(version: number) {
        const payload = ByteVector.concatenate(
            StringType.UTF16BE,
            ByteVector.getTextDelimiter(StringType.UTF16BE),
            ByteVector.fromString("foo", StringType.UTF16BE)
        );

        this.testFrameParse(version, payload, []);
    }

    @params([2, "Classical", ["Classical"]], "string_v2")
    @params([3, "Classical", ["Classical"]], "string_v3")
    @params([2, "(foo)",     ["(foo)"]],     "invalidParentheses_v2")
    @params([3, "(foo)",     ["(foo)"]],     "invalidParentheses_v3")
    public parse_singleTerm_general([version, input, output]: [number, string, string[]]) {
        this.testFrameParse(version, input, output);
    }

    @params([2, "(32)",      ["Classical"]],      "v2")
    @params([3, "(32)",      ["Classical"]],      "v3")
    @params([2, "(32)foo",   ["Classical foo"]],  "Refinement_v2")
    @params([3, "(32)foo",   ["Classical foo"]],  "Refinement_v3")
    @params([2, "(32)f((oo", ["Classical f(oo"]], "Refinement_Escaped_v2")
    @params([3, "(32)f((oo", ["Classical f(oo"]], "Refinement_Escaped_v3")
    @params([2, "(32)f(oo",  ["Classical f(oo"]], "Refinement_Unescaped_v2")
    @params([3, "(32)f(oo",  ["Classical f(oo"]], "Refinement_Unescaped_v3")
    public parse_singleTerm_oneStandardNumber([version, input, output]: [number, string, string[]]) {
        this.testFrameParse(version, input, output);
    }

    @params([2, "(32)(33)",           ["Classical", "Instrumental"]],           "v2")
    @params([3, "(32)(33)",           ["Classical", "Instrumental"]],           "v2")
    @params([2, "(32)foo(33)",        ["Classical foo", "Instrumental"]],       "1stRefinement_v2")
    @params([3, "(32)foo(33)",        ["Classical foo", "Instrumental"]],       "1stRefinement_v3")
    @params([2, "(32)f((oo(33)",      ["Classical f(oo", "Instrumental"]],      "1stRefinement_Escaped_v2")
    @params([3, "(32)f((oo(33)",      ["Classical f(oo", "Instrumental"]],      "1stRefinement_Escaped_v3")
    @params([2, "(32)f(oo(33)",       ["Classical f(oo(33)"]],                  "1stRefinement_Unescaped_v2")
    @params([3, "(32)f(oo(33)",       ["Classical f(oo(33)"]],                  "1stRefinement_Unescaped_v3")
    @params([2, "(32)(33)bar",        ["Classical", "Instrumental bar"]],       "2ndRefinement_v2")
    @params([3, "(32)(33)bar",        ["Classical", "Instrumental bar"]],       "2ndRefinement_v3")
    @params([2, "(32)(33)b((ar",      ["Classical", "Instrumental b(ar"]],      "2ndRefinement_Escaped_v2")
    @params([3, "(32)(33)b((ar",      ["Classical", "Instrumental b(ar"]],      "2ndRefinement_Escaped_v3")
    @params([2, "(32)(33)b(ar",       ["Classical", "Instrumental b(ar"]],      "2ndRefinement_Unescaped_v2")
    @params([3, "(32)(33)b(ar",       ["Classical", "Instrumental b(ar"]],      "2ndRefinement_Unescaped_v3")
    @params([2, "(32)foo(33)bar",     ["Classical foo", "Instrumental bar"]],   "BothRefinement_v2")
    @params([3, "(32)foo(33)bar",     ["Classical foo", "Instrumental bar"]],   "BothRefinement_v3")
    @params([2, "(32)f((oo(33)b((ar", ["Classical f(oo", "Instrumental b(ar"]], "BothRefinement_Escaped_v2")
    @params([3, "(32)f((oo(33)b((ar", ["Classical f(oo", "Instrumental b(ar"]], "BothRefinement_Escaped_v3")
    @params([2, "(32)f(oo(33)b(ar",   ["Classical f(oo(33)b(ar"]],              "BothRefinement_Unescaped_v2")
    @params([3, "(32)f(oo(33)b(ar",   ["Classical f(oo(33)b(ar"]],              "BothRefinement_Unescaped_v3")
    public parse_singleTerm_multipleStandardNumber([version, input, output]: [number, string, string[]]) {
        this.testFrameParse(version, input, output);
    }

    @params([2, "(CR)",               ["Cover"]],                    "Single_v2")
    @params([3, "(CR)",               ["Cover"]],                    "Single_v3")
    @params([2, "(RX)",               ["Remix"]],                    "Single_v2")
    @params([3, "(RX)",               ["Remix"]],                    "Single_v3")
    @params([2, "(CR)(RX)",           ["Cover", "Remix"]],           "Multiple_v2")
    @params([3, "(CR)(RX)",           ["Cover", "Remix"]],           "Multiple_v3")
    @params([2, "(CR)f((oo(RX)b((ar", ["Cover f(oo", "Remix b(ar"]], "Multiple_EscapedRefinement_v2")
    @params([3, "(CR)f((oo(RX)b((ar", ["Cover f(oo", "Remix b(ar"]], "Multiple_EscapedRefinement_v3")
    @params([2, "(CR)f(oo(RX)b(ar",   ["Cover f(oo(RX)b(ar"]],       "Multiple_UnescapedRefinement_v2")
    @params([3, "(CR)f(oo(RX)b(ar",   ["Cover f(oo(RX)b(ar"]],       "Multiple_UnescapedRefinement_v3")
    public parse_singleTerm_remixCover([version, input, output]: [number, string, string[]]) {
        this.testFrameParse(version, input, output);
    }

    @params([2, false, "32",         ["32"]],         "disabled_v2")
    @params([3, false, "32",         ["32"]],         "disabled_v3")
    @params([2, true,  "32",         ["Classical"]],  "enabled_v2")
    @params([3, true,  "32",         ["Classical"]],  "enabled_v3")
    @params([2, false, "32foo",      ["32foo"]],      "singleWithString_disabled_v2")
    @params([3, false, "32foo",      ["32foo"]],      "singleWithString_disabled_v3")
    @params([2, true,  "32foo",      ["32foo"]],      "singleWithString_enabled_v2")
    @params([3, true,  "32foo",      ["32foo"]],      "singleWithString_enabled_v3")
    @params([2, false, "32foo33bar", ["32foo33bar"]], "multipleWithString_disabled_v2")
    @params([3, false, "32foo33bar", ["32foo33bar"]], "multipleWithString_disabled_v3")
    @params([2, true,  "32foo33bar", ["32foo33bar"]], "multipleWithString_enabled_v2")
    @params([3, true,  "32foo33bar", ["32foo33bar"]], "multipleWithString_enabled_v3")
    public parse_singleTerm_nonstandardNumber(
        [version, numericGenres, input, output]: [number, boolean, string,string[]]
    ) {
        const partialSettings: PartialSettings = {useNonStandardV2V3NumericGenres: numericGenres};
        this.testFrameParseWithSettings(version, partialSettings, input, output);
    }

    @params(2, "v2")
    @params(3, "v3")
    public parse_multipleTerms_nonStandardSeparatorEnabled(version: number) {
        const partialSettings: PartialSettings = {useNonStandardV2V3GenreSeparators: true};
        this.testFrameParseWithSettings(
            version,
            partialSettings,
            "(32)Fux(33)Bux;34/Foo;Bar/Baz",
            ["Classical Fux", "Instrumental Bux", "Acid", "Foo", "Bar", "Baz"]
        );
    }

    @params(2, "v2")
    @params(3, "v3")
    public parse_multipleTerms_nonStandardSeparatorDisabled(version: number) {
        const partialSettings: PartialSettings = {useNonStandardV2V3GenreSeparators: false};
        this.testFrameParseWithSettings(
            version,
            partialSettings,
            "(32)Fux(33)Bux;34/Foo;Bar/Baz",
            ["Classical Fux", "Instrumental Bux;34/Foo;Bar/Baz"]
        );
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

    @params(["CR", "Cover"], "Cover")
    @params(["RX", "Remix"], "Remix")
    public parse_v4CoverRemix([input, output]: [string, string]) {
        this.testFrameParse(4, input, [output]);
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
        const frame = GenreFrame.fromFields(["foo", "bar"], StringType.UTF16BE);

        // Act
        const output = <GenreFrame> frame.clone();

        // Assert
        assertFrame(output, frame.text, frame.textEncoding);
    }

    @test
    public filterFrames_falsyFrames() {
        // Act/Assert
        Testers.testTruthy((v: Frame[]) => { GenreFrame.filterFrames(v); });
    }

    @test
    public filterFrames_noFrames() {
        // Arrange
        const frames: Frame[] = [];

        // Act
        const output = GenreFrame.filterFrames(frames);

        // Assert
        assert.isArray(output);
        assert.isEmpty(output);
    }

    @test
    public filterFrames_noMatch() {
        // Arrange
        const frame1 = UnknownFrame.fromData(FrameIdentifiers.RVRB, ByteVector.fromUint(123));
        const frame2 = UnknownFrame.fromData(FrameIdentifiers.RVRB, ByteVector.fromUint(234));
        const frames = [frame1, frame2];

        // Act
        const result = GenreFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.isEmpty(result);
    }

    @test
    public filterFrames_singleMatch() {
        // Arrange
        const frame1 = UnknownFrame.fromData(FrameIdentifiers.RVRB, ByteVector.fromUint(123));
        const frame2 = GenreFrame.fromFields();
        const frames = [frame1, frame2];

        // Act
        const result = GenreFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame2]);
    }

    @test
    public filterFrames_multipleMatches() {
        // Arrange
        const frame1 = UnknownFrame.fromData(FrameIdentifiers.RVRB, ByteVector.fromUint(123));
        const frame2 = GenreFrame.fromFields();
        const frame3 = GenreFrame.fromFields();

        const frames = [frame1, frame2, frame3];

        // Act
        const result = GenreFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame2, frame3]);
    }

    @test
    public filterFrames_allMatches() {
        // Arrange
        const frame1 = GenreFrame.fromFields();
        const frame2 = GenreFrame.fromFields();
        const frames = [frame1, frame2];

        // Act
        const result = GenreFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame1, frame2]);
    }

    @test
    public toString_returnsSemicolonSeparatedText() {
        // Arrange
        const frame = GenreFrame.fromFields(["foo", "bar"]);

        // Act
        const output = frame.toString();

        // Assert
        assert.strictEqual(output, "foo; bar");
    }

    // endregion

    private testFrameParse(tagVersion: number, payload: string|ByteVector, expected: string[]) {
        // Arrange
        const fieldBytes = payload instanceof ByteVector
            ? payload
            : ByteVector.concatenate(StringType.UTF16BE, ByteVector.fromString(payload, StringType.UTF16BE));
        const header = new Id3v2FrameHeader(FrameIdentifiers.TCON, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = GenreFrame.fromFieldBytes(header, fieldBytes, tagVersion);

        // Assert
        assertFrame(frame, expected, StringType.UTF16BE);
    }

    private testFrameParseWithSettings(version: number, settings: PartialSettings, payload: string, expected: string[]) {
        const action = () => { this.testFrameParse(version, payload, expected); };
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
