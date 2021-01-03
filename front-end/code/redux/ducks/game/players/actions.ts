import { createAction } from '@reduxjs/toolkit';

import { Offset, Player } from '@feTypes/business';

enum PlayerActionType {
  MAKE_MOVE = 'MAKE_MOVE',
}

// eslint-disable-next-line import/prefer-default-export
export class PlayerActionFactory {
  static makeMove = createAction(
    PlayerActionType.MAKE_MOVE,
    (row: Offset, col: Offset, player: Player) => ({
      payload: {
        col,
        player,
        row,
      },
    }),
  );
}
