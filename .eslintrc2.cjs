module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    // 'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    // "standard-with-typescript",
    // "plugin:import/typescript",
    'plugin:prettier/recommended',
    "eslint:recommended",
    "plugin:react/recommended",
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  // parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'react-hooks', 'prettier'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    'no-unused-vars': 'off',
    'no-explicit-any': 'off',
    "no-undef": "error",
    "no-restricted-imports": "error",
    
    "react/jsx-no-undef": "error",
  }
}
