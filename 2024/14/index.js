/* eslint-disable no-param-reassign */
import input from './input.js';
import { scatterPlot } from './scatterPlot.js';

const gridSize = [101, 103];
const inputLines = input.split('\n').filter(Boolean);

const robots = inputLines.map((inputLine) => {
  const matches = [...inputLine.matchAll(/p=([+-\d]+),([+-\d]+) v=([+-\d]+),([+-\d]+)/g)][0];
  return {
    p: { x: Number(matches[1]), y: Number(matches[2]) },
    v: { x: Number(matches[3]), y: Number(matches[4]) },
  };
});

const positiveMod = (x, n) => ((x % n) + n) % n;

const getRobotPositionAfterSeconds = (robot, seconds) => ({
  x: positiveMod(robot.p.x + robot.v.x * seconds, gridSize[0]),
  y: positiveMod(robot.p.y + robot.v.y * seconds, gridSize[1]),
});

const robotPositionsForPart1 = robots.map((robot) => getRobotPositionAfterSeconds(robot, 100));

const midX = (gridSize[0] - 1) / 2;
const midY = (gridSize[1] - 1) / 2;
const robotCountInQuadrants = robotPositionsForPart1.reduce((quads, { x, y }) => {
  if (x !== midX && y !== midY) {
    if (x < midX) {
      quads[y < midY ? 0 : 1] += 1;
    } else {
      quads[y < midY ? 2 : 3] += 1;
    }
  }

  return quads;
}, [0, 0, 0, 0]);

const part1 = robotCountInQuadrants.reduce((agg, cur) => agg * cur, 1);

const grid = Array.from(
  { length: gridSize[0] },
  () => Array.from({ length: gridSize[1] }, () => 0),
);
const blockSize = 3;

const checkBlockOfFive = (i, j) => {
  for (let l = 0; l < blockSize; l += 1) {
    for (let m = 0; m < blockSize; m += 1) {
      if (!grid[i + l][j + m]) {
        return false;
      }
    }
  }

  return true;
};

const findBlockOfFive = (robotPositions) => {
  grid.forEach((g) => { g.fill(0); });
  robotPositions.forEach(({ x, y }) => {
    grid[x][y] = 1;
  });

  for (let i = 0; i < gridSize[0] - blockSize; i += 1) {
    for (let j = 0; j < gridSize[1] - blockSize; j += 1) {
      if (checkBlockOfFive(i, j)) {
        return true;
      }
    }
  }

  return false;
};

let part2 = 0;
let found = false;
while (!found) {
  part2 += 1;
  const robotPositions = robots.map((robot) => getRobotPositionAfterSeconds(robot, part2));

  if (findBlockOfFive(robotPositions)) {
    scatterPlot(robotPositions.map(({ x, y }) => ({ x, y: -1 * y })));
    found = true;
  }
}

console.log({ solution: { part1, part2 } });
