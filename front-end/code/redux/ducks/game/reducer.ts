import { CombinedState, combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { PossibleCellTriplet, PossiblePlayer } from '@feTypes/business';

import { GameActionFactory } from './actions';

import {
  PlayersState,
  reducer as playersReducer,
} from './players';

import {
  GridState,
  reducer as gridReducer,
} from './grid';

import {
  LogsState,
  reducer as logsReducer,
} from './logs';

export type GameResultState = {
  isCompleted: boolean,
  winner: PossiblePlayer,
  winningCells: PossibleCellTriplet,
};

const INITIAL_GAME_RESULT_STATE = {
  isCompleted: false,
  winner: null,
  winningCells: null,
};

const safelySetGameResult = (
  state: GameResultState,
  isCompleted: boolean,
  winner: PossiblePlayer,
  winningCells: PossibleCellTriplet,
) => ({
  ...state,
  isCompleted,
  winner,
  winningCells,
});

const gameResultReducer = createReducer<GameResultState>(
  INITIAL_GAME_RESULT_STATE,
  builder => builder
    .addCase(
      GameActionFactory.setGame,
      (
        state,
        { payload: { isComplete, winner, winningCells } },
      ) => safelySetGameResult(state, isComplete, winner, winningCells),
    ),
);

export type GameState = CombinedState<{
  gameResult: GameResultState,
  grid: GridState,
  logs: LogsState,
  players: PlayersState,
}>;

export default combineReducers<GameState>({
  gameResult: gameResultReducer,
  grid: gridReducer,
  logs: logsReducer,
  players: playersReducer,
});
