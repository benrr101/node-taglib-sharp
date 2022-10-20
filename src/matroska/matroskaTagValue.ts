import * as bcp47 from "bcp-47";

import {ByteVector} from "../byteVector";
import {UnsupportedFormatError} from "../errors";
import {EbmlParser} from "../ebml/ebmlParser";
import {MatroskaIds} from "./matroskaIds";
import {Guards, StringUtils} from "../utils";

export default class MatroskaTagValue {
    private static readonly DEFAULT_LANGUAGE_CODE = "und";

    private readonly _matroskaVersion: number
    private _isDefaultLanguage: boolean = true;
    private _isLanguageCodeBcp47: boolean = false;
    private _languageCode: string = MatroskaTagValue.DEFAULT_LANGUAGE_CODE;
    private _name: string;
    private _nestedTags: MatroskaTagValue[] = [];
    private _value: string | ByteVector;

    private constructor(matroskaVersion: number) {
        Guards.byte(matroskaVersion, "matroskaVersion");

        this._matroskaVersion = matroskaVersion;
    }

    public static fromEmpty(matroskaVersion: number): MatroskaTagValue {
        return new MatroskaTagValue(matroskaVersion);
    }

    public static fromTagEntry(parser: EbmlParser, matroskaVersion: number): MatroskaTagValue {
        Guards.truthy(parser, "parser");
        Guards.byte(matroskaVersion, "matroskaVersion");

        const simpleTag = new MatroskaTagValue(matroskaVersion);

        let languageCodeBcp47;
        let languageCodeIso639;
        let binaryValue;
        let stringValue;
        const simpleTagParseActions = new Map<number, (parser: EbmlParser) => void>([
            [MatroskaIds.TAG_NAME, p => simpleTag._name = p.getString()],
            [MatroskaIds.TAG_LANGUAGE, p => languageCodeIso639 = p.getString()],
            [MatroskaIds.TAG_LANGUAGE_BCP47, p => languageCodeBcp47 = p.getString()],
            [MatroskaIds.TAG_DEFAULT, p => simpleTag._isDefaultLanguage = p.getBool()],
            [MatroskaIds.TAG_STRING, p => stringValue = p.getString()],
            [MatroskaIds.TAG_BINARY, p => binaryValue = p.getBytes()],
            [
                MatroskaIds.SIMPLE_TAG,
                p => simpleTag._nestedTags.push(MatroskaTagValue.fromTagEntry(p, matroskaVersion))
            ]
        ]);
        parser.processChildren(simpleTagParseActions);

        // Prefer BCP 47 over ISO 639
        if (languageCodeBcp47) {
            simpleTag._languageCode = languageCodeBcp47;
            simpleTag._isLanguageCodeBcp47 = true;
        } else {
            simpleTag._languageCode = languageCodeIso639 ?? this.DEFAULT_LANGUAGE_CODE;
            simpleTag._isLanguageCodeBcp47 = false;
        }

        // Prefer string over binary
        if (binaryValue && stringValue) {
            simpleTag._value = stringValue;
        } else if (binaryValue) {
            simpleTag._value = binaryValue;
        } else {
            simpleTag._value = stringValue;
        }

        return simpleTag;
    }

    public get isBinary(): boolean { return this._value instanceof ByteVector; }

    public get isDefaultLanguage(): boolean { return this._isDefaultLanguage; }
    public set isDefaultLanguage(value: boolean) { this._isDefaultLanguage = value; }

    public get isString(): boolean { return typeof(this._value) === "string"; }

    public get languageCode(): string { return this._languageCode; }
    public set languageCode(value) {
        // Default to "und" for "undetermined", as per spec
        value ??= MatroskaTagValue.DEFAULT_LANGUAGE_CODE;

        if (!!bcp47.parse(value)) {
            if (this._matroskaVersion < 4) {
                throw new UnsupportedFormatError("BCP 47 language codes are not supported in Matroska < 4");
            }

            this._isLanguageCodeBcp47 = true;
        } else if(!StringUtils.isIs03692(value)) {
            throw new Error(`Argument out of range: Value '${value}' is not a valid BCP 47 or ISO 639-2 language code`);
        }

        this._languageCode = value;
    }

    public get name(): string { return this._name; }
    public set name(value: string) {
        Guards.truthy(value, "value");
        this._name = value;
    }

    public get nestedTags(): MatroskaTagValue[] { return this._nestedTags; }
    public set nestedTags(value: MatroskaTagValue[]) {
        Guards.truthy(value, "value");
        this._nestedTags = value;
    }

    public get value(): string | ByteVector { return this._value; }
    public set value(v: string | ByteVector) {
        Guards.truthy(v, "v");
        this._value = v;
    }
}

