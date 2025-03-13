/// <reference types="vitest/config" />
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'vite-pwa-infinite-scroll-list',
        short_name: 'InfiniteScroll',
        theme_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/icons/192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/icons/225x225.png',
            sizes: '225x225',
            type: 'image/png',
          },
        ],
        screenshots: [
          {
            src: '/screenshots/desktop-1280x800.png',
            sizes: '1280x800',
            type: 'image/png',
            form_factor: 'wide',
          },
          {
            src: '/screenshots/mobile-750x1334.png',
            sizes: '750x1334',
            type: 'image/png',
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
      workbox: {
        sourcemap: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/components/**/*', 'src/hooks/**/*', 'src/pages/**/*'],
      // Remove Shadcn UI from coverage
      exclude: ['src/components/ui/**/*', 'src/lib/**/*', '**/types.ts'],
    },
  },
});
