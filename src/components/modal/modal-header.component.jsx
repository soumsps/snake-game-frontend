import React, { useContext } from 'react';
import ModalContext from './modal-context.component';

const Header = (props) => {
  let { closeModalCallback, closeButton, backdrop, onEscapeClose } = useContext(
    ModalContext
  );

  if (props.closeButton !== 'undefined' && typeof props.closeButton === 'boolean') {
    closeButton = props.closeButton;
  }
  if (!backdrop && !onEscapeClose) {
    closeButton = true;
  }
  const handleCloseButtonClick = () => {
    closeModalCallback(false);
  };
  return (
    <div className="modal-header">
      {props.children}
      {closeButton && (
        <button
          className="modal-closeBtn"
          aria-label="modal-closeBtn"
          data-modal-close-button="true"
          onClick={() => handleCloseButtonClick()}
        >
          X
        </button>
      )}
    </div>
  );
};

export default Header;
