/* eslint-disable max-classes-per-file,  @typescript-eslint/member-ordering */
import 'reflect-metadata';
import { Field, Int, ArgsType } from 'type-graphql';

import { Player } from './types';

@ArgsType()
// eslint-disable-next-line import/prefer-default-export
export class MakeMoveInput {
  @Field(() => Int!)
  row!: 0 | 1 | 2;

  @Field(() => Int!)
  col!: 0 | 1 | 2;

  @Field(() => Player!)
  player!: Player;
}
