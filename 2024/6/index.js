import input from './input.js';

const inputLines = input.split('\n').filter(Boolean);

const grid = inputLines.map((inputLine) => inputLine.split(''));

const directions = {
  up: 'up',
  right: 'right',
  down: 'down',
  left: 'left',
};

const nextDirectionMap = {
  [directions.up]: directions.right,
  [directions.right]: directions.down,
  [directions.down]: directions.left,
  [directions.left]: directions.up,
};

const deltaMap = {
  [directions.up]: [-1, 0],
  [directions.right]: [0, 1],
  [directions.down]: [1, 0],
  [directions.left]: [0, -1],
};

let startingPosition;
grid.every((row, rowIndex) => {
  const colIndex = row.findIndex((col) => col === '^');
  if (colIndex !== -1) {
    startingPosition = [rowIndex, colIndex];
    return false;
  }
  return true;
});
let escaped = false;
let currentPosition = startingPosition;
let currentDirection = directions.up;
const visitedPositions = new Set();
while (!escaped) {
  visitedPositions.add(`${currentPosition[0]},${currentPosition[1]}`);
  const delta = deltaMap[currentDirection];
  const nextPosition = [currentPosition[0] + delta[0], currentPosition[1] + delta[1]];
  if (grid[nextPosition[0]]?.[nextPosition[1]] === '#') {
    currentDirection = nextDirectionMap[currentDirection];
  } else {
    currentPosition = nextPosition;
  }

  if (currentPosition[0] < 0
    || currentPosition[0] >= grid.length
    || currentPosition[1] < 0
    || currentPosition[1] >= grid[0].length) {
    escaped = true;
  }
}

const part1 = visitedPositions.size;

const checkLoop = (newGrid) => {
  currentPosition = startingPosition;
  currentDirection = directions.up;
  const visitedStates = new Set();
  while (true) {
    if (visitedStates.has(`${currentPosition[0]},${currentPosition[1]}-${currentDirection}`)) {
      return true;
    }

    visitedStates.add(`${currentPosition[0]},${currentPosition[1]}-${currentDirection}`);
    const delta = deltaMap[currentDirection];
    const nextPosition = [currentPosition[0] + delta[0], currentPosition[1] + delta[1]];
    if (newGrid[nextPosition[0]]?.[nextPosition[1]] === '#') {
      currentDirection = nextDirectionMap[currentDirection];
    } else {
      currentPosition = nextPosition;
    }

    if (currentPosition[0] < 0
      || currentPosition[0] >= newGrid.length
      || currentPosition[1] < 0
      || currentPosition[1] >= newGrid[0].length) {
      return false;
    }
  }
};

let part2 = 0;
visitedPositions.forEach((visitedPosition) => {
  currentPosition = visitedPosition.split(',').map(Number);
  if (currentPosition[0] === startingPosition[0] && currentPosition[1] === startingPosition[1]) {
    return;
  }
  const newGrid = grid.map((row) => [...row]);
  newGrid[currentPosition[0]][currentPosition[1]] = '#';
  if (checkLoop(newGrid)) {
    part2 += 1;
  }
});

console.log({ solution: { part1, part2 } });
