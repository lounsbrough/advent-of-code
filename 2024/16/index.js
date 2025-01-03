/* eslint-disable prefer-destructuring */
import input from './demo.js';

const grid = input.split('\n').filter(Boolean).map((line) => line.split(''));

const direction = {
  up: 'up', right: 'right', down: 'down', left: 'left',
};

const deltaMap = {
  [direction.up]: [-1, 0],
  [direction.right]: [0, 1],
  [direction.down]: [1, 0],
  [direction.left]: [0, -1],
};

const nextHeadingsMap = {
  [direction.up]: {
    clockwise: direction.right,
    counterClockwise: direction.left,
  },
  [direction.right]: {
    clockwise: direction.down,
    counterClockwise: direction.up,
  },
  [direction.down]: {
    clockwise: direction.left,
    counterClockwise: direction.right,
  },
  [direction.left]: {
    clockwise: direction.up,
    counterClockwise: direction.down,
  },
};

let startingPosition;
grid.forEach((row, rowI) => {
  row.forEach((col, colI) => {
    if (col === 'S') startingPosition = [rowI, colI];
  });
});

const bestScoreToPosition = {};
const completedPaths = [];

const findMinScorePath = (position, heading, score, path) => {
  const nextScores = [];
  const delta = deltaMap[heading];
  const forwardStep = [position[0] + delta[0], position[1] + delta[1]];
  const positionKey = position.join(',');

  if (bestScoreToPosition[positionKey] && bestScoreToPosition[positionKey] < score) {
    return Infinity;
  }
  bestScoreToPosition[positionKey] = score;

  if (grid[position[0]][position[1]] === 'E') {
    completedPaths.push({ score, path });
    return score;
  }

  if (grid[forwardStep[0]][forwardStep[1]] !== '#') {
    nextScores.push(findMinScorePath(
      forwardStep,
      heading,
      score + 1,
      [...path, forwardStep.join(',')],
    ));
  }

  const { clockwise, counterClockwise } = nextHeadingsMap[heading];
  [clockwise, counterClockwise].forEach((nextHeading) => {
    const nextHeadingDelta = deltaMap[nextHeading];
    const nextHeadingStep = [position[0] + nextHeadingDelta[0], position[1] + nextHeadingDelta[1]];
    if (grid[nextHeadingStep[0]][nextHeadingStep[1]] !== '#') {
      nextScores.push(findMinScorePath(
        nextHeadingStep,
        nextHeading,
        score + 1001,
        [...path, nextHeadingStep.join(',')],
      ));
    }
  });

  if (!nextScores.length) {
    return Infinity;
  }

  return Math.min(...nextScores);
};

const part1 = findMinScorePath(startingPosition, direction.right, 0, []);

const shortestPaths = completedPaths.filter(({ score }) => score === part1);

console.log(completedPaths.length);
console.log(shortestPaths);

const pointsOnShortestPaths = new Set();
shortestPaths.forEach(({ path }) => {
  path.forEach(pointsOnShortestPaths.add, pointsOnShortestPaths);
});

const part2 = pointsOnShortestPaths.size;

console.log({ solution: { part1, part2 } });
