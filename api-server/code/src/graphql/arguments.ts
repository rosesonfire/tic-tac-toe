/* eslint-disable max-classes-per-file,  @typescript-eslint/member-ordering */
import 'reflect-metadata';
import { Field, Int, ArgsType } from 'type-graphql';

import { Offset, Player } from '@graphql';

@ArgsType()
// eslint-disable-next-line import/prefer-default-export
export class MakeMoveInput {
  @Field(() => Int!)
  row!: Offset;

  @Field(() => Int!)
  col!: Offset;

  @Field(() => Player!)
  player!: Player;
}
