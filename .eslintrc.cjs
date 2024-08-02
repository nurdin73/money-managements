module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
      'plugin:prettier/recommended',
  ],
  parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['/*', '!/resources'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'import', 'react', '@typescript-eslint', 'prettier'],
  rules: {
      'react-refresh/only-export-components': ['off'],
      'no-console': 'warn',
      'arrow-body-style': ['warn', 'as-needed'],
      'no-empty-function': 'warn',
      'no-empty': 'off',
      'no-prototype-builtins': 'warn',
      quotes: ['warn', 'single', { avoidEscape: true }],
      'prefer-const': 'off',
      'no-dupe-keys': 'warn',
      'react/react-in-jsx-scope': ['off'],
      '@typescript-eslint/ban-types': ['off'],
      '@typescript-eslint/ban-ts-comment': ['off'],
      '@typescript-eslint/no-this-alias': ['warn'],
      'no-duplicate-imports': ['warn'],
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/no-explicit-any': ['off'],
      'jsx-a11y/anchor-is-valid': ['off'],
      'valid-typeof': ['error', { requireStringLiterals: true }],
      'prettier/prettier': ['error'],
      // 'import/no-unresolved': ['warn', {caseSensitive: false}],
      'import/order': [
          'warn',
          {
              groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
              'newlines-between': 'always',
              pathGroups: [
                  {
                      pattern: '@core/**',
                      group: 'internal',
                      position: 'after',
                  },
              ],
              pathGroupsExcludedImportTypes: ['internal'],
          },
      ],
      'import/no-named-as-default-member': ['off'],
      'import/no-anonymous-default-export': ['off'],
  },
  settings: {
      react: {
          version: 'detect',
      },
      'import/resolver': {
          typescript: {
              // @alwaysTryTypes always try to resolve types under `<root>@types`
              // directory even it doesn't contain any source code, like `@types/unist`
              alwaysTryTypes: true,
              project: './tsconfig.json',
              extensions: ['.ts', '.tsx'],
          },
          node: {
              extensions: ['.js', '.jsx', '.ts', '.tsx'],
          },
      },
  },
}
