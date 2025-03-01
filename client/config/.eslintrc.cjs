module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended', // Add TypeScript linting
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser', // Use the TypeScript parser for both JS/TS files
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    allowJs: true, // Allow JavaScript files
    checkJs: true, // Enable checking JavaScript files
    strictNullChecks: true, // Enable strict null checks
  },
  settings: {
    react: {
      version: '18.2',
    },
  },
  plugins: ['react-refresh', '@typescript-eslint'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // Add any other TypeScript-specific rules you want
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Disable explicit return types requirement
    '@typescript-eslint/no-non-null-assertion': 'warn', // Disallow non-null assertions
  },
}
