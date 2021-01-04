import { gql } from '@apollo/client';

import { Game } from '@feTypes/business';

import graphQLClient from './client';
import { gameFragment } from './fragments';

export default class Queries {
  static getGame = () => graphQLClient.query<{ game: Game | null }>({
    query: gql`{
      game {
        ...gameFragment
      }
    }
    ${gameFragment}`,
  })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.error('Failed to fetch game data', err);

      return null;
    });
}
