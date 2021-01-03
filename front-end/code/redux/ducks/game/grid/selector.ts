import { createStructuredSelector } from 'reselect';

import { GridState } from './reducer';

export type GridSelectorsResult = GridState;

export default createStructuredSelector<GridState | undefined, GridSelectorsResult>({
  rows: state => state?.rows ?? null,
});
