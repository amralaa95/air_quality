import { Module } from '@nestjs/common';
import { DatabaseProvider, IQAirProvider } from '../providers';
import { IQAirService } from '../resources/iq_air/iq_air.service';
import { CronjobsService } from './cronjobs.service';

@Module({
  providers: [DatabaseProvider, IQAirProvider, IQAirService, CronjobsService]
})
export class CronjobsModule {}
