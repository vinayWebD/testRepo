module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true,
    jest: true, // Enables Jest global variables
  },
  globals: {
    test: true,
  },
  settings: {
    react: {
      version: 'detect', // or specify the version you are using, e.g., '16.14.0'
    },
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  plugins: ['prettier', 'react'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }], // Allow JSX to be present in files with either a .js or .jsx extension
    'react/react-in-jsx-scope': 'off', // Allow jsx to be run even if there is no React imported
    eqeqeq: 'error', // Enforce using === and !== over == and !=
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }], // Disallow unused variables,
    'key-spacing': ['error', { beforeColon: false, afterColon: true }], // Enforce spacing around colon in object literals,
    quotes: ['error', 'single'], // or "double"
  },
  parserOptions: {
    allowImportExportEverywhere: true,
    ecmaVersion: 2023, // Specify the ECMAScript version you're using
    sourceType: 'module', // Indicates that the code is using ES modules (import/export syntax)
    ecmaFeatures: {
      jsx: true, // Enable JSX parsing
    },
  },
};
