// prettier.config.js or .prettierrc.js
module.exports = {
    trailingComma: "es5",
    tabWidth: 2,
    semi: true,
    singleQuote: false,
    importOrder: [
        "^react$",
        "<THIRD_PARTY_MODULES>",
        "^@src/components/(.*)$",
        "^@src/hooks/(.*)$",
        "^@src/store/(.*)$",
        "^@src/utils/(.*)$",
        "^@src/types/(.*)$",
        "^assets/(.*)$",
        "^[./]",
    ],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
};
