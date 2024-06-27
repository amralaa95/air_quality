import * as fs from 'node:fs';
import { Logger } from '@nestjs/common';
import { Settings } from './settings-types';

const environment = process.env.ENVIRONMENT || 'dev';

export function loadFromEnvironmentFile(): Settings {
  try {
    const file = `${__dirname}/../static/config/${environment}.json`;

    if (!fs.existsSync(file)) {
      throw new Error(`Settings file "${file}" not found.`);
    }
    Logger.log(`Reading ${environment} app settings from "${file}"`);

    return {
      ...JSON.parse(fs.readFileSync(file).toString('utf-8')),
      development: environment === 'dev',
    };
  } catch (e) {
    Logger.error(
      'Unable to load configuration. Make sure the config file contains proper JSON.',
      e,
    );

    // Rethrow the error to kill the process.
    throw e;
  }
}

/**
 * Prefer this.configService.get('propName') over this import
 */
const settings = (() => loadFromEnvironmentFile())();

export default settings;