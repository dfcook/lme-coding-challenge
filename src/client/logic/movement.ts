import { lensPath, set, lensProp, contains } from 'ramda';
import { Movement, Orientation, Surface, GridCoordinate } from './../types/grid';
import { Robot } from './../types/robot';

const xLens = lensPath(['location', 'x']);
const yLens = lensPath(['location', 'y']);
const oLens = lensProp('orientation');
const lostLens = lensProp('lost');

const scents: GridCoordinate[] = [];

const moveRobot = (robot: Robot, movement: Movement): Robot => {
  switch (movement) {
    case Movement.F:
      switch (robot.orientation) {
        case Orientation.E:
          return set(xLens, robot.location.x + 1, robot);

        case Orientation.W:
          return set(xLens, robot.location.x - 1, robot);

        case Orientation.N:
          return set(yLens, robot.location.y + 1, robot);

        case Orientation.S:
          return set(yLens, robot.location.y - 1, robot);
      }

    case Movement.R:
      switch (robot.orientation) {
        case Orientation.E:
          return set(oLens, Orientation.S, robot);

        case Orientation.W:
          return set(oLens, Orientation.N, robot);

        case Orientation.N:
          return set(oLens, Orientation.E, robot);

        case Orientation.S:
          return set(oLens, Orientation.W, robot);
      }

    case Movement.L:
      switch (robot.orientation) {
        case Orientation.E:
          return set(oLens, Orientation.N, robot);

        case Orientation.W:
          return set(oLens, Orientation.S, robot);

        case Orientation.N:
          return set(oLens, Orientation.W, robot);

        case Orientation.S:
          return set(oLens, Orientation.E, robot);
      }
  }
};

export const fallenOffSurface = (location: GridCoordinate, surface: Surface): boolean =>
  location.x < 0 || location.y < 0 || location.x > surface.x || location.y > surface.y;

export const moveRobotOnSurface = (robot: Robot, movement: Movement, surface: Surface): Robot => {
  if (robot.lost) {
    return robot;
  }

  const moved = moveRobot(robot, movement);

  if (fallenOffSurface(moved.location, surface)) {
    if (contains(moved.location, scents)) {
      return robot;
    }

    scents.push(moved.location);
    return set(lostLens, true, robot);
  }

  return moved;
};
