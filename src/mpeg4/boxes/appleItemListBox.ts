import AppleAdditionalInfoBox from "./appleAdditionalInfoBox";
import AppleAnnotationBox from "./appleAnnotationBox";
import Mpeg4Box from "./mpeg4Box";
import Mpeg4BoxHeader from "../mpeg4BoxHeader";
import Mpeg4BoxType from "../mpeg4BoxType";
import {AppleDataBox, AppleDataBoxFlagType} from "./appleDataBox";
import {ByteVector} from "../../byteVector";
import {ArrayUtils, Guards} from "../../utils";

/**
 * This class extends {@link Mpeg4Box} to provide an implementation of an Apple ItemListBox.
 */
export default class AppleItemListBox extends Mpeg4Box {
    /**
     * Private constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance of {@link AppleItemListBox} with a provided header and
     * handler by reading the contents from a specified file.
     * @param header A {@link Mpeg4BoxHeader} object containing the header to use for the new instance.
     * @param handlerType Type of the handler box object containing the handler that applies to the
     *     new instance, or undefined if no handler applies.
     */
    public static fromHeader(header: Mpeg4BoxHeader, handlerType: ByteVector): AppleItemListBox {
        const instance = new AppleItemListBox();
        instance.initializeFromHeader(header, handlerType);

        return instance;
    }

    /**
     * Constructs and initializes a new instance of {@link AppleItemListBox} with no children.
     */
    public static fromEmpty(): AppleItemListBox {
        const instance = new AppleItemListBox();
        instance.initializeFromType(Mpeg4BoxType.ILST);

        return instance;
    }

    /**
     * Returns the first itunes box object for a given mean/name combination
     * @param meanString String specifying text for mean box
     * @param nameString String specifying text for name box
     * @returns AppleAnnotationBox First iTunes box that contains the desired mean/name combination
     *     or `undefined` if desired box was not found.
     */
    public getItunesTagBox(meanString: string, nameString: string): AppleAnnotationBox {
        return this.getChild<AppleAnnotationBox>(Mpeg4BoxType.ITUNES_TAG_BOX, (b) => {
            // Get the mean and name boxes, make sure they're legit, check the Text fields for a match.
            // If we have a match return the AppleDataBox containing the data.
            const meanBox = b.getChild<AppleAdditionalInfoBox>(Mpeg4BoxType.MEAN);
            const nameBox = b.getChild<AppleAdditionalInfoBox>(Mpeg4BoxType.NAME);

            return meanBox?.text === meanString && nameBox.text.toLowerCase() === nameString.toLowerCase();
        });
    }

    /**
     * Returns all itunes boxes for a given mean/name string.
     * @param meanString MEAN box contents to search for
     * @param nameString NAME box contents to search for
     * @returns AppleAnnotationBox[] All iTunes boxes that contain the desired mean/name
     *     combination. `[]` is returned if no matches were found.
     */
    public getItunesTagBoxes(meanString: string, nameString: string): AppleAnnotationBox[] {
        return this.getChildren<AppleAnnotationBox>(Mpeg4BoxType.ITUNES_TAG_BOX, (b) => {
            // Get the mean and name boxes, make sure they're legit, check the Text fields for a match.
            // If we have a match return the AppleDataBox containing the data.
            const meanBox = b.getChild<AppleAdditionalInfoBox>(Mpeg4BoxType.MEAN);
            const nameBox = b.getChild<AppleAdditionalInfoBox>(Mpeg4BoxType.NAME);

            return meanBox?.text === meanString && nameBox.text.toLowerCase() === nameString.toLowerCase();
        });
    }

    /**
     * Gets all DATA boxes that correspond to the specified iTunes MEAN and NAME values.
     * @param meanString String specifying text for MEAN box
     * @param nameString String specifying text for NAME box
     * @returns AppleDataBox[] DATA boxes contained within the iTunes boxes with the given
     *     MEAN/NAME values. `[]` is returned if no matches are found.
     */
    public getItunesTagDataBoxes(meanString: string, nameString: string): AppleDataBox[] {
        return this.getItunesTagBoxes(meanString, nameString).reduce((accum, b) => {
            const dataBox = b.getChild<AppleDataBox>(Mpeg4BoxType.DATA);
            ArrayUtils.safePush(accum, dataBox);
            return accum;
        }, []);
    }

