import RiffList from "./riffList";
import RiffListTag from "./riffListTag";
import {TagTypes} from "../../tag";
import {Guards} from "../../utils";

/**
 * Provides support for reading and writing standard INFO tags.
 */
export default class InfoTag extends RiffListTag {
    public static readonly listType = "INFO";

    // #region Constructors

    private constructor(list: RiffList) {
        super(list);
    }

    /**
     * Constructs and initializes a new, empty instance.
     */
    public static fromEmpty(): InfoTag {
        return new InfoTag(RiffList.fromEmpty(InfoTag.listType));
    }

    /**
     * Constructs and initializes a new instance by reading the contents of a raw RIFF list stored
     * a file.
     * @param list List that contains the contents of the tag
     */
    public static fromList(list: RiffList): InfoTag {
        return new InfoTag(list);
    }

    // #endregion

    // #region Properties

    /** @inheritDoc */
    public get tagTypes(): TagTypes { return TagTypes.RiffInfo; }

    /**
     * @inheritDoc
     * @remarks Implemented via the `INAM` item.
     */
    public get title(): string { return this.getFirstValueAsString("INAM"); }
    /**
     * @inheritDoc
     * @remarks Implemented via the `INAM` item.
     */
    public set title(value: string) { this.setValuesFromStrings("INAM", [value]); }

    /**
     * @inheritDoc
     * @remarks Implemented via the `ISBJ` item.
     */
    public get description(): string { return this.getFirstValueAsString("ISBJ"); }
    /**
     * @inheritDoc
     * @remarks Implemented via the `ISBJ` item.
     */
    public set description(value: string) { this.setValuesFromStrings("ISBJ", [value]); }

    /**
     * @inheritDoc
     * @remarks Implemented via the `ISTR` item.
     */
    public get performers(): string[] { return this.getValuesAsStrings("ISTR"); }
    /**
     * @inheritDoc
     * @remarks Implemented via the `ISTR` item.
     */
    public set performers(value: string[]) {
        value = value || [];
        this.setValuesFromStrings("ISTR", value);
    }

    /**
     * @inheritDoc
     * @remarks Implemented via the `IART` item.
     */
    public get albumArtists(): string[] { return this.getValuesAsStrings("IART"); }
    /**
     * @inheritDoc
     * @remarks Implemented via the `IART` item.
     */
    public set albumArtists(value: string[]) {
        value = value || [];
        this.setValuesFromStrings("IART", value);
    }

    /**
     * @inheritDoc
     * @remarks Implemented via the `IWRI` item.
     */
    public get composers(): string[] { return this.getValuesAsStrings("IWRI"); }
    /**
     * @inheritDoc
     * @remarks Implemented via the `IWRI` item.
     */
    public set composers(value: string[]) {
        value = value || [];
        this.setValuesFromStrings("IWRI", value);
    }

    /**
     * @inheritDoc
     * @remarks Implemented via the `DIRC` item.
     */
    public get album(): string { return this.getFirstValueAsString("DIRC"); }
    /**
     * @inheritDoc
     * @remarks Implemented via the `DIRC` item.
     */
    public set album(value: string) { this.setValuesFromStrings("DIRC", [value]); }

    /**
     * @inheritDoc
     * @remarks Implemented via the `ICNM` item.
     */
    public get conductor(): string { return this.getFirstValueAsString("ICNM"); }
    /**
     * @inheritDoc
     * @remarks Implemented via the `ISBJ` item.
     */
    public set conductor(value: string) { this.setValuesFromStrings("ICNM", [value]); }

    /**
     * @inheritDoc
     * @remarks Implemented via the `ICMT` item.
     */
    public get comment(): string { return this.getFirstValueAsString("ICMT"); }
    /**
     * @inheritDoc
     * @remarks Implemented via the `ICMT` item.
     */
    public set comment(value: string) { this.setValuesFromStrings("ICMT", [value]); }

    /**
     * @inheritDoc
     * @remarks Implemented via the `IGNR` item.
     */
    public get genres(): string[] { return this.getValuesAsStrings("IGNR"); }
    /**
     * @inheritDoc
     * @remarks Implemented via the `IGNR` item.
     */
    public set genres(value: string[]) {
        value = value || [];
        this.setValuesFromStrings("IGNR", value);
    }

    /**
     * @inheritDoc
     * @remarks Implemented via the `ICRD` item.
     */
    public get year(): number { return this.getValueAsUint("ICRD"); }
    /**
     * @inheritDoc
     * @remarks Implemented via the `ICRD` item.
     */
    public set year(value: number) {
        Guards.uint(value, "value");
        if (value < 0 || value > 9999) {
            value = 0;
        }
        this.setValueFromUint("ICRD", value);
    }

    /**
     * @inheritDoc
     * @remarks Implemented via the `IPRT` item.
     */
    public get track(): number { return this.getValueAsUint("IPRT"); }
    /**
     * @inheritDoc
     * @remarks Implemented via the `IPRT` item.
     */
    public set track(value: number) { this.setValueFromUint("IPRT", value); }

    /**
     * @inheritDoc
     * @remarks Implemented via the `IFRM` item.
     */
    public get trackCount(): number { return this.getValueAsUint("IFRM"); }
    /**
     * @inheritDoc
     * @remarks Implemented via the `IFRM` item.
     */
    public set trackCount(value: number) { this.setValueFromUint("IFRM", value); }

    /**
     * @inheritDoc
     * @remarks Implemented via the `ICOP` item.
     */
    public get copyright(): string { return this.getFirstValueAsString("ICOP"); }
    /**
     * @inheritDoc
     * @remarks Implemented via the `ICOP` item.
     */
    public set copyright(value: string) { this.setValuesFromStrings("ICOP", [value]); }

    // #endregion
}
