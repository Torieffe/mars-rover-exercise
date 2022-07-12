import { Module } from '@nestjs/common';
import { InitService } from 'src/init/init.service';
import { RoverController } from './rover.controller';
import { RoverService } from './rover.service';

@Module({
  providers: [RoverService, InitService],
  controllers: [RoverController],
})
export class RoverModule {}
