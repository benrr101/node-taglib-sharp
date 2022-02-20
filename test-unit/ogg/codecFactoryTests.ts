import {assert} from "chai";
import {suite, test} from "@testdeck/mocha";
import {It, Mock, Times} from "typemoq";

import CodecPackets from "./codecPackets";
import CodecFactory, {CodecProvider} from "../../src/ogg/codecs/codecFactory";
import IOggCodec from "../../src/ogg/codecs/iOggCodec";
import Opus from "../../src/ogg/codecs/opus";
import Theora from "../../src/ogg/codecs/theora";
import Vorbis from "../../src/ogg/codecs/vorbis";
import {ByteVector} from "../../src/byteVector";
import {Testers} from "../utilities/testers";

@suite class Ogg_CodecFactory {
    @test
    public addCodecProvider_invalidParameter() {
        // Act / Assert
        Testers.testTruthy((v: CodecProvider) => CodecFactory.addCodecProvider(v));
    }

    @test
    public getCodec_invalidParameter() {
        // Act / Assert
        Testers.testTruthy((v: ByteVector) => CodecFactory.getCodec(v));
    }

    @test
    public getCodec_opus() {
        // Arrange
        const opusPacket = CodecPackets.getTestOpusPacket();

        // Act
        const codec = CodecFactory.getCodec(opusPacket);

        // Assert
        assert.ok(codec);
        assert.instanceOf(codec, Opus);
    }

    @test
    public getCodec_theora() {
        // Arrange
        const theoraPacket = CodecPackets.getTestTheoraPacket();

        // Act
        const codec = CodecFactory.getCodec(theoraPacket);

        // Assert
        assert.ok(codec);
        assert.instanceOf(codec, Theora);
    }

    @test
    public getCodec_vorbis() {
        // Arrange
        const vorbisPacket = CodecPackets.getTestVorbisPacket();

        // Act
        const codec = CodecFactory.getCodec(vorbisPacket);

        // Assert
        assert.ok(codec);
        assert.instanceOf(codec, Vorbis);
    }

    @test
    public customCodecProvider() {
        // Arrange
        const mockCodec = Mock.ofType<IOggCodec>();
        const badCodecProvider = Mock.ofType<CodecProvider>();
        badCodecProvider.setup((cp) => cp(It.isAny())).returns(() => undefined);
        const goodCodecProvider = Mock.ofType<CodecProvider>();
        goodCodecProvider.setup((cp) => cp(It.isAny())).returns(() => mockCodec.object);

        const testPacket = ByteVector.empty();

        try {
            // Act 1: Register the providers
            CodecFactory.addCodecProvider(badCodecProvider.object);
            CodecFactory.addCodecProvider(goodCodecProvider.object);

            // Act 2: Get codec
            const codec = CodecFactory.getCodec(testPacket);

            // Assert 1/2: "Good" codec returned, both providers called, tho.
            assert.strictEqual(codec, mockCodec.object);
            badCodecProvider.verify((cp) => cp(It.isValue(testPacket)), Times.once());
            goodCodecProvider.verify((cp) => cp(It.isValue(testPacket)), Times.once());

        } finally {
            // Act / Assert 3: Cleanup and retry the codec read
            CodecFactory.clearCustomProviders();
            assert.throws(() => CodecFactory.getCodec(testPacket));
        }
    }
}
