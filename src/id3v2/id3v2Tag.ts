import FrameFactory from "./frames/frameFactory";
import FrameTypes from "./frameTypes";
import Header from "./header";
import HeaderFlags from "./headerFlags";
import SyncData from "./syncData";
import {ByteVector, StringType} from "../byteVector";
import {Tag} from "../tag";
import {Frame, FrameClassType} from "./frames/frame";
import ExtendedHeader from "./extendedHeader";
import {UrlLinkFrame} from "./frames/urlLinkFrame";
import {TextInformationFrame} from "./frames/textInformationFrame";
import {Id3v2FrameFlags, Id3v2FrameHeader} from "./frames/frameHeader";
import {File, FileAccessMode, ReadStyle} from "../file";
import {Guards} from "../utils";

export default class Id3v2Tag extends Tag {
    private static _defaultEncoding: StringType = StringType.UTF8;
    private static _defaultVersion: number = 3;
    private static _forceDefaultEncoding: boolean = false;
    private static _forceDefaultVersion: boolean = false;
    private static _language: string = undefined;       // @TODO: Use the os-locale module to supply a lazily loaded "default" locale
    private static _useNumericGenres: boolean = true;   // @TODO: DO WE HAVE TO???

    private _extendedHeader: ExtendedHeader;
    private _frameList: Frame[] = [];
    private _header: Header;
    private _performersRole: string[];

    // #region Constructors



    // #endregion

    // #region Properties

    /**
     * Gets the encoding to use when creating new frames.
     */
    public static get defaultEncoding(): StringType { return this._defaultEncoding; }
    /**
     * Sets the encoding to use when creating new frames.
     * @param value Encoding to use when creating new frames
     */
    public static set defaultEncoding(value: StringType) { this._defaultEncoding = value; }

    /**
     * Gets the default version to use when creating new tags.
     * If {@see forceDefaultEncoding} is `true` then all tags will be rendered with this version.
     */
    public static get defaultVersion(): number { return Id3v2Tag._defaultVersion; }
    /**
     * Sets the default version to use when creating new tags.
     * If {@see forceDefaultEncoding} is `true` then all tags will be rendered with this version.
     * @param value ID3v2 version to use. Must be 2, 3, or 4. The default for this library is 3
     */
    public static set defaultVersion(value: number) {
        Guards.byte(value, "value");
        Guards.between(value, 2, 4, "value");
        Id3v2Tag._defaultVersion = value;
    }

    /**
     * Gets whether or not to render all frames with the default encoding rather than their
     * original encoding.
     */
    public static get forceDefaultEncoding(): boolean { return Id3v2Tag._forceDefaultEncoding; }
    /**
     * Sets whether or not to render all frames with the default encoding rather than their
     * original encoding.
     * @param value If `true` frames will be rendered using {@see defaultEncoding} rather than
     *     their original encoding.
     */
    public static set forceDefaultEncoding(value: boolean) { Id3v2Tag._forceDefaultEncoding = value; }

    /**
     * Gets whether or not to save all tags in the default version rather than their original
     * version.
     */
    public static get forceDefaultVersion(): boolean { return this._forceDefaultVersion; }
    /**
     * Sets whether or not to save all tags in the default version rather than their original
     * version.
     * @param value If `true`, tags will be saved in the version defined in {@see defaultVersion}
     *     rather than their original format, with the exception of tags with footers which will
     *     always be saved in version 4
     */
    public static set forceDefaultVersion(value: boolean) { this._forceDefaultVersion = value; }

    /**
     * Gets the ISO-639-2 language code to use when searching for and storing language specific
     * values.
     */
    public static get language(): string { return Id3v2Tag._language; }
    /**
     * Gets the ISO-639-2 language code to use when searching for and storing language specific
     * values.
     * @param value ISO-639-2 language code to use. If the language is unknown `"   "` is the
     *     appropriate filler
     */
    public static set language(value: string) {
        Id3v2Tag._language = !value || value.length < 3
            ? "   "
            : value.substr(0, 3);
    }

