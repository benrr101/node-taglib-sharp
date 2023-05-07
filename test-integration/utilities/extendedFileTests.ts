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
        assert.strictEqual(tag.replayGainTrackGain, -10.28);
        assert.strictEqual(tag.replayGainTrackPeak, 0.999969);
        assert.strictEqual(tag.replayGainAlbumGain, -9.98);
        assert.strictEqual(tag.replayGainAlbumPeak, 0.999980);
    }

    private static setTags(tag: Tag): void {
        tag.replayGainTrackGain = -10.28;
        tag.replayGainTrackPeak = 0.999969;
        tag.replayGainAlbumGain = -9.98;
        tag.replayGainAlbumPeak = 0.999980;
    }
}
