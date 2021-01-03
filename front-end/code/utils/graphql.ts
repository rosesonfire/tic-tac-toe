/* eslint-disable max-classes-per-file */

import {
  ApolloClient,
  gql,
  InMemoryCache,
} from '@apollo/client';

import { apiServer } from '@config/endpoints';

const typeDefs = gql`
  type Game {
    activePlayer: Player!
    grid: Grid!
    isComplete: Boolean!
    winner: Player
  }

  type Grid {
    rows: [Row!]!
  }

  type Mutation {
    makeMove(row: Int!, col: Int!, player: Player!): Game!
    startNewGame: Game!
  }

  enum Player {
    O
    X
  }

  type Query {
    game: Game
  }

  type Row {
    items: [Player]!
  }

  type Subscription {
    newLog: Game!
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
  static clear = () => client.clearStore();

  static mutate = <T>(mutation: any) => client.mutate<T>({ mutation });

  static query = <T>(query: any) => client.query<T>({ query });
}
