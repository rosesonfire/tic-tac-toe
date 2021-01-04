import React from 'react';
import { NextPage } from 'next';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { DefaultProps } from '@utils/react-utils';

import StartNewGame from './StartNewGame';
import styles from './actionButtons.module.scss';

type Props = {
  className?: string,
};

const DEFAULT_PROPS: DefaultProps<Props> = {
  className: '',
};

const ActionButtons: NextPage<Props> = ({ className = DEFAULT_PROPS.className }) => (
  <div
    className={classNames({
      [styles['fe-ActionButtons']]: true,
      [className]: className,
    })}
  >
    <StartNewGame />
  </div>
);

ActionButtons.propTypes = {
  className: PropTypes.string,
};

ActionButtons.defaultProps = DEFAULT_PROPS;

export default ActionButtons;
