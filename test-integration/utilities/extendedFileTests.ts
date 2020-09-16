import * as fs from "fs";
import {assert} from "chai";

import Utilities from "./utilities";
import {File, Tag} from "../../src";

export default class ExtendedFileTests {
    public static writeExtendedTags(sampleFile: string, tmpFile: string): void {
        if (fs.existsSync(tmpFile)) {
            fs.unlinkSync(tmpFile);
        }

        fs.copyFileSync(sampleFile, tmpFile);

        try {
            let tmp = File.createFromPath(tmpFile);
            ExtendedFileTests.setTags(tmp.tag);
            tmp.save();

            tmp = File.createFromPath(tmpFile);
            ExtendedFileTests.checkTags(tmp.tag);
        } finally {
            Utilities.deleteBestEffort(tmpFile);
        }
    }

    private static checkTags(tag: Tag): void {
        assert.strictEqual(-10.28, tag.replayGainTrackGain);
        assert.strictEqual(0.999969, tag.replayGainTrackPeak);
        assert.strictEqual(-9.98, tag.replayGainAlbumGain);
        assert.strictEqual(0.999980, tag.replayGainAlbumPeak);
    }

    private static setTags(tag: Tag): void {
        tag.replayGainTrackGain = -10.28;
        tag.replayGainTrackPeak = 0.999969;
        tag.replayGainAlbumGain = -9.98;
        tag.replayGainAlbumPeak = 0.999980;
    }
}
