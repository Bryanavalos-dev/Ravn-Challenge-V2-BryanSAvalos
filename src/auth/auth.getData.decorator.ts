import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UsersProfilesRepository } from 'src/users/repositories/users.profiles.repository';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { Users } from '../users/entities/users.entity';
import { JwtStrategy } from './jwt.strategy';

export const GetAuthData = createParamDecorator(
  (data, ctx: ExecutionContext): any => {
    const req = ctx.switchToHttp().getRequest();

    switch (data) {
      case 'user':
        return req.user.user;

      case 'profile':
        return req.user.profile;

      default:
        return req.user;
    }
  },
);
