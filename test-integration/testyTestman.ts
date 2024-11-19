import {suite, test} from "@testdeck/mocha";

import {File} from "../src";

@suite class TestyTestman {
    @test
    public test() {
        var file = File.createFromPath("E:\\Ben\\Sandbox\\test2.mp3");
        console.log(file.properties.durationMilliseconds);
        console.log(file.properties.audioBitrate);
    }
}