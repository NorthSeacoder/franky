import { describe, it, expect } from 'vitest';

describe('Extension Entry Point', () => {
  it('should have activation and deactivation functions', async () => {
    // Test that the main module exports required functions
    const { activate, deactivate } = await import('../src/index');

    expect(typeof activate).toBe('function');
    expect(typeof deactivate).toBe('function');
  });
});
