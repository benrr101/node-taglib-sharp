import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";

// Setup Chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

export default abstract class FramePropertiesTests {
    protected propertyRoundTrip<T>(set: (v: T) => void, get: () => T, val: T) {
        // Act
        set(val);
        const output = get();

        // Assert
        assert.deepStrictEqual(output, val);
    }

    protected propertyNormalized<T>(set: (v: T) => void, get: () => T, input: T, output: T) {
        // Act
        set(input);
        const result = get();

        // Assert
        assert.deepStrictEqual(result, output);
    }
}
