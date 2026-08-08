import {params, suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import Frame from "../../src/id3v2/frames/frame";
import FrameConstructorTests from "./frameConstructorTests";
import FrameHeader from "../../src/id3v2/frames/frameHeader";
import GenreFrame from "../../src/id3v2/frames/genreFrame";
import Id3v2Settings from "../../src/id3v2/id3v2Settings";
import UnknownFrame from "../../src/id3v2/frames/unknownFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {FrameFlags, Id3v2Version} from "../../src/id3v2/enums";
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

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    public parse_v23_emptyFrame(version: Id3v2Version) {
        this.testFrameParse(version, ByteVector.concatenate(StringType.UTF16BE), []);
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    public parse_v23_StartsWithDelimiter(version: Id3v2Version) {
        const payload = ByteVector.concatenate(
            StringType.UTF16BE,
            ByteVector.getTextDelimiter(StringType.UTF16BE),
            ByteVector.fromString("foo", StringType.UTF16BE)
        );

        this.testFrameParse(version, payload, []);
    }

    @params([Id3v2Version.V22, "Classical", ["Classical"]], "string_v2")
    @params([Id3v2Version.V23, "Classical", ["Classical"]], "string_v3")
    @params([Id3v2Version.V22, "(foo)",     ["(foo)"]],     "invalidParentheses_v2")
    @params([Id3v2Version.V23, "(foo)",     ["(foo)"]],     "invalidParentheses_v3")
    public parse_v23_singleTerm_general([version, input, output]: [Id3v2Version, string, string[]]) {
        this.testFrameParse(version, input, output);
    }

    @params([Id3v2Version.V22, "(32)",      ["Classical"]],      "v2")
    @params([Id3v2Version.V23, "(32)",      ["Classical"]],      "v3")
    @params([Id3v2Version.V22, "(32)foo",   ["Classical foo"]],  "Refinement_v2")
    @params([Id3v2Version.V23, "(32)foo",   ["Classical foo"]],  "Refinement_v3")
    @params([Id3v2Version.V22, "(32)f((oo", ["Classical f(oo"]], "Refinement_Escaped_v2")
    @params([Id3v2Version.V23, "(32)f((oo", ["Classical f(oo"]], "Refinement_Escaped_v3")
    @params([Id3v2Version.V22, "(32)f(oo",  ["Classical f(oo"]], "Refinement_Unescaped_v2")
    @params([Id3v2Version.V23, "(32)f(oo",  ["Classical f(oo"]], "Refinement_Unescaped_v3")
    public parse_v23_singleTerm_oneStandardNumber([version, input, output]: [Id3v2Version, string, string[]]) {
        this.testFrameParse(version, input, output);
    }

    /* eslint-disable max-len */
    @params([Id3v2Version.V22, "(32)(33)",           ["Classical", "Instrumental"]],           "v2")
    @params([Id3v2Version.V23, "(32)(33)",           ["Classical", "Instrumental"]],           "v2")
    @params([Id3v2Version.V22, "(32)foo(33)",        ["Classical foo", "Instrumental"]],       "1stRefinement_v2")
    @params([Id3v2Version.V23, "(32)foo(33)",        ["Classical foo", "Instrumental"]],       "1stRefinement_v3")
    @params([Id3v2Version.V22, "(32)f((oo(33)",      ["Classical f(oo", "Instrumental"]],      "1stRefinement_Escaped_v2")
    @params([Id3v2Version.V23, "(32)f((oo(33)",      ["Classical f(oo", "Instrumental"]],      "1stRefinement_Escaped_v3")
    @params([Id3v2Version.V22, "(32)f(oo(33)",       ["Classical f(oo(33)"]],                  "1stRefinement_Unescaped_v2")
    @params([Id3v2Version.V23, "(32)f(oo(33)",       ["Classical f(oo(33)"]],                  "1stRefinement_Unescaped_v3")
    @params([Id3v2Version.V22, "(32)(33)bar",        ["Classical", "Instrumental bar"]],       "2ndRefinement_v2")
    @params([Id3v2Version.V23, "(32)(33)bar",        ["Classical", "Instrumental bar"]],       "2ndRefinement_v3")
    @params([Id3v2Version.V22, "(32)(33)b((ar",      ["Classical", "Instrumental b(ar"]],      "2ndRefinement_Escaped_v2")
    @params([Id3v2Version.V23, "(32)(33)b((ar",      ["Classical", "Instrumental b(ar"]],      "2ndRefinement_Escaped_v3")
    @params([Id3v2Version.V22, "(32)(33)b(ar",       ["Classical", "Instrumental b(ar"]],      "2ndRefinement_Unescaped_v2")
    @params([Id3v2Version.V23, "(32)(33)b(ar",       ["Classical", "Instrumental b(ar"]],      "2ndRefinement_Unescaped_v3")
    @params([Id3v2Version.V22, "(32)foo(33)bar",     ["Classical foo", "Instrumental bar"]],   "BothRefinement_v2")
    @params([Id3v2Version.V23, "(32)foo(33)bar",     ["Classical foo", "Instrumental bar"]],   "BothRefinement_v3")
    @params([Id3v2Version.V22, "(32)f((oo(33)b((ar", ["Classical f(oo", "Instrumental b(ar"]], "BothRefinement_Escaped_v2")
    @params([Id3v2Version.V23, "(32)f((oo(33)b((ar", ["Classical f(oo", "Instrumental b(ar"]], "BothRefinement_Escaped_v3")
    @params([Id3v2Version.V22, "(32)f(oo(33)b(ar",   ["Classical f(oo(33)b(ar"]],              "BothRefinement_Unescaped_v2")
    @params([Id3v2Version.V23, "(32)f(oo(33)b(ar",   ["Classical f(oo(33)b(ar"]],              "BothRefinement_Unescaped_v3")
    /* eslint-enable max-len */
    public parse_v23_singleTerm_multipleStandardNumber([version, input, output]: [Id3v2Version, string, string[]]) {
        this.testFrameParse(version, input, output);
    }

    @params([Id3v2Version.V22, "(CR)",               ["Cover"]],                    "Single_v2")
    @params([Id3v2Version.V23, "(CR)",               ["Cover"]],                    "Single_v3")
    @params([Id3v2Version.V22, "(RX)",               ["Remix"]],                    "Single_v2")
    @params([Id3v2Version.V23, "(RX)",               ["Remix"]],                    "Single_v3")
    @params([Id3v2Version.V22, "(CR)(RX)",           ["Cover", "Remix"]],           "Multiple_v2")
    @params([Id3v2Version.V23, "(CR)(RX)",           ["Cover", "Remix"]],           "Multiple_v3")
    @params([Id3v2Version.V22, "(CR)f((oo(RX)b((ar", ["Cover f(oo", "Remix b(ar"]], "Multiple_EscapedRefinement_v2")
    @params([Id3v2Version.V23, "(CR)f((oo(RX)b((ar", ["Cover f(oo", "Remix b(ar"]], "Multiple_EscapedRefinement_v3")
    @params([Id3v2Version.V22, "(CR)f(oo(RX)b(ar",   ["Cover f(oo(RX)b(ar"]],       "Multiple_UnescapedRefinement_v2")
    @params([Id3v2Version.V23, "(CR)f(oo(RX)b(ar",   ["Cover f(oo(RX)b(ar"]],       "Multiple_UnescapedRefinement_v3")
    public parse_v23_singleTerm_remixCover([version, input, output]: [Id3v2Version, string, string[]]) {
        this.testFrameParse(version, input, output);
    }

    @params([Id3v2Version.V22, false, "32",         ["32"]],         "disabled_v2")
    @params([Id3v2Version.V23, false, "32",         ["32"]],         "disabled_v3")
    @params([Id3v2Version.V22, true,  "32",         ["Classical"]],  "enabled_v2")
    @params([Id3v2Version.V23, true,  "32",         ["Classical"]],  "enabled_v3")
    @params([Id3v2Version.V22, false, "32foo",      ["32foo"]],      "singleWithString_disabled_v2")
    @params([Id3v2Version.V23, false, "32foo",      ["32foo"]],      "singleWithString_disabled_v3")
    @params([Id3v2Version.V22, true,  "32foo",      ["32foo"]],      "singleWithString_enabled_v2")
    @params([Id3v2Version.V23, true,  "32foo",      ["32foo"]],      "singleWithString_enabled_v3")
    @params([Id3v2Version.V22, false, "32foo33bar", ["32foo33bar"]], "multipleWithString_disabled_v2")
    @params([Id3v2Version.V23, false, "32foo33bar", ["32foo33bar"]], "multipleWithString_disabled_v3")
    @params([Id3v2Version.V22, true,  "32foo33bar", ["32foo33bar"]], "multipleWithString_enabled_v2")
    @params([Id3v2Version.V23, true,  "32foo33bar", ["32foo33bar"]], "multipleWithString_enabled_v3")
    public parse_v23_singleTerm_nonstandardNumber(
        [version, numericGenres, input, output]: [Id3v2Version, boolean, string, string[]]
    ) {
        const partialSettings: PartialSettings = {useNonStandardV2V3NumericGenres: numericGenres};
        this.testFrameParse_v23WithSettings(version, partialSettings, input, output);
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    public parse_v23_multipleTerms_nonStandardSeparatorEnabled(version: Id3v2Version) {
        const partialSettings: PartialSettings = {useNonStandardV2V3GenreSeparators: true};
        this.testFrameParse_v23WithSettings(
            version,
            partialSettings,
            "(32)Fux(33)Bux;34/Foo;Bar/Baz",
            ["Classical Fux", "Instrumental Bux", "Acid", "Foo", "Bar", "Baz"]
        );
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    public parse_v23_multipleTerms_nonStandardSeparatorDisabled(version: Id3v2Version) {
        const partialSettings: PartialSettings = {useNonStandardV2V3GenreSeparators: false};
        this.testFrameParse_v23WithSettings(
            version,
            partialSettings,
            "(32)Fux(33)Bux;34/Foo;Bar/Baz",
            ["Classical Fux", "Instrumental Bux;34/Foo;Bar/Baz"]
        );
    }

    @params(Id3v2Version.V22, "v2")
    @params(Id3v2Version.V23, "v3")
    public parse_v23_multipleTerm_trailingNulls(version: Id3v2Version) {
        const payload = ByteVector.concatenate(
            StringType.UTF16BE,
            ByteVector.fromString("(32)", StringType.UTF16BE),
            ByteVector.getTextDelimiter(StringType.UTF16BE),
            ByteVector.getTextDelimiter(StringType.UTF16BE)
        );

        this.testFrameParse(version, payload, ["Classical"]);
    }

    @test
    public parse_v4_listOfStrings() {
        this.testFrameParse_v4(["32", "(32)", "some genre"], ["Classical", "(32)", "some genre"]);
    }

    @params([["CR"],       ["Cover"]],    "cover")
    @params([["RX"],       ["Remix"]],    "remix")
    @params([["CR foo"],   ["CR foo"]],   "cover_refined")
    @params([["RX foo"],   ["RX foo"]],   "remix_refined")
    @params([["(CR)"],     ["(CR)"]],     "cover_parenthesis")
    @params([["(RX)"],     ["(RX)"]],     "remox_parenthesis")
    @params([["CR f((oo"], ["CR f((oo"]], "cover_escaped")
    @params([["RX f((oo"], ["RX f((oo"]], "remix_escaped")
    @params([["CR f(oo"],  ["CR f(oo"]],  "cover_unescaped")
    @params([["RX f(oo"],  ["RX f(oo"]],  "remix_unescaped")
    public parse_v4_coverRemix([input, output]: [string[], string[]]) {
        this.testFrameParse_v4(input, output);
    }

    @test
    public parse_v4_trailingNulls() {
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

    @params([Id3v2Version.V22, ["foobarbaz"],       "foobarbaz"],   "v2")
    @params([Id3v2Version.V23, ["foobarbaz"],       "foobarbaz"],   "v3")
    @params([Id3v2Version.V22, ["f()()"],           "f(()(()"],     "singleParentheses_v2")
    @params([Id3v2Version.V23, ["f()()"],           "f(()(()"],     "singleParentheses_v3")
    @params([Id3v2Version.V22, ["foo","bar","baz"], "foo;bar;baz"], "multiple_v2")
    @params([Id3v2Version.V23, ["foo","bar","baz"], "foo;bar;baz"], "multiple_v3")
    public render_v23_general([version, input, output]: [Id3v2Version, string[], string]) {
        this.testFrameRender(version, input, output);
    }

    /* eslint-disable max-len */
    @params([Id3v2Version.V22, ["Classical"],                         "(32)"],                           "single_v2")
    @params([Id3v2Version.V23, ["Classical"],                         "(32)"],                           "single_v3")
    @params([Id3v2Version.V22, ["Cover"],                             "(CR)"],                           "singleCover_v2")
    @params([Id3v2Version.V23, ["Cover"],                             "(CR)"],                           "singleCover_v3")
    @params([Id3v2Version.V22, ["Remix"],                             "(RX)"],                           "singleRemix_v2")
    @params([Id3v2Version.V23, ["Remix"],                             "(RX)"],                           "singleRemix_v3")
    @params([Id3v2Version.V22, ["Classical", "Instrumental"],         "(32)(33)"],                       "multiple_v2")
    @params([Id3v2Version.V23, ["Classical", "Instrumental"],         "(32)(33)"],                       "multiple_v3")
    @params([Id3v2Version.V22, ["Classical foo", "Instrumental bar"], "Classical foo;Instrumental bar"], "multipleWithRefinement_v2")
    @params([Id3v2Version.V23, ["Classical foo", "Instrumental bar"], "Classical foo;Instrumental bar"], "multipleWithRefinement_v3")
    /* eslint-enable */
    public render_v23_numericString_useNumericGenresEnabled(
        [version, input, output]: [Id3v2Version, string[], string]
    ) {
        const settings: PartialSettings = { useNumericGenres: true };
        this.testFrameRender_v23WithSettings(version, settings, input, output);
    }

    /* eslint-disable max-len */
    @params([Id3v2Version.V22, ["Classical"],                         "Classical"],                      "single_v2")
    @params([Id3v2Version.V23, ["Classical"],                         "Classical"],                      "single_v3")
    @params([Id3v2Version.V22, ["Cover"],                             "Cover"],                          "singleCover_v2")
    @params([Id3v2Version.V23, ["Cover"],                             "Cover"],                          "singleCover_v3")
    @params([Id3v2Version.V22, ["Remix"],                             "Remix"],                          "singleRemix_v2")
    @params([Id3v2Version.V23, ["Remix"],                             "Remix"],                          "singleRemix_v3")
    @params([Id3v2Version.V22, ["Classical", "Instrumental"],         "Classical;Instrumental"],         "multiple_v2")
    @params([Id3v2Version.V23, ["Classical", "Instrumental"],         "Classical;Instrumental"],         "multiple_v3")
    @params([Id3v2Version.V22, ["Classical foo", "Instrumental bar"], "Classical foo;Instrumental bar"], "multipleWithRefinement_v2")
    @params([Id3v2Version.V23, ["Classical foo", "Instrumental bar"], "Classical foo;Instrumental bar"], "multipleWithRefinement_v3")
    /* eslint-enable */
    public render_v23_singleTerm_numericString_useNumericGenresDisabled(
        [version, input, output]: [Id3v2Version, string[], string]
    ) {
        const settings: PartialSettings = { useNumericGenres: false };
        this.testFrameRender_v23WithSettings(version, settings, input, output);
    }

    @params([["foobarbaz"],                 ["foobarbaz"]],                 "single")
    @params([["foo", "bar", "baz"],         ["foo", "bar",  "baz"]],        "multiple")
    @params([["foo", undefined, "", "bar"], ["foo", undefined, "", "bar"]], "multipleWithFalsy")
    public render_v4_general([input, output]: [string[], string[]]) {
        this.testFrameRender_v4(input, output);
    }

    @params([["Classical"],                         ["32"]],                                "single")
    @params([["Cover"],                             ["CR"]],                                "cover")
    @params([["Remix"],                             ["RX"]],                                "remix")
    @params([["Classical", "Instrumental", "foo"],  ["32", "33", "foo"]],                   "multiple")
    @params([["Classical foo", "Instrumental foo"], ["Classical foo", "Instrumental foo"], "multipleWithRefinement"])
    public render_v4_numericString_useNumericGenresEnabled([input, output]: [string[], string[]]) {
        const settings: PartialSettings = { useNumericGenres: true };
        this.testFrameRender_v4WithSettings(settings, input, output);
    }

    /* eslint-disable max-len */
    @params([["Classical"],                         ["Classical"]],                        "single")
    @params([["Cover"],                             ["CR"]],                               "cover") // @TODO: Quadruple check this is correct if numeric genres are disabled
    @params([["Remix"],                             ["RX"]],                               "remix")
    @params([["Classical", "Instrumental", "foo"],  ["Classical", "Instrumental", "foo"]], "multiple")
    @params([["Classical foo", "Instrumental foo"], ["Classical foo", "Instrumental foo"], "multipleWithRefinement"])
    /* eslint-enable */
    public render_v4_numericString_useNumericGenresDisabled([input, output]: [string[], string[]]) {
        const settings: PartialSettings = { useNumericGenres: false };
        this.testFrameRender_v4WithSettings(settings, input, output);
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
        const frame1 = UnknownFrame.fromFields(FrameIdentifiers.RVRB);
        const frame2 = UnknownFrame.fromFields(FrameIdentifiers.RVRB);
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
        const frame1 = UnknownFrame.fromFields(FrameIdentifiers.RVRB);
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
        const frame1 = UnknownFrame.fromFields(FrameIdentifiers.RVRB);
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

    private testFrameParse(tagVersion: Id3v2Version, payload: string|ByteVector, expected: string[]) {
        // Arrange
        const fieldBytes = payload instanceof ByteVector
            ? payload
            : ByteVector.concatenate(StringType.UTF16BE, ByteVector.fromString(payload, StringType.UTF16BE));
        const header = new FrameHeader(FrameIdentifiers.TCON, FrameFlags.None, fieldBytes.length);

        // Act
        const frame = GenreFrame.fromFieldBytes(header, fieldBytes, tagVersion);

        // Assert
        assertFrame(frame, expected, StringType.UTF16BE);
    }

    private testFrameParse_v23WithSettings(
        version: Id3v2Version,
        settings: PartialSettings,
        payload: string,
        expected: string[]
    ) {
        const action = () => { this.testFrameParse(version, payload, expected); };
        this.testWithSettings(settings, action);
    }

    private testFrameParse_v4(fields: string[], expected: string[]) {
        const payload = ByteVector.concatenate(
            StringType.UTF16BE,
            ... this.getDelimitedStrings(fields)
        );

        this.testFrameParse(Id3v2Version.V24, payload, expected);
    }

    private testFrameRender(tagVersion: Id3v2Version, fields: string[], expected: string) {
        // Arrange
        const frame = GenreFrame.fromFields(fields, StringType.UTF16BE);

        // Act
        const result = frame.render(tagVersion);

        // Assert
        const expectedBody = ByteVector.concatenate(
            StringType.UTF16BE,
            ByteVector.fromString(expected, StringType.UTF16BE)
        );
        const expectedHeader = new FrameHeader(FrameIdentifiers.TCON, FrameFlags.None, expectedBody.length);
        const expectedBytes = ByteVector.concatenate(expectedHeader.render(tagVersion), expectedBody);

        Testers.bvEqual(result, expectedBytes);
    }

    private testFrameRender_v23WithSettings(
        version: Id3v2Version,
        settings: PartialSettings,
        fields: string[], expected: string
    ) {
        const action = () => { this.testFrameRender(version, fields, expected); };
        this.testWithSettings(settings, action);
    }

    private testFrameRender_v4(fields: string[], expected: string[]) {
        // Arrange
        const frame = GenreFrame.fromFields(fields, StringType.UTF16BE);

        // Act
        const result = frame.render(Id3v2Version.V24);

        // Assert
        const expectedBody = ByteVector.concatenate(
            StringType.UTF16BE,
            ... this.getDelimitedStrings(expected)
        );
        const expectedHeader = new FrameHeader(FrameIdentifiers.TCON, FrameFlags.None, expectedBody.length);
        const expectedBytes = ByteVector.concatenate(expectedHeader.render(4), expectedBody);

        Testers.bvEqual(result, expectedBytes);
    }

    private testFrameRender_v4WithSettings(
        settings: PartialSettings,
        fields: string[],
        expected: string[]
    ) {
        const action = () => { this.testFrameRender_v4(fields, expected); };
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
