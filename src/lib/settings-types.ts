export type DBSharedSettings = {
  host: string;
  port: number;
  database: string;
  dialect: string;
};

export type SecretsSettings = {
  databases: {
    username: string;
    password: string;
  };
  iqAir: {
    apikey: string;
  }
};

export type Settings = {
  environment: string;
  development: boolean;
  logLevel: string;
  iqAirApiBaseUrl: string;
  sentry: {
    enabled: boolean;
    url: string;
    lambdaShutdownWait: number;
  };
  databases: DBSharedSettings;
  secrets: SecretsSettings;
};