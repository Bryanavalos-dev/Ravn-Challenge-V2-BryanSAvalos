import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersProfilesRepository } from './repositories/users.profiles.repository';
import { UsersRepository } from './repositories/users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository, UsersProfilesRepository]),
  ],
})
export class UsersModule {}
