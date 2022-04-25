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
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.eslint.json"],
  },
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
