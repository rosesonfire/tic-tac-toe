import { combineEpics, Epic, ofType } from 'redux-observable';
import { from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { gql } from '@apollo/client';

import { Game } from '@feTypes/business';
import GraphQLClient from '@utils/graphql';

import { GameActionFactory } from './actions';
import { epic as playersEpic } from './players';
import { epic as gridEpic } from './grid';

type InitializeGameReturnType = ReturnType<typeof GameActionFactory.initializeGame>;

const initializeGame: Epic = $action => $action.pipe(
  ofType<InitializeGameReturnType>(GameActionFactory.initializeGame.type),
  mergeMap(
    () => from(
      GraphQLClient.get<{ game: Game }>(gql`{
        game {
          activePlayer
          isComplete
          winner
          grid {
            rows {
              items
            }
          }
        }
      }`)
        .then(({ data: { game } }) => game)
        .catch(err => {
          // eslint-disable-next-line no-console
          console.error('Failed to fetch game data', err);

          return null;
        }),
    ),
  ),
  map(game => (game ? GameActionFactory.setGame(game) : GameActionFactory.failSettingGame())),
);

export default combineEpics(
  initializeGame, playersEpic, gridEpic,
);
