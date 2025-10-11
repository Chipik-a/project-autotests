import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['src/**/*.{js,mjs,cjs,ts}'],
  },
  {
    languageOptions: {
      globals: globals.browser, // или globals.node — зависит от проекта
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    plugins: { prettier: prettierPlugin },
    rules: {
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
          printWidth: 100,
          singleQuote: true,
          trailingComma: 'es5',
        },
      ],
      eqeqeq: 'error',
    },
  },
  {
    ignores: [
      'node_modules',
      '**/dist/**',
      'eslint.config.mts',
      'playwright-report',
      'test-results',
    ],
  },
];
