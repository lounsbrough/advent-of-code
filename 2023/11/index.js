import input from './input.js';

const inputLines = input.split('\n').filter(Boolean);

const grid = inputLines.map((line) => line.split(''));

const expansionExtraRowsPart1 = 1;
const expansionExtraRowsPart2 = 999999;
const expansionRows = [];
const expansionColumns = [];

let row = 0;
while (row < grid.length) {
  if (grid[row].every((symbol) => symbol === '.')) {
    expansionRows.push(row);
  }

  row += 1;
}

let column = 0;
while (column < grid.at(-1).length) {
  if (grid.every((gridRow) => gridRow[column] === '.')) {
    expansionColumns.push(column);
  }

  column += 1;
}

const galaxyPositions = [];
grid.forEach((gridRow, rowIndex) => {
  gridRow.forEach((symbol, columnIndex) => {
    if (symbol === '#') {
      galaxyPositions.push([rowIndex, columnIndex]);
    }
  });
});

let distanceSumPart1 = 0;
let distanceSumPart2 = 0;
galaxyPositions.forEach((position1, index) => {
  galaxyPositions.slice(index + 1).forEach((position2) => {
    const expansionRowsBetween = expansionRows
      .filter((ri) => ri > position1[0] && ri < position2[0]);
    const expansionColumnsBetween = expansionColumns
      .filter((ci) => (ci > position1[1] && ci < position2[1])
        || (ci < position1[1] && ci > position2[1]));
    const manhattanDistance = Math.abs(position1[0] - position2[0])
      + Math.abs(position1[1] - position2[1]);
    const expansionsBetween = expansionRowsBetween.length + expansionColumnsBetween.length;
    distanceSumPart1 += manhattanDistance + expansionsBetween * expansionExtraRowsPart1;
    distanceSumPart2 += manhattanDistance + expansionsBetween * expansionExtraRowsPart2;
  });
});

console.log({
  solution: {
    part1: distanceSumPart1,
    part2: distanceSumPart2,
  },
});
