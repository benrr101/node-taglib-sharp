import {assert} from "chai";
import {suite, test} from "@testdeck/mocha";

import TestConstants from "./utilities/testConstants";
import {File} from "../src";

@suite class Mp3_propertiesTest {

    private static readonly cbrFilePath = TestConstants.getSampleFilePath("sample_props_cbr.mp3");
    private static readonly vbriFilePath = TestConstants.getSampleFilePath("sample_props_vbri.mp3");
    private static readonly xingAbrFilePath = TestConstants.getSampleFilePath("sample_props_xingabr.mp3");
    private static readonly xingCbrFilePath = TestConstants.getSampleFilePath("sample_props_xingcbr.mp3");
    private static readonly xingVbrFilePath = TestConstants.getSampleFilePath("sample_props_xingvbr.mp3");

    private static files: File[] = [];

    public static after() {
        this.files.forEach(file => file.dispose());
    }

    @test
    public readCbrProperties() {
        // Arrange
        const file = File.createFromPath(Mp3_propertiesTest.cbrFilePath);
        Mp3_propertiesTest.files.push(file);

        // Act
        const properties = file.properties;

        // Assert
        assert.strictEqual(properties.audioBitrate, 128);
        assert.strictEqual(properties.audioChannels, 2);
        assert.strictEqual(properties.audioSampleRate, 44100);
        assert.approximately(properties.durationMilliseconds, 3000, 10)
    }

    @test
    public readVbriProperties() {
        // Arrange
        const file = File.createFromPath(Mp3_propertiesTest.vbriFilePath);
        Mp3_propertiesTest.files.push(file);

        // Act
        const properties = file.properties;

        // Assert
        assert.approximately(properties.audioBitrate, 45, 1);
        assert.strictEqual(properties.audioChannels, 2);
        assert.strictEqual(properties.audioSampleRate, 44100);
        assert.approximately(properties.durationMilliseconds, 3029, 5);
    }

    @test
    public readXingAbrProperties() {
        // Arrange
        const file = File.createFromPath(Mp3_propertiesTest.xingAbrFilePath);
        Mp3_propertiesTest.files.push(file);

        // Act
        const properties = file.properties;

        // Assert
        assert.approximately(properties.audioBitrate, 48, 1);
        assert.strictEqual(properties.audioChannels, 2);
        assert.strictEqual(properties.audioSampleRate, 44100);
        assert.strictEqual(properties.durationMilliseconds, 3000);
    }

    @test
    public readXingCbrProperties() {
        // Arrange
        const file = File.createFromPath(Mp3_propertiesTest.xingCbrFilePath);
        Mp3_propertiesTest.files.push(file);

        // Act
        const properties = file.properties;

        // Assert
        assert.strictEqual(properties.audioBitrate, 96);
        assert.strictEqual(properties.audioChannels, 2);
        assert.strictEqual(properties.audioSampleRate, 44100);
        assert.strictEqual(properties.durationMilliseconds, 3000)
    }

    @test
    public readXingVbrProperties() {
        // Arrange
        const file = File.createFromPath(Mp3_propertiesTest.xingVbrFilePath);
        Mp3_propertiesTest.files.push(file);

        // Act
        const properties = file.properties;

        // Assert
        assert.approximately(properties.audioBitrate, 50, 1);
        assert.strictEqual(properties.audioChannels, 2);
        assert.strictEqual(properties.audioSampleRate, 44100);
        assert.strictEqual(properties.durationMilliseconds, 3000);
    }
}