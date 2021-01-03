import React from 'react';
import { NextPage } from 'next';
import { useDispatch } from 'react-redux';

import { Player } from '@feTypes/business';
import { ChangeHandler } from '@utils/react-utils';
import { PlayerActionFactory } from '@redux/ducks/game/players/actions';
import { togglePlayer } from '@utils/player';

import styles from './gameGridItem.module.scss';

type Props = {
  player: Player,
};

// eslint-disable-next-line react/prop-types
const GameGridItem: NextPage<Props> = ({ player }) => {
  const dispatch = useDispatch();

  const handleClick = ChangeHandler.getClickHandler(() => dispatch(
    PlayerActionFactory.setActivePlayer(
      togglePlayer(player),
    ),
  ));

  return (
    <div
      className={styles['fe-GameGridItem']}
      onClick={handleClick}
    >
      {player}
    </div>
  );
};

export default GameGridItem;
