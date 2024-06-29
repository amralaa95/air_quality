import axios from 'axios';
import { Injectable } from "@nestjs/common";
import settings from '../lib/settings';

const REQUEST_TYPES = {
  POST: 'post',
  GET: 'get',
}

@Injectable()
export class IQAirProvider {
  private readonly iqAirApiBaseUrl: string;
  private readonly iqAirApiKey: string;

  constructor() {
    this.iqAirApiBaseUrl = settings.iqAirApiBaseUrl;
    this.iqAirApiKey = settings.secrets.iqAir.apikey;
  }

  private async sendRequest(method: string, path: string, queryString: string, data: string | null = null) {
    try {
      const response = await axios({
        method: REQUEST_TYPES[method],
        url: `${this.iqAirApiBaseUrl}${path}${queryString}&key=${this.iqAirApiKey}`,
        data,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      return response.data;

    } catch (error) {
      if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        throw error.response.data;
      } else if (error.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        throw error.request;
      } else {
        // Something happened in setting up the request and triggered an Error
        throw error.message;
      }
    }
  }

  async getNearestCityData(longitude: number, latitude: number): Promise<any> {
    try {
      const queryString = `?lon=${longitude}&lat=${latitude}`;
      return this.sendRequest(REQUEST_TYPES.GET, 'v2/nearest_city', queryString);
    } catch (error) {
      throw error;
    }
  }
}