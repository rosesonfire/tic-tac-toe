import { gql } from '@apollo/client';

export default gql`
  type Game {
    activePlayer: Player!
    grid: Grid!
    isComplete: Boolean!
    winner: Player
    logs: [Log!]!
  }

  type Grid {
    rows: [Row!]!
  }

  type Log {
    player: Player!
    row: Int!
    col: Int!
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
