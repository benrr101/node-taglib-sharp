import {assert} from "chai";
import {IMock} from "typemoq";

import {Tag} from "../../src/tag";
import {ByteVector, StringType} from "../../src/byteVector";

export class Testers {
    public static testByte(testFunc: (testValue: number) => void): void {
        assert.throws(() => testFunc(-1));
        assert.throws(() => testFunc(1.23));
        assert.throws(() => testFunc(0x100));
    }

    public static testInt(testFunc: (testValue: number) => void, allowUndefined = false): void {
        assert.throws(() => testFunc(-2147483648 - 1));
        assert.throws(() => testFunc(1.23));
        assert.throws(() => testFunc(2147483647 + 1));
        assert.throws(() => testFunc(null));

        if (!allowUndefined) {
            assert.throws(() => testFunc(undefined));
        }
    }

    public static testString(testFunc: (testValue: string) => void): void {
        this.testTruthy(testFunc);
        assert.throws(() => testFunc(""));
    }

    public static testSafeInt(testFunc: (testValue: number) => void, allowUndefined = false): void {
        assert.throws(() => testFunc(Number.MIN_SAFE_INTEGER - 1));
        assert.throws(() => testFunc(1.23));
        assert.throws(() => testFunc(Number.MAX_SAFE_INTEGER + 1));
        assert.throws(() => testFunc(null));

        if (!allowUndefined) {
            assert.throws(() => testFunc(undefined));
        }
    }

    public static testSafeUint(testFunc: (testValue: number) => void, allowUndefined = false): void {
        assert.throws(() => testFunc(-1));
        assert.throws(() => testFunc(1.23));
        assert.throws(() => testFunc(Number.MAX_SAFE_INTEGER + 1));
        assert.throws(() => testFunc(null));

        if (!allowUndefined) {
            assert.throws(() => testFunc(undefined));
        }
    }

    public static testTruthy<T>(testFunc: (testValue: T) => void): void {
        assert.throws(() => testFunc(undefined));
        assert.throws(() => testFunc(null));
    }

    public static testUint(testFunc: (testValue: number) => void, allowUndefined = false): void {
        assert.throws(() => testFunc(-1));
        assert.throws(() => testFunc(1.23));
        assert.throws(() => testFunc(0xFFFFFFFF + 1));
        assert.throws(() => testFunc(null));

        if (!allowUndefined) {
            assert.throws(() => testFunc(undefined));
        }
    }

    public static testUlong(testFunc: (testValue: bigint) => void, allowUndefined = false): void {
        assert.throws(() => testFunc(BigInt(-1)));
        assert.throws(() => testFunc(BigInt(1.23)));
        assert.throws(() => testFunc(BigInt(0xFFFFFFFFFFFFFFFF) + BigInt(1)));
        assert.throws(() => testFunc(null));

        if (!allowUndefined) {
            assert.throws(() => testFunc(undefined));
        }
    }

    public static testUshort(testFunc: (testValue: number) => void, allowUndefined = false): void {
        assert.throws(() => testFunc(-1));
        assert.throws(() => testFunc(1.23));
        assert.throws(() => testFunc(0xFFFF + 1));
        assert.throws(() => testFunc(null));

        if (!allowUndefined) {
            assert.throws(() => testFunc(undefined));
        }
    }

    public static bvEqual(actual: ByteVector, expected: ByteVector) {
        const getPortion = (bv: ByteVector, pointer: number) => {
            const min = Math.max(pointer - 10, 0);
            const max = Math.min(pointer + 10, bv.length - 1);
            const mid = bv.subarray(min, max - min);
            return {
                offset: Math.min(10, pointer) + 1,
                portion: mid.toString(StringType.UTF8)
            };
        };

        const getMessage = (bvX: ByteVector, bvY: ByteVector, position: number): string => {
            const xPort = getPortion(bvX, position);
            const yPort = getPortion(bvY, position);
            const spacing = new Array(xPort.offset).join(" ");
            return `Difference at index: ${position}\n`
                 + `Actual:   ${xPort.portion}\n`
                 + `          ${spacing}^ 0x${bvX.get(position).toString(16).padStart(2, "0")}\n`
                 + `Expected: ${yPort.portion}\n`
                 + `          ${spacing}^ 0x${bvY.get(position).toString(16).padStart(2, "0")}\n`;
        };

        let pos = 0;
        while (pos < actual.length && pos < expected.length) {
            if (actual.get(pos) !== expected.get(pos)) {
                assert.fail(getMessage(actual, expected, pos));
            }

            pos++;
        }

        if (pos < actual.length || pos < expected.length) {
            assert.fail(getMessage(actual, expected, pos));
        }
    }
}

