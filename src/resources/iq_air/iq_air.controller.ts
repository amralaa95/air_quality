import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { IQAirService } from './iq_air.service';
import { ZonePollution } from '../../dbmodels/models';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('IQAir')
@Controller('iq_air')
export class IQAirController {
  constructor(private readonly service: IQAirService) { }

  @Get('nearst_city')
  async getNearstCityData(@Query('longitude') longitude: number, @Query('latitude') latitude: number){
    const nearestCityData = await this.service.getNearestCityData(longitude, latitude);
    return {
      Result: {
        Pollution: nearestCityData.data.current.pollution
      }
    }
  }

  @Get('hieghst_pollution')
  async getHieghstPollution(@Query('longitude') longitude: number, @Query('latitude') latitude: number): Promise<ZonePollution> {
    return this.service.findHigestZonePollution(longitude, latitude);
  }
}
