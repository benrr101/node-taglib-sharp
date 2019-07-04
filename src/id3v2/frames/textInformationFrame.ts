import FrameTypes from "../frameTypes";
import Genres from "../../genres";
import Id3v2Tag from "../id3v2Tag";
import {ByteVector, StringType} from "../../byteVector";
import {Frame, FrameClassType} from "./frame";
import {Id3v2FrameHeader} from "./frameHeader";
import {Guards, StringComparison} from "../../utils";

/**
 * This class provides support for ID3v2 text information frames (section 4.2) covering `T000` to
 * `TZZZ`, excluding `TXXX`.
 * Text information frames contain the most commonly used values in tagging, including the artist,
 * track name, and just about any value that can be expressed as text. The following table contains
 * types and descriptions as found in the ID3 2.4.0 native frames specification (Copyright Martin
 * Nilsson 2000).
 * * TIT1 - The "Content Group Description" frame is used if the sound belongs to a larger cagegory
 *   of sounds/music. For example, classical music is often sorted in different musical sections
 *   (eg. "Piano Concerto", "Weather - Hurricane").
 * * TIT2 - The "Title/Songname/Content description" frame is the actual name of the piece (eg.
 *   "Adagio", "Hurricane Donna").
 * * TIT3 - The "Subtitle/Description refinement" frame is used for information directly related to
 *   the contents title (eg. "Op. 16" or "Performed Live at Wembley").
 * * TALB - The "Album/Movie/Show title" frame is intented for the title of the recording (or
 *   source of sound) from which the audio in the file is taken.
 * * TOAL - The "Original album/movie/show title" frame is intended for the title of the original
 *   recording (or source of sound), if for example the music in the file should be a cover of a
 *   previously released song.
 * * TRCK - The "Track number/Position in set" frame is a numeric string containing the order
 *   number of the audio-file on its original recording. This MAY be extended with a "/" character
 *   and a numeric string containing the total number of tracks/elements on the original recording
 *   (eg "4/9").
 * * TPOS - The "Part of a set" frame is a numeric string that describes which part of a set the
 *   audio came from. This frame is used if the source described in the "TLAB" frame is divided
 *   into several mediums, eg. a double CD. The value MAY be extended with a "/" character and a
 *   numeric string containing the total number of parts in the set (eg. "1/2").
 * * TSST - The "Set Subtitle" frame is intended for the subtitle of the part of a set this track
 *   belongs to.
 * * TSRC - The "ISRC" frame should contain the International Standard Recording Code (12 chars).
 * * TPE1 - The "Lead artist/Lead performer/Soloist/Performing Group" frame is used for the main
 *   artist.
 * * TPE2 - The "Band/Orchestra/Accompaniment" frame is used for additional information about the
 *   performers in the recording.
 * * TPE3 - The "Conductor" frame is used for the name of the conductor.
 * * TPE4 - The "Interpreted, remixed, or otherwise modified by" frame contains more information
 *   about the people behind a remix and similar interpretations of another existing piece.
 * * TOPE - The "Original artist/Performer" frame is intended for the performer of the original
 *   recording, if for example the music in the file should be a cover of a previously released
 *   song.
 * * TEXT - The "Lyricist/Text writer" frame is intended for the writer of the text or lyrics in
 *   the recording.
 * * TOLY - The "Original lyricist/Text writer" frame is intended for the text writer of the
 *   original recording, if for example the music in the file should be a cover of a previously
 *   released song.
 * * TCOM - The "composer" frame is intended for the name of the composer.
 * * TMCL - The "musician credits list" frame is intended as a mapping between instruments and the
 *   musician who played it. Every odd field is an instrument and every even is an artst of a comma
 *   delimited list of artists.
 * * TIPL - The "Involved people list" frame is very similar to the musician credits list, but maps
 *   between functions, like producer, and names.
 * * TENC - The "Encoded by" frame contains the name of the person or organization that encoded the
 *   audio file. This field may contain a copyright message, if the audio file is also copyrighted
 *   by the encoder.
 * * TBPM - The "BPM" frame contains the number of beats per minute in the main part of the audio.
 *   The BPM is an integer and represented as a numeric string.
 * * TLEN - The "Length" frame contains the length of the audio file in milliseconds, represented
 *   as a numeric string.
 * * TKEY - The "Initial key" frame contains the musical key in which the sound starts. It is
 *   represented as a string with a maximum length of 3 characters. The ground keys are represented
 *   with "A" - "G" and half keys are represented with "b" or "#". Minor is represented as "m", eg.
 *   "Dbm". Off key is represented with an "o" only.
 * * TLAN - The "language" frame should contain the languages of the text or lyrics spoken or sung
 *   in the audio. The language is represented with three characters according to ISO-639-2. If
 *   more than one language is used in the text, the language codes should follow according to the
 *   amount of usage.
 * * TCON - The "Content type" frame, which in ID3v1 was stored as one byte numeric value only, is
 *   now a string. You may use one or several of the ID3v1 types as numeric strings, or, since the
 *   category list would be impossible to maintain with accurate and up to date categories, define
 *   your own.
 * * TFLT - The "File type" frame indicates which type of audio this tag defines. (see the
 *   specification for more details)
 * * TMED - The "Media type" frame descrives from which media the sound originated. (see the
 *   specification for more details)
 * * TMOO - The "mood" frame is intended to reflect the mood of the audio with a few keywords (eg.
 *   "Romantic" or "Sad").
 * * TCOP - The "Copyright message" frame, in which the string must begin with a year and a space
 *   character (making 5 characters), is intended for the copyright holder of the original sound,
 *   not the audio file itself. The absence of this frame means only that the copyright information
 *   is unavailable or has been removed, and must not be interpreted to mean that the audio is
 *   public domain. Every time this field is displayed, the field must be preceded with
 *   "Copyright " (C) " ", where (C) is one character showing the copyright mark.
 * * TPRO - The "Produced notice" frame, in which the string must begin with a year and a space
 *   character (making 5 characters), is intended for the production copyright holder of the
 *   production copyright holder of the original sound, not the audio file itself. Every time this
 *   field is displayed, the field must be preceded with "Produced " (P) " ", where (P) is one
 *   character showing the sound recording copyright symbol.
 * * TPUB - The "Publisher" frame contains the name of the label or publisher.
 * * TOWN - The "file owner/licensee" frame containing the name of the owner or licensee of the
 *   file and its contents.
 * * TRSN - The "Internet radio station name" frame contains the name of the internet radio
 *   station from which the audio is streamed.
 * * TRSO - The "Internet radio station owner" frame contains the name of the owner of the internet
 *   radio station from which the audio is streamed.
 * * TOFN - The "Original filename" frame contains the preferred filename for the file, since some
 *   media doesn't allow the desired length of the filename. The filename is case sensitive and
 *   includes its extension.
 * * TDLY - The "Playlist delay" frame defines the numbers of milliseconds of silence that should
 *   be inserted before this audio. The value zero indicates that this is a part of a multifile
 *   audio track that should be played continuously.
 * * TDEN - The "Encoding time" frame contains a timestamp describing when the audio was encoded.
 *   Timestamp format is described in the ID3v2 structure document.
 * * TDOR - The "Original release time" frame contains a timestamp describing when the original
 *   recording was released. Timestamp format is described in the ID3v2 structure document.
 * * TDRC - The "Recording time" frame contains a timestamp describing when the audio was recorded.
 *   Timestamp format is described in the ID3v2 structure document.
 * * TDRL - The "Release time" frame contains a timestamp describing when the audio was first
 *   released. Timestamp format is described in the ID3v2 structure document.
 * * TDTG - The "Tagging time" frame contains a timestamp describing when the audio was tagged.
 *   Timestamp format is described in the ID3v2 structure document.
 * * TSSE - The "Software/Hardware and settings used for encoding" frame includes the used audio
 *   encoder and its settings when the file was encoded. Hardware refers to hardware encoders, not
 *   the computer on which a program was ran.
 * * TSOA - The "Album sort order" frame defines a string which should be used instead of the album
 *   name (TALB) for sorting purposes. For example, an album named "A Soundtrack" might be
 *   preferably sorted as "Soundtrack".
 * * TSOP - The "Performer sort order" frame defines a string which should be used instead of the
 *   performer (TPE2) for sorting purposes.
 * * TSOT - The "Title sort order" frame defines a string which should be used instead of the title
 *   (TIT2) for sorting purposes.
 */
