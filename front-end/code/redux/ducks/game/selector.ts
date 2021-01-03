import { createStructuredSelector } from 'reselect';

import { GameState } from './reducer';

import {
  selector as playersSelector,
  PlayerSelectorsResult,
} from './players';

import {
  selector as gridSelector,
  GridSelectorsResult,
} from './grid';

export type GameSelectorsResult = {
  grid: GridSelectorsResult,
  isInitialized: boolean,
  players: PlayerSelectorsResult,
};

export default createStructuredSelector<GameState | undefined, GameSelectorsResult>({
  grid: state => gridSelector(state?.grid),
  isInitialized: state => Boolean(state?.players.active),
  players: state => playersSelector(state?.players),
});
