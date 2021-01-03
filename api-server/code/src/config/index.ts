import { Environment } from '@constants';

const DEVELOPMENT_CONFIG = {
  FRONT_END_URL: 'http://localhost:3001',
  PORT: 4001,
};

const PRODUCTION_CONFIG = {
  FRONT_END_URL: 'http://localhost:3000',
  PORT: 4000,
};

export default process.env.NODE_ENV === Environment.production
  ? PRODUCTION_CONFIG
  : DEVELOPMENT_CONFIG;
