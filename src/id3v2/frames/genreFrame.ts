import Genres from "../../genres";
import Id3v2Settings from "../id3v2Settings";
import {ByteVector, StringType} from "../../byteVector";
import {Frame, FrameClassType} from "./frame";
import {Id3v2FrameHeader} from "./frameHeader";
import {FrameIdentifiers} from "../frameIdentifiers";
import {Guards, StringUtils} from "../../utils";
import {CorruptFileError} from "../../errors";

/**
 * This class provides support for ID3v2 TCON content type frames.
 */
export default class GenreFrame extends Frame {
    private static readonly COVER_ABBREV = "CR";
    private static readonly COVER_STRING = "Cover";
    private static readonly REMIX_ABBREV = "RX";
    private static readonly REMIX_STRING = "Remix";

    private _encoding: StringType = Id3v2Settings.defaultEncoding;
    private _textFields: string[] = [];

    // #region Constructors

    private constructor(header: Id3v2FrameHeader) {
        super(header);
    }

    /**
     * Constructs and initializes a new instance.
     * @param encoding Optionally, the encoding to use for the new instance. If omitted, defaults
     *     to {@link Id3v2Settings.defaultEncoding}
     */
    public static fromEncoding(
        encoding: StringType = Id3v2Settings.defaultEncoding
    ): GenreFrame {
        const frame = new GenreFrame(new Id3v2FrameHeader(FrameIdentifiers.TCON));
        frame._encoding = encoding;
        return frame;
    }

    /**
     * Constructs and initializes a new instance by parsing the fields from the field bytes.
     * @param header Header of the frame
     * @param fieldBytes Bytes that contain the fields of the frame
     * @param version ID3v2 version the frame was originally encoded with
     */
    public static fromFieldBytes(header: Id3v2FrameHeader, fieldBytes: ByteVector, version: number): GenreFrame {
        Guards.truthy(header, "header");
        Guards.truthy(fieldBytes, "fieldBytes");
        Guards.byte(version, "version");

        if (fieldBytes.length < 1) {
            throw new CorruptFileError("Genre frame must contain at least 1 byte.");
        }

        // Text encoding          $xx
        // Text                   <full text string according to encoding>

        const frame = new GenreFrame(header);

        frame._encoding = fieldBytes.get(0);

        const fieldList = [];
        if (version > 3) {
            // TCON on ID3v2.4 is encoded as a separate field for each genre. Fields can either be
            // the old numeric ID3v1 genres (no parenthesis) or free text. RX/CR can also be used.
            const genres = fieldBytes.subarray(1).toStrings(frame._encoding);
            const textGenres = genres
                .map(g => {
                    // Trim trailing whitespace and null bytes
                    g = StringUtils.trimEnd(g, " \t\r\n\0");

                    // Parse special cases or fallback to just returning the value
                    switch (g) {
                        case GenreFrame.COVER_ABBREV:
                            return GenreFrame.COVER_STRING;
                        case GenreFrame.REMIX_ABBREV:
                            return GenreFrame.REMIX_STRING;
                        default:
                            const textGenre = Genres.indexToAudio(g, false);
                            return textGenre || g;
                    }
                })
                .filter(g => !!g);
            fieldList.push(...textGenres);
        } else {
            let value = fieldBytes.subarray(1).toString(frame._encoding);

            // Truncate values containing NULL bytes (ie, ignore everything after a null byte)
            const nullIndex = value.indexOf("\x00");
            if (nullIndex >= 0) {
                value = value.substring(0, nullIndex);
            }

            // TCON in ID3v2.2 and ID3v2.3 is specified as
            // * (xx) - where xx is a number from the ID3v1 genre list
            // * (xx)yy - where xx is a number from the ID3v1 genre list and yyy is a
            //   "refinement" of the genre
            // * (RX) - "Remix"
            // * (CR) - "Cover"
            // * (( - used to escape a "(" in a refinement/genre name

            // Treat each term separately
            const terms = Id3v2Settings.useNonStandardV2V3GenreSeparators
                ? value.split(/[;\/]/).filter(t => !!t)
                : [value];
            for (const term of terms) {
                // Attempt to process it according to our best understanding of the spec
                const numericGenres = GenreFrame.parseTconAsStandardNumeric(term);
                if (numericGenres !== undefined) {
                    fieldList.push(... numericGenres);
                    continue;
                }

                if (Id3v2Settings.useNonStandardV2V3NumericGenres) {
                    // Attempt to process it as a non-standard numeric genre
                    const numericGenre = Genres.indexToAudioDirect(term);
                    if (numericGenre !== undefined) {
                        fieldList.push(numericGenre);
                        continue;
                    }
                }

                // Yeah, we can't do anything smart, just treat it as a string
                fieldList.push(term);
            }
        }

        frame._textFields = fieldList;

        return frame;
    }