export class TextInformationFrame extends Frame {
    protected _encoding: StringType = Id3v2Tag.defaultEncoding;
    private _rawData: ByteVector;
    private _rawEncoding: StringType = StringType.Latin1;
    private _rawVersion: number;
    private _textFields: string[] = [];

    // #region Constructors

    protected constructor(header: Id3v2FrameHeader) {
        super(header);
    }

    /**
     * Constructs and initializes a new instance with a specified identifier
     * @param ident Byte vector containing the identifier for the frame
     * @param encoding Optionally, the encoding to use for the new instance. If omitted, defaults
     *     to {@see Id3v2Tag.defaultEncoding}
     */
    public static fromIdentifier(
        ident: ByteVector,
        encoding: StringType = Id3v2Tag.defaultEncoding
    ): TextInformationFrame {
        const frame = new TextInformationFrame(new Id3v2FrameHeader(ident, 4));
        frame._encoding = encoding;
        return frame;
    }

    /**
     * Constructs and initializes a new instance by reading its raw data in a specified ID3v2
     * version. This method allows for offset reading from the data bytevector.
     * @param data Raw representation of the new frame
     * @param offset What offset in {@paramref data} the frame actually begins. Must be positive,
     *     safe integer
     * @param header Header of the frame found at {@paramref data} in the data
     * @param version ID3v2 version the raw frame is encoded with. Must be positive 8-bit integer.
     */
    public static fromOffsetRawData(
        data: ByteVector,
        offset: number,
        header: Id3v2FrameHeader,
        version: number
    ): TextInformationFrame {
        Guards.truthy(data, "data");
        Guards.uint(offset, "offset");
        Guards.truthy(header, "header");
        Guards.byte(version, "version");

        const frame = new TextInformationFrame(header);
        frame.setData(data, offset, version, false);
        return frame;
    }

