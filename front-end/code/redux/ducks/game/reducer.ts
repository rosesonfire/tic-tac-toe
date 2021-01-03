import { CombinedState, combineReducers } from 'redux';

import {
  PlayersState,
  reducer as playersReducer,
} from './players';

import {
  GridState,
  reducer as gridReducer,
} from './grid';

export type GameState = CombinedState<{
  grid: GridState,
  players: PlayersState,
}>;

export default combineReducers<GameState>({
  grid: gridReducer,
  players: playersReducer,
});
