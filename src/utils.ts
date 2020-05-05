import * as BigInt from "big-integer";
import * as Path from "path";

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
            throw new Error(`Argument out of range: ${name} is not a valid unsigned 64-bit ingeger`);
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

}
