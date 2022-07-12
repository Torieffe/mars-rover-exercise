//Constants

import { Cell } from '../types';

export abstract class Constants {
  static readonly MINIMUM_COORDINATE: number = 0; //Used to determine the minumim coordinate that the APIs accept from the client
  static readonly STEP_VALUE: number = 1; //How much the rover moves with a given command
  static readonly OBSTACLES: string[] = ['Rock']; //List of possible obstacles
  static readonly ADD_FOR_FLOOR: number = 1; //Number to add to correctly generate the random obstacles
  static readonly EMPTY_CELL: Cell = { empty: true }; //Empty cell object
  static readonly PERCENTAGE: number = 100; //The maximum percentage for the random obstacle generation
  static readonly POSSIBLE_DIRECTIONS = ['N', 'E', 'S', 'W']; //List of possible directions that the APIs accept from the client
  static readonly POSSIBLE_COMMANDS = ['F', 'B', 'L', 'R']; //List of possible commands that the APIs accept from the client
  static readonly PORT = 3001; //Port in which the APIs are exposed
}
