import React from 'react';
import PropTypes from 'prop-types';
import { NextPage } from 'next';
import Head from 'next/head';

import { Children } from '@utils/react-utils';
import { Header } from '@components';

import styles from './layout.module.scss';

type Props = {
  children: Children,
  pageTitle: string,
};

const Layout: NextPage<Props> = ({
  children,
  pageTitle,
}) => (
  <>
    <Head>
      <title>{pageTitle}</title>
    </Head>

    <div className={styles['fe-Layout']}>
      <Header />

      <main>{children}</main>
    </div>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  pageTitle: PropTypes.string.isRequired,
};

export default Layout;
