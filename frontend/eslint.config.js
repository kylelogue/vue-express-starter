import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import prettier from '@vue/eslint-config-prettier';
import typescript from '@vue/eslint-config-typescript';

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,ts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  ...typescript(),
  prettier,

  {
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': 'warn',
      'no-debugger': 'error',
      'vue/multi-word-component-names': 'off',
      'vue/no-unused-vars': 'error',
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      indent: ['error', 2],
      'comma-dangle': ['error', 'only-multiline'],
      // Override prettier rules to allow semicolons
      'prettier/prettier': ['error', { semi: true, singleQuote: true }],
    },
  },
];
