import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Constants } from '../constants/constants';

@Injectable()
export class CommandsGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest(); //Get the request that the client sent

    for (let i = 0; i < request.body.commands.length; i++) {
      //If the given command is not in the array of possible commands, throw an error, otherwise return true
      if (!Constants.POSSIBLE_COMMANDS.some((element) => element == request.body.commands[i]))
        throw new BadRequestException('Command should be one of the following: F, B, L, R');
    }
    return true;
  }
}
