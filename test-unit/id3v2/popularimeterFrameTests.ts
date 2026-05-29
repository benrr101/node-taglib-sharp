import {params, suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import FrameConstructorTests from "./frameConstructorTests";
import PopularimeterFrame from "../../src/id3v2/frames/popularimeterFrame";
import PropertyTests from "../utilities/propertyTests";
import {ByteVector, StringType} from "../../src/byteVector";
import {Frame, FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameFlags, Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Testers} from "../utilities/testers";

@suite class Id3v2_PopularimeterFrame_ConstructorTests extends FrameConstructorTests {
    public get fromOffsetRawData(): (d: ByteVector, o: number, h: Id3v2FrameHeader, v: number) => Frame {
        return (a, b, c, d) => PopularimeterFrame.fromFieldBytes(c, a, d);
    }

    @test
    public fromUser() {
        // Act
        const frame = PopularimeterFrame.fromUser("fux");

        // Assert
        this.assertFrame(frame, "fux", undefined, 0);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_noDelimiter(version: number) {
        // Arrange
        const fieldBytes = ByteVector.fromByteArray([0x01, 0x02, 0x03]);
        const header = new Id3v2FrameHeader(FrameIdentifiers.POPM, Id3v2FrameFlags.None, fieldBytes.length);

        // Act / Assert
        assert.throws(() => { PopularimeterFrame.fromFieldBytes(header, fieldBytes, version); });
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_noRating(version: number) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            ByteVector.fromString("foo@example.com", StringType.Latin1), 0x00 // Owner + delimiter
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.POPM, Id3v2FrameFlags.None, fieldBytes.length);

        // Act / Assert
        assert.throws(() => { PopularimeterFrame.fromFieldBytes(header, fieldBytes, version); });
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_playCountTooLong(version: number) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            ByteVector.fromString("foo@example.com", StringType.Latin1), 0x00, // Owner + Delimiter
            0xAB,                                                              // Rating
            0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09               // Play counter (too big)
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.POPM, Id3v2FrameFlags.None, fieldBytes.length);

        // Act / Assert
        assert.throws(() => { PopularimeterFrame.fromFieldBytes(header, fieldBytes, version); });
    }

    @params([0x01, 0x02, 0x03], "three_bytes")
    @params([0x01, 0x02], "two_bytes")
    @params([0x01], "one_byte")
    @params([], "zero_bytes")
    public fromFieldBytes_noPlayCount(playCountBytes: number[]) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            ByteVector.fromString("foo@example.com", StringType.Latin1), 0x00, // Owner + Delimiter
            0xAB,                                                              // Rating
            ByteVector.fromByteArray(playCountBytes)                           // Play counter (too small)
        );

        const header = new Id3v2FrameHeader(FrameIdentifiers.POPM, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = PopularimeterFrame.fromFieldBytes(header, fieldBytes, 4);

        // Assert
        this.assertFrame(frame, "foo@example.com", undefined, 0xAB);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_fourBytePlayCount(version: number) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            ByteVector.fromString("foo@example.com", StringType.Latin1), 0x00, // Owner + Delimiter
            0xAB,                                                              // Rating
            ByteVector.fromUint(1234)                                          // Play counter
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.POPM, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = PopularimeterFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        this.assertFrame(frame, "foo@example.com", BigInt(1234), 0xAB);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_sixBytePlayCount(version: number) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            ByteVector.fromString("foo@example.com", StringType.Latin1), 0x00, // Owner + Delimiter
            0xAB,                                                              // Rating
            ByteVector.fromByteArray([0x01, 0x02, 0x03, 0x04, 0x05, 0x06])     // Play counter
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.POPM, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = PopularimeterFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        this.assertFrame(frame, "foo@example.com", BigInt("1108152157446"), 0xAB);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public fromFieldBytes_eightBytePlayCount(version: number) {
        // Arrange
        const fieldBytes = ByteVector.concatenate(
            ByteVector.fromString("foo@example.com", StringType.Latin1), 0x00,         // Owner + Delimiter
            0xAB,                                                                      // Rating
            ByteVector.fromByteArray([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08]) // Play counter
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.POPM, Id3v2FrameFlags.None, fieldBytes.length);

        // Act
        const frame = PopularimeterFrame.fromFieldBytes(header, fieldBytes, version);

        // Assert
        this.assertFrame(frame, "foo@example.com", BigInt("72623859790382856"), 0xAB);
    }

    private assertFrame(frame: PopularimeterFrame, u: string, p: bigint, r: number) {
        assert.isOk(frame);
        assert.strictEqual(frame.frameClassType, FrameClassType.PopularimeterFrame);
        assert.strictEqual(frame.frameId, FrameIdentifiers.POPM);

        if (p === undefined) {
            assert.isUndefined(frame.playCount);
        } else {
            assert.isOk(frame.playCount);
            assert.strictEqual(p, frame.playCount);
        }

        assert.strictEqual(frame.rating, r);
        assert.strictEqual(frame.user, u);
    }
}

@suite class Id3v2_PopularimeterFrame_PropertyTests {
    @test
    public playCount() {
        // Arrange
        const frame = PopularimeterFrame.fromUser("fux");
        const set = (v: bigint) => { frame.playCount = v; };
        const get = () => frame.playCount;

        // Act
        PropertyTests.propertyRoundTrip(set, get, BigInt(1234));
        PropertyTests.propertyRoundTrip(set, get, undefined);
        PropertyTests.propertyNormalized(set, get, null, undefined);
        PropertyTests.propertyThrows(set, BigInt(-1));
    }

