import * as BigInt from "big-integer";
import * as Path from "path";
import {ByteVector} from "./byteVector";

export class Guards {
    public static betweenExclusive(value: number, minValue: number, maxValue: number, name: string): void {
        if (value <= minValue || value >= maxValue) {
            throw new Error(`Argument out of range: ${name} must satisfy ${maxValue} <= ${name} <= ${minValue}`);
        }
    }

    public static betweenInclusive(value: number, minValue: number, maxValue: number, name: string): void {
        if (value < minValue || value > maxValue) {
            throw new Error(`Argument out of range: ${name} must satisfy ${maxValue} < ${name} < ${minValue}`);
        }
    }

    public static byte(value: number, name: string): void {
        if (!Number.isSafeInteger(value) || value < 0 || value > 0xFF) {
            throw new Error(`Argument out of range: ${name} must be a safe, positive, 8-bit integer`);
        }
    }

    public static greaterThanInclusive(value: number, lowerBound: number, name: string) {
        if (value < lowerBound) {
            throw new Error(`Argument out of range: ${name} must greater than ${lowerBound}`);
        }
    }

    public static int(value: number, name: string): void {
        if (!Number.isSafeInteger(value)) {
            throw new Error(`Argument out of range: ${name} must be a 32-bit integer`);
        }
    }

    public static lessThanInclusive(value: number, upperBound: number, name: string) {
        if (value > upperBound) {
            throw new Error(`Argument out of range: ${name} must be less than ${upperBound}`);
        }
    }

    public static notNullOrUndefined(value: any, name: string): void {
        if (value === undefined || value === null) {
            throw new Error(`Argument null: ${name} was not provided`);
        }
    }

    public static optionalByte(value: number | undefined, name: string): void {
        if (value === undefined) {
            return;
        }
        Guards.byte(value, name);
    }

    public static short(value: number, name: string): void {
        if (!Number.isSafeInteger(value) || value > 32767 || value < -32768) {
            throw new Error(`Argument out of range: ${name} must be a 16-bit integer`);
        }
    }

    public static truthy(value: object|string, name: string): void {
        if (!value) {
            throw new Error(`Argument null: ${name} was not provided`);
        }
    }

    public static uint(value: number, name: string): void {
        if (!Number.isSafeInteger(value) || value < 0) {
            throw new Error(`Argument out of range: ${name} must be a safe, positive, 32-bit integer`);
        }
    }

    public static ulong(value: BigInt.BigInteger, name: string): void {
        Guards.truthy(value, name);
        if (value.gt(BigInt("18446744073709551615")) || value.lt(0)) {
            throw new Error(`Argument out of range: ${name} is not a valid unsigned 64-bit integer`);
        }
    }
}

export class StringComparison {
    public static CaseInsensitive(a: string, b: string): boolean {
        Guards.notNullOrUndefined(a, "a");
        Guards.notNullOrUndefined(b, "b");
        return a.toUpperCase() === b.toUpperCase();
    }

    public static CaseSensitive(a: string, b: string): boolean {
        return a === b;
    }
}

export class FileUtils {
    public static getExtension(name: string) {
        let ext = Path.extname(name);
        if (!ext) {
            ext = name.startsWith(".") ? name.substring(1) : name;
        } else {
            ext = ext.substring(1);
        }

        return ext.toLowerCase();
    }
}

export class ArrayUtils {
    public static remove<T>(array: T[], callbackFn: (e: T, i: number) => boolean): void {
        let i = this.length;
        while (i--) {
            if (callbackFn(array[i], i)) {
                array.splice(i, 1);
            }
        }
    }
}

export class NumberUtils {
    /**
     * Provides way to do unsigned bitwise AND without all the mess of parenthesis.
     * @param x Left operand
     * @param y Right operand
     * @returns Number (x & y) >>> 0
     */
    public static uintAnd(x: number, y: number): number {
        return (x & y) >>> 0;
    }

    /**
     * Provides way to do unsigned bitwise OR without all the mess of parenthesis.
     * @param x Left operand
     * @param y Right operand
     * @returns Number (x | y) >>> 0
     */
    public static uintOr(x: number, y: number): number {
        return (x | y) >>> 0;
    }

    /**
     * Provides way to do unsigned bitshift left without all the mess of parenthesis.
     * @param x Number
     * @param y Bits to shift to the left
     * @returns Number (x << y) >>> 0;
     */
    public static uintLShift(x: number, y: number): number {
        return (x << y) >>> 0;
    }

    /**
     * Converts IEEE 80-bit floating point numbers (SANE "extended" type) to double precision
     * floating point number.
     * @source http://www33146ue.sakura.ne.jp/staff/iz/formats/ieee.c
     */
    public static convertFromIeeeExtended(bytes: ByteVector): number {
        let f: number;

        let exponent = NumberUtils.uintLShift(NumberUtils.uintAnd(bytes.get(0), 0x7F), 8);
        exponent = NumberUtils.uintOr(exponent, bytes.get(1));

        let hiMantissa = NumberUtils.uintLShift(bytes.get(2), 24);
        hiMantissa = NumberUtils.uintOr(hiMantissa, NumberUtils.uintLShift(bytes.get(3), 16));
        hiMantissa = NumberUtils.uintOr(hiMantissa, NumberUtils.uintLShift(bytes.get(4), 8));
        hiMantissa = NumberUtils.uintOr(hiMantissa, bytes.get(5));
        let loMantissa = NumberUtils.uintLShift(bytes.get(6), 24);
        loMantissa = NumberUtils.uintOr(loMantissa, NumberUtils.uintLShift(bytes.get(7), 16));
        loMantissa = NumberUtils.uintOr(loMantissa, NumberUtils.uintLShift(bytes.get(8), 8));
        loMantissa = NumberUtils.uintOr(loMantissa, bytes.get(9));

        if (exponent === 0 && hiMantissa === 0 && loMantissa === 0) {
            return 0;
        }

        if (exponent === 0x7FFF) {
            f = Number.POSITIVE_INFINITY;
        } else {
            exponent -= 16383;
            f = NumberUtils.ldexp(hiMantissa, exponent -= 31);
            f += NumberUtils.ldexp(loMantissa, exponent -= 32);
        }

        if ((bytes.get(0) & 0x80) !== 0) {
            return -f;
        } else {
            return f;
        }
    }

    /**
     * Performs the same operation as ldexp does in C/C++
     * @param x Number to be multiplied by 2^y
     * @param y Power to raise 2 to
     * @returns Number x * 2^y
     */
    public static ldexp(x: number, y: number): number {
        return x * Math.pow(2, y);
    }
}

export class StringUtils {
    public static trimStart(toTrim: string, chars: string) {
        while (toTrim.length > 0 && chars.indexOf(toTrim[0]) > -1) {
            toTrim = toTrim.substr(0);
        }
        return toTrim;
    }
}
