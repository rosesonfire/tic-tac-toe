import React, { useState } from 'react';
import { NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { ChangeHandler } from '@utils/react-utils';
import { PlayerActionFactory } from '@redux/ducks/game/players/actions';
import { selector, State } from '@redux/ducks';
import { Offset, Player, propTypes } from '@feTypes/business';
import { noop } from '@utils';

import styles from './gameGridItem.module.scss';

type Props = {
  col: Offset,
  row: Offset,
};

const GameGridItem: NextPage<Props> = ({ col, row }) => {
  const [shouldShowOff, setShouldShowOff] = useState(true);
  const dispatch = useDispatch();

  const {
    game: {
      gameResult: {
        isCompleted,
      },
      grid: {
        rows,
      },
      players: {
        active: activePlayer,
      },
    },
  } = useSelector<State, ReturnType<typeof selector>>(selector);

  setTimeout(() => setShouldShowOff(false), 2000);

  const isLoading = shouldShowOff || !rows;
  const player = rows?.[row].items[col];
  const isClickable = !isLoading && !isCompleted && !player;

  const handleClick = ChangeHandler.getClickHandler(
    () => activePlayer && dispatch(PlayerActionFactory.makeMove(row, col, activePlayer)),
  );

  return (
    <div
      className={classNames({
        [styles['fe-GameGridItem']]: true,
        [styles['fe-GameGridItem--player1']]: player === Player.X,
        [styles['fe-GameGridItem--player2']]: player === Player.O,
        [styles['is-loading']]: isLoading,
        [styles['is-disabled']]: !isClickable,
      })}
      onClick={isClickable ? handleClick : noop}
    >
      {isLoading ? null : player}
    </div>
  );
};

GameGridItem.propTypes = {
  col: propTypes.col.isRequired,
  row: propTypes.row.isRequired,
};

export default GameGridItem;
