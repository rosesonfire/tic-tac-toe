import React from 'react';
import { NextPage } from 'next';

import GameGridRow from './GameGridRow';

const GameGrid: NextPage = () => (
  <div className="fe-GameGrid">
    <GameGridRow offset={0} />
    <GameGridRow offset={1} />
    <GameGridRow offset={2} />
  </div>
);

export default GameGrid;
