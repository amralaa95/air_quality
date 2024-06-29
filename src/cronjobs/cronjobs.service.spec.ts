import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'sequelize-typescript';

import { CronjobsService } from './cronjobs.service';
import { ZonePollutionModel } from '../dbmodels/models';
import { IQAirService } from '../resources/iq_air';
import { DatabaseProvider, IQAirProvider } from '../providers';
import { ZONES } from './zones';
const axios = require('axios');

const LONGITUDE = ZONES[0].longitude;
const LATITUDE = ZONES[0].latitude;
const AQIUS = 3;
const AQICN = 4;
const DATE = new Date();
DATE.setHours(DATE.getHours() - 3);

jest.mock('axios');

const mockZonePollution = (num1: number, num2: number) => ({
  country: `country_${num1}`,
  city: `city_${num1}`,
  longitude: LONGITUDE * num1,
  latitude: LATITUDE * num1,
  aqius: AQIUS * num2,
  aqicn: AQICN * num2,
  timestamp: `${DATE.toLocaleString()}`
});
const mockPollution = mockZonePollution(1, 2);

describe('CronjobsService', () => {
  let service: CronjobsService;
  let repository: Repository<ZonePollutionModel>;
  let iqService: IQAirService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseProvider, IQAirProvider, IQAirService, CronjobsService],
    }).compile();

    service = module.get<CronjobsService>(CronjobsService);
    iqService = module.get<IQAirService>(IQAirService);
    const dbProvider = module.get<DatabaseProvider>(DatabaseProvider);

    await dbProvider.forceSchemaSync();
    repository = dbProvider.getRepository(ZonePollutionModel);

    await Promise.all(
      [
        iqService.createZonePollution(mockPollution),
        iqService.createZonePollution(mockZonePollution(3, 4))
      ]
    )
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getnearestCityData()', () => {
    it('should return same city data', async () => {
      const mockedResponse = {
        data: {
          status: "success",
          city: "city",
          country: "country",
          data: {
            current: {
              pollution: {
                ts: mockPollution.timestamp,
                aqius: 6,
                mainus: "p2",
                aqicn: 6,
                maincn: "p2",
                p2: {
                  conc: 27.2,
                  aqius: 6,
                  aqicn: 6
                }
              }
            }
          }
        }
      };

      axios.mockResolvedValue(mockedResponse);
      await service.getAirQualityZones();
      const zonePollution = await iqService.findHigestZonePollution(LONGITUDE, LATITUDE);

      expect(zonePollution.aqius).toEqual(6);
      expect(zonePollution.aqicn).toEqual(8);
    });

    it('should return new city data and save it', async () => {
      const mockedResponse = {
        data: {
          status: "success",
          city: "city",
          country: "country",
          data: {
            current: {
              pollution: {
                ts: `${new Date().toLocaleString()}`,
                aqius: 83,
                mainus: "p2",
                aqicn: 39,
                maincn: "p2",
                p2: {
                  conc: 27.2,
                  aqius: 83,
                  aqicn: 39
                }
              }
            }
          }
        }
      };

      axios.mockResolvedValue(mockedResponse);
      await service.getAirQualityZones();
      const zonePollution = await iqService.findHigestZonePollution(LONGITUDE, LATITUDE);

      expect(zonePollution.aqius).toEqual(83);
      expect(zonePollution.aqicn).toEqual(39);
    });
  })
})