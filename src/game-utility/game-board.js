const calculateBlockSize = (browserWindowSize, boardSize) => {
  // Logic needs improvement
  // so that height /width both could be considered while calculating block size
  const extraColumnPadding = 4;
  if (browserWindowSize.width < 820)
    return browserWindowSize.width / (boardSize.column + extraColumnPadding);
  else if (browserWindowSize.width < 1024) return 10;
  else if (browserWindowSize.width > 1024) return 12;
};

const randomGridPosition = (boardSize) => {
  return [
    Math.floor(Math.random() * boardSize.column) + 1,
    Math.floor(Math.random() * boardSize.row) + 1,
  ];
};

export { calculateBlockSize, randomGridPosition };
