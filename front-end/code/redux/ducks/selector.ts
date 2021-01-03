import { createStructuredSelector } from 'reselect';

import { getClientOrServerSide } from '@utils/next';

import { State } from './reducer';

import {
  GameSelectorsResult,
  selector as gameSelector,
} from './game';

export type SelectorsResult = {
  game: GameSelectorsResult,
};

export default createStructuredSelector<State | undefined, SelectorsResult>({
  game: state => gameSelector(state?.[getClientOrServerSide()].game),
});
