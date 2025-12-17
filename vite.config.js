import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';

// Configuración para GitHub Pages
// Si tu repositorio está en: usuario.github.io/Portfolio-2025
// El base debe ser: '/Portfolio-2025/'
// Si está en la raíz: usuario.github.io, cambia a: '/'
export default defineConfig({
  base: '/Portfolio-2025/',
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      input: './index.html',
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});

