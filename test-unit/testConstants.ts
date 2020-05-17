import * as Path from "path";
import {v4 as Uuidv4} from "uuid";

import {ByteVector} from "../src/byteVector";

export default class TestConstants {
    public static testFileFolderPath: string = "./test-unit/resources/";
    public static testFilePath: string = Path.join(TestConstants.testFileFolderPath, "testFile.txt");
    public static testFileContents: number[] = [0x31, 0x32, 0x33, 0x34, 0x35, 0x61, 0x62, 0x63, 0x64, 0x65];
    public static testFileContentsStr: string = "12345abcde";

    public static getTestFilePath: () => string = () => {
        const fileUid: string = Uuidv4();
        return Path.join(TestConstants.testFileFolderPath, `testFile_${fileUid}.txt`);
    }

    public static testStrings: {[key: string]: {bytes: number[], str: string}} = {
        Latin1: {
          bytes: [
              0x21, 0x31, 0x32, 0x33, 0x41, 0x42, 0x43, 0x61, 0x62, 0x63, 0xC1, 0xD1, 0xFC, 0xAE, 0xBE
          ],
          str: "!123ABCabcÁÑü®¾"
        },
        UTF16BE: {
            bytes: [
                0x00, 0x61, 0x00, 0x62, 0x00, 0x63,
                0x03, 0xBA, 0x03, 0xCC, 0x03, 0xC3, 0x03, 0xBC, 0x03, 0xB5
            ],
            str: "abcκόσμε"
        },
        UTF16LE: {
            bytes: [
                0x61, 0x00, 0x62, 0x00, 0x63, 0x00,
                0xBA, 0x03, 0xCC, 0x03, 0xC3, 0x03, 0xBC, 0x03, 0xB5, 0x03
            ],
            str: "abcκόσμε"
        },
        UTF16LEWithBOM: {
            bytes: [
                0xFF, 0xFE,
                0x61, 0x00, 0x62, 0x00, 0x63, 0x00,
                0xBA, 0x03, 0xCC, 0x03, 0xC3, 0x03, 0xBC, 0x03, 0xB5, 0x03
            ],
            str: "abcκόσμε"
        },
        UTF8: {
            bytes: [
                0x61, 0x62, 0x63,
                0xCE, 0xBA, 0xCF, 0x8C, 0xCF, 0x83, 0xCE, 0xBC, 0xCE, 0xB5
            ],
            str: "abcκόσμε"
        }
    };

    public static testByteVector: ByteVector = ByteVector.fromString("foobarbaz");

    public static syncedUint = 0x2040810;
    public static syncedUintBytes = ByteVector.fromSize(4, 0x10);

    public static getCorruptFilePath: (fileName: string) => string = (fileName: string )=> {
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
