import React, { useState } from 'react';
import { NextPage } from 'next';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { Player } from '@feTypes/business';
import { selector, State } from '@redux/ducks';
import { PLAYER_NAMES } from '@constants';

import styles from './activePlayerStatus.module.scss';

const ActivePlayerStatus: NextPage = () => {
  const [shouldShowOff, setShouldShowOff] = useState(true);

  const {
    game: {
      gameResult: {
        isCompleted,
        winner,
      },
      players: {
        active: activePlayer,
      },
    },
  } = useSelector<State, ReturnType<typeof selector>>(selector);

  setTimeout(() => setShouldShowOff(false), 2000);

  const player = isCompleted ? winner : activePlayer;
  const isLoading = shouldShowOff || !activePlayer;
  const text = player ? PLAYER_NAMES[player] : 'DRAW';

  return (
    <div
      className={classNames({
        [styles['fe-ActivePlayerStatus']]: true,
        [styles['fe-ActivePlayerStatus--player1']]: !isLoading && player === Player.X,
        [styles['fe-ActivePlayerStatus--player2']]: !isLoading && player === Player.O,
        [styles['is-loading']]: isLoading,
        [styles['is-completed']]: isCompleted,
      })}
    >
      <div className={styles['fe-ActivePlayerStatus-name']}>
        {isLoading ? 'loading...' : text}
      </div>
    </div>
  );
};

export default ActivePlayerStatus;