    /**
     * Gets whether or not to use ID3v1 style numeric genres when possible.
     * If `true`, the library will try looking up the numeric genre code when storing the value.
     * for ID3v2.2 and ID3v2.3 "Rock" would be stored as "(17)" and for ID3v2.4, it would be
     * stored as "17".
     */
    public static get useNumericGenres(): boolean { return this._useNumericGenres; }
    /**
     * Sets whether or not to use ID3v1 style numeric genres when possible.
     * If `true`, the library will try looking up the numeric genre code when storing the value.
     * for ID3v2.2 and ID3v2.3 "Rock" would be stored as "(17)" and for ID3v2.4, it would be
     * stored as "17".
     * @param value Whether or not to use genres with numeric values when values when possible
     */
    public static set useNumericGenres(value: boolean) { this._useNumericGenres = value; }

    /**
     * Gets the header flags applied to the current instance.
     */
    public get flags(): HeaderFlags { return this._header.flags; }
    /**
     * Sets the header flags applied to the current instance
     * @param value Bitwise combined {@see HeaderFlags} value contiaining flags applied to the
     *     current instance.
     */
    public set flags(value: HeaderFlags) { this._header.flags = value; }

    /**
     * Gets all frames contained in the current instance.
     */
    public get frames(): Frame[] { return this._frameList; }

    /**
     * Gets the ID3v2 version for the current instance.
     */
    public get version(): number {
        return Id3v2Tag.forceDefaultVersion
            ? Id3v2Tag.defaultVersion
            : this._header.majorVersion;
    }
    /**
     * Sets the ID3v2 version for the current instance.
     * @param value ID3v2 version for the current instance. Must be 2, 3, or 4.
     */
    public set version(value: number) {
        Guards.byte(value, "value");
        Guards.between(value, 2, 4, "value");
        this._header.majorVersion = value;
    }

    // #endregion

    // #region Public Methods

    /**
     * Adds a frame to the current instance.
     * @param frame Frame to add to the current instance
     */
    public addFrame(frame: Frame): void {
        Guards.truthy(frame, "frame");
        this._frameList.push(frame);
    }

    /**
     * Gets all frames with a specific frame class type.
     * NOTE: This diverges from the .NET implementation due to the inability to do type checking
     * like in .NET (ie `x is y`). Instead type guards are added to each frame class which provides
     * the same functionality.
     * @param type Class type of the frame to find
     * @returns TFrame[] Array of frames with the specified class type
     */
    public getFramesByClassType<TFrame extends Frame>(type: FrameClassType): TFrame[] {
        Guards.notNullOrUndefined(type, "type");

        return this._frameList.filter((f) => f && f.frameClassType === type)
            .map((f) => <TFrame> f);
    }

    /**
     * Gets a list of frames with the specified identifier contained in the current instance.
     * NOTE: This implementation deviates a bit from the original .NET implementation due to the
     * inability to do `x is y` comparison by types in typescript without type guards.
     * {@paramref type} is the type guard for differentiating frame types. If all frames are needed
     * use {@see frames}.
     * @param type Type of frame to return
     * @param ident Identifier of the frame
     * @returns TFrame[] Array of frames with the desired frame identifier
     */
    public getFramesByIdentifier<TFrame extends Frame>(type: FrameClassType, ident: ByteVector): TFrame[] {
        Guards.notNullOrUndefined(type, "type");
        Guards.truthy(ident, "ident");
        if (ident.length !== 4) {
            throw new Error("Argument out of range: ident must be 4 characters");
        }

        return this._frameList.filter((f) => {
            return f && f.frameClassType === type && ByteVector.equal(f.frameId, ident);
        }).map((f) => <TFrame> f);
    }

    /**
     * Gets the text value from a specified text information frame (or URL frame if that was
     * specified).
     * @param ident Frame identifier of the text information frame to get the value from
     * @returns string Text of the specified frame, or `undefined` if no value was found
     */
    public getTextAsString(ident: ByteVector): string {
        Guards.truthy(ident, "ident");

        const frame = ident.get(0) === "W".codePointAt(0)
            ? UrlLinkFrame.get(this, ident, false)
            : TextInformationFrame.getTextInformationFrame(this, ident, false);

        const result = frame ? frame.toString() : undefined;
        return result || undefined;
    }

