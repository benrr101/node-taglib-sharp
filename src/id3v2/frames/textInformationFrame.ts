import Frame from "./frame";
import Id3v2Settings from "../id3v2Settings";
import {ByteVector, StringType} from "../../byteVector";
import {Id3v2FrameHeader} from "./frameHeader";
import {FrameIdentifier, FrameIdentifiers} from "../frameIdentifiers";
import {Guards} from "../../utils";
import {CorruptFileError} from "../../errors";

/**
 * This class provides support for ID3v2 text information frames (section 4.2) covering `T000` to
 * `TZZZ`, excluding `TXXX`.
 * Text information frames contain the most commonly used values in tagging, including the artist,
 * track name, and just about any value that can be expressed as text. The following table contains
 * types and descriptions as found in the ID3 2.4.0 native frames specification (Copyright Martin
 * Nilsson 2000).
 * * TIT1 - The "Content Group Description" frame is used if the sound belongs to a larger category
 *   of sounds/music. For example, classical music is often sorted in different musical sections
 *   (eg, "Piano Concerto", "Weather - Hurricane").
 * * TIT2 - The "Title/Song name/Content description" frame is the actual name of the piece (eg,
 *   "Adagio", "Hurricane Donna").
 * * TIT3 - The "Subtitle/Description refinement" frame is used for information directly related to
 *   the contents title (eg, "Op. 16" or "Performed Live at Wembley").
 * * TALB - The "Album/Movie/Show title" frame is intended for the title of the recording (or
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
 *   into several mediums, eg, a double CD. The value MAY be extended with a "/" character and a
 *   numeric string containing the total number of parts in the set (eg, "1/2").
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
 * * TMCL - The "musician credits list" frame is intended as a mapping betweenInclusive instruments
 *   and the musician who played it. Every odd field is an instrument and every even is an artist
 *   of a comma-delimited list of artists.
 * * TIPL - The "Involved people list" frame is very similar to the musician credits list, but maps
 *   betweenInclusive functions, like producer, and names.
 * * TENC - The "Encoded by" frame contains the name of the person or organization that encoded the
 *   audio file. This field may contain a copyright message, if the audio file is also copyrighted
 *   by the encoder.
 * * TBPM - The "BPM" frame contains the number of beats per minute in the main part of the audio.
 *   The BPM is an integer and represented as a numeric string.
 * * TLEN - The "Length" frame contains the length of the audio file in milliseconds, represented
 *   as a numeric string.
 * * TKEY - The "Initial key" frame contains the musical key in which the sound starts. It is
 *   represented as a string with a maximum length of 3 characters. The ground keys are represented
 *   with "A" - "G" and half keys are represented with "b" or "#". Minor is represented as "m", eg,
 *   "Dbm". Off-key is represented with an "o" only.
 * * TLAN - The "language" frame should contain the languages of the text or lyrics spoken or sung
 *   in the audio. The language is represented with three characters according to ISO-639-2. If
 *   more than one language is used in the text, the language codes should follow according to the
 *   amount of usage.
 * * TCON - The "Content type" frame, which in ID3v1 was stored as one byte numeric value only, is
 *   now a string. You may use one or several of the ID3v1 types as numeric strings, or, since the
 *   category list would be impossible to maintain with accurate and up-to-date categories, define
 *   your own.
 * * TFLT - The "File type" frame indicates which type of audio this tag defines. (see the
 *   specification for more details)
 * * TMED - The "Media type" frame describes from which media the sound originated. (see the
 *   specification for more details)
 * * TMOO - The "mood" frame is intended to reflect the mood of the audio with a few keywords (eg,
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
 *   media doesn't allow the desired length of the filename. The filename is case-sensitive and
 *   includes its extension.
 * * TDLY - The "Playlist delay" frame defines the numbers of milliseconds of silence that should
 *   be inserted before this audio. The value zero indicates that this is a part of a multi-file
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
 *   the computer on which an encoding program ran.
 * * TSOA - The "Album sort order" frame defines a string which should be used instead of the album
 *   name (TALB) for sorting purposes. For example, an album named "A Soundtrack" might be
 *   preferably sorted as "Soundtrack".
 * * TSOP - The "Performer sort order" frame defines a string which should be used instead of the
 *   performer (TPE2) for sorting purposes.
 * * TSOT - The "Title sort order" frame defines a string which should be used instead of the title
 *   (TIT2) for sorting purposes.
 */
