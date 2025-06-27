import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import prettierPlugin from 'eslint-plugin-prettier';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: {
      js,
      prettier: prettierPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        gsap: 'readonly',
        ScrollTrigger: 'readonly',
        SplitType: 'readonly',
        Lenis: 'readonly',
        traducciones: 'readonly',
        AOS: 'readonly',
        configurarAnimacionesNombre: 'readonly',
        actualizarAnimacionExperiencia: 'readonly',
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': ['warn', { vars: 'all', args: 'none' }],
      'prettier/prettier': 'warn',
    },
  },
]);
