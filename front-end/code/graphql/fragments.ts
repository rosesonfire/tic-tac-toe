import { gql } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const gameFragment = gql`
  fragment gameFragment on Game {
    activePlayer
    isComplete
    winner
    grid {
      rows {
        items
      }
    }
    logs {
      player
      row
      col
    }
  }
`;
