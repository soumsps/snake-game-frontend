import React, { forwardRef, memo } from 'react';

import './game-board.styles.css';

const GameBoard = forwardRef(({ boardSize, boardBlockSize }, ref) => {
  const boardStyle = {
    backgroundColor: '#f9f9f9',
    width: `${Math.round(boardSize.column * boardBlockSize)}px`,
    height: `${Math.round(boardSize.row * boardBlockSize)}px`,
    display: 'grid',
    gridTemplateRows: `repeat(${boardSize.row}, 1fr)`,
    gridTemplateColumns: `repeat(${boardSize.column}, 1fr)`,
    margin: 'auto',
    border: '1px solid #818181',
  };

  return <div id="game-board" style={boardStyle} ref={ref}></div>;
});

export default memo(GameBoard);
