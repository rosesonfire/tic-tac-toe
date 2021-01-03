import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import {
  Link as MaterialLink,
  Typography,
} from '@material-ui/core';

import { Game, Layout } from '@components';

const Index: NextPage = () => (
  <Layout pageTitle="First Post">
    <Typography variant="h1">
      Read
      <Link href="/rendering/FirstPost">
        <MaterialLink>
          this page!
        </MaterialLink>
      </Link>
    </Typography>

    <Game />
  </Layout>
);

export default Index;
