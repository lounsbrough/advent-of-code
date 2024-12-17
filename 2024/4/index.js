import input from './input.js';

const inputLines = input.split('\n').filter(Boolean);

const grid = inputLines.map((inputLine) => inputLine.split(''));

const checkXmasInDirectionPart1 = ([row, col], [rowShift, colShift]) => grid[row + rowShift]?.[col + colShift] === 'M'
  && grid[row + rowShift * 2]?.[col + colShift * 2] === 'A'
  && grid[row + rowShift * 3]?.[col + colShift * 3] === 'S';

const getCountFromStartingPointPart1 = ([row, col]) => {
  let count = 0;
  if (grid[row][col] === 'X') {
    for (let i = -1; i <= 1; i += 1) {
      for (let j = -1; j <= 1; j += 1) {
        if (i === 0 && j === 0) continue;
        if (checkXmasInDirectionPart1([row, col], [i, j])) {
          count += 1;
        }
      }
    }
  }
  return count;
};

let part1 = 0;
for (let row = 0; row < grid.length; row += 1) {
  for (let col = 0; col < grid[0].length; col += 1) {
    part1 += getCountFromStartingPointPart1([row, col]);
  }
}

const checkXmaxFromStartingPointPart2 = ([row, col]) => {
  if (grid[row][col] !== 'A') {
    return false;
  }

  const downAndRight = new Set([grid[row - 1][col - 1], grid[row + 1][col + 1]]);
  if (!downAndRight.has('M') || !downAndRight.has('S')) {
    return false;
  }

  const upAndRight = new Set([grid[row + 1][col - 1], grid[row - 1][col + 1]]);
  if (!upAndRight.has('M') || !upAndRight.has('S')) {
    return false;
  }

  return true;
};

let part2 = 0;
for (let row = 1; row < grid.length - 1; row += 1) {
  for (let col = 1; col < grid[0].length - 1; col += 1) {
    if (checkXmaxFromStartingPointPart2([row, col])) {
      part2 += 1;
    }
  }
}

console.log({ solution: { part1, part2 } });
