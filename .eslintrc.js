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
  plugins: ["react", "simple-import-sort", "@typescript-eslint"],
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
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          // each outer array is separated by a blank line
          ["^\\u0000"], // side effect imports
          ["^react(-dom)?$", "^@?\\w"], // react, then external packages
          ["^[^.]", "^\\.", "^[^(\\w|@ )].*/[A-Z][^/]*$"], // absolute imports, relative imports, relative imports of Components (where the last part of the path is capitalized)
          ["^@?\\w.*\\.(c|sa|le)ss$", "^\\..*\\.(c|sa|le)ss$"], // styles (external, then relative)
        ],
      },
    ],
  },
};
