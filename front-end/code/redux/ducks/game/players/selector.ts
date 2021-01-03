import { createStructuredSelector } from 'reselect';

import { PlayersState } from './reducer';

export type PlayerSelectorsResult = PlayersState;

export default createStructuredSelector<PlayersState | undefined, PlayerSelectorsResult>({
  active: state => state?.active ?? null,
});
