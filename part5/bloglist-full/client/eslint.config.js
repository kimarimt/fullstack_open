import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import stylisticJS from '@stylistic/eslint-plugin'
import vitestGlobals from 'eslint-plugin-vitest-globals'

export default [
  { ignores: ['dist'] },

  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...vitestGlobals.environments.env.globals,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@stylistic': stylisticJS,
      'react': react,
      'vitest-globals': vitestGlobals
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...stylisticJS.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@stylistic/jsx-quotes': ['error', 'prefer-single'],
      '@stylistic/jsx-indent': ['error', 2],
      'react/prop-types': 'error',
    },
  },
]