    @test
    public rating() {
        // Arrange
        const frame = PopularimeterFrame.fromUser("fux");
        const set = (v: number) => { frame.rating = v; };
        const get = () => frame.rating;

        // Act
        PropertyTests.propertyRoundTrip(set, get, 5);
        PropertyTests.propertyThrows(set, -1);
        PropertyTests.propertyThrows(set, 1.23);
        PropertyTests.propertyThrows(set, 0x100);
    }

    @test
    public user() {
        // Arrange
        const frame = PopularimeterFrame.fromUser("fux");
        const set = (v: string) => { frame.user = v; };
        const get = () => frame.user;

        // Act
        PropertyTests.propertyRoundTrip(set, get, "bux");
        PropertyTests.propertyNormalized(set, get, undefined, "");
        PropertyTests.propertyNormalized(set, get, null, "");
    }
}

@suite class Id3v2_PopularimeterFrame_MethodTests {
    @test
    public find_falsyFrames() {
        // Act / Assert
        Testers.testTruthy((v: PopularimeterFrame[]) => { PopularimeterFrame.find(v, "fux"); });
    }

    @test
    public find_noFrames() {
        // Act
        const output = PopularimeterFrame.find([], "fux");

        // Assert
        assert.isUndefined(output);
    }

    @test
    public find_noMatches() {
        // Arrange
        const frames = [
            PopularimeterFrame.fromUser("fux")
        ];

        // Act
        const output = PopularimeterFrame.find(frames, "bux");

        // Assert
        assert.isUndefined(output);
    }

    @test
    public find_matches() {
        // Arrange
        const frames = [
            PopularimeterFrame.fromUser("fux"),
            PopularimeterFrame.fromUser("bux")
        ];

        // Act
        const output = PopularimeterFrame.find(frames, "bux");

        // Assert
        assert.isOk(output);
        assert.strictEqual(output, frames[1]);
    }

    @test
    public clone() {
        // Arrange
        const frame = PopularimeterFrame.fromUser("fux");
        frame.playCount = BigInt(1234);
        frame.rating = 5;

        // Act
        const output = <PopularimeterFrame> frame.clone();

        // Assert
        assert.isOk(output);
        assert.strictEqual(output.frameClassType, FrameClassType.PopularimeterFrame);
        assert.strictEqual(output.frameId, FrameIdentifiers.POPM);

        assert.isOk(output.playCount);
        assert.strictEqual(frame.playCount, output.playCount);

        assert.strictEqual(output.rating, frame.rating);
        assert.strictEqual(output.user, frame.user);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public render_noPlayCount(version: number) {
        // Arrange
        const frame = PopularimeterFrame.fromUser("foo@example.com");
        frame.rating = 0xAB;

        // Act
        const output = frame.render(version);

        // Assert
        assert.isOk(output);

        const fieldBytes = ByteVector.concatenate(
            ByteVector.fromString("foo@example.com", StringType.Latin1), 0x00, // Owner + delimiter
            0xAB                                                               // Rating
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.POPM, Id3v2FrameFlags.None, fieldBytes.length);
        const expected = ByteVector.concatenate(header.render(version), fieldBytes);
        Testers.bvEqual(output, expected);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public render_fourBytePlayCount(version: number) {
        // Arrange
        const frame = PopularimeterFrame.fromUser("foo@example.com");
        frame.playCount = BigInt(1234);
        frame.rating = 0xAB;

        // Act
        const output = frame.render(version);

        // Assert
        assert.isOk(output);

        const fieldBytes = ByteVector.concatenate(
            ByteVector.fromString("foo@example.com", StringType.Latin1), 0x00, // Owner + delimiter
            0xAB,                                                              // Rating
            ByteVector.fromUint(1234)                                          // Play counter
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.POPM, Id3v2FrameFlags.None, fieldBytes.length);
        const expected = ByteVector.concatenate(header.render(version), fieldBytes);
        Testers.bvEqual(output, expected);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public render_sixBytePlayCount(version: number) {
        // Arrange
        const frame = PopularimeterFrame.fromUser("foo@example.com");
        frame.playCount = BigInt("1108152157446");
        frame.rating = 0xAB;

        // Act
        const output = frame.render(version);

        // Assert
        assert.isOk(output);

        const fieldBytes = ByteVector.concatenate(
            ByteVector.fromString("foo@example.com", StringType.Latin1), 0x00, // Owner + delimiter
            0xAB,                                                              // Rating
            ByteVector.fromByteArray([0x01, 0x02, 0x03, 0x04, 0x05, 0x06])     // Play counter
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.POPM, Id3v2FrameFlags.None, fieldBytes.length);
        const expected = ByteVector.concatenate(header.render(version), fieldBytes);
        Testers.bvEqual(output, expected);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public render_eightBytePlayCount(version: number) {
        // Arrange
        const frame = PopularimeterFrame.fromUser("foo@example.com");
        frame.playCount = BigInt("72623859790382856");
        frame.rating = 0xAB;

        // Act
        const output = frame.render(version);

        // Assert
        assert.isOk(output);

        const fieldBytes = ByteVector.concatenate(
            ByteVector.fromString("foo@example.com", StringType.Latin1), 0x00,         // Owner + delimiter
            0xAB,                                                                      // Rating
            ByteVector.fromByteArray([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08]) // Play counter
        );
        const header = new Id3v2FrameHeader(FrameIdentifiers.POPM, Id3v2FrameFlags.None, fieldBytes.length);
        const expected = ByteVector.concatenate(header.render(version), fieldBytes);
        Testers.bvEqual(output, expected);
    }
}