export class TagTesters {
    private static EXPECTED_DEFAULTS: {[name: string]: {getter: (t: Tag) => unknown, expected: unknown}} = {
        album: {
            expected: undefined,
            getter: (t) => t.album
        },
        albumArtists: {
            expected: [],
            getter: (t) => t.albumArtists
        },
        albumArtistsSort: {
            expected: [],
            getter: (t) => t.albumArtistsSort
        },
        albumSort: {
            expected: undefined,
            getter: (t) => t.albumSort
        },
        amazonId: {
            expected: undefined,
            getter: (t) => t.amazonId
        },
        beatsPerMinute: {
            expected: 0,
            getter: (t) => t.beatsPerMinute
        },
        comment: {
            expected: undefined,
            getter: (t) => t.comment
        },
        composers: {
            expected: [],
            getter: (t) => t.composers
        },
        composersSort: {
            expected: [],
            getter: (t) => t.composersSort
        },
        conductor: {
            expected: undefined,
            getter: (t) => t.conductor
        },
        copyright: {
            expected: undefined,
            getter: (t) => t.copyright
        },
        dateTagged: {
            expected: undefined,
            getter: (t) => t.dateTagged
        },
        description: {
            expected: undefined,
            getter: (t) => t.description
        },
        disc: {
            expected: 0,
            getter: (t) => t.disc
        },
        discCount: {
            expected: 0,
            getter: (t) => t.discCount
        },
        genres: {
            expected: [],
            getter: (t) => t.genres
        },
        grouping: {
            expected: undefined,
            getter: (t) => t.grouping
        },
        initialKey: {
            expected: undefined,
            getter: (t) => t.initialKey
        },
        isrc: {
            expected: undefined,
            getter: (t) => t.isrc
        },
        lyrics: {
            expected: undefined,
            getter: (t) => t.lyrics
        },
        musicBrainzArtistId: {
            expected: undefined,
            getter: (t) => t.musicBrainzArtistId
        },
        musicBrainzDiscId: {
            expected: undefined,
            getter: (t) => t.musicBrainzDiscId
        },
        musicBrainzReleaseArtistId: {
            expected: undefined,
            getter: (t) => t.musicBrainzReleaseArtistId
        },
        musicBrainzReleaseCountry: {
            expected: undefined,
            getter: (t) => t.musicBrainzReleaseCountry
        },
        musicBrainzReleaseGroupId: {
            expected: undefined,
            getter: (t) => t.musicBrainzReleaseGroupId
        },
        musicBrainzReleaseId: {
            expected: undefined,
            getter: (t) => t.musicBrainzReleaseId
        },
        musicBrainzReleaseStatus: {
            expected: undefined,
            getter: (t) => t.musicBrainzReleaseStatus
        },
        musicBrainzReleaseType: {
            expected: undefined,
            getter: (t) => t.musicBrainzReleaseType
        },
        musicBrainzTrackId: {
            expected: undefined,
            getter: (t) => t.musicBrainzTrackId
        },
        musicIpId: {
            expected: undefined,
            getter: (t) => t.musicIpId
        },
        performers: {
            expected: [],
            getter: (t) => t.performers
        },
        performersRole: {
            expected: [],
            getter: (t) => t.performersRole
        },
        performersSort: {
            expected: [],
            getter: (t) => t.performersSort
        },
        pictures: {
            expected: [],
            getter: (t) => t.pictures
        },
        publisher: {
            expected: undefined,
            getter: (t) => t.publisher
        },
        remixedBy: {
            expected: undefined,
            getter: (t) => t.remixedBy
        },
        replayGainAlbumGain: {
            expected: NaN,
            getter: (t) => t.replayGainAlbumGain
        },
        replayGainAlbumPeak: {
            expected: NaN,
            getter: (t) => t.replayGainAlbumPeak
        },
        replayGainTrackGain: {
            expected: NaN,
            getter: (t) => t.replayGainTrackGain
        },
        replayGainTrackPeak: {
            expected: NaN,
            getter: (t) => t.replayGainTrackPeak
        },
        subtitle: {
            expected: undefined,
            getter: (t) => t.subtitle
        },
        title: {
            expected: undefined,
            getter: (t) => t.title
        },
        titleSort: {
            expected: undefined,
            getter: (t) => t.titleSort
        },
        track: {
            expected: 0,
            getter: (t) => t.track
        },
        trackCount: {
            expected: 0,
            getter: (t) => t.trackCount
        },
        year: {
            expected: 0,
            getter: (t) => t.year
        }
    };

    public static testTagProperties(tag: Tag, expectedOverrides: {[property: string]: unknown}) {
        for (const [key, val] of Object.entries(TagTesters.EXPECTED_DEFAULTS)) {
            const expected = expectedOverrides[key] || val.expected;
            assert.deepEqual(val.getter(tag), expected, `${key}`);
        }
    }

    public static setupTagMock<TTag extends Tag>(mockTag: IMock<TTag>): void {
        for (const value of Object.values(TagTesters.EXPECTED_DEFAULTS)) {
            mockTag.setup(value.getter).returns(() => value.expected);
        }
    }
}
