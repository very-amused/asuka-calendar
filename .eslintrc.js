module.exports =  {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    node: true,
    es2020: true
  },
  extends: 'plugin:@typescript-eslint/recommended',
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    // General
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'brace-style': ['error', '1tbs'],
    // Object/array formatting
    'quote-props': ['error', 'as-needed'],
    'comma-dangle': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'], // Single line objects should be spaced
    'array-bracket-spacing': ['error', 'never'], // But not arrays
    // Function formatting
    'space-before-function-paren': ['warn', {
      named: 'never',
      anonymous: 'never',
      asyncArrow: 'always'
    }],
    // Misc
    'no-return-await': 'error',
    'unused-export-let': 'off',
    // Typescript specific rules
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off'
  }
}