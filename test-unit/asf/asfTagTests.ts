import * as Chai from "chai";
import {suite, test} from "mocha-typescript";

import AsfTag from "../../src/asf/asfTag";
import BaseObject from "../../src/asf/objects/baseObject";
import HeaderObject from "../../src/asf/objects/headerObject";
import TestFile from "../utilities/testFile";
import {ByteVector} from "../../src/byteVector";
import {TagTesters, Testers} from "../utilities/testers";
import {Guids} from "../../src/asf/constants";
import ContentDescriptionObject from "../../src/asf/objects/contentDescriptionObject";
import {
    ContentDescriptor,
    ExtendedContentDescriptionObject
} from "../../src/asf/objects/extendedContentDescriptionObject";
import {MetadataDescriptor, MetadataLibraryObject} from "../../src/asf/objects/metadataLibraryObject";
import {DataType} from "../../src/asf/objects/descriptorBase";
import HeaderExtensionObject from "../../src/asf/objects/headerExtensionObject";
import {TagTypes} from "../../src/tag";
import PropertyTests from "../utilities/propertyTests";

// Setup chai
const assert = Chai.assert;

const getHeaderObject: (children: BaseObject[]) => HeaderObject = (children: BaseObject[]) => {
    const childrenBytes = ByteVector.concatenate(... children.map((o) => o.render()));
    const headerBytes = ByteVector.concatenate(
        Guids.AsfHeaderObject.toBytes(), // Object ID
        ByteVector.fromULong(30 + childrenBytes.length, false), // Object size
        ByteVector.fromUInt(children.length, false), // Child objects
        0x01, 0x02, // Reserved bytes
        childrenBytes
    );
    const headerFile = TestFile.getFile(headerBytes);
    return HeaderObject.fromFile(headerFile, 0);
};

const getHeaderExtensionObject: (children: BaseObject[]) => HeaderExtensionObject = (children: BaseObject[]) => {
    const childrenBytes = ByteVector.concatenate(... children.map((o) => o.render()));
    const headerExtBytes = ByteVector.concatenate(
        Guids.AsfHeaderExtensionObject.toBytes(), // Object ID
        ByteVector.fromULong(46 + childrenBytes.length, false), // Object size
        Guids.AsfReserved1.toBytes(), // Reserved field 1
        ByteVector.fromUShort(6, false), // Reserved field 2
        ByteVector.fromUInt(childrenBytes.length, false), // Header extension data length
        childrenBytes
    );
    const headerExtFile = TestFile.getFile(headerExtBytes);
    return HeaderExtensionObject.fromFile(headerExtFile, 0);
};

@suite class Asf_Tag_constructorTests {
    @test
    public fromEmpty() {
        // Act
        const tag = AsfTag.fromEmpty();

        // Assert
        assert.isOk(tag);
        assert.strictEqual(tag.tagTypes, TagTypes.Asf);
        assert.isOk(tag.contentDescriptionObject);
        assert.isTrue(tag.contentDescriptionObject.isEmpty);
        assert.isOk(tag.extendedContentDescriptionObject);
        assert.isTrue(tag.extendedContentDescriptionObject.isEmpty);

        TagTesters.testTagProperties(tag, {});
    }

    @test
    public fromHeader_falsyHeader() {
        // Act / Assert
        Testers.testTruthy((v: HeaderObject) => AsfTag.fromHeader(v));
    }

    @test
    public fromHeader_noChildren() {
        // Arrange
        const header = getHeaderObject([]);

        // Act
        const tag = AsfTag.fromHeader(header);

        // Assert
        assert.isOk(tag);
        assert.strictEqual(tag.tagTypes, TagTypes.Asf);
        assert.isOk(tag.contentDescriptionObject);
        assert.isTrue(tag.contentDescriptionObject.isEmpty);
        assert.isOk(tag.extendedContentDescriptionObject);
        assert.isTrue(tag.extendedContentDescriptionObject.isEmpty);

        TagTesters.testTagProperties(tag, {});
    }

    @test
    public fromHeader_hasChildren() {
        // Arrange
        // - Content descriptor
        const cdo = ContentDescriptionObject.fromEmpty();
        cdo.title = "foo";

        // - Extended content descriptor
        const contentDescriptor = new ContentDescriptor("bar", DataType.Bool, true);
        const ecdo = ExtendedContentDescriptionObject.fromEmpty();
        ecdo.addDescriptor(contentDescriptor);

        // - Metadata descriptor inside header extension object
        const metadataDescriptor = new MetadataDescriptor(0, 0, "baz", DataType.Bool, true);
        const mlo = MetadataLibraryObject.fromEmpty();
        mlo.addRecord(metadataDescriptor);
        const heo = getHeaderExtensionObject([mlo]);

        const header = getHeaderObject([cdo, ecdo, heo]);

        // Act
        const tag = AsfTag.fromHeader(header);

        // Assert
        assert.isOk(tag);
        assert.strictEqual(tag.tagTypes, TagTypes.Asf);

        assert.isOk(tag.contentDescriptionObject);
        assert.strictEqual(tag.contentDescriptionObject.title, "foo");

        assert.isOk(tag.extendedContentDescriptionObject);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors.length, 1);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].name, "bar");

        assert.isOk(tag.metadataLibraryObject);
        assert.strictEqual(tag.metadataLibraryObject.records.length, 1);
        assert.strictEqual(tag.metadataLibraryObject.records[0].name, "baz");

        TagTesters.testTagProperties(tag, {title: "foo"});
    }
}

@suite class Asf_Tag_PropertyTests {
    @test
    public title() {
        this.testContentDescriptorField(
            (t, v) => t.title = v,
            (t) => t.title,
            (cd) => cd.title
        );
    }

    @test
    public subtitle() {
        this.testExtendedDescriptionObjectStringField(
            (t, v) => t.subtitle = v,
            (t) => t.subtitle,
            "WM/SubTitle"
        );
    }

    private testContentDescriptorField(
        set: (t: AsfTag, v: string) => void,
        get: (t: AsfTag) => string,
        cdProperty: (cd: ContentDescriptionObject) => string
    ) {
        // Arrange
        const tag = AsfTag.fromEmpty();
        const setProp = (v: string) => set(tag, v);
        const getProp = () => get(tag);

        // Act / Assert
        assert.isUndefined(getProp());

        PropertyTests.propertyRoundTrip(setProp, getProp, "foo");
        assert.strictEqual(cdProperty(tag.contentDescriptionObject), "foo");

        PropertyTests.propertyRoundTrip(setProp, getProp, undefined);
        assert.isUndefined(cdProperty(tag.contentDescriptionObject));
    }

    private testExtendedDescriptionObjectStringField(
        set: (t: AsfTag, v: string) => void,
        get: (t: AsfTag) => string,
        descriptorName: string
    ) {
        // Arrange
        const tag = AsfTag.fromEmpty();
        const setProp = (v: string) => set(tag, v);
        const getProp = () => get(tag);

        // Act / Assert
        assert.isUndefined(getProp());

        PropertyTests.propertyRoundTrip(setProp, getProp, "foo");
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors.length, 1);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].name, descriptorName);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].type, DataType.Unicode);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].getString(), "foo");
    }
}
