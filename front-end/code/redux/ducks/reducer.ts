import { CombinedState, combineReducers } from 'redux';

import { ClientServer } from '@feTypes/application';
import { getClientOrServerSide } from '@utils/next';

import {
  GameState,
  reducer as gameReducer,
} from './game';

type AppState = CombinedState<{
  game: GameState,
}>;

const appReducer = combineReducers<AppState>({
  game: gameReducer,
});

export type State = CombinedState<{
  [ClientServer.CLIENT]: AppState,
  [ClientServer.SERVER]: AppState,
}>;

const isInitializationCall = (state?: AppState): state is undefined => !state;

const isOnCorrectSide = (targetSide: ClientServer) => {
  const side = getClientOrServerSide();

  return (targetSide === ClientServer.SERVER && side === ClientServer.SERVER)
    || (targetSide === ClientServer.CLIENT && side === ClientServer.CLIENT);
};

const reducerWrapper = (
  wrappedReducer: typeof appReducer,
  targetSide: ClientServer,
): typeof appReducer => (state, action) => (
  (isInitializationCall(state) || isOnCorrectSide(targetSide))
    ? wrappedReducer(state, action)
    : { ...state }
);

export default combineReducers<State>({
  [ClientServer.CLIENT]: reducerWrapper(appReducer, ClientServer.CLIENT),
  [ClientServer.SERVER]: reducerWrapper(appReducer, ClientServer.SERVER),
});
