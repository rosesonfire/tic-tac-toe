import { Player } from '@feTypes/business';

export enum Environment {
  development = 'development',
  production = 'production',
}

export const PLAYER_NAMES = {
  [Player.X]: 'Player One',
  [Player.O]: 'Player Two',
};
