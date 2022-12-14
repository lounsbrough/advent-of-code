import input from './demo';

const inputLines = input.split('\n').filter(Boolean);

const rockCoordinatePaths = inputLines.map((inputLine) => inputLine.split(' -> ')
  .map((c) => c.split(',').map((n) => parseInt(n, 10))));

const sandOrigin = [500, 0];

console.log(rockCoordinatePaths);

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

  console.log(rockCoordinates);
});

process.exit();

const distinctHorizontalRockCoordinates = new Set();
const distinctVerticalRockCoordinates = new Set();

rockCoordinatePaths.forEach(([x, y]) => {
  console.log(x);
  distinctHorizontalRockCoordinates.add(x);
  distinctVerticalRockCoordinates.add(y);
});

// console.log(distinctHorizontalRockCoordinates);

const gridHorizontalBounds = [
  Math.min(...distinctHorizontalRockCoordinates),
  Math.max(...distinctHorizontalRockCoordinates),
];
const gridVerticalBounds = [
  Math.min(...distinctVerticalRockCoordinates),
  Math.max(...distinctVerticalRockCoordinates),
];

console.log(gridHorizontalBounds);
