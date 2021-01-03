import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';

import CONFIG from '@config';
import { schema } from '@graphql';

const server = new ApolloServer({ schema });
const app = express();

app.use(cors({
  origin: CONFIG.FRONT_END_URL,
}));

server.applyMiddleware({ app });

app.listen(
  { port: CONFIG.PORT },
  // eslint-disable-next-line no-console
  () => console.log(`🚀 Server ready at http://localhost:${CONFIG.PORT}${server.graphqlPath}`),
);
