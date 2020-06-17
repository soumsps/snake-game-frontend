import React, { memo } from 'react';
import Modal from '../modal/modal.component';
import { navigate } from '@reach/router';

const LeaveMultiplayerModal = (props) => {
  const handleLeaveMultiplayerMode = (event) => {
    navigate('/');
    console.log('leave multiplayer mode confirmed');
  };
  return (
    <Modal closeModalCallback={props.closeModalCallback}>
      <Modal.Header closeButton>
        <Modal.Title>Leave Game Room</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ marginBottom: '20px' }}>
          <span style={{ color: 'grey' }}>Are you sure you want to leave?</span>
        </div>

        <button
          className="btn-danger"
          style={{ borderRadius: '5px', cursor: 'pointer' }}
          data-last-focusable="true"
          onClick={handleLeaveMultiplayerMode}
        >
          Yes, I'm sure
        </button>
      </Modal.Body>
    </Modal>
  );
};

export default memo(LeaveMultiplayerModal);
