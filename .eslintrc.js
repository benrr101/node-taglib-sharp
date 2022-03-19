module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "tsconfig.json",
        "sourceType": "module"
    },
    "plugins": [
        "eslint-plugin-import",
        "eslint-plugin-jsdoc",
        "eslint-plugin-prefer-arrow",
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/adjacent-overload-signatures": "error",
        "@typescript-eslint/array-type": [
            "error",
            {
                "default": "array-simple"
            }
        ],
        "@typescript-eslint/ban-types": [
            "error",
            {
                "types": {
                    "Object": {
                        "message": "Avoid using the `Object` type. Did you mean `object`?"
                    },
                    "Function": {
                        "message": "Avoid using the `Function` type. Prefer a specific function type."
                    },
                    "Boolean": {
                        "message": "Avoid using the `Boolean` type. Did you mean `boolean`?"
                    },
                    "Number": {
                        "message": "Avoid using the `Number` type. Did you mean `number`?"
                    },
                    "String": {
                        "message": "Avoid using the `String` type. Did you mean `string`?"
                    },
                    "Symbol": {
                        "message": "Avoid using the `Symbol` type. Did you mean `symbol`?"
                    }
                }
            }
        ],
        "@typescript-eslint/dot-notation": "error",
        "@typescript-eslint/explicit-function-return-type": [
            "error",
            {
                "allowExpressions": true
            }
        ],
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/naming-convention": [
            "warn",
            { "selector": "default", "format": ["camelCase"] },
            { "selector": "typeLike", "format": ["PascalCase"] },
            { "selector": "property", "modifiers": ["private"], "format": ["camelCase"], "leadingUnderscore": "require" },
            { "selector": "property", "modifiers": ["static", "readonly"], "format": ["UPPER_CASE"] },
            { "selector": "property", "modifiers": ["private", "static", "readonly"], "format": ["UPPER_CASE"], "leadingUnderscore": "forbid" },
            { "selector": "enumMember", "format": ["PascalCase"] }
        ],
        "@typescript-eslint/no-inferrable-types": 0,
        "@typescript-eslint/no-misused-new": "error",
        "@typescript-eslint/no-namespace": "error",
        "@typescript-eslint/no-parameter-properties": "warn",
        "@typescript-eslint/prefer-namespace-keyword": "error",
        "@typescript-eslint/restrict-template-expressions": 0,
        "@typescript-eslint/triple-slash-reference": [
            "off",
            {
                "path": "always",
                "types": "prefer-import",
                "lib": "always"
            }
        ],
        "@typescript-eslint/unbound-method": [
            "error",
            {
                "ignoreStatic": true
            }
        ],
        "@typescript-eslint/unified-signatures": "error",
        "constructor-super": "error",
        "dot-notation": [
            "error",
            {
                "allowPattern": "^_.+"
            }
        ],
        "eqeqeq": "error",
        "guard-for-in": "error",
        "jsdoc/check-alignment": "error",
        "max-len": [
            "warn",
            {
                "code": 120
            }
        ],
        "new-parens": "error",
        "no-caller": "error",
        "no-cond-assign": "error",
        "no-console": "error",
        "no-debugger": "error",
        "no-empty": "error",
        "no-empty-function": "error",
        "no-eval": "error",
        "no-invalid-this": "error",
        "no-multiple-empty-lines": "warn",
        "no-new-wrappers": "error",
        "no-shadow": "error",
        "no-throw-literal": "error",
        "no-trailing-spaces": "error",
        "no-undef-init": "error",
        "no-unsafe-finally": "error",
        "no-unused-expressions": "error",
        "no-unused-labels": "error",
        "no-var": "error",
        "one-var": [
            "error",
            "never"
        ],
        "prefer-arrow/prefer-arrow-functions": "error",
        "prefer-const": "error",
        "radix": "error",
        "spaced-comment": [ "error", "always" ],
        "use-isnan": "error",
        "valid-typeof": "error"
    }
};
