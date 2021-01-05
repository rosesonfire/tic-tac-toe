import 'reflect-metadata';
import http from 'http';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';

import CONFIG from '@config';
import { schema } from '@graphql';

const server = new ApolloServer({ schema });
const app = express();

app.use(cors({
  origin: CONFIG.FRONT_END_URLS,
}));

server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(
  CONFIG.PORT,
  () => {
    // eslint-disable-next-line no-console
    console.log(`🚀 Server ready at http://localhost:${CONFIG.PORT}${server.graphqlPath}`);

    // eslint-disable-next-line no-console
    console.log(`🚀 Subscriptions ready at ws://localhost:${CONFIG.PORT}${server.subscriptionsPath}`);
  },
);
