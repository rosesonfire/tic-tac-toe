import { combineEpics, Epic, ofType } from 'redux-observable';
import { from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { GameActionFactory } from '@redux/ducks/game/actions';
import Mutations from 'graphql/mutations';

import { PlayerActionFactory } from './actions';

const makeMove: Epic = $action => $action.pipe(
  ofType<ReturnType<typeof PlayerActionFactory.makeMove>>(
    PlayerActionFactory.makeMove.type,
  ),

  mergeMap(
    ({ payload: { col, player, row } }) => from(
      Mutations
        .makeMove(row, col, player)
        .then(resp => resp?.data?.makeMove),
    ),
  ),

  map(game => (
    game
      ? GameActionFactory.setGame(game)
      : GameActionFactory.failSettingGame()
  )),
);

export default combineEpics(
  makeMove,
);
