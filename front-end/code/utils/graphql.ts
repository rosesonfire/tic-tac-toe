/* eslint-disable max-classes-per-file */

import {
  ApolloClient,
  gql,
  InMemoryCache,
} from '@apollo/client';

import { apiServer } from '@config/endpoints';

const typeDefs = gql`
  enum Player {
    O
    X
  }

  type Row {
    items: [Player!]!
  }

  type Grid {
    rows: [Row!]!
  }

  type Game {
    activePlayer: Player!
    grid: Grid!
    isComplete: Boolean!
    winner: Player
  }

  type Query {
    game: Game!
  }
`;

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
  },
  typeDefs,
  uri: `${apiServer.url}${apiServer.endpoints.graphql}`,
});

export default class GraphQLClient {
  static get = <T>(query: any) => client.query<T>({ query });
}
