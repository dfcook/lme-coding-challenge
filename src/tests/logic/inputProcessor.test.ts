import { processInput } from './../../client/logic/inputProcessor';

describe('inputProcessor', () => {
  test('Successfully processes a defined run', () => {
    const input = `5 3
      1 1 E
      RFRFRFRF
      3 2 N
      FRRFLLFFRRFLL
      0 3 W
      LLFFFLFLFL
    `;

    const movedRobots = processInput(input);
    expect(movedRobots).toStrictEqual([
      { location: { x: 1, y: 1 }, orientation: 'E', lost: false },
      { location: { x: 3, y: 3 }, orientation: 'N', lost: true },
      { location: { x: 2, y: 3 }, orientation: 'S', lost: false },
    ]);
  });
});
