// ESLint Configuration
//  A very basic ESLint configuration that supports syntax for browsers,
//  commonjs, es6 and node. It also provides a set of stylistic rules.

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    sourceType: 'module',
  },
  // The rules here state that:
  rules: {
    'comma-dangle': ['error', 'always-multiline'], // it's an error to not use trailing commas
    indent: ['error', 2], // indents are 2 spaces. no excuses.
    'linebreak-style': ['error', 'unix'], // enforce unix linebreaks
    quotes: ['error', 'single'], // enforce using single quotes
    semi: ['error', 'always'], // enforce using semi-colons always
    'no-unused-vars': ['warn'], // warn if there are unused vars
    'no-console': 0,
  },
};
