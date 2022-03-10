import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersProfilesRepository } from '../users/repositories/users.profiles.repository';
import { UsersRepository } from '../users/repositories/users.repository';
import { Users } from '../users/entities/users.entity';
import { UsersProfiles } from '../users/entities/users.profiles.entity';
import { JwtPayloadDTO } from './dtos/jwtPayload.dto';

const logger = new Logger('JwtStrategy');
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersProfilesRepository)
    private profileRepository: UsersProfilesRepository,

    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        'RXYTLE!S6SnJMQBvrFq*RsTC%rIU574R13dYsJByI4j80NFkCJT9Gi2rAOX!@kAH!TGVaPn#6w1pD4iKJ21VvWX^2HQ8&j$yD$y',
    });
  }

  async validate(payload: JwtPayloadDTO): Promise<{
    user: Users;
    profile: UsersProfiles;
  }> {
    const { uid, pid } = payload;

    const user = await this.userRepository.getUserById(uid);

    const profile = await this.profileRepository.getProfileById(pid);
    if (!user) {
      logger.error('The user must be loggedin');
      throw new UnauthorizedException(
        'You need to be login to make this action.',
      );
    }
    return { user, profile };
  }
}
