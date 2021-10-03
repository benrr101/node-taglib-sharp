import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";
import {It, Mock, Times} from "typemoq";

import EndTag from "../../src/sandwich/endTag";
import FlacFileSettings from "../../src/flac/flacFileSettings";
import FlacTag from "../../src/flac/flacTag";
import StartTag from "../../src/sandwich/startTag";
import XiphComment from "../../src/xiph/xiphComment";
import XiphPicture from "../../src/xiph/xiphPicture";
import {TagTypes} from "../../src/tag";
import {TagTesters, Testers} from "../utilities/testers";
import {Id3v1Tag} from "../../src";

@suite class Flac_TagTests {
    @test
    public constructor_invalidValues() {
        // Arrange
        const mockStartTag = Mock.ofType<StartTag>();
        const mockEndTag = Mock.ofType<EndTag>();

        // Act / Assert
        Testers.testTruthy((v: StartTag) => new FlacTag(v, mockEndTag.object, undefined, undefined));
        Testers.testTruthy((v: EndTag) => new FlacTag(mockStartTag.object, v, undefined, undefined));
    }

    @test
    public constructor_hasOptionalParams() {
        // Arrange
        const mockStartTag = Mock.ofType<StartTag>();
        TagTesters.setupTagMock(mockStartTag);
        const mockEndTag = Mock.ofType<EndTag>();
        TagTesters.setupTagMock(mockEndTag);
        const mockXiphComment = Mock.ofType<XiphComment>();
        TagTesters.setupTagMock(mockXiphComment);
        const mockPictures = [Mock.ofType<XiphPicture>().object];

        // Act
        const tag = new FlacTag(mockStartTag.object, mockEndTag.object, mockXiphComment.object, mockPictures);

        // Assert
        assert.strictEqual(tag.endTag, mockEndTag.object);
        assert.strictEqual(tag.startTag, mockStartTag.object);
        assert.strictEqual(tag.xiphComment, mockXiphComment.object);
        assert.sameMembers(tag.pictures, mockPictures);
        TagTesters.testTagProperties(tag, { pictures: mockPictures });
    }

    @test
    public constructor_noOptionalParams() {
        // Arrange
        const mockStartTag = Mock.ofType<StartTag>();
        TagTesters.setupTagMock(mockStartTag);
        const mockEndTag = Mock.ofType<EndTag>();
        TagTesters.setupTagMock(mockEndTag);

        // Act
        const tag = new FlacTag(mockStartTag.object, mockEndTag.object, undefined, undefined);

        // Assert
        assert.strictEqual(tag.endTag, mockEndTag.object);
        assert.strictEqual(tag.startTag, mockStartTag.object);
        assert.isUndefined(tag.xiphComment);
        assert.isOk(tag.pictures);
        assert.isEmpty(tag.pictures);
        TagTesters.testTagProperties(tag, {});
    }

    @test
    public createTag_tagExists() {
        // Arrange
        const mockStartTag = Mock.ofType<StartTag>();
        mockStartTag.setup((t) => t.tagTypes).returns(() => TagTypes.AllTags);
        const mockEndTag = Mock.ofType<EndTag>();
        mockEndTag.setup((t) => t.tagTypes).returns(() => TagTypes.AllTags);
        const tag = new FlacTag(mockStartTag.object, mockEndTag.object, undefined, undefined);

        // Act / Assert
        assert.throws(() => tag.createTag(TagTypes.Xiph, false));
        assert.throws(() => tag.createTag(TagTypes.Id3v1, false));
        assert.throws(() => tag.createTag(TagTypes.Id3v2, false));
        assert.throws(() => tag.createTag(TagTypes.Ape, false));
    }

    @test
    public createTag_unsupportedTag() {
        // Arrange
        const mockStartTag = Mock.ofType<StartTag>();
        const mockEndTag = Mock.ofType<EndTag>();
        const tag = new FlacTag(mockStartTag.object, mockEndTag.object, undefined, undefined);

        // Act / Assert
        assert.throws(() => tag.createTag(TagTypes.RiffInfo, false));
    }

    @test
    public createTag_xiph() {
        // Arrange
        const tags = this.getBasicTag();

        // Act
        const output = tags.tag.createTag(TagTypes.Xiph, false);

        // Assert
        assert.isOk(output);
        assert.instanceOf(output, XiphComment);
        assert.include(tags.tag.tags, output);
        assert.isOk(tags.tag.tagTypes & TagTypes.Xiph);
        assert.strictEqual(tags.tag.xiphComment, output);
    }

    @test
    public createTag_id3v1() {
        // Arrange
        const tags = this.getBasicTag();

        // Act
        tags.tag.createTag(TagTypes.Id3v1, false);

        // Assert
        tags.endTag.verify((t) => t.createTag(It.isValue(TagTypes.Id3v1), It.isValue(false)), Times.once());
    }

    @test
    public createTag_id3v2Start() {
        // Arrange
        const originalSetting = FlacFileSettings.preferId3v2TagAtFileEnd;
        try {
            FlacFileSettings.preferId3v2TagAtFileEnd = false;
            const tags = this.getBasicTag();

            // Act
            tags.tag.createTag(TagTypes.Id3v2, false);

            // Assert
            tags.startTag.verify((t) => t.createTag(It.isValue(TagTypes.Id3v2), It.isValue(false)), Times.once());
        } finally {
            FlacFileSettings.preferId3v2TagAtFileEnd = originalSetting;
        }
    }

