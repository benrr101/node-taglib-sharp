import * as Chai from "chai";
import {suite, test} from "@testdeck/mocha";

import FrameConstructorTests from "./frameConstructorTests";
import Id3v2Settings from "../../src/id3v2/id3v2Settings";
import PropertyTests from "../utilities/propertyTests";
import {TextInformationFrame} from "../../src/id3v2/frames/textInformationFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {Frame, FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifier, FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Testers} from "../utilities/testers";

// Setup chai
const assert = Chai.assert;

function getTestFrame(): TextInformationFrame {
    const header = new Id3v2FrameHeader(FrameIdentifiers.TCOP);
    header.frameSize = 8;
    const data = ByteVector.concatenate(
        header.render(4),
        StringType.Latin1,
        ByteVector.fromString("foo", StringType.Latin1),
        ByteVector.getTextDelimiter(StringType.Latin1),
        ByteVector.fromString("bar", StringType.Latin1),
    );

    return TextInformationFrame.fromRawData(data, 4);
}

@suite class Id3v2_TextInformationFrame_ConstructorTests extends FrameConstructorTests {
    public get fromOffsetRawData(): (d: ByteVector, o: number, h: Id3v2FrameHeader, v: number) => Frame {
        return TextInformationFrame.fromOffsetRawData;
    }

    public get fromRawData(): (d: ByteVector, v: number) => Frame {
        return TextInformationFrame.fromRawData;
    }

    @test
    public fromIdentifier_noEncoding_returnsFrameWithDefaultEncoding() {
        // Act
        const frame = TextInformationFrame.fromIdentifier(FrameIdentifiers.TCOP);

        // Assert
        assert.isOk(frame);
        assert.strictEqual(frame.frameClassType, FrameClassType.TextInformationFrame);
        assert.strictEqual(frame.frameId, FrameIdentifiers.TCOP);

        assert.isOk(frame.text);
        assert.isArray(frame.text);
        assert.isEmpty(frame.text);
        assert.strictEqual(frame.textEncoding, Id3v2Settings.defaultEncoding);
    }

    @test
    public fromIdentifier_withEncoding_returnsFrameWithProvidedEncoding() {
        // Act
        const frame = TextInformationFrame.fromIdentifier(FrameIdentifiers.TCOP, StringType.Latin1);

        // Assert
        Id3v2_TextInformationFrame_ConstructorTests.assertFrame(frame, FrameIdentifiers.TCOP, []);
    }

