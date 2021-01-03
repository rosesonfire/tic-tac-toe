import React from 'react';
import { NextPage } from 'next';
import PropTypes from 'prop-types';

import { Offset } from '@feTypes/business';

import GameGridItem from './GameGridItem';
import styles from './gameGridRow.module.scss';

type Props = {
  offset: Offset,
};

const GameGridRow: NextPage<Props> = ({ offset }) => (
  <div className={styles['fe-GameGridRow']}>
    <>
      <GameGridItem col={0} row={offset} />
      <GameGridItem col={1} row={offset} />
      <GameGridItem col={2} row={offset} />
    </>
  </div>
);

GameGridRow.propTypes = {
  offset: PropTypes.oneOf<Offset>([0, 1, 2]).isRequired,
};

export default GameGridRow;
