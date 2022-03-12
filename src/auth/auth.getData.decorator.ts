import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UsersProfilesRepository } from 'src/users/repositories/users.profiles.repository';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { JwtStrategy } from './jwt.strategy';
import * as jwt from 'jsonwebtoken';

export const GetAuthData = createParamDecorator(
  async (data, ctx: ExecutionContext): Promise<any> => {
    const req = ctx.switchToHttp().getRequest();

    switch (data.data) {
      case 'user':
        if (!data.logged) {
          const jwtStrategy = new JwtStrategy(
            new UsersProfilesRepository(),
            new UsersRepository(),
          );
          const header = req.rawHeaders.find((r) => r.startsWith('Bearer '));
          const secret =
            'RXYTLE!S6SnJMQBvrFq*RsTC%rIU574R13dYsJByI4j80NFkCJT9Gi2rAOX!@kAH!TGVaPn#6w1pD4iKJ21VvWX^2HQ8&j$yD$y';
          let user;
          if (header) {
            user = jwt.verify(header.replace('Bearer ', ''), secret);
            const data = await jwtStrategy.validate(
              { uid: user.uid, pid: user.pid },
              false,
            );
            return data;
          }
        }
        return req.user.user;

      case 'profile':
        return req.user.profile;

      default:
        return req.user;
    }
  },
);
