import { logDatabaseError } from '../../_tools';
import { EntityRepository, Repository } from 'typeorm';
import { SystemCities } from '../entities/system.cities.entity';
import { SystemFilterDTO } from '../dtos/system-filter.dto';

@EntityRepository(SystemCities)
export class SystemCitiesRepository extends Repository<SystemCities> {
  async getCities(
    filter: SystemFilterDTO,
  ): Promise<{ data: SystemCities[]; count: number }> {
    let cities: SystemCities[];
    const { state } = filter;
    const leftJoinAndSelect = {
      s: 'c.state',
    };
    let filters = {};
    if (state) {
      filters = { ...filters, state };
    }
    try {
      cities = await this.find({
        join: {
          alias: 'c',
          leftJoinAndSelect,
        },
        where: { ...filters },
      });
    } catch (error) {
      console.error(error);
      logDatabaseError('cities', error);
    }
    return { data: cities, count: cities.length };
  }
}
