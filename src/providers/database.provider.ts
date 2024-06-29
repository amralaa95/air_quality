import { initializeDatabase, getRepository, synchronizeAll } from "../dbmodels";
import { Repository, Model } from 'sequelize-typescript';
import settings from '../lib/settings';
import { Injectable } from "@nestjs/common";

@Injectable()
export class DatabaseProvider {
  constructor() {
    initializeDatabase({
      dialect: settings.databases.dialect,
      database: settings.databases.database,
      host: settings.databases.host,
      port: settings.databases.port,
      username: settings.secrets.databases.username,
      password: settings.secrets.databases.password,
    });
  }

  /**
   * Unit Tests Helper
   * // Creates tables in sqlite in-memory database
   */
   forceSchemaSync = async () => {
    await synchronizeAll();
  };

  getRepository<TModel extends Model>(model: new () => TModel): Repository<TModel> {
    return getRepository(model);
  }
}