/* eslint-disable max-classes-per-file, @typescript-eslint/member-ordering */
import 'reflect-metadata';
import {
  ObjectType,
  Field,
  registerEnumType,
  Int,
  ID,
} from 'type-graphql';

export type Offset = 0 | 1 | 2;

export const offsetValues: [Offset, Offset, Offset] = [0, 1, 2];

export enum Player {
  O = 'O',
  X = 'X',
}

export type PossiblePlayer = Player | null;
export type PossiblePlayerTriplet = [PossiblePlayer, PossiblePlayer, PossiblePlayer];

registerEnumType(Player, {
  name: 'Player',
});

@ObjectType()
export class Row {
  @Field(() => [Player]!, { nullable: 'items' })
  items!: PossiblePlayerTriplet;
}

export type Rows = [Row, Row, Row];

@ObjectType()
export class Grid {
  @Field(() => [Row!]!)
  rows!: Rows;
}

@ObjectType()
export class Log {
  @Field(() => ID!)
  id!: string;

  @Field(() => Player!)
  player!: Player;

  @Field(() => Int!)
  row!: Offset;

  @Field(() => Int!)
  col!: Offset;
}

@ObjectType()
export class Cell {
  @Field(() => Int!)
  row: Offset;

  @Field(() => Int!)
  col: Offset;

  constructor(row: Offset, col: Offset) {
    this.row = row;
    this.col = col;
  }
}

export type CellTriplet = [Cell, Cell, Cell];
export type PossibleCellTriplet = CellTriplet | null;
export type PossibleWinner = [Player, CellTriplet] | null;

export type DetectionResult = {
  hasEmptyCell: boolean,
  possibleWinner: PossibleWinner,
};

@ObjectType()
export class Game {
  @Field(() => Player)
  activePlayer: Player;

  @Field()
  grid: Grid;

  @Field()
  isComplete: boolean;

  @Field(() => Player, { nullable: true })
  winner: PossiblePlayer;

  @Field(() => [Cell!], { nullable: true })
  winningCells: PossibleCellTriplet;

  @Field(() => [Log!]!)
  logs: Log[];

  constructor(game?: Game) {
    this.grid = game?.grid ?? {
      rows: [
        {
          items: [null, null, null],
        },
        {
          items: [null, null, null],
        },
        {
          items: [null, null, null],
        },
      ],
    };

    this.activePlayer = game?.activePlayer ?? Player.X;
    this.isComplete = game?.isComplete ?? false;
    this.winner = game?.winner ?? null;
    this.winningCells = game?.winningCells ?? null;
    this.logs = game?.logs ?? [];
  }

  // TODO: use library for serialization and deserialization like serialize-javascript
  serialize = (): string => JSON.stringify(this);

  // TODO: use library for serialization and deserialization like serialize-javascript
  static deserialize = (stringified: string): Game => new Game(JSON.parse(stringified));
}