    @test
    public fromRawData_emptyFrameByLength_returnsEmptyFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.TCOP);
        header.frameSize = 1;
        const data = ByteVector.concatenate(
            header.render(3),
            StringType.Latin1
        );

        // Act
        const frame = TextInformationFrame.fromRawData(data, 3);

        // Assert
        Id3v2_TextInformationFrame_ConstructorTests.assertFrame(frame, FrameIdentifiers.TCOP, []);
    }

    @test
    public fromRawData_emptyFrameByContents_returnsEmptyFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.TCOP);
        header.frameSize = 3;
        const data = ByteVector.concatenate(
            header.render(3),
            StringType.Latin1,
            0x0, 0x0
        );

        // Act
        const frame = TextInformationFrame.fromRawData(data, 3);

        // Assert
        Id3v2_TextInformationFrame_ConstructorTests.assertFrame(frame, FrameIdentifiers.TCOP, []);
    }

    @test
    public fromRawData_v4NotTxxx_returnsFrameSplitByDelimiter() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.TCOP);
        header.frameSize = 17;
        const data = ByteVector.concatenate(
            header.render(4),
            StringType.UTF16BE,
            ByteVector.fromString("fux", StringType.UTF16BE),
            ByteVector.getTextDelimiter(StringType.UTF16BE),
            ByteVector.fromString("bux", StringType.UTF16BE),
            0x0, 0x0,   // Extra nulls to trigger null stripping logic
        );

        // Act
        const frame = TextInformationFrame.fromRawData(data, 4);

        // Assert
        Id3v2_TextInformationFrame_ConstructorTests.assertFrame(
            frame,
            FrameIdentifiers.TCOP,
            ["fux", "bux"],
            StringType.UTF16BE
        );
    }

    @test
    public fromRawData_txxx_returnsFrameSplitByDelimiter() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.TXXX);
        header.frameSize = 17;
        const data = ByteVector.concatenate(
            header.render(4),
            StringType.UTF16BE,
            ByteVector.fromString("fux", StringType.UTF16BE),
            ByteVector.getTextDelimiter(StringType.UTF16BE),
            ByteVector.fromString("bux", StringType.UTF16BE),
            0x0, 0x0,   // Extra nulls to trigger null stripping logic
        );

        // Act
        const frame = TextInformationFrame.fromRawData(data, 4);

        // Assert
        Id3v2_TextInformationFrame_ConstructorTests.assertFrame(
            frame,
            FrameIdentifiers.TXXX,
            ["fux", "bux"],
            StringType.UTF16BE
        );
    }

    @test
    public fromRawData_v3SplitType_returnsFrameSplitBySlash() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.TCOM);
        header.frameSize = 8;
        const data = ByteVector.concatenate(
            header.render(3),
            StringType.Latin1,
            ByteVector.fromString("fux/bux", StringType.Latin1)
        );

        // Act
        const frame = TextInformationFrame.fromRawData(data, 3);

        // Assert
        Id3v2_TextInformationFrame_ConstructorTests.assertFrame(frame, FrameIdentifiers.TCOM, ["fux", "bux"]);
    }

    @test
    public fromRawData_v3TconNonStandardSeparatorEnabled_returnsListOfStringsSeparatorsSplit() {
        // Arrange
        // - Store the original settings
        const originalNonStandardSeparatorSetting = Id3v2Settings.useNonStandardV2V3GenreSeparators;
        Id3v2Settings.useNonStandardV2V3GenreSeparators = true;

        // - Let's get crazy and try to handle all the cases at once
        const header = new Id3v2FrameHeader(FrameIdentifiers.TCON);
        header.frameSize = 161;
        const data = ByteVector.concatenate(
            header.render(3),
            StringType.UTF16BE,
            ByteVector.fromString(
                "(32)Classical(CR)(RX)Whoa here's some cra((z)y string;here's another/ / one more",
                StringType.UTF16BE
            )
        );

        try {
            // Act
            const frame = TextInformationFrame.fromRawData(data, 3);

            // Assert
            Id3v2_TextInformationFrame_ConstructorTests.assertFrame(
                frame,
                FrameIdentifiers.TCON,
                [
                    "Classical",
                    "Cover",
                    "Remix",
                    "Whoa here's some cra(z)y string",
                    "here's another",
                    "one more"
                ],
                StringType.UTF16BE
            );
        } finally {
            // Cleanup - Restore settings
            Id3v2Settings.useNonStandardV2V3GenreSeparators = originalNonStandardSeparatorSetting;
        }
    }

    @test
    public fromRawData_v3TconNonStandardSeparatorDisabled_returnsListOfStringsSeparatorsNotSplit() {
        // Arrange
        // - Store the original settings
        const originalNonStandardSeparatorSetting = Id3v2Settings.useNonStandardV2V3GenreSeparators;
        Id3v2Settings.useNonStandardV2V3GenreSeparators = false;

        // - Let's get crazy and try to handle all the cases at once
        const header = new Id3v2FrameHeader(FrameIdentifiers.TCON);
        header.frameSize = 161;
        const data = ByteVector.concatenate(
            header.render(3),
            StringType.UTF16BE,
            ByteVector.fromString(
                "(32)Classical(CR)(RX)Whoa here's some cra((z)y string;here's another/ / one more",
                StringType.UTF16BE
            )
        );

        try {
            // Act
            const frame = TextInformationFrame.fromRawData(data, 3);

            // Assert
            Id3v2_TextInformationFrame_ConstructorTests.assertFrame(
                frame,
                FrameIdentifiers.TCON,
                [
                    "Classical",
                    "Cover",
                    "Remix",
                    "Whoa here's some cra(z)y string;here's another/ / one more"
                ],
                StringType.UTF16BE
            );
        } finally {
            // Cleanup - Restore settings
            Id3v2Settings.useNonStandardV2V3GenreSeparators = originalNonStandardSeparatorSetting;
        }
    }

    @test
    public fromRawData_v3TconNonStandardNumericGenresEnabled_returnsDecodedGenreList() {
        // Arrange
        // - Store the original settings
        const originalNonStandardNumericGenreSetting = Id3v2Settings.useNonStandardV2V3NumericGenres;
        Id3v2Settings.useNonStandardV2V3NumericGenres = true;

        // - Create the test frame data
        const header = new Id3v2FrameHeader(FrameIdentifiers.TCON);
        header.frameSize = 13;
        const data = ByteVector.concatenate(
            header.render(3),
            StringType.UTF16BE,
            ByteVector.fromString("(32)12", StringType.UTF16BE)
        );

        try {
            // Act
            const frame = TextInformationFrame.fromRawData(data, 3);

            // Assert
            Id3v2_TextInformationFrame_ConstructorTests.assertFrame(
                frame,
                FrameIdentifiers.TCON,
                ["Classical", "Other"],
                StringType.UTF16BE
            );
        } finally {
            // Cleanup - Restore settings
            Id3v2Settings.useNonStandardV2V3NumericGenres = originalNonStandardNumericGenreSetting;
        }
    }

    @test
    public fromRawData_v3TconNonStandardNumericGenresDisabled_returnsNumericValue() {
        // Arrange
        // - Store the original settings
        const originalNonStandardNumericGenreSetting = Id3v2Settings.useNonStandardV2V3NumericGenres;
        Id3v2Settings.useNonStandardV2V3NumericGenres = false;

        // - Create the test frame data
        const header = new Id3v2FrameHeader(FrameIdentifiers.TCON);
        header.frameSize = 13;
        const data = ByteVector.concatenate(
            header.render(3),
            StringType.UTF16BE,
            ByteVector.fromString("(32)12", StringType.UTF16BE)
        );

        try {
            // Act
            const frame = TextInformationFrame.fromRawData(data, 3);

            // Assert
            Id3v2_TextInformationFrame_ConstructorTests.assertFrame(
                frame,
                FrameIdentifiers.TCON,
                ["Classical", "12"],
                StringType.UTF16BE
            );
        } finally {
            // Cleanup - Restore settings
            Id3v2Settings.useNonStandardV2V3NumericGenres = originalNonStandardNumericGenreSetting;
        }
    }

    @test
    public fromRawData_v4Tcon_returnsListOfStrings() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.TCON);
        header.frameSize = 37;
        const data = ByteVector.concatenate(
            header.render(4),
            StringType.UTF16BE,
            ByteVector.fromString("32", StringType.UTF16BE),
            ByteVector.getTextDelimiter(StringType.UTF16BE),
            ByteVector.fromString("(32)", StringType.UTF16BE),
            ByteVector.getTextDelimiter(StringType.UTF16BE),
            ByteVector.fromString("some genre", StringType.UTF16BE)
        );

        // Act
        const frame = TextInformationFrame.fromRawData(data, 4);

        // Assert
        Id3v2_TextInformationFrame_ConstructorTests.assertFrame(
            frame,
            FrameIdentifiers.TCON,
            [
                "Classical",
                "(32)",
                "some genre"
            ],
            StringType.UTF16BE
        );
    }

    @test
    public fromOffsetRawData_v4_returnsFrameSplitByDelimiter() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.TCOP);
        header.frameSize = 19;
        const data = ByteVector.concatenate(
            header.render(4),
            0x00, 0x00,
            StringType.UTF16BE,
            ByteVector.fromString("fux", StringType.UTF16BE),
            ByteVector.getTextDelimiter(StringType.UTF16BE),
            ByteVector.fromString("bux", StringType.UTF16BE),
            0x0, 0x0,   // Extra nulls to trigger null stripping logic
        );

        // Act
        const frame = TextInformationFrame.fromOffsetRawData(data, 2, header, 4);

        // Assert
        Id3v2_TextInformationFrame_ConstructorTests.assertFrame(
            frame,
            FrameIdentifiers.TCOP,
            ["fux", "bux"],
            StringType.UTF16BE
        );
    }

    private static assertFrame(
        frame: TextInformationFrame,
        frameId: FrameIdentifier,
        text: string[],
        encoding: StringType = StringType.Latin1
    ): void {
        assert.isOk(frame);
        assert.strictEqual(frame.frameClassType, FrameClassType.TextInformationFrame);
        assert.strictEqual(frame.frameId, frameId);

        assert.isOk(frame.text);
        assert.deepStrictEqual(frame.text, text);
        assert.strictEqual(frame.textEncoding, encoding);
    }
}

