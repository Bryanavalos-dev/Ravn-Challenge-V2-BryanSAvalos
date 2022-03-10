import {
  BadRequestException,
  Dependencies,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadDTO } from '../dtos/jwtPayload.dto';
import { v1 as uuidv1 } from 'uuid';
import { ResponseMinimalDTO } from '../../_dtos/responseList.dto';
import { ExtractJwt } from 'passport-jwt';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { AuthDTO } from '../dtos/auth.dto';

const logger = new Logger('AuthService');

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository,

    private jwtService: JwtService,
  ) {}

  async processLogin(
    authDto: AuthDTO,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const { email, password } = authDto;
    const user = await this.userRepository.getUserByEmail(email);

    // If no user exists or wrong password
    if (!user || !bcrypt.compareSync(password, user.password)) {
      logger.log('Invalid email or password' + email);
      throw new UnauthorizedException('Invalid email or password.');
    }

    // If user is inactive
    if (!user.isActive) {
      logger.log(`Inactive user, userId:${user.id}`);
      throw new ForbiddenException(
        'Your user was deactivated, contact support for more information.',
      );
    }
    // Generates token
    const payload: JwtPayloadDTO = {
      uid: user.id,
      pid: user.profile.id,
    };
    const access_token = await this.jwtService.sign(payload, {
      expiresIn: '1h',
    });
    const refresh_token = await this.jwtService.sign(payload);

    return { access_token, refresh_token };
  }
}
@Dependencies(AuthService)
export class AuthDependentService {
  constructor(authService) {
    authService;
  }
}
