// import AacAudioHeader from "./aacAudioHeader";
// import {File} from "../file";
// import {Tag, TagTypes} from "../tag";
//
// /**
//  * Provides tagging and property support for ADTS AAC audio files.
//  * An ID3v1 tag and ID3v2 tag will be added automatically to any file that doesn'
//  */
// export default class AacFile extends File {
//     private _firstHeader: AacAudioHeader;
//
//     protected startTag:
//
//     /**
//      * Gets a tag of a specified type from the current instance, optionally creating a new tag if
//      * possible. If an ID3v2 tag is added to the current instance, it will be placed at the start
//      * of the file. Alternatively, ID3v1 and Ape tags will be added to the end of the list. All
//      * other tag types will be ignored.
//      * @param type Type of tag to read.
//      * @param create Boolean specifying whether or not to try and create the tag if one was found.
//      * @returns Tag that was found or added to the current instance. If no matching tag was
//      *     found and none was created `undefined` is returned.
//      */
//     public getTag(type: TagTypes, create: boolean): Tag {
//         const tag = (<NonContainerTag> this.tag).getTag(type);
//
//         if (tag || !create) {
//             return tag;
//         }
//
//         switch (type) {
//             case TagTypes.Id3v1:
//                 return this.endTag.addTag(type, this.tag);
//             case TagTypes.Id3v2:
//                 return this.startTag.addTag(type, this.tag);
//             case TagTypes.Ape:
//                 return this.endTag.addTag(type, this.tag);
//             default:
//                 return undefined;
//         }
//     }
//
//
// }
