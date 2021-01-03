import { combineEpics, Epic, ofType } from 'redux-observable';
import { from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { gql } from '@apollo/client';

import { Game } from '@feTypes/business';
import GraphQLClient from '@utils/graphql';

import { GameActionFactory } from './actions';
import { epic as playersEpic } from './players';
import { epic as gridEpic } from './grid';

const initializeGame: Epic = $action => $action.pipe(
  ofType<ReturnType<typeof GameActionFactory.initializeGame>>(
    GameActionFactory.initializeGame.type,
  ),
  mergeMap(
    () => from(
      // GraphQLClient.clear()
      Promise.resolve()
        .then(() => (
          GraphQLClient.query<{ game: Game | null }>(gql`{
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
        ))
        .then(({ data: { game } }) => game)
        .catch(err => {
          // eslint-disable-next-line no-console
          console.error('Failed to fetch game data', err);

          return null;
        }),
    ),
  ),
  map(game => (game ? GameActionFactory.setGame(game) : GameActionFactory.startNewGame())),
);

const startNewGame: Epic = $action => $action.pipe(
  ofType<ReturnType<typeof GameActionFactory.startNewGame>>(
    GameActionFactory.startNewGame.type,
  ),
  mergeMap(
    () => from(
      GraphQLClient.mutate<{ startNewGame: Game }>(gql`
        mutation {
          startNewGame {
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

          return data!.startNewGame;
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.error('Failed send request to start new game', err);

          return null;
        }),
    ),
  ),
  map(game => (game ? GameActionFactory.setGame(game) : GameActionFactory.failSettingGame())),
);

export default combineEpics(
  initializeGame,
  playersEpic,
  gridEpic,
  startNewGame,
);
