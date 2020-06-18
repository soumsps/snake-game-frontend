import React, { useRef, useEffect, useCallback } from 'react';
import HomePage from './pages/homepage/homepage.component';
import MultiplayerPage from './pages/multiplayer/multiplayer.component';
import { Router } from '@reach/router';
import './App.css';

function App() {
  const playerID = useRef(null);
  const playerName = useRef(null);
  const ws = useRef(null);
  const timerID = useRef(0);

  const keepAlive = useCallback(() => {
    const timeout = 20000;
    if (ws.current.readyState === ws.current.OPEN) {
      ws.current.send(JSON.stringify({ method: 'check' }));
    }
    timerID.current = setTimeout(keepAlive, timeout);
  }, []);

  const cancelKeepAlive = useCallback(() => {
    if (timerID.current) {
      clearTimeout(timerID.current);
    }
  }, []);

  useEffect(() => {
    ws.current = new WebSocket('wss://snake-websocket-deploy.herokuapp.com/');
    console.log('app.js:', ws.current);

    ws.current.onopen = () => {
      keepAlive();
    };

    ws.current.onclose = () => {
      cancelKeepAlive();
    };

    ws.current.onmessage = (message) => {
      const res = JSON.parse(message.data);
      console.log('response: ', res);
      if (res.method === 'CONNECT' && !playerID.current) {
        playerID.current = res.playerID;
      }
    };
  }, [keepAlive, cancelKeepAlive]);

  return (
    <div className="App">
      <Router>
        <HomePage
          path="/"
          ws={ws}
          playerID={playerID}
          playerName={playerName}
        />
        <MultiplayerPage
          path="multiplayer/:gameId"
          ws={ws}
          playerID={playerID}
          playerName={playerName}
        />
      </Router>
    </div>
  );
}

export default App;
