import { ByteVector } from "../byteVector";
import { File } from "../file";
import AppleAnnotationBox, {
    AppleAdditionalInfoBox,
    AppleDataBox,
    AppleElementaryStreamDescriptor,
    AppleItemListBox,
    IsoAudioSampleEntry,
    IsoChunkLargeOffsetBox,
    IsoChunkOffsetBox,
    IsoFreeSpaceBox,
    IsoHandlerBox,
    IsoMetaBox,
    IsoMovieHeaderBox,
    IsoSampleDescriptionBox,
    IsoSampleEntry,
    IsoSampleTableBox,
    IsoUserDataBox,
    IsoVisualSampleEntry,
    Mpeg4Box,
    TextBox,
    UnknownBox,
    UrlBox,
} from "./mpeg4Boxes";
import Mpeg4BoxHeader from "./mpeg4BoxHeader";
import Mpeg4BoxType from "./mpeg4BoxType";

/**
 * This class provides support for reading boxes from a file.
 */
export default class Mpeg4BoxFactory {
    /**
     * Creates a box by reading it from a file given its header, parent header, handler, and index in its parent.
     * @param file A @see File object containing the file to read from.
     * @param header A @see Mpeg4BoxHeader object containing the header of the box to create.
     * @param parent A @see Mpeg4BoxHeader object containing the header of the parent box.
     * @param handler A @see IsoHandlerBox object containing the handler that applies to the new box.
     * @param index  A value containing the index of the new box in its parent.
     * @returns A newly created @see Mpeg4Box object.
     */
    public static createBoxFromFileHeaderParentHandlerAndIndex(
        file: File,
        header: Mpeg4BoxHeader,
        parent: Mpeg4BoxHeader,
        handler: IsoHandlerBox,
        index: number
    ): Mpeg4Box {
        // The first few children of an "stsd" are sample entries.
        if (
            ByteVector.equals(parent.boxType, Mpeg4BoxType.Stsd) &&
            parent.box instanceof IsoSampleDescriptionBox &&
            index < (parent.box as IsoSampleDescriptionBox).entryCount
        ) {
            if (handler && ByteVector.equals(handler.handlerType, Mpeg4BoxType.Soun)) {
                return IsoAudioSampleEntry.fromHeaderFileAndHandler(header, file, handler);
            }

            if (handler && ByteVector.equals(handler.handlerType, Mpeg4BoxType.Vide)) {
                return IsoVisualSampleEntry.fromHeaderFileAndHandler(header, file, handler);
            }

            if (handler && ByteVector.equals(handler.handlerType, Mpeg4BoxType.Alis)) {
                if (ByteVector.equals(header.boxType, Mpeg4BoxType.Text)) {
                    return TextBox.fromHeaderFileAndHandler(header, file, handler);
                }

                if (ByteVector.equals(header.boxType, Mpeg4BoxType.Url)) {
                    return UrlBox.fromHeaderFileAndHandler(header, file, handler);
                }

                // This could be anything, so just parse it.
                return UnknownBox.fromHeaderFileAndHandler(header, file, handler);
            }

            return IsoSampleEntry.fromHeaderFileAndHandler(header, file, handler);
        }

        // Standard items...
        const type: ByteVector = header.boxType;

        if (ByteVector.equals(type, Mpeg4BoxType.Mvhd)) {
            return IsoMovieHeaderBox.fromHeaderFileAndHandler(header, file, handler);
        } else if (ByteVector.equals(type, Mpeg4BoxType.Stbl)) {
            return IsoSampleTableBox.fromHeaderFileAndHandler(header, file, handler);
        } else if (ByteVector.equals(type, Mpeg4BoxType.Stsd)) {
            return IsoSampleDescriptionBox.fromHeaderFileAndHandler(header, file, handler);
        } else if (ByteVector.equals(type, Mpeg4BoxType.Stco)) {
            return IsoChunkOffsetBox.fromHeaderFileAndHandler(header, file, handler);
        } else if (ByteVector.equals(type, Mpeg4BoxType.Co64)) {
            return IsoChunkLargeOffsetBox.fromHeaderFileAndHandler(header, file, handler);
        } else if (ByteVector.equals(type, Mpeg4BoxType.Hdlr)) {
            return IsoHandlerBox.fromHeaderFileAndHandler(header, file, handler);
        } else if (ByteVector.equals(type, Mpeg4BoxType.Udta)) {
            return IsoUserDataBox.fromHeaderFileAndHandler(header, file, handler);
        } else if (ByteVector.equals(type, Mpeg4BoxType.Meta)) {
            return IsoMetaBox.fromHeaderFileAndHandler(header, file, handler);
        } else if (ByteVector.equals(type, Mpeg4BoxType.Ilst)) {
            return AppleItemListBox.fromHeaderFileAndHandler(header, file, handler);
        } else if (ByteVector.equals(type, Mpeg4BoxType.Data)) {
            return AppleDataBox.fromHeaderFileAndHandler(header, file, handler);
        } else if (ByteVector.equals(type, Mpeg4BoxType.Esds)) {
            return AppleElementaryStreamDescriptor.fromHeaderFileAndHandler(header, file, handler);
        } else if (ByteVector.equals(type, Mpeg4BoxType.Free) || ByteVector.equals(type, Mpeg4BoxType.Skip)) {
            return IsoFreeSpaceBox.fromHeaderFileAndHandler(header, file, handler);
        } else if (ByteVector.equals(type, Mpeg4BoxType.Mean) || ByteVector.equals(type, Mpeg4BoxType.Name)) {
            return AppleAdditionalInfoBox.fromHeaderFileAndHandler(header, file, handler);
        }

        // If we still don't have a tag, and we're inside an ItemListBox, load the box as an AnnotationBox (Apple tag item).
        if (ByteVector.equals(parent.boxType, Mpeg4BoxType.Ilst)) {
            return AppleAnnotationBox.fromHeaderFileAndHandler(header, file, handler);
        }

        // Nothing good. Go generic.
        return UnknownBox.fromHeaderFileAndHandler(header, file, handler);
    }

