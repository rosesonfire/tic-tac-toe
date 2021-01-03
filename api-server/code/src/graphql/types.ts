/* eslint-disable max-classes-per-file, @typescript-eslint/member-ordering */
import 'reflect-metadata';
import { ObjectType, Field, registerEnumType } from 'type-graphql';

export enum Player {
  O = 'O',
  X = 'X',
}

registerEnumType(Player, {
  name: 'Player',
});

@ObjectType()
export class Row {
  @Field(() => [Player!]!)
  items!: [Player, Player, Player];
}

@ObjectType()
export class Grid {
  @Field(() => [Row!]!)
  rows!: [Row, Row, Row];
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

  constructor(grid?: Grid, activePlayer?: Player, isComplete?: boolean, winner?: Player) {
    this.grid = grid ?? {
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
    };

    this.activePlayer = activePlayer ?? Player.X;
    this.isComplete = isComplete ?? false;
    this.winner = winner ?? null;
  }

  // TODO: use library for serialization and deserialization like serialize-javascript
  serialize = (): string => JSON.stringify(this);

  // TODO: use library for serialization and deserialization like serialize-javascript
  static deserialize = (stringified: string): Game => JSON.parse(stringified);
}
