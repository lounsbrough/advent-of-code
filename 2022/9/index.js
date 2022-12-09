import input from './input';

const inputLines = input.split('\n').filter(Boolean);

const headMovements = inputLines.map((inputLine) => {
  const movement = inputLine.split(' ');

  return [movement[0], parseInt(movement[1], 10)];
});

const knotCount = 10;
const knotPositions = Array.from({ length: knotCount }, () => [[0, 0]]);

const getShiftForDirection = (direction) => ({
  U: [0, 1],
  D: [0, -1],
  L: [-1, 0],
  R: [1, 0],
}[direction]);

const calculateNewHeadPosition = (direction) => {
  const lastPosition = knotPositions[0].at(-1);
  const shift = getShiftForDirection(direction);
  const newPosition = [lastPosition[0] + shift[0], lastPosition[1] + shift[1]];
  knotPositions[0].push(newPosition);
};

const calculateFollowerKnotPosition = (knotIndex) => {
  const lastLeaderPosition = knotPositions[knotIndex - 1].at(-1);
  const lastFollowerPosition = knotPositions[knotIndex].at(-1);

  const horizontalOffset = lastLeaderPosition[0] - lastFollowerPosition[0];
  const verticalOffset = lastLeaderPosition[1] - lastFollowerPosition[1];

  const trailingOffsets = [
    horizontalOffset > 0 ? -1 : 1,
    verticalOffset > 0 ? -1 : 1,
  ];

  const axisNeedsToMove = [Math.abs(horizontalOffset) > 1, Math.abs(verticalOffset) > 1];

  let shift = [0, 0];
  if (axisNeedsToMove[0] && axisNeedsToMove[1]) {
    shift = [trailingOffsets[0], trailingOffsets[1]];
  } else if (axisNeedsToMove[0]) {
    shift = [trailingOffsets[0], 0];
  } else if (axisNeedsToMove[1]) {
    shift = [0, trailingOffsets[1]];
  }

  const newPosition = axisNeedsToMove[0] || axisNeedsToMove[1] ? [
    lastLeaderPosition[0] + shift[0],
    lastLeaderPosition[1] + shift[1],
  ] : [...lastFollowerPosition];

  knotPositions[knotIndex].push(newPosition);
};

headMovements.forEach(([direction, moveCount]) => {
  for (let moveIndex = 0; moveIndex < moveCount; moveIndex += 1) {
    calculateNewHeadPosition(direction);
    for (let knotIndex = 1; knotIndex < knotCount; knotIndex += 1) {
      calculateFollowerKnotPosition(knotIndex);
    }
  }
});

const uniquePositionsHitBySecondKnot = new Set(knotPositions[1].map(([h, v]) => `${h},${v}`)).size;
const uniquePositionsHitByLastKnot = new Set(knotPositions.at(-1).map(([h, v]) => `${h},${v}`)).size;

console.log({
  solution: {
    part1: { uniquePositionsHitBySecondKnot },
    part2: { uniquePositionsHitByLastKnot },
  },
});
