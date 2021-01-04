import { createReducer } from '@reduxjs/toolkit';

import { ErrorType, ErrorFactory } from '@errors';
import { Log, Player } from '@feTypes/business';

import { GameActionFactory } from '../actions';

export type PlayersState = {
  active: Player | null,
};

const INITIAL_STATE: PlayersState = {
  active: null,
};

const createActivePlayerAlreadySetError = (player: Player) => ErrorFactory.createError(
  ErrorType.OBJECT_ALREADY_EXISTS,
  `Active player already set to ${player}`,
);

const safelySetActivePlayer = (
  state: PlayersState,
  player: Player,
  logs: Log[],
): PlayersState => {
  const { active } = state;
  const isNewGame = logs.length === 0;

  if (!isNewGame && active === player) {
    // eslint-disable-next-line no-console
    console.error(createActivePlayerAlreadySetError(player));
  }

  return {
    ...state,
    active: player,
  };
};

export default createReducer<PlayersState>(
  INITIAL_STATE,
  builder => builder
    .addCase(
      GameActionFactory.setGame,
      (state, { payload: { activePlayer, logs } }) => safelySetActivePlayer(
        state,
        activePlayer,
        logs,
      ),
    ),
);
