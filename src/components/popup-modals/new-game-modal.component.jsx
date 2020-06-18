import React, { useState, useEffect, useRef, memo } from 'react';
import Modal from '../modal/modal.component';
import { navigate } from '@reach/router';
import { API_URL } from '../../game-utility/constant';

const NewGameModal = (props) => {
  const gameID = useRef(null);
  const playerID = useRef(null);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(API_URL);
    console.log(ws.current);

    ws.current.onmessage = (message) => {
      const res = JSON.parse(message.data);
      if (res.method === 'CONNECT') {
        playerID.current = res.playerID;
        console.log(playerID.current);
        window.sessionStorage.setItem('playerID', playerID.current);
      }
      if (res.method === 'CREATED') {
        console.log(`game id is`, res.game.id);
        gameID.current = res.game.id;
        navigate(`multiplayer/${gameID.current}`);
      }
    };
  }, []);

  const [playerName, setPlayerName] = useState('');

  const handleNewGameFormSubmit = (event) => {
    event.preventDefault();
    const payLoad = {
      method: 'CREATE',
      playerID: playerID.current,
      playerName: playerName,
    };
    ws.current.send(JSON.stringify(payLoad));

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
