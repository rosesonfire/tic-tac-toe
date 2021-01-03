import React from 'react';
import { NextPage } from 'next';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { Player } from '@feTypes/business';
import { selector, State } from '@redux/ducks';

import styles from './activePlayerStatus.module.scss';

const ActivePlayerStatus: NextPage = () => {
  // const { game: { playerNames } } = useSelector<State, ReturnType<typeof selector>>(selector);

  const {
    game: {
      players: {
        active: activePlayer,
      },
    },
  } = useSelector<State, ReturnType<typeof selector>>(selector);

  const playerNames = {
    [Player.O]: 'hello mr. long logngfsdfsdf sfd name ',
    [Player.X]: 'shrtNm',
  };

  return (
    <div
      className={classNames({
        [styles['fe-ActivePlayerStatus']]: true,
        [styles['fe-ActivePlayerStatus--player1']]: activePlayer === Player.O,
        [styles['fe-ActivePlayerStatus--player2']]: activePlayer === Player.X,
        [styles['is-loading']]: !activePlayer,
      })}
    >
      <div className={styles['fe-ActivePlayerStatus-name']}>{activePlayer ? playerNames[activePlayer] : 'Loading...'}</div>
    </div>
  );
};

export default ActivePlayerStatus;
