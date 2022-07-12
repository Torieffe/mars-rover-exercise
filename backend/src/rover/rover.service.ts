import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Constants } from 'src/common/constants/constants';
import { CommandsDto } from 'src/common/dto';
import { Planet, Rover } from 'src/common/types';

@Injectable()
export class RoverService {
  collided: boolean; //Collision information
  tempPlanet: Planet; //Temporary planet on which all the operations are done
  rover: Rover; //Temporary rover on which the operations are done

  constructor() {}

  execute(dto: CommandsDto, planet: Planet) {
    this.tempPlanet = planet;
    this.collided = false;

    this.rover = this.findRover();

    //Do the commands until they are done or until a collision is detected
    for (let i = 0; i < dto.commands.length && !this.collided; i++) {
      switch (dto.commands[i]) {
        case 'F':
          this.moveForward(); //Let the helper function move the rover forward
          break;
        case 'B':
          this.moveBackward(); //Let the helper function move the rover backward
          break;
        case 'R': //If there is the need to turn left or right let the helper function turn the rover
        case 'L':
          this.turn(dto.commands[i]);
          break;
      }
    }

    return { planet: this.tempPlanet, isCollided: this.collided };
  }

  //Helper functions

  findRover(): Rover {
    //Find the rover in the planet and return the rover object
    for (let i = 0; i < this.tempPlanet.terrain.length; i++) {
      for (let j = 0; j < this.tempPlanet.terrain.length; j++) {
        if (this.tempPlanet.terrain[i][j].rover) return this.tempPlanet.terrain[i][j].rover;
      }
    }
    throw new InternalServerErrorException('We lost track of the rover!');
  }

  moveForward() {
    let futureX, futureY;
    //switch to do wrapping check and movement direction
    switch (this.rover.facingDirection) {
      case 'N':
        futureX = this.nextX(this.rover.coordinateX - Constants.STEP_VALUE); //Let the helper function handle the wrapping
        futureY = this.rover.coordinateY;
        break;
      case 'S':
        futureX = this.nextX(this.rover.coordinateX + Constants.STEP_VALUE); //Let the helper function handle the wrapping
        futureY = this.rover.coordinateY;
        break;
      case 'E':
        futureY = this.nextY(this.rover.coordinateY + Constants.STEP_VALUE); //Let the helper function handle the wrapping
        futureX = this.rover.coordinateX;
        break;
      case 'W':
        futureY = this.nextY(this.rover.coordinateY - Constants.STEP_VALUE); //Let the helper function handle the wrapping
        futureX = this.rover.coordinateX;
        break;
    }
    //if the next move is not an obstacle then make the move, otherwise return the collision
    if (!this.tempPlanet.terrain[futureX][futureY].obstacle) {
      this.tempPlanet.terrain[this.rover.coordinateX][this.rover.coordinateY] = Constants.EMPTY_CELL; //Empty the cell containing the rover
      this.rover.coordinateX = futureX; //move the rover
      this.rover.coordinateY = futureY;
      this.tempPlanet.terrain[this.rover.coordinateX][this.rover.coordinateY] = { rover: this.rover }; //Insert the rover in the planet
    } else this.collided = true;
  }

  moveBackward() {
    let futureX, futureY;
    //switch to do wrapping check and movement direction
    switch (this.rover.facingDirection) {
      case 'N':
        futureX = this.nextX(this.rover.coordinateX + Constants.STEP_VALUE); //Let the helper function handle the wrapping
        futureY = this.rover.coordinateY;
        break;
      case 'S':
        futureX = this.nextX(this.rover.coordinateX - Constants.STEP_VALUE); //Let the helper function handle the wrapping
        futureY = this.rover.coordinateY;
        break;
      case 'E':
        futureY = this.nextY(this.rover.coordinateY - Constants.STEP_VALUE); //Let the helper function handle the wrapping
        futureX = this.rover.coordinateX;
        break;
      case 'W':
        futureY = this.nextY(this.rover.coordinateY + Constants.STEP_VALUE); //Let the helper function handle the wrapping
        futureX = this.rover.coordinateX;
        break;
    }
    //if the next move is not an obstacle then make the move, otherwise return the collision
    if (!this.tempPlanet.terrain[futureX][futureY].obstacle) {
      this.tempPlanet.terrain[this.rover.coordinateX][this.rover.coordinateY] = Constants.EMPTY_CELL; //Empty the cell containing the rover
      this.rover.coordinateX = futureX;
      this.rover.coordinateY = futureY;
      this.tempPlanet.terrain[this.rover.coordinateX][this.rover.coordinateY] = { rover: this.rover }; //Insert the rover in the planet
    } else this.collided = true;
  }

  turn(command) {
    //Turn the rover based on the direction it is currently facing
    let futureDirection;

    if (command == 'R')
      futureDirection = Constants.POSSIBLE_DIRECTIONS.indexOf(this.rover.facingDirection) + Constants.STEP_VALUE;
    else futureDirection = Constants.POSSIBLE_DIRECTIONS.indexOf(this.rover.facingDirection) - Constants.STEP_VALUE;

    if (futureDirection == Constants.POSSIBLE_DIRECTIONS.length) futureDirection = 0;

    if (futureDirection < 0) futureDirection = Constants.POSSIBLE_DIRECTIONS.length - Constants.STEP_VALUE;

    this.rover.facingDirection = Constants.POSSIBLE_DIRECTIONS[futureDirection];

    return;
  }

  nextX(x): number {
    //Check if the next move will be wrapped, otherwise return the next cell
    if (x == this.tempPlanet.terrain.length) return 0;
    else if (x < 0) return this.tempPlanet.terrain.length - Constants.STEP_VALUE;
    else return x;
  }

  /*Since the length of the terrain arrays is always equal, wrapping is checked only on the first array.
	This can be done as collision detection is not handeld by this function*/
  nextY(y): number {
    //Check if the next move will be wrapped, otherwise return the next cell
    if (y == this.tempPlanet.terrain[0].length) return 0;
    else if (y < 0) return this.tempPlanet.terrain[0].length - Constants.STEP_VALUE;
    else return y;
  }
}