    /**
     * Removes a specified frame from the current instance.
     * @param frame Object to remove from the current instance
     */
    public removeFrame(frame: Frame): void {
        Guards.truthy(frame, "frame");

        const index = this._frameList.indexOf(frame);
        if (index >= 0) {
            this._frameList.splice(index, 1);
        }
    }

    /**
     * Removes all frames with a specified identifier from the current instance.
     * @param ident Identifier of the frames to remove
     */
    public removeFrames(ident: ByteVector): void {
        Guards.truthy(ident, "ident");
        if (ident.length !== 4) {
            throw new Error("Argument out of range: ident must be 4 characters");
        }

        for (let i = this._frameList.length - 1; i >= 0; i--) {
            if (ByteVector.equal(this._frameList[i].frameId, ident)) {
                this._frameList.splice(i, 1);
            }
        }
    }

    /**
     * Renders the current instance as a raw ID3v2 tag.
     * By default, tags will be rendered in the version they were loaded in and new tags using the
     * version specified by {@see defaultVersion}. If {@see forceDefaultVersion} is `true`, all
     * tags will be rendered using that version, except for tags with footers which must be in
     * version 4.
     * @returns ByteVector The rendered tag.
     */
    public render(): ByteVector {
        // Convert the perfmers role to the TMCL frame
        const ret: string[] = undefined;
        if (this._performersRole) {
            const map: {[key: string]: string} = {};
            for (let i = 0; i < this._performersRole.length; i++) {
                const insts = this._performersRole[i];
                if (!insts) {
                    continue;
                }

                const instList = insts.split(";");
                for (const iinst of instList) {
                    const inst = iinst.trim();

                    if (i < this.performers.length) {
                        const perf = this.performers[i];
                        if (inst in map) {
                            map[inst] += ", " + perf;
                        } else {
                            map[inst] = perf;
                        }
                    }
                }
            }

            // Convert dictionary to string
            for (const key of map.keys) {
                ret.push(key);
                ret.push(map[key]);
            }
        }

        this.setTextFrame(FrameTypes.TMCL, ...ret);

        // We need to render the "tag data" first so that we have to correct size to render in the
        // tag's header. The "tag data" (everything that is included in Header.tagSize) includes
        // the extended header, frames and padding, but does not include the tag's header or footer

        const hasFooter = (this._header.flags & HeaderFlags.FooterPresent) > 0;
        const unsyncAtFrameLevel = (this._header.flags & HeaderFlags.Unsynchronication) > 0
            && this.version >= 4;
        const unsyncAtTagLevel = (this._header.flags & HeaderFlags.Unsynchronication) > 0
            && this.version < 4;

        this._header.majorVersion = hasFooter ? 4 : this.version;

        const tagData = ByteVector.empty();

        // TODO: Render the extended header
        this._header.flags &= ~HeaderFlags.ExtendedHeader;

        // Loop through the frames rendering them and adding them to tag data
        for (const frame of this._frameList) {
            if (unsyncAtFrameLevel) {
                frame.flags |= Id3v2FrameFlags.Desynchronized;
            }
            if ((frame.flags & Id3v2FrameFlags.TagAlterPreservation) > 0 ) {
                continue;
            }

            try {
                tagData.addByteVector(frame.render(this._header.majorVersion));
            } catch (e) {
                // Swallow unimplemented exceptions
                if (!e.hasOwnProperty("isNotImplementedError")) {
                    throw e;
                }
            }
        }

        // Add unsynchronization bytes if necessary
        if (unsyncAtTagLevel) {
            SyncData.unsyncByteVector(tagData);
        }

        // Compute the amount of padding and append that to tag data
        if (!hasFooter) {
            const size = tagData.length < this._header.tagSize
                ? this._header.tagSize - tagData.length
                : 1024;
            tagData.addByteVector(ByteVector.fromSize(size));
        }

        return tagData;
    }