export default class TextInformationFrame extends Frame {
    private static readonly SPLIT_FRAME_TYPES = [
        FrameIdentifiers.TCOM,
        FrameIdentifiers.TEXT,
        FrameIdentifiers.TMCL,
        FrameIdentifiers.TOLY,
        FrameIdentifiers.TOPE,
        FrameIdentifiers.TSOC,
        FrameIdentifiers.TSOP,
        FrameIdentifiers.TSO2,
        FrameIdentifiers.TPE1,
        FrameIdentifiers.TPE2,
        FrameIdentifiers.TPE3,
        FrameIdentifiers.TPE4
    ];

    // @TODO: no protected access to members
    /**
     * Text encoding to use to store the text contents of the current instance.
     * @protected
     */
    protected _encoding: StringType = Id3v2Settings.defaultEncoding;
    /**
     * Decoded text contained in the current instance.
     * @protected
     */
    protected _textFields: string[] = [];

    // #region Constructors

    protected constructor(header: Id3v2FrameHeader) {
        super(header);
    }

    /**
     * Constructs and initializes a new instance by parsing the fields from the field bytes.
     * @param header Header of the frame
     * @param fieldBytes Bytes that contain the fields of the frame
     * @param version ID3v2 version the frame was originally encoded with
     */
    public static fromFieldBytes(
        header: Id3v2FrameHeader,
        fieldBytes: ByteVector,
        version: number
    ): TextInformationFrame {
        Guards.truthy(header, "header");
        Guards.truthy(fieldBytes, "fieldBytes");
        Guards.byte(version, "version");

        if (fieldBytes.length < 1) {
            throw new CorruptFileError("Text identifier frame must contain at least 1 byte.");
        }

        // Text encoding                $xx
        // Information                  <text string(s) according to encoding>

        const frame = new TextInformationFrame(header);

        // Read the encoding of the text in the frame
        frame._encoding = fieldBytes.get(0);

        // Split the text if required
        const textBytes = fieldBytes.subarray(1);
        if (version >= 4) {
            // @TODO: Should we filter out empty? We currently do it when rendering...
            frame._textFields = textBytes.toStrings(frame._encoding)
                .filter(t => !!t);
        } else {
            // Truncate anything after a null byte
            const text = textBytes.toString(frame._encoding).split("\0")[0];

            if (text.length === 0) {
                // Empty array
                frame._textFields = [];
            } else {
                // Some frames are meant to be split by a /
                frame._textFields = TextInformationFrame.SPLIT_FRAME_TYPES.includes(frame.frameId)
                    ? text.split("/")
                    : [text];
            }
        }

        return frame;
    }

    /**
     * Constructs and initializes a new instance with a specified identifier
     * @param identifier Byte vector containing the identifier for the frame
     * @param encoding Optionally, the encoding to use for the new instance. If omitted, defaults
     *     to {@link Id3v2Settings.defaultEncoding}
     */
    public static fromIdentifier(
        identifier: FrameIdentifier,
        encoding: StringType = Id3v2Settings.defaultEncoding
    ): TextInformationFrame {
        const frame = new TextInformationFrame(new Id3v2FrameHeader(identifier));
        frame._encoding = encoding;
        return frame;
    }

    // #endregion

    // #region Properties

