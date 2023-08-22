module.exports = {
  env: {
    browser: true,
    es2021: true,
    amd: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['prettier', 'react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'no-return-assign': ['off'],
    'react/prop-types': ['warn'],
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: 'always',
        ObjectPattern: {
          multiline: true,
        },
      },
    ],
    camelcase: [
      2,
      {
        ignoreDestructuring: true,
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
