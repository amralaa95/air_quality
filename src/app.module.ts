import { Module } from '@nestjs/common';
import { ResourcesModule } from './resources';
import { DatabaseProvider, IQAirProvider } from './providers';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import {
  fromSettings,
} from './lib/settings-loader';
import { CronjobsModule } from './cronjobs/cronjobs.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [fromSettings],
  }), ResourcesModule, ScheduleModule.forRoot(), CronjobsModule],
  providers: [DatabaseProvider, IQAirProvider],
})
export class AppModule { }
