/* eslint-disable no-param-reassign */
import input from './input.js';

const inputLines = input.split('\n').filter(Boolean);

const grid = inputLines.map((inputLine) => inputLine.split(''));

const regions = [];
const assignedBlocks = new Set();

const clockwiseSides = [[-1, 0], [0, 1], [1, 0], [0, -1]];

const traverseRegion = (region, position) => {
  if (grid[position[0]]?.[position[1]] !== region.crop) {
    region.perimeter += 1;
    return;
  }

  const positionKey = `${position[0]},${position[1]}`;

  if (region.blocks.has(positionKey)) {
    return;
  }

  region.blocks.add(positionKey);
  assignedBlocks.add(positionKey);

  clockwiseSides.forEach((step) => {
    traverseRegion(
      region,
      [position[0] + step[0], position[1] + step[1]],
    );
  });
};

grid.forEach((row, rowI) => {
  row.forEach((col, colI) => {
    const positionKey = `${rowI},${colI}`;
    if (!assignedBlocks.has(positionKey)) {
      const region = {
        crop: col, perimeter: 0, blocks: new Set(), corners: new Set(),
      };
      traverseRegion(
        region,
        [rowI, colI],
      );
      regions.push(region);
    }
  });
});

const part1 = regions.reduce((agg, cur) => agg + cur.perimeter * cur.blocks.size, 0);

regions.forEach((region) => {
  region.blocks.forEach((blockKey) => {
    const block = blockKey.split(',').map(Number);
    clockwiseSides.forEach((direction, dirI) => {
      const dir1 = direction;
      const dir2 = clockwiseSides[(dirI + 1) % 4];

      // check for outside corner
      if (
        !region.blocks.has(`${block[0] + dir1[0]},${block[1] + dir1[1]}`)
        && !region.blocks.has(`${block[0] + dir2[0]},${block[1] + dir2[1]}`)
      ) {
        region.corners.add(`${block[0] + ([1, 2].includes(dirI) ? 1 : 0)},${block[1] + ([0, 1].includes(dirI) ? 1 : 0)}-out`);
      }

      // check for inside corner
      if (
        (+region.blocks.has(`${block[0] + dir1[0]},${block[1] + dir1[1]}`)
          + +region.blocks.has(`${block[0] + dir2[0]},${block[1] + dir2[1]}`) === 1)
        && region.blocks.has(`${block[0] + dir1[0] + dir2[0]},${block[1] + dir1[1] + dir2[1]}`)
      ) {
        region.corners.add(`${block[0] + ([1, 2].includes(dirI) ? 1 : 0)},${block[1] + ([0, 1].includes(dirI) ? 1 : 0)}-in`);
      }

      // check inside and outside shared corner
      if (
        (!region.blocks.has(`${block[0] + dir1[0]},${block[1] + dir1[1]}`)
          && !region.blocks.has(`${block[0] + dir2[0]},${block[1] + dir2[1]}`))
        && region.blocks.has(`${block[0] + dir1[0] + dir2[0]},${block[1] + dir1[1] + dir2[1]}`)
      ) {
        region.corners.add(`${block[0] + ([1, 2].includes(dirI) ? 1 : 0)},${block[1] + ([0, 1].includes(dirI) ? 1 : 0)}-in-out`);
      }
    });
  });
  if (region.corners.size % 2) {
    region.corners.add('even');
  }
});

const part2 = regions.reduce((agg, cur) => agg + cur.corners.size * cur.blocks.size, 0);

console.log({ solution: { part1, part2 } });
