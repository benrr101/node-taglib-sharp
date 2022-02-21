import {assert} from "chai";
import {suite, test} from "@testdeck/mocha";

import Theora from "../../src/ogg/codecs/theora";
import XiphComment from "../../src/xiph/xiphComment";
import {ByteVector} from "../../src/byteVector";
import {MediaTypes} from "../../src/iCodec";
import {Testers} from "../utilities/testers";
import CodecFactory from "../../src/ogg/codecs/codecFactory";
import CodecPackets from "./codecPackets";

@suite class Ogg_TheoraTests {
    @test
    public constructor_invalidParameters() {
        // Act / Assert
        Testers.testTruthy((v: ByteVector) => new Theora(v));
    }

    @test
    public constructor_doesNotStartWithSignature() {
        // Arrange
        const headerPacket = ByteVector.fromString("invalidString");

        // Act / Assert
        assert.throws(() => new Theora(headerPacket));
    }

    @test
    public constructor_validPacket() {
        // Arrange
        const headerPacket = ByteVector.concatenate(
            0x80, ByteVector.fromString("theora"),
            0x01, 0x02, 0x03, // version
            ByteVector.fromUint(0), // Size in macro blocks
            0xF0, 0x12, 0x34, // Width in pixels
            0xF0, 0x45, 0x67, // Height in pixels
            0x01, 0x02, // Picture offset in pixels
            ByteVector.fromUint(1234), // Frame rate numerator
            ByteVector.fromUint(2345), // Frame rate denominator
            ByteVector.fromSize(10, 0xFF), // Stuff we don't care about
            0xFC, 0x56, 0xEF // "last bits" including keyframe granule shift
        );

        // Act
        const codec = new Theora(headerPacket);

        // Assert
        assert.isUndefined(codec.commentData);
        assert.strictEqual(codec.description, "Theora v1.2 Video");
        assert.strictEqual(codec.durationMilliseconds, 0);
        assert.strictEqual(codec.mediaTypes, MediaTypes.Video);
        assert.strictEqual(codec.videoHeight, 17767);
        assert.strictEqual(codec.videoWidth, 4660);
    }

    @test
    public readPacket_packetIsNotCommentData() {
        // Arrange
        const codec = Ogg_TheoraTests.getTestCodec();
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
        const codec = Ogg_TheoraTests.getTestCodec();
        const packet = ByteVector.concatenate(
            0x81, 0x12, 0x23, 0x34, 0x45, 0x56, 0x67,
            ByteVector.fromString("foobarbaz")
        );

        // Act
        const result = codec.readPacket(packet);

        // Assert
        assert.isTrue(result);
        Testers.bvEqual(codec.commentData, packet.mid(7));
    }

    @test
    public readPacket_commentsAlreadyRead() {
        // Arrange
        const codec = Ogg_TheoraTests.getTestCodec();
        const commentPacket1 = ByteVector.concatenate(
            0x81, 0x12, 0x23, 0x34, 0x45, 0x56, 0x67,
            ByteVector.fromString("foobarbaz")
        );
        const commentPacket2 = ByteVector.concatenate(
            0x81, 0x12, 0x23, 0x34, 0x45, 0x56, 0x67,
            ByteVector.fromString("fuxbuxquxx")
        );
        codec.readPacket(commentPacket1);

        // Act
        const result = codec.readPacket(commentPacket2);

        // Assert
        assert.isTrue(result);
        Testers.bvEqual(codec.commentData, commentPacket1.mid(7));
    }

    @test
    public writeCommentPacket_invalidParameters() {
        // Arrange
        const codec = Ogg_TheoraTests.getTestCodec();
        const comment = XiphComment.fromEmpty();

        // Act / Assert
        Testers.testTruthy((v: ByteVector[]) => codec.writeCommentPacket(v, comment));
        Testers.testTruthy((v: XiphComment) => codec.writeCommentPacket([], v));
    }

    @test
    public writeCommentPacket_noPackets() {
        // Arrange
        const codec = Ogg_TheoraTests.getTestCodec();
        const comment = XiphComment.fromEmpty();
        const packets: ByteVector[] = [];

        // Act
        codec.writeCommentPacket(packets, comment);

        // Assert
        assert.strictEqual(packets.length, 1);

        const expected = ByteVector.concatenate(
            0x81, ByteVector.fromString("theora"),
            comment.render(true)
        );
        Testers.bvEqual(packets[0], expected);
    }

    @test
    public writeCommentPacket_onePacket() {
        // Arrange
        const codec = Ogg_TheoraTests.getTestCodec();
        const comment = XiphComment.fromEmpty();
        const packets = [
            ByteVector.fromString("OpusHead")
        ];

        // Act
        codec.writeCommentPacket(packets, comment);

        // Assert
        assert.strictEqual(packets.length, 2);

        const expected = ByteVector.concatenate(
            0x81, ByteVector.fromString("theora"),
            comment.render(true)
        );
        Testers.bvEqual(packets[1], expected);
    }

    @test
    public writeCommentPacket_noCommentPackets() {
        // Arrange
        const codec = Ogg_TheoraTests.getTestCodec();
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
            0x81, ByteVector.fromString("theora"),
            comment.render(true)
        );
        Testers.bvEqual(packets[1], expected);
    }

    @test
    public writeCommentPacket_hasCommentPacket() {
        // Arrange
        const codec = Ogg_TheoraTests.getTestCodec();
        const comment = XiphComment.fromEmpty();
        const packets = [
            ByteVector.fromSize(10, 0x0C),
            ByteVector.concatenate(0x81, ByteVector.fromString("theora")),
            ByteVector.fromSize(10, 0x0F)
        ];

        // Act
        codec.writeCommentPacket(packets, comment);

        // Assert
        assert.strictEqual(packets.length, 3);

        const expected = ByteVector.concatenate(
            0x81, ByteVector.fromString("theora"),
            comment.render(true)
        );
        Testers.bvEqual(packets[1], expected);
    }

    @test
    public setDuration_invalidParameters() {
        // Arrange
        const codec = Ogg_TheoraTests.getTestCodec();

        // Act / Assert
        Testers.testSafeUint((v) => codec.setDuration(v, 123));
        Testers.testSafeUint((v) => codec.setDuration(123, v));

        assert.strictEqual(codec.durationMilliseconds, 0);
    }

    @test
    public setDuration_validParameters() {
        // Arrange
        const codec = Ogg_TheoraTests.getTestCodec();

        // Act
        codec.setDuration(123456, 456789);

        // Assert
        assert.approximately(codec.durationMilliseconds, 158361612, 1);
    }

    private static getTestCodec(): Theora {
        return new Theora(CodecPackets.getTestTheoraPacket());
    }
}
