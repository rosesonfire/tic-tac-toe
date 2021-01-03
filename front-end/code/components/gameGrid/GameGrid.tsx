import React from 'react';
import { NextPage } from 'next';

import GameGridRow from './GameGridRow';
import styles from './gameGrid.module.scss';

const GameGrid: NextPage = () => (
  <div className={styles['fe-GameGrid']}>
    Game grid
    <GameGridRow offset={0} />
    <GameGridRow offset={1} />
    <GameGridRow offset={2} />
  </div>
);

export default GameGrid;
