import { logDatabaseError } from '../../_tools';
import { EntityRepository, Repository } from 'typeorm';
import { SystemCountries } from '../entities/system.countries.entity';
import { Logger } from '@nestjs/common';

const logger = new Logger('SystemCountries');
@EntityRepository(SystemCountries)
export class SytemCountriesRepository extends Repository<SystemCountries> {
  async getCountries(): Promise<{ data: SystemCountries[]; count: number }> {
    let country: SystemCountries[];

    try {
      country = await this.find();
    } catch (error) {
      logger.error(error);
      logDatabaseError('paises', error);
    }
    return { data: country, count: country.length };
  }
}
