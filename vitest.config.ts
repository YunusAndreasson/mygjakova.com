import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

// Lightweight Vitest setup for unit-testing pure modules (no Astro runtime).
// The `~` alias mirrors tsconfig so tests import the same way the app does.
export default defineConfig({
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    include: ['tests/**/*.test.ts'],
  },
});
