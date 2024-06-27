import { Injectable } from '@nestjs/common';
import { Repository } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

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

  async findZonePollution(queryString: { [key: string]: string | number}): Promise<ZonePollution> {
    return this.repository.findOne({ where: { ...queryString }, raw: true });
  }

  async findHigestZonePollution(longitude: number, latitude: number): Promise<ZonePollution> {
    return this.repository.findOne({ where: { longitude, latitude }, order: [[ 'aqius', 'DESC' ]], raw: true });
  }

  async createZonePollution(data: ZonePollution) {
    data.id = uuidv4();
    return this.repository.create(data);
  }
  async getNearestCityData(longitude: number, latitude: number) {
    return this.iqAirProvider.getNearestCityData(longitude, latitude);
  }
}