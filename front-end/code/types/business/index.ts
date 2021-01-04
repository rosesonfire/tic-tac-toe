export enum Player {
  O = 'O',
  X = 'X',
}

export type Offset = 0 | 1 | 2;

export type Row = {
  items: [Player | null, Player | null, Player | null],
};

export type Rows = [Row, Row, Row];

export type Grid = {
  rows: Rows,
};

export type Log = {
  col: Offset,
  player: Player,
  row: Offset,
};

export type Game = {
  activePlayer: Player,
  grid: Grid,
  isComplete: boolean,
  logs: Log[],
  winner: Player | null,
};
