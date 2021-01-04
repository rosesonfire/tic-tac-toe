import React from 'react';
import { NextPage } from 'next';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { DefaultProps } from '@utils/react-utils';
import { selector, State } from '@redux/ducks';
import { GameStateMarkerMessage, Player } from '@feTypes/business';

import Log from './Log';
import styles from './logs.module.scss';
import GameStateMarker, { Props as GameStateMarkerProps } from './GameStateMarker';

type Props = {
  className?: string,
};

const DEFAULT_PROPS: DefaultProps<Props> = {
  className: '',
};

const Logs: NextPage<Props> = ({ className = DEFAULT_PROPS.className }) => {
  const {
    game: {
      gameResult: {
        isCompleted,
        winner,
      },
      logs: {
        items: logItems,
      },
    },
  } = useSelector<State, ReturnType<typeof selector>>(selector);

  const winnerStateMarkerProps: GameStateMarkerProps | null = winner && {
    message: winner === Player.X
      ? GameStateMarkerMessage.PLAYER_1_WON
      : GameStateMarkerMessage.PLAYER_2_WON,

    winner,
  };

  const gameStateMarkerProps: GameStateMarkerProps | null = winnerStateMarkerProps
    ?? (
      isCompleted ? { message: GameStateMarkerMessage.GAME_DRAWN } : null
    );

  return (
    <div
      className={classNames({
        [styles['fe-Logs']]: true,
        [className]: className,
      })}
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      {gameStateMarkerProps && <GameStateMarker {...gameStateMarkerProps} />}

      {logItems?.slice().reverse()?.map(({
        col,
        id,
        player,
        row,
      }) => (
        <Log key={id} col={col} player={player} row={row} />
      ))}

      <GameStateMarker message={GameStateMarkerMessage.GAME_STARTED} noAnimation />
    </div>
  );
};

Logs.propTypes = {
  className: PropTypes.string,
};

Logs.defaultProps = DEFAULT_PROPS;

export default Logs;
