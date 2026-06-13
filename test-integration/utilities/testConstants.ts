import * as Path from "path";
import * as crypto from "crypto";

const randomUUID: () => string = (crypto as any).randomUUID;

export default class TestConstants {
    public static testFileFolderPath: string = "./test-integration/resources";

    public static getCorruptFilePath: (fileName: string) => string = (fileName: string ) => {
        return Path.join(TestConstants.testFileFolderPath, "corruptSamples", fileName);
    }

    public static getSampleFilePath: (fileName: string) => string = (fileName: string) => {
        return Path.join(TestConstants.testFileFolderPath, "samples", fileName);
    }

    public static getTempFilePath: (fileName: string) => string = (fileName: string) => {
        const fileUid: string = randomUUID();
        return Path.join(TestConstants.testFileFolderPath, `${fileUid}_${fileName}`);
    }
}
