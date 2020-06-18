import React, { useState, memo, useRef, useEffect } from 'react';
import { API_URL } from '../../game-utility/constant';
import Modal from '../modal/modal.component';

const JoinGameModal = (props) => {
  const gameID = useRef(props.gameId);
  const playerID = useRef(window.sessionStorage.getItem('playerID'));
  const ws = useRef(null);
  const timerID = useRef(0);

  const keepAlive = () => {
    const timeout = 20000;
    if (ws.current.readyState === ws.current.OPEN) {
      ws.current.send(JSON.stringify({ method: 'check' }));
    }
    timerID.current = setTimeout(keepAlive, timeout);
  };
  const cancelKeepAlive = () => {
    if (timerID.current) {
      clearTimeout(timerID.current);
    }
  };

  useEffect(() => {
    ws.current = new WebSocket(API_URL);
    console.log(ws.current);

    ws.current.onopen = () => {
      keepAlive();
    };
    ws.current.onclose = () => {
      cancelKeepAlive();
    };

    ws.current.onmessage = (message) => {
      const res = JSON.parse(message.data);
      console.log(res);
      if (res.method === 'CONNECT' && !playerID.current) {
        playerID.current = res.playerID;
        console.log(playerID.current);
        window.sessionStorage.setItem('playerID', playerID.current);
      }

      if (res.method === 'JOINED') {
        console.log(res.food);
      }
    };
  }, []);

  const [playerName, setPlayerName] = useState('');

  const handleNewGameFormSubmit = (event) => {
    event.preventDefault();
    const payLoad = {
      method: 'JOIN',
      playerID: playerID.current,
      gameID: gameID.current,
      playerName: playerName,
    };
    ws.current.send(JSON.stringify(payLoad));
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