    // #endregion

    // #region Properties

    /** @inheritDoc */
    public get frameClassType(): FrameClassType { return FrameClassType.GenreFrame; }

    /**
     * Gets the genres contained in the current instance.
     * Note: Modifying the contents of the returned value will not modify the contents of the
     * current instance. The value must be reassigned for the value to change.
     */
    public get text(): string[] { return this._textFields.slice(); }
    /**
     * Sets the genres contained in the current instance.
     */
    public set text(value: string[]) { this._textFields = value ? value.slice() : []; }

    /**
     * Gets the text encoding to use when rendering the current instance.
     */
    public get textEncoding(): StringType { return this._encoding; }
    /**
     * Sets the text encoding to use when rendering the current instance.
     * This value will be overridden if {@link Id3v2Settings.forceDefaultEncoding} is `true`.
     */
    public set textEncoding(value: StringType) { this._encoding = value; }

    // #endregion

    // #region Public Methods

    /**
     * Gets a {@link GenreFrame} object from a specified list of genre frames.
     * @param frames List of frames to search
     * @returns Matching frame if it exists in `tag`, `undefined` if a matching frame was not found
     */
    public static findGenreFrame(frames: GenreFrame[]): GenreFrame {
        Guards.truthy(frames, "frames");

        return frames.find((f) => f.frameId === FrameIdentifiers.TCON);
    }

    /** @inheritDoc */
    public clone(): Frame {
        const frame = GenreFrame.fromEncoding(this._encoding);
        frame._textFields = this._textFields.slice();
        return frame;
    }

    /**
     * Returns a text representation of the current instance by combining the genres with semicolons.
     */
    public toString(): string {
        return this.text.join("; ");
    }

    // #endregion

    // #region Protected Methods

