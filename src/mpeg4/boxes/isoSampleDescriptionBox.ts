import FullBox from "./fullBox";
import IsoHandlerBox from "./isoHandlerBox";
import Mpeg4BoxHeader from "../mpeg4BoxHeader";
import {File} from "../../file";
import {ChildFactory} from "./mpeg4Box";
import {Mpeg4BoxClassType} from "../mpeg4BoxClassType";
import {Guards} from "../../utils";

/**
 * This class extends @see FullBox to provide an implementation of a ISO/IEC 14496-12 SampleDescriptionBox.
 */
export default class IsoSampleDescriptionBox extends FullBox {
    /**
     * The number of boxes at the beginning of the children that will be stored as @see IsoAudioSampleEntry
     * of @see IsoVisualSampleEntry" objects, depending on the handler.
     */
    public entryCount: number;

    /**
     * Private constructor to force construction via static functions.
     */
    private constructor() {
        super();
    }

    /**
     * Constructs and initializes a new instance of @see IsoSampleDescriptionBox with a provided header
     * and handler by reading the contents from a specified file.
     * @param header A @see Mpeg4BoxHeader object containing the header to use for the new instance.
     * @param file A @see File object to read the contents of the box from.
     * @param handler A @see IsoHandlerBox object containing the handler that applies to the new instance.
     * @param childFactory Factory for creating child boxes
     * @returns A new instance of @see IsoSampleDescriptionBox
     */
    public static fromHeaderFileAndHandler(
        header: Mpeg4BoxHeader,
        file: File,
        handler: IsoHandlerBox,
        childFactory: ChildFactory
    ): IsoSampleDescriptionBox {
        Guards.notNullOrUndefined(file, "file");

        const instance: IsoSampleDescriptionBox = new IsoSampleDescriptionBox();
        instance.initializeFromHeaderFileAndHandler(header, file, handler);
        instance.increaseDataPosition(4);
        instance.entryCount = file.readBlock(4).toUint();
        instance.children = instance.loadChildren(file, childFactory);

        return instance;
    }

    /** @inheritDoc */
    public get boxClassType(): Mpeg4BoxClassType { return Mpeg4BoxClassType.IsoSampleDescriptionBox; }
}
