import {params, suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import Frame from "../../src/id3v2/frames/frame";
import FrameConstructorTests from "./frameConstructorTests";
import PopularimeterFrame from "../../src/id3v2/frames/popularimeterFrame";
import PropertyTests from "../utilities/propertyTests";
import UnknownFrame from "../../src/id3v2/frames/unknownFrame";
import {ByteVector, StringType} from "../../src/byteVector";
import {Id3v2FrameFlags, Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {FrameIdentifiers} from "../../src/id3v2/frameIdentifiers";
import {Testers} from "../utilities/testers";

const assertFrame = (frame: PopularimeterFrame, u: string, p: bigint, r: number) => {
    assert.isOk(frame);
    assert.instanceOf<PopularimeterFrame>(frame, PopularimeterFrame);
    assert.strictEqual(frame.frameId, FrameIdentifiers.POPM);

    assert.strictEqual(frame.playCount, p);
    assert.strictEqual(frame.rating, r);
    assert.strictEqual(frame.user, u);
}

@suite class Id3v2_PopularimeterFrame_ConstructorTests extends FrameConstructorTests {
    public get fromFieldBytes(): (h: Id3v2FrameHeader, d: ByteVector, v: number) => Frame {
        return PopularimeterFrame.fromFieldBytes;
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
        assertFrame(frame, "foo@example.com", undefined, 0xAB);
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
        assertFrame(frame, "foo@example.com", BigInt(1234), 0xAB);
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
        assertFrame(frame, "foo@example.com", BigInt("1108152157446"), 0xAB);
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
        assertFrame(frame, "foo@example.com", BigInt("72623859790382856"), 0xAB);
    }

    @test
    public fromFields_noParams() {
        // Act
        const frame = PopularimeterFrame.fromFields();

        // Assert
        assertFrame(frame, "", undefined, 0);
    }

    @test
    public fromFields_withOwner() {
        // Act
        const frame = PopularimeterFrame.fromFields("foo");

        // Assert
        assertFrame(frame, "foo", undefined, 0);
    }

    @test
    public fromFields_withOwnerRating() {
        // Act
        const frame = PopularimeterFrame.fromFields("foo", 123);

        // Assert
        assertFrame(frame, "foo", undefined, 123);
    }

    @test
    public fromFields_withOwnerRatingPlayCount() {
        // Act
        const frame = PopularimeterFrame.fromFields("foo", 123, BigInt(45678));

        // Assert
        assertFrame(frame, "foo", BigInt(45678), 123);
    }
}

@suite class Id3v2_PopularimeterFrame_PropertyTests {
    @test
    public playCount() {
        // Arrange
        const frame = PopularimeterFrame.fromFields();
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
        const frame = PopularimeterFrame.fromFields();
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
        const frame = PopularimeterFrame.fromFields();
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
    public clone() {
        // Arrange
        const frame = PopularimeterFrame.fromFields("fux", 5, BigInt(1234));

        // Act
        const output = <PopularimeterFrame> frame.clone();

        // Assert
        assertFrame(output, frame.user, frame.playCount, frame.rating);
    }

    @test
    public filterFrames_falsyFrames() {
        // Act/Assert
        Testers.testTruthy((v: PopularimeterFrame[]) => { PopularimeterFrame.filterFrames(v); });
    }

    @test
    public filterFrames_noFrames() {
        // Arrange
        const frames: Frame[] = [];

        // Act
        const output = PopularimeterFrame.filterFrames(frames);

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
        const result = PopularimeterFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.isEmpty(result);
    }

    @test
    public filterFrames_singleMatch() {
        // Arrange
        const frame1 = UnknownFrame.fromData(FrameIdentifiers.RVRB, ByteVector.fromUint(123));
        const frame2 = PopularimeterFrame.fromFields();
        const frames = [frame1, frame2];

        // Act
        const result = PopularimeterFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame2]);
    }

    @test
    public filterFrames_multipleMatches() {
        // Arrange
        const frame1 = UnknownFrame.fromData(FrameIdentifiers.RVRB, ByteVector.fromUint(123));
        const frame2 = PopularimeterFrame.fromFields();
        const frame3 = PopularimeterFrame.fromFields();

        const frames = [frame1, frame2, frame3];

        // Act
        const result = PopularimeterFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame2, frame3]);
    }

    @test
    public filterFrames_allMatches() {
        // Arrange
        const frame1 = PopularimeterFrame.fromFields();
        const frame2 = PopularimeterFrame.fromFields();
        const frames = [frame1, frame2];

        // Act
        const result = PopularimeterFrame.filterFrames(frames);

        // Assert
        assert.isArray(result);
        assert.deepEqual(result, [frame1, frame2]);
    }

    @params(2, "v2")
    @params(3, "v3")
    @params(4, "v4")
    public render_noPlayCount(version: number) {
        // Arrange
        const frame = PopularimeterFrame.fromFields("foo@example.com", 0xAB);

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
        const frame = PopularimeterFrame.fromFields("foo@example.com", 0xAB, BigInt(1234));

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
        const frame = PopularimeterFrame.fromFields("foo@example.com", 0xAB, BigInt("1108152157446"));

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
        const frame = PopularimeterFrame.fromFields("foo@example.com", 0xAB, BigInt("72623859790382856"));

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
