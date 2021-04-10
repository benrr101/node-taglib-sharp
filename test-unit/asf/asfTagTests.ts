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

    @test
    public titleSort() {
        this.testExtendedDescriptionObjectStringField(
            (t, v) => t.titleSort = v,
            (t) => t.titleSort,
            "WM/TitleSortOrder"
        );
    }

    @test
    public description() {
        this.testContentDescriptorField(
            (t, v) => t.description = v,
            (t) => t.description,
            (cd) => cd.description
        );
    }

    @test
    public performers() {
        this.testContentDescriptorArray(
            (t, v) => t.performers = v,
            (t) => t.performers,
            (cd) => cd.author
        );
    }

    @test
    public performersSort() {
        this.testExtendedDescriptionObjectStringArray(
            (t, v) => t.performersSort = v,
            (t) => t.performersSort,
            "WM/ArtistSortOrder"
        );
    }

    @test
    public albumArtists() {
        this.testExtendedDescriptionObjectStringArray(
            (t, v) => t.albumArtists = v,
            (t) => t.albumArtists,
            "WM/AlbumArtist", "AlbumArtist"
        );
    }

    @test
    public albumArtistsSort() {
        this.testExtendedDescriptionObjectStringArray(
            (t, v) => t.albumArtistsSort = v,
            (t) => t.albumArtistsSort,
            "WM/AlbumArtistSortOrder"
        );
    }

    @test
    public composers() {
        this.testExtendedDescriptionObjectStringArray(
            (t, v) => t.composers = v,
            (t) => t.composers,
            "WM/Composer", "Composer"
        );
    }

    @test
    public album() {
        this.testExtendedDescriptionObjectStringField(
            (t, v) => t.album = v,
            (t) => t.album,
            "WM/AlbumTitle", "Album"
        );
    }

    private testContentDescriptorArray(
        set: (t: AsfTag, v: string[]) => void,
        get: (t: AsfTag) => string[],
        cdProperty: (cd: ContentDescriptionObject) => string
    ) {
        // Arrange
        const tag = AsfTag.fromEmpty();
        const setProp = (v: string[]) => set(tag, v);
        const getProp = () => get(tag);

        // Act / Assert
        assert.deepStrictEqual(getProp(), []);

        PropertyTests.propertyRoundTrip(setProp, getProp, ["foo", "bar", "baz"]);
        assert.strictEqual(cdProperty(tag.contentDescriptionObject), "foo; bar; baz");

        PropertyTests.propertyRoundTrip(setProp, getProp, []);
        assert.isUndefined(cdProperty(tag.contentDescriptionObject));
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

    private testExtendedDescriptionObjectStringArray(
        set: (t: AsfTag, v: string[]) => void,
        get: (t: AsfTag) => string[],
        ...descriptorName: string[]
    ) {
        // TEST CASE 1: Basic Case -----------------------------------------
        // Arrange
        const tag = AsfTag.fromEmpty();
        const setProp = (v: string[]) => set(tag, v);
        const getProp = () => get(tag);

        // Act / Assert
        assert.deepStrictEqual(getProp(), []);

        PropertyTests.propertyRoundTrip(setProp, getProp, ["foo", "bar", "baz"]);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors.length, 1);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].name, descriptorName[0]);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].type, DataType.Unicode);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].getString(), "foo; bar; baz");

        // End test cases if there's only one descriptor name
        if (descriptorName.length === 1) {
            return;
        }

        // TEST CASE 2: Preferential descriptor names ----------------------
        for (let i = 0; i < descriptorName.length; i++) {
            // Arrange
            const edco = ExtendedContentDescriptionObject.fromEmpty();
            for (let j = descriptorName.length; j > i; j--) {
                const descriptor = new ContentDescriptor(descriptorName[j - 1], DataType.Unicode, `foo${j - 1};bar`);
                edco.addDescriptor(descriptor);
            }

            const headerObject = getHeaderObject([edco]);
            const tag2 = AsfTag.fromHeader(headerObject);
            const setProp2 = (v: string[]) => set(tag2, v);
            const getProp2 = () => get(tag2);

            // Act / Assert
            assert.deepStrictEqual(getProp2(), [`foo${i}`, "bar"]);

            PropertyTests.propertyRoundTrip(setProp2, getProp2, ["fux", "bux", "qux"]);
            assert.strictEqual(tag2.extendedContentDescriptionObject.descriptors.length, 1);
            assert.strictEqual(tag2.extendedContentDescriptionObject.descriptors[0].name, descriptorName[0]);
            assert.strictEqual(tag2.extendedContentDescriptionObject.descriptors[0].type, DataType.Unicode);
            assert.strictEqual(tag2.extendedContentDescriptionObject.descriptors[0].getString(), "fux; bux; qux");
        }
    }

    private testExtendedDescriptionObjectStringField(
        set: (t: AsfTag, v: string) => void,
        get: (t: AsfTag) => string,
        ...descriptorName: string[]
    ) {
        // TEST CASE 1: Basic Case -----------------------------------------
        // Arrange
        const tag = AsfTag.fromEmpty();
        const setProp = (v: string) => set(tag, v);
        const getProp = () => get(tag);

        // Act / Assert
        assert.isUndefined(getProp());

        PropertyTests.propertyRoundTrip(setProp, getProp, "foo");
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors.length, 1);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].name, descriptorName[0]);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].type, DataType.Unicode);
        assert.strictEqual(tag.extendedContentDescriptionObject.descriptors[0].getString(), "foo");

        // End test cases if there's only one descriptor name
        if (descriptorName.length === 1) {
            return;
        }

        // TEST CASE 2: Preferential descriptor names ----------------------
        for (let i = 0; i < descriptorName.length; i++) {
            // Arrange
            const edco = ExtendedContentDescriptionObject.fromEmpty();
            for (let j = descriptorName.length; j > i; j--) {
                const descriptor = new ContentDescriptor(descriptorName[j - 1], DataType.Unicode, `foo${j - 1}`);
                edco.addDescriptor(descriptor);
            }

            const headerObject = getHeaderObject([edco]);
            const tag2 = AsfTag.fromHeader(headerObject);
            const setProp2 = (v: string) => set(tag2, v);
            const getProp2 = () => get(tag2);

            // Act / Assert
            assert.strictEqual(getProp2(), `foo${i}`);

            PropertyTests.propertyRoundTrip(setProp2, getProp2, "fux");
            assert.strictEqual(tag2.extendedContentDescriptionObject.descriptors.length, 1);
            assert.strictEqual(tag2.extendedContentDescriptionObject.descriptors[0].name, descriptorName[0]);
            assert.strictEqual(tag2.extendedContentDescriptionObject.descriptors[0].type, DataType.Unicode);
            assert.strictEqual(tag2.extendedContentDescriptionObject.descriptors[0].getString(), "fux");
        }
    }
}
