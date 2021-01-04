import { createStructuredSelector } from 'reselect';

import { LogsState } from './reducer';

export type LogsSelectorsResult = LogsState;

export default createStructuredSelector<LogsState | undefined, LogsSelectorsResult>({
  logs: state => state?.logs ?? null,
});
