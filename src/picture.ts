import * as path from "path";

import {ByteVector} from "./byteVector";
import {IFileAbstraction} from "./fileAbstraction";

export enum PictureType {
    /**
     * @summary The picture is of a type other than those specified.
     */
    Other = 0x00,

    /**
     * @summary The picture is a 32x32 PNG image that should be used when displaying the file in a browser.
     */
    FileIcon = 0x01,

    /**
     * @summary The picture is of an icon different from {@see FileIcon}
     */
    OtherFileIcon = 0x02,

    /**
     * @summary The picture is of the front cover of the album.
     */
    FrontCover = 0x03,

    /**
     * @summary The picture is of the back cover of the album.
     */
    BackCover = 0x04,

    /**
     * @summary The picture is of a leaflet page including with the album.
     */
    LeafletPage = 0x05,

    /**
     * @summary The picture is of the album or disc itself.
     */
    Media = 0x06,

    /**
     * @summary The picture is of the lead artist or soloist.
     */
    LeadArtist = 0x07,

    /**
     * @summary The picture is of the artist or performer.
     */
    Artist = 0x08,

    /**
     * @summary The picture is of the conductor.
     */
    Conductor = 0x09,

    /**
     * @summary The picture is of the band or orchestra.
     */
    Band = 0x0A,

    /**
     * @summary The picture is of the composer.
     */
    Composer = 0x0B,

    /**
     * @summary The picture is of the lyricist or text writer.
     */
    Lyricist = 0x0C,

    /**
     * @summary The picture is of the recording location or studio.
     */
    RecordingLocation = 0x0D,

    /**
     * @summary The picture is one taken during the track's recording.
     */
    DuringRecording = 0x0E,

    /**
     * @summary The picture is one taken during the track's performance.
     */
    DuringPerformance = 0x0F,

    /**
     * @summary The picture is a capture from a movie screen.
     */
    MovieScreenCapture = 0x10,

    /**
     * @summary The picture is of a large, colored fish.
     */
    ColoredFish = 0x11,

    /**
     * @summary The picture is an illustration related to the track.
     */
    Illustration = 0x12,

    /**
     * @summary The picture contains the logo of the band or performer.
     */
    BandLogo = 0x13,

    /**
     * @summary The picture is the logo of the publisher or record
     */
    PublisherLogo = 0x14,

    /**
     * @summary In fact, this is not a Picture, but another file-type.
     */
    NotAPicture = 0xff
}

export interface IPicture {
    mimeType: string;

    type: PictureType;

    filename: string;

    description: string;

    data: ByteVector;
}

export class Picture implements IPicture {
    // #region Constants

