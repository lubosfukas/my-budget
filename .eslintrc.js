module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb", "airbnb-typescript", "plugin:react/recommended", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.eslint.json"],
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "import/prefer-default-export": "off",
    "react/function-component-definition": [
      2,
      { namedComponents: "arrow-function", unnamedComponents: "arrow-function" },
    ],
    "react/jsx-filename-extension": [2, { extensions: [".js", ".jsx", ".ts", ".tsx"] }],
    "react/react-in-jsx-scope": "off",
    "react/require-default-props": [0],
    "sort-imports": [
      "error",
      {
        ignoreCase: false,
        ignoreDeclarationSort: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        allowSeparatedGroups: true,
      },
    ],
  },
};
