import React from 'react';
import { NextPage } from 'next';

import { Game, Layout } from '@components';

const Index: NextPage = () => (
  <Layout pageTitle="Tic Tac Toe">
    <Game />
  </Layout>
);

export default Index;
