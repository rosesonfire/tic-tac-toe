import React from 'react';
import { NextPage } from 'next';

import { Player } from '@feTypes/business';

import GameGridItem from './GameGridItem';
import styles from './gameGridRow.module.scss';

const GameGridRow: NextPage = () => (
  <div className={styles['fe-GameGridRow']}>
    <GameGridItem player={Player.O} />
    <GameGridItem player={Player.X} />
    <GameGridItem player={Player.O} />
  </div>
);

export default GameGridRow;
