import { GridCoordinate, Orientation } from './grid';

export type Robot = {
  location: GridCoordinate;
  orientation: Orientation;
  lost: boolean;
};
