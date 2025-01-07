import input from './input.js';

const bytes = input.split('\n').filter(Boolean).map((line) => line.split(',').map(Number));

const gridSize = 71;
const grid = Array.from({ length: gridSize }, () => Array.from({ length: gridSize }, () => '.'));

console.log(bytes);

bytes.slice(0, 1024).forEach((byte) => {
  grid[byte[1]][byte[0]] = '#';
});

console.log(grid.map((g) => g.join('')));

const minStepsToPosition = {};
const findMinStepsToEnd = (position, steps) => {
  const positionKey = position.join(',');
  if (steps >= minStepsToPosition[positionKey]) {
    return Infinity;
  }
  minStepsToPosition[positionKey] = steps;

  if (position[0] === gridSize - 1 && position[1] === gridSize - 1) {
    return steps;
  }

  return Math.min(...[
    [0, -1], [0, 1], [-1, 0], [1, 0],
  ].map((delta) => {
    const nextPosition = [position[0] + delta[0], position[1] + delta[1]];

    if (grid[nextPosition[1]]?.[nextPosition[0]] !== '.') {
      return Infinity;
    }

    return findMinStepsToEnd(nextPosition, steps + 1);
  }));
};

const part1 = findMinStepsToEnd([0, 0], 0);

console.log({ solution: { part1, part2: '?' } });
