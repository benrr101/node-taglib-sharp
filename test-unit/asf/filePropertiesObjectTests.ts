import * as Chai from "chai";
import {suite, test} from "mocha-typescript";
import ObjectTests from "./objectTests";
import TestFile from "../utilities/testFile";
import {ByteVector} from "../../src/byteVector";
import {File} from "../../src/file";

import Guids from "../../src/asf/guids";
import FilePropertiesObject from "../../src/asf/objects/filePropertiesObject";
import UuidWrapper from "../../src/uuidWrapper";

// Setup Chai
const assert = Chai.assert;

@suite
class FilePropertiesObjectTests extends ObjectTests<FilePropertiesObject> {
    protected get fromFileConstructor(): (f: File, p: number) => FilePropertiesObject {
        return FilePropertiesObject.fromFile;
    }
    protected get minSize(): number { return 104; }
    protected get objectGuid(): UuidWrapper { return Guids.AsfFilePropertiesObject; }

    @test
    public fromFile_validParameters() {
        // Arrange
        const fileId = new UuidWrapper();
        const data = ByteVector.concatenate(
            ByteVector.fromSize(10), // Offset
            Guids.AsfFilePropertiesObject.toBytes(), // Object ID
            ByteVector.fromULong(104, false), // Object size
            fileId.toBytes(), // File ID
            ByteVector.fromULong(1234, false), // File Size
            ByteVector.fromULong(BigInt(116559432000000000), false), // Creation date
            ByteVector.fromULong(2345, false), // Data packets count
            ByteVector.fromULong(345600, false), // Play duration
            ByteVector.fromULong(456700, false), // Send duration
            ByteVector.fromULong(5678, false), // Preroll
            ByteVector.fromUInt(123, false), // Flags
            ByteVector.fromUInt(234, false), // Minimum data packet size
            ByteVector.fromUInt(345, false), // Maximum data packet size
            ByteVector.fromUInt(456, false) // Maximum bitrate
        );
        const file = TestFile.getFile(data);

        // Act
        const object = FilePropertiesObject.fromFile(file, 10);

        // Assert
        assert.isOk(object);
        assert.strictEqual(object.originalSize, 104);
        assert.isTrue(object.guid.equals(Guids.AsfFilePropertiesObject));
        assert.deepEqual(object.creationDate, new Date(Date.UTC(1970, 4, 13, 18, 0, 0)));
        assert.strictEqual(object.dataPacketsCount, BigInt(2345));
        assert.isTrue(object.fileId.equals(fileId));
        assert.strictEqual(object.fileSize, BigInt(1234));
        assert.strictEqual(object.flags, 123);
        assert.strictEqual(object.maximumBitrate, 456);
        assert.strictEqual(object.maximumDataPacketSize, 345);
        assert.strictEqual(object.minimumDataPacketSize, 234);
        assert.strictEqual(object.prerollMilliseconds, 5678);
        assert.strictEqual(object.playDurationMilliseconds, Math.floor(345600 / 10000));
        assert.strictEqual(object.sendDurationMilliseconds, Math.floor(456700 / 10000));
    }

    @test
    public render_isRoundTrip() {
        // Arrange
        const fileId = new UuidWrapper();
        const data = ByteVector.concatenate(
            ByteVector.fromSize(10), // Offset
            Guids.AsfFilePropertiesObject.toBytes(), // Object ID
            ByteVector.fromULong(104, false), // Object size
            fileId.toBytes(), // File ID
            ByteVector.fromULong(1234, false), // File Size
            ByteVector.fromULong(BigInt(116559432000000000), false), // Creation date
            ByteVector.fromULong(2345, false), // Data packets count
            ByteVector.fromULong(345600, false), // Play duration
            ByteVector.fromULong(456700, false), // Send duration
            ByteVector.fromULong(567800, false), // Preroll
            ByteVector.fromUInt(123, false), // Flags
            ByteVector.fromUInt(234, false), // Minimum data packet size
            ByteVector.fromUInt(345, false), // Maximum data packet size
            ByteVector.fromUInt(456, false) // Maximum bitrate
        );
        const file = TestFile.getFile(data);
        const object = FilePropertiesObject.fromFile(file, 10);

        // Act
        const output = object.render();

        // Assert
        assert.isOk(output);
        assert.isTrue(ByteVector.equal(output, data.mid(10)));
    }
}
