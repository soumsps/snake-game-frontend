import React, { memo, useEffect } from 'react';
import Modal from '../modal/modal.component';

const JoinGameModal = ({
  ws,
  gameID,
  playerID,
  playerName,
  closeModalCallback,
}) => {
  useEffect(() => {
    ws.current.onmessage = (message) => {
      const res = JSON.parse(message.data);
      console.log(res);
      if (res.method === 'CONNECT' && !playerID.current) {
        playerID.current = res.playerID;
      }

      if (res.method === 'JOINED') {
        closeModalCallback(false);
        console.log(res.food);
      }
    };
  }, [playerID, ws, closeModalCallback]);

  const handleNewGameFormSubmit = (event) => {
    event.preventDefault();
    const payLoad = {
      method: 'JOIN',
      playerID: playerID.current,
      gameID: gameID.current,
      playerName: playerName.current,
    };
    ws.current.send(JSON.stringify(payLoad));
    console.log('join game form submit');
  };
  return (
    <Modal closeModalCallback={closeModalCallback}>
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
                playerName.current = event.target.value;
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
