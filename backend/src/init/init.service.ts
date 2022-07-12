import { Injectable } from '@nestjs/common';
import { Constants } from 'src/common/constants/constants';
import { InitDto } from 'src/common/dto';
import { Planet } from 'src/common/types';

@Injectable()
export class InitService {
  constructor() {}

  generateTerrain(dto: InitDto) {
    let planet: Planet = { terrain: [] }; //Instances an empty planet

    for (let i = 0; i < dto.planetSize; i++) {
      planet.terrain.push(Array(dto.planetSize).fill(Constants.EMPTY_CELL)); //Fills the planet with empty cells
    }

    //Inserts the rover into the planet
    planet.terrain[dto.roverStartingX][dto.roverStartingY] = {
      rover: {
        facingDirection: dto.roverFacingDirection,
        coordinateX: dto.roverStartingX,
        coordinateY: dto.roverStartingY,
      },
    };

    //Inserts the randomly generated obstacles into the planet
    for (let i = 0; i < planet.terrain.length; i++) {
      for (let j = 0; j < planet.terrain[i].length; j++) {
        if (!planet.terrain[i][j].rover) {
          let possibleObstacle = this.getRandomInt(dto.planetObstacleDensity);
          if (possibleObstacle != false) {
            planet.terrain[i][j] = possibleObstacle;
          }
        }
      }
    }

    return planet;
  }
  //Helper functions
  getRandomInt(density) {
    //Generates a random integer and returns an obstacle with a given probability
    let generatedNumber = Math.floor(Math.random() * Constants.PERCENTAGE);

    if (generatedNumber <= density) return { obstacle: { name: Constants.OBSTACLES[0] } };
    return false;
  }
}