    /**
     * Replaces an existing frame with a new one in the list contained in the current instance, or
     * adds a new one if the existing one is not contained.
     * @param oldFrame Object to be replaced
     * @param newFrame Object to replace {@paramref oldFrame} with
     */
    public replaceFrame(oldFrame: Frame, newFrame: Frame): void {
        Guards.truthy(oldFrame, "oldFrame");
        Guards.truthy(newFrame, "newFrame");

        if (oldFrame === newFrame) {
            return;
        }

        const index = this._frameList.indexOf(oldFrame);
        if (index >= 0) {
            this._frameList[index] = newFrame;
        } else {
            this._frameList.push(newFrame);
        }
    }

    /**
     * Sets the numerica values for a specified text information frame.
     * If both {@paramref numerator} and {@paramref denominator} are `0`, the frame will be removed
     * from the tag. If {@paramref denominator} is zero, {@paramref numerator} will be stored by
     * itself. Otherwise the values will be stored as `{numerator}/{denominator}`.
     * @param ident Identity of the frame to set
     * @param numerator Value containing the top half of the fraction, or the number if
     *     {@paramref denominator} is zero
     * @param denominator Value containing the bottom half of the fraction
     * @param minPlaces Mininum number of digits to use to display the {@paramref numerator}, if
     *     the numerator has less than this number of digits, it will be filled with leading zeroes.
     */
    public setNumberFrame(ident: ByteVector, numerator: number, denominator: number, minPlaces: number = 1): void {
        Guards.truthy(ident, "ident");
        Guards.uint(numerator, "value");
        Guards.uint(denominator, "count");
        Guards.byte(minPlaces, "minPlaces");
        if (ident.length !== 4) {
            throw new Error("Argument out of range: ident must be 4 characters");
        }

        if (numerator === 0 && denominator === 0) {
            this.removeFrames(ident);
        } else if (denominator !== 0) {
            const formattedNumerator = numerator.toString().padStart(minPlaces, "0");
            this.setTextFrame(ident, `${formattedNumerator}/${denominator}`);
        } else {
            this.setTextFrame(ident, numerator.toString());
        }
    }

    /**
     * Sets the text for a specified text information frame.
     * @param ident Identifier of the frame to set the data for
     * @param text Text to set for the specified frame or `undefined`/`null`/`""` to remove all
     *     frames with that identifier.
     */
    public setTextFrame(ident: ByteVector, ...text: string[]): void {
        Guards.truthy(ident, "ident");
        if (ident.length !== 4) {
            throw new Error("Argument out of range: ident must be 4 characters");
        }

        // Check if all the elements provided are empty. If they are, remove the frame.
        let empty = true;

        if (text) {
            for (let i = 0; empty && i < text.length; i++) {
                if (text[i]) {
                    empty = false;
                }
            }
        }

        if (empty) {
            this.removeFrames(ident);
            return;
        }

        if (ident.get(0) === "W".codePointAt(0)) {
            const urlFrame = UrlLinkFrame.get(this, ident, true);
            urlFrame.text = text;
            urlFrame.textEncoding = Id3v2Tag.defaultEncoding;
        } else {
            const frame = TextInformationFrame.getTextInformationFrame(this, ident, true);
            frame.text = text;
            frame.textEncoding = Id3v2Tag.defaultEncoding;
        }
    }

    // #endregion

    // #region Protected/Private Methods

