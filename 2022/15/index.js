/* eslint-disable no-continue */
import input from './input';

const getManhattanDistance = ([x1, y1], [x2, y2]) => Math.abs(x1 - x2) + Math.abs(y1 - y2);

const sensorResults = input.split('\n').filter(Boolean).map((inputLine) => {
  const matches = inputLine.match(/sensor at x=([-\d]*), y=([-\d]*): closest beacon is at x=([-\d]*), y=([-\d]*)/i);

  const x = parseInt(matches[1], 10);
  const y = parseInt(matches[2], 10);
  const beaconX = parseInt(matches[3], 10);
  const beaconY = parseInt(matches[4], 10);
  const manhattanDistance = getManhattanDistance([x, y], [beaconX, beaconY]);

  return {
    x, y, closestBeacon: { x: beaconX, y: beaconY }, manhattanDistance,
  };
});

const closestBeacons = sensorResults.map(({ closestBeacon }) => closestBeacon);

console.log(sensorResults);

const deadSpotBounds = sensorResults
  .map(({ x, y, manhattanDistance }) => ({
    x: [x - manhattanDistance, x + manhattanDistance],
    y: [y - manhattanDistance, y + manhattanDistance],
  }));

const furthestWestDeadSpot = Math.min(
  ...deadSpotBounds.map(({ x }) => x[0]),
);

const furthestEastDeadSpot = Math.max(
  ...deadSpotBounds.map(({ x }) => x[1]),
);

let spotsWhereBeaconIsNot = 0;
const currentY = 2000000;
for (let currentX = furthestWestDeadSpot; currentX <= furthestEastDeadSpot; currentX += 1) {
  if (closestBeacons.some(({ x, y }) => x === currentX && y === currentY)) {
    continue;
  }

  if (sensorResults.some(({
    x,
    y,
    manhattanDistance,
  }) => getManhattanDistance([x, y], [currentX, currentY]) <= manhattanDistance)) {
    spotsWhereBeaconIsNot += 1;
  }
}

console.log(spotsWhereBeaconIsNot);
