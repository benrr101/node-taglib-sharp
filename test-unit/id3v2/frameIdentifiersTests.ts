import {params, suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import {ByteVector, StringType} from "../../src/byteVector";
import {FrameIdentifier, FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Testers} from "../utilities/testers";
import {Id3v2Version} from "../../src/id3v2/enums";

@suite class FrameIdentifierTests {
    @test
    public isTextFrame_v2StartsWithT() {
        // Arrange
        const identifier = new FrameIdentifier("ABC", "DEF", "TCH");

        // Act
        const output = identifier.isTextFrame;

        // Assert
        assert.isTrue(output);
    }

    @test
    public isTextFrame_v3StartsWithT() {
        // Arrange
        const identifier = new FrameIdentifier("ABC", "TCCH", "DEF");

        // Act
        const output = identifier.isTextFrame;

        // Assert
        assert.isTrue(output);
    }

    @test
    public isTextFrame_v4StartsWithT() {
        // Arrange
        const identifier = new FrameIdentifier("TCCH", "ABC", "DEF");

        // Act
        const output = identifier.isTextFrame;

        // Assert
        assert.isTrue(output);
    }

    @test
    public isTextFrame_noVersionStartsWithT() {
        // Arrange
        const identifier = new FrameIdentifier("ABC", "DEF", "GHI");

        // Act
        const output = identifier.isTextFrame;

        // Assert
        assert.isFalse(output);
    }

    @test
    public isUrlFrame_v2StartsWithW() {
        // Arrange
        const identifier = new FrameIdentifier("ABC", "DEF", "WCH");

        // Act
        const output = identifier.isUrlFrame;

        // Assert
        assert.isTrue(output);
    }

    @test
    public isUrlFrame_v3StartsWithW() {
        // Arrange
        const identifier = new FrameIdentifier("ABC", "WCCH", "DEF");

        // Act
        const output = identifier.isUrlFrame;

        // Assert
        assert.isTrue(output);
    }

    @test
    public isUrlFrame_v4StartsWithW() {
        // Arrange
        const identifier = new FrameIdentifier("WCCH", "ABC", "DEF");

        // Act
        const output = identifier.isUrlFrame;

        // Assert
        assert.isTrue(output);
    }

    @params([Id3v2Version.V22, "HIJ"], "v2")
    @params([Id3v2Version.V23, "DEFG"], "v3")
    @params([Id3v2Version.V24, "ABCD"], "v4")
    public render([version, expected]: [Id3v2Version, string]) {
        // Arrange
        const identifier = new FrameIdentifier("ABCD", "DEFG", "HIJ");

        // Act
        const output = identifier.render(version);

        // Assert
        Testers.bvEqual(output, ByteVector.fromString(expected, StringType.UTF8));
    }
}
