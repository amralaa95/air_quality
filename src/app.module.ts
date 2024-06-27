import { Module } from '@nestjs/common';
import { ResourcesModule } from './resources';
import { DatabaseProvider, IQAirProvider } from './providers';
import { ConfigModule } from '@nestjs/config';
import {
  fromSettings,
} from './lib/settings-loader';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [fromSettings],
  }), ResourcesModule],
  providers: [DatabaseProvider, IQAirProvider],
})
export class AppModule { }
