import RiffListTag from "./riffListTag";
import {ByteVector} from "../byteVector";
import {File} from "../file";
import {TagTypes} from "../tag";

/**
 * Provides support for reading and writing MovieID tags.
 */
export default class MovieIdTag extends RiffListTag {

    // #region Constructors

    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance by reading the contents of a raw RIFF list stored
     * in a {@link ByteVector} object.
     * @param data Object containing the raw RIFF list
     */
    public static fromData(data: ByteVector): MovieIdTag {
        const tag = new MovieIdTag();
        tag.initializeFromData(data);
        return tag;
    }

    /**
     * Constructs and initializes a new, empty instance.
     */
    public static fromEmpty(): MovieIdTag {
        const tag = new MovieIdTag();
        tag.initializeFromEmpty();
        return tag;
    }

    /**
     * Constructs and initializes a new instance by reading the contents of a raw RIFF list stored
     * a file.
     * @param file File containing the raw RIFF list
     * @param position Index into the file where the RIFF list begins. Must be a safe, unsigned int
     * @param length Number of bytes to read
     */
    public static fromFile(file: File, position: number, length: number): MovieIdTag {
        const tag = new MovieIdTag();
        tag.initializeFromFile(file, position, length);
        return tag;
    }

    // #endregion

    // #region Properties

    /** @inheritDoc */
    public get tagTypes(): TagTypes { return TagTypes.MovieId; }

    /**
     * @inheritDoc
     * @remarks Implemented via the `TITL` item.
     */
    public get title(): string { return this.getFirstValueAsString("TITL"); }
    /**
     * @inheritDoc
     * @remarks Implemented via the `TITL` item.
     */
    public set title(value: string) { this.setValuesFromStrings("TITL", value); }

    /**
     * @inheritDoc
     * @remarks Implemented via the `IART` item.
     */
    public get performers(): string[] { return this.getValuesAsStrings("IART"); }
    /**
     * @inheritDoc
     * @remarks Implemented via the `IART` item.
     */
    public set performers(value: string[]) { this.setValuesFromStrings("IART", ... value); }

    /**
     * @inheritDoc
     * @remarks Implemented via the `COMM` item.
     */
    public get comment(): string { return this.getFirstValueAsString("COMM"); }
    /**
     * @inheritDoc
     * @remarks Implemented via the `COMM` item.
     */
    public set comment(value: string) { this.setValuesFromStrings("COMM", value); }

    /**
     * @inheritDoc
     * @remarks Implemented via the `GENR` item.
     */
    public get genres(): string[] { return this.getValuesAsStrings("GENR"); }
    /**
     * @inheritDoc
     * @remarks Implemented via the `GENR` item.
     */
    public set genres(value: string[]) { this.setValuesFromStrings("GENR", ... value); }

    /**
     * @inheritDoc
     * @remarks Implemented via the `PRT1` item.
     */
    public get track(): number { return this.getValueAsUint("PRT1"); }
    /**
     * @inheritDoc
     * @remarks Implemented via the `PRT1` item.
     */
    public set track(value: number) { this.setValueFromUint("PRT1", value); }

    /**
     * @inheritDoc
     * @remarks Implemented via the `PRT2` item.
     */
    public get trackCount(): number { return this.getValueAsUint("PRT2"); }
    /**
     * @inheritDoc
     * @remarks Implemented via the `PRT2` item.
     */
    public set trackCount(value: number) { this.setValueFromUint("PRT2", value); }

    // #endregion

    // #region Methods

    /**
     * Renders the current instance, enclosed in a `MID ` item.
     */
    public renderEnclosed(): ByteVector {
        return this.renderEnclosedInternal("MID ");
    }

    // #endregion

}
