import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";
import {Mock} from "typemoq";

import EbmlElement from "../../src/ebml/ebmlElement";
import EbmlParserOptions from "../../src/ebml/ebmlParserOptions";
import MatroskaTagValue from "../../src/matroska/matroskaTagValue";
import MatroskaTestUtils from "./utils";
import TestFile from "../utilities/testFile";
import {ByteVector} from "../../src/byteVector";
import {MatroskaIds} from "../../src/matroska/matroskaIds";
import {Testers} from "../utilities/testers";

@suite
class Matroska_TagValueTests {
    @test
    public fromValue_invalidParams() {
        // Act / Assert
        Testers.testByte((v) => MatroskaTagValue.fromValue(v, "foo", "bar"));
        Testers.testTruthy<string>((v) => MatroskaTagValue.fromValue(123, v, "foo"));
        Testers.testTruthy<string|ByteVector>((v) => MatroskaTagValue.fromValue(123, "foo", v));
    }

    @test
    public fromValue_stringValue() {
        // Act
        const value = MatroskaTagValue.fromValue(123, "foo", "bar");

        // Assert
        assert.isOk(value);
        assert.isFalse(value.isBinary);
        assert.isTrue(value.isDefaultLanguage);
        assert.isTrue(value.isString);
        assert.strictEqual(value.languageCode, MatroskaTagValue.DEFAULT_LANGUAGE_CODE);
        assert.strictEqual(value.name, "foo");
        assert.isEmpty(value.nestedTags);
        assert.strictEqual(value.value, "bar")
    }

    @test
    public fromValue_byteVectorValue() {
        // Arrange
        const bv = ByteVector.fromByteArray([0x01, 0x02, 0x03]);

        // Act
        const value = MatroskaTagValue.fromValue(123, "foo", bv);

        // Assert
        assert.isOk(value);
        assert.isTrue(value.isBinary);
        assert.isTrue(value.isDefaultLanguage);
        assert.isFalse(value.isString);
        assert.strictEqual(value.languageCode, MatroskaTagValue.DEFAULT_LANGUAGE_CODE);
        assert.strictEqual(value.name, "foo");
        assert.isEmpty(value.nestedTags);
        Testers.bvEqual(<ByteVector>value.value, bv);
    }

    @test
    public fromTagEntry_invalidParams() {
        // Act / Assert
        Testers.testTruthy<EbmlElement>((e) => MatroskaTagValue.fromSimpleTagElement(e, 123))
        Testers.testByte((v) => MatroskaTagValue.fromSimpleTagElement(Mock.ofType<EbmlElement>().object, v));
    }

    @test
    public fromSimpleTagElement_invalidElement() {
        // Arrange
        const element = MatroskaTestUtils.getTestElement("foo", MatroskaIds.TAG);

        // Act / Assert
        assert.throws(() => MatroskaTagValue.fromSimpleTagElement(element, 123));
    }

    @test
    public fromSimpleTagElement_stringValueDefaultLanguage() {
        // Arrange
        const bytes = [
            0x45, 0xA3,       // Identifier (TAG_NAME)
            0x83,             // Size (3)
            0x41, 0x42, 0x43, // Value (ABC)

            0x44, 0x7A,       // Identifier (TAG_LANGUAGE)
            0x83,             // Size (3)
            0x75, 0x6E, 0x64, // Value (und)

            0x44, 0x84,       // Identifier (TAG_DEFAULT)
            0x81,             // Size (1)
            0x01,             // Value (true)

            0x44, 0x87,       // Identifier (TAG_STRING)
            0x83,             // Size (3)
            0x42, 0x43, 0x44  // Value (BCD)
        ];
        const element = new EbmlElement(
            TestFile.getFile(bytes),
            0,
            MatroskaIds.SIMPLE_TAG,
            bytes.length,
            new EbmlParserOptions());

        // Act
        const tagValue = MatroskaTagValue.fromSimpleTagElement(element, 123);

        // Assert
        assert.isOk(tagValue);
        assert.isFalse(tagValue.isBinary);
        assert.isTrue(tagValue.isDefaultLanguage);
        assert.isTrue(tagValue.isString);
        assert.strictEqual(tagValue.languageCode, MatroskaTagValue.DEFAULT_LANGUAGE_CODE);
        assert.strictEqual(tagValue.name, "ABC");
        assert.isEmpty(tagValue.nestedTags);
        assert.strictEqual(tagValue.value, "BCD");
    }

