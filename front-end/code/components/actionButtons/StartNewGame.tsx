import React from 'react';
import { NextPage } from 'next';
import { useDispatch } from 'react-redux';

import { Button } from '@components';
import { GameActionFactory } from '@redux/ducks/game/actions';

import styles from './startNewGame.module.scss';

const StartNewGame: NextPage = () => {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(GameActionFactory.startNewGame());

  return (
    <div className={styles['fe-StartNewGame']}>
      <Button onClick={handleClick}>
        Start New Game
      </Button>
    </div>
  );
};

export default StartNewGame;
