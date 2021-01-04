import { CombinedState, combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { PossiblePlayer } from '@feTypes/business';

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
};

const INITIAL_GAME_RESULT_STATE = {
  isCompleted: false,
  winner: null,
};

const safelySetGameResult = (
  state: GameResultState, isCompleted: boolean, winner: PossiblePlayer,
) => ({
  ...state,
  isCompleted,
  winner,
});

const gameResultReducer = createReducer<GameResultState>(
  INITIAL_GAME_RESULT_STATE,
  builder => builder
    .addCase(
      GameActionFactory.setGame,
      (
        state,
        { payload: { isComplete, winner } },
      ) => safelySetGameResult(state, isComplete, winner),
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
