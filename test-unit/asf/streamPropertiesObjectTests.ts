import * as Chai from "chai";
import {suite, test} from "mocha-typescript";
import ObjectTests from "./objectTests";
import TestFile from "../utilities/testFile";
import UuidWrapper from "../../src/uuidWrapper";
import {ByteVector} from "../../src/byteVector";
import {File} from "../../src/file";
import {NumberUtils} from "../../src/utils";

import Guids from "../../src/asf/guids";
import RiffBitmapInfoHeader from "../../src/riff/riffBitmapInfoHeader";
import RiffWaveFormatEx from "../../src/riff/riffWaveFormatEx";
import StreamPropertiesObject from "../../src/asf/objects/streamPropertiesObject";
import {MediaTypes} from "../../src/icodec";

// Setup chai
const assert = Chai.assert;

@suite class Asf_StreamPropertiesObjectTests extends ObjectTests<StreamPropertiesObject> {
    protected get fromFileConstructor(): (f: File, p: number) => StreamPropertiesObject {
        return StreamPropertiesObject.fromFile;
    }
    protected get minSize(): number { return 78; }
    protected get objectGuid(): UuidWrapper { return Guids.AsfStreamPropertiesObject; }

    @test
    public fromFile_validParameters() {
        // Arrange
        const data = this.getObjectBytes();
        const file = TestFile.getFile(data);

        // Act
        const object = StreamPropertiesObject.fromFile(file, 10);

        // Assert
        assert.isOk(object);
        assert.strictEqual(object.originalSize, this._originalSize);
        assert.isTrue(object.guid.equals(Guids.AsfStreamPropertiesObject));
        assert.isTrue(ByteVector.equal(object.errorCorrectionData, this._errorCorrectionData));
        assert.isTrue(object.errorCorrectionType.equals(this._errorCorrectionGuid));
        assert.strictEqual(object.flags, this._flags);
        assert.strictEqual(object.streamNumber, this._streamNumber);
        assert.isTrue(object.streamType.equals(this._streamTypeGuid));
        assert.strictEqual(object.timeOffsetMilliseconds, Math.floor(NumberUtils.ticksToMilli(this._timeOffset)));
        assert.isTrue(ByteVector.equal(object.typeSpecificData, this._typeSpecificData));

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
        assert.isTrue(ByteVector.equal(output, data.mid(10)));
    }

    @test
    public codec_audioStream() {
        // Arrange
        const bytes = ByteVector.concatenate(
            Guids.AsfStreamPropertiesObject.toBytes(), // Object ID
            ByteVector.fromULong(this._originalSize, false), // Object size
            Guids.AsfAudioMedia.toBytes(), // Stream type
            this._errorCorrectionGuid.toBytes(), // Error correction type GUID
            ByteVector.fromULong(this._timeOffset, false), // Time offset
            ByteVector.fromUInt(16, false), // Type specific data length
            ByteVector.fromUInt(this._errorCorrectionData.length, false), // Error correction data length
            ByteVector.fromShort(this._flags, false), // Flags
            ByteVector.fromSize(4, 0x0), // Reserved
            // AUDIO TYPE SPECIFIC DATA
            ByteVector.fromUShort(0xF1AC, false), // Format tag
            ByteVector.fromUShort(3, false), // Number of channels
            ByteVector.fromUInt(1234, false), // Samples per second
            ByteVector.fromUInt(2345, false), // Average bytes per second
            ByteVector.fromUShort(88, false), // Block align
            ByteVector.fromUShort(16, false), // Bits per sample
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
            Guids.AsfStreamPropertiesObject.toBytes(), // Object ID
            ByteVector.fromULong(this._originalSize, false), // Object size
            Guids.AsfVideoMedia.toBytes(), // Stream type
            this._errorCorrectionGuid.toBytes(), // Error correction type GUID
            ByteVector.fromULong(this._timeOffset, false), // Time offset
            ByteVector.fromUInt(51, false), // Type specific data length
            ByteVector.fromUInt(this._errorCorrectionData.length, false), // Error correction data length
            ByteVector.fromShort(this._flags, false), // Flags
            ByteVector.fromSize(4, 0x0), // Reserved
            // VIDEO TYPE SPECIFIC DATA
            ByteVector.fromSize(11), // Offset (ASF summary of video specific data)
            ByteVector.fromUInt(40, false), // Size of the struct
            ByteVector.fromUInt(123, false), // Width of image
            ByteVector.fromUInt(234, false), // Height of image
            ByteVector.fromUShort(345, false), // Number of planes
            ByteVector.fromUShort(456, false), // Average bits per pixel
            ByteVector.fromUInt(0x58564944, false), // FOURCC [DIVX]
            ByteVector.fromUInt(567, false), // Size of the image
            ByteVector.fromUInt(678, false), // Pixels per meter X
            ByteVector.fromUInt(789, false), // Pixels per meter Y
            ByteVector.fromUInt(890, false), // Colors used
            ByteVector.fromUInt(1234, false), // Important colors
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
            Guids.AsfStreamPropertiesObject.toBytes(), // Object ID
            ByteVector.fromULong(this._originalSize, false), // Object size
            this._streamTypeGuid.toBytes(), // Stream type
            this._errorCorrectionGuid.toBytes(), // Error correction type GUID
            ByteVector.fromULong(this._timeOffset, false), // Time offset
            ByteVector.fromUInt(this._typeSpecificData.length, false), // Type specific data length
            ByteVector.fromUInt(this._errorCorrectionData.length, false), // Error correction data length
            ByteVector.fromShort(this._flags, false), // Flags
            ByteVector.fromSize(4, 0x0), // Reserved
            this._typeSpecificData,
            this._errorCorrectionData
        );
    }
}
