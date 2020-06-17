import React, { useState, useCallback, useEffect, useRef } from 'react';
import GameController from '../../components/game-controller/game-controller.component';
import GameBoard from '../../components/game-board/game-board.component';
import LeaveMultiplayerModal from '../../components/popup-modals/leave-multiplayer-modal.component';
import JoinGameModal from '../../components/popup-modals/join-game-modal.component';

import CustomButton from '../../components/custom-button/custom-button.component';
import { useWindowSize } from '../../custom-hooks/use-window-size.hook';
import { useGameLoop } from '../../custom-hooks/use-game-loop.hook';
import { calculateBlockSize } from '../../game-utility/game-board';
import {
  drawSnake,
  moveSnake,
  getSnakeHead,
  growSnake,
  isSnakeDead,
  getNextSnakeHeadPosition,
  updateSnakeSpeed,
} from '../../game-utility/snake';
import {
  drawFood,
  getRandomFoodPosition,
  isFoodEaten,
  removeOldFood,
} from '../../game-utility/food';
import {
  DEFAULT_BOARD_SIZE,
  DEFAULT_IS_SINGLE_PLAYER_MODE,
  DEFAULT_GAME_STATUS,
  DEFAULT_SNAKE_DATA,
} from '../../game-utility/constant';
import './multiplayer.styles.css';

const MultiplayerPage = (props) => {
  const browserWindowSize = useCallback(useWindowSize());
  const [
    isLeaveMultiplayerModalOpen,
    setIsLeaveMultiplayerModalOpen,
  ] = useState(false);
  const [isJoinGameModalOpen, setIsJoinGameModalOpen] = useState(false);
  const [boardSize] = useState({ ...DEFAULT_BOARD_SIZE });
  const [boardBlockSize, setBoardBlockSize] = useState(null);

  const [isSinglePlayerMode] = useState(DEFAULT_IS_SINGLE_PLAYER_MODE);
  // possible modes: not-started, playing, paused, and finished
  const [gameStatus, setGameStatus] = useState(DEFAULT_GAME_STATUS);

  const snakeRef = useRef({ ...DEFAULT_SNAKE_DATA });
  const foodPositionRef = useRef(null);
  const gameBoardRef = useRef(null);
  const lastSnakeMoveTimeRef = useRef(0);

  console.log('gameId: ', props.gameId);

  const updateData = useCallback(() => {
    if (isSnakeDead(snakeRef, boardSize)) {
      setGameStatus('finished');
      return;
    }

    moveSnake(getNextSnakeHeadPosition(snakeRef), snakeRef);

    if (
      isFoodEaten(getSnakeHead(snakeRef.current.body), foodPositionRef.current)
    ) {
      growSnake(snakeRef.current.body);
      removeOldFood(gameBoardRef.current);
      foodPositionRef.current = getRandomFoodPosition(boardSize);

      updateSnakeSpeed(snakeRef);
    }
  }, [boardSize]);

  const snake2 = {
    playerID: 'single-player',
    body: [
      [24, 17],
      [24, 16],
      [24, 15],
    ],
    color: 'green',
    speed: 160,
    direction: 'down',
  };

  const snake3 = {
    playerID: 'single-player',
    body: [
      [44, 22],
      [44, 23],
      [44, 24],
    ],
    color: 'red',
    speed: 160,
    direction: 'up',
  };

  const drawData = useCallback(() => {
    drawSnake(gameBoardRef.current, [snakeRef.current, snake2, snake3]);
    drawFood(gameBoardRef.current, foodPositionRef.current);
  }, [snake2, snake3]);

  // runs every 16.67ms
  const update = useCallback(
    (currentTime) => {
      const secondsSinceLastSnakeMove =
        currentTime - lastSnakeMoveTimeRef.current;
      if (secondsSinceLastSnakeMove > snakeRef.current.speed) {
        lastSnakeMoveTimeRef.current = currentTime;
        if (gameStatus === 'playing') {
          updateData();
        }
      }
      drawData();
    },
    [updateData, drawData, gameStatus]
  );

  const onRestartButtonPress = (snakeRef) => {
    snakeRef.current = { ...DEFAULT_SNAKE_DATA };
  };

  useEffect(() => {
    foodPositionRef.current = getRandomFoodPosition(boardSize);
  }, [boardSize]);

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
        <JoinGameModal closeModalCallback={setIsJoinGameModalOpen} />
      )}
      {isLeaveMultiplayerModalOpen && (
        <LeaveMultiplayerModal
          closeModalCallback={setIsLeaveMultiplayerModalOpen}
        />
      )}
    </div>
  );
};

export default MultiplayerPage;
