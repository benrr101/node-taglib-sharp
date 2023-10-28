import AppleAdditionalInfoBox from "./appleAdditionalInfoBox";
import AppleAnnotationBox from "./appleAnnotationBox";
import Mpeg4Box from "./mpeg4Box";
import Mpeg4BoxHeader from "../mpeg4BoxHeader";
import Mpeg4BoxType from "../mpeg4BoxType";
import {AppleDataBox, AppleDataBoxFlagType} from "./appleDataBox";
import {ByteVector} from "../../byteVector";
import {ArrayUtils, Guards} from "../../utils";

/**
 * This class extends @see Mpeg4Box to provide an implementation of an Apple ItemListBox.
 */
export default class AppleItemListBox extends Mpeg4Box {
    /**
     * Private constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance of @see AppleItemListBox with a provided header and
     * handler by reading the contents from a specified file.
     * @param header A @see Mpeg4BoxHeader object containing the header to use for the new instance.
     * @param handlerType Type of the handler box object containing the handler that applies to the
     *     new instance, or undefined if no handler applies.
     * @returns A new instance of @see AppleItemListBox
     */
    public static fromHeader(header: Mpeg4BoxHeader, handlerType: ByteVector): AppleItemListBox {
        const instance = new AppleItemListBox();
        instance.initializeFromHeader(header, handlerType);

        return instance;
    }

    /**
     * Constructs and initializes a new instance of @see AppleItemListBox with no children.
     * @returns A new instance of @see AppleItemListBox
     */
    public static fromEmpty(): AppleItemListBox {
        const instance = new AppleItemListBox();
        instance.initializeFromType(Mpeg4BoxType.ILST);

        return instance;
    }

    /**
     * Returns the Parent Dash box object for a given mean/name combination
     * @param meanString String specifying text for mean box
     * @param nameString String specifying text for name box
     * @returns AppleAnnotationBox object that is the parent for the mean/name combination
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
     * Gets the AppleDataBox that corresponds to the specified mean and name values.
     * @param meanString String specifying text for mean box
     * @param nameString String specifying text for name box
     * @returns Existing AppleDataBox or undefined if one does not exist
     */
    public getItunesTagDataBox(meanString: string, nameString: string): AppleDataBox {
        return this.getItunesTagBox(meanString, nameString)?.getChild<AppleDataBox>(Mpeg4BoxType.DATA);
    }

    /**
     * Gets the AppleDataBox instances that corresponds to the specified mean and name values.
     * @param meanString String specifying text for mean box
     * @param nameString String specifying text for name box
     * @returns Existing AppleDataBox or null if one does not exist
     */
    public getItunesTagDataBoxes(meanString: string, nameString: string): AppleDataBox[] {
        return this.getItunesTagBoxes(meanString, nameString).reduce((accum, b) => {
            const dataBox = b.getChild<AppleDataBox>(Mpeg4BoxType.DATA);
            ArrayUtils.safePush(accum, dataBox);
            return accum;
        }, []);
    }

    public getQuickTimeDataBoxes(type: ByteVector): AppleDataBox[] {
        return this.getChildren<AppleAnnotationBox>(type).reduce((accum, b) => {
            const dataBoxes = b.getChildren<AppleDataBox>(Mpeg4BoxType.DATA);
            ArrayUtils.safePushRange(accum, dataBoxes);
            return accum;
        }, []);
    }

    public setItunesTagBox(meanString: string, nameString: string, dataString: string): void {
        Guards.notNullOrUndefined(meanString, "meanString");
        Guards.notNullOrUndefined(nameString, "nameString");

        // @TODO: This does not take into consideration scenario where multiple boxes exist with same name/meaning
        const itunesTagBox = this.getItunesTagBox(meanString, nameString);
        if (!itunesTagBox && !dataString) {
            // No itunes box, and nothing to store, so just stop processing
            return;
        }

        if (!dataString) {
            // Itunes box exists, but we want to clear it
            this.removeChildByBox(itunesTagBox);
            return;
        }

        const dataBox = itunesTagBox.getChild<AppleDataBox>(Mpeg4BoxType.DATA);
        if (dataBox) {
            // Data box was found, update the contents
            dataBox.text = dataString;
        } else {
            // Create the new boxes, should use 1 for text as a flag
            const ameanBox = AppleAdditionalInfoBox.fromTypeVersionAndFlags(Mpeg4BoxType.MEAN, 0, 1);
            ameanBox.text = dataString;

            const anameBox = AppleAdditionalInfoBox.fromTypeVersionAndFlags(Mpeg4BoxType.NAME, 0, 1);
            anameBox.text = nameString;

            const adataBox = AppleDataBox.fromDataAndFlags(Mpeg4BoxType.DATA, 1);
            adataBox.text = dataString;

            const wholeBox = AppleAnnotationBox.fromType(Mpeg4BoxType.ITUNES_TAG_BOX);
            wholeBox.addChild(ameanBox);
            wholeBox.addChild(anameBox);
            wholeBox.addChild(adataBox);
            this.addChild(wholeBox);
        }
    }

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