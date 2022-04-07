module.exports = {
    parser: "vue-eslint-parser",
    parserOptions: {
        "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    },
    extends: [
        "plugin:vue/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    rules: {
        // override/add rules settings here, such as:
        "indent": ["error", 4],
        "vue/no-v-html": 0,
        "vue/html-indent": ["error", "tab"],
        "vue/multi-word-component-names": 0,
        "vue/require-default-prop": 0,
        "@typescript-eslint/ban-ts-comment": "off"
    }
}