    private static readonly _lutExtensionMime: string[] = [
        "aac", "audio/aac", // AAC audio file
        "abw", "application/x-abiword", // AbiWord document
        "arc", "application/octet-stream", // Archive document (multiple files embedded)
        "avi", "video/x-msvideo", // AVI: Audio Video Interleave
        "azw", "application/vnd.amazon.ebook", // Amazon Kindle eBook format
        "bin", "application/octet-stream", // Any kind of binary data
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
        "mp3", "audio/mpeg",
        "mp1", "audio/mpeg",
        "mp2", "audio/mpeg",
        "mpg", "video/mpeg",
        "mpeg", "video/mpeg", // MPEG Video
        "m4a", "audio/mp4",
        "mp4", "video/mp4",
        "m4v", "video/mp4",
        "mpkg", "application/vnd.apple.installer+xml", // Apple Installer Package
        "odp", "application/vnd.oasis.opendocument.presentation", // OpenDocuemnt presentation document
        "ods", "application/vnd.oasis.opendocument.spreadsheet", // OpenDocuemnt spreadsheet document
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
        "ts", "video/vnd.dlna.mpeg-tts", // Typescript file
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

    private constructor() {}

    public static fromPath(filePath: string): Picture {
        if (!filePath) {
            throw new Error("Argument null exception: path not provided");
        }

        const picture = new Picture();

        picture.data = ByteVector.fromPath(filePath);
        picture.filename = path.basename(filePath);
        picture.description = picture.filename;
        picture.mimeType = Picture.getMimeTypeFromExtension(picture.filename);
        picture.type = picture.mimeType.startsWith("image/") ? PictureType.FrontCover : PictureType.NotAPicture;

        return picture;

    }

    public static fromData(data: ByteVector): Picture {
        if (!data) {
            throw new Error("Argument null exception: data not provided");
        }

        const picture = new Picture();
        picture.data = ByteVector.fromByteVector(data);

        const ext = Picture.getExtensionFromData(data);
        picture.mimeType = Picture.getMimeTypeFromExtension(ext);
        if (ext) {
            picture.type = PictureType.FrontCover;
            picture.filename = picture.description = "cover" + ext;
        } else {
            picture.type = PictureType.NotAPicture;
            picture.filename = "UnknownType";
        }

        return picture;
    }

    public static fromFileAbstraction(abstraction: IFileAbstraction): Picture {
        if (!abstraction) {
            throw new Error("Argument null exception: file abstraction not provided");
        }

        const picture = new Picture();
        picture.data = ByteVector.fromFileAbstraction(abstraction, false);
        picture.filename = abstraction.name;
        picture.description = abstraction.name;

        if (picture.filename && picture.filename.indexOf(".") >= 0) {
            picture.mimeType = Picture.getMimeTypeFromExtension(picture.filename);
            picture.type = picture.mimeType.startsWith("image/") ? PictureType.FrontCover : PictureType.NotAPicture;
        } else {
            const ext = Picture.getExtensionFromData(picture.data);
            picture.mimeType = Picture.getMimeTypeFromExtension(ext);
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

    public static fromPicture(original: IPicture): Picture {
        const picture = new Picture();
        picture.mimeType = original.mimeType;
        picture.type = original.type;
        picture.filename = original.filename;
        picture.description = original.description;
        picture.data = original.data;

        return picture;
    }

    // #endregion

    // #region Public Properties

    public mimeType: string;

    public type: PictureType;

    public filename: string;

    public description: string;

    public data: ByteVector;

    // #endregion

    // #region Public Static Methods

    public static getExtensionFromData(data: ByteVector): string|null {
        let ext = null;

        // No picture unless it is corrupted, can fit in a file of less than 4 bytes
        if (data.length >= 4) {
            if (data.get(1) === 0x50 && data.get(2) === 0x4E && data.get(3) === 0x47) {
                // PNG
                ext = ".png";
            } else if (data.get(0) === 0x47 && data.get(1) === 0x49 && data.get(2) === 0x47) {
                // GIF
                ext = ".gif";
            } else if (data.get(0) === 0x42 && data.get(1) === 0x4D) {
                // BM
                ext = ".bmp";
            } else if (data.get(0) === 0xFF && data.get(1) === 0xD8 && data.get(2) === 0xFF && data.get(3) === 0xE0) {
                ext = ".jpg";
            }
        }

        return ext;
    }

    public static getExtensionFromMimeType(mime: string): string|null {
        let ext: string = null;

        for (let i = 1; i < this._lutExtensionMime.length; i += 2) {
            if (this._lutExtensionMime[i] === mime) {
                ext = this._lutExtensionMime[i - 1];
                break;
            }
        }

        return ext;
    }

    public static getMimeTypeFromExtension(name: string): string|null {
        let mimeType: string = "application/octet-stream";

        if (!name || name.length === 0)  {
            return mimeType;
        }

        let ext = path.extname(name);
        if (!ext || ext.length === 0) {
            ext = name;
        } else {
            ext = ext.substring(1);
        }
        ext = ext.substring(1);

        for (let i = 0; i < this._lutExtensionMime.length; i += 2) {
            if (this._lutExtensionMime[i] === ext) {
                mimeType = this._lutExtensionMime[i + 1];
                break;
            }
        }

        return mimeType;
    }

    // #endregion
}
