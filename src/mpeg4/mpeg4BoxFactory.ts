import AppleAdditionalInfoBox from "./boxes/appleAdditionalInfoBox";
import AppleAnnotationBox from "./boxes/appleAnnotationBox";
import AppleElementaryStreamDescriptor from "./boxes/appleElementaryStreamDescriptor";
import AppleItemListBox from "./boxes/appleItemListBox";
import IsoAudioSampleEntry from "./boxes/isoAudioSampleEntry";
import IsoChunkLargeOffsetBox from "./boxes/isoChunkLargeOffsetBox";
import IsoChunkOffsetBox from "./boxes/isoChunkOffsetBox";
import IsoFreeSpaceBox from "./boxes/isoFreeSpaceBox";
import IsoHandlerBox from "./boxes/isoHandlerBox";
import IsoMetaBox from "./boxes/isoMetaBox";
import IsoMovieHeaderBox from "./boxes/isoMovieHeaderBox";
import IsoSampleDescriptionBox from "./boxes/isoSampleDescriptionBox";
import IsoSampleTableBox from "./boxes/isoSampleTableBox";
import IsoUnknownSampleEntry from "./boxes/isoUnknownSampleEntry";
import IsoUserDataBox from "./boxes/isoUserDataBox";
import IsoVisualSampleEntry from "./boxes/isoVisualSampleEntry";
import Mpeg4Box from "./boxes/mpeg4Box";
import Mpeg4BoxHeader from "./mpeg4BoxHeader";
import Mpeg4BoxType from "./mpeg4BoxType";
import TextBox from "./boxes/textBox";
import UnknownBox from "./boxes/unknownBox";
import UrlBox from "./boxes/urlBox";
import {AppleDataBox} from "./boxes/appleDataBox";
import {ByteVector} from "../byteVector";
import {File} from "../file";

/**
 * This class provides support for reading boxes from a file.
 */
export default class Mpeg4BoxFactory {
    /**
     * Creates a box by reading it from a file given its header, parent header, handler, and index in its parent.
     * @param file A {@link File} object containing the file to read from.
     * @param header A {@link Mpeg4BoxHeader} object containing the header of the box to create.
     * @param parentHeader A {@link Mpeg4BoxHeader} object containing the header of the parent box.
     * @param handlerType Type of the handler box containing the handler that applies to the new box.
     * @returns A newly created {@link Mpeg4Box} object.
     */
    public static createBoxFromFileHeaderParentHandler(
        file: File,
        header: Mpeg4BoxHeader,
        parentHeader: Mpeg4BoxHeader,
        handlerType: ByteVector,
    ): Mpeg4Box {
        // Standard items...
        const type = header.boxType;

        if (ByteVector.equals(type, Mpeg4BoxType.MVHD)) {
            return IsoMovieHeaderBox.fromHeaderFileAndHandler(header, file, handlerType);
        }
        else if (ByteVector.equals(type, Mpeg4BoxType.STBL))
        {
            const box = IsoSampleTableBox.fromFile(file, header, handlerType);
            this.loadChildren(file, box);
            return box;
        }
        else if (ByteVector.equals(type, Mpeg4BoxType.STSD))
        {
            const box = IsoSampleDescriptionBox.fromFile(file, header, handlerType);
            this.loadSampleDescriptors(file, box);
            return box;
        }
        else if (ByteVector.equals(type, Mpeg4BoxType.STCO))
        {
            return IsoChunkOffsetBox.fromHeaderFileAndHandler(header, file, handlerType);
        }
        else if (ByteVector.equals(type, Mpeg4BoxType.CO64))
        {
            return IsoChunkLargeOffsetBox.fromHeaderFileAndHandler(header, file, handlerType);
        }
        else if (ByteVector.equals(type, Mpeg4BoxType.HDLR))
        {
            return IsoHandlerBox.fromHeaderFileAndHandler(header, file, handlerType);
        }
        else if (ByteVector.equals(type, Mpeg4BoxType.UDTA))
        {
            const box = IsoUserDataBox.fromFile(file, header, handlerType);
            this.loadChildren(file, box);
            return box;
        }
        else if (ByteVector.equals(type, Mpeg4BoxType.META))
        {
            const box = IsoMetaBox.fromFile(file, header, handlerType);
            this.loadChildren(file, box);
            return box;
        }
        else if (ByteVector.equals(type, Mpeg4BoxType.ILST))
        {
            const box = AppleItemListBox.fromFile(file, header, handlerType);
            this.loadChildren(file, box);
            return box;
        }
        else if (ByteVector.equals(type, Mpeg4BoxType.DATA))
        {
            return AppleDataBox.fromHeaderFileAndHandler(header, file, handlerType);
        }
        else if (ByteVector.equals(type, Mpeg4BoxType.ESDS))
        {
            return AppleElementaryStreamDescriptor.fromHeaderFileAndHandler(header, file, handlerType);
        }
        else if (ByteVector.equals(type, Mpeg4BoxType.FREE) || ByteVector.equals(type, Mpeg4BoxType.SKIP))
        {
            return IsoFreeSpaceBox.fromHeaderFileAndHandler(header, file, handlerType);
        }
        else if (ByteVector.equals(type, Mpeg4BoxType.MEAN) || ByteVector.equals(type, Mpeg4BoxType.NAME))
        {
            return AppleAdditionalInfoBox.fromHeaderFileAndHandler(header, file, handlerType);
        }

        // If we still don't have a tag, and we're inside an ItemListBox, load the box as an
        // AnnotationBox (Apple tag item).
        if (ByteVector.equals(parentHeader.boxType, Mpeg4BoxType.ILST)) {
            const box = AppleAnnotationBox.fromFile(file, header, handlerType);
            this.loadChildren(file, box);
            return box;
        }

        // Nothing good. Go generic.
        return UnknownBox.fromHeaderFileAndHandler(header, file, handlerType);
    }

