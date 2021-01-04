import React, { FC } from 'react';
import PropTypes from 'prop-types';

import { ChangeHandler, Children } from '@utils/react-utils';

import styles from './button.module.scss';

export type Props = {
  children: Children,
  onClick: () => any
};

const Button: FC<Props> = ({ children, onClick }) => (
  <button
    className={styles['fe-Button']}
    onClick={ChangeHandler.getClickHandler(onClick)}
    type="button"
  >
    <span className={styles['fe-Button-text']}>
      <strong>
        {children}
      </strong>
    </span>
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
