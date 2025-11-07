import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/**', 'dist/**', '**/*.config.{ts,js}', '**/test/**', '**/*.test.ts'],
    },
  },
  resolve: {
    alias: {
      '@common': path.resolve(__dirname, './src/common'),
      '@utils': path.resolve(__dirname, './src/common/utils'),
      '@commands': path.resolve(__dirname, './src/commands'),
      vscode: path.resolve(__dirname, './test/__mocks__/vscode.ts'),
    },
  },
});
