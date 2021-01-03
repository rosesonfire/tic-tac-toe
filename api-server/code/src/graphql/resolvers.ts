/* eslint-disable max-classes-per-file, class-methods-use-this */
import 'reflect-metadata';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Subscription,
  Root,
  PubSub,
  PubSubEngine,
} from 'type-graphql';

import Db from '@db';
import CONFIG from '@config';

import { Game } from './types';
import { MakeMoveInput } from './arguments';
import { GameNotInitializedError, PositionValueError } from './errors';

@Resolver(Game)
// eslint-disable-next-line import/prefer-default-export
export class GameResolver {
  @Query(() => Game, { nullable: true })
  async game(): Promise<Game | null> {
    return Db.fetchGame();
  }

  @Mutation(() => Game!)
  async makeMove(
    @Args() { col, player, row }: MakeMoveInput,
      @PubSub() pubSub: PubSubEngine,
  ): Promise<Game> {
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

    const savedGame = await Db.saveGame(game);

    await pubSub.publish(CONFIG.NEW_LOGS_TOPIC, savedGame);

    return savedGame;
  }

  @Subscription({ topics: CONFIG.NEW_LOGS_TOPIC })
  newLog(@Root() game: Game): Game {
    return game;
  }

  @Mutation(() => Game!)
  async startNewGame(@PubSub() pubSub: PubSubEngine): Promise<Game> {
    const savedGame = await Db.saveGame(new Game());

    await pubSub.publish(CONFIG.NEW_LOGS_TOPIC, savedGame);

    return savedGame;
  }
}
