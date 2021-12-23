import {assert} from "chai";
import {suite, test} from "@testdeck/mocha";

import Opus from "../../src/ogg/codecs/opus";
import {ByteVector} from "../../src/byteVector";
import {MediaTypes} from "../../src/iCodec";
import {Testers} from "../utilities/testers";
import {XiphComment} from "../../src";

@suite class Ogg_OpusTests {
    @test
    public constructor_invalidParameters() {
        // Act / Assert
        Testers.testTruthy((v: ByteVector) => new Opus(v));
    }

    @test
    public constructor_doesNotStartWithSignature() {
        // Arrange
        const headerPacket = ByteVector.fromString("invalidString");

        // Act / Assert
        assert.throws(() => new Opus(headerPacket));
    }

    @test
    public constructor_rtpChannelMapping_mono() {
        // Arrange
        const headerPacket = ByteVector.concatenate(
            ByteVector.fromString("OpusHead"),      // Magic header
            0x01,                                   // Version
            0x01,                                   // Channel count
            0x03, 0x04,                             // Pre-skip
            0x05, 0x06, 0x07, 0x08,                 // Original sample rate
            0x09, 0x0A,                             // Output gain
            0x00,                                   // Channel mapping family (RTP)
            ByteVector.fromSize(20, 0xBE)           // Filler
        );

        // Act
        const codec = new Opus(headerPacket);

        // Assert
        assert.strictEqual(codec.audioBitrate, 0);
        assert.strictEqual(codec.audioSampleRate, 0x08070605);
        assert.strictEqual(codec.audioChannels, 1);
        assert.isUndefined(codec.commentData);
        assert.strictEqual(codec.description, `Opus v1 audio`);
        assert.strictEqual(codec.durationMilliseconds, 0);
        assert.strictEqual(codec.mediaTypes, MediaTypes.Audio);
        assert.strictEqual(codec.streamCount, 1);
    }

    @test
    public constructor_rtpChannelMapping_stereo() {
        // Arrange
        const headerPacket = ByteVector.concatenate(
            ByteVector.fromString("OpusHead"),      // Magic header
            0x01,                                   // Version
            0x02,                                   // Channel count
            0x03, 0x04,                             // Pre-skip
            0x05, 0x06, 0x07, 0x08,                 // Original sample rate
            0x09, 0x0A,                             // Output gain
            0x00,                                   // Channel mapping family (RTP)
            ByteVector.fromSize(20, 0xBE)           // Filler
        );

        // Act
        const codec = new Opus(headerPacket);

        // Assert
        assert.strictEqual(codec.audioBitrate, 0);
        assert.strictEqual(codec.audioSampleRate, 0x08070605);
        assert.strictEqual(codec.audioChannels, 2);
        assert.isUndefined(codec.commentData);
        assert.strictEqual(codec.description, `Opus v1 audio`);
        assert.strictEqual(codec.durationMilliseconds, 0);
        assert.strictEqual(codec.mediaTypes, MediaTypes.Audio);
        assert.strictEqual(codec.streamCount, 1);
    }

    @test
    public constructor_vorbisChannelMapping() {
        // Arrange
        const headerPacket = ByteVector.concatenate(
            ByteVector.fromString("OpusHead"),      // Magic header
            0x01,                                   // Version
            0x08,                                   // Channel count
            0x03, 0x04,                             // Pre-skip
            0x05, 0x06, 0x07, 0x08,                 // Original sample rate
            0x09, 0x0A,                             // Output gain
            0x01,                                   // Channel mapping family
            0x05,                                   // Stream count 'N'
            0x03                                    // Two-channel stream count 'M'
        );

        // Act
        const codec = new Opus(headerPacket);

        // Assert
        assert.strictEqual(codec.audioBitrate, 0);
        assert.strictEqual(codec.audioSampleRate, 0x08070605);
        assert.strictEqual(codec.audioChannels, 8);
        assert.isUndefined(codec.commentData);
        assert.strictEqual(codec.description, `Opus v1 audio`);
        assert.strictEqual(codec.durationMilliseconds, 0);
        assert.strictEqual(codec.mediaTypes, MediaTypes.Audio);
        assert.strictEqual(codec.streamCount, 5);
    }