    @test
    public fromSimpleTagElement_binaryValueNonDefaultLanguage() {
        // Arrange
        const bytes = [
            0x45, 0xA3,       // Identifier (TAG_NAME)
            0x83,             // Size (3)
            0x41, 0x42, 0x43, // Value (ABC)

            0x44, 0x7A,       // Identifier (TAG_LANGUAGE)
            0x83,             // Size (3)
            0x65, 0x6E, 0x67, // Value (eng)

            0x44, 0x84,       // Identifier (TAG_DEFAULT)
            0x81,             // Size (1)
            0x00,             // Value (false)

            0x44, 0x85,       // Identifier (TAG_BINARY)
            0x83,             // Size (3)
            0x01, 0x02, 0x03  // Value
        ];
        const element = new EbmlElement(
            TestFile.getFile(bytes),
            0,
            MatroskaIds.SIMPLE_TAG,
            bytes.length,
            new EbmlParserOptions());

        // Act
        const tagValue = MatroskaTagValue.fromSimpleTagElement(element, 123);

        // Assert
        assert.isOk(tagValue);
        assert.isTrue(tagValue.isBinary);
        assert.isFalse(tagValue.isDefaultLanguage);
        assert.isFalse(tagValue.isString);
        assert.strictEqual(tagValue.languageCode, "eng");
        assert.strictEqual(tagValue.name, "ABC");
        assert.isEmpty(tagValue.nestedTags);
        Testers.bvEqual(<ByteVector>tagValue.value, [0x01, 0x02, 0x03]);
    }

    @test
    public fromSimpleTagElement_bcp47LanguageCode() {
        // Arrange
        const bytes = [
            0x45, 0xA3,       // Identifier (TAG_NAME)
            0x83,             // Size (3)
            0x41, 0x42, 0x43, // Value (ABC)

            0x44, 0x7B,       // Identifier (TAG_LANGUAGE_BCP47)
            0x83,             // Size (3)
            0x65, 0x6E, 0x67, // Value (eng)

            0x44, 0x84,       // Identifier (TAG_DEFAULT)
            0x81,             // Size (1)
            0x00,             // Value (false)

            0x44, 0x85,       // Identifier (TAG_BINARY)
            0x83,             // Size (3)
            0x01, 0x02, 0x03  // Value
        ];
        const element = new EbmlElement(
            TestFile.getFile(bytes),
            0,
            MatroskaIds.SIMPLE_TAG,
            bytes.length,
            new EbmlParserOptions());

        // Act
        const tagValue = MatroskaTagValue.fromSimpleTagElement(element, 123);

        // Assert
        assert.isOk(tagValue);
        assert.isTrue(tagValue.isBinary);
        assert.isFalse(tagValue.isDefaultLanguage);
        assert.isFalse(tagValue.isString);
        assert.strictEqual(tagValue.languageCode, "eng");
        assert.strictEqual(tagValue.name, "ABC");
        assert.isEmpty(tagValue.nestedTags);
        Testers.bvEqual(<ByteVector>tagValue.value, [0x01, 0x02, 0x03]);
    }

    @test
    public fromSimpleTagElement_bothValues() {
        // Arrange
        const bytes = [
            0x45, 0xA3,       // Identifier (TAG_NAME)
            0x83,             // Size (3)
            0x41, 0x42, 0x43, // Value (ABC)

            0x44, 0x7A,       // Identifier (TAG_LANGUAGE)
            0x83,             // Size (3)
            0x65, 0x6E, 0x67, // Value (eng)

            0x44, 0x84,       // Identifier (TAG_DEFAULT)
            0x81,             // Size (1)
            0x00,             // Value (false)

            0x44, 0x85,       // Identifier (TAG_BINARY)
            0x83,             // Size (3)
            0x01, 0x02, 0x03, // Value

            0x44, 0x87,       // Identifier (TAG_STRING)
            0x83,             // Size (3)
            0x42, 0x43, 0x44  // Value (BCD)
        ];
        const element = new EbmlElement(
            TestFile.getFile(bytes),
            0,
            MatroskaIds.SIMPLE_TAG,
            bytes.length,
            new EbmlParserOptions());

        // Act
        const tagValue = MatroskaTagValue.fromSimpleTagElement(element, 123);

        // Assert
        assert.isOk(tagValue);
        assert.isFalse(tagValue.isBinary);
        assert.isFalse(tagValue.isDefaultLanguage);
        assert.isTrue(tagValue.isString);
        assert.strictEqual(tagValue.languageCode, "eng");
        assert.strictEqual(tagValue.name, "ABC");
        assert.isEmpty(tagValue.nestedTags);
        assert.strictEqual(tagValue.value, "BCD");
    }

