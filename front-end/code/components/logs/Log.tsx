import React from 'react';
import { NextPage } from 'next';

import styles from './log.module.scss';

const Log: NextPage = () => (
  <div className={styles['fe-Log']}>
    Game log
  </div>
);

export default Log;