    /**
     * Constructs and initializes a new instance by reading its raw data in a specified
     * ID3v2 version.
     * @param data Raw representation of the new frame
     * @param version ID3v2 version the raw frame is encoded with, must be a positive 8-bit integer
     */
    public static fromRawData(data: ByteVector, version: number): TextInformationFrame {
        const frame = new TextInformationFrame(new Id3v2FrameHeader(data, version));
        frame.setData(data, 0, version, true);
        return frame;
    }

    // #endregion

    // #region Properties

    /** @inheritDoc */
    public get frameClassType(): FrameClassType { return FrameClassType.TextInformationFrame; }

    /**
     * Gets the text contained in the current instance.
     * Note: Modifying the contents of the returned value will not modify the contents of the
     * current instance. The value must be reassigned for the value to change.
     */
    public get text(): string[] {
        this.parseRawData();
        return this._textFields.slice();
    }
    /**
     * Sets the text contained in the current instance.
     */
    public set text(value: string[]) {
        this._rawData = undefined;
        this._textFields = value ? value.slice() : [];
    }

    /**
     * Gets the text encoding to use when rendering the current instance.
     */
    public get textEncoding(): StringType {
        this.parseRawData();
        return this._encoding;
    }
    /**
     * Sets the text encoding to use when rendering the current instance.
     * This value will be overridden if {@see Id3v2Tag.forceDefaultEncoding} is `true`.
     */
    public set textEncoding(value: StringType) { this._encoding = value; }

    // #endregion

    // #region Public Methods

