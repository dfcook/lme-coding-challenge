import { Orientation, Movement } from './../../client/types/grid';
import {
  parseGridCoordinates,
  parseRobot,
  MAX_COORDINATE_VALUE,
  parseMovements,
  parseInput,
} from './../../client/logic/parser';

describe('parser', () => {
  describe('parseGridCoordinates', () => {
    test.each([
      ['1 2 3', 3],
      ['1', 1],
    ])('Should throw error when %1 co-ordinates passed', (input: string, expected: number) => {
      expect(() => parseGridCoordinates(input)).toThrowError(
        `Expected 2 co-ordinates for the surface of Mars, received ${expected}`,
      );
    });

    test.each([['a 1'], ['1 b'], ['a b']])(
      'Should throw error when non-numeric co-ordinates passed',
      (input: string) => {
        expect(() => parseGridCoordinates(input)).toThrowError(
          'Non-numeric co-ordinate received for the surface of Mars',
        );
      },
    );

    test.each([['3 51'], ['51 6'], ['51 100']])(
      `Should throw error when co-ordinates > ${MAX_COORDINATE_VALUE} passed`,
      (input: string) => {
        expect(() => parseGridCoordinates(input)).toThrowError(
          `Value > ${MAX_COORDINATE_VALUE} received for the surface of Mars`,
        );
      },
    );

    test.each([['3 -1'], ['-1 6'], ['-1 -100']])(
      'Should throw error when negative co-ordinates passed',
      (input: string) => {
        expect(() => parseGridCoordinates(input)).toThrowError('Negative co-ordinate received for the surface of Mars');
      },
    );

    test('Should successfully parse surface', () => {
      const surface = parseGridCoordinates('3 9');
      expect(surface).toStrictEqual({ x: 3, y: 9 });
    });
  });

  describe('parseRobot', () => {
    const surface = {
      x: 5,
      y: 3,
    };

    test.each([
      ['1 2 E 4', 4],
      ['1', 1],
    ])('Should throw error when %1 inputs passed', (input: string, expected: number) => {
      expect(() => parseRobot(input, surface)).toThrowError(`Expected 3 inputs for robot, received ${expected}`);
    });

    test.each([['1 2 F'], ['1 3 1']])('Should throw error when invalid orientation passed', (input: string) => {
      expect(() => parseRobot(input, surface)).toThrowError('Invalid orientation passed, expected N, S, E or W');
    });

    test('Should successfully parse a robot on the surface of Mars', () => {
      const robot = parseRobot('1 1 N', surface);
      expect(robot).toStrictEqual({
        location: { x: 1, y: 1 },
        orientation: Orientation.N,
        lost: false,
      });
    });

    test('Should successfully parse a lost robot', () => {
      const robot = parseRobot('6 9 W', surface);
      expect(robot).toStrictEqual({
        location: { x: 6, y: 9 },
        orientation: Orientation.W,
        lost: true,
      });
    });
  });

  describe('parseMovements', () => {
    test.each([['RFLLM'], ['ABCSD'], ['1234']])('Should throw error when invalid input passed', (input: string) => {
      expect(() => parseMovements(input)).toThrowError('Invalid movement passed, expected F, L or R');
    });

    test('Successfully parses an array of movements', () => {
      const movements = parseMovements('LLFFFLRLRRF');
      expect(movements).toStrictEqual([
        Movement.L,
        Movement.L,
        Movement.F,
        Movement.F,
        Movement.F,
        Movement.L,
        Movement.R,
        Movement.L,
        Movement.R,
        Movement.R,
        Movement.F,
      ]);
    });
  });

  describe('parseInput', () => {
    test('Successfully parses complete input string', () => {
      const input = `5 3
      1 1 E
      RFRFRFRF
      3 2 N
      FRRFLLFFRRFLL
      0 3 W
      LLFFFLFLFL
      `;

      expect(parseInput(input)).toStrictEqual({
        surface: { x: 5, y: 3 },
        robots: [
          {
            robot: {
              location: { x: 1, y: 1 },
              orientation: Orientation.E,
              lost: false,
            },
            movements: ['R', 'F', 'R', 'F', 'R', 'F', 'R', 'F'],
          },
          {
            robot: {
              location: { x: 3, y: 2 },
              orientation: Orientation.N,
              lost: false,
            },
            movements: ['F', 'R', 'R', 'F', 'L', 'L', 'F', 'F', 'R', 'R', 'F', 'L', 'L'],
          },
          {
            robot: {
              location: { x: 0, y: 3 },
              orientation: Orientation.W,
              lost: false,
            },
            movements: ['L', 'L', 'F', 'F', 'F', 'L', 'F', 'L', 'F', 'L'],
          },
        ],
      });
    });
  });
});
