import { logDatabaseError } from '../../_tools';
import { EntityRepository, Repository } from 'typeorm';
import { SystemStates } from '../entities/system.states.entity';
import { SystemFilterDTO } from '../dtos/system-filter.dto';

@EntityRepository(SystemStates)
export class SystemStatesRepository extends Repository<SystemStates> {
  async getStates(
    filter: SystemFilterDTO,
  ): Promise<{ data: SystemStates[]; count: number }> {
    let state: SystemStates[];
    const { country } = filter;
    const leftJoinAndSelect = {
      c: 's.country',
    };
    let filters = {};
    if (country) {
      filters = { ...filters, country };
    }
    try {
      state = await this.find({
        join: {
          alias: 's',
          leftJoinAndSelect,
        },
        where: { ...filters },
      });
    } catch (error) {
      console.error(error);
      logDatabaseError('state', error);
    }
    return { data: state, count: state.length };
  }
}
