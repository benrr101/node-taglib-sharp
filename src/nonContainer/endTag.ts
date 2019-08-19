// import ApeTag from "../ape/apeTag"
// import CombinedTag from "../combinedTag";
// import {ApeFooter} from "../ape/apeFooter";
// import {File, ReadStyle} from "../file";
// import {Tag, TagTypes} from "../tag";
// import {ByteVector} from "../byteVector";
//
// export default class EndTag extends CombinedTag {
//     private readonly _file: File;
//
//     // Number of bytes that must be read to hold all applicable indicators
//     private readonly _readSize: number = Math.max(ApeFooter.size, Id3v2Footer.size, Id3v1Tag.size);
//
//     /**
//      * Constructs and initializes a new instance of {@see EndTag} for a specified file.
//      * Constructing a new instance does not automatically read the contents from the disk.
//      * {@see EndTag.read} must be called to read the tags.
//      * @param file File on which the new instance will perform its operations.
//      */
//     public constructor(file: File) {
//         super();
//         this._file = file;
//     }
//
//     /**
//      * Gets the total size of the tags located at the end of the file by reading from the file.
//      */
//     public get totalSize(): number {
//         let start = this._file.length;
//         let tagInfo;
//         do {
//             tagInfo = this.readTagInfo(start);
//             start = tagInfo.updatedPosition;
//         } while(tagInfo.tagTypes !== TagTypes.None);
//         return this._file.length - start;
//     }
//
//     // #region Public Methods
//
//     /**
//      * Adds a tag of a specified type to the current instance, optionally copying values from an
//      * existing tag. Id3v2 tags are added at the end of the current instance, while other tags are
//      * added at the beginning.
//      * @param type Type of tag to add to the current instance. At the time of this writing, this is
//      *     limited to {@see TagTypes.Ape}, {@see TagTypes.Id3v1}, and {@see TagTypes.Id3v2}.
//      * @param copy Optionally, a {@see Tag} from which to copy values from using {@see Tag.copyTo}
//      */
//     public addTag(type: TagTypes, copy: Tag): Tag {
//         let tag: Tag;
//
//         switch (type) {
//             case TagTypes.Id3v1:
//                 tag = new Id3v1Tag();
//                 break;
//             case TagTypes.Id3v2:
//                 const tag32 = new Id3v2Tag();
//                 tag32.version = 4;
//                 tag32.flags |= Id3v2HeaderFlags.FooterPresent;
//                 tag = tag32;
//                 break;
//             case TagTypes.Ape:
//                 tag = new ApeTag();
//                 break;
//         }
//
//         if (tag) {
//             if (copy) {
//                 copy.copyTo(tag, true);
//             }
//             if (type === TagTypes.Id3v1) {
//                 this._tags.push(tag);
//             } else {
//                 this._tags.unshift(tag);
//             }
//         }
//
//         return tag;
//     }
//
//     /**
//      * Reads the tags stored at the end of the file into the current instance.
//      * @returns Seek position in the file at which the read tags begin. This also marks the seek
//      *     position at which the media ends.
//      */
//     public read(style: ReadStyle): number {
//         this._tags.length = 0;
//         let start = this._file.length;
//         let tag;
//         do {
//             tag = this.readTag(start, style);
//             start = tag.updatedEnd;
//             if (tag.tag) {
//                 this._tags.unshift(tag.tag);
//             }
//         } while (tag.tag);
//
//         return start;
//     }
//
//     /**
//      * Removes a set of tag types from the current instance.}
//      * @param types Bitwise combined {@see TagTypes} value containing the tag types to be removed
//      *     from the file.
//      *     In order to remove all tags from a file, pass {@see TagTypes.AllTags}.
//      */
//     public removeTags(types: TagTypes): void {
//         for (let i = this._tags.length - 1; i >= 0; i--) {
//             const tag = this._tags[i];
//             if (types === TagTypes.AllTags || (tag.tagTypes & types) > 0) {
//                 this._tags.splice(i, 1);
//             }
//         }
//     }
//
//     /**
//      * Renders the tags contained in the current instance.
//      * The tags are rendered in the order that they are stored in the current instance.
//      */
//     public render(): ByteVector {
//         const data = ByteVector.fromSize(0);
//         for (const t of this._tags) {
//             switch (t.tagTypes) {
//                 case TagTypes.Ape:
//                     data.addByteVector((<ApeTag> t).render());
//                     break;
//                 case TagTypes.Id3v2:
//                     data.addByteVector((<Id3v2Tag> t).render());
//                     break;
//                 case TagTypes.Id3v1:
//                     data.addByteVector((<Id3v1Tag> t).render());
//             }
//         }
//         return data;
//     }
//
//     /**
//      * Writes the tags contained in the current instance to the end of the file that created,
//      * overwriting the existing tags.
//      * @returns Seek position in the file at which the written tags begin. This also marks the seek
//      *     position at which the media ends.
//      */
//     public write(): number {
//         const totalSize = this.totalSize;
//         const data = this.render();
//         this._file.insert(data, this._file.length - totalSize, totalSize);
//         return this._file.length - data.length;
//     }
//
//     // #endregion
//
//     // #region Private Helpers
//
//     private readTag(end: number, style: ReadStyle): {tag: Tag, updatedEnd: number} {
//         let start = end;
//
//         const tagInfo = this.readTagInfo(start);
//         start = tagInfo.updatedPosition;
//
//         let tag: Tag;
//
//         try {
//             switch (tagInfo.tagTypes) {
//                 case TagTypes.Ape:
//                     tag = new ApeTag(this._file, end - ApeFooter.size);
//                     break;
//                 case TagTypes.Id3v2:
//                     tag = new Id3v2Tag(this._file, start, style);
//                     break;
//                 case TagTypes.Id3v1:
//                     tag = new Id3v1Tag(this._file, start);
//                     break;
//             }
//
//             end = start;
//         } catch (e) {
//             // @TODO: Can/should we filter out corrupt file exception
//         }
//
//         return {tag: tag, updatedEnd: end};
//     }
//
//     private readTagInfo(position: number): {tagTypes: TagTypes, updatedPosition: number} {
//         if (position - this._readSize < 0) {
//             return {tagTypes: TagTypes.None, updatedPosition: position};
//         }
//
//         this._file.seek(position - this._readSize);
//         const data = this._file.readBlock(this._readSize);
//
//         try {
//             const offset = data.length - ApeFooter.size;
//             if (data.containsAt(ApeFooter.fileIdentifier, offset)) {
//                 const footer = new ApeFooter(data.mid(offset));
//
//                 // If the complete tag size is zero or the tag is a header this indicates some sort
//                 // of corruption.
//                 if (footer.completeTagSize === 0 || (footer.flags & ApeFooterFlags.IsHeader) > 0) {
//                     return {tagTypes: TagTypes.None, updatedPosition: position};
//                 }
//
//                 position -= footer.completeTagSize;
//                 return {tagTypes: TagTypes.Ape, updatedPosition: position};
//             }
//
//             offset = data.length - Id3v2Footer.size;
//             if (data.containsAt(Id3v2Footer.fileIdentifier, offset)) {
//                 const footer = new Id3v2Footer(data.mid(offset));
//                 position -= footer.completeTagSize;
//                 return {tagTypes: TagTypes.Id3v2, updatedPosition: position};
//             }
//
//             if (data.startsWith(Id3v1Tag.fileIdentifier)) {
//                 position -= Id3v1Tag.size;
//                 return {tagTypes: TagTypes.Id3v1, updatedPosition: position};
//             }
//         } catch (e) {
//             // @TODO: should/can we specifically check for corrupt file exception?
//         }
//
//         return {tagTypes: TagTypes.None, updatedPosition: position};
//     }
//
//     // #endregion
// }