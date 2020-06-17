import React, { useContext } from 'react';
import ModalContext from './modal-context.component';

const Dialog = (props) => {
  const { maxWidth, maxHeight } = useContext(ModalContext);
  const computedStyle = {
    maxWidth: `${maxWidth}px`,
    maxHeight: `${maxHeight}px`,
  };
  return (
    <div className="modal-dialog" style={computedStyle}>
      {props.children}
    </div>
  );
};

export default Dialog;
