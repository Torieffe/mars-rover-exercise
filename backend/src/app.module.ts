import { Module } from '@nestjs/common';
import { RoverModule } from './rover/rover.module';
import { InitService } from './init/init.service';

@Module({
  imports: [RoverModule],
  providers: [InitService],
})
export class AppModule {}