    /** @inheritDoc */
    protected renderFields(version: number): ByteVector {
        const encoding = GenreFrame.correctEncoding(this.textEncoding, version);
        const v = ByteVector.empty();
        let text = this._textFields;

        v.addByte(encoding);

        if (version > 3) {
            // For ID3v2.4, we should encode any genres that can be numeric as numeric by
            // themselves. This then gets encoded the same as any other ID3v2.4 text frame (ie,
            // with delimiters in between values)
            text = text.map((g) => {
                switch (g) {
                    case GenreFrame.COVER_STRING:
                        return GenreFrame.COVER_ABBREV;
                    case GenreFrame.REMIX_STRING:
                        return GenreFrame.REMIX_ABBREV;
                    default:
                        if (Id3v2Settings.useNumericGenres) {
                            const numericGenre = Genres.audioToIndex(g);
                            return numericGenre === 255 ? g : numericGenre.toString();
                        }
                        return g;
                }
            });

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
        } else {
            // ID3v2.2 and ID3v2.3 TCON frames are going to be written with numeric genres first
            // (if enabled) and multiple text-based genres separated by ;.
            // NOTE: This doesn't follow the actual conventions for ID3v2.2/3 but nobody does this
            //    correctly. This implementation will at least work with MinimServer
            //    https://forum.minimserver.com/showthread.php?tid=2575
            const numericGenres = [];
            const textGenres = [];
            for (const s of text) {
                if (Id3v2Settings.useNumericGenres) {
                    // Try to process it as a numeric genre
                    switch (s) {
                        case GenreFrame.COVER_STRING:
                            numericGenres.push(`(${GenreFrame.COVER_ABBREV})`);
                            continue;
                        case GenreFrame.REMIX_STRING:
                            numericGenres.push(`(${GenreFrame.REMIX_ABBREV})`);
                            continue;
                        default:
                            const numericGenre = Genres.audioToIndex(s);
                            if (numericGenre !== 255) {
                                numericGenres.push(`(${numericGenre})`);
                                continue;
                            }
                            break;
                    }
                }

                // Process it as a text genre
                const escapedGenre = s.replace(/\(/g, "((");
                textGenres.push(escapedGenre);
            }

            // Put the entire string together
            const genreString = `${numericGenres.join("")}${textGenres.join(";")}`;
            v.addByteVector(ByteVector.fromString(genreString, encoding));
        }

        return v;
    }

    // #endregion

    private static parseTconAsStandardNumeric(field: string): string[]|undefined {
        // Don't even bother setting up the state machine if we aren't starting with an opening
        // parenthesis.
        if (field[0] !== "(") {
            return undefined;
        }

        const results: string[] = [];
        let inParentheses = true;
        let refinementAdded = false;
        let open = 0;
        let close = 0;

        const appendToLastResult = (chunk: string): void => {
            if (!chunk) {
                return;
            }

            const lastResult = results[results.length - 1];
            results[results.length - 1] = refinementAdded
                ? `${lastResult}${chunk}`
                : `${lastResult} ${chunk}`;
        };

        for (let i = 1; i < field.length; i++) {
            if (inParentheses) {
                // Inside parentheses ----------------------------------
                if (field[i] === ")") {
                    // Closing parenthesis found
                    close = i;

                    // Attempt to parse the inside as a number
                    const parenContents = field.substring(open + 1, close);
                    const numericGenre = Genres.indexToAudioDirect(parenContents);
                    if (numericGenre !== undefined) {
                        results.push(numericGenre);
                    } else if (parenContents === GenreFrame.COVER_ABBREV) {
                        results.push(GenreFrame.COVER_STRING);
                    } else if (parenContents === GenreFrame.REMIX_ABBREV) {
                        results.push(GenreFrame.REMIX_STRING);
                    } else {
                        // What we expected to be a numeric genre was not. We will assume this
                        // field is not using standard numeric genres, and dump the remainder.
                        break;
                    }

                    // Transition to refinement processing
                    inParentheses = false;
                    refinementAdded = false;
                    open = i + 1;
                }

                // If we didn't find the closing paren, just increment and try again.
            } else {
                // Processing refinement  ------------------------------
                let refinementChunk: string;
                if (field[i] === "(") {
                    if (field[i + 1] === "(") {
                        // This is an escape sequence
                        // Take the current refinement chunk + the first paren (eg: `xyz(`)
                        refinementChunk = field.substring(open, i + 1);

                        // Skip over the next character (ie, `(`)
                        open = i + 2;
                        i++;
                    } else {
                        // This is possibly the start of a numeric genre.
                        // Take the current refinement chunk
                        refinementChunk = field.substring(open, i);

                        // Transition back to numeric genre processing.
                        inParentheses = true;
                        open = i;
                    }

                    // Add the refinement chunk to the last result
                    appendToLastResult(refinementChunk);
                    refinementAdded = true;
                }

                // If we didn't find an opening paren, just increment and try again
            }
        }

        // Process the remainder
        // If we didn't find any results, then just return undefined.
        if (results.length === 0) {
            return undefined;
        }

        appendToLastResult(field.substring(open));
        return results;
    }
}