    @test
    public fromSimpleTagElement_nestedTags() {
        // Arrange
        const bytes = [
            0x45, 0xA3,       // Identifier (TAG_NAME)
            0x83,             // Size (3)
            0x41, 0x42, 0x43, // Value (ABC)

            0x44, 0x7A,       // Identifier (TAG_LANGUAGE)
            0x83,             // Size (3)
            0x65, 0x6E, 0x67, // Value (eng)

            0x44, 0x84,       // Identifier (TAG_DEFAULT)
            0x81,             // Size (1)
            0x00,             // Value (false)

            0x44, 0x87,       // Identifier (TAG_STRING)
            0x83,             // Size (3)
            0x42, 0x43, 0x44, // Value (BCD)

            0x67, 0xC8,       // Identifier (SIMPLE_TAG)
            0x96,             // Size (22)
                0x45, 0xA3,       // Identifier (TAG_NAME)
                0x83,             // Size (3)
                0x43, 0x44, 0x45, // Value (CDE)

                0x44, 0x7A,       // Identifier (TAG_LANGUAGE)
                0x83,             // Size (3)
                0x44, 0x45, 0x46, // Value (DEF)

                0x44, 0x84,       // Identifier (TAG_DEFAULT)
                0x81,             // Size (1)
                0x01,             // Value (true)

                0x44, 0x87,       // Identifier (TAG_STRING)
                0x83,             // Size (3)
                0x45, 0x46, 0x47, // Value (EFG)

            0x67, 0xC8,       // Identifier (SIMPLE_TAG)
            0x96,             // Size (22)
                0x45, 0xA3,       // Identifier (TAG_NAME)
                0x83,             // Size (3)
                0x46, 0x47, 0x48, // Value (FGH)

                0x44, 0x7A,       // Identifier (TAG_LANGUAGE)
                0x83,             // Size (3)
                0x47, 0x48, 0x49, // Value (GHI)

                0x44, 0x84,       // Identifier (TAG_DEFAULT)
                0x81,             // Size (1)
                0x01,             // Value (true)

                0x44, 0x87,       // Identifier (TAG_STRING)
                0x83,             // Size (3)
                0x48, 0x49, 0x4A  // Value (HIJ)
        ];
        const element = new EbmlElement(
            TestFile.getFile(bytes),
            0,
            MatroskaIds.SIMPLE_TAG,
            bytes.length,
            new EbmlParserOptions());

        // Act
        const tagValue = MatroskaTagValue.fromSimpleTagElement(element, 123);

        // Assert
        assert.isOk(tagValue);
        assert.isFalse(tagValue.isBinary);
        assert.isFalse(tagValue.isDefaultLanguage);
        assert.isTrue(tagValue.isString);
        assert.strictEqual(tagValue.languageCode, "eng");
        assert.strictEqual(tagValue.name, "ABC");
        assert.strictEqual(tagValue.value, "BCD");

        assert.strictEqual(tagValue.nestedTags.length, 2);

        const tag1 = tagValue.nestedTags[0];
        assert.isOk(tag1);
        assert.isFalse(tag1.isBinary);
        assert.isTrue(tag1.isDefaultLanguage);
        assert.isTrue(tag1.isString);
        assert.strictEqual(tag1.languageCode, "DEF");
        assert.strictEqual(tag1.name, "CDE");
        assert.strictEqual(tag1.value, "EFG");

        const tag2 = tagValue.nestedTags[1];
        assert.isOk(tag2);
        assert.isFalse(tag2.isBinary);
        assert.isTrue(tag2.isDefaultLanguage);
        assert.isTrue(tag2.isString);
        assert.strictEqual(tag2.languageCode, "GHI");
        assert.strictEqual(tag2.name, "FGH");
        assert.strictEqual(tag2.value, "HIJ");
    }

