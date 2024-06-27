import { ReplicationOptions } from 'sequelize';
import { omit } from 'lodash';
import { Model, ModelCtor, Repository, Sequelize } from 'sequelize-typescript';

import { ZonePollutionModel } from './models';

export type DatabaseConfig =
  | {
    database: string;
    host: string;
    port?: number;
    username: string;
    password: string;
  }
  | {
    useReplication: true;
    database?: string;
    port?: number;
    replication: ReplicationOptions;
  };

const DB_MODELS: ModelCtor[] = [ZonePollutionModel]
let db: Sequelize = null;
let dbConfig: DatabaseConfig = null;


export function getDatabase(): Sequelize {
  if (!db) {
    db = new Sequelize({
      ...omit(dbConfig, ['useReplication']),
      dialect: 'postgres',
      repositoryMode: true,
      models: DB_MODELS
    });

    db.authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
      });
  }

  return db;
}

export function getRepository<TModel extends Model>(model: new () => TModel): Repository<TModel> {
  return getDatabase().getRepository<TModel>(model);
}

export function initializeDatabase(config: DatabaseConfig) {
  dbConfig = config;
}