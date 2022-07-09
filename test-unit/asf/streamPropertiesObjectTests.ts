import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import ObjectTests from "./objectTests";
import RiffBitmapInfoHeader from "../../src/riff/riffBitmapInfoHeader";
import RiffWaveFormatEx from "../../src/riff/riffWaveFormatEx";
import StreamPropertiesObject from "../../src/asf/objects/streamPropertiesObject";
import TestFile from "../utilities/testFile";
import UuidWrapper from "../../src/uuidWrapper";
import {ByteVector} from "../../src/byteVector";
import {Guids, ObjectType} from "../../src/asf/constants";
import {File} from "../../src/file";
import {MediaTypes} from "../../src/properties";
import {Testers} from "../utilities/testers";
import {NumberUtils} from "../../src/utils";

@suite class Asf_StreamPropertiesObjectTests extends ObjectTests<StreamPropertiesObject> {
    protected get fromFileConstructor(): (f: File, p: number) => StreamPropertiesObject {
        return StreamPropertiesObject.fromFile;
    }
    protected get minSize(): number { return 78; }
    protected get objectGuid(): UuidWrapper { return Guids.ASF_STREAM_PROPERTIES_OBJECT; }

    @test
    public fromFile_validParameters() {
        // Arrange
        const data = this.getObjectBytes();
        const file = TestFile.getFile(data);

        // Act
        const object = StreamPropertiesObject.fromFile(file, 10);

        // Assert
        assert.isOk(object);
        assert.isTrue(object.guid.equals(Guids.ASF_STREAM_PROPERTIES_OBJECT));
        assert.strictEqual(object.objectType, ObjectType.StreamPropertiesObject);
        assert.strictEqual(object.originalSize, this._originalSize);
        Testers.bvEqual(object.errorCorrectionData, this._errorCorrectionData);
        assert.isTrue(object.errorCorrectionType.equals(this._errorCorrectionGuid));
        assert.strictEqual(object.flags, this._flags);
        assert.strictEqual(object.streamNumber, this._streamNumber);
        assert.isTrue(object.streamType.equals(this._streamTypeGuid));
        assert.strictEqual(object.timeOffsetMilliseconds, Math.floor(NumberUtils.ticksToMilli(this._timeOffset)));
        Testers.bvEqual(object.typeSpecificData, this._typeSpecificData);

        assert.isNotOk(object.codec);
    }

    @test
    public render_isRoundTrip() {
        // Arrange
        const data = this.getObjectBytes();
        const file = TestFile.getFile(data);
        const object = StreamPropertiesObject.fromFile(file, 10);

        // Act
        const output = object.render();

        // Assert
        assert.isOk(output);
        Testers.bvEqual(output, data.subarray(10));
    }

    @test
    public codec_audioStream() {
        // Arrange
        const bytes = ByteVector.concatenate(
            Guids.ASF_STREAM_PROPERTIES_OBJECT.toBytes(), // Object ID
            ByteVector.fromUlong(this._originalSize, false), // Object size
            Guids.ASF_AUDIO_MEDIA.toBytes(), // Stream type
            this._errorCorrectionGuid.toBytes(), // Error correction type GUID
            ByteVector.fromUlong(this._timeOffset, false), // Time offset
            ByteVector.fromUint(16, false), // Type specific data length
            ByteVector.fromUint(this._errorCorrectionData.length, false), // Error correction data length
            ByteVector.fromShort(this._flags, false), // Flags
            ByteVector.fromSize(4, 0x0), // Reserved
            // AUDIO TYPE SPECIFIC DATA
            ByteVector.fromUshort(0xF1AC, false), // Format tag
            ByteVector.fromUshort(3, false), // Number of channels
            ByteVector.fromUint(1234, false), // Samples per second
            ByteVector.fromUint(2345, false), // Average bytes per second
            ByteVector.fromUshort(88, false), // Block align
            ByteVector.fromUshort(16, false), // Bits per sample
            this._errorCorrectionData
        );
        const file = TestFile.getFile(bytes);
        const object = StreamPropertiesObject.fromFile(file, 0);

        // Act
        const codec = object.codec;

        // Assert
        assert.isOk(codec);
        assert.isTrue(codec instanceof RiffWaveFormatEx);
        assert.strictEqual(codec.mediaTypes, MediaTypes.LosslessAudio);
    }

