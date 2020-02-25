export class CorruptFileError extends Error {
    public static isCorruptFileError: boolean = true;

    public constructor(msg?: string) {
        super(msg);
    }

    public static errorIs(e: Error): boolean {
        return e.hasOwnProperty("isCorruptFileError");
    }
}

export class NotImplementedError extends Error {
    public static isNotImplementedError: boolean = true;

    public constructor(message?: string) {
        super(`Not implemented${message ? `: ${message}` : ""}`);
    }

    public static errorIs(e: Error): boolean {
        return e.hasOwnProperty("isNotImplementedError");
    }
}
