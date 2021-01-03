import { createReducer } from '@reduxjs/toolkit';

import { Rows } from '@feTypes/business';
import { GameActionFactory } from '@redux/ducks/game/actions';

export type GridState = {
  rows: Rows | null,
};

const INITIAL_STATE: GridState = {
  rows: null,
};

const safelySetGrid = (state: GridState, rows: Rows): GridState => ({
  ...state,
  rows,
});

export default createReducer<GridState>(
  INITIAL_STATE,
  builder => builder
    .addCase(
      GameActionFactory.setGame,
      (state, { payload: { grid: { rows } } }) => safelySetGrid(state, rows),
    ),
);