    /**
     * Gets all DATA boxes that correspond to the specified QuickTime box type.
     * @param type Box type to search for
     * @returns AppleDataBox[] DATA boxes contained within the boxes with the givem type. `[]` is
     *     returned if no matches were found.
     */
    public getQuickTimeDataBoxes(type: ByteVector): AppleDataBox[] {
        return this.getChildren<AppleAnnotationBox>(type).reduce((accum, b) => {
            const dataBoxes = b.getChildren<AppleDataBox>(Mpeg4BoxType.DATA);
            ArrayUtils.safePushRange(accum, dataBoxes);
            return accum;
        }, []);
    }

    /**
     * Stores the given `dataStrings` as separate iTunes boxes. It clears any existing iTunes
     * boxes and replaces them with the provided data. Structure will look like:
     * ```
     * - this
     *   - ----
     *     - MEAN meanString
     *     - NAME nameString
     *     - DATA dataStrings[0]
     *   - ----
     *     - MEAN meanString
     *     - NAME nameString
     *     - DATA dataStrings[1]
     *   ...
     * ```
     * @param meanString String to use for MEAN box.
     * @param nameString String to use for NAME box.
     * @param dataStrings Strings to store in the DATA boxes.
     */
    public setItunesTagBoxes(meanString: string, nameString: string, dataStrings: string[]): void {
        Guards.notNullOrUndefined(meanString, "meanString");
        Guards.notNullOrUndefined(nameString, "nameString");

        // Clear existing boxes
        // Note: this is a departure from the original implementation which would try to update
        //    existing boxes. However, this leaves invalid scenarios in place (itunes boxes with >1
        //    data box, for example). Deleting all existing boxes and rewriting them ensures a
        //    clean slate.
        const itunesTagBoxes = this.getItunesTagBoxes(meanString, nameString);
        this.removeChildrenByBox(itunesTagBoxes);

        if (!dataStrings) {
            // Nothing to store. Stop processing.
            return;
        }

        for (const dataString of dataStrings) {
            if (!dataString) {
                continue;
            }

            // Create new box for each string
            const meanBox = AppleAdditionalInfoBox.fromTypeVersionAndFlags(
                Mpeg4BoxType.MEAN,
                0,
                AppleDataBoxFlagType.ContainsText
            );
            meanBox.text = meanString;

            const nameBox = AppleAdditionalInfoBox.fromTypeVersionAndFlags(
                Mpeg4BoxType.NAME,
                0,
                AppleDataBoxFlagType.ContainsText
            );
            nameBox.text = nameString;

            const dataBox = AppleDataBox.fromDataAndFlags(Mpeg4BoxType.DATA, 1);
            dataBox.text = dataString;

            const wholeBox = AppleAnnotationBox.fromType(Mpeg4BoxType.ITUNES_TAG_BOX);
            wholeBox.addChild(meanBox);
            wholeBox.addChild(nameBox);
            wholeBox.addChild(dataBox);
            this.addChild(wholeBox);
        }
    }

    /**
     * Stores the given `dataBoxes` in the current instance inside a single box of the given
     * `type`. Any existing boxes of the given `type` will be removed. Structure will look like:
     * ```
     * - this
     *   - type
     *     - dataBoxes[0]
     *     - dataBoxes[1]
     *     ...
     * ```
     * @param type Type of the parent box that will house `dataBoxes`
     * @param dataBoxes DATA boxes to store in a new parent box.
     */
    public setQuickTimeBoxes(type: ByteVector, dataBoxes: AppleDataBox[]): void {
        Guards.truthy(type, "type");

        // Clear existing boxes
        this.removeChildByType(type);

        // If there's no boxes, stop processing
        if (!dataBoxes) {
            return;
        }

        // Create boxes of the type for each provided data box and add to the current instance
        for (const dataBox of dataBoxes) {
            if (!dataBox || !ByteVector.equals(dataBox.boxType, Mpeg4BoxType.DATA)) {
                continue;
            }

            const parentBox = AppleAnnotationBox.fromType(type);
            parentBox.addChild(dataBox);

            this.addChild(parentBox);
        }
    }
}