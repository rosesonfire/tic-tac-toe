import { createStructuredSelector } from 'reselect';

import { GridState } from './reducer';

export type GridSelectorsResult = {
  // active: PlayersState['active'],
};

export default createStructuredSelector<GridState | undefined, GridSelectorsResult>({
  // active: state => state?.active ?? null,
});
