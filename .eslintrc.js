module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: [
    'prettier',
    'simple-import-sort',
    'import',
    '@typescript-eslint',
    'unused-imports',
    'react',
    'react-native',
  ],
  rules: {
    'no-console': ['error', {allow: ['warn', 'error']}],
    curly: ['error', 'multi-or-nest', 'consistent'],
    'no-unused-vars': 'off',
    'no-constant-condition': 'off',
    'unused-imports/no-unused-imports-ts': 'error',
    'react-native/no-unused-styles': 2,
    'prettier/prettier': 'error',
    'max-len': [
      'error',
      {
        code: 100,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreComments: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'no-shadow': 'off',
    // imports
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'import/no-default-export': 'error',
    'no-duplicate-imports': 'error',
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['..*', './../*'],
            message: 'Please use absolute import with @/ instead',
          },
        ],
      },
    ],
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  ignorePatterns: ['**/android/**'],
};
