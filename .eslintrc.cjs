/** @type {import("eslint").Linter.Config} */
const config = {
    env: {
        es2020: true,
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ["check-file", "n"],
    extends: [
        "next/core-web-vitals",
        "next/typescript",
        "prettier",
        "eslint:recommended",
        "plugin:react/recommended",
    ],
    rules: {
        "no-console": "error",
        "react/react-in-jsx-scope": "off",
        "react/jsx-sort-props": ["error"],
        "prefer-template": ["error"],
        "check-file/filename-naming-convention": [
            "error",
            {
                "**/*.{ts,tsx}": "KEBAB_CASE",
            },
            {
                ignoreMiddleExtensions: true,
            },
        ],
        "check-file/folder-naming-convention": [
            "error",
            {
                "src/**/!^[.*": "KEBAB_CASE",
            },
        ],
    },
};
module.exports = config;