    @test
    public setIsDefaultLanguage() {
        // Arrange
        const value = MatroskaTagValue.fromValue(123, "foo", "bar");

        // Act
        value.isDefaultLanguage = true;

        // Assert
        assert.isTrue(value.isDefaultLanguage);
    }

    @test
    public setLanguage_bcp47OnOldVersion() {
        // Arrange
        const value = MatroskaTagValue.fromValue(2, "foo", "bar");

        // Act / Assert
        assert.throws(() => value.languageCode = "eng-us-foo");
        assert.strictEqual(value.languageCode, "und");
    }

    @test
    public setLanguage_outOfRange() {
        // Arrange
        const value = MatroskaTagValue.fromValue(123, "foo", "bar");

        // Act / Assert
        assert.throws(() => value.languageCode = "thisistotallynotavalue");
        assert.strictEqual(value.languageCode, "und");
    }

    @test
    public setLanguageCode_default() {
        // Arrange
        const value = MatroskaTagValue.fromValue(123, "foo", "bar");

        // Act
        value.languageCode = undefined;

        // Assert
        assert.strictEqual(value.languageCode, "und");
    }

    @test
    public setLanguageCode_bcp47() {
        // Arrange
        const value = MatroskaTagValue.fromValue(123, "foo", "bar");

        // Act
        value.languageCode = "eng-us-foo";

        // Assert
        assert.strictEqual(value.languageCode, "eng-us-foo");
    }

    @test
    public setLanguageCode_iso3692() {
        // Arrange
        const value = MatroskaTagValue.fromValue(123, "foo", "bar");

        // Act
        value.languageCode = "eng";

        // Assert
        assert.strictEqual(value.languageCode, "eng");
    }

    @test
    public setName_invalid() {
        // Arrange
        const value = MatroskaTagValue.fromValue(123, "foo", "bar");

        // Act / Assert
        Testers.testTruthy<string>((v) => value.name = v);
        assert.strictEqual(value.name, "foo");
    }

    @test
    public setName_valid() {
        // Arrange
        const value = MatroskaTagValue.fromValue(123, "foo", "bar");

        // Act
        value.name = "foobarbaz";

        // Assert
        assert.strictEqual(value.name, "foobarbaz");
    }

    @test
    public setNestedTags_invalid() {
        // Arrange
        const value = MatroskaTagValue.fromValue(123, "foo", "bar");

        // Act / Assert
        Testers.testTruthy<MatroskaTagValue[]>((v) => value.nestedTags = v);
        assert.isEmpty(value.nestedTags);
    }

    @test
    public setNestedTags_valid() {
        // Arrange
        const value = MatroskaTagValue.fromValue(123, "foo", "bar");
        const nested1 = MatroskaTagValue.fromValue(123, "foo1", "bar1");
        const nested2 = MatroskaTagValue.fromValue(123, "foo2", "bar2");

        // Act
        value.nestedTags = [nested1, nested2];

        // Assert
        assert.sameMembers(value.nestedTags, [nested1, nested2]);
    }

    @test
    public setValue_invalid() {
        // Arrange
        const value = MatroskaTagValue.fromValue(123, "foo", "bar");

        // Act / Assert
        Testers.testTruthy<string|ByteVector>((v) => value.value = v);
        assert.strictEqual(value.value, "bar");
    }

    @test
    public setValue_validString() {
        // Arrange
        const value = MatroskaTagValue.fromValue(123, "foo", "bar");

        // Act
        value.value = "foobarbaz";

        // Assert
        assert.strictEqual(value.value, "foobarbaz");
        assert.isFalse(value.isBinary);
        assert.isTrue(value.isString);
    }

    @test
    public setValue_validBytes() {
        // Arrange
        const value = MatroskaTagValue.fromValue(123, "foo", "bar");

        // Act
        value.value = ByteVector.fromByteArray([0x01, 0x02, 0x03]);

        // Assert
        Testers.bvEqual(value.value, [0x01, 0x02, 0x03]);
        assert.isTrue(value.isBinary);
        assert.isFalse(value.isString);
    }
}
