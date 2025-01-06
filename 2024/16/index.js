import input from './input.js';

const grid = input.split('\n').filter(Boolean).map((line) => line.split(''));

const direction = {
  up: 'up', right: 'right', down: 'down', left: 'left',
};

const stepCost = 1;
const turnCost = 1000;

const deltaMap = {
  [direction.up]: [-1, 0],
  [direction.right]: [0, 1],
  [direction.down]: [1, 0],
  [direction.left]: [0, -1],
};

const nextHeadingsMap = {
  [direction.up]: [direction.right, direction.left],
  [direction.right]: [direction.down, direction.up],
  [direction.down]: [direction.left, direction.right],
  [direction.left]: [direction.up, direction.down],
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
  bestScoreToPosition[positionKey] = score + turnCost;

  if (grid[position[0]][position[1]] === 'E') {
    completedPaths.push({ score, path });
    return score;
  }

  if (grid[forwardStep[0]][forwardStep[1]] !== '#') {
    nextScores.push(findMinScorePath(
      forwardStep,
      heading,
      score + stepCost,
      [...path, forwardStep.join(',')],
    ));
  }

  nextHeadingsMap[heading].forEach((nextHeading) => {
    const nextHeadingDelta = deltaMap[nextHeading];
    const nextHeadingStep = [position[0] + nextHeadingDelta[0], position[1] + nextHeadingDelta[1]];

    if (grid[nextHeadingStep[0]][nextHeadingStep[1]] !== '#') {
      nextScores.push(findMinScorePath(
        nextHeadingStep,
        nextHeading,
        score + turnCost + stepCost,
        [...path, nextHeadingStep.join(',')],
      ));
    }
  });

  if (!nextScores.length) {
    return Infinity;
  }

  return Math.min(...nextScores);
};

const part1 = findMinScorePath(startingPosition, direction.right, 0, [startingPosition.join(',')]);

const shortestPaths = completedPaths.filter(({ score }) => score === part1);
const pointsOnShortestPaths = new Set();
shortestPaths.forEach(({ path }) => {
  path.forEach(pointsOnShortestPaths.add, pointsOnShortestPaths);
});

const part2 = pointsOnShortestPaths.size;

console.log({ solution: { part1, part2 } });
