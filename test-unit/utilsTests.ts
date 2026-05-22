import {params, suite} from "@testdeck/mocha";
import {assert} from "chai";

import {StringUtils} from "../src/utils";

@suite class StringUtils_Tests {
    // #region trimEnd Tests

    @params(["",          ""],          "empty_string")
    @params(["foobarbaz", "foobarbaz"], "no_match")
    @params(["fooaaaaaa", "foo"],       "trailing")
    @params(["aaaaaafoo", "aaaaaafoo"], "leading")
    @params(["fooaaafoo", "fooaaafoo"], "center")
    public trimEnd_singleCharacter([input, output]: [string, string]) {
        // Act
        const result = StringUtils.trimEnd(input, "a");

        // Assert
        assert.strictEqual(result, output);
    }

    @params(["",          ""],          "empty_string")
    @params(["foobarbaz", "foobarbaz"], "no_match")
    @params(["fooabcabc", "foo"],       "trailing")
    @params(["abcabcfoo", "abcabcfoo"], "leading")
    @params(["fooabcfoo", "fooabcfoo"], "center")
    public trimEnd_multipleCharacter([input, output]: [string, string]) {
        // Act
        const result = StringUtils.trimEnd(input, "abc");

        // Assert
        assert.strictEqual(result, output);
    }

    @params(["",             ""],             "empty_string")
    @params(["foobarbaz",    "foobarbaz"],    "no_match")
    @params(["foo\0\0\0",    "foo"],          "trailing")
    @params(["\0\0\0foo",    "\0\0\0foo"],    "leading")
    @params(["foo\0\0\0foo", "foo\0\0\0foo"], "center")
    public trimEnd_nullByte([input, output]: [string, string]) {
        // Act
        const result = StringUtils.trimEnd(input, "\0");

        // Assert
        assert.strictEqual(result, output);
    }

    @params(["",              ""],              "empty_string")
    @params(["foobarbaz",     "foobarbaz"],     "no_match")
    @params(["foo \t\r\n",    "foo"],           "trailing")
    @params([" \t\r\nfoo",    " \t\r\nfoo"],    "leading")
    @params(["foo \t\r\nfoo", "foo \t\r\nfoo"], "center")
    public trimEnd_whitespace([input, output]: [string, string]) {
        // Act
        const result = StringUtils.trimEnd(input, " \t\r\n");

        // Assert
        assert.strictEqual(result, output);
    }

    // #endregion
    // #region trimStart Tests

    @params(["",          ""],          "empty_string")
    @params(["foobarbaz", "foobarbaz"], "no_match")
    @params(["fooaaaaaa", "fooaaaaaa"], "trailing")
    @params(["aaaaaafoo", "foo"],       "leading")
    @params(["fooaaafoo", "fooaaafoo"], "center")
    public trimStart_singleCharacter([input, output]: [string, string]) {
        // Act
        const result = StringUtils.trimStart(input, "a");

        // Assert
        assert.strictEqual(result, output);
    }

    @params(["",          ""],          "empty_string")
    @params(["foobarbaz", "foobarbaz"], "no_match")
    @params(["fooabcabc", "fooabcabc"], "trailing")
    @params(["abcabcfoo", "foo"],       "leading")
    @params(["fooabcfoo", "fooabcfoo"], "center")
    public trimStart_multipleCharacter([input, output]: [string, string]) {
        // Act
        const result = StringUtils.trimStart(input, "abc");

        // Assert
        assert.strictEqual(result, output);
    }

    @params(["",             ""],             "empty_string")
    @params(["foobarbaz",    "foobarbaz"],    "no_match")
    @params(["foo\0\0\0",    "foo\0\0\0"],    "trailing")
    @params(["\0\0\0foo",    "foo"],          "leading")
    @params(["foo\0\0\0foo", "foo\0\0\0foo"], "center")
    public trimStart_nullByte([input, output]: [string, string]) {
        // Act
        const result = StringUtils.trimStart(input, "\0");

        // Assert
        assert.strictEqual(result, output);
    }

    @params(["",              ""],              "empty_string")
    @params(["foobarbaz",     "foobarbaz"],     "no_match")
    @params(["foo \t\r\n",    "foo \t\r\n"],    "trailing")
    @params([" \t\r\nfoo",    "foo"],           "leading")
    @params(["foo \t\r\nfoo", "foo \t\r\nfoo"], "center")
    public trimStart_whitespace([input, output]: [string, string]) {
        // Act
        const result = StringUtils.trimStart(input, " \t\r\n");

        // Assert
        assert.strictEqual(result, output);
    }

    // #endregion
}
