/* eslint-disable max-classes-per-file, class-methods-use-this */
import { v4 as uuidv4 } from 'uuid';

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
import {
  DetectionResult,
  Player,
  PossiblePlayer,
  RowItems,
} from '@graphql';

import {
  Game,
  Grid,
  Row,
  Rows,
} from './types';

import { MakeMoveInput } from './arguments';
import { GameNotInitializedError, NonEmptyCellError, PositionValueError } from './errors';

const togglePlayer = (player: Player) => (player === Player.O ? Player.X : Player.O);

const findMatchedPlayer = ([one, two, three]: RowItems): PossiblePlayer => (
  (one !== null && one === two && two === three)
    ? one
    : null
);

const detectHorizontalStraightWinner = (rows: Grid['rows']): PossiblePlayer => (
  findMatchedPlayer(rows[0].items)
    ?? findMatchedPlayer(rows[1].items)
    ?? findMatchedPlayer(rows[2].items)
);

const detectVerticalStraightWinner = (rows: Grid['rows']): PossiblePlayer => {
  let winner: PossiblePlayer = null;

  for (let j = 0; j < 3; j += 1) {
    winner = findMatchedPlayer([
      rows[0].items[j],
      rows[1].items[j],
      rows[2].items[j],
    ]);

    if (winner) {
      break;
    }
  }

  return winner;
};

const detectDiagonalStraightWinner = (rows: Grid['rows']): PossiblePlayer => (
  findMatchedPlayer([
    rows[0].items[0],
    rows[1].items[1],
    rows[2].items[2],
  ])
    ?? findMatchedPlayer([
      rows[0].items[2],
      rows[1].items[1],
      rows[2].items[0],
    ])
);

const hasRowEmptyCell = (
  { items: [one, two, three] }: Row,
): boolean => (!one || !two || !three);

const haveRowsEmptyCell = (rows: Rows): boolean => (
  rows.reduce<boolean>(
    (doesEmptyCellExist, row) => doesEmptyCellExist || hasRowEmptyCell(row),
    false,
  )
);

const detectResult = ({ grid: { rows } }: Game): DetectionResult => ({
  hasEmptyCell: haveRowsEmptyCell(rows),
  winner: detectHorizontalStraightWinner(rows)
    ?? detectVerticalStraightWinner(rows)
    ?? detectDiagonalStraightWinner(rows),
});

@Resolver(Game)
// eslint-disable-next-line import/prefer-default-export
export class GameResolver {
  @Query(() => Game, { nullable: true })
  game(): Promise<Game | null> {
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

    const { items } = game.grid.rows[row];

    if (items[col]) {
      throw new NonEmptyCellError(row, col);
    }

    items[col] = player;
    game.activePlayer = togglePlayer(player);
    game.logs.push({
      col,
      id: uuidv4(),
      player,
      row,
    });

    // DO not detect result from logs since it is not the source of truth
    const { hasEmptyCell, winner } = detectResult(game);

    game.winner = winner;
    game.isComplete = Boolean(winner || !hasEmptyCell);

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
