import React from 'react';
import PropTypes from 'prop-types';
import { NextPage } from 'next';
import Head from 'next/head';

import { Children } from '@utils/react-utils';

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

    <div className="fe-Layout">
      <main>{children}</main>
    </div>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  pageTitle: PropTypes.string.isRequired,
};

export default Layout;
