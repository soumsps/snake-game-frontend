import { randomGridPosition } from './game-board';

const drawFood = (gameBoard, food) => {
  if (!gameBoard) return;

  // check if food already present
  let isFoodPresent = false;
  for (const node of gameBoard.childNodes) {
    if (node.classList.value === 'food animate-food') {
      isFoodPresent = true;
    }
  }

  if (!isFoodPresent) {
    const foodElement = document.createElement('div');
    foodElement.style.gridColumnStart = food[0];
    foodElement.style.gridRowStart = food[1];
    foodElement.classList.add('food');
    foodElement.classList.add('animate-food');
    gameBoard.appendChild(foodElement);
  }
};

const getRandomFoodPosition = (boardSize) => {
  let newFoodPosition;
  newFoodPosition = randomGridPosition(boardSize);
  return newFoodPosition;
};

const isFoodEaten = (snakeHead, foodPosition) => {
  if (snakeHead[0] === foodPosition[0] && snakeHead[1] === foodPosition[1]) {
    return true;
  }
  return false;
};

const removeOldFood = (gameBoard) => {
  for (const node of gameBoard.childNodes) {
    if (node.classList.value === 'food animate-food') {
      gameBoard.removeChild(node);
    }
  }
};

export { drawFood, getRandomFoodPosition, isFoodEaten, removeOldFood };
