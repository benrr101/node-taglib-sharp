import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import AudioTrack from "../../src/matroska/tracks/audioTrack";
import EbmlElement from "../../src/ebml/ebmlElement";
import MatroskaTestUtils from "./utils";
import {ByteVector} from "../../src/byteVector";
import {MediaTypes} from "../../src/properties";
import {MatroskaIds} from "../../src/matroska/matroskaIds";
import {Testers} from "../utilities/testers";
import {MatroskaTrackType} from "../../src/matroska/tracks/track";

@suite class Matroska_AudioTrackTests {
    private BASE_TRACK_ELEMENTS = new Map<number, EbmlElement>([
        [MatroskaIds.CODEC_ID, MatroskaTestUtils.getTestElement("foo", MatroskaIds.CODEC_ID)],
        [MatroskaIds.CODEC_NAME, MatroskaTestUtils.getTestElement("bar", MatroskaIds.CODEC_NAME)],
        [
            MatroskaIds.CODEC_PRIVATE,
            MatroskaTestUtils.getTestElement(ByteVector.fromByteArray([0xAA, 0xBB, 0xCC]), MatroskaIds.CODEC_PRIVATE)
        ],
        [MatroskaIds.FLAG_COMMENTARY, MatroskaTestUtils.getTestElement(true, MatroskaIds.FLAG_COMMENTARY)],
        [MatroskaIds.FLAG_DEFAULT, MatroskaTestUtils.getTestElement(true, MatroskaIds.FLAG_DEFAULT)],
        [MatroskaIds.FLAG_ENABLED, MatroskaTestUtils.getTestElement(true, MatroskaIds.FLAG_ENABLED)],
        [MatroskaIds.FLAG_FORCED, MatroskaTestUtils.getTestElement(true, MatroskaIds.FLAG_FORCED)],
        [MatroskaIds.FLAG_HEARING_IMPAIRED, MatroskaTestUtils.getTestElement(true, MatroskaIds.FLAG_HEARING_IMPAIRED)],
        [MatroskaIds.FLAG_VISUAL_IMPAIRED, MatroskaTestUtils.getTestElement(true, MatroskaIds.FLAG_VISUAL_IMPAIRED)],
        [MatroskaIds.LANGUAGE, MatroskaTestUtils.getTestElement("baz", MatroskaIds.LANGUAGE)],
        [MatroskaIds.LANGUAGE_IETF, MatroskaTestUtils.getTestElement("foobar", MatroskaIds.LANGUAGE_IETF)],
        [MatroskaIds.NAME, MatroskaTestUtils.getTestElement("barbaz", MatroskaIds.NAME)],
        [MatroskaIds.TRACK_NUMBER, MatroskaTestUtils.getTestElement(123, MatroskaIds.TRACK_NUMBER)],
        [MatroskaIds.TRACK_UID, MatroskaTestUtils.getTestElement(BigInt(234), MatroskaIds.TRACK_UID)],
        [MatroskaIds.TRACK_TYPE, MatroskaTestUtils.getTestElement(MatroskaTrackType.Audio, MatroskaIds.TRACK_TYPE)]
    ]);

    private BASE_AUDIO_ELEMENTS = new Map<number, EbmlElement>([
        [MatroskaIds.CHANNELS, MatroskaTestUtils.getTestElement(1234, MatroskaIds.CHANNELS)],
        [MatroskaIds.BIT_DEPTH, MatroskaTestUtils.getTestElement(2345, MatroskaIds.BIT_DEPTH)],
        [
            MatroskaIds.SAMPLING_FREQ,
            MatroskaTestUtils.getTestElement(
                ByteVector.fromByteArray([0x40, 0x0B, 0xA5, 0xE3, 0x53, 0xF7, 0xCE, 0xD9]),
                MatroskaIds.SAMPLING_FREQ
            )
        ]
    ]);

    @test
    public constructor_invalidParameters(): void {
        // Arrange
        const map = new Map<number, EbmlElement>();

        // Act / Assert
        Testers.testTruthy((v: Map<number, EbmlElement>) => new AudioTrack(v, map));
        Testers.testTruthy((v: Map<number, EbmlElement>) => new AudioTrack(map, v));
    }

