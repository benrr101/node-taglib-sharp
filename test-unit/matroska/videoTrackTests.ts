import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import EbmlElement from "../../src/ebml/ebmlElement";
import MatroskaTestUtils from "./utils";
import {ByteVector} from "../../src/byteVector";
import {MatroskaIds} from "../../src/matroska/matroskaIds";
import {MediaTypes} from "../../src/properties";
import {Testers} from "../utilities/testers";
import {MatroskaTrackType} from "../../src/matroska/tracks/track";
import {VideoDisplayUnits, VideoInterlaceFlag, VideoStereoMode, VideoTrack} from "../../src/matroska/tracks/videoTrack";

@suite class Matroska_VideoTrackTests {
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
        [MatroskaIds.LANGUAGE_BCP47, MatroskaTestUtils.getTestElement("foobar", MatroskaIds.LANGUAGE_BCP47)],
        [MatroskaIds.NAME, MatroskaTestUtils.getTestElement("barbaz", MatroskaIds.NAME)],
        [MatroskaIds.TRACK_NUMBER, MatroskaTestUtils.getTestElement(123, MatroskaIds.TRACK_NUMBER)],
        [MatroskaIds.TRACK_UID, MatroskaTestUtils.getTestElement(BigInt(234), MatroskaIds.TRACK_UID)],
        [MatroskaIds.TRACK_TYPE, MatroskaTestUtils.getTestElement(MatroskaTrackType.Video, MatroskaIds.TRACK_TYPE)]
    ]);

    private BASE_VIDEO_ELEMENTS = new Map<number, EbmlElement>([
        [MatroskaIds.ASPECT_RATIO_TYPE, MatroskaTestUtils.getTestElement(1234, MatroskaIds.ASPECT_RATIO_TYPE)],
        [MatroskaIds.PIXEL_CROP_BOTTOM, MatroskaTestUtils.getTestElement(3456, MatroskaIds.PIXEL_CROP_BOTTOM)],
        [MatroskaIds.PIXEL_CROP_LEFT, MatroskaTestUtils.getTestElement(4567, MatroskaIds.PIXEL_CROP_LEFT)],
        [MatroskaIds.PIXEL_CROP_RIGHT, MatroskaTestUtils.getTestElement(5678, MatroskaIds.PIXEL_CROP_RIGHT)],
        [MatroskaIds.PIXEL_CROP_TOP, MatroskaTestUtils.getTestElement(6789, MatroskaIds.PIXEL_CROP_TOP)],
        [MatroskaIds.DISPLAY_HEIGHT, MatroskaTestUtils.getTestElement(7890, MatroskaIds.DISPLAY_HEIGHT)],
        [MatroskaIds.DISPLAY_WIDTH, MatroskaTestUtils.getTestElement(8901, MatroskaIds.DISPLAY_WIDTH)],
        [
            MatroskaIds.DISPLAY_UNIT,
            MatroskaTestUtils.getTestElement(VideoDisplayUnits.Centimeters, MatroskaIds.DISPLAY_UNIT)
        ],
        [MatroskaIds.PIXEL_HEIGHT, MatroskaTestUtils.getTestElement(9012, MatroskaIds.PIXEL_HEIGHT)],
        [MatroskaIds.PIXEL_WIDTH, MatroskaTestUtils.getTestElement(2345, MatroskaIds.PIXEL_WIDTH)]
    ]);

    @test
    public constructor_invalidParameters(): void {
        // Arrange
        const map = new Map<number, EbmlElement>();

        // Act / Assert
        Testers.testTruthy((v: Map<number, EbmlElement>) => new VideoTrack(v, map));
        Testers.testTruthy((v: Map<number, EbmlElement>) => new VideoTrack(map, v));
    }

    @test
    public constructor_wrongTrackType(): void {
        // Arrange
        const map = new Map<number, EbmlElement>();

        // Act / Assert
        assert.throws(() => new VideoTrack(map, map));

        map.set(
            MatroskaIds.TRACK_TYPE,
            MatroskaTestUtils.getTestElement(MatroskaTrackType.Audio, MatroskaIds.TRACK_TYPE)
        );
        assert.throws(() => new VideoTrack(map, map));

        map.set(
            MatroskaIds.TRACK_TYPE,
            MatroskaTestUtils.getTestElement(MatroskaTrackType.Buttons, MatroskaIds.TRACK_TYPE)
        );
        assert.throws(() => new VideoTrack(map, map));

        map.set(
            MatroskaIds.TRACK_TYPE,
            MatroskaTestUtils.getTestElement(MatroskaTrackType.Logo, MatroskaIds.TRACK_TYPE)
        );
        assert.throws(() => new VideoTrack(map, map));

        map.set(
            MatroskaIds.TRACK_TYPE,
            MatroskaTestUtils.getTestElement(MatroskaTrackType.Complex, MatroskaIds.TRACK_TYPE)
        );
        assert.throws(() => new VideoTrack(map, map));

        map.set(
            MatroskaIds.TRACK_TYPE,
            MatroskaTestUtils.getTestElement(MatroskaTrackType.Control, MatroskaIds.TRACK_TYPE)
        );
        assert.throws(() => new VideoTrack(map, map));

        map.set(
            MatroskaIds.TRACK_TYPE,
            MatroskaTestUtils.getTestElement(MatroskaTrackType.Metadata, MatroskaIds.TRACK_TYPE)
        );
        assert.throws(() => new VideoTrack(map, map));

        map.set(
            MatroskaIds.TRACK_TYPE,
            MatroskaTestUtils.getTestElement(MatroskaTrackType.Subtitle, MatroskaIds.TRACK_TYPE)
        );
        assert.throws(() => new VideoTrack(map, map));
    }

    @test
    public constructor_videoTrackEmpty(): void {
        // Arrange
        const trackElements = new Map<number, EbmlElement>([
            [MatroskaIds.TRACK_TYPE, MatroskaTestUtils.getTestElement(MatroskaTrackType.Video, MatroskaIds.TRACK_TYPE)]
        ]);
        const videoElements = new Map<number, EbmlElement>();

        // Act
        const track = new VideoTrack(trackElements, videoElements);

        // Assert
        assert.isUndefined(track.codecId);
        assert.isUndefined(track.codecName);
        assert.isUndefined(track.codecPrivateData);
        assert.strictEqual(track.description, "Unknown Video");
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
        assert.strictEqual(track.type, MatroskaTrackType.Video);

        assert.isUndefined(track.aspectRatioType);
        assert.isUndefined(track.cropBottom);
        assert.isUndefined(track.cropLeft);
        assert.isUndefined(track.cropRight);
        assert.isUndefined(track.cropTop);
        assert.isUndefined(track.displayHeight);
        assert.isUndefined(track.displayWidth);
        assert.isUndefined(track.displayUnits);
        assert.strictEqual(track.interlacingMode, VideoInterlaceFlag.Undetermined);
        assert.strictEqual(track.stereoMode, VideoStereoMode.Mono);
        assert.isUndefined(track.videoHeight);
        assert.isUndefined(track.videoWidth);
    }

    @test
    public constructor_videoTrackBase(): void {
        // Arrange
        const videoElements = new Map(this.BASE_VIDEO_ELEMENTS);
        const trackElements = new Map(this.BASE_TRACK_ELEMENTS);

        // Act
        const track = new VideoTrack(trackElements, videoElements);

        // Assert
        assert.strictEqual(track.codecId, "foo");
        assert.strictEqual(track.codecName, "bar");
        Testers.bvEqual(track.codecPrivateData, [0xAA, 0xBB, 0xCC]);
        assert.strictEqual(track.description, "bar Video");
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
        assert.strictEqual(track.type, MatroskaTrackType.Video);

        assert.strictEqual(track.aspectRatioType, 1234);
        assert.strictEqual(track.cropBottom, 3456);
        assert.strictEqual(track.cropLeft, 4567);
        assert.strictEqual(track.cropRight, 5678);
        assert.strictEqual(track.cropTop, 6789);
        assert.strictEqual(track.displayHeight, 7890);
        assert.strictEqual(track.displayWidth, 8901);
        assert.strictEqual(track.displayUnits, VideoDisplayUnits.Centimeters);
        assert.strictEqual(track.mediaTypes, MediaTypes.Video);
        assert.strictEqual(track.videoHeight, 9012);
        assert.strictEqual(track.videoWidth, 2345);
    }

    @test
    public constructor_originalIsOriginal(): void {
        // Arrange
        const trackElements = new Map<number, EbmlElement>([
            [MatroskaIds.TRACK_TYPE, MatroskaTestUtils.getTestElement(MatroskaTrackType.Video, MatroskaIds.TRACK_TYPE)],
            [MatroskaIds.FLAG_ORIGINAL, MatroskaTestUtils.getTestElement(true, MatroskaIds.FLAG_ORIGINAL)]
        ]);
        const videoElements = new Map<number, EbmlElement>();

        // Act
        const track = new VideoTrack(trackElements, videoElements);

        // Assert
        assert.isFalse(track.isTranslation);
    }

    @test
    public constructor_originalIsTranslation(): void {
        // Arrange
        const trackElements = new Map<number, EbmlElement>([
            [MatroskaIds.TRACK_TYPE, MatroskaTestUtils.getTestElement(MatroskaTrackType.Video, MatroskaIds.TRACK_TYPE)],
            [MatroskaIds.FLAG_ORIGINAL, MatroskaTestUtils.getTestElement(false, MatroskaIds.FLAG_ORIGINAL)]
        ]);
        const videoElements = new Map<number, EbmlElement>();

        // Act
        const track = new VideoTrack(trackElements, videoElements);

        // Assert
        assert.isTrue(track.isTranslation);
    }

    @test
    public constructor_interlacingModeOutsideRange(): void {
        // Arrange
        const trackElements = new Map<number, EbmlElement>([
            [MatroskaIds.TRACK_TYPE, MatroskaTestUtils.getTestElement(MatroskaTrackType.Video, MatroskaIds.TRACK_TYPE)]
        ]);
        const videoElements = new Map<number, EbmlElement>([
            [MatroskaIds.FLAG_INTERLACED, MatroskaTestUtils.getTestElement(1234, MatroskaIds.FLAG_INTERLACED)]
        ]);

        // Act
        const track = new VideoTrack(trackElements, videoElements);

        // Assert
        assert.strictEqual(track.interlacingMode, VideoInterlaceFlag.Undetermined);
    }

    @test
    public constructor_interlacingModeInsideRange(): void {
        // Arrange
        const trackElements = new Map<number, EbmlElement>([
            [MatroskaIds.TRACK_TYPE, MatroskaTestUtils.getTestElement(MatroskaTrackType.Video, MatroskaIds.TRACK_TYPE)]
        ]);
        const videoElements = new Map<number, EbmlElement>([
            [
                MatroskaIds.FLAG_INTERLACED,
                MatroskaTestUtils.getTestElement(VideoInterlaceFlag.Progressive, MatroskaIds.FLAG_INTERLACED)
            ]
        ]);

        // Act
        const track = new VideoTrack(trackElements, videoElements);

        // Assert
        assert.strictEqual(track.interlacingMode, VideoInterlaceFlag.Progressive);
    }

    @test
    public constructor_stereoModeOutsideRange(): void {
        // Arrange
        const trackElements = new Map<number, EbmlElement>([
            [MatroskaIds.TRACK_TYPE, MatroskaTestUtils.getTestElement(MatroskaTrackType.Video, MatroskaIds.TRACK_TYPE)]
        ]);
        const videoElements = new Map<number, EbmlElement>([
            [MatroskaIds.FLAG_INTERLACED, MatroskaTestUtils.getTestElement(1234, MatroskaIds.FLAG_INTERLACED)]
        ]);

        // Act
        const track = new VideoTrack(trackElements, videoElements);

        // Assert
        assert.strictEqual(track.interlacingMode, VideoInterlaceFlag.Undetermined);
    }

    @test
    public constructor_stereoModeInsideRange(): void {
        // Arrange
        const trackElements = new Map<number, EbmlElement>([
            [MatroskaIds.TRACK_TYPE, MatroskaTestUtils.getTestElement(MatroskaTrackType.Video, MatroskaIds.TRACK_TYPE)]
        ]);
        const videoElements = new Map<number, EbmlElement>([
            [
                MatroskaIds.FLAG_INTERLACED,
                MatroskaTestUtils.getTestElement(VideoInterlaceFlag.Progressive, MatroskaIds.FLAG_INTERLACED)
            ]
        ]);

        // Act
        const track = new VideoTrack(trackElements, videoElements);

        // Assert
        assert.strictEqual(track.interlacingMode, VideoInterlaceFlag.Progressive);
    }
}
