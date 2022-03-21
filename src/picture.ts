import * as path from "path";
import {ByteVector} from "./byteVector";
import {IFileAbstraction} from "./fileAbstraction";
import {IPicture, PictureType} from "./iPicture";
import {FileUtils, Guards} from "./utils";

/**
 * This class implements {@link IPicture} and provides a mechanism for loading pictures from files.
 */
export default class Picture implements IPicture {
    // #region Constants

    // @TODO: Just do this as a friggin dictionary
    private static readonly EXTENSION_TO_MIMETYPES: string[] = [
        "bin", "application/octet-stream", // Any kind of binary data - placed at top to act as default
        "aac", "audio/aac", // AAC audio file
        "abw", "application/x-abiword", // AbiWord document
        "arc", "application/octet-stream", // Archive document (multiple files embedded)
        "avi", "video/x-msvideo", // AVI: Audio Video Interleave
        "azw", "application/vnd.amazon.ebook", // Amazon Kindle eBook format
        "bmp", "image/bmp", // BMP image data
        "bmp", "image/x-windows-bmp", // BMP image data
        "bm", "image/bmp", // BMP image data
        "bz", "application/x-bzip", // BZip archive
        "bz2", "application/x-bzip2", // BZip2 archive
        "csh", "application/x-csh", // C-Shell script
        "css", "text/css", // Cascading Style Sheets (CSS)
        "csv", "text/csv", // Comma-separated values (CSV)
        "doc", "application/msword", // Microsoft Word
        "eot", "application/vnd.ms-fontobject", // MS Embedded OpenType fonts
        "epub", "application/epub+zip", // Electronic publication (EPUB)
        "gif", "image/gif", // Graphics Interchange Format (GIF)
        "htm", "text/html", // HyperText Markup Language (HTML)text / html
        "html", "text/html", // HyperText Markup Language (HTML)text / html
        "ico", "image/x-icon", // Icon format
        "ics", "text/calendar", // iCalendar format
        "jar", "application/java-archive", // Java Archive (JAR)
        "jpg", "image/jpeg", // JPEG images
        "jpeg", "image/jpeg", // JPEG images
        "js", "application/javascript", // JavaScript (ECMAScript)
        "json", "application/json", // JSON format
        "mid", "audio/midi", // Musical Instrument Digital Interface (MIDI)
        "midi", "audio/midi", // Musical Instrument Digital Interface (MIDI)
        "mp3", "audio/mpeg", // MPEG audio, mp3 is first since it's most likely
        "mp1", "audio/mpeg",
        "mp2", "audio/mpeg",
        "mpg", "video/mpeg",
        "mpeg", "video/mpeg", // MPEG Video
        "m4a", "audio/mp4",
        "mp4", "video/mp4",
        "m4v", "video/mp4",
        "mpkg", "application/vnd.apple.installer+xml", // Apple Installer Package
        "odp", "application/vnd.oasis.opendocument.presentation", // OpenDocument presentation document
        "ods", "application/vnd.oasis.opendocument.spreadsheet", // OpenDocument spreadsheet document
        "odt", "application/vnd.oasis.opendocument.text", // OpenDocument text document
        "oga", "audio/ogg", // OGG audio
        "ogg", "audio/ogg",
        "ogx", "application/ogg", // OGG
        "ogv", "video/ogg",
        "otf", "font/otf", // OpenType font
        "png", "image/png", // Portable Network Graphics
        "pdf", "application/pdf", // Adobe Portable Document Format (PDF)
        "ppt", "application/vnd.ms-powerpoint", // Microsoft PowerPoint
        "rar", "application/x-rar-compressed", // RAR archive
        "rtf", "application/rtf", // Rich Text Format (RTF)
        "sh", "application/x-sh", // Bourne shell script
        "svg", "image/svg+xml", // Scalable Vector Graphics (SVG)
        "swf", "application/x-shockwave-flash", // Small web format (SWF) or Adobe Flash document
        "tar", "application/x-tar", // Tape Archive (TAR)
        "tif", "image/tiff", //  Tagged Image File Format(TIFF)
        "tiff", "image/tiff", //  Tagged Image File Format(TIFF)
        "ts", "video/vnd.dlna.mpeg-tts", // Typescript file @TODO: Uh not in this context...
        "ttf", "font/ttf", // TrueType Font
        "vsd", "application/vnd.visio", // Microsoft Visio
        "wav", "audio/x-wav", // Waveform Audio Format
        "weba", "audio/webm", // WEBM audio
        "webm", "video/webm", // WEBM video
        "webp", "image/webp", // WEBP image
        "woff", "font/woff", // Web Open Font Format (WOFF)
        "woff2", "font/woff2", // Web Open Font Format (WOFF)
        "xhtml", "application/xhtml+xml", // XHTML
        "xls", "application/vnd.ms", // excel application
        "xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // excel 2007 application
        "xml", "application/xml", // XML
        "xul", "application/vnd.mozilla.xul+xml", // XUL
        "zip", "application/zip", // ZIP archive
        "3gp", "video/3gpp", // 3GPP audio/video container
        "3g2", "video/3gpp2", // 3GPP2 audio/video container
        "7z", "application/x-7z-compressed", // 7-zip archive
    ];

