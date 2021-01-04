import React, { FC } from 'react';

import styles from './header.module.scss';

const Header: FC = () => (
  <div className={styles['fe-Header']}>
    Tic Tac Toe
  </div>
);

export default Header;
