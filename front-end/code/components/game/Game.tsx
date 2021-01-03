import React from 'react';
import { NextPage } from 'next';

import { ActivePlayerStatus, GameGrid, Logs } from '@components';

import styles from './game.module.scss';

const Game: NextPage = () => (
  <div className={styles['fe-Game']}>
    <ActivePlayerStatus />
    <GameGrid />
    <Logs />
  </div>
);

export default Game;
