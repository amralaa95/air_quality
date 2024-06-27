import { Injectable } from "@nestjs/common";
import axios from 'axios';
import settings from '../lib/settings';

@Injectable()
export class IQAirProvider {
  private readonly iqAirApiBaseUrl: string;
  private readonly iqAirApiKey: string;

  constructor() {
    this.iqAirApiBaseUrl = settings.iqAirApiBaseUrl;
    this.iqAirApiKey = settings.secrets.iqAir.apikey;
  }

  async getNearestCityData(lon: string, lat: string): Promise<any> {
    const queryString = `?lon=${lon}&lat=${lat}&key=${this.iqAirApiKey}`;
    const response = await axios.get(`${this.iqAirApiBaseUrl}v2/nearest_city${queryString}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  }
}