import React from 'react';
import HomePage from './pages/homepage/homepage.component';
import MultiplayerPage from './pages/multiplayer/multiplayer.component';
import { Router } from '@reach/router';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <HomePage path="/" />
        <MultiplayerPage path="multiplayer/:gameId" />
      </Router>
    </div>
  );
}

export default App;
