import input from './input';

const depthReadings = input.split('\n').filter(Boolean).map((n) => parseInt(n, 10));

const windowSize = 3;

const increasedReadingsCount = depthReadings
  .filter((reading, index) => index < depthReadings.length - 1
  && reading < depthReadings[index + 1]).length;

const getWindowSum = (array, index) => array
  .slice(index, index + windowSize).reduce((a, b) => a + b);

const increasedWindowCount = depthReadings
  .filter((_, index) => index < depthReadings.length - windowSize
  && getWindowSum(depthReadings, index) < getWindowSum(depthReadings, index + 1)).length;

console.log({
  solution: {
    part1: { increasedReadingsCount },
    part2: { increasedWindowCount },
  },
});
