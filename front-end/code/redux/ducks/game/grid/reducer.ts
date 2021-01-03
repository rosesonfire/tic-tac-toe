import { createReducer } from '@reduxjs/toolkit';

import { Rows } from '@feTypes/business';

import { GameActionFactory } from '../actions';

export type GridState = {
  rows: Rows | null,
};

const INITIAL_STATE: GridState = {
  rows: null,
};

// const createActivePlayerAlreadySetError = (player: Player) => ErrorFactory.createError(
//   ErrorType.OBJECT_ALREADY_EXISTS,
//   `Active player already set to ${player}`,
// );

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
