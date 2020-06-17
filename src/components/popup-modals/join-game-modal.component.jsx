import React, { useState, memo } from 'react';
import Modal from '../modal/modal.component';

const JoinGameModal = (props) => {
  const [playerName, setPlayerName] = useState('');

  const handleNewGameFormSubmit = (event) => {
    event.preventDefault();
    console.log('join game form submit');
  };
  return (
    <Modal closeModalCallback={props.closeModalCallback}>
      <Modal.Header closeButton>
        <Modal.Title>Join Game</Modal.Title>
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
            Join game
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default memo(JoinGameModal);
