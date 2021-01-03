// eslint-disable-next-line max-len
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
  winner?: Player | null;
}
