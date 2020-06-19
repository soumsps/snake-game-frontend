import React, { useEffect, memo } from 'react';
import CustomButton from '../custom-button/custom-button.component';
import './game-controller.styles.css';

const GameController = ({
  snakeRef,
  gameStatus,
  setGameStatus,
  onRestartButtonPress,
  isSinglePlayerMode,
  canStartGame,
  handleMultiplayerGameStart,
  handleDirectionChangeEvent,
}) => {
  const KeyCodes = {
    LEFT: 37,
    A: 65,
    UP: 38,
    W: 87,
    RIGHT: 39,
    D: 68,
    DOWN: 40,
    S: 83,
    ENTER: 13,
    SPACE: 32,
  };

  useEffect(() => {
    document.onkeydown = handleKeyDown;
  });

  const onLeftButtonPress = () => {
    if (
      (snakeRef.current && snakeRef.current.direction === 'RIGHT') ||
      gameStatus !== 'playing'
    ) {
      return;
    }
    snakeRef.current.direction = 'LEFT';
    if (!isSinglePlayerMode) {
      handleDirectionChangeEvent('LEFT');
    }
  };

  const onUpButtonPress = () => {
    if (
      (snakeRef.current && snakeRef.current.direction === 'DOWN') ||
      gameStatus !== 'playing'
    ) {
      return;
    }
    snakeRef.current.direction = 'UP';
    if (!isSinglePlayerMode) {
      handleDirectionChangeEvent('UP');
    }
  };

  const onDownButtonPress = () => {
    if (
      (snakeRef.current && snakeRef.current.direction === 'UP') ||
      gameStatus !== 'playing'
    ) {
      return;
    }
    snakeRef.current.direction = 'DOWN';
    if (!isSinglePlayerMode) {
      handleDirectionChangeEvent('DOWN');
    }
  };

  const onRightButtonPress = () => {
    if (
      (snakeRef.current && snakeRef.current.direction === 'LEFT') ||
      gameStatus !== 'playing'
    ) {
      return;
    }
    snakeRef.current.direction = 'RIGHT';
    if (!isSinglePlayerMode) {
      handleDirectionChangeEvent('RIGHT');
    }
  };

  const onSpaceButtonPress = () => {
    if (gameStatus === 'playing') {
      setGameStatus('paused');
    } else if (gameStatus === 'paused') {
      setGameStatus('playing');
    }
  };

  const multiplayerGameStart = () => {
    if (!isSinglePlayerMode) {
      handleMultiplayerGameStart();
    }
  };

  const onEnterButtonPress = () => {
    if (gameStatus === 'not-started') {
      multiplayerGameStart();
      setGameStatus('playing');
    } else if (gameStatus === 'finished') {
      onRestartButtonPress(snakeRef);
      setGameStatus('playing');
    }
  };

  const handleKeyDown = (event) => {
    switch (event.keyCode) {
      case KeyCodes.LEFT:
        onLeftButtonPress();
        break;
      case KeyCodes.A:
        onLeftButtonPress();
        break;
      case KeyCodes.UP:
        onUpButtonPress();
        break;
      case KeyCodes.W:
        onUpButtonPress();
        break;
      case KeyCodes.RIGHT:
        onRightButtonPress();
        break;
      case KeyCodes.D:
        onRightButtonPress();
        break;
      case KeyCodes.DOWN:
        onDownButtonPress();
        break;
      case KeyCodes.S:
        onDownButtonPress();
        break;
      case KeyCodes.SPACE:
        onSpaceButtonPress();
        break;
      case KeyCodes.ENTER:
        onEnterButtonPress();
        break;
      default:
    }
  };

  return (
    <>
      {gameStatus === 'not-started' && canStartGame ? (
        <CustomButton
          btnClass={'btn-start'}
          onClickCallback={() => {
            multiplayerGameStart();
            setGameStatus('playing');
          }}
        >
          Start
        </CustomButton>
      ) : (
        ''
      )}

      {gameStatus === 'playing' && isSinglePlayerMode ? (
        <CustomButton
          btnClass={'btn-pause'}
          onClickCallback={() => {
            setGameStatus('paused');
          }}
        >
          Pause
        </CustomButton>
      ) : (
        ''
      )}

      {gameStatus === 'paused' && isSinglePlayerMode ? (
        <CustomButton
          btnClass={'btn-resume'}
          onClickCallback={() => {
            setGameStatus('playing');
          }}
        >
          Resume
        </CustomButton>
      ) : (
        ''
      )}

      {gameStatus === 'finished' ? (
        <CustomButton
          btnClass={'btn-restart'}
          onClickCallback={() => {
            onRestartButtonPress(snakeRef);
            setGameStatus('playing');
          }}
        >
          Restart
        </CustomButton>
      ) : (
        ''
      )}

      {snakeRef.current ? (
        <div className="mobile-controls">
          <CustomButton
            btnClass={'btn-game-control'}
            onClickCallback={onLeftButtonPress}
          >
            <i className="fas fa-arrow-left"></i>
          </CustomButton>
          <CustomButton
            btnClass={'btn-game-control'}
            onClickCallback={onUpButtonPress}
          >
            <i className="fas fa-arrow-up"></i>
          </CustomButton>
          <CustomButton
            btnClass={'btn-game-control'}
            onClickCallback={onDownButtonPress}
          >
            <i className="fas fa-arrow-down"></i>
          </CustomButton>
          <CustomButton
            btnClass={'btn-game-control'}
            onClickCallback={onRightButtonPress}
          >
            <i className="fas fa-arrow-right"></i>
          </CustomButton>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default memo(GameController);