    @test
    public readPacket_packetIsNotCommentData() {
        // Arrange
        const codec = this.getTestCodec();
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
        const codec = this.getTestCodec();
        const packet = ByteVector.concatenate(
            ByteVector.fromString("OpusTags"),
            ByteVector.fromString("foobarbaz")
        );

        // Act
        const result = codec.readPacket(packet);

        // Assert
        assert.isTrue(result);
        Testers.bvEqual(codec.commentData, packet.mid(8));
    }

    @test
    public readPacket_commentsAlreadyRead() {
        // Arrange
        const codec = this.getTestCodec();
        const commentPacket1 = ByteVector.concatenate(
            ByteVector.fromString("OpusTags"),
            ByteVector.fromString("foobarbaz")
        );
        const commentPacket2 = ByteVector.concatenate(
            ByteVector.fromString("OpusTags"),
            ByteVector.fromString("fuxbuxquxx")
        );
        codec.readPacket(commentPacket1);

        // Act
        const result = codec.readPacket(commentPacket2);

        // Assert
        assert.isTrue(result);
        Testers.bvEqual(codec.commentData, commentPacket1.mid(8));
    }

    @test
    public writeCommentPacket_invalidParameters() {
        // Arrange
        const codec = this.getTestCodec();
        const comment = XiphComment.fromEmpty();

        // Act / Assert
        Testers.testTruthy((v: ByteVector[]) => codec.writeCommentPacket(v, comment));
        Testers.testTruthy((v: XiphComment) => codec.writeCommentPacket([], v));
    }

    @test
    public writeCommentPacket_noPackets() {
        // Arrange
        const codec = this.getTestCodec();
        const comment = XiphComment.fromEmpty();
        const packets: ByteVector[] = [];

        // Act
        codec.writeCommentPacket(packets, comment);

        // Assert
        assert.strictEqual(packets.length, 1);

        const expected = ByteVector.concatenate(
            ByteVector.fromString("OpusTags"),
            comment.render(true)
        );
        Testers.bvEqual(packets[0], expected);
    }

    @test
    public writeCommentPacket_onePacket() {
        // Arrange
        const codec = this.getTestCodec();
        const comment = XiphComment.fromEmpty();
        const packets = [
            ByteVector.fromString("OpusHead")
        ];

        // Act
        codec.writeCommentPacket(packets, comment);

        // Assert
        assert.strictEqual(packets.length, 2);

        const expected = ByteVector.concatenate(
            ByteVector.fromString("OpusTags"),
            comment.render(true)
        );
        Testers.bvEqual(packets[1], expected);
    }

    @test
    public writeCommentPacket_noCommentPackets() {
        // Arrange
        const codec = this.getTestCodec();
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
            ByteVector.fromString("OpusTags"),
            comment.render(true)
        );
        Testers.bvEqual(packets[1], expected);
    }

    @test
    public writeCommentPacket_hasCommentPacket() {
        // Arrange
        const codec = this.getTestCodec();
        const comment = XiphComment.fromEmpty();
        const packets = [
            ByteVector.fromSize(10, 0x0C),
            ByteVector.fromString("OpusTags"),
            ByteVector.fromSize(10, 0x0F)
        ];

        // Act
        codec.writeCommentPacket(packets, comment);

        // Assert
        assert.strictEqual(packets.length, 3);

        const expected = ByteVector.concatenate(
            ByteVector.fromString("OpusTags"),
            comment.render(true)
        );
        Testers.bvEqual(packets[1], expected);
    }

    @test
    public setDuration_invalidParameters() {
        // Arrange
        const codec = this.getTestCodec();

        // Act / Assert
        Testers.testSafeUint((v) => codec.setDuration(v, 123));
        Testers.testSafeUint((v) => codec.setDuration(123, v));

        assert.strictEqual(codec.durationMilliseconds, 0);
    }

    @test
    public setDuration_validParameters() {
        // Arrange
        const codec = this.getTestCodec();

        // Act
        codec.setDuration(0, 123456789);

        // Assert
        assert.approximately(codec.durationMilliseconds, 2571995, 0.5);
    }

    private getTestCodec(): Opus {
        const headerPacket = ByteVector.concatenate(
            ByteVector.fromString("OpusHead"),
            0x01, 0x08, 0x03, 0x04,
            0x05, 0x06, 0x07, 0x08,
            0x09, 0x0A, 0x01, 0x05, 0x03
        );
        return new Opus(headerPacket);
    }
}
