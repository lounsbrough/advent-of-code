/* eslint-disable no-param-reassign */
import input from './input';

const inputLines = input.split('\n').filter(Boolean);

const rockCoordinatePaths = inputLines.map((inputLine) => inputLine.split(' -> ')
  .map((c) => c.split(',').map((n) => parseInt(n, 10))));

const sandOrigin = [500, 0];

const clone2dArray = (array) => {
  const newArray = [];

  for (let i = 0; i < array.length; i += 1) {
    newArray[i] = array[i].slice();
  }

  return newArray;
};

const rockCoordinates = [];
rockCoordinatePaths.forEach((vertices) => {
  vertices.slice(1).forEach((vertex, index) => {
    const previousVertex = vertices[index];

    if (vertex[0] === previousVertex[0]) {
      const verticalDistance = previousVertex[1] - vertex[1];
      for (let i = 0; i <= Math.abs(verticalDistance); i += 1) {
        rockCoordinates.push([
          vertex[0],
          previousVertex[1] - (verticalDistance / Math.abs(verticalDistance)) * i,
        ]);
      }
    } else {
      const horizontalDistance = previousVertex[0] - vertex[0];
      for (let i = 0; i <= Math.abs(horizontalDistance); i += 1) {
        rockCoordinates.push([
          previousVertex[0] - (horizontalDistance / Math.abs(horizontalDistance)) * i,
          vertex[1],
        ]);
      }
    }
  });
});

const distinctHorizontalRockCoordinates = new Set([sandOrigin[0]]);
const distinctVerticalRockCoordinates = new Set([sandOrigin[1]]);

rockCoordinates.forEach(([x, y]) => {
  distinctHorizontalRockCoordinates.add(x);
  distinctVerticalRockCoordinates.add(y);
});

const gridHorizontalBounds = [
  Math.min(...distinctHorizontalRockCoordinates),
  Math.max(...distinctHorizontalRockCoordinates),
];
const gridVerticalBounds = [
  Math.min(...distinctVerticalRockCoordinates),
  Math.max(...distinctVerticalRockCoordinates),
];

const startingGrid = Array.from(
  { length: gridVerticalBounds[1] + 1 },
  () => Array.from({ length: gridHorizontalBounds[1] + 1 + 500 }, () => '.'),
);

const printGrid = (grid, autoFitSand) => {
  let minX = Infinity; let maxX = -Infinity; let minY = Infinity; let maxY = -Infinity;

  if (autoFitSand) {
    grid.forEach((gridLine, y) => {
      gridLine.forEach((symbol, x) => {
        if (symbol === 'o' || symbol === '+') {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      });
    });
  } else {
    [minX, maxX] = gridHorizontalBounds;
    [minY, maxY] = gridVerticalBounds;
  }

  grid.slice(minY, maxY + 1).forEach((gridLine) => {
    console.log(gridLine.slice(minX, maxX + 1).join(''));
  });
};
rockCoordinates.forEach(([rockX, rockY]) => {
  startingGrid[rockY][rockX] = '#';
});

startingGrid[sandOrigin[1]][sandOrigin[0]] = '+';

const gridPart1 = clone2dArray(startingGrid);
const gridPart2 = clone2dArray(startingGrid);

gridPart2.push(Array.from({ length: gridHorizontalBounds[1] + 1 + 500 }, () => '.'));
gridPart2.push(Array.from({ length: gridHorizontalBounds[1] + 1 + 500 }, () => '#'));

const dropGrainOfSand = (grid, part2) => {
  const sandPosition = [sandOrigin[0], sandOrigin[1]];
  let sandCameToRest = false;
  let sandFellIntoTheVoid = false;
  let sandFilledUpToOrigin = false;

  while (!sandCameToRest) {
    if (!part2 && (sandPosition[1] >= gridVerticalBounds[1]
      || sandPosition[0] === gridHorizontalBounds[0]
      || sandPosition[0] === gridHorizontalBounds[1])) {
      sandFellIntoTheVoid = true;
      break;
    }

    const canMoveDown = grid[sandPosition[1] + 1][sandPosition[0]] === '.';

    if (canMoveDown) {
      sandPosition[1] += 1;
    } else {
      const canMoveLeft = grid[sandPosition[1] + 1][sandPosition[0] - 1] === '.';

      if (canMoveLeft) {
        sandPosition[0] -= 1;
        sandPosition[1] += 1;
      } else {
        const canMoveRight = grid[sandPosition[1] + 1][sandPosition[0] + 1] === '.';

        if (canMoveRight) {
          sandPosition[0] += 1;
          sandPosition[1] += 1;
        } else {
          sandCameToRest = true;
          grid[sandPosition[1]][sandPosition[0]] = 'o';

          if (sandPosition[0] === sandOrigin[0] && sandPosition[1] === sandOrigin[1]) {
            sandFilledUpToOrigin = true;
            break;
          }
        }
      }
    }
  }

  return { sandFellIntoTheVoid, sandFilledUpToOrigin };
};

let exitLoop = false;
while (!exitLoop) {
  const { sandFellIntoTheVoid } = dropGrainOfSand(gridPart1, false);
  exitLoop = sandFellIntoTheVoid;
}

console.log('Final grid (part 1):');
printGrid(gridPart1);

exitLoop = false;
while (!exitLoop) {
  const { sandFilledUpToOrigin } = dropGrainOfSand(gridPart2, true);
  exitLoop = sandFilledUpToOrigin;
}

console.log('Final grid (part 2):');
printGrid(gridPart2, true);

const countGrainsOfSand = (grid) => grid.reduce((grandTotal, gridLine) => grandTotal + gridLine.filter((symbol) => symbol === 'o').length, 0);

console.log({
  solution: {
    part1: { totalGrainsOfSand: countGrainsOfSand(gridPart1) },
    part2: { totalGrainsOfSand: countGrainsOfSand(gridPart2) },
  },
});