    /**
     * Creates a box by reading it from a file given its position in the file, parent header,
     * handler, and index in its parent.
     * @param file A {@link File} object containing the file to read from.
     * @param position  A value specifying at what seek position in file to start reading.
     * @param parent A {@link Mpeg4BoxHeader} object containing the header of the parent box.
     * @param handler A {@link IsoHandlerBox} object containing the handler that applies to the new box.
     * @param index A value containing the index of the new box in its parent.
     * @returns A newly created {@link Mpeg4Box} object.
     */
    public static createBoxFromFilePositionParentHandlerAndIndex(
        file: File,
        position: number,
        parent: Mpeg4BoxHeader,
        handlerType: ByteVector
    ): Mpeg4Box {
        const header = Mpeg4BoxHeader.fromFileAndPosition(file, position);
        return Mpeg4BoxFactory.createBoxFromFileHeaderParentHandler(file, header, parent, handlerType);
    }

    /**
     * Creates a box by reading it from a file given its position in the file and handler.
     * @param file A {@link File} object containing the file to read from.
     * @param position A value specifying at what seek position in file to start reading.
     * @param handler A {@link IsoHandlerBox} object containing the handler that applies to the new box.
     * @returns A newly created {@link Mpeg4Box} object.
     */
    public static createBoxFromFilePositionAndHandler(file: File, position: number, handler: IsoHandlerBox): Mpeg4Box {
        return Mpeg4BoxFactory.createBoxFromFilePositionAndHandler(file, position, handler);
    }

    /**
     *  Creates a box by reading it from a file given its position in the file.
     * @param file A {@link File} object containing the file to read from.
     * @param position A value specifying at what seek position in file to start reading.
     * @returns A newly created {@link Mpeg4Box} object.
     */
    public static createBoxFromFileAndPosition(file: File, position: number): Mpeg4Box {
        return Mpeg4BoxFactory.createBoxFromFilePositionAndHandler(file, position, undefined);
    }

    /**
     * Creates a box by reading it from a file given its header and handler.
     * @param file A {@link File} object containing the file to read from.
     * @param header A {@link Mpeg4BoxHeader} object containing the header of the box to create.
     * @param handlerType Type of the handler box object containing the handler that applies to the
     *     new instance, or undefined if no handler applies.
     * @returns A newly created {@link Mpeg4Box} object.
     */
    public static createBoxFromFileHeaderAndHandler(
        file: File,
        header: Mpeg4BoxHeader,
        handlerType: ByteVector
    ): Mpeg4Box {
        return Mpeg4BoxFactory.createBoxFromFileHeaderParentHandler(
            file,
            header,
            Mpeg4BoxHeader.fromEmpty(),
            handlerType
        );
    }

    /**
     * Creates a box by reading it from a file given its header and handler.
     * @param file A {@link File} object containing the file to read from.
     * @param header A {@link Mpeg4BoxHeader} object containing the header of the box to create.
     * @returns A newly created {@link Mpeg4Box} object.
     */
    public static createBoxFromFileAndHeader(file: File, header: Mpeg4BoxHeader): Mpeg4Box {
        return Mpeg4BoxFactory.createBoxFromFileHeaderAndHandler(file, header, undefined);
    }

    private static loadSampleDescriptors(file: File, box: IsoSampleDescriptionBox): void {
        let position = box.dataPosition
        for (let i = 0; i < box.entryCount; i++) {
            const header = Mpeg4BoxHeader.fromFileAndPosition(file, position);
            let child: Mpeg4Box;

            // I know this isn't the right formatting, but it is damn near unreadable without some spacing
            if (ByteVector.equals(box.handlerType, Mpeg4BoxType.SOUN))
            {
                child = IsoAudioSampleEntry.fromFile(file, header, box.handlerType);
                this.loadChildren(file, child);
            }
            else if (ByteVector.equals(box.handlerType, Mpeg4BoxType.VIDE))
            {
                child = IsoVisualSampleEntry.fromHeaderFileAndHandler(header, file, box.handlerType);
            }
            else if (ByteVector.equals(box.handlerType, Mpeg4BoxType.ALIS))
            {
                if (ByteVector.equals(header.boxType, Mpeg4BoxType.TEXT))
                {
                    child = TextBox.fromHeaderFileAndHandler(header, file, box.handlerType);
                }
                else if (ByteVector.equals(header.boxType, Mpeg4BoxType.URL))
                {
                    child = UrlBox.fromHeaderFileAndHandler(header, file, box.handlerType);
                }
                else
                {
                    // This could be anything, so just parse it.
                    child = UnknownBox.fromHeaderFileAndHandler(header, file, box.handlerType);
                }
            }
            else
            {
                child = IsoUnknownSampleEntry.fromHeaderFileAndHandler(header, file, box.handlerType);
            }

            box.addChild(child);
            position += child.size;
        }
    }

    private static loadChildren(file: File, box: Mpeg4Box): void {
        let position = box.dataPosition;
        const end = position + box.dataSize;

        while (position < end) {
            const header = Mpeg4BoxHeader.fromFileAndPosition(file, position);
            const child = this.createBoxFromFileHeaderParentHandler(
                file,
                header,
                box.header,
                box.handlerType
            );

            if (child.size === 0) {
                break;
            }

            box.addChild(child);
            position += child.size;
        }
    }
}
