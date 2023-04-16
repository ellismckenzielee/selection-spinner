const { calculateAngle } = require('../utils/arcs');

describe('testing spinner functions', () => {
  test('trivial test - is jest running?', () => {
    expect(true).toBe(true);
  });
  describe('testing arc functions', () => {
    describe('calculate angle', () => {
      test('returns a number', () => {
        const numberOfSegments = 1;
        const expectedType = 'number';
        const result = calculateAngle(numberOfSegments);
        expect(typeof result).toBe(expectedType);
      });
      test('returns 360 for a single segment', () => {
        const numberOfSegments = 1;
        const expectedAngle = 360;
        const result = calculateAngle(numberOfSegments);
        expect(result).toBe(expectedAngle);
      });
      test('returns 180 for two segments', () => {
        const numberOfSegments = 2;
        const expectedAngle = 180;
        const result = calculateAngle(numberOfSegments);
        expect(result).toBe(expectedAngle);
      });
      test('returns 90 for four segments', () => {
        const numberOfSegments = 4;
        const expectedAngle = 90;
        const result = calculateAngle(numberOfSegments);
        expect(result).toBe(expectedAngle);
      });
      test('returns a number rounded to 2 decimal places', () => {
        const numberOfSegments = 11;
        const expectedAngle = 32.72;
        const result = calculateAngle(numberOfSegments);
        expect(result).toBe(expectedAngle);
      });
    });
  });
});
