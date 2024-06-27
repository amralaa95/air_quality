import { Module } from '@nestjs/common';
import { IQAirController } from './iq_air.controller';
import { IQAirService } from './iq_air.service';
import { DatabaseProvider, IQAirProvider } from '../../providers';

@Module({
  imports: [],
  providers: [DatabaseProvider, IQAirService, IQAirProvider],
  controllers: [IQAirController],
})
export class IQAirModule { }
