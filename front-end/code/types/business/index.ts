import PropTypes from 'prop-types';

export enum Player {
  O = 'O',
  X = 'X',
}

export type Cell = {
  col: Offset,
  row: Offset,
};

export type Offset = 0 | 1 | 2;
export type PossiblePlayer = Player | null;
export type CellTriplet = [Cell, Cell, Cell];
export type PossibleCellTriplet = CellTriplet | null;

export type Row = {
  items: [PossiblePlayer, PossiblePlayer, PossiblePlayer],
};

export type Rows = [Row, Row, Row];

export type Grid = {
  rows: Rows,
};

export type Log = {
  col: Offset,
  id: string,
  player: Player,
  row: Offset,
};

export type Game = {
  activePlayer: Player,
  grid: Grid,
  isComplete: boolean,
  logs: Log[],
  winner: PossiblePlayer,
  winningCells: PossibleCellTriplet,
};

export enum GameStateMarkerMessage {
  GAME_STARTED = 'GAME STARTED!',
  PLAYER_1_WON = 'Player 1 WON!',
  PLAYER_2_WON = 'Player 2 WON!',
  GAME_DRAWN = 'DRAW',
}

export const propTypes = {
  col: PropTypes.oneOf<Offset>([0, 1, 2]),
  gameStateMarker: PropTypes.oneOf<GameStateMarkerMessage>([
    GameStateMarkerMessage.GAME_STARTED,
    GameStateMarkerMessage.PLAYER_1_WON,
    GameStateMarkerMessage.PLAYER_2_WON,
    GameStateMarkerMessage.GAME_DRAWN,
  ]),
  player: PropTypes.oneOf<Player>([Player.X, Player.O]),
  row: PropTypes.oneOf<Offset>([0, 1, 2]),
};
