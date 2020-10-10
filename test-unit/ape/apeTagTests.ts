import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import {suite, test} from "mocha-typescript";

import ApeTag from "../../src/ape/apeTag";
import {ApeTagFooter, ApeTagFooterFlags} from "../../src/ape/apeTagFooter";
import {ApeTagItem} from "../../src/ape/apeTagItem";
import {ByteVector} from "../../src/byteVector";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

function getTestTagFooter(flags: ApeTagFooterFlags, itemCount: number, tagSize: number): ByteVector {
    return ByteVector.concatenate(
        ApeTagFooter.fileIdentifier,
        ByteVector.fromUInt(2000, false),
        ByteVector.fromUInt(tagSize, false),
        ByteVector.fromUInt(itemCount, false),
        ByteVector.fromUInt(flags, false),
        ByteVector.fromSize(8)
    );
}

@suite class ApeTag_ConstructorTests {
    @test
    public fromData_falsyData() {
        // Act / Assert
        assert.throws(() => { ApeTag.fromData(undefined); });
        assert.throws(() => { ApeTag.fromData(null); });
    }

    @test
    public fromData_dataIsZero() {
        // Arrange
        const data = getTestTagFooter(0, 0, 0);

        // Act / Assert
        assert.throws(() => { ApeTag.fromData(data); });
    }

    @test
    public fromData_footerWasAHeader() {
        // Arrange
        const data = getTestTagFooter(ApeTagFooterFlags.IsHeader, 0, 10);

        // Act / Assert
        assert.throws(() => { ApeTag.fromData(data); });
    }

    @test
    public fromData_dataTooShort() {
        // Arrange
        const data = getTestTagFooter(0, 0, 100);

        // Act / Assert
        assert.throws(() => { ApeTag.fromData(data); });
    }

    @test
    public fromData_emptyTag() {
        // Arrange
        const data = getTestTagFooter(0, 0, ApeTagFooter.size);

        // Act
        const tag = ApeTag.fromData(data);

        // Assert
        assert.isOk(tag);
        assert.isTrue(tag.isEmpty);
    }

    @test
    public fromData_tagWithItems() {
        // Arrange
        const item1 = ApeTagItem.fromTextValues("key1", "value1").render();
        const item2 = ApeTagItem.fromTextValues("key2", "value2").render();
        const data = ByteVector.concatenate(
            item1,
            item2,
            getTestTagFooter(0, 2, item1.length + item2.length + ApeTagFooter.size)
        );
    }
}
