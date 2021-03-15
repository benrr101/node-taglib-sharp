import * as Chai from "chai";
import {suite, test} from "mocha-typescript";
import AsfFile from "../../src/asf/asfFile";
import Testers from "../utilities/testers";
import TestFile from "../utilities/testFile";
import UuidWrapper from "../../src/uuidWrapper";
import {ByteVector} from "../../src/byteVector";
import {NumberUtils} from "../../src/utils";

import Guids from "../../src/asf/guids";
import StreamPropertiesObject from "../../src/asf/objects/streamPropertiesObject";

// Setup chai
const assert = Chai.assert;

@suite class StreamPropertiesObjectTests {
    @test
    public fromFile_invalidParameters() {
        // Arrange
        const mockFile = <AsfFile> {};

        // Act / Assert
        Testers.testTruthy((v: AsfFile) => StreamPropertiesObject.fromFile(v, 0));
        Testers.testSafeUint((v) => StreamPropertiesObject.fromFile(mockFile, v));
    }

    @test
    public fromFile_tooSmall() {
        // Arrange
        const data = ByteVector.concatenate(
            ByteVector.fromSize(10), // Offset
            Guids.AsfStreamPropertiesObject.toBytes(), // Object ID
            ByteVector.fromULong(10) // Object size
        );
        const file = TestFile.getFile(data);

        // Act / Assert
        assert.throws(() => StreamPropertiesObject.fromFile(file, 10));
    }

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
        assert.isTrue(object.streamType.equals(this._streamTypeGuid));
        assert.strictEqual(object.timeOffsetMilliseconds, Math.floor(NumberUtils.ticksToMilli(this._timeOffset)));
        assert.isTrue(ByteVector.equal(object.typeSpecificData, this._typeSpecificData));
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

    private _errorCorrectionGuid = new UuidWrapper();
    private _errorCorrectionData = ByteVector.fromSize(23, 0x23);
    private _flags = 0x1234;
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
