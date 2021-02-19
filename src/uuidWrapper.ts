import * as Uuid from "uuid";

/**
 * Wrapper around the UUID package to make it easier to handle UUIDs.
 */
export default class UuidWrapper {
    private _bytes: Uint8Array;

    /**
     * Constructs a instance using either the supplied UUID or generating a new, random one.
     * @param source If provided, it is used as the bytes of the instance. If a falsy value is
     *     provided, a new v4 UUID will be generated.
     */
    public constructor(source?: Uint8Array | string) {
        if (!source) {
            const newUuid = Uuid.v4();
            this._bytes = new Uint8Array(Uuid.parse(newUuid));
        } else if (typeof(source) === "string") {
            this._bytes = new Uint8Array(Uuid.parse(source));
        } else {
            Uuid.stringify(source);
            this._bytes = source;
        }
    }

    /**
     * Determines whether this instance and another instance represent the same UUID.
     * @param b The other UUID to compare this one to.
     */
    public equals(b: UuidWrapper): boolean {
        if (!b || this._bytes.length !== b._bytes.length) { return false; }
        for (let i = 0; i < this._bytes.length; i++) {
            if (this._bytes[i] !== b._bytes[i]) {
                return false;
            }
        }

        return true;
    }

    /**
     * Gets the bytes that make up the UUID.
     */
    public toBytes(): Uint8Array { return this._bytes.slice(); }

    /**
     * Gets a string representation of the UUID.
     */
    public toString(): string { return Uuid.stringify(this._bytes); }
}
