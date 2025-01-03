/* eslint-disable prefer-destructuring */
import input from './demo.js';

const [gridLines, moveLines] = input.split('\n\n');

const direction = {
  up: '^', right: '>', down: 'v', left: '<',
};
const deltaMap = {
  [direction.up]: [-1, 0],
  [direction.right]: [0, 1],
  [direction.down]: [1, 0],
  [direction.left]: [0, -1],
};
const robotPart1 = '@';
const wallPart1 = '#';
const boxPart1 = 'O';
const emptyPart1 = '.';

const robotPart2 = '@.';
const wallPart2 = '##';
const boxPart2 = '[]';
const emptyPart2 = '..';

const moves = moveLines.split('\n').filter(Boolean).join('').split('');
const gridPart1 = gridLines.split('\n').filter(Boolean).map((line) => line.split(''));

let position;
gridPart1.forEach((row, rowI) => {
  row.forEach((col, colI) => {
    if (col === robotPart1) position = [rowI, colI];
  });
});

const processMovePart1 = (move) => {
  const delta = deltaMap[move];
  const nextPosition = [position[0] + delta[0], position[1] + delta[1]];
  const nextSquare = gridPart1[nextPosition[0]][nextPosition[1]];
  if (nextSquare === emptyPart1) {
    gridPart1[nextPosition[0]][nextPosition[1]] = robotPart1;
    gridPart1[position[0]][position[1]] = emptyPart1;
    position = nextPosition;
  } else if (nextSquare === boxPart1) {
    let nextFreePosition = nextPosition;
    while (gridPart1[nextFreePosition[0]][nextFreePosition[1]] === boxPart1) {
      nextFreePosition = [nextFreePosition[0] + delta[0], nextFreePosition[1] + delta[1]];
    }

    if (gridPart1[nextFreePosition[0]][nextFreePosition[1]] === emptyPart1) {
      gridPart1[nextFreePosition[0]][nextFreePosition[1]] = boxPart1;
      gridPart1[nextPosition[0]][nextPosition[1]] = robotPart1;
      gridPart1[position[0]][position[1]] = emptyPart1;
      position = nextPosition;
    }
  }
};

moves.forEach(processMovePart1);

gridPart1.forEach((line) => { console.log(line.join('')); });

const part1 = gridPart1.reduce((rowAgg, row, rowI) => {
  const rowSum = row.reduce((colAgg, col, colI) => (col === boxPart1
    ? colAgg + 100 * rowI + colI
    : colAgg), 0);
  return rowAgg + rowSum;
}, 0);

const gridPart2 = gridLines.split('\n').filter(Boolean).map((line) => line.split('')
  .map((char) => {
    if (char === robotPart1) {
      return robotPart2;
    }
    if (char === wallPart1) {
      return wallPart2;
    }
    if (char === boxPart1) {
      return boxPart2;
    }
    return emptyPart2;
  }).join('').split(''));

let positions;
gridPart2.forEach((row, rowI) => {
  row.forEach((col, colI) => {
    if (col === robotPart2[0]) positions = [[rowI, colI], [rowI, colI + 1]];
  });
});

const processMovePart2 = (move) => {
  const delta = deltaMap[move];

  const nextPositions = [
    [positions[0][0] + delta[0], positions[0][1] + delta[1]],
    [positions[1][0] + delta[0], positions[1][1] + delta[1]],
  ];

  const nextSquares = [
    gridPart2[nextPositions[0][0]][nextPositions[0][1]],
    gridPart2[nextPositions[1][0]][nextPositions[1][1]],
  ];

  const verticalMove = [direction.up, direction.down].includes(move);
  if ((verticalMove && nextSquares.join('') === emptyPart2)
    || (move === direction.left && nextSquares[0] === emptyPart2[1])
    || (move === direction.right && nextSquares[1] === emptyPart2[0])) {
    gridPart2[nextPositions[0][0]][nextPositions[0][1]] = robotPart2[0];
    gridPart2[positions[0][0]][positions[0][1]] = emptyPart2[0];
    positions = [...nextPositions];
  } else if (nextSquares.join('') === boxPart2) {
    let nextFreePositions = nextPositions;
    while ([
      gridPart2[nextFreePositions[0][0]][nextFreePositions[0][1]],
      gridPart2[nextFreePositions[1][0]][nextFreePositions[1][1]],
    ].join('') === boxPart2) {
      nextFreePositions = [
        [nextFreePositions[0][0] + delta[0], nextFreePositions[0][1] + delta[1]],
        [nextFreePositions[1][0] + delta[0], nextFreePositions[1][1] + delta[1]],
      ];
    }

    if ([
      gridPart2[nextFreePositions[0][0]][nextFreePositions[0][1]],
      gridPart2[nextFreePositions[1][0]][nextFreePositions[1][1]],
    ].join('') === emptyPart2) {
      gridPart2[nextFreePositions[0][0]][nextFreePositions[0][1]] = boxPart2[0];
      gridPart2[nextFreePositions[1][0]][nextFreePositions[1][1]] = boxPart2[1];
      gridPart2[nextPositions[0][0]][nextPositions[0][1]] = robotPart2[0];
      gridPart2[nextPositions[1][0]][nextPositions[1][1]] = robotPart2[1];
      gridPart2[positions[0][0]][positions[0][1]] = emptyPart2[0];
      gridPart2[positions[1][0]][positions[1][1]] = emptyPart2[1];
      positions = [...nextPositions];
    }
  }
};

gridPart2.forEach((line) => { console.log(line.join('')); });

moves.forEach(processMovePart2);

gridPart2.forEach((line) => { console.log(line.join('')); });

const part2 = gridPart2.reduce((rowAgg, row, rowI) => {
  const rowSum = row.reduce((colAgg, col, colI) => (col === boxPart2[0]
    ? colAgg + 100 * rowI + colI
    : colAgg), 0);
  return rowAgg + rowSum;
}, 0);

console.log({ solution: { part1, part2 } });
