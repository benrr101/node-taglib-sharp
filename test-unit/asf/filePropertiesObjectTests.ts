import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import FilePropertiesObject from "../../src/asf/objects/filePropertiesObject";
import ObjectTests from "./objectTests";
import TestFile from "../utilities/testFile";
import UuidWrapper from "../../src/uuidWrapper";
import {ByteVector} from "../../src/byteVector";
import {Guids, ObjectType} from "../../src/asf/constants";
import {File} from "../../src/file";
import {Testers} from "../utilities/testers";

@suite
class Asf_FilePropertiesObjectTests extends ObjectTests<FilePropertiesObject> {
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
            ByteVector.fromUlong(104, false), // Object size
            fileId.toBytes(), // File ID
            ByteVector.fromUlong(1234, false), // File Size
            ByteVector.fromUlong(BigInt(116559432000000000), false), // Creation date
            ByteVector.fromUlong(2345, false), // Data packets count
            ByteVector.fromUlong(345600, false), // Play duration
            ByteVector.fromUlong(456700, false), // Send duration
            ByteVector.fromUlong(5678, false), // Preroll
            ByteVector.fromUint(123, false), // Flags
            ByteVector.fromUint(234, false), // Minimum data packet size
            ByteVector.fromUint(345, false), // Maximum data packet size
            ByteVector.fromUint(456, false) // Maximum bitrate
        );
        const file = TestFile.getFile(data);

        // Act
        const object = FilePropertiesObject.fromFile(file, 10);

        // Assert
        assert.isOk(object);
        assert.isTrue(object.guid.equals(Guids.AsfFilePropertiesObject));
        assert.strictEqual(object.objectType, ObjectType.FilePropertiesObject);
        assert.strictEqual(object.originalSize, 104);
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
            ByteVector.fromUlong(104, false), // Object size
            fileId.toBytes(), // File ID
            ByteVector.fromUlong(1234, false), // File Size
            ByteVector.fromUlong(BigInt(116559432000000000), false), // Creation date
            ByteVector.fromUlong(2345, false), // Data packets count
            ByteVector.fromUlong(345600, false), // Play duration
            ByteVector.fromUlong(456700, false), // Send duration
            ByteVector.fromUlong(567800, false), // Preroll
            ByteVector.fromUint(123, false), // Flags
            ByteVector.fromUint(234, false), // Minimum data packet size
            ByteVector.fromUint(345, false), // Maximum data packet size
            ByteVector.fromUint(456, false) // Maximum bitrate
        );
        const file = TestFile.getFile(data);
        const object = FilePropertiesObject.fromFile(file, 10);

        // Act
        const output = object.render();

        // Assert
        assert.isOk(output);
        Testers.bvEqual(output, data.subarray(10));
    }
}
