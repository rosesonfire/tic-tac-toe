import React, { FC, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ChangeHandler, DefaultProps } from '@utils/react-utils';
import { useSwitch } from '@hooks';

import styles from './modal.module.scss';

export type Props = {
  closeModal?: () => void,
  description: string,
  isShown: boolean,
  name: string,
};

const DEFAULT_PROPS: DefaultProps<Props> = {
  closeModal: () => { },
};

const Modal: FC<Props> = ({
  closeModal = DEFAULT_PROPS.closeModal,
  description,
  isShown,
  name,
}) => {
  const [isDisplayed,, setIsDisplayed] = useSwitch();
  const handleEscapePress = (event: KeyboardEvent) => {
    if (['Escape', 'Esc'].includes(event.key)) {
      closeModal();
    }
  };

  const addKeyDownEventListener = () => document.addEventListener('keydown', handleEscapePress);
  const removeKeyDownEventListener = () => document.removeEventListener('keydown', handleEscapePress);

  useEffect(() => {
    if (isShown) {
      addKeyDownEventListener();
      setIsDisplayed(true);
    } else if (isDisplayed) {
      removeKeyDownEventListener();

      setTimeout(() => setIsDisplayed(false), 500);
    }

    return () => removeKeyDownEventListener();
  }, [isShown]);

  return (
    <div
      className={classNames({
        [styles['fe-Modal']]: true,
        [styles['is-shown']]: isShown || isDisplayed,
        [styles['is-blurring']]: !isShown && isDisplayed,
      })}
    >
      <div className={styles['fe-Modal-backdrop']} />

      <div
        className={styles['fe-Modal-contentWrapper']}
        onClick={ChangeHandler.getClickHandler(closeModal)}
        onKeyDown={() => { }}
        role="button"
        tabIndex={0}
      >
        <div
          className={styles['fe-Modal-content']}
          onClick={ChangeHandler.getClickHandler(() => { })}
          onKeyDown={() => { }}
          role="button"
          tabIndex={-1}
        >
          <div className={styles['fe-Modal-header']}>
            {name}
          </div>

          <div className={styles['fe-Modal-body']}>
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func,
  description: PropTypes.string.isRequired,
  isShown: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};

Modal.defaultProps = DEFAULT_PROPS;

export default Modal;
