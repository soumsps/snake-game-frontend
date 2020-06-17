const drawSnake = (gameBoard, snakesData) => {
  if (!gameBoard) return;

  // only remove class='snake' child nodes
  for (const node of gameBoard.childNodes) {
    if (node.classList.value === 'snake') {
      gameBoard.removeChild(node);
    }
  }

  for (const snake of snakesData) {
    const snakeBody = snake.body;
    for (let i = 0; i < snakeBody.length; i++) {
      const segment = snakeBody[i];
      const snakeElement = document.createElement('div');
      snakeElement.style.gridColumnStart = segment[0];
      snakeElement.style.gridRowStart = segment[1];

      snakeElement.classList.add('snake');
      if (i === 0) {
        snakeElement.style.backgroundColor = 'black';
      } else {
        snakeElement.style.backgroundColor = snake.color;
      }
      gameBoard.appendChild(snakeElement);
    }
  }
};

const sendSnakeData = () => {};

const getSnakeHead = (snakeData) => {
  let snake = [...snakeData];
  return [...snake[0]];
};

const getSnakeBody = (snakeData) => {
  let snake = [...snakeData];
  snake.shift();
  return snake;
};

const isSnakeDead = (snakeRef, boardSize) => {
  const snakeNextHead = getNextSnakeHeadPosition(snakeRef);
  const snakeBody = getSnakeBody(snakeRef.current.body);
  if (
    isSnakeOnItsBody(snakeNextHead, snakeBody) ||
    isSnakeOutsideBoard(snakeNextHead, boardSize)
  ) {
    return true;
  }

  return false;
};

const isSnakeOnItsBody = (snakeHead, snakeBody) => {
  return snakeBody.some((segment) => {
    return snakeHead[0] === segment[0] && snakeHead[1] === segment[1];
  });
};

const isSnakeOutsideBoard = (snakeHead, boardSize) => {
  return (
    snakeHead[0] < 1 ||
    snakeHead[0] > boardSize.column ||
    snakeHead[1] < 1 ||
    snakeHead[1] > boardSize.row
  );
};

const getNextSnakeHeadPosition = (snakeRef) => {
  let newSnakeHead = getSnakeHead(snakeRef.current.body);
  const snakeDirection = snakeRef.current.direction;

  if (snakeDirection === 'left') {
    newSnakeHead[0] -= 1;
  }
  if (snakeDirection === 'right') {
    newSnakeHead[0] += 1;
  }
  if (snakeDirection === 'up') {
    newSnakeHead[1] -= 1;
  }
  if (snakeDirection === 'down') {
    newSnakeHead[1] += 1;
  }

  return newSnakeHead;
};

const moveSnake = (newSnakeHead, snakeRef) => {
  let oldSnakeBody = [...snakeRef.current.body];
  oldSnakeBody.pop();
  snakeRef.current.body = [newSnakeHead, ...oldSnakeBody];
};

function growSnake(snakeBody) {
  snakeBody.push([...snakeBody[snakeBody.length - 1]]);
}

const updateSnakeSpeed = (snakeRef) => {
  if (snakeRef.current.speed > 70) {
    snakeRef.current.speed -= 5;
  }
};

export {
  drawSnake,
  sendSnakeData,
  getSnakeHead,
  growSnake,
  isSnakeDead,
  moveSnake,
  getNextSnakeHeadPosition,
  updateSnakeSpeed,
};
