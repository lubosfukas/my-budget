module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb",
    "airbnb-typescript",
    "plugin:react/recommended",
    "prettier",
  ],
  overrides: [
    {
      files: ["*.ts", "*.tsx"], // Your TypeScript files extension

      // Instead of extending TypeScript plugins outside the `overrides`, you should extend them here.
      // If you don't want to extend any rules, you don't need an `extends` attribute.
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],

      parserOptions: {
        project: ["./tsconfig.eslint.json"], // Specify it only for TypeScript files
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["react", "@typescript-eslint"],
  rules: {
    // supress errors for the use of dev packages
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    // supress errors for missing 'import React' in files
    "react/react-in-jsx-scope": "off",
    // supress errors for not allowed files with extension
    "react/jsx-filename-extension": [
      2,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
  },
};