@suite class Id3v2_TextInformationFrame_PropertyTests {
    @test
    public getText() {
        // Arrange
        const frame = getTestFrame();

        // Act
        const text = frame.text;
        text.push("new item");

        // Assert - new item not added to frame
        assert.notEqual(frame.text, text);
        assert.strictEqual(2, frame.text.length);
    }

    @test
    public setText() {
        // Arrange
        const frame = getTestFrame();

        // Act / Assert
        PropertyTests.propertyRoundTrip((v) => { frame.text = v; }, () => frame.text, ["bux", "fux"]);
    }

    @test
    public setEncoding_notRead() {
        // Arrange
        const frame = getTestFrame();

        // Act / Assert
        PropertyTests.propertyRoundTrip(
            (v) => { frame.textEncoding = v; },
            () => frame.textEncoding,
            StringType.UTF16BE
        );
    }

    @test
    public setEncoding_read() {
        // Arrange
        const frame = getTestFrame();
        const _ = frame.text;   // Force a read

        // Act / Assert
        PropertyTests.propertyRoundTrip(
            (v) => { frame.textEncoding = v; },
            () => frame.textEncoding,
            StringType.UTF16BE
        );
    }
}

@suite class Id3v2_TextInformationFrame_MethodTests {
    @test
    public clone_returnsCopy() {
        // Arrange
        const frame = getTestFrame();

        // Act
        const output = <TextInformationFrame> frame.clone();

        // Assert
        assert.ok(output);
        assert.strictEqual(output.frameClassType, FrameClassType.TextInformationFrame);
        assert.strictEqual(frame.frameId, FrameIdentifiers.TCOP);

        assert.deepStrictEqual(frame.text, output.text);
        assert.strictEqual(frame.textEncoding, output.textEncoding);
    }

