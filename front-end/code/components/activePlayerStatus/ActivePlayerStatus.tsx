import React, { useState } from 'react';
import { NextPage } from 'next';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { Player } from '@feTypes/business';
import { selector, State } from '@redux/ducks';

import styles from './activePlayerStatus.module.scss';

// TODO: Make this dynamic
const playerNames = {
  [Player.X]: 'Player One',
  [Player.O]: 'Player Two',
};

const ActivePlayerStatus: NextPage = () => {
  const [shouldShowOff, setShouldShowOff] = useState(true);

  const {
    game: {
      players: {
        active: activePlayer,
      },
    },
  } = useSelector<State, ReturnType<typeof selector>>(selector);

  setTimeout(() => setShouldShowOff(false), 2000);

  return (
    <div
      className={classNames({
        [styles['fe-ActivePlayerStatus']]: true,
        [styles['fe-ActivePlayerStatus--player1']]: activePlayer === Player.X,
        [styles['fe-ActivePlayerStatus--player2']]: activePlayer === Player.O,
        [styles['is-loading']]: shouldShowOff || !activePlayer,
      })}
    >
      <div className={styles['fe-ActivePlayerStatus-name']}>
        {(!shouldShowOff && activePlayer)
          ? playerNames[activePlayer]
          : 'Loading...'}
      </div>
    </div>
  );
};

export default ActivePlayerStatus;
