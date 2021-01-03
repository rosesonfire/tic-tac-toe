import React from 'react';
import { NextPage } from 'next';

import Log from './Log';
import styles from './logs.module.scss';

const Logs: NextPage = () => (
  <div className={styles['fe-Logs']}>
    Game logs
    <Log />
    <Log />
  </div>
);

export default Logs;
