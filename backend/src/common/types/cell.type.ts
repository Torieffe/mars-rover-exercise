//Default type for the cell, which makes up the planet

import { Rover } from './';
import { Obstacle } from './';

export type Cell = {
  rover?: Rover;
  obstacle?: Obstacle;
  empty?: boolean;
};
