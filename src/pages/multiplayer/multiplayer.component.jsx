import React, { useState, useCallback, useEffect, useRef, memo } from 'react';
import GameController from '../../components/game-controller/game-controller.component';
import GameBoard from '../../components/game-board/game-board.component';
import LeaveMultiplayerModal from '../../components/popup-modals/leave-multiplayer-modal.component';
import JoinGameModal from '../../components/popup-modals/join-game-modal.component';

import CustomButton from '../../components/custom-button/custom-button.component';
import { useWindowSize } from '../../custom-hooks/use-window-size.hook';
import { useGameLoop } from '../../custom-hooks/use-game-loop.hook';
import { calculateBlockSize } from '../../game-utility/game-board';
import { drawSnake } from '../../game-utility/snake';
import { drawFood } from '../../game-utility/food';
import {
  DEFAULT_BOARD_SIZE,
  DEFAULT_GAME_STATUS,
  DEFAULT_SNAKE_DATA,
} from '../../game-utility/constant';
import './multiplayer.styles.css';

const MultiplayerPage = ({
  gameId,
  ws,
  playerID,
  playerName,
  isGameJoined,
}) => {
  const browserWindowSize = useCallback(useWindowSize());
  const [
    isLeaveMultiplayerModalOpen,
    setIsLeaveMultiplayerModalOpen,
  ] = useState(false);
  const [isJoinGameModalOpen, setIsJoinGameModalOpen] = useState(false);
  const [boardSize] = useState({ ...DEFAULT_BOARD_SIZE });
  const [boardBlockSize, setBoardBlockSize] = useState(null);

  //const [isSinglePlayerMode] = useState(false);
  // possible modes: not-started, playing, paused, and finished
  const [gameStatus, setGameStatus] = useState(DEFAULT_GAME_STATUS);

  const snakeRef = useRef(null);
  const snakesData = useRef([]);
  const foodPositionRef = useRef([1, 1]);
  const gameBoardRef = useRef(null);

  const gameID = useRef(gameId);

  const fireOnMessage = useCallback(() => {
    ws.current.onmessage = (message) => {
      const res = JSON.parse(message.data);

      if (res.method === 'CONNECT' && !playerID.current) {
        playerID.current = res.playerID;
        console.log(playerID.current);
      }

      if (res.method === 'UPDATE') {
        console.log(res.game);
        snakesData.current = res.game.players;
        foodPositionRef.current = res.food;
      }
    };
  }, [playerID, ws]);

  useEffect(() => {
    if (!ws.current) return;
    fireOnMessage();
  }, [ws, fireOnMessage]);

  // runs every 16.67ms
  const update = useCallback((currentTime) => {
    drawSnake(gameBoardRef.current, snakesData.current);
    drawFood(gameBoardRef.current, foodPositionRef.current);
  }, []);

  const onRestartButtonPress = (snakeRef) => {
    snakeRef.current = { ...DEFAULT_SNAKE_DATA };
  };

  // useEffect(() => {
  //   foodPositionRef.current = getRandomFoodPosition(boardSize);
  // }, [boardSize]);

  useEffect(() => {
    setBoardBlockSize(calculateBlockSize(browserWindowSize, boardSize));
  }, [browserWindowSize, boardSize]);

  useGameLoop(update);

  return (
    <div className=" wrapper">
      <header className="header">
        <div>
          <h1 className="game-title">Snake Game</h1>
          <small>Multiplayer Mode</small>
        </div>
        <div>
          <CustomButton
            btnClass={'btn-normal'}
            onClickCallback={() => {
              setIsLeaveMultiplayerModalOpen(true);
            }}
          >
            Singleplayer Mode
          </CustomButton>
        </div>
      </header>

      {!isGameJoined.current ? (
        <div className="join-game-alert">
          <div className="join-alert-text">
            <h4 style={{ margin: '0', fontWeight: '400' }}>
              You haven't joined this game yet.
            </h4>
          </div>

          <CustomButton
            btnClass={'btn-restart'}
            onClickCallback={() => {
              setIsJoinGameModalOpen(true);
            }}
          >
            Join Now
          </CustomButton>
        </div>
      ) : (
        ''
      )}

      <GameBoard
        boardSize={boardSize}
        boardBlockSize={boardBlockSize}
        ref={gameBoardRef}
      ></GameBoard>

      <GameController
        snakeRef={snakeRef}
        setGameStatus={setGameStatus}
        gameStatus={gameStatus}
        onRestartButtonPress={onRestartButtonPress}
      />
      <div className="instruction-text">
        Use <b>Enter</b> key to Start / Restart
        <br />
        Use <b>Arrow</b> or <b>W,A,S,D</b> keys to control snake.
      </div>

      {isJoinGameModalOpen && (
        <JoinGameModal
          closeModalCallback={setIsJoinGameModalOpen}
          gameID={gameID}
          ws={ws}
          playerID={playerID}
          playerName={playerName}
          isGameJoined={isGameJoined}
          fireOnMessage={fireOnMessage}
        />
      )}
      {isLeaveMultiplayerModalOpen && (
        <LeaveMultiplayerModal
          closeModalCallback={setIsLeaveMultiplayerModalOpen}
          ws={ws}
        />
      )}
    </div>
  );
};

export default memo(MultiplayerPage);
