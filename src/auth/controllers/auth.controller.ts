import { ResponseMinimalDTO } from '../../_dtos/responseList.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { AuthDTO } from '../dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async processLogin(
    @Body() authDto: AuthDTO,
  ): Promise<{ access_token: string; refresh_token: string }> {
    return this.authService.processLogin(authDto);
  }
}
