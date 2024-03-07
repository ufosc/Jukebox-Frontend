module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    // "react-app",
    'eslint:recommended',
    'plugin:react/recommended',
    // 'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', '_depricated'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'react-hooks'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'no-unused-vars': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-restricted-imports': 'error',

    'react/prop-types': 'off',
    'react/jsx-no-undef': 'error',
    'no-undef': 'error',
    'no-restricted-syntax': [
      'warn',
      {
        selector: 'ExportDefaultDeclaration',
        message: 'Prefer named exports',
      },
    ],
  },
}
