import React from 'react';
import { NextPage } from 'next';

import GameGridRow from './GameGridRow';
import styles from './gameGrid.module.scss';

const GameGrid: NextPage = () => (
  <div className={styles['fe-GameGrid']}>
    Game grid
    <GameGridRow />
    <GameGridRow />
    <GameGridRow />
  </div>
);

export default GameGrid;
