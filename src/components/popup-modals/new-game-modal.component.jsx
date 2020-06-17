import React, { useState, memo } from 'react';
import Modal from '../modal/modal.component';
import { navigate } from '@reach/router';
import { API_URL } from '../../game-utility/constant';

const NewGameModal = (props) => {
  let wss = new WebSocket(API_URL);
  console.log(wss);

  const [playerName, setPlayerName] = useState('');

  const handleNewGameFormSubmit = (event) => {
    event.preventDefault();
    navigate('multiplayer/asaddsf');
    console.log('newGame form submit');
  };
  return (
    <Modal closeModalCallback={props.closeModalCallback}>
      <Modal.Header closeButton>
        <Modal.Title>Create Game Room</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={(event) => handleNewGameFormSubmit(event)}>
          <div className="form-input" style={{ marginBottom: '20px' }}>
            <input
              tabIndex="1"
              type="text"
              id="playername"
              placeholder="Enter player name"
              required
              data-first-focusable="true"
              onChange={(event) => {
                setPlayerName(event.target.value);
              }}
            />
          </div>

          <button
            className="btn-success"
            style={{ borderRadius: '5px', cursor: 'pointer' }}
            data-last-focusable="true"
          >
            Create room
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default memo(NewGameModal);
