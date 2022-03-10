import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersProfilesRepository } from '../users/repositories/users.profiles.repository';
import { UsersRepository } from '../users/repositories/users.repository';
import { AuthController } from './controllers/auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret:
        'RXYTLE!S6SnJMQBvrFq*RsTC%rIU574R13dYsJByI4j80NFkCJT9Gi2rAOX!@kAH!TGVaPn#6w1pD4iKJ21VvWX^2HQ8&j$yD$y',
      signOptions: {
        expiresIn: '1h',
      },
    }),
    TypeOrmModule.forFeature([UsersRepository, UsersProfilesRepository]),
  ],
  exports: [JwtStrategy, PassportModule, AuthService],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
