import React, { useState, useCallback, useEffect, useRef } from 'react';
import GameController from '../../components/game-controller/game-controller.component';
import GameBoard from '../../components/game-board/game-board.component';
import NewGameModal from '../../components/popup-modals/new-game-modal.component';

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
import './homepage.styles.css';

const HomePage = () => {
  const browserWindowSize = useCallback(useWindowSize());
  const [isNewGameModalOpen, setIsNewGameModalOpen] = useState(false);
  const [boardSize] = useState({ ...DEFAULT_BOARD_SIZE });
  const [boardBlockSize, setBoardBlockSize] = useState(null);
  const [scoreBoard, setScoreBoard] = useState({ score: 0, highScore: 0 });

  const [isSinglePlayerMode] = useState(DEFAULT_IS_SINGLE_PLAYER_MODE);
  // possible modes: not-started, playing, paused, and finished
  const [gameStatus, setGameStatus] = useState(DEFAULT_GAME_STATUS);

  const snakeRef = useRef({ ...DEFAULT_SNAKE_DATA });
  const foodPositionRef = useRef(null);
  const gameBoardRef = useRef(null);
  const lastSnakeMoveTimeRef = useRef(0);

  const updateScore = useCallback(() => {
    setScoreBoard((state) => {
      const newScore = state.score + 1;
      if (newScore > state.highScore) {
        return { score: newScore, highScore: newScore };
      }
      return { ...state, score: newScore };
    });
  }, []);

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
      updateScore();
      updateSnakeSpeed(snakeRef);
    }
  }, [boardSize, updateScore]);

  const drawData = useCallback(() => {
    drawSnake(gameBoardRef.current, [snakeRef.current]);
    drawFood(gameBoardRef.current, foodPositionRef.current);
  }, []);

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
    setScoreBoard((state) => ({ ...state, score: 0 }));
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
          <small>Singleplayer Mode</small>
        </div>
        <div>
          <CustomButton
            btnClass={'btn-normal'}
            onClickCallback={() => {
              setIsNewGameModalOpen(true);
            }}
          >
            Multiplayer Mode
          </CustomButton>
        </div>
      </header>
      <div className="scoreboard">
        <div className="score-text">Score: {scoreBoard.score}</div>
        <div className="score-text">High Score: {scoreBoard.highScore}</div>
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
        Use <b>Space</b> key to Pause / Resume
        <br />
        Use <b>Arrow</b> or <b>W,A,S,D</b> keys to control snake.
      </div>

      {isNewGameModalOpen && (
        <NewGameModal closeModalCallback={setIsNewGameModalOpen} />
      )}
    </div>
  );
};

export default HomePage;
