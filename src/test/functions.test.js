import { calculateAngle, calculateEndCoords } from '../utils/arcs';
import getWinner from '../utils/logic';

describe('testing spinner functions', () => {
  test('trivial test - is jest running?', () => {
    expect(true).toBe(true);
  });
  describe('testing arc functions', () => {
    describe('calculateAngle', () => {
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
      test('coordinates should be rounded to two decimal places', () => {
        const angle = 19;
        const expectedCoordinates = {
          x: 64.65,
          y: 7.45,
        };
        const result = calculateEndCoords(angle);
        expect(result).toMatchObject(expectedCoordinates);
      });
    });
  });
  describe('testing logic functions', () => {
    describe('getWinner', () => {
      test('should return a string', () => {
        const angle = 90;
        const choices = ['Waldo'];
        const expectedType = 'string';
        expect(expectedType).toBe(typeof getWinner(angle, choices));
      });
      test('should return correct option for single choice', () => {
        const angle = 90;
        const choices = ['Waldo'];
        const expectedWinner = 'Waldo';
        const actualWinner = getWinner(angle, choices);
        expect(expectedWinner).toBe(actualWinner);
      });
      test('should return correct option for multiple choices (angle < 180deg)', () => {
        const angle = 75;
        const choices = ['Waldo', 'Pip'];
        const expectedWinner = 'Waldo';
        const actualWinner = getWinner(angle, choices);
        expect(expectedWinner).toBe(actualWinner);
      });
      test('should return correct option for multiple choices (angle > 180deg)', () => {
        const angle = 190;
        const choices = ['Waldo', 'Pip'];
        const expectedWinner = 'Pip';
        const actualWinner = getWinner(angle, choices);
        expect(expectedWinner).toBe(actualWinner);
      });
      test('should return correct option for multiple choices (various angles)', () => {
        let angle = 10;
        let choices = ['Waldo', 'Pip', 'Polar', 'Skye'];
        let expectedWinner = 'Waldo';
        let actualWinner = getWinner(angle, choices);
        expect(expectedWinner).toBe(actualWinner);

        angle = 100;
        choices = ['Waldo', 'Pip', 'Polar', 'Skye'];
        expectedWinner = 'Pip';
        actualWinner = getWinner(angle, choices);
        expect(expectedWinner).toBe(actualWinner);

        angle = 180;
        choices = ['Waldo', 'Pip', 'Polar', 'Skye'];
        expectedWinner = 'Polar';
        actualWinner = getWinner(angle, choices);
        expect(expectedWinner).toBe(actualWinner);

        angle = 300;
        choices = ['Waldo', 'Pip', 'Polar', 'Skye'];
        expectedWinner = 'Skye';
        actualWinner = getWinner(angle, choices);
        expect(expectedWinner).toBe(actualWinner);
      });
      test('should return correct option for angles greater than 360', () => {
        let angle = 370;
        let choices = ['Waldo', 'Pip', 'Polar', 'Skye'];
        let expectedWinner = 'Waldo';
        let actualWinner = getWinner(angle, choices);
        expect(expectedWinner).toBe(actualWinner);

        angle = 500;
        choices = ['Waldo', 'Pip', 'Polar', 'Skye'];
        expectedWinner = 'Pip';
        actualWinner = getWinner(angle, choices);
        expect(expectedWinner).toBe(actualWinner);

        angle = 600;
        choices = ['Waldo', 'Pip', 'Polar', 'Skye'];
        expectedWinner = 'Polar';
        actualWinner = getWinner(angle, choices);
        expect(expectedWinner).toBe(actualWinner);

        angle = 710;
        choices = ['Waldo', 'Pip', 'Polar', 'Skye'];
        expectedWinner = 'Skye';
        actualWinner = getWinner(angle, choices);
        expect(expectedWinner).toBe(actualWinner);
      });
    });
  });
});
