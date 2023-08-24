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
  extends: ['airbnb', 'plugin:react/recommended', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/react-in-jsx-scope': 'off',
  },
  parserOptions: {
    allowImportExportEverywhere: true,
    ecmaVersion: 2023, // Specify the ECMAScript version you're using
    sourceType: 'module', // Indicate that you're using ES modules
    ecmaFeatures: {
      jsx: true, // Enable JSX parsing
    },
    quotes: ['error', 'single'], // or "double"
  },
};
