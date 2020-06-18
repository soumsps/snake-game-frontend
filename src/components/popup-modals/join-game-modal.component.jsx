import React, { useState, memo, useRef, useEffect } from 'react';
import { API_URL } from '../../game-utility/constant';
import Modal from '../modal/modal.component';

const JoinGameModal = (props) => {
  const gameID = useRef(props.gameId);

  useEffect(() => {
    props.ws.current.onmessage = (message) => {
      const res = JSON.parse(message.data);
      console.log(res);
      if (res.method === 'CONNECT' && !props.playerID.current) {
        props.playerID.current = res.playerID;
      }

      if (res.method === 'JOINED') {
        console.log(res.food);
      }
    };
  }, []);

  const handleNewGameFormSubmit = (event) => {
    event.preventDefault();
    const payLoad = {
      method: 'JOIN',
      playerID: props.playerID.current,
      gameID: gameID.current,
      playerName: props.playerName.current,
    };
    props.ws.current.send(JSON.stringify(payLoad));
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
                props.playerName.current = event.target.value;
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
