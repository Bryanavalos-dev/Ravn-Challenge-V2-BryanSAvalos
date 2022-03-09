import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemCitiesRepository } from './repositories/system.cities.repository';
import { SytemCountriesRepository } from './repositories/system.countries.repository';
import { SystemStatesRepository } from './repositories/system.states.repository';
import { SystemService } from './services/system.service';
import { SystemController } from './controllers/system.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SystemCitiesRepository,
      SytemCountriesRepository,
      SystemStatesRepository,
    ]),
  ],
  exports: [SystemService],
  controllers: [SystemController],
  providers: [SystemService],
})
export class SystemModule {}
