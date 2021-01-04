import { createReducer } from '@reduxjs/toolkit';

import { Log } from '@feTypes/business';

import { GameActionFactory } from '../actions';

export type LogsState = {
  logs: Log[] | null,
};

const INITIAL_STATE: LogsState = {
  logs: null,
};

const safelySetLogs = (state: LogsState, logs: Log[]): LogsState => ({
  ...state,
  logs,
});

export default createReducer<LogsState>(
  INITIAL_STATE,
  builder => builder
    .addCase(
      GameActionFactory.setGame,
      (state, { payload: { logs } }) => safelySetLogs(state, logs),
    ),
);
