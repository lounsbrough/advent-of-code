import input from './input';

const inputLines = input.split('\n').filter(Boolean);

const rockCoordinatePaths = inputLines.map((inputLine) => inputLine.split(' -> ')
  .map((c) => c.split(',').map((n) => parseInt(n, 10))));

const sandOrigin = [500, 0];

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

const grid = Array.from(
  { length: gridVerticalBounds[1] + 1 },
  () => Array.from({ length: gridHorizontalBounds[1] + 1 }, () => '.'),
);

const printGrid = () => {
  for (let y = gridVerticalBounds[0]; y <= gridVerticalBounds[1]; y += 1) {
    console.log(grid[y].slice(gridHorizontalBounds[0], gridHorizontalBounds[1] + 1).join(''));
  }
};

console.log('Building starting grid...');

for (let y = gridVerticalBounds[0]; y <= gridVerticalBounds[1]; y += 1) {
  for (let x = gridHorizontalBounds[0]; x <= gridHorizontalBounds[1]; x += 1) {
    if (rockCoordinates.some(([rockX, rockY]) => x === rockX && y === rockY)) {
      grid[y][x] = '#';
    }
  }
}

grid[sandOrigin[1]][sandOrigin[0]] = '+';

console.log('Starting grid:');
printGrid();

let sandFellIntoTheVoid = false;

const dropGrainOfSand = () => {
  const sandPosition = [sandOrigin[0], sandOrigin[1]];
  let sandCameToRest = false;

  while (!sandCameToRest && !sandFellIntoTheVoid) {
    if (sandPosition[1] >= gridVerticalBounds[1]
      || sandPosition[0] === gridHorizontalBounds[0]
      || sandPosition[0] === gridHorizontalBounds[1]) {
      sandFellIntoTheVoid = true;
      return;
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
        }
      }
    }
  }
};

while (!sandFellIntoTheVoid) {
  dropGrainOfSand();
}

console.log('Final grid:');
printGrid();

const totalGrainsOfSand = grid.reduce((grandTotal, gridLine) => grandTotal + gridLine.filter((symbol) => symbol === 'o').length, 0);

console.log({
  solution: { part1: { totalGrainsOfSand } },
});
