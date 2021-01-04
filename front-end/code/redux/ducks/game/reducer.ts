import { CombinedState, combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

import CONFIG from '@config';
import { Environment } from '@constants';

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

const failInitializationReducer = createReducer<null>(
  null,
  builder => builder
    .addCase(
      GameActionFactory.failSettingGame,
      (state) => {
        const errorMessage = CONFIG.ENV === Environment.development
          ? 'Failed to set game. Please check if all services in docker-compose are running.'
          : 'Failed to set game.';

        // eslint-disable-next-line no-console
        console.error(errorMessage);

        return state;
      },
    ),
);

export type GameState = CombinedState<{
  failedInitialization: null,
  grid: GridState,
  logs: LogsState,
  players: PlayersState,
}>;

export default combineReducers<GameState>({
  failedInitialization: failInitializationReducer,
  grid: gridReducer,
  logs: logsReducer,
  players: playersReducer,
});
