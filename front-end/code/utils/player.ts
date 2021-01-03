import { Player } from '@feTypes/business';

// eslint-disable-next-line import/prefer-default-export
export const togglePlayer = (player: Player) => (player === Player.O ? Player.X : Player.O);
