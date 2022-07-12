import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Constants } from '../constants/constants';

@Injectable()
export class InitGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    //If the given direction is in the array of possible directions return true, otherwise throw an error
    if (Constants.POSSIBLE_DIRECTIONS.some((element) => element == request.body.roverFacingDirection)) return true;

    throw new BadRequestException('Facing direction should be one of the following: N, S, E, W');
  }
}
