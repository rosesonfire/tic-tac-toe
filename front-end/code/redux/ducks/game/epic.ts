import { combineEpics, Epic, ofType } from 'redux-observable';
import { from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { Mutations, Queries } from '@graphql';

import { GameActionFactory } from './actions';
import { epic as playersEpic } from './players';
import { epic as gridEpic } from './grid';
import { epic as logsEpic } from './logs';

const initializeGame: Epic = $action => $action.pipe(
  ofType<ReturnType<typeof GameActionFactory.initializeGame>>(
    GameActionFactory.initializeGame.type,
  ),

  mergeMap(
    () => from(
      Queries
        .getGame()
        .then((resp) => resp?.data?.game),
    ),
  ),

  map(game => (
    game
      ? GameActionFactory.setGame(game)
      : GameActionFactory.startNewGame()
  )),
);

const startNewGame: Epic = $action => $action.pipe(
  ofType<ReturnType<typeof GameActionFactory.startNewGame>>(
    GameActionFactory.startNewGame.type,
  ),

  mergeMap(
    () => from(
      Mutations
        .startGame()
        .then((resp) => resp?.data?.startNewGame),
    ),
  ),

  map(game => (
    game
      ? GameActionFactory.setGame(game)
      : GameActionFactory.failSettingGame()
  )),
);

export default combineEpics(
  initializeGame,
  playersEpic,
  gridEpic,
  logsEpic,
  startNewGame,
);
