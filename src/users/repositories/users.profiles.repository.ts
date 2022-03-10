import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { UsersProfiles } from '../entities/users.profiles.entity';

@EntityRepository(UsersProfiles)
export class UsersProfilesRepository extends Repository<UsersProfiles> {
  async getProfileById(id: number): Promise<UsersProfiles> {
    try {
      const profile = await this.createQueryBuilder('p').where({ id }).getOne();
      return profile;
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong getting the selected profile.',
      );
    }
  }
}
