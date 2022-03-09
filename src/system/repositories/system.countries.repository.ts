import { logDatabaseError } from '../../_tools';
import { EntityRepository, Repository } from 'typeorm';
import { SystemCountries } from '../entities/system.countries.entity';

@EntityRepository(SystemCountries)
export class SytemCountriesRepository extends Repository<SystemCountries> {
  async getCountries(): Promise<{ data: SystemCountries[]; count: number }> {
    let country: SystemCountries[];

    try {
      country = await this.find();
    } catch (error) {
      console.error(error);
      logDatabaseError('paises', error);
    }
    return { data: country, count: country.length };
  }
}
