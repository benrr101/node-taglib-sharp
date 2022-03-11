import {assert} from "chai";
import {suite, test} from "@testdeck/mocha";

import CodecPackets from "./codecPackets";
import Vorbis from "../../src/ogg/codecs/vorbis";
import XiphComment from "../../src/xiph/xiphComment";
import {ByteVector, StringType} from "../../src/byteVector";
import {MediaTypes} from "../../src/iCodec";
import {Testers} from "../utilities/testers";

@suite class Ogg_VorbisTests {
    @test
    public constructor_invalidParameters() {
        // Act / Assert
        Testers.testTruthy((v: ByteVector) => new Vorbis(v));
    }

    @test
    public constructor_doesNotStartWithSignature() {
        // Arrange
        const headerPacket = ByteVector.fromString("invalidString", StringType.UTF8);

        // Act / Assert
        assert.throws(() => new Vorbis(headerPacket));
    }

    @test
    public constructor_validPacket() {
        // Arrange
        const headerPacket = ByteVector.concatenate(
            0x01, ByteVector.fromString("vorbis", StringType.UTF8),
            ByteVector.fromUint(1234, false), // Version
            0x05, // Channels
            ByteVector.fromUint(456789, false), // Sample rate
            ByteVector.fromUint(200000, false), // bitrate max
            ByteVector.fromUint(128000, false), // bitrate nominal
            ByteVector.fromUint(100000, false), // bitrate min
            // We don't care about anything after this
        );

        // Act
        const codec = new Vorbis(headerPacket);

        // Assert
        assert.strictEqual(codec.audioBitrate, 128);
        assert.strictEqual(codec.audioChannels, 5);
        assert.strictEqual(codec.audioSampleRate, 456789);
        assert.isUndefined(codec.commentData);
        assert.strictEqual(codec.description, "Vorbis v1234 Audio");
        assert.strictEqual(codec.durationMilliseconds, 0);
        assert.strictEqual(codec.mediaTypes, MediaTypes.Audio);
    }

    @test
    public readPacket_packetIsNotCommentData() {
        // Arrange
        const codec = Ogg_VorbisTests.getTestCodec();
        const packet = ByteVector.fromSize(20, 0x0F);

        // Act
        const result = codec.readPacket(packet);

        // Assert
        assert.isFalse(result);
        assert.isUndefined(codec.commentData);
    }

    @test
    public readPacket_packetIsCommentData() {
        // Arrange
        const codec = Ogg_VorbisTests.getTestCodec();
        const packet = ByteVector.concatenate(
            0x03,
            ByteVector.fromString("vorbis", StringType.UTF8),
            ByteVector.fromString("foobarbaz", StringType.UTF8)
        );

        // Act
        const result = codec.readPacket(packet);

        // Assert
        assert.isTrue(result);
        Testers.bvEqual(codec.commentData, packet.subarray(7));
    }

    @test
    public readPacket_commentsAlreadyRead() {
        // Arrange
        const codec = Ogg_VorbisTests.getTestCodec();
        const commentPacket1 = ByteVector.concatenate(
            0x03,
            ByteVector.fromString("vorbis", StringType.UTF8),
            ByteVector.fromString("foobarbaz", StringType.UTF8)
        );
        const commentPacket2 = ByteVector.concatenate(
            0x03,
            ByteVector.fromString("vorbis", StringType.UTF8),
            ByteVector.fromString("fuxbuxquxx", StringType.UTF8)
        );
        codec.readPacket(commentPacket1);

        // Act
        const result = codec.readPacket(commentPacket2);

        // Assert
        assert.isTrue(result);
        Testers.bvEqual(codec.commentData, commentPacket1.subarray(7));
    }

    @test
    public writeCommentPacket_invalidParameters() {
        // Arrange
        const codec = Ogg_VorbisTests.getTestCodec();
        const comment = XiphComment.fromEmpty();

        // Act / Assert
        Testers.testTruthy((v: ByteVector[]) => codec.writeCommentPacket(v, comment));
        Testers.testTruthy((v: XiphComment) => codec.writeCommentPacket([], v));
    }

    @test
    public writeCommentPacket_noPackets() {
        // Arrange
        const codec = Ogg_VorbisTests.getTestCodec();
        const comment = XiphComment.fromEmpty();
        const packets: ByteVector[] = [];

        // Act
        codec.writeCommentPacket(packets, comment);

        // Assert
        assert.strictEqual(packets.length, 1);

        const expected = ByteVector.concatenate(
            0x03, ByteVector.fromString("vorbis", StringType.UTF8),
            comment.render(true)
        );
        Testers.bvEqual(packets[0], expected);
    }

    @test
    public writeCommentPacket_onePacket() {
        // Arrange
        const codec = Ogg_VorbisTests.getTestCodec();
        const comment = XiphComment.fromEmpty();
        const packets = [
            ByteVector.fromString("OpusHead", StringType.UTF8)
        ];

        // Act
        codec.writeCommentPacket(packets, comment);

        // Assert
        assert.strictEqual(packets.length, 2);

        const expected = ByteVector.concatenate(
            0x03, ByteVector.fromString("vorbis", StringType.UTF8),
            comment.render(true)
        );
        Testers.bvEqual(packets[1], expected);
    }

    @test
    public writeCommentPacket_noCommentPackets() {
        // Arrange
        const codec = Ogg_VorbisTests.getTestCodec();
        const comment = XiphComment.fromEmpty();
        const packets = [
            ByteVector.fromSize(10, 0x0C),
            ByteVector.fromSize(10, 0x0F),
        ];

        // Act
        codec.writeCommentPacket(packets, comment);

        // Assert
        assert.strictEqual(packets.length, 3);

        const expected = ByteVector.concatenate(
            0x03, ByteVector.fromString("vorbis", StringType.UTF8),
            comment.render(true)
        );
        Testers.bvEqual(packets[1], expected);
    }

    @test
    public writeCommentPacket_hasCommentPacket() {
        // Arrange
        const codec = Ogg_VorbisTests.getTestCodec();
        const comment = XiphComment.fromEmpty();
        const packets = [
            ByteVector.fromSize(10, 0x0C),
            ByteVector.concatenate(0x03, ByteVector.fromString("vorbis", StringType.UTF8)),
            ByteVector.fromSize(10, 0x0F)
        ];

        // Act
        codec.writeCommentPacket(packets, comment);

        // Assert
        assert.strictEqual(packets.length, 3);

        const expected = ByteVector.concatenate(
            0x03, ByteVector.fromString("vorbis", StringType.UTF8),
            comment.render(true)
        );
        Testers.bvEqual(packets[1], expected);
    }

    @test
    public setDuration_invalidParameters() {
        // Arrange
        const codec = Ogg_VorbisTests.getTestCodec();

        // Act / Assert
        Testers.testSafeUint((v) => codec.setDuration(v, 123));
        Testers.testSafeUint((v) => codec.setDuration(123, v));

        assert.strictEqual(codec.durationMilliseconds, 0);
    }

    @test
    public setDuration_validParameters() {
        // Arrange
        const codec = Ogg_VorbisTests.getTestCodec();

        // Act
        codec.setDuration(123456, 456789);

        // Assert
        assert.approximately(codec.durationMilliseconds, 729, 1);
    }

    private static getTestCodec(): Vorbis {
        return new Vorbis(CodecPackets.getTestVorbisPacket());
    }
}
