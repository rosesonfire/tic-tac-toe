import { combineEpics, Epic, ofType } from 'redux-observable';
import { from, EMPTY } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { Mutations, Queries } from '@graphql';
import { Environment } from '@constants';
import CONFIG from '@config';

import { GameActionFactory } from './actions';
import { epic as playersEpic } from './players';

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

const failInitialization: Epic = $action => $action.pipe(
  ofType<ReturnType<typeof GameActionFactory.failSettingGame>>(
    GameActionFactory.failSettingGame.type,
  ),

  mergeMap(() => {
    const errorMessage = CONFIG.ENV === Environment.development
      ? 'Failed to set game. Please check if all services in docker-compose are running.'
      : 'Failed to set game.';

    // eslint-disable-next-line no-console
    console.error(errorMessage);

    return EMPTY;
  }),
);

export default combineEpics(
  failInitialization,
  initializeGame,
  playersEpic,
  startNewGame,
);
