import { Injectable } from '@nestjs/common';
import { Repository } from 'sequelize-typescript';
import { ZonePollution, ZonePollutionModel } from '../../dbmodels/models';
import { DatabaseProvider, IQAirProvider } from '../../providers';

@Injectable()
export class IQAirService {
  private repository: Repository<ZonePollutionModel>;
  private iqAirProvider: IQAirProvider;

  constructor(dbProvider: DatabaseProvider, iqAirProvider: IQAirProvider) {
    this.repository = dbProvider.getRepository(ZonePollutionModel);
    this.iqAirProvider = iqAirProvider;

  }

  async findZonePollution(lon: string, lat: string): Promise<ZonePollution[]> {
    return this.repository.findAll({ where: { longitude: lon, latitude: lat }, raw: true });
  }

  async getNearestCityData(lon: string, lat: string) {
    return this.iqAirProvider.getNearestCityData(lon, lat);
  }
}