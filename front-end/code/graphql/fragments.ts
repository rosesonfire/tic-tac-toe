import { gql } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const gameFragment = gql`
  fragment gameFragment on Game {
    activePlayer
    isComplete
    winner
    winningCells {
      row
      col
    }
    grid {
      rows {
        items
      }
    }
    logs {
      id
      player
      row
      col
    }
  }
`;