    /**
     * Gets a {@see TextInformationFrame} object of a specified type from a specified type from a
     * specified tag, optionally creating and adding one with a specified encoding if none is
     * found.
     * @param tag Object to search in
     * @param ident Frame identifier to search for
     * @param encoding Encoding to use if a new frame is created. Defaults to
     *     {@see Id3v2Tag.defaultEncoding} if not provided
     * @param create Whether or not to create a new frame if an existing frame was not found
     * @returns TextInformationFrame Matching frame if it exists in {@paramref tag}, `undefined` if
     *     a matching frame was not found and {@paramref create} is `false`, or a new frame if a
     *     matching frame was not found and {@paramref create} is `true`.
     */
    public static getTextInformationFrame(
        tag: Id3v2Tag,
        ident: ByteVector,
        create: boolean,
        encoding: StringType = Id3v2Tag.defaultEncoding
    ): TextInformationFrame {
        Guards.truthy(tag, "tag");
        Guards.truthy(ident, "ident");
        if (ident.length !== 4) {
            throw new Error("Argument out of range: Identifier must be four bytes long");
        }

        let frame = tag.getFramesByIdentifier<TextInformationFrame>(FrameClassType.TextInformationFrame, ident)
            .find((f) => true);

        if (frame || !create) {
            return frame;
        }

        // Create new frame
        frame = TextInformationFrame.fromIdentifier(ident, encoding);
        tag.addFrame(frame);
        return frame;
    }

    /**
     * Renders the current instance, encoded in a specified ID3v2 version.
     * @param version ID3v2 version to use when encoding the current instance. Must be a positive
     *     8-bit integer.
     * @returns ByteVector Rendered version of the current instance.
     */
    public render(version: number): ByteVector {
        Guards.byte(version, "version");

        if (version !== 3 || this.frameId !== FrameTypes.TDRC) {
            return super.render(version);
        }

        const text = this.toString();
        if (text.length < 10 || text[4] !== "-" || text[7] !== "-") {
            return super.render(version);
        }

        const output = ByteVector.empty();
        let frame = new TextInformationFrame(new Id3v2FrameHeader(FrameTypes.TYER, this._encoding));
        frame.text = [text.substring(0, 4)];
        output.addByteVector(frame.render(version));

        frame = new TextInformationFrame(new Id3v2FrameHeader(FrameTypes.TDAT, this._encoding));
        frame.text = [text.substring(5, 7) + text.substring(8, 10)];
        output.addByteVector(frame.render(version));

        if (text.length < 16 || text[10] !== "T" || text[13] !== ":") {
            return output;
        }

        frame = new TextInformationFrame(new Id3v2FrameHeader(FrameTypes.TIME, this._encoding));
        frame.text = [text.substring(11, 13) + text.substring(14, 16)];
        output.addByteVector(frame.render(version));

        return output;
    }

    /**
     * Returns a text representation of the current instance by combining the text with semicolons.
     */
    public toString(): string {
        this.parseRawData();
        return this.text.join("; ");
    }

    // #endregion

    // #region Protected Methods

    /** @inheritDoc */
    protected parseFields(data: ByteVector, version: number): void {
        this._rawData = data;
        this._rawVersion = version;

        // Read the string data type (first byte of the field data)
        this._rawEncoding = data.get(0);
    }

