import * as Path from "path";
import {v4 as Uuidv4} from "uuid";

export default class TestConstants {
    public static testFileFolderPath: string = "./test-integration/resources";

    public static getCorruptFilePath: (fileName: string) => string = (fileName: string ) => {
        return Path.join(TestConstants.testFileFolderPath, "corruptSamples", fileName);
    }

    public static getSampleFilePath: (fileName: string) => string = (fileName: string) => {
        return Path.join(TestConstants.testFileFolderPath, "samples", fileName);
    }

    public static getTempFilePath: (fileName: string) => string = (fileName: string) => {
        const fileUid: string = Uuidv4();
        return Path.join(TestConstants.testFileFolderPath, `${fileUid}_${fileName}`);
    }
}
