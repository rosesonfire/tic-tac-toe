import { Environment } from '@constants';

const DEVELOPMENT_CONFIG = {
  API_SERVER_PORT: 4001,
  ENV: Environment.development,
};

const PRODUCTION_CONFIG = {
  API_SERVER_PORT: 4000,
  ENV: Environment.production,
};

export default process.env.NODE_ENV === Environment.production
  ? PRODUCTION_CONFIG
  : DEVELOPMENT_CONFIG;
