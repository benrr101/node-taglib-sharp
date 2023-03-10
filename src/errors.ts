/**
 * Error class that indicates the file is likely corrupt.
 */
export class CorruptFileError extends Error {
    public constructor(msg?: string) {
        super(msg);
    }
}

/**
 * Error class that indicates a piece of functionality is not implemented in the current version.
 */
export class NotImplementedError extends Error {
    public constructor(message?: string) {
        super(`Not implemented${message ? `: ${message}` : ""}`);
    }
}

/**
 * Error class that indicates a feature or format is not supported in the current version.
 */
export class NotSupportedError extends Error {
    public constructor(message?: string) {
        super(`Not supported${message ? `: ${message}` : ""}`);
    }
}

/**
 * Error class that indicates a format is not supported in the current version.
 */
export class UnsupportedFormatError extends Error {
    public constructor(message?: string) {
        super(`Unsupported format${message ? `: ${message}` : ""}`);
    }
}
