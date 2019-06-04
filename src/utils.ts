
export class Guards {
    public static byte(value: number, name: string): void {
        if (!Number.isSafeInteger(value) || value < 0 || value > 0xFF) {
            throw new Error(`Argument out of range: ${name} must be a safe, positive integer <256`);
        }
    }

    public static notNullOrUndefined(value: any, name: string): void {
        if (value === undefined || value === null) {
            throw new Error(`Argument null: ${name} was not provided`);
        }
    }

    public static short(value: number, name: string): void {
        if (!Number.isSafeInteger(value) || value > 32767 || value < -32768) {
            throw new Error(`Argument out of range: ${name} must be an integer that fits in 16 bits`);
        }
    }

    public static truthy(value: object, name: string): void {
        if (!value) {
            throw new Error(`Argument null: ${name} was not provided`);
        }
    }

    public static uint(value: number, name: string): void {
        if (!Number.isSafeInteger(value) || value < 0) {
            throw new Error(`Argument out of range: ${name} must be a safe, positive integer.`);
        }
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
