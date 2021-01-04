/* eslint-disable max-classes-per-file, @typescript-eslint/member-ordering */
import { Offset } from '@api-types';
import 'reflect-metadata';
import {
  ObjectType,
  Field,
  registerEnumType,
  Int,
} from 'type-graphql';

export enum Player {
  O = 'O',
  X = 'X',
}

registerEnumType(Player, {
  name: 'Player',
});

@ObjectType()
export class Row {
  @Field(() => [Player]!, { nullable: 'items' })
  items!: [Player | null, Player | null, Player | null];
}

@ObjectType()
export class Grid {
  @Field(() => [Row!]!)
  rows!: [Row, Row, Row];
}

@ObjectType()
export class Log {
  @Field(() => Player!)
  player!: Player;

  @Field(() => Int!)
  row!: Offset;

  @Field(() => Int!)
  col!: Offset;
}

@ObjectType()
export class Game {
  @Field(() => Player)
  activePlayer!: Player;

  @Field()
  grid!: Grid;

  @Field()
  isComplete!: boolean;

  @Field(() => Player, { nullable: true })
  winner: Player | null;

  @Field(() => [Log!]!)
  logs!: Log[];

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
    this.logs = game?.logs ?? [];
  }

  // TODO: use library for serialization and deserialization like serialize-javascript
  serialize = (): string => JSON.stringify(this);

  // TODO: use library for serialization and deserialization like serialize-javascript
  static deserialize = (stringified: string): Game => new Game(JSON.parse(stringified));
}
