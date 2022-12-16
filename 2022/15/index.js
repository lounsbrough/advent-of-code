import input from './input';

const getManhattanDistance = ([x1, y1], [x2, y2]) => Math.abs(x1 - x2) + Math.abs(y1 - y2);

const sensorResults = input.split('\n').filter(Boolean).map((inputLine) => {
  const inputNumbers = inputLine
    .match(/sensor at x=([-\d]*), y=([-\d]*): closest beacon is at x=([-\d]*), y=([-\d]*)/i)
    .slice(1, 5).map(Number);

  const [x, y, beaconX, beaconY] = inputNumbers;
  const manhattanDistance = getManhattanDistance([x, y], [beaconX, beaconY]);

  return {
    x, y, closestBeacon: { x: beaconX, y: beaconY }, manhattanDistance,
  };
});

const closestBeacons = sensorResults.map(({ closestBeacon }) => closestBeacon);

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
const searchLineY = 2000000;
for (let currentX = furthestWestDeadSpot; currentX <= furthestEastDeadSpot; currentX += 1) {
  if (closestBeacons.some(({ x, y }) => x === currentX && y === searchLineY)) {
    continue;
  }

  if (sensorResults.some(({
    x,
    y,
    manhattanDistance,
  }) => getManhattanDistance([x, y], [currentX, searchLineY]) <= manhattanDistance)) {
    spotsWhereBeaconIsNot += 1;
  }
}

const searchGridSize = 4000000;

let currentX = 0;
let currentY = 0;
let beaconLocation;

const findCoveringSensor = ([x, y]) => sensorResults.find(({
  x: sensorX,
  y: sensorY,
  manhattanDistance,
}) => getManhattanDistance([x, y], [sensorX, sensorY]) <= manhattanDistance);

while (currentX <= searchGridSize && currentY <= searchGridSize) {
  const coveringSensor = findCoveringSensor([currentX, currentY]);

  if (!coveringSensor) {
    beaconLocation = [currentX, currentY];
    break;
  }

  const manhattanDistanceFromSensor = getManhattanDistance(
    [currentX, currentY],
    [coveringSensor.x, coveringSensor.y],
  );

  const currentDeadZoneWidth = coveringSensor.manhattanDistance - manhattanDistanceFromSensor + 1;

  currentX += currentDeadZoneWidth;

  if (currentX > searchGridSize) {
    currentX = 0;
    currentY += 1;
  }
}

const getTuningFrequency = ([x, y]) => x * 4000000 + y;

console.log({
  solution: {
    part1: { spotsWhereBeaconIsNot },
    part2: { tuningFrequency: getTuningFrequency(beaconLocation) },
  },
});
