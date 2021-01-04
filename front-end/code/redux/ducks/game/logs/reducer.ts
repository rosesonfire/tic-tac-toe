import { createReducer } from '@reduxjs/toolkit';

import { Log } from '@feTypes/business';

import { GameActionFactory } from '../actions';

export type LogsState = {
  items: Log[] | null,
};

const INITIAL_STATE: LogsState = {
  items: null,
};

const safelySetLogs = (state: LogsState, logs: Log[]): LogsState => ({
  ...state,
  items: logs,
});

export default createReducer<LogsState>(
  INITIAL_STATE,
  builder => builder
    .addCase(
      GameActionFactory.setGame,
      (state, { payload: { logs } }) => safelySetLogs(state, logs),
    ),
);