    /**
     * Performs the actual parsing of the raw data.
     * Because of the high parsing cost and relatively low usage of the class {@see parseFields}
     * only stores the field data so it can be parsed on demand. Whenver a property or method is
     * called which requires the data, this method is called, and only on the first call does it
     * actually parse the data.
     */
    protected parseRawData(): void {
        if (!this._rawData) {
            return;
        }

        const data = this._rawData;
        this._rawData = undefined;

        // Read the string data type (first byte of the field data)
        this._encoding = data.get(0);

        const fieldList = [];
        const delim = ByteVector.getTextDelimiter(this._encoding);

        if (this._rawVersion > 3 || ByteVector.equal(this.frameId, FrameTypes.TXXX)) {
            fieldList.push(... data.toStrings(this._encoding, 1));
        } else if (data.length > 1 && !ByteVector.equal(data.mid(1, delim.length), delim)) {
            let value = data.toString(this._encoding, 1, data.length - 1);

            // Truncate values containing NULL bytes
            const nullIndex = value.indexOf("\x00");
            if (nullIndex >= 0) {
                value = value.substring(0, nullIndex);
            }

            const stdFrameTypes = [
                FrameTypes.TCOM,
                FrameTypes.TEXT,
                FrameTypes.TMCL,
                FrameTypes.TOLY,
                FrameTypes.TOPE,
                FrameTypes.TSOC,
                FrameTypes.TSOP,
                FrameTypes.TSO2,
                FrameTypes.TPE1,
                FrameTypes.TPE2,
                FrameTypes.TPE3,
                FrameTypes.TPE4
            ];
            if (stdFrameTypes.some((ft) => ByteVector.equal(ft, this.frameId))) {
                fieldList.push(... value.split("/"));
            } else if (ByteVector.equal(this.frameId, FrameTypes.TCON)) {
                while (value.length > 1 && value[0] === "(") {
                    const closing = value.indexOf(")");
                    if (closing < 0) {
                        break;
                    }

                    const number = value.substring(1, closing);
                    fieldList.push(number);

                    value = value.substring(closing + 1).replace(/^[/ ]*/, "");

                    const text = Genres.indexToAudio(number);
                    if (text && value.startsWith(text)) {
                        value = value.substring(text.length).replace(/^[/ ]*/, "");
                    }
                }

                if (value.length > 0) {
                    fieldList.push(... value.split(/[/;]/));
                }
            } else {
                fieldList.push(... value);
            }
        }

        // Bad tags may have one or more null characters at the end of a string, resulting in
        // empty strings at the end of the FieldList. Strip them off.
        while (fieldList.length !== 0
            && (!fieldList[fieldList.length - 1] || fieldList[fieldList.length - 1].length === 0)) {
            fieldList.splice(fieldList.length - 1, 1);
        }

        this._textFields = fieldList;
    }

    /** @inheritDoc */
    protected renderFields(version: number): ByteVector {
        if (!this._rawData && this._rawVersion === version && this._rawEncoding === Id3v2Tag.defaultEncoding) {
            return this._rawData;
        }

        const encoding = TextInformationFrame.correctEncoding(this.textEncoding, version);
        const v = ByteVector.empty();
        let text = this._textFields;

        v.addByte(encoding);

        const isTxxx = ByteVector.equal(this.frameId, FrameTypes.TXXX);
        if (version > 3 || isTxxx) {
            if (isTxxx) {
                if (text.length === 0) {
                    text = [null, null];
                } else if (text.length === 1) {
                    text = [text[0], null];
                }
            }

            for (let i = 0; i < text.length; i++) {
                // Since the field list is null delimited, if this is not the first element in the
                // list, append the appropriate delimiter for this encoding.
                if (i !== 0) {
                    v.addByteVector(ByteVector.getTextDelimiter(encoding));
                }

                if (text[i]) {
                    v.addByteVector(ByteVector.fromString(text[i], encoding));
                }
            }
        } else if (ByteVector.equal(this.frameId, FrameTypes.TCON)) {
            let prevValueIndexed = true;
            let data = "";
            for (const s of text) {
                if (!prevValueIndexed) {
                    data += `;${s}`;
                    continue;
                }

                const id = parseInt(s, 10);
                prevValueIndexed = Number.isNaN(id);
                if (prevValueIndexed) {
                    data += `(${id})`;
                } else {
                    data += s;
                }
            }

            v.addByteVector(ByteVector.fromString(data, encoding));
        } else {
            v.addByteVector(ByteVector.fromString(text.join("/"), encoding));
        }
    }

    // #endregion
}

export class UserTextInformationFrame extends TextInformationFrame {
    // #region Contructors

    private constructor(header: Id3v2FrameHeader) {
        super(header);
    }

    /**
     * Constructs and initializes a new instance with a specified description and text encoding.
     * @param description Description of the new frame
     * @param encoding Text encoding to use when rendering the new frame
     */
    public static fromDescription(
        description: string,
        encoding: StringType = Id3v2Tag.defaultEncoding
    ): UserTextInformationFrame {
        const frame = new UserTextInformationFrame(new Id3v2FrameHeader(FrameTypes.TXXX, 4));
        frame._encoding = encoding;
        frame.description = description;
        return frame;
    }

