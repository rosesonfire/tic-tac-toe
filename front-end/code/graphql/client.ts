import { ApolloClient, InMemoryCache } from '@apollo/client';

import { apiServer } from '@config/endpoints';

import typeDefs from './typedefs';

export default new ApolloClient({
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
  },
  typeDefs,
  uri: `${apiServer.url}${apiServer.endpoints.graphql}`,
});
