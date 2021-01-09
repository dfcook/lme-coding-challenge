import { Movement, Orientation } from '../../client/types/grid';
import { moveRobotOnSurface } from '../../client/logic/movement';
import { Robot } from '../../client/types/robot';

interface MovementTestCase {
  initial: Robot;
  movements: string;
  expected: Robot;
}

describe('move', () => {
  const surface = { x: 5, y: 3 };

  const cases: MovementTestCase[] = [
    {
      initial: { location: { x: 1, y: 1 }, orientation: Orientation.E, lost: false },
      movements: 'RFRFRFRF',
      expected: { location: { x: 1, y: 1 }, orientation: Orientation.E, lost: false },
    },
    {
      initial: { location: { x: 3, y: 2 }, orientation: Orientation.N, lost: false },
      movements: 'FRRFLLFFRRFLL',
      expected: { location: { x: 3, y: 3 }, orientation: Orientation.N, lost: true },
    },
    {
      initial: { location: { x: 0, y: 3 }, orientation: Orientation.W, lost: false },
      movements: 'LLFFFLFLFL',
      expected: { location: { x: 2, y: 3 }, orientation: Orientation.S, lost: false },
    },
  ];

  test.each(cases)(
    'Correctly moves robot to expected position',
    ({ initial, movements, expected }: MovementTestCase) => {
      let actual: Robot = initial;

      [...movements].forEach((m) => {
        actual = moveRobotOnSurface(actual, <Movement>m, surface);
      });

      expect(actual).toStrictEqual(expected);
    },
  );
});
