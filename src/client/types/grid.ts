export type GridCoordinate = {
  readonly x: number;
  readonly y: number;
};

export type Surface = GridCoordinate;

export enum Orientation {
  N = 'N',
  S = 'S',
  E = 'E',
  W = 'W',
}

export enum Movement {
  L = 'L',
  R = 'R',
  F = 'F',
}
