import React from 'react';
import { NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ChangeHandler } from '@utils/react-utils';
import { PlayerActionFactory } from '@redux/ducks/game/players/actions';
import { selector, State } from '@redux/ducks';
import { Offset } from '@feTypes/business';
import { noop } from '@utils';

import styles from './gameGridItem.module.scss';

type Props = {
  col: Offset,
  row: Offset,
};

const GameGridItem: NextPage<Props> = ({ col, row }) => {
  const dispatch = useDispatch();

  const {
    game: {
      grid: {
        rows,
      },
      players: {
        active: activePlayer,
      },
    },
  } = useSelector<State, ReturnType<typeof selector>>(selector);

  const isLoading = !rows;
  const player = rows?.[row].items[col];

  const handleClick = ChangeHandler.getClickHandler(
    () => activePlayer && dispatch(PlayerActionFactory.makeMove(row, col, activePlayer)),
  );

  return (
    <div
      className={classNames({
        [styles['fe-GameGridItem']]: true,
        [styles['is-loading']]: isLoading,
      })}
      onClick={isLoading ? noop : handleClick}
    >
      {player}
    </div>
  );
};

GameGridItem.propTypes = {
  col: PropTypes.oneOf<Offset>([0, 1, 2]).isRequired,
  row: PropTypes.oneOf<Offset>([0, 1, 2]).isRequired,
};

export default GameGridItem;
