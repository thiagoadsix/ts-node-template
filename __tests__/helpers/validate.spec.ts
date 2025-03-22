import { describe, it, expect } from 'vitest';
import { isValidEmail, isValidLength } from '@helpers/validate';

describe('Validation Helpers', () => {
  describe('isValidEmail', () => {
    it('should return true for valid emails', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
      expect(isValidEmail('user+tag@example.org')).toBe(true);
    });

    it('should return false for invalid emails', () => {
      expect(isValidEmail('test')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('test@domain')).toBe(false);
      expect(isValidEmail('@domain.com')).toBe(false);
      expect(isValidEmail('test@.com')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('isValidLength', () => {
    it('should return true when string meets minimum length', () => {
      expect(isValidLength('hello', 5)).toBe(true);
      expect(isValidLength('hello', 3)).toBe(true);
      expect(isValidLength('hello', 0)).toBe(true);
    });

    it('should return false when string is shorter than minimum length', () => {
      // Arrange & Act & Assert
      expect(isValidLength('hi', 3)).toBe(false);
      expect(isValidLength('', 1)).toBe(false);
    });
  });
});