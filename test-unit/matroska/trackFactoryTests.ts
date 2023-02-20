import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import AudioTrack from "../../src/matroska/tracks/audioTrack";
import EbmlElement from "../../src/ebml/ebmlElement";
import TestFile from "../utilities/testFile";
import TrackFactory from "../../src/matroska/tracks/trackFactory";
import {MatroskaIds} from "../../src/matroska/matroskaIds";
import {MediaTypes} from "../../src/properties";
import {Track} from "../../src/matroska/tracks/track";
import {VideoTrack} from "../../src/matroska/tracks/videoTrack";

@suite
class Matroska_TrackFactoryTests {
    @test
    public audioTrack() {
        // Arrange
        const testBytes = [
            0x83, // Identifier (TRACK_TYPE)
            0x81, // Size (1)
            0x02, // Value: Audio
            0xE1, // Identifier (AUDIO)
            0x80  // Size (0)
        ];
        const element = new EbmlElement(TestFile.getFile(testBytes), 0, MatroskaIds.TRACK_ENTRY, testBytes.length, {});

        // Act
        const track = TrackFactory.fromTrackElement(element);

        // Assert
        assert.instanceOf(track, AudioTrack);
    }

    @test
    public videoTrack() {
        // Arrange
        const testBytes = [
            0x83, // Identifier (TRACK_TYPE)
            0x81, // Size (1)
            0x01, // Value: Video
            0xE0, // Identifier (VIDEO)
            0x80  // Size (0)
        ];
        const element = new EbmlElement(TestFile.getFile(testBytes), 0, MatroskaIds.TRACK_ENTRY, testBytes.length, {});

        // Act
        const track = TrackFactory.fromTrackElement(element);

        // Assert
        assert.instanceOf(track, VideoTrack);
    }

    @test
    public missing() {
        // Arrange
        const testBytes: number[] = [];
        const element = new EbmlElement(TestFile.getFile(testBytes), 0, MatroskaIds.TRACK_ENTRY, testBytes.length, {});

        // Act
        const track = TrackFactory.fromTrackElement(element);

        // Assert
        assert.instanceOf(track, Track);
        assert.strictEqual(track.mediaTypes, MediaTypes.None);
    }

    @test
    public outsideRange() {
        // Arrange
        const testBytes = [
            0x83, // Identifier (TRACK_TYPE)
            0x81, // Size
            0x10  // Logo
        ];
        const element = new EbmlElement(TestFile.getFile(testBytes), 0, MatroskaIds.TRACK_ENTRY, testBytes.length, {});

        // Act
        const track = TrackFactory.fromTrackElement(element);

        // Assert
        assert.instanceOf(track, Track);
        assert.strictEqual(track.mediaTypes, MediaTypes.None);
    }
}
