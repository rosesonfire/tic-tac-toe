import { createStructuredSelector } from 'reselect';

import { PlayersState } from './reducer';

export type PlayerSelectorsResult = {
  active: PlayersState['active'],
};

export default createStructuredSelector<PlayersState | undefined, PlayerSelectorsResult>({
  active: state => state?.active ?? null,
});