    @test
    public createTag_id3v2End() {
        // Arrange
        const originalSetting = FlacFileSettings.preferId3v2TagAtFileEnd;
        try {
            FlacFileSettings.preferId3v2TagAtFileEnd = true;
            const tags = this.getBasicTag();

            // Act
            tags.tag.createTag(TagTypes.Id3v2, false);

            // Assert
            tags.endTag.verify((t) => t.createTag(It.isValue(TagTypes.Id3v2), It.isValue(false)), Times.once());
        } finally {
            FlacFileSettings.preferId3v2TagAtFileEnd = originalSetting;
        }
    }

    @test
    public createTag_apeStart() {
        // Arrange
        const originalSetting = FlacFileSettings.preferApeTagAtFileEnd;
        try {
            FlacFileSettings.preferApeTagAtFileEnd = false;
            const tags = this.getBasicTag();

            // Act
            tags.tag.createTag(TagTypes.Ape, false);

            // Assert
            tags.startTag.verify((t) => t.createTag(It.isValue(TagTypes.Ape), It.isValue(false)), Times.once());
        } finally {
            FlacFileSettings.preferApeTagAtFileEnd = originalSetting;
        }
    }

    @test
    public createTag_copyTo() {
        // Arrange
        const tags = this.getBasicTag();
        tags.endTag.setup((t) => t.createTag(It.isValue(TagTypes.Id3v1), It.isAny()))
            .returns(() => Id3v1Tag.fromEmpty());
        TagTesters.setupTagMock(tags.startTag);
        TagTesters.setupTagMock(tags.endTag);

        const xiphTag = tags.tag.createTag(TagTypes.Xiph, false);
        xiphTag.title = "foobarbaz";

        // Act
        const output = tags.tag.createTag(TagTypes.Id3v1, true);

        // Assert
        assert.isOk(output);
        assert.instanceOf(output, Id3v1Tag);
        assert.strictEqual(output.title, xiphTag.title);
    }

    @test
    public createTag_apeEnd() {
        // Arrange
        const originalSetting = FlacFileSettings.preferApeTagAtFileEnd;
        try {
            FlacFileSettings.preferApeTagAtFileEnd = true;
            const tags = this.getBasicTag();

            // Act
            tags.tag.createTag(TagTypes.Ape, false);

            // Assert
            tags.endTag.verify((t) => t.createTag(It.isValue(TagTypes.Ape), It.isValue(false)), Times.once());
        } finally {
            FlacFileSettings.preferApeTagAtFileEnd = originalSetting;
        }
    }

    @test
    public getPictures_fromFlac() {
        // Arrange
        const mockStartTag = Mock.ofType<StartTag>();
        const mockEndTag = Mock.ofType<EndTag>();
        const mockXiphComment = Mock.ofType<XiphComment>();
        const mockPictures = [Mock.ofType<XiphPicture>().object];
        const tag = new FlacTag(mockStartTag.object, mockEndTag.object, mockXiphComment.object, mockPictures);

        // Act 1
        const pictures = tag.pictures;

        // Assert 1
        assert.sameMembers(pictures, mockPictures);

        // Act 2
        pictures.push(Mock.ofType<XiphPicture>().object);

        // Assert 2
        assert.sameMembers(tag.pictures, mockPictures);
    }

    @test
    public getPictures_fromCombinedBase() {
        // Arrange
        const mockStartTag = Mock.ofType<StartTag>();
        TagTesters.setupTagMock(mockStartTag);
        const mockEndTag = Mock.ofType<EndTag>();
        TagTesters.setupTagMock(mockEndTag);
        const xiphTag = XiphComment.fromEmpty();
        xiphTag.pictures = [Mock.ofType<XiphPicture>().object];
        const tag1 = new FlacTag(mockStartTag.object, mockEndTag.object, xiphTag, undefined);
        const tag2 = new FlacTag(mockStartTag.object, mockEndTag.object, xiphTag, []);

        // Act / Assert
        assert.sameMembers(tag1.pictures, xiphTag.pictures);
        assert.sameMembers(tag2.pictures, xiphTag.pictures);
    }

    @test
    public setPictures() {
        // Arrange
        const mockStartTag = Mock.ofType<StartTag>();
        const mockEndTag = Mock.ofType<EndTag>();
        const xiphTag = XiphComment.fromEmpty();
        const tag = new FlacTag(mockStartTag.object, mockEndTag.object, xiphTag, undefined);

        // Act 1
        const pictures = [Mock.ofType<XiphPicture>().object];
        tag.pictures = pictures;

        // Assert 1
        assert.sameMembers(tag.pictures, pictures);

        // Act 2
        pictures.push(Mock.ofType<XiphPicture>().object);

        // Assert 2
        assert.sameMembers(tag.pictures, [pictures[0]]);

        // Act 3
        const pictures2 = tag.pictures;
        tag.pictures = [];

        // Assert 3
        assert.strictEqual(pictures2.length, 1);
        assert.strictEqual(tag.pictures.length, 0);
    }

    private getBasicTag() {
        const mockStartTag = Mock.ofType<StartTag>();
        mockStartTag.setup((t) => t.tagTypes).returns(() => TagTypes.None);
        mockStartTag.setup((t) => t.createTag(It.isAny(), true));

        const mockEndTag = Mock.ofType<EndTag>();
        mockStartTag.setup((t) => t.tagTypes).returns(() => TagTypes.None);
        mockStartTag.setup((t) => t.createTag(It.isAny(), true));

        return {
            endTag: mockEndTag,
            startTag: mockStartTag,
            tag: new FlacTag(mockStartTag.object, mockEndTag.object, undefined, undefined)
        };
    }
}
