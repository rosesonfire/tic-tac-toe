import { createStructuredSelector } from 'reselect';

import { GameResultState, GameState } from './reducer';

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

type GameResultSelectorResult = GameResultState;

const gameResultSelector = createStructuredSelector<
GameResultState | undefined,
GameResultSelectorResult
>({
  isCompleted: state => state?.isCompleted ?? false,
  winner: state => state?.winner ?? null,
});

export type GameSelectorsResult = {
  gameResult: GameResultSelectorResult,
  grid: GridSelectorsResult,
  isInitialized: boolean,
  logs: LogsSelectorsResult,
  players: PlayerSelectorsResult,
};

export default createStructuredSelector<GameState | undefined, GameSelectorsResult>({
  gameResult: state => gameResultSelector(state?.gameResult),
  grid: state => gridSelector(state?.grid),
  isInitialized: state => Boolean(state?.players.active),
  logs: state => logsSelector(state?.logs),
  players: state => playersSelector(state?.players),
});
