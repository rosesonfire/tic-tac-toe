import { Game } from '@feTypes/business';
import { createAction } from '@reduxjs/toolkit';

enum ActionType {
  INITIALIZE_GAME = 'INITIALIZE_GAME',
  SET_GAME = 'SET_GAME',
  FAIL_SETTING_GAME = 'FAIL_SETTING_GAME',
}

// eslint-disable-next-line import/prefer-default-export
export class GameActionFactory {
  static failSettingGame = createAction(
    ActionType.FAIL_SETTING_GAME,
    () => ({
      payload: null,
    }),
  );

  static initializeGame = createAction(
    ActionType.INITIALIZE_GAME,
    () => ({
      payload: null,
    }),
  );

  static setGame = createAction(
    ActionType.SET_GAME,
    (game: Game) => ({
      payload: game,
    }),
  );
}
