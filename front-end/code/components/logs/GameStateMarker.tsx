import React from 'react';
import { NextPage } from 'next';
import classNames from 'classnames';
import PropTypes from 'prop-types';

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
  noAnimation?: boolean,
  winner?: PossiblePlayer,
};

const DEFAULT_PROPS: DefaultProps<Props> = {
  noAnimation: false,
  winner: null,
};

const GameStateMarker: NextPage<Props> = ({
  message,
  noAnimation = DEFAULT_PROPS.noAnimation,
  winner = DEFAULT_PROPS.winner,
}) => (
  <div
    className={classNames({
      [styles['fe-GameStateMarker']]: true,
      [styles['fe-GameStateMarker--player1']]: winner === Player.X,
      [styles['fe-GameStateMarker--player2']]: winner === Player.O,
      [styles['fe-GameStateMarker--noAnimation']]: noAnimation,
    })}
  >
    {message}
  </div>
);

GameStateMarker.propTypes = {
  message: propTypes.gameStateMarker.isRequired,
  noAnimation: PropTypes.bool,
  winner: propTypes.player,
};

GameStateMarker.defaultProps = DEFAULT_PROPS;

export default GameStateMarker;
