import { moveRobotOnSurface } from './movement';
import { forEach, map } from 'ramda';
import { parseInput } from './parser';
import { Robot } from '../types/robot';

export const processInput = (input: string | string[]): Robot[] => {
  const initialState = parseInput(input);

  return map((r) => {
    let moved = r.robot;

    forEach((m) => {
      moved = moveRobotOnSurface(moved, m, initialState.surface);
    }, r.movements);

    return moved;
  }, initialState.robots);
};
