export enum Player {
  O = 'O',
  X = 'X',
}

export type Row = {
  items: [Player, Player, Player],
};

export type Rows = [Row, Row, Row];

export type Grid = {
  rows: Rows,
};

export type Game = {
  activePlayer: Player,
  grid: Grid,
  isComplete: boolean,
  winner: Player | null,
};
