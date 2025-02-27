// @typescript-eslint/eslint-plugin - An ESLint plugin which provides lint rules for TypeScript codebases.
// eslint-config-airbnb - This package provides Airbnb's .eslintrc as an extensible shared config.
// - eslint-plugin-import
// - eslint-plugin-react
// - eslint-plugin-react-hooks
// - eslint-plugin-jsx-a11y
// eslint-config-prettier eslint-plugin-prettier

module.exports = {
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', '@typescript-eslint'],
  root: true,
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  // "off" or 0 - turn the rule off
  // "warn" or 1 - turn the rule on as a warning (does not affect exit code)
  // "error" or 2 - turn the rule on as an error (exit code will be 1)
  rules: {
    'linebreak-style': 0,
    'lines-between-class-members': 0,
    'prettier/prettier': [2, { endOfLine: 'auto' }],
    'max-len': [2, { code: 125, ignoreComments: true, ignoreTrailingComments: true }],
    'no-nested-ternary': 0,
    'no-shadow': 0,
    'no-underscore-dangle': 0,
    'no-console': 2,
    'no-plusplus': 0,
    'no-param-reassign': 1,

    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/anchor-is-valid': [
      1,
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],

    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-shadow': 0,
    '@typescript-eslint/no-unused-vars': [2, { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    '@typescript-eslint/padding-line-between-statements': [
      2,
      // Always require blank lines after directive (like 'use-strict'), except between directives
      { blankLine: 'always', prev: 'directive', next: '*' },
      { blankLine: 'any', prev: 'directive', next: 'directive' },
      // Always require blank lines after import, except between imports
      { blankLine: 'always', prev: 'import', next: '*' },
      { blankLine: 'any', prev: 'import', next: 'import' },
      // Always require blank lines before and after every sequence of variable declarations and export
      { blankLine: 'always', prev: '*', next: ['const', 'let', 'var', 'export'] },
      { blankLine: 'always', prev: ['const', 'let', 'var', 'export'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var', 'export'], next: ['const', 'let', 'var'] },
      // Always require blank lines before and after class declaration, if, do/while, switch, try
      { blankLine: 'always', prev: '*', next: ['if', 'class', 'for', 'do', 'while', 'switch', 'try'] },
      { blankLine: 'always', prev: ['if', 'class', 'for', 'do', 'while', 'switch', 'try'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let'], next: ['if'] },
      // Always require blank lines before return statements
      { blankLine: 'always', prev: '*', next: 'return' },
    ],

    'react/jsx-no-useless-fragment': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx', '.js', '.jsx'] }],
    'react/jsx-props-no-spreading': 0,
    'react/react-in-jsx-scope': 0,
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'react-hooks/exhaustive-deps': 0,

    'import/extensions': [2, 'ignorePackages', { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' }],
    'import/prefer-default-export': 0,
    '@typescript-eslint/ban-ts-comment': 0,
  },
};
