import { promisify } from 'util';

import redis from 'redis';

import CONFIG from '@config';
import { Game } from '@graphql';

const client = redis.createClient({
  host: CONFIG.REDIS_HOST,
  port: CONFIG.REDIS_PORT,
  prefix: `${CONFIG.ENV}-`,
});

client.on('error', (error) => {
  // eslint-disable-next-line no-console
  console.error(error);
});

type RedisSuccessResponse = 'OK';

export default class Db {
  static fetchGame = (): Promise<Game | null> => Db
    .get()
    .then(stringified => (stringified ? Game.deserialize(stringified) : null));

  private static get = (
  ): Promise<string | null> => promisify<string, string | null>(
    client.get.bind(client),
  )(CONFIG.REDIS_GAME_KEY);

  static saveGame = (
    game: Game,
  ): Promise<Game> => Db.set(game.serialize()).then(() => game);

  private static set = (
    value: string,
  ): Promise<RedisSuccessResponse> => promisify<string, string, RedisSuccessResponse>(
    client.set.bind(client),
  )(
    CONFIG.REDIS_GAME_KEY,
    value,
  );
}