    /**
     * Creates a box by reading it from a file given its position in the file, parent header, handler, and index in its parent.
     * @param file A @see File object containing the file to read from.
     * @param position  A value specifying at what seek position in file to start reading.
     * @param parent A @see Mpeg4BoxHeader object containing the header of the parent box.
     * @param handler A @see IsoHandlerBox object containing the handler that applies to the new box.
     * @param index A value containing the index of the new box in its parent.
     * @returns A newly created @see Mpeg4Box object.
     */
    public static createBoxFromFilePositionParentHandlerAndIndex(
        file: File,
        position: number,
        parent: Mpeg4BoxHeader,
        handler: IsoHandlerBox,
        index: number
    ): Mpeg4Box {
        const header: Mpeg4BoxHeader = Mpeg4BoxHeader.fromFileAndPosition(file, position);

        return Mpeg4BoxFactory.createBoxFromFileHeaderParentHandlerAndIndex(file, header, parent, handler, index);
    }

    /**
     * Creates a box by reading it from a file given its position in the file and handler.
     * @param file A @see File object containing the file to read from.
     * @param position A value specifying at what seek position in file to start reading.
     * @param handler A @see IsoHandlerBox object containing the handler that applies to the new box.
     * @returns A newly created @see Mpeg4Box object.
     */
    public static createBoxFromFilePositionAndHandler(file: File, position: number, handler: IsoHandlerBox): Mpeg4Box {
        return Mpeg4BoxFactory.createBoxFromFilePositionAndHandler(file, position, handler);
    }

    /**
     *  Creates a box by reading it from a file given its position in the file.
     * @param file A @see File object containing the file to read from.
     * @param position A value specifying at what seek position in file to start reading.
     * @returns A newly created @see Mpeg4Box object.
     */
    public static createBoxFromFileAndPosition(file: File, position: number): Mpeg4Box {
        return Mpeg4BoxFactory.createBoxFromFilePositionAndHandler(file, position, undefined);
    }

    /**
     * Creates a box by reading it from a file given its header and handler.
     * @param file A @see File object containing the file to read from.
     * @param header A @see Mpeg4BoxHeader object containing the header of the box to create.
     * @param handler A @see IsoHandlerBox object containing the handler that applies to the new box.
     * @returns A newly created @see Mpeg4Box object.
     */
    public static createBoxFromFileHeaderAndHandler(file: File, header: Mpeg4BoxHeader, handler: IsoHandlerBox): Mpeg4Box {
        return Mpeg4BoxFactory.createBoxFromFileHeaderParentHandlerAndIndex(file, header, Mpeg4BoxHeader.fromEmpty(), handler, -1);
    }

    /**
     * Creates a box by reading it from a file given its header and handler.
     * @param file A @see File object containing the file to read from.
     * @param header A @see Mpeg4BoxHeader object containing the header of the box to create.
     * @returns A newly created @see Mpeg4Box object.
     */
    public static createBoxFromFileAndHeader(file: File, header: Mpeg4BoxHeader): Mpeg4Box {
        return Mpeg4BoxFactory.createBoxFromFileHeaderAndHandler(file, header, undefined);
    }
}