    protected parse(data: ByteVector, file: File, position: number, style: ReadStyle): void {
        // If the entire tag is marked as unsynchronized, and this tag is version ID3v2.3 or lower,
        // resynchronize it.
        const fullTagUnsync = this._header.majorVersion < 4
            && (this._header.flags & HeaderFlags.Unsynchronication) > 0;

        // Avoid loading all the ID3 tag if PictureLazy is enabled and size is significant enough
        // (ID3v2.4 and later only)
        if (data && (
            fullTagUnsync ||
            this._header.tagSize < 1024 ||
            (style & ReadStyle.PictureLazy) > 0 ||
            (this._header.flags & HeaderFlags.ExtendedHeader) > 0
        )) {
            file.seek(position);
            data = file.readBlock(this._header.tagSize);
        }

        if (fullTagUnsync) {
            SyncData.resyncByteVector(data);
        }

        let frameDataPosition = data ? 0 : position;
        const frameDataEndPosition = (data ? data.length : this._header.tagSize)
            + frameDataPosition - Id3v2FrameHeader.getSize(this._header.majorVersion);

        // Check for the extended header
        if ((this._header.flags & HeaderFlags.ExtendedHeader) > 0) {
            this._extendedHeader = ExtendedHeader.fromData(data, this._header.majorVersion);

            if (this._extendedHeader.size <= data.length) {
                frameDataPosition += this._extendedHeader.size;
                frameDataEndPosition -= this._extendedHeader.size;
            }
        }

        // Parse the frames. TDRC, TDAT, and TIME will be needed for post-processing, so check for
        // for them as they are loaded
        let tdrc: TextInformationFrame;
        let tyer: TextInformationFrame;
        let tdat: TextInformationFrame;
        let time: TextInformationFrame;

        while(frameDataPosition < frameDataEndPosition) {
            let frame: Frame;

            try {
                const frameRead = FrameFactory.createFrame(
                    data,
                    file,
                    frameDataPosition,
                    this._header.majorVersion,
                    fullTagUnsync
                );
                frame = frameRead.frame;
                frameDataPosition = frameRead.offset;
            } catch (e) {
                if (!e.hasOwnProperty("isNotImplementedError") && !e.hasOwnProperty("isCorruptFileError")) {
                    throw e;
                } else {
                    continue;
                }
            }

            if (!frame) {
                break;
            }

            // Only add frames that contain data
            if (frame.size === 0) {
                continue;
            }

            this.addFrame(frame);

            // If the tag is version 4, no post-processing needed
            if (this._header.majorVersion === 4) {
                continue;
            }

            // Load up the first instance of each for post-processing
            if (!tdrc && ByteVector.equal(frame.frameId, FrameTypes.TDRC)) {
                tdrc = <TextInformationFrame> frame;
            } else if (!tyer && ByteVector.equal(frame.frameId, FrameTypes.TYER)) {
                tyer = <TextInformationFrame> frame;
            } else if (!tdat && ByteVector.equal(frame.frameId, FrameTypes.TDAT)) {
                tdat = <TextInformationFrame> frame;
            } else if (!time && ByteVector.equal(frame.frameId, FrameTypes.TIME)) {
                time = <TextInformationFrame> frame;
            }
        }

        // Try to fill out the data/time of the TDRC frame. Can't do that if no TDRC frame exists,
        // or if there is no TDAT frame, or if TDRC already has the date.
        if (!tdrc || !tdat || tdrc.toString().length !== 4) {
            return;
        }

        // Start with the year already in TDRC, then add the TDAT and TIME if available
        let tdrcText = tdrc.toString();

        // Add the data
        if (tdat) {
            const tdatText = tdat.toString();
            if (tdatText.length === 4) {
                tdrcText += `-${tdatText.substr(0, 2)}-${tdatText.substr(2, 2)}`;

                // Add the time
                if (time) {
                    const timeText = time.toString();

                    if (timeText.length === 4) {
                        tdrcText += `T${timeText.substr(0, 2)}:${timeText.substr(2, 2)}`;
                    }

                    this.removeFrames(FrameTypes.TDAT);
                }
            }

            tdrc.text = [tdrcText.toString()];
        }
    }

    protected read(file: File, position: number, style: ReadStyle): void {
        Guards.truthy(file, "file");
        Guards.uint(position, "position");

        file.mode = FileAccessMode.Read;

        if (position > file.length - Header.size) {
            throw new Error("Argument out of range: position must be less than the length of the file");
        }

        file.seek(position);

        this._header = new Header(file.readBlock(Header.size));

        // If the tag size is 0, then this is an invalid tag. Tags must contain at least one frame.
        if (this._header.tagSize === 0) {
            return;
        }

        position += Header.size;
        this.parse(undefined, file, position, style);
    }

    // #endregion
}
