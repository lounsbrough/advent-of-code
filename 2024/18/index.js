import input from './input.js';

const gridSize = 71;
const initialByteCount = 1024;

const bytes = input.split('\n').filter(Boolean).map((line) => line.split(',').map(Number));

const grid = Array.from({ length: gridSize }, () => Array.from({ length: gridSize }, () => '.'));
bytes.slice(0, initialByteCount).forEach((byte) => {
  grid[byte[1]][byte[0]] = '#';
});

let minStepsToPosition = {};
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

let closingByte = initialByteCount - 1;
let closed = false;
while (!closed) {
  closingByte += 1;
  const nextByte = bytes[closingByte];
  grid[nextByte[1]][nextByte[0]] = '#';
  minStepsToPosition = {};
  closed = (findMinStepsToEnd([0, 0], 0) === Infinity);
}

const part2 = bytes[closingByte];

console.log({ solution: { part1, part2 } });
