import React, { FC } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import classNames from 'classnames';
import { Avatar, Link as MaterialLink, Typography } from '@material-ui/core';

import styles from './header.module.scss';

const name = 'Your Name';

type HeaderProps = {
  isHome: boolean,
};

const Header: FC<HeaderProps> = ({ isHome }) => (
  <header
    className={classNames({
      [styles['fe-Header']]: true,
      [styles['fe-Header--home']]: isHome,
    })}
  >
    {isHome ? (
      <>
        <Avatar alt={name} src="/images/profile.jpg" />
        <Typography variant="h1">
          {name}
        </Typography>
      </>
    ) : (
      <>
        <Link href="/">
          <Avatar alt={name} src="/images/profile.jpg" />
        </Link>
        <Typography variant="h2">
          <Link href="/">
            <MaterialLink>
              {name}
            </MaterialLink>
          </Link>
        </Typography>
      </>
    )}
  </header>
);

Header.propTypes = {
  isHome: PropTypes.bool.isRequired,
};

export default Header;
