//Class to define how the input data for the commands needs to be structured

import { ArrayNotEmpty, IsArray } from 'class-validator';

export class CommandsDto {
  @IsArray() //If it is not an array, return error
  @ArrayNotEmpty() //If the array is empty, return error
  commands: Array<string>;
}
