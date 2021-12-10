module.exports = {
  extends: 'airbnb-base',
  env: {
    browser: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    eqeqeq: 0,
    'no-multi-assign': 0,
    'no-param-reassign': 0,
    'no-plusplus': 0,
    'no-underscore-dangle': 0,
  },
};
