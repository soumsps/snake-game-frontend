import React, { useEffect, useCallback } from 'react';
import ModalContext from './modal-context.component';
import Backdrop from './modal-backdrop.component';
import Body from './modal-body.component';
import Dialog from './modal-dialog.component';
import Header from './modal-header.component';
import Title from './modal-title.component';
import Footer from './modal-footer.component';
import './modal.styles.css';

const defaultValues = {
  backdrop: true,
  closeButton: true,
  onEscapeClose: true,
  backdropModalCloseId: 'modal-container',
  maxWidth: 350,
  maxHeight: 400,
};

const { Provider } = ModalContext;

const Modal = (props) => {
  const newModalValue = { ...defaultValues, ...props };

  const handleKeyboardButton = useCallback(
    (event) => {
      // keyboard escape key
      if (event.keyCode === 27 && newModalValue.onEscapeClose) {
        event.preventDefault();
        newModalValue.closeModalCallback(false);
      }

      // keyboard tab key
      if (event.keyCode === 9) {
        if (event.target.getAttribute('data-last-focusable')) {
          event.preventDefault();
          document.querySelector('[data-modal-close-button]').focus();
        } else if (event.target.getAttribute('data-modal-close-button')) {
          event.preventDefault();
          document.querySelector('[data-first-focusable]').focus();
        }
      }
    },
    [newModalValue]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboardButton, false);
    if (
      !!document.querySelector('[data-first-focusable]') &&
      !!document.querySelector('[data-last-focusable]')
    ) {
      document.querySelector('[data-first-focusable]').focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyboardButton, false);
    };
  }, [handleKeyboardButton]);

  return (
    <Provider value={newModalValue}>
      <Backdrop>
        <div id={newModalValue.backdropModalCloseId} className="modal-container">
          <Dialog>{props.children}</Dialog>
        </div>
      </Backdrop>
    </Provider>
  );
};

Modal.Header = Header;
Modal.Title = Title;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
