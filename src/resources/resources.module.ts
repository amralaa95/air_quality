import { Module } from '@nestjs/common';

import { IQAirModule } from './iq_air';

@Module({
  controllers: [],
  providers: [],
  imports: [IQAirModule]

})
export class ResourcesModule { }
