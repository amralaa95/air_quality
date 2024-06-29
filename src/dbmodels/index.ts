import { Dialect, ReplicationOptions } from 'sequelize';
import { omit } from 'lodash';
import { Model, ModelCtor, Repository, Sequelize, SequelizeOptions } from 'sequelize-typescript';

import { ZonePollutionModel } from './models';

export type DatabaseConfig =
  | {
    dialect: Dialect,
    database: string;
    host: string;
    port?: number;
    username: string;
    password: string;
  }
  | {
    dialect: Dialect,
    useReplication: true;
    database?: string;
    port?: number;
    replication: ReplicationOptions;
  };

const DB_MODELS: ModelCtor[] = [ZonePollutionModel]
let db: Sequelize = null;
let dbConfig: DatabaseConfig = null;


export function getDatabase(): Sequelize {
  const options: SequelizeOptions = {
    ...omit(dbConfig, ['useReplication']),
    repositoryMode: true,
    models: DB_MODELS
  };

  if (process.env['NODE_ENV'] === 'test') {
    options.dialect = 'sqlite';
    options.storage = ':memory:';
  }

  if (!db) {
    db = new Sequelize(options);

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

export function synchronizeAll() {
  return getDatabase().sync();  
}