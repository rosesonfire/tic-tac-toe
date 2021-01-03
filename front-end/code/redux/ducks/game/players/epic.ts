import { gql } from '@apollo/client';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { Game } from '@feTypes/business';
import GraphQLClient from '@utils/graphql';
import { GameActionFactory } from '@redux/ducks/game/actions';

import { PlayerActionFactory } from './actions';

const makeMove: Epic = $action => $action.pipe(
  ofType<ReturnType<typeof PlayerActionFactory.makeMove>>(
    PlayerActionFactory.makeMove.type,
  ),
  mergeMap(
    ({ payload: { col, player, row } }) => from(
      GraphQLClient.mutate<{ makeMove: Game }>(gql`
        mutation {
          makeMove(row: ${row}, col: ${col}, player: ${player}) {
            winner
            activePlayer
            grid {
              rows {
                items
              }
            }
          }
        }
      `)
        .then(({ data, errors }) => {
          if (errors) {
            // eslint-disable-next-line no-console
            console.error(errors);

            throw errors[0];
          }

          return data!.makeMove;
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.error('Failed send request to make move', err);

          return null;
        }),
    ),
  ),
  map(game => (game ? GameActionFactory.setGame(game) : GameActionFactory.failSettingGame())),
);

export default combineEpics(
  makeMove,
);