    @test
    public find_falsyFrames() {
        // Act
        Testers.testTruthy((v: TextInformationFrame[]) => {
            TextInformationFrame.findTextInformationFrame(v, FrameIdentifiers.TCOP);
        });
    }

    @test
    public find_invalidIdentity() {
        // Act
        Testers.testTruthy((v: FrameIdentifier) => { TextInformationFrame.findTextInformationFrame([], v); });
    }

    @test
    public find_frameExists() {
        // Arrange
        const frames = [
            TextInformationFrame.fromIdentifier(FrameIdentifiers.TCOP),
            TextInformationFrame.fromIdentifier(FrameIdentifiers.TCOM)
        ];

        // Act
        const output = TextInformationFrame.findTextInformationFrame(frames, FrameIdentifiers.TCOM);

        // Assert
        assert.isOk(output);
        assert.equal(output, frames[1]);
    }

    @test
    public find_frameDoesNotExist() {
        // Arrange
        const frames = [
            TextInformationFrame.fromIdentifier(FrameIdentifiers.TCOP),
            TextInformationFrame.fromIdentifier(FrameIdentifiers.TCOM)
        ];

        // Act
        const output = TextInformationFrame.findTextInformationFrame(frames, FrameIdentifiers.TALB);

        // Assert
        assert.isUndefined(output);
    }

