export class CorruptFileError extends Error {
    public static isCorruptFileError: boolean = true;

    public constructor(msg?: string) {
        super(msg);
    }
}

export class NotImplementedError extends Error {
    public static isNotImplementedError: boolean = true;

    public constructor(message?: string) {
        super(`Not implemented${message ? `: ${message}` : ""}`);
    }
}
