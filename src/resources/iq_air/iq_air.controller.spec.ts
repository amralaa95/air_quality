
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'sequelize-typescript';

import { ZonePollutionModel } from '../../dbmodels/models';
import { IQAirService } from './iq_air.service';
import { DatabaseProvider, IQAirProvider } from '../../providers';
import { IQAirController } from './iq_air.controller';
const axios = require('axios');

const LONGITUDE = 2.22;
const LATITUDE = 1.53;
const AQIUS = 3;
const AQICN = 4;
jest.mock('axios');

const mockZonePollution = (num1: number, num2: number) => ({
  country: `country_${num1}`,
  city: `city_${num1}`,
  longitude: LONGITUDE * num1,
  latitude: LATITUDE * num1,
  aqius: AQIUS * num2,
  aqicn: AQICN * num2,
  timestamp: `${new Date().toLocaleString()}`
});

describe('IQ Air Controller', () => {
  let controller: IQAirController;
  let service: IQAirService;
  let repository: Repository<ZonePollutionModel>;
  let iqAirProvider: IQAirProvider;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IQAirController],
      providers: [
        DatabaseProvider,
        IQAirProvider,
        IQAirService
      ],
    }).compile();

    controller = module.get<IQAirController>(IQAirController);
    service = module.get<IQAirService>(IQAirService);
    iqAirProvider = module.get<IQAirProvider>(IQAirProvider);

    const dbProvider = module.get<DatabaseProvider>(DatabaseProvider);

    await dbProvider.forceSchemaSync();
    repository = dbProvider.getRepository(ZonePollutionModel);

    await Promise.all(
      [
        service.createZonePollution(mockZonePollution(1, 2)),
        service.createZonePollution(mockZonePollution(3, 4)),
        service.createZonePollution(mockZonePollution(1, 5))
      ]
    )
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getHieghstPollution()', () => {
    it('should return hiegsht zone pollution', async () => {
      const response = await controller.getHieghstPollution(LONGITUDE * 1, LATITUDE * 1);
      expect(response.aqius).toEqual(AQIUS * 5);
      expect(response.aqicn).toEqual(AQICN * 5);
    });

    it('should return DB error', async () => {
      jest.spyOn(repository, 'findOne').mockRejectedValue("Error too many connections");
      const response = await controller.getHieghstPollution(LONGITUDE * 1, LATITUDE * 1);
      expect(response).toEqual("Error too many connections");
    });
  });

  describe('getnearestCityData()', () => {
    it('should return nearest city data', async () => {
      const mockedResponse = {
        data: {
          status: "success",
          data: {
            current: {
              pollution: {
                ts: "2019-08-15T10:00:00.000Z",
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
      const response = await controller.getnearestCityData(LONGITUDE * 1, LATITUDE * 1);

      expect(response).toEqual({
        Result: {
          Pollution: mockedResponse.data.data.current.pollution
        }
      });
    });

    it('should return error when have error response', async () => {
      axios.mockRejectedValue({ response: { data: 'City is not found' } });
      const response = await controller.getnearestCityData(-4, 1);

      expect(response).toEqual('City is not found');
    });

    it('should return error when third party server is down', async () => {
      axios.mockRejectedValue({ request: 'Server is down now' });
      const response = await controller.getnearestCityData(-4, 1);

      expect(response).toEqual('Server is down now');
    });
  });
});
