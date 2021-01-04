import React from 'react';
import { NextPage } from 'next';

import {
  ActivePlayerStatus,
  ActionButtons,
  GameGrid,
  Logs,
} from '@components';

import styles from './game.module.scss';

const Game: NextPage = () => (
  <div className={styles['fe-Game']}>
    <div className={styles['fe-Game-main']}>
      <ActivePlayerStatus />
      <GameGrid />
      <ActionButtons className={styles['fe-Game-actionButtons']} />
    </div>
    <Logs className={styles['fe-Game-logs']} />
  </div>
);

export default Game;
