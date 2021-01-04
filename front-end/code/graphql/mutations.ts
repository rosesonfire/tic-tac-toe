import { gql } from '@apollo/client';

import { Game, Offset, Player } from '@feTypes/business';

import graphQLClient from './client';
import { gameFragment } from './fragments';

export default class Mutations {
  static makeMove = (
    row: Offset, col: Offset, player: Player,
  ) => graphQLClient.mutate<{ makeMove: Game }>({
    mutation: gql`
      mutation {
        makeMove(row: ${row}, col: ${col}, player: ${player}) {
          ...gameFragment
        }
      }

      ${gameFragment}
    `,
  })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.error('Failed send request to make move', err);

      return null;
    });

  static startGame = () => graphQLClient.mutate<{ startNewGame: Game }>({
    mutation: gql`
      mutation {
        startNewGame {
          ...gameFragment
        }
      }

      ${gameFragment}
    `,
  })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.error('Failed send request to start new game', err);

      return null;
    });
}
