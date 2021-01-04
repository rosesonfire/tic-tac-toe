import React from 'react';
import { NextPage } from 'next';

import StartNewGame from './StartNewGame';
import styles from './actionButtons.module.scss';

const ActionButtons: NextPage = () => (
  <div className={styles['fe-ActionButtons']}>
    <StartNewGame />
  </div>
);

export default ActionButtons;
