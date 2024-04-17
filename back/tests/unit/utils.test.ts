import isSameLocation from '../../src/app/utils/isSameLocation';
import isValidLocation from '../../src/app/utils/isValidLocation';
import validateFloatParam from '../../src/app/utils/validateFloatParam';
import validateIntParam from '../../src/app/utils/validateIntParam';

describe('Utility Functions', () => {
  describe('isSameLocation', () => {
    it('should return true for the same location', () => {
      expect(
        isSameLocation(
          {
            lat: 1,
            lng: 1,
            alt: 0,
          },
          {
            lat: 1,
            lng: 1,
            alt: 0,
          },
        ),
      ).toBeTruthy();
    });

    it('should return false for different locations', () => {
      expect(
        isSameLocation(
          {
            lat: 0,
            lng: 0,
            alt: 0,
          },
          {
            lat: 1,
            lng: 1,
            alt: 0,
          },
        ),
      ).toBeFalsy();
    });
  });

  describe('isValidLocation', () => {
    it('should return true for a valid location', () => {
      expect(
        isValidLocation({
          lat: 48.8588443,
          lng: 2.2943506,
          alt: 0,
        }),
      ).toBeTruthy();
    });

    it('should return false for an unvalid location', () => {
      expect(
        isValidLocation({
          lat: 91,
          lng: 2.2943506,
          alt: 0,
        }),
      ).toBeFalsy();
    });
  });

  describe('validateFloatParam', () => {
    it('should return the float value', () => {
      expect(validateFloatParam('1.1', 'param')).toBe(1.1);
    });

    it('should throw an error for an invalid float value', () => {
      expect(() => validateFloatParam('a', 'param')).toThrow();
    });
  });

  describe('validateIntParam', () => {
    it('should return the int value', () => {
      expect(validateIntParam('1', 'param')).toBe(1);
    });

    it('should throw an error for an invalid int value', () => {
      expect(() => validateIntParam('a', 'param')).toThrow();
    });
  });
});
