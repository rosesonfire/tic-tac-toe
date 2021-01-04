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

import {
  selector as logsSelector,
  LogsSelectorsResult,
} from './logs';

export type GameSelectorsResult = {
  grid: GridSelectorsResult,
  isInitialized: boolean,
  logs: LogsSelectorsResult,
  players: PlayerSelectorsResult,
};

export default createStructuredSelector<GameState | undefined, GameSelectorsResult>({
  grid: state => gridSelector(state?.grid),
  isInitialized: state => Boolean(state?.players.active),
  logs: state => logsSelector(state?.logs),
  players: state => playersSelector(state?.players),
});
