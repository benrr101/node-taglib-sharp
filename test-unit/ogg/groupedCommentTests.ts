import {suite, test} from "@testdeck/mocha";
import {assert} from "chai";

import OggTag from "../../src/ogg/oggTag";
import XiphComment from "../../src/xiph/xiphComment";
import {TagTypes} from "../../src/tag";
import {TagTesters, Testers} from "../utilities/testers";

@suite class Ogg_GroupCommentTests {
    @test
    public ctor() {
        // Act
        const tag = new OggTag(new Map<number, XiphComment>());

        // Assert
        assert.isEmpty(tag.tags);
        assert.strictEqual(tag.supportedTagTypes, TagTypes.None);

        assert.isEmpty(tag.comments);
        assert.isEmpty(tag.serialNumbers);
        assert.strictEqual(tag.tagTypes, TagTypes.None);
        assert.strictEqual(tag.sizeOnDisk, 0);
        assert.isTrue(tag.isEmpty);

        TagTesters.testTagProperties(tag, {});
    }

    @test
    public getComment_invalidParameters() {
        // Arrange
        const groupedComment = new OggTag(new Map<number, XiphComment>());

        // Act / Assert
        Testers.testUint((v) => groupedComment.getComment(v));
    }

    @test
    public setComment_invalidParameters() {
        // Arrange
        const comment = XiphComment.fromEmpty();
        const groupedComment = new OggTag(new Map<number, XiphComment>());

        // Act / Assert
        Testers.testUint((v) => groupedComment.setComment(v, comment));
        Testers.testTruthy((v: XiphComment) => groupedComment.setComment(123, v));
    }

    @test
    public setComment_streamSerialNumberDoesNotExist() {
        // Arrange
        const comment = XiphComment.fromEmpty();
        const groupComment = new OggTag(new Map<number, XiphComment>());

        // Act / Assert
        assert.throws(() => groupComment.setComment(123, comment));
    }

    @test
    public setComment_overwrite() {
        // Arrange
        const comment1 = XiphComment.fromEmpty();
        const comment2 = XiphComment.fromEmpty();

        const groupComment = new OggTag(new Map<number, XiphComment>([[123, comment1], [234, comment1]]));

        // Act
        groupComment.setComment(123, comment2);

        // Assert
        assert.strictEqual(groupComment.getComment(123), comment2);
        assert.strictEqual(groupComment.tags[0], comment2);
    }

    @test
    public clear_clearsAllComments() {
        // Arrange
        const comment1 = XiphComment.fromEmpty();
        comment1.album = "foobarbaz";
        const comment2 = XiphComment.fromEmpty();
        comment2.title = "fuxbuxquxx";

        const tag = new OggTag(new Map<number, XiphComment>([[123, comment1], [234, comment2]]));

        // Act
        tag.clear();

        // Assert
        assert.sameMembers(tag.comments, [comment1, comment2]);
        assert.sameMembers(tag.serialNumbers, [123, 234]);
        assert.strictEqual(tag.tagTypes, TagTypes.Xiph);

        assert.isTrue(comment1.isEmpty);
        assert.isTrue(comment2.isEmpty);
        assert.isTrue(tag.isEmpty);
    }
}
