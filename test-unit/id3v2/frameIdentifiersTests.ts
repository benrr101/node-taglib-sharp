import * as Chai from "chai";
import {suite, test} from "@testdeck/mocha";

import {ByteVector} from "../../src/byteVector";
import {FrameIdentifier, FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Testers} from "../utilities/testers";

// Setup Chai
const assert = Chai.assert;

@suite class FrameIdentifierTests {
    @test
    public isTextFrame_v2StartsWithT() {
        // Arrange
        const identifier = new FrameIdentifier(undefined, "XYZZ", "TCH");

        // Act
        const output = identifier.isTextFrame;

        // Assert
        assert.isTrue(output);
    }

    @test
    public isTextFrame_v3StartsWithT() {
        // Arrange
        const identifier = new FrameIdentifier(undefined, "TCCH", "XYZ");

        // Act
        const output = identifier.isTextFrame;

        // Assert
        assert.isTrue(output);
    }

    @test
    public isTextFrame_v4StartsWithT() {
        // Arrange
        const identifier = new FrameIdentifier("TCCH", "XYZZ", undefined);

        // Act
        const output = identifier.isTextFrame;

        // Assert
        assert.isTrue(output);
    }

    @test
    public isTextFrame_noVersionStartsWithT() {
        // Arrange
        const identifier = new FrameIdentifier("XYZZ", undefined, "XYZ");

        // Act
        const output = identifier.isTextFrame;

        // Assert
        assert.isFalse(output);
    }

    @test
    public isUrlFrame_v2StartsWithW() {
        // Arrange
        const identifier = new FrameIdentifier(undefined, undefined, "WCH");

        // Act
        const output = identifier.isUrlFrame;

        // Assert
        assert.isTrue(output);
    }

    @test
    public isUrlFrame_v3StartsWithW() {
        // Arrange
        const identifier = new FrameIdentifier(undefined, "WCCH", undefined);

        // Act
        const output = identifier.isUrlFrame;

        // Assert
        assert.isTrue(output);
    }

    @test
    public isUrlFrame_v4StartsWithW() {
        // Arrange
        const identifier = new FrameIdentifier("WCCH", undefined, undefined);

        // Act
        const output = identifier.isUrlFrame;

        // Assert
        assert.isTrue(output);
    }

    @test
    public render_invalidVersion() {
        // Act / Assert
        assert.throws(() => { FrameIdentifiers.RVA2.render(-1); });
        assert.throws(() => { FrameIdentifiers.RVA2.render(1.23); });
        assert.throws(() => { FrameIdentifiers.RVA2.render(256); });
        assert.throws(() => { FrameIdentifiers.RVA2.render(1); });
        assert.throws(() => { FrameIdentifiers.RVA2.render(5); });
    }

    @test
    public render_v2() {
        // Arrange
        const identifier = new FrameIdentifier("ABCD", "DEFG", "HIJ");

        // Act
        const output = identifier.render(2);

        // Assert
        Testers.bvEqual(output, ByteVector.fromString("HIJ"));
    }

    @test
    public render_v3() {
        // Arrange
        const identifier = new FrameIdentifier("ABCD", "DEFG", "HIJ");

        // Act
        const output = identifier.render(3);

        // Assert
        Testers.bvEqual(output, ByteVector.fromString("DEFG"));
    }

    @test
    public render_v4() {
        // Arrange
        const identifier = new FrameIdentifier("ABCD", "DEFG", "HIJ");

        // Act
        const output = identifier.render(4);

        // Assert
        Testers.bvEqual(output, ByteVector.fromString("ABCD"));
    }

    @test
    public render_unsupported() {
        // Arrange
        const identifier = new FrameIdentifier("ABCD", undefined, undefined);

        // Act / Assert
        assert.throws(() => identifier.render(2));
    }
}
