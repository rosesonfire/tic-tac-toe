/* eslint-disable max-classes-per-file, class-methods-use-this */
import 'reflect-metadata';
import {
  Resolver,
  Query,
  Mutation,
  Args,
} from 'type-graphql';

import Db from '@db';

import { Game } from './types';
import { MakeMoveInput } from './arguments';
import { GameNotInitializedError, PositionValueError } from './errors';

@Resolver(Game)
// eslint-disable-next-line import/prefer-default-export
export class GameResolver {
  @Query(() => Game)
  async game(): Promise<Game> {
    return (await Db.fetchGame()) ?? Db.saveGame(new Game());
  }

  @Mutation(() => Game!)
  async makeMove(@Args() { col, player, row }: MakeMoveInput): Promise<Game> {
    if (col < 0 || col > 2) {
      throw new PositionValueError('col', col);
    }

    if (row < 0 || row > 2) {
      throw new PositionValueError('row', row);
    }

    const game = await Db.fetchGame();

    if (!game) {
      throw new GameNotInitializedError();
    }

    game.grid.rows[row].items[col] = player;

    return game;
  }
}
