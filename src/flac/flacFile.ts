import {File, ReadStyle} from "../file";
import ApeFile from "../ape/apeFile";
import {IFileAbstraction} from "../fileAbstraction";

export default class FlacFile extends File {
    public constructor(file: IFileAbstraction|string, propertiesStyle: ReadStyle) {
        super(file);
    }
}

////////////////////////////////////////////////////////////////////////////
// Register the file type
[
    "taglib/flac",
    "audio/x-flac",
    "audio/flc",
    "application/x-flac"
].forEach((mt) => File.addFileType(mt, ApeFile));