    // #endregion

    // #region Constructors

    private constructor() { /* private to enforce construction via static methods */ }

    /**
     * Constructs and initializes a new instance from a file located at the provided path. The type
     * and description of the picture are determined by the extension of the file. The file is
     * loaded completely.
     * @param filePath Path to the file to use for the file
     */
    public static fromPath(filePath: string): Picture {
        Guards.truthy(filePath, "filePath");

        const picture = new Picture();
        picture.data = ByteVector.fromPath(filePath);
        picture.filename = path.basename(filePath);
        picture.description = picture.filename;
        picture.mimeType = Picture.getMimeTypeFromFilename(picture.filename);
        picture.type = picture.mimeType.startsWith("image/") ? PictureType.FrontCover : PictureType.NotAPicture;
        return picture;

    }

    /**
     * Constructs and initializes a new instance from the data provided. The data is processed to
     * discover the type of the picture.
     * @param data Raw bytes of the picture to store in the instance. Cannot be falsey
     */
    public static fromData(data: ByteVector): Picture {
        Guards.truthy(data, "data");

        const picture = new Picture();
        picture.data = data.toByteVector();

        const ext = Picture.getExtensionFromData(data);
        picture.mimeType = Picture.getMimeTypeFromFilename(ext);
        if (ext) {
            picture.type = PictureType.FrontCover;
            picture.filename = picture.description = "cover" + ext;
        } else {
            picture.type = PictureType.NotAPicture;
            picture.filename = "UnknownType";
        }

        return picture;
    }

    /**
     * Constructs a new instance with the data provided. No processing of the data is done.
     * @param data Raw bytes of the picture to store in the instance. Cannot be falsey
     * @param type Type of the picture. Cannot be null or undefined
     * @param mimeType MimeType of the picture. Cannot be falsey
     * @param description Description of the picture. Cannot be null or undefined
     */
    public static fromFullData(data: ByteVector, type: PictureType, mimeType: string, description: string): Picture {
        Guards.truthy(data, "data");
        Guards.notNullOrUndefined(type, "type");
        Guards.truthy(mimeType, "mimeType");
        Guards.notNullOrUndefined(description, "description");

        const picture = new Picture();
        picture.data = data.toByteVector();
        picture.type = type;
        picture.mimeType = mimeType;
        picture.description = description;

        return picture;
    }

