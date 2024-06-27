import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IQAirService } from '../resources/iq_air/iq_air.service';

@Injectable()
export class CronjobsService {
    constructor(private readonly service: IQAirService) { }

    @Cron( CronExpression.EVERY_MINUTE )
    async get_air_quality_zones()  {
        const zones = [
            {
                longitude: 2.352222,
                latitude: 48.856613
            }
        ];

        for (let zone of zones){
            
            const zoneRes = await this.service.getNearestCityData(zone.longitude, zone.latitude);

            const timestamp = zoneRes.data.current.pollution.ts;

            const isExist = await this.service.findZonePollution({longitude: zone.longitude, latitude: zone.latitude, timestamp});

            if (isExist === null){
                const res = await this.service.createZonePollution({
                    city: zoneRes.data.city,
                    country: zoneRes.data.country,
                    longitude: zone.longitude,
                    latitude: zone.latitude,
                    aqius: zoneRes.data.current.pollution.aqius,
                    aqicn: zoneRes.data.current.pollution.aqicn,
                    timestamp: timestamp
                })
            }
        }
    }
}