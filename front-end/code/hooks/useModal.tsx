import React, { useEffect, useState, ReactPortal } from 'react';
import { createPortal } from 'react-dom';

import { Modal } from '@components';
import { Props as ModalProps } from '@components/modal/Modal';

const getModalsContainerElement: () => Element = () => document.getElementsByClassName('fe-Modals-container')[0];

const createModalElement: () => HTMLDivElement = () => {
  const modalsContainerElement = getModalsContainerElement();
  const modalElement = document.createElement('div');

  return modalsContainerElement.appendChild(modalElement);
};

const removeModal: (modalElement: HTMLDivElement) => void = (modalElement) => {
  const modalsContainerElement = getModalsContainerElement();

  modalsContainerElement.removeChild(modalElement);
};

const useModal: (props: ModalProps) => (ReactPortal | null) = (props: ModalProps) => {
  const [modalElement, setModalElement] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    setModalElement(createModalElement());

    return () => {
      if (modalElement) {
        removeModal(modalElement);
      }
    };
  }, []);

  return modalElement && createPortal(
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Modal {...props} />,
    modalElement,
  );
};

export default useModal;
