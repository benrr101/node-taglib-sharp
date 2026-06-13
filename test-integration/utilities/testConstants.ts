import * as Path from "path";
import * as crypto from "crypto";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const randomUUID: () => string = (crypto as any).randomUUID || (() => {
    // Fallback for Node.js < 15.6.0
    const bytes = crypto.randomBytes(16);
    bytes[6] = (bytes[6] & 0x0f) | 0x40; // v4
    bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant
    const hex = bytes.toString("hex");
    return `${hex.substring(0, 8)}-${hex.substring(8, 12)}-${hex.substring(12, 16)}-${hex.substring(16, 20)}-${hex.substring(20)}`;
});

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
