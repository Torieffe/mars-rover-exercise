import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CommandsGuard, InitGuard } from 'src/common/guards';
import { Planet } from 'src/common/types';
import { InitService } from 'src/init/init.service';
import { CommandsDto, InitDto } from '../common/dto';
import { RoverService } from './rover.service';

@Controller()
export class RoverController {
  planet: Planet;

  constructor(private roverService: RoverService, private initService: InitService) {}

  @Post('initialize') //Name and type of the endpoint
  @UseGuards(InitGuard) //Guard to prevent the execution of the function in case the parameters are not correct
  initialize(@Body() dto: InitDto) {
    //Function to call planet generation
    this.planet = this.initService.generateTerrain(dto);
    return this.planet;
  }

  @Post('move') //Name and type of the endpoint
  @UseGuards(CommandsGuard) //Guard to prevent the execution of the function in case the parameters are not correct
  moveRover(@Body() dto: CommandsDto) {
    //Function to execute movements
    const executedMovements = this.roverService.execute(dto, this.planet);
    this.planet = executedMovements.planet;

    return { isCollided: executedMovements.isCollided, planet: this.planet };
  }
}
