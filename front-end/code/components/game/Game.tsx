import React from 'react';
import { NextPage } from 'next';

import { ActivePlayerStatus, ActionButtons, GameGrid, Logs } from '@components';

import styles from './game.module.scss';

const Game: NextPage = () => (
  <div className={styles['fe-Game']}>
    <ActivePlayerStatus />
    <GameGrid />
    <ActionButtons />
    <Logs />
  </div>
);

export default Game;
