import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'
import preferArrow from 'eslint-plugin-prefer-arrow'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      // prettier: 
      prettier,
      react,
      preferArrow
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      // 'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
      // 'func-style': ['error', 'expression', { allowArrowFunctions: true }],
      'react/react-in-jsx-scope': 'off',

      '@typescript-eslint/consistent-type-imports': 'warn',
      '@typescript-eslint/no-redeclare': 'off',
      '@typescript-eslint/space-before-function-paren': 'off',
      'prefer-const': 'warn',
      'prettier/prettier': 'warn',
      'preferArrow/prefer-arrow-functions': [
        'warn',
        {
          disallowPrototype: false,
          singleReturnOnly: false,
          classPropertiesAllowed: false,
        },
      ],
      'prefer-arrow-callback': ['warn', { allowNamedFunctions: false }],
      'func-style': ['warn', 'expression', { allowArrowFunctions: true }],
      'react/prop-types': ['off'],
      '@typescript-eslint/no-unused-expressions': ['off']
      // 'import/no-internal-modules': ['error'],
      // 'no-restricted-imports': [
      //   'error',
      //   {
      //     name: 'pages',
      //     message: 'Some message',
      //   },
      // ],
      // 'eslint/no-restricted-imports': ['warn'],
    },
  },
)

/////////////////////////////////////////////
// const eslint = require('@eslint/js')
// const eslintTs = require('@typescript-eslint/eslint-plugin')
// const eslintReact = require('eslint-plugin-react')
// const eslintPrettier = require('eslint-plugin-prettier')

// module.exports = {
//   ...eslint.configs.recommended,
//   // ...eslintTs,
//   // ...eslintReact.configs.recommended,
//   // ...eslintPrettier.configs,
//   files: ['src/**/*.{ts,tsx}'],
//   ignores: ['_depricated/'],
//   // env: {
//   //   browser: true,
//   //   es2021: true,
//   // },
//   // extends: [
//   //   'eslint:recommended',
//   //   'plugin:@typescript-eslint/recommended',
//   //   'plugin:react/recommended',
//   //   'prettier',
//   // ],
//   // overrides: [
//   //   {
//   //     env: {
//   //       node: true,
//   //     },
//   //     files: ['.eslintrc.{js,cjs}'],
//   //     parserOptions: {
//   //       sourceType: 'script',
//   //     },
//   //   },
//   // ],
//   // parser: '@typescript-eslint/parser',
//   // parserOptions: {
//   //   ecmaVersion: 'latest',
//   //   sourceType: 'module',
//   // },
//   // plugins: [
//   //   '@typescript-eslint',
//   //   'react',
//   //   'prefer-arrow',
//   //   'prettier',
//   //   'import',
//   // ],
//   rules: {
//     '@typescript-eslint/no-explicit-any': 'off',
//     '@typescript-eslint/no-unused-vars': 'off',
//     // 'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
//     // 'func-style': ['error', 'expression', { allowArrowFunctions: true }],
//     'react/react-in-jsx-scope': 'off',

//     '@typescript-eslint/consistent-type-imports': 'warn',
//     '@typescript-eslint/no-redeclare': 'off',
//     '@typescript-eslint/space-before-function-paren': 'off',
//     'prefer-const': 'warn',
//     'prettier/prettier': 'warn',
//     'prefer-arrow/prefer-arrow-functions': [
//       'warn',
//       {
//         disallowPrototype: false,
//         singleReturnOnly: false,
//         classPropertiesAllowed: false,
//       },
//     ],
//     'prefer-arrow-callback': ['warn', { allowNamedFunctions: false }],
//     'func-style': ['warn', 'expression', { allowArrowFunctions: true }],
//     'react/prop-types': ['off'],
//     // 'import/no-internal-modules': ['error'],
//     // 'no-restricted-imports': [
//     //   'error',
//     //   {
//     //     name: 'pages',
//     //     message: 'Some message',
//     //   },
//     // ],
//     // 'eslint/no-restricted-imports': ['warn'],
//   },
// }
