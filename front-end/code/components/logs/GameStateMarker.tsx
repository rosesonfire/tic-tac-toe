import React from 'react';
import { NextPage } from 'next';
import classNames from 'classnames';

import { DefaultProps } from '@utils/react-utils';
import {
  GameStateMarkerMessage,
  Player,
  PossiblePlayer,
  propTypes,
} from '@feTypes/business';

import styles from './gameStateMarker.module.scss';

export type Props = {
  message: GameStateMarkerMessage,
  winner?: PossiblePlayer,
};

const DEFAULT_PROPS: DefaultProps<Props> = {
  winner: null,
};

const GameStateMarker: NextPage<Props> = ({
  message,
  winner = DEFAULT_PROPS.winner,
}) => (
  <div
    className={classNames({
      [styles['fe-GameStateMarker']]: true,
      [styles['fe-GameStateMarker--player1']]: winner === Player.X,
      [styles['fe-GameStateMarker--player2']]: winner === Player.O,
    })}
  >
    {message}
  </div>
);

GameStateMarker.propTypes = {
  message: propTypes.gameStateMarker.isRequired,
  winner: propTypes.player,
};

GameStateMarker.defaultProps = DEFAULT_PROPS;

export default GameStateMarker;
