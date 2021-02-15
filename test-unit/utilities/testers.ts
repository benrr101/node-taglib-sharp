import * as Chai from "chai";

// Setup Chai
const assert = Chai.assert;

export default class Testers {
    public static testByte(testFunc: (testValue: number) => void): void {
        assert.throws(() => testFunc(-1));
        assert.throws(() => testFunc(1.23));
        assert.throws(() => testFunc(0x100));
    }

    public static testInt(testFunc: (testValue: number) => void, allowUndefined = false): void {
        assert.throws(() => testFunc(-2147483648 - 1));
        assert.throws(() => testFunc(1.23));
        assert.throws(() => testFunc(2147483647 + 1));
        assert.throws(() => testFunc(null));

        if (!allowUndefined) {
            assert.throws(() => testFunc(undefined));
        }
    }

    public static testString(testFunc: (testValue: string) => void): void {
        this.testTruthy(testFunc);
        assert.throws(() => testFunc(""));
    }

    public static testSafeInt(testFunc: (testValue: number) => void, allowUndefined = false): void {
        assert.throws(() => testFunc(Number.MIN_SAFE_INTEGER - 1));
        assert.throws(() => testFunc(1.23));
        assert.throws(() => testFunc(Number.MAX_SAFE_INTEGER + 1));
        assert.throws(() => testFunc(null));

        if (!allowUndefined) {
            assert.throws(() => testFunc(undefined));
        }
    }

    public static testSafeUint(testFunc: (testValue: number) => void, allowUndefined = false): void {
        assert.throws(() => testFunc(-1));
        assert.throws(() => testFunc(1.23));
        assert.throws(() => testFunc(Number.MAX_SAFE_INTEGER + 1));
        assert.throws(() => testFunc(null));

        if (!allowUndefined) {
            assert.throws(() => testFunc(undefined));
        }
    }

    public static testTruthy<T>(testFunc: (testValue: T) => void): void {
        assert.throws(() => testFunc(undefined));
        assert.throws(() => testFunc(null));
    }

    public static testUint(testFunc: (testValue: number) => void, allowUndefined = false): void {
        assert.throws(() => testFunc(-1));
        assert.throws(() => testFunc(1.23));
        assert.throws(() => testFunc(0xFFFFFFFF + 1));
        assert.throws(() => testFunc(null));

        if (!allowUndefined) {
            assert.throws(() => testFunc(undefined));
        }
    }
}
