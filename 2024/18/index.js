import input from './input.js';

const gridSize = 71;
const initialByteCount = 1024;

const bytes = input.split('\n').filter(Boolean).map((line) => line.split(',').map(Number));

const createGrid = (byteCount) => {
  const grid = Array.from({ length: gridSize }, () => Array.from({ length: gridSize }, () => '.'));
  bytes.slice(0, byteCount).forEach((byte) => {
    grid[byte[1]][byte[0]] = '#';
  });
  return grid;
};

let minStepsToPosition = {};
const findMinStepsToEnd = (grid, position, steps) => {
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

    return findMinStepsToEnd(grid, nextPosition, steps + 1);
  }));
};

const findMinSteps = (byteCount) => {
  minStepsToPosition = {};
  return findMinStepsToEnd(createGrid(byteCount), [0, 0], 0);
};

const part1 = findMinSteps(initialByteCount);

let left = initialByteCount;
let right = bytes.length;
while (right > left + 1) {
  const next = left + Math.floor((right - left) / 2);
  if (findMinSteps(next) === Infinity) {
    right = next;
  } else {
    left = next;
  }
}

const part2 = bytes[right - 1];

console.log({ solution: { part1, part2 } });