    /**
     * Gets the text contained in the current instance.
     * Note: Modifying the contents of the returned value will not modify the contents of the
     * current instance. The value must be reassigned for the value to change.
     */
    public get text(): string[] {
        return this._textFields.slice();
    }
    /**
     * Sets the text contained in the current instance.
     */
    public set text(value: string[]) {
        this._textFields = value ? value.slice() : [];
    }

    /**
     * Gets the text encoding to use when rendering the current instance.
     */
    public get textEncoding(): StringType {
        return this._encoding;
    }
    /**
     * Sets the text encoding to use when rendering the current instance.
     * This value will be overridden if {@link Id3v2Settings.forceDefaultEncoding} is `true`.
     */
    public set textEncoding(value: StringType) {
        this._encoding = value;
    }

    // #endregion

    // #region Public Methods

    /**
     * Gets a {@link TextInformationFrame} object of a specified type from a specified type from a
     * list of text information frames.
     * @param frames List of frames to search
     * @param ident Frame identifier to search for
     * @returns Matching frame if it exists in `tag`, `undefined` if a matching frame was not found
     */
    public static findTextInformationFrame(
        frames: TextInformationFrame[],
        ident: FrameIdentifier
    ): TextInformationFrame {
        Guards.truthy(frames, "frames");
        Guards.truthy(ident, "ident");

        return frames.find((f) => f.frameId === ident);
    }

    /** @inheritDoc */
    public clone(): Frame {
        const frame = TextInformationFrame.fromIdentifier(this.frameId, this._encoding);
        frame._textFields = this._textFields.slice();
        return frame;
    }

    /**
     * Renders the current instance, encoded in a specified ID3v2 version.
     * @param version ID3v2 version to use when encoding the current instance. Must be a positive
     *     8-bit integer.
     * @returns Rendered version of the current instance.
     */
    public render(version: number): ByteVector {
        Guards.byte(version, "version");

        if (version !== 3 || this.frameId !== FrameIdentifiers.TDRC) {
            return super.render(version);
        }

        // @TODO: This code should be taken out when we migrate to immutable tag versions.
        const text = this.toString();
        if (text.length < 10 || text[4] !== "-" || text[7] !== "-") {
            return super.render(version);
        }

        const output = ByteVector.empty();
        let frame = new TextInformationFrame(new Id3v2FrameHeader(FrameIdentifiers.TYER));
        frame.text = [text.substring(0, 4)];
        output.addByteVector(frame.render(version));

        frame = new TextInformationFrame(new Id3v2FrameHeader(FrameIdentifiers.TDAT));
        frame.text = [text.substring(5, 7) + text.substring(8, 10)];
        output.addByteVector(frame.render(version));

        if (text.length < 16 || text[10] !== "T" || text[13] !== ":") {
            return output;
        }

        frame = new TextInformationFrame(new Id3v2FrameHeader(FrameIdentifiers.TIME));
        frame.text = [text.substring(11, 13) + text.substring(14, 16)];
        output.addByteVector(frame.render(version));

        return output;
    }

    /**
     * Returns a text representation of the current instance by combining the text with semicolons.
     */
    public toString(): string {
        return this.text.join("; ");
    }

    // #endregion

    // #region Protected Methods

    /** @inheritDoc */
    protected renderFields(version: number): ByteVector {
        const truthyFields = this._textFields.filter(tf => !!tf);
        if (truthyFields.length === 0) {
            return ByteVector.empty();
        }

        const encoding = TextInformationFrame.correctEncoding(this._encoding, version);

        let fieldBytes;
        if (version > 3) {
            // v4 frames have each field separated by a delimiter
            const truthyVectors = truthyFields.map(tf => ByteVector.fromString(tf, encoding));
            fieldBytes = ByteVector.join(ByteVector.getTextDelimiter(encoding), truthyVectors);
        } else {
            // v3, v2 frames have multiple fields separated by a /
            const joinedFields = this._textFields.join("/");
            fieldBytes = ByteVector.fromString(joinedFields, encoding);
        }

        return ByteVector.concatenate(encoding, fieldBytes);
    }

    // #endregion
}
