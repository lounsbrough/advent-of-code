module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: ['**/chartData/*.js'],
  rules: {
    'no-console': 'off',
    'no-continue': 'off',
  },
};
