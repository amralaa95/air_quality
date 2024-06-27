import { initializeDatabase, getRepository } from "../dbmodels/index";
import { Repository, Model } from 'sequelize-typescript';
import settings from '../lib/settings';
import { Injectable } from "@nestjs/common";

@Injectable()
export class DatabaseProvider {
  constructor() {
    initializeDatabase({
      database: settings.databases.database,
      host: settings.databases.host,
      port: settings.databases.port,
      username: settings.secrets.databases.username,
      password: settings.secrets.databases.password,
    });
  }

  getRepository<TModel extends Model>(model: new () => TModel): Repository<TModel> {
    return getRepository(model);
  }
}