    /**
     * Constructs and initializes a new instance by reading its raw data in a specified ID3v2
     * version. This method allows for offset reading from the data bytevector.
     * @param data Raw representation of the new frame
     * @param offset What offset in {@paramref data} the frame actually begins. Must be positive,
     *     safe integer
     * @param header Header of the frame found at {@paramref data} in the data
     * @param version ID3v2 version the raw frame is encoded with. Must be positive 8-bit integer.
     */
    public static fromOffsetRawData(
        data: ByteVector,
        offset: number,
        header: Id3v2FrameHeader,
        version: number
    ): UserTextInformationFrame {
        Guards.truthy(data, "data");
        Guards.uint(offset, "offset");
        Guards.truthy(header, "header");
        Guards.byte(version, "version");

        const frame = new UserTextInformationFrame(header);
        frame.setData(data, offset, version, false);
        return frame;
    }

    /**
     * Constructs and initializes a new instance by reading its raw data in a specified
     * ID3v2 version.
     * @param data Raw representation of the new frame
     * @param version ID3v2 version the raw frame is encoded with, must be a positive 8-bit integer
     */
    public static fromRawData(data: ByteVector, version: number): UserTextInformationFrame {
        const frame = new UserTextInformationFrame(new Id3v2FrameHeader(data, version));
        frame.setData(data, 0, version, true);
        return frame;
    }

    // #endregion

    // #region Properties

    public get frameClassType(): FrameClassType { return FrameClassType.UserTextInformationFrame; }

    /**
     * Gets the description stored in the current instance.
     */
    public get description(): string {
        const text = super.text;
        return text.length > 0 ? text[0] : undefined;
    }
    /**
     * Sets the description stored in the current instance.
     * There should only be one frame with the specified description per tag.
     * @param value Description to store in the current instance.
     */
    public set description(value: string) {
        let text = super.text;
        if (text.length > 0) {
            text[0] = value;
        } else {
            text = [ value ];
        }
        super.text = text;
    }

    /**
     * Gets the text contained in the current instance.
     * NOTE: Modifying the contents of the returned value will not modify the contents of the
     * current instance. The value must be reassigned for the value to change.
     */
    public get text(): string[] {
        const text = super.text;
        if (text.length < 2) {
            return [];
        }

        return text.slice(1);
    }
    /**
     * Sets the text contained in the current instance.
     * @param value Array of text values to store in the current instance
     */
    public set text(value: string[]) {
        const newValue = [this.description];
        newValue.push(... value);
        super.text = newValue;
    }

    // #endregion

    // #region Public Methods

    /**
     * Gets a user text information frame frrom a specified tag, optionally creating it if it does
     * not exist.
     * @param tag Object to search in
     * @param description Description to use to match the frame in the {@paramref tag}
     * @param create Whether or not to create an add a new frame to the tag if a match is not found
     * @param type Encoding to use to encode the value of this frame.
     * @param caseSensitive Whether or not to search for the frame case-sensitively.
     * @returns UserTextInformationFrame Frame containing the matching user, `undefined` if a match
     *     was not found and {@paramref create} is `false`. A new frame is returned if
     *     {@paramref create} is `true`.
     */
    public static getUserTextInformationFrame(
        tag: Id3v2Tag,
        description: string,
        create: boolean = false,
        type: StringType = Id3v2Tag.defaultEncoding,
        caseSensitive: boolean = true
    ): UserTextInformationFrame {
        Guards.truthy(tag, "tag");

        const comparison = caseSensitive ? StringComparison.CaseSensitive : StringComparison.CaseInsensitive;
        const frames = tag.getFramesByIdentifier<UserTextInformationFrame>(
            FrameClassType.UserTextInformationFrame,
            FrameTypes.TXXX
        );
        let frame = frames.find((f) => comparison(f.description, description));

        if (frame || !create) {
            return frame;
        }

        // Create a new frame
        frame = UserTextInformationFrame.fromDescription(description, type);
        tag.addFrame(frame);
        return frame;
    }

    /** @inheritDoc */
    public toString(): string {
        return `[${this.description}] ${super.toString()}`;
    }

    // #endregion
}
