import React, { useEffect, useRef, memo } from 'react';
import Modal from '../modal/modal.component';
import { navigate } from '@reach/router';

const NewGameModal = (props) => {
  const gameID = useRef(null);

  useEffect(() => {
    console.log('new game modal: ', props.ws.current);

    props.ws.current.onmessage = (message) => {
      const res = JSON.parse(message.data);
      if (res.method === 'CONNECT') {
        props.playerID.current = res.props.playerID;
      }
      if (res.method === 'CREATED') {
        console.log(`game id is`, res.game.id);
        gameID.current = res.game.id;
        navigate(`multiplayer/${gameID.current}`);
      }
    };
  }, [props.playerID, props.ws]);

  const handleNewGameFormSubmit = (event) => {
    event.preventDefault();
    const payLoad = {
      method: 'CREATE',
      playerID: props.playerID.current,
      playerName: props.playerName.current,
    };
    props.ws.current.send(JSON.stringify(payLoad));

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
                props.playerName.current = event.target.value;
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