    @test
    public render_invalidVersion_throws() {
        // Arrange
        const frame = getTestFrame();

        // Act/Assert
        assert.throws(() => { frame.render(-1); });
        assert.throws(() => { frame.render(1.23); });
        assert.throws(() => { frame.render(0x100); });
    }

    @test
    public render_notRead_returnsRawData() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.TCOP);
        header.frameSize = 8;
        const data = ByteVector.concatenate(
            header.render(4),
            Id3v2Settings.defaultEncoding,
            ByteVector.fromString("fux", StringType.Latin1),
            ByteVector.getTextDelimiter(StringType.Latin1),
            ByteVector.fromString("bux", StringType.Latin1),
        );
        const frame = TextInformationFrame.fromRawData(data, 4);

        // Act
        const output = frame.render(4);

        // Assert
        assert.ok(output);
        Testers.bvEqual(output, data);
    }

    // @TODO: Test for render version not same as input w/o read forces a read

    @test
    public render_readV4NotTxxx() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.TCOP);
        header.frameSize = 15;
        const data = ByteVector.concatenate(
            header.render(4),
            StringType.UTF16BE,
            ByteVector.fromString("fux", StringType.UTF16BE),
            ByteVector.getTextDelimiter(StringType.UTF16BE),
            ByteVector.fromString("bux", StringType.UTF16BE),
        );
        const frame = TextInformationFrame.fromRawData(data, 4);
        const _ = frame.text; // Force a read

        // Act
        const output = frame.render(4);

        // Assert
        assert.ok(output);
        Testers.bvEqual(output, data);
    }

    @test
    public render_readV3IsTxxxEmpty() {
        // Arrange
        let header = new Id3v2FrameHeader(FrameIdentifiers.TXXX);
        header.frameSize = 1;
        const data = ByteVector.concatenate(
            header.render(3),
            StringType.UTF8
        );
        const frame = TextInformationFrame.fromRawData(data, 3);
        const _ = frame.text; // Force a read

        // Act
        const output = frame.render(3);

        // Assert
        assert.ok(output);

        header = new Id3v2FrameHeader(FrameIdentifiers.TXXX);
        header.frameSize = 3;
        const expected = ByteVector.concatenate(
            header.render(3),
            StringType.UTF16,
            ByteVector.getTextDelimiter(StringType.UTF16)
        );

        Testers.bvEqual(output, expected);
    }

    @test
    public render_readV3IsTxxxSingleValue() {
        // Arrange
        let header = new Id3v2FrameHeader(FrameIdentifiers.TXXX);
        header.frameSize = 7;
        const data = ByteVector.concatenate(
            header.render(3),
            StringType.UTF16BE,
            ByteVector.fromString("fux", StringType.UTF16BE)
        );
        const frame = TextInformationFrame.fromRawData(data, 3);
        const _ = frame.text; // Force a read

        // Act
        const output = frame.render(3);

        // Assert
        assert.ok(output);

        header = new Id3v2FrameHeader(FrameIdentifiers.TXXX);
        header.frameSize = 9;
        const expected = ByteVector.concatenate(
            header.render(3),
            StringType.UTF16BE,
            ByteVector.fromString("fux", StringType.UTF16BE),
            ByteVector.getTextDelimiter(StringType.UTF16BE)
        );

        Testers.bvEqual(output, expected);
    }

    @test
    public render_readV3Tcon_numericGenresEnabled() {
        // Ensure numeric genres are enabled
        const oldNumericGenresValue = Id3v2Settings.useNumericGenres;
        Id3v2Settings.useNumericGenres = true;

        try {
            // Arrange
            let header = new Id3v2FrameHeader(FrameIdentifiers.TCON);
            header.frameSize = 135;
            const data = ByteVector.concatenate(
                header.render(3),
                StringType.UTF16BE,
                ByteVector.fromString(
                    "(32)Classical(CR)(32)(RX)SomeGenre;Whoa here's some cra((z)y string",
                    StringType.UTF16BE
                )
            );
            const frame = TextInformationFrame.fromRawData(data, 3);
            const _ = frame.text; // Force a read

            // Act
            const output = frame.render(3);

            // Assert
            assert.ok(output);

            header = new Id3v2FrameHeader(FrameIdentifiers.TCON);
            header.frameSize = 117;
            const expected = ByteVector.concatenate(
                header.render(3),
                StringType.UTF16BE,
                ByteVector.fromString("(32)(CR)(32)(RX)SomeGenre;Whoa here's some cra((z)y string", StringType.UTF16BE)
            );

            Testers.bvEqual(output, expected);
        } finally {
            // Cleanup - Reset numeric genres setting
            Id3v2Settings.useNumericGenres = oldNumericGenresValue;
        }
    }

    @test
    public render_readV3Tcon_numericGenresDisabled() {
        // Disable numeric genres
        const oldNumericGenresValue = Id3v2Settings.useNumericGenres;
        Id3v2Settings.useNumericGenres = false;

        try {
            // Arrange
            let header = new Id3v2FrameHeader(FrameIdentifiers.TCON);
            header.frameSize = 135;
            const data = ByteVector.concatenate(
                header.render(3),
                StringType.UTF16BE,
                ByteVector.fromString(
                    "(32)Classical(CR)(32)(RX)SomeGenre;Whoa here's some cra((z)y string",
                    StringType.UTF16BE
                )
            );
            const frame = TextInformationFrame.fromRawData(data, 3);
            const _ = frame.text; // Force a read

            // Act
            const output = frame.render(3);

            // Assert
            assert.ok(output);

            header = new Id3v2FrameHeader(FrameIdentifiers.TCON);
            header.frameSize = 141;
            const expected = ByteVector.concatenate(
                header.render(3),
                StringType.UTF16BE,
                ByteVector.fromString(
                    "(CR)(RX)Classical;Classical;SomeGenre;Whoa here's some cra((z)y string",
                    StringType.UTF16BE
                )
            );

            Testers.bvEqual(output, expected);
        } finally {
            // Cleanup: Reset numeric genres setting
            Id3v2Settings.useNumericGenres = oldNumericGenresValue;
        }
    }

    @test
    public render_readV4Tcon_numericGenresEnabled() {
        // Ensure numeric genres are enabled
        const oldNumericGenresValue = Id3v2Settings.useNumericGenres;
        Id3v2Settings.useNumericGenres = true;

        try {
            // Arrange
            let header = new Id3v2FrameHeader(FrameIdentifiers.TCON);
            header.frameSize = 135;
            const data = ByteVector.concatenate(
                header.render(3),
                StringType.UTF16BE,
                ByteVector.fromString(
                    "(32)Classical(CR)(32)(RX)SomeGenre;Whoa here's some cra((z)y string",
                    StringType.UTF16BE
                )
            );
            const frame = TextInformationFrame.fromRawData(data, 3);
            const _ = frame.text; // Force a read

            // Act
            const output = frame.render(4);

            // Assert
            assert.ok(output);

            header = new Id3v2FrameHeader(FrameIdentifiers.TCON);
            header.frameSize = 107;
            const expected = ByteVector.concatenate(
                header.render(4),
                StringType.UTF16BE,
                ByteVector.fromString("32", StringType.UTF16BE),
                ByteVector.getTextDelimiter(StringType.UTF16BE),
                ByteVector.fromString("CR", StringType.UTF16BE),
                ByteVector.getTextDelimiter(StringType.UTF16BE),
                ByteVector.fromString("32", StringType.UTF16BE),
                ByteVector.getTextDelimiter(StringType.UTF16BE),
                ByteVector.fromString("RX", StringType.UTF16BE),
                ByteVector.getTextDelimiter(StringType.UTF16BE),
                ByteVector.fromString("SomeGenre", StringType.UTF16BE),
                ByteVector.getTextDelimiter(StringType.UTF16BE),
                ByteVector.fromString("Whoa here's some cra(z)y string", StringType.UTF16BE)
            );

            Testers.bvEqual(output, expected);
        } finally {
            // Cleanup - Reset numeric genres setting
            Id3v2Settings.useNumericGenres = oldNumericGenresValue;
        }
    }

    @test
    public render_readV4Tcon_numericGenresDisabled() {
        // Ensure numeric genres are disabled
        const oldNumericGenresValue = Id3v2Settings.useNumericGenres;
        Id3v2Settings.useNumericGenres = false;

        try {
            // Arrange
            let header = new Id3v2FrameHeader(FrameIdentifiers.TCON);
            header.frameSize = 135;
            const data = ByteVector.concatenate(
                header.render(3),
                StringType.UTF16BE,
                ByteVector.fromString(
                    "(32)Classical(CR)(32)(RX)SomeGenre;Whoa here's some cra((z)y string",
                    StringType.UTF16BE
                )
            );
            const frame = TextInformationFrame.fromRawData(data, 3);
            const _ = frame.text; // Force a read

            // Act
            const output = frame.render(4);

            // Assert
            assert.ok(output);

            header = new Id3v2FrameHeader(FrameIdentifiers.TCON);
            header.frameSize = 135;
            const expected = ByteVector.concatenate(
                header.render(4),
                StringType.UTF16BE,
                ByteVector.fromString("Classical", StringType.UTF16BE),
                ByteVector.getTextDelimiter(StringType.UTF16BE),
                ByteVector.fromString("CR", StringType.UTF16BE),
                ByteVector.getTextDelimiter(StringType.UTF16BE),
                ByteVector.fromString("Classical", StringType.UTF16BE),
                ByteVector.getTextDelimiter(StringType.UTF16BE),
                ByteVector.fromString("RX", StringType.UTF16BE),
                ByteVector.getTextDelimiter(StringType.UTF16BE),
                ByteVector.fromString("SomeGenre", StringType.UTF16BE),
                ByteVector.getTextDelimiter(StringType.UTF16BE),
                ByteVector.fromString("Whoa here's some cra(z)y string", StringType.UTF16BE)
            );

            Testers.bvEqual(output, expected);
        } finally {
            // Cleanup - Reset numeric genres setting
            Id3v2Settings.useNumericGenres = oldNumericGenresValue;
        }
    }

    @test
    public render_readV3WithSplit() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.TCOP);
        header.frameSize = 15;
        const data = ByteVector.concatenate(
            header.render(3),
            StringType.UTF16BE,
            ByteVector.fromString("fux/bux", StringType.UTF16BE)
        );
        const frame = TextInformationFrame.fromRawData(data, 3);
        const _ = frame.text; // Force a read

        // Act
        const output = frame.render(3);

        // Assert
        assert.ok(output);
        Testers.bvEqual(output, data);
    }

    @test
    public render_readV3WithoutSplit() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameIdentifiers.TCOP);
        header.frameSize = 7;
        const data = ByteVector.concatenate(
            header.render(3),
            StringType.UTF16BE,
            ByteVector.fromString("fux", StringType.UTF16BE)
        );
        const frame = TextInformationFrame.fromRawData(data, 3);
        const _ = frame.text; // Force a read

        // Act
        const output = frame.render(3);

        // Assert
        assert.ok(output);
        Testers.bvEqual(output, data);
    }
}