    /**
     * Constructs and initializes a new instance from a file abstraction. The description and type
     * of the file are determined by the name of the abstraction.
     * @param abstraction File abstraction to load the picture from.
     */
    public static fromFileAbstraction(abstraction: IFileAbstraction): Picture {
        Guards.truthy(abstraction, "abstraction");

        const picture = new Picture();
        picture.data = ByteVector.fromFileAbstraction(abstraction);
        picture.filename = abstraction.name;
        picture.description = abstraction.name;

        if (picture.filename && picture.filename.indexOf(".") >= 0) {
            picture.mimeType = Picture.getMimeTypeFromFilename(picture.filename);
            picture.type = picture.mimeType.startsWith("image/") ? PictureType.FrontCover : PictureType.NotAPicture;
        } else {
            const ext = Picture.getExtensionFromData(picture.data);
            picture.mimeType = Picture.getMimeTypeFromFilename(ext);
            if (ext) {
                picture.type = PictureType.FrontCover;
                picture.filename = picture.description = "cover" + ext;
            } else {
                picture.type = PictureType.NotAPicture;
                picture.filename = "UnknownType";
            }
        }

        return picture;
    }

    // #endregion

    // #region Public Properties

    /** @inheritDoc */
    public data: ByteVector;

    /** @inheritDoc */
    public description: string;

    /** @inheritDoc */
    public filename: string;

    /** @inheritDoc */
    public mimeType: string;

    /**
     * Gets and sets the type of the content visible in the picture stored in the current instance.
     */
    public type: PictureType;

    // #endregion

    // #region Public Static Methods

    /**
     * Retrieve a mimetype from raw file data by reading the first few bytes of the file. Less
     * accurate than {@link getExtensionFromMimeType} since this is limited to image file types.
     * @param data Bytes of the file to read to identify the extension
     * @returns string Extension of the file with dot at the beginning based on the first few bytes
     *     of the data. If the extension cannot be determined, `undefined` is returned
     */
    public static getExtensionFromData(data: ByteVector): string {
        let ext: string;

        // No picture unless it is corrupted, can fit in a file of less than 4 bytes
        if (data && data.length >= 4) {
            if (data.get(1) === 0x50 && data.get(2) === 0x4E && data.get(3) === 0x47) {
                ext = ".png";
            } else if (data.get(0) === 0x47 && data.get(1) === 0x49 && data.get(2) === 0x46) {
                ext = ".gif";
            } else if (data.get(0) === 0x42 && data.get(1) === 0x4D) {
                ext = ".bmp";
            } else if (data.get(0) === 0xFF && data.get(1) === 0xD8) {
                ext = ".jpg";
            }
        }

        return ext;
    }

    /**
     * Gets the file extension for a specific mimetype.
     * @param mime Mimetype to lookup the extension for
     * @returns string Extension of the file based on the mimetype with a dot at the beginning. If
     *     the extension cannot be determined, `undefined` is returned
     */
    public static getExtensionFromMimeType(mime: string): string {
        let ext: string;

        for (let i = 0; i < this.EXTENSION_TO_MIMETYPES.length; i += 2) {
            if (this.EXTENSION_TO_MIMETYPES[i + 1] === mime) {
                ext = this.EXTENSION_TO_MIMETYPES[i];
                break;
            }
        }

        return ext ? `.${ext}` : ext;
    }

    /**
     * Gets the mimetype of a file based on its extension. If the mimetype cannot be determined, it
     * is assumed to be a basic binary file.
     * @param name Filename with extension or just the extension of the file
     * @returns string Mimetype of the file based on the extension. If mimetype cannot be
     *     determined, application/octet-stream is returned.
     */
    public static getMimeTypeFromFilename(name: string): string {
        let mimeType: string = "application/octet-stream";

        if (!name)  {
            return mimeType;
        }

        const ext = FileUtils.getExtension(name);
        for (let i = 0; i < this.EXTENSION_TO_MIMETYPES.length; i += 2) {
            if (this.EXTENSION_TO_MIMETYPES[i] === ext) {
                mimeType = this.EXTENSION_TO_MIMETYPES[i + 1];
                break;
            }
        }

        return mimeType;
    }

    // #endregion
}
