const calculateBlockSize = (browserWindowSize, boardSize) => {
  // Logic needs improvement
  // so that height /width both could be considered while calculating block size
  const extraColumnPadding = 4;
  if (browserWindowSize.width < 1024)
    return browserWindowSize.width / (boardSize.column + extraColumnPadding);
  else if (browserWindowSize.width > 1024) return 15;
};

const randomGridPosition = (boardSize) => {
  return [
    Math.floor(Math.random() * boardSize.column) + 1,
    Math.floor(Math.random() * boardSize.row) + 1,
  ];
};

const drawGameRoom = (snakesData) => {
  const gameRoom = document.getElementById('game-user-list');

  gameRoom.innerHTML = '';

  for (const snake of snakesData) {
    const listElement = document.createElement('li');
    listElement.innerHTML =
      snake.playerName + ' <span style="color:black;">joined</span>';
    listElement.style.color = snake.color;

    gameRoom.appendChild(listElement);
  }
};

export { calculateBlockSize, randomGridPosition, drawGameRoom };
