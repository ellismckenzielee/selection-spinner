const { calculateAngle, calculateEndCoords } = require('../utils/arcs');

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
    describe('calculateEndCoords', () => {
      test('should return an object', () => {
        const angle = 45;
        const expectedType = 'object';
        const result = calculateEndCoords(angle);
        expect(typeof result).toBe(expectedType);
      });
      test('return object should have x and y keys with numeric values', () => {
        const angle = 45;
        const expectedCoordinates = {
          x: expect.any(Number),
          y: expect.any(Number),
        };
        const result = calculateEndCoords(angle);

        expect(result).toMatchObject(expectedCoordinates);
      });
      test('return object should have correct coordinates for 0 deg', () => {
        const angle = 0;
        const expectedCoordinates = {
          x: 50,
          y: 5,
        };
        const result = calculateEndCoords(angle);

        expect(result).toMatchObject(expectedCoordinates);
      });
      test('return object should have correct coordinates for 360 deg', () => {
        const angle = 360;
        const expectedCoordinates = {
          x: 50,
          y: 5,
        };
        const result = calculateEndCoords(angle);
        expect(result).toMatchObject(expectedCoordinates);
      });
      test('return object should have correct coordinates for 90 deg', () => {
        const angle = 90;
        const expectedCoordinates = {
          x: 95,
          y: 50,
        };
        const result = calculateEndCoords(angle);
        expect(result).toMatchObject(expectedCoordinates);
      });
      test('return object should have correct coordinates for 180 deg', () => {
        const angle = 180;
        const expectedCoordinates = {
          x: 50,
          y: 95,
        };
        const result = calculateEndCoords(angle);
        expect(result).toMatchObject(expectedCoordinates);
      });
      test('return object should have correct coordinates for 270 deg', () => {
        const angle = 270;
        const expectedCoordinates = {
          x: 5,
          y: 50,
        };
        const result = calculateEndCoords(angle);
        expect(result).toMatchObject(expectedCoordinates);
      });
    });
  });
});
