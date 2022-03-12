import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Users } from '../users/entities/users.entity';
import { UsersProfilesRepository } from '../users/repositories/users.profiles.repository';
import { UsersRepository } from '../users/repositories/users.repository';
import { JwtStrategy } from './jwt.strategy';

export const GetUserData = createParamDecorator(
  async (ctx: ExecutionContext): Promise<boolean | Users> => {
    console.log(ctx);

    const req = ctx.switchToHttp().getRequest();

    const jwtStrategy = new JwtStrategy(
      new UsersProfilesRepository(),
      new UsersRepository(),
    );
    const header = req.rawHeaders.find((r) => r.startsWith('Bearer '));
    const secret =
      'RXYTLE!S6SnJMQBvrFq*RsTC%rIU574R13dYsJByI4j80NFkCJT9Gi2rAOX!@kAH!TGVaPn#6w1pD4iKJ21VvWX^2HQ8&j$yD$y';
    let user;
    if (header) {
      user = jwtStrategy.verify(header.replace('Bearer ', ''), secret);
      const data = await jwtStrategy.validate(
        { uid: user.uid, pid: user.pid },
        false,
      );
      console.log(data);
    }

    return false;
  },
);