    @test
    public codec_videoStream() {
        // Arrange
        const bytes = ByteVector.concatenate(
            Guids.ASF_STREAM_PROPERTIES_OBJECT.toBytes(), // Object ID
            ByteVector.fromUlong(this._originalSize, false), // Object size
            Guids.ASF_VIDEO_MEDIA.toBytes(), // Stream type
            this._errorCorrectionGuid.toBytes(), // Error correction type GUID
            ByteVector.fromUlong(this._timeOffset, false), // Time offset
            ByteVector.fromUint(51, false), // Type specific data length
            ByteVector.fromUint(this._errorCorrectionData.length, false), // Error correction data length
            ByteVector.fromShort(this._flags, false), // Flags
            ByteVector.fromSize(4, 0x0), // Reserved
            // VIDEO TYPE SPECIFIC DATA
            ByteVector.fromSize(11), // Offset (ASF summary of video specific data)
            ByteVector.fromUint(40, false), // Size of the struct
            ByteVector.fromUint(123, false), // Width of image
            ByteVector.fromUint(234, false), // Height of image
            ByteVector.fromUshort(345, false), // Number of planes
            ByteVector.fromUshort(456, false), // Average bits per pixel
            ByteVector.fromUint(0x58564944, false), // FOURCC [DIVX]
            ByteVector.fromUint(567, false), // Size of the image
            ByteVector.fromUint(678, false), // Pixels per meter X
            ByteVector.fromUint(789, false), // Pixels per meter Y
            ByteVector.fromUint(890, false), // Colors used
            ByteVector.fromUint(1234, false), // Important colors
            this._errorCorrectionData
        );
        const file = TestFile.getFile(bytes);
        const object = StreamPropertiesObject.fromFile(file, 0);

        // Act
        const codec = object.codec;

        // Assert
        assert.isOk(codec);
        assert.isTrue(codec instanceof RiffBitmapInfoHeader);
        assert.strictEqual(codec.mediaTypes, MediaTypes.Video);
    }

    private _errorCorrectionGuid = new UuidWrapper();
    private _errorCorrectionData = ByteVector.fromSize(23, 0x23);
    private _streamNumber = 0x34;
    private _flags = 0x1200 | this._streamNumber;
    private _streamTypeGuid = new UuidWrapper();
    private _timeOffset = 1234567890;
    private _typeSpecificData = ByteVector.fromSize(12, 0x12);
    private _originalSize = 16 + 8 + 16 + 16 + 8 + 4 + 4 + 2 + 4
        + this._errorCorrectionData.length + this._typeSpecificData.length;

    private getObjectBytes() {
        return ByteVector.concatenate(
            ByteVector.fromSize(10), // Offset
            Guids.ASF_STREAM_PROPERTIES_OBJECT.toBytes(), // Object ID
            ByteVector.fromUlong(this._originalSize, false), // Object size
            this._streamTypeGuid.toBytes(), // Stream type
            this._errorCorrectionGuid.toBytes(), // Error correction type GUID
            ByteVector.fromUlong(this._timeOffset, false), // Time offset
            ByteVector.fromUint(this._typeSpecificData.length, false), // Type specific data length
            ByteVector.fromUint(this._errorCorrectionData.length, false), // Error correction data length
            ByteVector.fromShort(this._flags, false), // Flags
            ByteVector.fromSize(4, 0x0), // Reserved
            this._typeSpecificData,
            this._errorCorrectionData
        );
    }
}
