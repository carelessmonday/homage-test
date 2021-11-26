module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    camelcase: 'off',
    'import/no-unresolved': 'off',
    'ter-arrow-parens': 'off',
    'import/extensions': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
  },
  parser: '@typescript-eslint/parser',
};
