import { createStructuredSelector } from 'reselect';

import { LogsState } from './reducer';

export type LogsSelectorsResult = LogsState;

export default createStructuredSelector<LogsState | undefined, LogsSelectorsResult>({
  items: state => state?.items ?? null,
});
