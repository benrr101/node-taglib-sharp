import * as Chai from "chai";

// Setup Chai
const assert = Chai.assert;

export default class PropertyTests {
    public static propertyRoundTrip<T>(set: (v: T) => void, get: () => T, val: T) {
        // Act
        set(val);
        const output = get();

        // Assert
        assert.deepStrictEqual(output, val);
    }

    public static propertyNormalized<T>(set: (v: T) => void, get: () => T, input: T, output: T) {
        // Act
        set(input);
        const result = get();

        // Assert
        assert.deepStrictEqual(result, output);
    }

    public static propertyThrows<T>(set: (v: T) => void, input: T) {
        // Act
        assert.throws(() => { set(input); });
    }
}
