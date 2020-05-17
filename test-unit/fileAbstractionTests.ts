import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import * as TypeMoq from "typemoq";
import {slow, suite, test, timeout} from "mocha-typescript";

import TestConstants from "./testConstants";
import {LocalFileAbstraction} from "../src/fileAbstraction";
import {IStream} from "../src/stream";

// Setup Chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

@suite class LocalFileAbstractionTests {
    @test
    public constructor_test() {
        // Act
        const fileAbstraction = new LocalFileAbstraction(TestConstants.testFilePath);

        // Assert
        assert.strictEqual(fileAbstraction.name, TestConstants.testFilePath);

        let readStream;
        let writeStream;
        try {
            readStream = fileAbstraction.readStream;
            assert.isFalse(readStream.canWrite);

            writeStream = fileAbstraction.writeStream;
            assert.isTrue(writeStream.canWrite);
        } finally {
            if (readStream) { readStream.close(); }
            if (writeStream) { writeStream.close(); }
        }
    }

    @test
    public closeStream_invalidStream() {
        // Arrange
        const abstraction = new LocalFileAbstraction(TestConstants.testFilePath);

        // Act / Assert
        assert.throws(() => abstraction.closeStream(null));
        assert.throws(() => abstraction.closeStream(undefined));
    }

    @test
    public closeStream_closesStream() {
        // Arrange
        const abstraction = new LocalFileAbstraction(TestConstants.testFilePath);
        const testStream = TypeMoq.Mock.ofType<IStream>();
        testStream.setup((s) => s.close());

        // Act
        abstraction.closeStream(testStream.object);

        // Assert
        testStream.verify((s) => s.close(), TypeMoq.Times.once());
    }
}
