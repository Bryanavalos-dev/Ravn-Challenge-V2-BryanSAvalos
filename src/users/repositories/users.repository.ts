import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Users } from '../entities/users.entity';

const logger = new Logger('UsersRepository');

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
  async getUserById(id: string): Promise<Users> {
    try {
      const user = await this.createQueryBuilder('u')
        .where({ id })
        .leftJoinAndSelect('u.profile', 'p')
        .orderBy('u.names', 'ASC')
        .getOne();
      return user;
    } catch (error) {
      logger.error(error);
      throw new InternalServerErrorException('Something went wrong.');
    }
  }

  async getUserByEmail(email: string): Promise<Users> {
    try {
      const user = await this.createQueryBuilder('u')
        .where({ email })
        .leftJoinAndSelect('u.profile', 'p')
        .getOne();
      return user;
    } catch (error) {
      logger.error(error);
      throw new InternalServerErrorException('Something went wrong.');
    }
  }
}
