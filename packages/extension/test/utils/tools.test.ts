import { describe, it, expect } from 'vitest';
import { camelCase, upperFirst, kebabCase } from '@utils/tools';

describe('Tool Utils', () => {
  describe('camelCase', () => {
    it('should convert kebab-case to camelCase', () => {
      expect(camelCase('hello-world')).toBe('helloWorld');
      expect(camelCase('my-component-name')).toBe('myComponentName');
    });

    it('should handle single word', () => {
      expect(camelCase('hello')).toBe('hello');
    });

    it('should handle empty string', () => {
      expect(camelCase('')).toBe('');
    });
  });

  describe('upperFirst', () => {
    it('should uppercase first letter', () => {
      expect(upperFirst('hello')).toBe('Hello');
      expect(upperFirst('world')).toBe('World');
    });

    it('should handle already uppercase', () => {
      expect(upperFirst('Hello')).toBe('Hello');
    });

    it('should handle empty string', () => {
      expect(upperFirst('')).toBe('');
    });
  });

  describe('kebabCase', () => {
    it('should convert camelCase to kebab-case', () => {
      expect(kebabCase('helloWorld')).toBe('hello-world');
      expect(kebabCase('myComponentName')).toBe('my-component-name');
    });

    it('should handle already kebab-case', () => {
      expect(kebabCase('hello-world')).toBe('hello-world');
    });
  });
});