    @test
    public constructor_wrongTrackType(): void {
        // Arrange
        const map = new Map<number, EbmlElement>();

        // Act / Assert
        assert.throws(() => new AudioTrack(map, map));

        map.set(
            MatroskaIds.TRACK_TYPE,
            MatroskaTestUtils.getTestElement(MatroskaTrackType.Video, MatroskaIds.TRACK_TYPE)
        );
        assert.throws(() => new AudioTrack(map, map));

        map.set(
            MatroskaIds.TRACK_TYPE,
            MatroskaTestUtils.getTestElement(MatroskaTrackType.Buttons, MatroskaIds.TRACK_TYPE)
        );
        assert.throws(() => new AudioTrack(map, map));

        map.set(
            MatroskaIds.TRACK_TYPE,
            MatroskaTestUtils.getTestElement(MatroskaTrackType.Logo, MatroskaIds.TRACK_TYPE)
        );
        assert.throws(() => new AudioTrack(map, map));

        map.set(
            MatroskaIds.TRACK_TYPE,
            MatroskaTestUtils.getTestElement(MatroskaTrackType.Complex, MatroskaIds.TRACK_TYPE)
        );
        assert.throws(() => new AudioTrack(map, map));

        map.set(
            MatroskaIds.TRACK_TYPE,
            MatroskaTestUtils.getTestElement(MatroskaTrackType.Control, MatroskaIds.TRACK_TYPE)
        );
        assert.throws(() => new AudioTrack(map, map));

        map.set(
            MatroskaIds.TRACK_TYPE,
            MatroskaTestUtils.getTestElement(MatroskaTrackType.Metadata, MatroskaIds.TRACK_TYPE)
        );
        assert.throws(() => new AudioTrack(map, map));

        map.set(
            MatroskaIds.TRACK_TYPE,
            MatroskaTestUtils.getTestElement(MatroskaTrackType.Subtitle, MatroskaIds.TRACK_TYPE)
        );
        assert.throws(() => new AudioTrack(map, map));
    }

    @test
    public constructor_audioTrackEmpty(): void {
        // Arrange
        const trackElements = new Map<number, EbmlElement>([
            [MatroskaIds.TRACK_TYPE, MatroskaTestUtils.getTestElement(MatroskaTrackType.Audio, MatroskaIds.TRACK_TYPE)]
        ]);
        const audioElements = new Map<number, EbmlElement>();

        // Act
        const track = new AudioTrack(trackElements, audioElements);

        // Assert
        assert.isUndefined(track.codecId);
        assert.isUndefined(track.codecName);
        assert.isUndefined(track.codecPrivateData);
        assert.strictEqual(track.description, "Unknown Audio");
        assert.strictEqual(track.durationMilliseconds, 0);
        assert.isUndefined(track.isCommentary);
        assert.isUndefined(track.isDefault);
        assert.isUndefined(track.isEnabled);
        assert.isUndefined(track.isForced);
        assert.isUndefined(track.isHearingImpaired);
        assert.isUndefined(track.isVisualImpaired);
        assert.isUndefined(track.isTranslation);
        assert.isUndefined(track.language);
        assert.isUndefined(track.trackName);
        assert.isUndefined(track.trackNumber);
        assert.isUndefined(track.trackUid);
        assert.strictEqual(track.type, MatroskaTrackType.Audio);

        assert.isUndefined(track.audioBitrate);
        assert.isUndefined(track.audioChannels);
        assert.isUndefined(track.audioSampleRate);
        assert.isUndefined(track.bitsPerSample);
        assert.strictEqual(track.mediaTypes, MediaTypes.Audio);
    }

    @test
    public constructor_audioTrackBase(): void {
        // Arrange
        const audioElements = new Map(this.BASE_AUDIO_ELEMENTS);
        const trackElements = new Map(this.BASE_TRACK_ELEMENTS);

        // Act
        const track = new AudioTrack(trackElements, audioElements);

        // Assert
        assert.strictEqual(track.codecId, "foo");
        assert.strictEqual(track.codecName, "bar");
        Testers.bvEqual(track.codecPrivateData, [0xAA, 0xBB, 0xCC]);
        assert.strictEqual(track.description, "bar Audio");
        assert.strictEqual(track.durationMilliseconds, 0);
        assert.strictEqual(track.isCommentary, true);
        assert.strictEqual(track.isDefault, true);
        assert.strictEqual(track.isEnabled, true);
        assert.strictEqual(track.isForced, true);
        assert.strictEqual(track.isHearingImpaired, true);
        assert.strictEqual(track.isVisualImpaired, true);
        assert.isUndefined(track.isTranslation);
        assert.strictEqual(track.language, "foobar");
        assert.strictEqual(track.trackName, "barbaz");
        assert.strictEqual(track.trackNumber, 123);
        assert.strictEqual(track.trackUid, BigInt(234));
        assert.strictEqual(track.type, MatroskaTrackType.Audio);

        assert.isUndefined(track.audioBitrate);
        assert.strictEqual(track.audioChannels, 1234);
        assert.strictEqual(track.bitsPerSample, 2345);
        assert.strictEqual(track.audioSampleRate, 3.456);
        assert.strictEqual(track.mediaTypes, MediaTypes.Audio);
    }
}
