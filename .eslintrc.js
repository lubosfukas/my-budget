module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:react/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    // supress errors for expected linebreaks
    'linebreak-style': ['error', 'windows'],
    // suppress errors for missing 'import React' in files
    'react/react-in-jsx-scope': 'off',
    // supress errors for not allowed files with extension
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
  },
};
