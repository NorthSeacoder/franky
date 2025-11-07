import { afterEach, vi } from 'vitest';

// Reset all mocks after each test
afterEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
});
