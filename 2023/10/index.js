import input from './input.js';

const inputLines = input.split('\n').filter(Boolean);

const grid = inputLines.map((line) => line.split(''));

const directions = {
  up: 'up',
  down: 'down',
  left: 'left',
  right: 'right',
};

const nextDirectionMap = {
  '|': { [directions.down]: directions.down, [directions.up]: directions.up },
  '-': { [directions.right]: directions.right, [directions.left]: directions.left },
  L: { [directions.down]: directions.right, [directions.left]: directions.up },
  J: { [directions.down]: directions.left, [directions.right]: directions.up },
  7: { [directions.up]: directions.left, [directions.right]: directions.down },
  F: { [directions.up]: directions.right, [directions.left]: directions.down },
};

const getNextStep = ({ direction, position: [x, y] }) => {
  const currentSymbol = grid[y][x];

  if (currentSymbol === 'S') {
    return null;
  }

  const nextDirection = nextDirectionMap[currentSymbol][direction];

  const nextPosition = [x, y];
  if (nextDirection === directions.up) {
    nextPosition[1] -= 1;
  } else if (nextDirection === directions.down) {
    nextPosition[1] += 1;
  } else if (nextDirection === directions.left) {
    nextPosition[0] -= 1;
  } else if (nextDirection === directions.right) {
    nextPosition[0] += 1;
  }

  return { direction: nextDirection, position: nextPosition };
};

let nextStep = { direction: directions.up, position: [72, 29] };
const steps = [];
while (nextStep) {
  steps.push(nextStep.position);
  nextStep = getNextStep(nextStep);
}

// S is an L
const isDotContained = (position) => {
  let intersections = 0;
  const x = position[0];
  let lastSymbol;
  for (let y = position[1] - 1; y >= 0; y -= 1) {
    const currentSymbol = grid[y][x];
    if (steps.some((step) => step[0] === x && step[1] === y)) {
      if (currentSymbol === '-'
        || (['7', 'J'].includes(lastSymbol) && ['F', 'L', 'S'].includes(currentSymbol))
        || (['F', 'L', 'S'].includes(lastSymbol) && ['7', 'J'].includes(currentSymbol))) {
        intersections += 1;
      }
      lastSymbol = currentSymbol;
    }
  }

  return intersections % 2 > 0;
};

let containedDotCount = 0;
grid.forEach((gridLine, y) => {
  gridLine.forEach((symbol, x) => {
    if (symbol === '.') {
      const isContained = isDotContained([x, y]);
      if (isContained) {
        containedDotCount += 1;
      }
    }
  });
});

console.log({
  solution: {
    part1: steps.length / 2,
    part2: containedDotCount,
  },
});
