import React from 'react';
import { NextPage } from 'next';
import classNames from 'classnames';

import { Offset, Player, propTypes } from '@feTypes/business';
import { PLAYER_NAMES } from '@constants';

import styles from './log.module.scss';

type Props = {
  col: Offset,
  player: Player,
  row: Offset,
};

const Log: NextPage<Props> = ({ col, player, row }) => (
  <div
    className={classNames({
      [styles['fe-Log']]: true,
      [styles['fe-Log--player1']]: player === Player.X,
      [styles['fe-Log--player2']]: player === Player.O,
    })}
  >
    {`${PLAYER_NAMES[player]} / row ${row + 1} / col ${col + 1}`}
  </div>
);

Log.propTypes = {
  col: propTypes.col.isRequired,
  player: propTypes.player.isRequired,
  row: propTypes.row.isRequired,
};

export default Log;
