import input from './input.js';

const inputLines = input.split('\n').filter(Boolean);

let grid = inputLines.map((line) => line.split(''));

const directions = {
  up: 'up', down: 'down', left: 'left', right: 'right',
};

const sumLoads = () => grid.reduce(
  (agg, gridRow, row) => agg + gridRow.reduce((agg2, char) => {
    if (char === 'O') {
      return agg2 + grid.length - row;
    }
    return agg2;
  }, 0),
  0,
);

const rollAllRocksInLine = (gridLine, direction) => {
  const freeSegments = gridLine.join('').split('#');
  return freeSegments.map((segment) => {
    const rockCount = segment.split('O').length - 1;
    const rocks = Array.from({ length: rockCount }).fill('O');
    const spaces = Array.from({ length: segment.length - rockCount }).fill('.');
    return ([directions.up, directions.left].includes(direction)
      ? [...rocks, ...spaces] : [...spaces, ...rocks]).join('');
  }).join('#').split('');
};

const rollAllRocksInGrid = (direction) => {
  if ([directions.up, directions.down].includes(direction)) {
    for (let column = 0; column < grid[0].length; column += 1) {
      const newLine = rollAllRocksInLine(grid.map((row) => row[column]), direction);
      newLine.forEach((char, i) => { grid[i][column] = char; });
    }
  } else {
    for (let row = 0; row < grid.length; row += 1) {
      const newLine = rollAllRocksInLine(grid[row], direction);
      grid[row] = newLine;
    }
  }
};

rollAllRocksInGrid(directions.up);

const part1 = sumLoads();

grid = inputLines.map((line) => line.split(''));

const totalCycles = 1000000000;
const cyclesRequiredToConverge = 500;
const sampleData = [];
for (let cycle = 0; cycle < cyclesRequiredToConverge; cycle += 1) {
  rollAllRocksInGrid(directions.up);
  rollAllRocksInGrid(directions.left);
  rollAllRocksInGrid(directions.down);
  rollAllRocksInGrid(directions.right);
  sampleData.push(sumLoads());
}

const leastCommonN = [
  ...sampleData
    .slice(Math.floor(cyclesRequiredToConverge / 2))
    .reduce((agg, cur) => agg.set(cur, (agg.get(cur) || 0) + 1), new Map()),
].reduce((agg2, cur2) => (cur2[1] < agg2[1] ? cur2 : agg2))[0];

const lastNIndex = sampleData.findLastIndex((n) => n === leastCommonN);
const previousNIndex = sampleData.slice(0, lastNIndex).findLastIndex((n) => n === leastCommonN);
const patternWidth = lastNIndex - previousNIndex;
const repeatsToReachTotal = Math.ceil(((totalCycles - 1) - lastNIndex) / patternWidth);
const repeatedNIndex = lastNIndex + repeatsToReachTotal * patternWidth;
const backtrack = repeatedNIndex - (totalCycles - 1);

const part2 = sampleData[lastNIndex - backtrack];

console.log({ solution: { part1, part2 } });
