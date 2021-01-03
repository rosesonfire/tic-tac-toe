/* eslint-disable max-classes-per-file, class-methods-use-this */
import 'reflect-metadata';
import {
  Resolver,
  Query,
  Mutation,
  Args,
} from 'type-graphql';

import { Game, Player } from './types';
import { MakeMoveInput } from './arguments';
import { PositionValueError } from './errors';

const game: Game = {
  activePlayer: Player.O,
  grid: {
    rows: [
      {
        items: [Player.O, Player.X, Player.O],
      },
      {
        items: [Player.O, Player.X, Player.O],
      },
      {
        items: [Player.O, Player.X, Player.O],
      },
    ],
  },
  isComplete: false,
  winner: Player.X,
};

@Resolver(Game)
// eslint-disable-next-line import/prefer-default-export
export class GameResolver {
  @Query(() => Game)
  game(): Game {
    return game;
  }

  @Mutation()
  makeMove(@Args() { col, row }: MakeMoveInput): Game {
    if (col < 0 || col > 2) {
      throw new PositionValueError('col', col);
    }

    if (row < 0 || row > 2) {
      throw new PositionValueError('row', row);
    }

    return game;
  }
}
