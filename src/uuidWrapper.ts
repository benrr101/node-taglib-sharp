import * as Uuid from "uuid";

/**
 * Wrapper around the UUID package to make it easier to handle UUIDs.
 */
export default class UuidWrapper {
    private static readonly GUID_REGEX =
        new RegExp(/([0-9A-F]{8})-?([0-9A-F]{4})-?([0-9A-F]{4})-?([0-9A-F]{4})-?([0-9A-F]{12})/i);

    private readonly _bytes: Uint8Array;

    /**
     * Constructs a instance using either the supplied UUID or generating a new, random one.
     * @param source If provided, it is used as the bytes of the instance. If a falsy value is
     *     provided, a new v4 UUID will be generated.
     */
    public constructor(source?: Uint8Array | string) {
        // Temporary implementation - it's probably not perfect
        if (!source) {
            // Source wasn't provided, generate a new guid string
            source = Uuid.v4();
        }

        if (typeof(source) === "string") {
            // Source is a string, validate and parse it into bytes
            const match = UuidWrapper.GUID_REGEX.exec(source);
            if (!match) {
                throw new Error(`Could not parse guid ${source}`);
            }

            const int = Number.parseInt(match[1], 16);
            const short1 = Number.parseInt(match[2], 16);
            const short2 = Number.parseInt(match[3], 16);
            const short3 = Number.parseInt(match[4], 16);

            const bytes = new Uint8Array(16);
            const dv = new DataView(bytes.buffer);
            dv.setUint32(0, int, true);
            dv.setUint16(4, short1, true);
            dv.setUint16(6, short2, true);
            dv.setUint16(8, short3, false);

            for (let i = 0; i < 12; i += 2) {
                bytes[10 + i / 2] = Number.parseInt(match[5].substr(i, 2), 16);
            }

            source = bytes;
        }

        if (source.length !== 16) {
            throw new Error(`${source.length} bytes provided as GUID`);
        }
        this._bytes = source;

        // @TODO: This implementation is commented out b/c the uuid package doesn't appear to
        //    follow RFC byte formatting of a GUID. See https://github.com/uuidjs/uuid/issues/503
        // if (!source) {
        //     const newUuid = Uuid.v4();
        //     this._bytes = new Uint8Array(Uuid.parse(newUuid));
        // } else if (typeof(source) === "string") {
        //     this._bytes = new Uint8Array(Uuid.parse(source));
        // } else {
        //     Uuid.stringify(source);
        //     this._bytes = source;
        // }
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
    public toString(): string {
        // Temporary implementation - it's probably not perfect
        const dv = new DataView(this._bytes.buffer);
        return `${dv.getUint32(0, true).toString(16)}-` +
               `${dv.getUint16(4, true).toString(16)}-` +
               `${dv.getUint16(6, true).toString(16)}-` +
               `${dv.getUint16(8, false).toString(16)}-` +
               `${this._bytes[10].toString(16).padStart(2, "0")}${this._bytes[11].toString(16).padStart(2, "0")}` +
               `${this._bytes[12].toString(16).padStart(2, "0")}${this._bytes[13].toString(16).padStart(2, "0")}` +
               `${this._bytes[14].toString(16).padStart(2, "0")}${this._bytes[15].toString(16).padStart(2, "0")}`;

        // @TODO: This implementation is commented out b/c the uuid package doesn't appear to
        //    follow RFC byte formatting of a GUID. See https://github.com/uuidjs/uuid/issues/503
        // return Uuid.stringify(this._bytes);
    }
}
