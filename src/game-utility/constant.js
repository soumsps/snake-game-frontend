const API_URL = 'wss://snake-websocket-deploy.herokuapp.com/';

const DEFAULT_BOARD_SIZE = {
  row: 30,
  column: 50,
};

const DEFAULT_SNAKE_DATA = {
  playerID: 'single-player',
  body: [
    [4, 7],
    [4, 6],
    [4, 5],
  ],
  color: 'red',
  speed: 160,
  direction: 'down',
};

const DEFAULT_IS_SINGLE_PLAYER_MODE = true;
const DEFAULT_GAME_STATUS = 'not-started'; // possible modes: not-started, playing, paused, and finished

export {
  DEFAULT_BOARD_SIZE,
  DEFAULT_IS_SINGLE_PLAYER_MODE,
  DEFAULT_GAME_STATUS,
  DEFAULT_SNAKE_DATA,
  API_URL,
};
