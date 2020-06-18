import React, { useEffect, useRef, memo } from 'react';
import Modal from '../modal/modal.component';
import { navigate } from '@reach/router';

const NewGameModal = ({
  ws,
  playerID,
  playerName,
  closeModalCallback,
  isGameJoined,
}) => {
  const gameID = useRef(null);

  useEffect(() => {
    ws.current.onmessage = (message) => {
      const res = JSON.parse(message.data);
      if (res.method === 'CONNECT' && !playerID.current) {
        playerID.current = res.playerID;
      }

      if (res.method === 'JOINED') {
        console.log(res.food);
        // navigate to multiplayer game link
        isGameJoined.current = true;
        navigate(`multiplayer/${gameID.current}`);
      }

      if (res.method === 'CREATED') {
        console.log(`game id is`, res.game.id);
        gameID.current = res.game.id;

        // send request to join game by host
        const payLoad = {
          method: 'JOIN',
          playerID: playerID.current,
          gameID: gameID.current,
          playerName: playerName.current,
        };
        ws.current.send(JSON.stringify(payLoad));
      }
    };
  }, [playerID, ws, playerName, isGameJoined]);

  const handleNewGameFormSubmit = (event) => {
    event.preventDefault();
    const payLoad = {
      method: 'CREATE',
      playerID: playerID.current,
      playerName: playerName.current,
    };
    ws.current.send(JSON.stringify(payLoad));

    console.log('newGame form submit');
  };

  return (
    <Modal closeModalCallback={closeModalCallback}>
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
                playerName.current = event.target.value;
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
