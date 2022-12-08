import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import input from './input';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));

const inputLines = input.split('\n').filter(Boolean);

const grid = inputLines.map((inputLine) => inputLine.split('').map((n) => parseInt(n, 10)));

const gridHeight = grid.length;
const gridWidth = grid[0].length;

const NORTH = 'NORTH';
const SOUTH = 'SOUTH';
const EAST = 'EAST';
const WEST = 'WEST';

const getTreesAlongDirectionAwayFromTree = (i, j, direction) => {
  switch (direction) {
    case NORTH:
      return grid.slice(0, i).map((row) => row[j]).reverse();
    case SOUTH:
      return grid.slice(i + 1).map((row) => row[j]);
    case EAST:
      return grid[i].slice(j + 1);
    case WEST:
      return grid[i].slice(0, j).reverse();
    default:
      throw new Error('Unknown direction');
  }
};

const isTreeVisibleFromOutside = (i, j) => [NORTH, SOUTH, EAST, WEST]
  .map((direction) => Math.max(...getTreesAlongDirectionAwayFromTree(i, j, direction)))
  .some((max) => max < grid[i][j]);

const getScenicScoreForTree = (i, j) => [NORTH, SOUTH, EAST, WEST]
  .map((direction) => {
    const treesAlongDirection = getTreesAlongDirectionAwayFromTree(i, j, direction);
    const tallTreeDistance = treesAlongDirection.findIndex((height) => height >= grid[i][j]);
    return tallTreeDistance === -1 ? treesAlongDirection.length : tallTreeDistance + 1;
  }).reduce((total, current) => total * current, 1);

let treesVisibleFromOutsideCount = 0;
const scenicScores = Array.from({ length: gridHeight })
  .map(() => Array.from({ length: gridWidth }));
for (let i = 0; i < gridHeight; i += 1) {
  for (let j = 0; j < gridWidth; j += 1) {
    const isVisible = isTreeVisibleFromOutside(i, j);
    if (isVisible) {
      treesVisibleFromOutsideCount += 1;
    }
    scenicScores[i][j] = getScenicScoreForTree(i, j);
  }
}

const getChartData = (gridData) => gridData.map((row, i1) => ({
  key: i1,
  values: row.map((score, i2) => ({
    key: i2,
    value: score,
  })),
}));

fs.writeFileSync(`${currentDirectory}/treeHeightData.js`, `var treeHeightData = ${JSON.stringify(getChartData(grid))};`);
fs.writeFileSync(`${currentDirectory}/scenicScoreData.js`, `var scenicScoreData = ${JSON.stringify(getChartData(scenicScores))};`);

console.log(currentDirectory);

console.log({
  extraData: {
    charts: `open file://${currentDirectory}/forest.html`,
  },
  solution: {
    part1: { treesVisibleFromOutsideCount },
    part2: { highestScenicScore: Math.max(...scenicScores.map((s) => Math.max(...s))) },
  },
});
