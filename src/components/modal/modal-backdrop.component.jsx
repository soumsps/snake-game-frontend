import React, { useContext } from 'react';
import ModalContext from './modal-context.component';

const Backdrop = (props) => {
  const { backdrop, closeModalCallback, backdropModalCloseId } = useContext(ModalContext);

  const handleCloseOnBackdropArea = (e) => {
    let id = e.target.getAttribute('id');
    if (id === backdropModalCloseId) {
      closeModalCallback(false);
    }
  };

  return backdrop ? (
    <div className="modal-backdrop" onClick={(e) => handleCloseOnBackdropArea(e)}>
      {props.children}
    </div>
  ) : (
    <>{props.children}</>
  );
};

export default Backdrop;
