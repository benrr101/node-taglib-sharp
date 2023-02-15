import EbmlElement from "../ebml/ebmlElement";
import EbmlParser from "../ebml/ebmlParser";
import {ByteVector} from "../byteVector";
import {UnsupportedFormatError} from "../errors";
import {MatroskaIds} from "./matroskaIds";
import {Guards, StringUtils} from "../utils";

/**
 * Represents a value stored in a Matroska tag.
 */
export default class MatroskaTagValue {
    public static readonly DEFAULT_LANGUAGE_CODE = "und";

    private readonly _matroskaVersion: number

    private _isDefaultLanguage: boolean = true;
    private _isLanguageCodeBcp47: boolean = false;
    private _languageCode: string = MatroskaTagValue.DEFAULT_LANGUAGE_CODE;
    private _name: string;
    private _nestedTags: MatroskaTagValue[] = [];
    private _value: string | ByteVector;

    /**
     * Constructs and initializes a new instance.
     * @param matroskaVersion Version of Matroska file the tag should be written for
     * @private
     */
    private constructor(matroskaVersion: number) {
        Guards.byte(matroskaVersion, "matroskaVersion");

        this._matroskaVersion = matroskaVersion;
    }

    /**
     * Constructs and initializes a new, empty tag.
     * @param matroskaVersion Version of Matroska file the tag should be written for
     * @param name: Name of the tag value
     * @param value: Value to store in the tag value
     */
    public static fromValue(matroskaVersion: number, name: string, value: string|ByteVector): MatroskaTagValue {
        Guards.byte(matroskaVersion, "matroskaVersion");
        Guards.truthy(name, "name");
        Guards.notNullOrUndefined(value, "value");

        const obj = new MatroskaTagValue(matroskaVersion);
        obj._name = name;
        obj._value = value;

        return obj;
    }

    /**
     * Constructs and initializes a new tag using a {@link EbmlParser} that points to a tag.
     * @param element Root element of a tag
     * @param matroskaVersion Version of Matroska file the tag should be written for
     */
    public static fromSimpleTagElement(element: EbmlElement, matroskaVersion: number): MatroskaTagValue {
        Guards.truthy(element, "element");
        Guards.byte(matroskaVersion, "matroskaVersion");
        if (element.id !== MatroskaIds.SIMPLE_TAG) {
            throw new Error(`Tag value constructor was provided element of type ${element.id}`);
        }

        const simpleTag = new MatroskaTagValue(matroskaVersion);

        let languageCodeBcp47;
        let languageCodeIso639;
        let binaryValue;
        let stringValue;
        const simpleTagParseActions = new Map<number, (e: EbmlElement) => void>([
            [MatroskaIds.TAG_NAME, e => simpleTag._name = e.getString()],
            [MatroskaIds.TAG_LANGUAGE, e => languageCodeIso639 = e.getString()],
            [MatroskaIds.TAG_LANGUAGE_BCP47, e => languageCodeBcp47 = e.getString()],
            [MatroskaIds.TAG_DEFAULT, e => simpleTag._isDefaultLanguage = e.getBool()],
            [MatroskaIds.TAG_STRING, e => stringValue = e.getString()],
            [MatroskaIds.TAG_BINARY, e => binaryValue = e.getBytes()],
            [
                MatroskaIds.SIMPLE_TAG,
                e => simpleTag._nestedTags.push(MatroskaTagValue.fromSimpleTagElement(e, matroskaVersion))
            ]
            // @TODO: Nested tags
        ]);
        EbmlParser.processElements(element.getParser(), simpleTagParseActions);

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

    /**
     * Gets whether the current tag value is binary.
     */
    public get isBinary(): boolean { return this._value instanceof ByteVector; }

    /**
     * Gets whether the current tag value is in the default language.
     */
    public get isDefaultLanguage(): boolean { return this._isDefaultLanguage; }
    /**
     * Set whether the current tag value is in the default language.
     */
    public set isDefaultLanguage(value: boolean) { this._isDefaultLanguage = value; }

    /**
     * Gets whether the current tag value is a string.
     */
    public get isString(): boolean { return typeof(this._value) === "string"; }

    /**
     * Gets the language code that the tag value is stored in.
     */
    public get languageCode(): string { return this._languageCode; }
    /**
     * Sets the language code that the tag is stored in.
     * @remarks BCP-47 is only allowed in Matroska version 4, otherwise ISO 639-2 is the required
     *     format for language codes.
     */
    public set languageCode(value) {
        // Default to "und" for "undetermined", as per spec
        value ??= MatroskaTagValue.DEFAULT_LANGUAGE_CODE;

        if (StringUtils.isBcp47(value)) {
            if (!StringUtils.isIso3692(value)) {
                if (this._matroskaVersion < 4) {
                    throw new UnsupportedFormatError("BCP 47 language codes are not supported in Matroska < 4");
                }

                this._isLanguageCodeBcp47 = true;
            }
        } else {
            throw new Error(`Argument out of range: Value '${value}' is not a valid BCP 47 or ISO 639-2 language code`);
        }

        this._languageCode = value;
    }

    /**
     * Gets the name of the tag.
     */
    public get name(): string { return this._name; }

    /**
     * Sets the name of the tag.
     */
    public set name(value: string) {
        Guards.truthy(value, "value");
        this._name = value;
    }

    /**
     * Gets any tags that are nested under the current instance.
     */
    public get nestedTags(): MatroskaTagValue[] { return this._nestedTags; }
    /**
     * Sets any tags that are nested under the current instance.
     */
    public set nestedTags(value: MatroskaTagValue[]) {
        Guards.truthy(value, "value");
        this._nestedTags = value;
    }

    /**
     * Gets the value stored in the current instance. Use {@link isBinary} or {@link isString} to
     * determine whether the return value is `string` or {@link ByteVector}.
     */
    public get value(): string | ByteVector { return this._value; }
    /**
     * Sets the value stored in the current instance.
     */
    public set value(v: string | ByteVector) {
        Guards.truthy(v, "v");
        this._value = v;
    }
}
