export default class CorruptFileError extends Error {
    public static isCorruptFileError: boolean = true;

    public constructor(msg?: string) {
        super(msg);
    }
}
