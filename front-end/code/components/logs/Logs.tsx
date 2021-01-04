import React from 'react';
import { NextPage } from 'next';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { DefaultProps } from '@utils/react-utils';

import Log from './Log';
import styles from './logs.module.scss';

type Props = {
  className?: string,
};

const DEFAULT_PROPS: DefaultProps<Props> = {
  className: '',
};

const Logs: NextPage<Props> = ({ className = DEFAULT_PROPS.className }) => (
  <div
    className={classNames({
      [styles['fe-Logs']]: true,
      [className]: className,
    })}
  >
    <Log />
    <Log />
  </div>
);

Logs.propTypes = {
  className: PropTypes.string,
};

Logs.defaultProps = DEFAULT_PROPS;

export default Logs;
