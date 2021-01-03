import 'reflect-metadata';
import { buildSchema } from 'type-graphql';

import { GameResolver } from './resolvers';

export default await buildSchema({
  resolvers: [
    GameResolver,
  ],
});
