import { fallenOffSurface } from './movement';
import { Robot } from './../types/robot';
import { Surface, Movement, GridCoordinate, Orientation } from './../types/grid';
import { any, filter, map } from 'ramda';

type RobotWithMovements = {
  robot: Robot;
  movements: Movement[];
};

export type SurfaceInput = {
  surface: Surface;
  robots: RobotWithMovements[];
};

export const MAX_COORDINATE_VALUE = 50;

export const parseGridCoordinates = (input: string): GridCoordinate => {
  const split = input.split(/\s+/g);
  if (split.length !== 2) {
    throw new Error(`Expected 2 co-ordinates for the surface of Mars, received ${split.length}`);
  }

  const coords = map((i) => Number.parseInt(i, 10), split);
  if (any(Number.isNaN, coords)) {
    throw new Error('Non-numeric co-ordinate received for the surface of Mars');
  }

  if (any((i) => i < 0, coords)) {
    throw new Error('Negative co-ordinate received for the surface of Mars');
  }

  if (any((i) => i > MAX_COORDINATE_VALUE, coords)) {
    throw new Error(`Value > ${MAX_COORDINATE_VALUE} received for the surface of Mars`);
  }

  return { x: coords[0], y: coords[1] };
};

export const parseRobot = (input: string, surface: Surface): Robot => {
  const split = input.split(/\s+/g);
  if (split.length !== 3) {
    throw new Error(`Expected 3 inputs for robot, received ${split.length}`);
  }

  const location = parseGridCoordinates(`${split[0]} ${split[1]}`);

  if (!(split[2] in Orientation)) {
    throw new Error('Invalid orientation passed, expected N, S, E or W');
  }

  return {
    location,
    orientation: <Orientation>split[2],
    lost: fallenOffSurface(location, surface),
  };
};

export const parseMovements = (input: string): Movement[] => {
  return map(
    (c: string) => {
      if (!(c in Movement)) {
        throw new Error('Invalid movement passed, expected F, L or R');
      }

      return <Movement>c;
    },
    [...input],
  );
};

export const parseInput = (input: string | string[]): SurfaceInput => {
  const lines = Array.isArray(input) ? input : input.split('\n');
  const trimmedAndFiltered = filter(
    (l: string) => l.length > 0,
    map((l) => l.trim(), lines),
  );

  let surface = null;
  const robots: RobotWithMovements[] = [];

  for (let idx = 0; idx < trimmedAndFiltered.length; idx++) {
    if (idx === 0) {
      surface = parseGridCoordinates(trimmedAndFiltered[idx]);
    } else if (idx % 2 === 1) {
      // 1st line of robot
      if (idx === trimmedAndFiltered.length - 1) {
        // Missing movement line
        throw new Error(`Robot ${robots.length + 1} is missing movements!`);
      }

      robots.push({
        robot: parseRobot(trimmedAndFiltered[idx], surface!), //eslint-disable-line @typescript-eslint/no-non-null-assertion
        movements: parseMovements(trimmedAndFiltered[idx + 1]),
      });
    }
  }

  if (surface && robots.length) {
    return {
      surface,
      robots,
    };
  }

  throw new Error('Unable to parse input, please check and retry');
};
