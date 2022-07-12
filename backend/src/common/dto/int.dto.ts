//Class to define how the input data for the initialization needs to be structured

import { IsNotEmpty, IsNumber, IsPositive, IsString, Min } from 'class-validator';
import { Constants } from '../constants/constants';

export class InitDto {
  @IsNotEmpty() //If it is empty return error
  @IsNumber() //If it is not number return error
  @IsPositive() //return error if it's not strictly greater than zero ( x > 0)
  planetSize: number;

  @IsNotEmpty() //If it is empty return error
  @IsNumber() //If it is not number return error
  @IsPositive() //return error if it's not strictly greater than zero ( x > 0)
  planetObstacleDensity: number;

  @IsNotEmpty() //If it is empty return error
  @IsNumber() //If it is not number return error
  @Min(Constants.MINIMUM_COORDINATE)
  roverStartingX: number;

  @IsNotEmpty() //If it is empty return error
  @IsNumber() //If it is not number return error
  @Min(Constants.MINIMUM_COORDINATE) //The value needs to be at least equal to the given value in order to return true
  roverStartingY: number;

  @IsNotEmpty() //If it is empty return error
  @IsString() //If it is not a string return error
  roverFacingDirection: string;
}
